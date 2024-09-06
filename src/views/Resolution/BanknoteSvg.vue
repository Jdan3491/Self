<template>
  <div class="banknote" draggable="true" @dragstart="dragStart">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" class="w-full h-full">
      <rect width="200" height="100" fill="#00a86b" stroke="#004d00" stroke-width="4"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="40" fill="#ffffff" font-family="Arial" font-weight="bold">{{ value }}€</text>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  value: Number
})

const dragStart = (event) => {
  event.dataTransfer.setData('money', props.value)
}
</script>
