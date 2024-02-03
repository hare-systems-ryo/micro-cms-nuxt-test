/* ----------------------------------------------------------------------------
server\lib\redis\object\blog-list.ts
// ----------------------------------------------------------------------------
// [ server > lib > redis > object > blog-list ]
import {} from '@/server/lib/redis/object/blog-list';
----------------------------------------------------------------------------- */

// [ com > type > micro-cms-blog ]
import type { MicroCmsBlogDetail } from '@/com/type/micro-cms-blog';

// [ server > lib > redis > main ]
import { RedisObjectControl } from '@/server/lib/redis/main';
import type { RedisDataConfig } from '@/server/lib/redis/main';
// ----------------------------------------------------------------------------
const ct = `server:lib:redis:object:blog-list.ts`;
// ----------------------------------------------------------------------------
type KvData = MicroCmsBlogDetail[];
const setting: RedisDataConfig = {
  baseKey: 'news-list',
  version: '1.0',
  ttl: 60 * 20, // 秒 分 時間 日
};

export const useRedisObjectBlogList = () => {
  return RedisObjectControl<KvData>(setting);
};
