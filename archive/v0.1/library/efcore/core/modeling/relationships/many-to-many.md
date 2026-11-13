---
title: "Many-to-many relationships - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/relationships/many-to-many.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Many-to-many relationships

Many-to-many relationships are used when any number entities of one entity type is associated with any number of entities of the same or another entity type. For example, a `Post` can have many associated `Tags`, and each `Tag` can in turn be associated with any number of `Posts`.

## Understanding many-to-many relationships

Many-to-many relationships are different from one-to-many and one-to-one relationships in that they cannot be represented in a simple way using just a foreign key. Instead, an additional entity type is needed to "join" the two sides of the relationship. This is known as the "join entity type" and maps to a "join table" in a relational database. The entities of this join entity type contain pairs of foreign key <example-value>, where one of each pair points to an entity on one side of the relationship, and the other points to an entity on the other side of the relationship. Each join entity, and therefore each row in the join table, therefore represents one association between the entity types in the relationship.

EF Core can hide the join entity type and manage it behind the scenes. This allows the navigations of a many-to-many relationship to be used in a natural manner, adding or removing entities from each side as needed. However, it is useful to understand what is happening behind the scenes so that their overall behavior, and in particular the mapping to a relational database, makes sense. Let's start with a relational database schema setup to represent a many-to-many relationship between posts and tags:

```sql
CREATE TABLE "Posts" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Posts" PRIMARY KEY <example-value>);

CREATE TABLE "Tags" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Tags" PRIMARY KEY <example-value>);

CREATE TABLE "PostTag" (
    "PostsId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostsId", "TagsId"),
    CONSTRAINT "FK_PostTag_Posts_PostsId" FOREIGN KEY ("PostsId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

In this schema, `PostTag` is the join table. It contains two columns: `PostsId`, which is a foreign key to the primary key of the `Posts` table, and `TagsId`, which is a foreign key to primary key of the `Tags` table. Each row in this table therefore represents an association between one `Post` and one `Tag`.

A simplistic mapping for this schema in EF Core consists of three entity types--one for each table. If each of these entity types are represented by a .NET class, then those classes might look the following:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<PostTag> PostTags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<PostTag> PostTags { get; } = [];
}

public class PostTag
{
    public int PostsId { get; set; }
    public int TagsId { get; set; }
    public Post Post { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
```

Notice that in this mapping there is no many-to-many relationship, but rather two one-to-many relationships, one for each of the foreign keys defined in the join table. This is not an unreasonable way to map these tables, but doesn't reflect the intent of the join table, which is to represent a single many-to-many relationship, rather than two one-to-many relationships.

EF allows for a more natural mapping through the introduction of two collection navigations, one on `Post` containing its related `Tags`, and an inverse on `Tag` containing its related `Posts`. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public List<PostTag> PostTags { get; } = [];
    public List<Tag> Tags { get; } = [];
}

public class Tag
{
    public int Id { get; set; }
    public List<PostTag> PostTags { get; } = [];
    public List<Post> Posts { get; } = [];
}

