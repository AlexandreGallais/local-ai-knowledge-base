/**
 * The properties of a motor-operated on-off valve, as a synoptic symbol reads them.
 */
export interface MotorOperatedValveProperties {
  readonly controlMode: 'auto' | 'manual';
  readonly hasPositionFault: boolean;
  readonly hasPowerFault: boolean;
  readonly hasTorqueFault: boolean;
  readonly isClosed: boolean;
  readonly isOpen: boolean;
  readonly isOpenCommanded: boolean;
  readonly positionState: 'closed' | 'closing' | 'intermediate' | 'open' | 'opening' | 'unknown';
  readonly travelTimeS: number;
}
