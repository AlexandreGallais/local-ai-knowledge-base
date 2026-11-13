---
title: "Reverse Engineering - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/managing-schemas/scaffolding/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Reverse Engineering - EF Core (part 2 of 2)

## The scaffolded code

The result of scaffolding from an existing database is:

- A file containing a class that inherits from `DbContext`
- A file for each entity type

> **Tip:**
> Starting in EF7, you can also use T4 text templates to customize the generated code. See _Custom Reverse Engineering Templates_ for more details.

### C# Nullable reference types

The scaffolder can create EF model and entity types that use C# nullable reference types (NRTs). NRT usage is scaffolded automatically when NRT support is enabled in the C# project into which the code is being scaffolded.

For example, the following `Tags` table contains both nullable non-nullable string columns:

```sql
CREATE TABLE [Tags] (
  [Id] int NOT NULL IDENTITY,
  [Name] nvarchar(max) NOT NULL,
  [Description] nvarchar(max) NULL,
  CONSTRAINT [PK_Tags] PRIMARY KEY ([Id]));
```

This results in corresponding nullable and non-nullable string properties in the generated class:

```csharp
public partial class Tag
{
    public Tag()
    {
        Posts = new HashSet<Post>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}
```

Similarly, the following `Posts` tables contains a required relationship to the `Blogs` table:

```sql
CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Contents] nvarchar(max) NOT NULL,
    [PostedOn] datetime2 NOT NULL,
    [UpdatedOn] datetime2 NULL,
    [BlogId] int NOT NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Posts_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]));
```

This results in the scaffolding of non-nullable (required) relationship between blogs:

```csharp
public partial class Blog
{
    public Blog()
    {
        Posts = new HashSet<Post>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public virtual ICollection<Post> Posts { get; set; }
}
```

And posts:

```csharp
public partial class Post
{
    public Post()
    {
        Tags = new HashSet<Tag>();
    }

    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Contents { get; set; } = null!;
    public DateTime PostedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public int BlogId { get; set; }

    public virtual Blog Blog { get; set; } = null!;

    public virtual ICollection<Tag> Tags { get; set; }
}
```

### Many-to-many relationships

The scaffolding process detects simple join tables and automatically generates a many-to-many mapping for them. For example, consider tables for `Posts` and `Tags`, and a join table `PostTag` connecting them:

```sql
CREATE TABLE [Tags] (
  [Id] int NOT NULL IDENTITY,
  [Name] nvarchar(max) NOT NULL,
  [Description] nvarchar(max) NULL,
  CONSTRAINT [PK_Tags] PRIMARY KEY ([Id]));

CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Contents] nvarchar(max) NOT NULL,
    [PostedOn] datetime2 NOT NULL,
    [UpdatedOn] datetime2 NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]));

CREATE TABLE [PostTag] (
    [PostsId] int NOT NULL,
    [TagsId] int NOT NULL,
    CONSTRAINT [PK_PostTag] PRIMARY KEY ([PostsId], [TagsId]),
    CONSTRAINT [FK_PostTag_Posts_TagsId] FOREIGN KEY ([TagsId]) REFERENCES [Tags] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PostTag_Tags_PostsId] FOREIGN KEY ([PostsId]) REFERENCES [Posts] ([Id]) ON DELETE CASCADE);
```

When scaffolded, this results in a class for Post:

```csharp
public partial class Post
{
    public Post()
    {
        Tags = new HashSet<Tag>();
    }

    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Contents { get; set; } = null!;
    public DateTime PostedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public int BlogId { get; set; }

    public virtual Blog Blog { get; set; } = null!;

    public virtual ICollection<Tag> Tags { get; set; }
}
```

And a class for Tag:

```csharp
public partial class Tag
{
    public Tag()
    {
        Posts = new HashSet<Post>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}
```

But no class for the `PostTag` table. Instead, configuration for a many-to-many relationship is scaffolded:

