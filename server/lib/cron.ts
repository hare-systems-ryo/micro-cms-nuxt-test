/* ----------------------------------------------------------------------------
server\lib\cron.ts
// ----------------------------------------------------------------------------
// [ server > lib > cron ]
import {} from '@/server/lib/cron';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { H3Event } from 'h3';
// ----------------------------------------------------------------------------

/**
 * CronJob用認証
 */
export const CheckCronJob = (event: H3Event) => {
  const cronSecret = String(process.env.CRON_SECRET);
  if (!cronSecret) {
    throw new Error(`[ENV.CRON_SECRET]が設定されていません。`);
  }
  if (!('authorization' in event.node.req.headers)) {
    return false;
  }
  return cronSecret !== `Bearer ${event.node.req.headers.authorization}`;
};
