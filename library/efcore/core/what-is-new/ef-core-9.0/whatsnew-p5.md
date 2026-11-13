---
title: "What's New in EF Core 9 (part 5 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-9.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 9 (part 5 of 7)

### Inlined uncorrelated subqueries

> **Tip:**
> The code shown here comes from QuerySample.cs.

In EF8, an IQueryable referenced in another query may be executed as a separate database roundtrip. For example, consider the following LINQ query:

```csharp
var dotnetPosts = context
    .Posts
    .Where(p => p.Title.Contains(".NET"));

var results = await dotnetPosts
    .Where(p => p.Id > 2)
    .Select(p => new { Post = p, TotalCount = dotnetPosts.Count() })
    .Skip(2).Take(10)
    .ToArrayAsync();
```

In EF8, the query for `dotnetPosts` is executed as one round trip, and then the final results are executed as second query. For example, on SQL Server:

```sql
SELECT COUNT(*)
FROM [Posts] AS [p]
WHERE [p].[Title] LIKE N'%.NET%'

SELECT [p].[Id], [p].[Archived], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText], [p].[Metadata]
FROM [Posts] AS [p]
WHERE [p].[Title] LIKE N'%.NET%' AND [p].[Id] > 2
ORDER BY (SELECT 1)
OFFSET @__p_1 ROWS FETCH NEXT @__p_2 ROWS ONLY
```

In EF9, the `IQueryable` in the `dotnetPosts` is inlined, resulting in a single database round trip:

```sql
SELECT [p].[Id], [p].[Archived], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText], [p].[Metadata], (
    SELECT COUNT(*)
    FROM [Posts] AS [p0]
    WHERE [p0].[Title] LIKE N'%.NET%')
FROM [Posts] AS [p]
WHERE [p].[Title] LIKE N'%.NET%' AND [p].[Id] > 2
ORDER BY (SELECT 1)
OFFSET @__p_0 ROWS FETCH NEXT @__p_1 ROWS ONLY
```

### Aggregate functions over subqueries and aggregates on SQL Server

EF9 improves the translation of some complex queries using aggregate functions composed over subqueries or other aggregate functions.
Below is an example of such query:

```csharp
var latestPostsAverageRatingByLanguage = await context.Blogs
    .Select(x => new
    {
        x.Language,
        LatestPostRating = x.Posts.OrderByDescending(xx => xx.PublishedOn).FirstOrDefault()!.Rating
    })
    .GroupBy(x => x.Language)
    .Select(x => x.Average(xx => xx.LatestPostRating))
    .ToListAsync();
```

First, `Select` computes `LatestPostRating` for each `Post` which requires a subquery when translating to SQL. Later in the query these results are aggregated using `Average` operation. The resulting SQL looks as follows when run on SQL Server:

```sql
SELECT AVG([s].[Rating])
FROM [Blogs] AS [b]
OUTER APPLY (
    SELECT TOP(1) [p].[Rating]
    FROM [Posts] AS [p]
    WHERE [b].[Id] = [p].[BlogId]
    ORDER BY [p].[PublishedOn] DESC
) AS [s]
GROUP BY [b].[Language]
```

In previous versions EF Core would generate invalid SQL for similar queries, trying to apply the aggregate operation directly over the subquery. This is not allowed on SQL Server and results in an exception.
Same principle applies to queries using aggregate over another aggregate:

```csharp
var topRatedPostsAverageRatingByLanguage = await context.Blogs.
Select(x => new
{
    x.Language,
    TopRating = x.Posts.Max(x => x.Rating)
})
.GroupBy(x => x.Language)
.Select(x => x.Average(xx => xx.TopRating))
.ToListAsync();
```

> **Note:**
> This change doesn't affect Sqlite, which supports aggregates over subqueries (or other aggregates) and it does not support `LATERAL JOIN` (`APPLY`). Below is the SQL for the first query running on Sqlite:
>
> ```sql
> SELECT ef_avg((
>     SELECT "p"."Rating"
>     FROM "Posts" AS "p"
>     WHERE "b"."Id" = "p"."BlogId"
>     ORDER BY "p"."PublishedOn" DESC
>     LIMIT 1))
> FROM "Blogs" AS "b"
> GROUP BY "b"."Language"
> ```

### Queries using Count != 0 are optimized

> **Tip:**
> The code shown here comes from QuerySample.cs.

In EF8, the following LINQ query was translated to use the SQL `COUNT` function:

```csharp
var blogsWithPost = await context.Blogs
    .Where(b => b.Posts.Count > 0)
    .ToListAsync();
```

EF9 now generates a more efficient translation using `EXISTS`:

