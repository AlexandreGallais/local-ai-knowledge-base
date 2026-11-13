import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';
import type { PushPullButtonProperties } from './push-pull-button.ts';
import type { Health } from './symbol-sets.ts';

const STOP_BUTTON: PushPullButtonProperties = {
  hasContactFault: false,
  health: 'normal',
  isAvailable: true,
  isEmergencyStop: false,
  isInhibited: false,
  isNormallyClosed: true,
  isOutOfService: false,
  isSimulated: false,
  legendText: 'STOP',
  plungerPosition: 'in',
  positionCount: 2,
  resetMethod: 'pull',
  tagName: 'PB-101',
};

describe('PushPullButtonProperties', () => {
  it('has the plunger, reset and contact properties of its card', () => {
    expectTypeOf<PushPullButtonProperties['plungerPosition']>().toEqualTypeOf<'center' | 'in' | 'out'>();
    expectTypeOf<PushPullButtonProperties['resetMethod']>().toEqualTypeOf<'key' | 'pull' | 'twist'>();
    expectTypeOf<PushPullButtonProperties['isNormallyClosed']>().toEqualTypeOf<boolean>();
    expectTypeOf<PushPullButtonProperties['positionCount']>().toEqualTypeOf<number>();
    expect(STOP_BUTTON.resetMethod).toBe('pull');
  });
  it('has the properties of the set panelDevice', () => {
    expectTypeOf<PushPullButtonProperties['tagName']>().toEqualTypeOf<string>();
    expectTypeOf<PushPullButtonProperties['health']>().toEqualTypeOf<Health>();
    expect(Object.keys(STOP_BUTTON)).toHaveLength(13);
  });
  it('is read only', () => {
    const button: PushPullButtonProperties = { ...STOP_BUTTON };

    // @ts-expect-error: a property of a symbol is read only.
    button.plungerPosition = 'out';
    expect(button.plungerPosition).toBe('out');
  });
});
