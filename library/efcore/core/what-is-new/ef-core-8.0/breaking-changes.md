---
title: "Breaking changes in EF Core 8.0 (EF8) - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 8 (EF8)

This page documents API and behavior changes that have the potential to break existing applications updating from EF Core 7 to EF Core 8. Make sure to review earlier breaking changes if updating from an earlier version of EF Core:

- Breaking changes in EF Core 7
- Breaking changes in EF Core 6

## Target Framework

EF Core 8 targets .NET 8. Applications targeting older .NET, .NET Core, and .NET Framework versions will need to update to target .NET 8.

## Summary

| **Breaking change**                                                                                           | **Impact** |
|:--------------------------------------------------------------------------------------------------------------|------------|
| `Contains` in LINQ queries may stop working on older SQL Server versions | High       |
| Possible query performance regressions around `Contains` in LINQ queries         | High       |
| Enums in JSON are stored as ints instead of strings by default                              | High       |
| SQL Server `date` and `time` now scaffold to .NET `DateOnly` and `TimeOnly`      | Medium     |
| Boolean columns with a database generated value are no longer scaffolded as nullable       | Medium     |
| SQLite `Math` methods now translate to SQL                                                    | Low        |
| ITypeBase replaces IEntityType in some APIs                                                     | Low        |
| ValueGenerator expressions must use public APIs                                          | Low        |
| ExcludeFromMigrations no longer excludes other tables in a TPC hierarchy          | Low        |
| Non-shadow integer keys are persisted to Cosmos documents                               | Low        |
| Relational model is generated in the compiled model                             | Low        |
| Scaffolding may generate different navigation names                                      | Low        |
| Discriminators now have a max length                                                       | Low        |
| SQL Server key values are compared case-insensitively                                            | Low        |
| Multiple AddDbContext calls are applied in different order                                   | Low        |
| EntityTypeAttributeConventionBase replaced with TypeAttributeConventionBase       | Low        |

## High-impact changes

### `Contains` in LINQ queries may stop working on older SQL Server versions

Tracking Issue #13617

#### Old behavior

EF had specialized support for LINQ queries using `Contains` operator over a parameterized value list:

```c#
var names = new[] { "Blog1", "Blog2" };

var blogs = await context.Blogs
    .Where(b => names.Contains(b.Name))
    .ToArrayAsync();
```

Before EF Core 8.0, EF inserted the parameterized values as constants into the SQL:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Name] IN (N'Blog1', N'Blog2')
```

#### New behavior

Starting with EF Core 8.0, EF now generates SQL that is more efficient in many cases, but is unsupported on SQL Server 2014 and below:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Name] IN (
    SELECT [n].[value]
    FROM OPENJSON(@__names_0) WITH ([value] nvarchar(max) '$') AS [n]
)
```

Note that newer SQL Server versions may be configured with an older compatibility level, also making them incompatible with the new SQL. This can also occur with an Azure SQL database which was migrated from a previous on-premises SQL Server instance, carrying over the old compatibility level.

#### Why

The insertion of constant values into the SQL creates many performance problems, defeating query plan caching and causing unneeded evictions of other queries. The new EF Core 8.0 translation uses the SQL Server `OPENJSON` function to instead transfer the values as a JSON array. This solves the performance issues inherent in the previous technique; however, the `OPENJSON` function is unavailable in SQL Server 2014 and below.

For more information about this change, see this blog post.

#### Mitigations

If your database is SQL Server 2016 (13.x) or newer, or if you're using Azure SQL, check the configured compatibility level of your database via the following command:

```sql
SELECT name, compatibility_level FROM sys.databases;
```

If the compatibility level is below 130 (SQL Server 2016), consider modifying it to a newer value (documentation).

Otherwise, if your database version really is older than SQL Server 2016, or is set to an old compatibility level which you cannot change for some reason, you can configure EF to revert to the older, pre-8.0 SQL. If you're using EF 9, you can use the newly-introduced `Microsoft.EntityFrameworkCore.Infrastructure.RelationalDbContextOptionsBuilder`2.TranslateParameterizedCollectionsToConstants*`:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseSqlServer("<CONNECTION STRING>", o => o.TranslateParameterizedCollectionsToConstants())
```

If you're using EF 8, you can achieve the same effect when using SQL Server by configuring EF's SQL compatibility level:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer(@"<CONNECTION STRING>", o => o.UseCompatibilityLevel(120));
```

### Possible query performance regressions around `Contains` in LINQ queries

Tracking Issue #32394

#### Old behavior

EF had specialized support for LINQ queries using `Contains` operator over a parameterized value list:

```c#
var names = new[] { "Blog1", "Blog2" };

var blogs = await context.Blogs
    .Where(b => names.Contains(b.Name))
    .ToArrayAsync();
```

Before EF Core 8.0, EF inserted the parameterized values as constants into the SQL:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Name] IN (N'Blog1', N'Blog2')
```

#### New behavior

Starting with EF Core 8.0, EF now generates the following:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Name] IN (
    SELECT [n].[value]
    FROM OPENJSON(@__names_0) WITH ([value] nvarchar(max) '$') AS [n]
)
```

However, after the release of EF 8 it turned out that while the new SQL is more efficient for most cases, it can be dramatically less efficient in a minority of cases, even causing query timeouts in some cases.

Please see this comment for a summary of the change in EF 8, the partial mitigations provided in EF 9, and the plan going forward for EF 10.

#### Mitigations

