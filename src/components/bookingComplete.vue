<template>
<v-row class="justify-center pa-1 my-1">
  <v-col cols="12">
   <div :class="confirmationObj.textColorClass" class="confirmation-title" >{{confirmationObj.title}}</div>
  </v-col>
  <v-col cols="12">
    <div class="message text-center">
      <div class=" text-center mb-2">{{confirmationObj.mainMessage}} </div>
      <div class=" text-center"  v-for="(sentence, index) in this.confirmationObj.description.split('.')" :key="index">{{sentence}}.</div>
      <div class=" text-center mt-3 text-decoration-underline" v-if="confirmationObj.extra">{{confirmationObj.extra}}</div>
    </div>
  </v-col>
</v-row>
</template>
<script>
import { BookingStatus} from "@/utils/utils";

export default {
  name: 'BookingComplete',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      confirmationObj: {
        title: '',
        mainMessage: '',
        textColorClass:'',
        description: '',
        extra:''
      },
    }
  },
  methods: {
    // display correct message based on type
    getMessage() {
      switch (this.type) {
        case BookingStatus.EFFETTUATA:
          return  {
            title: 'Richiesta Prenotazione Effettuata',
            mainMessage: 'La tua richiesta di prenotazione è stata inviata al ristorante',
            description: 'Riceverai un messaggio su WhatsAPP.clicca nel messagio per confermare il tuo numero di telefono',
            textColorClass:'completed-text'
          }
        case BookingStatus.CONFERMATA:
         return  {
            title: 'Richiesta Prenotazione Confermata',
            mainMessage: 'La tua prenotazione è confermata ed il tuo tavolo e riservato',
            description:'Riceverai un messaggio di conferma su WhatsApp.Grazie per averci scelto',
            textColorClass:'completed-text'
          }
        case BookingStatus.LISTA_D_ATTESA:
         return {
            title: 'Richesta di prenotazione in Lista d\'Attesa',
            mainMessage: 'La tua prenotazione non confermata',
            description: 'Receverai un messagio su WhatsApp.clicca nel messagio per confermare il tuo numero di telefono',
            extra:'appena si liberera un tavolo confermeremo la tua richiesta',
            textColorClass:'waiting-text'
          }
        default:
          return null;
      }
    },
  },
  mounted() {
    this.confirmationObj = this.getMessage();
  },

};
</script>

<style scoped>
.completed-text{
  color: #4fc670;
}
.waiting-text{
  color: #ebdb55;
}
.confirmation-title{
  border: solid 1px #dedede;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  padding: 8px;
}
.message{
  border:solid 1px #dedede;
  font-weight: bold;
  padding: 10px;
}

</style>