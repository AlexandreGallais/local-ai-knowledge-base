---
title: "Changing Foreign Keys and Navigations - EF Core (part 4 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/change-tracking/relationship-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Changing Foreign Keys and Navigations - EF Core (part 4 of 5)

### Deleting an entity

#### Optional relationships

When an entity is marked as `Deleted`, for example by calling `Microsoft.EntityFrameworkCore.DbContext.Remove*`, then references to the deleted entity are removed from the navigations of other entities. For optional relationships, the FK values in dependent entities are set to null.

For example, let's mark the Visual Studio blog as `Deleted`:

```csharp
using var context = new BlogsContext();

var vsBlog = await context.Blogs
    .Include(e => e.Posts)
    .Include(e => e.Assets)
    .SingleAsync(e => e.Name == "Visual Studio Blog");

context.Remove(vsBlog);

Console.WriteLine(context.ChangeTracker.DebugView.LongView);

await context.SaveChangesAsync();
```

Looking at the change tracker debug view before calling SaveChanges shows:

```output
Blog {Id: 2} Deleted
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: {Id: 2}
  Posts: [{Id: 3}, {Id: 4}]
BlogAssets {Id: 2} Modified
  Id: 2 PK
  Banner: <null>
  BlogId: <null> FK Modified Originally 2
  Blog: <null>
Post {Id: 3} Modified
  Id: 3 PK
  BlogId: <null> FK Modified Originally 2
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: <null>
  Tags: []
Post {Id: 4} Modified
  Id: 4 PK
  BlogId: <null> FK Modified Originally 2
  Content: 'Examine when database queries were executed and measure how ...'
  Title: 'Database Profiling with Visual Studio'
  Blog: <null>
  Tags: []
```

Notice that:

- The blog is marked as `Deleted`.
- The assets related to the deleted blog has a null FK value (`BlogId: <null> FK Modified Originally 2`) and a null reference navigation (`Blog: <null>`)
- Each post related to the deleted blog has a null FK value (`BlogId: <null> FK Modified Originally 2`) and a null reference navigation (`Blog: <null>`)

#### Required relationships

The fixup behavior for required relationships is the same as for optional relationships except that the dependent/child entities are marked as `Deleted` since they cannot exist without a principal/parent and must be removed from the database when SaveChanges is called to avoid a referential constraint exception. This is known as "cascade delete", and is the default behavior in EF Core for required relationships. For example, running the same code as in the previous example but with a required relationship results in the following debug view before SaveChanges is called:

```output
Blog {Id: 2} Deleted
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: {Id: 2}
  Posts: [{Id: 3}, {Id: 4}]
BlogAssets {Id: 2} Deleted
  Id: 2 PK
  Banner: <null>
  BlogId: 2 FK
  Blog: {Id: 2}
Post {Id: 3} Deleted
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: 2}
  Tags: []
Post {Id: 4} Deleted
  Id: 4 PK
  BlogId: 2 FK
  Content: 'Examine when database queries were executed and measure how ...'
  Title: 'Database Profiling with Visual Studio'
  Blog: {Id: 2}
  Tags: []
```

As expected, the dependents/children are now marked as `Deleted`. However, notice that the navigations on the deleted entities have _not_ changed. This may seem strange, but it avoids completely shredding a deleted graph of entities by clearing all navigations. That is, the blog, asset, and posts still form a graph of entities even after having been deleted. This makes it much easier to un-delete a graph of entities than was the case in EF6 where the graph was shredded.

#### Cascade delete timing and re-parenting

By default, cascade delete happens as soon as the parent/principal is marked as `Deleted`. This is the same as for deleting orphans, as described previously. As with deleting orphans, this process can be delayed until SaveChanges is called, or even disabled entirely, by setting `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.CascadeDeleteTiming` appropriately. This is useful in the same way as it is for deleting orphans, including for re-parenting children/dependents after deletion of a principal/parent.

Cascade deletes, as well as deleting orphans, can be forced at any time by calling `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.CascadeChanges`. Combining this with setting the cascade delete timing to `Never` will ensure cascade deletes never happen unless EF Core is explicitly instructed to do so.

> **Tip:**
> Cascade delete and deleting orphans are closely related. Both result in deleting dependent/child entities when the relationship to their required principal/parent is severed. For cascade delete, this severing happens because the principal/parent is itself deleted. For orphans, the principal/parent entity still exists, but is no longer related to the dependent/child entities.
