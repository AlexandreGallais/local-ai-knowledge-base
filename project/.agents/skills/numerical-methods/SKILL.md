---
name: numerical-methods
description: "Chooses and checks numerical methods - integration, root finding, ODE solvers, step size, stability, conditioning. Use when solving equations numerically, integrating an ODE or a simulation step, when results drift, explode or depend on the step size, or when choosing a solver."
metadata:
  id: SCI-04
  stars: "3"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Numerical methods

**Core rule:** use a tested library solver, and check every numerical result against a known case and a step-size or tolerance change.

## Procedure

1. Classify the problem with the table and pick a library method (look up its options in `simulation-official-docs` or `python-official-docs`).
   - Check: the method suits the problem's type (stiff or not, smooth or not).
2. Set tolerances or step size explicitly.
   - Check: values are written in code, not left to defaults you did not read.
3. Validate on a case with a known answer (analytic solution, conserved quantity).
   - Check: error within the tolerance.
4. Check convergence: halve the step or tighten the tolerance; the result must change less than the needed precision.
   - Check: the difference is reported.

| Problem | Typical method |
| --- | --- |
| Non-stiff ODE | explicit Runge-Kutta with adaptive step (RK45, Dormand-Prince) |
| Stiff ODE (fast and slow dynamics) | implicit method (BDF, Radau, LSODA) |
| Root of a function in an interval | bracketing (Brent) |
| Linear system | factorisation solve, never an explicit inverse |
| Definite integral | adaptive quadrature |
| Fixed-step real-time simulation | a fixed-step method with a step proven stable for the fastest dynamics |

## Stop and ask the human if

- The model is stiff or chaotic and the required accuracy is not specified.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Smaller step is always better." | Round-off grows and cost explodes; find where results converge. |
| "Explicit Euler is fine." | It is unstable on stiff problems at reasonable steps. |

## Definition of done

- [ ] Library method chosen for the problem type; tolerances explicit; validated on a known case; convergence checked.
