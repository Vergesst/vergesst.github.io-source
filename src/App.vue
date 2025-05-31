<template>
  <nav class="navbar navbar-expand-lg navbar-light frosted-navbar">
    <div class="navbar-div" style="align-items: center;">
      <RouterLink class="navbar-brand" to="/">
        <span class="brand-v"><em>V</em></span>
        <span class="brand-one"><em>one</em></span>
      </RouterLink>
      <span><em>--- Vergisst' zone</em></span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto navbar-link">
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/blog" @click="navigateAndCloseNav('/blog')">All Blogs</RouterLink>
          </li> -->

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Posts
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
          <!-- about page -->
          <li>
            <em>
              <a href="/#/about" class="font-semibold">About</a>
            </em>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView class="container" />
</template>

<script setup lang="ts">
import { ref } from 'vue'; // Import ref for reactive data
import { RouterView, useRouter, RouterLink } from 'vue-router' // Ensure RouterLink is imported
import { Collapse } from 'bootstrap'; // Make sure Bootstrap JS is loaded globally or via import

const router = useRouter()

// In a real application, you'd fetch this from an API or a static JSON file
// generated from your Markdown files. For now, hardcode it.
const blogPosts = ref([
  { slug: 'sample', title: 'Sample Markdown Post' },
  { slug: 'preface', title: 'Preface to all the Times' }
]);


const navigateAndCloseNav = (routePath: string) => {
  router.push(routePath);

  const navbarCollapse = document.getElementById("navbarNav");
  // Check if the navbar is actually collapsed and open before trying to hide it
  if (navbarCollapse && navbarCollapse.classList.contains("show")) {
    // Bootstrap's Collapse class needs to be instantiated on the element
    // Ensure you have Bootstrap's JS loaded for this to work.
    const bsCollapse = new Collapse(navbarCollapse, {
      toggle: false, // Don't toggle it, just create the instance
    });
    bsCollapse.hide(); // Explicitly hide it
  }
};

</script>

<style scoped>
/* Add the frosted glass effect here */
.frosted-navbar {
  background-color: rgba(255, 255, 255, 0.5);
  /* Semi-transparent background */
  backdrop-filter: blur(10px);
  /* Adjust the blur intensity as needed */
  -webkit-backdrop-filter: blur(10px);
  /* For Safari support */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  /* Optional: subtle border */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Optional: subtle shadow */
}

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
  margin-top: 1%;
  margin-bottom: 0.5%;
  margin-left: 10%;
}

/* Adjustments for the dropdown if needed for positioning/styling */
.dropdown-menu {
  --bs-dropdown-bg: rgba(255, 255, 255, 0.9);
  /* Slightly less transparent */
  backdrop-filter: blur(8px);
  /* Apply blur to dropdown as well */
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.navbar-link {
  font-size: 20px;
}

/* Custom styles for the About link */
.text-blue-600 {
  color: #2563eb;
  /* Tailwind's blue-600 */
}

.hover\:text-blue-800:hover {
  color: #1e40af;
  /* Tailwind's blue-800 */
}

.font-semibold {
  font-weight: 600;
  /* Tailwind's font-semibold */
}
</style>