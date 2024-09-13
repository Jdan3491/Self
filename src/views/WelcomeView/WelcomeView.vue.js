import { ref, watch } from 'vue';
import { useWelcomeComponent } from './index';
import AnimatedButton from '../../components/AnimatedButton.vue';
import { useTestModeStore } from '@/stores/testModeStore';
import GithubIcon from '@/assets/icongithub.svg';
import Swal from 'sweetalert2';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Initialize the welcome component
const welcomeComponent = useWelcomeComponent();
const HardwareInstalledModeStore = useTestModeStore();
// Define local state for the hardware installation mode (synchronized with the global store)
const isHardwareInstalled = ref(!HardwareInstalledModeStore.isHardwareInstalled);
// Watch the local flag and update the store when it changes
watch(isHardwareInstalled, (newValue) => {
    HardwareInstalledModeStore.setTestMode(newValue);
});
// Start the game with a check for hardware installed
const startGame = () => {
    welcomeComponent.goToPage();
};
// Handle Hardware Installed Mode change with confirmation
const handleHardwareChange = () => {
    if (!isHardwareInstalled.value) {
        Swal.fire({
            title: 'Sei sicuro di possedere hardware installato?',
            text: 'Questa è una funzionalità beta instabile.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sì',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                isHardwareInstalled.value = false;
            }
            else {
                isHardwareInstalled.value = true;
            }
        });
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("full-screen") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("w-full bg-green-700 p-4 flex items-center justify-between shadow-md lg:p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("https://github.com/Jdan3491"), target: ("_blank"), ...{ class: ("flex items-center") }, });
    // @ts-ignore
    const __VLS_0 = {}
        .ElAvatar;
    ({}.ElAvatar);
    __VLS_components.ElAvatar;
    __VLS_components.elAvatar;
    // @ts-ignore
    [ElAvatar,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ src: ((__VLS_ctx.GithubIcon)), alt: ("GitHub"), ...{ class: ("w-20 h-20 mr-4") }, }));
    const __VLS_2 = __VLS_1({ src: ((__VLS_ctx.GithubIcon)), alt: ("GitHub"), ...{ class: ("w-20 h-20 mr-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ src: ((__VLS_ctx.GithubIcon)), alt: ("GitHub"), ...{ class: ("w-20 h-20 mr-4") }, }));
    const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
    // @ts-ignore
    [GithubIcon,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-white text-3xl font-bold lg:text-4xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("content-box") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("logo-section mb-8") }, });
    // @ts-ignore
    const __VLS_6 = {}
        .ElImage;
    ({}.ElImage);
    __VLS_components.ElImage;
    __VLS_components.elImage;
    // @ts-ignore
    [ElImage,];
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("logo") }, src: ((__VLS_ctx.welcomeComponent.brand)), fit: ("contain"), lazy: (true), }));
    const __VLS_8 = __VLS_7({ ...{ class: ("logo") }, src: ((__VLS_ctx.welcomeComponent.brand)), fit: ("contain"), lazy: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ ...{ class: ("logo") }, src: ((__VLS_ctx.welcomeComponent.brand)), fit: ("contain"), lazy: (true), }));
    const __VLS_11 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8));
    // @ts-ignore
    [welcomeComponent,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("welcome-text text-5xl mb-10 lg:text-6xl text-green-700") }, });
    // @ts-ignore
    [AnimatedButton,];
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(AnimatedButton, new AnimatedButton({ ...{ class: ("start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6") }, title: ("Avvio"), onClick: ((__VLS_ctx.startGame)), "aria-label": ("Avvio"), }));
    const __VLS_13 = __VLS_12({ ...{ class: ("start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6") }, title: ("Avvio"), onClick: ((__VLS_ctx.startGame)), "aria-label": ("Avvio"), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    ({}({ ...{ class: ("start-button text-2xl p-4 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md transform transition duration-300 ease-in-out lg:text-3xl lg:p-6") }, title: ("Avvio"), onClick: ((__VLS_ctx.startGame)), "aria-label": ("Avvio"), }));
    const __VLS_16 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(AnimatedButton, __VLS_13));
    // @ts-ignore
    [startGame,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8 flex items-center justify-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-lg mr-4 lg:text-xl text-gray-600") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.handleHardwareChange) }, type: ("checkbox"), ...{ class: ("ml-4 checkbox") }, });
    (__VLS_ctx.isHardwareInstalled);
    // @ts-ignore
    [handleHardwareChange, isHardwareInstalled,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("mt-10 text-center text-gray-600") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("particles") }, });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['full-screen'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['bg-green-700'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['lg:p-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['w-20'];
        __VLS_styleScopedClasses['h-20'];
        __VLS_styleScopedClasses['mr-4'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['lg:text-4xl'];
        __VLS_styleScopedClasses['content-box'];
        __VLS_styleScopedClasses['logo-section'];
        __VLS_styleScopedClasses['mb-8'];
        __VLS_styleScopedClasses['logo'];
        __VLS_styleScopedClasses['welcome-text'];
        __VLS_styleScopedClasses['text-5xl'];
        __VLS_styleScopedClasses['mb-10'];
        __VLS_styleScopedClasses['lg:text-6xl'];
        __VLS_styleScopedClasses['text-green-700'];
        __VLS_styleScopedClasses['start-button'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['bg-green-700'];
        __VLS_styleScopedClasses['hover:bg-green-800'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['transform'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-300'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['lg:text-3xl'];
        __VLS_styleScopedClasses['lg:p-6'];
        __VLS_styleScopedClasses['mt-8'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['mr-4'];
        __VLS_styleScopedClasses['lg:text-xl'];
        __VLS_styleScopedClasses['text-gray-600'];
        __VLS_styleScopedClasses['ml-4'];
        __VLS_styleScopedClasses['checkbox'];
        __VLS_styleScopedClasses['mt-10'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['text-gray-600'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['particles'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                AnimatedButton: AnimatedButton,
                GithubIcon: GithubIcon,
                welcomeComponent: welcomeComponent,
                isHardwareInstalled: isHardwareInstalled,
                startGame: startGame,
                handleHardwareChange: handleHardwareChange,
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
