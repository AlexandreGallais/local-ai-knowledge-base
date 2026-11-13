---
title: "What's New in EF Core 7.0 (part 14 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 14 of 16)

### Filtered Include on hidden navigations

> **Tip:**
> The code shown here comes from MiscellaneousTranslationsSample.cs.

The Include methods can now be used with `Microsoft.EntityFrameworkCore.EF.Property*`. This allows filtering and ordering even for private navigation properties, or private navigations represented by fields. For example:

```csharp
var query = context.Blogs.Include(
    blog => EF.Property<ICollection<Post>>(blog, "Posts")
        .Where(post => post.Content.Contains(".NET"))
        .OrderBy(post => post.Title));
```

This is equivalent to:

```csharp
var query = context.Blogs.Include(
    blog => Posts
        .Where(post => post.Content.Contains(".NET"))
        .OrderBy(post => post.Title));
```

But does not require `Blog.Posts` to be publicly accessible.

When using SQL Server, both queries above translate to:

```sql
SELECT [b].[Id], [b].[Name], [t].[Id], [t].[AuthorId], [t].[BlogId], [t].[Content], [t].[Discriminator], [t].[PublishedOn], [t].[Title], [t].[PromoText]
FROM [Blogs] AS [b]
LEFT JOIN (
    SELECT [p].[Id], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Discriminator], [p].[PublishedOn], [p].[Title], [p].[PromoText]
    FROM [Posts] AS [p]
    WHERE [p].[Content] LIKE N'%.NET%'
) AS [t] ON [b].[Id] = [t].[BlogId]
ORDER BY [b].[Id], [t].[Title]
```

### Cosmos translation for `Regex.IsMatch`

> **Tip:**
> The code shown here comes from CosmosQueriesSample.cs.

EF7 supports using `System.Text.RegularExpressions.Regex.IsMatch*` in LINQ queries against Azure Cosmos DB. For example:

```csharp
var containsInnerT = await context.Triangles
    .Where(o => Regex.IsMatch(o.Name, "[a-z]t[a-z]", RegexOptions.IgnoreCase))
    .ToListAsync();
```

Translates to the following SQL:

```sql
SELECT c
FROM root c
WHERE ((c["Discriminator"] = "Triangle") AND RegexMatch(c["Name"], "[a-z]t[a-z]", "i"))
```

## DbContext API and behavior enhancements

EF7 contains a variety of small improvements to `Microsoft.EntityFrameworkCore.DbContext` and related classes.

> **Tip:**
> The code for samples in this section comes from DbContextApiSample.cs.

### Suppressor for uninitialized DbSet properties

Public, settable `DbSet` properties on a `DbContext` are automatically initialized by EF Core when the `DbContext` is constructed. For example, consider the following `DbContext` definition:

```csharp
public class SomeDbContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}
```

The `Blogs` property will be set to a `DbSet<Blog>` instance as part of constructing the `DbContext` instance. This allows the context to be used for queries without any additional steps.

However, following the introduction of C# nullable reference types, the compiler now warns that the non-nullable property `Blogs` is not initialized:

> `[CS8618] Non-nullable property 'Blogs' must contain a non-null value when exiting constructor. Consider declaring the property as nullable.`

This is a bogus warning; the property is set to a non-null value by EF Core. Also, declaring the property as nullable will make the warning go away, but this is not a good idea because, conceptually, the property is not nullable and will never be null.

EF7 contains a DiagnosticSuppressor for `DbSet` properties on a `DbContext` which stops the compiler from generating this warning.

> **Tip:**
> This pattern originated in the days when C# auto-properties were very limited. With modern C#, consider making the auto-properties read-only, and then either initialize them explicitly in the `DbContext` constructor, or obtain the cached `DbSet` instance from the context when needed. For example, `public DbSet<Blog> Blogs => Set<Blog>()`.

### Distinguish cancellation from failure in logs

Sometimes an application will explicitly cancel a query or other database operation. This is usually done using a `System.Threading.CancellationToken` passed to the method performing the operation.

