/* ----------------------------------------------------------------------------
server\lib\micro-cms\main.ts
// ----------------------------------------------------------------------------
// [ server > lib > micro-cms > main ]
import {} from '@/server/lib/micro-cms/main';
----------------------------------------------------------------------------- */
export const MicroCmsConfig = {
  serviceDomain: String(process.env.MICRO_CMS_SERVICE_DOMAIN),
  apiKey: String(process.env.MICRO_CMS_API_KEY),
};
