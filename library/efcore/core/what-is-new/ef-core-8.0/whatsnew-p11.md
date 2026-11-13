---
title: "What's New in EF Core 8 (part 11 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 11 of 11)

## Parentheses elimination

Generating readable SQL is an important goal for EF Core. In EF8, the generated SQL is more readable through automatic elimination of unneeded parenthesis. For example, the following LINQ query:

```csharp
await ctx.Customers  
    .Where(c => c.Id * 3 + 2 > 0 && c.FirstName != null || c.LastName != null)  
    .ToListAsync();  
```

Translates to the following Azure SQL when using EF7:

```sql
SELECT [c].[Id], [c].[City], [c].[FirstName], [c].[LastName], [c].[Street]
FROM [Customers] AS [c]
WHERE ((([c].[Id] * 3) + 2) > 0 AND ([c].[FirstName] IS NOT NULL)) OR ([c].[LastName] IS NOT NULL)
```

Which has been improved to the following when using EF8:

```sql
SELECT [c].[Id], [c].[City], [c].[FirstName], [c].[LastName], [c].[Street]
FROM [Customers] AS [c]
WHERE ([c].[Id] * 3 + 2 > 0 AND [c].[FirstName] IS NOT NULL) OR [c].[LastName] IS NOT NULL
```

## Specific opt-out for RETURNING/OUTPUT clause

EF7 changed the default update SQL to use `RETURNING`/`OUTPUT` for fetching back database-generated columns. Some cases where identified where this does not work, and so EF8 introduces explicit opt-outs for this behavior.

For example, to opt-out of `OUTPUT` when using the SQL Server/Azure SQL provider:

```csharp
 modelBuilder.Entity<Customer>().ToTable(tb => tb.UseSqlOutputClause(false));
```

Or to opt-out of `RETURNING` when using the SQLite provider:

```csharp
 modelBuilder.Entity<Customer>().ToTable(tb => tb.UseSqlReturningClause(false));
```

See the SQL Server and SQLite documentation pages for more details.

## Other minor changes

In addition to the enhancements described above, there have been many smaller changes made to EF8. This includes:

- NativeAOT/trimming compatibility for Microsoft.Data.Sqlite
- Allow Multi-region or Application Preferred Regions in EF Core Cosmos
- SQLite: Add EF.Functions.Unhex
- SQL Server Index options SortInTempDB and DataCompression
- Allow 'unsharing' connection between contexts
- Add Generic version of EntityTypeConfiguration Attribute
- Query: add support for projecting JSON entities that have been composed on
- Remove unneeded subquery and projection when using ordering without limit/offset in set operations
- Allow pooling DbContext with singleton services
- Optional RestartSequenceOperation.StartValue
- Allow UseSequence and HiLo on non-key properties
- Provide more information when 'No DbContext was found' error is generated
- Pass query tracking behavior to materialization interceptor
- Use case-insensitive string key comparisons on SQL Server
- Allow value converters to change the DbType
- Resolve application services in EF services
- Allow transfer of ownership of DbConnection from application to DbContext
