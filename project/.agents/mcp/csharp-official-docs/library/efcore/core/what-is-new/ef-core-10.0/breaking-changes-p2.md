---
title: "Breaking changes in EF Core 10 (EF10) - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-10.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 10 (EF10) - EF Core (part 2 of 3)

## Low-impact changes

### SQL Server: Microsoft.Data.SqlClient adds a broker dependency

#### Old behavior

Earlier versions of Microsoft.Data.SqlClient did not depend on Microsoft.Identity.Client.Broker.

#### New behavior

Microsoft.Data.SqlClient 6.1.6 introduces a dependency on Microsoft.Identity.Client.Broker, which is required for Microsoft Entra ID authentication and can drastically increase the size of the published application when using the EF Core SQL Server provider.

#### Why

The additional dependency is introduced by Microsoft.Data.SqlClient, rather than EF Core itself.

#### Mitigations

If your application doesn't use Microsoft Entra ID authentication, explicitly reference Microsoft.Data.SqlClient 7.1.x in your project to override the version used by EF Core. Starting with version 7.0, Microsoft.Data.SqlClient no longer includes Azure/Entra ID authentication dependencies in its core package.

For details, including the additional package required for Entra ID authentication, see Microsoft.Data.SqlClient has been updated to 7.0.

### Application Name is now injected into the connection string

Tracking Issue #35730

#### New behavior

When a connection string without an `Application Name` is passed to EF, EF now inserts an `Application Name` containing anonymous information about the EF and SqlClient versions being used. In the vast majority of cases, this doesn't impact the application in any way, but can affect behavior in some edge cases. For example, if you connect to the same database with both EF and another non-EF data access technology (e.g. Dapper, ADO.NET), SqlClient will use a different internal connection pool, as EF will now use a different, updated connection string (one where `Application Name` has been injected). If this sort of mixed access is done within a `TransactionScope`, this can cause escalation to a distributed transaction where previously none was necessary, due to the usage of two connection strings which SqlClient identifies as two distinct databases.

#### Mitigations

A mitigation is to simply define an `Application Name` in your connection string. Once one is defined, EF does not overwrite it and the original connection string is preserved exactly as-is.

### SQL Server json data type used by default on Azure SQL and compatibility level 170

Tracking Issue #36372

#### Old behavior

Previously, when mapping primitive collections or owned types to JSON in the database, the SQL Server provider stored the JSON data in an `nvarchar(max)` column:

```c#
public class Blog
{
    // ...

    // Primitive collection, mapped to nvarchar(max) JSON column
    public string[] Tags { get; set; }
    // Owned entity type mapped to nvarchar(max) JSON column
    public List<Post> Posts { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().OwnsMany(b => b.Posts, b => b.ToJson());
}
```

For the above, EF previously generated the following table:

```sql
CREATE TABLE [Blogs] (
    ...
    [Tags] nvarchar(max),
    [Posts] nvarchar(max)
);
```

#### New behavior

With EF 10, if you configure EF with `Microsoft.EntityFrameworkCore.SqlServerDbContextOptionsExtensions.UseAzureSql*` (see documentation), or configure EF with a compatibility level of 170 or above (see documentation), EF will map to the new JSON data type instead:

```sql
CREATE TABLE [Blogs] (
    ...
    [Tags] json
    [Posts] json
);
```

Although the new JSON data type is the recommended way to store JSON data in SQL Server going forward, there may be some behavioral differences when transitioning from `nvarchar(max)`, and some specific querying forms may not be supported. For example, SQL Server does not support the DISTINCT operator over JSON arrays, and queries attempting to do so will fail.

Note that if you have an existing table and are using `Microsoft.EntityFrameworkCore.SqlServerDbContextOptionsExtensions.UseAzureSql*`, upgrading to EF 10 will cause a migration to be generated which alters all existing `nvarchar(max)` JSON columns to `json`. This alter operation is supported and should get applied seamlessly and without any issues, but is a non-trivial change to your database.

#### Why

The new JSON data type introduced by SQL Server is a superior, 1st-class way to store and interact with JSON data in the database; it notably brings significant performance improvements (see documentation). All applications using Azure SQL Database or SQL Server 2025 are encouraged to migrate to the new JSON data type.

