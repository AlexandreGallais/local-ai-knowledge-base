---
title: "What's New in EF Core 8 (part 5 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 5 of 11)

### Primitive collections in JSON documents

In all the examples above, column for primitive collection contains JSON. However, this is not the same as mapping an owned entity type to a column containing a JSON document, which was introduced in EF7. But what if that JSON document itself contains a primitive collection? Well, all the queries above still work in the same way! For example, imagine we move the _days visited_ data into an owned type `Visits` mapped to a JSON document:

```csharp
public class Pub
{
    public Pub(string name)
    {
        Name = name;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public BeerData Beers { get; set; } = null!;
    public Visits Visits { get; set; } = null!;
}

public class Visits
{
    public string? LocationTag { get; set; }
    public List<DateOnly> DaysVisited { get; set; } = null!;
}
```

> **Tip:**
> The code shown here comes from PrimitiveCollectionsInJsonSample.cs.

We can now run a variation of our final query that, this time, extracts data from the JSON document, including queries into the primitive collections contained in the document:

```csharp
var walksWithADrink = await context.Walks.Select(
    w => new
    {
        WalkName = w.Name,
        PubName = w.ClosestPub.Name,
        WalkLocationTag = w.Visits.LocationTag,
        PubLocationTag = w.ClosestPub.Visits.LocationTag,
        Count = w.Visits.DaysVisited.Count(v => w.ClosestPub.Visits.DaysVisited.Contains(v)),
        TotalCount = w.Visits.DaysVisited.Count
    }).ToListAsync();
```

This translates to the following on SQL Server:

```sql
SELECT [w].[Name] AS [WalkName], [p].[Name] AS [PubName], JSON_VALUE([w].[Visits], '$.LocationTag') AS [WalkLocationTag], JSON_VALUE([p].[Visits], '$.LocationTag') AS [PubLocationTag], (
    SELECT COUNT(*)
    FROM OpenJson(JSON_VALUE([w].[Visits], '$.DaysVisited')) AS [d]
    WHERE EXISTS (
        SELECT 1
        FROM OpenJson(JSON_VALUE([p].[Visits], '$.DaysVisited')) AS [d0]
        WHERE CAST([d0].[value] AS date) = CAST([d].[value] AS date) OR ([d0].[value] IS NULL AND [d].[value] IS NULL))) AS [Count], (
    SELECT COUNT(*)
    FROM OpenJson(JSON_VALUE([w].[Visits], '$.DaysVisited')) AS [d1]) AS [TotalCount]
FROM [Walks] AS [w]
INNER JOIN [Pubs] AS [p] ON [w].[ClosestPubId] = [p].[Id]
```

And to a similar query when using SQLite:

```sql
SELECT "w"."Name" AS "WalkName", "p"."Name" AS "PubName", "w"."Visits" ->> 'LocationTag' AS "WalkLocationTag", "p"."Visits" ->> 'LocationTag' AS "PubLocationTag", (
    SELECT COUNT(*)
    FROM json_each("w"."Visits" ->> 'DaysVisited') AS "d"
    WHERE EXISTS (
        SELECT 1
        FROM json_each("p"."Visits" ->> 'DaysVisited') AS "d0"
        WHERE "d0"."value" = "d"."value")) AS "Count", json_array_length("w"."Visits" ->> 'DaysVisited') AS "TotalCount"
FROM "Walks" AS "w"
INNER JOIN "Pubs" AS "p" ON "w"."ClosestPubId" = "p"."Id"
```

> **Tip:**
> Notice that on SQLite EF Core now makes use of the `->>` operator, resulting in queries that are both easier to read and often more performant.

### Mapping primitive collections to a table

We mentioned above that another option for primitive collections is to map them to a different table. First class support for this is tracked by Issue #25163; make sure to vote for this issue if it is important to you. Until this is implemented, the best approach is to create a wrapping type for the primitive. For example, let's create a type for `Beer`:

