<template>
  <div class="flex flex-col min-h-screen">
    <!-- Include Header Component -->
    <Header />

    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Include the ProductList Component -->
      <ProductList />

      <!-- Include the RightPanel Component -->
      <RightPanel />
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/HomeView/Header.vue';
import ProductList from '../../components/HomeView/ProductList.vue';
import RightPanel from '../../components/HomeView/RightPanel.vue'; // Import RightPanel component
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
