import { createWebHistory, createRouter } from "vue-router";

import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import PageNotFound from "@/views/PageNotFound.vue"
import AllUsers from "@/views/AllUsers.vue"

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },

  {
    path: "/signup",
    name: "AboutPage",
    component: SignupPage,
  },

  {
    path: "/users",
    name: "Users",
    component: AllUsers,
  },

  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;