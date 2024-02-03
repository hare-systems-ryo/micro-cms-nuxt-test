/* ----------------------------------------------------------------------------
[API : blog : list取得パターンC]
-------------------------------------------------------------------------------
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
const ct = `server:api:blog:index-list-c.ts`;
// ----------------------------------------------------------------------------
export default defineEventHandler(async (event): Promise<TestApiRes> => {
  try {
    const sw = new StopWatch();
    const getBlogListByApiResult = await GetBlogListByApi();
    if (getBlogListByApiResult !== null) {
      return {
        dataFrom: 'microCMS',
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
