<template>
  <div class="aboutUs">
    <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>