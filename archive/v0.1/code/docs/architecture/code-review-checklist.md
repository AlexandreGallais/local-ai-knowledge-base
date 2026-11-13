---
id: architecture-code-review-checklist
title: Code review checklist
topic: architecture
summary: What a reviewer checks that the lint does not, for every change, for C# and .NET, for TypeScript and Angular.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2]
license: MIT (written for this base)
variant: files
---

# Code review checklist

Contents: A. Every change · B. C# and .NET · C. TypeScript and Angular · Sources

What the lint and the build check is not reviewed again: run the check commands of `AGENTS.md` first. A personal preference is marked as optional and never blocks. [S1]

## A. Every change (code review)

- Design: does the change belong here, and does it fit the rest of the system?
- Function: does it do what the author meant, also on edge cases and on errors?
- Complexity: can a reader understand it quickly? Is any code made general for a supposed future need?
- Tests: are there tests that would fail if the code were broken?
- Names: does every name say what it holds or does?
- Comments: do comments say why, not what?
- Consistency: does it follow the conventions of the project and of this base?
- Documentation: are the README, the API contract or the base updated when behavior changes?
- Every line: did you read every line you are asked to review, and the context around it?
- Good things: say what is well done. [S1]

## B. C# and .NET (code review)

- No singleton keeps a scoped service (captive dependency). [S2]
- Options are bound, validated and checked at start; no `IOptionsSnapshot<T>` in a singleton. [S2]
- One resilience handler per HTTP client; no retry of a POST without disabling unsafe methods. [S2]
- Log calls use message templates with named fields, never string interpolation. [S2]
- One short `DbContext` per unit of work; never two operations at once on one context; every async call awaited. [S2]
- No library of `docs/dotnet/paid-packages.md` added without the user's agreement.
- No pattern of `docs/architecture/outdated-libraries-and-patterns.md` for the target framework.

## C. TypeScript and Angular (code review)

- Every value shown comes from a signal; no object changed in place under OnPush. [S2]
- No effect used to copy a state into another: derive it with `computed`. [S2]
- Server reads through `httpResource` or a service; writes through `HttpClient`. [S2]
- No subscription left open after the component ends.
- Folders by feature; no new NgModule; no old template syntax.
- Symbols of a synoptic follow `docs/synoptics/`; property names follow the naming document.

## Sources

- [S1] Google, "What to look for in a code review", Google Engineering Practices, <https://google.github.io/eng-practices/review/reviewer/looking-for.html>, read 2026-11-12, summarized.
- [S2] The documents of this topic (`dotnet-service-patterns.md`, `angular-app-structure.md`, `angular-high-frequency-ui.md`) and their sources, 2026-11-13.
