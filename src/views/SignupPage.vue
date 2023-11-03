<template>
    <div id="app">

      <h1 class="mt-5">Sign up</h1> 
  
      <form @submit.prevent="onSubmit">

        <div class="form-group">
            <label for="username">
                Username
                <input id="username" type="text" v-model="username" class="form-control" />
            </label>
        </div>

        <br>
        
        <div class="form-group">
            <label for="password1">
                Password
                <input id="password1" type="password" v-model="password" class="form-control" />
            </label>
        </div>
        
        <br>

        <div class="form-group">
            <label for="password2">
                Repeat password
                <input id="password2" type="password" v-model="repeatedPassword" class="form-control" />
            </label>
        </div>
        
        
        <br> 

        <div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>
        
      </form>
      
      <h2 v-if="userRegistered">You have been registered</h2>
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
          process.env.VUE_APP_BACKEND_URL + 'signup',
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
            alert('Registrazione effettuata');
            this.$router.push('/');

          } 
        ).catch( () => {
          alert('Username già esistente');
        });
  
        
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
  