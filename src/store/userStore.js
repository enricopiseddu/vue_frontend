import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore({
  id:'userStore',
  state: () => ({
    jwt : useStorage('jwt', ''),
    userId: useStorage('userId', ''),
    username: useStorage('username', '')
  }),

  actions: {
    setToken(_jwt){
      this.jwt = _jwt;
      localStorage.setItem('jwt', _jwt);

      //console.log('localstorage is' + localStorage.getItem('jwt'));
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
        console.log( 'STAMPA JWT LOCALSTORAGE' + localStorage.getItem('jwt') );
        console.log('STAMPA JWT STATO PINIA' + state.jwt)
        return state.jwt != '';
    }

  }

  


})
