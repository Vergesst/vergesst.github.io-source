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
  /* Ensure html and body take full viewport height */
  margin: 0;
  /* Remove default margins */
  padding: 0;
  /* Remove default padding */
  box-sizing: border-box;
  /* Include padding and border in the element's total width and height */
  font-family: sans-serif;
  /* Good practice for default font */
  /* REMOVED background-image, background-size, etc. as they are in main.css */
}

body {
  display: flex;
  /* Enable flexbox for overall page layout */
  flex-direction: column;
  /* Stack children vertically */
}

/* This is the transparent overlay *on top of* your main.css background */
body::before {
  content: '';
  position: fixed;
  /* Stays fixed over the background image */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  /* Subtle dark overlay */
  z-index: -1;
  /* Ensures it's at the very bottom, just above the actual body background */
}
</style>

<style scoped>
/* Scoped Styles (specific to this App.vue component) */

/* Navbar styles */
.frosted-navbar {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  /* Makes the navbar fixed at the top */
  top: 0;
  width: 100%;
  z-index: 1030;
  /* Ensures it's on top of all other content */
}

/* Main content wrapper */
.main-content-wrapper {
  flex-grow: 1;
  /* This wrapper takes the remaining vertical space */
  display: flex;
  /* Make it a flex container to manage its child (RouterView) */
  flex-direction: column;
  /* Stack RouterView vertically within it */
  /* IMPORTANT: Adjust this margin-top based on your actual navbar height.
     Measure your navbar's height in the browser's developer tools and set this value. */
  margin-top: 85px;
  /* Example: If navbar is approx 60px, add 20px buffer */
}

/* Frosted glass for the main content area (RouterView) */
.content-full-height {
  /* temporary fix */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  /* Add border to the top of content area */
  border-radius: 8px;
  /* Ensure this also applies to top corners */
  /* If content has border-radius, it might clip the top border,
         so ensure the border-radius is also applied to the content-full-height. */

  flex-grow: 1;
  /* RouterView itself grows within the main-content-wrapper */
  min-height: 0;
  /* Allows flex item to shrink properly if content is very short */
  overflow-y: auto;
  /* Enables scrolling within this area if content overflows */

  background-color: rgba(255, 255, 255, 0.3);
  /* Frosted glass effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  /* Horizontal padding from Bootstrap's .container is still applied */
  padding-left: var(--bs-gutter-x, 0.75rem);
  padding-right: var(--bs-gutter-x, 0.75rem);

  /* Vertical padding removed here. Apply it inside your specific page components
     (e.g., in a wrapper div in Preface.vue) to ensure the frosted background
     extends to the very bottom of the allocated space. */
  padding-top: 0;
  padding-bottom: 0;

  position: relative;
  /* Essential for z-index to work on this layer */
  z-index: 1;
  /* Places it above the background but below the fixed navbar */
}

/* Dropdown menu specific z-index (Bootstrap usually handles this, but higher z-index on parent .frosted-navbar is key) */
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