<template>
  <div class="relative flex-1 bg-white p-6 flex flex-col gap-4">
    <div class="flex gap-4">
      <!-- Colonna 1: Carta "Rimuovi articolo" -->
      <div class="w-1/2 flex justify-center">
        <div 
          class="card clickable-card bg-yellow-400 border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300"
          @click="navigateToRemoveItem"
          role="button"
          tabindex="0"
        >
          <img src="https://img.icons8.com/plasticine/100/000000/delete-forever.png" alt="Remove Item" class="icon">
          <span class="text-xl font-semibold text-gray-800">Rimuovi articolo</span>
        </div>
      </div>

      <!-- Colonna 2: Carta "Usa Promozione" -->
      <div class="w-1/2 flex justify-center">
        <div 
          class="card clickable-card bg-yellow-400 border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300"
          @click="usePromotion"
          role="button"
          tabindex="0"
        >
          <img src="https://img.icons8.com/fluency/48/000000/sale.png" alt="Promotion" class="icon">
          <span class="text-xl font-semibold text-gray-800">Usa Promozione</span>
        </div>
      </div>
    </div>

    <!-- Seconda riga: Carta "Scrivi Codice Articolo" -->
    <div class="flex w-full mt-4">
      <div 
        class="card clickable-card bg-yellow-400 border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300"
        @click="writeItemCode"
        role="button"
        tabindex="0"
      >
        <img src="https://img.icons8.com/fluency/48/000000/barcode.png" alt="Write Code" class="icon">
        <span class="text-xl font-semibold text-gray-800">Scrivi Codice Articolo</span>
      </div>
    </div>

    <!-- Input simulato per il codice a barre -->
    <div class="mt-4">
      <input
        type="text"
        v-model="scannedCode"
        placeholder="Inserisci il codice a barre"
        @keydown.enter.prevent="handleScan"
        class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Terza riga: Pulsante animato di pagamento -->
    <div class="absolute bottom-6 left-0 right-0 flex justify-center">
      <AnimatedButton
        class="animated-button text-2xl p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out"
        title="Pagamento"
        :onClick="proceedToPayment"
        aria-label="Start"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../../config/supabaseClient.js';
import { useProductStore } from '../../stores/productStore';
import Swal from 'sweetalert2';
import AnimatedButton from '../AnimatedButton.vue';

const scannedCode = ref('');
const router = useRouter();
const productStore = useProductStore();

const handleScan = async () => {
  if (scannedCode.value.trim() === '') return;

  try {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('productcode', scannedCode.value);

    if (error) {
      Swal.fire({
        title: 'Errore!',
        text: 'Errore durante la scansione. Riprova.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (data && data.length > 0) {
      const product = data[0];
      productStore.addItem(product);
    } else {
      Swal.fire({
        title: 'Errore!',
        text: 'Prodotto non trovato!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    console.error('Errore inatteso:', error);
    Swal.fire({
      title: 'Errore!',
      text: 'Si è verificato un errore. Riprova.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } finally {
    scannedCode.value = '';
  }
};

const navigateToRemoveItem = () => {
  router.push({ name: 'RemoveItem' });
};

const usePromotion = () => {
  // Implement logic to use a promotion
};

const writeItemCode = () => {
  // Implement logic to write item code
};

const proceedToPayment = () => {
  router.push({ name: 'BagSelection' });
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffd814; /* Colore di sfondo */
  border: 2px solid #ffd814; /* Colore del bordo */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.card:focus {
  outline: none;
  ring: 2px solid #ffd814;
}

.icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
}

.text-xl {
  font-size: 1.5rem;
}

.text-2xl {
  font-size: 1.75rem;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.bottom-6 {
  bottom: 1.5rem;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}
</style>
