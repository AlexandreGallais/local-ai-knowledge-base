---
title: "Changing Foreign Keys and Navigations - EF Core (part 2 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/relationship-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Changing Foreign Keys and Navigations - EF Core (part 2 of 5)

## Changing relationships using navigations

The easiest way to change the relationship between two entities is by manipulating a navigation, while leaving EF Core to fixup the inverse navigation and FK values appropriately. This can be done by:

- Adding or removing an entity from a collection navigation.
- Changing a reference navigation to point to a different entity, or setting it to null.

### Adding or removing from collection navigations

For example, let's move one of the posts from the Visual Studio blog to the .NET blog. This requires first loading the blogs and posts, and then moving the post from the navigation collection on one blog to the navigation collection on the other blog:

```csharp
using var context = new BlogsContext();

var dotNetBlog = await context.Blogs.Include(e => e.Posts).SingleAsync(e => e.Name == ".NET Blog");
var vsBlog = await context.Blogs.Include(e => e.Posts).SingleAsync(e => e.Name == "Visual Studio Blog");

Console.WriteLine(context.ChangeTracker.DebugView.LongView);

var post = vsBlog.Posts.Single(e => e.Title.StartsWith("Disassembly improvements"));
vsBlog.Posts.Remove(post);
dotNetBlog.Posts.Add(post);

context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);

await context.SaveChangesAsync();
```

> **Tip:**
> A call to `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges` is needed here because accessing the debug view does not cause automatic detection of changes.

This is the debug view printed after running the code above:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Assets: <null>
  Posts: [{Id: 1}, {Id: 2}, {Id: 3}]
Blog {Id: 2} Unchanged
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Assets: <null>
  Posts: [{Id: 4}]
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
Post {Id: 3} Modified
  Id: 3 PK
  BlogId: 1 FK Modified Originally 2
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: 1}
  Tags: []
Post {Id: 4} Unchanged
  Id: 4 PK
  BlogId: 2 FK
  Content: 'Examine when database queries were executed and measure how ...'
  Title: 'Database Profiling with Visual Studio'
  Blog: {Id: 2}
  Tags: []
```

The `Blog.Posts` navigation on the .NET Blog now has three posts (`Posts: [{Id: 1}, {Id: 2}, {Id: 3}]`). Likewise, the `Blog.Posts` navigation on the Visual Studio blog only has one post (`Posts: [{Id: 4}]`). This is to be expected since the code explicitly changed these collections.

More interestingly, even though the code did not explicitly change the `Post.Blog` navigation, it has been fixed-up to point to the Visual Studio blog (`Blog: {Id: 1}`). Also, the `Post.BlogId` foreign key value has been updated to match the primary key value of the .NET blog. This change to the FK value is then persisted to the database when SaveChanges is called:

```sql
-- Executed DbCommand (0ms) [Parameters=[@p1='3' (DbType = String), @p0='1' (Nullable = true) (DbType = String)], CommandType='Text', CommandTimeout='30']
UPDATE "Posts" SET "BlogId" = @p0
WHERE "Id" = @p1;
SELECT changes();
```

### Changing reference navigations

In the previous example, a post was moved from one blog to another by manipulating the collection navigation of posts on each blog. The same thing can be achieved by instead changing the `Post.Blog` reference navigation to point to the new blog. For example:

```csharp
var post = vsBlog.Posts.Single(e => e.Title.StartsWith("Disassembly improvements"));
post.Blog = dotNetBlog;
```

The debug view after this change is _exactly the same_ as it was in the previous example. This is because EF Core detected the reference navigation change and then fixed up the collection navigations and FK value to match.

## Changing relationships using foreign key values

In the previous section, relationships were manipulated by navigations leaving foreign key values to be updated automatically. This is the recommended way to manipulate relationships in EF Core. However, it is also possible to manipulate FK values directly. For example, we can move a post from one blog to another by changing the `Post.BlogId` foreign key value:

```csharp
var post = vsBlog.Posts.Single(e => e.Title.StartsWith("Disassembly improvements"));
post.BlogId = dotNetBlog.Id;
```

Notice how this is very similar to changing the reference navigation, as shown in the previous example.

The debug view after this change is again _exactly the same_ as was the case for the previous two examples. This is because EF Core detected the FK value change and then fixed up both the reference and collection navigations to match.

> **Tip:**
> Do not write code to manipulate all navigations and FK values each time a relationship changes. Such code is more complicated and must ensure consistent changes to foreign keys and navigations in every case. If possible, just manipulate a single navigation, or maybe both navigations. If needed, just manipulate FK values. Avoid manipulating both navigations and FK values.
