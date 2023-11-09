<template>
    <div id="app">

      <h1 class="mt-5">All users</h1>
      
      <form @submit.prevent="onSubmit">
        
        <div>
            <label>
              Insert your JWT to see all users
              <div>
                <input type="text" v-model="jwttoken" />
              </div>
            </label>
        </div>

        <br>
        
        <button type="submit" class="btn btn-secondary">Send token</button>
      </form>
  
    <br> 
    
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Hashed password</th>
                    <th scope="col">Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in storeUser.getListOfUsers" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.username }}</td>
                    <td>{{ item.hashedPassword }}</td>
                    <td> <button class="btn btn-danger" @click="deleteUser(item.id)">Elimina</button></td>
                </tr>
            </tbody>
        </table>
        
      </div>

    
</template>
  
  <script>
  
  import axios from 'axios';
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


    methods: {
        async onSubmit(){
              
            if(!this.jwttoken){
                alert('Please insert a token')
                return
            }

            if(!this.storeUser.isLogged()){
              alert('Session expired. Please log in');
              this.$router.push('/');
            }
    
            //console.log(this.jwttoken);


            await this.storeUser.getAllUsers(this.jwttoken);

            //console.log(this.storeUser.getAllUsers);
                      
            //clear the form
            this.username= '';
            this.password= '';
            
        },

        async deleteUser(idToDelete){
          

          if(this.storeUser.isLogged()){

            if(confirm('Vuoi cancellare l\'utente con id ' + idToDelete + ' ?')){

              try{
                const response = await axios.delete(
                    process.env.VUE_APP_BACKEND_URL + 'users/' + idToDelete,
                    {}
                )
                console.log(response)
                alert('Utente cancellato correttamente.')
              }catch( error ){
                  if (error.code === "ERR_BAD_RESPONSE"){
                    alert('Internal error')
                  }
                  else{
                    alert(error.data)
                  }
 
              }
                
            }
            else{
              alert('Session expired. Please log in');
              this.$router.push('/');
          }
        }
        }
    }

    
  }
    
  </script>
  
  <style scoped>

  </style>
