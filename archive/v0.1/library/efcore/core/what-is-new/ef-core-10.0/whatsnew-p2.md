---
title: "What's New in EF Core 10 (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-10.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 10 (part 2 of 3)

## LINQ and SQL translation

### Improved translation for parameterized collection

A notoriously difficult problem with relational databases is queries that involve *parameterized collections*:

```c#
int[] ids = [1, 2, 3];
var blogs = await context.Blogs.Where(b => ids.Contains(b.Id)).ToListAsync();
```

In the above query, `ids` is a parameterized collection: the same query can be executed many times, with `ids` containing different values each time.

Since relational databases don't typically support sending a collection directly as a parameter, EF version up to 8.0 simply inlined the collection contents into the SQL as constants:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Id] IN (1, 2, 3)
```

While this works, it has the unfortunate consequence of generating different SQLs for different collections, causing database plan cache misses and bloat, and creating various performance problems (see #13617, which was the most highly-voted issue in the repo at the time). As a result, EF 8.0 leveraged the introduction of extensive JSON support and changed the translation of parameterized collections to use JSON arrays (release notes):

```sql
@__ids_0='[1,2,3]'

SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Id] IN (
    SELECT [i].[value]
    FROM OPENJSON(@__ids_0) WITH ([value] int '$') AS [i]
)
```

Here, the collection is encoded as a string containing a JSON array, sent as a single parameter and then unpacked using the SQL Server `OPENJSON` function (other databases use similar mechanisms). Since the collection is now parameterized, the SQL stays the same and a single query plan no matter what values the collection contains. Unfortunately, while elegant, this translation also deprives the database query planner of important information on the cardinality (or length) of the collection, and can cause a plan to be chosen that works well for a small - or large - number of elements. As a result, EF Core 9.0 introduced the ability to control which translation strategy to use (release notes).

EF 10.0 introduces a new default translation mode for parameterized collections, where each value in the collection is translated into its own scalar parameter:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Id] IN (@ids1, @ids2, @ids3)
```

This allows the collection values to change without resulting in different SQLs - solving the plan cache problem - but at the same time provides the query planner with information on the collection cardinality.

Since different cardinalities still cause different SQLs to be generated, EF also "pads" parameter list. For example, if your `ids` list contains 8 values, EF generates SQL with 10 parameters:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[Id] IN (@ids1, @ids2, @ids3, @ids4, @ids5, @ids6, @ids7, @ids8, @ids9, @ids10)
```

The last two parameters `@ids9` and `@ids10` are added by EF to reduce the number of SQLs generated, and contain the same value as `@ids8`, so that the query returns the same result.

Unfortunately, parameterized collections are a case where EF simply cannot always make the right choice: selecting between multiple parameters (the new default), a single JSON array parameter (with e.g. SQL Server `OPENJSON`) or multiple inlined constants can require knowledge about the data in your database, and different choices may work better for different queries. As a result, EF exposes full control to the user to control the translation strategy, both at the global configuration level:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer("<CONNECTION STRING>", o => o.UseParameterizedCollectionMode(ParameterTranslationMode.Constant));
```

... and at the per-query level:

```c#
var blogs = await context.Blogs.Where(b => EF.Constant(ids).Contains(b.Id)).ToListAsync();
```

### Support for the .NET 10 `LeftJoin` and `RightJoin` operators

`LEFT JOIN` is a common and useful operation when working with EF Core. In previous versions, implementing `LEFT JOIN` in LINQ was quite complicated, requiring `SelectMany`, `GroupJoin` and `DefaultIfEmpty` operations in a particular configuration.

.NET 10 adds first-class LINQ support for `LeftJoin` method, making those queries much simpler to write. EF Core recognizes the new method, so it can be used in EF LINQ queries instead of the old construct:

```c#
var query = context.Students
    .LeftJoin(
        context.Departments,
        student => student.DepartmentID,
        department => department.ID,
        (student, department) => new 
        { 
            student.FirstName,
            student.LastName,
            Department = department.Name ?? "[NONE]"
        });
```

> **Note:**
> EF 10 also supports the analogous `RightJoin` operator, which keeps all the data from the second collection and only the matching data from the first collection. EF 10 translates this to `RIGHT JOIN` operation in the database.

Unfortunately, C# query syntax (`from x select x.Id`) doesn't yet support expressing left/right join operations in this way.

See #12793 and #35367 for more details.

### More consistent ordering for split queries

Split queries can be essential to avoid performance issues associated with JOINs, such as the so-called "cartesian explosion" effect (see Single vs. Split Queries to learn more). However, since split queries loads related data in separate SQL queries, consistency issues can arise, possibly leading to non-deterministic, hard-to-detect data corruption.

For example, consider the following query:

```c#
var blogs = await context.Blogs
    .AsSplitQuery()
    .Include(b => b.Posts)
    .OrderBy(b => b.Name)
    .Take(2)
    .ToListAsync();
```

Prior to EF10, the following two SQL queries were generated:

```sql
SELECT TOP(@__p_0) [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
ORDER BY [b].[Name], [b].[Id]

SELECT [p].[Id], [p].[BlogId], [p].[Title], [b0].[Id]
FROM (
    SELECT TOP(@__p_0) [b].[Id], [b].[Name]
    FROM [Blogs] AS [b]
    ORDER BY [b].[Name]
) AS [b0]
INNER JOIN [Post] AS [p] ON [b0].[Id] = [p].[BlogId]
ORDER BY [b0].[Name], [b0].[Id]
```

