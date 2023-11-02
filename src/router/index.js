import { createWebHistory, createRouter } from "vue-router";

import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import PageNotFound from "@/views/PageNotFound.vue"
import AllUsers from "@/views/AllUsers.vue"

import {useUserStore} from "../store/userStore"

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },

  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,

    beforeEnter: (to, from, next) => {

      console.log('jwt token is ' + useUserStore().getToken);

      if (!useUserStore().isLogged ) {
        next(); // Consenti l'accesso
      } else {
        next(from);
      }
    }
  },

  {
    path: "/users",
    name: "Users",
    component: AllUsers,
    beforeEnter: (to, from, next) => {

      console.log('jwt token is ' + useUserStore().getToken);

      if (useUserStore().isLogged) {
        next(); // Consenti l'accesso
      } else {
        next('/'); // Reindirizza all'area di login
      }
    }
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