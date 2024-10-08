<template>
  <header class="bg-white px-4 py-2 flex justify-between items-center shadow-header border-b-4 border-darkGreen">
    <!-- Left Section (text, button, or empty based on props) -->
    <div class="left-section flex items-center gap-4">
      <!-- Solo testo -->
      <div v-if="leftText && !showButton" class="text-lg font-semibold text-gray-800">
        <h1>{{ leftText }}</h1>
      </div>

      <!-- Testo con Bottone -->
      <div v-if="leftText && showButton" class="flex items-center gap-4">
        <el-button
          type="text"
          @click="handleLeftButtonClick"
          class="text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
        >
          <span class="text-lg font-semibold text-gray-800">{{ leftText }}</span>
        </el-button>
      </div>
    </div>

    <!-- Controllo del volume -->
    <div class="right-section flex items-center gap-4">
      <!-- Barra del Volume con icone -->
      <div class="volume-container flex items-center">
        <img
          v-if="isMuted"
          src="@/assets/volume-mute.svg"
          alt="Mute Icon"
          class="volume-icon w-10 h-10 cursor-pointer"
          @click="toggleMute"
        />
        <img
          v-else-if="volume.value === 0"
          src="@/assets/volume-mute.svg"
          alt="Volume Off Icon"
          class="volume-icon w-10 h-10 cursor-pointer"
          @click="toggleMute"
        />
        <img
          v-else-if="volume.value > 0 && volume.value <= 50"
          src="@/assets/volume-low.svg"
          alt="Volume Low Icon"
          class="volume-icon w-10 h-10 cursor-pointer"
        />
        <img
          v-else-if="volume.value > 50 && volume.value <= 100"
          src="@/assets/volume-medium.svg"
          alt="Volume Medium Icon"
          class="volume-icon w-10 h-10 cursor-pointer"
        />
        <img
          v-else
          src="@/assets/volume-high.svg"
          alt="Volume High Icon"
          class="volume-icon w-10 h-10 cursor-pointer"
        />
        <div
          class="volume-slider flex-1"
          @click="adjustVolume"
          :style="{ cursor: isMuted ? 'not-allowed' : 'pointer' }"
        >
          <div
            v-for="index in barCount"
            :key="index"
            class="volume-slider-item"
            :style="{ width: barWidth + 'px', height: barHeight + 'px' }"
            :class="{ 'active': index <= activeBars }"
          ></div>
        </div>
      </div>
      <el-button
        type="text"
        @click="toggleMute"
        class="text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
      >
        {{ isMuted ? 'Attiva Audio' : 'Disattiva Audio' }}
      </el-button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import useVolume from '@/composables/useVolume';
import SpeechSynthesis from '@/utils/speechSynthesis';
import { defineProps } from 'vue';

const props = defineProps({
  leftText: {
    type: String,
    default: '',
  },
  showButton: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: '',
  },
  onButtonClick: {
    type: Function,
    default: null,
  },
});

const { volume, setVolume, getVolume } = useVolume();

const barCount = 5;
const barWidth = 20;
const barHeight = 40;
const isMuted = ref(false);

// Calcolo delle barre attive basato sul volume
const activeBars = computed(() => Math.ceil(volume.value / (150 / barCount)));

// Aggiorna il volume quando l'utente clicca sulla barra del volume
const adjustVolume = (event) => {
  if (isMuted.value) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const newVolume = Math.min(150, Math.max(0, (clickX / rect.width) * 150)); // Volume fino a 150

  // Imposta il volume e aggiorna lo stato di muto
  setVolume(newVolume);
  isMuted.value = newVolume === 0;
  SpeechSynthesis.setVolume(newVolume / 150); // Regola il volume della sintesi vocale
};

// Funzione per attivare/disattivare il muto
const toggleMute = () => {
  isMuted.value = !isMuted.value;
  const newVolume = isMuted.value ? 0 : getVolume();
  setVolume(newVolume);
  SpeechSynthesis.setVolume(newVolume / 150); // Regola il volume della sintesi vocale

  if (isMuted.value) {
    SpeechSynthesis.stop();
  }
};

// Gestore del click sul pulsante di sinistra
const handleLeftButtonClick = () => {
  if (props.onButtonClick) {
    props.onButtonClick();
  }
};

// Imposta il volume corrente all'avvio
onMounted(() => {
  const initialVolume = getVolume();
  setVolume(initialVolume);
  SpeechSynthesis.setVolume(initialVolume / 150);
});
</script>


<style scoped>
/* Header Container */
.header-container {
  background-color: #FFFFFF; /* Sfondo bianco per un look pulito */
  padding: 0 1rem; /* Spaziatura orizzontale */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Ombra leggera per l'header */
  border-bottom: 2px solid #000000; /* Bordo inferiore sottile */
  position: relative;
}

/* Volume Container */
.volume-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #F9FAFB; /* Sfondo molto chiaro per contrasto */
  padding: 0.5rem; /* Spaziatura interna */
  border-radius: 0.375rem; /* Bordo arrotondato per il contenitore */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombra per migliorare il contrasto */
}

/* Volume Slider */
.volume-slider {
  display: flex;
  align-items: center;
  gap: 2px; /* Spazio tra le barre */
  flex: 1;
  height: 0.8rem; /* 12px */
  background-color: #F1F5F9; /* Grigio chiaro per il fondo dello slider */
  border-radius: 8px; /* Angoli arrotondati per lo slider */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); /* Ombra interna delicata */
}

/* Volume Slider Item */
.volume-slider-item {
  background-color: #E5E7EB; /* Grigio chiaro per le barre non attive */
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: 1px solid #E5E7EB; /* Bordo grigio chiaro per le barre non attive */
}

/* Active Volume Slider Item */
.volume-slider-item.active {
  background-color: #4CAF50; /* Verde per le barre attive */
  border-color: #4CAF50; /* Colore del bordo per le barre attive */
  transform: scaleY(1.2); /* Allunga le barre attive per effetto visivo */
}

/* Volume Icons */
.volume-icon {
  cursor: pointer;
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  transition: opacity 0.3s ease, transform 0.3s ease;
  color: #4CAF50; /* Verde per contrasto con sfondo chiaro */
}

/* Hover and Active States for Icons */
.volume-icon:hover {
  opacity: 0.8;
}

.volume-icon:active {
  transform: scale(0.95);
}

/* Left Section */
.left-section {
  flex: 1;
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Button Styles */
.el-button {
  text-align: center;
  border: 2px solid #22C55E; /* Green border color */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 200px; /* Fixed width to ensure alignment */
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Hover and Focus States */
.el-button:hover {
  text-align: center;
  border: 2px solid #22C55E; /* Green border color */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 200px; /* Fixed width to ensure alignment */
}

.el-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #22C55E; /* Green border color */
}

/* Text Colors */
.text-gray-800 {
  color: #333; /* Colore scuro per il testo */
}

.text-gray-900 {
  color: #111; /* Colore più scuro per l'hover del testo */
}

/* Transition */
.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease;
}
</style>
