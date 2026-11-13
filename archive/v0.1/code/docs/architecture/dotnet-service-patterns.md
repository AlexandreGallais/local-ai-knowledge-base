---
id: architecture-dotnet-service-patterns
title: .NET service patterns
topic: architecture
summary: Dependency injection, options, HTTP resilience, logging, telemetry, health, data access and Aspire for a .NET service. .NET 10.
tool: dotnet
version: "10"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# .NET service patterns

Contents: 1. Do and do not · 2. Resilience and Polly · 3. Aspire · Sources

## 1. Do and do not (.NET service)

| Subject | Do | Do not |
| --- | --- | --- |
| Dependency injection | Thread-safe singletons; scope validation on; fast synchronous factories | Captive dependency (a singleton that keeps a scoped service); service locator; `BuildServiceProvider` while configuring; `Task.Result` in a factory [S1] |
| Options | `AddOptions<T>().Bind(...)`, `ValidateDataAnnotations()`, `ValidateOnStart()`; `IOptionsMonitor<T>` in a singleton | `IOptionsSnapshot<T>` in a singleton [S2] |
| HTTP resilience | `AddStandardResilienceHandler()`: rate limiter, 30 s total timeout, 3 retries, circuit breaker, 10 s per attempt | Several handlers stacked; retrying a POST without `DisableForUnsafeHttpMethods()` [S3] |
| Logging | Message templates with named fields; `[LoggerMessage]` on hot paths | String interpolation in a log call [S5] |
| Telemetry | `ILogger` for logs, `Meter` for metrics, `ActivitySource` for traces; OTLP export | — [S4] |
| Health | Readiness probe with the tagged checks; liveness probe without dependency checks | A heavy query in a probe [S6] |
| Data access | One short `DbContext` per unit of work; `IDbContextFactory<T>` outside an HTTP request; await every async call | Two operations in parallel on one context; the in-memory provider for tests [S7] [S8] |
| Data tests | Test against the real engine (a container started by the tests); a repository as test double, knowing its cost | Mocking `DbSet` for queries [S7] |

- A `DbContext` is not thread-safe; the typical error starts with "A second operation started on this context". [S8]
- The EF Core in-memory provider is "strongly discouraged" as a fake engine. [S7]

## 2. Resilience and Polly (.NET)

- `Microsoft.Extensions.Http.Resilience` builds on Polly. [S3]
- The old package `Microsoft.Extensions.Http.Polly` is deprecated by the `Polly.Extensions.Http` repository, archived on 2023-11-13. [S9]
- Polly adopts a maintenance fee for the next major version after 2026-11-16, on direct references only; going through `Microsoft.Extensions.Http.Resilience` is not subject to it. [S10]
- Rule: resilience through the `Microsoft.Extensions.*` packages; no direct reference to Polly without a recorded decision.

## 3. Aspire (local orchestration)

- Aspire (MIT) describes, runs, debugs and deploys a distributed application; its core, the AppHost, describes the architecture in code. [S11]
- It replaces neither Kubernetes nor a runtime: the AppHost runs at local start and in the deployment pipeline, then stops; never deploy it as a service. [S11]
- `aspire publish` writes Helm charts and `aspire deploy` installs them in the current `kubectl` context (Helm 4.2.0 or later). [S11]
- The "ServiceDefaults" project of the templates sets OpenTelemetry, health endpoints and HTTP resilience; it works without the Aspire orchestration. [S4]

## Sources

- [S1] Microsoft, "Dependency injection guidelines", <https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection-guidelines>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Microsoft, "Options pattern in .NET", <https://learn.microsoft.com/en-us/dotnet/core/extensions/options>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "Build resilient HTTP apps: Key development patterns", <https://learn.microsoft.com/en-us/dotnet/core/resilience/http-resilience>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, ".NET observability with OpenTelemetry", <https://learn.microsoft.com/en-us/dotnet/core/diagnostics/observability-with-otel>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Microsoft, "Compile-time logging source generation", <https://learn.microsoft.com/en-us/dotnet/core/extensions/logger-message-generator>, read 2026-11-12, CC BY 4.0, summarized.
- [S6] Microsoft, "Health checks in ASP.NET Core", <https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks>, read 2026-11-12, CC BY 4.0, summarized.
- [S7] Microsoft, "Choosing a testing strategy" (EF Core), <https://learn.microsoft.com/en-us/ef/core/testing/choosing-a-testing-strategy>, read 2026-11-12, summarized.
- [S8] Microsoft, "DbContext Lifetime, Configuration, and Initialization", <https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/>, read 2026-11-12, summarized.
- [S9] App-vNext, "Polly.Extensions.Http", archived repository, <https://github.com/App-vNext/Polly.Extensions.Http>, read 2026-11-12, summarized.
- [S10] The Polly Project, "Introducing the Open Source Maintenance Fee for Polly", 2026-07-14, updated 2026-10-12, <https://thepollyproject.org/2026/07/14/polly-osmf-announcement.html>, read 2026-11-12, summarized.
- [S11] Aspire, "Frequently asked questions" and "Deploy to Kubernetes", <https://aspire.dev/get-started/faq/>, read 2026-11-12, summarized.
