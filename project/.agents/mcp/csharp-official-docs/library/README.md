# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [csharp](csharp.index.md) | C# language: guides, language reference and what is new | 15 | CC-BY-4.0 | 998 files, 4.8 MB |
| [dotnet-core](dotnet-core.index.md) | .NET fundamentals and runtime guides | 11 | CC-BY-4.0 | 2377 files, 9.7 MB |
| [dotnet-standard](dotnet-standard.index.md) | .NET standard library guides | 11 | CC-BY-4.0 | 896 files, 6.8 MB |
| [aspnetcore](aspnetcore.index.md) | ASP.NET Core documentation | 11 | CC-BY-4.0 | 1418 files, 17.4 MB |
| [efcore](efcore.index.md) | Entity Framework Core documentation | 11 | CC-BY-4.0 | 311 files, 4.7 MB |
| [dotnet-fundamentals](dotnet-fundamentals.index.md) | .NET fundamentals: dependency injection, configuration, logging, code analysis rules CA and IDE | 11 | CC-BY-4.0 | 664 files, 3.1 MB |
| [dotnet-architecture](dotnet-architecture.index.md) | .NET architecture guides: microservices, containers, cloud-native, modern web applications | 11 | CC-BY-4.0 | 164 files, 1.9 MB |
| [aspire](aspire.index.md) | .NET Aspire: app host, integrations, deployment, observability | 13 | MIT | 93 files, 0.3 MB |
| [aspnetcore-api](aspnetcore-api.index.md) | ASP.NET Core API reference: the XML documentation of the shared framework Microsoft.AspNetCore.App | 11.0 | MIT | 249 files, 44.2 MB |
| [efcore-api](efcore-api.index.md) | Entity Framework Core API reference: the XML documentation of Microsoft.EntityFrameworkCore | 11.0 | MIT | 1 files, 8.7 MB |
| [efcore-relational-api](efcore-relational-api.index.md) | Entity Framework Core relational API reference: the XML documentation of Microsoft.EntityFrameworkCore.Relational | 11.0 | MIT | 1 files, 4.9 MB |
| [dotnet-desktop](dotnet-desktop.index.md) | Windows desktop apps in .NET: WPF (XAML, controls, layout, data binding, styles and templates, commands, graphics and animation) and Windows Forms | main | CC-BY-4.0 | 1620 files, 8.7 MB |
| [maui](maui.index.md) | .NET MAUI: cross-platform apps for Windows, Android, iOS and macOS (XAML, controls, layouts, data binding, MVVM, platform integration, deployment) | main | CC-BY-4.0 | 473 files, 5.1 MB |
| [xunit](xunit.index.md) | xUnit.net: writing and running tests in .NET (facts, theories, fixtures, shared context, v3 and Microsoft Testing Platform, analyzers) | v3 | Apache-2.0 | 402 files, 1.2 MB |
| [nunit](nunit.index.md) | NUnit: writing tests in .NET (attributes, assertions and constraints, the runners, the analyzers) | 4 | MIT | 420 files, 1.9 MB |
| [polly](polly.index.md) | Polly 8: resilience in .NET (retry, circuit breaker, timeout, fallback, hedging, rate limiter, resilience pipelines) | 8.9 | BSD-3-Clause | 35 files, 0.4 MB |
