  <template>
  <!-- <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/signup">Sign up</router-link> |
      <router-link to="/users">Show Users</router-link>
      
  </div> -->

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <!-- Container wrapper -->
  <div class="container-fluid">
   <!-- Collapsible wrapper -->
    <div
      class="collapse navbar-collapse justify-content-center"
      id="navbarCenteredExample"
    >
      <!-- Left links -->
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li v-if="storeUser.isLogged" class="nav-item">
            <div class="nav-link active" aria-current="page" to="/">Benvenuto, {{ storeUser.getUsername }}</div>
        </li>
        <li  class="nav-item" v-if="!storeUser.isLogged">
            <router-link class="nav-link active" aria-current="page" to="/">Login</router-link>
        </li>
        <li  class="nav-item" v-if="!storeUser.isLogged">
            <router-link class="nav-link active" aria-current="page" to="/signup">Signup</router-link>
        </li>
        <li class="nav-item" v-if="storeUser.isLogged">
            <router-link class="nav-link active" aria-current="page" to="/users">See all users</router-link>
        </li>

        <li class="nav-item" v-if = "storeUser.isLogged">
            <button class="btn btn-secondary" @click="logout">Logout</button>
        </li>
      </ul>
      <!-- Left links -->
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>

  <router-view />

</template>


<script>
import { useUserStore} from '@/store/userStore';



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
