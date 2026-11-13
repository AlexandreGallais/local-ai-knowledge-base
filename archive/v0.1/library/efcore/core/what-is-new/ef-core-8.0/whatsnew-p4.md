---
title: "What's New in EF Core 8 (part 4 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 4 of 11)

## Primitive collections

A persistent question when using relational databases is what to do with collections of primitive types; that is, lists or arrays of integers, date/times, strings, and so on. If you're using PostgreSQL, then its easy to store these things using PostgreSQL's built-in array type. For other databases, there are two common approaches:

- Create a table with a column for the primitive type value and another column to act as a foreign key <example-value> each value to its owner of the collection.
- Serialize the primitive collection into some column type that is handled by the database--for example, serialize to and from a string.

The first option has advantages in many situations--we'll take a quick look at it at the end of this section. However, it's not a natural representation of the data in the model, and if what you really have is a collection of a primitive type, then the second option can be more effective.

Starting with Preview 4, EF8 now includes built-in support for the second option, using JSON as the serialization format. JSON works well for this since modern relational databases include built-in mechanisms for querying and manipulating JSON, such that the JSON column can, effectively, be treated as a table when needed, without the overhead of actually creating that table. These same mechanisms allow JSON to be passed in parameters and then used in similar way to table-valued parameters in queries--more about this later.

> **Tip:**
> The code shown here comes from PrimitiveCollectionsSample.cs.

### Primitive collection properties

EF Core can map any `IEnumerable<T>` property, where `T` is a primitive type, to a JSON column in the database. This is done by convention for public properties which have both a getter and a setter. For example, all properties in the following entity type are mapped to JSON columns by convention:

```csharp
public class PrimitiveCollections
{
    public IEnumerable<int> Ints { get; set; }
    public ICollection<string> Strings { get; set; }
    public IList<DateOnly> Dates { get; set; }
    public uint[] UnsignedInts { get; set; }
    public List<bool> Booleans { get; set; }
    public List<Uri> Urls { get; set; }
}
```

> **Note:**
> What do we mean by "primitive type" in this context? Essentially, something that the database provider knows how to map, using some kind of value conversion if necessary. For example, in the entity type above, the types `int`, `string`, `DateTime`, `DateOnly` and `bool` are all handled without conversion by the database provider. SQL Server does not have native support for unsigned ints or URIs, but `uint` and `Uri` are still treated as primitive types because there are built-in value converters for these types.

By default, EF Core uses an unconstrained Unicode string column type to hold the JSON, since this protects against data loss with large collections. However, on some database systems, such as SQL Server, specifying a maximum length for the string can improve performance. This, along with other column configuration, can be done in the normal way. For example:

```csharp
modelBuilder
    .Entity<PrimitiveCollections>()
    .Property(e => e.Booleans)
    .HasMaxLength(1024)
    .IsUnicode(false);
```

Or, using mapping attributes:

```csharp
[MaxLength(2500)]
[Unicode(false)]
public uint[] UnsignedInts { get; set; }
```

