/* ----------------------------------------------------------------------------
server\lib\com.ts
// ----------------------------------------------------------------------------
// [ server > lib > com ]
import {} from '@/server/lib/com';
----------------------------------------------------------------------------- */

const convertms = (i: any) => {
  const a = String(i).split('.');
  if (a.length !== 2) {
    return i + '.000';
  } else {
    let ret = a[0];
    ret += '.';
    if (a[1].length === 1) {
      return ret + a[1] + '00';
    } else if (a[1].length === 2) {
      return ret + a[1] + '0';
    } else if (a[1].length === 3) {
      return ret + a[1];
    } else {
      return ret + a[1].slice(-3);
    }
  }
};

export class StopWatch {
  private hrstart: [number, number];
  constructor() {
    this.hrstart = process.hrtime();
  }

  public GetTime = (): string => {
    const hrend = process.hrtime(this.hrstart);
    const time = convertms(Math.floor((hrend[1] / 1000000) * 1000) / 1000);
    return ('___' + hrend[0] + 's').slice(-4) + '' + ('_________' + time).slice(-8) + 'ms';
  };
}
