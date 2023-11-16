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
                    <td>{{ printDate(post.date) }}</td>
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
        printDate(_date){
        const day = new Date(_date).getUTCDate();
        const month = new Date(_date).getMonth() + 1;
        const year = new Date(_date).getFullYear();

        let hours = new Date(_date).getHours();
        let mins = new Date(_date).getMinutes();

        //adjust format
        if (hours < 10){ hours = "0" + hours}
        if (mins  < 10){ mins = "0" + mins}

        return day + "/" + month + "/" + year + " at " + hours + ":" + mins;

      },
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
