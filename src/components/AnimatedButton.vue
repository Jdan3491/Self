<template>
  <button
    :class="computedClass"
    @click="handleClick"
    :aria-label="ariaLabel"
    v-play-sound="'src/assets/click_sound.mp3'"
  >
    {{ title }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps<{
  title: string;
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}>();

const { title, onClick, ariaLabel, className } = props;

// Compute the class based on whether className prop is provided
const computedClass = computed(() => {
  return className ? className : 'animated-button';
});

function handleClick() {
  if (onClick) {
    onClick();
  }
}
</script>
