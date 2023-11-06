import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore({
    id:'userStore',
    state: () => ({
      jwt : useStorage('jwt', ''),
      userId: useStorage('userId', ''),
      username: useStorage('username', ''),
      users: useStorage('users', []),
      exp: useStorage('exp', 0)
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

      setExp(_exp){
        this.exp = _exp;
      },

      parseJwt (token) {
        //console.log('dentro parse jwt');
        //const parse = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        //console.log(parse);
        const decoded = jwtDecode(token);
        return decoded;
      },

      setUserData(token){
        //this.setToken(token);
        //console.log('Entra');
        const jwtParsed = this.parseJwt(token);
        //console.log('token parsed : ');
        //console.log(jwtParsed);
        this.setToken(token);
        this.setUsername(jwtParsed.name);
        this.setExp(jwtParsed.exp);
        //console.log(jwtParsed.exp);
      },
      
      async login(username, password){
        axios.post(
          /* process.env.VUE_APP_BACKEND_URL, */
          `${process.env.VUE_APP_BACKEND_URL}/`,
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
          //console.log("output" + response);
          
          if(response.data.token != undefined){
            
            //const jwtParsed = this.parseJwt(token);
            //this.setUsername(jwtParsed.name);
            //this.setToken(response.data.token);
            this.setUserData(response.data.token);
            //this.$router.push({ path: "/users" });
            //alert("Hai fatto l'accesso con successo!");

            console.log("Accesso");
            this.router.push({ path: "/users" });
            
          }
        })/* .catch(() =>{
            alert("Credenziali non valide");
        }) */;
      },

      allUsers(token){
        axios.get(
          /* process.env.VUE_APP_BACKEND_URL + "users", */
          `${process.env.VUE_APP_BACKEND_URL}/users`,
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
        this.setExp(0);
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

        getExp: (state) => {
          return state.exp;
        },

        isLogged: (state) =>{
          console.log("isLogged: " + state.exp);
          if (state.exp >= (new Date().getTime() + 1) / 1000) {
            return true;
          }
          else{
            return false;
          }
        },
      }
})