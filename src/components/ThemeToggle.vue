<template>
    <div class="d-flex flex-column align-items-center text-muted mt-4">
        <small class="mb-1" aria-hidden="true">Tema</small>
        <label class="switch mb-0">
            <input type="checkbox" role="switch" aria-label="Mod gelap" :checked="dark" @change="setTheme(!dark)">
            <span class="slider round"></span>
        </label>
    </div>
</template>

<script>
import { theme, setTheme } from "@/assets/js/store.js";

export default {
    name: 'ThemeToggle',
    computed: {
        dark() {
            return theme.dark;
        }
    },
    methods: {
        setTheme
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

/* The input is invisible, so the slider carries its focus ring. */
input:focus-visible + .slider {
  outline: 2px solid #0adf3f;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .slider, .slider:before {
    -webkit-transition: none;
    transition: none;
  }
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
