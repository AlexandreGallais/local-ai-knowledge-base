---
title: "What's New in EF Core 7.0 (part 4 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 4 of 16)

## ExecuteUpdate and ExecuteDelete (Bulk updates)

By default, EF Core tracks changes to entities, and then sends updates to the database when one of the `SaveChanges` methods is called. Changes are only sent for properties and relationships that have actually changed. Also, the tracked entities remain in sync with the changes sent to the database. This mechanism is an efficient and convenient way to send general-purpose inserts, updates, and deletes to the database. These changes are also batched to reduce the number of database round-trips.

However, it is sometimes useful to execute update or delete commands on the database without involving the change tracker. EF7 enables this with the new `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdate*` and `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteDelete*` methods. These methods are applied to a LINQ query and will update or delete entities in the database based on the results of that query. Many entities can be updated with a single command and the entities are not loaded into memory, which means this can result in more efficient updates and deletes.

However, keep in mind that:

- The specific changes to make must be specified explicitly; they are not automatically detected by EF Core.
- Any tracked entities will not be kept in sync.
- Additional commands may need to be sent in the correct order so as not to violate database constraints. For example, deleting dependents before a principal can be deleted.

All of this means that the `ExecuteUpdate` and `ExecuteDelete` methods complement, rather than replace, the existing `SaveChanges` mechanism.

### Basic `ExecuteDelete` examples

> **Tip:**
> The code shown here comes from ExecuteDeleteSample.cs.

Calling `ExecuteDelete` or `ExecuteDeleteAsync` on a `DbSet` immediately deletes all entities of that `DbSet` from the database. For example, to delete all `Tag` entities:

```csharp
await context.Tags.ExecuteDeleteAsync();
```

This executes the following SQL when using SQL Server:

```sql
DELETE FROM [t]
FROM [Tags] AS [t]
```

More interestingly, the query can contain a filter. For example:

```csharp
await context.Tags.Where(t => t.Text.Contains(".NET")).ExecuteDeleteAsync();
```

This executes the following SQL:

```sql
DELETE FROM [t]
FROM [Tags] AS [t]
WHERE [t].[Text] LIKE N'%.NET%'
```

The query can also use more complex filters, including navigations to other types. For example, to delete tags only from old blog posts:

```csharp
await context.Tags.Where(t => t.Posts.All(e => e.PublishedOn.Year < 2022)).ExecuteDeleteAsync();
```

Which executes:

```sql
DELETE FROM [t]
FROM [Tags] AS [t]
WHERE NOT EXISTS (
    SELECT 1
    FROM [PostTag] AS [p]
    INNER JOIN [Posts] AS [p0] ON [p].[PostsId] = [p0].[Id]
    WHERE [t].[Id] = [p].[TagsId] AND NOT (DATEPART(year, [p0].[PublishedOn]) < 2022))
```

### Basic `ExecuteUpdate` examples

> **Tip:**
> The code shown here comes from ExecuteUpdateSample.cs.

`ExecuteUpdate` and `ExecuteUpdateAsync` behave in a very similar way to the `ExecuteDelete` methods. The main difference is that an update requires knowing _which_ properties to update, and _how_ to update them. This is achieved using one or more calls to `SetProperty`. For example, to update the `Name` of every blog:

```csharp
await context.Blogs.ExecuteUpdateAsync(
    s => s.SetProperty(b => b.Name, b => b.Name + " *Featured!*"));
```

The first parameter of `SetProperty` specifies which property to update; in this case, `Blog.Name`. The second parameter specifies how the new value should be calculated; in this case, by taking the existing value and appending `"*Featured!*"`. The resulting SQL is:

```sql
UPDATE [b]
SET [b].[Name] = [b].[Name] + N' *Featured!*'
FROM [Blogs] AS [b]
```

As with `ExecuteDelete`, the query can be used to filter which entities are updated. In addition, multiple calls to `SetProperty` can be used to update more than one property on the target entity. For example, to update the `Title` and `Content` of all posts published before 2022:

```csharp
await context.Posts
    .Where(p => p.PublishedOn.Year < 2022)
    .ExecuteUpdateAsync(s => s
        .SetProperty(b => b.Title, b => b.Title + " (" + b.PublishedOn.Year + ")")
        .SetProperty(b => b.Content, b => b.Content + " ( This content was published in " + b.PublishedOn.Year + ")"));
```

In this case the generated SQL is a bit more complicated:

```sql
UPDATE [p]
SET [p].[Content] = (([p].[Content] + N' ( This content was published in ') + COALESCE(CAST(DATEPART(year, [p].[PublishedOn]) AS nvarchar(max)), N'')) + N')',
    [p].[Title] = (([p].[Title] + N' (') + COALESCE(CAST(DATEPART(year, [p].[PublishedOn]) AS nvarchar(max)), N'')) + N')'
FROM [Posts] AS [p]
WHERE DATEPART(year, [p].[PublishedOn]) < 2022
```

