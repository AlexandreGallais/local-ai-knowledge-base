---
title: "Many-to-many relationships - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/relationships/many-to-many.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Many-to-many relationships - EF Core (part 3 of 3)

## Many-to-many with alternate keys

So far, all the examples have shown the foreign keys in the join entity type being constrained to the primary keys of the entity types on either side of the relationship. Each foreign key, or both, can instead be constrained to an alternate key. For example, consider this model where`Tag` and `Post` have alternate key <example-value>:

```csharp
public class Post
{
    public int Id { get; set; }
    public int AlternateKey { get; set; }
    public List<Tag> Tags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public int AlternateKey { get; set; }
    public List<Post> Posts { get; } = [];
}
```

The configuration for this model is:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity(
            r => r.HasOne(typeof(Tag)).WithMany().HasPrincipalKey(nameof(Tag.AlternateKey)),
            l => l.HasOne(typeof(Post)).WithMany().HasPrincipalKey(nameof(Post.AlternateKey)));
}
```

And the resulting database schema, for clarity, including also the tables with the alternate keys:

```sql
CREATE TABLE "Posts" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Posts" PRIMARY KEY <example-value>,
    "AlternateKey" <example-value> NOT NULL,
    CONSTRAINT "AK_Posts_AlternateKey" <example-value> ("AlternateKey"));

CREATE TABLE "Tags" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Tags" PRIMARY KEY <example-value>,
    "AlternateKey" <example-value> NOT NULL,
    CONSTRAINT "AK_Tags_AlternateKey" <example-value> ("AlternateKey"));

CREATE TABLE "PostTag" (
    "PostsAlternateKey" <example-value> NOT NULL,
    "TagsAlternateKey" <example-value> NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostsAlternateKey", "TagsAlternateKey"),
    CONSTRAINT "FK_PostTag_Posts_PostsAlternateKey" <example-value> KEY ("PostsAlternateKey") REFERENCES "Posts" ("AlternateKey") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagsAlternateKey" <example-value> KEY ("TagsAlternateKey") REFERENCES "Tags" ("AlternateKey") ON DELETE CASCADE);
```

The configuration for using alternate keys is slightly different if the join entity type is represented by a .NET type. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public int AlternateKey { get; set; }
    public List<Tag> Tags { get; } = [];
    public List<PostTag> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public int AlternateKey { get; set; }
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

The configuration can now use the generic `UsingEntity<>` method:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>(
            r => r.HasOne<Tag>(e => e.Tag).WithMany(e => e.PostTags).HasPrincipalKey(e => e.AlternateKey),
            l => l.HasOne<Post>(e => e.Post).WithMany(e => e.PostTags).HasPrincipalKey(e => e.AlternateKey));
}
```

And the resulting schema is:

```sql
CREATE TABLE "Posts" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Posts" PRIMARY KEY <example-value>,
    "AlternateKey" <example-value> NOT NULL,
    CONSTRAINT "AK_Posts_AlternateKey" <example-value> ("AlternateKey"));

CREATE TABLE "Tags" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Tags" PRIMARY KEY <example-value>,
    "AlternateKey" <example-value> NOT NULL,
    CONSTRAINT "AK_Tags_AlternateKey" <example-value> ("AlternateKey"));

CREATE TABLE "PostTag" (
    "PostId" INTEGER NOT NULL,
    "TagId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostId", "TagId"),
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("AlternateKey") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagId" FOREIGN KEY ("TagId") REFERENCES "Tags" ("AlternateKey") ON DELETE CASCADE);
```

## Many-to-many and join table with separate primary key

So far, the join entity type in all the examples has a primary key <example-value> of the two foreign key properties. This is because each combination of values for these properties can occur at most once. These properties therefore form a natural primary key.

> **Note:**
> EF Core does not support duplicate entities in any collection navigation.

If you control the database schema, then there is no reason for the join table to have an additional primary key <example-value>, However, it is possible that an existing join table may have a primary key <example-value> defined. EF can still map to this with some configuration.

It is perhaps easiest to this by creating a class to represent the join entity. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
}

public class PostTag
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public int TagId { get; set; }
}
```

This `PostTag.Id` property is now picked up as the primary key by convention, so the only configuration needed is a call to `UsingEntity` for the `PostTag` type:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>();
}
```

And the resulting schema for the join table is:

