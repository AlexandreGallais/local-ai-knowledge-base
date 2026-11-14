---
title: "Breaking changes in EF Core 7.0 (EF7) - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 7.0 (EF7) - EF Core (part 3 of 3)

## Low-impact changes

### Key <example-value> may need to be configured with a provider value comparer

Tracking Issue #27738

#### Old behavior

In EF Core 6.0, key <example-value> taken directly from the properties of entity types were used for comparison of key <example-value> when saving changes. This would make use of any custom value comparer configured on these properties.

#### New behavior

Starting with EF Core 7.0, database values are used for these comparisons. This "just works" for the vast majority of cases. However, if the properties were using a custom comparer, and that comparer cannot be applied to the database values, then a "provider value comparer" may be needed, as shown below.

#### Why

Various entity-splitting and table-splitting can result in multiple properties mapped to the same database column, and vice-versa. This requires values to be compared after conversion to value that will be used in the database.

#### Mitigations

Configure a provider value comparer. For example, consider the case where a value object is being used as a key, and the comparer for that key uses case-insensitive string comparisons:

```csharp
var blogKeyComparer = new ValueComparer<BlogKey>(
    (l, r) => string.Equals(l.Id, r.Id, StringComparison.OrdinalIgnoreCase),
    v => v.Id.ToUpper().GetHashCode(),
    v => v);

var blogKeyConverter = new ValueConverter<BlogKey, string>(
    v => v.Id,
    v => new BlogKey(v));

modelBuilder.Entity<Blog>()
    .Property(e => e.Id).HasConversion(
        blogKeyConverter, blogKeyComparer);
```

The database values (strings) cannot directly use the comparer defined for `BlogKey` types. Therefore, a provider comparer for case-insensitive string comparisons must be configured:

```csharp
var caseInsensitiveComparer = new ValueComparer<string>(
    (l, r) => string.Equals(l, r, StringComparison.OrdinalIgnoreCase),
    v => v.ToUpper().GetHashCode(),
    v => v);

var blogKeyComparer = new ValueComparer<BlogKey>(
    (l, r) => string.Equals(l.Id, r.Id, StringComparison.OrdinalIgnoreCase),
    v => v.Id.ToUpper().GetHashCode(),
    v => v);

var blogKeyConverter = new ValueConverter<BlogKey, string>(
    v => v.Id,
    v => new BlogKey(v));

modelBuilder.Entity<Blog>()
    .Property(e => e.Id).HasConversion(
        blogKeyConverter, blogKeyComparer, caseInsensitiveComparer);
```

### Check constraints and other table facets are now configured on the table

Tracking Issue #28205

#### Old behavior

In EF Core 6.0, `HasCheckConstraint`, `HasComment`, and `IsMemoryOptimized` were called directly on the entity type builder. For example:

```csharp
modelBuilder
    .Entity<Blog>()
    .HasCheckConstraint("CK_Blog_TooFewBits", "Id > 1023");

modelBuilder
    .Entity<Blog>()
    .HasComment("It's my table, and I'll delete it if I want to.");

modelBuilder
    .Entity<Blog>()
    .IsMemoryOptimized();
```

#### New behavior

Starting with EF Core 7.0, these methods are instead called on the table builder:

```csharp
modelBuilder
    .Entity<Blog>()
    .ToTable(b => b.HasCheckConstraint("CK_Blog_TooFewBits", "Id > 1023"));

modelBuilder
    .Entity<Blog>()
    .ToTable(b => b.HasComment("It's my table, and I'll delete it if I want to."));

modelBuilder
    .Entity<Blog>()
    .ToTable(b => b.IsMemoryOptimized());
```

The existing methods have been marked as `Obsolete`. They currently have the same behavior as the new methods, but will be removed in a future release.

#### Why

These facets apply to tables only. They will not be applied to any mapped views, functions, or stored procedures.

#### Mitigations

Use the table builder methods, as shown above.

### Navigations from new entities to deleted entities are not fixed up

Tracking Issue #28249

#### Old behavior

In EF Core 6.0, when a new entity is tracked either from a tracking query or by attaching it to the `DbContext`, then navigations to and from related entities in the `Deleted` state are fixed up.

