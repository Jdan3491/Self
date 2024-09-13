import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useTestModeStore } from '@/stores/testModeStore'; // Importa lo store per la modalità di test
import supabase from '../../config/supabaseClient.js';
import { useProductStore } from '../../stores/productStore';
import Swal from 'sweetalert2';
import AnimatedButton from '../AnimatedButton.vue';
import CardComponent from '../CardComponent.vue';
import removeProductIcon from '@/assets/removeproduct_icon.svg';
import SaleIcon from '@/assets/sale.svg';
import KeyboardIcon from '@/assets/keyboard.svg';
import SpeechSynthesis from '../../utils/speechSynthesis.js';
import AudioAmplifier from '../../utils/audioAmplifier.js';
import useVolume from '../../composables/useVolume.js';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { volume, getVolume, setVolume } = useVolume();
const scannedCode = ref('');
let lastKeyTime = 0;
let scanTimeout = null;
const router = useRouter();
const productStore = useProductStore();
const testModeStore = useTestModeStore(); // Usa lo store per determinare se la modalità hardware è attiva
watch(volume, (newVolume) => {
    if (newVolume === 0) {
        SpeechSynthesis.stop();
    }
    else {
        SpeechSynthesis.setVolume(newVolume / 100);
        AudioAmplifier.setVolume(newVolume / 100);
    }
});
const handleScan = async (code) => {
    if (code.trim() === '')
        return;
    try {
        const { data, error } = await supabase
            .from('product')
            .select('*')
            .eq('productcode', code);
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
            const priceHasDecimals = product.price % 1 !== 0;
            let message;
            if (priceHasDecimals) {
                const integerPart = Math.floor(product.price);
                const decimalPart = Math.round((product.price - integerPart) * 100);
                message = `Prezzo: ${integerPart} euro e ${decimalPart} centesimi.`;
            }
            else {
                message = `Prezzo: ${product.price} euro.`;
            }
            SpeechSynthesis.speak(`${product.name}. ${message}`, {
                volume: getVolume() / 100,
            });
        }
        else {
            Swal.fire({
                title: 'Errore!',
                text: 'Prodotto non trovato!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    catch (error) {
        console.error('Errore inatteso:', error);
        Swal.fire({
            title: 'Errore!',
            text: 'Si è verificato un errore. Riprova.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    finally {
        scannedCode.value = '';
    }
};
const handleKeydown = (event) => {
    // Verifica se la modalità hardware è attiva
    if (!testModeStore.isHardwareInstalled) {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastKeyTime;
        if (timeDiff < 50) {
            scannedCode.value += event.key;
        }
        else {
            scannedCode.value = event.key;
        }
        lastKeyTime = currentTime;
        clearTimeout(scanTimeout);
        scanTimeout = setTimeout(() => {
            if (scannedCode.value.length > 3) {
                handleScan(scannedCode.value);
                scannedCode.value = ''; // Reset del codice scansionato
            }
        }, 100);
    }
    else {
        // La modalità hardware non è attiva, quindi esci dalla funzione
        return;
    }
};
const navigateToRemoveItem = () => {
    router.push('/remove-item');
};
const usePromotion = () => {
    router.push({ name: 'SalesView' });
};
const writeItemCode = async () => {
    const { value: code } = await Swal.fire({
        title: 'Inserisci Codice Articolo',
        input: 'text',
        inputLabel: 'Codice Articolo',
        inputPlaceholder: 'Inserisci il codice',
        showCancelButton: true,
        confirmButtonText: 'Conferma',
        cancelButtonText: 'Annulla',
        inputValidator: (value) => {
            if (!value) {
                return 'Devi inserire un codice!';
            }
        }
    });
    if (code) {
        await handleScan(code);
    }
};
const proceedToPayment = () => {
    if (Number(productStore.totalAmount) == 0 && productStore.items.length == 0) {
        Swal.fire({
            title: 'Errore!',
            text: 'Devi acquistare almeno un prodotto',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    else {
        router.push({ name: 'bagselection' });
    }
};
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onKeydown: (__VLS_ctx.handleKeydown) }, ...{ class: ("relative bg-white flex flex-col w-full h-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-shop-svg bg-cover bg-center z-0") }, });
    // @ts-ignore
    [handleKeydown,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("buttons-grid z-10 mt-6 mb-4 flex-grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("button-row") }, });
    // @ts-ignore
    [CardComponent,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CardComponent, new CardComponent({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Rimuovi articolo"), icon: ((__VLS_ctx.removeProductIcon)), }));
    const __VLS_1 = __VLS_0({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Rimuovi articolo"), icon: ((__VLS_ctx.removeProductIcon)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Rimuovi articolo"), icon: ((__VLS_ctx.removeProductIcon)), }));
    let __VLS_5;
    const __VLS_6 = {
        onClick: (__VLS_ctx.navigateToRemoveItem)
    };
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(CardComponent, __VLS_1));
    let __VLS_2;
    let __VLS_3;
    // @ts-ignore
    [removeProductIcon, navigateToRemoveItem,];
    // @ts-ignore
    [CardComponent,];
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(CardComponent, new CardComponent({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Usa Buono Spesa"), icon: ((__VLS_ctx.SaleIcon)), }));
    const __VLS_8 = __VLS_7({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Usa Buono Spesa"), icon: ((__VLS_ctx.SaleIcon)), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Usa Buono Spesa"), icon: ((__VLS_ctx.SaleIcon)), }));
    let __VLS_12;
    const __VLS_13 = {
        onClick: (__VLS_ctx.usePromotion)
    };
    const __VLS_11 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(CardComponent, __VLS_8));
    let __VLS_9;
    let __VLS_10;
    // @ts-ignore
    [SaleIcon, usePromotion,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("button-row") }, });
    // @ts-ignore
    [CardComponent,];
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(CardComponent, new CardComponent({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Scrivi Codice Articolo"), icon: ((__VLS_ctx.KeyboardIcon)), }));
    const __VLS_15 = __VLS_14({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Scrivi Codice Articolo"), icon: ((__VLS_ctx.KeyboardIcon)), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    ({}({ ...{ 'onClick': {} }, ...{ class: ("card-component") }, title: ("Scrivi Codice Articolo"), icon: ((__VLS_ctx.KeyboardIcon)), }));
    let __VLS_19;
    const __VLS_20 = {
        onClick: (__VLS_ctx.writeItemCode)
    };
    const __VLS_18 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(CardComponent, __VLS_15));
    let __VLS_16;
    let __VLS_17;
    // @ts-ignore
    [KeyboardIcon, writeItemCode,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("z-10 mb-8 flex justify-center w-full") }, });
    // @ts-ignore
    [AnimatedButton,];
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(AnimatedButton, new AnimatedButton({ ...{ class: ("start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6") }, title: ("Pagamento"), onClick: ((__VLS_ctx.proceedToPayment)), "aria-label": ("Start"), }));
    const __VLS_22 = __VLS_21({ ...{ class: ("start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6") }, title: ("Pagamento"), onClick: ((__VLS_ctx.proceedToPayment)), "aria-label": ("Start"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ ...{ class: ("start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6") }, title: ("Pagamento"), onClick: ((__VLS_ctx.proceedToPayment)), "aria-label": ("Start"), }));
    const __VLS_25 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(AnimatedButton, __VLS_22));
    // @ts-ignore
    [proceedToPayment,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['h-full'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['inset-0'];
        __VLS_styleScopedClasses['bg-shop-svg'];
        __VLS_styleScopedClasses['bg-cover'];
        __VLS_styleScopedClasses['bg-center'];
        __VLS_styleScopedClasses['z-0'];
        __VLS_styleScopedClasses['buttons-grid'];
        __VLS_styleScopedClasses['z-10'];
        __VLS_styleScopedClasses['mt-6'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['flex-grow'];
        __VLS_styleScopedClasses['button-row'];
        __VLS_styleScopedClasses['card-component'];
        __VLS_styleScopedClasses['card-component'];
        __VLS_styleScopedClasses['button-row'];
        __VLS_styleScopedClasses['card-component'];
        __VLS_styleScopedClasses['z-10'];
        __VLS_styleScopedClasses['mb-8'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['start-button'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-green-700'];
        __VLS_styleScopedClasses['hover:bg-green-800'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['transform'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-300'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['lg:text-3xl'];
        __VLS_styleScopedClasses['lg:p-6'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                AnimatedButton: AnimatedButton,
                CardComponent: CardComponent,
                removeProductIcon: removeProductIcon,
                SaleIcon: SaleIcon,
                KeyboardIcon: KeyboardIcon,
                handleKeydown: handleKeydown,
                navigateToRemoveItem: navigateToRemoveItem,
                usePromotion: usePromotion,
                writeItemCode: writeItemCode,
                proceedToPayment: proceedToPayment,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
