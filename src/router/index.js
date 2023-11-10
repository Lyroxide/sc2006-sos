import { createRouter, createWebHistory } from "vue-router";

import Home from '../SOS/about.vue';
import ChangePassword from '../SOS/changepassword.vue';
import Dashboard from '../SOS/dashboard.vue';
import EditProfile from '../SOS/editprofile.vue';
import FindFood from '../SOS/findfood.vue';
import FindGroups from '../SOS/findgroups.vue';
import Footer from '../SOS/footer.vue';
import ForgetPassword from '../SOS/forgetpassword.vue';
import Header from '../SOS/header.vue';
import Login from '../SOS/login.vue';
import MyGroups from '../SOS/mygroups.vue';
import nextMeeting from '../SOS/nextmeeting.vue';
import Register from '../SOS/register.vue';

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
    },
    {
        path: "/findfood",
        name: "findfood",
        component: FindFood,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
    },
    {
        path: "/mygroups",
        name: "mygroups",
        component: MyGroups,
    },
    {
        path: "/editprofile",
        name: "editprofile",
        component: EditProfile,
    },
    {
        path: "/nextmeeting",
        name: "nextmeeting",
        component: nextMeeting,
    },
    {
        path: "/changepassword",
        name: "changepassword",
        component: ChangePassword,
    },
    {
        path: "/forgetpassword",
        name: "forgetpassword",
        component: ForgetPassword,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;