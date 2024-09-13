import { onMounted } from 'vue';
import { useProductStore } from '../../stores/productStore';
import { useDiscountStore } from '../../stores/discountStore'; // Importa il discountStore
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Accedi allo store per gestire gli articoli e la paginazione
const productStore = useProductStore();
const discountStore = useDiscountStore(); // Accedi al discountStore
// Funzione per rimuovere un elemento utilizzando l'indice nella pagina corrente
const removeItem = (indexInPage) => {
    productStore.removeItem(indexInPage);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("product-list bg-gray-100 flex flex-col h-full") }, });
    // @ts-ignore
    const __VLS_0 = {}
        .ElCard;
    ({}.ElCard);
    ({}.ElCard);
    __VLS_components.ElCard;
    __VLS_components.elCard;
    __VLS_components.ElCard;
    __VLS_components.elCard;
    // @ts-ignore
    [ElCard, ElCard,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("flex flex-col h-full") }, }));
    const __VLS_2 = __VLS_1({ ...{ class: ("flex flex-col h-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ class: ("flex flex-col h-full") }, }));
    const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("content-scrollable flex-1 p-4 overflow-y-auto") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("divide-y divide-gray-200") }, });
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.productStore.paginatedItems))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), ...{ class: (([
                    {
                        'bg-green-500': index === 0,
                        'bg-yellow-300': item === __VLS_ctx.productStore.highlightItem && index !== 0
                    },
                    'flex justify-between items-center p-2'
                ])) }, ...{ class: ("py-4 flex justify-between items-center") }, });
        __VLS_styleScopedClasses = ([
            {
                'bg-green-500': index === 0,
                'bg-yellow-300': item === productStore.highlightItem && index !== 0
            },
            'flex justify-between items-center p-2'
        ]);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("font-medium text-lg truncate w-2/3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (item.name);
        // @ts-ignore
        [productStore, productStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center w-1/3 justify-end") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-blue-600 font-semibold mr-4") }, });
        (item.price.toFixed(2));
        // @ts-ignore
        const __VLS_6 = {}
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
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ 'onClick': {} }, type: ("danger"), size: ("small"), ...{ class: ("px-4 py-1") }, }));
        const __VLS_8 = __VLS_7({ ...{ 'onClick': {} }, type: ("danger"), size: ("small"), ...{ class: ("px-4 py-1") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({ ...{ 'onClick': {} }, type: ("danger"), size: ("small"), ...{ class: ("px-4 py-1") }, }));
        let __VLS_12;
        const __VLS_13 = {
            onClick: (...[$event]) => {
                __VLS_ctx.removeItem(index);
                // @ts-ignore
                [removeItem,];
            }
        };
        const __VLS_11 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8));
        let __VLS_9;
        let __VLS_10;
        __VLS_nonNullable(__VLS_11.slots).default;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("footer bg-white border-t border-gray-200 p-4 flex flex-col") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center mb-4") }, });
    // @ts-ignore
    const __VLS_14 = {}
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
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.productStore.currentPage === 1)), size: ("small"), ...{ class: ("px-4 py-2 text-xl") }, }));
    const __VLS_16 = __VLS_15({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.productStore.currentPage === 1)), size: ("small"), ...{ class: ("px-4 py-2 text-xl") }, }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    ({}({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.productStore.currentPage === 1)), size: ("small"), ...{ class: ("px-4 py-2 text-xl") }, }));
    let __VLS_20;
    const __VLS_21 = {
        onClick: (__VLS_ctx.productStore.previousPage)
    };
    const __VLS_19 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16));
    let __VLS_17;
    let __VLS_18;
    // @ts-ignore
    [productStore, productStore,];
    __VLS_nonNullable(__VLS_19.slots).default;
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("font-medium text-lg") }, });
    (__VLS_ctx.productStore.currentPage);
    (__VLS_ctx.productStore.totalPages);
    // @ts-ignore
    [productStore, productStore,];
    // @ts-ignore
    const __VLS_22 = {}
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
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.productStore.currentPage === __VLS_ctx.productStore.totalPages)), size: ("small"), ...{ class: ("text-xl px-4 py-2") }, }));
    const __VLS_24 = __VLS_23({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.productStore.currentPage === __VLS_ctx.productStore.totalPages)), size: ("small"), ...{ class: ("text-xl px-4 py-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    ({}({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.productStore.currentPage === __VLS_ctx.productStore.totalPages)), size: ("small"), ...{ class: ("text-xl px-4 py-2") }, }));
    let __VLS_28;
    const __VLS_29 = {
        onClick: (__VLS_ctx.productStore.nextPage)
    };
    const __VLS_27 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_22, __VLS_24));
    let __VLS_25;
    let __VLS_26;
    // @ts-ignore
    [productStore, productStore, productStore,];
    __VLS_nonNullable(__VLS_27.slots).default;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-xl font-bold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-3xl font-bold text-blue-800") }, });
    (__VLS_ctx.productStore.totalAmount.toFixed(2));
    // @ts-ignore
    [productStore,];
    if (__VLS_ctx.discountStore.isDiscountApplied) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-xl font-medium") }, });
        // @ts-ignore
        [discountStore,];
        if (__VLS_ctx.discountStore.discountDetails.discount_type === 'percentage') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-xl text-red-600") }, });
            (__VLS_ctx.discountStore.discountDetails.value);
            // @ts-ignore
            [discountStore, discountStore,];
        }
        if (__VLS_ctx.discountStore.discountDetails.discount_type === 'fixed') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xl text-red-600") }, });
            (__VLS_ctx.discountStore.discountDetails.value);
            // @ts-ignore
            [discountStore, discountStore,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-xl font-medium") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-3xl font-bold text-green-800") }, });
        (__VLS_ctx.discountStore.discountedTotal.toFixed(2));
        // @ts-ignore
        [discountStore,];
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['product-list'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['h-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['h-full'];
        __VLS_styleScopedClasses['content-scrollable'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['overflow-y-auto'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['divide-y'];
        __VLS_styleScopedClasses['divide-gray-200'];
        __VLS_styleScopedClasses['py-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['w-2/3'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['w-1/3'];
        __VLS_styleScopedClasses['justify-end'];
        __VLS_styleScopedClasses['text-blue-600'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mr-4'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-1'];
        __VLS_styleScopedClasses['footer'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['border-t'];
        __VLS_styleScopedClasses['border-gray-200'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-blue-800'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-red-600'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-red-600'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-green-800'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                productStore: productStore,
                discountStore: discountStore,
                removeItem: removeItem,
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
