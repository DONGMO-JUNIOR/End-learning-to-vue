import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutSection from '@/components/AboutSection.vue'
import MultiStep from '@/components/MultiStep.vue'
import ProgrammeScolaire from '@/components/ProgrammeScolaire.vue'
import SingnIn from '@/components/SingnIn.vue'
import ContactForm from '@/components/forms/ContactForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
   
  },
  {
    path: '/about',
    name: 'AboutSection',
    component:AboutSection,
    
  },
  {
    path: '/programme',
    name: 'Programme',
    component: ProgrammeScolaire,
  },
  {
    path: '/contact',
    name: 'Contact Us',
    component:ContactForm,
  },
  {
    path: '/singnIn',
    name: 'SingnIn',
    component: SingnIn,
  },
   {
    path: '/signup',
    name: 'SingUp',
    component: MultiStep,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll vers le haut pour chaque nouvelle route
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Mise à jour du titre de la page
// router.beforeEach((to, from, next) => {
//   document.title = to.meta?.title as string || 'KIDERO'
//   next()
// })

export default router