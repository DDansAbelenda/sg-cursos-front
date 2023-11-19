<template>
  <v-app>
    <NavBar/>
    <div class="content">
      <router-view />
    </div>
    <FooterPage />
  </v-app>
</template>

<script>
import FooterPage from './components/FooterPage.vue';
import NavBar from './components/NavBar.vue';
export default {
  components: {
    FooterPage,
    NavBar
  },
}
</script>

<style>
.content {
  margin-top: 3.5rem;
}
</style>

