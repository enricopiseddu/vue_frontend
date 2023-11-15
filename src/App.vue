  <template>
  

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  <div class="container-fluid">
   
    <div
      class="collapse navbar-collapse justify-content-center"
      id="navbarCenteredExample"
    >
      
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li v-if="storeUser.isLogged()" class="nav-item">
            <div class="nav-link active" aria-current="page" to="/">Benvenuto, {{ storeUser.getUsername }}</div>
        </li>
        
        <li  class="nav-item" v-if="!storeUser.isLogged()">
            <router-link class="nav-link active" aria-current="page" to="/">Login</router-link>
        </li>
        <li  class="nav-item" v-if="!storeUser.isLogged()">
            <router-link class="nav-link active" aria-current="page" to="/signup">Signup</router-link>
        </li>
        <li class="nav-item" v-if="storeUser.isLogged()">
            <router-link class="nav-link active" aria-current="page" to="/users">See all users</router-link>
        </li>


        <div class="dropdown" v-if="storeUser.isLogged()">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Posts
            </button>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="dropdown-item" >
                  <router-link class="nav-link active" aria-current="page" to="/posts">See all posts</router-link>
                </li>

                <li class="dropdown-item" >
                  <router-link class="nav-link active" aria-current="page" to="/newPost">Create a post</router-link>
                </li>

                <li class="dropdown-item">
                  <router-link class="nav-link active" aria-current="page" to="/myPosts">Your posts</router-link>
                </li>
            </div>
        </div>
        


        <div class="dropdown" v-if="storeUser.isLogged()">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Profile
            </button>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

              <li  class="dropdown-item">
                <router-link class="nav-link active" aria-current="page" to="/updatePassword">Update Password</router-link>
              </li>
                
            </div>
        </div>
        
        

        <li class="nav-item" v-if = "storeUser.isLogged()">
            <button class="btn btn-secondary" @click="logout">Logout</button>
        </li>

      </ul>
      
    </div>
    
  </div>
 
</nav>

  <router-view />
  
</template>


<script>
import { useUserStore} from '@/store/userStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default {
  name: 'App',

  data(){
          return{
              storeUser : useUserStore()
          }
    },

  methods:{
       logout(){
        this.storeUser.logout();

        this.$router.push('/');
      }
    },
    
  components: {
  }
}
</script>

<style>


</style>
