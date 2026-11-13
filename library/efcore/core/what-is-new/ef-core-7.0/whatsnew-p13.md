---
title: "What's New in EF Core 7.0 (part 13 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 13 of 16)

## Query enhancements

EF7 contains many improvements in the translation of LINQ queries.

### GroupBy as final operator

> **Tip:**
> The code shown here comes from GroupByFinalOperatorSample.cs.

EF7 supports using `GroupBy` as the final operator in a query. For example, this LINQ query:

```csharp
var query = context.Books.GroupBy(s => s.Price);
```

Translates to the following SQL when using SQL Server:

```sql
SELECT [b].[Price], [b].[Id], [b].[AuthorId]
FROM [Books] AS [b]
ORDER BY [b].[Price]
```

> **Note:**
> This type of `GroupBy` does not translate directly to SQL, so EF Core does the grouping on the returned results. However, this does not result in any additional data being transferred from the server.

### GroupJoin as final operator

> **Tip:**
> The code shown here comes from GroupJoinFinalOperatorSample.cs.

EF7 supports using `GroupJoin` as the final operator in a query. For example, this LINQ query:

```csharp
var query = context.Customers.GroupJoin(
    context.Orders, c => c.Id, o => o.CustomerId, (c, os) => new { Customer = c, Orders = os });
```

Translates to the following SQL when using SQL Server:

```sql
SELECT [c].[Id], [c].[Name], [t].[Id], [t].[Amount], [t].[CustomerId]
FROM [Customers] AS [c]
OUTER APPLY (
    SELECT [o].[Id], [o].[Amount], [o].[CustomerId]
    FROM [Orders] AS [o]
    WHERE [c].[Id] = [o].[CustomerId]
) AS [t]
ORDER BY [c].[Id]
```

### GroupBy entity type

> **Tip:**
> The code shown here comes from GroupByEntityTypeSample.cs.

EF7 supports grouping by an entity type. For example, this LINQ query:

```csharp
var query = context.Books
    .GroupBy(s => s.Author)
    .Select(s => new { Author = s.Key, MaxPrice = s.Max(p => p.Price) });
```

Translates to the following SQL when using SQLite:

```sql
SELECT [a].[Id], [a].[Name], MAX([b].[Price]) AS [MaxPrice]
FROM [Books] AS [b]
INNER JOIN [Author] AS [a] ON [b].[AuthorId] = [a].[Id]
GROUP BY [a].[Id], [a].[Name]
```

Keep in mind that grouping by a unique property, such as the primary key, will always be more efficient than grouping by an entity type. However, grouping by entity types can be used for both keyed and keyless entity types.

Also, grouping by an entity type with a primary key will always result in one group per entity instance, since every entity must have a unique key value. It is sometimes worth switching the source of the query so that grouping in not required. For example, the following query returns the same results as the previous query:

```csharp
var query = context.Authors
    .Select(a => new { Author = a, MaxPrice = a.Books.Max(b => b.Price) });
```

This query translates to the following SQL when using SQLite:

```sql
SELECT [a].[Id], [a].[Name], (
    SELECT MAX([b].[Price])
    FROM [Books] AS [b]
    WHERE [a].[Id] = [b].[AuthorId]) AS [MaxPrice]
FROM [Authors] AS [a]
```

### Subqueries don't reference ungrouped columns from outer query

> **Tip:**
> The code shown here comes from UngroupedColumnsQuerySample.cs.

In EF Core 6.0, a `GROUP BY` clause would reference columns in the outer query, which fails with some databases and is inefficient in others. For example, consider the following query:

```csharp
var query = from s in (from i in context.Invoices
                       group i by i.History.Month
                       into g
                       select new { Month = g.Key, Total = g.Sum(p => p.Amount), })
            select new
            {
                s.Month, s.Total, Payment = context.Payments.Where(p => p.History.Month == s.Month).Sum(p => p.Amount)
            };
```

In EF Core 6.0 on SQL Server, this was translated to:

```sql
SELECT DATEPART(month, [i].[History]) AS [Month], COALESCE(SUM([i].[Amount]), 0.0) AS [Total], (
    SELECT COALESCE(SUM([p].[Amount]), 0.0)
    FROM [Payments] AS [p]
    WHERE DATEPART(month, [p].[History]) = DATEPART(month, [i].[History])) AS [Payment]
FROM [Invoices] AS [i]
GROUP BY DATEPART(month, [i].[History])
```

On EF7, the translation is:

```sql
SELECT [t].[Key] AS [Month], COALESCE(SUM([t].[Amount]), 0.0) AS [Total], (
    SELECT COALESCE(SUM([p].[Amount]), 0.0)
    FROM [Payments] AS [p]
    WHERE DATEPART(month, [p].[History]) = [t].[Key]) AS [Payment]
FROM (
    SELECT [i].[Amount], DATEPART(month, [i].[History]) AS [Key]
    FROM [Invoices] AS [i]
) AS [t]
GROUP BY [t].[Key]
```

