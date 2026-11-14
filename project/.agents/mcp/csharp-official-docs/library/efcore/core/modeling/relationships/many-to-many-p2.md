---
title: "Many-to-many relationships - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/relationships/many-to-many.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Many-to-many relationships - EF Core (part 2 of 3)

## Many-to-many with navigations to join entity

Following on from the previous example, now that there is a class representing the join entity, it becomes easy to add navigations that reference this class. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class PostTag
{
    public int PostId { get; set; }
    public int TagId { get; set; }
}
```

> **Important:**
> As shown in this example, navigations to the join entity type can be used _in addition to_ the skip navigations between the two ends of the many-to-many relationship. This means that the skip navigations can be used to interact with the many-to-many relationship in a natural manner, while the navigations to the join entity type can be used when greater control over the join entities themselves is needed. In a sense, this mapping provides the best of both worlds between a simple many-to-many mapping, and a mapping that more explicitly matches the database schema.

Nothing needs to be changed in the `UsingEntity` call, since the navigations to the join entity are picked up by convention. Therefore, the configuration for this example is the same as for the last example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>();
}
```

The navigations can be configured explicitly for cases where they cannot be determined by convention. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>(
            r => r.HasOne<Tag>().WithMany(e => e.PostTags),
            l => l.HasOne<Post>().WithMany(e => e.PostTags));
}
```

The mapped database schema is not affected by including navigations in the model:

```sql
CREATE TABLE "PostTag" (
    "PostId" INTEGER NOT NULL,
    "TagId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostId", "TagId"),
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagId" FOREIGN KEY ("TagId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

## Many-to-many with navigations to and from join entity

