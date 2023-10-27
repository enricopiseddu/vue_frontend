import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id:'userStore',
  state: () => ({
    jwt : '',
    userId: ''
  }),
  actions: {
    setToken(token){
      this.jwt = token;
    },
    setUser(id){
      this.userId = id;
    }
  },

  getters: {
    getToken: (state) => {
      return state.jwt;
    },

    getUserId: (state) => {
        return state.userId;
      }
  }


})
