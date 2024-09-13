const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    value: Number
});
const dragStart = (event) => {
    event.dataTransfer.setData('money', props.value);
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        value: Number
    },
});
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onDragstart: (__VLS_ctx.dragStart) }, ...{ class: ("coin") }, draggable: ("true"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), viewBox: ("0 0 100 100"), ...{ class: ("w-full h-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({ cx: ("50"), cy: ("50"), r: ("45"), fill: ("#f9c74f"), stroke: ("#f2ae00"), "stroke-width": ("5"), });
    // @ts-ignore
    [dragStart,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({ x: ("50%"), y: ("50%"), "text-anchor": ("middle"), dy: (".3em"), "font-size": ("20"), fill: ("#333"), "font-family": ("Arial"), "font-weight": ("bold"), });
    (__VLS_ctx.value);
    // @ts-ignore
    [value,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['coin'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['h-full'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                $props: __VLS_makeOptional(props),
                ...props,
                dragStart: dragStart,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
;
