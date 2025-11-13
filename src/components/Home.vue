<template>
  <div>
    <div style="">
      <a style="font-size: 40px; color: red; text-decoration: none; text-align: center; display: block; margin-top: 50px; margin-bottom: 20px;"
        class="home-title" href="/">
        <em>Welcome!</em>
      </a>
      <p style="text-align: center; font-size: 20px">
        {{ $t('home.welcomeMessage') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<style scoped>
.home-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>