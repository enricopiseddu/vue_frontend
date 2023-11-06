import { defineStore } from 'pinia'
import {useStorage}  from '@vueuse/core'
import {Buffer} from 'buffer'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



export const useUserStore = defineStore({
  id:'userStore',
  state: () => ({
    jwt : useStorage('jwt', ''),
    userId: useStorage('userId', ''),
    username: useStorage('username', ''),
    usersReturnedByAPI: useStorage('usersReturnedByAPI', [])
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
    },

    parseJwt (token) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    },

    setUserData(token){
      const jwtParsed = this.parseJwt(token);
      console.log('token parsed : ');
      console.log(jwtParsed);
      this.setUsername(jwtParsed.username);
      this.setToken(token);
    },

    logout(){
      this.setToken('');
      this.setUsername('');
      this.setUser('');
      this.usersReturnedByAPI=[];
    },

    isLogged(){
      console.log('inside isLogged, is logged is: ');

        if (this.jwt != ''){
        
          console.log( Date.now() < (jwtDecode( this.jwt).exp * 1000 ));
          return Date.now() < (jwtDecode( this.jwt).exp * 1000 );
        }
        
        
        return false;
    },

    //CHIAMATE AL BACKEND
    login(_username, _password){

      //console.log('variabile ' + `${process.env.VUE_APP_BACKEND_URL}`);
      axios.post(
        process.env.VUE_APP_BACKEND_URL,
        {
          username: _username,
          password: _password
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }
      ).then(response =>{
          console.log(response);

          if(response.data.token != undefined){
            
            this.setUserData(response.data.token);
            console.log(response.data.token);
            return true;
          }
          else{
            return false;
          }
        }
      ).catch( () =>{
        //console.log(error);
        alert('Invalid credentials');
      });
    },


    getAllUsers(token){

      axios.get(
        process.env.VUE_APP_BACKEND_URL + 'users',
        {
            headers: {
                "x-auth-token": token
            }
        }
        ).then(response =>{
            console.log(response);
            
            this.usersReturnedByAPI= response.data;
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

    /* isLogged: (state) => {
      console.log('inside isLogged, is logged is: ');

        if (state.jwt != ''){
        
          console.log( Date.now() < (jwtDecode( state.jwt).exp * 1000 ));
          return Date.now() < (jwtDecode( state.jwt).exp * 1000 );
        }
        
        
        return false;
        
    
    }, */

    getListOfUsers(state){
      return state.usersReturnedByAPI;
    }

  },
  
})
