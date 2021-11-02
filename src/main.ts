import { createApp } from "vue"
import { globalRegister } from "./global"
import 'normalize.css'
import './assets/css/index.less'

import App from "./App.vue"
import router from './router'
import store from './store'
import { setupStore } from '@/store/index'

const app = createApp(App)

// globalRegister()
app.use(globalRegister)
app.use(router)
app.use(store)
setupStore()

app.mount("#app")
