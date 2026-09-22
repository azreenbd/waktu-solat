<template>
  <div id="app">
    <div class="d-flex justify-content-center flex-grow-1">
      <router-view :dark-mode="darkMode"></router-view>
    </div>
    <footer class="d-flex flex-column justify-content-center align-items-center text-muted py-4">
      <nav v-if="footerLinks.towns.length" class="town-links text-center mb-4 px-3" aria-label="Bandar lain">
        <h2 class="h6 mb-2">Waktu solat di {{ footerLinks.state }}</h2>
        <small>
          <router-link v-for="town in footerLinks.towns" :key="town.key" :to="town.path" class="mx-2 d-inline-block mb-1">{{ town.name }}</router-link>
        </small>
      </nav>

      <div>
        <a href="https://github.com/azreenbd" title="GitHub" target="_blank" class="text-muted"><b-icon icon="github" title="GitHub" class="mr-1"></b-icon></a>
        <a href="https://azreenbd.com" title="Azreenbd Website" target="_blank" class="text-muted">azreenbd.com</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { footerLinks, loadTheme, theme } from "@/assets/js/store.js";

export default {
  name: 'App',
  data() {
    return {
      footerLinks
    }
  },
  computed: {
    darkMode() {
      return theme.dark;
    }
  },
  created() {
    loadTheme();
  }
}
</script>

<style>
.town-links {
  max-width: 100ch;
  margin-inline: auto;
  text-wrap: balance;
}

.town-links a {
  color: #afbfc4;
}

.town-links a:hover, .town-links a:focus {
  color: #0adf3f;
  text-decoration: none;
}

</style>
