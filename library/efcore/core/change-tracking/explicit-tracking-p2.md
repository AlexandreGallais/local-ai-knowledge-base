---
title: "Explicitly Tracking Entities - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/explicit-tracking.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Explicitly Tracking Entities - EF Core (part 2 of 3)

## Attaching existing entities

### Explicit key values

Entities returned from queries are tracked in the `Unchanged` state. The `Unchanged` state means that the entity has not been modified since it was queried. A disconnected entity, perhaps returned from a web client in an HTTP request, can be put into this state using either `Microsoft.EntityFrameworkCore.DbContext.Attach*`, `Microsoft.EntityFrameworkCore.DbContext.AttachRange*`, or the equivalent methods on `Microsoft.EntityFrameworkCore.DbSet`1`. For example, to start tracking an existing blog:

```csharp
context.Attach(
    new Blog { Id = 1, Name = ".NET Blog", });
```

> **Note:**
> The examples here are creating entities explicitly with `new` for simplicity. Normally the entity instances will have come from another source, such as being deserialized from a client, or being created from data in an HTTP Post.

Inspecting the change tracker debug view following this call shows that the entity is tracked in the `Unchanged` state:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Posts: []
```

Just like `Add`, `Attach` actually sets an entire graph of connected entities to the `Unchanged` state. For example, to attach an existing blog and associated existing posts:

```csharp
context.Attach(
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

The context is now tracking all these entities as `Unchanged`:

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

Calling SaveChanges at this point will have no effect. All the entities are marked as `Unchanged`, so there is nothing to update in the database.

### Generated key values

As mentioned above, integer and GUID key properties are configured to use automatically generated key values by default. This has a major advantage when working with disconnected entities: an unset key value indicates that the entity has not yet been inserted into the database. This allows the change tracker to automatically detect new entities and put them in the `Added` state. For example, consider attaching this graph of a blog and posts:

```csharp
context.Attach(
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
            },
            new Post
            {
                Title = "Announcing .NET 5.0",
                Content = ".NET 5.0 includes many enhancements, including single file applications, more..."
            },
        }
    });
```

The blog has a key value of 1, indicating that it already exists in the database. Two of the posts also have key values set, but the third does not. EF Core will see this key value as 0, the CLR default for an integer. This results in EF Core marking the new entity as `Added` instead of `Unchanged`:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}, {Id: -2147482636}]
Post {Id: -2147482636} Added
  Id: -2147482636 PK Temporary
  BlogId: 1 FK
  Content: '.NET 5.0 includes many enhancements, including single file a...'
  Title: 'Announcing .NET 5.0'
  Blog: {Id: 1}
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
```

Calling SaveChanges at this point does nothing with the `Unchanged` entities, but inserts the new entity into the database. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='1' (DbType = String), @p1='.NET 5.0 includes many enhancements, including single file applications, more...' (Size = 80), @p2='Announcing .NET 5.0' (Size = 19)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Posts" ("BlogId", "Content", "Title")
VALUES (@p0, @p1, @p2);
SELECT "Id"
FROM "Posts"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();
```

The important point to notice here is that, with generated key values, EF Core is able to **automatically distinguish new from existing entities in a disconnected graph**. In a nutshell, when using generated keys, EF Core will always insert an entity when that entity has no key value set.

## Updating existing entities

### Explicit key values

`Microsoft.EntityFrameworkCore.DbContext.Update*`, `Microsoft.EntityFrameworkCore.DbContext.UpdateRange*`, and the equivalent methods on `Microsoft.EntityFrameworkCore.DbSet`1` behave exactly as the `Attach` methods described above, except that entities are put into the `Modified` instead of the `Unchanged` state. For example, to start tracking an existing blog as `Modified`:

```csharp
context.Update(
    new Blog { Id = 1, Name = ".NET Blog", });
```

Inspecting the change tracker debug view following this call shows that the context is tracking this entity in the `Modified` state:

```output
Blog {Id: 1} Modified
  Id: 1 PK
  Name: '.NET Blog' Modified
  Posts: []
```

Just like with `Add` and `Attach`, `Update` actually marks an _entire graph_ of related entities as `Modified`. For example, to attach an existing blog and associated existing posts as `Modified`:

```csharp
context.Update(
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

The context is now tracking all these entities as `Modified`:

```output
Blog {Id: 1} Modified
  Id: 1 PK
  Name: '.NET Blog' Modified
  Posts: [{Id: 1}, {Id: 2}]
Post {Id: 1} Modified
  Id: 1 PK
  BlogId: 1 FK Modified Originally <null>
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...' Modified
  Title: 'Announcing the Release of EF Core 5.0' Modified
  Blog: {Id: 1}
Post {Id: 2} Modified
  Id: 2 PK
  BlogId: 1 FK Modified Originally <null>
  Content: 'F# 5 is the latest version of F#, the functional programming...' Modified
  Title: 'Announcing F# 5' Modified
  Blog: {Id: 1}
