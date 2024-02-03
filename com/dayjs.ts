/* ----------------------------------------------------------------------------
com\dayjs.ts
// ----------------------------------------------------------------------------
// [ com > dayjs ]
import {} from '@/com/dayjs';
----------------------------------------------------------------------------- */
import dayjs from 'dayjs';
export const DateFormat = (date: string) => dayjs.utc(date).tz('Asia/Tokyo').format('YYYY年MM月DD日');
