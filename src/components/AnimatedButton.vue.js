import { computed } from 'vue';
import { defineProps } from 'vue';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const { title, onClick, ariaLabel, className } = props;
// Compute the class based on whether className prop is provided
const computedClass = computed(() => {
    return className ? className : 'animated-button';
});
function handleClick() {
    if (onClick) {
        onClick();
    }
}
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleClick) }, ...{ class: ((__VLS_ctx.computedClass)) }, "aria-label": ((__VLS_ctx.ariaLabel)), });
    __VLS_styleScopedClasses = (computedClass);
    (__VLS_ctx.title);
    // @ts-ignore
    [handleClick, computedClass, ariaLabel, title,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                title: title,
                ariaLabel: ariaLabel,
                computedClass: computedClass,
                handleClick: handleClick,
            };
        },
        props: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {},
});
;