### Read-only collections can be used for `Contains`

> **Tip:**
> The code shown here comes from ReadOnlySetQuerySample.cs.

EF7 supports using `Contains` when the items to search for are contained in an `IReadOnlySet` or `IReadOnlyCollection`, or `IReadOnlyList`. For example, this LINQ query:

```csharp
IReadOnlySet<int> searchIds = new HashSet<int> { 1, 3, 5 };
var query = context.Customers.Where(p => p.Orders.Any(l => searchIds.Contains(l.Id)));
```

Translates to the following SQL when using SQL Server:

```sql
SELECT [c].[Id], [c].[Name]
FROM [Customers] AS [c]
WHERE EXISTS (
    SELECT 1
    FROM [Orders] AS [o]
    WHERE [c].[Id] = [o].[Customer1Id] AND [o].[Id] IN (1, 3, 5))
```

### Translations for aggregate functions

EF7 introduces better extensibility for providers to translate aggregate functions. This and other work in this area have resulted in several new translations across providers, including:

- Translation of `String.Join` and `String.Concat`
- Translation of spatial aggregate functions
- Translation of statistics aggregate functions

> **Note:**
> Aggregate functions that act on `IEnumerable` argument are typically only translated in `GroupBy` queries. Vote for Support spatial types in JSON columns if you are interested in getting this limitation removed.

#### String aggregate functions

> **Tip:**
> The code shown here comes from StringAggregateFunctionsSample.cs.

Queries using `System.String.Join*` and `System.String.Concat*` are now translated when appropriate. For example:

```csharp
var query = context.Posts
    .GroupBy(post => post.Author)
    .Select(grouping => new { Author = grouping.Key, Books = string.Join("|", grouping.Select(post => post.Title)) });
```

This query translates to the following when using SQL Server:

```sql
SELECT [a].[Id], [a].[Name], COALESCE(STRING_AGG([p].[Title], N'|'), N'') AS [Books]
FROM [Posts] AS [p]
LEFT JOIN [Authors] AS [a] ON [p].[AuthorId] = [a].[Id]
GROUP BY [a].[Id], [a].[Name]
```

When combined with other string functions, these translations allow for some complex string manipulation on the server. For example:

```csharp
var query = context.Posts
    .GroupBy(post => post.Author!.Name)
    .Select(
        grouping =>
            new
            {
                PostAuthor = grouping.Key,
                Blogs = string.Concat(
                    grouping
                        .Select(post => post.Blog.Name)
                        .Distinct()
                        .Select(postName => "'" + postName + "' ")),
                ContentSummaries = string.Join(
                    " | ",
                    grouping
                        .Where(post => post.Content.Length >= 10)
                        .Select(post => "'" + post.Content.Substring(0, 10) + "' "))
            });
```

This query translates to the following when using SQL Server:

```sql
SELECT [t].[Name], (N'''' + [t0].[Name]) + N''' ', [t0].[Name], [t].[c]
FROM (
    SELECT [a].[Name], COALESCE(STRING_AGG(CASE
        WHEN CAST(LEN([p].[Content]) AS int) >= 10 THEN COALESCE((N'''' + COALESCE(SUBSTRING([p].[Content], 0 + 1, 10), N'')) + N''' ', N'')
    END, N' | '), N'') AS [c]
    FROM [Posts] AS [p]
    LEFT JOIN [Authors] AS [a] ON [p].[AuthorId] = [a].[Id]
    GROUP BY [a].[Name]
) AS [t]
OUTER APPLY (
    SELECT DISTINCT [b].[Name]
    FROM [Posts] AS [p0]
    LEFT JOIN [Authors] AS [a0] ON [p0].[AuthorId] = [a0].[Id]
    INNER JOIN [Blogs] AS [b] ON [p0].[BlogId] = [b].[Id]
    WHERE [t].[Name] = [a0].[Name] OR ([t].[Name] IS NULL AND [a0].[Name] IS NULL)
) AS [t0]
ORDER BY [t].[Name]
```

#### Spatial aggregate functions

> **Tip:**
> The code shown here comes from SpatialAggregateFunctionsSample.cs.

It is now possible for database providers that support for NetTopologySuite to translate the following spatial aggregate functions:

- GeometryCombiner.Combine()
- UnaryUnionOp.Union()
- ConvexHull.Create()
- EnvelopeCombiner.CombineAsGeometry()

> **Tip:**
> These translations have been implemented by the team for SQL Server and SQLite. For other providers, contact the provider maintainer to add support if it has been implemented for that provider.

For example:

```csharp
var query = context.Caches
    .Where(cache => cache.Location.X < -90)
    .GroupBy(cache => cache.Owner)
    .Select(
        grouping => new { Id = grouping.Key, Combined = GeometryCombiner.Combine(grouping.Select(cache => cache.Location)) });
```

This query is translated to the following SQL when using SQL Server:

```sql
SELECT [c].[Owner] AS [Id], geography::CollectionAggregate([c].[Location]) AS [Combined]
FROM [Caches] AS [c]
WHERE [c].[Location].Long < -90.0E0
GROUP BY [c].[Owner]
```

#### Statistical aggregate functions

> **Tip:**
> The code shown here comes from StatisticalAggregateFunctionsSample.cs.

SQL Server translations have been implemented for the following statistical functions:

- `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.StandardDeviationSample*`
- `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.StandardDeviationPopulation*`
- `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.VarianceSample*`
- `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.VariancePopulation*`

> **Tip:**
> These translations have been implemented by the team for SQL Server. For other providers, contact the provider maintainer to add support if it has been implemented for that provider.

For example:

```csharp
var query = context.Downloads
    .GroupBy(download => download.Uploader.Id)
    .Select(
        grouping => new
        {
            Author = grouping.Key,
            TotalCost = grouping.Sum(d => d.DownloadCount),
            AverageViews = grouping.Average(d => d.DownloadCount),
            VariancePopulation = EF.Functions.VariancePopulation(grouping.Select(d => d.DownloadCount)),
            VarianceSample = EF.Functions.VarianceSample(grouping.Select(d => d.DownloadCount)),
            StandardDeviationPopulation = EF.Functions.StandardDeviationPopulation(grouping.Select(d => d.DownloadCount)),
            StandardDeviationSample = EF.Functions.StandardDeviationSample(grouping.Select(d => d.DownloadCount))
        });
```

This query is translated to the following SQL when using SQL Server:

```sql
SELECT [u].[Id] AS [Author], COALESCE(SUM([d].[DownloadCount]), 0) AS [TotalCost], AVG(CAST([d].[DownloadCount] AS float)) AS [AverageViews], VARP([d].[DownloadCount]) AS [VariancePopulation], VAR([d].[DownloadCount]) AS [VarianceSample], STDEVP([d].[DownloadCount]) AS [StandardDeviationPopulation], STDEV([d].[DownloadCount]) AS [StandardDeviationSample]
FROM [Downloads] AS [d]
INNER JOIN [Uploader] AS [u] ON [d].[UploaderId] = [u].[Id]
GROUP BY [u].[Id]
```

### Translation of `string.IndexOf`

> **Tip:**
> The code shown here comes from MiscellaneousTranslationsSample.cs.

EF7 now translates `System.String.IndexOf*` in LINQ queries. For example:

```csharp
var query = context.Posts
    .Select(post => new { post.Title, IndexOfEntity = post.Content.IndexOf("Entity") })
    .Where(post => post.IndexOfEntity > 0);
```

This query translates to the following SQL when using SQL Server:

```sql
SELECT [p].[Title], CAST(CHARINDEX(N'Entity', [p].[Content]) AS int) - 1 AS [IndexOfEntity]
FROM [Posts] AS [p]
WHERE (CAST(CHARINDEX(N'Entity', [p].[Content]) AS int) - 1) > 0
```

### Translation of `GetType` for entity types

> **Tip:**
> The code shown here comes from MiscellaneousTranslationsSample.cs.

EF7 now translates `System.Object.GetType` in LINQ queries. For example:

```csharp
var query = context.Posts.Where(post => post.GetType() == typeof(Post));
```

This query translates to the following SQL when using SQL Server with TPH inheritance:

```sql
SELECT [p].[Id], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText]
FROM [Posts] AS [p]
WHERE [p].[Discriminator] = N'Post'
```

Notice that this query returns only `Post` instances that are actually of type `Post`, and not those of any derived types. This is different from a query that uses `is` or `OfType`, which will also return instances of any derived types. For example, consider the query:

```csharp
var query = context.Posts.OfType<Post>();
```

Which translates to different SQL:

```sql
      SELECT [p].[Id], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText]
      FROM [Posts] AS [p]
```

And will return both `Post` and `FeaturedPost` entities.

### Support for `AT TIME ZONE`

> **Tip:**
> The code shown here comes from MiscellaneousTranslationsSample.cs.

EF7 introduces new `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.AtTimeZone*` functions for `System.DateTime` and `System.DateTimeOffset`. These functions translate to `AT TIME ZONE` clauses in the generated SQL. For example:

```csharp
var query = context.Posts
    .Select(
        post => new
        {
            post.Title,
            PacificTime = EF.Functions.AtTimeZone(post.PublishedOn, "Pacific Standard Time"),
            UkTime = EF.Functions.AtTimeZone(post.PublishedOn, "GMT Standard Time"),
        });
```

This query translates to the following SQL when using SQL Server:

```sql
SELECT [p].[Title], [p].[PublishedOn] AT TIME ZONE 'Pacific Standard Time' AS [PacificTime], [p].[PublishedOn] AT TIME ZONE 'GMT Standard Time' AS [UkTime]
FROM [Posts] AS [p]
```

> **Tip:**
> These translations have been implemented by the team for SQL Server. For other providers, contact the provider maintainer to add support if it has been implemented for that provider.
