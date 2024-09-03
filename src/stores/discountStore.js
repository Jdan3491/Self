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
      const _totalProducts = productStore.totalAmount;
      let discountedTotal = 0;

      if (state.discountDetails) {
        if (state.discountDetails.discount_type === 'percentage') {
          const discountAmount = (state.discountDetails.value / 100) * _totalProducts;
          discountedTotal = _totalProducts - discountAmount;
        } else if (state.discountDetails.discount_type === 'fixed') {
          discountedTotal = (Number(_totalProducts) <= Number(state.discountDetails.value)) ? 0 : (Number(_totalProducts) - Number(state.discountDetails.value));
        }
      }
      return discountedTotal;
    },
  }  
});
