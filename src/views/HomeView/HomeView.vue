<template>
  <div class="flex flex-col min-h-screen min-w-screen">
    <!-- Include Header Component -->
    <Header />

    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Include the ProductList Component -->
      <ProductList class="flex-1 overflow-auto" />

      <!-- Include the RightPanel Component -->
      <RightPanel class="hidden lg:block lg:w-1/4 xl:w-1/5" />
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/HomeView/Header.vue';
import ProductList from '../../components/HomeView/ProductList.vue';
import RightPanel from '../../components/HomeView/RightPanel.vue';
</script>

<style scoped>
@media (min-width: 1024px) {
  /* Larger screens */
  .right-panel {
    width: 20%;
  }
}

@media (min-width: 1280px) {
  /* Extra large screens */
  .right-panel {
    width: 16%;
  }
}
</style>
