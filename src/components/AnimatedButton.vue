<template>
  <button
    :class="['animated-button', className]"
    @click="handleClick"
    :aria-label="ariaLabel"
  >
    {{ title }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  title: string;
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}>();

const { title, onClick, ariaLabel, className } = props;

function handleClick() {
  if (onClick) {
    onClick();
  }
}
</script>

<style scoped>
.animated-button {
  background: #fa8900; /* Bright orange background */
  border: none;
  color: #fff; /* White text color */
  border-radius: 50px; /* Fully rounded corners */
  width: 100%; /* Full width for responsiveness */
  max-width: 400px; /* Max width for larger screens */
  line-height: 1.5; /* Ensure vertical alignment */
  text-align: center; /* Center the text horizontally */
  box-shadow: 0 4px 8px rgba(42, 18, 18, 0.2); /* Subtle shadow for depth */
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition effects */
  cursor: pointer; /* Pointer cursor for clickability */
}

.animated-button:hover {
  transform: translateY(-6px); /* More pronounced lift on hover */
  background-color: #e67e22; /* Slightly darker orange on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

.animated-button:active {
  transform: translateY(-2px); /* Slightly smaller lift on click */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Reduced shadow on click */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animated-button {
    font-size: 4rem; /* Slightly smaller text on smaller screens */
  }
}

@media (min-width: 1200px) {
  .animated-button {
    font-size: 3.5rem; /* Larger text size for larger screens */
    max-width: 500px; /* Wider button for larger screens */
  }
}
</style>
