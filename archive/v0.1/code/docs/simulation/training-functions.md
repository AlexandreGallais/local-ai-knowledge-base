---
id: simulation-training-functions
title: Training functions of a simulator
topic: simulation
summary: Freeze, snapshot, restore, backtrack, replay, scenarios and malfunctions, their behavior and what the models must provide.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Training functions of a simulator

Contents: 1. Rules · 2. The functions · 3. The French word "reprise" · Sources

## 1. Rules for the code of training functions

- Every command of the instructor station goes through the executive, dated in simulated time.
- The whole state of a model is in serializable fields: nothing in a hidden variable. [S3] [S4]
- A malfunction or a forcing is data of the saved state, set by the instructor station, never a special case in the code. [S4]
- A model advances only when it is called: freeze needs nothing from it.

## 2. The functions (training simulator)

| Function | What it is | What the code must do |
| --- | --- | --- |
| Instructor station | The station from which the instructor commands the simulator; it can force inputs and outputs [S2] | Send commands to the executive, never to a model |
| Scenario | A list of operations, for example malfunctions, to train or examine [S2] | A list of events, dated or conditional |
| Initial conditions | A start state chosen by the instructor [S1] | Load a full state before the first step |
| Freeze, run | Simulated time stops while the program runs; Trick freezes at the end of a step or frame and keeps calling freeze jobs; ECSS runs only the entry points tied to the wall clock [S5] [S1] [S4] | Stop calling the models; keep the display alive |
| Snapshot, checkpoint | A saved state; Trick writes a readable text file, at a time, at the end or periodically; ECSS makes persistence mandatory for a model [S3] [S1] [S4] | Save and restore every field of every model |
| Backtrack | Automatic snapshots at a set interval, for example 30 to 600 s [S1] | A snapshot must be fast and never delay the frame |
| Replay | Replays from a backtrack point, without operator action [S1] | Replay recorded inputs on a deterministic simulator, or read recorded outputs |
| Malfunction | Triggered on demand, at a time or on an event, as a step or a ramp [S1] | A named fault value in the state of the model |
| Failure, forcing | ECSS: a persistent failure object; a model can declare itself failable; a field can be forcible [S4] | Failures and forcings are saved with the state |
| Remote functions | Local plant actions commanded from the instructor station [S1] | The same interface as operator actions |
| Slow and fast time | About a tenth of real time, or faster [S1] | A ratio set in the executive, never in a model |

## 3. "Reprise" means two things in French (freeze and restore)

"Reprise" names both the restart after a freeze and the restore of a saved state. In English and in code, keep two words: `Run` (or `Resume`) and `Restore`.

## Sources

- [S1] IAEA, "Selection, specification, design and use of various nuclear power plant training simulators", IAEA-TECDOC-995, 1998, <https://www-pub.iaea.org/MTCD/publications/PDF/te_995_prn.pdf>, read 2026-11-12, summarized.
- [S2] IAEA, "Guidelines for upgrade and modernization of nuclear power plant training simulators", IAEA-TECDOC-1500, 2006, <https://www-pub.iaea.org/MTCD/Publications/PDF/te_1500_web.pdf>, read 2026-11-12, summarized.
- [S3] NASA, Trick documentation, "Checkpoints", <https://nasa.github.io/trick/documentation/simulation_capabilities/Checkpoints>, read 2026-11-12, summarized.
- [S4] ECSS, "Simulation modelling platform", ECSS-E-ST-40-07C Rev.1, 2025-08-05, <https://ecss.nl/wp-content/uploads/2025/08/ECSS-E-ST-40-07C-Rev.1(5August2025).pdf>, read 2026-11-12, summarized.
- [S5] NASA, Trick documentation, "Executive Scheduler", <https://nasa.github.io/trick/documentation/simulation_capabilities/Executive-Scheduler>, read 2026-11-12, summarized.