In EF Core 6, the events logged when an operation is canceled are the same as those logged when the operation fails for some other reason. EF7 introduces new log events specifically for canceled database operations. These new events are, by default, logged at the `Microsoft.Extensions.Logging.LogLevel.Debug` level. The following table shows the relevant events and their default log levels:

| Event                                                                                                           | Description                                                         | Default log level |
|-----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|-------------------|
| `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.QueryIterationFailed`  | An error occurred while processing the results of a query.          | `LogLevel.Error`  |
| `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.SaveChangesFailed`     | An error occurred while attempting to save changes to the database. | `LogLevel.Error`  |
| `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.CommandError`    | An error occurred while a database command was executing.           | `LogLevel.Error`  |
| `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.QueryCanceled`         | A query was canceled.                                               | `LogLevel.Debug`  |
| `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.SaveChangesCanceled`   | The database command was canceled while attempting to save changes. | `LogLevel.Debug`  |
| `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.CommandCanceled` | The execution of a `DbCommand` has been canceled.                   | `LogLevel.Debug`  |

> **Note:**
> Cancellation is detected by looking at the exception rather than checking the cancellation token. This means that cancellations not triggered via the  cancellation token will still be detected and logged in this way.

### New `IProperty` and `INavigation` overloads for `EntityEntry` methods

Code working with the EF model will often have an `Microsoft.EntityFrameworkCore.Metadata.IProperty` or `Microsoft.EntityFrameworkCore.Metadata.INavigation` representing property or navigation metadata. An EntityEntry is then used to get the property/navigation value or query its state. However, prior to EF7, this required passing the _name_ of the property or navigation to methods of the `EntityEntry`, which would then re-lookup the `IProperty` or `INavigation`. In EF7, the `IProperty` or `INavigation` can instead be passed directly, avoiding the additional lookup.

For example, consider a method to find all the siblings of a given entity:

```csharp
public static IEnumerable<TEntity> FindSiblings<TEntity>(
    this DbContext context, TEntity entity, string navigationToParent)
    where TEntity : class
{
    var parentEntry = context.Entry(entity).Reference(navigationToParent);

    return context.Entry(parentEntry.CurrentValue!)
        .Collection(parentEntry.Metadata.Inverse!)
        .CurrentValue!
        .OfType<TEntity>()
        .Where(e => !ReferenceEquals(e, entity));
}
```

This method finds the parent of a given entity, and then passes the inverse `INavigation` to the `Collection` method of the parent entry. This metadata is then used to return all siblings of the given parent. Here's an example of its use:

```csharp

Console.WriteLine($"Siblings to {post.Id}: '{post.Title}' are...");
foreach (var sibling in context.FindSiblings(post, nameof(post.Blog)))
{
    Console.WriteLine($"    {sibling.Id}: '{sibling.Title}'");
}
```

And the output:

```output
Siblings to 1: 'Announcing Entity Framework 7 Preview 7: Interceptors!' are...
    5: 'Productivity comes to .NET MAUI in Visual Studio 2022'
    6: 'Announcing .NET 7 Preview 7'
    7: 'ASP.NET Core updates in .NET 7 Preview 7'
```

### `EntityEntry` for shared-type entity types

EF Core can use the same CLR type for multiple different entity types. These are known as "shared-type entity types", and are often used to map a dictionary type with key/value pairs used for the properties of the entity type. For example, a `BuildMetadata` entity type can be defined without defining a dedicated CLR type:

```csharp
modelBuilder.SharedTypeEntity<Dictionary<string, object>>(
    "BuildMetadata", b =>
    {
        b.IndexerProperty<int>("Id");
        b.IndexerProperty<string>("Tag");
        b.IndexerProperty<Version>("Version");
        b.IndexerProperty<string>("Hash");
        b.IndexerProperty<bool>("Prerelease");
    });
```

Notice that the shared-type entity type must be named - in this case, the name is `BuildMetadata`. These entity types are then accessed using a `DbSet` for the entity type which is obtained using the name. For example:

```csharp
public DbSet<Dictionary<string, object>> BuildMetadata
    => Set<Dictionary<string, object>>("BuildMetadata");
```

This `DbSet` can be used to track entity instances:

```csharp
await context.BuildMetadata.AddAsync(
    new Dictionary<string, object>
    {
        { "Tag", "v7.0.0-rc.1.22426.7" },
        { "Version", new Version(7, 0, 0) },
        { "Prerelease", true },
        { "Hash", "dc0f3e8ef10eb1464b27f0fd4704f53c01226036" }
    });
```

And execute queries:

```csharp
var builds = await context.BuildMetadata
    .Where(metadata => !EF.Property<bool>(metadata, "Prerelease"))
    .OrderBy(metadata => EF.Property<string>(metadata, "Tag"))
    .ToListAsync();
```

Now, in EF7, there is also an `Entry` method on `DbSet` which can be used to obtain the state of an instance, _even if it is not yet tracked_. For example:

```csharp
var state = context.BuildMetadata.Entry(build).State;
```

### `ContextInitialized` is now logged as `Debug`

In EF7, the `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.ContextInitialized` event is logged at the `Microsoft.Extensions.Logging.LogLevel.Debug` level. For example:

```output
dbug: 10/7/2022 12:27:52.379 CoreEventId.ContextInitialized[10403] (Microsoft.EntityFrameworkCore.Infrastructure)
      Entity Framework Core 7.0.0 initialized 'BlogsContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer:7.0.0' with options: SensitiveDataLoggingEnabled using NetTopologySuite
```

In previous releases, it was logged at the `Microsoft.Extensions.Logging.LogLevel.Information` level. For example:

```output
info: 10/7/2022 12:30:34.757 CoreEventId.ContextInitialized[10403] (Microsoft.EntityFrameworkCore.Infrastructure)
      Entity Framework Core 7.0.0 initialized 'BlogsContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer:7.0.0' with options: SensitiveDataLoggingEnabled using NetTopologySuite
```

If desired, the log level can be changed back to `Information`:

```csharp
optionsBuilder.ConfigureWarnings(
    builder =>
    {
        builder.Log((CoreEventId.ContextInitialized, LogLevel.Information));
    });
```

### `IEntityEntryGraphIterator` is publicly usable

In EF7, the `Microsoft.EntityFrameworkCore.ChangeTracking.IEntityEntryGraphIterator` service can be used by applications. This is the service used internally when discovering a graph of entities to track, and also by `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.TrackGraph*`. Here's an example that iterates over all entities reachable from some starting entity:

```csharp
var blogEntry = context.ChangeTracker.Entries<Blog>().First();
var found = new HashSet<object>();
var iterator = context.GetService<IEntityEntryGraphIterator>();
iterator.TraverseGraph(new EntityEntryGraphNode<HashSet<object>>(blogEntry, found, null, null), node =>
{
    if (node.NodeState.Contains(node.Entry.Entity))
    {
        return false;
    }

    Console.Write($"Found with '{node.Entry.Entity.GetType().Name}'");

    if (node.InboundNavigation != null)
    {
        Console.Write($" by traversing '{node.InboundNavigation.Name}' from '{node.SourceEntry!.Entity.GetType().Name}'");
    }

    Console.WriteLine();

    node.NodeState.Add(node.Entry.Entity);

    return true;
});

Console.WriteLine();
Console.WriteLine($"Finished iterating. Found {found.Count} entities.");
Console.WriteLine();
```

Notice:

- The iterator stops traversing from a given node when the callback delegate returns `false`. This example keeps track of visited entities and returns `false` when the entity has already been visited. This prevents infinite loops resulting from cycles in the graph.
- The `EntityEntryGraphNode<TState>` object allows the state to be passed around without capturing it into the delegate.
- For every node visited other than the first, the node it was discovered from and the navigation it was discovered via are passed to the callback.
