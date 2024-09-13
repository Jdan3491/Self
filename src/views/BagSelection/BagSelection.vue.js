import { ref, computed, onMounted } from 'vue'; // Import onMounted for lifecycle hook
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { useImgStore } from '@/stores/imgStore';
import { useProductStore } from '@/stores/productStore'; // Import the product store
import { useDiscountStore } from '@/stores/discountStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const imgStore = useImgStore();
const productStore = useProductStore(); // Initialize the product store
const discountStore = useDiscountStore(); // Accedi al discountStore
const bagTypes = ref([
    { value: 'bigBag', label: 'Grande', description: 'Sacchetto grande.', cost: 0.5 },
    { value: 'ecologicBag', label: 'Ecologico', description: 'Sacchetto ecologico.', cost: 0.3 },
    { value: 'plasticBag', label: 'Plastica', description: 'Sacchetto di plastica.', cost: 1.0 }
]);
const form = ref({ selectedBags: {} }); // Reactive object to store user-selected bags
const tot = ref(discountStore.discountedTotal > 0 ? discountStore.discountedTotal : productStore.totalAmount);
const totalItemsCost = computed(() => discountStore.discountedTotal > 0 ? discountStore.discountedTotal : productStore.totalAmount); // Total cost of items from the product store
const totalBagsCost = computed(() => {
    // Calculate the total cost of selected bags
    return Object.values(form.value.selectedBags).reduce((total, bag) => {
        const bagType = bagTypes.value.find((b) => b.value === bag.type);
        return total + bagType.cost * bag.quantity;
    }, 0);
});
const totalFinalCost = computed(() => totalItemsCost.value + totalBagsCost.value); // Total cost including bags and items
const router = useRouter();
const getIcon = (type) => imgStore.getIcon(type); // Function to get icon based on bag type
// Toggle bag selection in the UI and update the reactive form
const toggleBagSelection = (type) => {
    if (form.value.selectedBags[type]) {
        delete form.value.selectedBags[type];
    }
    else {
        form.value.selectedBags[type] = { type, quantity: 1 };
    }
};
// Adjust the quantity of selected bags and ensure valid values
const changeQuantity = (bagType, change) => {
    if (form.value.selectedBags[bagType]) {
        const newQuantity = form.value.selectedBags[bagType].quantity + change;
        if (newQuantity > 0) {
            form.value.selectedBags[bagType].quantity = newQuantity;
        }
        else {
            delete form.value.selectedBags[bagType];
        }
    }
};
// Function to confirm bag selection and update the store
const confirmSelection = () => {
    // Init variables
    const totalBagsCostValue = totalBagsCost.value;
    const selectedBags = form.value.selectedBags;
    if (parseFloat(totalBagsCostValue) == 0) {
        Swal.fire({
            title: 'Sei sicuro di non volere sacchetti?',
            icon: 'warning',
            confirmButtonText: 'Prosegui senza sacchetto',
            cancelButtonText: 'No voglio selezionare sacchetto',
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.push({ name: 'Payment' }); // Navigate to a confirmation page or receipt screen
            }
        });
    }
    else {
        productStore.updateBagsCost(totalBagsCostValue);
        productStore.BagsSelected = Object.keys(selectedBags).map((key) => ({
            type: 'bag',
            value: key,
            quantity: selectedBags[key].quantity,
            cost: bagTypes.value.find((bag) => bag.value === key).cost
        }));
        productStore.saveSelectedBags(); // Save selected bags to localStorage
        router.push({ name: 'Payment' });
    }
};
// Function to handle cancelation and reset bag selection in store
const cancel = () => {
    productStore.clearSavedBags(); // Clear saved selected bags
    productStore.resetBagsCost();
    productStore.BagsSelected = productStore.BagsSelected.filter((item) => item.type !== 'bag');
    router.back();
};
// Ensure store is reset when navigating away from the component
onBeforeRouteLeave((to, from) => {
    if (from.path === '/home') {
        productStore.resetBagsCost();
        productStore.clearSavedBags(); // Clear saved bags on leaving the component
        productStore.BagsSelected = productStore.BagsSelected.filter((item) => item.type !== 'bag');
    }
});
// Initialize the component and load any pre-selected bags from the store
onMounted(() => {
    productStore.loadSelectedBags(); // Load previously selected bags from localStorage
    const storedBags = productStore.BagsSelected.filter((item) => item.type === 'bag');
    storedBags.forEach((bag) => {
        form.value.selectedBags[bag.value] = {
            type: bag.value,
            quantity: bag.quantity
        };
    });
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col h-screen w-screen bg-gray-100") }, });
    // @ts-ignore
    [MainHeader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MainHeader, new MainHeader({ leftText: ("Seleziona e Regola la Quantità del Sacchetto"), }));
    const __VLS_1 = __VLS_0({ leftText: ("Seleziona e Regola la Quantità del Sacchetto"), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ leftText: ("Seleziona e Regola la Quantità del Sacchetto"), }));
    const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(MainHeader, __VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-4xl my-4 text-center font-bold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-green-800") }, });
    (__VLS_ctx.tot.toFixed(2));
    // @ts-ignore
    [tot,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-grow overflow-auto p-4 lg:flex lg:gap-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col lg:flex-row lg:w-2/3 gap-4") }, });
    for (const [type, index] of __VLS_getVForSourceType((__VLS_ctx.bagTypes))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.toggleBagSelection(type.value);
                    // @ts-ignore
                    [bagTypes, toggleBagSelection,];
                } }, key: ((type.value)), ...{ class: ("card w-full lg:w-1/4 h-auto p-4 border rounded-lg shadow-md bg-white cursor-pointer transition-transform duration-300 ease-in-out") }, ...{ class: (({ 'border-blue-600 bg-blue-50': __VLS_ctx.form.selectedBags[type.value] })) }, });
        __VLS_styleScopedClasses = ({ 'border-blue-600 bg-blue-50': form.selectedBags[type.value] });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.getIcon(type.value))), alt: ("Bag Type"), ...{ class: ("icon") }, });
        // @ts-ignore
        [form, getIcon,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (type.label);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (type.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("price") }, });
        (type.cost.toFixed(2));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("lg:w-1/3 mt-4 lg:mt-0") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary-container bg-white p-4 rounded-lg shadow-md h-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-semibold mb-2") }, });
    if (Object.keys(__VLS_ctx.form.selectedBags).length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-selection text-center text-gray-500") }, });
        // @ts-ignore
        [form,];
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        for (const [bag, bagType] of __VLS_getVForSourceType((__VLS_ctx.form.selectedBags))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((bagType)), ...{ class: ("summary-item flex justify-between mt-2 border-b border-gray-300 pb-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col w-full") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.bagTypes.find((b) => b.value === bagType).label);
            // @ts-ignore
            [bagTypes, form,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            ((__VLS_ctx.bagTypes.find((b) => b.value === bagType).cost * bag.quantity).toFixed(2));
            // @ts-ignore
            [bagTypes,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("quantity-controls mt-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!(!((Object.keys(__VLS_ctx.form.selectedBags).length === 0))))
                            return;
                        __VLS_ctx.changeQuantity(bagType, -1);
                        // @ts-ignore
                        [changeQuantity,];
                    } }, ...{ style: ({}) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ style: ({}) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("number"), ...{ class: ("w-50") }, });
            (__VLS_ctx.form.selectedBags[bagType].quantity);
            // @ts-ignore
            [form,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!(!((Object.keys(__VLS_ctx.form.selectedBags).length === 0))))
                            return;
                        __VLS_ctx.changeQuantity(bagType, 1);
                        // @ts-ignore
                        [changeQuantity,];
                    } }, ...{ style: ({}) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ style: ({}) }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("totals mt-4 pt-2 border-t border-gray-300") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.totalBagsCost.toFixed(2));
        // @ts-ignore
        [totalBagsCost,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.totalItemsCost.toFixed(2));
        // @ts-ignore
        [totalItemsCost,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("final-total") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.totalFinalCost.toFixed(2));
        // @ts-ignore
        [totalFinalCost,];
    }
    // @ts-ignore
    [FooterComponent,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(FooterComponent, new FooterComponent({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Avanti',
            onClick: __VLS_ctx.confirmSelection,
            ariaLabel: 'Avanti',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }));
    const __VLS_6 = __VLS_5({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Avanti',
            onClick: __VLS_ctx.confirmSelection,
            ariaLabel: 'Avanti',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({ button1: (({
            title: 'Indietro',
            onClick: __VLS_ctx.cancel,
            ariaLabel: 'Indietro',
            className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
        })), button1Align: ("left"), button2: (({
            title: 'Avanti',
            onClick: __VLS_ctx.confirmSelection,
            ariaLabel: 'Avanti',
            className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
        })), button2Align: ("right"), }));
    const __VLS_9 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(FooterComponent, __VLS_6));
    // @ts-ignore
    [cancel, confirmSelection,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['h-screen'];
        __VLS_styleScopedClasses['w-screen'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['my-4'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-green-800'];
        __VLS_styleScopedClasses['flex-grow'];
        __VLS_styleScopedClasses['overflow-auto'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['lg:flex'];
        __VLS_styleScopedClasses['lg:gap-8'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['lg:flex-row'];
        __VLS_styleScopedClasses['lg:w-2/3'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['card'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['lg:w-1/4'];
        __VLS_styleScopedClasses['h-auto'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['transition-transform'];
        __VLS_styleScopedClasses['duration-300'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['icon'];
        __VLS_styleScopedClasses['price'];
        __VLS_styleScopedClasses['lg:w-1/3'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['lg:mt-0'];
        __VLS_styleScopedClasses['summary-container'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-md'];
        __VLS_styleScopedClasses['h-full'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['empty-selection'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['summary-item'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['border-b'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['pb-2'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['quantity-controls'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['w-50'];
        __VLS_styleScopedClasses['totals'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['pt-2'];
        __VLS_styleScopedClasses['border-t'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['final-total'];
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
                bagTypes: bagTypes,
                form: form,
                tot: tot,
                totalItemsCost: totalItemsCost,
                totalBagsCost: totalBagsCost,
                totalFinalCost: totalFinalCost,
                getIcon: getIcon,
                toggleBagSelection: toggleBagSelection,
                changeQuantity: changeQuantity,
                confirmSelection: confirmSelection,
                cancel: cancel,
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
