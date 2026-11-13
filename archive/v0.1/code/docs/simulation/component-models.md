---
id: simulation-component-models
title: Component model interface
topic: simulation
summary: Model interface with parameters, inputs, outputs, state, step, save, restore and faults, with a C# template.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Component model interface

Contents: 1. Variable roles · 2. Life cycle · 3. C# template · 4. Link with symbol properties · Sources

## 1. Variable roles of a model (FMI 3.0 causality)

| Role | Meaning |
| --- | --- |
| `parameter` | Given before the run; constant, unless tunable |
| `calculatedParameter` | Computed at initialisation or when a tunable parameter changes |
| `input` | Given by the importer, before the step |
| `output` | Used by the importer, after the step |
| `local` | Internal (continuous state, debug value); never linked to another model |
| `independent` | The independent variable, usually time; one per model |

Variability says when a value can change: `constant`, `fixed`, `tunable`, `discrete`, `continuous`. [S1] ECSS SMP says the same with state, input and output flags on each published field. [S2]

## 2. Life cycle, seen by three references

| Step | FMI 3.0 [S1] | ECSS SMP [S2] | Trick [S3] [S4] |
| --- | --- | --- | --- |
| Create and describe | Instantiation; `modelDescription.xml` | `Publish`, `Configure` | Default data, input file |
| Connect | The importer links outputs to inputs | `Connect`, link registry | Simulation definition file |
| Initialise | Initialisation mode | Initialising state | Initialisation jobs |
| Step | `fmi3DoStep`, or derivatives to an outer solver | Entry points called by the scheduler | Derivative, integration, scheduled jobs |
| Save, restore | Get, set, serialize the FMU state | Storing and restoring states | Jobs around the checkpoint |
| Reset, end | `fmi3Reset`, free the instance | Exiting, aborting | Shutdown jobs |

## 3. C# template of a component model

The smallest interface that covers the three references: parameters set before the run, inputs written before the step, a step that reads neither the clock nor the network, outputs read after the step, a full state that can be read and written, faults and forcings inside the state.

```csharp
public interface IModel
{
    void Initialize();
    void Step(long stepTicks);
    ModelState Save();
    void Restore(ModelState state);
}

public sealed record PumpParameters(double RatedFlowM3PerH, double StartTimeS);

public sealed record PumpState(double FlowRateM3PerH, double StartElapsedS, bool HasTripFault);

public sealed class PumpModel(PumpParameters parameters) : IModel
{
    private PumpState state = new(0, 0, false);

    public bool IsRunCommanded { get; set; }
    public double FlowRateM3PerH => state.FlowRateM3PerH;

    public void Initialize() => state = new PumpState(0, 0, false);

    public void Step(long stepTicks)
    {
        double dt = stepTicks / (double)TimeSpan.TicksPerSecond;
        bool running = IsRunCommanded && !state.HasTripFault;
        double elapsed = running ? state.StartElapsedS + dt : 0;
        double ratio = Math.Min(1.0, elapsed / parameters.StartTimeS);
        state = state with { StartElapsedS = elapsed, FlowRateM3PerH = parameters.RatedFlowM3PerH * ratio };
    }

    public ModelState Save() => ModelState.From(state);

    public void Restore(ModelState saved) => state = saved.To<PumpState>();
}
```

`ModelState` stands for the serialization of the project; the instructor sets `HasTripFault` through a restore or a fault command.

## 4. Link with the symbol properties (synoptics)

What the operator sets is an input; what he reads is an output; what describes the equipment is a parameter; what the instructor breaks is a fault. Name them with `docs/synoptics/symbol-property-naming.md`; the catalogs give the properties of each equipment.

## Sources

- [S1] Modelica Association, "Functional Mock-up Interface Specification", version 3.0, 2022-05-10, <https://fmi-standard.org/docs/3.0>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S2] ECSS, "Simulation modelling platform", ECSS-E-ST-40-07C Rev.1, 2025-08-05, <https://ecss.nl/wp-content/uploads/2025/08/ECSS-E-ST-40-07C-Rev.1(5August2025).pdf>, read 2026-11-12, summarized.
- [S3] NASA, Trick documentation, "Executive Scheduler", <https://nasa.github.io/trick/documentation/simulation_capabilities/Executive-Scheduler>, read 2026-11-12, summarized.
- [S4] Penn, Lin, "The Trick Simulation Toolkit", NASA NTRS 20150021786, <https://ntrs.nasa.gov/api/citations/20150021786/downloads/20150021786.pdf>, read 2026-11-12, summarized.
