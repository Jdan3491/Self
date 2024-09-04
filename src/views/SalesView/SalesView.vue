<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">
    <!-- Header Section -->
    <MainHeader
    leftText="Gestione Codici Sconto"
    :showButton="false"
  />

    <!-- Main Content Section -->
    <main class="flex-grow flex items-center justify-center p-4">
      <!-- Container for Layout -->
      <div class="flex flex-col lg:flex-row lg:w-2/3 gap-6 max-w-6xl">
        <!-- Left Column: Instructions -->
        <div class="flex flex-col items-center lg:items-start lg:w-1/2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div class="instructions text-center lg:text-left mb-4">
            <p class="font-semibold text-xl mb-2 text-gray-800">Gestisci il Codice Sconto:</p>
            <div class="method p-6 bg-gray-100 rounded-lg shadow-inner">
              <h2 class="font-bold text-2xl text-red-600 mb-3">Validazione Codice</h2>
              <p class="text-gray-700 leading-relaxed">
                Inserisci o scansiona un codice sconto. Se un codice è già applicato,
                sarà rimosso quando ne viene inserito uno nuovo. Solo un codice
                sconto può essere valido alla volta.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Input Field -->
        <div class="flex flex-col items-center lg:items-end lg:w-1/2 p-4">
          <div class="text-container mb-6 text-center lg:text-right">
            <h1 class="text-3xl font-bold text-gray-800">Inserisci il Codice Sconto</h1>
          </div>
          <div class="relative input-container w-full max-w-md">
            <el-input
              v-model="discountCode"
              placeholder="Inserisci il codice sconto"
              clearable
              class="input-field"
            ></el-input>
          </div>

          <!-- Section for showing applied discount details -->
<div
v-if="discountDetails" class="mt-6 p-6 bg-blue-50 rounded-lg shadow-lg border border-blue-200 discount-details"
>
<h1 class="font-bold text-2xl text-blue-600 mb-3">Dettagli del Codice Sconto</h1>
<p class="text-gray-800"><strong>Codice:</strong> {{ discountDetails.code }}</p>
<el-divider />
<h1 class="text-gray-800">
  <!-- Conditionally render the discount value -->
  <span v-if="discountDetails.discount_type === 'percentage'" class="text-5xl">
    {{ discountDetails.value }}%
  </span>
  <span v-else-if="discountDetails.discount_type === 'fixed'" class="text-5xl">
    - €{{ discountDetails.value }}
  </span>
</h1>
<el-divider />
<p class="text-gray-800"><strong>Descrizione:</strong> {{ discountDetails.description }}</p>
<button @click="removeDiscount" class="mt-4 remove-discount-button">
  Rimuovi Codice Sconto
</button>
</div>

        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="flex-shrink-0 bg-white p-4 border-t border-gray-200 flex justify-between">
      <button
        class="cancel-button text-2xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out"
        @click="goBack"
        aria-label="Indietro"
        v-play-sound="'src/assets/click_sound.mp3'"
      >
        Indietro
      </button>
      <button
        class="animated-button text-2xl p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out"
        @click="applyDiscount"
        aria-label="Applica"
        v-play-sound="'src/assets/click_sound.mp3'"
      >
        Applica Codice
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import { useDiscountStore } from '../../stores/discountStore';
import supabase from '../../config/supabaseClient.js';

const router = useRouter();
const store = useDiscountStore(); // Usa lo store Pinia

const discountCode = ref(store.discountCode);
const discountDetails = ref(store.discountDetails);

// Watch per aggiornare il discountDetails dal store
import { watch } from 'vue';
watch(() => store.discountDetails, (newDetails) => {
  discountDetails.value = newDetails;
});

const applyDiscount = async () => {
  if (discountCode.value.trim() === '') return;

  const code = discountCode.value.trim();

  // Verifica se il codice sconto esiste e è attivo
  const { data: discount, error: discountError } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('code', code)
    .eq('is_active', true)
    .single();

  if (discountError) {
    Swal.fire({
      title: 'Errore!',
      text: 'Si è verificato un errore durante la verifica del codice sconto.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    console.error('Errore Supabase:', discountError);
  } else if (discount) {
    // Aggiorna i dettagli del codice nello store invece di modificare direttamente il database
    store.setDiscountDetails(discount);
    Swal.fire({
      title: 'Successo!',
      text: `Codice sconto "${code}" applicato correttamente.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: 'Errore!',
      text: 'Il codice sconto inserito non è valido o non è più attivo.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  discountCode.value = '';
};

const removeDiscount = () => {
  store.clearDiscount(); // Chiama l'azione dello store per rimuovere il codice sconto
  Swal.fire({
    title: 'Successo!',
    text: 'Codice sconto rimosso e pronto per una nuova scansione.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

const goBack = () => {
  router.back(); // Usa il router per tornare alla schermata precedente
};
</script>

<style scoped>
/* Styling migliorato per la sezione sinistra */
.instructions, .method {
  width: 100%;
  max-width: 600px;
}

.method {
  background: linear-gradient(145deg, #f0f0f3, #cacaca);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.method:hover {
  transform: translateY(-5px);
}

/* Altri stili migliorati */
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

.remove-button {
  position: absolute;
  top: 50%;
  right: -3rem;
  transform: translateY(-50%);
  background-color: #ff9800;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #e68900;
}

.remove-discount-button {
  background-color: #ff9800;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.remove-discount-button:hover {
  background-color: #e68900;
}

.discount-details {
  width: 100%;
  max-width: 600px;
  background-color: #e0f2ff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #90cdf4;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
