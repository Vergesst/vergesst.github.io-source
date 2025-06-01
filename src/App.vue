<template>
  <nav class="navbar navbar-expand-lg navbar-light frosted-navbar">
    <div class="container-fluid navbar-div" style="align-items: center;">
      <RouterLink class="navbar-brand" to="/">
        <span class="brand-v"><em>V</em></span>
        <span class="brand-one"><em>one</em></span>
      </RouterLink>
      <span style="margin-bottom: -1%"><em> ---Vergisst' zone</em></span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto navbar-link">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle font-semibold" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <em> Posts </em>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="post in blogPosts" :key="post.slug">
                <RouterLink class="dropdown-item" :to="`/blog/${post.slug}`"
                  @click="navigateAndCloseNav(`/blog/${post.slug}`)">
                  {{ post.title }}
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <em>
              <RouterLink to='/about' class="nav-link font-semibold about-link">About</RouterLink>
            </em>
          </li>
          <li class="nav-item">
            <em>
              <RouterLink to='/friends' class="nav-link font-semibold about-link">Friends</RouterLink>
            </em>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="main-content-wrapper">
    <RouterView class="container content-full-height" />
  </main>

  <div style="color: white; margin-bottom: 0">
    <footer class="text-center mt-4">
      <p class="text-muted">© 2023~2025 Vergisst' zone. All rights reserved.</p>
      <small class="text-muted">
        <em>Powered by <a href="https://vuejs.org/">Vue 3</a>, <a href="https://getbootstrap.com/">Bootstrap 5</a>,
          and <a href="https://marked.js.org/">marked</a></em>
      </small>
    </footer>
    <br>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRouter, RouterLink } from 'vue-router'
import { Collapse } from 'bootstrap';

const router = useRouter()

const blogPosts = ref([
  { slug: 'sample', title: 'Sample Markdown Post' },
  { slug: 'preface', title: 'Preface to all the Times' },
  { slug: 'test', title: 'Test Post' },
]);

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

<style>
/* Global Styles (no 'scoped' keyword) */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  /* Make sure body takes full viewport height for flexbox to work */
  display: flex;
  flex-direction: column;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  z-index: -1;
}

/* Remove body display flex here if you defined it above */
/* If you keep it here, ensure it's not duplicated or conflicting */
/* body {
    display: flex;
    flex-direction: column;
} */
/* This block can be removed if already in html, body */
</style>

<style scoped>
/* Scoped Styles (specific to this App.vue component) */

/* Navbar styles */
.frosted-navbar {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
}

/* Main content wrapper */
.main-content-wrapper {
  flex-grow: 1;
  /* This is the key: makes it expand and push the footer down */
  display: flex;
  flex-direction: column;
  margin-top: 85px;
  /* Adjust based on your actual navbar height */
}

/* Frosted glass for the main content area (RouterView) */
.content-full-height {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;

  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  padding-left: var(--bs-gutter-x, 0.75rem);
  padding-right: var(--bs-gutter-x, 0.75rem);

  padding-top: 0;
  padding-bottom: 0;

  position: relative;
  z-index: 1;
}

/* Dropdown menu specific z-index */
.dropdown-menu {
  --bs-dropdown-bg: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Brand styling */
.brand-v {
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #007bff;
}

.brand-one {
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
  color: #343a40;
}

div.navbar-div {
  margin-left: 18%;
}

.navbar-link {
  font-size: 20px;
  margin-right: 30%;
}

.font-semibold {
  font-weight: 600;
}

/* Specific styling for the 'About' link */
.nav-link {
  color: inherit;
}

.about-link {
  color: #343a40;
  text-decoration: none;
  font-weight: 600;
}
</style>