Finally, again as with `ExecuteDelete`, the filter can reference other tables. For example, to update all tags from old posts:

```csharp
await context.Tags
    .Where(t => t.Posts.All(e => e.PublishedOn.Year < 2022))
    .ExecuteUpdateAsync(s => s.SetProperty(t => t.Text, t => t.Text + " (old)"));
```

Which generates:

```sql
UPDATE [t]
SET [t].[Text] = [t].[Text] + N' (old)'
FROM [Tags] AS [t]
WHERE NOT EXISTS (
    SELECT 1
    FROM [PostTag] AS [p]
    INNER JOIN [Posts] AS [p0] ON [p].[PostsId] = [p0].[Id]
    WHERE [t].[Id] = [p].[TagsId] AND NOT (DATEPART(year, [p0].[PublishedOn]) < 2022))
```

For more information and code samples on `ExecuteUpdate` and `ExecuteDelete`, see ExecuteUpdate and ExecuteDelete.

### Inheritance and multiple tables

`ExecuteUpdate` and `ExecuteDelete` can only act on a single table. This has implications when working with different inheritance mapping strategies. Generally, there are no problems when using the TPH mapping strategy, since there is only one table to modify. For example, deleting all `FeaturedPost` entities:

```csharp
await context.Set<FeaturedPost>().ExecuteDeleteAsync();
```

Generates the following SQL when using TPH mapping:

```sql
DELETE FROM [p]
FROM [Posts] AS [p]
WHERE [p].[Discriminator] = N'FeaturedPost'
```

There are also no issues for this case when using the TPC mapping strategy, since again only changes to a single table are needed:

```sql
DELETE FROM [f]
FROM [FeaturedPosts] AS [f]
```

However, attempting this when using the TPT mapping strategy will fail since it would require deleting rows from two different tables.

Adding a filter to the query often means the operation will fail with both the TPC and TPT strategies. This is again because the rows may need to be deleted from multiple tables. For example, this query:

```csharp
await context.Posts.Where(p => p.Author!.Name.StartsWith("Arthur")).ExecuteDeleteAsync();
```

Generates the following SQL when using TPH:

```sql
DELETE FROM [p]
FROM [Posts] AS [p]
LEFT JOIN [Authors] AS [a] ON [p].[AuthorId] = [a].[Id]
WHERE [a].[Name] IS NOT NULL AND ([a].[Name] LIKE N'Arthur%')
```

But fails when using TPC or TPT.

> **Tip:**
> Issue #10879 tracks adding support for automatically sending multiple commands in these scenarios. Vote for this issue if it's something you would like to see implemented.

### `ExecuteDelete` and relationships

As mentioned above, it may be necessary to delete or update dependent entities before the principal of a relationship can be deleted. For example, each `Post` is a dependent of its associated `Author`. This means that an author cannot be deleted if a post still references it; doing so will violate the foreign key <example-value> in the database. For example, attempting this:

```csharp
await context.Authors.ExecuteDeleteAsync();
```

Will result in the following exception on SQL Server:

> Microsoft.Data.SqlClient.SqlException (0x80131904): The DELETE statement conflicted with the REFERENCE constraint "FK_Posts_Authors_AuthorId". The conflict occurred in database "TphBlogsContext", table "dbo.Posts", column 'AuthorId'.
The statement has been terminated.

To fix this, we must first either delete the posts, or sever the relationship between each post and its author by setting `AuthorId` foreign key <example-value> to null. For example, using the delete option:

```csharp
await context.Posts.TagWith("Deleting posts...").ExecuteDeleteAsync();
await context.Authors.TagWith("Deleting authors...").ExecuteDeleteAsync();
```

> **Tip:**
> `TagWith` can be used to tag `ExecuteDelete` or `ExecuteUpdate` in the same way as it tags normal queries.

This results in two separate commands; the first to delete the dependents:

```sql
-- Deleting posts...

DELETE FROM [p]
FROM [Posts] AS [p]
```

And the second to delete the principals:

```sql
-- Deleting authors...

DELETE FROM [a]
FROM [Authors] AS [a]
```

> **Important:**
> Multiple `ExecuteDelete` and `ExecuteUpdate` commands will not be contained in a single transaction by default. However, the DbContext transaction APIs can be used in the normal way to wrap these commands in a transaction.

> **Tip:**
> Sending these commands in a single round-trip depends on Issue #10879. Vote for this issue if it's something you would like to see implemented.

Configuring cascade deletes in the database can be very useful here. In our model, the relationship between `Blog` and `Post` is required, which causes EF Core to configure a cascade delete by convention.  This means when a blog is deleted from the database, then all its dependent posts will also be deleted. It then follows that to delete all blogs and posts we need only delete the blogs:

```csharp
await context.Blogs.ExecuteDeleteAsync();
```

This results in the following SQL:

```sql
DELETE FROM [b]
FROM [Blogs] AS [b]
```

Which, as it is deleting a blog, will also cause all related posts to be deleted by the configured cascade delete.