```csharp
[Owned]
public class Beer
{
    public Beer(string name)
    {
        Name = name;
    }

    public string Name { get; private set; }
}
```

Notice that the type simply wraps the primitive value--it doesn't have a primary key or any foreign keys defined. This type can then be used in the `Pub` class:

```csharp
public class Pub
{
    public Pub(string name)
    {
        Name = name;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public List<Beer> Beers { get; set; } = new();
    public List<DateOnly> DaysVisited { get; private set; } = new();
}
```

EF will now create a `Beer` table, synthesizing primary key and foreign key columns back to the `Pubs` table. For example, on SQL Server:

```sql
CREATE TABLE [Beer] (
    [PubId] int NOT NULL,
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Beer] PRIMARY KEY ([PubId], [Id]),
    CONSTRAINT [FK_Beer_Pubs_PubId] FOREIGN KEY ([PubId]) REFERENCES [Pubs] ([Id]) ON DELETE CASCADE
```

## Enhancements to JSON column mapping

EF8 includes improvements to the JSON column mapping support introduced in EF7.

> **Tip:**
> The code shown here comes from JsonColumnsSample.cs.

### Translate element access into JSON arrays

EF8 supports indexing in JSON arrays when executing queries. For example, the following query checks whether the first two updates were made before a given date.

```csharp
var cutoff = DateOnly.FromDateTime(DateTime.UtcNow - TimeSpan.FromDays(365));
var updatedPosts = await context.Posts
    .Where(
        p => p.Metadata!.Updates[0].UpdatedOn < cutoff
             && p.Metadata!.Updates[1].UpdatedOn < cutoff)
    .ToListAsync();
```

This translates into the following SQL when using SQL Server:

```sql
SELECT [p].[Id], [p].[Archived], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText], [p].[Metadata]
FROM [Posts] AS [p]
WHERE CAST(JSON_VALUE([p].[Metadata],'$.Updates[0].UpdatedOn') AS date) < @__cutoff_0
  AND CAST(JSON_VALUE([p].[Metadata],'$.Updates[1].UpdatedOn') AS date) < @__cutoff_0
```

> **Note:**
> This query will succeed even if a given post does not have any updates, or only has a single update. In such a case, `JSON_VALUE` returns `NULL` and the predicate is not matched.

Indexing into JSON arrays can also be used to project elements from an array into the final results. For example, the following query projects out the `UpdatedOn` date for the first and second updates of each post.

```csharp
var postsAndRecentUpdatesNullable = await context.Posts
    .Select(p => new
    {
        p.Title,
        LatestUpdate = (DateOnly?)p.Metadata!.Updates[0].UpdatedOn,
        SecondLatestUpdate = (DateOnly?)p.Metadata.Updates[1].UpdatedOn
    })
    .ToListAsync();
```

This translates into the following SQL when using SQL Server:

```sql
SELECT [p].[Title],
       CAST(JSON_VALUE([p].[Metadata],'$.Updates[0].UpdatedOn') AS date) AS [LatestUpdate],
       CAST(JSON_VALUE([p].[Metadata],'$.Updates[1].UpdatedOn') AS date) AS [SecondLatestUpdate]
FROM [Posts] AS [p]
```

As noted above, `JSON_VALUE` returns null if the element of the array does not exist. This is handled in the query by casting the projected value to a nullable `DateOnly`. An alternative to casting the value is to filter the query results so that `JSON_VALUE` will never return null. For example:

```csharp
var postsAndRecentUpdates = await context.Posts
    .Where(p => p.Metadata!.Updates[0].UpdatedOn != null
                && p.Metadata!.Updates[1].UpdatedOn != null)
    .Select(p => new
    {
        p.Title,
        LatestUpdate = p.Metadata!.Updates[0].UpdatedOn,
        SecondLatestUpdate = p.Metadata.Updates[1].UpdatedOn
    })
    .ToListAsync();
```

