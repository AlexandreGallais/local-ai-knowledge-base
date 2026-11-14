---
title: "Inheritance - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/inheritance.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Inheritance

EF can map a .NET type hierarchy to a database. This allows you to write your .NET entities in code as usual, using base and derived types, and have EF seamlessly create the appropriate database schema, issue queries, etc. The actual details of how a type hierarchy is mapped are provider-dependent; this page describes inheritance support in the context of a relational database.

## Entity type hierarchy mapping

By convention, EF will not automatically scan for base or derived types; this means that if you want a CLR type in your hierarchy to be mapped, you must explicitly specify that type on your model. For example, specifying only the base type of a hierarchy will not cause EF Core to implicitly include all of its sub-types.

The following sample exposes a DbSet for `Blog` and its subclass `RssBlog`. If `Blog` has any other subclass, it will not be included in the model.

```csharp
internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<RssBlog> RssBlogs { get; set; }
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}

public class RssBlog : Blog
{
    public string RssUrl { get; set; }
}
```

> **Note:**
> Database columns are automatically made nullable as necessary when using TPH mapping. For example, the `RssUrl` column is nullable because regular `Blog` instances do not have that property.

If you don't want to expose a `DbSet` for one or more entities in the hierarchy, you can also use the Fluent API to ensure they are included in the model.

> **Tip:**
> If you don't rely on conventions, you can specify the base type explicitly using `HasBaseType`. You can also use `.HasBaseType((Type)null)` to remove an entity type from the hierarchy.

## Table-per-hierarchy and discriminator configuration

By default, EF maps the inheritance using the *table-per-hierarchy* (TPH) pattern. TPH uses a single table to store the data for all types in the hierarchy, and a discriminator column is used to identify which type each row represents.

The model above is mapped to the following database schema (note the implicitly created `Discriminator` column, which identifies which type of `Blog` is stored in each row).

You can configure the name and type of the discriminator column and the values that are used to identify each type in the hierarchy:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasDiscriminator<string>("blog_type")
        .HasValue<Blog>("blog_base")
        .HasValue<RssBlog>("blog_rss");
}
```

In the examples above, EF added the discriminator implicitly as a shadow property on the base entity of the hierarchy. This property can be configured like any other:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .Property("blog_type")
        .HasMaxLength(200);
}
```

Finally, the discriminator can also be mapped to a regular .NET property in your entity:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasDiscriminator(b => b.BlogType);

    modelBuilder.Entity<Blog>()
        .Property(e => e.BlogType)
        .HasMaxLength(200)
        .HasColumnName("blog_type");
        
    modelBuilder.Entity<RssBlog>();
}
```

When querying for derived entities, which use the TPH pattern, EF Core adds a predicate over discriminator column in the query. This filter makes sure that we don't get any additional rows for base types or sibling types not in the result. This filter predicate is skipped for the base entity type since querying for the base entity will get results for all the entities in the hierarchy. When materializing results from a query, if we come across a discriminator value, which isn't mapped to any entity type in the model, we throw an exception since we don't know how to materialize the results. This error only occurs if your database contains rows with discriminator values, which aren't mapped in the EF model. If you have such data, then you can mark the discriminator mapping in EF Core model as incomplete to indicate that we should always add filter predicate for querying any type in the hierarchy. `IsComplete(false)` call on the discriminator configuration marks the mapping to be incomplete.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasDiscriminator()
        .IsComplete(false);
}
```

### Shared columns

By default, when two sibling entity types in the hierarchy have a property with the same name, they will be mapped to two separate columns. However, if their type is identical they can be mapped to the same database column:

```csharp
public class MyContext : DbContext
{
    public DbSet<BlogBase> Blogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .Property(b => b.Url)
            .HasColumnName("Url");

        modelBuilder.Entity<RssBlog>()
            .Property(b => b.Url)
            .HasColumnName("Url");
    }
}

public abstract class BlogBase
{
    public int BlogId { get; set; }
}

public class Blog : BlogBase
{
    public string Url { get; set; }
}

public class RssBlog : BlogBase
{
    public string Url { get; set; }
}
```

> **Note:**
> Relational database providers, such as SQL Server, will not automatically use the discriminator predicate when querying shared columns when using a cast. The query `Url = (blog as RssBlog).Url` would also return the `Url` value for the sibling `Blog` rows. To restrict the query to `RssBlog` entities you need to manually add a filter on the discriminator, such as `Url = blog is RssBlog ? (blog as RssBlog).Url : null`.

## Table-per-type configuration

In the TPT mapping pattern, all the types are mapped to individual tables. Properties that belong solely to a base type or derived type are stored in a table that maps to that type. Tables that map to derived types also store a foreign key that joins the derived table with the base table.

```csharp
modelBuilder.Entity<Blog>().ToTable("Blogs");
modelBuilder.Entity<RssBlog>().ToTable("RssBlogs");
```

> **Tip:**
> Instead of calling `ToTable` on each entity type you can call `modelBuilder.Entity<Blog>().UseTptMappingStrategy()` on each root entity type and the table names will be generated by EF.

> **Tip:**
> To configure different column names for the primary key <example-value> in each table see Table-specific facet configuration.

EF will create the following database schema for the model above.

```sql
CREATE TABLE [Blogs] (
    [BlogId] int NOT NULL IDENTITY,
    [Url] nvarchar(max) NULL,
    CONSTRAINT [PK_Blogs] PRIMARY KEY ([BlogId])
);

CREATE TABLE [RssBlogs] (
    [BlogId] int NOT NULL,
    [RssUrl] nvarchar(max) NULL,
    CONSTRAINT [PK_RssBlogs] PRIMARY KEY ([BlogId]),
    CONSTRAINT [FK_RssBlogs_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([BlogId]) ON DELETE NO ACTION
);
```

> **Note:**
> If the primary key <example-value> is renamed the new name will be applied to all the tables mapped to the hierarchy, future EF versions will allow renaming the constraint only for a particular table when issue 19970 is fixed.

If you are employing bulk configuration you can retrieve the column name for a specific table by calling `Microsoft.EntityFrameworkCore.RelationalPropertyExtensions.GetColumnName(Microsoft.EntityFrameworkCore.Metadata.IProperty,Microsoft.EntityFrameworkCore.Metadata.StoreObjectIdentifier@)`.

```csharp
foreach (var entityType in modelBuilder.Model.GetEntityTypes())
{
    var tableIdentifier = StoreObjectIdentifier.Create(entityType, StoreObjectType.Table);

    Console.WriteLine($"{entityType.DisplayName()}\t\t{tableIdentifier}");
    Console.WriteLine(" Property\tColumn");

    foreach (var property in entityType.GetProperties())
    {
        var columnName = property.GetColumnName(tableIdentifier.Value);
        Console.WriteLine($" {property.Name,-10}\t{columnName}");
    }

    Console.WriteLine();
}
```

> **Warning:**
> In many cases, TPT shows inferior performance when compared to TPH. See the performance docs for more information.

> **Caution:**
> Columns for a derived type are mapped to different tables, therefore composite FK constraints and indexes that use both the inherited and declared properties cannot be created in the database.
