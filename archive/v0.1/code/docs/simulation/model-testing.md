---
id: simulation-model-testing
title: Testing a simulation model
topic: simulation
summary: Model tests with analytic cases, step convergence, extremes, determinism, save and restore, and reference runs with tolerances.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Testing a simulation model

Contents: 1. Tests from the references · 2. Tests of a training simulator · 3. Verification and validation · Sources

This document says what to test in a model. To write and run the tests in C#, read `docs/dotnet-testing/unit-test-rules.md` and `docs/dotnet-testing/run-tests.md`; for the clock, `FakeTimeProvider` in `docs/dotnet-testing/integration-tests.md`.

## 1. Tests from the references (model testing)

| Test | What it checks |
| --- | --- |
| Unit test | One component alone, for example a consistent initialisation [S4] |
| Numerical reference | The result is compared to a kept reference, with absolute and relative tolerances [S4] |
| Order of convergence | The error falls as expected when the step gets finer [S4] |
| Step convergence | Two runs, the second finer: no significant difference [S1] |
| Comparison with another model | The results follow an analytic model or a valid simulation model [S3] |
| Degenerate and extreme conditions | The model stays logical with an extreme value or an unlikely combination [S3] |
| Sensitivity | The outputs answer a change of input as the real system would [S3] |
| Non-regression | Representative runs are played again after each change [S5] |

## 2. Tests of a training simulator (model testing)

Three tests follow from the time rules and the training functions:

- Determinism: the same inputs twice give the same outputs, step by step.
- Save and restore: save, restore, go on; the outputs equal those of a run without a cut.
- Freeze: freeze, wait, run again; the outputs do not change.

```csharp
[Fact]
public void Restore_then_step_gives_the_same_outputs_as_an_unbroken_run()
{
    PumpModel unbroken = NewRunningPump();
    PumpModel restored = NewRunningPump();
    Step(unbroken, 10);
    Step(restored, 5);
    ModelState saved = restored.Save();
    restored.Restore(saved);
    Step(restored, 5);
    Assert.Equal(unbroken.FlowRateM3PerH, restored.FlowRateM3PerH);
}
```

## 3. Verification and validation (V&V of a model)

- Verification: the program implements the model correctly; validation: the model represents the real system accurately enough for its use. [S2]
- Set the required accuracy of the outputs before development; compare with the real system on several sets of conditions; write it down; review it periodically. [S2]
- Acceptance of a training simulator: tests against plant reference data, with acceptance criteria, initial conditions and expected operator actions; integrated, malfunction and beyond-design groups; pre-factory, factory and site steps. [S5]

## Sources

- [S1] MathWorks, "Check and Improve Simulation Accuracy", Simulink documentation, <https://au.mathworks.com/help/simulink/ug/improving-simulation-accuracy.html>, read 2026-11-12, summarized.
- [S2] Sargent, "An Introductory Tutorial on Verification and Validation of Simulation Models", Winter Simulation Conference 2015, <https://www.informs-sim.org/wsc15papers/182.pdf>, read 2026-11-12, summarized.
- [S3] Sargent, "Verification and Validation of Simulation Models", Winter Simulation Conference 2005, <https://www.informs-sim.org/wsc05papers/014.pdf>, read 2026-11-12, summarized.
- [S4] CADET, "CADET-Core testing", developer guide, <https://cadet.github.io/master/developer_guide/testing.html>, read 2026-11-12, summarized.
- [S5] IAEA, "Guidelines for upgrade and modernization of nuclear power plant training simulators", IAEA-TECDOC-1500, 2006, <https://www-pub.iaea.org/MTCD/Publications/PDF/te_1500_web.pdf>, read 2026-11-12, summarized.
