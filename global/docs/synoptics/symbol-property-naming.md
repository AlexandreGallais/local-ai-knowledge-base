---
id: symbol-property-naming
title: Symbol property naming
topic: synoptics
summary: Naming rules for the properties of a synoptic symbol and of its equipment model, with wrong and right examples.
tool: none
version: "none"
checked: 2026-11-13
sources: [S16, S17, S18, S19, S25, S26, S27, S28, S30, S31, S35, S36]
license: MIT (own words; standards and guides are cited by reference, never copied)
variant: files
---

# Symbol property naming

Contents: 1. Casing · 2. Units · 3. Booleans · 4. States · 5. Command and feedback · 6. Common properties · 7. Final check · Sources

## 1. Casing (symbol property names)

- Write names in English. Use full words. Use nouns, not verbs.
- In TypeScript and in JSON: `camelCase`.
- In C#: `PascalCase`. [S30]
- Keep the same words on both sides. Let the JSON serializer convert the case. Never rename by hand. [S31]
- Write an acronym as a word: `tagId`, not `tagID`. [S18]

Right, in C#:

```csharp
public enum PositionState { Open, Closed, Opening, Closing, Intermediate, Unknown }

public sealed record ValveState(
    string TagName,
    PositionState PositionState,
    double CommandedPositionPercent,
    double ActualPositionPercent);

var options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
options.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
// JSON: {"tagName":"V101","positionState":"open","commandedPositionPercent":100,"actualPositionPercent":100}
```

## 2. Units (symbol property names)

- A bare number with a physical unit carries its unit as the last word of its name. [S28]
- Take the suffix from the table below. Add a line to the table before you use a new suffix.
- Write the suffix as a word: first letter upper case, the rest lower case.
- Use `Percent` for a value from 0 to 100. Use `Ratio` for a value from 0 to 1.
- Use `Count` for a number of items. [S28]
- When the unit can change at run time, do not use a suffix. Use a value object with a `unit` field instead. Never do both. [S17] [S27] [S28]

| Quantity | Suffix | Example |
| --- | --- | --- |
| Pressure | `Bar`, `Mbar`, `Kpa` | `dischargePressureBar` |
| Temperature | `DegC` | `oilTemperatureDegC` |
| Temperature rise | `DegCPerMin` | `rateOfRiseThresholdDegCPerMin` |
| Level, opening, load | `Percent` | `tankLevelPercent` |
| Volume flow | `M3PerH`, `LPerMin` | `coolingFlowM3PerH` |
| Rotation speed | `Rpm` | `shaftSpeedRpm` |
| Ship or fluid speed | `Kn`, `MPerS` | `shipSpeedKn` |
| Voltage | `V` | `busVoltageV` |
| Current | `A` | `motorCurrentA` |
| Frequency | `Hz` | `busFrequencyHz` |
| Power | `Kw` | `activePowerKw` |
| Energy | `Kwh` | `suppliedEnergyKwh` |
| Length, depth | `M`, `Mm` | `keelDepthM` |
| Angle | `Deg` | `rudderAngleDeg` |
| Duration | `S`, `Ms` | `travelTimeS` |
| Mass | `Kg` | `fuelMassKg` |
| Volume | `M3`, `L` | `tankVolumeM3` |
| Small current | `Ma` | `loopCurrentMa` |
| Reactive and apparent power | `Kvar`, `Kva` | `reactivePowerKvar` |
| Battery charge | `Ah` | `batteryChargeAh` |
| Turn rate | `DegPerS` | `rateOfTurnDegPerS` |
| Torque | `Nm`, `Knm` | `shaftTorqueKnm` |
| Force | `N` | `rodForceN` |
| Run time | `H` | `runTimeH` |
| Inertia | `KgM2` | `shaftInertiaKgM2` |
| Ratio, count | `Ratio`, `Count` | `gearRatio`, `startCount` |
| Displacement, area | `Cm3`, `Cm2`, `M2` | `displacementCm3`, `pistonAreaCm2` |
| Low pressure | `Pa` | `filterDifferentialPressurePa` |
| Concentration | `Ppm` | `oilContentPpm` |
| Density, mass flow | `KgPerM3`, `KgPerS` | `densityKgPerM3`, `massFlowRateKgPerS` |
| Kinematic viscosity | `Cst` | `fuelViscosityCst` |

