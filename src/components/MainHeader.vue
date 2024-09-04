<template>
  <header class="header-container flex justify-between items-center p-4 shadow-md h-[10vh]">
    <!-- Left Section (text, button, or empty based on props) -->
    <div class="left-section flex items-center gap-4">
      <!-- Solo testo -->
      <div v-if="leftText && !showButton" class="text-lg font-semibold text-gray-800">
        {{ leftText }}
      </div>

      <!-- Testo con Bottone -->
      <div v-if="leftText && showButton" class="flex items-center gap-4">
        <span class="text-lg font-semibold text-gray-800">{{ leftText }}</span>
        <el-button
          type="text"
          @click="handleLeftButtonClick"
          class="text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {{ buttonText }}
        </el-button>
      </div>
    </div>

    <!-- Controllo del volume -->
    <div class="right-section flex items-center gap-4">
      <label for="volume" class="text-gray-800">Volume:</label>
      <!-- Barra del Volume con icone -->
      <div class="volume-container flex items-center">
        <img
          v-if="isMuted"
          src="@/assets/volume-mute.svg"
          alt="Mute Icon"
          class="volume-icon w-8 h-8 cursor-pointer"
          @click="toggleMute"
        />
        <img
          v-else-if="volume.value === 0"
          src="@/assets/volume-mute.svg"
          alt="Volume Off Icon"
          class="volume-icon w-8 h-8 cursor-pointer"
          @click="toggleMute"
        />
        <img
          v-else-if="volume.value > 0 && volume.value <= 50"
          src="@/assets/volume-low.svg"
          alt="Volume Low Icon"
          class="volume-icon w-8 h-8 cursor-pointer"
        />
        <img
          v-else-if="volume.value > 50 && volume.value <= 100"
          src="@/assets/volume-medium.svg"
          alt="Volume Medium Icon"
          class="volume-icon w-8 h-8 cursor-pointer"
        />
        <img
          v-else
          src="@/assets/volume-high.svg"
          alt="Volume High Icon"
          class="volume-icon w-8 h-8 cursor-pointer"
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
        {{ isMuted ? 'Unmute' : 'Mute' }}
      </el-button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import useVolume from '@/composables/useVolume';
import SpeechSynthesis from '@/utils/speechSynthesis';

const { volume, setVolume, getVolume } = useVolume();

const barCount = 5;
const barWidth = 20;
const barHeight = 20;
const isMuted = ref(false);

// Calcolo delle barre attive basato sul volume
const activeBars = computed(() => Math.ceil(volume.value / (150 / barCount)));

// Aggiorna il volume quando l'utente clicca sulla barra del volume
const adjustVolume = (event) => {
  if (isMuted.value) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const newVolume = Math.min(550, Math.max(0, (clickX / rect.width) * 150)); // Volume fino a 150

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

// Imposta il volume corrente all'avvio
onMounted(() => {
  const initialVolume = getVolume();
  setVolume(initialVolume);
  SpeechSynthesis.setVolume(initialVolume / 150);
});
</script>

<style scoped>
.header-container {
  background-color: #ffd814;
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.volume-icon {
  cursor: pointer;
}

.volume-slider {
  display: flex;
  align-items: center;
  gap: 1px;
  flex: 1;
  height: 20px;
}

.volume-slider-item {
  background-color: #e5e5e5;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.volume-slider-item.active {
  background-color: #22c55e;
}

.left-section {
  flex: 1;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
