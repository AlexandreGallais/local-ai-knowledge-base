---
title: "What's New in EF Core 11 (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-11.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 11 (part 2 of 3)

## SQL Server

### VECTOR_SEARCH() and vector indexes

> **Warning:**
> `VECTOR_SEARCH()` and vector indexes are currently experimental features in SQL Server and are subject to change. The APIs in EF Core for these features are also subject to change.

In EF Core 10, we introduced translation for `EF.Functions.VectorDistance()`, which is a scalar function that computes the distance between two vectors. This function can be used in LINQ queries for vector similarity search, allowing you to find the most similar embeddings to a given embedding. However, `VectorDistance()` computes an _exact_ distance between the given vectors.

When querying large datasets, SQL Server 2025 also supports performing _approximate_ search over a vector index, which provides much better performance at the expense of returning items that are approximately similar - rather than exactly similar - to the query. EF 11 now supports creating vector indexes through migrations:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasVectorIndex(b => b.Embedding, "cosine");
}
```

Once you have a vector index, you can use the `VectorSearch()` extension method on your `DbSet`, and chain `Take()` and `WithApproximate()` to perform an approximate search:

```csharp
var blogs = await context.Blogs
    .VectorSearch(b => b.Embedding, embedding, "cosine")
    .OrderBy(r => r.Distance)
    .Take(5)
    .WithApproximate()
    .ToListAsync();
```

This translates to the SQL Server `VECTOR_SEARCH()` table-valued function. `Take()` specifies the number of results to return, and `WithApproximate()` instructs SQL Server to use the vector index for approximate nearest neighbor (ANN) search, adding `WITH APPROXIMATE` to the SQL `TOP` clause. Without `WithApproximate()`, an exact k-nearest neighbor (kNN) search is performed instead.

`VectorSearch()` returns `VectorSearchResult<TEntity>`, allowing you to access the distance alongside the entity.

For more information, see the full documentation on vector search.

### Vector properties not loaded by default

EF Core 11 changes how vector properties are loaded: `SqlVector<T>` columns are no longer included in `SELECT` statements when materializing entities. Since vectors can be quite large—containing hundreds or thousands of floating-point numbers—this avoids unnecessary data transfer in the common case where vectors are ingested and used for search but not read back.

```csharp
// Vector column is excluded from the projected entity
var blogs = await context.Blogs.OrderBy(b => b.Name).ToListAsync();
// Generates: SELECT [b].[Id], [b].[Name] FROM [Blogs] AS [b] ...

// Explicit projection still loads the vector
var embeddings = await context.Blogs
    .Select(b => new { b.Id, b.Embedding })
    .ToListAsync();
```

Vector properties can still be used in `WHERE` and `ORDER BY` clauses—including with `VectorDistance()` and `VectorSearch()`—and EF will correctly include them in the SQL, just not in the entity projection.

This optimization can have a dramatic impact on application speed: a minimal benchmark showed an almost 9x (that's nine-fold) increase in performance, and that's while running against a local database. The optimization is even more impactful as latency to the database grows: when executing against a remote Azure SQL database, an improvement of around 22x was observed. More details on the benchmark are available here, and as always, actual performance in your application will vary based on your entity, vector properties and latency.

### Full-text search improvements

#### Full-text search catalog and index creation

SQL Server's full-text search requires a full-text catalog and index to be set up on your database before you can use it. EF 11 now allows configuring full-text catalogs and indexes in your model, so that EF migrations can automatically create and manage them for you:

```csharp
// In your OnModelCreating:
modelBuilder.HasFullTextCatalog("ftCatalog");

modelBuilder.Entity<Blog>()
    .HasFullTextIndex(b => b.FullName)
    .UseKeyIndex("PK_Blogs")
    .UseCatalog("ftCatalog");
```

This generates the following SQL in a migration:

```sql
CREATE FULLTEXT CATALOG [ftCatalog];
CREATE FULLTEXT INDEX ON [Blogs]([FullName]) KEY INDEX [PK_Blogs] ON [ftCatalog];
```

Previously, full-text catalog and index creation had to be managed manually by adding SQL to migrations. For full details on setting up full-text catalogs and indexes, see the full-text search documentation.

#### Full-text search table-valued functions

EF Core has long provided support for SQL Server's full-text search predicates `FREETEXT()` and `CONTAINS()`, via `EF.Functions.FreeText()` and `EF.Functions.Contains()`. These predicates can be used in LINQ `Where()` clauses to filter results based on search criteria.

However, SQL Server also has table-valued function versions of these functions, `FREETEXTTABLE()` and `CONTAINSTABLE()`, which also return a ranking score along with the results, providing additional flexibility over the predicate versions. EF 11 now supports these table-valued functions:

```csharp
// Using FreeTextTable with a search query
var results = await context.Blogs
    .FreeTextTable("John", b => b.FullName)
    .Select(r => new { Blog = r.Value, Rank = r.Rank })
    .OrderByDescending(r => r.Rank)
    .ToListAsync();

