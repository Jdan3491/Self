import { onMounted, onUnmounted } from 'vue'; // Import lifecycle hooks
import MainHeader from '../../components/MainHeader.vue';
import ProductList from '../../components/HomeView/ProductList.vue';
import RightPanel from '../../components/HomeView/RightPanel.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const requestSupport = () => {
    alert('Supporto richiesto.');
};
// Function to handle resizing
const handleResize = () => {
    const content = document.querySelector('.content');
    const viewportHeight = window.innerHeight;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    content.style.height = `${viewportHeight - headerHeight}px`;
};
// Set initial height on mount
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});
// Clean up on unmount
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    // @ts-ignore
    [MainHeader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Assistenza"), showButton: ((true)), onButtonClick: ((__VLS_ctx.requestSupport)), }));
    const __VLS_1 = __VLS_0({ leftText: ("Assistenza"), showButton: ((true)), onButtonClick: ((__VLS_ctx.requestSupport)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Assistenza"), showButton: ((true)), onButtonClick: ((__VLS_ctx.requestSupport)), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    // @ts-ignore
    [requestSupport,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("left-column") }, });
    // @ts-ignore
    [ProductList,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(ProductList, new ProductList({}));
    const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({}));
    const __VLS_9 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(ProductList, __VLS_6));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("right-column") }, });
    // @ts-ignore
    [RightPanel,];
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(RightPanel, new RightPanel({}));
    const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
    ({}({}));
    const __VLS_14 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(RightPanel, __VLS_11));
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['content'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['left-column'];
        __VLS_styleScopedClasses['right-column'];
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
                ProductList: ProductList,
                RightPanel: RightPanel,
                requestSupport: requestSupport,
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
