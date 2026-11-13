---
id: filters-thresholds
title: "Smoothing and thresholds"
topic: math
summary: "Exponential smoothing and its factor from a time constant, hysteresis with two thresholds, deadband, alarm limit zones, NaN inputs."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S3, S25, S26, S27, S28]
license: MIT, written for this base; facts from the sources below
---

# Smoothing and thresholds

Contents: Exponential smoothing · Take the factor from a time constant · Hysteresis: two thresholds · Deadband on a shown value · Limit zones · A NaN input is not a normal value · Sources

## 1. Exponential smoothing

Formula: next = previous + factor * (sample - previous), with factor above 0 and at most 1.

Example: `exponentialSmoothing(20, 30, 0.25)` gives `22.5`. `exponentialSmoothing(5, 9, 1)` gives `9`.

Pitfall: A factor near 1 follows the signal; a factor near 0 smooths more and lags more. Start with the first sample, not with 0.

Kit: `exponentialSmoothing` in `kit/math/exponential-smoothing.ts`. Sources: [S28] [E]

## 2. Take the factor from a time constant

Formula: factor = 1 - exp(-deltaTime / timeConstant). Same unit for both.

Example: `smoothingFactorFromTimeConstant(1 / 60, 0.5)` gives `0.0327838995179941`.

Pitfall: A fixed factor per frame depends on the screen. A step from 0 to 100 with a fixed factor 0.1 gives 99.82 after 1 s at 60 Hz and 99.9997 at 120 Hz. With a time constant of 0.5 s it gives 86.47 at both.

Kit: `smoothingFactorFromTimeConstant` in `kit/math/smoothing-factor-from-time-constant.ts`. Sources: [S25] [E]

## 3. Hysteresis: two thresholds

Formula: high alarm: active when value >= activateAt; inactive when value <= deactivateAt; unchanged between the two.

Example: thresholds 60 and 59, values 58, 60, 59.5, 60.2, 59.1, 59 give false, true, true, true, true, false.

Pitfall: With one threshold at 60, the values 59.9, 60.1, 59.9, 60.1 give false, true, false, true: the alarm chatters.

Kit: `applyHysteresis` in `kit/math/apply-hysteresis.ts`. For a low alarm, pass activateAt below deactivateAt. Sources: [S26] [S27] [E]

## 4. Deadband on a shown value

Formula: keep the shown value until abs(value - shown) >= deadband.

Example: `applyDeadband(10, 10.4, 0.5)` gives `10`. `applyDeadband(10, 10.5, 0.5)` gives `10.5`.

Pitfall: `0.7 - 0.4 >= 0.3` gives `false`. Do not write a test whose value sits exactly on the limit. A deadband that is too wide hides real changes.

Kit: `applyDeadband` in `kit/math/apply-deadband.ts`. Sources: [S27] [E]

## 5. Limit zones

Formula: value >= highHighLimit: `highHigh`; >= highLimit: `high`; <= lowLowLimit: `lowLow`; <= lowLimit: `low`; else `normal`.

Example: limits 10, 20, 80, 90: 85 gives `'high'`, 15 gives `'low'`, 50 gives `'normal'`.

Pitfall: Test the highest limit first.

Kit: `classifyAgainstLimits` in `kit/math/classify-against-limits.ts`. Sources: [E]

## 6. A NaN input is not a normal value

Formula: test `Number.isNaN(value)` before any comparison.

Example: `classifyAgainstLimits(NaN, limits)` gives `'unknown'`. `applyHysteresis` keeps its state.

Pitfall: `NaN >= limit` gives `false`: without the test, a broken measure looks normal.

Sources: [S3] [E]

## Sources

- [S3] Goldberg D., 1991, "What Every Computer Scientist Should Know About Floating-Point Arithmetic", <https://docs.oracle.com/cd/E19957-01/816-2464/ncg_goldberg.html>.
- [S25] Lembcke S., 2017, "Improved Lerp Smoothing", <https://howlingmoonsoftware.com/improved-lerp-smoothing/>.
- [S26] Musa C.-A., 2020, "Why should I use an alarm deadband?", <https://www.exida.com/Blog/why-should-i-use-an-alarm-deadband>.
- [S27] Brown K., 2016, "How to reduce alarm chatter", <https://www.controlglobal.com/visualize/alarm-management/article/11316426/how-to-reduce-alarm-chatter>.
- [S28] NIST/SEMATECH, « e-Handbook of Statistical Methods », "e-Handbook of Statistical Methods", <https://itl.nist.gov/div898/handbook/pmc/section4/pmc431.htm>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
