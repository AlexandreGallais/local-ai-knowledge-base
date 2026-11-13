---
title: "Explicitly Tracking Entities - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/explicit-tracking.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Explicitly Tracking Entities

Each `Microsoft.EntityFrameworkCore.DbContext` instance tracks changes made to entities. These tracked entities in turn drive the changes to the database when `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` is called.

Entity Framework Core (EF Core) change tracking works best when the same `Microsoft.EntityFrameworkCore.DbContext` instance is used to both query for entities and update them by calling `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*`. This is because EF Core automatically tracks the state of queried entities and then detects any changes made to these entities when SaveChanges is called. This approach is covered in Change Tracking in EF Core.

> **Tip:**
> This document assumes that entity states and the basics of EF Core change tracking are understood. See Change Tracking in EF Core for more information on these topics.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

## Introduction

Entities can be explicitly "attached" to a `Microsoft.EntityFrameworkCore.DbContext` such that the context then tracks those entities. This is primarily useful when:

1. Creating new entities that will be inserted into the database.
2. Re-attaching disconnected entities that were previously queried by a _different_ DbContext instance.

The first of these will be needed by most applications, and is primarily handled by the `Microsoft.EntityFrameworkCore.DbContext.Add*` methods.

The second is only needed by applications that change entities or their relationships **_while the entities are not being tracked_**. For example, a web application may send entities to the web client where the user makes changes and sends the entities back. These entities are referred to as "disconnected" since they were originally queried from a DbContext, but were then disconnected from that context when sent to the client.

The web application must now re-attach these entities so that they are again tracked and indicate the changes that have been made such that `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` can make appropriate updates to the database. This is primarily handled by the `Microsoft.EntityFrameworkCore.DbContext.Attach*` and `Microsoft.EntityFrameworkCore.DbContext.Update*` methods.

> **Tip:**
> Attaching entities to the _same DbContext instance_ that they were queried from should not normally be needed. Do not routinely perform a no-tracking query and then attach the returned entities to the same context. This will be slower than using a tracking query, and may also result in issues such as missing shadow property values, making it harder to get right.

### Generated versus explicit key values

By default, integer and GUID key properties are configured to use automatically generated key values. This has a **major advantage for change tracking: an unset key value indicates that the entity is "new"**. By "new", we mean that it has not yet been inserted into the database.

Two models are used in the following sections. The first is configured to **not** use generated key values:

```csharp
public class Blog
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }

    public string Name { get; set; }

    public IList<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }

    public string Title { get; set; }
    public string Content { get; set; }

    public int? BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

Non-generated (i.e. explicitly set) key values are shown first in each example because everything is very explicit and easy to follow. This is then followed by an example where generated key values are used:

```csharp
public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IList<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int? BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

Notice that the key properties in this model need no additional configuration here since using generated key values is the default for simple integer keys.

## Inserting new entities

### Explicit key values

An entity must be tracked in the `Added` state to be inserted by `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*`. Entities are typically put in the Added state by calling one of `Microsoft.EntityFrameworkCore.DbContext.Add*`, `Microsoft.EntityFrameworkCore.DbContext.AddRange*`, `Microsoft.EntityFrameworkCore.DbContext.AddAsync*`, `Microsoft.EntityFrameworkCore.DbContext.AddRangeAsync*`, or the equivalent methods on `Microsoft.EntityFrameworkCore.DbSet`1`.

> **Tip:**
> These methods all work in the same way in the context of change tracking. See Additional Change Tracking Features for more information.

For example, to start tracking a new blog:

```csharp
context.Add(
    new Blog { Id = 1, Name = ".NET Blog", });
```

Inspecting the change tracker debug view following this call shows that the context is tracking the new entity in the `Added` state:

```output
Blog {Id: 1} Added
  Id: 1 PK
  Name: '.NET Blog'
  Posts: []
```

However, the Add methods don't just work on an individual entity. They actually start tracking an _entire graph of related entities_, putting them all to the `Added` state. For example, to insert a new blog and associated new posts:

```csharp
context.Add(
    new Blog
    {
        Id = 1,
        Name = ".NET Blog",
        Posts =
        {
            new Post
            {
                Id = 1,
                Title = "Announcing the Release of EF Core 5.0",
                Content = "Announcing the release of EF Core 5.0, a full featured cross-platform..."
            },
            new Post
            {
                Id = 2,
                Title = "Announcing F# 5",
                Content = "F# 5 is the latest version of F#, the functional programming language..."
            }
        }
    });
