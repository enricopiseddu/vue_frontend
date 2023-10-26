<template>
    <div id="app">

      <h1 class="mt-5">Login</h1>
      <div id="alert" v-if="alert">{{ alert }}</div>
  
      <form @submit.prevent="onSubmit">
        
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
      <div>
        <p>Your token JWT is <br> {{ jwtreceived }}</p>
      </div>
    </div>
</template>
  
  <script>
  
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',
    data(){
          return {
              username: '', //v-model in template
              password: '',
              jwtreceived: ''
          }
    },

    props: {
    },

    methods: {
  
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
          this.jwtreceived = response.data.token;
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
  