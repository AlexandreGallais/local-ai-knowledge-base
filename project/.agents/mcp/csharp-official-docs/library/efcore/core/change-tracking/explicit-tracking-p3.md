---
title: "Explicitly Tracking Entities - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/change-tracking/explicit-tracking.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Explicitly Tracking Entities - EF Core (part 3 of 3)

## Deleting dependent/child entities

Deleting dependent/child entities from a graph is more straightforward than deleting principal/parent entities. See the next section and Changing Foreign Keys and Navigations for more information.

It is unusual to call `Remove` on an entity created with `new`. Further, unlike `Add`, `Attach` and `Update`, it is uncommon to call `Remove` on an entity that isn't already tracked in the `Unchanged` or `Modified` state. Instead it is typical to track a single entity or graph of related entities, and then call `Remove` on the entities that should be deleted. This graph of tracked entities is typically created by either:

1. Running a query for the entities
2. Using the `Attach` or `Update` methods on a graph of disconnected entities, as described in the preceding sections.

For example, the code in the previous section is more likely to obtain a post from a client and then do something like this:

```csharp
context.Attach(post);
context.Remove(post);
```

This behaves exactly the same way as the previous example, since calling `Remove` on an un-tracked entity causes it to first be attached and then marked as `Deleted`.

In more realistic examples, a graph of entities is first attached, and then some of those entities are marked as deleted. For example:

```csharp
// Attach a blog and associated posts
context.Attach(blog);

// Mark one post as Deleted
context.Remove(blog.Posts[1]);
```

All entities are marked as `Unchanged`, except the one on which `Remove` was called:

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
Post {Id: 2} Deleted
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

This entity will be deleted when SaveChanges is called. For example, when using SQLite:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='2' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Posts"
WHERE "Id" = @p0;
SELECT changes();
```

After SaveChanges completes, the deleted entity is detached from the DbContext since it no longer exists in the database. Other entities remain in the `Unchanged` state:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
```

## Deleting principal/parent entities

Each relationship that connects two entity types has a principal or parent end, and a dependent or child end. The dependent/child entity is the one with the foreign key property. In a one-to-many relationship, the principal/parent is on the "one" side, and the dependent/child is on the "many" side. See Relationships for more information.

In the preceding examples we were deleting a post, which is a dependent/child entity in the blog-posts one-to-many relationship. This is relatively straightforward since removal of a dependent/child entity does not have any impact on other entities. On the other hand, deleting a principal/parent entity must also impact any dependent/child entities. Not doing so would leave a foreign key value referencing a primary key value that no longer exists. This is an invalid model state and results in a referential constraint error in most databases.

This invalid model state can be handled in two ways:

1. Setting FK values to null. This indicates that the dependents/children are no longer related to any principal/parent. This is the default for optional relationships where the foreign key must be nullable. Setting the FK to null is not valid for required relationships, where the foreign key is typically non-nullable.
2. Deleting the dependents/children. This is the default for required relationships, and is also valid for optional relationships.

See Changing Foreign Keys and Navigations for detailed information on change tracking and relationships.

### Optional relationships

The `Post.BlogId` foreign key <example-value> is nullable in the model we have been using. This means the relationship is optional, and hence the default behavior of EF Core is to set `BlogId` foreign key <example-value> to null when the blog is deleted. For example:

```csharp
// Attach a blog and associated posts
context.Attach(blog);

// Mark the blog as deleted
context.Remove(blog);
```

Inspecting the change tracker debug view following the call to `Remove` shows that, as expected, the blog is now marked as `Deleted`:

```output
Blog {Id: 1} Deleted
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}]
Post {Id: 1} Modified
  Id: 1 PK
  BlogId: <null> FK Modified Originally 1
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: <null>
Post {Id: 2} Modified
  Id: 2 PK
  BlogId: <null> FK Modified Originally 1
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: <null>
```

More interestingly, all the related posts are now marked as `Modified`. This is because the foreign key <example-value> in each entity has been set to null. Calling SaveChanges updates the foreign key value for each post to null in the database, before then deleting the blog:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p1='1' (DbType = String), @p0=NULL], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0
WHERE "Id" = @p1;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p1='2' (DbType = String), @p0=NULL], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0
WHERE "Id" = @p1;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p2='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Blogs"
WHERE "Id" = @p2;
SELECT changes();
```

After SaveChanges completes, the deleted entity is detached from the DbContext since it no longer exists in the database. Other entities are now marked as `Unchanged` with null foreign key <example-value>, which matches the state of the database:

```output
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: <null> FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: <null>
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: <null> FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: <null>
```

### Required relationships

If the `Post.BlogId` foreign key <example-value> is non-nullable, then the relationship between blogs and posts becomes "required". In this situation, EF Core will, by default, delete dependent/child entities when the principal/parent is deleted. For example, deleting a blog with related posts as in the previous example:

```csharp
// Attach a blog and associated posts
context.Attach(blog);

