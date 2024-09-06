<template>
  <div class="container">
    <!-- Header -->
    <MainHeader
      leftText="Assistenza"
      :showButton="true"
      :onButtonClick="requestSupport"
    />

    <!-- Main Content Area -->
    <div class="content">
      <!-- Content Container -->
      <div class="grid">
        <!-- Left Column -->
        <div class="left-column">
          <ProductList />
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <RightPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'; // Import lifecycle hooks
import MainHeader from '../../components/MainHeader.vue';
import ProductList from '../../components/HomeView/ProductList.vue';
import RightPanel from '../../components/HomeView/RightPanel.vue';

const requestSupport = () => {
  alert('Supporto richiesto.');
};

// Function to handle resizing
const handleResize = () => {
  const content = document.querySelector('.content');
  const viewportHeight = window.innerHeight;
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  content.style.height = `${viewportHeight - headerHeight}px`;
};

// Set initial height on mount
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

// Clean up on unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Full screen container */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #f7f7f7;
}

/* Header styling */
header {
  flex-shrink: 0;
}

/* Content area */
.content {
  flex: 1;
  display: flex;
}

/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  width: 100%;
}

/* Column styling */
.left-column, .right-column {
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
}

/* Specific widths for columns */
.left-column {
  background-color: #ffffff;
}

.right-column {
  background-color: #e5e5e5;
}

/* Responsive grid for large screens */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .right-column {
    display: flex;
  }
}
</style>
