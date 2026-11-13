import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertVolumeFlow } from './convert-volume-flow.ts';

describe('convertVolumeFlow', () => {
  it('convertVolumeFlow(60, \'lPerMin\', \'m3PerH\')', () => {
    const result = convertVolumeFlow(
      60,
      'lPerMin',
      'm3PerH',
    );

    expect(result).toBe(3.6);
  });

  it('convertVolumeFlow(1, \'m3PerH\', \'lPerMin\')', () => {
    const result = convertVolumeFlow(
      1,
      'm3PerH',
      'lPerMin',
    );

    expect(result).toBe(16.666_666_666_666_668);
  });
});
