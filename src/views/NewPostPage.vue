<template>
    <div id="app" class="text-center">

      <h1 class="mt-5">New Post</h1>

      <form @submit.prevent="onSumbit" class="my-4">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" placeholder="Title" v-model="title">
            </div>
          </div>
        </div>
  
        <br>

        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="form-group">
              <label for="notes">Notes</label>
              <Editor v-model="notes"/>
            </div>
          </div>
        </div>

        <br> 
        <button type="submit" class="btn btn-primary">Publish</button>
      </form>
    </div>
  </template>
  
  
  <script>
  
  import { useUserStore} from '@/store/userStore';
  import Editor from '@tinymce/tinymce-vue';
  
  
  export default {
    name: 'NewPostpage',

    data(){
          return {
              title: '', //v-model in template
              notes: '',
              storeUser : useUserStore(),
              
              tinyOptions: {
                    'height': 500
            }
          }
    },

    components:{
        Editor
    },

    props: {
    },

    methods: {
        async onSumbit(){
            if(!this.title){
                alert('Please insert a title');
                return
            }

            
            if(!this.notes){
                alert('Please insert notes');
                return
            }

            if (confirm("Vuoi pubblicare il post?")){    
                await this.storeUser.publishPost(this.title, this.notes);
            }
        },

        
      
    }
  }


  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';


   </style>