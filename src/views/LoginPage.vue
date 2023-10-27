<template>
    <div id="app">

      
      
  
      <form @submit.prevent="onSubmit" v-if="!storeUser.isLogged">
        <h1 class="mt-5">Login</h1>
        <div class="form-group">
            <label for="username">
              Username
              <input id="username" type="text" v-model="username" class="form-control" />
            </label>
        </div>

        <br>

        <div class="form-group">
          <label for="password">
            Password
            <input id="password" type="password" v-model="password" class="form-control" />
          </label>
        </div>
        
        <br>
        
  
        <button type="submit" class="btn btn-success">Login</button>
      </form>
      <br>
      <div v-if="storeUser.isLogged">
        <p>Your token JWT is <br> {{ storeUser.getToken }}</p>
      </div>
    </div>
</template>
  
  <script>
  
  import axios from 'axios'; 
  import { useUserStore} from '@/store/userStore';
  import {Buffer} from 'buffer';
  
  
  export default {
    name: 'LoginForm',
    data(){
          return {
              username: '', //v-model in template
              password: '',
              storeUser : useUserStore()
              //jwtreceived: ''
          }
    },

    props: {
    },

    methods: {

      parseJwt (token) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      },

      setStore(token){
        const jwtParsed = this.parseJwt(token);

        this.storeUser.setUsername(jwtParsed.username);
      },
  
      onSubmit(e){
        e.preventDefault()

        if(!this.username){
            alert('Please insert username')
            return
        }
  
        if(!this.password){
            alert('Please insert password')
            return
        }
  
        console.log(this.username + ' ' + this.password);
  
        
        axios.post(
          "http://localhost:5000/",
          {
            username: this.username,
            password: this.password
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }
        ).then(response =>{
          console.log(response);

          if(response.data.token != undefined){
            //this.jwtreceived = response.data.token;
            this.storeUser.setToken(response.data.token);
            console.log(this.storeUser.getToken);
            //console.log( this.parseJwt(this.storeUser.getToken) );
            this.setStore(this.storeUser.getToken);
          }
        }
        );
  
        
        //clear the form
        this.username= '';
        this.password= '';
        
      }
  
    }
  }
  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

   </style>
  