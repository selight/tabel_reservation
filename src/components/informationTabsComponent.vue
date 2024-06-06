<template>
  <v-tabs show-arrows v-model="tab" align-tabs="start" >
    <v-tab>Info</v-tab>
    <v-tab>Menu</v-tab>
    <v-tab>Faq</v-tab>
    <v-tab>Coupon</v-tab>
    <v-tab>iBook Reviews</v-tab>
    <v-tab>Google Reviews</v-tab>
    <v-tab-item>
<!--      blog links-->
      <div class="d-flex links flex-row pa-1">
        <v-btn x-small  color="primary">INSIDER</v-btn>
        <v-btn x-small  outlined color="red">INSIDER</v-btn>
        <v-btn x-small  color="primary">INSIDER</v-btn>
        <span  class="link-text text-caption font-weight-bold">CARNE-ROMANTICO-GRUPPI</span>
        <span class="ml-auto text-h6 align-content-start " >4.6/<span class="text-subtitle-2 align-end">5</span></span>
      </div >
      <div class="d-flex flex-column pa-1">
        <div class="mb-2">
          <v-icon dense left >mdi-map-marker</v-icon>
          <span class="font-weight-bold text-subtitle-2">Corso Italia 32er,anglo via zara  </span>
        </div>
        <div  class="mb-2">
          <v-icon dense left >mdi-silverware-fork-knife</v-icon>
          <span class="font-weight-bold text-subtitle-2">Carne </span>
        </div>
        <div dense class="mb-2">
          <v-icon left>mdi-cash</v-icon>
          <span class="font-weight-bold text-subtitle-2">Prezzo Medio 40 </span>
        </div>
      </div>
      <v-row class=" justify-center">
        <v-col cols="6" sm="6">
          <v-btn large block outlined class="flexible-btn">Website</v-btn>
        </v-col>
        <v-col cols="6" sm="6">
          <v-btn large block outlined class="flexible-btn">Vai al Menu Wagyu</v-btn>
        </v-col>
      </v-row>
    </v-tab-item>
    <v-tab-item>
      content for menu
</v-tab-item>
<v-tab-item>
  content for faq
</v-tab-item>
<v-tab-item>
  content for coupon
</v-tab-item>
<v-tab-item>
  content for iBook Reviews
</v-tab-item>
<v-tab-item>
  content for google reviews
</v-tab-item>
  </v-tabs>
</template>
<script>
export default {
  name: "informationTabsComponent",
  data() {
    return {
      tab:0,
    }
  }
}
</script>
<style scoped>
div ::v-deep .v-slide-group__prev {
  min-width: 0 !important;
  flex: 0 1 10px !important; ;
}
div ::v-deep .v-slide-group__next {
  min-width: 0 !important;
  flex: 0 1 10px !important; ;
}
div ::v-deep .v-tab {
  font-size: 12px !important;
  padding : 0px 10px !important;
  min-width: 30px !important;
}
div ::v-deep .v-slide-group__content{
  justify-content: space-between;
}
/*if it's on mobile decrease the text size */
@media(max-width: 600px) {
  .flexible-btn {
    font-size: 2.7vw;
    font-weight: 700;
  }
  .link-text{
    font-size: 2vw !important;
    line-height: 1;
    letter-spacing: 0;
  }
}
.links{
  gap: 4px;
  align-items: center;
}
.v-icon{
  background-color: black;
  color: white;
  border-radius: 5px;
}

</style>