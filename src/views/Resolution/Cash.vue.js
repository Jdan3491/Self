import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import AnimatedButton from '../../components/AnimatedButton.vue';
import CoinSvg from './CoinSvg.vue';
import BanknoteSvg from './BanknoteSvg.vue';
import { useProductStore } from '@/stores/productStore';
import { useDiscountStore } from '@/stores/discountStore';
import { useTestModeStore } from '@/stores/testModeStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Access the product and test mode stores
const productStore = useProductStore();
const discountStore = useDiscountStore();
const testModeStore = useTestModeStore();
// Total amount to be paid
const totalAmount = ref(discountStore.discountedTotal > 0
    ? discountStore.discountedTotal + productStore.bagsCost
    : productStore.totalAmountWithBags);
// Reactive variable for inserted amount
const insertedAmount = ref(0.0);
// Error message for invalid coin or banknote
const errorMessage = ref("");
// Compute the remaining amount and change
const remainingAmount = computed(() => Math.max(0, (totalAmount.value ?? 0) - insertedAmount.value));
const change = computed(() => Math.max(0, insertedAmount.value - (totalAmount.value ?? 0)));
// Footer visibility (disappears when a banknote is inserted)
const showFooter = ref(true);
// Function to handle drag-and-drop simulation of coins or banknotes
const onDrop = (event) => {
    const moneyAmount = parseFloat(event.dataTransfer.getData('money'));
    if (moneyAmount) {
        insertedAmount.value += moneyAmount;
        // Hide the footer if a banknote is inserted
        if (moneyAmount >= 5) {
            showFooter.value = false;
        }
        if (remainingAmount.value === 0) {
            localStorage.clear();
            Swal.fire({
                title: 'Successo!',
                text: 'Pagamento completato con successo.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                router.push({ name: 'welcome' });
            });
        }
        else if (remainingAmount.value < 0) {
            Swal.fire({
                title: 'Pagamento completato!',
                text: `Resto: ${change.value.toFixed(2)}€`,
                icon: 'info',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                router.push({ name: 'welcome' });
            });
        }
    }
    else {
        errorMessage.value = "Errore nel riconoscimento della moneta o banconota.";
    }
};
// Router instance
const router = useRouter();
// Cancel action
const cancel = () => {
    router.back();
};
// Lifecycle hook for page load
onMounted(() => {
    console.log('Tot Spesa: ', productStore.totalAmount?.toFixed(2) || '0.00');
    console.log('Tot Borse: ', productStore.totalAmountWithBags?.toFixed(2) || '0.00');
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col h-screen w-screen bg-gray-100 relative") }, });
    // @ts-ignore
    [MainHeader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Pagamento in Contanti"), showButton: ((false)), }));
    const __VLS_1 = __VLS_0({ leftText: ("Pagamento in Contanti"), showButton: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Pagamento in Contanti"), showButton: ((false)), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-grow p-4 flex flex-col items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl font-medium text-gray-600 mb-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-2 gap-6 w-full max-w-lg mb-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg text-gray-500 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-2xl text-blue-700 font-bold") }, });
    (__VLS_ctx.totalAmount?.toFixed(2) || '0.00');
    // @ts-ignore
    [totalAmount,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg text-gray-500 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-2xl text-blue-700 font-bold") }, });
    (__VLS_ctx.insertedAmount.toFixed(2));
    // @ts-ignore
    [insertedAmount,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg text-gray-500 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-2xl text-red-600 font-bold") }, });
    (__VLS_ctx.remainingAmount?.toFixed(2) || '0.00');
    // @ts-ignore
    [remainingAmount,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg text-gray-500 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-2xl text-green-600 font-bold") }, });
    (__VLS_ctx.change?.toFixed(2) || '0.00');
    // @ts-ignore
    [change,];
    if (!__VLS_ctx.testModeStore.isHardwareInstalled) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onDragover: () => { } }, ...{ onDrop: (__VLS_ctx.onDrop) }, ...{ class: ("w-full max-w-lg h-24 border-2 border-yellow-400 rounded-lg mt-8 flex items-center justify-center slot") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center text-gray-500") }, });
        // @ts-ignore
        [testModeStore, onDrop,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col space-y-6 w-full max-w-lg mt-8") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center space-x-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col items-center p-4 bg-white shadow-md rounded-lg border-2 border-yellow-400") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-semibold mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex space-x-4") }, });
        // @ts-ignore
        [CoinSvg,];
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(CoinSvg, new CoinSvg({ value: ((0.50)), }));
        const __VLS_6 = __VLS_5({ value: ((0.50)), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        ({}({ value: ((0.50)), }));
        const __VLS_9 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(CoinSvg, __VLS_6));
        // @ts-ignore
        [CoinSvg,];
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(CoinSvg, new CoinSvg({ value: ((1)), }));
        const __VLS_11 = __VLS_10({ value: ((1)), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        ({}({ value: ((1)), }));
        const __VLS_14 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(CoinSvg, __VLS_11));
        // @ts-ignore
        [CoinSvg,];
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(CoinSvg, new CoinSvg({ value: ((2)), }));
        const __VLS_16 = __VLS_15({ value: ((2)), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        ({}({ value: ((2)), }));
        const __VLS_19 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(CoinSvg, __VLS_16));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center space-x-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col items-center p-4 bg-white shadow-md rounded-lg border-2 border-yellow-400") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-semibold mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex space-x-4") }, });
        // @ts-ignore
        [BanknoteSvg,];
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(BanknoteSvg, new BanknoteSvg({ value: ((5)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_21 = __VLS_20({ value: ((5)), ...{ class: ("w-32 h-16") }, }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        ({}({ value: ((5)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_24 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(BanknoteSvg, __VLS_21));
        // @ts-ignore
        [BanknoteSvg,];
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(BanknoteSvg, new BanknoteSvg({ value: ((10)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_26 = __VLS_25({ value: ((10)), ...{ class: ("w-32 h-16") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({ value: ((10)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_29 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(BanknoteSvg, __VLS_26));
        // @ts-ignore
        [BanknoteSvg,];
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(BanknoteSvg, new BanknoteSvg({ value: ((20)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_31 = __VLS_30({ value: ((20)), ...{ class: ("w-32 h-16") }, }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        ({}({ value: ((20)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_34 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(BanknoteSvg, __VLS_31));
        // @ts-ignore
        [BanknoteSvg,];
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent(BanknoteSvg, new BanknoteSvg({ value: ((50)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_36 = __VLS_35({ value: ((50)), ...{ class: ("w-32 h-16") }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
        ({}({ value: ((50)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_39 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(BanknoteSvg, __VLS_36));
        // @ts-ignore
        [BanknoteSvg,];
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(BanknoteSvg, new BanknoteSvg({ value: ((100)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_41 = __VLS_40({ value: ((100)), ...{ class: ("w-32 h-16") }, }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        ({}({ value: ((100)), ...{ class: ("w-32 h-16") }, }));
        const __VLS_44 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(BanknoteSvg, __VLS_41));
    }
    if (__VLS_ctx.errorMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4 text-red-600") }, });
        (__VLS_ctx.errorMessage);
        // @ts-ignore
        [errorMessage, errorMessage,];
    }
    if (__VLS_ctx.showFooter) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("flex-shrink-0 bg-white p-4 border-t border-gray-200 flex justify-between") }, });
        // @ts-ignore
        [AnimatedButton,];
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(AnimatedButton, new AnimatedButton({ ...{ class: ("cancel-button text-4xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out") }, title: ("Annulla"), onClick: ((__VLS_ctx.cancel)), "aria-label": ("Annulla"), }));
        const __VLS_46 = __VLS_45({ ...{ class: ("cancel-button text-4xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out") }, title: ("Annulla"), onClick: ((__VLS_ctx.cancel)), "aria-label": ("Annulla"), }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        ({}({ ...{ class: ("cancel-button text-4xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out") }, title: ("Annulla"), onClick: ((__VLS_ctx.cancel)), "aria-label": ("Annulla"), }));
        const __VLS_49 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(AnimatedButton, __VLS_46));
        // @ts-ignore
        [showFooter, cancel,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['h-screen'];
        __VLS_styleScopedClasses['w-screen'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['flex-grow'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-600'];
        __VLS_styleScopedClasses['mb-8'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-2'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-lg'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['text-blue-700'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['text-blue-700'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['text-red-600'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['text-green-600'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-lg'];
        __VLS_styleScopedClasses['h-24'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['mt-8'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['slot'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['space-y-6'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-lg'];
        __VLS_styleScopedClasses['mt-8'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['space-x-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['space-x-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['space-x-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-yellow-400'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['space-x-4'];
        __VLS_styleScopedClasses['w-32'];
        __VLS_styleScopedClasses['h-16'];
        __VLS_styleScopedClasses['w-32'];
        __VLS_styleScopedClasses['h-16'];
        __VLS_styleScopedClasses['w-32'];
        __VLS_styleScopedClasses['h-16'];
        __VLS_styleScopedClasses['w-32'];
        __VLS_styleScopedClasses['h-16'];
        __VLS_styleScopedClasses['w-32'];
        __VLS_styleScopedClasses['h-16'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['text-red-600'];
        __VLS_styleScopedClasses['flex-shrink-0'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['border-t'];
        __VLS_styleScopedClasses['border-gray-200'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['cancel-button'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-200'];
        __VLS_styleScopedClasses['ease-in-out'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                MainHeader: MainHeader,
                AnimatedButton: AnimatedButton,
                CoinSvg: CoinSvg,
                BanknoteSvg: BanknoteSvg,
                testModeStore: testModeStore,
                totalAmount: totalAmount,
                insertedAmount: insertedAmount,
                errorMessage: errorMessage,
                remainingAmount: remainingAmount,
                change: change,
                showFooter: showFooter,
                onDrop: onDrop,
                cancel: cancel,
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
