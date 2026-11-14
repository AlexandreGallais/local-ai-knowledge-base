---
title: "Accessing Tracked Entities - EF Core (part 4 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/change-tracking/entity-entries.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Accessing Tracked Entities - EF Core (part 4 of 4)

## Using DbSet.Local to query tracked entities

EF Core queries are always executed on the database, and only return entities that have been saved to the database. `Microsoft.EntityFrameworkCore.DbSet`1.Local` provides a mechanism to query the DbContext for local, tracked entities.

Since `DbSet.Local` is used to query tracked entities, it is typical to load entities into the DbContext and then work with those loaded entities. This is especially true for data binding, but can also be useful in other situations. For example, in the following code the database is first queried for all blogs and posts. The `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.Load*` extension method is used to execute this query with the results tracked by the context without being returned directly to the application. (Using `ToList` or similar has the same effect but with the overhead of creating the returned list, which is not needed here.) The example then uses `DbSet.Local` to access the locally tracked entities:

```csharp
using var context = new BlogsContext();

await context.Blogs.Include(e => e.Posts).LoadAsync();

foreach (var blog in context.Blogs.Local)
{
    Console.WriteLine($"Blog: {blog.Name}");
}

foreach (var post in context.Posts.Local)
{
    Console.WriteLine($"Post: {post.Title}");
}
```

Notice that, unlike `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries`, `DbSet.Local` returns entity instances directly. An EntityEntry can, of course, always be obtained for the returned entity by calling `System.Data.Entity.DbContext.Entry*`.

### The local view

`Microsoft.EntityFrameworkCore.DbSet`1.Local` returns a view of locally tracked entities that reflects the current `Microsoft.EntityFrameworkCore.EntityState` of those entities. Specifically, this means that:

- `Added` entities are included. Note that this is not the case for normal EF Core queries, since `Added` entities do not yet exist in the database and so are therefore never returned by a database query.
- `Deleted` entities are excluded. Note that this is again not the case for normal EF Core queries, since `Deleted` entities still exist in the database and so _are_ returned by database queries.

All of this means that `DbSet.Local` is a view over the data that reflects the current conceptual state of the entity graph, with `Added` entities included and `Deleted` entities excluded. This matches what database state is expected to be after SaveChanges is called.

This is typically the ideal view for data binding, since it presents to the user the data as they understand it based on the changes made by the application.

The following code demonstrates this by marking one post as `Deleted` and then adding a new post, marking it as `Added`:

```csharp
using var context = new BlogsContext();

var posts = await context.Posts.Include(e => e.Blog).ToListAsync();

Console.WriteLine("Local view after loading posts:");

foreach (var post in context.Posts.Local)
{
    Console.WriteLine($"  Post: {post.Title}");
}

context.Remove(posts[1]);

context.Add(
    new Post
    {
        Title = "What’s next for System.Text.Json?",
        Content = ".NET 5.0 was released recently and has come with many...",
        Blog = posts[0].Blog
    });

Console.WriteLine("Local view after adding and deleting posts:");

foreach (var post in context.Posts.Local)
{
    Console.WriteLine($"  Post: {post.Title}");
}
```

The output from this code is:

```output
Local view after loading posts:
  Post: Announcing the Release of EF Core 5.0
  Post: Announcing F# 5
  Post: Announcing .NET 5.0
Local view after adding and deleting posts:
  Post: What’s next for System.Text.Json?
  Post: Announcing the Release of EF Core 5.0
  Post: Announcing .NET 5.0
```

Notice that the deleted post is removed from the local view, and the added post is included.

### Using Local to add and remove entities

`Microsoft.EntityFrameworkCore.DbSet`1.Local` returns an instance of `Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1`. This is an implementation of `System.Collections.Generic.ICollection`1` that generates and responds to notifications when entities are added and removed from the collection. (This is the same concept as `System.Collections.ObjectModel.ObservableCollection`1`, but implemented as a projection over existing EF Core change tracking entries, rather than as an independent collection.)

The local view's notifications are hooked into DbContext change tracking such that the local view stays in sync with the DbContext. Specifically:

- Adding a new entity to `DbSet.Local` causes it to be tracked by the DbContext, typically in the `Added` state. (If the entity already has a generated key value, then it is tracked as `Unchanged` instead.)
- Removing an entity from `DbSet.Local` causes it to be marked as `Deleted`.
- An entity that becomes tracked by the DbContext will automatically appear in the `DbSet.Local` collection. For example, executing a query to bring in more entities automatically causes the local view to be updated.
- An entity that is marked as `Deleted` will be removed from the local collection automatically.

This means the local view can be used to manipulate tracked entities simply by adding and removing from the collection. For example, let's modify the previous example code to add and remove posts from the local collection:

```csharp
using var context = new BlogsContext();

var posts = await context.Posts.Include(e => e.Blog).ToListAsync();

Console.WriteLine("Local view after loading posts:");

foreach (var post in context.Posts.Local)
{
    Console.WriteLine($"  Post: {post.Title}");
}

context.Posts.Local.Remove(posts[1]);

context.Posts.Local.Add(
    new Post
    {
        Title = "What’s next for System.Text.Json?",
        Content = ".NET 5.0 was released recently and has come with many...",
        Blog = posts[0].Blog
    });

Console.WriteLine("Local view after adding and deleting posts:");

foreach (var post in context.Posts.Local)
{
    Console.WriteLine($"  Post: {post.Title}");
}
```

The output remains unchanged from the previous example because changes made to the local view are synced with the DbContext.

### Using the local view for Windows Forms or WPF data binding

`Microsoft.EntityFrameworkCore.DbSet`1.Local` forms the basis for data binding to EF Core entities. However, both Windows Forms and WPF work best when used with the specific type of notifying collection that they expect. The local view supports creating these specific collection types:

- `Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1.ToObservableCollection` returns an `System.Collections.ObjectModel.ObservableCollection`1` for WPF data binding.
- `Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1.ToBindingList` returns a `System.ComponentModel.BindingList`1` for Windows Forms data binding.

For example:

```csharp
ObservableCollection<Post> observableCollection = context.Posts.Local.ToObservableCollection();
BindingList<Post> bindingList = context.Posts.Local.ToBindingList();
```

See Get Started with WPF for more information on WPF data binding with EF Core, and Get Started with Windows Forms for more information on Windows Forms data binding with EF Core.

> **Tip:**
> The local view for a given DbSet instance is created lazily when first accessed and then cached. LocalView creation itself is fast and it does not use significant memory. However, it does call DetectChanges, which can be slow for large numbers of entities. The collections created by `ToObservableCollection` and `ToBindingList` are also created lazily and then cached. Both of these methods create new collections, which can be slow and use a lot of memory when thousands of entities are involved.
