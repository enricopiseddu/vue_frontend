<template>
    <div id="app">

      <form @submit.prevent="onSubmit">
        <h1 class="mt-5">Update Password</h1>
        <div class="form-group">
            <label for="oldPassword">
              Old Password
              <input id="oldPassword" type="password" v-model="oldPassword" class="form-control" />
            </label>
        </div>

        <br>

        <div class="form-group">
          <label for="newPassword">
            New Password
            <input id="newPassword" type="password" v-model="newPassword" class="form-control" />
          </label>
        </div>

        <br>

        <div class="form-group">
          <label for="repeatedNewPassword">
            Repeat New Password
            <input id="repeatedNewPassword" type="password" v-model="repeatedNewPassword" class="form-control" />
          </label>
        </div>
        
        <br>
        
  
        <button type="submit" class="btn btn-success">Change Password</button>
      </form>
          
  
      
    </div>
</template>
  
<script>
  
  import { useUserStore} from '@/store/userStore';
  
  
  export default {
    name: 'NewPasswordPage',
    data(){
          return {
              storeUser : useUserStore(),
              oldPassword: '',
              newPassword: '',
              repeatedNewPassword: ''
          }
    },

    props: {
    },

    methods: {
        async onSubmit(){
            if (!this.oldPassword){
              alert('Please insert old password')
              return  
            }
            if (!this.newPassword){
              alert('Please insert new password')
              return  
            }
            if (!this.repeatedNewPassword){
              alert('Please repeat the password')
              return  
            }

            if (this.newPassword != this.repeatedNewPassword){
                alert('repeated password does not match');
            }else{
                await this.storeUser.updatePassword(this.oldPassword, this.newPassword);
            }  
        }
    }
  }
</script>
  
<style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
  

</style>  