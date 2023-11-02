import { createWebHistory, createRouter } from "vue-router";

import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import PageNotFound from "@/views/PageNotFound.vue"
import AllUsers from "@/views/AllUsers.vue"
import { useUserStore} from '@/store/userStore';

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },

  {
    path: "/signup",
    name: "Signed",
    component: SignupPage,
    beforeEnter: (to, next) => {
      if(useUserStore().isLogged){
        next({
          path: '/users',
          query: { redirect: to.fullPath }
        })
      } 
    }
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

const protectedRoutesNotAuth = [
  "Users"
]

/* const protectedRoutesAuth = [
  "Signed",
  "Login"
] */

router.beforeEach((to, from, next) => {
  const isProtectedNotAuth = protectedRoutesNotAuth.includes(to.name)
  //const isProtectedAuth = protectedRoutesAuth.includes(to.name)
  
  if(isProtectedNotAuth && !useUserStore().isLogged && from.name == "LoginPage"){
      next({
          path: '/',
          query: { redirect: to.fullPath }
      })
  }
  else{
    next()
  }

  /* if(isProtectedAuth && useUserStore().isLogged && from.name == "Users"){
    next({
      path: '/Users',
      query: { redirect: to.fullPath }
  })
  }
  else{
    next()
  } */


})

export default router;