---
title: "Breaking changes in EF Core 5.0 - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-5.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 5.0

The following API and behavior changes have the potential to break existing applications updating to EF Core 5.0.0.

## Summary

| **Breaking change**                                                                                                                   | **Impact** |
|:--------------------------------------------------------------------------------------------------------------------------------------|------------|
| EF Core 5.0 does not support .NET Framework                                                                         | Medium     |
| IProperty.GetColumnName() is now obsolete                                                                  | Medium     |
| Precision and scale are required for decimals                                                                            | Medium     |
| Required or non-nullable navigation from principal to dependent has different semantics                        | Medium     |
| Defining query is replaced with provider-specific methods                                                          | Medium     |
| Non-null reference navigations are not overwritten by queries                                                   | Medium     |
| ToView() is treated differently by migrations                                                                              | Medium     |
| ToTable(null) marks the entity type as not mapped to a table                                                              | Medium     |
| Removed HasGeometricDimension method from SQLite NTS extension                                                   | Low        |
| Azure Cosmos DB: Partition key is now added to the primary key                                               | Low        |
| Azure Cosmos DB: `id` property renamed to `__id`                                                                        | Low        |
| Azure Cosmos DB: byte[] is now stored as a base64 string instead of a number array                                    | Low        |
| Azure Cosmos DB: GetPropertyName and SetPropertyName were renamed                                                 | Low        |
| Value generators are called when the entity state is changed from Detached to Unchanged, Updated, or Deleted | Low        |
| IMigrationsModelDiffer now uses IRelationalModel                                                                 | Low        |
| Discriminators are read-only                                                                             | Low        |
| Provider-specific EF.Functions methods throw for in-memory provider                                             | Low        |
| IndexBuilder.HasName is now obsolete                                                                               | Low        |
| A pluralizer is now included for scaffolding reverse engineered models                                                 | Low        |
| INavigationBase replaces INavigation in some APIs to support skip navigations                                     | Low        |
| Some queries with correlated collection that also use `Distinct` or `GroupBy` are no longer supported | Low        |
| Using a collection of Queryable type in projection is not supported                                          | Low        |

## Medium-impact changes

### EF Core 5.0 does not support .NET Framework

Tracking Issue #15498

#### Old behavior

EF Core 3.1 targets .NET Standard 2.0, which is supported by .NET Framework.

#### New behavior

EF Core 5.0 targets .NET Standard 2.1, which is not supported by .NET Framework. This means EF Core 5.0 cannot be used with .NET Framework applications.

#### Why

This is part of the wider movement across .NET teams aimed at unification to a single .NET target framework. For more information see the future of .NET Standard.

#### Mitigations

.NET Framework applications can continue to use EF Core 3.1, which is a long-term support (LTS) release. Alternately, applications can be updated to use .NET Core 3.1 or .NET 5, both of which support .NET Standard 2.1.

### IProperty.GetColumnName() is now obsolete

Tracking Issue #2266

#### Old behavior

`GetColumnName()` returned the name of the column that a property is mapped to.

#### New behavior

`GetColumnName()` still returns the name of a column that a property is mapped to, but this behavior is now ambiguous since EF Core 5 supports TPT and simultaneous mapping to a view or a function where these mappings could use different column names for the same property.

#### Why

We marked this method as obsolete to guide users to a more accurate overload - `Microsoft.EntityFrameworkCore.RelationalPropertyExtensions.GetColumnName(Microsoft.EntityFrameworkCore.Metadata.IProperty,Microsoft.EntityFrameworkCore.Metadata.StoreObjectIdentifier@)`.

#### Mitigations

If the entity type is only ever mapped to a single table, and never to views, functions, or multiple tables, the `Microsoft.EntityFrameworkCore.RelationalPropertyExtensions.GetColumnBaseName(Microsoft.EntityFrameworkCore.Metadata.IReadOnlyProperty)` can be used in EF Core 5.0 and 6.0 to obtain the table name. For example:

```csharp
var columnName = property.GetColumnBaseName();
```

In EF Core 7.0, this can again be replaced with the new `GetColumnName`, which behaves as the original did for simple, single table only mappings.

If the entity type may be mapped to views, functions, or multiple tables, then a `Microsoft.EntityFrameworkCore.Metadata.StoreObjectIdentifier` must be obtained to identity the table, view, or function. This can be then be used to get the column name for that store object. For example:

```csharp
var columnName = property.GetColumnName(StoreObjectIdentifier.Table("Users", null)));
```

### Precision and scale are required for decimals

Tracking Issue #19293

#### Old behavior

EF Core did not normally set precision and scale on `Microsoft.Data.SqlClient.SqlParameter` objects. This means the full precision and scale was sent to SQL Server, at which point SQL Server would round based on the precision and scale of the database column.

#### New behavior

EF Core now sets precision and scale on parameters using the values configured for properties in the EF Core model. This means rounding now happens in SqlClient. Consequentially, if the configured precision and scale do not match the database precision and scale, then the rounding seen may change.

#### Why

Newer SQL Server features, including Always Encrypted, require that parameter facets are fully specified. In addition, SqlClient made a change to round instead of truncate decimal values, thereby matching the SQL Server behavior. This made it possible for EF Core to set these facets without changing the behavior for correctly configured decimals.

#### Mitigations

Map your decimal properties using a type name that includes precision and scale. For example:

```csharp
public class Blog
{
    public int Id { get; set; }

    [Column(TypeName = "decimal(16, 5)")]
    public decimal Score { get; set; }
}
```

