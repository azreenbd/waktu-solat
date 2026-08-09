<template>
  <div id="app">
    <div class="d-flex justify-content-center" style="min-height: calc(100% - 10em)">
      <router-view :dark-mode="darkMode"></router-view>
    </div>
    <footer class="d-flex flex-column justify-content-center align-items-center text-muted py-4">
      <small>Tema</small>
      <label id="switch" class="switch mb-4">
        <input type="checkbox" v-model="darkModeSelected" @change="toggleDarkMode()" id="slider">
        <span class="slider round"></span>
      </label>
      <div>
        <a href="https://github.com/azreenbd" title="GitHub" target="_blank" class="text-muted"><b-icon icon="github" title="GitHub" class="mr-1"></b-icon></a>
        <a href="https://azreenbd.com" title="Azreenbd Website" target="_blank" class="text-muted">azreenbd.com</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { setCookie, getCookie } from "@/assets/js/cookie.js";

export default {
  name: 'App',
  data() {
    return {
      darkMode: false,
      darkModeSelected: this.darkMode
    }
  },
  created() {
    // check cookies for theme options
    switch(getCookie("theme")) {
      case "dark":
        this.darkMode = true;
        break;
      case "light":
        this.darkMode = false;
        break;
      default:
        this.darkMode = false;
    }
    this.darkModeSelected = this.darkMode;
  },
  mounted() {
    if(this.darkMode) {
      document.body.className = "dark";
    }
  },
  methods: {
    toggleDarkMode() {
      // toggle darkMode
      this.darkMode = !this.darkMode;

      // change background and set cookies on darkMode toggle
      if(this.darkMode) {
        setCookie("theme", "dark", 3650);
        document.body.className = "dark"
      }
      else {
        setCookie("theme", "light", 3650);
        document.body.classList.remove("dark");
      }
    }
  }
}
</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 58px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c5d7db;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 28px;
  width: 28px;
  left: 3px;
  bottom: 3px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  background: white url('~@/assets/img/brightness-high.svg');
  background-repeat: no-repeat;
  background-position: center;
}

input:checked + .slider {
  background-color: #303030;
}

input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
  background: #0f0f0f url('~@/assets/img/moon-stars-fill.svg');
  background-repeat: no-repeat;
  background-position: center;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
