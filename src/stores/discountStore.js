import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useProductStore } from './productStore';

export const useDiscountStore = defineStore('discount', {
  state: () => ({
    discountCode: '',
    discountDetails: '',
    isDiscountApplied: false,
  }),
  actions: {
    setDiscountCode(code) {
      this.discountCode = code;
    },
    setDiscountDetails(details) {
      this.discountDetails = details;
      this.isDiscountApplied = !!details;
    },
    clearDiscount() {
      this.discountCode = '';
      this.discountDetails = null;
      this.isDiscountApplied = false;
    },
  },
  getters: {
    discountedTotal: (state) => {
      const productStore = useProductStore();
      const totalAmount = productStore.totalAmountWithBags.value;

      if (state.discountDetails) {
        if (state.discountDetails.type === 'percentage') {
          const discountAmount = (state.discountDetails.value / 100) * totalAmount;
          return totalAmount - discountAmount;
        } else if (state.discountDetails.type === 'fixed') {
          return totalAmount - state.discountDetails.value;
        }
      }
      return totalAmount;
    },
  },
});