#### Mitigations

If you are targeting Azure SQL Database and do not wish to transition to the new JSON data type right away, you can configure EF with a compatibility level lower than 170:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseAzureSql("<connection string>", o => o.UseCompatibilityLevel(160));
}
```

If you're targeting on-premises SQL Server, the default compatibility level with `UseSqlServer` is currently 150 (SQL Server 2019), so the JSON data type is not used.

As an alternative, you can explicitly set the column type on specific properties to be `nvarchar(max)`:

```c#
public class Blog
{
    public string[] Tags { get; set; }
    public List<Post> Posts { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().PrimitiveCollection(b => b.Tags).HasColumnType("nvarchar(max)");
    modelBuilder.Entity<Blog>().OwnsMany(b => b.Posts, b => b.ToJson().HasColumnType("nvarchar(max)"));
    modelBuilder.Entity<Blog>().ComplexProperty(e => e.Posts, b => b.ToJson());
}
```

### Parameterized collections now use multiple parameters by default

Tracking Issue #34346

#### Old behavior

In EF Core 9 and earlier, parameterized collections in LINQ queries (such as those used with `.Contains()`) were translated to SQL using a JSON array parameter by default. Consider the following query:

```c#
int[] ids = [1, 2, 3];
var blogs = await context.Blogs.Where(b => ids.Contains(b.Id)).ToListAsync();
```

On SQL Server, this generated the following SQL:

```sql
@__ids_0='[1,2,3]'

SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Id] IN (
    SELECT [i].[value]
    FROM OPENJSON(@__ids_0) WITH ([value] int '$') AS [i]
)
```

#### New behavior

Starting with EF Core 10.0, parameterized collections are now translated using multiple scalar parameters by default:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Id] IN (@ids1, @ids2, @ids3)
```

#### Why

The new default translation provides the query planner with cardinality information about the collection, which can lead to better query plans in many scenarios. The multiple parameter approach balances between plan cache efficiency (by parameterizing) and query optimization (by providing cardinality).

However, different workloads may benefit from different translation strategies depending on collection sizes, query patterns, and database characteristics.

> **Note:**
> While the new default translation will not cause any behavioral change or performance regression in the majority of cases, the change in how queries are translated to SQL may have adverse consequences in some scenarios.
>
> Applications that were built with EF Core 8 or 9, and rely on the performance characteristics of the JSON array parameter translation (using `OPENJSON` or similar database-specific functions) may experience performance differences when upgrading to EF Core 10. This is especially relevant for queries with large collections or specific query patterns that benefited from the previous translation strategy.
>
> If you experience performance regressions after upgrading, consider using the mitigation strategies below to revert to the previous behavior globally or for specific queries.

#### Mitigations

If you encounter issues with the new default behavior (such as performance regressions), you can configure the translation mode globally:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer("<CONNECTION STRING>", 
            o => o.UseParameterizedCollectionMode(ParameterTranslationMode.Constant));
```

Available modes are:

- `ParameterTranslationMode.MultipleParameters` - The new default (multiple scalar parameters)
- `ParameterTranslationMode.Constant` - Inlines values as constants (pre-EF8 default behavior)
- `ParameterTranslationMode.Parameter` - Uses JSON array parameter (EF8-9 default)

You can also control the translation on a per-query basis:

```c#
// Use constants instead of parameters for this specific query
var blogs = await context.Blogs
    .Where(b => EF.Constant(ids).Contains(b.Id))
    .ToListAsync();

// Use a single parameter (e.g. JSON parameter with OPENJSON) instead of parameters for this specific query
var blogs = await context.Blogs
    .Where(b => EF.Parameter(ids).Contains(b.Id))
    .ToListAsync();

// Use multiple scalar parameters for this specific query. This is the default in EF 10, but is useful if the default was changed globally:
var blogs = await context.Blogs
    .Where(b => EF.MultipleParameters(ids).Contains(b.Id))
    .ToListAsync();