```sql
SELECT "b"."Id", "b"."Name", "b"."SiteUri"
FROM "Blogs" AS "b"
WHERE EXISTS (
    SELECT 1
    FROM "Posts" AS "p"
    WHERE "b"."Id" = "p"."BlogId")
```

### C# semantics for comparison operations on nullable values

In EF8 comparisons between nullable elements were not performed correctly for some scenarios. In C#, if one or both operands are null, the result of a comparison operation is false; otherwise, the contained values of operands are compared. In EF8 we used to translate comparisons using database null semantics. This would produce results different than similar query using LINQ to Objects.
Moreover, we would produce different results when comparison was done in filter vs projection. Some queries would also produce different results between Sql Server and Sqlite/Postgres.

For example, the query:

```csharp
var negatedNullableComparisonFilter = await context.Entities
    .Where(x => !(x.NullableIntOne > x.NullableIntTwo))
    .Select(x => new { x.NullableIntOne, x.NullableIntTwo }).ToListAsync();
```

would generate the following SQL:

```sql
SELECT [e].[NullableIntOne], [e].[NullableIntTwo]
FROM [Entities] AS [e]
WHERE NOT ([e].[NullableIntOne] > [e].[NullableIntTwo])
```

which filters out entities whose `NullableIntOne` or `NullableIntTwo` are set to null.

In EF9 we produce:

```sql
SELECT [e].[NullableIntOne], [e].[NullableIntTwo]
FROM [Entities] AS [e]
WHERE CASE
    WHEN [e].[NullableIntOne] > [e].[NullableIntTwo] THEN CAST(0 AS bit)
    ELSE CAST(1 AS bit)
END = CAST(1 AS bit)
```

Similar comparison performed in a projection:

```csharp
var negatedNullableComparisonProjection = await context.Entities.Select(x => new
{
    x.NullableIntOne,
    x.NullableIntTwo,
    Operation = !(x.NullableIntOne > x.NullableIntTwo)
}).ToListAsync();
```

resulted in the following SQL:

```sql
SELECT [e].[NullableIntOne], [e].[NullableIntTwo], CASE
    WHEN NOT ([e].[NullableIntOne] > [e].[NullableIntTwo]) THEN CAST(1 AS bit)
    ELSE CAST(0 AS bit)
END AS [Operation]
FROM [Entities] AS [e]
```

