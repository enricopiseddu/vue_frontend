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
        <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Login</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/signup">Signup</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/users">See all users</router-link>
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

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>

</style>
