---
name: units-and-dimensions
description: "Keeps physical units consistent - dimensional analysis, SI internally, conversions at the boundaries, unit libraries. Use when code handles physical quantities (pressure, temperature, speed, flow, angles, energy), converts units, mixes values from several sources, or when a result is off by a constant factor."
metadata:
  id: SCI-08
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Units and dimensions

**Core rule:** compute in one consistent unit system (SI by default), convert only at inputs and outputs, and check the dimensions of every formula.

## Procedure

1. List the quantities with their units at each input and output.
   - Check: no quantity without a unit.
2. Convert inputs to SI once, at the boundary; convert outputs back for display.
   - Check: no conversion inside computation code.
3. Check each formula's dimensions on paper or with a unit library (`pint` in Python, a typed units crate or library if the project has one).
   - Check: both sides of each equation have the same dimension.
4. Test conversions with known values from the maths or physics documentation (`math-docs`, `physics-docs`).
   - Check: tests pass with the reference values.

| Trap | Rule |
| --- | --- |
| Temperature | convert with offsets (degree Celsius to kelvin adds 273.15); differences need no offset |
| Pressure | absolute versus gauge; bar, Pa, psi |
| Angles | trigonometric functions take radians |
| Rates | per second versus per hour; litres versus cubic metres |

## Stop and ask the human if

- The source of a value does not state its unit.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The unit is obvious from the name." | Write it in the name or type (`pressureBar`). |
| "Convert where needed." | Scattered conversions get applied twice. Convert at boundaries. |

## Definition of done

- [ ] Units explicit; SI inside; conversions at boundaries and tested; formulas dimensionally checked.
