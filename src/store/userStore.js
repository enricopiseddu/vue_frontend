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

    setUserId(_userId){
      this.userId = _userId
    },

    parseJwt (token) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    },

    setUserData(token){
      const jwtParsed = this.parseJwt(token);
      console.log('token parsed : ');
      console.log(jwtParsed);
      this.setUsername(jwtParsed.username);
      this.setUserId(jwtParsed.userId);
      this.setToken(token);
    },

    logout(){
      //clean the localstorage
      this.setToken('');
      this.setUsername('');
      this.setUser('');
      this.setUserId('');
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
    },

    //CHIAMATE AL BACKEND
    async publishPost(_title, _notes){

      try{
          await axios.post(
          process.env.VUE_APP_BACKEND_URL + 'posts/newPost',
          { //body
            title: _title,
            notes: _notes
          },
          {
            headers: {
              "x-auth-token": this.jwt,
            }
          }
        );

        alert('Post published');
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


    //CHIAMATE AL BACKEND
    async updatePassword(_actualPassword, _newPassword){

      try{
          await axios.put(
          process.env.VUE_APP_BACKEND_URL + 'profile/updatePassword',
          { //body
            actualPassword: _actualPassword,
            newPassword: _newPassword
          },
          {
            headers: {
              "x-auth-token": this.jwt,
            }
          }
        );

        alert('Password updated correctly');
      } catch (error){
          console.log(error)

          if(error.code === 'ERR_NETWORK'){
            alert('Server error')
          }else{
            alert('Error ' + error.response.status + ' ' + error.response.data)
          }
          return false;
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
