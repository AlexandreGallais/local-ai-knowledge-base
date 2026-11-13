---
id: catalog-instrumentation
title: Sensors and instrumentation catalog
topic: synoptics
summary: Instrument tags, six transmitters, switches, the 4 to 20 mA loop, alarm limits and device health, with properties and model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]
license: MIT (written for this base; sources summarized)
variant: files
---

# Sensors and instrumentation catalog

Contents: 1. Tag letters · 2. Transmitter properties · 3. Transmitters · 4. Switches and loop · 5. Alarm limits and health · 6. Transmitter model · Sources

## 1. Tag letters (ISA 5.1 instrument tags)

An instrument tag has letters and a loop number. The first letter is the measured quantity, the next letters the function: `FIC045` is a flow indicating controller in loop 045. ISA 5.1 is cited, never copied. [S1]

| Letter | As first letter | As next letter |
| --- | --- | --- |
| P | Pressure | — |
| T | Temperature | Transmit |
| L | Level | Low |
| F | Flow rate | — |
| S | Speed, frequency | Switch |
| Z | Position | Actuator |
| A | Analysis | Alarm |
| H | Hand | High |
| I | Current | Indicate |
| C | — | Control |

Common tags: `PT`, `TT`, `LT`, `FT` transmitters, `PI` pressure indicator, `PSH` pressure switch high, `LAHH` level alarm high-high. Show the tag as given in `tagName`; never build it. [S1]

## 2. Transmitter properties (instrument properties in code)

Wrong:

```ts
interface PressureTransmitterWrong {
  pressure: number;
  alarm: boolean;
  status: number;
  simulated: boolean;
}
```

Right:

```ts
type Health = 'normal' | 'failure' | 'checkFunction' | 'offSpec' | 'maintenanceRequired';
type LimitState = 'normal' | 'lowLow' | 'low' | 'high' | 'highHigh';

interface PressureTransmitter {
  readonly tagName: string;
  readonly pressureBar: number;
  readonly rangeMinBar: number;
  readonly rangeMaxBar: number;
  readonly loopCurrentMa: number;
  readonly dampingS: number;
  readonly limitState: LimitState;
  readonly highHighLimitBar: number;
  readonly highLimitBar: number;
  readonly lowLimitBar: number;
  readonly lowLowLimitBar: number;
  readonly alarmDeadbandBar: number;
  readonly health: Health;
  readonly isSimulated: boolean;
  readonly simulatedPressureBar: number;
  readonly hasWireBreakFault: boolean;
}
```

These names follow public device models: a measured value with its unit, a simulation value and state, a damping time [S2]; four alarm limits with a deadband [S3]; a device health with five values [S4]. `alarmState` and `alarmPriority` of the naming document stay for the alarm itself.

## 3. Transmitters (instrumentation catalog)

Each transmitter also has the properties of section 2 for its quantity: range, loop current, damping, limits, health, simulation.

### Pressure transmitter (transmetteur de pression)

- Symbol: ISA 5.1 bubble with `PT` [S1]; the symbol of the project legend.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a strain gauge bridge or a capacitive cell turns pressure into a signal; absolute, gauge or differential measure. [S7]
- States: `normal`, `underRange`, `overRange`, plus `hasWireBreakFault`.
- Properties: `pressureBar` (number, bar, M); `hasWireBreakFault` (boolean, D).
- Model: first-order lag of the process pressure (section 6).

### Temperature transmitter (transmetteur de température)

- Symbol: ISA 5.1 bubble with `TT`. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a Pt100 probe has 100 Ω at 0 °C and gains about 0.385 Ω per °C; three-wire mounting reduces the wire error; the probe sits in a thermowell and its response time is the time to reach 63.2 % of a step; a thermocouple covers a wider range, faster and less precise. [S7]
- States: `normal`, `underRange`, `overRange`, plus `hasWireBreakFault`.
- Properties: `temperatureDegC` (number, °C, M); `responseTimeS` (number, s, P); `hasWireBreakFault` (boolean, D).
- Model: first-order lag with the probe response time.