```

Calling SaveChanges at this point will cause updates to be sent to the database for all these entities. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p1='1' (DbType = String), @p0='.NET Blog' (Size = 9)], CommandType='Text', CommandTimeout='30']
UPDATE "Blogs" SET "Name" = @p0
WHERE "Id" = @p1;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p3='1' (DbType = String), @p0='1' (DbType = String), @p1='Announcing the release of EF Core 5.0, a full featured cross-platform...' (Size = 72), @p2='Announcing the Release of EF Core 5.0' (Size = 37)], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0, "Content" = @p1, "Title" = @p2
WHERE "Id" = @p3;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p3='2' (DbType = String), @p0='1' (DbType = String), @p1='F# 5 is the latest version of F#, the functional programming language...' (Size = 72), @p2='Announcing F# 5' (Size = 15)], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0, "Content" = @p1, "Title" = @p2
WHERE "Id" = @p3;
SELECT changes();
```

### Generated key values

As with `Attach`, generated key values have the same major benefit for `Update`: an unset key value indicates that the entity is new and has not yet been inserted into the database. As with `Attach`, this allows the DbContext to automatically detect new entities and put them in the `Added` state. For example, consider calling `Update` with this graph of a blog and posts:

```csharp
context.Update(
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
            },
            new Post
            {
                Title = "Announcing .NET 5.0",
                Content = ".NET 5.0 includes many enhancements, including single file applications, more..."
            },
        }
    });
```

As with the `Attach` example, the post with no key value is detected as new and set to the `Added` state. The other entities are marked as `Modified`:

```output
Blog {Id: 1} Modified
  Id: 1 PK
  Name: '.NET Blog' Modified
  Posts: [{Id: 1}, {Id: 2}, {Id: -2147482633}]
Post {Id: -2147482633} Added
  Id: -2147482633 PK Temporary
  BlogId: 1 FK
  Content: '.NET 5.0 includes many enhancements, including single file a...'
  Title: 'Announcing .NET 5.0'
  Blog: {Id: 1}
Post {Id: 1} Modified
  Id: 1 PK
  BlogId: 1 FK Modified Originally <null>
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...' Modified
  Title: 'Announcing the Release of EF Core 5.0' Modified
  Blog: {Id: 1}
Post {Id: 2} Modified
  Id: 2 PK
  BlogId: 1 FK Modified Originally <null>
  Content: 'F# 5 is the latest version of F#, the functional programming...' Modified
  Title: 'Announcing F# 5' Modified
  Blog: {Id: 1}
```

Calling `SaveChanges` at this point will cause updates to be sent to the database for all the existing entities, while the new entity is inserted. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p1='1' (DbType = String), @p0='.NET Blog' (Size = 9)], CommandType='Text', CommandTimeout='30']
UPDATE "Blogs" SET "Name" = @p0
WHERE "Id" = @p1;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p3='1' (DbType = String), @p0='1' (DbType = String), @p1='Announcing the release of EF Core 5.0, a full featured cross-platform...' (Size = 72), @p2='Announcing the Release of EF Core 5.0' (Size = 37)], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0, "Content" = @p1, "Title" = @p2
WHERE "Id" = @p3;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p3='2' (DbType = String), @p0='1' (DbType = String), @p1='F# 5 is the latest version of F#, the functional programming language...' (Size = 72), @p2='Announcing F# 5' (Size = 15)], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0, "Content" = @p1, "Title" = @p2
WHERE "Id" = @p3;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p0='1' (DbType = String), @p1='.NET 5.0 includes many enhancements, including single file applications, more...' (Size = 80), @p2='Announcing .NET 5.0' (Size = 19)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Posts" ("BlogId", "Content", "Title")
VALUES (@p0, @p1, @p2);
SELECT "Id"
FROM "Posts"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();
```

This is a very easy way to generate updates and inserts from a disconnected graph. However, it results in updates or inserts being sent to the database for every property of every tracked entity, even when some property values may not have been changed. Don't be too scared by this; for many applications with small graphs, this can be an easy and pragmatic way of generating updates. That being said, other more complex patterns can sometimes result in more efficient updates, as described in Identity Resolution in EF Core.

## Deleting existing entities

For an entity to be deleted by SaveChanges it must be tracked in the `Deleted` state. Entities are typically put in the `Deleted` state by calling one of `Microsoft.EntityFrameworkCore.DbContext.Remove*`, `Microsoft.EntityFrameworkCore.DbContext.RemoveRange*`, or the equivalent methods on `Microsoft.EntityFrameworkCore.DbSet`1`. For example, to mark an existing post as `Deleted`:

```csharp
context.Remove(
    new Post { Id = 2 });
```

Inspecting the change tracker debug view following this call shows that the context is tracking the entity in the `Deleted` state:

```output
Post {Id: 2} Deleted
  Id: 2 PK
  BlogId: <null> FK
  Content: <null>
  Title: <null>
  Blog: <null>
```

This entity will be deleted when SaveChanges is called. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='2' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Posts"
WHERE "Id" = @p0;
SELECT changes();
```

After SaveChanges completes, the deleted entity is detached from the DbContext since it no longer exists in the database. The debug view is therefore empty because no entities are being tracked.
