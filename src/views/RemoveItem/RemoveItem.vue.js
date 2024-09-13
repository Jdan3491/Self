import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../../stores/productStore';
import { useTestModeStore } from '../../stores/testModeStore'; // Importa lo store per la modalità di test
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import FooterComponent from '../../components/FooterComponent.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const productStore = useProductStore();
const testModeStore = useTestModeStore(); // Usa lo store per determinare se la modalità hardware è attiva
const scannedCode = ref('');
let lastKeyTime = 0;
let scanTimeout = null;
// Funzione per gestire la rimozione del prodotto
const handleRemoveProduct = async (code) => {
    const product = productStore.items.find(item => item.productcode === code);
    if (product) {
        try {
            productStore.removeItemById(product.id);
            Swal.fire({
                title: 'Successo!',
                text: 'Prodotto rimosso correttamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                router.back();
            });
        }
        catch (error) {
            console.error('Errore durante la rimozione del prodotto:', error);
            Swal.fire({
                title: 'Errore!',
                text: 'Si è verificato un errore durante la rimozione del prodotto.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    else {
        Swal.fire({
            title: 'Errore!',
            text: 'Il prodotto non è presente nello store.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    scannedCode.value = '';
};
// Funzione per gestire l'inserimento manuale
const handleManualScan = () => {
    handleRemoveProduct(scannedCode.value);
};
// Funzione per gestire la scansione tramite barcode scanner
const handleKeydown = (event) => {
    // Verifica se la modalità hardware è attiva
    if (!testModeStore.isHardwareInstalled) {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastKeyTime;
        console.log('Hardware');
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
                handleRemoveProduct(scannedCode.value);
                scannedCode.value = ''; // Reset del codice scansionato
            }
        }, 100);
    }
};
// Funzione per il pulsante "Indietro"
const cancel = () => {
    router.back();
};
onMounted(() => {
    // Aggiungi listener per lo scanner solo se la modalità hardware è attiva
    window.addEventListener('keydown', handleKeydown);
    console.log(testModeStore.isHardwareInstalled);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onKeydown: (__VLS_ctx.handleKeydown) }, ...{ class: ("flex flex-col h-screen w-screen bg-gray-100") }, });
    // @ts-ignore
    [MainHeader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Rimuovi Prodotto"), showButton: ((false)), }));
    const __VLS_1 = __VLS_0({ leftText: ("Rimuovi Prodotto"), showButton: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Rimuovi Prodotto"), showButton: ((false)), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    // @ts-ignore
    [handleKeydown,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-grow flex items-center justify-center p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:flex-row gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("instructions text-center lg:text-left") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-semibold text-lg mb-4") }, });
    if (!__VLS_ctx.testModeStore.isHardwareInstalled) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("method mb-6 p-4 bg-gray-200 rounded-lg shadow-md") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("font-bold text-xl text-red-500 mb-2") }, });
        // @ts-ignore
        [testModeStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("font-bold") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("method p-4 bg-yellow-200 rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("font-bold text-xl text-yellow-700 mb-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:w-1/2 p-4 bg-white rounded-lg shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/removeproduct_icon.svg"), alt: ("Remove Product Icon"), ...{ class: ("logo-image") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-container text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-header text-5xl font-bold") }, });
    if (__VLS_ctx.testModeStore.isHardwareInstalled) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-container flex justify-center lg:justify-center mb-6") }, });
        // @ts-ignore
        const __VLS_5 = {}
            .ElInput;
        ({}.ElInput);
        ({}.ElInput);
        __VLS_components.ElInput;
        __VLS_components.elInput;
        __VLS_components.ElInput;
        __VLS_components.elInput;
        // @ts-ignore
        [ElInput, ElInput,];
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.scannedCode)), placeholder: ("Inserisci il codice del prodotto"), clearable: (true), ...{ class: ("input-field") }, }));
        const __VLS_7 = __VLS_6({ ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.scannedCode)), placeholder: ("Inserisci il codice del prodotto"), clearable: (true), ...{ class: ("input-field") }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        ({}({ ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.scannedCode)), placeholder: ("Inserisci il codice del prodotto"), clearable: (true), ...{ class: ("input-field") }, }));
        let __VLS_11;
        const __VLS_12 = {
            onKeydown: (__VLS_ctx.handleManualScan)
        };
        const __VLS_10 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7));
        let __VLS_8;
        let __VLS_9;
        // @ts-ignore
        [testModeStore, scannedCode, handleManualScan,];
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center p-4 text-lg font-bold text-green-600") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (__VLS_ctx.testModeStore.isHardwareInstalled) {
        // @ts-ignore
        [FooterComponent,];
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(FooterComponent, new FooterComponent({ button1: (({
                title: 'Indietro',
                onClick: __VLS_ctx.cancel,
                ariaLabel: 'Indietro',
                className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
            })), button1Align: ("left"), button2: (({
                title: 'Rimuovi Articolo',
                onClick: __VLS_ctx.handleManualScan,
                ariaLabel: 'Rimuovi Articolo',
                className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
            })), button2Align: ("right"), }));
        const __VLS_14 = __VLS_13({ button1: (({
                title: 'Indietro',
                onClick: __VLS_ctx.cancel,
                ariaLabel: 'Indietro',
                className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
            })), button1Align: ("left"), button2: (({
                title: 'Rimuovi Articolo',
                onClick: __VLS_ctx.handleManualScan,
                ariaLabel: 'Rimuovi Articolo',
                className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
            })), button2Align: ("right"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        ({}({ button1: (({
                title: 'Indietro',
                onClick: __VLS_ctx.cancel,
                ariaLabel: 'Indietro',
                className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
            })), button1Align: ("left"), button2: (({
                title: 'Rimuovi Articolo',
                onClick: __VLS_ctx.handleManualScan,
                ariaLabel: 'Rimuovi Articolo',
                className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
            })), button2Align: ("right"), }));
        const __VLS_17 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(FooterComponent, __VLS_14));
        // @ts-ignore
        [testModeStore, handleManualScan, cancel,];
    }
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
        __VLS_styleScopedClasses['instructions'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['lg:text-left'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['method'];
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
        __VLS_styleScopedClasses['method'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-yellow-200'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-yellow-700'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['lg:w-1/2'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['logo-image'];
        __VLS_styleScopedClasses['text-container'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['text-header'];
        __VLS_styleScopedClasses['text-5xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['input-container'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['lg:justify-center'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['input-field'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-green-600'];
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
                testModeStore: testModeStore,
                scannedCode: scannedCode,
                handleManualScan: handleManualScan,
                handleKeydown: handleKeydown,
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
