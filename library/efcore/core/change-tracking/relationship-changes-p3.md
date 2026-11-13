---
title: "Changing Foreign Keys and Navigations - EF Core (part 3 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/relationship-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Changing Foreign Keys and Navigations - EF Core (part 3 of 5)

## Fixup for added or deleted entities

### Adding to a collection navigation

EF Core performs the following actions when it detects that a new dependent/child entity has been added to a collection navigation:

- If the entity is not tracked, then it is tracked. (The entity will usually be in the `Added` state. However, if the entity type is configured to use generated keys and the primary key value is set, then the entity is tracked in the `Unchanged` state.)
- If the entity is associated with a different principal/parent, then that relationship is severed.
- The entity becomes associated with the principal/parent that owns the collection navigation.
- Navigations and foreign key <example-value> are fixed up for all entities involved.

Based on this we can see that to move a post from one blog to another we don't actually need to remove it from the old collection navigation before adding it to the new one. So the code from the example above can be changed from:

```csharp
var post = vsBlog.Posts.Single(e => e.Title.StartsWith("Disassembly improvements"));
vsBlog.Posts.Remove(post);
dotNetBlog.Posts.Add(post);
```

To:

```csharp
var post = vsBlog.Posts.Single(e => e.Title.StartsWith("Disassembly improvements"));
dotNetBlog.Posts.Add(post);
```

EF Core sees that the post has been added to a new blog and automatically removes it from the collection on the first blog.

### Removing from a collection navigation

Removing a dependent/child entity from the collection navigation of the principal/parent causes severing of the relationship to that principal/parent. What happens next depends on whether the relationship is optional or required.

#### Optional relationships

By default for optional relationships, the foreign key value is set to null. This means that the dependent/child is no longer associated with _any_ principal/parent. For example, let's load a blog and posts and then remove one of the posts from the `Blog.Posts` collection navigation:

```csharp
var post = dotNetBlog.Posts.Single(e => e.Title == "Announcing F# 5");
dotNetBlog.Posts.Remove(post);
```

Looking at the change tracking debug view after this change shows that:

- The `Post.BlogId` FK has been set to null (`BlogId: <null> FK Modified Originally 1`)
- The `Post.Blog` reference navigation has been set to null (`Blog: <null>`)
- The post has been removed from `Blog.Posts` collection navigation (`Posts: [{Id: 1}]`)

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: <null>
  Posts: [{Id: 1}]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
  Tags: []
Post {Id: 2} Modified
  Id: 2 PK
  BlogId: <null> FK Modified Originally 1
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: <null>
  Tags: []
```

Notice that the post is _not_ marked as `Deleted`. It is marked as `Modified` so that the FK value in the database will be set to null when SaveChanges is called.

#### Required relationships

Setting the FK value to null is not allowed (and is usually not possible) for required relationships. Therefore, severing a required relationship means that the dependent/child entity must be either re-parented to a new principal/parent, or removed from the database when SaveChanges is called to avoid a referential constraint violation. This is known as "deleting orphans", and is the default behavior in EF Core for required relationships.

For example, let's change the relationship between blog and posts to be required and then run the same code as in the previous example:

```csharp
var post = dotNetBlog.Posts.Single(e => e.Title == "Announcing F# 5");
dotNetBlog.Posts.Remove(post);
```

Looking at the debug view after this change shows that:

- The post has been marked as `Deleted` such that it will be deleted from the database when SaveChanges is called.
- The `Post.Blog` reference navigation has been set to null (`Blog: <null>`).
- The post has been removed from `Blog.Posts` collection navigation (`Posts: [{Id: 1}]`).

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: <null>
  Posts: [{Id: 1}]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
  Tags: []
Post {Id: 2} Deleted
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: <null>
  Tags: []
```

Notice that the `Post.BlogId` remains unchanged since for a required relationship it cannot be set to null.

Calling SaveChanges results in the orphaned post being deleted:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='2' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Posts"
WHERE "Id" = @p0;
SELECT changes();
```

#### Delete orphans timing and re-parenting

By default, marking orphans as `Deleted` happens as soon as the relationship change is detected. However, this process can be delayed until SaveChanges is actually called. This can be useful to avoid making orphans of entities that have been removed from one principal/parent, but will be re-parented with a new principal/parent before SaveChanges is called. `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DeleteOrphansTiming` is used to set this timing. For example:

```csharp
context.ChangeTracker.DeleteOrphansTiming = CascadeTiming.OnSaveChanges;

var post = vsBlog.Posts.Single(e => e.Title.StartsWith("Disassembly improvements"));
vsBlog.Posts.Remove(post);

context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);

dotNetBlog.Posts.Add(post);

context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);

