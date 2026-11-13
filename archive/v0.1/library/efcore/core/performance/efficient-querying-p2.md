---
title: "Efficient Querying - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/performance/efficient-querying.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Efficient Querying - EF Core (part 2 of 2)

## Buffering and streaming

Buffering refers to loading all your query results into memory, whereas streaming means that EF hands the application a single result each time, never containing the entire resultset in memory. In principle, the memory requirements of a streaming query are fixed - they are the same whether the query returns 1 row or 1000; a buffering query, on the other hand, requires more memory the more rows are returned. For queries that produce large resultsets, this can be an important performance factor.

Whether a query buffers or streams depends on how it is evaluated:

```csharp
// ToList and ToArray cause the entire resultset to be buffered:
var blogsList = await context.Posts.Where(p => p.Title.StartsWith("A")).ToListAsync();
var blogsArray = await context.Posts.Where(p => p.Title.StartsWith("A")).ToArrayAsync();

// Foreach streams, processing one row at a time:
await foreach (var blog in context.Posts.Where(p => p.Title.StartsWith("A")).AsAsyncEnumerable())
{
    // ...
}

// AsAsyncEnumerable also streams, allowing you to execute LINQ operators on the client-side:
var doubleFilteredBlogs = context.Posts
    .Where(p => p.Title.StartsWith("A")) // Translated to SQL and executed in the database
    .AsAsyncEnumerable()
    .Where(p => SomeDotNetMethod(p)); // Executed at the client on all database results
```

If your queries return just a few results, then you probably don't have to worry about this. However, if your query might return large numbers of rows, it's worth giving thought to streaming instead of buffering.

> **Note:**
> Avoid using `System.Linq.Enumerable.ToList*` or `System.Linq.Enumerable.ToArray*` if you intend to use another LINQ operator on the result - this will needlessly buffer all results into memory. Use `System.Linq.Enumerable.AsEnumerable*` instead.

### Internal buffering by EF

In certain situations, EF will itself buffer the resultset internally, regardless of how you evaluate your query. The two cases where this happens are:

* When a retrying execution strategy is in place. This is done to make sure the same results are returned if the query is retried later.
* When split query is used, the resultsets of all but the last query are buffered - unless MARS (Multiple Active Result Sets) is enabled on SQL Server. This is because it is usually impossible to have multiple query resultsets active at the same time.

Note that this internal buffering occurs in addition to any buffering you cause via LINQ operators. For example, if you use `System.Linq.Enumerable.ToList*` on a query and a retrying execution strategy is in place, the resultset is loaded into memory *twice*: once internally by EF, and once by `System.Linq.Enumerable.ToList*`.

## Tracking, no-tracking and identity resolution

It's recommended to read the dedicated page on tracking and no-tracking before continuing with this section.

EF tracks entity instances by default, so that changes on them are detected and persisted when `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` is called. Another effect of tracking queries is that EF detects if an instance has already been loaded for your data, and will automatically return that tracked instance rather than returning a new one; this is called *identity resolution*. From a performance perspective, change tracking means the following:

* EF internally maintains a dictionary of tracked instances. When new data is loaded, EF checks the dictionary to see if an instance is already tracked for that entity's key (identity resolution). The dictionary maintenance and lookups take up some time when loading the query's results.
* Before handing a loaded instance to the application, EF *snapshots* that instance and keeps the snapshot internally. When `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` is called, the application's instance is compared with the snapshot to discover the changes to be persisted. The snapshot takes up more memory, and the snapshotting process itself takes time; it's sometimes possible to specify different, possibly more efficient snapshotting behavior via value comparers, or to use change-tracking proxies to bypass the snapshotting process altogether (though that comes with its own set of disadvantages).

In read-only scenarios where changes aren't saved back to the database, the above overheads can be avoided by using no-tracking queries. However, since no-tracking queries do not perform identity resolution, a database row which is referenced by multiple other loaded rows will be materialized as different instances.

To illustrate, assume we are loading a large number of Posts from the database, as well as the Blog referenced by each Post. If 100 Posts happen to reference the same Blog, a tracking query detects this via identity resolution, and all Post instances will refer the same de-duplicated Blog instance. A no-tracking query, in contrast, duplicates the same Blog 100 times - and application code must be written accordingly.

Here are the results for a benchmark comparing tracking vs. no-tracking behavior for a query loading 10 Blogs with 20 Posts each. The source code is available here, feel free to use it as a basis for your own measurements.

|       Method | NumBlogs | NumPostsPerBlog |       Mean |    Error |   StdDev |     Median | Ratio | RatioSD |   Gen 0 |   Gen 1 | Gen 2 | Allocated |
|------------- |--------- |---------------- |-----------:|---------:|---------:|-----------:|------:|--------:|--------:|--------:|------:|----------:|
|   AsTracking |       10 |              20 | 1,414.7 us | 27.20 us | 45.44 us | 1,405.5 us |  1.00 |    0.00 | 60.5469 | 13.6719 |     - | 380.11 KB |
| AsNoTracking |       10 |              20 |   993.3 us | 24.04 us | 65.40 us |   966.2 us |  0.71 |    0.05 | 37.1094 |  6.8359 |     - | 232.89 KB |

Finally, it is possible to perform updates without the overhead of change tracking, by utilizing a no-tracking query and then attaching the returned instance to the context, specifying which changes are to be made. This transfers the burden of change tracking from EF to the user, and should only be attempted if the change tracking overhead has been shown to be unacceptable via profiling or benchmarking.

## Using SQL queries

In some cases, more optimized SQL exists for your query, which EF does not generate. This can happen when the SQL construct is an extension specific to your database that's unsupported, or simply because EF does not translate to it yet. In these cases, writing SQL by hand can provide a substantial performance boost, and EF supports several ways to do this.

* Use SQL queries directly in your query, e.g. via `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*`. EF even lets you compose over the SQL with regular LINQ queries, allowing you to express only a part of the query in SQL. This is a good technique when the SQL only needs to be used in a single query in your codebase.
* Define a user-defined function (UDF), and then call that from your queries. Note that EF allows UDFs to return full resultsets - these are known as table-valued functions (TVFs) - and also allows mapping a `DbSet` to a function, making it look just like just another table.
* Define a database view and query from it in your queries. Note that unlike functions, views cannot accept parameters.

> **Note:**
> Raw SQL should generally be used as a last resort, after making sure that EF can't generate the SQL you want, and when performance is important enough for the given query to justify it. Using raw SQL brings considerable maintenance disadvantages.

## Asynchronous programming

As a general rule, in order for your application to be scalable, it's important to always use asynchronous APIs rather than synchronous one (e.g. `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*` rather than `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*`). Synchronous APIs block the thread for the duration of database I/O, increasing the need for threads and the number of thread context switches that must occur.

For more information, see the page on async programming.

> **Warning:**
> Avoid mixing synchronous and asynchronous code in the same application - it's very easy to inadvertently trigger subtle thread-pool starvation issues.

> **Warning:**
> The async implementation of Microsoft.Data.SqlClient unfortunately has some known issues (e.g. #593, #601, and others). If you're seeing unexpected performance problems, try using sync command execution instead, especially when dealing with large text or binary values.

## Additional resources

* See the advanced performance topics page for additional topics related to efficient querying.
* See the performance section of the null comparison documentation page for some best practices when comparing nullable values.
