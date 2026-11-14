---
title: "Efficient Querying - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/performance/efficient-querying.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Efficient Querying

Querying efficiently is a vast subject, that covers subjects as wide-ranging as indexes, related entity loading strategies, and many others. This section details some common themes for making your queries faster, and pitfalls users typically encounter.

## Use indexes properly

The main deciding factor in whether a query runs fast or not is whether it will properly utilize indexes where appropriate: databases are typically used to hold large amounts of data, and queries which traverse entire tables are typically sources of serious performance issues. Indexing issues aren't easy to spot, because it isn't immediately obvious whether a given query will use an index or not. For example:

```csharp
// Matches on start, so uses an index (on SQL Server)
var posts1 = await context.Posts.Where(p => p.Title.StartsWith("A")).ToListAsync();
// Matches on end, so does not use the index
var posts2 = await context.Posts.Where(p => p.Title.EndsWith("A")).ToListAsync();
```

A good way to spot indexing issues is to first pinpoint a slow query, and then examine its query plan via your database's favorite tool; see the performance diagnosis page for more information on how to do that. The query plan displays whether the query traverses the entire table, or uses an index.

As a general rule, there isn't any special EF knowledge to using indexes or diagnosing performance issues related to them; general database knowledge related to indexes is just as relevant to EF applications as to applications not using EF. The following lists some general guidelines to keep in mind when using indexes:

* While indexes speed up queries, they also slow down updates since they need to be kept up-to-date. Avoid defining indexes which aren't needed, and consider using index filters to limit the index to a subset of the rows, thereby reducing this overhead.
* Composite indexes can speed up queries which filter on multiple columns, but they can also speed up queries which don't filter on all the index's columns - depending on ordering. For example, an index on columns A and B speeds up queries filtering by A and B as well as queries filtering only by A, but it does not speed up queries only filtering over B.
* If a query filters by an expression over a column (e.g. `price / 2`), a simple index cannot be used. However, you can define a stored persisted column for your expression, and create an index over that. Some databases also support expression indexes, which can be directly used to speed up queries filtering by any expression.
* Different databases allow indexes to be configured in various ways, and in many cases EF Core providers expose these via the Fluent API. For example, the SQL Server provider allows you to configure whether an index is clustered, or set its fill factor. Consult your provider's documentation for more information.

## Project only properties you need

EF Core makes it very easy to query out entity instances, and then use those instances in code. However, querying entity instances can frequently pull back more data than necessary from your database. Consider the following:

```csharp
await foreach (var blog in context.Blogs.AsAsyncEnumerable())
{
    Console.WriteLine("Blog: " + blog.Url);
}
```

Although this code only actually needs each Blog's `Url` property, the entire Blog entity is fetched, and unneeded columns are transferred from the database:

```sql
SELECT [b].[BlogId], [b].[CreationDate], [b].[Name], [b].[Rating], [b].[Url]
FROM [Blogs] AS [b]
```

This can be optimized by using `Select` to tell EF which columns to project out:

```csharp
await foreach (var blogName in context.Blogs.Select(b => b.Url).AsAsyncEnumerable())
{
    Console.WriteLine("Blog: " + blogName);
}
```

The resulting SQL pulls back only the needed columns:

```sql
SELECT [b].[Url]
FROM [Blogs] AS [b]
```

If you need to project out more than one column, project out to a C# anonymous type with the properties you want.

Note that this technique is very useful for read-only queries, but things get more complicated if you need to *update* the fetched blogs, since EF's change tracking only works with entity instances. It's possible to perform updates without loading entire entities by attaching a modified Blog instance and telling EF which properties have changed, but that is a more advanced technique that may not be worth it.

## Limit the resultset size

By default, a query returns all rows that matches its filters:

```csharp
var blogsAll = await context.Posts
    .Where(p => p.Title.StartsWith("A"))
    .ToListAsync();
```

Since the number of rows returned depends on actual data in your database, it's impossible to know how much data will be loaded from the database, how much memory will be taken up by the results, and how much additional load will be generated when processing these results (e.g. by sending them to a user browser over the network). Crucially, test databases frequently contain little data, so that everything works well while testing, but performance problems suddenly appear when the query starts running on real-world data and many rows are returned.

As a result, it's usually worth giving thought to limiting the number of results:

```csharp
var blogs25 = await context.Posts
    .Where(p => p.Title.StartsWith("A"))
    .Take(25)
    .ToListAsync();
```

At a minimum, your UI could show a message indicating that more rows may exist in the database (and allow retrieving them in some other manner). A full-blown solution would implement *pagination*, where your UI only shows a certain number of rows at a time, and allow users to advance to the next page as needed; see the next section for more details on how to implement this efficiently.

## Efficient pagination

Pagination refers to retrieving results in pages, rather than all at once; this is typically done for large resultsets, where a user interface is shown that allows the user to navigate to the next or previous page of the results. A common way to implement pagination with databases is to use the `Skip` and `Take` operators (`OFFSET` and `LIMIT` in SQL); while this is an intuitive implementation, it's also quite inefficient. For pagination that allows moving one page at a time (as opposed to jumping to arbitrary pages), consider using *keyset pagination* instead.

