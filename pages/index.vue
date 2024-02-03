<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\index.vue
---------------------------------------------------------------------------- */
const { data: apiRes } = await useFetch('/api/blog/index-list-a', {});
// ----------------------------------------------------------------------------
</script>
<template>
  <div>
    <!-- メインビジュアル -->
    <div class="h-80 mb-20">
      <div class="bg-main1 h-full w-full overflow-hidden">
        <img
          src="/assets/index/main-visual-bg.webp"
          alt=""
          class="h-full w-full object-cover object-center select-none pointer-events-none"
        />
      </div>
      <div class="absolute inset-0">
        <div
          class="absolute text-main2 text-4xl md:text-8xl font-body font-bold end-[-1px] bottom-[-0.5em] pe-5 text-stroke-white"
        >
          キャッチテキスト
        </div>
      </div>
    </div>
    <BaseContainer class="">
      <!-- Slider -->
      <IndexSlider class=""></IndexSlider>
      <!--  -->
      <div class="py-4 md:py-10"></div>
      <!-- CMSリスト表示部分 -->
      <BasePanel class="">
        <div class="grid grid-cols-3 md:grid-cols-3 mb-2 md:mb-3">
          <h1
            class="col-start-1 md:col-start-2 col-span-2 md:col-span-1 text-start md:text-center font-sans text-xl md:text-4xl font-semibold"
          >
            micro CMS
          </h1>

          <div class="flex justify-end items-center">
            <ControlBtn
              to="/news/a"
              class="text-sm h-[30px] w-[30px] md:h-[40px] md:w-[40px] flex justify-center items-center"
              theme="link"
              size="small"
            >
              <i class="fa-solid fa-list"></i>
            </ControlBtn>
          </div>
        </div>
        <template v-if="apiRes && apiRes?.list">
          <ul class="grid grid-cols-1 gap-6 md:gap-10">
            <li v-for="blog in apiRes.list" :key="blog.id">
              <MicroCmsBlogListRow :blog="blog" />
            </li>
          </ul>
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
            <div class="pb-2">「micro CMS 」データ取得パターン（パターンAと同一）</div>
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

      <div class="mt-10">
        <a href="https://github.com/hare-systems-ryo/micro-cms-nuxt-test">
          Github リポジトリはこちら github.com/hare-systems-ryo/micro-cms-template
        </a>
      </div>
    </BaseContainer>
  </div>
</template>
