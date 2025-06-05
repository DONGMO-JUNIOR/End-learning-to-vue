<!-- <script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const navigationItems = ref([
  { name: 'Home', path: '/', current: true },
  { name: 'About us', path: '/about', current: false },
  { name: 'Programme', path: '/programme', current: false },
  { name: 'Contact us', path: '/contact', current: false }
])

const navigateTo = (path: string): void => {
  router.push(path)
}
</script>

<template>
  
  <button 
    v-for="item in navigationItems" 
    :key="item.name"
    @click="navigateTo(item.path)"
    :class="[
      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
      item.current 
        ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
        : 'text-gray-700 hover:text-blue-600'
    ]"
  >
    {{ item.name }}
  </button>
</template> -->


 <script setup lang="ts">
// import { ref } from 'vue';

// const currentPage = ref('Home');
// const navItems = [
//   { name: 'Home', active: true },
//   { name: 'About Us',path: '/about', active: false },
//   { name: 'Programme', active: false },
//   { name: 'Contact Us', active: false },
// ];

// const setActivePage = (pageName: string) => {
//   currentPage.value = pageName;
//   navItems.forEach(item => {
//     item.active = item.name === pageName;
//   });
// };
</script>

<template>
  <nav class="bg-white shadow-md py-4 px-6 flex justify-between items-center">
    <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-900 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">D</span>
            </div>
            <span class="ml-2 text-2xl font-bold text-gray-800">NIOR</span>
          </div>
    
    <div class="hidden md:flex space-x-8">
      <a 
        v-for="item in navItems" 
        :key="item.name"
        @click="setActivePage(item.name)"
        :class="{
          'text-blue-600 font-semibold': item.active,
          'text-gray-600 hover:text-blue-500': !item.active
        }"
        class="cursor-pointer transition-colors duration-5000"
      >
        {{ item.name }}
      </a>
    </div>
    
    <div class="flex space-x-4">
      <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors duration-200">
        Sign In
      </button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200">
        Sign Up
      </button>
      
    </div>
  </nav>
</template> 