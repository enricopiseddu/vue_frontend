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
      setUserId(id){
        this.userId = id;
      },
      setUsername(name){
        this.username = name;
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

        isLogged: (state) =>{
            return state.jwt != '';
        },
      }
})