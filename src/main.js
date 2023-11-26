import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
/* add icons to the library */
library.add(faMagnifyingGlass);
library.add(faPlay);
library.add(faClock);
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount('#app')
