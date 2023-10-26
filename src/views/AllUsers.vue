<template>
    <div id="app">

      <h1>All users</h1>
      
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
        
        <button type="submit">Send token</button>
      </form>
  
    <br> 

      <div>
        <table class="center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Hashed password</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in usersReturned" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.password }}</td>
                    <td> <button class="deleteButton" @click="deleteUser(item.id)">Elimina</button></td>
                </tr>
            </tbody>
        </table>
        
      </div>

    </div>
</template>
  
  <script>
  
  import axios from 'axios';
  
  export default {
    name: 'AllUsers',

    data(){
          return {
              jwttoken: '', //v-model in template
              usersReturned: [] //users returned by the API
          }
    },


    methods: {
        onSubmit(e){
            e.preventDefault()
    
            if(!this.jwttoken){
                alert('Please insert a token')
                return
            }
    
            console.log(this.jwttoken);
            
            axios.get(
            "http://localhost:5000/users",
            {
                headers: {
                    "x-auth-token": this.jwttoken
                }
            }
            ).then(response =>{
                console.log(response);
                
                this.usersReturned = response.data;
            }
            ).catch(error => {
                
                // Handle the error here
                if (error.response) {
                    // The request was made, but the server responded with a status code other than 2xx
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                } else if (error.request) {
                    // The request was made, but no response was received
                    console.log('No response received');
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Error:', error.message);
                }
            });
    
            
            //clear the form
            this.username= '';
            this.password= '';
            
        },

        deleteUser(idToDelete){
        console.log('vuoi cancellare l utente ' + idToDelete);

        axios.delete(
            "http://localhost:5000/users/" + idToDelete,
            {
            }
            ).then(response =>{
                console.log(response);
            }
            )

    }
    }

    
  }
    
  </script>
  
  <style scoped>
  .center {
    margin-left: auto;
    margin-right: auto;
    }

    table{
    border:1px solid black;
    }

    table td{
    border:1px solid black;
    }

    .deleteButton{
        background-color: blue;
    }
  </style>
  