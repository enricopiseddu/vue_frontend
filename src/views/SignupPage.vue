<template>
    <div id="app">

      <h1>Sign up</h1>
      <div id="alert" v-if="alert">{{ alert }}</div>
  
      <form @submit.prevent="onSubmit">

        <div>
            <label>
                Username
                <input type="text" v-model="username" />
            </label>
        </div>

        <br>
        
        <div>
            <label>
                Password
                <input type="password" v-model="password" />
            </label>
        </div>
        
        <br>

        <div>
            <label>
                Repeat password
                <input type="password" v-model="repeatedPassword" />
            </label>
        </div>
        
        
        <br> 

        <div>
            <button type="submit">Sign Up</button>
        </div>
        
      </form>
  
    </div>
</template>
  
<script>
  
  import axios from 'axios';
  
  export default {
    name: 'SignupPage',
    data(){
          return {
              username: '', //v-model in template
              password: '',
              repeatedPassword: ''
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

        if(!this.repeatedPassword){
            alert('Please repeat the password')
            return
        }

        if( this.password != this.repeatedPassword){
          alert('Passwords do not match');
          return
        }
  
        console.log(this.username + ' ' + this.password);
  
        
        axios.post(
          "http://localhost:5000/signup",
          {
            username: this.username,
            password: this.password
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }
        ).then(response =>
          console.log(response)
        );
  
        
        //clear the form
        this.username= '';
        this.password= '';
        this.repeatedPassword = '';
        
      }
  
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  