<template>
  <div class="flex-1 bg-white p-6 flex flex-col gap-4">
    <!-- Image Button: Remove Item -->
    <el-button class="flex-1" type="danger" @click="navigateToRemoveItem">
      <img src="https://img.icons8.com/plasticine/100/000000/delete-forever.png" alt="Remove Item" class="w-10 h-10 mr-2 inline">
      <span class="text-xl">Rimuovi articolo</span>
    </el-button>

    <!-- Image Button: Use Promotion -->
    <el-button class="flex-1" type="primary" @click="usePromotion">
      <img src="https://img.icons8.com/fluency/48/000000/sale.png" alt="Promotion" class="w-10 h-10 mr-2 inline">
      <span class="text-xl">Usa Promozione</span>
    </el-button>

    <!-- Image Button: Write Item Code -->
    <el-button class="flex-1" type="default" @click="writeItemCode">
      <img src="https://img.icons8.com/fluency/48/000000/barcode.png" alt="Write Code" class="w-10 h-10 mr-2 inline">
      <span class="text-xl">Scrivi Codice Articolo</span>
    </el-button>

    <!-- Payment Button -->
    <el-button type="success" class="flex-1 text-2xl" @click="proceedToPayment">
      <img src="https://img.icons8.com/color/48/000000/money-bag-euro.png" alt="Payment" class="w-10 h-10 mr-2 inline">
      Pagamento
    </el-button>

    <!-- Simulated Barcode Scanner Input -->
    <div class="mt-4">
      <input
        type="text"
        v-model="scannedCode"
        placeholder="Inserisci il codice a barre"
        @keydown.enter.prevent="handleScan"
        class="border p-2 w-full"
      />
      <el-button class="mt-2" type="primary" @click="handleScan">Simula Scan</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../../config/supabaseClient.js';
import { useProductStore } from '../../stores/productStore';
import Swal from 'sweetalert2';

const scannedCode = ref('');
const router = useRouter();
const productStore = useProductStore();

const handleScan = async () => {
  if (scannedCode.value.trim() === '') return;

  try {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('productcode', scannedCode.value);

    if (error) {
      Swal.fire({
        title: 'Errore!',
        text: 'Errore durante la scansione. Riprova.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (data && data.length > 0) {
      const product = data[0];
      productStore.addItem(product);
    } else {
      Swal.fire({
        title: 'Errore!',
        text: 'Prodotto non trovato!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    console.error('Errore inatteso:', error);
    Swal.fire({
      title: 'Errore!',
      text: 'Si è verificato un errore. Riprova.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } finally {
    scannedCode.value = '';
  }
};

const navigateToRemoveItem = () => {
  router.push({ name: 'RemoveItem' }); // Navigate to RemoveItem screen
};

const usePromotion = () => {
  // Implement logic to use a promotion
};

const writeItemCode = () => {
  // Implement logic to write item code
};

const proceedToPayment = () => {
  router.push({ name: 'BagSelection' }); // Navigate to BagSelection screen
};
</script>

<style scoped>
.text-xl {
  font-size: 1.5rem;
}
.text-2xl {
  font-size: 1.75rem;
}
.flex-1 {
  flex: 1;
}
.mt-4 {
  margin-top: 1rem;
}
.w-10 {
  width: 2.5rem;
}
.h-10 {
  height: 2.5rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.border {
  border: 1px solid #e5e7eb;
}
.p-2 {
  padding: 0.5rem;
}
</style>
