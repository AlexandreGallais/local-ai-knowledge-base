---
id: architecture-outdated-libraries-and-patterns
title: Outdated libraries and patterns
topic: architecture
summary: Libraries that changed license, retired .NET and Angular patterns, and signs of over-engineering, with what to write instead.
tool: dotnet, angular
version: "11, 22"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8, S9]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Outdated libraries and patterns

Contents: 1. Rule · 2. Retired .NET patterns · 3. Retired Angular patterns · 4. Over-engineering · Sources

## 1. Rule for outdated libraries

Never propose a library that changed license (MediatR, AutoMapper, MassTransit, FluentAssertions, Polly as a direct reference) without its license status and the version concerned; if the project already uses it, report it as a risk to decide. The table and the free replacements are in `docs/dotnet/paid-packages.md`. A tracking site lists more packages (Moq, IdentityServer, ImageSharp, QuestPDF, EPPlus and others); single secondary source. [S1]

## 2. Retired .NET patterns

| Old habit | State | Write instead |
| --- | --- | --- |
| `AddSwaggerGen()` and Swashbuckle by default | Out of the templates in .NET 9 | `AddOpenApi()`, `MapOpenApi()` [S2] [S3] |
| `Microsoft.Extensions.Http.Polly`, `AddPolicyHandler` | Deprecated by the Polly project | `AddStandardResilienceHandler()` [S4] |
| EF Core in-memory provider for tests | Strongly discouraged | Real engine in a container, or a repository double [S5] |
| Controllers by default for a new API | Minimal APIs recommended | `MapGet`, `TypedResults` [S3] |
| eShopOnContainers as a model | Guide stuck at .NET 7, app replaced | `dotnet/eShop` as a reference to read [S3] |

## 3. Retired Angular patterns

| Old habit | State | Write instead |
| --- | --- | --- |
| NgModules, `standalone: true` by hand | Standalone by default | A standalone component without the flag [S6] |
| `*ngIf`, `*ngFor`, `*ngSwitch` | Deprecated in v20 | `@if`, `@for` with `track`, `@switch` [S7] [S6] |
| Constructor injection, `@Input()`, `@Output()` | Replaced in the guide | `inject()`, `input()`, `output()`, `model()` [S6] |
| `ngClass`, `ngStyle`, `@HostBinding`, `@HostListener` | Discouraged | `class` and `style` bindings, the `host` object [S6] |
| zone.js, `NgZone.onStable` | Zoneless by default in v21 | Signals, `afterNextRender` [S8] |
| `changeDetection: OnPush` written everywhere | OnPush by default in v22 | Nothing to write [S9] |
| Karma and Jasmine for a new project | Vitest by default in v21 | Vitest [S7] |
| `@Injectable({ providedIn: 'root' })` | Replaceable in most cases in v22 | `@Service` [S9] |
| Reactive forms for a new form | Signal Forms stable in v22 | Signal Forms [S9] |
| Suffixes `.component.ts`, `.service.ts` | Dropped by the 2025 style guide for new projects | `user-profile.ts` [S6] |

## 4. Signs of over-engineering

| Sign | Why it is a signal |
| --- | --- |
| Microservices for one small team | The premium only pays back on a complex system |
| Four projects, CQRS pipeline and domain events for five CRUD endpoints | Main risk of clean architecture |
| A service and a repository that only pass calls through | Abstractions that should not exist |
| A message bus between modules of one deployable without a need to decouple | Operations cost and duplicate messages |
| A global store for a local state | Signals and a service are enough |
| Virtual scrolling before any measure | Last resort |
| Code made general for a supposed future need | A classic point of code review |

These signs come from `choose-decomposition.md`, `structure-dotnet-solution.md`, `messaging.md` and `angular-high-frequency-ui.md` of this topic.

## Sources

- [S1] Dariusz Woźniak, "FOSSed", <https://dariusz-wozniak.github.io/fossed/>, read 2026-11-12, secondary source, summarized.
- [S2] dotnet/aspnetcore, "Announcement: Swashbuckle.AspNetCore is being removed in .NET 9", issue 54599, <https://github.com/dotnet/aspnetcore/issues/54599>, read 2026-11-12, summarized.
- [S3] Microsoft, "Generate OpenAPI documents", "APIs overview" and dotnet "eShop", <https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/aspnetcore-openapi>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] App-vNext, "Polly.Extensions.Http", archived repository, <https://github.com/App-vNext/Polly.Extensions.Http>, and Microsoft, "Build resilient HTTP apps", read 2026-11-12, summarized.
- [S5] Microsoft, "Choosing a testing strategy" (EF Core), <https://learn.microsoft.com/en-us/ef/core/testing/choosing-a-testing-strategy>, read 2026-11-12, summarized.
- [S6] Angular, "Angular coding style guide" and "Best practices", <https://angular.dev/style-guide>, read 2026-11-12, CC BY 4.0, summarized.
- [S7] Ninja Squad, "What's new in Angular 20.0?" and "What's new in Angular 21.0?", <https://blog.ninja-squad.com/2025/11/20/what-is-new-angular-21.0>, read 2026-11-12, summarized.
- [S8] Angular, "Angular without ZoneJS (Zoneless)", <https://angular.dev/guide/zoneless>, read 2026-11-12, CC BY 4.0, summarized.
- [S9] Angular, "Announcing Angular v22", 2026-06-03, <https://blog.angular.dev/announcing-angular-v22-c52bb83a4664>, read 2026-11-12, summarized.
