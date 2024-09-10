<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">
    <!-- Include Header Component -->
    <MainHeader
      leftText="Pagamento"
      :showButton="false"
    />

    <!-- Main Content Section -->
    <main class="flex-grow flex items-center justify-center p-6">
      <!-- Container for Layout -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Column: Informazioni sul pagamento -->
        <div class="flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <div class="payment-info text-center lg:text-left">
            <p class="font-semibold text-lg mb-4">Dettagli del pagamento:</p>
            <div class="summary mb-6 p-4 bg-gray-200 rounded-lg shadow-md">
              <h2 class="font-bold text-xl text-red-500 mb-2">Importo Totale:</h2>
              <p class="font-bold text-3xl text-green-600">€{{ totalAmount.toFixed(2) }}</p>
            </div>
            <div class="method p-4 bg-yellow-200 rounded-lg shadow-md">
              <h2 class="font-bold text-xl text-yellow-700 mb-2">Pagamento con Carta</h2>
              <p>
                Inserisci la tua carta nel terminale per completare il pagamento. Il terminale riconoscerà automaticamente la carta e procederà con la transazione.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Status del Terminale -->
        <div class="flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <div class="flex justify-center mb-4">
            <img
              src="@/assets/payment_terminal.svg"
              alt="Payment Terminal Icon"
              class="logo-image"
            />
          </div>
          <div class="text-container text-center">
            <h1 class="text-header text-5xl font-bold">Terminale Pronto</h1>
            <p class="text-xl text-gray-600">Inserisci la tua carta per pagare</p>
          </div>
          <div class="input-container flex justify-center lg:justify-center mb-6">
            <!-- Icona o messaggio che simula lo stato del terminale -->
            <div class="terminal-status p-4 bg-green-100 rounded-lg shadow-md">
              <p class="font-semibold text-green-700">Terminale connesso e in attesa della carta...</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <FooterComponent
      :button1="{
        title: 'Indietro',
        onClick: cancel,
        ariaLabel: 'Indietro',
        className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
      }"
      :button2="{
        title: 'Conferma Pagamento',
        onClick: confirmPayment,
        ariaLabel: 'Conferma Pagamento',
        className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
      }"
      button1Align="left"
      button2Align="right"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useProductStore } from '@/stores/productStore';
import { useDiscountStore } from '@/stores/discountStore';
import { ref } from 'vue';
import axios from 'axios';

const productStore = useProductStore();
const discountStore = useDiscountStore();
const router = useRouter();

const totalAmount = ref(
  discountStore.discountedTotal > 0
    ? discountStore.discountedTotal + productStore.bagsCost
    : productStore.totalAmountWithBags
);

const confirmPayment = async () => {
  try {
    // Ottenere il token SumUp dal backend
    const tokenResponse = await axios.get('/sumup/token');
    const { access_token } = tokenResponse.data;

    // Avviare la transazione con SumUp dal backend
    const transactionResponse = await axios.post('/sumup/transaction', {
      token: access_token,
      amount: Number(totalAmount.value),
      currency: 'EUR', // Modifica la valuta in base alle tue esigenze
    });

    // Mostrare il messaggio di successo se il pagamento è andato a buon fine
    Swal.fire({
      title: 'Pagamento Completato!',
      text: 'Grazie per il tuo acquisto.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
    });

    // Dopo 3 secondi reindirizza alla pagina 'welcome'
    setTimeout(() => {
      router.push({ name: 'welcome' });
    }, 3000);
  } catch (error) {
    console.error('Errore durante il pagamento:', error);
    Swal.fire({
      title: 'Errore',
      text: 'Si è verificato un errore durante il pagamento. Riprova.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

const cancel = () => {
  router.back();
};
</script>

<style scoped>
/* Main Content Section */
main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}

.text-container {
  margin-bottom: 1.5rem;
}

.terminal-status {
  font-size: 1rem;
  color: #4b5563;
}
</style>
