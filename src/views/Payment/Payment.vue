<template>
  <div class="container">
    <h2 class="header">Metodo di Pagamento</h2>
    
    <!-- Total Amount Section -->
    <div class="total-section">
      <p class="total-text">Totale da Pagare:</p>
      <p class="total-amount">€{{ totalAmount.toFixed(2) }}</p>
    </div>

    <!-- Payment Method Selection -->
    <div class="payment-methods">
      <div 
        v-for="method in paymentMethods"
        :key="method.value"
        class="method-card"
        :class="{ 'selected': selectedMethod === method.value }"
        @click="selectPaymentMethod(method.value)"
      >
        <img :src="method.icon" alt="Payment Method Icon" class="method-icon">
        <h3 class="method-title">{{ method.label }}</h3>
      </div>
    </div>

    <!-- Confirm and Cancel Buttons -->
    <div class="action-buttons">
      <el-button 
        type="primary" 
        class="confirm-button" 
        @click="confirmPayment"
        :disabled="!selectedMethod"
      >
        Conferma Pagamento
      </el-button>
      <el-button 
        class="cancel-button" 
        @click="cancel"
      >
        Annulla
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

// Define available payment methods
const paymentMethods = ref([
  { value: 'credit_card', label: 'Carta di Credito', icon: 'https://img.icons8.com/ios/50/000000/credit-card.png' },
  { value: 'paypal', label: 'PayPal', icon: 'https://img.icons8.com/ios/50/000000/paypal.png' },
  { value: 'cash', label: 'Contante', icon: 'https://img.icons8.com/ios/50/000000/cash.png' }
]);

// Form model to keep track of selected payment method
const selectedMethod = ref('');

// Total amount to be paid
const totalAmount = ref(75.00); // Replace with dynamic amount

// Router instance
const router = useRouter();

// Select payment method
const selectPaymentMethod = (value) => {
  selectedMethod.value = value;
};

// Confirm payment
const confirmPayment = () => {
  if (!selectedMethod.value) {
    Swal.fire({
      title: 'Errore!',
      text: 'Per favore, seleziona un metodo di pagamento.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (selectedMethod.value === 'cash') {
    // Navigate to CashService screen if payment method is cash
    router.push({ name: 'CashService' });
  } else {
    Swal.fire({
      title: 'Successo!',
      text: 'Pagamento completato con successo.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push({ name: 'ConfirmationPage' }); // Navigate to a confirmation page or receipt screen
    });
  }
};

// Cancel action
const cancel = () => {
  router.back(); // Navigate back to the previous page
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  background-color: #f9fafb;
}

.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.total-section {
  margin-bottom: 2rem;
  text-align: center;
}

.total-text {
  font-size: 1.25rem;
}

.total-amount {
  font-size: 2rem;
  font-weight: bold;
  color: #1d4ed8;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.method-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 12rem;
  height: 15rem;
  cursor: pointer;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.method-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.method-card.selected {
  border-color: #1d4ed8;
  background-color: #f0faff;
}

.method-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
}

.method-title {
  font-size: 1.125rem;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 30rem;
}

.confirm-button {
  width: 100%;
  font-size: 1rem;
}

.cancel-button {
  width: 100%;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
}
</style>
