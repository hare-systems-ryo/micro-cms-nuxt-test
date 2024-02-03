/* ----------------------------------------------------------------------------
server\api\test.ts
-------------------------------------------------------------------------------
[API : Test]
-------------------------------------------------------------------------------
export const ApiUrl = `/api/test`;
---------------------------------------------------------------------------- */

import { GetBlogList } from '@/server/lib/micro-cms/data-blog';
import { SetBlogDetail } from '@/server/lib/micro-cms/data-blog';
// ----------------------------------------------------------------------------
const ct = `server:api:test.ts`;

export default defineEventHandler(async (event) => {
  try {
    const ret = await GetBlogList();
    if (ret === null) return;
    const count = ret.length;
    for (let i = 0; i < count; i++) {
      SetBlogDetail(ret[i].id, ret[i]);
    }
    return ret;
  } catch (err: any) {
    console.error(ct, err);
    return true;
  }
});
