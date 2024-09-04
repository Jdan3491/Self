// composables/useVolume.js

import { ref } from 'vue';

const volume = ref(localStorage.getItem('volume') ? Number(localStorage.getItem('volume')) : 100);

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
