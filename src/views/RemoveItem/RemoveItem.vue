<template>
  <div class="flex-1 bg-white p-6 flex flex-col justify-center items-center">
    <!-- Image of a shopping cart in the center -->
    <img 
      src="https://img.icons8.com/fluency/96/000000/shopping-cart.png" 
      alt="Shopping Cart"
      class="mb-4"
    />
    <!-- Text below the image -->
    <h2 class="text-xl mb-4 text-center">Scansiona il prodotto da rimuovere</h2>
    <!-- Input field to simulate barcode scanning -->
    <input
      type="text"
      v-model="scannedCode"
      placeholder="Inserisci il codice del prodotto"
      @keydown.enter.prevent="handleScan"
      class="border p-2 w-full mb-4"
    />
    <!-- Cancel Button -->
    <el-button @click="cancel" type="default">Annulla</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../../stores/productStore'; // Ensure the path is correct
import Swal from 'sweetalert2';

const router = useRouter();
const productStore = useProductStore(); // Ensure the Pinia store is correctly initialized
const scannedCode = ref('');  // Input to capture the scanned code

// Function to handle the scanning of the product code
const handleScan = async () => {
  if (scannedCode.value.trim() === '') return; // Check if the scanned code is empty

  // Find the product by code in the store
  const product = productStore.items.find(item => item.productcode === scannedCode.value);

  if (product) {
    try {
      productStore.removeItemById(product.id); // Use the function from Pinia store to remove the item

      // Show success message after removal
      Swal.fire({
        title: 'Successo!',
        text: 'Prodotto rimosso correttamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.back(); // Navigate back after success
      });
    } catch (error) {
      console.error('Errore durante la rimozione del prodotto:', error);
      Swal.fire({
        title: 'Errore!',
        text: 'Si è verificato un errore durante la rimozione del prodotto.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } else {
    // If the product does not exist, show an error message
    Swal.fire({
      title: 'Errore!',
      text: 'Il prodotto non è presente nello store.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  scannedCode.value = ''; // Clear the input field after processing
};

// Function to cancel and navigate back to the previous page
const cancel = () => {
  router.back(); // Navigate back to the previous page
};
</script>

<style scoped>
.flex-1 {
  flex: 1;
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  height: 100vh; /* Full viewport height for centering */
  text-align: center;
}
.text-xl {
  font-size: 1.25rem; /* Font size for the text */
}
.mb-4 {
  margin-bottom: 1rem; /* Margin below the image and text */
}
.border {
  border: 1px solid #e5e7eb; /* Styling for the input field */
}
.p-2 {
  padding: 0.5rem; /* Padding for the input field */
}
.w-full {
  width: 100%; /* Full width for the input field */
}
</style>
