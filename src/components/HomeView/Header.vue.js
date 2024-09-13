const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const showAssistance = () => {
    alert('Mostra assistenza.');
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("flex justify-between items-center p-4 shadow-md h-[10vh]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/Flag_of_Italy.svg"), alt: ("Flag of Italy"), ...{ class: ("w-12 h-12 rounded-full border-2 border-gray-300 shadow-md object-cover") }, });
    // @ts-ignore
    const __VLS_0 = {}
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 text-lg font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200") }, }));
    const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 text-lg font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 text-lg font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200") }, }));
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.showAssistance)
    };
    const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
    let __VLS_3;
    let __VLS_4;
    // @ts-ignore
    [showAssistance,];
    __VLS_nonNullable(__VLS_5.slots).default;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['h-[10vh]'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['w-12'];
        __VLS_styleScopedClasses['h-12'];
        __VLS_styleScopedClasses['rounded-full'];
        __VLS_styleScopedClasses['border-2'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['object-cover'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['hover:text-gray-900'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-2'];
        __VLS_styleScopedClasses['focus:ring-blue-500'];
        __VLS_styleScopedClasses['transition-colors'];
        __VLS_styleScopedClasses['duration-200'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                showAssistance: showAssistance,
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
