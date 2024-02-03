/* ----------------------------------------------------------------------------
[API : blog : list取得パターンB]
-------------------------------------------------------------------------------
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
const ct = `server:api:blog:index-list-b.ts`;
// ----------------------------------------------------------------------------
export default defineEventHandler(async (event): Promise<TestApiRes> => {
  try {
    const ts = dayjs();
    const sw = new StopWatch();
    const getBlogListByRedisResult = await GetBlogListByRedis();
    if (getBlogListByRedisResult !== null) {
      return {
        dataFrom: 'upstash',
        time: sw.GetTime(),
        list: getBlogListByRedisResult,
      };
    }
    const getBlogListByApiResult = await GetBlogListByApi();
    if (getBlogListByApiResult !== null) {
      return {
        dataFrom: 'microCMP',
        time: sw.GetTime(),
        list: getBlogListByApiResult,
      };
    }
    throw new Error('データ取得失敗');
  } catch (err: any) {
    console.error(ct, err);
    return InitTestApiRes();
  }
});
