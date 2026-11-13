---
id: fluid-model-laws
title: Fluid model laws and levels of detail
topic: synoptics
summary: Four laws and two relations that animate a fluid synoptic, and the three levels of model detail to choose from.
tool: none
version: "none"
checked: 2026-11-13
sources: [S10, S14, S33, S34, S35, S36, S37, S38, S39, S40, S41, S42]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Fluid model laws and levels of detail

Contents: 1. Laws · 2. Levels of detail · 3. Keep it simple · Sources

## 1. Four laws and two relations (fluid model)

| Law | Form | Use | Limits |
| --- | --- | --- | --- |
| Valve flow coefficient | `Q = Kv × √(Δp / (ρ / ρ0))`, `Q` in m³/h, `Δp` in bar, `ρ0` density of water. `Kv`: water flow in m³/h under 1 bar | Any valve or orifice [S33] [S38] | Liquids. For a gas, only while the pressure drop stays under 0.2 times the inlet absolute pressure; beyond, choked flow models. Not for non-Newtonian fluids or slurries [S34] [S42] |
| Pump curve and affinity | Head-flow curve at rated speed, linear, quadratic or polynomial; at another speed, flow scales with speed, head with its square, power with its cube | Centrifugal pumps, fans [S35] [S36] [S40] | Similar machines, efficiency taken constant. A positive displacement pump gives a flow proportional to speed, whatever the pressure [S10] |
| Tank volume balance | `dV/dt = inflows − outflows`; `level = V / area`; bottom pressure = height × specific weight | Tanks, sumps, ballast tanks [S14] [S37] | Constant cross-section; stop the computation when the tank overflows |
| Pressure loss | `Δp = f × (L / D) × ρ × v² / 2`; turbulent: loss grows as the square of the speed; laminar: `f = 64 / Re` | Pipes, filters, exchangers [S41] | For a synoptic: `Δp = K × Q²`, one coefficient per branch |
| Cylinder force | `F = p × A`; rod side: piston area − rod area | Cylinders [S14] | Friction ignored |
| Speed and flow | `Q = v × A` | Cylinders, pipes [S14] | Incompressible fluid |

- `Cv` is the water flow in US gallons per minute under 1 psi at 60 °F. Use one factor in the whole project: `Cv = 1.16 × Kv`. [S39]
- Control valve sizing follows IEC 60534-2-1; its liquid equations assume an incompressible Newtonian fluid. [S42]
- Opening dynamics: filter the opening order with a rise time, or move on a ramp, to avoid unrealistic flow reversals. [S34]
- Gas volumes (air receiver, accumulator): ideal gas law and gas compression (elementary physics, analysis).

## 2. Three levels of model detail (fluid synoptic)

| Level | What it computes | Fits |
| --- | --- | --- |
| 0. Logic | States only. A line is "fed" when a path of open valves links it to a running source | Colouring pipes, checking a valve line-up, procedure training [S34] |
| 1. Quasi-static | One flow and one pressure per branch: valve law, pump curve, `Δp = K × Q²`; levels integrated in time | Credible flows, pressures and levels; alarms and trips [S33] [S35] [S41] |
| 2. Dynamic | Level 1 plus opening delays, temperatures, gases, start-ups | Control loops, transients, fine faults [S34] |

Choose level 1 by default, level 0 for circuits without a shown measure, level 2 only for the part a scenario plays.

## 3. Keep the model simple (fluid synoptic)

- One coefficient per branch.
- No implicit equation when an explicit rule is enough: `outlet pressure = min(inlet pressure, setpoint)`.
- Every fault parameter is a named property: `cloggingPercent`, `failPosition`.
- The simplest public valve model, with a pressure loss proportional to flow, is presented by its documentation as a test model: say so when you use it. [S34]

## Sources

- [S10] US Navy, "Fluid Power", NAVEDTRA 14105A, chapter 4 "Pumps", <https://engineeringlibrary.org/reference/hydraulic-pumps-navy>, read 2026-11-12, US government work, summarized.
- [S14] Same, chapter 2 "Forces in Liquids", <https://engineeringlibrary.org/reference/hydraulics-forces-in-liquids-navy>, read 2026-11-12, summarized.
- [S33] Modelica Association, "Modelica.Fluid User's Guide, Valve characteristics", <https://doc.modelica.org/om/Modelica.Fluid.UsersGuide.ComponentDefinition.ValveCharacteristics.html>, read 2026-11-12, summarized.
- [S34] Modelica Association, "Modelica.Fluid.Valves", Modelica Standard Library 4.0.0, <https://doc.modelica.org/Modelica%204.0.0/Resources/helpDymola/Modelica_Fluid_Valves.html>, read 2026-11-12, summarized.
- [S35] Modelica Association, "Modelica.Fluid.Machines.BaseClasses.PartialPump", <https://doc.modelica.org/om/Modelica.Fluid.Machines.BaseClasses.PartialPump.html>, read 2026-11-12, summarized.
- [S36] Modelica Association, "PumpCharacteristics", <https://doc.modelica.org/om/Modelica.Fluid.Machines.BaseClasses.PumpCharacteristics.html>, read 2026-11-12, summarized.
- [S37] Modelica Association, "Modelica.Fluid.Vessels.OpenTank", <https://doc.modelica.org/om/Modelica.Fluid.Vessels.OpenTank.html>, read 2026-11-12, summarized.
- [S38] Wikipedia, "Flow coefficient", <https://en.wikipedia.org/wiki/Flow_coefficient>, read 2026-11-12, CC BY-SA, summarized.
- [S39] The Engineering ToolBox, "Flow Coefficient Cv vs. Flow Factor Kv", <https://engineeringtoolbox.com/flow-coefficient-factor-d_238.html>, read 2026-11-12, summarized.
- [S40] Wikipedia, "Affinity laws", <https://en.wikipedia.org/wiki/Affinity_laws>, read 2026-11-12, CC BY-SA, summarized.
- [S41] Wikipedia, "Darcy–Weisbach equation", <https://en.wikipedia.org/wiki/Darcy%E2%80%93Weisbach_equation>, read 2026-11-12, CC BY-SA, summarized.
- [S42] IEC, "IEC 60534-2-1:2011 Industrial-process control valves, Part 2-1: Flow capacity, Sizing equations", catalog page, <https://webstore.iec.ch/en/publication/2461>, read 2026-11-12, all rights reserved, cited by reference.
