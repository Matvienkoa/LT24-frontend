import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App).use(store).use(router).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDzW_BPI5e4ejEOuctVE2hxXTGr-5_jn_k',
    },
}).mount('#app')
