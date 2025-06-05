import './assets/main.css'
import { createPinia } from 'pinia'


import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(createPinia())
app.mount('#app');
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)
// app.mount('#app')