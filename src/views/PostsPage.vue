<template>
    <div id="app">

      <h1 class="mt-5">Public posts</h1>

      <div v-for="post in this.posts.data" :key="post.id">
        <hr>
          <h3>{{post.title}}</h3>
          <h5>Author: {{post.user.username}} - Date: {{ this.printDate(post.date) }}</h5>
          <!-- <p> {{ post.notes }}</p> -->
          <div v-html="post.notes"> </div>
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
      if(!this.storeUser.isLogged()){
              alert('Session expired. Please log in');
              this.$router.push('/');
      }
      
      this.posts = await axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/all')
    },

    methods: {
      printDate(_date){
        const day = new Date(_date).getDay();
        const month = new Date(_date).getMonth();
        const year = new Date(_date).getFullYear();

        const hours = new Date(_date).getHours();
        const mins = new Date(_date).getMinutes();

        return day + "/" + month + "/" + year + " at " + hours + ":" + mins;

      }
      
    }
  }
  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

   </style>
  