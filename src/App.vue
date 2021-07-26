<template>
  <Nav/>
  <router-view/>
  <Footer/>

</template>
<script lang="ts">

import { defineComponent, onMounted } from 'vue'
import userStore from '@/stores/user'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'



export default defineComponent({
  name: 'App',
  components: { Nav,
    Footer, },
  setup() {
    // if(localStorage.getItem('token')){
    //   userStore.getUser()
    //   router.push("products");
    // }
    onMounted(userStore.getUser)
    return { userStore }
  }
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

</style>
