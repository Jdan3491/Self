<template>
  <div class="flex h-screen w-screen">
    <!-- Single Image Section -->
    <div class="flex-1 flex justify-center items-center bg-gray-200 overflow-hidden">
      <img
        class="single-image"
        :src="currentImage"
        alt="Background"
      />
    </div>

    <!-- Right Content Section -->
    <div class="flex-1 flex flex-col justify-center items-center text-center bg-white p-5">
      <!-- Animated Logo -->
      <div class="logo-container mb-5">
        <el-image
          class="responsive-logo"
          :src="welcomeComponent.brand"
          fit="contain"
          lazy
        />
      </div>

      <!-- Welcome Text with Fade-In Effect -->
      <span class="welcome-text text-5xl mb-5 transition-opacity duration-1000 ease-in-out">Benvenuto!</span>

      <!-- Animated Button with Hover Effect -->
      <AnimatedButton
        class="animated-button"
        title="Avvio"
        :onClick="welcomeComponent.goToPage"
        aria-label="Start"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useWelcomeComponent } from './index';
import AnimatedButton from '../../components/AnimatedButton.vue';

// Initialize the welcome component
const welcomeComponent = useWelcomeComponent();
const images = welcomeComponent.images;

// Select a random image from the list on page load
const currentImage = ref(images[Math.floor(Math.random() * images.length)]);
</script>

<style src="./WelcomePage.css" scoped></style>
