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
  
  import { useUserStore} from '@/store/userStore';
 
  
  
  export default {
    name: 'LoginForm',
    data(){
          return {
              username: '', //v-model in template
              password: '',
              storeUser : useUserStore()
          }
    },

    props: {
    },

    methods: {

      async onSubmit(e){
        e.preventDefault()

        if(!this.username){
            alert('Please insert username')
            return
        }
  
        if(!this.password){
            alert('Please insert password')
            return
        }
  
        console.log('data from the form:' +this.username + ' ' + this.password);
  
        
        const logged = await this.storeUser.login(this.username, this.password);

        if(logged){
          this.$router.push('/users');
        }
        
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
  