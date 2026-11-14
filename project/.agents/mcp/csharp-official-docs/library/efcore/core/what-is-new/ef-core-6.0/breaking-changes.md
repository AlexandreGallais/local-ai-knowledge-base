---
title: "Breaking changes in EF Core 6.0 - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-6.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 6.0

The following API and behavior changes have the potential to break existing applications updating to EF Core 6.0.

## Target Framework

EF Core 6.0 targets .NET 6. Applications targeting older .NET, .NET Core, and .NET Framework versions will need to target .NET 6 to use EF Core 6.0.

## Summary

| **Breaking change**                                                                                                                 | **Impact** |
|:------------------------------------------------------------------------------------------------------------------------------------|------------|
| Nested optional dependents sharing a table and with no required properties cannot be saved                     | High       |
| Changing the owner of an owned entity now throws an exception                                                 | Medium     |
| Azure Cosmos DB: Related entity types are discovered as owned                                                      | Medium     |
| SQLite: Connections are pooled                                                                                  | Medium     |
| Many-to-many relationships without mapped join entities are now scaffolded                                         | Medium     |
| Cleaned up mapping between DeleteBehavior and ON DELETE values                                                        | Low        |
| In-memory database validates required properties do not contain nulls                                        | Low        |
| Removed last ORDER BY when joining for collections                                                                | Low        |
| DbSet no longer implements IAsyncEnumerable                                                              | Low        |
| TVF return entity type is also mapped to a table by default                                                           | Low        |
| Check constraint name uniqueness is now validated                                                      | Low        |
| Added IReadOnly Metadata interfaces and removed extension methods                                            | Low        |
| IExecutionStrategy is now a singleton service                                                                | Low        |
| SQL Server: More errors are considered transient                                                               | Low        |
| Azure Cosmos DB: More characters are escaped in 'id' values                                                           | Low        |
| Some Singleton services are now Scoped                                                                           | Low*       |
| New caching API for extensions that add or replace services                                                  | Low*       |
| New snapshot and design-time model initialization procedure                                             | Low        |
| `OwnedNavigationBuilder.HasIndex` returns a different type now                                                      | Low        |
| `DbFunctionBuilder.HasSchema(null)` overrides `[DbFunction(Schema = "schema")]`                                 | Low        |
| Pre-initialized navigations are overridden by values from database queries                                | Low        |
| Unknown enum string values in the database are not converted to the enum default when queried                     | Low        |
| DbFunctionBuilder.HasTranslation now provides the function arguments as IReadOnlyList rather than IReadOnlyCollection | Low        |
| Default table mapping is not removed when the entity is mapped to a table-valued function                   | Low        |
| dotnet-ef targets .NET 6                                                                                              | Low        |
| `IModelCacheKeyFactory` implementations may need to be updated to handle design-time caching                    | Low        |
| `NavigationBaseIncludeIgnored` is now an error by default                                                    | Low        |

\* These changes are of particular interest to authors of database providers and extensions.

## High-impact changes

### Nested optional dependents sharing a table and with no required properties are disallowed

Tracking Issue #24558

#### Old behavior

Models with nested optional dependents sharing a table and with no required properties were allowed, but could result in data loss when querying for the data and then saving again. For example, consider the following model:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ContactInfo ContactInfo { get; set; }
}

[Owned]
public class ContactInfo
{
    public string Phone { get; set; }
    public Address Address { get; set; }
}

[Owned]
public class Address
{
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Postcode { get; set; }
}
```

None of the properties in `ContactInfo` or `Address` are required, and all these entity types are mapped to the same table. The rules for optional dependents (as opposed to required dependents) say that if all of the columns for `ContactInfo` are null, then no instance of `ContactInfo` will be created when querying for the owner `Customer`. However, this also means that no instance of `Address` will be created, even if the `Address` columns are non-null.

#### New behavior

Attempting to use this model will now throw the following exception:

> System.InvalidOperationException:
> Entity type 'ContactInfo' is an optional dependent using table sharing and containing other dependents without any required non shared property to identify whether the entity exists. If all nullable properties contain a null value in database then an object instance won't be created in the query causing nested dependent's values to be lost. Add a required property to create instances with null values for other properties or mark the incoming navigation as required to always create an instance.

This prevents data loss when querying and saving data.

#### Why

Using models with nested optional dependents sharing a table and with no required properties often resulted in silent data loss.

#### Mitigations

Avoid using optional dependents sharing a table and with no required properties. There are three easy ways to do this:

1. Make the dependents required. This means that the dependent entity will always have a value after it is queried, even if all its properties are null. For example:

   ```csharp
   public class Customer
   {
       public int Id { get; set; }
       public string Name { get; set; }
   
       [Required]
       public Address Address { get; set; }
   }
   ```

   Or:

   ```csharp
   modelBuilder.Entity<Customer>(
       b =>
           {
               b.OwnsOne(e => e.Address);
               b.Navigation(e => e.Address).IsRequired();
           });
   ```

2. Make sure that the dependent contains at least one required property.
3. Map optional dependents to their own table, instead of sharing a table with the principal. For example:

   ```csharp
   modelBuilder.Entity<Customer>(
       b =>
           {
               b.ToTable("Customers");
               b.OwnsOne(e => e.Address, b => b.ToTable("CustomerAddresses"));
           });
   ```

The problems with optional dependents and examples of these mitigations are included in the documentation for What's new in EF Core 6.0.

## Medium-impact changes

### Changing the owner of an owned entity now throws an exception

Tracking Issue #4073

#### Old behavior

It was possible to reassign an owned entity to a different owner entity.

#### New behavior

This action will now throw an exception:

> The property '{entityType}.{property}' is part of a key and so cannot be modified or marked as modified. To change the principal of an existing entity with an identifying foreign key, first delete the dependent and invoke 'SaveChanges', and then associate the dependent with the new principal.

#### Why

Even though we don't require key <example-value> to exist on an owned type, EF will still create shadow properties to be used as the primary key and the foreign key <example-value> to the owner. When the owner entity is changed it causes the values of the foreign key on the owned entity to change, and since they are also used as the primary key this results in the entity identity to change. This isn't yet fully supported in EF Core and was only conditionally allowed for owned entities, sometimes resulting in the internal state becoming inconsistent.

#### Mitigations

Instead of assigning the same owned instance to a new owner you can assign a copy and delete the old one.

### Azure Cosmos DB: Related entity types are discovered as owned

Tracking Issue #24803
What's new: Default to implicit ownership

#### Old behavior

As in other providers, related entity types were discovered as normal (non-owned) types.

#### New behavior

Related entity types will now be owned by the entity type on which they were discovered. Only the entity types that correspond to a `Microsoft.EntityFrameworkCore.DbSet`1` property will be discovered as non-owned.

