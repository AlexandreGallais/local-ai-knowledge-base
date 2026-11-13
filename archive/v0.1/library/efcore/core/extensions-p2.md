---
title: "Tools & Extensions - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/extensions/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Tools & Extensions - EF Core (part 2 of 2)

## Extensions for unsupported EF Core versions

### EntityFrameworkCore.SqlServer.HierarchyId

> **Note:**
> The SQL Server hierarchyid data type is supported directly within EF Core as of EF Core 8.

Adds hierarchyid support to the SQL Server EF Core provider. For EF Core: 3-7.

GitHub repository | NuGet

### EntityFrameworkCore.FSharp

Adds F# design-time support to EF Core. For EF Core: 5-6.

GitHub repository | NuGet

### EntityFrameworkCore.Triggered

Triggers for EF Core. Respond to changes in your DbContext before and after they are committed to the database. Triggers are fully asynchronous and support dependency injection, inheritance, cascading and more. For EF Core: 3-6.

GitHub repository | NuGet

### Microsoft.EntityFrameworkCore.AutoHistory

A plugin library that enables automatically recording the data changes performed by EF Core into a history table. For EF Core: 2-6.

GitHub repository | NuGet

### ErikEJ.EntityFrameworkCore.SqlServer.SqlQuery

> **Note:**
> Raw SQL queries against unmapped types is supported directly within EF Core as of EF Core 8.

Provides the `SqlQueryAsync<T>` and `SqlQueryValueAsync<T>` methods to help you populate arbitrary classes or a list of primitive types from a raw SQL query. For EF Core: 6-7.

GitHub repository | NuGet

### ErikEJ.EntityFrameworkCore.SqlServer.DateOnlyTimeOnly

> **Note:**
> SQL Server `DateOnly` and `TimeOnly` mapping is supported directly within EF Core as of EF Core 8.

Use the `DateOnly` and `TimeOnly` .NET types with the EF Core SQL Server provider. For EF Core: 6-7.

GitHub repository | NuGet

### nHydrate ORM for Entity Framework

An O/RM that creates strongly-typed, extendable classes for Entity Framework. The generated code is Entity Framework Core. There is no difference. This is not a replacement for EF or a custom O/RM. It is a visual, modeling layer that allows a team to manage complex database schemas. It works well with SCM software like Git, allowing multi-user access to your model with minimal conflicts. The installer tracks model changes and creates upgrade scripts. For EF Core: 3.

Github repository

### Microsoft.EntityFrameworkCore.UnitOfWork

A plugin for Microsoft.EntityFrameworkCore to support repository, unit of work patterns, and multiple databases with distributed transaction supported. For EF Core: 2-3.

GitHub repository

### Toolbelt.EntityFrameworkCore.IndexAttribute

Revival of [Index] attribute (with extension for model building). For EF Core: 2-5.

GitHub repository | NuGet

### EfCoreTemporalTable

> **Note:**
> SQL Server temporal tables are supported directly within EF Core as of EF Core 6.

Easily perform temporal queries on your favorite database using introduced extension methods: `AsTemporalAll()`, `AsTemporalAsOf(date)`, `AsTemporalFrom(startDate, endDate)`, `AsTemporalBetween(startDate, endDate)`, `AsTemporalContained(startDate, endDate)`. For EF Core: 3-5.

GitHub repository | NuGet

### EntityFrameworkCore.TemporalTables

> **Note:**
> SQL Server temporal tables are supported directly within EF Core as of EF Core 6.

Extension library for Entity Framework Core which allows developers who use SQL Server to easily use temporal tables. For EF Core: 2-5.

GitHub repository | NuGet

### Dabble.EntityFrameworkCore.Temporal.Query

> **Note:**
> SQL Server temporal tables are supported directly within EF Core as of EF Core 6.

LINQ extensions to Entity Framework Core 3.1 to support Microsoft SQL Server Temporal Table Querying. For EF Core: 3.

GitHub repository | NuGet

### EntityFrameworkCore.NCache

NCache Entity Framework Core Provider is a distributed second level cache provider for caching query results. The distributed architecture of NCache makes it more scalable and highly available. For EF Core: 2-3.

Website | NuGet

### Ramses

Life cycle hooks (for SaveChanges). For EF Core: 2-3.

GitHub repository | NuGet

### EntityFrameworkCore.Extensions

An extension library for Dynamic Data Masking (SQL Server) and MigrationBuilder and ModelBuilder extensions. For EF Core: 5.

An updated fork for the data masking feature can be found at EntityFrameworkCore.Extensions.SqlServer.DataMasking

GitHub repository | NuGet

### EFCore.SoftDelete

An implementation for soft deleting entities. For EF Core: 3-6.

GitHub repository | NuGet

### Ainoraz.EFCore.IncludeBuilder

Extension for EF Core that provides alternative `Include` syntax in order to better support the following scenarios:

- Loading multiple entities on the same level (siblings).
- Writing extension methods that are independent of nesting level.

For EF Core: 6-7.

### LessCode.EFCore.StronglyTypedId

A source generator that can generate strongly-typed-id classes automatically for entities. For EF Core: 7.

GitHub repository