For more information, see the documentation page on pagination.

## Avoid cartesian explosion when loading related entities

In relational databases, all related entities are loaded by introducing JOINs in single query.

```sql
SELECT [b].[BlogId], [b].[OwnerId], [b].[Rating], [b].[Url], [p].[PostId], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Rating], [p].[Title]
FROM [Blogs] AS [b]
LEFT JOIN [Post] AS [p] ON [b].[BlogId] = [p].[BlogId]
ORDER BY [b].[BlogId], [p].[PostId]
```

If a typical blog has multiple related posts, rows for these posts will duplicate the blog's information. This duplication leads to the so-called "cartesian explosion" problem. As more one-to-many relationships are loaded, the amount of duplicated data may grow and adversely affect the performance of your application.

EF allows avoiding this effect via the use of "split queries", which load the related entities via separate queries. For more information, read the documentation on split and single queries.

> **Note:**
> The current implementation of split queries executes a roundtrip for each query. We plan to improve this in the future, and execute all queries in a single roundtrip.

## Load related entities eagerly when possible

It's recommended to read the dedicated page on related entities before continuing with this section.

When dealing with related entities, we usually know in advance what we need to load: a typical example would be loading a certain set of Blogs, along with all their Posts. In these scenarios, it is always better to use eager loading, so that EF can fetch all the required data in one roundtrip. The filtered include feature also allows you to limit which related entities you'd like to load, while keeping the loading process eager and therefore doable in a single roundtrip:

```csharp
using (var context = new BloggingContext())
{
    var filteredBlogs = await context.Blogs
        .Include(
            blog => blog.Posts
                .Where(post => post.BlogId == 1)
                .OrderByDescending(post => post.Title)
                .Take(5))
        .ToListAsync();
}
```

In other scenarios, we may not know which related entity we're going to need before we get its principal entity. For example, when loading some Blog, we may need to consult some other data source - possibly a webservice - in order to know whether we're interested in that Blog's Posts. In these cases, explicit or lazy loading can be used to fetch related entities separately, and populate the Blog's Posts navigation. Note that since these methods aren't eager, they require additional roundtrips to the database, which is source of slowdown; depending on your specific scenario, it may be more efficient to just always load all Posts, rather than to execute the additional roundtrips and selectively get only the Posts you need.

### Beware of lazy loading

Lazy loading often seems like a very useful way to write database logic, since EF Core automatically loads related entities from the database as they are accessed by your code. This avoids loading related entities that aren't needed (like explicit loading), and seemingly frees the programmer from having to deal with related entities altogether. However, lazy loading is particularly prone for producing unneeded extra roundtrips which can slow the application.

Consider the following:

```csharp
foreach (var blog in await context.Blogs.ToListAsync())
{
    foreach (var post in blog.Posts)
    {
        Console.WriteLine($"Blog {blog.Url}, Post: {post.Title}");
    }
}
```

This seemingly innocent piece of code iterates through all the blogs and their posts, printing them out. Turning on EF Core's statement logging reveals the following:

```console
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT [b].[BlogId], [b].[Rating], [b].[Url]
      FROM [Blogs] AS [b]
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (5ms) [Parameters=[@__p_0='1'], CommandType='Text', CommandTimeout='30']
      SELECT [p].[PostId], [p].[BlogId], [p].[Content], [p].[Title]
      FROM [Post] AS [p]
      WHERE [p].[BlogId] = @__p_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__p_0='2'], CommandType='Text', CommandTimeout='30']
      SELECT [p].[PostId], [p].[BlogId], [p].[Content], [p].[Title]
      FROM [Post] AS [p]
      WHERE [p].[BlogId] = @__p_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__p_0='3'], CommandType='Text', CommandTimeout='30']
      SELECT [p].[PostId], [p].[BlogId], [p].[Content], [p].[Title]
      FROM [Post] AS [p]
      WHERE [p].[BlogId] = @__p_0

... and so on
```

What's going on here? Why are all these queries being sent for the simple loops above? With lazy loading, a Blog's Posts are only (lazily) loaded when its Posts property is accessed; as a result, each iteration in the inner foreach triggers an additional database query, in its own roundtrip. As a result, after the initial query loading all the blogs, we then have another query *per blog*, loading all its posts; this is sometimes called the *N+1* problem, and it can cause very significant performance issues.

Assuming we're going to need all of the blogs' posts, it makes sense to use eager loading here instead. We can use the Include operator to perform the loading, but since we only need the Blogs' URLs (and we should only load what's needed). So we'll use a projection instead:

```csharp
await foreach (var blog in context.Blogs.Select(b => new { b.Url, b.Posts }).AsAsyncEnumerable())
{
    foreach (var post in blog.Posts)
    {
        Console.WriteLine($"Blog {blog.Url}, Post: {post.Title}");
    }
}
```

This will make EF Core fetch all the Blogs - along with their Posts - in a single query. In some cases, it may also be useful to avoid cartesian explosion effects by using split queries.

> **Warning:**
> Because lazy loading makes it extremely easy to inadvertently trigger the N+1 problem, it is recommended to avoid it. Eager or explicit loading make it very clear in the source code when a database roundtrip occurs.
