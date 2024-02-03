<script setup lang="ts">
// [stores]
// ---------------------------------------
const error = useError();
const router = useRouter();
// ---------------------------------------

const code = computed(() => {
  if (error instanceof Error) return error.message;
  if (!('value' in (error as any))) return '';
  if (!(error as any).value) return '';
  if (!('statusCode' in (error as any).value)) return '';
  return (error as any).value.statusCode;
});

const message = computed(() => {
  if (error instanceof Error) return error.message;
  if (!('value' in (error as any))) return '';
  if (!(error as any).value) return '';
  if (!('message' in (error as any).value)) return '';
  return error.value?.message;
});

const isShow = ref(true);
const nextLoading = ref(false);
const navigateHome = async () => {
  nextLoading.value = true;
  await nextTick();
  isShow.value = false;
  router.push({ path: '/' });
};

// ---------------------------------------
</script>
<template>
  <BaseContainer class="mt-10">
    <BasePanel class="">
      <!-- <div v-if="isShow" class="error-base"> -->
      <div v-if="!nextLoading" class="error-container">
        <div v-if="code" class="title">{{ code }}</div>
        <div v-if="code == '404'" class="title">Not Found</div>
        <div v-else class="title py-2 flex-shrink-0">Error</div>
        <div class="message my-2 border border-dark px-3 py-2 radius-1 bg-white flex-shrink-1">
          {{ message }}
        </div>
        <button
          type="button"
          class="bg-white py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          @click="navigateHome"
        >
          Go Home
        </button>
      </div>
      <div v-if="nextLoading" class="fixed inset-0 bg-gray-100/[0.8] flex justify-center items-center">
        <div
          class="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </BasePanel>
  </BaseContainer>
</template>

<style lang="scss" scoped>
.error-base {
  position: fixed;
  inset: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-container {
  // max-width: calc(100% - 40px);
  // max-height: calc(100% - 40px);
  // min-width: 260px;
  // min-height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (min-width: #{ 0 }px) and (max-width: #{ 400 - 0.1}px) {
    .title {
      font-size: 20px;
    }
  }

  @media screen and (min-width: #{ 400 }px) and (max-width: #{ 600 - 0.1}px) {
    min-width: 380px;
    .title {
      font-size: 36px;
    }
  }

  @media screen and (min-width: #{ 600 }px) {
    min-width: 580px;
    .title {
      font-size: 40px;
    }
  }
}

.message {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>
