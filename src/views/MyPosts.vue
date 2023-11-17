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
                    <td> 
                        <button class="btn btn-outline-primary" @click="editPost(post.id, post.title, post.notes)">Edit</button>
                        <button class="btn btn-outline-danger ms-2" @click="deletePost(post.id)" title="Delete">X</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <br>
        <form v-if="visibilityForm" @submit.prevent="onSumbit" class="my-4">
            <h3 class="mt-5">Edit Post</h3>
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" placeholder="Title" v-model="titleToEdit">
            </div>
          </div>
        </div>
  
        <br>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="form-group">
                        <label for="notes">Notes</label>
                        <Editor v-model="notesToEdit"/>
                    </div>
                </div>
            </div>
            <br> 
        <button type="submit" class="btn btn-primary">Edit post</button>
      </form>

        </div>

</template>


<script>


//import axios from 'axios';
  import { useUserStore} from '@/store/userStore';
  import Editor from '@tinymce/tinymce-vue';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import axios from 'axios';


  export default {
    name: 'MyPosts',

    data(){
          return {
              storeUser : useUserStore(),
              personalPosts: [],
              visibilityForm: false,

              idPostToEdit: '',
              titleToEdit: '',
              notesToEdit: '',

        }
    },

    components:{
        Editor
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
        },

        editPost(_id, _actualTitle, _actualNotes){
            if(this.visibilityForm){
                this.visibilityForm = false;
                return
            }

            console.log('edit post with id: ', _id, _actualTitle, _actualNotes, )
            this.visibilityForm = true;
            this.titleToEdit = _actualTitle;
            this.notesToEdit = _actualNotes;
            this.idPostToEdit = _id;
        },

        async onSumbit(){
            if(!this.titleToEdit){
                alert('Insert a title')
                return
            }

            if(!this.notesToEdit){
                alert('Insert notes')
                return
            }
            
            try{
                const response = await axios.put(
                process.env.VUE_APP_BACKEND_URL + 'posts/update/' + this.idPostToEdit,
                { //body
                    title: this.titleToEdit,
                    notes: this.notesToEdit,
                },
                {
                    headers: {
                    "x-auth-token": this.storeUser.jwt
                    }
                }
                );
                console.log(response)
                alert('Post updated correctly')

            }catch( error ) {
                console.log(error)
                alert('Error ' + error.response.status + ' ' + error.response.data);
            }
        }
    }
  }
    
  </script>
  
  <style scoped>

  </style>
