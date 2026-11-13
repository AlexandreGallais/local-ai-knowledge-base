---
title: "Querying Data - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/querying/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Querying Data

Entity Framework Core uses Language-Integrated Query (LINQ) to query data from the database. LINQ allows you to use C# (or your .NET language of choice) to write strongly typed queries. It uses your derived context and entity classes to reference database objects. EF Core passes a representation of the LINQ query to the database provider. Database providers in turn translate it to database-specific query language (for example, SQL for a relational database). Queries are always executed against the database even if the entities returned in the result already exist in the context.

> **Tip:**
> You can view this article's sample on GitHub.

The following snippets show a few examples of how to achieve common tasks with Entity Framework Core.

## Loading all data

```csharp
using (var context = new BloggingContext())
{
    var blogs = await context.Blogs.ToListAsync();
}
```

## Loading a single entity

```csharp
using (var context = new BloggingContext())
{
    var blog = await context.Blogs
        .SingleAsync(b => b.BlogId == 1);
}
```

## Filtering

```csharp
using (var context = new BloggingContext())
{
    var blogs = await context.Blogs
        .Where(b => b.Url.Contains("dotnet"))
        .ToListAsync();
}
```

## Further readings

- Learn more about LINQ query expressions
- For more detailed information on how a query is processed in EF Core, see How queries Work.
