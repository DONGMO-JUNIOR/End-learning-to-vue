import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' 
import HomeView from '../views/HomeView.vue'
import AboutSection from '@/components/AboutSection.vue'
import MultiStep from '@/components/MultiStep.vue'
import ProgrammeScolaire from '@/components/ProgrammeScolaire.vue'
import SingnIn from '@/components/SingnIn.vue'
import ContactForm from '@/components/forms/ContactForm.vue'
import ForgetPassword from '@/components/ForgetPassword.vue'
import NotFoundPage from '@/components/NotFoundPage.vue'
import WelcomePage from '../views/WelcomePage.vue'



// Déclaration des meta-données
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'NIOR - Accueil'
    }
  },
  {
    path: '/about',
    name: 'AboutSection',
    component: AboutSection,
    meta: {
      title: 'NIOR - À propos'
    }
  },
  {
    path: '/programme',
    name: 'Programme',
    component: ProgrammeScolaire,
    meta: {
      title: 'NIOR - Programme'
    }
  },
  {
    path: '/contact',
    name: 'Contact Us',
    component: ContactForm,
    meta: {
      title: 'NIOR - Contact'
    }
  },
  {
    path: '/singnIn',
    name: 'SingnIn',
    component: SingnIn,
    meta: {
      title: 'NIOR - Connexion'
    }
  },
  {
    path: '/signup',
    name: 'SingUp',
    component: MultiStep,
    meta: {
      title: 'NIOR - Inscription'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgetPassword,
    meta: {
      title: 'NIOR - Mot de passe oublié'
    }
  },
  ,
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomePage,
    meta: { 
      requiresAuth: true,
      title: 'NIOR - Bienvenue' 
    }
  },
   {
    path: '/not_found_page',
    name: 'NotFoundPage',
    component: NotFoundPage,
    meta: { 
      requiresAuth: true,
      title: 'NIOR - NotFoundPage' 
    }
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to) => {
  // Gestion du titre
  document.title = to.meta.title as string || 'NIOR'
  
  // Vérification d'authentification
  if (to.meta.requiresAuth && !localStorage.getItem('user')) {
    return { name: 'SingnIn' }
  }
})

export default router