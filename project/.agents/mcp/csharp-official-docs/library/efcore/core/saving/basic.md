---
title: "Basic SaveChanges - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/saving/basic.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Basic <example-value>

`Microsoft.EntityFrameworkCore.DbContext.SaveChanges` is one of two techniques for saving changes to the database with EF. With this method, you perform one or more *tracked changes* (add, update, delete), and then apply those changes by calling the `SaveChanges` method. As an alternative, `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdate*` and `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteDelete*` can be used without involving the change tracker. For an introductory comparison of these two techniques, see the Overview page on saving data.

> **Tip:**
> You can view this article's sample on GitHub.

## Adding Data

Use the `Microsoft.EntityFrameworkCore.DbSet`1.Add*` method to add new instances of your entity classes. The data will be inserted into the database when you call `Microsoft.EntityFrameworkCore.DbContext.SaveChanges`:

```csharp
using (var context = new BloggingContext())
{
    var blog = new Blog { Url = "http://example.com" };
    context.Blogs.Add(blog);
    await context.SaveChangesAsync();
}
```

> **Tip:**
> The `Add`, `Attach`, and `Update` methods all work on the full graph of entities passed to them, as described in the Related Data section. Alternately, the EntityEntry.State property can be used to set the state of just a single entity. For example, `context.Entry(blog).State = EntityState.Modified`.

## Updating Data

EF automatically detects changes made to an existing entity that is tracked by the context. This includes entities that you load/query from the database, and entities that were previously added and saved to the database.

Simply modify the values assigned to properties and then call `SaveChanges`:

```csharp
using (var context = new BloggingContext())
{
    var blog = await context.Blogs.SingleAsync(b => b.Url == "http://example.com");
    blog.Url = "http://example.com/blog";
    await context.SaveChangesAsync();
}
```

## Deleting Data

Use the `Microsoft.EntityFrameworkCore.DbSet`1.Remove*` method to delete instances of your entity classes:

```csharp
using (var context = new BloggingContext())
{
    var blog = await context.Blogs.SingleAsync(b => b.Url == "http://example.com/blog");
    context.Blogs.Remove(blog);
    await context.SaveChangesAsync();
}
```

If the entity already exists in the database, it will be deleted during `SaveChanges`. If the entity has not yet been saved to the database (that is, it is tracked as added) then it will be removed from the context and will no longer be inserted when `SaveChanges` is called.

## Multiple operations in a single SaveChanges

You can combine multiple Add/Update/Remove operations into a single call to `SaveChanges`:

```csharp
using (var context = new BloggingContext())
{
    // seeding database
    context.Blogs.Add(new Blog { Url = "http://example.com/blog" });
    context.Blogs.Add(new Blog { Url = "http://example.com/another_blog" });
    await context.SaveChangesAsync();
}

using (var context = new BloggingContext())
{
    // add
    context.Blogs.Add(new Blog { Url = "http://example.com/blog_one" });
    context.Blogs.Add(new Blog { Url = "http://example.com/blog_two" });

    // update
    var firstBlog = await context.Blogs.FirstAsync();
    firstBlog.Url = "";

    // remove
    var lastBlog = await context.Blogs.OrderBy(e => e.BlogId).LastAsync();
    context.Blogs.Remove(lastBlog);

    await context.SaveChangesAsync();
}
```

> **Note:**
> For most database providers, `SaveChanges` is transactional. This means all the operations either succeed or fail and the operations are never be left partially applied.