Write each unit with one spelling only: `Percent`, never `Pct`; `DegC`, never `C`; `M3PerH`, never `M3h`.

Wrong:

```ts
export interface PumpWrong {
  Pressure: number;
  pos: number;
  target: number;
}
```

Right:

```ts
export interface PumpRight {
  readonly dischargePressureBar: number;
  readonly dischargePressureSetpointBar: number;
  readonly shaftSpeedRpm: number;
  readonly startCount: number;
}
```

Right, when the unit can change:

```ts
export interface Measurement {
  readonly value: number;
  readonly unit: string;
}

export interface TankRight {
  readonly level: Measurement;
}
```

## 3. Booleans (symbol property names)

- Start a boolean with `is`, `has` or `can`. [S30]
- Name the true case in the affirmative: `isReady`, never `isNotReady`. [S30]
- Use a boolean only for a fact that stands alone.
- Never use two booleans for states that exclude each other. Use one state property (section 4).

Wrong:

```ts
export interface ValveWrong {
  open: boolean;
  closed: boolean;
  notReady: boolean;
}
```

Right:

```ts
export interface ValveRight {
  readonly positionState: 'open' | 'closed' | 'opening' | 'closing' | 'intermediate' | 'unknown';
  readonly isReady: boolean;
  readonly hasPositionFeedback: boolean;
}
```

## 4. States (symbol property names)

- Give one property to each group of states that exclude each other. [S16] [S19]
- End its name with `State`, `Mode`, `Location`, `Priority` or with the plain noun (`health`, `quality`).
- Write the values as `camelCase` words: `'maintenanceRequired'`.
- A switching device has a position with four values, as in IEC 61850: `intermediate` while it moves, `bad` when the two contacts disagree. [S36]
- Always include a value for the unknown case when the state comes from a sensor.

| Property | Values |
| --- | --- |
| `positionState` | `open`, `closed`, `opening`, `closing`, `intermediate`, `unknown` |
| `runState` | `running`, `stopped`, `starting`, `stopping`, `unknown` |
| `controlLocation` | `remote`, `local` |
| `controlMode` | `auto`, `manual` |
| `switchPosition` | `intermediate`, `open`, `closed`, `bad` (circuit breakers, switches, disconnectors) |
| `health` | `normal`, `failure`, `checkFunction`, `offSpec`, `maintenanceRequired` |
| `quality` | `good`, `uncertain`, `bad` |
| `alarmPriority` | `none`, `caution`, `warning`, `alarm`, `emergency` |
| `alarmState` | `normal`, `unacknowledged`, `acknowledged`, `returnedUnacknowledged`, `shelved`, `suppressed`, `outOfService` |

## 5. Command and feedback (symbol property names)

- Name what the system asks with `commanded`. Name what the equipment reports with `actual`. [S19]
- Use this pair for a position or a state: `commandedPositionPercent`, `actualPositionPercent`.
- For a regulated quantity, name the target with `Setpoint` before the unit. Name the measured value with the plain quantity.
- For alarm limits, use the four names of OPC UA before the unit: `HighHighLimit`, `HighLimit`, `LowLimit`, `LowLowLimit`; and `alarmDeadband` for the dead band. [S35]
- A symbol with one measured quantity can drop the quantity: `highLimitBar`.
- Order the words like this: location or role, quantity, qualifier, unit.

| Meaning | Name |
| --- | --- |
| Measured pressure at the discharge | `dischargePressureBar` |
| Pressure target | `dischargePressureSetpointBar` |
| High pressure limit | `dischargePressureHighLimitBar` |
| Very high pressure limit | `dischargePressureHighHighLimitBar` |
| Dead band of the alarms | `alarmDeadbandBar` |
| Position asked by the command | `commandedPositionPercent` |
| Position reported by the equipment | `actualPositionPercent` |
| State asked by the command | `commandedRunState` |
| State reported by the equipment | `runState` |