which returns `false` for entities whose `NullableIntOne` or `NullableIntTwo` are set to null (rather than `true` expected in C#). Running the same scenario on Sqlite generated:

```sql
SELECT "e"."NullableIntOne", "e"."NullableIntTwo", NOT ("e"."NullableIntOne" > "e"."NullableIntTwo") AS "Operation"
FROM "Entities" AS "e"
```

which results in `Nullable object must have a value` exception, as translation produces `null` value for cases where `NullableIntOne` or `NullableIntTwo` are null.

EF9 now properly handles these scenarios, producing results consistent with LINQ to Objects and across different providers.

This enhancement was contributed by @ranma42. Many thanks!

### Translation of `Order` and `OrderDescending` LINQ operators

EF9 enables the translation of LINQ simplified ordering operations (`Order` and `OrderDescending`). These work similar to `OrderBy`/`OrderByDescending` but don't require an argument. Instead, they apply default ordering - for entities this means ordering based on primary key values and for other types, ordering based on the values themselves.

Below is an example query which takes advantage of the simplified ordering operators:

```csharp
var orderOperation = await context.Blogs
    .Order()
    .Select(x => new
    {
        x.Name,
        OrderedPosts = x.Posts.OrderDescending().ToList(),
        OrderedTitles = x.Posts.Select(xx => xx.Title).Order().ToList()
    })
    .ToListAsync();
```

This query is equivalent to the following:

```csharp
var orderByEquivalent = await context.Blogs
    .OrderBy(x => x.Id)
    .Select(x => new
    {
        x.Name,
        OrderedPosts = x.Posts.OrderByDescending(xx => xx.Id).ToList(),
        OrderedTitles = x.Posts.Select(xx => xx.Title).OrderBy(xx => xx).ToList()
    })
    .ToListAsync();
```

and produces the following SQL:

```sql
SELECT [b].[Name], [b].[Id], [p].[Id], [p].[Archived], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Rating], [p].[Title], [p].[PromoText], [p].[Metadata], [p0].[Title], [p0].[Id]
FROM [Blogs] AS [b]
LEFT JOIN [Posts] AS [p] ON [b].[Id] = [p].[BlogId]
LEFT JOIN [Posts] AS [p0] ON [b].[Id] = [p0].[BlogId]
ORDER BY [b].[Id], [p].[Id] DESC, [p0].[Title]
```

> **Note:**
> `Order` and `OrderDescending` methods are only supported for collections of entities, complex types or scalars - they will not work on more complex projections, e.g. collections of anonymous types containing multiple properties.

This enhancement was contributed by the EF Team alumnus @bricelam. Many thanks!

### Improved translation of logical negation operator (!)

EF9 brings many optimizations around SQL `CASE/WHEN`, `COALESCE`, negation, and various other constructs; most of these were contributed by Andrea Canciani (@ranma42) - many thanks for all of these! Below, we'll detail just a few of these optimizations around logical negation.

Let's examine the following query:

```csharp
var negatedContainsSimplification = await context.Posts
    .Where(p => !p.Content.Contains("Announcing"))
    .Select(p => new { p.Content }).ToListAsync();
```

In EF8 we would produce the following SQL:

```sql
SELECT "p"."Content"
FROM "Posts" AS "p"
WHERE NOT (instr("p"."Content", 'Announcing') > 0)
```

In EF9 we "push" `NOT` operation into the comparison:

```sql
SELECT "p"."Content"
FROM "Posts" AS "p"
WHERE instr("p"."Content", 'Announcing') <= 0
```

Another example, applicable to SQL Server, is a negated conditional operation.

```csharp
var caseSimplification = await context.Blogs
    .Select(b => !(b.Id > 5 ? false : true))
    .ToListAsync();
```

In EF8 used to result in nested `CASE` blocks:

```sql
SELECT CASE
    WHEN CASE
        WHEN [b].[Id] > 5 THEN CAST(0 AS bit)
        ELSE CAST(1 AS bit)
    END = CAST(0 AS bit) THEN CAST(1 AS bit)
    ELSE CAST(0 AS bit)
END
FROM [Blogs] AS [b]
```

In EF9 we removed the nesting:

```sql
SELECT CASE
    WHEN [b].[Id] > 5 THEN CAST(1 AS bit)
    ELSE CAST(0 AS bit)
END
FROM [Blogs] AS [b]
```

On SQL Server, when projecting a negated bool property:

```csharp
var negatedBoolProjection = await context.Posts.Select(x => new { x.Title, Active = !x.Archived }).ToListAsync();
```

 EF8 would generate a `CASE` block because comparisons can't appear in the projection directly in SQL Server queries:

 ```sql
SELECT [p].[Title], CASE
    WHEN [p].[Archived] = CAST(0 AS bit) THEN CAST(1 AS bit)
    ELSE CAST(0 AS bit)
END AS [Active]
FROM [Posts] AS [p]
 ```

In EF9, this translation has been simplified and now uses bitwise NOT (`~`):

```sql
SELECT [p].[Title], ~[p].[Archived] AS [Active]
FROM [Posts] AS [p]
```

### Better support for Azure SQL and Azure Synapse

EF9 allows for more flexibility when specifying the type of SQL Server which is being targeted. Instead of configuring EF with `UseSqlServer`, you can now specify `UseAzureSql` or `UseAzureSynapse`.
This allows EF to produce better SQL when using Azure SQL or Azure Synapse. EF can take advantage of the database specific features (e.g. dedicated type for JSON on Azure SQL), or work around its limitations (e.g. `ESCAPE` clause is not available when using `LIKE` on Azure Synapse).

### Other query improvements

* The primitive collections querying support introduced in EF8 has been extended to support all `ICollection<T>` types. Note that this applies only to parameter and inline collections - primitive collections that are part of entities are still limited to arrays, lists and in EF9 also read-only arrays/lists.
* New `ToHashSetAsync` functions to return the results of a query as a `HashSet` (#30033, contributed by @wertzui).
* `TimeOnly.FromDateTime` and `FromTimeSpan` are now translated on SQL Server (#33678).
* `ToString` over enums is now translated (#33706, contributed by @Danevandy99).
* `string.Join` now translates to CONCAT_WS in non-aggregate context on SQL Server (#28899).
* `EF.Functions.PatIndex` now translates to the SQL Server `PATINDEX` function, which returns the starting position of the first occurrence of a pattern (#33702, @smnsht).
* `Sum` and `Average` now work for decimals on SQLite (#33721, contributed by @ranma42).
* Fixes and optimizations to `string.StartsWith` and `EndsWith` (#31482).
* `Convert.To*` methods can now accept argument of type `object` (#33891, contributed by @imangd).
* Exclusive-Or (XOR) operation is now translated on SQL Server (#34071, contributed by @ranma42).
* Optimizations around nullability for `COLLATE` and `AT TIME ZONE` operations (#34263, contributed by @ranma42).
* Optimizations for `DISTINCT` over `IN`, `EXISTS` and set operations (#34381, contributed by @ranma42).

The above were only some of the more important query improvements in EF9; see this issue for a more complete listing.
