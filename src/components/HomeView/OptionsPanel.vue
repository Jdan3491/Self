<template>
  <div>
    <!-- Altri contenuti del componente -->
    <input
      type="text"
      v-model="localScannedCode"
      placeholder="Inserisci il codice a barre"
      @keydown.enter.prevent="handleScan"
    />
    <el-button class="mt-2" type="primary" @click="handleScan">Simula Scan</el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  scannedCode: String
});

const emit = defineEmits(['update:scannedCode']);

const localScannedCode = ref(props.scannedCode);

watch(() => props.scannedCode, (newValue) => {
  localScannedCode.value = newValue;
});

const handleScan = () => {
  // Aggiungi qui la logica di gestione dello scan
  emit('update:scannedCode', localScannedCode.value); // Emmetti l'evento per aggiornare il prop
};
</script>

<style scoped>
/* Stili per OptionsPanel se necessario */
</style>
