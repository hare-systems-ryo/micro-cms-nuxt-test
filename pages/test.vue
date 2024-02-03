<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\test.vue
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
// [ Nuxt ]
const { data } = await useFetch('/api/blogs', {});
// ----------------------------------------------------------------------------
</script>
<template>
  <BaseContainer>
    <Breadcrumb
      class="my-2 md:my-4"
      :list="[
        { url: '/', text: 'Home' },
        { url: '', text: 'News' },
      ]"
    />
    <BasePanel class="">
      <div class="" style="white-space: pre">
        {{ JSON.stringify(data, null, 3) }}
      </div>
    </BasePanel>
  </BaseContainer>
</template>
