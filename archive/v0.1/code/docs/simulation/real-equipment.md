---
id: simulation-real-equipment
title: Stimulation, emulation and hardware in the loop
topic: simulation
summary: Stimulation, emulation, simulation and hardware in the loop, with definitions, constraints and how to choose.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Stimulation, emulation and hardware in the loop

Contents: 1. Four ways · 2. Constraints · Sources

## 1. Four ways to bring a real system into a simulator

| Way | Definition (paraphrase) |
| --- | --- |
| Stimulation | The real hardware and software of the plant run in the simulator, fed by the models [S1] |
| Emulation | The software of the real system is ported into the simulator environment and behaves as the reference [S1] |
| Simulation | Models written in the simulator environment reproduce the system within set functional limits [S1] |
| Hardware in the loop | A real embedded device is tested against a simulation of what it controls; emulated sensors and actuators make the interface [S2] |

## 2. Constraints of real or emulated systems

- A stimulated or emulated system must itself support freeze, run and backtrack, or a software layer must add them: a risk for functions and for the schedule. [S1]
- A hardware-in-the-loop bench needs a deterministic environment, with low latency and low jitter. [S2]
- In a virtualized full flight simulator, the motion computer keeps a hard real-time system and is not virtualized. [S3]
- Choose simulation when freeze, snapshot and replay matter more than an exact copy of the control software; choose stimulation or emulation when the training is about that software itself. Ask the team which one the project uses.

## Sources

- [S1] IAEA, "Guidelines for upgrade and modernization of nuclear power plant training simulators", IAEA-TECDOC-1500, 2006, <https://www-pub.iaea.org/MTCD/Publications/PDF/te_1500_web.pdf>, read 2026-11-12, summarized.
- [S2] Wikipedia, "Hardware-in-the-loop simulation", <https://en.wikipedia.org/wiki/Hardware-in-the-loop_simulation>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S3] Arbic, Boivin, Giannias, "Leveraging Data Center Architectures for Full Flight Simulators", I/ITSEC 2024, paper 24155, <https://s3.amazonaws.com/amz.xcdsystem.com/44ECEE4F-033C-295C-BAE73278B7F9CA1D_abstract_File18333/StageTwoPaper_24155_0704044225.pdf>, read 2026-11-12, summarized.