```csharp
entity.HasMany(d => d.Tags)
    .WithMany(p => p.Posts)
    .UsingEntity<Dictionary<string, object>>(
        "PostTag",
        r => r.HasOne<Tag>().WithMany().HasForeignKey("TagsId"),
        l => l.HasOne<Post>().WithMany().HasForeignKey("PostsId"),
        j =>
            {
                j.HasKey("PostsId", "TagsId");
                j.ToTable("PostTag");
                j.HasIndex(new[] { "TagsId" }, "IX_PostTag_TagsId");
            });
```

### Other programming languages

The EF Core packages published by Microsoft scaffold C# code. However, the underlying scaffolding system supports a plugin model for scaffolding to other languages. This plugin model is used by various community-run projects, for example:

- EntityFrameworkCore.VisualBasic provides support for Visual Basic
- EFCore.FSharp provides support for F#

### Customizing the code

Starting with EF7, one of the best ways to customize the generated code is by customizing the T4 templates used to generate it.

The code can also be changed after it is generated, but the best way to do this depends on whether you intend to re-run the scaffolding process when the database model changes.

#### Scaffold once only

With this approach, the scaffolded code provides a starting point for code-based mapping going forward. Any changes to the generated code can be made as desired--it becomes normal code just like any other code in your project.

Keeping the database and the EF model in sync can be done in one of two ways:

- Switch to using EF Core database migrations, and use the entity types and EF model configuration as the source of truth, using migrations to drive the schema.
- Manually update the entity types and EF configuration when the database changes. For example, if a new column is added to a table, then add a property for the column to the mapped entity type, and add any necessary configuration using mapping attributes and/or code in `OnModelCreating`. This is relatively easy, with the only real challenge being a process to make sure that database changes are recorded or detected in some way so that the developer(s) responsible for the code can react.

#### Repeated scaffolding

An alternate approach to scaffolding once is to re-scaffold every time the database changes. This will _overwrite_ any previously scaffolded code, meaning any changes made to entity types or EF configuration in that code will be lost.

> [TIP]
> By default, the EF commands will not overwrite any existing code to protect against accidental code loss. The `-Force` (Visual Studio PMC) or `--force` (.NET CLI) argument can be used to force overwriting of existing files.

Since the scaffolded code will be overwritten, it is best not to modify it directly, but instead rely on partial classes and methods, and the mechanisms in EF Core that allow configuration to be overridden. Specifically:

- Both the `DbContext` class and the entity classes are generated as partial. This allows introducing additional members and code in a separate file which will not be overridden when scaffolding is run.
- The `DbContext` class contains a partial method called `OnModelCreatingPartial`. An implementation of this method can be added to the partial class for the `DbContext`. It will then be called after `OnModelCreating` is called.
- Model configuration made using the `ModelBuilder` APIs overrides any configuration done by conventions or mapping attributes, as well earlier configuration done on the model builder. This means that code in `OnModelCreatingPartial` can be used to override the configuration generated by the scaffolding process, without the need to remove that configuration.

Finally, remember that starting with EF7, the T4 templates used to generate code can be customized. This is often a more effective approach than scaffolding with the defaults and then modifying with partial classes and/or methods.

## How it works

Reverse engineering starts by reading the database schema. It reads information about tables, columns, constraints, and indexes.

Next, it uses the schema information to create an EF Core model. Tables are used to create entity types; columns are used to create properties; and foreign keys are used to create relationships.

Finally, the model is used to generate code. The corresponding entity type classes, Fluent API, and data annotations are scaffolded in order to re-create the same model from your app.

## Limitations

- Not everything about a model can be represented using a database schema. For example, information about **inheritance hierarchies**, **owned types**, and **table splitting** are not present in the database schema. Because of this, these constructs will never be scaffolded.
- In addition, **some column types** may not be supported by the EF Core provider. These columns won't be included in the model.
- You can define **concurrency tokens** in an EF Core model to prevent two users from updating the same entity at the same time. Some databases have a special type to represent this type of column (for example, rowversion in SQL Server) in which case we can reverse engineer this information; however, other concurrency tokens will not be scaffolded.