If you're using EF 9, you can use the newly-introduced `Microsoft.EntityFrameworkCore.Infrastructure.RelationalDbContextOptionsBuilder`2.TranslateParameterizedCollectionsToConstants*` to revert the `Contains` translation for all queries back to the pre-8.0 behavior:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseSqlServer("<CONNECTION STRING>", o => o.TranslateParameterizedCollectionsToConstants())
```

If you're using EF 8, you can achieve the same effect when using SQL Server by configuring EF's SQL compatibility level:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer(@"<CONNECTION STRING>", o => o.UseCompatibilityLevel(120));
```

Finally, you can control the translation on a query-by-query basis using `Microsoft.EntityFrameworkCore.EF.Constant*` as follows:

```c#
var blogs = await context.Blogs
    .Where(b => EF.Constant(names).Contains(b.Name))
    .ToArrayAsync();
```

### Enums in JSON are stored as ints instead of strings by default

Tracking Issue #13617

#### Old behavior

In EF7, enums mapped to JSON are, by default, stored as string values in the JSON document.

#### New behavior

Starting with EF Core 8.0, EF now, by default, maps enums to integer values in the JSON document.

#### Why

EF has always, by default, mapped enums to a numeric column in relational databases. Since EF supports queries where values from JSON interact with values from columns and parameters, it is important that the values in JSON match the values in the non-JSON column.

#### Mitigations

To continue using strings, configure the enum property with a conversion. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>().Property(e => e.Status).HasConversion<string>();
}
```

Or, for all properties of the enum type::

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Properties<StatusEnum>().HaveConversion<string>();
}
```

## Medium-impact changes

### SQL Server `date` and `time` now scaffold to .NET `DateOnly` and `TimeOnly`

Tracking Issue #24507

#### Old behavior

Previously, when scaffolding a SQL Server database with `date` or `time` columns, EF would generate entity properties with types `System.DateTime` and `System.TimeSpan`.

#### New behavior

Starting with EF Core 8.0, `date` and `time` are scaffolded as `System.DateOnly` and `System.TimeOnly`.

#### Why

`System.DateOnly` and `System.TimeOnly` were introduced in .NET 6.0, and are a perfect match for mapping the database date and time types. `System.DateTime` notably contains a time component that goes unused and can cause confusion when mapping it to `date`, and `System.TimeSpan` represents a time interval - possibly including days - rather than a time of day at which an event occurs. Using the new types prevents bugs and confusion, and provides clarity of intent.

#### Mitigations

This change only affects users which regularly re-scaffold their database into an EF code model ("database-first" flow).

It is recommended to react to this change by modifying your code to use the newly scaffolded `System.DateOnly` and `System.TimeOnly` types. However, if that isn't possible, you can edit the scaffolding templates to revert to the previous mapping. To do this, set up the templates as described on this page. Then, edit the `EntityType.t4` file, find where the entity properties get generated (search for `property.ClrType`), and change the code to the following:

```c#
        var clrType = property.GetColumnType() switch
        {
            "date" when property.ClrType == typeof(DateOnly) => typeof(DateTime),
            "date" when property.ClrType == typeof(DateOnly?) => typeof(DateTime?),
            "time" when property.ClrType == typeof(TimeOnly) => typeof(TimeSpan),
            "time" when property.ClrType == typeof(TimeOnly?) => typeof(TimeSpan?),
            _ => property.ClrType
        };

        usings.AddRange(code.GetRequiredUsings(clrType));

        var needsNullable = Options.UseNullableReferenceTypes && property.IsNullable && !clrType.IsValueType;
        var needsInitializer = Options.UseNullableReferenceTypes && !property.IsNullable && !clrType.IsValueType;
#>
    public <#= code.Reference(clrType) #><#= needsNullable ? "?" : "" #> <#= property.Name #> { get; set; }<#= needsInitializer ? " = null!;" : "" #>
<#
```

### Boolean columns with a database generated value are no longer scaffolded as nullable

Tracking Issue #15070

#### Old behavior

Previously, non-nullable `bool` columns with a database default constraint were scaffolded as nullable `bool?` properties.

#### New behavior

Starting with EF Core 8.0, non-nullable `bool` columns are always scaffolded as non-nullable properties.

#### Why

A `bool` property will not have its value sent to the database if that value is `false`, which is the CLR default. If the database has a default value of `true` for the column, then even though the value of the property is `false`, the value in the database ends up as `true`. However, in EF8, the sentinel used to determine whether a property has a value can be changed. This is done automatically for `bool` properties with a database generated value of `true`, which means that it is no longer necessary to scaffold the properties as nullable.

#### Mitigations

This change only affects users which regularly re-scaffold their database into an EF code model ("database-first" flow).

It is recommended to react to this change by modifying your code to use the non-nullable bool property. However, if that isn't possible, you can edit the scaffolding templates to revert to the previous mapping. To do this, set up the templates as described on this page. Then, edit the `EntityType.t4` file, find where the entity properties get generated (search for `property.ClrType`), and change the code to the following:

```c#
#>
        var propertyClrType = property.ClrType != typeof(bool)
                              || (property.GetDefaultValueSql() == null && property.GetDefaultValue() != null)
            ? property.ClrType
            : typeof(bool?);
#>
    public <#= code.Reference(propertyClrType) #><#= needsNullable ? "?" : "" #> <#= property.Name #> { get; set; }<#= needsInitializer ? " = null!;" : "" #>
<#
<#
```
