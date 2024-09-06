<template>
  <footer class="bg-white border-t-4 border-darkGreen p-4 flex">
    <div class="flex flex-1 justify-start">
      <AnimatedButton
        v-if="button1"
        :title="button1.title"
        :onClick="button1.onClick"
        :aria-label="button1.ariaLabel"
        :class="button1.className"
        class="button-large"
      />
    </div>
    <div class="flex flex-1 justify-end">
      <AnimatedButton
        v-if="button2"
        :title="button2.title"
        :onClick="button2.onClick"
        :aria-label="button2.ariaLabel"
        :class="button2.className"
        class="button-large"
      />
    </div>
  </footer>
</template>

<script setup>
import { defineProps } from 'vue';
import AnimatedButton from './AnimatedButton.vue';

const props = defineProps({
  button1: {
    type: Object,
    default: () => ({})
  },
  button2: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem; /* Maggiore padding del footer */
}

.button-large {
  font-size: 1rem; /* Dimensione del testo aumentata */
  padding: 0.75rem 1.5rem; /* Maggiore padding dei bottoni */
  min-width: 150px; /* Maggiore larghezza minima per i bottoni */
  max-width: 200px; /* Maggiore larghezza massima per i bottoni */
}
</style>
