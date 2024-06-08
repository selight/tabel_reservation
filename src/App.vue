<template>
  <v-app   >
    <v-container class="pa-1">
      <v-card flat max-width="600px" >
        <div class="sticky-toolbar">tamashiRamen.com</div>
    <router-view />
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',

};
</script>

<style>
.sticky-toolbar{
  position: sticky;
  top: 0;
  background-color: white;
  font-size: 10px;
  z-index: 1000;
}
</style>