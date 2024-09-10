<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">
    <!-- Include Header Component -->
    <MainHeader leftText="Pagamento" :showButton="false" />

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
              <h2 class="font-bold text-xl text-yellow-700 mb-2">Pagamento con PayPal</h2>
              <p>
                Clicca il pulsante qui sotto per procedere con il pagamento tramite PayPal.
              </p>
              <div class="paypal-button-container mt-4">
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Status del Terminale -->
        <div class="flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <div class="flex justify-center mb-4">
            <img src="@/assets/payment_terminal.svg" alt="Payment Terminal Icon" class="logo-image" />
          </div>
          <div class="text-container text-center">
            <h1 class="text-header text-5xl font-bold">Terminale Pronto</h1>
            <p class="text-xl text-gray-600">Procedi con il pagamento tramite PayPal</p>
          </div>
          <div class="input-container flex justify-center lg:justify-center mb-6">
            <div class="terminal-status p-4 bg-green-100 rounded-lg shadow-md">
              <p class="font-semibold text-green-700">Terminale connesso e pronto per il pagamento PayPal...</p>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const totalAmount = ref(0); // Imposta l'importo totale dinamicamente in base alla tua logica
const router = useRouter();

const cancel = () => {
  router.back();
};

const confirmPayment = async () => {
  try {
    // Ottenere il token PayPal dal backend
    const tokenResponse = await axios.get('/paypal/token');
    const { access_token } = tokenResponse.data;

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

// Funzione per caricare il pulsante PayPal
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR'; // Inserisci il tuo Client ID di PayPal e valuta
  script.onload = () => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalAmount.value.toFixed(2),
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        try {
          await actions.order.capture();
          confirmPayment(); // Conferma il pagamento
        } catch (error) {
          console.error('Errore durante la cattura dell\'ordine:', error);
          Swal.fire({
            title: 'Errore',
            text: 'Si è verificato un errore durante il pagamento. Riprova.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      onError: (err) => {
        console.error('Errore durante il pagamento:', err);
        Swal.fire({
          title: 'Errore',
          text: 'Si è verificato un errore durante il pagamento. Riprova.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    }).render('#paypal-button-container');
  };
  document.body.appendChild(script);
});
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

.paypal-button-container {
  margin-top: 1rem;
}
</style>
