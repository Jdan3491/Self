<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">

    <!-- Include Header Component -->
    <MainHeader
    leftText="Metodo di Pagamento"
    :showButton="false"
  />

    <!-- Main Content Section -->
    <main class="flex-grow overflow-auto p-4 flex flex-col items-center justify-center">
      <!-- Total Amount Section -->
      <div class="total-section text-center mb-8">
        <p class="total-text text-xl">Totale da Pagare:</p>
        <p class="total-amount text-4xl font-bold text-blue-600">€{{ totalAmount.toFixed(2) }}</p>
      </div>

      <!-- Payment Method Selection -->
      <div class="payment-methods flex flex-wrap gap-4 justify-center">
        <div v-play-sound="'src/assets/click_sound.mp3'"
          v-for="method in paymentMethods"
          :key="method.value"
          class="card p-4 border rounded-lg shadow-md bg-white cursor-pointer transition-transform duration-300 ease-in-out"
          :class="{ 'border-blue-600 bg-blue-50': selectedMethod === method.value }"
          @click="selectPaymentMethod(method.value)"
        >
          <img :src="imgStore.getIcon(method.value)" alt="Payment Method Icon" class="icon" />
          <h3 class="text-lg font-semibold mt-2">{{ method.label }}</h3>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <FooterComponent
:button1="{
  title: 'Annulla',
  onClick: cancel,
  ariaLabel: 'Annulla',
  className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
}"
button1Align="left"
:button2="{
  title: 'Pagamento',
  onClick: confirmPayment,
  ariaLabel: 'Pagamento',
  className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
}"
button2Align="right"
/>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import MainHeader from '../../components/MainHeader.vue'
import FooterComponent from '../../components/FooterComponent.vue';
import AnimatedButton from '../../components/AnimatedButton.vue'
import { useImgStore } from '@/stores/imgStore'
import { useProductStore } from '@/stores/productStore' // Import the product store
import { useDiscountStore } from '@/stores/discountStore'
const imgStore = useImgStore()
const productStore = useProductStore() // Initialize the product store
const discountStore = useDiscountStore() // Accedi al discountStore
// Define available payment methods
const paymentMethods = ref([
  { value: 'creditCard', label: 'Carta di Credito' },
  { value: 'paypalIcon', label: 'PayPal' },
  { value: 'cash', label: 'Contante' }
])

// Form model to keep track of selected payment method
const selectedMethod = ref('')

// Total amount to be paid
const totalAmount = ref(
  discountStore.discountedTotal > 0
    ? discountStore.discountedTotal + productStore.bagsCost
    : productStore.totalAmountWithBags
)

// Router instance
const router = useRouter()

// Select payment method
const selectPaymentMethod = (value) => {
  selectedMethod.value = value // Update the selected method
}

// Confirm payment
const confirmPayment = () => {
  if (!selectedMethod.value) {
    Swal.fire({
      title: 'Errore!',
      text: 'Per favore, seleziona un metodo di pagamento.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    return
  }

  Swal.fire({
    title: 'Hai carte sconti da applicare?',
    icon: 'warning',
    confirmButtonText: 'Scannerrizza sconti',
    cancelButtonText: 'No Prosegui al pagamento',
    allowOutsideClick: false,
    showCancelButton: true,
    showConfirmButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Applica sconti
      router.push({ name: 'SalesView' });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      if (selectedMethod.value === 'cash') {
        router.push({ name: 'CashService' })
      } else {
        // Page Card Contatless
      }
    }
  })
}

// Cancel action
const cancel = () => {
  router.back() // Navigate back to the previous page
}
</script>

<style scoped>
.card {
  width: 200px; /* Larghezza aumentata per una forma quadrata più grande */
  height: 200px; /* Altezza aumentata per una forma quadrata più grande */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Mantieni il colore di sfondo bianco */
  border: 4px solid #ffd814; /* Bordo dello stesso colore del background */
  border-radius: 8px; /* Raggio del bordo arrotondato */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombra leggera */
  text-align: center;
  padding: 1.5rem; /* Spaziatura interna */
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; /* Transizione per interazioni */
}

.card:hover {
  transform: translateY(-2px); /* Leggero movimento verso l'alto al passaggio del mouse */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Ombra più profonda al passaggio del mouse */
}

.card:focus {
  outline: none;
  border: 2px solid #ffd814; /* Mantieni il bordo dello stesso colore del background */
}

.border-blue-600 {
  border-color: #1d4ed8 !important; /* Blue border color when selected */
}

.bg-blue-50 {
  background-color: #f0faff !important; /* Light blue background when selected */
}

.icon {
  width: 60px;
  height: 60px;
  margin-bottom: 0.75rem;
}
</style>
