<template>
  <header class="header-container flex justify-between items-center p-4 shadow-md h-[10vh]">
    <!-- Left Section (text, button, or empty based on props) -->
    <div class="left-section flex items-center gap-4">
      <!-- Only Text -->
      <div v-if="leftText && !showButton" class="text-lg font-semibold text-gray-800">
        {{ leftText }}
      </div>

      <!-- Text with Button -->
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

    <!-- Audio Control on the Right -->
    <div class="right-section flex items-center gap-4">
      <label for="volume" class="text-gray-800">Volume:</label>
      <!-- Volume Bar -->
      <div class="volume-bar flex items-center gap-1" @click="adjustVolume">
        <div
          v-for="index in 5"
          :key="index"
          class="volume-bar-item"
          :style="{ width: barWidth + 'px', height: barHeight + 'px' }"
          :class="{ 'active': index <= activeBars }"
        ></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Define props
const props = defineProps({
  leftText: {
    type: String,
    default: ''
  },
  showButton: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: 'Azione'
  },
  onButtonClick: {
    type: Function,
    default: null
  }
})

// Volume control logic
const volume = ref(100);
const barCount = 5; // Total number of bars
const barWidth = 20; // Width of each bar
const barHeight = 20; // Height of each bar

// Calculate active bars based on volume
const activeBars = computed(() => Math.ceil(volume.value / (100 / barCount)));

// Handle button click
const handleLeftButtonClick = () => {
  if (props.onButtonClick) {
    props.onButtonClick();
  }
};

// Adjust volume
const adjustVolume = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left; // Click position relative to the container
  const volumeLevel = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
  volume.value = volumeLevel;
  console.log(`Volume set to: ${volume.value}`);
  // Adjust the speech volume
  if (window.speechSynthesis.speaking) {
    const utterance = window.speechSynthesis.getVoices()[0];
    if (utterance) {
      utterance.volume = volume.value / 100; // Adjust volume level (0 to 1)
    }
  }
};

// Speak a welcome message when the component is mounted
const speakMessage = (text) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported in this browser.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT'; // Set language to Italian
  utterance.volume = volume.value / 100; // Adjust volume level (0 to 1)
  window.speechSynthesis.speak(utterance);
};

// Repeat the message every 10 seconds
let messageInterval;
onMounted(() => {
  speakMessage('Benvenuto Il');
});

// Clean up interval when component unmounts
onUnmounted(() => {
  clearInterval(messageInterval);
});
</script>

<style scoped>
.header-container {
  background-color: #ffd814; /* Background color for the header */
}

.volume-bar {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.volume-bar-item {
  background-color: #e5e5e5; /* Inactive color */
  border-radius: 4px;
  transition: background-color 0.3s;
}

.volume-bar-item.active {
  background-color: #22c55e; /* Active color (green) */
}

.left-section {
  flex: 1; /* Grow to take available space */
}

.right-section {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between volume label and slider */
}
</style>
