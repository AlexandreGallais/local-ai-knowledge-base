---
id: dotnet-efcore-changes
title: EF Core 7 to 11, what changed
topic: dotnet
summary: Queries, migrations, configuration and the high-impact breaking change of each EF Core version. EF Core 11.
tool: EF Core
version: "11"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: CC BY 4.0, adapted from the EF Core documentation; written for this base (MIT)
variant: files
---

# EF Core 7 to 11, what changed

Contents: 1. Find the version · 2. New features · 3. Breaking changes and their fix · Sources

## 1. Find the EF Core version (EF Core package version)

Read the version of the package `Microsoft.EntityFrameworkCore` in `Directory.Packages.props` or in the `PackageReference` of the project. It is not the target framework: EF Core 9 runs on .NET 8. [S1]

## 2. New features by version (EF Core 7 to 11)

| EF Core | Write |
| --- | --- |
| 7 | `ExecuteUpdateAsync`, `ExecuteDeleteAsync` for bulk changes; JSON columns with `ToJson()`; TPC inheritance with `UseTpcMappingStrategy()` |
| 8 | Collections of primitive types; complex types; `DateOnly` and `TimeOnly` |
| 9 | `UseSeeding`, `UseAsyncSeeding` for seed data; a lock against concurrent migrations |
| 10 | `LeftJoin`, `RightJoin`; named query filters; optional complex types and complex types in JSON (prefer them to owned entities) |
| 11 | `FullJoin`; `MaxBy`, `MinBy`; `dotnet ef database update --add` |

[S2] [S3] [S4] [S5]

## 3. Breaking changes and their fix (EF Core 7 to 11)

| EF Core | Breaking change | Fix |
| --- | --- | --- |
| 7 | SQL Server connections use `Encrypt=true` by default | A valid server certificate; else `TrustServerCertificate=True`, at a cost in security |
| 8 | `Contains` on a list is translated with `OPENJSON` | SQL Server compatibility level 130 or more, else `UseCompatibilityLevel(120)` |
| 8 | Enums in JSON are stored as numbers | `HasConversion<string>()` |
| 9 | An exception when the model has changes without a migration | Add a migration; in `HasData`, static values instead of `DateTime.Now` or `Guid.NewGuid()` |
| 9 | An exception when a migration runs inside an explicit transaction | Call `MigrateAsync` alone |
| 10 | Parameterized collections become several parameters | `UseParameterizedCollectionMode(ParameterTranslationMode.Constant)` where needed |
| 10 | SQLite dates without an offset are read as UTC | Adapt the code to UTC |
| 11 | SQL Server compatibility level 160 by default | `UseCompatibilityLevel(<level>)` for an older server |

[S2] [S3] [S4] [S5]

## Sources

- [S1] Microsoft, "EF Core releases and planning", <https://learn.microsoft.com/ef/core/what-is-new>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Microsoft, "Breaking changes in EF Core 7.0" and "8", <https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-7.0/breaking-changes> and <https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-8.0/breaking-changes>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "Breaking changes in EF Core 9", <https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-9.0/breaking-changes>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "What's new in EF Core 10" and its breaking changes, <https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-10.0/whatsnew>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Microsoft, "What's new in EF Core 11", <https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-11.0/whatsnew>, read 2026-11-12, CC BY 4.0, summarized; the page says EF Core 11 is in development.
