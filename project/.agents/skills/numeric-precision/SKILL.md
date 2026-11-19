---
name: numeric-precision
description: "Avoids floating-point and integer traps - comparison with tolerance, rounding rules, overflow, integers versus decimals for money. Use when comparing floats, rounding values, summing many numbers, handling money or counters, or when a test fails on 0.30000000000000004."
metadata:
  id: DEV-14
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Numeric precision

**Core rule:** never compare floats with `==`; choose the numeric type by what the value represents (integer counts, decimal money, float measurements).

## Procedure

1. Pick the type with the table.
   - Check: each numeric field has a justified type.
2. Compare floats with a tolerance: `abs(a - b) <= max(rel * max(abs(a), abs(b)), abs_tol)`.
   - Check: tests use the framework's approximate assertion (`toBeCloseTo`, `pytest.approx`, `assert_relative_eq` if present).
3. Round only for display or at defined business points, with a stated rule (half-even, half-up).
   - Check: the rounding rule is written in code or docs.
4. Guard integer overflow where values can grow (sizes, counters, timestamps in ms).
   - Check: the type's range covers the maximum expected value.

| Value | Type |
| --- | --- |
| Counts, indexes, IDs | integer of sufficient size |
| Money | decimal type or integer minor units (cents) |
| Physical measurements | float64 with tolerances |
| Exact fractions | rational or decimal library |

## Stop and ask the human if

- Rounding rules for money or reports are not specified.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "0.1 + 0.2 == 0.3" | False in binary floating point. |
| "Floats are fine for money." | Use decimals or integer cents. |

## Definition of done

- [ ] Types chosen by meaning; tolerances in float comparisons; rounding rule stated; overflow considered.
