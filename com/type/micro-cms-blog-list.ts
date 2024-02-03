/* ----------------------------------------------------------------------------
com\type\micro-cms-blog-list.ts
// ----------------------------------------------------------------------------
// [ com > type > micro-cms-blog-list ]
import {} from '@/com/type/micro-cms-blog-list';
----------------------------------------------------------------------------- */
// [ com > type > micro-cms-blog ]
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';
// ----------------------------------------------------------------------------
export type TestApiRes = {
  dataFrom: '' | 'nuxt' | 'upstash' | 'microCMP';
  time: string;
  list: MicroCmsBlogDetail[] | null;
};

export const InitTestApiRes = (): TestApiRes => {
  return {
    dataFrom: '',
    time: '',
    list: null,
  };
};
