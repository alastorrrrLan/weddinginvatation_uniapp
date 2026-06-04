import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
wx.cloud.init({env: 'cloud1-d1giw0qij607a4b14'})
app.$mount()
