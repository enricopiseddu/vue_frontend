<template>
    <div id="app">

      <h1 class="mt-16">All users</h1>
      
      <form @submit.prevent="onSubmit" class="bg-white px-3 pt-6 pb-8">
        
        <div class="mx-auto">
            <div class="mt-2">
                <label class="me-auto text-gray-700 text-sm font-bold mb-2"> Insert your JWT to see all users </label>
            </div>
            <input type="text" v-model="jwttoken" class="mt-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <button type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800">Send token</button>
      </form>


      <div>
        <table class="m-6 text-sm text-left text-gray-500 rounded-md center border-spacing-0">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3"> 
                        ID 
                    </th>
                    <th scope="col" class="px-6 py-3"> 
                        Username 
                    </th>
                    <th scope="col" class="px-6 py-3"> 
                        Hashed password 
                    </th>
                    <th scope="col" class="px-6 py-3"> 
                        Azioni 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in usersReturned" :key="item.id" class="bg-white border-b">
                    <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {{ item.id }}
                    </td>
                    <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {{ item.username }}
                    </td>
                    <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {{ item.password }}
                    </td>
                    <td> 
                        <button type="button" class="mt-0 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 focus:outline-none dark:focus:ring-blue-800" @click="deleteUser(item.id)">Elimina</button></td>
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
  