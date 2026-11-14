---
title: "Breaking changes in EF Core 10 (EF10) - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-10.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 10 (EF10)

This page documents API and behavior changes that have the potential to break existing applications updating from EF Core 9 to EF Core 10. Make sure to review earlier breaking changes if updating from an earlier version of EF Core:

- Breaking changes in EF Core 9
- Breaking changes in EF Core 8
- Breaking changes in EF Core 7
- Breaking changes in EF Core 6

## Summary

> **Note:**
> If you are using Microsoft.Data.Sqlite, please see the separate section below on Microsoft.Data.Sqlite breaking changes.

| **Breaking change**                                                                                             | **Impact** |
|:--------------------------------------------------------------------------------------------------------------- | -----------|
| EF tools now require framework to be specified for multi-targeted projects         | Medium     |
| SQL Server: Microsoft.Data.SqlClient adds a broker dependency                   | Low        |
| Application Name is now injected into the connection string                      | Low        |
| SQL Server json data type used by default on Azure SQL and compatibility level 170 | Low        |
| Parameterized collections now use multiple parameters by default                  | Low        |
| ExecuteUpdateAsync now accepts a regular, non-expression lambda                   | Low        |
| Complex type column names are now uniquified                             | Low        |
| Nested complex type properties use full path in column names               | Low        |
| IDiscriminatorPropertySetConvention signature changed                    | Low        |
| IRelationalCommandDiagnosticsLogger methods add logCommandText parameter              | Low        |
| SQL parameter names are now simplified                                           | Low        |

## Medium-impact changes

### EF tools now require framework to be specified for multi-targeted projects

Tracking Issue #37230

#### Old behavior

Previously, the EF tools (dotnet-ef) could be used on projects targeting multiple frameworks without specifying which framework to use.

#### New behavior

Starting with EF Core 10.0, when running EF tools on a project that targets multiple frameworks (using `<TargetFrameworks>` instead of `<TargetFramework>`), you must explicitly specify which target framework to use with the `--framework` option. Without this option, the following error will be thrown:

> The project targets multiple frameworks. Use the --framework option to specify which target framework to use.

#### Why

In EF Core 10, the tools started relying on the `ResolvePackageAssets` MSBuild task to get more accurate information about project dependencies. However, this task is not available if the project is targeting multiple target frameworks (TFMs). The solution requires users to select which framework should be used.

#### Mitigations

When running any EF tools command on a project that targets multiple frameworks, specify the target framework using the `--framework` option. For example:

```bash
dotnet ef migrations add MyMigration --framework net9.0
```

```bash
dotnet ef database update --framework net9.0
```

```bash
dotnet ef migrations script --framework net9.0
```

If your project file looks like this:

```xml
<PropertyGroup>
  <TargetFrameworks>net8.0;net9.0</TargetFrameworks>
</PropertyGroup>
```

You'll need to choose one of the frameworks (e.g., `net9.0`) when running the EF tools.
