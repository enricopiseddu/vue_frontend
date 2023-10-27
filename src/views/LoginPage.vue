<template>
    <div id="app">

      <h1 class="mt-16">Login</h1>
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
        
        <button type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800">Log in</button>
      </form>
  
      <div>
        <p>Your token JWT is {{ jwtreceived }}</p>
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
  
  </style>
  