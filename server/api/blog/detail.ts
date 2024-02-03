/* ----------------------------------------------------------------------------
server\api\blog\detail.ts
-------------------------------------------------------------------------------
[API : blog : 詳細情報]
-------------------------------------------------------------------------------
export const ApiUrl = `/api/blog/detail`;
---------------------------------------------------------------------------- */
import dayjs from 'dayjs';
// [ server > lib > micro-cms > data-blog ]
import { GetBlogDetail } from '@/server/lib/micro-cms/data-blog';
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';
// ----------------------------------------------------------------------------
const ct = `server:api:blog:detail.ts`;
const temp: {
  [key: string]: {
    ts: dayjs.Dayjs;
    detail: MicroCmsBlogDetail | null;
  };
} = {};
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const ids = 'ids' in query ? String(query.ids) : '';
    const ts = dayjs();
    if (!ids) return null;
    if (
      ids in temp &&
      temp[ids].detail !== null &&
      // 前回取得から60秒以内の場合、Tempデータから返却
      ts.diff(temp[ids].ts, 'second') < 60
    ) {
      console.log(ct, 'データ返答 Tempデータ');
      return temp[ids].detail;
    }
    console.log(ct, 'データ返答 Redis or API');
    temp[ids] = {
      ts: ts,
      detail: await GetBlogDetail(ids),
    };
    return temp[ids].detail;
  } catch (err: any) {
    console.error(ct, err);
    return null;
  }
});
