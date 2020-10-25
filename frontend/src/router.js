import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = ()=> import('./views/Home.vue')
const Transferencia = ()=> import('./views/Transferencia.vue')
const Contato = ()=> import('./views/Contato.vue')

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/transferencia",
      name: "Transferencia",
      component: Transferencia
    },
    {
      path: "/contato",
      name: "Contato",
      component: Contato
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
  }
})

export default router;