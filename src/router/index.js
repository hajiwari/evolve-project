import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyEvolve from '../views/MyEvolve.vue'
import Catalog from '../views/Catalog.vue'
import Search from '../views/Search.vue'
import About from '../views/About.vue'
import Help from '../views/Help.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my-evolve',
      name: 'my-evolve',
      component: MyEvolve
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Account for fixed header
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
