<template>
  <v-card flat>
    <v-tabs v-model="tab" align-tabs="start" >
      <v-tab>Dati</v-tab>
      <v-tab>FAQ</v-tab>
      <v-tab>Parking</v-tab>
      <v-tab>Naviga</v-tab>

      <!-- Tab items -->
      <v-tab-item>
        <!-- Dati Content -->
        <BookingComplete v-if="showBookingComplete" :type="type"/>
        <div v-else>
        <v-form @submit.prevent="submitForm" class="pa-1 d-flex flex-column ">
          <div>
          <v-row >
            <v-col cols="3" sm="2">
          <v-select
            v-model="userDetails.title"
            :items="['Mr', 'Ms', 'Mrs']"
            label="Title"
            required
            hide-details="auto"
          ></v-select>
            </v-col>
            <v-col>
          <v-text-field  label="Nome " hide-details="auto" v-model="userDetails.nome" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field  label="Cognome" hide-details="auto" v-model="userDetails.cognome" required></v-text-field>
            </v-col>
          </v-row>
          </div>
          <div>
          <v-row >
          <v-col cols="7" >
          <v-text-field dense label="Telefono" hide-details="auto" v-model="userDetails.telefono" required></v-text-field>
          </v-col>
            <v-col >
              <v-text-field dense label="CAP Rezisdenza" hide-details="auto" v-model="userDetails.cap" required></v-text-field>
            </v-col>
          </v-row>
          </div>
          <v-text-field dense label="Email" hide-details="auto" v-model="userDetails.email" required></v-text-field>
          <v-text-field dense label="Note" hide-details="auto"  autogrow ></v-text-field>
        </v-form>
        <v-row class="no-gutters my-2">
          <v-col cols="6"  >
            <v-card flat outlined class="mr-sm-3 mr-2">
              <v-checkbox hide-details="auto" v-for="(item,i) in extraItems" :key="i" dense class="ma-0"  v-model="item.value" :label="item.label"></v-checkbox>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat outlined>
              <v-checkbox v-for="(item,i) in specialThings" hide-details="auto" :key="i"  dense  class="ma-0"  v-model="item.value"  :label="item.label" >
              </v-checkbox>
              </v-card>
          </v-col>
        </v-row>
        <v-checkbox hide-details="auto" v-model="subscribePromotions" label="Do you want to subscribe to our promotions?"></v-checkbox>
        <v-row>
          <v-col cols="12" class="text-center mt-3">
            <v-btn color="primary" block @click="submitForm">Prenota</v-btn>
          </v-col>
        </v-row>
        </div>
      </v-tab-item>

      <v-tab-item>
        <!-- FAQ Content -->
        <p>some frequently asked questions.</p>
      </v-tab-item>

      <v-tab-item>
        <!-- Parking Content -->
        <p>Information about parking.</p>
      </v-tab-item>

      <v-tab-item>
        <!-- Navigazione Content -->
        <p>Navigation instructions and maps.</p>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import BookingComplete from "@/components/bookingComplete.vue";
import {BookingStatus} from "@/utils/utils";

export default {
  name:'informationTabsComponent',
  components: {BookingComplete},
  data() {
    return {
      tab: null,
      userDetails: {
        nome: '',
        cognome: '',
        email: '',
        telefono: ''
      },
      extraItems: {
        senzaGluten: {
          value: false,
          label: 'Senza Glutine'
        },
        senzaLattosio: {
          value: false,
          label: 'Senza Lattosio'
        },
        vegan: {
          value: false,
          label: 'Cibi Vegetarini'
        },
        sunio: {
          value: false,
          label: 'No carne Sunia'
        }
      },
      specialThings: {
        birthday: {
          value: false,
          label: 'Portero torta '
        },
        pets: {
          value: false,
          label: 'Presenza Cane'
        },
        bambino:{
          value: false,
          label: 'Bambino in carrozina'
        },
        seggiolino:{
          value: false,
          label: 'Seggiolino'
        }
      },
      subscribePromotions: false,
      showBookingComplete: false,
      type:BookingStatus.LISTA_D_ATTESA,
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted');
      console.log('User Details:', this.userDetails);
      this.showBookingComplete = true;
    }
  }
};
</script>
<style scoped>
 div ::v-deep .v-slide-group__prev,.v-slide-group__prev--disabled{
   display:none !important;
 }
 div ::v-deep .v-tab {
   font-size: 12px !important;
   padding : 0px 10px !important;
   min-width: 30px !important;
 }
 div ::v-deep .v-slide-group__content{
   justify-content: space-between;
 }
 div ::v-deep .v-messages{

 }
 div ::v-deep .v-input .v-label {
   font-size: 12px !important;
 }
 .d-flex{
   gap: 12px;
 }
 div ::v-deep .row + .row {
    margin-top: 0px
   /* margin-top: 12px; */
 }
</style>