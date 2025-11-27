import { createApp } from 'vue'
import { Quasar, Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import quasarIconSet from 'quasar/icon-set/material-icons'

import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Dialog
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet
})

app.mount('#app')
