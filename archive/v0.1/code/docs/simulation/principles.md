---
id: simulation-principles
title: Simulation principles
topic: simulation
summary: Simulation kinds, simulated time, fixed step, stability, determinism, fidelity and V&V for a training simulator.
tool: none
version: "n/a"
checked: 2026-11-12
sources: [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Simulation principles

Contents: 1. Simulation kinds · 2. Simulated time · 3. Fixed step · 4. Integration and stability · 5. Determinism · 6. Fidelity · 7. Verification, validation, accreditation · 8. Pitfalls · Sources

## 1. Simulation kinds (discrete-event, continuous, hybrid)

A model describes a system. A simulation imitates the behavior of that system. [S14]

Three kinds of simulation exist.

- Discrete-event simulation: the state changes only at separate points of simulated time. Each change is an event. The clock jumps from one event to the next earliest event. Future events wait in a list sorted by time. [S1]
- Continuous simulation: the state changes all the time. A solver computes the continuous states by numerical integration, one step after the other. [S2]
- Hybrid simulation: both kinds in one program. A scheduler calls the continuous models at a fixed period and runs events between the steps. [S3] [S5]

A training simulator mixes both kinds. Physical processes are simulated continuously, in real time. Malfunctions and instructor commands occur at chosen times or on events. [S10]

Use these terms in code and comments. Use one term for one idea.

| Term | Meaning |
| --- | --- |
| model | The description of a system. [S14] |
| simulation | The imitation of the behavior of a system. [S14] |
| event | A happening that changes the state at one point of simulated time. [S1] |
| step | One advance of simulated time by the step size of the solver. [S2] |
| frame | One cycle of the scheduler. The scheduler compares simulated time with the wall clock at the end of each frame. [S4] |

## 2. Simulated time and wall-clock time (simulation time)

Simulated time is the time inside the simulation. Wall-clock time is the time of the host computer. They are two different clocks. [S3] [S5]

- The scheduler owns simulated time. Models receive it from the scheduler. [S3]
- Count simulated time as an integer number of ticks. A floating-point number of seconds has roundoff error at large values. [S3]
- Real time: at the end of each frame, the scheduler waits until the wall clock reaches simulated time. [S4]
- Underrun: the frame ends early and the scheduler waits. This is the normal case. [S4]
- Overrun: the frame takes longer than its period. The simulation runs slower than real time. The scheduler starts the next frame at once to catch up. [S4]
- Faster than real time: without the wait, the simulation runs as fast as the computer allows. [S4]
- Slow time and fast time: a training simulator can also run at a fraction or a multiple of real time. [S10]
- Freeze: simulated time stops. The program keeps running. Only work tied to the wall clock goes on. [S3] [S5]
- Save and restore: a saved state keeps simulated time. It does not keep wall-clock time. [S5]

Rule: a model never reads the wall clock. It uses only the simulated time and the step that the scheduler gives.

## 3. Fixed step and variable step (simulation time step)

A fixed-step solver uses the same step size from the start to the end of the run. A variable-step solver changes the step size during the run: smaller at an event or when the state changes fast, larger when the state changes slowly. [S2]

A real-time simulator uses a fixed step.

- Methods that change the time step do not suit real-time execution. [S11]
- Generated code that is deployed can use only a fixed-step solver. [S2]
- A fixed step gives the same result on every run. A step that varies does not. [S6]

A smaller step gives more accurate results and costs more computing time. [S2]

Wrong:

```csharp
// The step comes from the wall clock: it changes on every call.
double now = stopwatch.Elapsed.TotalSeconds;
model.Step(now - previous);
previous = now;
```

Right:

```csharp
// Fixed step. Simulated time is an integer count of ticks (1 tick = 1 microsecond).
const long StepTicks = 10_000;                      // 10 ms
const double StepSeconds = StepTicks / 1_000_000.0;

long simTicks = 0;
while (running)
{
    model.Step(StepSeconds);                 // always the same step
    simTicks += StepTicks;                   // integer time: no roundoff
    if (realTime)
    {
        realTimeClock.WaitUntil(simTicks);   // wait for the wall clock; skip to run faster
    }
}
```

The display rate can differ from the step rate. The display then interpolates between the last two states. [S6]

## 4. Integration and stability (simulation numerical integration)

A continuous model gives the derivatives of its states. An integrator computes the next states from them. Keep the two apart: one function for derivatives, one for integration. [S15]

- Common fixed-step integrators: Euler (1 derivative evaluation per step), Runge-Kutta 2 (2 evaluations), Runge-Kutta 4 (4 evaluations). More evaluations cost more time per step. [S15]
- Stability: with an explicit integrator, a step that is too large makes the computed values grow without bound. [S8]
- Stiff model: a model with a very fast part and a slow part. An explicit integrator then needs a very small step for the whole run. An implicit integrator stays stable with larger steps, but it solves an equation at each step. [S8]

Check the step size this way: [S9]

1. Run the simulation.
2. Run it again with a smaller step or a tighter tolerance.
3. Compare the two results.
4. If they do not differ significantly, the solution has converged. Keep the larger step.

Keep a step that passes this check and that the computer runs within its frame. [S4] [S9]

## 5. Determinism and reproducibility (simulation determinism)

A deterministic simulation gives the same outputs from the same initial state and the same inputs. Replay of recorded inputs then gives exactly the same result. [S7]

Follow these rules.

1. Use a fixed step. [S6]
2. Call the models in the same order on every step. [S4]
3. Never use wall-clock time in a model. Wall-clock time is not part of the saved state. [S3] [S5]
4. Never let the number of solver iterations depend on the speed of the processor. [S7]
5. Use stable numerical methods. An unstable method amplifies small differences. [S7]

Wrong:

```csharp
// Wall-clock time inside a model: different on every run, lost at restore.
pump.StartedAt = DateTime.UtcNow;
```

Right:

```csharp
// Simulated time only, given by the scheduler.
pump.StartedAtTicks = simTicks;
```

Limit: the same program on the same machine is reproducible. Another compiler, another processor architecture, or a debug build instead of a release build can change floating-point results. Do not expect bit-identical results across machines. [S7]

## 6. Fidelity and simulator classes (simulation fidelity)

Fidelity covers how specific to the real unit the simulator is, and how deep and accurate its models are. The training objectives set the level of fidelity that is needed. Higher fidelity costs more. [S10]

Simulators are named by their scope.

| Type | Scope |
| --- | --- |
| Full-scope simulator | Replica consoles and panels, and detailed models of the systems the operator works with. [S11] |
| Part-task simulator | One part of the operations or one phenomenon, often modeled more accurately. [S10] |
| Basic principle simulator | The fundamental physical processes. Auxiliary systems may be left out. [S10] |
| Plant analyser | Detailed study of complex transients. It need not run in real time. [S10] |

Maritime training simulators have classes: A (full mission), B (multi-task), C (limited task), S (special tasks). The standard is DNV-ST-0033. [S17]

Simulations are also named by who and what is real. [S16]

| Kind | People | Systems |
| --- | --- | --- |
| Live | Real | Real |
| Virtual | Real | Simulated |
| Constructive | Simulated | Simulated |

A training simulator with a real operator is a virtual simulation. [S16]

## 7. Verification, validation and accreditation (simulation VV&A)

- Verification: the program implements the model correctly. [S12] [S14]
- Validation: the results are accurate enough for the intended use. [S12] [S14]
- Accreditation: an official decision that the model is acceptable for a specific use. [S13]
- Credibility: the trust that users can put in the results. [S14]

State the accuracy that is required before you test. [S12]

These validation techniques work well as automated tests. [S13]

| Technique | What it checks |
| --- | --- |
| Comparison to other models | The results match a valid analytic model or a valid simulation model. |
| Degenerate test | The model behaves logically when a parameter takes an extreme value. |
| Extreme condition test | The outputs stay plausible for an unlikely combination of inputs. |
| Sensitivity analysis | The outputs respond to a change of input as the real system would. |
| Trace | One entity is followed through the model to check the logic. |

A training simulator is accepted by tests against reference data of the real plant. Each test has acceptance criteria, initial conditions and expected operator actions. The tests run in stages: before the factory test, at the factory, then on site. [S11]

## 8. Pitfalls (simulation principles)

- A job period that is not a whole number of ticks: the period is rounded and the job drifts. Example: a 128 Hz job with ticks of 1 microsecond has a period of 7812.5 ticks. Choose a tick that divides every period: with 10,000,000 ticks per second, the period is exactly 78,125 ticks. [S3]
- A frame overrun: the simulation falls behind real time. Set a limit on overruns and stop cleanly when it is passed. [S4]
- A loop that falls behind and runs more steps to catch up becomes slower again. Cap the number of steps per frame and accept a slower simulation. [S6]
- A step driven by the wall clock: results change from run to run, and a large step can make a model blow up. [S6]
- A stiff model with an explicit integrator: the values blow up, or the step must be very small. [S8]
- A method that changes the time step in a real-time loop: it does not suit real-time execution. [S11]
- Wall-clock time stored in the state: it is lost at restore. [S5]
- Bit-identical results expected across machines or builds: floating-point results can differ. [S7]

## Sources

- [S1] T. J. Schriber and D. T. Brunner, "Inside Discrete-Event Simulation Software: How It Works and Why It Matters", Proceedings of the 2004 Winter Simulation Conference, <https://www.informs-sim.org/wsc04papers/017.pdf>, read 2026-11-12, license unknown, summarized.
- [S2] MathWorks, "Choose a Solver", Simulink documentation R2026b, <https://www.mathworks.com/help/simulink/ug/choose-a-solver.html>, read 2026-11-12, all rights reserved, summarized.
- [S3] NASA, "Executive Scheduler", Trick documentation, <https://nasa.github.io/trick/documentation/simulation_capabilities/Executive-Scheduler>, read 2026-11-12, license unknown (software under NASA Open Source Agreement 1.3), summarized.
- [S4] NASA, "Realtime", Trick documentation, <https://nasa.github.io/trick/documentation/simulation_capabilities/Realtime>, read 2026-11-12, license unknown (software under NASA Open Source Agreement 1.3), summarized.
- [S5] ECSS, "Space engineering - Simulation modelling platform", ECSS-E-ST-40-07C Rev.1, 5 August 2025, <https://ecss.nl/wp-content/uploads/2025/08/ECSS-E-ST-40-07C-Rev.1(5August2025).pdf>, read 2026-11-12 (first part only), copyright European Space Agency for the members of ECSS, summarized.
- [S6] G. Fiedler, "Fix Your Timestep!", Gaffer On Games, 10 June 2004, <https://gafferongames.com/post/fix_your_timestep/>, read 2026-11-12, copyright Glenn Fiedler, summarized.
- [S7] G. Fiedler, "Floating Point Determinism", Gaffer On Games, 24 February 2010, <https://gafferongames.com/post/floating_point_determinism>, read 2026-11-12, copyright Glenn Fiedler, summarized.
- [S8] Wikipedia, "Stiff equation", <https://en.wikipedia.org/wiki/Stiff_equation>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S9] MathWorks, "Check and Improve Simulation Accuracy", Simulink documentation, <https://au.mathworks.com/help/simulink/ug/improving-simulation-accuracy.html>, read 2026-11-12, all rights reserved, summarized.
- [S10] IAEA, "Selection, specification, design and use of various nuclear power plant training simulators", IAEA-TECDOC-995, 1998, <https://www-pub.iaea.org/MTCD/publications/PDF/te_995_prn.pdf>, read 2026-11-12, copyright IAEA, summarized.
- [S11] IAEA, "Guidelines for upgrade and modernization of nuclear power plant training simulators", IAEA-TECDOC-1500, 2006, <https://www-pub.iaea.org/MTCD/Publications/PDF/te_1500_web.pdf>, read 2026-11-12 (first part only), copyright IAEA, summarized.
- [S12] R. G. Sargent, "An Introductory Tutorial on Verification and Validation of Simulation Models", Proceedings of the 2015 Winter Simulation Conference, <https://www.informs-sim.org/wsc15papers/182.pdf>, read 2026-11-12, license unknown, summarized.
- [S13] R. G. Sargent, "Verification and Validation of Simulation Models", Proceedings of the 2005 Winter Simulation Conference, <https://www.informs-sim.org/wsc05papers/014.pdf>, read 2026-11-12, license unknown, summarized.
- [S14] NASA, "Standard for Models and Simulations", NASA-STD-7009B, 5 March 2024, <https://standards.nasa.gov/sites/default/files/standards/NASA/B/1/NASA-STD-7009B-Final-3-5-2024.pdf>, read 2026-11-12 (first part only), license unknown, summarized.
- [S15] NASA, "Integrator", Trick documentation, <https://nasa.github.io/trick/documentation/simulation_capabilities/Integrator>, read 2026-11-12, license unknown (software under NASA Open Source Agreement 1.3), summarized.
- [S16] Wikipedia, "Live, virtual, and constructive" (reports the definitions of the DoD Modeling and Simulation Glossary, DoD 5000.59-M, 1998), <https://en.wikipedia.org/wiki/Live,_virtual,_and_constructive>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S17] MarineLink, "BMT's REMBRANDT Receives Full Mission DNV GL Certification", 15 October 2018, <https://www.marinelink.com/news/bmts-rembrandt-receives-full-mission-dnv-442613>, read 2026-11-12, all rights reserved, summarized. The standard DNV-ST-0033 itself was not read.
