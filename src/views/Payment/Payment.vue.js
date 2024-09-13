import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import AnimatedButton from '../../components/AnimatedButton.vue';
import { useImgStore } from '@/stores/imgStore';
import { useProductStore } from '@/stores/productStore'; // Import the product store
import { useDiscountStore } from '@/stores/discountStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const imgStore = useImgStore();
const productStore = useProductStore(); // Initialize the product store
const discountStore = useDiscountStore(); // Accedi al discountStore
// Define available payment methods
const paymentMethods = ref([
    { value: 'creditCard', label: 'Carta di Credito' },
    { value: 'paypalIcon', label: 'PayPal' },
    { value: 'cash', label: 'Contante' }
]);
// Form model to keep track of selected payment method
const selectedMethod = ref('');
// Total amount to be paid
const totalAmount = ref(discountStore.discountedTotal > 0
    ? discountStore.discountedTotal + productStore.bagsCost
    : productStore.totalAmountWithBags);
// Router instance
const router = useRouter();
// Select payment method
const selectPaymentMethod = (value) => {
    selectedMethod.value = value; // Update the selected method
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
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
            if (selectedMethod.value === 'cash') {
                router.push({ name: 'CashService' });
            }
            else {
                // Page Card Contatless
                if (selectedMethod.value === 'creditCard') {
                    router.push({ name: '_Contactpass' });
                }
                else if (selectedMethod.value === 'paypalIcon') {
                    router.push({ name: '_paypal' });
                }
            }
        }
    });
};
// Cancel action
const cancel = () => {
    router.back(); // Navigate back to the previous page
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col h-screen w-screen bg-gray-100") }, });
    // @ts-ignore
    [MainHeader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Metodo di Pagamento"), showButton: ((false)), }));
    const __VLS_1 = __VLS_0({ leftText: ("Metodo di Pagamento"), showButton: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Metodo di Pagamento"), showButton: ((false)), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-grow overflow-auto p-4 flex flex-col items-center justify-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("total-section text-center mb-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("total-text text-xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("total-amount text-4xl font-bold text-blue-600") }, });
    (__VLS_ctx.totalAmount.toFixed(2));
    // @ts-ignore
    [totalAmount,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("payment-methods flex flex-wrap gap-4 justify-center") }, });
    for (const [method] of __VLS_getVForSourceType((__VLS_ctx.paymentMethods))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.selectPaymentMethod(method.value);
                    // @ts-ignore
                    [paymentMethods, selectPaymentMethod,];
                } }, key: ((method.value)), ...{ class: ("card p-4 border rounded-lg shadow-md bg-white cursor-pointer transition-transform duration-300 ease-in-out") }, ...{ class: (({ 'border-blue-600 bg-blue-50': __VLS_ctx.selectedMethod === method.value })) }, });
        __VLS_styleScopedClasses = ({ 'border-blue-600 bg-blue-50': selectedMethod === method.value });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imgStore.getIcon(method.value))), alt: ("Payment Method Icon"), ...{ class: ("icon") }, });
        // @ts-ignore
        [selectedMethod, imgStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-semibold mt-2") }, });
        (method.label);
    }
    // @ts-ignore
    [FooterComponent,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(FooterComponent, new FooterComponent({ button1: (({
            title: 'Annulla',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Annulla',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Pagamento',
            onClick: __VLS_ctx.confirmPayment,
            ariaLabel: 'Pagamento',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }));
    const __VLS_6 = __VLS_5({ button1: (({
            title: 'Annulla',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Annulla',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Pagamento',
            onClick: __VLS_ctx.confirmPayment,
            ariaLabel: 'Pagamento',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({ button1: (({
            title: 'Annulla',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Annulla',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Pagamento',
            onClick: __VLS_ctx.confirmPayment,
            ariaLabel: 'Pagamento',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }));
    const __VLS_9 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(FooterComponent, __VLS_6));
    // @ts-ignore
    [cancel, confirmPayment,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['h-screen'];
        __VLS_styleScopedClasses['w-screen'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['flex-grow'];
        __VLS_styleScopedClasses['overflow-auto'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['total-section'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['mb-8'];
        __VLS_styleScopedClasses['total-text'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['total-amount'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-blue-600'];
        __VLS_styleScopedClasses['payment-methods'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-wrap'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['card'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['transition-transform'];
        __VLS_styleScopedClasses['duration-300'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['icon'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mt-2'];
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
                FooterComponent: FooterComponent,
                imgStore: imgStore,
                paymentMethods: paymentMethods,
                selectedMethod: selectedMethod,
                totalAmount: totalAmount,
                selectPaymentMethod: selectPaymentMethod,
                confirmPayment: confirmPayment,
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
