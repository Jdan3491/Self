<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">
    <!-- Header Section -->
    <header class="flex-shrink-0 text-gray-800 p-4 bg-yellow-400">
      <h1 class="text-2xl font-bold">Rimuovi Prodotto</h1>
    </header>

    <!-- Main Content Section -->
    <main class="flex-grow flex items-center justify-center p-4">
      <!-- Container for Layout -->
      <div class="flex flex-col lg:flex-row lg:w-2/3 gap-4 max-w-5xl">
        <!-- Left Column: Instructions -->
        <div class="flex flex-col items-center justify-center lg:items-start lg:justify-center lg:w-1/2 p-4">
          <div class="instructions text-center lg:text-left">
            <p class="font-semibold text-lg mb-2">Due Metodi per Rimuovere un Prodotto:</p>
            <div class="method mb-4 p-4 bg-gray-200 rounded-lg shadow-md">
              <h2 class="font-bold text-xl text-red-500 mb-2">Metodo 1: Inserimento Manuale</h2>
              <p>
                Inserisci il codice del prodotto nel campo di input sopra e premi 
                il pulsante verde <span class="font-bold">"Rimuovi Articolo"</span> 
                in basso a destra per rimuoverlo dagli acquisti. Se il prodotto non è 
                presente, verrà mostrato un messaggio di errore.
              </p>
            </div>
            <div class="method p-4 bg-yellow-200 rounded-lg shadow-md">
              <h2 class="font-bold text-xl text-yellow-700 mb-2">Metodo 2: Scansione</h2>
              <p>
                Se il tuo sistema supporta la scansione dei codici a barre, puoi 
                semplicemente scansionare il codice del prodotto per rimuoverlo. 
                Dopo la scansione, il prodotto verrà rimosso automaticamente se 
                presente negli acquisti.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Logo and Input Field -->
        <div class="flex flex-col items-center justify-center lg:items-end lg:justify-center lg:w-1/2 p-4">
          <div class="logo-container mb-4 flex items-center justify-center">
            <img
              src="@/assets/removeproduct_icon.svg"
              alt="Remove Product Icon"
              class="logo-image"
            />
          </div>
          <div class="text-container mb-4 text-center lg:text-right">
            <h1 class="text-header text-2xl font-bold">Digita il prodotto da rimuovere</h1>
          </div>
          <div class="input-container">
            <el-input
              v-model="scannedCode"
              placeholder="Inserisci il codice del prodotto"
              @keydown.enter.prevent="handleScan"
              clearable
              class="input-field"
            ></el-input>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="flex-shrink-0 bg-white p-4 border-t border-gray-200 flex justify-between">
      <button
        class="cancel-button text-2xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out"
        @click="cancel"
        aria-label="Annulla"
      >
        Annulla
      </button>
      <button
        class="animated-button text-2xl p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out"
        @click="handleScan"
        aria-label="Rimuovi"
      >
        Rimuovi Articolo
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../../stores/productStore';
import Swal from 'sweetalert2';

const router = useRouter();
const productStore = useProductStore();
const scannedCode = ref('');

const handleScan = async () => {
  if (scannedCode.value.trim() === '') return;

  const product = productStore.items.find(item => item.productcode === scannedCode.value);

  if (product) {
    try {
      productStore.removeItemById(product.id);
      Swal.fire({
        title: 'Successo!',
        text: 'Prodotto rimosso correttamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.back();
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
    Swal.fire({
      title: 'Errore!',
      text: 'Il prodotto non è presente nello store.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  scannedCode.value = '';
};

const cancel = () => {
  router.back();
};
</script>

<style scoped>
/* General Layout */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f9f9f9;
}

/* Header Section */
header {
  background-color: #fbbf24; /* Yellow background */
  color: #333; /* Dark text */
  padding: 1rem;
  text-align: center;
}

header h1 {
  font-size: 2rem;
  margin-top: 0.5rem;
}

/* Main Content */
main {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: auto;
}

/* Left Column Styles */
.instructions {
  font-size: 1rem;
  color: #4b5563; /* Text color for instructions */
}

.method {
  font-size: 1rem;
  color: #4b5563; /* Text color for method */
}

/* Right Column Styles */
.logo-container {
  margin-bottom: 1rem;
}

.logo-image {
  width: 70%;
  max-width: 250px;
  height: auto;
}

.text-container {
  margin-bottom: 1rem;
}

.text-header {
  font-size: 1.5rem;
  color: #333;
}

.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.input-field {
  width: 100%;
  max-width: 400px;
  border-radius: 0.375rem;
  border: 2px solid #d1d5db;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:hover {
  border-color: #fa8900;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.input-field:focus {
  border-color: #fa8900;
  box-shadow: 0 0 0 3px rgba(250, 137, 0, 0.3);
  outline: none;
}

/* Footer Section */
footer {
  background-color: #fff;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
}
</style>
