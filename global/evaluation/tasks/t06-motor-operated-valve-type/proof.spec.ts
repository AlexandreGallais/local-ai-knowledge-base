import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';
import type { MotorOperatedValveProperties } from './motor-operated-valve.ts';

describe('proof of t06', () => {
  it('names the properties after the convention, with their types', () => {
    expectTypeOf<MotorOperatedValveProperties['isOpenCommanded']>().toEqualTypeOf<boolean>();
    expectTypeOf<MotorOperatedValveProperties['isOpen']>().toEqualTypeOf<boolean>();
    expectTypeOf<MotorOperatedValveProperties['isClosed']>().toEqualTypeOf<boolean>();
    expectTypeOf<MotorOperatedValveProperties['hasPositionFault']>().toEqualTypeOf<boolean>();
    expectTypeOf<MotorOperatedValveProperties['travelTimeS']>().toEqualTypeOf<number>();
    expectTypeOf<MotorOperatedValveProperties['hasTorqueFault']>().toEqualTypeOf<boolean>();
    expectTypeOf<MotorOperatedValveProperties['hasPowerFault']>().toEqualTypeOf<boolean>();
    expectTypeOf<MotorOperatedValveProperties['controlMode']>().toEqualTypeOf<'auto' | 'manual'>();
    expectTypeOf<'opening'>().toExtend<MotorOperatedValveProperties['positionState']>();
    expect(true).toBe(true);
  });
});
