<template>
    <div class="p-3 max-width">
        <div class="d-flex align-items-center h-100">
            <div>
                <div class="d-flex align-items-end m-1 mb-3">
                    <logo class="mr-1" />
                    <h1 class="h2 m-0">Ralat 404</h1>
                </div>

                <div class="box text-center py-3 px-5" :class="{ dark: darkMode }">
                    <p class="mb-4">Harap maaf, halaman yang anda cari tidak dijumpai.</p>
                    <router-link to="/" class="pill-link" :class="{ dark: darkMode }">Kembali ke laman utama</router-link>
                </div>

                <theme-toggle />
            </div>
        </div>
    </div>
</template>

<script>
import { setHead } from "@/assets/js/head.js";
import Logo from "@/components/Logo.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
    name: 'NotFound',
    components: { Logo, ThemeToggle },
    props: ['dark-mode'],
    mounted() {
        setHead({
            path: '/404/',
            title: 'Halaman Tidak Dijumpai - Waktu Solat',
            description: 'Halaman yang anda cari tidak wujud.'
        });
    }
}
</script>
