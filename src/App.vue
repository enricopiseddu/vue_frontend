  <template>

  <nav class="flex items-center justify-between flex-wrap bg-blue-600 p-2">

    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span> My app </span>
    </div>

    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      
      <div class="text-sm lg:flex-grow">
        <router-link to="/" class="block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Login</router-link>
        <router-link to="/signup" class="block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Sign up</router-link>
        <router-link to="/users" class="block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Show Users</router-link>
      </div>

    </div>
      
      
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
