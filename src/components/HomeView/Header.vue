<template>
  <div class="flex justify-between items-center p-4 bg-white shadow">
    <div class="flex items-center gap-4">
      <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg" alt="Italian" class="w-8 h-8" />
      <el-button type="text" @click="showAssistance">Assistenza</el-button>
    </div>
  </div>
</template>

<script setup>
// Show assistance function (to be passed in or implemented here)
const showAssistance = () => {
  alert('Mostra assistenza.');
};
</script>

<style scoped>
/* Add any specific styles needed for the header */
</style>