#### Why

This behavior follows the common pattern of modeling data in Azure Cosmos DB of embedding related data into a single document. Azure Cosmos DB does not natively support joining different documents, so modeling related entities as non-owned has limited usefulness.

#### Mitigations

To configure an entity type to be non-owned call `modelBuilder.Entity<MyEntity>();`

### SQLite: Connections are pooled

Tracking Issue #13837
What's new: Default to implicit ownership

#### Old behavior

Previously, connections in Microsoft.Data.Sqlite were not pooled.

#### New behavior

Starting in 6.0, connections are now pooled by default. This results in database files being kept open by the process even after the ADO.NET connection object is closed.

#### Why

Pooling the underlying connections greatly improves the performance of opening and closing ADO.NET connection objects. This is especially noticeable for scenarios where opening the underlying connection is expensive as in the case of encryption, or in scenarios where there are a lot of short-lived connection to the database.

#### Mitigations

Connection pooling can be disabled by adding `Pooling=False` to a connection string.

Some scenarios (like deleting the database file) may now encounter errors stating that the file is still in use. You can manually clear the connection pool before performing operations of the file using `SqliteConnection.ClearPool()`.

```csharp
SqliteConnection.ClearPool(connection);
File.Delete(databaseFile);
```

### Many-to-many relationships without mapped join entities are now scaffolded

Tracking Issue #22475

#### Old behavior

Scaffolding (reverse engineering) a `DbContext` and entity types from an existing database always explicitly mapped join tables to join entity types for many-to-many relationships.

#### New behavior

Simple join tables containing only two foreign key <example-value> to other tables are no longer mapped to explicit entity types, but are instead mapped as a many-to-many relationship between the two joined tables.

#### Why

Many-to-many relationships without explicit join types were introduced in EF Core 5.0 and are a cleaner, more natural way to represent simple join tables.

#### Mitigations

There are two mitigations. The preferred approach is to update code to use the many-to-many relationships directly. It is very rare that the join entity type needs to be used directly when it contains only two foreign keys for the many-to-many relationships.

Alternately, the explicit join entity can be added back to the EF model. For example, assuming a many-to-many relationship between `Post` and `Tag`, add back the join type and navigations using partial classes:

```csharp
public partial class PostTag
{
    public int PostsId { get; set; }
    public int TagsId { get; set; }

    public virtual Post Posts { get; set; }
    public virtual Tag Tags { get; set; }
}

public partial class Post
{
    public virtual ICollection<PostTag> PostTags { get; set; }
}

public partial class Tag
{
    public virtual ICollection<PostTag> PostTags { get; set; }
}
```

Then add configuration for the join type and navigations to a partial class for the DbContext:

```csharp
public partial class DailyContext
{
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasMany(d => d.Tags)
                .WithMany(p => p.Posts)
                .UsingEntity<PostTag>(
                    l => l.HasOne<Tag>(e => e.Tags).WithMany(e => e.PostTags).HasForeignKey(e => e.TagsId),
                    r => r.HasOne<Post>(e => e.Posts).WithMany(e => e.PostTags).HasForeignKey(e => e.PostsId),
                    j =>
                    {
                        j.HasKey("PostsId", "TagsId");
                        j.ToTable("PostTag");
                    });
        });
    }
}
```

Finally, remove the generated configuration for the many-to-many relationship from the scaffolded context. This is needed because the scaffolded join entity type must be removed from the model before the explicit type can be used. This code will need to be removed each time the context is scaffolded, but because the code above is in partial classes it will persist.

Note that with this configuration, the join entity can be used explicitly, just like in previous versions of EF Core. However, the relationship can also be used as a many-to-many relationship. This means that updating the code like this can be a temporary solution while the rest of the code is updated to use the relationship as a many-to-many in the natural way.
