/* ----------------------------------------------------------------------------
server\lib\redis\main.ts
// ----------------------------------------------------------------------------
// [ server > lib > redis > main ]
import {} from '@/server/lib/redis/main';
----------------------------------------------------------------------------- */

// [ node_modules ]
import Redis from 'ioredis';

// ----------------------------------------------------------------------------
const ct = `server:lib:redis:main.ts`;
// ----------------------------------------------------------------------------
export type RedisDataConfig = {
  baseKey: string;
  version: string;
  ttl: number; // 秒 分 時
};
type RedisDataObject<T> = {
  v: string;
  d: T;
};
// ----------------------------------------------------------------------------

const RedisKeyPrefix = String(process.env.REDIS_KEY_PREFIX);
const CreateRedisKey = (baseKey: string, key: string) => {
  return `${RedisKeyPrefix}|${baseKey}|${key}`;
};

export const GetRedisClient = () => {
  const url = String(process.env.REDIS_URL);
  if (!url) {
    throw new Error('Redis URLがセットされていません');
  }
  const client = new Redis(url);
  return client;
};

const GetRedisObject = async <T = any>(config: RedisDataConfig, redis: Redis, key: string): Promise<T | null> => {
  const k = CreateRedisKey(config.baseKey, key);
  try {
    const toJson = (data: string | null): RedisDataObject<T> | null => {
      try {
        if (!data) return null;
        return JSON.parse(data);
      } catch (error) {
        return null;
      }
    };
    const ret = await redis.get(k);
    const json = toJson(ret);
    if (!json) return null;
    if (!('v' in json && 'd' in json)) return null;
    if (json.v !== config.version) {
      redis.del(k);
      return null;
    }
    return json.d;
  } catch (err: any) {
    console.error(ct, 'GetRedisObject', k, err.message);
    return null;
  }
};

const SetRedisObject = async <T = any>(config: RedisDataConfig, redis: Redis, key: string, data: T): Promise<void> => {
  const k = CreateRedisKey(config.baseKey, key);
  try {
    const dataText = JSON.stringify({
      v: config.version,
      d: data,
    });
    await redis.pipeline().set(k, dataText).expire(k, config.ttl).exec();
  } catch (err: any) {
    console.error(ct, 'SetRedisObject', k, err.message);
  }
};
const DeleteRedisData = async (config: RedisDataConfig, redis: Redis, key: string): Promise<void> => {
  const k = CreateRedisKey(config.baseKey, key);
  try {
    await redis.del(k);
  } catch (err: any) {
    console.error(ct, 'DeleteRedisData', k, err.message);
  }
};

const DeleteAllRedisData = async (config: RedisDataConfig, redis: Redis, key: string): Promise<void> => {
  const k = CreateRedisKey(config.baseKey, key);
  try {
    const list = await redis.keys(k);
    const jobList = [];
    for (let i = 0; i < list.length; i++) {
      jobList.push(redis.del(list[i]));
      if (jobList.length > 5) {
        await Promise.all(jobList);
        jobList.length = 0;
      }
    }
    if (jobList.length > 0) {
      await Promise.all(jobList);
    }
  } catch (err: any) {
    console.error(ct, 'DeleteRedisData', k, err.message);
  }
};

export const RedisObjectControl = <T = any>(config: RedisDataConfig) => {
  type RedisObjectControlResult = {
    redis: Redis;
    GetData: (key: string | number) => Promise<T | null>;
    SetData: (key: string | number, data: T | null) => Promise<void>;
    DeleteData: (key: string | number) => Promise<void>;
    DeleteAllData: (key: string | number) => Promise<void>;
  };
  const redis = GetRedisClient();
  const GetData: RedisObjectControlResult['GetData'] = async (key: string | number) => {
    return await GetRedisObject<T>(config, redis, String(key));
  };
  const SetData: RedisObjectControlResult['SetData'] = async (key: string | number, data: T | null) => {
    return await SetRedisObject<T | null>(config, redis, String(key), data);
  };
  const DeleteData: RedisObjectControlResult['DeleteData'] = async (key: string | number) => {
    return await DeleteRedisData(config, redis, String(key));
  };
  const DeleteAllData: RedisObjectControlResult['DeleteAllData'] = async (key: string | number) => {
    return await DeleteAllRedisData(config, redis, String(key));
  };
  const ret: RedisObjectControlResult = {
    redis,
    GetData,
    SetData,
    DeleteData,
    DeleteAllData,
  };
  return ret;
};
