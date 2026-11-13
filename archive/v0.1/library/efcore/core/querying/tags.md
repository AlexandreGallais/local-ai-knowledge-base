---
title: "Query Tags - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/querying/tags.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Query tags

Query tags help correlate LINQ queries in code with generated SQL queries captured in logs.
You annotate a LINQ query using the new `TagWith()` method:

> **Tip:**
> You can view this article's sample on GitHub.

```csharp
var myLocation = new Point(1, 2);
var nearestPeople = await (from f in context.People.TagWith("This is my spatial query!")
                     orderby f.Location.Distance(myLocation) descending
                     select f).Take(5).ToListAsync();
```

This LINQ query is translated to the following SQL statement:

```sql
-- This is my spatial query!

SELECT TOP(@__p_1) [p].[Id], [p].[Location]
FROM [People] AS [p]
ORDER BY [p].[Location].STDistance(@__myLocation_0) DESC
```

It's possible to call `TagWith()` many times on the same query.
Query tags are cumulative.
For example, given the following methods:

```csharp
private static IQueryable<Person> GetNearestPeople(SpatialContext context, Point myLocation)
    => from f in context.People.TagWith("GetNearestPeople")
       orderby f.Location.Distance(myLocation) descending
       select f;

private static IQueryable<T> Limit<T>(IQueryable<T> source, int limit) => source.TagWith("Limit").Take(limit);
```

The following query:

```csharp
var results = await Limit(GetNearestPeople(context, new Point(1, 2)), 25).ToListAsync();
```

Translates to:

```sql
-- GetNearestPeople
-- Limit

SELECT TOP(@__p_1) [p].[Id], [p].[Location]
FROM [People] AS [p]
ORDER BY [p].[Location].STDistance(@__myLocation_0) DESC
```

It's also possible to use multi-line strings as query tags.
For example:

```csharp
            var results = await Limit(GetNearestPeople(context, new Point(1, 2)), 25).TagWith(
                @"This is a multi-line
string").ToListAsync();
```

Produces the following SQL:

```sql
-- GetNearestPeople
-- Limit
-- This is a multi-line
-- string

SELECT TOP(@__p_1) [p].[Id], [p].[Location]
FROM [People] AS [p]
ORDER BY [p].[Location].STDistance(@__myLocation_0) DESC
```

## Tagging with file name and line number

Queries can be automatically tagged with the file name and line number where the LINQ query is defined in source code. This is done using the `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.TagWithCallSite*` method:

```csharp
var myLocation = new Point(1, 2);
var closestPeople = await (from f in context.People.TagWithCallSite()
                     orderby f.Location.Distance(myLocation) descending
                     select f).Take(5).ToListAsync();
```

This query translates to (the actual line number will reflect where the query is defined in the source file):

```sql
-- file: C:\Work\EntityFramework.Docs\samples\Program.cs:23

SELECT TOP(@__p_1) [p].[Id], [p].[Location]
FROM [People] AS [p]
ORDER BY [p].[Location].STDistance(@__myLocation_0) DESC
```

## Known limitations

**Query tags aren't parameterizable:**
EF Core always treats query tags in the LINQ query as string literals that are included in the generated SQL.
Compiled queries that take query tags as parameters aren't allowed.