### Level transmitter (transmetteur de niveau)

- Symbol: ISA 5.1 bubble with `LT`. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a continuous level from the bottom pressure converted with the density, or radar, ultrasound, magnetostrictive float; the liquid level is in practice proportional to the bottom pressure. [S7]
- States: `normal`, `underRange`, `overRange`, plus `hasWireBreakFault`.
- Properties: `levelPercent` (number, %, M); `levelM` (number, m, M); `densityKgPerM3` (number, kg/m³, P).
- Model: level = bottom pressure / (density × g), then a first-order lag.

### Flow transmitter (transmetteur de débit)

- Symbol: ISA 5.1 bubble with `FT`. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: volume or mass flow, linked by density; differential pressure on a restriction, turbine, magnetic (conductive fluid), ultrasonic, Coriolis (direct mass flow), vortex; on an orifice, the pressure drop grows as the square of the flow. [S7]
- States: `normal`, `noFlow`, `overRange`, plus `hasWireBreakFault`.
- Properties: `flowRateM3PerH` (number, m³/h, M); `massFlowRateKgPerS` (number, kg/s, M).
- Model: orifice, `Q = k × √Δp`; then a first-order lag.

### Speed sensor (capteur de vitesse)

- Symbol: ISA 5.1 bubble with `ST`. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: an incremental encoder gives two quadrature signals: their frequency is the speed, the pulse count the distance, their phase the direction; a tachometer has one output, speed without direction. [S8]
- States: `normal`, `zeroSpeed`, plus `hasWireBreakFault`.
- Properties: `speedRpm` (number, rpm, M); `pulsesPerRevolutionCount` (integer, P); `hasWireBreakFault` (boolean, D).
- Model: speed = pulse frequency × 60 / pulses per revolution.

### Position transmitter (capteur de position)

- Symbol: ISA 5.1 bubble with `ZT`. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: an absolute encoder gives the position at power-on and keeps it; an incremental encoder gives only changes and needs a reference run; resolvers and potentiometers do the same in analog. [S8]
- States: `normal`, `notReferenced`, plus `hasWireBreakFault`.
- Properties: `positionPercent` (number, %, M); `angleDeg` (number, °, M); `isReferenced` (boolean, M).
- Model: position of the part, with an offset until the reference run for an incremental encoder.

## 4. Switches and loop (instrumentation catalog)

### Limit, pressure and level switch (contacts et seuils)

- Symbol: ISA 5.1 bubble with `ZS`, `PS` or `LS`, plus `H` or `L`. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a limit switch changes state when a part reaches a position; a pressure switch at a set pressure; a level switch tells if the liquid is above or below one point; wire a safety switch normally closed, so that a broken wire reads as "limit reached". [S7] [S8]
- States: `inactive`, `active`, plus `hasWireBreakFault`.
- Properties: `isActive` (boolean, M); `isNormallyClosed` (boolean, P); `switchSetpointBar`, `hysteresisBar` (number, bar, P, for a pressure switch); `hasWireBreakFault` (boolean, D).
- Model: active above the setpoint, inactive below the setpoint minus the hysteresis.

### 4 to 20 mA current loop (boucle 4-20 mA)

- Symbol: the signal line between the transmitter and the controller, on the project legend.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: 4 mA is 0 % and 20 mA is 100 % of the range; the live zero keeps the device powered by the loop; 0 mA means a broken circuit; under 3.8 mA or above 20.5 mA is a fault; HART carries digital data on the same loop. [S5]
- States: `normal`, `underRange`, `overRange`, `wireBreak`.
- Properties: `loopCurrentMa` (number, mA, M); `hasWireBreakFault` (boolean, D).
- Model: `loopCurrentMa = 4 + 16 × (value − rangeMin) / (rangeMax − rangeMin)`.

## 5. Alarm limits and health (instrumentation catalog)

### Alarm limits (seuils d'alarme)

