---
title: "Cascade Delete - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/saving/cascade-delete.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Cascade Delete

Entity Framework Core (EF Core) represents relationships using foreign keys. An entity with a foreign key is the child or dependent entity in the relationship. This entity's foreign key value must match the primary key value (or an alternate key value) of the related principal/parent entity.

If the principal/parent entity is deleted, then the foreign key <example-value> of the dependents/children will no longer match the primary or alternate key of _any_ principal/parent. This is an invalid state, and will cause a referential constraint violation in most databases.

There are two options to avoid this referential constraint violation:

1. Set the FK values to null
2. Also delete the dependent/child entities

The first option is only valid for optional relationships where the foreign key <example-value> (and the database column to which it is mapped) must be nullable.

The second option is valid for any kind of relationship and is known as "cascade delete".

> **Tip:**
> This document describes cascade deletes (and deleting orphans) from the perspective of updating the database. It makes heavy use of concepts introduced in Change Tracking in EF Core and Changing Foreign Keys and Navigations. Make sure to fully understand these concepts before tackling the material here.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

## When cascading behaviors happen

Cascading deletes are needed when a dependent/child entity can no longer be associated with its current principal/parent. This can happen because the principal/parent is deleted, or it can happen when the principal/parent still exists but the dependent/child is no longer associated with it.

### Deleting a principal/parent

Consider this simple model where `Blog` is the principal/parent in a relationship with `Post`, which is the dependent/child. `Post.BlogId` is a foreign key <example-value>, the value of which must match the `Blog.Id` primary key of the blog to which the post belongs.

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

    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

By convention, this relationship is configured as a required, since the `Post.BlogId` foreign key <example-value> is non-nullable. Required relationships are configured to use cascade deletes by default. See Relationships for more information on modeling relationships.

When deleting a blog, all posts are cascade deleted. For example:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).Include(e => e.Posts).FirstAsync();

context.Remove(blog);