The previous example added navigations to the join entity type from the entity types at either end of the many-to-many relationship. Navigations can also be added in the other direction, or in both directions. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class PostTag
{
    public int PostId { get; set; }
    public int TagId { get; set; }
    public Post Post { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
```

Nothing needs to be changed in the `UsingEntity` call, since the navigations to the join entity are picked up by convention. Therefore, the configuration for this example is the same as for the last example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>();
}
```

The navigations can be configured explicitly for cases where they cannot be determined by convention. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>(
            r => r.HasOne<Tag>(e => e.Tag).WithMany(e => e.PostTags),
            l => l.HasOne<Post>(e => e.Post).WithMany(e => e.PostTags));
}
```

The mapped database schema is not affected by including navigations in the model:

```sql
CREATE TABLE "PostTag" (
    "PostId" INTEGER NOT NULL,
    "TagId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostId", "TagId"),
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagId" FOREIGN KEY ("TagId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

## Many-to-many with navigations and changed foreign keys

The previous example showed a many-to-many with navigations to and from the join entity type. This example is the same, except that the foreign key <example-value> used are also changed. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class PostTag
{
    public int PostForeignKey { get; set; }
    public int TagForeignKey { get; set; }
    public Post Post { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
```

Again, the `UsingEntity` method is used to configure this:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>(
            r => r.HasOne<Tag>(e => e.Tag).WithMany(e => e.PostTags).HasForeignKey(e => e.TagForeignKey),
            l => l.HasOne<Post>(e => e.Post).WithMany(e => e.PostTags).HasForeignKey(e => e.PostForeignKey));
}
```

The mapped database schema is now:

```sql
CREATE TABLE "PostTag" (
    "PostForeignKey" <example-value> NOT NULL,
    "TagForeignKey" <example-value> NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostForeignKey", "TagForeignKey"),
    CONSTRAINT "FK_PostTag_Posts_PostForeignKey" <example-value> KEY ("PostForeignKey") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagForeignKey" <example-value> KEY ("TagForeignKey") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

## Unidirectional many-to-many

It is not necessary to include a navigation on both sides of the many-to-many relationship. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
}
```

EF needs some configuration to know that this should be a many-to-many relationship, rather than a one-to-many. This is done using `HasMany` and `WithMany`, but with no argument passed on the side without a navigation. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany();
}
```

Removing the navigation does not affect the database schema:

```sql
CREATE TABLE "Posts" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Posts" PRIMARY KEY <example-value>);

CREATE TABLE "Tags" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Tags" PRIMARY KEY <example-value>);

CREATE TABLE "PostTag" (
    "PostId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostId", "TagsId"),
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

## Many-to-many and join table with payload

In the examples so far, the join table has been used only to store the foreign key pairs representing each association. However, it can also be used to store information about the association--for example, the time it was created. In such cases it is best to define a type for the join entity and add the "association payload" properties to this type. It is also common to create navigations to the join entity in addition to the "skip navigations" used for the many-to-many relationship. These additional navigations allow the join entity to be easily referenced from code, thereby facilitating reading and/or changing the payload data. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class PostTag
{
    public int PostId { get; set; }
    public int TagId { get; set; }
    public DateTime CreatedOn { get; set; }
}
```

It is also common to use generated values for payload properties--for example, a database timestamp that is automatically set when the association row is inserted. This requires some minimal configuration. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>(
            j => j.Property(e => e.CreatedOn).HasDefaultValueSql("CURRENT_TIMESTAMP"));
}
```

The result maps to a entity type schema with a timestamp set automatically when a row is inserted:

```sql
CREATE TABLE "PostTag" (
    "PostId" INTEGER NOT NULL,
    "TagId" INTEGER NOT NULL,
    "CreatedOn" TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostId", "TagId"),
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagId" FOREIGN KEY ("TagId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

> **Tip:**
> The SQL shown here is for SQLite. On SQL Server/Azure SQL, use `.HasDefaultValueSql("GETUTCDATE()")` and for `TEXT` read `datetime`.

## Custom shared-type entity type as a join entity

The previous example used the type `PostTag` as the join entity type. This type is specific to the posts-tags relationship. However, if you have multiple join tables with the same shape, then the same CLR type can be used for all of them. For example, imagine that all our join tables have a `CreatedOn` column. We can map these using `JoinType` class mapped as a shared-type entity type:

```csharp
public class JoinType
{
    public int Id1 { get; set; }
    public int Id2 { get; set; }
    public DateTime CreatedOn { get; set; }
}
```

This type can then be referenced as the join entity type by multiple different many-to-many relationships. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
    public List<JoinType> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
    public List<JoinType> PostTags { get; } = [];
}

public class Blog
{
    public int Id { get; set; }
    public List<Author> Authors { get; } = [];
    public List<JoinType> BlogAuthors { get; } = [];
}

public class Author
{
    public int Id { get; set; }
    public List<Blog> Blogs { get; } = [];
    public List<JoinType> BlogAuthors { get; } = [];
}
```

And these relationships can then be configured appropriately to map the join type to a different table for each relationship:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<JoinType>(
            "PostTag",
            r => r.HasOne<Tag>().WithMany(e => e.PostTags).HasForeignKey(e => e.Id1),
            l => l.HasOne<Post>().WithMany(e => e.PostTags).HasForeignKey(e => e.Id2),
            j => j.Property(e => e.CreatedOn).HasDefaultValueSql("CURRENT_TIMESTAMP"));

    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Authors)
        .WithMany(e => e.Blogs)
        .UsingEntity<JoinType>(
            "BlogAuthor",
            r => r.HasOne<Author>().WithMany(e => e.BlogAuthors).HasForeignKey(e => e.Id1),
            l => l.HasOne<Blog>().WithMany(e => e.BlogAuthors).HasForeignKey(e => e.Id2),
            j => j.Property(e => e.CreatedOn).HasDefaultValueSql("CURRENT_TIMESTAMP"));
}
```

This results in the following tables in the database schema:

```sql
CREATE TABLE "BlogAuthor" (
    "Id1" INTEGER NOT NULL,
    "Id2" INTEGER NOT NULL,
    "CreatedOn" TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT "PK_BlogAuthor" PRIMARY KEY ("Id1", "Id2"),
    CONSTRAINT "FK_BlogAuthor_Authors_Id1" FOREIGN KEY ("Id1") REFERENCES "Authors" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_BlogAuthor_Blogs_Id2" FOREIGN KEY ("Id2") REFERENCES "Blogs" ("Id") ON DELETE CASCADE);

CREATE TABLE "PostTag" (
    "Id1" INTEGER NOT NULL,
    "Id2" INTEGER NOT NULL,
    "CreatedOn" TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("Id1", "Id2"),
    CONSTRAINT "FK_PostTag_Posts_Id2" FOREIGN KEY ("Id2") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_Id1" FOREIGN KEY ("Id1") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```
