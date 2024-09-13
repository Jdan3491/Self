import { defineProps } from 'vue';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Definisci le props del componente
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        required: true
    }
});
// Definisci la classe del bottone
const buttonClass = 'text-5xl py-15 px-20 w-[500px] shadow-lg shadow-black/30';
// Gestisci il click del bottone
const handleClick = () => {
    props.onClick();
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        onClick: {
            type: Function,
            required: true
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, ...{ class: ((__VLS_ctx.buttonClass)) }, type: ("success"), size: ("large"), round: (true), }));
    const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, ...{ class: ((__VLS_ctx.buttonClass)) }, type: ("success"), size: ("large"), round: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onClick': {} }, ...{ class: ((__VLS_ctx.buttonClass)) }, type: ("success"), size: ("large"), round: (true), }));
    __VLS_styleScopedClasses = (buttonClass);
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.handleClick)
    };
    const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
    let __VLS_3;
    let __VLS_4;
    (__VLS_ctx.title);
    // @ts-ignore
    [buttonClass, handleClick, title,];
    __VLS_nonNullable(__VLS_5.slots).default;
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
                $props: __VLS_makeOptional(props),
                ...props,
                buttonClass: buttonClass,
                handleClick: handleClick,
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
