<template>
    <div id="app">

      <h1 class="mt-16">Sign up</h1>
      <div id="alert" v-if="alert">{{ alert }}</div>
  
      <form @submit.prevent="onSubmit" class="bg-white shadow-md rounded px-3 pt-6 pb-8">

        <div class="mx-auto">
          <div class="mt-2">
            <label class="me-auto text-gray-700 text-sm font-bold mb-2"> Username </label>
          </div>
          <input type="text" v-model="username" class="mt-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div class="mx-auto">
          <div class="mt-2">
            <label class="me-auto text-gray-700 text-sm font-bold mb-2"> Password </label>
          </div>
          <input type="password" v-model="password" class="mt-4 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
      
        <div class="mx-auto">
          <div class="mt-2">
            <label class="me-auto text-gray-700 text-sm font-bold mb-2"> Repeat password </label>
          </div>
          <input type="password" v-model="repeatedPassword" class="mt-4 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div>
            <button type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
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
  