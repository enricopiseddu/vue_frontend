<template>
    <div id="app">

      <h1 class="mt-5">Public posts</h1>

      <button @click="paginaPrecedente" :disabled="paginaCorrente === 1" type="button" class="btn btn-dark"> Prev </button>
        <span class="border">{{ paginaCorrente }}</span>
      <button @click="paginaSuccessiva" :disabled="paginaCorrente === totalePagine" type="button" class="btn btn-dark"> Next </button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Creation</th>
            <th scope="col">Published by</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <th scope="row">{{ post.title }}</th>
            <td> <div v-html="post.notes"></div> </td>
            <td>{{ this.printDate(post.date) }}</td>

            <td>{{ post.user.username }}</td>
          </tr>
        </tbody>
      </table>

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
              paginaCorrente: 1,
              totalePagine: 10,
              limiteElementiTabella: 3,
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
      
      const res = await axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/paginated',
            {
              params:{ //uso dei parametri di query perché la richiesta è una GET
                page: 1,
                perPage: this.limiteElementiTabella
              }
            }
      );

      this.posts = res.data.posts;
      
      //limita il totale delle pagine
      this.totalePagine = Math.ceil(res.data.numberOfPosts / this.limiteElementiTabella);
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
      
      async paginaPrecedente(){
        this.paginaCorrente --;
        const res = await axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/paginated',
            {
              params:{ //uso dei parametri di query perché la richiesta è una GET
                page: this.paginaCorrente,
                perPage: this.limiteElementiTabella
              }
            }
        );
        this.posts = res.data.posts;
      },

      async paginaSuccessiva(){
        this.paginaCorrente ++;
        const res = await axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/paginated',
            {
              params:{ //uso dei parametri di query perché la richiesta è una GET
                page: this.paginaCorrente,
                perPage: this.limiteElementiTabella
              }
            } 
        );
        
        this.posts = res.data.posts;
      }
    }
  }
  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

   </style>
  