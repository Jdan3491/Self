<template>
  <div 
    class="card clickable-card"
    @click="handleClick"
    role="button"
    tabindex="0"
    v-play-sound="'src/assets/click_sound.mp3'"
  >
    <img :src="icon" :alt="title" class="icon">
    <span class="text">{{ title }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define props for the component
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

// Define emit for click event
const emit = defineEmits(['click']);

// Handle click event
const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.card {
  width: 200px; /* Larghezza aumentata per la forma quadrata più grande */
  height: 200px; /* Altezza aumentata per la forma quadrata più grande */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Mantieni il colore di sfondo giallo */
  border: 4px solid #ffd814; /* Bordo dello stesso colore del background */
  border-radius: 8px; /* Raggio del bordo arrotondato */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Ombra leggera */
  text-align: center;
  padding: 1.5rem; /* Spaziatura interna */
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; /* Transizione per interazioni */
}

.card:hover {
  transform: translateY(-2px); /* Leggero movimento verso l'alto al passaggio del mouse */
  box-shadow: 0 6px 12px rgba(0,0,0,0.15); /* Ombra più profonda al passaggio del mouse */
}

.card:focus {
  outline: none;
  border: 2px solid #ffd814; /* Mantieni il bordo dello stesso colore del background */
}

.icon {
  width: 60px; /* Aumenta la dimensione dell'icona */
  height: 60px;
  margin-bottom: 0.75rem; /* Maggiore spazio tra l'icona e il testo */
}

.text {
  font-size: 1.5rem; /* Aumenta la dimensione del testo */
  font-weight: 500; /* Peso del testo */
  color: #333333; /* Colore del testo */
}
</style>
