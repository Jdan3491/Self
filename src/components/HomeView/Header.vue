<template>
  <header class="flex justify-between items-center p-4 bg-white shadow-md h-[10vh]">
    <div class="flex items-center gap-4">
      <img src="@/assets/Flag_of_Italy.svg" alt="Flag of Italy" class="w-12 h-12 rounded-full border-2 border-gray-300 shadow-md object-cover" />
      <el-button type="text" @click="showAssistance" class="text-gray-800 text-lg font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
        Assistenza
      </el-button>
    </div>
  </header>
</template>

<script setup>
const showAssistance = () => {
  alert('Mostra assistenza.');
};
</script>

<style scoped>
/* Add any specific styles needed for the header */
</style>
