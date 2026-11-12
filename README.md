# Local AI knowledge base

A shared base of documents, rules, agents and skills that a local AI reads to work better. It has
two profiles, each independent of any software:

- Code: for any AI coding assistant that reads and writes files and runs commands. OpenCode is
  today's target.
- Chat: for any web chat without file access. The AI only answers and explains. Open WebUI is
  today's target.

Status: draft. This file lists every topic the base will cover, in the order they will be built.
Nothing is researched or written yet.

## Layout

```text
code/                        Code profile, the single source
  AGENTS.md                  Entry file: short rules, check commands, skill triggers, index
  .agents/skills/<name>/     One skill per folder
    SKILL.md                 The skill; action steps marked for the chat variant
    chat.md                  Optional: chat text that replaces a marked block
  docs/                      Reference documents
    README.fr.md             For people: the structure and contents of the whole base, in French
    <topic>/
      README.fr.md           For people: what the topic holds, each file in one line, in French
      <document>.md          One document, one question
  templates/<language>/      Code templates to copy and adapt
chat/                        Chat profile
  models/<subject>.md        System prompt of each custom chat model (4 subjects)
adapters/                    Optional files that one software needs
  opencode/                  For example `opencode.json`: agents, read permissions
  open-webui/                Generated at export: import files
scripts/                     Export and import
```

- Only `code/` is written by hand, plus the chat system prompts in `chat/models/`. The export
  generates the rest of the chat profile from `code/`:
  - `chat/skills/`: each skill without its marked action steps, with a fixed "Limits" block.
  - `chat/knowledge/<subject>/`: the documents of each subject, without the French summaries.
- In a project, the contents of `code/` go to the project root, so that the assistant reads
  `AGENTS.md` when it opens the project.
- `adapters/` is optional: the base works without it. Changing software means changing or deleting
  one adapter, never the content.

## Principles

- Every instruction for the AI is written in English, in short imperative sentences, the vital
  rules first and repeated at the end.
- Little is always loaded: a short `AGENTS.md` with a compact index, and the list of skills.
  Documents and skill bodies are read on demand; the AI never reads the whole folder.
- Every choice left to the model gets an explicit trigger: `AGENTS.md` says which skill to load for
  which task.
- What a tool can check (format, lint, types, tests, commit messages) is checked by the tool: the
  base gives the exact command and the loop write, check, fix.
- Every document is self-contained: it holds what the AI needs to know. Links only cite sources.
- Every document built from research cites its sources.
- One source, two variants:
  - Files variant (code profile): the AI writes files and runs commands.
  - Chat variant (chat profile): the AI shows the code and the command to run; it never claims to
    write a file or run a command.
- An agent is a skill. Agent mode, where a software offers it, only adds a short entry in that
  software's adapter.
- Language of the answer: the AI answers in the language of the question, never a mix of two. The
  base itself is in English; the AI reads it in English whatever the language of the question.
- French summaries are for people only: one overview of the whole base and one summary per topic,
  so that the team understands the structure and what each file holds. The AI never reads them
  (`AGENTS.md` says so), and the export leaves them out of the chat profile.

## Order of work

1. Research first, before any topic:
   - How to research a topic and write a document of the base.
   - How to write and organize a knowledge base that a smaller model follows well: instructions,
     skills, agents, documents, loading, checks by tools, evaluation.
   - How to bring the official documentation of each tool into the base, at the version the project
     uses.
2. Then the topics below, priority 1 first.

The first two researches are done; the third is next.

## Priority 1

### 1. How the AI uses the base

- Entry file `AGENTS.md`, read when the assistant opens the project root.
- Compact index in `AGENTS.md`: one line per document, with its topic. When it grows past about
  2,000 tokens, it becomes a map of topics with one index per topic.
- Reading rules: open only the documents of the topic; never load the whole base.
- Writing style of every rule, agent and skill: English, short, imperative.

### 2. Skills

- Authoring skills:
  - Write an `AGENTS.md` file.
  - Write a skill.
  - Write an agent.
  - Write a document of the base and its index line, and update the French summary of its topic.
  - Write the system prompt of a custom chat model.
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
  errors. In the chat profile, the AI gives the command to run instead.
- Always TypeScript, never plain JavaScript.

### 4. Writing code: C# and .NET

- Analyzer rules (.NET analyzers) written as readable rules, each with a wrong and a right example.
- Ready-to-use configuration files (`.editorconfig`, analyzer settings).
- Strict formatting rules, switched on or off by one setting.
- Reference documentation of C#, .NET and their common APIs.
- Lint loop in the dev container, until zero errors. In the chat profile, the AI gives the command.

### 5. Containers and deployment

- Docker and Podman.
- Dev containers.
- Kubernetes.
- Deploying containers.

### 6. Synoptics and symbols

- Rules to represent symbols on a synoptic (layout, states, colours, animation).
- Standards the symbols come from (ISO 1219, IEC 60617, ISA 5.1, ISO 7010), cited by reference,
  never copied.
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

### 7. Chat profile

- Skills shared with the whole team, imported without manual edits.
- Knowledge bases shared with the whole team, imported without manual edits.
- Four custom models, one per subject, each with only the skills and knowledge bases of its
  subject:
  - TypeScript and Angular code.
  - C# and .NET code.
  - Containers and Kubernetes.
  - Simulation and naval (synoptics, symbols, vocabulary).
- Each system prompt tells the model to search its knowledge base before it answers.

## Priority 2

### 8. Agents

- .NET and Angular architecture.
- Code review.
- Physical equipment: real operation first, then its model.
- Each agent is a skill first, so that it works where agent mode does not exist.

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
  by one setting. It generates the chat profile and the adapters.
- Import script: one TypeScript file, run with `node import.ts` on Linux with Node 22.18 or later,
  with no build step and no npm package.
- The import, run on the export in an empty folder, rebuilds the same tree as the base.

### 13. Keeping the base up to date

- Projects update their tool versions once or twice a year; the documents follow.
- Each document records its tool, its version and the date it was checked.
- One simple, written procedure updates the documents of one tool to a new version: find what
  changed between the two versions, rewrite only the sections it touches, check again.
- A check lists the documents whose version is behind the version a project uses.
- Angular comes first: it is the tool the team uses most.

### 14. Evaluation

- A set of test tasks, run with and without the base.
- The AI must do better with the base, without using more tokens.

## License

- Everything written for this base, documents and scripts, is under the MIT License: see
  `LICENSE`.
- Text adapted from an official documentation keeps the attribution its own license asks for. Each
  such source is listed in `THIRD_PARTY_NOTICES.md` once the first one is added.
