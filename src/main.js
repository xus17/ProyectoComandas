import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import router from './router'
import Notifications from 'vue-notification'
 

Vue.use(Notifications)
Vue.use(firestorePlugin)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
