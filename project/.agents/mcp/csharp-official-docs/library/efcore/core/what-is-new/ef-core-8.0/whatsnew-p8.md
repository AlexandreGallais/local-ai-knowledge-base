---
title: "What's New in EF Core 8 (part 8 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 8 of 11)

## Raw SQL queries for unmapped types

EF7 introduced raw SQL queries returning scalar types-types). This is enhanced in EF8 to include raw SQL queries returning any mappable CLR type, without including that type in the EF model.

> **Tip:**
> The code shown here comes from RawSqlSample.cs.

Queries using unmapped types are executed using `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` or `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQueryRaw*`. The former uses string interpolation to parameterize the query, which helps ensure that all non-constant values are parameterized. For example, consider the following database table:

```sql
CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [PublishedOn] date NOT NULL,
    [BlogId] int NOT NULL,
);
```

`SqlQuery` can be used to query this table and return instances of a `BlogPost` type with properties corresponding to the columns in the table:

For example:

```csharp
public class BlogPost
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateOnly PublishedOn { get; set; }
    public int BlogId { get; set; }
}
```

For example:

```csharp
var start = new DateOnly(2022, 1, 1);
var end = new DateOnly(2023, 1, 1);
var postsIn2022 =
    await context.Database
        .SqlQuery<BlogPost>($"SELECT * FROM Posts as p WHERE p.PublishedOn >= {start} AND p.PublishedOn < {end}")
        .ToListAsync();
```

This query is parameterized and executed as:

```sql
SELECT * FROM Posts as p WHERE p.PublishedOn >= @p0 AND p.PublishedOn < @p1
```

The type used for query results can contain common mapping constructs supported by EF Core, such as parameterized constructors and mapping attributes. For example:

```csharp
public class BlogPost
{
    public BlogPost(string blogTitle, string content, DateOnly publishedOn)
    {
        BlogTitle = blogTitle;
        Content = content;
        PublishedOn = publishedOn;
    }

    public int Id { get; private set; }

    [Column("Title")]
    public string BlogTitle { get; set; }

    public string Content { get; set; }
    public DateOnly PublishedOn { get; set; }
    public int BlogId { get; set; }
}
```

> **Note:**
> Types used in this way do not have keys defined and cannot have relationships to other types. Types with relationships must be mapped in the model.

The type used must have a property for every value in the result set, but do not need to match any table in the database. For example, the following type represents only a subset of information for each post, and includes the blog name, which comes from the `Blogs` table:

```csharp
public class PostSummary
{
    public string BlogName { get; set; } = null!;
    public string PostTitle { get; set; } = null!;
    public DateOnly? PublishedOn { get; set; }
}
```

And can be queried using `SqlQuery` in the same way as before:

```csharp

var cutoffDate = new DateOnly(2022, 1, 1);
var summaries =
    await context.Database.SqlQuery<PostSummary>(
            @$"SELECT b.Name AS BlogName, p.Title AS PostTitle, p.PublishedOn
               FROM Posts AS p
               INNER JOIN Blogs AS b ON p.BlogId = b.Id
               WHERE p.PublishedOn >= {cutoffDate}")
        .ToListAsync();
```

One nice feature of `SqlQuery` is that it returns an `IQueryable` which can be composed on using LINQ. For example, a 'Where' clause can be added to the query above:

```csharp
var summariesIn2022 =
    await context.Database.SqlQuery<PostSummary>(
            @$"SELECT b.Name AS BlogName, p.Title AS PostTitle, p.PublishedOn
               FROM Posts AS p
               INNER JOIN Blogs AS b ON p.BlogId = b.Id")
        .Where(p => p.PublishedOn >= cutoffDate && p.PublishedOn < end)
        .ToListAsync();
```

This is executed as:

```sql
SELECT [n].[BlogName], [n].[PostTitle], [n].[PublishedOn]
FROM (
         SELECT b.Name AS BlogName, p.Title AS PostTitle, p.PublishedOn
         FROM Posts AS p
                  INNER JOIN Blogs AS b ON p.BlogId = b.Id
     ) AS [n]
WHERE [n].[PublishedOn] >= @__cutoffDate_1 AND [n].[PublishedOn] < @__end_2
```

