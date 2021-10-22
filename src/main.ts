import { createApp } from "vue"
import { globalRegister } from "./global"
import 'normalize.css'
import './assets/css/index.less'

import xcRequest from "./service"

import App from "./App.vue"
import router from './router'
import store from './store'

const app = createApp(App)

// globalRegister()
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount("#app")

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// xcRequest.request({
//     url: '/home/multidata',
//     method: 'GET',
//     interceptors: {
//         requestInterceptor: (config) => {
//             console.log('单独请求的config')
//             return config
//         },
//         responseInterceptor: (res) => {
//             console.log('单独响应的response')
//             return res
//         }
//     }
// })

// interface DataType {
//     data: any
//     returnCode: string
//     success: boolean
// }

// xcRequest.get<DataType>({
//     url: '/home/multidata'
// }).then(res => {
//     console.log(123)
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
// })