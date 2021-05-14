import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'

import 'normalize.css/normalize.css'

import {
  List,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Icon,
  Uploader,
  Button,
  Search,
  Form,
  Field,
  Popup,
  Image as VanImage,
  Pagination
} from 'vant'

import Pager from '@/components/Pager.vue'

import 'vant/lib/index.less'
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(Search)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Field)
Vue.use(VanImage)
Vue.use(Pagination)

Vue.component('VanPager', Pager)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
