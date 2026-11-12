# Local AI knowledge base

A shared base of documents, rules, agents and skills that an AI coding assistant reads to work
better on a project. Copy it into a project, open the project with OpenCode, and the assistant
follows it without any other instruction. The same content is also loaded into Open WebUI.

Status: draft. This file lists every topic the base will cover. Nothing is researched or written
yet: the list is validated first, then each topic is built on its own.

## Principles

- Every instruction for the AI is written in English, in short imperative sentences.
- The AI reads a short index first, then only the files of its topic, never the whole folder.
- Every document is self-contained: it holds what the AI needs to know. Links only cite sources.
- Every document built from research cites its sources.

## Topics

Items marked _(proposed)_ are additions to discuss; the others are already decided.

### 1. How the AI uses the base

- Entry file read by OpenCode when it opens the project root.
- Short index: one line per document, with its topic.
- Reading rules: open the index, then only the files of the topic; never load the whole base.
- Writing style of every rule, agent and skill: English, short, imperative.

### 2. Writing code: TypeScript and Angular

- Lint rules (ESLint) written as readable rules, each with a wrong and a right example.
- Ready-to-use lint configuration files.
- Strict formatting rules, stricter than Prettier, switched on or off by one setting.
- Reference documentation of TypeScript, Angular and their common APIs.
- Lint loop: after writing code, the AI runs the lint in the dev container and fixes it until zero
  errors.
- Always TypeScript, never plain JavaScript.

### 3. Writing code: C# and .NET

- Analyzer rules (.NET analyzers) written as readable rules, each with a wrong and a right example.
- Ready-to-use configuration files (`.editorconfig`, analyzer settings).
- Strict formatting rules, switched on or off by one setting.
- Reference documentation of C#, .NET and their common APIs.
- Lint loop in the dev container, until zero errors.

### 4. Reading code: C, C++, Java and Rust

- One reading guide per language, so that the AI can explain a code excerpt it is given.
- _(proposed)_ Build files met when reading these projects: CMake, Make, Maven, Gradle, Cargo.

### 5. Software architecture

- Microservices and APIs.
- .NET backend patterns.
- Angular frontend patterns.
- _(proposed)_ Contracts between a .NET API and an Angular client (REST, OpenAPI, real-time
  messages).

### 6. Containers and deployment

- Docker and Podman.
- Dev containers.
- Kubernetes.
- Deploying containers.

### 7. Simulation

- Principles of simulation.
- Architecture of a simulation software.
- _(proposed)_ Time management: fixed step, variable step, real time.
- _(proposed)_ Component models: physical equations, states, inputs and outputs.
- _(proposed)_ Distributed simulation and co-simulation standards (HLA, DIS, FMI).

### 8. Synoptics and symbols

- Rules to represent symbols on a synoptic (layout, states, colours, animation).
- Symbol catalogue, each symbol with proposed property names in English:
  - Hydraulics.
  - Electrical.
  - Fire safety (detectors, alarms, extinguishing).
  - _(proposed)_ Pneumatics and compressed air.
  - _(proposed)_ Fuel, oil and sea water systems.
  - _(proposed)_ Ventilation and air conditioning.
  - _(proposed)_ Propulsion and power generation.
  - _(proposed)_ Sensors and instrumentation (pressure, temperature, level, flow).
- _(proposed)_ Standards the symbols come from (ISO 1219, IEC 60617, ISA 5.1, ISO 7010).

### 9. Naval vocabulary

- Technical terms, each given in English with its French translation in brackets, for example
  "valve (vanne)".
- Physical equipment met in simulation (valves, sensors, actuators, pumps…): how it really works,
  then how it is modelled.

### 10. Agents

- .NET and Angular architecture.
- Code review.
- Physical equipment: real operation first, then its model.

### 11. Skills

- Skills that support the agents and the topics above, written for OpenCode and for Open WebUI.

### 12. Open WebUI

- Skills shared with the whole team, imported without manual edits.
- Knowledge bases shared with the whole team, imported without manual edits.
- Four custom models, one per subject, each with only the skills and knowledge bases of its
  subject:
  - TypeScript and Angular code.
  - C# and .NET code.
  - Containers and Kubernetes.
  - Simulation and naval (synoptics, symbols, vocabulary).

### 13. Export and import

- One command builds the export: few text files, 500 KB each at most by default, the limit changed
  by one setting.
- Import script: one TypeScript file, run with `node import.ts` on Linux with Node 22.18 or later,
  with no build step and no npm package.
- The import, run on the export in an empty folder, rebuilds the same tree as the base.

### 14. Evaluation

- A set of test tasks, run with and without the base.
- The AI must do better with the base, without using more tokens.