// Using ContainsTable with a search query
var results = await context.Blogs
    .ContainsTable("John", b => b.FullName)
    .Select(r => new { Blog = r.Value, Rank = r.Rank })
    .OrderByDescending(r => r.Rank)
    .ToListAsync();
```

Both methods return `FullTextSearchResult<TEntity>`, giving you access to both the entity and the ranking value from SQL Server's full-text engine. This allows for more sophisticated result ordering and filtering based on relevance scores.

For more information, see the full documentation on full-text search.

#### Hybrid search

SQL Server vector search can be combined with full-text table-valued functions to implement _hybrid search_: full-text search finds exact linguistic matches, vector search finds semantically similar results, and the two rankings are merged. EF Core 11's `FullJoin` support makes this pattern more complete, since highly-ranked rows from either side can contribute to the final results:

```csharp
var results = await context.Articles
    .FreeTextTable<Article, int>(textualQuery, topN: k)
    .Join(
        context.Articles,
        fts => fts.Key,
        a => a.Id,
        (fts, a) => new { Article = a, fts.Rank })
    .FullJoin(
        context.Articles.VectorSearch(a => a.Embedding, queryEmbedding, "cosine")
            .OrderBy(r => r.Distance)
            .Take(k)
            .WithApproximate(),
        fts => fts.Article.Id,
        vs => vs.Value.Id,
        (fts, vs) => new
        {
            Article = fts != null ? fts.Article : vs.Value,
            FullTextRank = fts == null ? null : (int?)fts.Rank,
            VectorDistance = vs == null ? null : (double?)vs.Distance
        })
    .Select(x => new
    {
        x.Article,
        RrfScore = (x.FullTextRank == null ? 0.0 : 1.0 / (k + x.FullTextRank.Value))
            + (x.VectorDistance == null ? 0.0 : 1.0 / (k + x.VectorDistance.Value))
    })
    .OrderByDescending(x => x.RrfScore)
    .Take(10)
    .Select(x => x.Article)
    .ToListAsync();
```

For more information, see the SQL Server vector search documentation.

### Contains operations using JSON_CONTAINS

SQL Server 2025 introduced the `JSON_CONTAINS` function, which checks whether a value exists in a JSON document. Starting with EF Core 11, when targeting SQL Server 2025, LINQ `Contains` queries over primitive (or scalar) collections stored as JSON are translated to use this function, replacing the previous, less efficient `OPENJSON`-based translation.

The following query checks whether a blog's `Tags` collection contains a specific tag:

```csharp
var blogs = await context.Blogs
    .Where(b => b.Tags.Contains("ef-core"))
    .ToListAsync();
```

Before EF 11 - or when targeting older SQL Server versions - this generates the following SQL:

```sql
SELECT [b].[Id], [b].[Name], [b].[Tags]
FROM [Blogs] AS [b]
WHERE N'ef-core' IN (
    SELECT [t].[value]
    FROM OPENJSON([b].[Tags]) WITH ([value] nvarchar(max) '$') AS [t]
)
```

With EF 11, configure EF to target SQL Server 2025 by setting the compatibility level as follows:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer("<CONNECTION STRING>", o => o.UseCompatibilityLevel(170));
```

At that point, EF will instead generate the following SQL:

```sql
SELECT [b].[Id], [b].[Name], [b].[Tags]
FROM [Blogs] AS [b]
WHERE JSON_CONTAINS([b].[Tags], 'ef-core') = 1
```

`JSON_CONTAINS()` can notably make use of a JSON index, if one is defined.

> **Note:**
> `JSON_CONTAINS` does not support searching for null values. As a result, this translation is only applied when EF can determine that at least one side is non-nullable — either the item being searched for (e.g. a non-null constant or a non-nullable column), or the collection's elements. When this cannot be determined, EF falls back to the previous `OPENJSON`-based translation.

#### EF.Functions.JsonContains()

In the section above, EF Core automatically translates LINQ `Contains` queries over primitive collections to use the SQL Server `JSON_CONTAINS` function. In some cases, however, you may want to directly invoke `JSON_CONTAINS` yourself, for example to search for a value at a specific path, or to specify a search mode. For these cases, EF Core 11 introduces `EF.Functions.JsonContains()`.

