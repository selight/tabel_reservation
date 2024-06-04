import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#000',
                secondary: '#fff',
                accent: '#eef6f5',
                error: '#b71c1c',
            },
        },
    },
});
