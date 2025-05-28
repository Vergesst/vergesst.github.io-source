<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <a class="font-size=30px">V</a>
        <a class="font-size=20px">one</a>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div></div>
  </nav>
  <!-- Main element for site -->
  <RouterView class="container" />
</template>

<script setup lang="ts">

import { RouterView, useRouter } from 'vue-router'
import { Collapse } from 'bootstrap';

const router = useRouter()

const navigateAndCloseNav = (routePath: string) => {
  router.push(routePath);

  const navbarCollapse = document.getElementById("navbarNav");
  if (navbarCollapse && navbarCollapse.classList.contains("show")) {
    const bsCollapse = new Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();
  }
};

</script>