```

The context is now tracking all these entities as `Added`:

```output
Blog {Id: 1} Added
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}]
Post {Id: 1} Added
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Added
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

Notice that explicit values have been set for the `Id` key properties in the examples above. This is because the model here has been configured to use explicitly set key values, rather than automatically generated key values. When not using generated keys, the key properties must be explicitly set _before_ calling `Add`. These key values are then inserted when SaveChanges is called. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='1' (DbType = String), @p1='.NET Blog' (Size = 9)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Blogs" ("Id", "Name")
VALUES (@p0, @p1);

-- Executed DbCommand (0ms) [Parameters=[@p2='1' (DbType = String), @p3='1' (DbType = String), @p4='Announcing the release of EF Core 5.0, a full featured cross-platform...' (Size = 72), @p5='Announcing the Release of EF Core 5.0' (Size = 37)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Posts" ("Id", "BlogId", "Content", "Title")
VALUES (@p2, @p3, @p4, @p5);

-- Executed DbCommand (0ms) [Parameters=[@p0='2' (DbType = String), @p1='1' (DbType = String), @p2='F# 5 is the latest version of F#, the functional programming language...' (Size = 72), @p3='Announcing F# 5' (Size = 15)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Posts" ("Id", "BlogId", "Content", "Title")
VALUES (@p0, @p1, @p2, @p3);
```

All of these entities are tracked in the `Unchanged` state after SaveChanges completes, since these entities now exist in the database:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

### Generated key values

As mentioned above, integer and GUID key properties are configured to use automatically generated key values by default. This means that the application _must not set any key value explicitly_. For example, to insert a new blog and posts all with generated key values:

```csharp
context.Add(
    new Blog
    {
        Name = ".NET Blog",
        Posts =
        {
            new Post
            {
                Title = "Announcing the Release of EF Core 5.0",
                Content = "Announcing the release of EF Core 5.0, a full featured cross-platform..."
            },
            new Post
            {
                Title = "Announcing F# 5",
                Content = "F# 5 is the latest version of F#, the functional programming language..."
            }
        }
    });
```

As with explicit key values, the context is now tracking all these entities as `Added`:

```output
Blog {Id: -2147482644} Added
  Id: -2147482644 PK Temporary
  Name: '.NET Blog'
  Posts: [{Id: -2147482637}, {Id: -2147482636}]
Post {Id: -2147482637} Added
  Id: -2147482637 PK Temporary
  BlogId: -2147482644 FK Temporary
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: -2147482644}
Post {Id: -2147482636} Added
  Id: -2147482636 PK Temporary
  BlogId: -2147482644 FK Temporary
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: -2147482644}
```

Notice in this case that temporary key values have been generated for each entity. These values are used by EF Core until SaveChanges is called, at which point real key values are read back from the database. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='.NET Blog' (Size = 9)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Blogs" ("Name")
VALUES (@p0);
SELECT "Id"
FROM "Blogs"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();

-- Executed DbCommand (0ms) [Parameters=[@p1='1' (DbType = String), @p2='Announcing the release of EF Core 5.0, a full featured cross-platform...' (Size = 72), @p3='Announcing the Release of EF Core 5.0' (Size = 37)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Posts" ("BlogId", "Content", "Title")
VALUES (@p1, @p2, @p3);
SELECT "Id"
FROM "Posts"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();

-- Executed DbCommand (0ms) [Parameters=[@p0='1' (DbType = String), @p1='F# 5 is the latest version of F#, the functional programming language...' (Size = 72), @p2='Announcing F# 5' (Size = 15)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Posts" ("BlogId", "Content", "Title")
VALUES (@p0, @p1, @p2);
SELECT "Id"
FROM "Posts"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();
```

After SaveChanges completes, all of the entities have been updated with their real key values and are tracked in the `Unchanged` state since they now match the state in the database:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

This is exactly the same end-state as the previous example that used explicit key values.

> **Tip:**
> An explicit key value can still be set even when using generated key values. EF Core will then attempt to insert using this key value. Some database configurations, including SQL Server with Identity columns, do not support such inserts and will throw (see these docs for a workaround).
