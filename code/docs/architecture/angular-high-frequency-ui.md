---
id: architecture-angular-high-frequency-ui
title: Angular interface with many changing values
topic: architecture
summary: Show many values that change often, with zoneless signals, OnPush, few DOM nodes and measures first. Angular 22.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Angular interface with many changing values

Contents: 1. What refreshes · 2. Measured case · 3. Rules for a synoptic · Sources

## 1. What refreshes the screen (zoneless and OnPush)

- Zoneless is the default since Angular 21. A refresh comes from a signal read by a template, `markForCheck()` (the `async` pipe calls it), `ComponentRef.setInput`, or a template event listener. [S1]
- OnPush is the default for new applications in v22; `ChangeDetectionStrategy.Default` becomes `Eager`. [S4]
- An OnPush component is checked again only on a new input reference, an event in its subtree, a mark, or a signal it reads; then only the components that read the signal refresh. Changing an object in place triggers nothing. [S2]
- In zoneless mode, a message from the server updates the screen only if it writes a signal or marks the component: every value shown on a synoptic goes through a signal.

## 2. A measured case (large table)

| Change | Effect measured by the author |
| --- | --- |
| OnPush, row and cell components, `@for` with `track` | Script of one click: 612 ms to 9 ms |
| Fewer DOM nodes (the cell becomes the component) | 513,000 to 221,000 nodes; one click rendered under 100 ms |
| Live updates every 50 ms, after these changes | Handled in about 7 ms |
| Heavy computation in a Web Worker, cache | First display from 3 s to 0.3 s |
| Virtual scrolling | Not used; kept as a last resort |

A table of about 73,000 cells, not a synoptic; Angular version not given; April 2025; single source. [S3]

## 3. Rules for a synoptic view (Angular)

- One component per symbol, one signal per shown value, the fewest DOM nodes per symbol.
- Batch the server messages and write the signals once per batch (`docs/architecture/real-time-push.md`).
- Measure before you optimize; virtual scrolling only after a measure shows the need.

## Sources

- [S1] Angular, "Angular without ZoneJS (Zoneless)", <https://angular.dev/guide/zoneless>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Angular, "Skipping component subtrees", <https://angular.dev/best-practices/skipping-subtrees>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Vincent Bourdeix, "Boost Angular Performance: Real-World Optimization Case Study", DEV Community, 2025-04-28, <https://dev.to/vbourdeix/boost-angular-performance-real-world-optimization-case-study-58c7>, read 2026-11-12, summarized.
- [S4] Angular, "Announcing Angular v22", 2026-06-03, <https://blog.angular.dev/announcing-angular-v22-c52bb83a4664>, read 2026-11-12, summarized.
