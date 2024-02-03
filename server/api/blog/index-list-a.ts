/* ----------------------------------------------------------------------------
[API : blog : list取得パターンA]
-------------------------------------------------------------------------------
- APIサーバーの変数(Max 60秒保持 + Vercel次第)
- Upstash(Redis:東京リュージョン）(データ削除までのTTL=20分)
- 公式API
---------------------------------------------------------------------------- */

// [ node_modules ]
import dayjs from 'dayjs';
// ----------------------------------------------------------------------------
// [ com > type > micro-cms-blog-list ]
import type { TestApiRes } from '@/com/type/micro-cms-blog-list';
import { InitTestApiRes } from '@/com/type/micro-cms-blog-list';
// [ com > type > micro-cms-blog ]
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';
// ----------------------------------------------------------------------------
// [ server > lib > com ]
import { StopWatch } from '@/server/lib/com';
// [ server > lib > micro-cms > data-blog ]
import { GetBlogListByRedis } from '@/server/lib/micro-cms/data-blog';
import { GetBlogListByApi } from '@/server/lib/micro-cms/data-blog';

// ----------------------------------------------------------------------------
const ct = `server:api:blog:index-list-a.ts`;
// ----------------------------------------------------------------------------
type TempData = {
  ts: dayjs.Dayjs;
  detail: MicroCmsBlogDetail[] | null;
};
const temp: TempData = {
  ts: dayjs(),
  detail: null,
};
export default defineEventHandler(async (event): Promise<TestApiRes> => {
  try {
    const ts = dayjs();
    const sw = new StopWatch();
    if (
      temp.detail !== null &&
      // 前回取得から60秒以内の場合、Tempデータから返却
      ts.diff(temp.ts, 'second') < 60
    ) {
      return {
        dataFrom: 'nuxt',
        time: sw.GetTime(),
        list: temp.detail,
      };
    }
    const getBlogListByRedisResult = await GetBlogListByRedis();
    if (getBlogListByRedisResult !== null) {
      temp.ts = ts;
      temp.detail = getBlogListByRedisResult;
      return {
        dataFrom: 'upstash',
        time: sw.GetTime(),
        list: temp.detail,
      };
    }
    const getBlogListByApiResult = await GetBlogListByApi();
    if (getBlogListByApiResult !== null) {
      temp.ts = ts;
      temp.detail = getBlogListByApiResult;
      return {
        dataFrom: 'microCMS',
        time: sw.GetTime(),
        list: temp.detail,
      };
    }
    throw new Error('データ取得失敗');
  } catch (err: any) {
    console.error(ct, err);
    return InitTestApiRes();
  }
});
