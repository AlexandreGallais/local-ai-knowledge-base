---
title: "What's New in EF Core 11 (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-11.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 11

EF Core 11.0 (EF11) is the next release after EF Core 10.0 and is currently in development.

> **Tip:**
> You can run and debug into the samples by downloading the sample code from GitHub. Each section below links to the source code specific to that section.

EF11 requires the .NET 11 SDK to build and requires the .NET 11 runtime to run. EF11 will not run on earlier .NET versions, and will not run on .NET Framework.

## Complex types

> **Tip:**
> For comprehensive documentation on complex types, see Complex types.

### Complex types and JSON columns on entity types with TPT/TPC inheritance

EF Core has supported complex types and JSON columns for several versions, allowing you to model and persist nested, structured data within your entities. However, until now these features could not be used on entities with TPT (table-per-type) or TPC (table-per-concrete-type) inheritance.

Starting with EF 11, you can now use complex types and JSON columns on entity types with TPT and TPC inheritance mappings. For example, consider the following entity types with a TPT inheritance strategy:

```csharp
public abstract class Animal
{
    public int Id { get; set; }
    public string Name { get; set; }
    public required AnimalDetails Details { get; set; }
}

public class Dog : Animal
{
    public string Breed { get; set; }
}

public class Cat : Animal
{
    public bool IsIndoor { get; set; }
}

[ComplexType]
public class AnimalDetails
{
    public DateTime BirthDate { get; set; }
    public string? Veterinarian { get; set; }
}
```

With the following TPT mapping configuration:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Animal>().UseTptMappingStrategy();
}
```

EF 11 now properly supports this scenario, creating the `Details_BirthDate` and `Details_Veterinarian` columns on the `Animal` table for the complex type properties.

Similarly, JSON columns are now supported with TPT/TPC. The following configuration maps the `Details` property to a JSON column:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Animal>()
        .UseTptMappingStrategy()
        .ComplexProperty(a => a.Details, b => b.ToJson());
}
```

This enhancement removes a significant limitation when modeling complex domain hierarchies, allowing you to combine the flexibility of TPT/TPC inheritance with the power of complex types and JSON columns.

For more information on inheritance mapping strategies, see Inheritance.

### Complex types in Azure Cosmos DB

Complex types are now fully supported in the Azure Cosmos DB provider, embedded as nested JSON objects or arrays. For more information, see the Cosmos DB section below.

### Configuring complex type properties via lambda chaining

Previously, configuring a property on a complex type required first calling `ComplexProperty` to get the complex type builder, and then calling `Property` on it:

```csharp
modelBuilder.Entity<MyEntity>()
    .ComplexProperty(e => e.Details)
    .Property(d => d.Description)
    .HasMaxLength(500);
```

EF Core 11 now allows configuring complex type properties directly by chaining member access in the lambda expression passed to `Property`:

```csharp
modelBuilder.Entity<MyEntity>()
    .Property(e => e.Details.Description)
    .HasMaxLength(500);
```

This simplifies model configuration by removing the need to explicitly navigate through intermediate complex type builders to reach the property you want to configure.

### Keys and indexes on complex type properties

Keys and indexes can now use scalar properties nested inside non-collection complex types:

```csharp
modelBuilder.Entity<Customer>()
    .HasKey(c => c.CustomerId.Value);

modelBuilder.Entity<Customer>()
    .HasIndex(c => c.Address.PostalCode);
```

The same paths can be configured by name:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex("Address.PostalCode");
```

For relational providers, indexes can also target paths inside complex types mapped to JSON columns. Complex collection paths use `[]` for all elements or a numeric indexer for a specific element:

```csharp
modelBuilder.Entity<Order>()
    .ComplexCollection(o => o.Items, b => b.ToJson());

modelBuilder.Entity<Order>()
    .HasIndex("Items[].Sku");
```

For more information, see Keys and Indexes.

### Stabilization and bug fixes

Significant effort has gone into making sure that complex type support is stable and bug-free, to unblock using complex types as an alternative to the owned entity mapping approach. Bugs fixed include:

* Error querying on complex type whose container is mapped to a table and a view
* Problem with ComplexProperty in EF9, when using the TPT approach
* Comparison of complex types does not compare properties within nested complex types
* Assignment of complex type does not assign nested properties correctly (ExecuteUpdate)
* Map two classes with same nullable complex properties to same column → NullReferenceException
* Complex property stored as JSON marked non-nullable in TPH class hierarchy
* EntityEntry.ReloadAsync throws when nullable complex property is null
* Unnecessary columns in SQL with Complex Types + object closures in projections

## LINQ and SQL translation

### Better SQL for to-one joins

EF Core 11 generates better SQL when querying with to-one (reference) navigation includes in two ways.

First, when using split queries (`AsSplitQuery()`), EF previously added unnecessary joins to reference navigations in the SQL generated for collection queries. For example, consider the following query:

```csharp
var blogs = context.Blogs
    .Include(b => b.BlogType)
    .Include(b => b.Posts)
    .AsSplitQuery()
    .ToList();