```sql
CREATE TABLE "PostTag" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_PostTag" PRIMARY KEY <example-value>,
    "PostId" INTEGER NOT NULL,
    "TagId" INTEGER NOT NULL,
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagId" FOREIGN KEY ("TagId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

A primary key can also be added to the join entity without defining a class for it. For example, with just `Post` and `Tag` types:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<Tag> Tags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<Post> Posts { get; } = [];
}
```

The key can be added with this configuration:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity(
            j =>
            {
                j.IndexerProperty<int>("Id");
                j.HasKey("Id");
            });
}
```

Which results in a join table with a separate primary key <example-value>:

```sql
CREATE TABLE "PostTag" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_PostTag" PRIMARY KEY <example-value>,
    "PostsId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "FK_PostTag_Posts_PostsId" FOREIGN KEY ("PostsId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

## Many-to-many without cascading delete

In all the examples shown above, the foreign keys created between the join table and the two sides of the many-to-many relationship are created with cascading delete behavior. This is very useful because it means that if an entity on either side of the relationship is deleted, then the rows in the join table for that entity are automatically deleted. Or, in other words, when an entity no longer exists, then its relationships to other entities also no longer exist.

It's hard to imagine when it is useful to change this behavior, but it can be done if desired. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity(
            r => r.HasOne(typeof(Tag)).WithMany().OnDelete(DeleteBehavior.Restrict),
            l => l.HasOne(typeof(Post)).WithMany().OnDelete(DeleteBehavior.Restrict));
}
```

The database schema for the join table uses restricted delete behavior on the foreign key <example-value>:

```sql
CREATE TABLE "PostTag" (
    "PostsId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostsId", "TagsId"),
    CONSTRAINT "FK_PostTag_Posts_PostsId" FOREIGN KEY ("PostsId") REFERENCES "Posts" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_PostTag_Tags_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tags" ("Id") ON DELETE RESTRICT);
```

## Self-referencing many-to-many

The same entity type can be used at both ends of a many-to-many relationship; this is known as a "self-referencing" relationship. For example:

```csharp
public class Person
{
    public int Id { get; set; }
    public List<Person> Parents { get; } = [];
    public List<Person> Children { get; } = [];
}
```

This maps to a join table called `PersonPerson`, with both foreign keys pointing back to the `People` table:

```sql
CREATE TABLE "PersonPerson" (
    "ChildrenId" INTEGER NOT NULL,
    "ParentsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PersonPerson" PRIMARY KEY ("ChildrenId", "ParentsId"),
    CONSTRAINT "FK_PersonPerson_People_ChildrenId" FOREIGN KEY ("ChildrenId") REFERENCES "People" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PersonPerson_People_ParentsId" FOREIGN KEY ("ParentsId") REFERENCES "People" ("Id") ON DELETE CASCADE);
```

## Symmetrical self-referencing many-to-many

Sometimes a many-to-many relationship is naturally symmetrical. That is, if entity A is related to entity B, then entity B is also related to entity A. This is naturally modeled using a single navigation. For example, imagine the case where person A is friends with person B, and person B is friends with person A:

```csharp
public class Person
{
    public int Id { get; set; }
    public List<Person> Friends { get; } = [];
}
```

Unfortunately, this is not easy to map. The same navigation cannot be used for both ends of the relationship. The best that can be done is to map it as a unidirectional many-to-many relationship. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Person>()
        .HasMany(e => e.Friends)
        .WithMany();
}
```

However, to make sure two people are both related to each other, each person will need to be manually added to the other person's `Friends` collection. For example:

```csharp
ginny.Friends.Add(hermione);
hermione.Friends.Add(ginny);
```

## Direct use of join table

All of the examples above make use of the EF Core many-to-many mapping patterns. However, it is also possible to map a join table to a normal entity type and just use the two one-to-many relationships for all operations.

For example, these entity types represent the mapping of two normal tables and join table without using any many-to-many relationships:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<PostTag> PostTags { get; } = new();
}

public class Tag
{
    public int Id { get; set; }
    public List<PostTag> PostTags { get; } = new();
}

public class PostTag
{
    public int PostId { get; set; }
    public int TagId { get; set; }
    public Post Post { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
```

This requires no special mapping, since these are normal entity types with normal one-to-many relationships.

## Additional resources

* .NET Data Community Standup session, with a deep dive into many-to-many and the infrastructure underpinning it.
