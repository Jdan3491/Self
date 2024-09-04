<template>
  <div class="relative flex-1 bg-white p-6 flex flex-col items-center">
    <!-- Image at the top -->
    <div class="image-container">
      <!-- Shape behind the image -->
      <div class="shape"></div>
      <img :src="RegisterIcon" alt="Self Checkout Icon" class="self-checkout-image" />
    </div>

    <!-- Text under the image -->
    <div class="instruction-text mt-4 text-center">
      <h1>Esegui la scansione dell'articolo o seleziona una delle opzioni seguenti!</h1>
    </div>

    <!-- Grid layout for buttons -->
    <div class="buttons-grid mt-6">
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
      <CardComponent
        class="card-component"
        title="Scrivi Codice Articolo"
        :icon="KeyboardIcon"
        @click="writeItemCode"
      />
    </div>

    <!-- Animated payment button at the bottom -->
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../../config/supabaseClient.js';
import { useProductStore } from '../../stores/productStore';
import Swal from 'sweetalert2';
import AnimatedButton from '../AnimatedButton.vue';
import CardComponent from '../CardComponent.vue';
import removeProductIcon from '@/assets/removeproduct_icon.svg';
import RegisterIcon from '@/assets/register.svg';
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
      // Play the product name and price using the global volume
      SpeechSynthesis.speak(`${product.name}. Prezzo: ${product.price} euro.`, {
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
.relative {
  position: relative;
  overflow: hidden; /* Prevents overflow issues */
}

.shape {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px; /* Adjust size as needed */
  height: 200px; /* Adjust size as needed */
  background-color: #22C55E; /* Light green color */
  border-radius: 50%; /* Make it circular */
  transform: translate(-50%, -50%); /* Center the shape */
  z-index: 1; /* Place it behind the image */
}

.self-checkout-image {
  width: 100%; /* Responsive width */
  height: auto; /* Maintain aspect ratio */
  position: relative; /* Required for proper z-index stacking */
  z-index: 2; /* Ensure this is above the shape */
}

.image-container {
  position: relative; /* Needed for positioning the shape */
  width: 150px; /* Increased size */
  margin: 0 auto; /* Center the image container */
}

.instruction-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: center; /* Center text */
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Adjust columns based on screen size */
  gap: 16px; /* Adjust spacing between buttons */
  width: 100%;
  max-width: 100%; /* Ensure it does not overflow */
  padding: 0 16px; /* Add padding to the sides */
  box-sizing: border-box; /* Include padding in width calculations */
}

.card-component {
  text-align: center;
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
