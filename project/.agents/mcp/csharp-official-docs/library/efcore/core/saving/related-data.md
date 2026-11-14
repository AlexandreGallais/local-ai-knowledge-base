---
title: "Saving Related Data - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/saving/related-data.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Saving Related Data

In addition to isolated entities, you can also make use of the relationships defined in your model.

> **Tip:**
> You can view this article's sample on GitHub.

## Adding a graph of new entities

If you create several new related entities, adding one of them to the context will cause the others to be added too.

In the following example, the blog and three related posts are all inserted into the database. The posts are found and added, because they are reachable via the `Blog.Posts` navigation property.

```csharp
using (var context = new BloggingContext())
{
    var blog = new Blog
    {
        Url = "http://blogs.msdn.com/dotnet",
        Posts = new List<Post>
        {
            new Post { Title = "Intro to C#" },
            new Post { Title = "Intro to VB.NET" },
            new Post { Title = "Intro to F#" }
        }
    };

    context.Blogs.Add(blog);
    await context.SaveChangesAsync();
}
```

> **Tip:**
> Use the EntityEntry.State property to set the state of just a single entity. For example, `context.Entry(blog).State = EntityState.Modified`.

## Adding a related entity

If you reference a new entity from the navigation property of an entity that is already tracked by the context, the entity will be discovered and inserted into the database.

In the following example, the `post` entity is inserted because it is added to the `Posts` property of the `blog` entity which was fetched from the database.

```csharp
using (var context = new BloggingContext())
{
    var blog = await context.Blogs.Include(b => b.Posts).FirstAsync();
    var post = new Post { Title = "Intro to EF Core" };

    blog.Posts.Add(post);
    await context.SaveChangesAsync();
}
```

## Changing relationships

If you change the navigation property of an entity, the corresponding changes will be made to the foreign key <example-value> in the database.

In the following example, the `post` entity is updated to belong to the new `blog` entity because its `Blog` navigation property is set to point to `blog`. Note that `blog` will also be inserted into the database because it is a new entity that is referenced by the navigation property of an entity that is already tracked by the context (`post`).

```csharp
using (var context = new BloggingContext())
{
    var blog = new Blog { Url = "http://blogs.msdn.com/visualstudio" };
    var post = await context.Posts.FirstAsync();

    post.Blog = blog;
    await context.SaveChangesAsync();
}
```

## Removing relationships

You can remove a relationship by setting a reference navigation to `null`, or removing the related entity from a collection navigation.

Removing a relationship can have side effects on the dependent entity, according to the cascade delete behavior configured in the relationship.

By default, for required relationships, a cascade delete behavior is configured and the child/dependent entity will be deleted from the database. For optional relationships, cascade delete is not configured by default, but the foreign key <example-value> will be set to null.

See Required and Optional Relationships to learn about how the requiredness of relationships can be configured.

See Cascade Delete for more details on how cascade delete behaviors work, how they can be configured explicitly and how they are selected by convention.

In the following example, the relationship between `Blog` and `Post` is required, so cascade delete applies by convention. Removing the `post` entity from `blog.Posts` makes it an orphan, so EF Core deletes it from the database when `SaveChanges` is called. For more information, see Severing a relationship.

```csharp
using (var context = new BloggingContext())
{
    var blog = await context.Blogs.Include(b => b.Posts).FirstAsync();
    var post = blog.Posts.First();

    blog.Posts.Remove(post);
    await context.SaveChangesAsync();
}
```
