<template>
    <div id="app">

      <h1 class="mt-5">All users</h1>
         
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Hashed password</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in storeUser.getListOfUsers" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.username }}</td>
                    <td>{{ item.hashedPassword }}</td>
                </tr>
            </tbody>
        </table>
        
      </div>

    
</template>
  
  <script>
  
  
  import { useUserStore} from '@/store/userStore';
 


  export default {
    name: 'AllUsers',

    data(){
          return {
              jwttoken: '', //v-model in template
              usersReturned: [], //users returned by the API
              storeUser : useUserStore()
          }
    },

    async mounted(){
      if(!this.storeUser.isLogged()){
         alert('Session expired. Please log in');
         this.$router.push('/');
      }
      
      this.usersReturned = await this.storeUser.getAllUsers();
    },

    methods: {
    }

    
  }
    
  </script>
  
  <style scoped>
 
  @import 'bootstrap/dist/css/bootstrap.css';
  
  </style>
