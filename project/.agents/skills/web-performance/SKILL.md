---
name: web-performance
description: "Measures and improves front-end performance - rendering, bundle size, re-renders, Core Web Vitals - measuring before and after each change. Use when a page is slow to load or to react, the bundle is large, a list re-renders too much, or when asked to optimise the front end."
license: MIT
metadata:
  id: FE-08
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: auto
---

# Web performance

**Core rule:** measure first, change one thing, measure again with the same method; keep only changes that help.

## Procedure

1. Pick the metric that matches the complaint: load (LCP), responsiveness (INP), layout shift (CLS), bundle size, render count.
   - Check: one metric with a number before any change.
2. Measure it reproducibly: production build, same data, several runs (Playwright trace, the build's bundle report, a render counter).
   - Check: median of the runs noted.
3. Find the cause: largest bundle chunks, long tasks, components rendering without input change.
   - Check: one cause with evidence.
4. Apply one fix: code splitting, memoisation, virtualisation, image sizes, removing a heavy dependency.
   - Check: the metric improves with the same measurement.
5. Run the tests.
   - Check: green.

## Stop and ask the human if

- The fix needs a new dependency or a change of design.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Measure the dev server." | Dev builds are slow on purpose. Measure production builds. |
| "Memoise everything." | Memoisation has a cost; apply it where renders are proven. |

## Definition of done

- [ ] Metric measured before and after with the same method; improvement kept; tests green.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
