import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faUser,
  faLock,
  faRoad,
  faBuilding,
  faHashtag,
  faFlag,
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import './assets/colors.css'

// Add all solid icons to the library
library.add(faHome, faUser, faLock, faRoad, faBuilding, faHashtag, faFlag)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
