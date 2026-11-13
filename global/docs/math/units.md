---
id: units
title: "Units and conversions"
topic: math
summary: "The unit in the name, conversion through one base unit, pressure, temperature and its difference, flow, duration, length, speed, rotation."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S33]
license: MIT, written for this base; facts from the sources below
---

# Units and conversions

Contents: Put the unit in the name · Convert through one base unit · Pressure · Temperature and temperature difference · Flow · Duration, length and speed · Rotation speed · Sources

## 1. Put the unit in the name

Formula: a number with a unit ends its name with the unit suffix of the naming table.

Example: the wrong way, then the right one.

Wrong:

```ts
function toAngle(pressure: number): number
```

Right:

```ts
function pressureToNeedleAngleDeg(pressureBar: number): number
```

Pitfall: Add a suffix to the naming table before you use a new one.

Sources: naming rules of the base (`symbol-property-naming.md`).

## 2. Convert through one base unit

Formula: result = value * factor[from] / factor[to]. Write the factors against the smallest unit, so they are integers.

Example: `convertVolumeFlow(60, 'lPerMin', 'm3PerH')` gives `3.6`.

Pitfall: Do not chain two rounded factors. Do not type a factor from memory: take it from the table of the function.

Sources: [S33] [E]

## 3. Pressure

Formula: 1 bar = 100000 Pa. 1 mbar = 100 Pa. 1 atm = 101325 Pa. 1 psi = 6894.757 Pa.

Example: `convertPressure(2.5, 'bar', 'mbar')` gives `2500`. `convertPressure(1, 'bar', 'psi')` gives `14.503774389728312`.

Pitfall: The psi factor has 7 significant digits. Format the result; do not show all its digits.

Kit: `convertPressure` in `kit/math/convert-pressure.ts`. Sources: [S33] [E]

## 4. Temperature and temperature difference

Formula: K = degC + 273.15. degF = degC * 1.8 + 32. A difference has no offset: 1 degC of difference = 1.8 degF of difference.

Example: `convertTemperature(100, 'degC', 'degF')` gives `212`. `convertTemperatureDifference(10, 'degC', 'degF')` gives `18`.

Pitfall: `convertTemperature(10, 'degC', 'degF')` gives `50`: right for a temperature, wrong for a rise of 10 degC. `convertTemperature(37, 'degC', 'degF')` gives `98.60000000000001`: format it.

Kit: `convertTemperature` in `kit/math/convert-temperature.ts`. , `convertTemperatureDifference`. Sources: [S33] [E]

## 5. Flow

Formula: 1 m3/h = 1000 L/h. 1 L/min = 60 L/h. 1 L/s = 3600 L/h.

Example: `convertVolumeFlow(1, 'm3PerH', 'lPerMin')` gives `16.666666666666668`. `convertVolumeFlow(120, 'lPerMin', 'm3PerH')` gives `7.2`.

Pitfall: Per hour and per minute differ by 60, per hour and per second by 3600. Read the suffix.

Kit: `convertVolumeFlow` in `kit/math/convert-volume-flow.ts`. Sources: [S33] [E]

## 6. Duration, length and speed

Formula: 1 min = 60 s. 1 h = 3600 s. 1 day = 86400 s. 1 nautical mile = 1852 m. 1 knot = 1.852 km/h.

Example: `convertDuration(90, 'min', 'h')` gives `1.5`. `convertSpeed(1, 'kn', 'mPerS')` gives `0.5144444444444445`.

Pitfall: Timers and animation clocks count in milliseconds. Name the unit: `durationMs`, `durationS`.

Kit: `convertDuration` in `kit/math/convert-duration.ts`. , `convertLength`, `convertSpeed`. Sources: [S33] [E]

## 7. Rotation speed

Formula: 1 rpm = 6 deg/s = 2 * PI / 60 rad/s.

Example: `convertRotationSpeed(1, 'rpm', 'degPerS')` gives `6`. `convertRotationSpeed(3000, 'rpm', 'radPerS')` gives `314.1592653589793`.

Pitfall: An angle for one frame = speed in deg/s * elapsed seconds. Do not add a fixed angle per frame.

Kit: `convertRotationSpeed` in `kit/math/convert-rotation-speed.ts`. Sources: [S33] [E]

## Sources

- [S33] NIST, 2016, "NIST Guide to the SI (SP 811), Appendix B.8 : Factors for Units Listed Alphabetically", <https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
