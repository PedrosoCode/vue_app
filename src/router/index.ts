import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AbouView from '../views/AboutView.vue'
import MainMenu from '../views/MainMenuView.vue'
import CadParceiroNegocio from '../views/CadastroParceiroNegocio.vue'
import ListaParceiroNegocio from '../views/ListaParceiroNegocio.vue'
import TesteView from '../views/TestesView.vue'
import OrdemServicoView from '../views/OrdemServicoView.vue'

import '../bs/bootstrap-5.3.3-dist/css/bootstrap.min.css'
import '../bs/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: AbouView,
      // meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MainMenu,
      meta: { requiresAuth: true },
    },
    {
      path: '/cadparceiro',
      name: 'cadparceiro',
      component: CadParceiroNegocio,
      meta: { requiresAuth: true },
    },
    {
      path: '/listaparceiro',
      name: 'listaparceiro',
      component: ListaParceiroNegocio,
      meta: { requiresAuth: true },
    },
    {
      path: '/parceiro/:id',
      name: 'detalhes_parceiro',
      component: CadParceiroNegocio,
      props: true //
    },
    {
      path: '/ordem_servico',
      name: 'ordem_servico',
      component: OrdemServicoView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/testeview',
      name: 'testeview',
      component: TesteView,
      props: true //
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwtToken')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' })
    } else {
      const isExpired = checkTokenExpiration(token)
      if (isExpired) {
        localStorage.removeItem('jwtToken')
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

function checkTokenExpiration(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000 // Convertendo para milissegundos
    return Date.now() > exp
  } catch (error) {
    return true
  }
}

export default router
