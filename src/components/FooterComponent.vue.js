import { defineProps } from 'vue';
import AnimatedButton from './AnimatedButton.vue';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    button1: {
        type: Object,
        default: () => ({})
    },
    button2: {
        type: Object,
        default: () => ({})
    }
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        button1: {
            type: Object,
            default: () => ({})
        },
        button2: {
            type: Object,
            default: () => ({})
        }
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("bg-white border-t-4 border-darkGreen p-4 flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-1 justify-start") }, });
    if (__VLS_ctx.button1) {
        // @ts-ignore
        [AnimatedButton,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(AnimatedButton, new AnimatedButton({ title: ((__VLS_ctx.button1.title)), onClick: ((__VLS_ctx.button1.onClick)), "aria-label": ((__VLS_ctx.button1.ariaLabel)), ...{ class: ((__VLS_ctx.button1.className)) }, ...{ class: ("button-large") }, }));
        const __VLS_1 = __VLS_0({ title: ((__VLS_ctx.button1.title)), onClick: ((__VLS_ctx.button1.onClick)), "aria-label": ((__VLS_ctx.button1.ariaLabel)), ...{ class: ((__VLS_ctx.button1.className)) }, ...{ class: ("button-large") }, }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({ title: ((__VLS_ctx.button1.title)), onClick: ((__VLS_ctx.button1.onClick)), "aria-label": ((__VLS_ctx.button1.ariaLabel)), ...{ class: ((__VLS_ctx.button1.className)) }, ...{ class: ("button-large") }, }));
        __VLS_styleScopedClasses = (button1.className);
        const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(AnimatedButton, __VLS_1));
        // @ts-ignore
        [button1, button1, button1, button1, button1,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-1 justify-end") }, });
    if (__VLS_ctx.button2) {
        // @ts-ignore
        [AnimatedButton,];
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(AnimatedButton, new AnimatedButton({ title: ((__VLS_ctx.button2.title)), onClick: ((__VLS_ctx.button2.onClick)), "aria-label": ((__VLS_ctx.button2.ariaLabel)), ...{ class: ((__VLS_ctx.button2.className)) }, ...{ class: ("button-large") }, }));
        const __VLS_6 = __VLS_5({ title: ((__VLS_ctx.button2.title)), onClick: ((__VLS_ctx.button2.onClick)), "aria-label": ((__VLS_ctx.button2.ariaLabel)), ...{ class: ((__VLS_ctx.button2.className)) }, ...{ class: ("button-large") }, }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        ({}({ title: ((__VLS_ctx.button2.title)), onClick: ((__VLS_ctx.button2.onClick)), "aria-label": ((__VLS_ctx.button2.ariaLabel)), ...{ class: ((__VLS_ctx.button2.className)) }, ...{ class: ("button-large") }, }));
        __VLS_styleScopedClasses = (button2.className);
        const __VLS_9 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(AnimatedButton, __VLS_6));
        // @ts-ignore
        [button2, button2, button2, button2, button2,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['border-t-4'];
        __VLS_styleScopedClasses['border-darkGreen'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['justify-start'];
        __VLS_styleScopedClasses['button-large'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['justify-end'];
        __VLS_styleScopedClasses['button-large'];
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
                AnimatedButton: AnimatedButton,
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
