---
id: dotnet-dotnet-changes
title: .NET 6 to 11, what changed in the libraries and the SDK
topic: dotnet
summary: Built-in APIs that replace packages, common breaking changes, file-based apps and native AOT. .NET 6 to 11.
tool: dotnet
version: "11"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8]
license: CC BY 4.0, adapted from the .NET documentation; written for this base (MIT)
variant: files
---

# .NET 6 to 11, what changed in the libraries and the SDK

Contents: 1. Support · 2. Built-in APIs that replace packages · 3. Breaking changes to know · 4. File-based apps · 5. Native AOT · Sources

## 1. Support (.NET versions)

.NET 11 (STS) came out on 2026-11-10. Only .NET 10 (LTS) and .NET 11 are supported, both until 2028-11. .NET 6 to 9 are out of support. A new major version comes out each November. [S1]

## 2. Built-in APIs that replace packages (.NET libraries)

Use the built-in API when the target framework is equal to or higher than the "Since" column. Add a third-party package only when the user asks for it.

| Need | Old habit | Built-in | Since |
| --- | --- | --- | --- |
| JSON | `Newtonsoft.Json` | `System.Text.Json` (case sensitive by default) | .NET Core 3.1; snake_case in 8 |
| Testable clock | `DateTime.UtcNow`, own clock interface | `TimeProvider`, `ITimer` | 8 |
| Fast logging | Interpolated strings in `LogInformation` | `[LoggerMessage]` on a `partial` method | — |
| HTTP resilience | Polly policies written by hand | `Microsoft.Extensions.Http.Resilience`: `AddStandardResilienceHandler()` | package |
| OpenAPI document | Swashbuckle `AddSwaggerGen` | `Microsoft.AspNetCore.OpenApi`: `AddOpenApi()`, `MapOpenApi()` | 9 |
| Two-level cache | `IMemoryCache` and `IDistributedCache` by hand | `HybridCache`: `AddHybridCache()`, `GetOrCreateAsync` | 9 |
| Named services | Factories, third-party container | Keyed services: `AddKeyedSingleton`, `[FromKeyedServices]` | 8 |
| Read-only lookups | Static `Dictionary` | `FrozenDictionary`, `FrozenSet`, `SearchValues` | 8 |
| Counting by key | `GroupBy` then `Count` | `CountBy`, `AggregateBy`, `Index` | 9 |
| Time-ordered ids | Own generator | `Guid.CreateVersion7()` | 9 |
| Async LINQ | Package `System.Linq.Async` | `System.Linq.AsyncEnumerable` | 10 |

[S2] [S3] [S4] [S6]

## 3. Breaking changes to know (.NET 8 to 11)

| .NET | Change |
| --- | --- |
| 8 | Container images listen on port 8080 and run as the non-root user `app`; `dotnet publish` builds in Release; `BinaryFormatter` disabled |
| 9 | `BinaryFormatter` always throws; span-based `params` overloads are preferred; Terminal Logger by default |
| 10 | Container images based on Ubuntu; `dotnet new sln` creates a `.slnx` file; `dotnet restore` audits transitive packages; `PackageReference` without a version is an error; `System.Linq.AsyncEnumerable` may conflict with the `System.Linq.Async` package |
| 11 | `IHost.RunAsync` throws when a `BackgroundService` fails; restore no longer looks for a higher version in the global folder |

[S5] [S7]

## 4. File-based apps (.NET SDK 10)

Run a single C# file without a project: `dotnet run app.cs`. Directives at the top of the file add packages and settings: `#:package Serilog@3.1.1`, `#:sdk Microsoft.NET.Sdk.Web`, `#:property TargetFramework=net10.0`. `dotnet project convert app.cs` turns it into a project. [S8]

The `Directory.Build.props`, `Directory.Packages.props` and `global.json` files of the parent folders apply to it.

## 5. Native AOT (.NET publishing)

Set `<PublishAot>true</PublishAot>`, then run `dotnet publish -r linux-x64 -c Release`. Console apps from .NET 7, ASP.NET Core from .NET 8. No dynamic loading of assemblies, no `System.Reflection.Emit`; trimming is required. [S6]

## Sources

- [S1] Microsoft, ".NET support policy", <https://dotnet.microsoft.com/platform/support/policy/dotnet-core>, read 2026-11-12, summarized.
- [S2] Microsoft, "What's new in the .NET 8 runtime", <https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8/runtime>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "What's new in .NET libraries for .NET 9", <https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9/libraries>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "Build resilient HTTP apps", <https://learn.microsoft.com/en-us/dotnet/core/resilience/http-resilience>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Microsoft, "Breaking changes in .NET 10", <https://learn.microsoft.com/en-us/dotnet/core/compatibility/10>, read 2026-11-12, CC BY 4.0, summarized; .NET 8 and 9 from the same series of pages.
- [S6] Microsoft, "Native AOT deployment", <https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/>, read 2026-11-12, CC BY 4.0, summarized.
- [S7] Microsoft, "Breaking changes in .NET 11", <https://learn.microsoft.com/en-us/dotnet/core/compatibility/11>, read 2026-11-12, CC BY 4.0, summarized; the page says it is not complete yet.
- [S8] Microsoft, "File-based apps", .NET 10, <https://learn.microsoft.com/en-us/dotnet/core/sdk/file-based-apps>, read 2026-11-12, CC BY 4.0, summarized.
