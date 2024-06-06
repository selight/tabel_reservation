<script src="../../../tamashi-booking/demo/demo/src/main.js"></script>
<template>
<v-container>
  <v-card flat max-width="600px">
    <div>
      <span class="text-h4 font-weight-bold">Tamashi Ramen</span>
    </div>
   <v-divider class="my-1"></v-divider>
    <v-carousel hide-delimiters height="280px">
      <v-carousel-item
        v-for="(item,i) in carouselImages"
        :key="i"
        :src="item"
      ></v-carousel-item>
    </v-carousel>
    <information-tabs-component/>
    <v-row>
      <v-col cols="12" class="text-center mt-2">
        <v-btn color="primary" block @click="submitForm">Prenota</v-btn>
      </v-col>
    </v-row>

  </v-card>
</v-container>
</template>
<script>
import InformationTabsComponent from "@/components/informationTabsComponent.vue";

export default {
  name: "informationPage",
  components: {InformationTabsComponent},
  data() {
    return {
      carouselImages:[
        require('@/assets/carouselImage1.jpg'),
        require('@/assets/carouselImage2.jpg'),
        require('@/assets/carouselImage3.jpg'),
        require('@/assets/carouselImage4.jpg'),
        require('@/assets/carouselImage5.jpg'),
        require('@/assets/carouselImage6.jpg'),
        require('@/assets/carouselImage7.jpg')
      ]
         };
  },
  methods: {
    submitForm() {
      this.$router.push({name: 'book'});
    }
  }
}
</script>

<style scoped>

</style>