```

EF Core previously generated a split query for `Posts` that unnecessarily joined `BlogType`:

```sql
-- Before EF Core 11
SELECT [p].[Id], [p].[BlogId], [p].[Title], [b].[Id], [b0].[Id]
FROM [Blogs] AS [b]
INNER JOIN [BlogType] AS [b0] ON [b].[BlogTypeId] = [b0].[Id]
INNER JOIN [Post] AS [p] ON [b].[Id] = [p].[BlogId]
ORDER BY [b].[Id], [b0].[Id]
```

In EF Core 11, the unneeded join is pruned:

```sql
-- EF Core 11
SELECT [p].[Id], [p].[BlogId], [p].[Title], [b].[Id]
FROM [Blogs] AS [b]
INNER JOIN [Post] AS [p] ON [b].[Id] = [p].[BlogId]
ORDER BY [b].[Id]
```

Second, EF no longer adds redundant keys from reference navigations to `ORDER BY` clauses. Because a reference navigation's key is functionally determined by the parent entity's key (via the foreign key), it does not need to appear separately. For example:

```csharp
var blogs = context.Blogs
    .Include(b => b.Owner)
    .Include(b => b.Posts)
    .ToList();
```

EF Core previously included `[p].[PersonId]` in the `ORDER BY`, even though `[b].[BlogId]` already uniquely identifies the row:

```sql
-- Before EF Core 11
ORDER BY [b].[BlogId], [p].[PersonId]
```

In EF Core 11, the redundant column is omitted:

```sql
-- EF Core 11
ORDER BY [b].[BlogId]
```

Both optimizations can have a significant positive impact on query performance, especially when multiple reference navigations are included. A simple, common split query scenario showed a **29% improvement in querying performance**, as the database no longer has to perform the to-one join; single queries are also significantly improved by the removal of the ORDER BY, even if a bit less: one scenario showed a **22% improvement**.

More details on the benchmark are available here, and as always, actual performance in your application will vary based on your schema, data and a variety of other factors.

### GroupBy enhancements

EF Core 11 improves the translation and materialization of `GroupBy` queries. Queries can now compose navigation access and joins over a per-group top result, and aggregates over reference navigations are translated using joins before grouping rather than correlated subqueries. Left-joined non-entity projections, including anonymous types and DTOs, are also correctly materialized through joins and grouping. For more information, see #38479, #38499, #38555, #38577, #38668, and #38687.

### Support for the new .NET 11 `FullJoin` operator

.NET 11 adds first-class LINQ support for `FullJoin`, which keeps rows from both input collections and matches them when keys are equal. EF Core 11 translates this operator to `FULL JOIN` on relational databases:

```csharp
var results = await context.Customers
    .FullJoin(
        context.Orders,
        c => c.Id,
        o => o.CustomerId,
        (c, o) => new { Customer = c, Order = o })
    .ToListAsync();
```

This generates SQL similar to the following:

```sql
SELECT [c].[Id], [c].[Name], [o].[Id], [o].[CustomerId], [o].[OrderDate]
FROM [Customers] AS [c]
FULL JOIN [Orders] AS [o] ON [c].[Id] = [o].[CustomerId]
```

### Stripping of no-op CASTs

EF Core sometimes generated SQL `CAST` expressions that converted a column to the type it already stores — for example, `CAST([u].[Name] AS nvarchar(max))` on a column that is already `nvarchar(max)`. This commonly occurred with value-converted properties whose CLR type has an implicit conversion to the provider type, but could also happen in other scenarios. Such redundant casts produce unnecessary work and can prevent the database from using indexes on the column.

EF Core 11 now detects and strips these no-op `CAST` expressions during SQL post-processing. For example, the following query:

```sql
SELECT [u].[Id], [u].[Name]
FROM [Users] AS [u]
WHERE CAST([u].[Name] AS nvarchar(max)) LIKE N'Name%'
```

Now generates cleaner SQL:

```sql
SELECT [u].[Id], [u].[Name]
FROM [Users] AS [u]
WHERE [u].[Name] LIKE N'Name%'
```

This allows the database to use any index defined on the column, which can significantly improve query performance.

### MaxBy and MinBy

EF Core now supports translating the LINQ `MaxByAsync` and `MinByAsync` methods (and their sync counterparts). These methods allow you to find the element with the maximum or minimum value for a given key selector, rather than just the maximum or minimum value itself.

For example, to find the blog with the most posts:

```csharp
var blogWithMostPosts = await context.Blogs.MaxByAsync(b => b.Posts.Count());
```

This translates to the following SQL:

```sql
SELECT TOP(1) [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
ORDER BY (
    SELECT COUNT(*)
    FROM [Posts] AS [p]
    WHERE [b].[Id] = [p].[BlogId]) DESC
```

Similarly, `MinByAsync` orders ascending and returns the element with the minimum value for the key selector.

### EF.Functions.JsonPathExists()

EF Core 11 introduces `EF.Functions.JsonPathExists()`, which checks whether a given JSON path exists in a JSON document. On SQL Server, this translates to the `JSON_PATH_EXISTS` function (available since SQL Server 2022).

The following query filters blogs to those whose JSON data contains an `OptionalInt` property:

```csharp
var blogs = await context.Blogs
    .Where(b => EF.Functions.JsonPathExists(b.JsonData, "$.OptionalInt"))
    .ToListAsync();
```

This generates the following SQL:

```sql
SELECT [b].[Id], [b].[Name], [b].[JsonData]
FROM [Blogs] AS [b]
WHERE JSON_PATH_EXISTS([b].[JsonData], N'$.OptionalInt') = 1
```

`EF.Functions.JsonPathExists()` accepts a JSON value and a JSON path to check for. It can be used with scalar string properties, complex types, and owned entity types mapped to JSON columns.

For the full `JSON_PATH_EXISTS` SQL Server documentation, see `JSON_PATH_EXISTS`.
