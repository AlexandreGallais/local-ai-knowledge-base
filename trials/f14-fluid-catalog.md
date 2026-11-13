# F14 trial on the workstation

What to play on the workstation for the criterion of F14 that only a person can see. About 10
minutes.

## 1. The question test

In a new session of the coding assistant, in a project that holds the base, ask in French:

> Quelles propriétés pour une vanne papillon motorisée ?

Expected:

- The AI opens `docs/synoptics/index.md`, then `index-fr-en-fluids.md` or the valve catalogs, and
  `fluid-common.md`; no other topic.
- It answers in French, with the English names of the catalog: the sets `onOffValve` or
  `modulatingValve` and `controlMode`, plus `actualPositionPercent`, `hasTorqueFault`,
  `hasPowerFault`, `failPosition`, `travelTimeS`.
- It explains the real working (butterfly disk turned 90 degrees, self-locking worm gear, stays in
  place without power), then the model (ramp over `travelTimeS`, Kv law when throttling).

## 2. Check a few pairs of the index

Pick five pairs of `docs/synoptics/index-fr-en-fluids.md` and compare them with the glossary
of the team. Note the pairs to change: they change in the card and in the index together.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Opened only the synoptics documents |  |  |
| Answer in French, names from the catalog |  |  |
| Real working, then model |  |  |
| Five index pairs match the glossary of the team |  |  |
