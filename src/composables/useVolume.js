// composables/useVolume.js

import { ref } from 'vue';

const DEFAULT_VOLUME = 10; // Valore predefinito del volume

// Crea una variabile reattiva per il volume
const volume = ref(
  localStorage.getItem('volume') !== null
    ? Number(localStorage.getItem('volume'))
    : DEFAULT_VOLUME // Usa il valore predefinito se non esiste un valore salvato
);

const setVolume = (newVolume) => {
  volume.value = newVolume;
  localStorage.setItem('volume', newVolume);
};

const getVolume = () => {
  return volume.value;
};

export default function useVolume() {
  return {
    volume,
    setVolume,
    getVolume,
  };
}