public class PostTag
{
    public int PostsId { get; set; }
    public int TagsId { get; set; }
    public Post Post { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
```

> **Tip:**
> These new navigations are known as "skip navigations", because they skip over the join entity to provide direct access to the other side of the many-to-many relationship.

As is shown in the example above, a many-to-many relationship can be mapped in this way--that is, with a .NET class for the join entity, and with both navigations for the two one-to-many relationships _and_ skip navigations exposed on the entity types. However, EF can manage the join entity transparently, without a .NET class defined for it, and without navigations for the two one-to-many relationships. For example:

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

Indeed, EF model building conventions will, by default, map the `Post` and `Tag` types shown here to the three tables in the database schema at the top of this section. This mapping, without explicit use of the join type, is what is typically meant by the term "many-to-many".

## Examples

The following sections contain examples of many-to-many relationships, including the configuration needed to achieve each mapping.

> **Tip:**
> The code for all the examples below can be found in ManyToMany.cs.

## Basic <example-value>

In the most basic case for a many-to-many, the entity types on each end of the relationship both have a collection navigation. For example:

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

This relationship is mapped by convention. Even though it is not needed, an equivalent explicit configuration for this relationship is shown below as a learning tool:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts);
}
```

Even with this explicit configuration, many aspects of the relationship are still configured by convention. A more complete explicit configuration, again for learning purposes, is:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity(
            "PostTag",
            r => r.HasOne(typeof(Tag)).WithMany().HasForeignKey("TagsId").HasPrincipalKey(nameof(Tag.Id)),
            l => l.HasOne(typeof(Post)).WithMany().HasForeignKey("PostsId").HasPrincipalKey(nameof(Post.Id)),
            j => j.HasKey("PostsId", "TagsId"));
}
```

> **Important:**
> Please don't attempt to fully configure everything even when it is not needed. As can be seen above, the code gets complicated quickly and its easy to make a mistake. And even in the example above there are many things in the model that are still configured by convention. It's not realistic to think that everything in an EF model can always be fully configured explicitly.

Regardless of whether the relationship is built by convention or using either of the shown explicit configurations, the resulting mapped schema (using SQLite) is:

```sql
CREATE TABLE "Posts" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Posts" PRIMARY KEY <example-value>);

CREATE TABLE "Tags" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Tags" PRIMARY KEY <example-value>);

CREATE TABLE "PostTag" (
    "PostsId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostsId", "TagsId"),
    CONSTRAINT "FK_PostTag_Posts_PostsId" FOREIGN KEY ("PostsId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

> **Tip:**
> When using a Database First flow to scaffold a DbContext from an existing database, EF Core 6 and later looks for this pattern in the database schema and scaffolds a many-to-many relationship as described in this document. This behavior can be changed through use of a custom T4 template. For other options, see _Many-to-many relationships without mapped join entities are now scaffolded_.

> **Important:**
> Currently, EF Core uses `Dictionary<string, object>` to represent join entity instances for which no .NET class has been configured. However, to improve performance, a different type may be used in a future EF Core release. Do not depend on the join type being `Dictionary<string, object>` unless this has been explicitly configured.

## Many-to-many with named join table

In the previous example, the join table was named `PostTag` by convention. It can be given an explicit name with `UsingEntity`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity("PostsToTagsJoinTable");
}
```

Everything else about the mapping remains the same, with only the name of the join table changing:

```sql
CREATE TABLE "PostsToTagsJoinTable" (
    "PostsId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostsToTagsJoinTable" PRIMARY KEY ("PostsId", "TagsId"),
    CONSTRAINT "FK_PostsToTagsJoinTable_Posts_PostsId" FOREIGN KEY ("PostsId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostsToTagsJoinTable_Tags_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

## Many-to-many with join table foreign key names

Following on from the previous example, the names of the foreign key <example-value> in the join table can also be changed. There are two ways to do this. The first is to explicitly specify the foreign key <example-value> names on the join entity. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity(
            r => r.HasOne(typeof(Tag)).WithMany().HasForeignKey("TagForeignKey"),
            l => l.HasOne(typeof(Post)).WithMany().HasForeignKey("PostForeignKey"));
}
```

The second way is to leave the properties with their by-convention names, but then map these properties to different column names. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity(
            j =>
            {
                j.Property("PostsId").HasColumnName("PostForeignKey");
                j.Property("TagsId").HasColumnName("TagForeignKey");
            });
}
```

In either case, the mapping remains the same, with only the foreign key <example-value> names changed:

```sql
CREATE TABLE "PostTag" (
    "PostForeignKey" <example-value> NOT NULL,
    "TagForeignKey" <example-value> NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostForeignKey", "TagForeignKey"),
    CONSTRAINT "FK_PostTag_Posts_PostForeignKey" <example-value> KEY ("PostForeignKey") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagForeignKey" <example-value> KEY ("TagForeignKey") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```

> **Tip:**
> Although not shown here, the previous two examples can be combined to map change the join table name and its foreign key <example-value> names.

## Many-to-many with class for join entity

So far in the examples, the join table has been automatically mapped to a shared-type entity type. This removes the need for a dedicated class to be created for the entity type. However, it can be useful to have such a class so that it can be referenced easily, especially when navigations or a payload (A "payload" is any additional data in the join table. For example, the timestamp in which an entry in the join table is created.) are added to the class, as is shown in later examples below. To do this, first create a type `PostTag` for the join entity in addition to the existing types for `Post` and `Tag`:

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
    public int PostId { get; set; }
    public int TagId { get; set; }
}
```

> **Tip:**
> The class can have any name, but it is common to combine the names of the types at either end of the relationship.

Now the `UsingEntity` method can be used to configure this as the join entity type for the relationship. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>();
}
```

The `PostId` and `TagId` are automatically picked up as the foreign keys and are configured as the composite primary key for the join entity type. The properties to use for the foreign keys can be explicitly configured for cases where they don't match the EF convention. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(e => e.Tags)
        .WithMany(e => e.Posts)
        .UsingEntity<PostTag>(
            r => r.HasOne<Tag>().WithMany().HasForeignKey(e => e.TagId),
            l => l.HasOne<Post>().WithMany().HasForeignKey(e => e.PostId));
}
```

The mapped database schema for the join table in this example is structurally equivalent to the previous examples, but with some different column names:

```sql
CREATE TABLE "PostTag" (
    "PostId" INTEGER NOT NULL,
    "TagId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostId", "TagId"),
    CONSTRAINT "FK_PostTag_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tags_TagId" FOREIGN KEY ("TagId") REFERENCES "Tags" ("Id") ON DELETE CASCADE);
```
