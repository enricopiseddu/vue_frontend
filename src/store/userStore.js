import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id:'userStore',
  state: () => ({
    jwt : '',
    userId: '',
    username: ''
  }),
  actions: {
    setToken(token){
      this.jwt = token;
    },

    setUser(id){
      this.userId = id;
    },

    setUsername(username){
        this.username = username;
      },
    


  },

  getters: {
    getToken: (state) => {
      return state.jwt;
    },

    getUserId: (state) => {
        return state.userId;
    },

    getUsername: (state) => {
        return state.username;
    },

    isLogged: (state) => {
        return state.jwt != '';
    }

  }

  


})
