// src/stores/imgStore.js
import { defineStore } from 'pinia';
import bigBagIcon from '@/assets/bigbag.svg';
import ecologicBagIcon from '@/assets/ecologicbag.svg';
import plastichbagIcon from '@/assets/plastichbag.svg';
import PaypalIcon from '@/assets/paypal.png';
import creditCardIcon from '@/assets/noun-credit.svg';
import cashIcon from '@/assets/cash_icon.svg';

export const useImgStore = defineStore('imgStore', {
  state: () => ({
    icons: {
      bigBag: bigBagIcon,
      ecologicBag: ecologicBagIcon,
      plasticBag: plastichbagIcon,
      paypalIcon: PaypalIcon,
      creditCard: creditCardIcon,
      cash: cashIcon,
    }
  }),
  getters: {
    getIcon: (state) => (type) => {
      return state.icons[type] || ''; // Default to empty string if type is not found
    }
  }
});
