import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios';

export const useUserStore = defineStore({
    id:'userStore',
    state: () => ({
      jwt : useStorage('jwt', ''),
      userId: useStorage('userId', ''),
      username: useStorage('username', ''),
      users: useStorage('users', [])
    }),
    actions: {
      setToken(_jwt){
        this.jwt = _jwt;
      },
      
      setUserId(_userId){
        this.userId = _userId;
      },
      
      setUsername(_username){
        this.username = _username;
      },

      setUsers(_users){
        this.users = _users;
      },
      
      async login(username, password){
        axios.post(
          `${process.env.VUE_APP_BACKEND_URL}`,
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }
        ).then(response =>{
          console.log(response);
          
          if(response.data.token != undefined){
            
            this.setToken(response.data.token);
            //this.$router.push({ path: "/users" })
            
          }
          }
        );
      },

      allUsers(token){
        axios.get(
          `${process.env.VUE_APP_BACKEND_URL}users`,
          {
              headers: {
                  "x-auth-token": token
              }
          }
          ).then(response =>{
              console.log(response);
              
              this.setUsers(response.data);
              //this.users = response.data;
          }
          ).catch(error => {
              
              // Handle the error here
              if (error.response) {
                  // The request was made, but the server responded with a status code other than 2xx
                  console.log('Response data:', error.response.data);
                  console.log('Response status:', error.response.status);
              } else if (error.request) {
                  // The request was made, but no response was received
                  console.log('No response received');
              } else {
                  // Something happened in setting up the request that triggered an error
                  console.error('Error:', error.message);
              }
          });
      },

      logout(){
        this.setToken('');
        this.setUsername('');
        this.setUserId('');
        this.setUsers([]);
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

        getUsers: (state) => {
          return state.users;
      },

        isLogged: (state) =>{
            return state.jwt != '';
        },
      }
})