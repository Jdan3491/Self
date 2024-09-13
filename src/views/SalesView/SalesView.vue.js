import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { useDiscountStore } from '../../stores/discountStore';
import { ElInput, ElDivider, ElButton } from 'element-plus';
import supabase from '../../config/supabaseClient.js';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const store = useDiscountStore();
const discountCode = ref(store.discountCode);
const discountDetails = ref(store.discountDetails);
watch(() => store.discountDetails, (newDetails) => {
    discountDetails.value = newDetails;
});
const applyDiscount = async () => {
    if (discountCode.value.trim() === '')
        return;
    const code = discountCode.value.trim();
    const { data: discount, error: discountError } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();
    if (discountError) {
        Swal.fire({
            title: 'Errore!',
            text: 'Si è verificato un errore durante la verifica del codice sconto.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('Errore Supabase:', discountError);
    }
    else if (discount) {
        store.setDiscountDetails(discount);
        Swal.fire({
            title: 'Successo!',
            text: `Codice sconto "${code}" applicato correttamente.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
    else {
        Swal.fire({
            title: 'Errore!',
            text: 'Il codice sconto inserito non è valido o non è più attivo.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    discountCode.value = '';
};
const removeDiscount = () => {
    store.clearDiscount();
    Swal.fire({
        title: 'Successo!',
        text: 'Codice sconto rimosso e pronto per una nuova scansione.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
};
const goBack = () => {
    router.back();
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
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Gestione Codici Sconto"), showButton: ((false)), }));
    const __VLS_1 = __VLS_0({ leftText: ("Gestione Codici Sconto"), showButton: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Gestione Codici Sconto"), showButton: ((false)), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-grow p-6 gap-4 grid grid-cols-1 lg:grid-cols-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-col") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-semibold text-gray-800 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-gray-600") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-col items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-semibold text-gray-800 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full max-w-md") }, });
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
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ modelValue: ((__VLS_ctx.discountCode)), placeholder: ("Inserisci il codice sconto"), clearable: (true), ...{ class: ("w-full") }, }));
    const __VLS_7 = __VLS_6({ modelValue: ((__VLS_ctx.discountCode)), placeholder: ("Inserisci il codice sconto"), clearable: (true), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    ({}({ modelValue: ((__VLS_ctx.discountCode)), placeholder: ("Inserisci il codice sconto"), clearable: (true), ...{ class: ("w-full") }, }));
    const __VLS_10 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7));
    // @ts-ignore
    [discountCode,];
    if (__VLS_ctx.discountDetails) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 bg-blue-50 p-6 rounded-lg shadow-md w-full max-w-md") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("font-bold text-xl text-blue-600 mb-3") }, });
        // @ts-ignore
        [discountDetails,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.discountDetails.code);
        // @ts-ignore
        [discountDetails,];
        // @ts-ignore
        const __VLS_11 = {}
            .ElDivider;
        ({}.ElDivider);
        __VLS_components.ElDivider;
        __VLS_components.elDivider;
        // @ts-ignore
        [ElDivider,];
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
        const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
        ({}({}));
        const __VLS_16 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-gray-800") }, });
        if (__VLS_ctx.discountDetails.discount_type === 'percentage') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-5xl") }, });
            (__VLS_ctx.discountDetails.value);
            // @ts-ignore
            [discountDetails, discountDetails,];
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-5xl") }, });
            (__VLS_ctx.discountDetails.value);
            // @ts-ignore
            [discountDetails,];
        }
        // @ts-ignore
        const __VLS_17 = {}
            .ElDivider;
        ({}.ElDivider);
        __VLS_components.ElDivider;
        __VLS_components.elDivider;
        // @ts-ignore
        [ElDivider,];
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
        const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
        ({}({}));
        const __VLS_22 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.discountDetails.description);
        // @ts-ignore
        [discountDetails,];
        // @ts-ignore
        const __VLS_23 = {}
            .ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({ ...{ 'onClick': {} }, type: ("danger"), size: ("small"), ...{ class: ("mt-4") }, }));
        const __VLS_25 = __VLS_24({ ...{ 'onClick': {} }, type: ("danger"), size: ("small"), ...{ class: ("mt-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        ({}({ ...{ 'onClick': {} }, type: ("danger"), size: ("small"), ...{ class: ("mt-4") }, }));
        let __VLS_29;
        const __VLS_30 = {
            onClick: (__VLS_ctx.removeDiscount)
        };
        const __VLS_28 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_23, __VLS_25));
        let __VLS_26;
        let __VLS_27;
        // @ts-ignore
        [removeDiscount,];
        __VLS_nonNullable(__VLS_28.slots).default;
    }
    // @ts-ignore
    [FooterComponent,];
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(FooterComponent, new FooterComponent({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.goBack,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Applica Codice',
            onClick: __VLS_ctx.applyDiscount,
            ariaLabel: 'Applica Codice',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }));
    const __VLS_32 = __VLS_31({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.goBack,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Applica Codice',
            onClick: __VLS_ctx.applyDiscount,
            ariaLabel: 'Applica Codice',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    ({}({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.goBack,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Applica Codice',
            onClick: __VLS_ctx.applyDiscount,
            ariaLabel: 'Applica Codice',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }));
    const __VLS_35 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(FooterComponent, __VLS_32));
    // @ts-ignore
    [goBack, applyDiscount,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['h-screen'];
        __VLS_styleScopedClasses['w-screen'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['flex-grow'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-1'];
        __VLS_styleScopedClasses['lg:grid-cols-2'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-gray-600'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-md'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mt-6'];
        __VLS_styleScopedClasses['bg-blue-50'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-md'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-blue-600'];
        __VLS_styleScopedClasses['mb-3'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['text-5xl'];
        __VLS_styleScopedClasses['text-5xl'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-4'];
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
                ElInput: ElInput,
                ElDivider: ElDivider,
                ElButton: ElButton,
                discountCode: discountCode,
                discountDetails: discountDetails,
                applyDiscount: applyDiscount,
                removeDiscount: removeDiscount,
                goBack: goBack,
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
