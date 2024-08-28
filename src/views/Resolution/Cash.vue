<template>
      <div class="container">
        <!-- Payment Information -->
        <div class="payment-info">
          <h1 class="title">Pagamento in Contanti</h1>
          
          <!-- Subtitle -->
          <h2 class="subtitle">Inserisci Monete</h2>
          
          <!-- Amount Information Grid -->
          <div class="amount-grid">
            <!-- Balance to Pay -->
            <div class="amount-item">
              <p class="amount-label">Saldo da Pagare:</p>
              <p class="amount-value">{{ totalAmount.toFixed(2) }}€</p>
            </div>
            
            <!-- Amount Already Inserted -->
            <div class="amount-item">
              <p class="amount-label">Saldo Inserito:</p>
              <p class="amount-value">{{ insertedAmount.toFixed(2) }}€</p>
            </div>
            
            <!-- Amount Remaining -->
            <div class="amount-item">
              <p class="amount-label">Restante da Pagare:</p>
              <p class="amount-remaining">{{ remainingAmount.toFixed(2) }}€</p>
            </div>
            
            <!-- Change to be Given -->
            <div class="amount-item">
              <p class="amount-label">Resto:</p>
              <p class="amount-change">{{ change.toFixed(2) }}€</p>
            </div>
          </div>
          
          <!-- Button Section -->
          <div class="button-section">
            <el-button 
              type="primary" 
              class="confirm-button"
              @click="confirmPayment"
              :disabled="remainingAmount.value > 0"
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
      </div>
    </template>
    
    <script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';
    
    // Total amount to be paid
    const totalAmount = ref(100.00); // Replace with the actual total amount
    
    // Amount already inserted
    const insertedAmount = ref(0.00); // This should be updated as coins are inserted
    
    // Calculate remaining amount
    const remainingAmount = computed(() => Math.max(0, totalAmount.value - insertedAmount.value));
    
    // Calculate change to be given
    const change = computed(() => Math.max(0, insertedAmount.value - totalAmount.value));
    
    // Router instance
    const router = useRouter();
    
    // Confirm payment
    const confirmPayment = () => {
      if (remainingAmount.value > 0) {
        Swal.fire({
          title: 'Errore!',
          text: 'Non hai inserito abbastanza denaro.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Successo!',
          text: 'Pagamento completato con successo.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to a confirmation page or receipt screen
          router.push({ name: 'ConfirmationPage' });
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
    
    .payment-info {
      text-align: center;
      width: 100%;
      max-width: 50rem; /* Increased width for better spacing in columns */
    }
    
    .title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #1d4ed8; /* Blue color for title */
    }
    
    .subtitle {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      color: #4b5563; /* Gray color for subtitle */
    }
    
    .amount-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .amount-item {
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .amount-label {
      font-size: 1.25rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    
    .amount-value {
      font-size: 2rem;
      color: #1d4ed8;
      font-weight: bold;
    }
    
    .amount-remaining {
      font-size: 2rem;
      color: #e11d48; /* Red color for remaining amount */
      font-weight: bold;
    }
    
    .amount-change {
      font-size: 2rem;
      color: #10b981; /* Green color for change */
      font-weight: bold;
    }
    
    .button-section {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 30rem; /* Adjusted for better button alignment */
    }
    
    .confirm-button {
      width: 100%;
      font-size: 1rem;
    }
    
    .cancel-button {
      width: 100%;
      font-size: 1rem;
      border: 1px solid #e5e7eb;
      background-color: #ffffff;
    }
    </style>
    