// Mark the blog as deleted
context.Remove(blog);
```

Inspecting the change tracker debug view following the call to `Remove` shows that, as expected, the blog is again marked as `Deleted`:

```output
Blog {Id: 1} Deleted
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}]
Post {Id: 1} Deleted
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Deleted
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

More interestingly in this case is that all related posts have also been marked as `Deleted`. Calling SaveChanges causes the blog and all related posts to be deleted from the database:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p0='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Posts"
WHERE "Id" = @p0;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p0='2' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Posts"
WHERE "Id" = @p0;
SELECT changes();

-- Executed DbCommand (0ms) [Parameters=[@p1='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
DELETE FROM "Blogs"
WHERE "Id" = @p1;
```

After SaveChanges completes, all the deleted entities are detached from the DbContext since they no longer exist in the database. Output from the debug view is therefore empty.

> **Note:**
> This document only scratches the surface on working with relationships in EF Core. See Relationships for more information on modeling relationships, and Changing Foreign Keys and Navigations for more information on updating/deleting dependent/child entities when calling SaveChanges.

## Custom tracking with TrackGraph

`Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.TrackGraph*` works like `Add`, `Attach` and `Update` except that it generates a callback for every entity instance before tracking it. This allows custom logic to be used when determining how to track individual entities in a graph.

For example, consider the rule EF Core uses when tracking entities with generated key <example-value>: if the key value is zero, then the entity is new and should be inserted. Let's extend this rule to say if the key value is negative, then the entity should be deleted. This allows us to change the primary key <example-value> in entities of a disconnected graph to mark deleted entities:

```csharp
blog.Posts.Add(
    new Post
    {
        Title = "Announcing .NET 5.0",
        Content = ".NET 5.0 includes many enhancements, including single file applications, more..."
    }
);

var toDelete = blog.Posts.Single(e => e.Title == "Announcing F# 5");
toDelete.Id = -toDelete.Id;
```

This disconnected graph can then be tracked using TrackGraph:

```csharp
public static async Task UpdateBlog(Blog blog)
{
    using var context = new BlogsContext();

    context.ChangeTracker.TrackGraph(
        blog, node =>
        {
            var propertyEntry = node.Entry.Property("Id");
            var keyValue = (int)propertyEntry.CurrentValue;

            if (keyValue == 0)
            {
                node.Entry.State = EntityState.Added;
            }
            else if (keyValue < 0)
            {
                propertyEntry.CurrentValue = -keyValue;
                node.Entry.State = EntityState.Deleted;
            }
            else
            {
                node.Entry.State = EntityState.Modified;
            }

            Console.WriteLine($"Tracking {node.Entry.Metadata.DisplayName()} with key value {keyValue} as {node.Entry.State}");
        });

    await context.SaveChangesAsync();
}
```

For each entity in the graph, the code above checks the primary key value _before tracking the entity_. For unset (zero) key <example-value>, the code does what EF Core would normally do. That is, if the key is not set, then the entity is marked as `Added`. If the key is set and the value is non-negative, then the entity is marked as `Modified`. However, if a negative key value is found, then its real, non-negative value is restored and the entity is tracked as `Deleted`.

The output from running this code is:

```output
Tracking Blog with key value 1 as Modified
Tracking Post with key value 1 as Modified
Tracking Post with key value -2 as Deleted
Tracking Post with key value 0 as Added
```

> **Note:**
> For simplicity, this code assumes each entity has an integer primary key <example-value> called `Id`. This could be codified into an abstract base class or interface. Alternately, the primary key <example-value> or properties could be obtained from the `Microsoft.EntityFrameworkCore.Metadata.IEntityType` metadata such that this code would work with any type of entity.

TrackGraph has two overloads. In the simple overload used above, EF Core determines when to stop traversing the graph. Specifically, it stops visiting new related entities from a given entity when that entity is either already tracked, or when the callback does not start tracking the entity.

The advanced overload, `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.TrackGraph``1(System.Object,``0,System.Func{Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntryGraphNode{``0},System.Boolean})`, has a callback that returns a bool. If the callback returns false, then graph traversal stops, otherwise it continues. Care must be taken to avoid infinite loops when using this overload.

The advanced overload also allows state to be supplied to TrackGraph and this state is then passed to each callback.