await context.SaveChangesAsync();
```

SaveChanges generates the following SQL, using SQL Server as an example:

```sql
-- Executed DbCommand (1ms) [Parameters=[@p0='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Posts]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;

-- Executed DbCommand (0ms) [Parameters=[@p0='2'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Posts]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;

-- Executed DbCommand (2ms) [Parameters=[@p1='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Blogs]
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;
```

### Severing a relationship

Rather than deleting the blog, we could instead sever the relationship between each post and its blog. This can be done by setting the reference navigation `Post.Blog` to null for each post:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).Include(e => e.Posts).FirstAsync();

foreach (var post in blog.Posts)
{
    post.Blog = null;
}

await context.SaveChangesAsync();
```

The relationship can also be severed by removing each post from the `Blog.Posts` collection navigation:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).Include(e => e.Posts).FirstAsync();

blog.Posts.Clear();

await context.SaveChangesAsync();
```

In either case the result is the same: the blog is not deleted, but the posts that are no longer associated with any blog are deleted:

```sql
-- Executed DbCommand (1ms) [Parameters=[@p0='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Posts]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;

-- Executed DbCommand (0ms) [Parameters=[@p0='2'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Posts]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;
```

Deleting entities that are no longer associated with any principal/dependent is known as "deleting orphans".

> **Tip:**
> Cascade delete and deleting orphans are closely related. Both result in deleting dependent/child entities when the relationship to their required principal/parent is severed. For cascade delete, this severing happens because the principal/parent is itself deleted. For orphans, the principal/parent entity still exists, but is no longer related to the dependent/child entities.

## Where cascading behaviors happen

Cascading behaviors can be applied to:

- Entities tracked by the current `Microsoft.EntityFrameworkCore.DbContext`
- Entities in the database that have not been loaded into the context

### Cascade delete of tracked entities

EF Core always applies configured cascading behaviors to tracked entities. This means that if the application loads all relevant dependent/child entities into the DbContext, as is shown in the examples above, then cascading behaviors will be correctly applied regardless of how the database is configured.

> **Tip:**
> The exact timing of when cascading behaviors happen to tracked entities can be controlled using `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.CascadeDeleteTiming` and `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DeleteOrphansTiming`. See Changing Foreign Keys and Navigations for more information.

### Cascade delete in the database

Many database systems also offer cascading behaviors that are triggered when an entity is deleted in the database. EF Core configures these behaviors based on the cascade delete behavior in the EF Core model when a database is created using `Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade.EnsureCreated*` or EF Core migrations. For example, using the model above, the following table is created for posts when using SQL Server:

```sql
CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NULL,
    [Content] nvarchar(max) NULL,
    [BlogId] int NOT NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Posts_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE
);
```

Notice that the foreign key <example-value> defining the relationship between blogs and posts is configured with `ON DELETE CASCADE`.

If we know that the database is configured like this, then we can delete a blog _without first loading posts_ and the database will take care of deleting all the posts that were related to that blog. For example:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).FirstAsync();

context.Remove(blog);

await context.SaveChangesAsync();
```

Notice that there is no `Include` for posts, so they are not loaded. SaveChanges in this case will delete just the blog, since that's the only entity being tracked:

```sql
-- Executed DbCommand (6ms) [Parameters=[@p0='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Blogs]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;
```

This would result in an exception if the foreign key <example-value> in the database is not configured for cascade deletes. However, in this case the posts are deleted by the database because it has been configured with `ON DELETE CASCADE` when it was created.

> **Note:**
> Databases don't typically have any way to automatically delete orphans. This is because while EF Core represents relationships using navigations as well of foreign keys, databases have only foreign keys and no navigations. This means that it is usually not possible to sever a relationship without loading both sides into the DbContext.

> **Note:**
> The EF Core in-memory database does not currently support cascade deletes in the database.

> **Warning:**
> Do not configure cascade delete in the database when soft-deleting entities. This may cause entities to be accidentally really deleted instead of soft-deleted.

### Database cascade limitations

Some databases, most notably SQL Server, have limitations on the cascade behaviors that form cycles. For example, consider the following model:

```csharp
public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IList<Post> Posts { get; } = new List<Post>();

    public int OwnerId { get; set; }
    public Person Owner { get; set; }
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int BlogId { get; set; }
    public Blog Blog { get; set; }

    public int AuthorId { get; set; }
    public Person Author { get; set; }
}

public class Person
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IList<Post> Posts { get; } = new List<Post>();

    public Blog OwnedBlog { get; set; }
}
```

This model has three relationships, all required and therefore configured to cascade delete by convention:

- Deleting a blog will cascade delete all the related posts
- Deleting the author of posts will cause the authored posts to be cascade deleted
- Deleting the owner of a blog will cause the blog to be cascade deleted

This is all reasonable (if a bit draconian in blog management policies!) but attempting to create a SQL Server database with these cascades configured results in the following exception:

> Microsoft.Data.SqlClient.SqlException (0x80131904): Introducing FOREIGN KEY <example-value> 'FK_Posts_Person_AuthorId' on table 'Posts' may cause cycles or multiple cascade paths. Specify ON DELETE NO ACTION or ON UPDATE NO ACTION, or modify other FOREIGN KEY constraints.

There are two ways to handle this situation:

1. Change one or more of the relationships to not cascade delete.
2. Configure the database without one or more of these cascade deletes, then ensure all dependent entities are loaded so that EF Core can perform the cascading behavior.

Taking the first approach with our example, we could make the post-blog relationship optional by giving it a nullable foreign key <example-value>:

```csharp
public int? BlogId { get; set; }
```

An optional relationship allows the post to exist without a blog, which means cascade delete will no longer be configured by default. This means there is no longer a cycle in cascading actions, and the database can be created without error on SQL Server.

Taking the second approach instead, we can keep the blog-owner relationship required and configured for cascade delete, but make this configuration only apply to tracked entities, not the database:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Blog>()
        .HasOne(e => e.Owner)
        .WithOne(e => e.OwnedBlog)
        .OnDelete(DeleteBehavior.ClientCascade);
}
```

Now what happens if we load both a person and the blog they own, then delete the person?

```csharp
using var context = new BlogsContext();

var owner = await context.People.SingleAsync(e => e.Name == "ajcvickers");
var blog = await context.Blogs.SingleAsync(e => e.Owner == owner);

context.Remove(owner);

await context.SaveChangesAsync();
```

EF Core will cascade the delete of the owner so that the blog is also deleted:

```sql
-- Executed DbCommand (8ms) [Parameters=[@p0='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Blogs]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;

-- Executed DbCommand (2ms) [Parameters=[@p1='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [People]
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;
```

However, if the blog is not loaded when the owner is deleted:

```csharp
using var context = new BlogsContext();

var owner = await context.People.SingleAsync(e => e.Name == "ajcvickers");

context.Remove(owner);

await context.SaveChangesAsync();
```

Then an exception will be thrown due to violation of the foreign key <example-value> in the database:

> Microsoft.Data.SqlClient.SqlException: The DELETE statement conflicted with the REFERENCE constraint "FK_Blogs_People_OwnerId". The conflict occurred in database "Scratch", table "dbo.Blogs", column 'OwnerId'.
The statement has been terminated.
