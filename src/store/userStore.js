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
        if (this.jwt != ''){
          return Date.now() < (jwtDecode( this.jwt).exp * 1000 );
        }
        return false;
    },

    //CHIAMATE AL BACKEND
    async login(_username, _password){

      try{
          const response = await axios.post(
          process.env.VUE_APP_BACKEND_URL,
          { //body
            username: _username,
            password: _password
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }
        );

        if(response.data.token != undefined){
            
          this.setUserData(response.data.token);
          console.log(response.data.token);
          return true;
        }
        else{
          return false;
        }
        
      } catch (error){
          console.log(error)

          if(error.code === 'ERR_NETWORK'){
            alert('Server error')
          }else{
            alert('Error ' + error.response.status + ' ' + error.response.data)
          }
          return false;
      }

      
    },


    async getAllUsers(token){
       try{
          const response = await axios.get(
            process.env.VUE_APP_BACKEND_URL + 'users',
              {
                  headers: {
                      "x-auth-token": token
                  }
              }
          )
          console.log(response)
          this.usersReturnedByAPI = response.data;

       }catch( error ) {
        console.log(error)
          alert('Error ' + error.response.status + ' ' + error.response.data);
       }
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

    getListOfUsers(state){
      return state.usersReturnedByAPI;
    }
  },
  
})
