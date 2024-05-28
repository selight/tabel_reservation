<template>
  <v-app >
    <BookingPage/>
  </v-app>
</template>

<script>
import BookingPage from "./pages/Booking.vue";

export default {
  name: 'App',

  components: {
    BookingPage,
  },

  data: () => ({
    //
  }),
};
</script>
