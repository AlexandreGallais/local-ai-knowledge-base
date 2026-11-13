---
title: "Conventions for relationship discovery - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/relationships/conventions.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Conventions for relationship discovery - EF Core (part 2 of 2)

## Many-to-many

Many-to-many relationships do not have principal and dependent ends, and neither end contains a foreign key property. Instead, many-to-many relationships use a join entity type which contains pairs of foreign keys pointing to either end of the many-to-many. Consider the following entity types, for which a many-to-many relationship is discovered by convention:

```csharp
public class Post
{
    public int Id { get; set; }
    public ICollection<Tag> Tags { get; } = new List<Tag>();
}

public class Tag
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}
```

The conventions used in this discovery are:

- The join entity type is named `<left entity type name><right entity type name>`. So, `PostTag` in this example.
  - The join table has the same name as the join entity type.
- The join entity type is given a foreign key property for each direction of the relationship. These are named `<navigation name><principal key name>`. So, in this example, the foreign key properties are `PostsId` and `TagsId`.
  - For a unidirectional many-to-many, the foreign key property without an associated navigation is named `<principal entity type name><principal key name>`.
- The foreign key properties are non-nullable, making both relationships to the join entity required.
  - The cascade delete conventions mean that these relationships will be configured for cascade delete.
- The join entity type is configured with a composite primary key consisting of the two foreign key properties. So, in this example, the primary key is made up of `PostsId` and `TagsId`.

This results in the following EF model:

```output
Model:
  EntityType: Post
    Properties:
      Id (int) Required PK AfterSave:Throw ValueGenerated.OnAdd
    Skip navigations:
      Tags (ICollection<Tag>) CollectionTag Inverse: Posts
    Keys:
      Id PK
  EntityType: Tag
    Properties:
      Id (int) Required PK AfterSave:Throw ValueGenerated.OnAdd
    Skip navigations:
      Posts (ICollection<Post>) CollectionPost Inverse: Tags
    Keys:
      Id PK
  EntityType: PostTag (Dictionary<string, object>) CLR Type: Dictionary<string, object>
    Properties:
      PostsId (no field, int) Indexer Required PK FK AfterSave:Throw
      TagsId (no field, int) Indexer Required PK FK Index AfterSave:Throw
    Keys:
      PostsId, TagsId PK
    Foreign keys:
      PostTag (Dictionary<string, object>) {'PostsId'} -> Post {'Id'} Cascade
      PostTag (Dictionary<string, object>) {'TagsId'} -> Tag {'Id'} Cascade
    Indexes:
      TagsId
```

And translates to the following database schema when using SQLite:

```sql
CREATE TABLE "Posts" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Posts" PRIMARY KEY AUTOINCREMENT);

CREATE TABLE "Tag" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Tag" PRIMARY KEY AUTOINCREMENT);

CREATE TABLE "PostTag" (
    "PostsId" INTEGER NOT NULL,
    "TagsId" INTEGER NOT NULL,
    CONSTRAINT "PK_PostTag" PRIMARY KEY ("PostsId", "TagsId"),
    CONSTRAINT "FK_PostTag_Posts_PostsId" FOREIGN KEY ("PostsId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PostTag_Tag_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tag" ("Id") ON DELETE CASCADE);

CREATE INDEX "IX_PostTag_TagsId" ON "PostTag" ("TagsId");
```

## Indexes

By convention, EF creates a database index for the property or properties of a foreign key. The type of index created is determined by:

- The cardinality of the relationship
- Whether the relationship is optional or required
- The number of properties that make up the foreign key

For a one-to-many relationship, a straightforward index is created by convention. The same index is created for optional and required relationships. For example, on SQLite:

```sql
CREATE INDEX "IX_Post_BlogId" ON "Post" ("BlogId");
```

Or on SQL Server:

```sql
CREATE INDEX [IX_Post_BlogId] ON [Post] ([BlogId]);
```

For an required one-to-one relationship, a unique index is created. For example, on SQLite:

```sql
CREATE UNIQUE INDEX "IX_Author_BlogId" ON "Author" ("BlogId");
```

Or on SQL Sever:

```sql
CREATE UNIQUE INDEX [IX_Author_BlogId] ON [Author] ([BlogId]);
```

For optional one-to-one relationships, the index created on SQLite is the same:

```sql
CREATE UNIQUE INDEX "IX_Author_BlogId" ON "Author" ("BlogId");
```

However, on SQL Server, an `IS NOT NULL` filter is added to better handle null foreign key values. For example:

```sql
CREATE UNIQUE INDEX [IX_Author_BlogId] ON [Author] ([BlogId]) WHERE [BlogId] IS NOT NULL;
```

For composite foreign keys, an index is created covering all the foreign key columns. For example:

```sql
CREATE INDEX "IX_Post_ContainingBlogId1_ContainingBlogId2" ON "Post" ("ContainingBlogId1", "ContainingBlogId2");
```

> **Note:**
> EF does not create indexes for properties that are already covered by an existing index or primary key constraint.

### How to stop EF creating indexes for foreign keys

Indexes have overhead, and, as asked here, it may not always be appropriate to create them for all FK columns. To achieve this, the `ForeignKeyIndexConvention` can be removed when building the model:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Conventions.Remove(typeof(ForeignKeyIndexConvention));
}
```

When desired, indexes can still be explicitly created for those foreign key columns that do need them.

## Foreign key constraint names

By convention foreign key constraints are named `FK_<dependent type name>_<principal type name>_<foreign key property name>`. For composite foreign keys, `<foreign key property name>` becomes an underscore separated list of foreign key property names.

## Additional resources

- .NET Data Community Standup video on custom model conventions.
