<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\breadcrumb.vue
// ----------------------------------------------------------------------------
Breadcrumb
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
// [ Nuxt ]
interface Props {
  list: { url: string; text: string }[];
}
const props = withDefaults(defineProps<Props>(), {});
// ----------------------------------------------------------------------------
const activeClass = `text-emerald-800 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 dark:focus:text-emerald-500`;
const disabledClass = `text-gray-500`;
</script>
<template>
  <BasePanel class="">
    <ol class="flex flex-col md:flex-row md:items-center" aria-label="Breadcrumb">
      <li v-for="(row, index) in props.list" :key="index" class="flex items-center h-[26px] md:h-auto">
        <div v-if="index !== 0" class="w-[20px] flex justify-center items-center">
          <i class="fa-solid fa-chevron-right text-xs text-gray-400 dark:text-neutral-600"></i>
        </div>
        <div
          class="flex-1 truncate text-ellipsis w-[calc(100%-20px)]"
          :class="row.url.length !== 0 ? activeClass : disabledClass"
        >
          <!-- <div class="truncate  text-ellipsis overflow- w-[calc(100%-20px)] md:w-auto  w-[100px]"> -->
          <NuxtLink
            v-if="row.url"
            :to="row.url"
            class="text-sm text-ellipsis overflow-hidden"
            :class="row.url.length !== 0 ? activeClass : disabledClass"
          >
            {{ row.text }}
          </NuxtLink>
          <div
            v-else
            class="text-sm text-ellipsis overflow-hidden"
            :class="row.url.length !== 0 ? activeClass : disabledClass"
          >
            {{ row.text }}
          </div>
        </div>
        <!-- <svg
          v-if="index !== 0"
          class="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 dark:text-neutral-600"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg> -->
      </li>
    </ol>
  </BasePanel>
</template>
