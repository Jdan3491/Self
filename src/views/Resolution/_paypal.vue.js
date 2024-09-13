import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import FooterComponent from '@/components/FooterComponent.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const totalAmount = ref(0); // Imposta l'importo totale dinamicamente in base alla tua logica
const router = useRouter();
const cancel = () => {
    router.back();
};
const confirmPayment = async () => {
    try {
        // Ottenere il token PayPal dal backend
        const tokenResponse = await axios.get('/paypal/token');
        const { access_token } = tokenResponse.data;
        // Mostrare il messaggio di successo se il pagamento è andato a buon fine
        Swal.fire({
            title: 'Pagamento Completato!',
            text: 'Grazie per il tuo acquisto.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
        });
        // Dopo 3 secondi reindirizza alla pagina 'welcome'
        setTimeout(() => {
            router.push({ name: 'welcome' });
        }, 3000);
    }
    catch (error) {
        console.error('Errore durante il pagamento:', error);
        Swal.fire({
            title: 'Errore',
            text: 'Si è verificato un errore durante il pagamento. Riprova.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
};
// Funzione per caricare il pulsante PayPal
onMounted(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR'; // Inserisci il tuo Client ID di PayPal e valuta
    script.onload = () => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                            amount: {
                                value: totalAmount.value.toFixed(2),
                            },
                        }],
                });
            },
            onApprove: async (data, actions) => {
                try {
                    await actions.order.capture();
                    confirmPayment(); // Conferma il pagamento
                }
                catch (error) {
                    console.error('Errore durante la cattura dell\'ordine:', error);
                    Swal.fire({
                        title: 'Errore',
                        text: 'Si è verificato un errore durante il pagamento. Riprova.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            },
            onError: (err) => {
                console.error('Errore durante il pagamento:', err);
                Swal.fire({
                    title: 'Errore',
                    text: 'Si è verificato un errore durante il pagamento. Riprova.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            },
        }).render('#paypal-button-container');
    };
    document.body.appendChild(script);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col h-screen w-screen bg-gray-100") }, });
    // @ts-ignore
    [MainHeader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Pagamento"), showButton: ((false)), }));
    const __VLS_1 = __VLS_0({ leftText: ("Pagamento"), showButton: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Pagamento"), showButton: ((false)), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-grow flex items-center justify-center p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:flex-row gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("payment-info text-center lg:text-left") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-semibold text-lg mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary mb-6 p-4 bg-gray-200 rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("font-bold text-xl text-red-500 mb-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-bold text-3xl text-green-600") }, });
    (__VLS_ctx.totalAmount.toFixed(2));
    // @ts-ignore
    [totalAmount,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("method p-4 bg-yellow-200 rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("font-bold text-xl text-yellow-700 mb-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("paypal-button-container mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("paypal-button-container"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/payment_terminal.svg"), alt: ("Payment Terminal Icon"), ...{ class: ("logo-image") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-container text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-header text-5xl font-bold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xl text-gray-600") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-container flex justify-center lg:justify-center mb-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("terminal-status p-4 bg-green-100 rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-semibold text-green-700") }, });
    // @ts-ignore
    [FooterComponent,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(FooterComponent, new FooterComponent({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button2: (({
            title: 'Conferma Pagamento',
            onClick: __VLS_ctx.confirmPayment,
            ariaLabel: 'Conferma Pagamento',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button1Align: ("left"), button2Align: ("right"), }));
    const __VLS_6 = __VLS_5({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button2: (({
            title: 'Conferma Pagamento',
            onClick: __VLS_ctx.confirmPayment,
            ariaLabel: 'Conferma Pagamento',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button1Align: ("left"), button2Align: ("right"), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button2: (({
            title: 'Conferma Pagamento',
            onClick: __VLS_ctx.confirmPayment,
            ariaLabel: 'Conferma Pagamento',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button1Align: ("left"), button2Align: ("right"), }));
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
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['lg:flex-row'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['lg:w-1/2'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['payment-info'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['lg:text-left'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['summary'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-gray-200'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-red-500'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['text-green-600'];
        __VLS_styleScopedClasses['method'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-yellow-200'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-yellow-700'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['paypal-button-container'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['lg:w-1/2'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['logo-image'];
        __VLS_styleScopedClasses['text-container'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['text-header'];
        __VLS_styleScopedClasses['text-5xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-gray-600'];
        __VLS_styleScopedClasses['input-container'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['lg:justify-center'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['terminal-status'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-green-100'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-green-700'];
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
                totalAmount: totalAmount,
                cancel: cancel,
                confirmPayment: confirmPayment,
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
