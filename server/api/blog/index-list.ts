/* ----------------------------------------------------------------------------
server\api\blog\index-list.ts
-------------------------------------------------------------------------------
[API : blog : Home画面用リスト]
-------------------------------------------------------------------------------
export const ApiUrl = `/api/blog/index-list`;
---------------------------------------------------------------------------- */
import dayjs from 'dayjs';
// [ server > lib > micro-cms > data-blog ]
import { GetBlogList } from '@/server/lib/micro-cms/data-blog';
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';
// ----------------------------------------------------------------------------
const ct = `server:api:blog:index-list.ts`;

type TempData = {
  ts: dayjs.Dayjs;
  detail: MicroCmsBlogDetail[] | null;
};
const temp: TempData = {
  ts: dayjs(),
  detail: null,
};
export default defineEventHandler(async (event) => {
  try {
    const ts = dayjs();
    if (
      temp.detail !== null &&
      // 前回取得から60秒以内の場合、Tempデータから返却
      ts.diff(temp.ts, 'second') < 60
    ) {
      console.log(ct, 'データ返答 Tempデータ');
      return temp.detail;
    }
    temp.ts = ts;
    temp.detail = await GetBlogList();
    return temp.detail;
  } catch (err: any) {
    console.error(ct, err);
    return null;
  }
});
