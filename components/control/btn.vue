<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\control\btn.vue
// ----------------------------------------------------------------------------
ControlBtn
----------------------------------------------------------------------------- */
// [ Nuxt ]
interface Props {
  theme?: 'info' | 'error' | 'success' | 'link';
  to?: string;
  variant?: 'flat' | 'outlined';
  size?: 'default' | 'small';
}
const props = withDefaults(defineProps<Props>(), {
  theme: 'info',
  to: '',
  variant: 'outlined',
  size: 'default',
});
const emit = defineEmits<{
  click: [];
}>();
const classTheme = computed(() => {
  if (props.theme === 'info') {
    return `border-blue-800 text-blue-500 hover:border-blue-600 hover:text-blue-600 hover:[&>.btnBack]:bg-blue-100/[.2] `;
  } else if (props.theme === 'link') {
    return `border-purple-700 text-purple-700 hover:border-purple-500 hover:text-purple-600 hover:[&>.btnBack]:bg-fuchsia-200/[.1] `;
  } else if (props.theme === 'success') {
    return `border border-teal-800 text-sm text-teal-800 rounded-lg p-2 md:p-3 `;
  } else if (props.theme === 'error') {
    return `border border-red-800 text-sm text-red-800 rounded-lg p-2 md:p-3 `;
  }
});

const classVariant = computed(() => {
  if (props.variant === 'outlined') {
    return `bg-white`;
  } else {
    return ``;
  }
});
const classSize = computed(() => {
  if (props.size === 'small') {
    return `py-1 px-2 min-h-[30px]`;
  } else {
    return `py-3 px-4 min-h-[46px]`;
  }
});
const classBase = `
inline-flex items-center gap-x-2
text-sm font-semibold 
rounded border border-[2px] 
disabled:opacity-50 disabled:pointer-events-none
`;
</script>
<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    class="overflow-hidden"
    :class="[classBase, classTheme, , classVariant, classSize]"
  >
    <div class="btnBack absolute inset-0"></div>
    <slot />
  </NuxtLink>
  <button v-else type="button" :class="[classBase, classTheme, classVariant, classSize]">
    <div class="btn_back absolute inset-0"></div>
    <slot />
  </button>
</template>