The following query checks whether a blog's JSON data contains a specific value at a given path:

```csharp
var blogs = await context.Blogs
    .Where(b => EF.Functions.JsonContains(b.JsonData, 8, "$.Rating") == 1)
    .ToListAsync();
```

This generates the following SQL:

```sql
SELECT [b].[Id], [b].[Name], [b].[JsonData]
FROM [Blogs] AS [b]
WHERE JSON_CONTAINS([b].[JsonData], 8, N'$.Rating') = 1
```

`EF.Functions.JsonContains()` accepts the JSON value to search in, the value to search for, and optionally a JSON path and a search mode. It can be used with scalar string properties, complex types, and owned entity types mapped to JSON columns.

For the full `JSON_CONTAINS` SQL Server documentation, see `JSON_CONTAINS`.

### JSON indexes

EF Core 11 can create and scaffold SQL Server JSON indexes for paths inside complex types mapped to JSON columns:

```csharp
modelBuilder.Entity<Customer>()
    .ComplexProperty(c => c.Contact, b => b.ToJson().HasColumnType("json"));

modelBuilder.Entity<Customer>()
    .HasIndex("Contact.Address.City");
```

This generates SQL similar to:

```sql
CREATE JSON INDEX [IX_Customers_Contact_Address_City]
ON [Customers]([Contact]) FOR (N'$.Address.City');
```

For more information, see JSON indexes.

### Temporal period properties mapped to CLR properties

Previously, the period properties (`PeriodStart`/`PeriodEnd`) on temporal tables were required to be shadow properties, meaning they existed only in the EF model and not as CLR properties on your .NET entity types. Starting with EF Core 11, period properties can now be mapped to regular CLR properties on the entity type, making it easier to access their values directly without using `EF.Property`.

To map period columns to CLR properties, add `DateTime` properties to your entity type and configure them with the lambda-based `HasPeriodStart`/`HasPeriodEnd` overloads:

```csharp
public class Employee
{
    public Guid EmployeeId { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
}

modelBuilder
    .Entity<Employee>()
    .ToTable(
        "Employees",
        b => b.IsTemporal(
            b =>
            {
                b.HasPeriodStart(e => e.PeriodStart);
                b.HasPeriodEnd(e => e.PeriodEnd);
            }));
```

Once period properties are mapped to CLR properties, you can reference them directly in LINQ queries — for example, in `OrderBy`, `Select`, or `Where` clauses — without needing `EF.Property`:

```csharp
var history = context.Employees
    .TemporalAll()
    .OrderBy(e => e.PeriodStart)
    .Select(e => new { e.Name, e.PeriodStart, e.PeriodEnd })
    .ToList();
```

Period properties remain configured with `ValueGenerated.OnAddOrUpdate`, so their values are always generated by SQL Server and excluded from INSERT and UPDATE statements.

For more information, see the full documentation on temporal tables.

### Additional DateTimeOffset and date/time translations

EF Core 11 adds several new SQL Server translations for `DateTimeOffset`. Properties such as `DateTime`, `UtcDateTime`, and `LocalDateTime` are now translated, allowing you to access the `DateTime` component directly in your queries: `DateTime` returns the date and time component without converting the offset, while `UtcDateTime` and `LocalDateTime` represent UTC and server-local conversions, respectively. `Offset.TotalMinutes` is also translated, giving access to the offset component, and `ToOffset(offset)` allows converting a `DateTimeOffset` to a different offset via SQL Server's `SWITCHOFFSET`.

You can also now construct a `DateTimeOffset` from a `DateTime` directly in LINQ queries, using `new DateTimeOffset(dateTime)` or `new DateTimeOffset(dateTime, offset)`, which translates to SQL Server's `TODATETIMEOFFSET` function.

In addition, `EF.Functions.DateTrunc()` is now available for truncating `DateTime`, `DateTimeOffset`, `DateOnly` and `TimeOnly` values to a specified precision (e.g. day, hour, minute), translating to SQL Server's `DATETRUNC` function.

For the complete list of date/time function translations, see the SQL Server function mappings page.

### Other changes

* `Microsoft.EntityFrameworkCore.SqlServerDbContextOptionsExtensions.UseSqlServer*` now defaults to compatibility level 160 (SQL Server 2022), enabling SQL Server 2022-specific translations such as `LEAST` and `GREATEST` by default; see the breaking change note for more information.
