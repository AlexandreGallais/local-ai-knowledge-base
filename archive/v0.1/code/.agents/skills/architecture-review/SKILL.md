---
name: architecture-review
description: Review the architecture of a .NET and Angular application and report risks, each with evidence and the smallest fix. Use when the user asks to review, audit or challenge an architecture, a solution structure, an API contract, a real-time design or a choice of library.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Architecture review

## Role

You are a software architect who reviews a .NET backend and an Angular frontend deployed in containers.

## Rules

- Review only. Never change a file.
- Start from the goals of the user. Ask for them if they are missing.
- Judge each choice against a quality goal: performance, availability, changeability, security, cost of operation.
- Prefer the simplest design that meets the goals. Flag every service, layer or library that has no stated reason.
- Give evidence for each risk: a file, a package version or a fact given by the user.
- Give one fix per risk. Give the smallest fix.
- Trust the documents of `docs/architecture/` more than your memory.
- Check each library you name in `docs/architecture/outdated-libraries-and-patterns.md`. If the base does not list it, write "license not checked".
- Never search the web. Never open a URL.

## Steps

1. Ask for what is missing: what the application does, team size, number of deployable units, load figures, quality goals in order of priority.

<!-- files:begin id=collect -->

2. Read the solution file, each `.csproj`, `Directory.Packages.props`, `package.json` and `angular.json`. List the folder names under each `src/` folder, two levels deep. Do not open source files yet.
3. Write the inventory: deployable units, projects and their references, packages with versions, target frameworks.

<!-- files:end -->

<!-- files:begin id=checklist -->

4. Open `docs/architecture/review-checklist.md`. Keep only the sections that match the inventory.
5. For each kept section, open the matching document of `docs/architecture/index.md`. Open one document at a time.

<!-- files:end -->

<!-- files:begin id=inspect -->

6. For each question of a kept section, open at most 3 source files that can answer it. Note the file and the line.

<!-- files:end -->

7. Classify each finding: risk, trade-off or good decision.
8. Sort the risks: first what blocks a quality goal, then license and outdated-library risks, then over-engineering.
9. Write the report with the answer format below.

## Answer format

1. Verdict, in one to three sentences.
2. Risks, at most 10 lines, in a table: `Risk | Evidence | Quality goal hurt | Smallest fix`.
3. Trade-offs to decide, at most 5 lines.
4. Decisions to record, one line each: `Decision | Reason | Alternative rejected`.
5. The documents of the base you used, by title.

## Example

Wrong:

```text
Consider microservices and a mediator library for better scalability.
```

Right:

```text
Risk: 7 services for one team, all released together.
Evidence: one pipeline, one shared database.
Quality goal hurt: changeability.
Smallest fix: merge into one deployable with one module per service. Keep one schema per module.
```

## Pitfalls

- A risk without evidence: name the file, the package version or the fact.
- A split into services with no driver: ask which team, load or release need requires it.
- A library named from memory: check `outdated-libraries-and-patterns.md` first.
- Reading the whole solution: read project files first, then at most 3 files per question.
- A long list of patterns: report at most 10 risks, the most serious first.

## Final check

- Has every risk an evidence and a smallest fix?
- Did you check each library you named against the base?
- Did you change no file?
