---
id: simulation-time-management
title: Simulation time and the scheduler loop
topic: simulation
summary: Scheduler loop in C#, with ticks, frames, rates, real-time wait, overrun, freeze, slow and fast time.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Simulation time and the scheduler loop

Contents: 1. Rules · 2. Ticks and rates · 3. The loop · 4. Overrun, freeze and time scale · Sources

## 1. Rules of simulation time

- A model advances only by its step. It never reads the clock of the machine. [S2] [S5]
- The step is fixed and comes from the scheduler. [S1] [S3]
- The executive tracks only simulated time; a separate part ties it to the wall clock for real time. [S2]
- Without that tie, the simulation runs as fast as it can. [S3]
- Four times exist: simulation time, epoch time, mission time and the wall clock ("Zulu"); the wall clock is never saved nor restored. [S5]

## 2. Ticks and rates (simulated time in integers)

- Count simulated time as an integer number of ticks, not as floating-point seconds: a double loses precision as the value grows. [S2]
- Every task period must be a whole number of ticks, else it is rounded and drifts: 128 Hz is 7,812.5 ticks of one microsecond, but exactly 78,125 ticks with 10 million ticks per second. [S2]
- Choose the tick so that every rate of the simulator divides it.

## 3. The scheduler loop (fixed step)

Advance only by fixed steps; keep the rest of the elapsed time in an accumulator; cap the steps per frame against the "spiral of death"; interpolate the display between the two last states. [S1]

```csharp
public sealed class Scheduler(IReadOnlyList<IModel> models, long stepTicks, TimeProvider clock)
{
    private long simulatedTicks;
    private long accumulatorTicks;
    private const int MaxStepsPerFrame = 5;

    public long SimulatedTicks => simulatedTicks;
    public bool IsFrozen { get; set; }
    public double TimeScale { get; set; } = 1.0;

    public void RunFrame(TimeSpan elapsed)
    {
        if (IsFrozen)
        {
            return;
        }
        accumulatorTicks += (long)(elapsed.Ticks * TimeScale);
        int steps = 0;
        while (accumulatorTicks >= stepTicks && steps < MaxStepsPerFrame)
        {
            foreach (IModel model in models)
            {
                model.Step(stepTicks);
            }
            simulatedTicks += stepTicks;
            accumulatorTicks -= stepTicks;
            steps++;
        }
    }
}
```

- The models are called in a fixed order at every step; a changing order breaks determinism. [S3]
- `TimeProvider` is the clock of the loop only; models never see it. The tick of this example is the .NET tick (100 ns).

## 4. Overrun, freeze and time scale (scheduler)

- A frame that ends early waits: the normal case. A frame that ends late (overrun) puts the simulation behind real time and the next frame starts at once; past a limit, stop cleanly. [S3]
- Freeze stops simulated time while the program runs: models are not called, the display stays alive. [S2] [S4]
- The instructor station changes the time scale: slow time (about a tenth of real time), fast time, step by step. [S4]
- The .NET garbage collector suspends managed threads during a collection; a sustained low latency mode exists for a long but bounded period. Measure the frame time in the real process. [S6]

## Sources

- [S1] Glenn Fiedler, "Fix Your Timestep!", 2004-06-10, <https://gafferongames.com/post/fix_your_timestep/>, read 2026-11-12, summarized.
- [S2] NASA, Trick documentation, "Executive Scheduler", <https://nasa.github.io/trick/documentation/simulation_capabilities/Executive-Scheduler>, read 2026-11-12, summarized.
- [S3] NASA, Trick documentation, "Realtime", <https://nasa.github.io/trick/documentation/simulation_capabilities/Realtime>, read 2026-11-12, summarized.
- [S4] IAEA, "Selection, specification, design and use of various nuclear power plant training simulators", IAEA-TECDOC-995, 1998, <https://www-pub.iaea.org/MTCD/publications/PDF/te_995_prn.pdf>, read 2026-11-12, summarized.
- [S5] ECSS, "Simulation modelling platform", ECSS-E-ST-40-07C Rev.1, 2025-08-05, <https://ecss.nl/wp-content/uploads/2025/08/ECSS-E-ST-40-07C-Rev.1(5August2025).pdf>, read 2026-11-12, summarized.
- [S6] Microsoft, "Latency modes" (garbage collection), updated 2021-09-15, <https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/latency>, read 2026-11-12, summarized.
