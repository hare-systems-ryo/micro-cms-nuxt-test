/* ----------------------------------------------------------------------------
server\lib\micro-cms\data-blog.ts
// ----------------------------------------------------------------------------
// [ server > lib > micro-cms > data-blog ]
import {} from '@/server/lib/micro-cms/data-blog';
----------------------------------------------------------------------------- */

// [ com > type > micro-cms-blog ]
import type { MicroCmsBlogs } from '@/com/type/micro-cms-blog';
// [ server > lib > micro-cms > main ]
import { MicroCmsConfig } from '@/server/lib/micro-cms/main';
// [ server > lib > micro-cms-config ]
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';
// [ server > lib > redis > object > blog-list ]
import { useRedisObjectBlogList } from '@/server/lib/redis/object/blog-list';
// [ server > lib > redis > object > blog-detail ]
import { useRedisObjectBlogDetail } from '@/server/lib/redis/object/blog-detail';
// ----------------------------------------------------------------------------
const ct = `server:lib:micro-cms:data-blog.ts`;
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
export const GetBlogList = async () => {
  try {
    const ret = await GetBlogListByRedis();
    if (ret !== null) return ret;
    return await GetBlogListByApi();
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};

export const GetBlogDetail = async (ids: string) => {
  try {
    const ret = await GetBlogDetailByRedis(ids);
    if (ret !== null) return ret;
    return await GetBlogDetailByApi(ids);
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};

// ----------------------------------------------------------------------------

export const GetBlogListByRedis = async () => {
  try {
    const RedisObjectBlogList = useRedisObjectBlogList();
    return await RedisObjectBlogList.GetData('all');
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};
export const SetBlogList = async (list: MicroCmsBlogDetail[]) => {
  try {
    const RedisObjectBlogList = useRedisObjectBlogList();
    await RedisObjectBlogList.SetData('all', list);
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};

export const GetBlogDetailByRedis = async (ids: string) => {
  try {
    const RedisObjectBlogDetail = useRedisObjectBlogDetail();
    return await RedisObjectBlogDetail.GetData(ids);
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};
export const SetBlogDetail = async (ids: string, detail: MicroCmsBlogDetail) => {
  try {
    const RedisObjectBlogDetail = useRedisObjectBlogDetail();
    await RedisObjectBlogDetail.SetData(ids, detail);
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};

// ----------------------------------------------------------------------------
export const GetBlogListByApi = async () => {
  try {
    const response = await fetch(`https://${MicroCmsConfig.serviceDomain}/api/v1/blogs`, {
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': MicroCmsConfig.apiKey,
      },
    });
    const ret = (await response.json()) as MicroCmsBlogs;
    SetBlogList(ret.contents);
    return ret.contents;
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};

export const GetBlogDetailByApi = async (ids: string) => {
  try {
    const params = '?ids=' + ids;
    const response = await fetch(`https://${MicroCmsConfig.serviceDomain}/api/v1/blogs` + params, {
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': MicroCmsConfig.apiKey,
      },
    });
    const ret = (await response.json()) as MicroCmsBlogs;
    if (ret.contents.length > 0) {
      await SetBlogDetail(ids, ret.contents[0]);
      return ret.contents[0];
    }
    return null;
  } catch (err: any) {
    console.error(ct, 'GetBlogList', err.message);
    return null;
  }
};