#### New behavior

Starting with EF Core 7.0, navigations to and from `Deleted` entities are not fixed up.

#### Why

Once an entity is marked as `Deleted` it rarely makes sense to associate it with non-deleted entities.

#### Mitigations

Query or attach entities before marking entities as `Deleted`, or manually set navigation properties to and from the deleted entity.

### Using `FromSqlRaw` and related methods from the wrong provider throws use-the-correct-method

Tracking Issue #26502

#### Old behavior

In EF Core 6.0, using the Azure Cosmos DB `Microsoft.EntityFrameworkCore.CosmosQueryableExtensions.FromSqlRaw*` extension method when using a relational provider, or the relational `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` extension method when using the Azure Cosmos DB provider could silently fail. Likewise, using relational methods on the in-memory provider is a silent no-op.

#### New behavior

Starting with EF Core 7.0, using an extension method designed for one provider on a different provider will throw an exception.

#### Why

The correct extension method must be used for it to function correctly in all situations.

#### Mitigations

Use the correct extension method for the provider being used. If multiple providers are referenced, then call the extension method as a static method. For example:

```csharp
var result = await CosmosQueryableExtensions.FromSqlRaw(context.Blogs, "SELECT ...").ToListAsync();
```

Or:

```csharp
var result = await RelationalQueryableExtensions.FromSqlRaw(context.Blogs, "SELECT ...").ToListAsync();
```

### Scaffolded `OnConfiguring` no longer calls `IsConfigured`

Tracking Issue #4274

#### Old behavior

In EF Core 6.0, the `DbContext` type scaffolded from an existing database contained a call to `IsConfigured`. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    if (!optionsBuilder.IsConfigured)
    {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        optionsBuilder.UseNpgsql("<example-value>");
    }
}
```

#### New behavior

Starting with EF Core 7.0, the call to `IsConfigured` is no longer included.

#### Why

There are very limited scenarios where the database provider is configured inside your DbContext in some cases, but only if the context is not configured already. Instead, leaving `OnConfiguring` here makes it more likely that a connection string containing sensitive information is left in the code, despite the compile-time warning. Thus the extra safely and cleaner code from removing this was deemed worthwhile, especially given that the `--no-onconfiguring` (.NET CLI) or `-NoOnConfiguring` (Visual Studio Package Manager Console) flag can be used to prevent scaffolding of the `OnConfiguring` method, and that customizable templates exist to add back `IsConfigured` if it is really needed.

#### Mitigations

Either:

- Use the `--no-onconfiguring` (.NET CLI) or `-NoOnConfiguring` (Visual Studio Package Manager Console) argument when scaffolding from an existing database.
- Customize the T4 templates to add back the call to `IsConfigured`.

### `ToTable(null, ...)` throws `ArgumentNullException`

Tracking Issue #19811

#### Old behavior

In EF Core 6.0, calling `.ToTable((string)null, t => t.ExcludeFromMigrations())` was a valid way to configure a keyless entity type that is not mapped to a table and excluded from migrations. For example:

```csharp
modelBuilder.Entity<StringSplitResult>().HasNoKey().ToTable((string)null, t => t.ExcludeFromMigrations());
```

#### New behavior

Starting with EF Core 7.0, calling `.ToTable((string)null, ...)` with the `Action<TableBuilder>` overload throws a `System.ArgumentNullException` because the `name` parameter is no longer nullable.

#### Why

This is a side effect of the changes made to support table facets configuration, which restructured the `ToTable` overloads.

#### Mitigations

Split the two calls. First, configure the table facets using the table builder overload (without specifying a null name), and then unmap the entity type from the table:

```csharp
modelBuilder.Entity<StringSplitResult>(
    entityBuilder =>
    {
        entityBuilder.HasNoKey();
        entityBuilder.ToTable(t => t.ExcludeFromMigrations());
        entityBuilder.ToTable((string?)null);
    });
```

> **Note:**
> Calling `.ToTable(t => t.ExcludeFromMigrations())` will map the entity type to its default table, so migrations will ignore it. However, querying the entity type will try to query the default table unless you also configure it with `ToView` or another mapping override. Calling `.ToTable((string?)null)` afterward unmaps it from the table.
