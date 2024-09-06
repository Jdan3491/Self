<template>
  <div class="relative bg-white flex flex-col w-full h-full">
    <!-- Background SVG -->
    <div class="absolute inset-0 bg-shop-svg bg-cover bg-center z-0"></div>

    <!-- Grid layout for buttons -->
    <div class="buttons-grid z-10 mt-6 mb-4 flex-grow">
      <div class="button-row">
        <CardComponent
          class="card-component"
          title="Rimuovi articolo"
          :icon="removeProductIcon"
          @click="navigateToRemoveItem"
        />
        <CardComponent
          class="card-component"
          title="Usa Buono Spesa"
          :icon="SaleIcon"
          @click="usePromotion"
        />
      </div>
      <div class="button-row">
        <CardComponent
          class="card-component"
          title="Scrivi Codice Articolo"
          :icon="KeyboardIcon"
          @click="writeItemCode"
        />
      </div>
    </div>

    <!-- Payment button at the bottom, not fixed -->
    <div class="z-10 mb-8 flex justify-center w-full">
      <AnimatedButton
        class="start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6"
        title="Pagamento"
        :onClick="proceedToPayment"
        aria-label="Start"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../../config/supabaseClient.js';
import { useProductStore } from '../../stores/productStore';
import Swal from 'sweetalert2';
import AnimatedButton from '../AnimatedButton.vue';
import CardComponent from '../CardComponent.vue';
import removeProductIcon from '@/assets/removeproduct_icon.svg';
import SaleIcon from '@/assets/sale.svg';
import KeyboardIcon from '@/assets/keyboard.svg';
import SpeechSynthesis from '../../utils/speechSynthesis.js'; // Import the speech synthesis utility
import AudioAmplifier from '../../utils/audioAmplifier.js';
import useVolume from '../../composables/useVolume.js';

const { volume, getVolume, setVolume } = useVolume();
const scannedCode = ref('');
const router = useRouter();
const productStore = useProductStore();

watch(volume, (newVolume) => {
  if (newVolume === 0) {
    SpeechSynthesis.stop();
  } else {
    SpeechSynthesis.setVolume(newVolume / 100);
    AudioAmplifier.setVolume(newVolume / 100);
  }
});

const handleScan = async (code) => {
  if (code.trim() === '') return;

  try {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('productcode', code);

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

      // Controlla se il prezzo ha valori decimali
      const priceHasDecimals = product.price % 1 !== 0;

      let message;

      if (priceHasDecimals) {
        // Ottieni la parte intera e la parte decimale del prezzo
        const integerPart = Math.floor(product.price);
        const decimalPart = Math.round((product.price - integerPart) * 100); // Ottieni i centesimi

        // Costruisci il messaggio per il prezzo con centesimi
        message = `Prezzo: ${integerPart} euro e ${decimalPart} centesimi.`;
      } else {
        // Messaggio normale senza centesimi
        message = `Prezzo: ${product.price} euro.`;
      }

      // Play the product name and price using the global volume
      SpeechSynthesis.speak(`${product.name}. ${message}`, {
        volume: getVolume() / 100,
      });
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
  router.push({ name: 'SalesView' });
};

const writeItemCode = async () => {
  const { value: code } = await Swal.fire({
    title: 'Inserisci Codice Articolo',
    input: 'text',
    inputLabel: 'Codice Articolo',
    inputPlaceholder: 'Inserisci il codice',
    showCancelButton: true,
    confirmButtonText: 'Conferma',
    cancelButtonText: 'Annulla',
    inputValidator: (value) => {
      if (!value) {
        return 'Devi inserire un codice!';
      }
    }
  });

  if (code) {
    await handleScan(code);
  }
};

const proceedToPayment = () => {
  if (Number(productStore.totalAmount) == 0 && productStore.items.length == 0) {
    Swal.fire({
      title: 'Errore!',
      text: 'Devi acquistare almeno un prodotto',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else {
    router.push({ name: 'BagSelection' });
  }
};
</script>

<style scoped>
/* Full-screen layout */
.relative {
  position: relative;
  overflow: hidden; /* Prevents overflow issues */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Background SVG */
.bg-shop-svg {
  background-image: url('@/assets/shop-background.svg'); /* Replace with the path to your SVG file */
  background-size: cover;
  background-position: center;
}

/* Grid layout for buttons */
.buttons-grid {
  display: flex;
  flex-direction: column; /* Stack rows vertically */
  align-items: center; /* Center content horizontally */
  gap: 16px; /* Spacing between rows */
  padding: 0 16px; /* Add padding to the sides */
}

/* Ensure proper alignment */
.button-row {
  display: flex;
  justify-content: center; /* Center cards in each row */
  gap: 16px; /* Spacing between cards */
  width: 100%;
}

/* Improve Card Components */

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
</style>
