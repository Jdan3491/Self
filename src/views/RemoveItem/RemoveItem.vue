<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100" @keydown="handleKeydown">
    <!-- Include Header Component -->
    <MainHeader
      leftText="Rimuovi Prodotto"
      :showButton="false"
    />

    <!-- Main Content Section -->
    <main class="flex-grow flex items-center justify-center p-6">
      <!-- Container for Layout -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Column: Instructions -->
        <div class="flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <div class="instructions text-center lg:text-left">
            <p class="font-semibold text-lg mb-4">Due Metodi per Rimuovere un Prodotto:</p>
            <div v-if="!testModeStore.isHardwareInstalled" class="method mb-6 p-4 bg-gray-200 rounded-lg shadow-md">
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
        <div class="flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <div class="flex justify-center">
            <img
              src="@/assets/removeproduct_icon.svg"
              alt="Remove Product Icon"
              class="logo-image"
            />
          </div>
          <div class="text-container text-center">
            <h1 class="text-header text-5xl font-bold">Digita il prodotto da rimuovere</h1>
          </div>
          <div v-if="testModeStore.isHardwareInstalled" class="input-container flex justify-center lg:justify-center mb-6">
            <el-input
              v-model="scannedCode"
              placeholder="Inserisci il codice del prodotto"
              @keydown.enter.prevent="handleManualScan"
              clearable
              class="input-field"
            ></el-input>
          </div>
          <div v-else class="text-center p-4 text-lg font-bold text-green-600">
            <p>Modalità Scanner Attiva: Scansiona un codice a barre per rimuovere il prodotto.</p>
          </div>
        </div>
      </div>
    </main>

    <FooterComponent
      v-if="testModeStore.isHardwareInstalled"
      :button1="{
        title: 'Indietro',
        onClick: cancel,
        ariaLabel: 'Indietro',
        className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
      }"
      button1Align="left"
      :button2="{
        title: 'Rimuovi Articolo',
        onClick: handleManualScan,
        ariaLabel: 'Rimuovi Articolo',
        className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
      }"
      button2Align="right"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../../stores/productStore';
import { useTestModeStore } from '../../stores/testModeStore'; // Importa lo store per la modalità di test
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import FooterComponent from '../../components/FooterComponent.vue';

const router = useRouter();
const productStore = useProductStore();
const testModeStore = useTestModeStore(); // Usa lo store per determinare se la modalità hardware è attiva
const scannedCode = ref('');
let lastKeyTime = 0;
let scanTimeout = null;

// Funzione per gestire la rimozione del prodotto
const handleRemoveProduct = async (code) => {
  const product = productStore.items.find(item => item.productcode === code);

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

// Funzione per gestire l'inserimento manuale
const handleManualScan = () => {
  handleRemoveProduct(scannedCode.value);
};

// Funzione per gestire la scansione tramite barcode scanner
const handleKeydown = (event) => {
  // Verifica se la modalità hardware è attiva
  if (!testModeStore.isHardwareInstalled) {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastKeyTime;
    console.log('Hardware')

    if (timeDiff < 50) {
      scannedCode.value += event.key;
    } else {
      scannedCode.value = event.key;
    }

    lastKeyTime = currentTime;

    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(() => {
      if (scannedCode.value.length > 3) {
        handleRemoveProduct(scannedCode.value);
        scannedCode.value = ''; // Reset del codice scansionato
      }
    }, 100);
  }
};

// Funzione per il pulsante "Indietro"
const cancel = () => {
  router.back();
};

onMounted(() => {
  // Aggiungi listener per lo scanner solo se la modalità hardware è attiva
    window.addEventListener('keydown', handleKeydown);
    console.log(testModeStore.isHardwareInstalled)
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>


<style scoped>
/* Main Content Section */
main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem; /* Padding più ampio per spaziatura */
}

/* Container for Layout */
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Spazio tra le colonne in un layout a griglia */
}

/* Left Column Styles */
.instructions {
  font-size: 1rem;
  color: #4b5563; /* Testo delle istruzioni */
}

.method {
  font-size: 1rem;
  color: #4b5563; /* Testo del metodo */
}

/* Right Column Styles */
.logo-container {
  margin-bottom: 1.5rem;
}

.logo-image {
  width: 100%; /* Adatta l'immagine alla larghezza del contenitore */
  max-width: 250px;
  height: auto;
}

.text-container {
  margin-bottom: 1.5rem;
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
</style>
