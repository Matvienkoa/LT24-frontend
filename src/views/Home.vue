<template>
  <div class="home">
    <Nav/>
    <img id="logo" src="../assets/logo.png" alt="">
    <h1>Bonjour et Bienvenue!</h1>
    <span id="border"></span>
    <AddColis v-if="currentUser.role === 'admin'" />
    <ColisList v-if="currentUser.role === 'admin'" />
    <SearchColis v-if="currentUser.role === 'client'" />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import AddColis from '@/components/AddColis.vue';
import ColisList from '@/components/ColisList.vue';
import SearchColis from '@/components/SearchColis.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Nav,
    AddColis,
    ColisList,
    SearchColis
  },
  computed: {
    ...mapState([
      'currentUser'
    ])
  },
  created: function() {
    this.$store.dispatch('getCurrentUser');
  }
}
</script>

<style scoped>
  #logo{
    display: block;
    margin: auto;
    margin-top: 10px;
    width: 120px;
  }
  h1{
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 1.7rem;
    color: #1c5d85;
  }
  #border{
    width: 300px;
    display: block;
    margin: auto;
    margin-bottom: 40px;
    border-bottom: 2px solid #2677a9;
    height: 3px;
  }
</style>
