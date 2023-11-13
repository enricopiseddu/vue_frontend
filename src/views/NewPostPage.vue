<template>
    <div id="app" class="text-center">

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
              <textarea class="form-control" id="notes" rows="10" placeholder="Your text" v-model="notes"></textarea>
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
 
  
  
  export default {
    name: 'NewPostpage',
    data(){
          return {
              title: '', //v-model in template
              notes: '',
              storeUser : useUserStore()
          }
    },

    props: {
    },

    methods: {
        onSumbit(){
            
            console.log('click on form')

            if(!this.title){
                alert('Please insert a title');
                return
            }

            
            if(!this.notes){
                alert('Please insert notes');
                return
            }
             console.log('check ok')
        }
      
    }
  }


  </script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

   </style>