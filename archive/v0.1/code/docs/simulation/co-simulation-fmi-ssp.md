---
id: simulation-co-simulation-fmi-ssp
title: FMI, SSP and co-simulation
topic: simulation
summary: FMI 3.0 and SSP 2.0.1, with FMU content, interface types, variables, co-simulation step and pitfalls.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# FMI, SSP and co-simulation

Contents: 1. FMI · 2. SSP · 3. Co-simulation · 4. When to use · Sources

## 1. FMI 3.0 (Functional Mock-up Interface)

- An FMU is a ZIP archive: the XML description (`modelDescription.xml`), compiled libraries or C sources, and data. [S1]
- Three interface types: Model Exchange (the solver is in the importer), Co-Simulation (the model usually brings its solver), Scheduled Execution (an outer scheduler activates partitions of the model, for example on a real-time platform). [S1]
- Variables have a causality (parameter, input, output, local, independent) and a variability: see `docs/simulation/component-models.md`. [S1]
- It exchanges a "black box" model between tools and protects intellectual property; it was designed for continuous systems. [S1] [S3]

## 2. SSP 2.0.1 (System Structure and Parameterization)

A tool-neutral format to describe, package and exchange the structure of a system of components, FMUs among them, and its parameter sets. [S2] [S4]

## 3. Co-simulation (orchestration and pitfalls)

- An orchestrator advances the time of each unit and carries outputs to inputs. [S3]
- Jacobi: all units exchange at the same instant and advance in parallel. Gauss-Seidel: they advance in a set order, more accurate, less parallel. [S3]
- Pitfalls: algebraic loops, extrapolation of inputs between two exchanges, no rollback for a black box. [S3]
- Maritime: the Open Simulation Platform (DNV, Kongsberg Maritime, SINTEF Ocean, NTNU) co-simulates independent models with FMI, can describe the structure with SSP, and adds its own interface specification (variable groups, unit conversion, checks before the run). [S5]

## 4. When to use FMI and SSP

| Need | Choice |
| --- | --- |
| Receive or deliver the model of a piece of equipment without its code | FMI |
| Describe the assembly of several FMUs and their parameters | SSP |
| Models written in the same simulator code | Neither: the model interface of the simulator |

## Sources

- [S1] Modelica Association, "Functional Mock-up Interface Specification", version 3.0, 2022-05-10, <https://fmi-standard.org/docs/3.0>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S2] Modelica Association Project SSP, "System Structure and Parameterization", version 2.0.1, <https://ssp-standard.org/>, read 2026-11-12, summarized.
- [S3] Gomes, Thule, Broman, Larsen, Vangheluwe, "Co-simulation: State of the art", arXiv:1702.00686, 2017, <https://ar5iv.labs.arxiv.org/html/1702.00686>, read 2026-11-12, summarized.
- [S4] Modelica Association Project SSP, "ssp-standard", repository, <https://github.com/modelica/ssp-standard>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S5] Open Simulation Platform, "OSP on GitHub", <https://open-simulation-platform.github.io/>, read 2026-11-12, summarized.
