---
title: "What's New in EF Core 7.0 (part 8 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 8 of 16)

## Model building conventions

EF Core uses a metadata "model" to describe how the application's entity types are mapped to the underlying database. This model is built using a set of around 60 "conventions". The model built by conventions can then be customized using mapping attributes (aka "data annotations") and/or calls to the `DbModelBuilder` API in `OnModelCreating`.

Starting with EF7, applications can now remove or replace any of these conventions, as well as add new conventions. Model building conventions are a powerful way to control the model configuration, but can be complex and hard to get right. In many cases, the existing pre-convention model configuration can be used instead to easily specify a common configuration for properties and types.

Changes to the conventions used by a `DbContext` are made by overriding the `DbContext.ConfigureConventions` method. For example:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Conventions.Remove(typeof(ForeignKeyIndexConvention));
}
```

> **Tip:**
> To find all built-in model building conventions, look for every class that implements the `Microsoft.EntityFrameworkCore.Metadata.Conventions.IConvention` interface.

> **Tip:**
> The code shown here comes from ModelBuildingConventionsSample.cs.

### Removing an existing convention

Sometimes one of the built-in conventions may not be appropriate for your application, in which case it can be removed.

#### Example: Don't create indexes for foreign key <example-value>

It usually makes sense to create indexes for foreign key (FK) columns, and hence there is a built-in convention for this: `Microsoft.EntityFrameworkCore.Metadata.Conventions.ForeignKeyIndexConvention`. Looking at the model debug view for a `Post` entity type with relationships to `Blog` and `Author`, we can see two indexes are created--one for the `BlogId` FK, and the other for the `AuthorId` FK.

```text
  EntityType: Post
    Properties:
      Id (int) Required PK AfterSave:Throw ValueGenerated.OnAdd
      AuthorId (no field, int?) Shadow FK Index
      BlogId (no field, int) Shadow Required FK Index
    Navigations:
      Author (Author) ToPrincipal Author Inverse: Posts
      Blog (Blog) ToPrincipal Blog Inverse: Posts
    Keys:
      Id PK
    Foreign keys:
      Post {'AuthorId'} -> Author {'Id'} ToDependent: Posts ToPrincipal: Author ClientSetNull
      Post {'BlogId'} -> Blog {'Id'} ToDependent: Posts ToPrincipal: Blog Cascade
    Indexes:
      AuthorId
      BlogId
```

However, indexes have overhead, and, as asked here, it may not always be appropriate to create them for all FK columns. To achieve this, the `ForeignKeyIndexConvention` can be removed when building the model:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Conventions.Remove(typeof(ForeignKeyIndexConvention));
}
```

Looking at the debug view of the model for `Post` now, we see that the indexes on FKs have not been created:

```text
  EntityType: Post
    Properties:
      Id (int) Required PK AfterSave:Throw ValueGenerated.OnAdd
      AuthorId (no field, int?) Shadow FK
      BlogId (no field, int) Shadow Required FK
    Navigations:
      Author (Author) ToPrincipal Author Inverse: Posts
      Blog (Blog) ToPrincipal Blog Inverse: Posts
    Keys:
      Id PK
    Foreign keys:
      Post {'AuthorId'} -> Author {'Id'} ToDependent: Posts ToPrincipal: Author ClientSetNull
      Post {'BlogId'} -> Blog {'Id'} ToDependent: Posts ToPrincipal: Blog Cascade
```

When desired, indexes can still be explicitly created for foreign key <example-value>, either using the `Microsoft.EntityFrameworkCore.IndexAttribute`:

```csharp
[Index("BlogId")]
public class Post
{
    // ...
}
```

Or with configuration in `OnModelCreating`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>(entityTypeBuilder => entityTypeBuilder.HasIndex("BlogId"));
}
```

Looking at the `Post` entity type again, it now contains the `BlogId` index, but not the `AuthorId` index:

```text
  EntityType: Post
    Properties:
      Id (int) Required PK AfterSave:Throw ValueGenerated.OnAdd
      AuthorId (no field, int?) Shadow FK
      BlogId (no field, int) Shadow Required FK Index
    Navigations:
      Author (Author) ToPrincipal Author Inverse: Posts
      Blog (Blog) ToPrincipal Blog Inverse: Posts
    Keys:
      Id PK
    Foreign keys:
      Post {'AuthorId'} -> Author {'Id'} ToDependent: Posts ToPrincipal: Author ClientSetNull
      Post {'BlogId'} -> Blog {'Id'} ToDependent: Posts ToPrincipal: Blog Cascade
    Indexes:
      BlogId
```

> **Tip:**
> If your model doesn't use mapping attributes (aka data annotations) for configuration, then all conventions ending in `AttributeConvention` can be safely removed to speed up model building.
