<template>
  <div class="flex h-screen">
    <div class="flex-1 flex justify-center items-center bg-gray-200 overflow-hidden">
      <el-image
        class="w-full h-full object-cover"
        :src="welcomeComponent.coverImage"
        fit="cover"
        lazy
      />
    </div>
    <div class="flex-1 flex flex-col justify-center items-center text-center bg-white p-5">
      <div class="mb-5">
        <el-image class="w-48 h-auto" :src="welcomeComponent.brand" fit="cover" lazy />
      </div>
      <span class="text-5xl mb-5">Benvenuto!</span>

      <ButtonBig
        title="Avvio"
        :onClick="welcomeComponent.goToPage"
      />

    </div>
  </div>
</template>


<script lang="ts" setup>
import { useWelcomeComponent } from './index';
import ButtonBig from '../../components/ButtonBig.vue';

const welcomeComponent = useWelcomeComponent();
</script>