---
title: "Changing Foreign Keys and Navigations - EF Core (part 1 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/relationship-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Changing Foreign Keys and Navigations

## Overview of foreign keys and navigations

Relationships in an Entity Framework Core (EF Core) model are represented using foreign keys (FKs). An FK consists of one or more properties on the dependent or child entity in the relationship. This dependent/child entity is associated with a given principal/parent entity when the values of the foreign key properties on the dependent/child match the values of the alternate or primary key (PK) properties on the principal/parent.

Foreign keys are a good way to store and manipulate relationships in the database, but are not very friendly when working with multiple related entities in application code. Therefore, most EF Core models also layer "navigations" over the FK representation. Navigations form C#/.NET references between entity instances that reflect the associations found by matching foreign key values to primary or alternate key values.

Navigations can be used on both sides of the relationship, on one side only, or not at all, leaving only the FK property. The FK property can be hidden by making it a shadow property. See Relationships for more information on modelling relationships.

> **Tip:**
> This document assumes that entity states and the basics of EF Core change tracking are understood. See Change Tracking in EF Core for more information on these topics.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

### Example model

The following model contains four entity types with relationships between them. The comments in the code indicate which properties are foreign keys, primary keys, and navigations.

```csharp
public class Blog
{
    public int Id { get; set; } // Primary key
    public string Name { get; set; }

    public IList<Post> Posts { get; } = new List<Post>(); // Collection navigation
    public BlogAssets Assets { get; set; } // Reference navigation
}

public class BlogAssets
{
    public int Id { get; set; } // Primary key
    public byte[] Banner { get; set; }

    public int? BlogId { get; set; } // Foreign key
    public Blog Blog { get; set; } // Reference navigation
}

public class Post
{
    public int Id { get; set; } // Primary key
    public string Title { get; set; }
    public string Content { get; set; }

    public int? BlogId { get; set; } // Foreign key
    public Blog Blog { get; set; } // Reference navigation

    public IList<Tag> Tags { get; } = new List<Tag>(); // Skip collection navigation
}

public class Tag
{
    public int Id { get; set; } // Primary key
    public string Text { get; set; }

    public IList<Post> Posts { get; } = new List<Post>(); // Skip collection navigation
}
```

The three relationships in this model are:

- Each blog can have many posts (one-to-many):
  - `Blog` is the principal/parent.
  - `Post` is the dependent/child. It contains the FK property `Post.BlogId`, the value of which must match the `Blog.Id` PK value of the related blog.
  - `Post.Blog` is a reference navigation from a post to the associated blog. `Post.Blog` is the inverse navigation for `Blog.Posts`.
  - `Blog.Posts` is a collection navigation from a blog to all the associated posts. `Blog.Posts` is the inverse navigation for `Post.Blog`.
- Each blog can have one assets (one-to-one):
  - `Blog` is the principal/parent.
  - `BlogAssets` is the dependent/child. It contains the FK property `BlogAssets.BlogId`, the value of which must match the `Blog.Id` PK value of the related blog.
  - `BlogAssets.Blog` is a reference navigation from the assets to the associated blog. `BlogAssets.Blog` is the inverse navigation for `Blog.Assets`.
  - `Blog.Assets` is a reference navigation from the blog to the associated assets. `Blog.Assets` is the inverse navigation for `BlogAssets.Blog`.
- Each post can have many tags and each tag can have many posts (many-to-many):
  - Many-to-many relationships are a further layer over two one-to-many relationships. Many-to-many relationships are covered later in this document.
  - `Post.Tags` is a collection navigation from a post to all the associated tags. `Post.Tags` is the inverse navigation for `Tag.Posts`.
  - `Tag.Posts` is a collection navigation from a tag to all the associated posts. `Tag.Posts` is the inverse navigation for `Post.Tags`.

See Relationships for more information on how to model and configure relationships.

## Relationship fixup

EF Core keeps navigations in alignment with foreign key values and vice versa. That is, if a foreign key value changes such that it now refers to a different principal/parent entity, then the navigations are updated to reflect this change. Likewise, if a navigation is changed, then the foreign key values of the entities involved are updated to reflect this change. This is called "relationship fixup".

### Fixup by query

Fixup first occurs when entities are queried from the database. The database has only foreign key values, so when EF Core creates an entity instance from the database it uses the foreign key values to set reference navigations and add entities to collection navigations as appropriate. For example, consider a query for blogs and its associated posts and assets:

