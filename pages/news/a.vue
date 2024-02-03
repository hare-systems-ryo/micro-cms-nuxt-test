<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\news\a.vue
----------------------------------------------------------------------------- */

const { data: apiRes } = await useFetch('/api/blog/index-list-a', {});
// ----------------------------------------------------------------------------
</script>
<template>
  <BaseContainer>
    <Breadcrumb
      class="my-2 md:my-4"
      :list="[
        { url: '/', text: 'Home' },
        { url: '', text: 'News [データ取得 方法A]' },
      ]"
    />
    <BasePanel class="">
      <div class="grid grid-cols-3 md:grid-cols-3 mb-2 md:mb-3">
        <h1
          class="col-start-1 md:col-start-2 col-span-2 md:col-span-1 text-start md:text-center font-sans text-xl md:text-4xl font-semibold"
        >
          micro CMS
        </h1>
      </div>
      <template v-if="apiRes && apiRes?.list">
        <ul class="grid grid-cols-1 gap-6 md:gap-10">
          <li v-for="blog in apiRes.list" :key="blog.id">
            <MicroCmsBlogListRow :blog="blog" />
          </li>
        </ul>
        <div class="flex justify-center mt-1">
          <!-- Pagination -->
          ページ切り替えボタン設置する
          <!-- End Pagination -->
        </div>
      </template>
    </BasePanel>
    <BasePanel class="mt-2">
      ブログリスト取得したときの情報
      <template v-if="apiRes && apiRes?.list">
        <ControlAlert class="mt-3">
          <div class="">
            今回のデータ取得元 : {{ apiRes.dataFrom }}
            {{ apiRes.dataFrom === 'nuxt' ? '※api実行コードの変数から返却' : '' }}
          </div>
          <div class="">今回のデータ取得時間 : {{ apiRes.time }}※データ取得コード部分の所要時間</div>
        </ControlAlert>
        <ControlAlert class="mt-3">
          <div class="pb-2">「micro CMS 」データ取得パターン</div>
          <ul role="list" class="marker:text-gray-600 list-disc ps-5 space-y-1 text-sm text-gray-800">
            <li class="">リスト取得タイミング</li>
            <ul role="list" class="marker:text-gray-600 list-disc ps-5 space-y-1 text-sm text-gray-800">
              <li class="">サーバーサイドのページ生成時</li>
            </ul>
            <li class="">取得方法（上から順に取得処理を走らす、見つかった時点で返却）</li>
            <ul role="list" class="marker:text-gray-600 list-disc ps-5 space-y-1 text-sm text-gray-800">
              <li class="">APIサーバーの変数(Max 60秒保持 + Vercel次第)</li>
              <li class="">Upstash(Redis:東京リュージョン）(データ削除までのTTL=20分)</li>
              <li class="">公式API</li>
            </ul>
          </ul>
        </ControlAlert>
      </template>
      <div class="pt-2 grid grid-cols-3 gap-2">
        <ControlBtn to="/news/a" class="" theme="link"> データ取得 方法 A </ControlBtn>
        <ControlBtn to="/news/b" class="" theme="link"> データ取得 方法 B </ControlBtn>
        <ControlBtn to="/news/c" class="" theme="link"> データ取得 方法 C </ControlBtn>
      </div>
    </BasePanel>
  </BaseContainer>
</template>
