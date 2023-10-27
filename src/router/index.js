import { createWebHistory, createRouter } from "vue-router";

import Home from '../SOS/about.vue'
import Login from '../SOS/login.vue'
import Footer from '../SOS/footer.vue'
import Header from '../SOS/header.vue'
import FindGroups from '../SOS/findgroups.vue'
import Register from '../SOS/register.vue'


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
        path: "/register",
        name: "register",
        component: Register,
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
    },
    {
        path: "/findgroups",
        name: "findgroups",
        component: FindGroups,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;