At this point it is worth remembering that all of the above can be done completely in LINQ without the need to write any SQL. This includes returning instances of an unmapped type like `PostSummary`. For example, the preceding query can be written in LINQ as:

```csharp
var summaries =
    await context.Posts.Select(
            p => new PostSummary
            {
                BlogName = p.Blog.Name,
                PostTitle = p.Title,
                PublishedOn = p.PublishedOn,
            })
        .Where(p => p.PublishedOn >= start && p.PublishedOn < end)
        .ToListAsync();
```

Which translates to much cleaner SQL:

```sql
SELECT [b].[Name] AS [BlogName], [p].[Title] AS [PostTitle], [p].[PublishedOn]
FROM [Posts] AS [p]
INNER JOIN [Blogs] AS [b] ON [p].[BlogId] = [b].[Id]
WHERE [p].[PublishedOn] >= @__start_0 AND [p].[PublishedOn] < @__end_1
```

> **Tip:**
> EF is able to generate cleaner SQL when it is responsible for the entire query than it is when composing over user-supplied SQL because, in the former case, the full semantics of the query is available to EF.

So far, all the queries have been executed directly against tables. `SqlQuery` can also be used to return results from a view without mapping the view type in the EF model. For example:

```csharp
var summariesFromView =
    await context.Database.SqlQuery<PostSummary>(
            @$"SELECT * FROM PostAndBlogSummariesView")
        .Where(p => p.PublishedOn >= cutoffDate && p.PublishedOn < end)
        .ToListAsync();
```

Likewise, `SqlQuery` can be used for the results of a function:

```csharp
var summariesFromFunc =
    await context.Database.SqlQuery<PostSummary>(
            @$"SELECT * FROM GetPostsPublishedAfter({cutoffDate})")
        .Where(p => p.PublishedOn < end)
        .ToListAsync();
```

The returned `IQueryable` can be composed upon when it is the result of a view or function, just like it can be for the result of a table query. Stored procedures can be also be executed using `SqlQuery`, but most databases do not support composing over them. For example:

```csharp
var summariesFromStoredProc =
    await context.Database.SqlQuery<PostSummary>(
            @$"exec GetRecentPostSummariesProc")
        .ToListAsync();
```

## Enhancements to lazy-loading

### Lazy-loading for no-tracking queries

EF8 adds support for lazy-loading of navigations on entities that are not being tracked by the `DbContext`. This means a no-tracking query can be followed by lazy-loading of navigations on the entities returned by the no-tracking query.

> **Tip:**
> The code for the lazy-loading examples shown below comes from LazyLoadingSample.cs.

For example, consider a no-tracking query for blogs:

```csharp
var blogs = await context.Blogs.AsNoTracking().ToListAsync();
```

If `Blog.Posts` is configured for lazy-loading, for example, using lazy-loading proxies, then accessing `Posts` will cause it to load from the database:

```csharp
Console.WriteLine();
Console.Write("Choose a blog: ");
if (int.TryParse(ReadLine(), out var blogId))
{
    Console.WriteLine("Posts:");
    foreach (var post in blogs[blogId - 1].Posts)
    {
        Console.WriteLine($"  {post.Title}");
    }
}
```

EF8 also reports whether or not a given navigation is loaded for entities not tracked by the context. For example:

```csharp
foreach (var blog in blogs)
{
    if (context.Entry(blog).Collection(e => e.Posts).IsLoaded)
    {
        Console.WriteLine($" Posts for blog '{blog.Name}' are loaded.");
    }
}
```

There are a few important considerations when using lazy-loading in this way:

- Lazy-loading will only succeed until the `DbContext` used to query the entity is disposed.
- Entities queried in this way maintain a reference to their `DbContext`, even though they are not tracked by it. Care should be taken to avoid memory leaks if the entity instances will have long lifetimes.
- Explicitly detaching the entity by setting its state to `EntityState.Detached` severs the reference to the `DbContext` and lazy-loading will no longer work.
- Remember that all lazy-loading uses synchronous I/O, since there is no way to access a property in an asynchronous manner.

