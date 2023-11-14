<template>
    <div id="app">
        <h1 class="mt-5">My posts</h1>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Creation</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in this.personalPosts" :key="post.id">
                    <th scope="row">{{ post.title }}</th>
                    <td> <div v-html="post.notes"></div> </td>
                    <td>{{ post.date }}</td>
                    <td> <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>

    </div>

</template>


<script>


//import axios from 'axios';
  import { useUserStore} from '@/store/userStore';


  export default {
    name: 'MyPosts',

    data(){
          return {
              storeUser : useUserStore(),
              personalPosts: []
          }
    },


    async mounted(){
        this.personalPosts = await this.storeUser.getPersonalPosts();
    },

    methods: {
        async deletePost(_id){

        if(confirm('Vuoi cancellare il post?'))
            try{
                await this.storeUser.deletePost(_id)
                alert('Post cancellato')
                this.$router.go() //reload the page

            }catch (error){
                console.log(error);
            }
        }

    }

    
  }
    
  </script>
  
  <style scoped>

  </style>
