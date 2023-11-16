<template>
    <div id="app">

      <h1 class="mt-5">Public posts</h1>

      <div class="row justify-content-center mx-auto w-25">
        <div class="input-group">
          <input type="search" class="form-control rounded" placeholder="Search content" aria-label="Search" aria-describedby="search-addon" v-model="querySearch" />
          <button @click="searchPosts" type="button" class="btn btn-outline-primary">Search</button>
        </div>
      </div>
      
    
    
    

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

      <br>

      <button @click="paginaPrecedente" :disabled="paginaCorrente === 1" type="button" class="btn btn-dark"> Prev </button>
        <span class="border">{{ paginaCorrente }}</span>
      <button @click="paginaSuccessiva" :disabled="paginaCorrente === totalePagine" type="button" class="btn btn-dark"> Next </button>

      <br>
      <p>Limita risultati per pagina</p>
      <select class="form-select mx-auto w-25 mt-2 mb-2" aria-label="Default select example" v-model="limiteElementiTabella">
        <option value=2>2 risultati per pagina</option>
        <option value=4>4 risultati per pagina</option>
        <option value=6>6 risultati per pagina</option>
    </select>

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
              querySearch : '',
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
        //limita il totale delle pagine
        this.totalePagine = Math.ceil(res.data.numberOfPosts / this.limiteElementiTabella);
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
        //limita il totale delle pagine
      this.totalePagine = Math.ceil(res.data.numberOfPosts / this.limiteElementiTabella);
      },


      async searchPosts(){
        //console.log('click on search with value ', this.querySearch);

        const results = await axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/search',
            {
              params:{ //uso dei parametri di query perché la richiesta è una GET
                string: this.querySearch,
              }
            }
        );
        
        console.log(results);

        this.posts = results.data
      }
    }
  }
  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

   </style>
  