# Local AI knowledge base

A shared base of documents, rules, agents and skills that an AI coding assistant reads to work
better on a project. Copy it into a project, open the project with OpenCode, and the assistant
follows it without any other instruction. The same content is also loaded into Open WebUI.

Status: draft. This file lists every topic the base will cover, in the order they will be built.
Nothing is researched or written yet.

## Principles

- Every instruction for the AI is written in English, in short imperative sentences.
- The AI reads a short index first, then only the files of its topic, never the whole folder.
- Every document is self-contained: it holds what the AI needs to know. Links only cite sources.
- Every document built from research cites its sources.
- Two targets, two variants of each skill and document:
  - OpenCode: the AI reads and writes the project's files and runs commands.
  - Open WebUI: the AI only answers in the chat; it never claims to write a file.
- French summaries: in the OpenCode base, each topic has a short summary in French for the people of
  the team. They are not loaded into Open WebUI.

## Order of work

1. Research first, before any topic:
   - How to research a topic and write a document of the base.
   - How to write instructions, skills and agents that a smaller model follows well.
2. Then the topics below, priority 1 first.

## Priority 1

### 1. How the AI uses the base

- Entry file read by OpenCode when it opens the project root (`AGENTS.md`).
- Short index: one line per document, with its topic.
- Reading rules: open the index, then only the files of the topic; never load the whole base.
- Writing style of every rule, agent and skill: English, short, imperative.

### 2. Skills

- Authoring skills:
  - Write an `AGENTS.md` file.
  - Write a skill.
  - Write an agent.
  - Write a document of the base, its index line and its French summary.
  - Write an Open WebUI custom model.
- Git skills:
  - Write a commit message: Conventional Commits, checked by commitlint.
  - Choose a version number: Semantic Versioning.
  - Name a branch: Conventional Branch.
- Topic skills: the skills that support each topic below.

### 3. Writing code: TypeScript and Angular

- Lint rules (ESLint) written as readable rules, each with a wrong and a right example.
- Ready-to-use lint configuration files.
- Strict formatting rules, stricter than Prettier, switched on or off by one setting.
- Reference documentation of TypeScript, Angular and their common APIs.
- Lint loop: after writing code, the AI runs the lint in the dev container and fixes it until zero
  errors.
- Always TypeScript, never plain JavaScript.

### 4. Writing code: C# and .NET

- Analyzer rules (.NET analyzers) written as readable rules, each with a wrong and a right example.
- Ready-to-use configuration files (`.editorconfig`, analyzer settings).
- Strict formatting rules, switched on or off by one setting.
- Reference documentation of C#, .NET and their common APIs.
- Lint loop in the dev container, until zero errors.

### 5. Containers and deployment

- Docker and Podman.
- Dev containers.
- Kubernetes.
- Deploying containers.

### 6. Synoptics and symbols

- Rules to represent symbols on a synoptic (layout, states, colours, animation).
- Standards the symbols come from (ISO 1219, IEC 60617, ISA 5.1, ISO 7010).
- Symbol catalogue, each symbol with proposed property names in English:
  - Hydraulics.
  - Pneumatics and compressed air.
  - Electrical.
  - Fire safety (detectors, alarms, extinguishing).
  - Fuel, oil and sea water systems.
  - Ventilation and air conditioning.
  - Propulsion and power generation.
  - Sensors and instrumentation (pressure, temperature, level, flow).
- French to English index of symbol and equipment names, for example "vanne → valve".
- Physical equipment (valves, sensors, actuators, pumps…): how it really works, then how it is
  modelled.

### 7. Open WebUI

- Skills shared with the whole team, imported without manual edits.
- Knowledge bases shared with the whole team, imported without manual edits.
- Four custom models, one per subject, each with only the skills and knowledge bases of its
  subject:
  - TypeScript and Angular code.
  - C# and .NET code.
  - Containers and Kubernetes.
  - Simulation and naval (synoptics, symbols, vocabulary).

## Priority 2

### 8. Agents

- .NET and Angular architecture.
- Code review.
- Physical equipment: real operation first, then its model.
- Agent mode may not be available everywhere: each agent also exists as a skill, so its content
  works without it.

## Priority 3

### 9. Software architecture

- Microservices and APIs.
- .NET backend patterns.
- Angular frontend patterns.
- Contracts between a .NET API and an Angular client (REST, OpenAPI, real-time messages).

### 10. Simulation

- Principles of simulation.
- Architecture of a simulation software.
- Time management: fixed step, variable step, real time.
- Component models: physical equations, states, inputs and outputs.
- Distributed simulation and co-simulation standards (HLA, DIS, FMI).

### 11. Reading code: C, C++, Java and Rust

- One reading guide per language, so that the AI can explain a code excerpt it is given.
- Build files met when reading these projects: CMake, Make, Maven, Gradle, Cargo.

## Delivery and evaluation

### 12. Export and import

- One command builds the export: few text files, 500 KB each at most by default, the limit changed
  by one setting.
- Import script: one TypeScript file, run with `node import.ts` on Linux with Node 22.18 or later,
  with no build step and no npm package.
- The import, run on the export in an empty folder, rebuilds the same tree as the base.

### 13. Evaluation

- A set of test tasks, run with and without the base.
- The AI must do better with the base, without using more tokens.
