# F15 trial on the workstation

What to play on the workstation for the criterion of F15 that only a person can see. About 10
minutes.

## 1. The question test

In a new session, in a project that holds the base, ask in French:

> Comment s'appelle en anglais un déclencheur manuel d'alarme incendie, et quelles propriétés lui
> donner ?

Expected:

- The AI opens `docs/synoptics/index.md`, then `index-fr-en-systems.md` and
  `catalog-fire-detection.md`; no other topic.
- It answers in French: "Manual call point", IMO symbol 2.40, and the properties `isActivated`,
  `hasFault`, `isDisabled`, `isLocalResetCommanded`, with `loopId`, `deviceAddress`, `zoneId` when
  addressable.
- It explains the real working (button or glass, reset by key, one at each exit, no corridor point
  more than 20 m away), then the model (latched boolean until the local reset, then the panel
  reset).

## 2. Check a few pairs of the index

Pick five pairs of `index-fr-en-systems.md` and compare them with the glossary of the team.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Opened only the synoptics documents |  |  |
| English name and properties from the catalog |  |  |
| Real working, then model |  |  |
| Five index pairs match the glossary of the team |  |  |
