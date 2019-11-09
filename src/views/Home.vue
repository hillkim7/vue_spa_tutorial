<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Status msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Status from '@/components/Status.vue'

export default {
  name: 'home',
  components: {
    Status
  }
}
</script>
