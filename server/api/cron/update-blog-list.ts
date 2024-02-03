/* ----------------------------------------------------------------------------
server\api\cron\update-blog-list.ts
-------------------------------------------------------------------------------
[API : ブログデータ定期取得API]
-------------------------------------------------------------------------------
export const ApiUrl = `/api/cron/update-blog-list`;
---------------------------------------------------------------------------- */

// [ server > lib > cron ]
import { CheckCronJob } from '@/server/lib/cron';
// [ server > lib > micro-cms > data-blog ]
import { GetBlogListByApi } from '@/server/lib/micro-cms/data-blog';
import { SetBlogDetail } from '@/server/lib/micro-cms/data-blog';
// ----------------------------------------------------------------------------
const ct = `server:api:cron:update-blog-list.ts`;
export default defineEventHandler(async (event) => {
  try {
    // ----------------------------------------------------------------------------
    // Cron認証
    if (CheckCronJob(event) === false) {
      console.error(ct, 'Cron Job 用のヘッダー認証情報が一致しません');
      return true;
    }
    const ret = await GetBlogListByApi();
    if (ret === null) return;
    const count = ret.length;
    for (let i = 0; i < count; i++) {
      await SetBlogDetail(ret[i].id, ret[i]);
    }
  } catch (err: any) {
    console.error(ct, err);
    return true;
  }
});
