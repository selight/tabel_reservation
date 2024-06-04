<template>
  <v-card flat>
    <v-tabs v-model="tab" align-tabs="start" color="black">
      <v-tab>Dati</v-tab>
      <v-tab>FAQ</v-tab>
      <v-tab>Parking</v-tab>
      <v-tab>Naviga</v-tab>

      <!-- Tab items -->
      <v-tab-item>
        <!-- Dati Content -->
        <v-form @submit.prevent="submitForm">
          <v-text-field label="Nome e Cognome" v-model="userDetails.nome" required></v-text-field>
          <v-text-field label="Email" v-model="userDetails.email" required></v-text-field>
          <div>
          <v-text-field label="Telefono" v-model="userDetails.telefono" required></v-text-field>
            <v-text-field label="CAP Rezisdenza" v-model="userDetails.cap" required></v-text-field>
          </div>
        </v-form>
        <v-row>
          <v-col cols="6">
            <v-card class="pa-1 mb-1">
              <v-checkbox v-model="extraItems.senzaGluten" label="Senza Glutine"></v-checkbox>
              <v-checkbox v-model="extraItems.senzaLattosio" label="Senza Lattosio"></v-checkbox>
              <v-checkbox v-model="extraItems.vegan" label="Cibi Vegetarini"></v-checkbox>
              <v-checkbox v-model="extraItems.sunio" label="No carne Sunia"></v-checkbox>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="pa-1 mb-1">
              <v-checkbox v-model="specialThings.birthday" label="Portero torta Compleanno"></v-checkbox>
              <v-checkbox v-model="specialThings.bambino" label="Bambino in carrozina"></v-checkbox>
              <v-checkbox v-model="specialThings.pets" label="Presenza Cane"></v-checkbox>
              <v-checkbox v-model="specialThings.pets" label="Seggiolino"></v-checkbox>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="ma-3">
            <v-checkbox v-model="subscribePromotions" label="Do you want to subscribe to our promotions?"></v-checkbox>
          </v-col>
        </v-row>
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
export default {
  name:'informationTabsComponent',
  data() {
    return {
      tab: null,
      userDetails: {
        nome: '',
        email: '',
        telefono: ''
      },
      extraItems: {
        senzaGluten: false,
        senzaLattosio: false,
        vegan:false,
        sunio:false,
      },
      specialThings: {
        birthday: false,
        pets: false,
        bambino:false
      },
      subscribePromotions: false

    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted');
      console.log('User Details:', this.userDetails);
      // Emit an event to the parent component to handle form submission
      this.$emit('submit');
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
</style>