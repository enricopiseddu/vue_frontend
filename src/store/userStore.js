import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id:'userStore',
  state: () => ({
    jwt : '',
    userId: '',
    username: ''
  }),

  actions: {
    setToken(_jwt){
      this.jwt = _jwt;
    },

    setUser(_userId){
      this.userId = _userId; 
    },

    setUsername(_username){
        this.username = _username;  
    }
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
