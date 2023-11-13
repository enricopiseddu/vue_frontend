<template>
    <div id="app">

      <h1 class="mt-5">Public posts</h1>

      <div v-for="post in this.posts.data" :key="post.id">
        <hr>
          <h3>{{post.title}}</h3>
          <h5>Author: {{post.user.username}} - Date: {{post.date}}</h5>
          <p> {{ post.notes }}</p>
        <hr>
      </div>
          
  
      
    </div>
</template>
  
  <script>
  
  import { useUserStore} from '@/store/userStore';
  import axios from 'axios';
  
  
  export default {
    name: 'PostsPage',
    data(){
          return {
              posts: [],
              storeUser : useUserStore()
          }
    },

    props: {
    },

    async mounted(){
      console.log('mounted')
      if(!this.storeUser.isLogged()){
              alert('Session expired. Please log in');
              this.$router.push('/');
            }
      
      this.posts = await axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/all')
      console.log(this.posts.data);
      console.log(this.posts.data[0])
    },

    methods: {

      
    }
  }
  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

   </style>
  