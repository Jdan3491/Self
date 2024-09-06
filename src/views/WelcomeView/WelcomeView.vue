<template>
  <div class="full-screen">
    <!-- Header Section -->
    <header class="w-full bg-green-700 p-4 flex items-center justify-between shadow-md lg:p-6">
      <!-- GitHub Link and Project Title -->
      <div class="flex items-center">
        <a href="https://github.com/Jdan3491" target="_blank" class="flex items-center">
          <el-avatar
            :src="GithubIcon"
            alt="GitHub"
            class="w-20 h-20 mr-4"
          />
        </a>
        <span class="text-white text-3xl font-bold lg:text-4xl">Progetto Demo cassa "Amica"</span>
      </div>
    </header>

    <div class="content-box">
      <!-- Logo Section -->
      <div class="logo-section mb-8">
        <el-image
          class="logo"
          :src="welcomeComponent.brand"
          fit="contain"
          lazy
        />
      </div>

      <!-- Welcome Text -->
      <h1 class="welcome-text text-5xl mb-10 lg:text-6xl text-green-700">Benvenuto!</h1>

      <!-- Start Button -->
      <AnimatedButton
        class="start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6"
        title="Avvio"
        :onClick="startGame"
        aria-label="Avvio"
      />

      <!-- Hardware Installed Mode Switch -->
      <div class="mt-8 flex items-center justify-center">
        <label class="text-lg mr-4 lg:text-xl text-gray-600">Modalità No Hardware installata:</label>
        <input type="checkbox" v-model="isHardwareInstalled" class="ml-4 checkbox"  @change="handleHardwareChange" />
      </div>
    </div>

    <!-- Footer Section with Copyright -->
    <footer class="mt-10 text-center text-gray-600">
      <p class="text-lg">© Daniele Cantoro - Jdan3491 (Nickname Github)</p>
    </footer>

    <!-- Particles Background -->
    <div class="particles"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useWelcomeComponent } from './index';
import AnimatedButton from '../../components/AnimatedButton.vue';
import { useTestModeStore } from '@/stores/testModeStore';
import GithubIcon from '@/assets/icongithub.svg';
import Swal from 'sweetalert2';

// Initialize the welcome component
const welcomeComponent = useWelcomeComponent();
const HardwareInstalledModeStore = useTestModeStore();

// Define local state for the hardware installation mode (synchronized with the global store)
const isHardwareInstalled = ref(!HardwareInstalledModeStore.isHardwareInstalled);

// Watch the local flag and update the store when it changes
watch(isHardwareInstalled, (newValue) => {
  HardwareInstalledModeStore.setTestMode(newValue);
});

// Start the game with a check for hardware installed
const startGame = () => {
  welcomeComponent.goToPage();
};

// Handle Hardware Installed Mode change with confirmation
const handleHardwareChange = () => {
  if (!isHardwareInstalled.value) {
    Swal.fire({
      title: 'Sei sicuro di possedere hardware installato?',
      text: 'Questa è una funzionalità beta instabile.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sì',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        isHardwareInstalled.value = false;
      } else {
        isHardwareInstalled.value = true;
      }
    });
  }
};
</script>

<style scoped>
/* Full-screen layout */
.full-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background-color: #F1F3F4; /* Grigio chiaro */
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

/* Header styling */
header {
  width: 100%;
  background-color: #007B55; /* Verde scuro */
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.el-avatar {
  width: 80px;
  height: 80px;
}

/* Content box styling */
.content-box {
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
  position: relative;
  z-index: 1;
}

/* Logo styling */
.logo {
  max-width: 180px;
  max-height: 80px;
}

/* Welcome text styling */
.welcome-text {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #007B55; /* Verde scuro */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
}

/* Button styling */
.start-button {
  background-color: #007B55; /* Verde scuro */
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.start-button:hover {
  background-color: #005a3b;
  transform: translateY(-5px);
}

.start-button:active {
  transform: scale(0.98);
}

/* Footer styling */
footer {
  margin-top: auto;
  padding: 20px;
}

/* Particles Background Styling */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/recovershop.svg');
  background-size: 20%; /* Adjust the size as needed */
  background-repeat: repeat;
  background-position: center;
  opacity: 0.1; /* Adjust opacity for effect */
  pointer-events: none; /* Ensure it doesn’t interfere with interactions */
  animation: particleMovement 30s linear infinite;
}

@keyframes particleMovement {
  0% { transform: translate(0, 0); }
  100% { transform: translate(100px, 100px); }
}

/* Enlarged checkbox styling */
.checkbox {
  transform: scale(3.5); /* Scale up the checkbox */
  cursor: pointer;
}
</style>
