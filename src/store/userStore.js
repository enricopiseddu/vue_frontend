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