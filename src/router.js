import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/world",
            name: "covidWorld",
            component: () =>
                import(
                    /* webpackChunkName: "covidWorld" */ "./views/CovidWorld.vue"
                ),
        },
        {
            path: "/city",
            name: "covidCity",
            component: () =>
                import(
                    /* webpackChunkName: "covidCity" */ "./views/CovidCity.vue"
                ),
        },
        {
            path: "/finance",
            name: "finance",
            component: () =>
                import(/* webpackChunkName: "finance" */ "./views/Finance.vue"),
        },
        {
            path: "/finance/world",
            name: "financeWorld",
            component: () =>
                import(
                    /* webpackChunkName: "financeWorld" */ "./views/FinanceWorld.vue"
                ),
        },
        {
            path: "/finance/city",
            name: "financeCity",
            component: () =>
                import(
                    /* webpackChunkName: "financeCity" */ "./views/FinanceCity.vue"
                ),
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import(/* webpackChunkName: "login" */ "./views/Login.vue"),
            meta: {
                layout: "basic",
            },
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import(
                    /* webpackChunkName: "register" */ "./views/Register.vue"
                ),
            meta: {
                layout: "basic",
            },
        },
        {
            path: "/user",
            name: "user",
            component: () =>
                import(/* webpackChunkName: "user" */ "./views/User.vue"),
            meta: {
                layout: "basic",
            },
        },
    ],
});

export default router;
