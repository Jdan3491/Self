import { ref, computed, onMounted } from 'vue';
import useVolume from '@/composables/useVolume';
import SpeechSynthesis from '@/utils/speechSynthesis';
import { defineProps } from 'vue';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    leftText: {
        type: String,
        default: '',
    },
    showButton: {
        type: Boolean,
        default: false,
    },
    buttonText: {
        type: String,
        default: '',
    },
    onButtonClick: {
        type: Function,
        default: null,
    },
});
const { volume, setVolume, getVolume } = useVolume();
const barCount = 5;
const barWidth = 20;
const barHeight = 40;
const isMuted = ref(false);
// Calcolo delle barre attive basato sul volume
const activeBars = computed(() => Math.ceil(volume.value / (150 / barCount)));
// Aggiorna il volume quando l'utente clicca sulla barra del volume
const adjustVolume = (event) => {
    if (isMuted.value)
        return;
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newVolume = Math.min(150, Math.max(0, (clickX / rect.width) * 150)); // Volume fino a 150
    // Imposta il volume e aggiorna lo stato di muto
    setVolume(newVolume);
    isMuted.value = newVolume === 0;
    SpeechSynthesis.setVolume(newVolume / 150); // Regola il volume della sintesi vocale
};
// Funzione per attivare/disattivare il muto
const toggleMute = () => {
    isMuted.value = !isMuted.value;
    const newVolume = isMuted.value ? 0 : getVolume();
    setVolume(newVolume);
    SpeechSynthesis.setVolume(newVolume / 150); // Regola il volume della sintesi vocale
    if (isMuted.value) {
        SpeechSynthesis.stop();
    }
};
// Gestore del click sul pulsante di sinistra
const handleLeftButtonClick = () => {
    if (props.onButtonClick) {
        props.onButtonClick();
    }
};
// Imposta il volume corrente all'avvio
onMounted(() => {
    const initialVolume = getVolume();
    setVolume(initialVolume);
    SpeechSynthesis.setVolume(initialVolume / 150);
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        leftText: {
            type: String,
            default: '',
        },
        showButton: {
            type: Boolean,
            default: false,
        },
        buttonText: {
            type: String,
            default: '',
        },
        onButtonClick: {
            type: Function,
            default: null,
        },
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("bg-white px-4 py-2 flex justify-between items-center shadow-header border-b-4 border-darkGreen") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("left-section flex items-center gap-4") }, });
    if (__VLS_ctx.leftText && !__VLS_ctx.showButton) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-lg font-semibold text-gray-800") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
        (__VLS_ctx.leftText);
        // @ts-ignore
        [leftText, leftText, showButton,];
    }
    if (__VLS_ctx.leftText && __VLS_ctx.showButton) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center gap-4") }, });
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
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200") }, }));
        const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200") }, }));
        let __VLS_6;
        const __VLS_7 = {
            onClick: (__VLS_ctx.handleLeftButtonClick)
        };
        const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
        let __VLS_3;
        let __VLS_4;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-lg font-semibold text-gray-800") }, });
        (__VLS_ctx.leftText);
        // @ts-ignore
        [leftText, leftText, showButton, handleLeftButtonClick,];
        __VLS_nonNullable(__VLS_5.slots).default;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("right-section flex items-center gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("volume-container flex items-center") }, });
    if (__VLS_ctx.isMuted) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ onClick: (__VLS_ctx.toggleMute) }, src: ("@/assets/volume-mute.svg"), alt: ("Mute Icon"), ...{ class: ("volume-icon w-10 h-10 cursor-pointer") }, });
        // @ts-ignore
        [isMuted, toggleMute,];
    }
    else if (__VLS_ctx.volume.value === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ onClick: (__VLS_ctx.toggleMute) }, src: ("@/assets/volume-mute.svg"), alt: ("Volume Off Icon"), ...{ class: ("volume-icon w-10 h-10 cursor-pointer") }, });
        // @ts-ignore
        [toggleMute, volume,];
    }
    else if (__VLS_ctx.volume.value > 0 && __VLS_ctx.volume.value <= 50) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/volume-low.svg"), alt: ("Volume Low Icon"), ...{ class: ("volume-icon w-10 h-10 cursor-pointer") }, });
        // @ts-ignore
        [volume, volume,];
    }
    else if (__VLS_ctx.volume.value > 50 && __VLS_ctx.volume.value <= 100) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/volume-medium.svg"), alt: ("Volume Medium Icon"), ...{ class: ("volume-icon w-10 h-10 cursor-pointer") }, });
        // @ts-ignore
        [volume, volume,];
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/volume-high.svg"), alt: ("Volume High Icon"), ...{ class: ("volume-icon w-10 h-10 cursor-pointer") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.adjustVolume) }, ...{ class: ("volume-slider flex-1") }, ...{ style: (({ cursor: __VLS_ctx.isMuted ? 'not-allowed' : 'pointer' })) }, });
    for (const [index] of __VLS_getVForSourceType((__VLS_ctx.barCount))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((index)), ...{ class: ("volume-slider-item") }, ...{ style: (({ width: __VLS_ctx.barWidth + 'px', height: __VLS_ctx.barHeight + 'px' })) }, ...{ class: (({ 'active': index <= __VLS_ctx.activeBars })) }, });
        __VLS_styleScopedClasses = ({ 'active': index <= activeBars });
        // @ts-ignore
        [isMuted, adjustVolume, barCount, barWidth, barHeight, activeBars,];
    }
    // @ts-ignore
    const __VLS_8 = {}
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
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200") }, }));
    const __VLS_10 = __VLS_9({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    ({}({ ...{ 'onClick': {} }, type: ("text"), ...{ class: ("text-gray-800 font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200") }, }));
    let __VLS_14;
    const __VLS_15 = {
        onClick: (__VLS_ctx.toggleMute)
    };
    const __VLS_13 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10));
    let __VLS_11;
    let __VLS_12;
    (__VLS_ctx.isMuted ? 'Attiva Audio' : 'Disattiva Audio');
    // @ts-ignore
    [isMuted, toggleMute,];
    __VLS_nonNullable(__VLS_13.slots).default;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['shadow-header'];
        __VLS_styleScopedClasses['border-b-4'];
        __VLS_styleScopedClasses['border-darkGreen'];
        __VLS_styleScopedClasses['left-section'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['hover:text-gray-900'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-2'];
        __VLS_styleScopedClasses['focus:ring-red-500'];
        __VLS_styleScopedClasses['transition-colors'];
        __VLS_styleScopedClasses['duration-200'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['right-section'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['volume-container'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['volume-icon'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['volume-icon'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['volume-icon'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['volume-icon'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['volume-icon'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['volume-slider'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['volume-slider-item'];
        __VLS_styleScopedClasses['text-gray-800'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['hover:text-gray-900'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-2'];
        __VLS_styleScopedClasses['focus:ring-red-500'];
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
                $props: __VLS_makeOptional(props),
                ...props,
                volume: volume,
                barCount: barCount,
                barWidth: barWidth,
                barHeight: barHeight,
                isMuted: isMuted,
                activeBars: activeBars,
                adjustVolume: adjustVolume,
                toggleMute: toggleMute,
                handleLeftButtonClick: handleLeftButtonClick,
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
