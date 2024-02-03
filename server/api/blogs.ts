/* ----------------------------------------------------------------------------
server\api\blogs.ts
-------------------------------------------------------------------------------
[API : ブログデータ取得API]
-------------------------------------------------------------------------------
export const ApiUrl = `/api/blogs`;
---------------------------------------------------------------------------- */

// [ server > lib > micro-cms > main ]
import { MicroCmsConfig } from '@/server/lib/micro-cms/main';
// [ com > type > micro-cms-blog ]
import type { MicroCmsBlogs } from '@/com/type/micro-cms-blog';
// ----------------------------------------------------------------------------
const ct = `server:api:blogs.ts`;
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const params = 'ids' in query ? '?ids=' + query.ids : '';
    // console.log('params', params);
    const response = await fetch(`https://${MicroCmsConfig.serviceDomain}/api/v1/blogs` + params, {
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': MicroCmsConfig.apiKey,
      },
    });
    return (await response.json()) as MicroCmsBlogs;
  } catch (err: any) {
    console.error(ct, err);
    return true;
  }
});
