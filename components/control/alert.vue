<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\control\alert.vue
// ----------------------------------------------------------------------------
ControlAlert
----------------------------------------------------------------------------- */

// [ Nuxt ]
interface Props {
  theme?: 'info' | 'error' | 'success';
}
const props = withDefaults(defineProps<Props>(), {
  theme: 'info',
});
const classString = computed(() => {
  if (props.theme === 'info') {
    return `bg-white border border-blue-800 text-sm text-blue-800 rounded-lg p-2 md:p-3 `;
  } else if (props.theme === 'success') {
    return `bg-white border border-teal-800 text-sm text-teal-800 rounded-lg p-2 md:p-3 `;
  } else if (props.theme === 'error') {
    return `bg-white border border-red-800 text-sm text-red-800 rounded-lg p-2 md:p-3 `;
  }
});
</script>
<template>
  <div :class="classString" role="alert">
    <slot />
  </div>
</template>