## 6. Common properties (every symbol)

Give these properties to every symbol. Add the properties of the equipment after them.

```ts
export interface CommonSymbolInputs {
  readonly tagName: string;
  readonly description?: string;
  readonly health: 'normal' | 'failure' | 'checkFunction' | 'offSpec' | 'maintenanceRequired';
  readonly quality: 'good' | 'uncertain' | 'bad';
  readonly controlLocation: 'remote' | 'local';
  readonly controlMode: 'auto' | 'manual';
  readonly isOutOfService: boolean;
  readonly isInhibited: boolean;
  readonly isSimulated: boolean;
  readonly alarmPriority: 'none' | 'caution' | 'warning' | 'alarm' | 'emergency';
  readonly alarmState:
    | 'normal'
    | 'unacknowledged'
    | 'acknowledged'
    | 'returnedUnacknowledged'
    | 'shelved'
    | 'suppressed'
    | 'outOfService';
}
```

- `tagName` is the identifier shown on the view. Show it as given. Never build it and never parse it. [S25] [S26]
- `health` follows the four standard diagnostic cases plus `normal`. [S16]

## 7. Final check (symbol property names)

- Does every bare number with a unit end with a suffix from the table?
- Does every boolean start with `is`, `has` or `can`, in the affirmative?
- Is every group of exclusive states one property, never several booleans?
- Are the words the same in TypeScript and in C#, with only the case changed?

## Sources

- [S16] OPC Foundation, "OPC 10000-100: Devices", v1.05, section 4.5.4, <https://reference.opcfoundation.org/specs/OPC-10000-100/4.5.4>, read 2026-11-12, OPC Foundation license, summarized.
- [S17] OPC Foundation, "OPC 10000-8: Data Access", v1.05.07, <https://reference.opcfoundation.org/specs/OPC-10000-8/full>, read 2026-11-12, OPC Foundation license, summarized.
- [S18] OPC Foundation, "OPC 11030: UA Modelling Best Practices", section 2.1.2, <https://reference.opcfoundation.org/specs/OPC-11030/2.1.2>, read 2026-11-12, OPC Foundation license, summarized.
- [S19] DNV, "DNV naming rule" (ISO 19848 Local ID), <https://docs.vista.dnv.com/docs/standards/dnv-naming-rule>, read 2026-11-12, license not stated, summarized.
- [S25] IEC, "IEC CDD, IEC 61987, property tag name", <https://cdd.iec.ch/cdd/iec61987/iec61987.nsf/0/1BE8325198445094C1258A7D0039DA99>, read 2026-11-12, all rights reserved, summarized.
- [S26] POSC Caesar Association, "CFIHOS RDL v2.0, property name", <https://posccaesar.org/cfihos/v2.0/CFIHOS-10000056>, read 2026-11-12, license not stated, summarized.
- [S27] Microsoft, "DTDL v4, QuantitativeTypes extension v2", <https://azure.github.io/opendigitaltwins-dtdl/DTDL/v4/DTDL.quantitativeTypes.v2.html>, read 2026-11-12, license not stated, summarized.
- [S28] Google, "AIP-141: Quantities", <https://google.aip.dev/141>, read 2026-11-12, CC BY 4.0, summarized.
- [S30] Microsoft, "Names of Type Members", Framework Design Guidelines, <https://learn.microsoft.com/sl-si/dotnet/standard/design-guidelines/names-of-type-members>, read 2026-11-12, all rights reserved, summarized.
- [S31] Microsoft, "How to customize property names and values with System.Text.Json", 2026-09-29, <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/customize-properties>, read 2026-11-12, license not stated, summarized.
- [S35] OPC Foundation, "OPC 10000-9: Alarms and Conditions", section 5.8.18 LimitAlarmType, <https://reference.opcfoundation.org/specs/OPC-10000-9/5.8.18>, read 2026-11-12, license not stated, summarized.
- [S36] ABB, "IEC 61850 server, Introduction", <https://help.plc.abb.com/iec_61850_server_introduction.html>, read 2026-11-12, manufacturer source, license not stated, summarized.
