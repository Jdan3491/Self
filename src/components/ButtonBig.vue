<template>
      <el-button
        :class="buttonClass"
        type="success"
        size="large"
        round
        @click="handleClick"
      >
        {{ title }}
      </el-button>
    </template>
    
    <script setup>
    import { defineProps } from 'vue';
    
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
    </script>
    
    <style scoped>
    /* Applica le modifiche al padding per i bottoni grandi e rotondi */
    .el-button--large.is-round {
      padding: 40px 10px;
    }
    </style>
    