// src/directives/playSound.js
import useVolume from '@/composables/useVolume'; // Importa la funzione di default

export default {
  beforeMount(el, binding) {
    const { getVolume } = useVolume(); // Chiama la funzione per ottenere l'oggetto

    const playSound = () => {
      const audio = new Audio(binding.value);

      // Ottieni il volume e normalizzalo per essere tra 0 e 1
      const volume = Math.min(Math.max(getVolume() / 100, 0), 1);
      audio.volume = volume;

      audio.play();
    };

    el.addEventListener('click', playSound);

    // Salva la funzione per la rimozione successiva
    el._playSound = playSound;
  },
  unmounted(el) {
    if (el._playSound) {
      el.removeEventListener('click', el._playSound);
    }
  },
};
