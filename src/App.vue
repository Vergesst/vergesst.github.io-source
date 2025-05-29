<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <img style="margin-left: 40px" src="" alt="Logo" class="navbar-logo" /> -->
    <div class="navbar-div">
      <RouterLink class="navbar-brand" to="/">
        <span class="brand-v"><em>V</em></span>
        <span class="brand-one"><em>one</em></span>
      </RouterLink>
      <span><em>--- Vergisst' zone</em></span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
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

<style scoped>
/* In your main CSS file or a component-specific style block */
.brand-v {
  font-family: 'Montserrat', sans-serif;
  /* Example custom font */
  font-size: 40px;
  font-weight: 700;
  /* Bold */
  color: #007bff;
  /* Primary brand color */
}

.brand-one {
  font-family: 'Open Sans', sans-serif;
  /* Different font for contrast */
  font-size: 30px;
  color: #343a40;
  /* Darker text */
}

div.navbar-div {
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 280px;
}
</style>