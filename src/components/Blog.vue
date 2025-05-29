<template>
  <div style="padding: 15px" v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { marked } from 'marked'

// Define props for the component
const props = defineProps<{
  slug: string // Expecting a 'slug' prop of type string
}>()

const markdownContent = ref('')
const renderedMarkdown = computed(() => marked(markdownContent.value))

// Function to fetch the Markdown content based on the slug
const fetchMarkdown = async (slug: string) => {
  try {
    const response = await fetch(`/docs/${slug}.md`)
    console.log(`Fetching: /docs/${slug}.md`, response)

    // IMPORTANT: Check if the response is OK (status 200-299)
    // AND if the Content-Type header indicates it's a text/markdown or text/plain file.
    // This prevents rendering the fallback index.html content.
    const contentType = response.headers.get('Content-Type');

    if (response.ok && contentType && (contentType.includes('text/markdown') || contentType.includes('text/plain'))) {
      markdownContent.value = await response.text()
    } else if (response.status === 404) {
      // This branch might not be hit if your server always serves index.html for 404s
      console.error(`Blog post "${slug}" not found (404).`);
      markdownContent.value = `<h2 style="text-align: center;"><em style="color: red;">Error </em>: Blog post "${slug}" not found.</h2>`;
    } else {
      // This handles the common SPA fallback scenario where index.html is served with a 200 OK
      console.error(`Unexpected response for ${slug}. Content-Type: ${contentType}. Likely a fallback HTML page.`);
      markdownContent.value = `<h2 style="text-align: center;"><em style="color: red;">Error </em>: Blog post "${slug}" could not be loaded.</h2><p style=" text-align: center;">Please check the URL or ensure the post exists.</p>`;
    }
  } catch (error) {
    console.error("Error fetching markdown:", error);
    markdownContent.value = `<h2 style="text-align: center;"><em style="color: red;">Error </em>: Loading content failed.</h2><p style=" text-align: center;">An unexpected network error occurred.</p>`;
  }
}

// Fetch markdown when the component is mounted
onMounted(() => {
  fetchMarkdown(props.slug)
})

// Watch for changes in the slug prop (e.g., when navigating between posts)
watch(() => props.slug, (newSlug) => {
  fetchMarkdown(newSlug)
})
</script>

<style scoped></style>