```

For more information about parameterized collection translation, see the documentation.

### ExecuteUpdateAsync now accepts a regular, non-expression lambda

Tracking Issue #32018

#### Old behavior

Previously, `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdate*` accepted an expression tree argument (`Expression<Func<...>>`) for the column setters.

#### New behavior

Starting with EF Core 10.0, `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdate*` now accepts a non-expression argument (`Func<...>`) for the column setters. If you were building expression trees to dynamically create the column setters argument, your code will no longer compile - but can be replaced with a much simpler alternative (see below).

#### Why

The fact that the column setters parameter was an expression tree made it quite difficult to do dynamic construction of the column setters, where some setters are only present based on some condition (see Mitigations below for an example).

#### Mitigations

Code that was building expression trees to dynamically create the column setters argument will need to be rewritten - but the result will be much simpler. For example, let's assume we want to update a Blog's Views, but conditionally also its Name. Since the setters argument was an expression tree, code such as the following needed to be written:

```c#
// Base setters - update the Views only
Expression<Func<SetPropertyCalls<Blog>, SetPropertyCalls<Blog>>> setters =
    s => s.SetProperty(b => b.Views, 8);

// Conditionally add SetProperty(b => b.Name, "foo") to setters, based on the value of nameChanged
if (nameChanged)
{
    var blogParameter = Expression.Parameter(typeof(Blog), "b");

    setters = Expression.Lambda<Func<SetPropertyCalls<Blog>, SetPropertyCalls<Blog>>>(
        Expression.Call(
            instance: setters.Body,
            methodName: nameof(SetPropertyCalls<Blog>.SetProperty),
            typeArguments: [typeof(string)],
            arguments:
            [
                Expression.Lambda<Func<Blog, string>>(Expression.Property(blogParameter, nameof(Blog.Name)), blogParameter),
                Expression.Constant("foo")
            ]),
        setters.Parameters);
}

await context.Blogs.ExecuteUpdateAsync(setters);
```

Manually creating expression trees is complicated and error-prone, and made this common scenario much more difficult than it should have been. Starting with EF 10, you can now write the following instead:

```c#
await context.Blogs.ExecuteUpdateAsync(s =>
{
    s.SetProperty(b => b.Views, 8);
    if (nameChanged)
    {
        s.SetProperty(b => b.Name, "foo");
    }
});
```

### Complex type column names are now uniquified

Tracking Issue #4970

#### Old behavior

Previously, when mapping complex types to table columns, if multiple properties in different complex types had the same column name, they would silently share the same column.

#### New behavior

Starting with EF Core 10.0, complex type column names are uniquified by appending a number at the end if another column with the same name exists on the table.

#### Why

This prevents data corruption that could occur when multiple properties are unintentionally mapped to the same column.

#### Mitigations

If you need multiple properties to share the same column, configure them explicitly using `Microsoft.EntityFrameworkCore.Metadata.Builders.ComplexPropertyBuilder.Property*` and `Microsoft.EntityFrameworkCore.RelationalPropertyBuilderExtensions.HasColumnName*`:

```c#
modelBuilder.Entity<Customer>(b =>
{
    b.ComplexProperty(c => c.ShippingAddress, p => p.Property(a => a.Street).HasColumnName("Street"));
    b.ComplexProperty(c => c.BillingAddress, p => p.Property(a => a.Street).HasColumnName("Street"));
});
```

### Nested complex type properties use full path in column names

#### Old behavior

Previously, properties on nested complex types were mapped to columns using just the declaring type name. For example, `EntityType.Complex.NestedComplex.Property` was mapped to column `NestedComplex_Property`.

#### New behavior

Starting with EF Core 10.0, properties on nested complex types use the full path to the property as part of the column name. For example, `EntityType.Complex.NestedComplex.Property` is now mapped to column `Complex_NestedComplex_Property`.

#### Why

This provides better column name uniqueness and makes it clearer which property maps to which column.

#### Mitigations

If you need to maintain the old column names, configure them explicitly using `Microsoft.EntityFrameworkCore.Metadata.Builders.ComplexPropertyBuilder.Property*` and `Microsoft.EntityFrameworkCore.RelationalPropertyBuilderExtensions.HasColumnName*`:

```c#
modelBuilder.Entity<EntityType>()
    .ComplexProperty(e => e.Complex)
    .ComplexProperty(o => o.NestedComplex)
    .Property(c => c.Property)
    .HasColumnName("NestedComplex_Property");
```
