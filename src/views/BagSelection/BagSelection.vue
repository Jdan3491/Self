<template>
  <div class="container">
    <!-- Header -->
    <h2 class="header">Seleziona il Sacchetto</h2>

    <!-- Bag Type Selection Section -->
    <div class="bag-selection">
      <div
        v-for="type in bagTypes"
        :key="type.value"
        class="card"
        :class="{ 'selected': form.bagType === type.value }"
        @click="selectBagType(type.value)"
      >
        <img :src="type.image" alt="Bag Type" class="card-image">
        <h3 class="card-title">{{ type.label }}</h3>
        <p class="card-description">{{ type.description }}</p>
        <p class="card-cost">€{{ type.cost.toFixed(2) }}</p>
      </div>
    </div>

    <!-- Quantity Input Section -->
    <div class="quantity-section">
      <el-form :model="form">
        <el-form-item label="Quantità" required>
          <el-input-number
            v-model="form.quantity"
            :min="1"
            :max="100"
            class="quantity-input"
            placeholder="Inserisci quantità"
          />
        </el-form-item>
      </el-form>
    </div>

    <!-- Total Cost Section -->
    <div class="total-cost">
      <p class="total-text">Totale Articoli: €{{ totalItemsCost.toFixed(2) }}</p>
      <p class="total-text">Costo Sacchetto: €{{ bagCost.toFixed(2) }}</p>
      <p class="total-final">Totale Finale: €{{ totalFinalCost.toFixed(2) }}</p>
    </div>

    <!-- Confirm and Cancel Buttons -->
    <div class="action-buttons">
      <el-button type="primary" class="confirm-button" @click="confirmSelection">Conferma</el-button>
      <el-button class="cancel-button" @click="cancel">Annulla</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

// Define available bag types with images, descriptions, and costs
const bagTypes = ref([
  { value: 'paper', label: 'Carta', image: 'https://img.icons8.com/fluency/48/000000/paper-bag.png', description: 'Sacchetto ecologico di carta.', cost: 0.50 },
  { value: 'plastic', label: 'Plastica', image: 'https://img.icons8.com/fluency/48/000000/plastic-bag.png', description: 'Sacchetto resistente di plastica.', cost: 0.30 },
  { value: 'reusable', label: 'Riutilizzabile', image: 'https://img.icons8.com/fluency/48/000000/reusable-bag.png', description: 'Sacchetto riutilizzabile.', cost: 1.00 }
]);

// Form model
const form = ref({
  bagType: '',
  quantity: 1
});

// Example total items cost, replace with actual calculation from your data
const totalItemsCost = ref(50.00); // Assume €50 as the total cost of items

// Bag cost
const bagCost = computed(() => {
  const selectedBag = bagTypes.value.find(bag => bag.value === form.value.bagType);
  return selectedBag ? selectedBag.cost : 0;
});

// Total final cost
const totalFinalCost = computed(() => totalItemsCost.value + (bagCost.value * form.value.quantity));

// Router instance
const router = useRouter();

// Select bag type
const selectBagType = (value) => {
  form.value.bagType = value;
};

// Confirm selection
const confirmSelection = () => {
  if (!form.value.bagType || form.value.quantity <= 0) {
    Swal.fire({
      title: 'Errore!',
      text: 'Per favore, seleziona un tipo di sacchetto e una quantità valida.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Navigate to Payment screen
  router.push({ name: 'Payment' });
};

// Cancel selection
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

.bag-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
  max-width: 60rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 12rem;
  height: 15rem;
  cursor: pointer;
  background-color: #ffffff;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card.selected {
  border-color: #1d4ed8;
  background-color: #f0faff;
}

.card-image {
  width: 6rem;
  height: 6rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.card-cost {
  font-size: 1rem;
  color: #1d4ed8;
  font-weight: bold;
}

.quantity-section {
  width: 100%;
  max-width: 30rem;
  margin-bottom: 1.5rem;
}

.quantity-input {
  width: 100%;
}

.total-cost {
  width: 100%;
  max-width: 30rem;
  text-align: center;
  margin-bottom: 2rem;
}

.total-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.total-final {
  font-size: 1.25rem;
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