Or use `HasPrecision` in the model building APIs. For example:

```csharp
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>().Property(e => e.Score).HasPrecision(16, 5);
    }
```

### Required or non-nullable navigation from principal to dependent has different semantics

Tracking Issue #17286

#### Old behavior

Only the navigations to principal could be configured as required. Therefore, using `RequiredAttribute` on the navigation to the dependent (the entity containing the foreign key) or marking it as non-nullable would instead create the foreign key on the defining entity type.

#### New behavior

With the added support for required dependents, it is now possible to mark any reference navigation as required, meaning that in the case shown above the foreign key will be defined on the other side of the relationship and the properties won't be marked as required.

Calling `IsRequired` before specifying the dependent end is now ambiguous:

```csharp
modelBuilder.Entity<Blog>()
    .HasOne(b => b.BlogImage)
    .WithOne(i => i.Blog)
    .IsRequired()
    .HasForeignKey<BlogImage>(b => b.BlogForeignKey);
```

#### Why

The new behavior is necessary to enable support for required dependents (see #12100).

#### Mitigations

Remove `RequiredAttribute` from the navigation to the dependent and place it instead on the navigation to the principal or configure the relationship in `OnModelCreating`:

```csharp
modelBuilder.Entity<Blog>()
    .HasOne(b => b.BlogImage)
    .WithOne(i => i.Blog)
    .HasForeignKey<BlogImage>(b => b.BlogForeignKey)
    .IsRequired();
```

### Defining query is replaced with provider-specific methods

Tracking Issue #18903

#### Old behavior

Entity types were mapped to defining queries at the Core level. Anytime the entity type was used in the query root of the entity type was replaced by the defining query for any provider.

#### New behavior

APIs for defining query are deprecated. New provider-specific APIs were introduced.

#### Why

While defining queries were implemented as replacement query whenever query root is used in the query, it had a few issues:

- If defining query is projecting entity type using `new { ... }` in `Select` method, then identifying that as an entity required additional work and made it inconsistent with how EF Core treats nominal types in the query.
- For relational providers `FromSql` is still needed to pass the SQL string in LINQ expression form.

Initially defining queries were introduced as client-side views to be used with In-Memory provider for keyless entities (similar to database views in relational databases). Such definition makes it easy to test application against in-memory database. Afterwards they became broadly applicable, which was useful but brought inconsistent and hard to understand behavior. So we decided to simplify the concept. We made LINQ based defining query exclusive to In-Memory provider and treat them differently. For more information, see this issue.

#### Mitigations

For relational providers, use `ToSqlQuery` method in `OnModelCreating` and pass in a SQL string to use for the entity type.
For the In-Memory provider, use `ToInMemoryQuery` method in `OnModelCreating` and pass in a LINQ query to use for the entity type.

### Non-null reference navigations are not overwritten by queries

Tracking Issue #2693

#### Old behavior

In EF Core 3.1, reference navigations eagerly initialized to non-null values would sometimes be overwritten by entity instances from the database, regardless of whether or not key values matched. However, in other cases, EF Core 3.1 would do the opposite and leave the existing non-null value.

#### New behavior

Starting with EF Core 5.0, non-null reference navigations are never overwritten by instances returned from a query.

Note that eager initialization of a _collection_ navigation to an empty collection is still supported.

#### Why

Initialization of a reference navigation property to an "empty" entity instance results in an ambiguous state. For example:

```csharp
public class Blog
{
     public int Id { get; set; }
     public Author Author { get; set; ) = new Author();
}
```

Normally a query for Blogs and Authors will first create `Blog` instances and then set the appropriate `Author` instances based on the data returned from the database. However, in this case every `Blog.Author` property is already initialized to an empty `Author`. Except EF Core has no way to know that this instance is "empty". So overwriting this instance could potentially silently throw away a valid `Author`. Therefore, EF Core 5.0 now consistently does not overwrite a navigation that is already initialized.

This new behavior also aligns with the behavior of EF6 in most cases, although upon investigation we also found some cases of inconsistency in EF6.

#### Mitigations

If this break is encountered, then the fix is to stop eagerly initializing reference navigation properties.

### ToView() is treated differently by migrations

Tracking Issue #2725

#### Old behavior

Calling `ToView(string)` made the migrations ignore the entity type in addition to mapping it to a view.

#### New behavior

Now `ToView(string)` marks the entity type as not mapped to a table in addition to mapping it to a view. This results in the first migration after upgrading to EF Core 5 to try to drop the default table for this entity type as it's not longer ignored.

#### Why

EF Core now allows an entity type to be mapped to both a table and a view simultaneously, so `ToView` is no longer a valid indicator that it should be ignored by migrations.

#### Mitigations

Use the following code to mark the mapped table as excluded from migrations:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>().ToTable("UserView", t => t.ExcludeFromMigrations());
}
```

### ToTable(null) marks the entity type as not mapped to a table

Tracking Issue #21172

#### Old behavior

`ToTable(null)` would reset the table name to the default.

#### New behavior

`ToTable(null)` now marks the entity type as not mapped to any table.

#### Why

EF Core now allows an entity type to be mapped to both a table and a view simultaneously, so `ToTable(null)` is used to indicate that it isn't mapped to any table.

#### Mitigations

Use the following code to reset the table name to the default if it's not mapped to a view or a DbFunction:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>().Metadata.RemoveAnnotation(RelationalAnnotationNames.TableName);
}
```
