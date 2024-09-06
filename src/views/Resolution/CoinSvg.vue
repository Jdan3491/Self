<template>
  <div class="coin" draggable="true" @dragstart="dragStart">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="50" r="45" fill="#f9c74f" stroke="#f2ae00" stroke-width="5"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="20" fill="#333" font-family="Arial" font-weight="bold">{{ value }}€</text>
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
