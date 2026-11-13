---
id: architecture-angular-app-structure
title: Angular application structure
topic: architecture
summary: Folders by feature, standalone components, state by scope with signals, server data and module boundaries. Angular 22.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Angular application structure

Contents: 1. Organization · 2. State by scope · 3. Boundaries · Sources

## 1. Organization and code (Angular style guide, v22)

- Group by feature domain, never by type (`components/`, `services/`); one concept per file; tests next to the code. [S1] [S2]
- `inject()` rather than constructor injection. [S1] [S2]
- Components focused on presentation; complex logic out of the template, often in a `computed`. [S1]
- Template members `protected`; inputs, outputs and queries `readonly`. [S1]
- `class` and `style` bindings rather than `NgClass` and `NgStyle`. [S1] [S2]
- Standalone components without writing `standalone: true`; no explicit change detection strategy; lazy-loaded feature routes; `input()`, `output()`, `model()`; `@if`, `@for`, `@switch`. [S2]

## 2. State by scope (Angular signals)

| Scope | Tool |
| --- | --- |
| Local state of a component | `signal`, `computed`; `linkedSignal` for a dependent state [S2] [S3] |
| Shared state of a feature | A service that exposes signals, no library [S7] |
| Large application, large team | NgRx SignalStore (`signalStore`, `withState`, `withMethods`), MIT, version 22 [S5] [S7] |
| Server reads | `httpResource`, a reactive wrapper of `HttpClient`, for reads only; writes through `HttpClient` [S4] |
| Effects | Only for non-reactive APIs; to react to a state change, derive it [S3] |

A global Redux-like store is no longer the starting point; RxJS stays the tool for event streams, read in templates through the `async` pipe. [S7] [S2]

## 3. Boundaries (monorepo)

- Nx checks boundaries by a lint rule: each project carries tags (`scope:…`) and constraints say who may depend on whom; a project without a tag may depend on nothing. [S6]
- Useful when several applications share libraries; useless for one application. Single source, vendor of the tool.

## Sources

- [S1] Angular, "Angular coding style guide", v22.2.6, <https://angular.dev/style-guide>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Angular, "Best practices", context file for AI, <https://angular.dev/assets/context/best-practices.md>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Angular, "Signals overview", <https://angular.dev/guide/signals>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Angular, "Reactive data fetching with httpResource", <https://angular.dev/guide/http/http-resource>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] NgRx, "SignalStore", v22, <https://ngrx.io/guide/signals/signal-store>, read 2026-11-12, MIT, summarized.
- [S6] Nx, "Enforce module boundaries", <https://nx.dev/features/enforce-module-boundaries>, read 2026-11-12, summarized.
- [S7] Mike Hartington, Nx, "Angular State Management for 2025", 2024-12-16, note of 2026-07-08, <https://nx.dev/blog/angular-state-management-2025>, read 2026-11-12, summarized.
