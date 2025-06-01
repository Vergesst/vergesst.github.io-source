<template>
  <div>
    <div style="padding: 20px;">
      <p class="friends-title"><em>Friends' Links</em></p>
    </div>
    <div style="display: flex; justify-content: center;">
      <ul
        style="display: flex; flex-wrap: wrap; list-style-type: none; padding: 0; margin: 0; justify-content: center;">
        <li>
          <a href="https://github.com/candlest">
            <img src="https://avatars.githubusercontent.com/u/125652899?v=4" alt="Candlest GitHub Profile"
              style="border-radius: 50%; height: 80px; width: 80px;">
          </a>
          <a href="https://blog.candlest.cc" class="friends-link">Candlest</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Your script setup here
</script>

<style scoped>
.friends-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: #343a40;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

/* Key styles for centering the image and text within each list item */
li {
  display: flex;
  /* Makes the list item a flex container */
  flex-direction: column;
  /* Stacks children (image link and text link) vertically */
  align-items: center;
  /* Centers children horizontally along the cross-axis */
  margin: 10px;
  /* Add some space between list items */
  padding: 5px;
  /* Optional: Add some padding inside each list item */
}

/* Styles for the text link */
.friends-link {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  text-decoration: none;
  color: #343a40;
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
  /* Adds a small gap between the image and the text */
}

/* Styles for the image link's padding, if desired */
li a {
  padding: 0;
  /* Remove padding from the <a> tag around the image if you don't want extra space around the circular image itself */
}
</style>