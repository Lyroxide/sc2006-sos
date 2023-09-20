import { createApp } from 'vue'
import naive from 'naive-ui'
import { createRouter,createWebHashHistory } from 'vue-router'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
//import store from './store'
import SOS from './SOS/SOS.vue'
//import about from './SOS/about.vue'
import header from './SOS/header.vue'

const routes = [
    { path: '/', name: 'about', component: about },
    { path: '/header', name: 'header', component: header },
    { path: '/dashboard', name: 'dashboard', component: dashboard },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    { path: '/profile', name: 'profile', component: profile },
    { path: '/users/:id', component: user },


]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
const metaManager = createMetaManager();

const app = createApp(SOS);
app.use(naive);
app.use(router);
app.use(metaManager);
app.use(metaPlugin);
app.use(store);
app.mount('#app');

