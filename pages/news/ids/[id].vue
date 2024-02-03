<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\pages\[id].vue
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
import { DateFormat } from '@/com/dayjs';
import type { MicroCmsBlogs } from '@/com/type/micro-cms-blog';
// ----------------------------------------------------------------------------

const { params } = useRoute();
// [ Nuxt ]
const { data } = await useFetch<MicroCmsBlogs>('/api/blogs', {
  query: { ids: Array.isArray(params.id) ? params.id[0] : params.id },
});
const detail = computed(() => {
  if (data.value === null) return null;
  return data.value.contents[0];
});
const dateStamp = computed(() => {
  if (detail.value === null) return '';
  return DateFormat(detail.value.publishedAt ?? detail.value.createdAt);
});
// ----------------------------------------------------------------------------
</script>
<template>
  <BaseContainer>
    <template v-if="detail">
      <Breadcrumb
        class="my-2 md:my-4"
        :list="[
          { url: '/', text: 'Home' },
          { url: '/news/a', text: 'News' },
          { url: '', text: detail.title + dateStamp },
        ]"
      />
      <BasePanel class="!p-1">
        <div class="bg-white p-3">
          <h1 class="pb-2 text-3xl font-semibold">
            {{ detail.title }}
          </h1>
          <div class="h-px bg-main1"></div>
          <div v-if="detail.eyecatch" class="mt-6">
            <img
              :src="detail.eyecatch?.url"
              :width="detail.eyecatch?.width"
              :height="detail.eyecatch?.height"
              alt=""
              class="block h-full max-w-full w-full max-h-full object-contain object-center"
            />
          </div>

          <div class="mt-4 flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
            <div class="rounded border-2 border-indigo-600 px-1.5 py-0.5 text-sm font-semibold text-indigo-600">
              {{ detail.category?.name }}
            </div>
            <div class="text-sm text-gray-700">
              {{ dateStamp }}
            </div>
          </div>
          <div class="prose mt-6 md:mt-10 max-w-full" v-html="detail.content"></div>
        </div>
      </BasePanel>
    </template>
    <template v-else>
      <Breadcrumb
        class="my-2 md:my-4"
        :list="[
          { url: '/', text: 'Home' },
          { url: '/news/a', text: 'News' },
          { url: '', text: 'Not Found' },
        ]"
      ></Breadcrumb>

      <BasePanel class="">
        <div class="">お探しのページは見つかりませんでした</div>
      </BasePanel>
    </template>
  </BaseContainer>
</template>
