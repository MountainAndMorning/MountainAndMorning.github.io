import DefaultTheme from "vitepress/theme";
import "vuetify/styles";
import './style/var.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import Steps from '../components/Steps.vue'
const vuetify = createVuetify({
  components,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})
export default {
  ...DefaultTheme,
  enhanceApp({ app, siteData }) {
    app.use(vuetify);
    app.component('Steps', Steps)
  },
};