- Symbol: ISA 5.1 tag letters `AHH`, `AH`, `AL`, `ALL` after the quantity letter. [S1]
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: up to four limits (high-high, high, low, low-low), each with a deadband that delays the return to normal and a severity; limits are exclusive (one state at a time) or not. [S3]
- States: `normal`, `lowLow`, `low`, `high`, `highHigh`.
- Properties: `limitState` (enum, M); `highHighLimitBar`, `highLimitBar`, `lowLimitBar`, `lowLowLimitBar`, `alarmDeadbandBar` (number, bar, P, for a pressure); `isAlarmAcknowledged` (boolean, M); `isAcknowledgeCommanded` (boolean, C).
- Model: compare the value with each limit; return to normal only past the limit by the deadband.

### Device health (état de diagnostic)

- Symbol: a badge on the symbol, as `docs/synoptics/synoptic-rules.md` says.
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: NAMUR NE 107 sorts device diagnostics in four signals: failure (invalid signal), function check (invalid for a time, during a test), maintenance required (works, near end of life), out of specification (outside allowed limits); a public device model adds `normal`. [S9] [S4]
- States: `normal`, `failure`, `checkFunction`, `offSpec`, `maintenanceRequired`.
- Properties: `health` (enum, M).
- Model: set by fault injection: wire break or stuck value gives `failure`, a test gives `checkFunction`.

## 6. Transmitter model (analog transmitter)

Model a transmitter as a first-order lag, `y = k / (T·s + 1) · u` [S10], then add offset, slow drift and random noise [S6].

```ts
interface PressureTransmitterModel {
  filteredPressureBar: number;
  biasOffsetBar: number;
  driftOffsetBar: number;
  noiseAmplitudeBar: number;
}

function stepTransmitter(model: PressureTransmitterModel, processBar: number, dampingS: number, driftRate: number, dtS: number): number {
  const alpha = dtS / (dampingS + dtS);
  model.filteredPressureBar += alpha * (processBar - model.filteredPressureBar);
  model.driftOffsetBar += driftRate * dtS;
  const noise = model.noiseAmplitudeBar * (Math.random() * 2 - 1);
  return model.filteredPressureBar + model.biasOffsetBar + model.driftOffsetBar + noise;
}
```

Clamp the result to the range, then compute the loop current. Faults to simulate: stuck value, wire break (`loopCurrentMa = 0`), out of range, `health = 'failure'`.

## Sources

- [S1] Wikipedia, "Piping and instrumentation diagram" (table of ISA 5.1 letters), <https://en.wikipedia.org/wiki/Piping_and_instrumentation_diagram>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S2] OPC Foundation, "OPC 30081 Process Automation Devices (PA-DIM)", sections 7.26 and 8.2, <https://reference.opcfoundation.org/specs/OPC-30081/8.2>, read 2026-11-12, summarized.
- [S3] OPC Foundation, "OPC 10000-9 Alarms and Conditions", section 5.8.18, <https://reference.opcfoundation.org/specs/OPC-10000-9/5.8.18>, read 2026-11-12, summarized.
- [S4] OPC Foundation, "OPC 10000-100 Devices", section 4.5.4, <https://reference.opcfoundation.org/specs/OPC-10000-100/4.5.4>, read 2026-11-12, summarized.
- [S5] Wikipedia, "Current loop", <https://en.wikipedia.org/wiki/Current_loop>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S6] Wikipedia, "Sensor", <https://en.wikipedia.org/wiki/Sensor>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S7] Wikipedia, "Pressure sensor", "Resistance thermometer", "Level sensor", "Flow measurement", <https://en.wikipedia.org/wiki/Pressure_sensor>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S8] Wikipedia, "Rotary encoder", "Limit switch", <https://en.wikipedia.org/wiki/Rotary_encoder>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S9] Endress+Hauser, "NAMUR NE 107", <https://www.us.endress.com/en/support-overview/learning-center/namur-ne-107>, read 2026-11-12, summarized.
- [S10] Modelica Association, "Modelica.Blocks.Continuous.FirstOrder", Modelica Standard Library 4.1.0, <https://build.openmodelica.org/Documentation/Modelica.Blocks.Continuous.FirstOrder.html>, read 2026-11-12, summarized.