This translates into the following SQL when using SQL Server:

```sql
SELECT [p].[Title],
       CAST(JSON_VALUE([p].[Metadata],'$.Updates[0].UpdatedOn') AS date) AS [LatestUpdate],
       CAST(JSON_VALUE([p].[Metadata],'$.Updates[1].UpdatedOn') AS date) AS [SecondLatestUpdate]
FROM [Posts] AS [p]
      WHERE (CAST(JSON_VALUE([p].[Metadata],'$.Updates[0].UpdatedOn') AS date) IS NOT NULL)
        AND (CAST(JSON_VALUE([p].[Metadata],'$.Updates[1].UpdatedOn') AS date) IS NOT NULL)
```

### Translate queries into embedded collections

EF8 supports queries against collections of both primitive (discussed above) and non-primitive types embedded in the JSON document. For example, the following query returns all posts with any of an arbitrary list of search terms:

```csharp
var searchTerms = new[] { "Search #2", "Search #3", "Search #5", "Search #8", "Search #13", "Search #21", "Search #34" };

var postsWithSearchTerms = await context.Posts
    .Where(post => post.Metadata!.TopSearches.Any(s => searchTerms.Contains(s.Term)))
    .ToListAsync();
```

This translates into the following SQL when using SQL Server:

```sql
SELECT [p].[Id], [p].[Archived], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText], [p].[Metadata]
FROM [Posts] AS [p]
WHERE EXISTS (
    SELECT 1
    FROM OPENJSON([p].[Metadata], '$.TopSearches') WITH (
        [Count] int '$.Count',
        [Term] nvarchar(max) '$.Term'
    ) AS [t]
    WHERE EXISTS (
        SELECT 1
        FROM OPENJSON(@__searchTerms_0) WITH ([value] nvarchar(max) '$') AS [s]
        WHERE [s].[value] = [t].[Term]))
```

### JSON Columns for SQLite

EF7 introduced support for mapping to JSON columns when using Azure SQL/SQL Server. EF8 extends this support to SQLite databases. As for the SQL Server support, this includes:

- Mapping of aggregates built from .NET types to JSON documents stored in SQLite columns
- Queries into JSON columns, such as filtering and sorting by the elements of the documents
- Queries that project elements out of the JSON document into results
- Updating and saving changes to JSON documents

The existing documentation from What's New in EF7 provides detailed information on JSON mapping, queries, and updates. This documentation now also applies to SQLite.

> **Tip:**
> The code shown in the EF7 documentation has been updated to also run on SQLite and can be found in JsonColumnsSample.cs.

#### Queries into JSON columns

Queries into JSON columns on SQLite use the `json_extract` function. For example, the "authors in Chigley" query from the documentation referenced above:

```csharp
var authorsInChigley = await context.Authors
    .Where(author => author.Contact.Address.City == "Chigley")
    .ToListAsync();
```

Is translated to the following SQL when using SQLite:

```sql
SELECT "a"."Id", "a"."Name", "a"."Contact"
FROM "Authors" AS "a"
WHERE json_extract("a"."Contact", '$.Address.City') = 'Chigley'
```

#### Updating JSON columns

For updates, EF uses the `json_set` function on SQLite. For example, when updating a single property in a document:

```csharp
var arthur = await context.Authors.SingleAsync(author => author.Name.StartsWith("Arthur"));

arthur.Contact.Address.Country = "United Kingdom";

await context.SaveChangesAsync();
```

EF generates the following parameters:

```text
info: 3/10/2023 10:51:33.127 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[@p0='["United Kingdom"]' (Nullable = false) (Size = 18), @p1='4'], CommandType='Text', CommandTimeout='30']
```

Which use the `json_set` function on SQLite:

```sql
UPDATE "Authors" SET "Contact" = json_set("Contact", '$.Address.Country', json_extract(@p0, '$[0]'))
WHERE "Id" = @p1
RETURNING 1;
```