Note that the first query (the one reading Blogs) is integrated as a subquery within the second (the one reading Posts). However, the ordering within the subquery omits the `Id` column, leading to possible incorrect data being returned.

EF10 fixes this by ensuring that the ordering is consistent across the queries:

```sql
SELECT [p].[Id], [p].[BlogId], [p].[Title], [b0].[Id]
FROM (
    SELECT TOP(@p) [b].[Id], [b].[Name]
    FROM [Blogs] AS [b]
    ORDER BY [b].[Name], [b].[Id]
) AS [b0]
INNER JOIN [Post] AS [p] ON [b0].[Id] = [p].[BlogId]
ORDER BY [b0].[Name], [b0].[Id]
```

### Other query improvements

#### New translations

- Translate DateOnly.ToDateTime() (#35194, contributed by @mseada94).
- Translate DateOnly.DayNumber and `DayNumber` subtraction for SQL Server and SQLite (#36183).
- Translate date/time functions using `DatePart.Microsecond` and `DatePart.Nanosecond` arguments (#34861).
- Translate `COALESCE` as `ISNULL` on SQL Server, for most cases (#34171, contributed by @ranma42).
- Support some string functions taking `char` as arguments (#34999, contributed by @ChrisJollyAU).
- Support `MAX`/`MIN`/`ORDER BY` using `decimal` on SQLite (#35606, contributed by @ranma42).
- Support projecting different navigations (but same type) via conditional operator (#34589, contributed by @ranma42).

#### Bug fixes and optimizations

- Fix Microsoft.Data.Sqlite behavior around `DateTime`, `DateTimeOffset` and UTC, see breaking change notes (#36195).
- Fix translation of `DefaultIfEmpty` in various scenarios:
  - DefaultIfEmpty applied on child collection wipes the parent info in query result
  - Logic for lifting DefaultIfEmpty out of SelectMany (to LEFT JOIN/OUTER APPLY) is incorrect
  - NavigationExpandingExpressionVisitor moves Select() behind DefaultIfEmpty()
  - EF Core 9 no longer applies COALESCE in SQL translation for DefaultIfEmpty() which causing an InvalidOperationException
- Optimize multiple consecutive `LIMIT`s (#35384, contributed by @ranma42).
- Optimize use of `Count` operation on `ICollection<T>` (#35381, contributed by @ChrisJollyAU).
- Optimize `MIN`/`MAX` over `DISTINCT` (#34699, contributed by @ranma42).
- Simplify parameter names (e.g. from `@__city_0` to `@city`) (#35200).

## ExecuteUpdate support for relational JSON columns

> **Note:**
> ExecuteUpdate support for JSON requires mapping your types as complex types (see above), and does not work when your types are mapped as owned entities.

Although EF has support JSON columns for some time and allows updating them via `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*`, `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*` lacked support for them. EF10 now allows referencing JSON columns and properties within them in `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*`, allowing efficient bulk updating of document-modeled data within relational databases.

For example, given the following model, mapping the `BlogDetails` type to a complex JSON column in the database:

```c#
public class Blog
{
    public int Id { get; set; }

    public BlogDetails Details { get; set; }
}

public class BlogDetails
{
    public string Title { get; set; }
    public int Views { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().ComplexProperty(b => b.Details, bd => bd.ToJson());
}
```

You can now use `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*` as usual, referencing properties within `BlogDetails`:

```c#
await context.Blogs.ExecuteUpdateAsync(s =>
    s.SetProperty(b => b.Details.Views, b => b.Details.Views + 1));
```

This generates the following for SQL Server 2025, using the efficient, new `modify` function to increment the JSON property `Views` by one:

```sql
UPDATE [b]
SET [Details].modify('$.Views', JSON_VALUE([b].[Details], '$.Views' RETURNING int) + 1)
FROM [Blogs] AS [b]
```

Older versions of SQL Server are also supported, where the JSON data is stored in an `nvarchar(max)` column rather than the new JSON data type support. For support with other databases, consult the documentation for your EF provider.

## Named query filters

EF's global query filters feature has long enabled users to configuring filters to entity types which apply to all queries by default. This has simplified implementing common patterns and scenarios such as soft deletion, multitenancy and others. However, up to now EF has only supported a single query filter per entity type, making it difficult to have multiple filters and selectively disabling only some of them in specific queries.

EF 10 introduces *named query filters*, which allow attaching names to query filter and managing each one separately:

```csharp
modelBuilder.Entity<Blog>()
    .HasQueryFilter("SoftDeletionFilter", b => !b.IsDeleted)
    .HasQueryFilter("TenantFilter", b => b.TenantId == tenantId);
```

This notably allows disabling only certain filters in a specific LINQ query:

```csharp
var allBlogs = await context.Blogs.IgnoreQueryFilters(["SoftDeletionFilter"]).ToListAsync();
```

For more information on named query filters, see the documentation.

This feature was contributed by @bittola.

## ExecuteUpdateAsync now accepts a regular, non-expression lambda

The `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*` can be used to express arbitrary update operations in the database. In previous versions, the changes to be performed on the database rows were provided via an expression tree parameter; this made it quite difficult to build those changes dynamically. For example, let's assume we want to update a Blog's Views, but conditionally also its Name. Since the setters argument was an expression tree, code such as the following needed to be written:

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

Thanks to @aradalvand for proposing and pushing for this change (in #32018).
