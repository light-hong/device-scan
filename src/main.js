import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'

import 'normalize.css/normalize.css'

import {
  List,
  Cell,
  Collapse,
  CollapseItem,
  Icon,
  Uploader,
  Button
} from 'vant'
import 'vant/lib/index.less'
Vue.use(List)
Vue.use(Cell)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
