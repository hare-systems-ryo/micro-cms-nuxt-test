<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\micro-cms-blog-list-row.vue
// ----------------------------------------------------------------------------
MicroCmsBlogListRow
---------------------------------------------------------------------------- */

import { DateFormat } from '@/com/dayjs';
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';

// ----------------------------------------------------------------------------
// [ Nuxt ]
interface Props {
  blog: MicroCmsBlogDetail;
}
const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
  <div class="bg-white border border-gray-300">
    <NuxtLink :to="`/news/ids/${props.blog.id}`" class="flex flex-col md:flex-row gap-2 md:gap-4 b p-2">
      <div
        v-if="!props.blog.eyecatch"
        class="hidden md:block md:w-1/3 md:flex-none border border-gray-300 bg-main2 min-h-[100px]"
      >
        <div class="h-full text-white flex justify-center items-center font-en bg-gray-500">No Image</div>
      </div>
      <div v-else class="md:w-1/3 md:flex-none border border-gray-300 bg-main2 min-h-[100px]">
        <img
          :src="props.blog.eyecatch.url"
          :width="props.blog.eyecatch.width"
          :height="props.blog.eyecatch.height"
          class="h-full w-full"
          alt=""
        />
      </div>
      <div class="md:w-2/3 flex flex-col">
        <div class="">
          <div
            class="inline-block rounded border-2 border-indigo-600 px-1.5 py-0.5 text-sm font-semibold text-indigo-600"
          >
            {{ props.blog.category?.name }}
          </div>
        </div>
        <div class="mt-2 text-lg font-semibold md:text-xl">
          {{ props.blog.title }}
        </div>
        <div class="mt-auto text-sm text-gray-700 flex justify-end">
          {{ DateFormat(props.blog.publishedAt ?? props.blog.createdAt) }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
