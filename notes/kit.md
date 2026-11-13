# The kit of pure functions

`global/kit/` holds 133 pure functions, one per file, each with its JSDoc and its Vitest test:

- `math/` (52): comparison, rounding, parsing, ranges, statistics, filters and thresholds, units,
  angles, random, time.
- `geometry/` (81): vectors, angles, polar coordinates and circles, SVG arcs, matrices, viewBox,
  rectangles, intersections, Bezier curves, path builders, distribution and snapping, polygons.

Shared types are in `types.ts`, `shapes.ts`, `results.ts` (geometry) and `types.ts`, `inputs.ts`
(math).

## Where it comes from

- The reference code and the test values of the two research reports of version 0.2: the math of the
  software (annex A, 53 functions) and the 2D geometry of SVG (annexes 1 and 3a, 84 functions). Every
  test value was produced by running that code.
- It was split by a one-off script into one function per file; the JSDoc takes the formula, the edge
  cases and a first example from the reports.
- To pass the pure-functions profile, functions with more than 3 parameters take named objects
  (`CubicBezier`, `Segment`, `Circle`, `Arc`, `Ellipse`, `Grid`, `AspectRatio`, `Span`,
  `NumberRange`, `Tolerance`, `Thresholds`, `FixedTimestep`), loops became expressions, and long
  functions were split. The test values of the reports were moved to the new signatures.
- Left out: `nextSplitMix32` (a seeded random sequence needs bitwise operators, refused by the lint);
  its reference code is in the document `docs/math/random.md`. `normalizeAngle` and
  `shortestAngleDelta` of the geometry report are the math functions `normalizeAngleDegrees` and
  `shortestAngleDeltaDegrees`.

## How it is checked

`node --test scripts/kit.test.ts` copies the kit into the pure-functions sample, then checks that it
is already formatted, that the lint finds 0 errors, that it compiles, and that its tests pass.

## Calibration of the lint found on the way

- The format pass sorts the functions of a module by name: a hoisted function may come after its
  first call. `no-use-before-define` now accepts function declarations.
- The format pass puts each argument of a call on its own line: the size of a function is now counted
  in statements (`max-statements`), and the line limits only catch the extremes.
- The type library of the profiles is ES2023 (`toSorted`, `toReversed`), which Node 22 and the
  browsers of Angular 22 have.