await context.SaveChangesAsync();
```

After removing the post from the first collection the object is not marked as `Deleted` as it was in the previous example. Instead, EF Core is tracking that the relationship is severed _even though this is a required relationship_. (The FK value is considered null by EF Core even though it cannot really be null because the type is not nullable. This is known as a "conceptual null".)

```output
Post {Id: 3} Modified
  Id: 3 PK
  BlogId: <null> FK Modified Originally 2
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: <null>
  Tags: []
```

Calling SaveChanges at this time would result in the orphaned post being deleted. However, if as in the example above, post is associated with a new blog before SaveChanges is called, then it will be fixed up appropriately to that new blog and is no longer considered an orphan:

```output
Post {Id: 3} Modified
  Id: 3 PK
  BlogId: 1 FK Modified Originally 2
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: 1}
  Tags: []
```

SaveChanges called at this point will update the post in the database rather than deleting it.

It is also possible to turn off automatic deletion of orphans. This will result in an exception if SaveChanges is called while an orphan is being tracked. For example, this code:

```csharp
var dotNetBlog = await context.Blogs.Include(e => e.Posts).SingleAsync(e => e.Name == ".NET Blog");

context.ChangeTracker.DeleteOrphansTiming = CascadeTiming.Never;

var post = dotNetBlog.Posts.Single(e => e.Title == "Announcing F# 5");
dotNetBlog.Posts.Remove(post);

await context.SaveChangesAsync(); // Throws
```

Will throw this exception:

> System.InvalidOperationException: The association between entities 'Blog' and 'Post' with the key value '{BlogId: 1}' has been severed, but the relationship is either marked as required or is implicitly required because the foreign key is not nullable. If the dependent/child entity should be deleted when a required relationship is severed, configure the relationship to use cascade deletes.

Deletion of orphans, as well as cascade deletes, can be forced at any time by calling `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.CascadeChanges`. Combining this with setting the delete orphan timing to `Never` will ensure orphans are never deleted unless EF Core is explicitly instructed to do so.

### Changing a reference navigation

Changing the reference navigation of a one-to-many relationship has the same effect as changing the collection navigation on the other end of the relationship. Setting the reference navigation of dependent/child to null is equivalent to removing the entity from the collection navigation of the principal/parent. All fixup and database changes happen as described in the previous section, including making the entity an orphan if the relationship is required.

#### Optional one-to-one relationships

For one-to-one relationships, changing a reference navigation causes any previous relationship to be severed. For optional relationships, this means that the FK value on the previously related dependent/child is set to null. For example:

```csharp
using var context = new BlogsContext();

var dotNetBlog = await context.Blogs.Include(e => e.Assets).SingleAsync(e => e.Name == ".NET Blog");
dotNetBlog.Assets = new BlogAssets();

context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);

await context.SaveChangesAsync();
```

The debug view before calling SaveChanges shows that the new assets has replaced the existing assets, which is now marked as `Modified` with a null `BlogAssets.BlogId` FK value:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: {Id: -2147482629}
  Posts: []
BlogAssets {Id: -2147482629} Added
  Id: -2147482629 PK Temporary
  Banner: <null>
  BlogId: 1 FK
  Blog: {Id: 1}
BlogAssets {Id: 1} Modified
  Id: 1 PK
  Banner: <null>
  BlogId: <null> FK Modified Originally 1
  Blog: <null>
```

This results in an update and an insert when SaveChanges is called:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p1='1' (DbType = String), @p0=NULL], CommandType='Text', CommandTimeout='30']
UPDATE "Assets" SET "BlogId" = @p0
WHERE "Id" = @p1;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p2=NULL, @p3='1' (Nullable = true) (DbType = String)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Assets" ("Banner", "BlogId")
VALUES (@p2, @p3);
SELECT "Id"
FROM "Assets"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();
```

#### Required one-to-one relationships

Running the same code as in the previous example, but this time with a required one-to-one relationship, shows that the previously associated `BlogAssets` is now marked as `Deleted`, since it becomes an orphan when the new `BlogAssets` takes its place:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: {Id: -2147482639}
  Posts: []
BlogAssets {Id: -2147482639} Added
  Id: -2147482639 PK Temporary
  Banner: <null>
  BlogId: 1 FK
  Blog: {Id: 1}
BlogAssets {Id: 1} Deleted
  Id: 1 PK
  Banner: <null>
  BlogId: 1 FK
  Blog: <null>
```

This then results in a delete and an insert when SaveChanges is called:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Assets"
WHERE "Id" = @p0;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p1=NULL, @p2='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
INSERT INTO "Assets" ("Banner", "BlogId")
VALUES (@p1, @p2);
SELECT "Id"
FROM "Assets"
WHERE changes() = 1 AND "rowid" = last_insert_rowid();
```

The timing of marking orphans as deleted can be changed in the same way as shown for collection navigations and has the same effects.
