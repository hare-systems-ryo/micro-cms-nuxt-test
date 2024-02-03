<script setup lang="ts">
/* ----------------------------------------------------------------------------
  layouts/default.vue
---------------------------------------------------------------------------- */
</script>
<template>
  <div class="min-h-screen">
    <div class="h-12 md:h-16 flex items-center px-4 bg-main1">
      <div class="h-full w-full md:w-auto flex items-center justify-center text-center">
        <NuxtLink to="/" class="font-en px-2 py-1 text-xl md:text-4xl text-white">World SUVs</NuxtLink>
      </div>
      <nav class="hidden md:block ms-auto">
        <ul class="flex text-white space-x-6">
          <li class="cursor-pointer hover:text-red-50 font-en">
            <NuxtLink to="/news/a" class=""> NEWS </NuxtLink>
          </li>
          <li class="cursor-pointer hover:text-red-50 font-en">
            <NuxtLink to="/about" class=""> ABOUT </NuxtLink>
          </li>
          <li class="cursor-pointer hover:text-red-50 font-en">
            <NuxtLink to="/contact" class=""> CONTACT </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="md:hidden h-px bg-white"></div>
    <div class="md:hidden h-px bg-main1"></div>
    <nav class="md:hidden ms-auto bg-main2">
      <ul class="columns-3 justify-around text-white py-1">
        <li class="cursor-pointer font-rubik text-center">
          <NuxtLink to="/news/a" class=""> NEWS </NuxtLink>
        </li>
        <li class="cursor-pointer font-rubik text-center">
          <NuxtLink to="/about" class=""> ABOUT </NuxtLink>
        </li>
        <li class="cursor-pointer font-rubik text-center">
          <NuxtLink to="/contact" class=""> CONTACT </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="md:hidden h-px bg-main1"></div>
    <div class="h-px bg-white"></div>
    <!-- <div class="py-20"></div> -->
    <slot />
    <!-- footer 用余白 -->
    <div class="pt-[100px] md:pt-[100px] mt-10"></div>
    <!-- footer -->
    <div class="absolute bottom-0 left-0 right-0 h-[100px] bg-main1 text-white">
      <div class="h-[70px] pt-2 flex justify-center items-center">フッター情報記載場所</div>
      <div class="h-[30px] pb-2 flex justify-center items-end">Copyright © Hare-Systems.net</div>
    </div>
  </div>
</template>
