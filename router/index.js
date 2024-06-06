import Vue from 'vue'
import Router from 'vue-router'
import informationPage from "@/pages/informationPage.vue";
import booking from "@/pages/Booking.vue";

Vue.use(Router)

    export default new Router({
        mode: 'history',
        baseURL: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'Home',
                component: informationPage
            },
            {
                path: '/book',
                name: 'book',
                component: booking
            }
        ]
    })