```csharp
using var context = new BlogsContext();

var blogs = await context.Blogs
    .Include(e => e.Posts)
    .Include(e => e.Assets)
    .ToListAsync();

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

For each blog, EF Core will first create a `Blog` instance. Then, as each post is loaded from the database its `Post.Blog` reference navigation is set to point to the associated blog. Likewise, the post is added to the `Blog.Posts` collection navigation. The same thing happens with `BlogAssets`, except in this case both navigations are references. The `Blog.Assets` navigation is set to point to the assets instance, and the `BlogAsserts.Blog` navigation is set to point to the blog instance.

Looking at the change tracker debug view after this query shows two blogs, each with one assets and two posts being tracked:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: {Id: 1}
  Posts: [{Id: 1}, {Id: 2}]
Blog {Id: 2} Unchanged
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: {Id: 2}
  Posts: [{Id: 3}, {Id: 4}]
BlogAssets {Id: 1} Unchanged
  Id: 1 PK
  Banner: <null>
  BlogId: 1 FK
  Blog: {Id: 1}
BlogAssets {Id: 2} Unchanged
  Id: 2 PK
  Banner: <null>
  BlogId: 2 FK
  Blog: {Id: 2}
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
  Tags: []
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
  Tags: []
Post {Id: 3} Unchanged
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: 2}
  Tags: []
Post {Id: 4} Unchanged
  Id: 4 PK
  BlogId: 2 FK
  Content: 'Examine when database queries were executed and measure how ...'
  Title: 'Database Profiling with Visual Studio'
  Blog: {Id: 2}
  Tags: []
```

The debug view shows both key values and navigations. Navigations are shown using the primary key values of the related entities. For example, `Posts: [{Id: 1}, {Id: 2}]` in the output above indicates that the `Blog.Posts` collection navigation contains two related posts with primary keys 1 and 2 respectively. Similarly, for each post associated with the first blog, the `Blog: {Id: 1}` line indicates that the `Post.Blog` navigation references the Blog with primary key 1.

### Fixup to locally tracked entities

Relationship fixup also happens between entities returned from a tracking query and entities already tracked by the DbContext. For example, consider executing three separate queries for blogs, posts, and assets:

```csharp
using var context = new BlogsContext();

var blogs = await context.Blogs.ToListAsync();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);

var assets = await context.Assets.ToListAsync();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);

var posts = await context.Posts.ToListAsync();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```
Looking again at the debug views, after the first query only the two blogs are tracked:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: <null>
  Posts: []
Blog {Id: 2} Unchanged
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: <null>
  Posts: []
```

The `Blog.Assets` reference navigations are null, and the `Blog.Posts` collection navigations are empty because no associated entities are currently being tracked by the context.

After the second query, the `Blogs.Assets` reference navigations have been fixed up to point to the newly tracked `BlogAsset` instances. Likewise, the `BlogAssets.Blog` reference navigations are set to point to the appropriate already tracked `Blog` instance.

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: {Id: 1}
  Posts: []
Blog {Id: 2} Unchanged
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: {Id: 2}
  Posts: []
BlogAssets {Id: 1} Unchanged
  Id: 1 PK
  Banner: <null>
  BlogId: 1 FK
  Blog: {Id: 1}
BlogAssets {Id: 2} Unchanged
  Id: 2 PK
  Banner: <null>
  BlogId: 2 FK
  Blog: {Id: 2}
```

Finally, after the third query, the `Blog.Posts` collection navigations now contain all related posts, and the `Post.Blog` references point to the appropriate `Blog` instance:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: {Id: 1}
  Posts: [{Id: 1}, {Id: 2}]
Blog {Id: 2} Unchanged
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: {Id: 2}
  Posts: [{Id: 3}, {Id: 4}]
BlogAssets {Id: 1} Unchanged
  Id: 1 PK
  Banner: <null>
  BlogId: 1 FK
  Blog: {Id: 1}
BlogAssets {Id: 2} Unchanged
  Id: 2 PK
  Banner: <null>
  BlogId: 2 FK
  Blog: {Id: 2}
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
  Tags: []
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
  Tags: []
Post {Id: 3} Unchanged
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: 2}
  Tags: []
Post {Id: 4} Unchanged
  Id: 4 PK
  BlogId: 2 FK
  Content: 'Examine when database queries were executed and measure how ...'
  Title: 'Database Profiling with Visual Studio'
  Blog: {Id: 2}
  Tags: []
```

This is the same end-state as was achieved with the original single query, since EF Core fixed up navigations as entities were tracked, even when coming from multiple different queries.

> **Note:**
> Fixup never causes more data to be returned from the database. It only connects entities that are already returned by the query or already tracked by the DbContext. See Identity Resolution in EF Core for information about handling duplicates when serializing entities.