Lazy-loading from untracked entities works for both lazy-loading proxies and lazy-loading without proxies.

### Explicit loading from untracked entities

EF8 supports loading of navigations on untracked entities even when the entity or navigation is not configured for lazy-loading. Unlike with lazy-loading, this explicit loading can be done asynchronously. For example:

```csharp
await context.Entry(blog).Collection(e => e.Posts).LoadAsync();
```

### Opt-out of lazy-loading for specific navigations

EF8 allows configuration of specific navigations to not lazy-load, even when everything else is set up to do so. For example, to configure the `Post.Author` navigation to not lazy-load, do the following:

```csharp
modelBuilder
    .Entity<Post>()
    .Navigation(p => p.Author)
    .EnableLazyLoading(false);
```

Disabling Lazy-loading like this works for both lazy-loading proxies and lazy-loading without proxies.

Lazy-loading proxies work by overriding virtual navigation properties. In classic EF6 applications, a common source of bugs is forgetting to make a navigation virtual, since the navigation will then silently not lazy-load. Therefore, EF Core proxies throw by default when a navigation is not virtual.

This can be changed in EF8 to opt-in to the classic EF6 behavior such that a navigation can be made to not lazy-load simply by making the navigation non-virtual. This opt-in is configured as part of the call to `UseLazyLoadingProxies`. For example:

```csharp
optionsBuilder.UseLazyLoadingProxies(b => b.IgnoreNonVirtualNavigations());
```

## Access to tracked entities

### Lookup tracked entities by primary, alternate, or foreign key

Internally, EF maintains data structures for finding tracked entities by primary, alternate, or foreign key. These data structures are used for efficient fixup between related entities when new entities are tracked or relationships change.

EF8 contains new public APIs so that applications can now use these data structures to efficiently lookup tracked entities. These APIs are accessed through the `Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1` of the entity type. For example, to lookup a tracked entity by its primary key:

```csharp
var blogEntry = context.Blogs.Local.FindEntry(2)!;
```

> **Tip:**
> The code shown here comes from LookupByKeySample.cs.

The `FindEntry` method returns either the `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` for the tracked entity, or `null` if no entity with the given key is being tracked. Like all methods on `LocalView`, the database is never queried, even if the entity is not found. The returned entry contains the entity itself, as well as tracking information. For example:

```csharp
Console.WriteLine($"Blog '{blogEntry.Entity.Name}' with key {blogEntry.Entity.Id} is tracked in the '{blogEntry.State}' state.");
```

Looking up an entity by anything other than a primary key <example-value> that the property name be specified. For example, to look up by an alternate key:

```csharp
var siteEntry = context.Websites.Local.FindEntry(nameof(Website.Uri), new Uri("https://www.bricelam.net/"))!;
```

Or to look up by a unique foreign key:

```csharp
var blogAtSiteEntry = context.Blogs.Local.FindEntry(nameof(Blog.SiteUri), new Uri("https://www.bricelam.net/"))!;
```

So far, the lookups have always returned a single entry, or `null`. However, some lookups can return more than one entry, such as when looking up by a non-unique foreign key. The `GetEntries` method should be used for these lookups. For example:

```csharp
var postEntries = context.Posts.Local.GetEntries(nameof(Post.BlogId), 2);
```

In all these cases, the value being used for the lookup is either a primary key, alternate key, or foreign key value. EF uses its internal data structures for these lookups. However, lookups by value can also be used for the value of any property or combination of properties. For example, to find all archived posts:

```csharp
var archivedPostEntries = context.Posts.Local.GetEntries(nameof(Post.Archived), true);
```

This lookup requires a scan of all tracked `Post` instances, and so will be less efficient than key lookups. However, it is usually still faster than naive queries using `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries``1`.

Finally, it is also possible to perform lookups against composite keys, other combinations of multiple properties, or when the property type is not known at compile time. For example:

```csharp
var postTagEntry = context.Set<PostTag>().Local.FindEntryUntyped(new object[] { 4, "TagEF" });
```
