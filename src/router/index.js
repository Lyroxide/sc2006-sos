import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.js';

import Home from '../SOS/about.vue';
import { default as ChangePassword } from '../SOS/changepassword.vue';
import Dashboard from '../SOS/dashboard.vue';
import EditProfile from '../SOS/editprofile.vue';
import Error from '../SOS/error.vue';
import FindFood from '../SOS/findfood.vue';
import FindGroups from '../SOS/findgroups.vue';
import Footer from '../SOS/footer.vue';
import ForgetPassword from '../SOS/forgetpassword.vue';
import Header from '../SOS/header.vue';
import Login from '../SOS/login.vue';
import MyGroups from '../SOS/mygroups.vue';
import nextMeeting from '../SOS/nextmeeting.vue';
import Register from '../SOS/register.vue';
import ResetPassword from '../SOS/resetpassword.vue';


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
        meta: { requiresAuth: true },
    },
    {
        path: "/findfood",
        name: "findfood",
        component: FindFood,
        meta: { requiresAuth: true },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/mygroups",
        name: "mygroups",
        component: MyGroups,
        meta: { requiresAuth: true },
    },
    {
        path: "/editprofile",
        name: "editprofile",
        component: EditProfile,
        meta: { requiresAuth: true },
    },
    {
        path: "/nextmeeting",
        name: "nextmeeting",
        component: nextMeeting,
        meta: { requiresAuth: true },
    },
    {
        path: "/changepassword",
        name: "changepassword",
        component: ChangePassword,
        meta: { requiresAuth: true },
    },
    {
        path: "/forgetpassword",
        name: "forgetpassword",
        component: ForgetPassword,
    },
    {
        path: "/resetpassword",
        name: "resetpassword",
        component: ResetPassword,
    },
    {
        path:"/:pathMatch(.*)*",
        name:"error",
        component: Error,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.auth.user;

    if (requiresAuth && !currentUser) {
        // Redirect the user to the login page if they are not authenticated.
        next({ name: 'login' });
    } else {
        // Proceed to the route if the user is authenticated or the route does not require auth.
        next();
    }
});

export default router;