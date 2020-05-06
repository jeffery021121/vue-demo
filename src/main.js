import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload';
import SelfLazyload from './modules/lazyLoad/index'
import router from './router';
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://localhost:3000/images/1.gif',
  loading: 'http://localhost:3000/images/1.gif',
  attempt: 1
})

Vue.use(SelfLazyload, {
  // preLoad: 1.3,
  error: 'http://localhost:3000/images/1.gif',
  loading: 'http://localhost:3000/images/1.gif',
})
Vue.prototype.$dispatch = function (parentName, fnName) {
  let parent = this.$parent
  while (parent) {
    if (parent.$options.name === parentName) break
    parent = parent.$parent
  }

  if (parent) {
    if (fnName && parent[fnName]) {
      // 还可以写成 parent.$emit(fnName), 然后在父组件的created生命周期里加入监听 this.$on(fnName,fn)
      parent[fnName]()
    }
    return parent
  }
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
