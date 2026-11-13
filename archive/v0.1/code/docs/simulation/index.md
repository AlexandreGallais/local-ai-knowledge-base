# simulation index

One line per document. Open only the documents your task needs.

- [Simulation principles](docs/simulation/principles.md): Simulation kinds, simulated time, fixed step, stability, determinism, fidelity and V&V for a training simulator.
- [Simulation time and the scheduler loop](docs/simulation/time-management.md): Scheduler loop in C#, with ticks, frames, rates, real-time wait, overrun, freeze, slow and fast time.
- [Training simulator architecture](docs/simulation/simulator-architecture.md): Parts of a simulator, with executive, models, shared data, instructor station, recorder, gateways and life cycle.
- [Training functions of a simulator](docs/simulation/training-functions.md): Freeze, snapshot, restore, backtrack, replay, scenarios and malfunctions, their behavior and what the models must provide.
- [Stimulation, emulation and hardware in the loop](docs/simulation/real-equipment.md): Stimulation, emulation, simulation and hardware in the loop, with definitions, constraints and how to choose.
- [Component model interface](docs/simulation/component-models.md): Model interface with parameters, inputs, outputs, state, step, save, restore and faults, with a C# template.
- [Testing a simulation model](docs/simulation/model-testing.md): Model tests with analytic cases, step convergence, extremes, determinism, save and restore, and reference runs with tolerances.
- [HLA, DIS and DDS](docs/simulation/distributed-simulation.md): HLA (IEEE 1516-2025), DIS (IEEE 1278.1-2012) and DDS 1.4, their terms, services and when to use each.
- [FMI, SSP and co-simulation](docs/simulation/co-simulation-fmi-ssp.md): FMI 3.0 and SSP 2.0.1, with FMU content, interface types, variables, co-simulation step and pitfalls.
- [Real-time simulation in containers and Kubernetes](docs/simulation/realtime-deployment.md): Real-time simulation in containers and Kubernetes, isolating the stepped core, reserving CPUs, and the multicast limits.
- [Simulation data to a web interface](docs/simulation/web-data-streaming.md): Simulation data to a web interface, with subscribe and request, reduced rate, full state then changes, and commands.
- [French to English simulation vocabulary](docs/simulation/vocabulary-fr-en.md): The English term of each French simulation term, with the document that explains it.