A default column configuration can be used for all properties of a certain type using pre-convention model configuration. For example:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder
        .Properties<List<DateOnly>>()
        .AreUnicode(false)
        .HaveMaxLength(4000);
}
```

### Queries with primitive collections

Let's look at some of the queries that make use of collections of primitive types. For this, we'll need a simple model with two entity types. The first represents a British public house, or "pub":

```csharp
public class Pub
{
    public Pub(string name, string[] beers)
    {
        Name = name;
        Beers = beers;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string[] Beers { get; set; }
    public List<DateOnly> DaysVisited { get; private set; } = new();
}
```

The `Pub` type contains two primitive collections:

- `Beers` is an array of strings representing the beer brands available at the pub.
- `DaysVisited` is a list of the dates on which the pub was visited.

> **Tip:**
> In a real application, it would probably make more sense to create an entity type for beer, and have a table for beers. We're showing a primitive collection here to illustrate how they work. But remember, just because you can model something as a primitive collection doesn't mean that you necessarily should.

The second entity type represents a dog walk in the British countryside:

```csharp
public class DogWalk
{
    public DogWalk(string name)
    {
        Name = name;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public Terrain Terrain { get; set; }
    public List<DateOnly> DaysVisited { get; private set; } = new();
    public Pub ClosestPub { get; set; } = null!;
}

public enum Terrain
{
    Forest,
    River,
    Hills,
    Village,
    Park,
    Beach,
}
```

Like `Pub`, `DogWalk` also contains a collection of the dates visited, and a link to the closest pub since, you know, sometimes the dog needs a saucer of beer after a long walk.

Using this model, the first query we will do is a simple `Contains` query to find all walks with one of several different terrains:

```csharp
var terrains = new[] { Terrain.River, Terrain.Beach, Terrain.Park };
var walksWithTerrain = await context.Walks
    .Where(e => terrains.Contains(e.Terrain))
    .Select(e => e.Name)
    .ToListAsync();
```

This is already translated by current versions of EF Core by inlining the values to look for. For example, when using SQL Server:

```sql
SELECT [w].[Name]
FROM [Walks] AS [w]
WHERE [w].[Terrain] IN (1, 5, 4)
```

However, this strategy does not work well with database query caching; see Announcing EF8 Preview 4 on the .NET Blog for a discussion of the issue.

> **Important:**
> The inlining of values here is done in such a way that there is no chance of a SQL injection attack. The change to use JSON described below is all about performance, and nothing to do with security.

For EF Core 8, the default is now to pass the list of terrains as a single parameter containing a JSON collection. For example:

```none
@__terrains_0='[1,5,4]'
```

The query then uses `OpenJson` on SQL Server:

```sql
SELECT [w].[Name]
FROM [Walks] AS [w]
WHERE EXISTS (
    SELECT 1
    FROM OpenJson(@__terrains_0) AS [t]
    WHERE CAST([t].[value] AS int) = [w].[Terrain])
```

Or `json_each` on SQLite:

```sql
SELECT "w"."Name"
FROM "Walks" AS "w"
WHERE EXISTS (
    SELECT 1
    FROM json_each(@__terrains_0) AS "t"
    WHERE "t"."value" = "w"."Terrain")
```

> **Note:**
> `OpenJson` is only available on SQL Server 2016 (compatibility level 130) and later. You can tell SQL Server that you're using an older version by configuring the compatibility level as part of `UseSqlServer`. For example:
>
> ```csharp
> protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
>     => optionsBuilder
>         .UseSqlServer(
>             @"Data Source=(LocalDb)\MSSQLLocalDB;Database=AllTogetherNow",
>             sqlServerOptionsBuilder => sqlServerOptionsBuilder.UseCompatibilityLevel(120));
> ```

Let's try a different kind of `Contains` query. In this case, we'll look for a value of the parameter collection in the column. For example, any pub that stocks Heineken:

```csharp
var beer = "Heineken";
var pubsWithHeineken = await context.Pubs
    .Where(e => e.Beers.Contains(beer))
    .Select(e => e.Name)
    .ToListAsync();
```

The existing documentation from What's New in EF7 provides detailed information on JSON mapping, queries, and updates. This documentation now also applies to SQLite.

```sql
SELECT [p].[Name]
FROM [Pubs] AS [p]
WHERE EXISTS (
    SELECT 1
    FROM OpenJson([p].[Beers]) AS [b]
    WHERE [b].[value] = @__beer_0)
```

`OpenJson` is now used to extract values from JSON column so that each value can be matched to the passed parameter.

We can combine the use of `OpenJson` on the parameter with `OpenJson` on the column. For example, to find pubs that stock any one of a variety of lagers:

```csharp
var beers = new[] { "Carling", "Heineken", "Stella Artois", "Carlsberg" };
var pubsWithLager = await context.Pubs
    .Where(e => beers.Any(b => e.Beers.Contains(b)))
    .Select(e => e.Name)
    .ToListAsync();
```

This translates to the following on SQL Server:

```sql
SELECT [p].[Name]
FROM [Pubs] AS [p]
WHERE EXISTS (
    SELECT 1
    FROM OpenJson(@__beers_0) AS [b]
    WHERE EXISTS (
        SELECT 1
        FROM OpenJson([p].[Beers]) AS [b0]
        WHERE [b0].[value] = [b].[value] OR ([b0].[value] IS NULL AND [b].[value] IS NULL)))
```

The `@__beers_0` parameter value here is `["Carling","Heineken","Stella Artois","Carlsberg"]`.

Let's look at a query that makes use of the column containing a collection of dates. For example, to find pubs visited this year:

```csharp
var thisYear = DateTime.Now.Year;
var pubsVisitedThisYear = await context.Pubs
    .Where(e => e.DaysVisited.Any(v => v.Year == thisYear))
    .Select(e => e.Name)
    .ToListAsync();
```

This translates to the following on SQL Server:

```sql
SELECT [p].[Name]
FROM [Pubs] AS [p]
WHERE EXISTS (
    SELECT 1
    FROM OpenJson([p].[DaysVisited]) AS [d]
    WHERE DATEPART(year, CAST([d].[value] AS date)) = @__thisYear_0)
```

Notice that the query makes use of the date-specific function `DATEPART` here because EF _knows that the primitive collection contains dates_. It might not seem like it, but this is actually really important. Because EF knows what's in the collection, it can generate appropriate SQL to use the typed values with parameters, functions, other columns etc.

Let's use the date collection again, this time to order appropriately for the type and project values extracted from the collection. For example, let's list pubs in the order that they were first visited, and with the first and last date each pub was visited:

```csharp
var pubsVisitedInOrder = await context.Pubs
    .Select(e => new
    {
        e.Name,
        FirstVisited = e.DaysVisited.OrderBy(v => v).First(),
        LastVisited = e.DaysVisited.OrderByDescending(v => v).First(),
    })
    .OrderBy(p => p.FirstVisited)
    .ToListAsync();
```

This translates to the following on SQL Server:

```sql
SELECT [p].[Name], (
    SELECT TOP(1) CAST([d0].[value] AS date)
    FROM OpenJson([p].[DaysVisited]) AS [d0]
    ORDER BY CAST([d0].[value] AS date)) AS [FirstVisited], (
    SELECT TOP(1) CAST([d1].[value] AS date)
    FROM OpenJson([p].[DaysVisited]) AS [d1]
    ORDER BY CAST([d1].[value] AS date) DESC) AS [LastVisited]
FROM [Pubs] AS [p]
ORDER BY (
    SELECT TOP(1) CAST([d].[value] AS date)
    FROM OpenJson([p].[DaysVisited]) AS [d]
    ORDER BY CAST([d].[value] AS date))
```

And finally, just how often do we end up visiting the closest pub when taking the dog for a walk? Let's find out:

```csharp
var walksWithADrink = await context.Walks.Select(
    w => new
    {
        WalkName = w.Name,
        PubName = w.ClosestPub.Name,
        Count = w.DaysVisited.Count(v => w.ClosestPub.DaysVisited.Contains(v)),
        TotalCount = w.DaysVisited.Count
    }).ToListAsync();
```

This translates to the following on SQL Server:

```sql
SELECT [w].[Name] AS [WalkName], [p].[Name] AS [PubName], (
    SELECT COUNT(*)
    FROM OpenJson([w].[DaysVisited]) AS [d]
    WHERE EXISTS (
        SELECT 1
        FROM OpenJson([p].[DaysVisited]) AS [d0]
        WHERE CAST([d0].[value] AS date) = CAST([d].[value] AS date) OR ([d0].[value] IS NULL AND [d].[value] IS NULL))) AS [Count], (
    SELECT COUNT(*)
    FROM OpenJson([w].[DaysVisited]) AS [d1]) AS [TotalCount]
FROM [Walks] AS [w]
INNER JOIN [Pubs] AS [p] ON [w].[ClosestPubId] = [p].[Id]
```

And reveals the following data:

```none
The Prince of Wales Feathers was visited 5 times in 8 "Ailsworth to Nene" walks.
The Prince of Wales Feathers was visited 6 times in 9 "Caster Hanglands" walks.
The Royal Oak was visited 6 times in 8 "Ferry Meadows" walks.
The White Swan was visited 7 times in 9 "Woodnewton" walks.
The Eltisley was visited 6 times in 8 "Eltisley" walks.
Farr Bay Inn was visited 7 times in 11 "Farr Beach" walks.
Farr Bay Inn was visited 7 times in 9 "Newlands" walks.
```

Looks like beer and dog walking are a winning combination!
