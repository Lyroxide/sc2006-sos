import { createWebHistory, createRouter } from "vue-router";

import Home from '../SOS/about.vue'
import Login from '../SOS/login.vue'
import Footer from '../SOS/footer.vue'
import Header from '../SOS/header.vue'


const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/footer",
        name: "footer",
        component: Footer,
    },
    {
        path: "/header",
        name: "header",
        component: Header,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;