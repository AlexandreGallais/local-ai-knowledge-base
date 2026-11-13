---
title: "Breaking changes in EF Core 6.0 - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 6.0 - EF Core (part 2 of 3)

## Low-impact changes

### Cleaned up mapping between DeleteBehavior and ON DELETE values

Tracking Issue #21252

#### Old behavior

Some of the mappings between a relationship's `OnDelete()` behavior and the foreign keys' `ON DELETE` behavior in the database were inconsistent in both Migrations and Scaffolding.

#### New behavior

The following table illustrates the changes for **Migrations**.

OnDelete()     | ON DELETE
-------------- | ---------
NoAction       | NO ACTION
ClientNoAction | NO ACTION
Restrict       | RESTRICT
Cascade        | CASCADE
ClientCascade  | ~~RESTRICT~~ **NO ACTION**
SetNull        | SET NULL
ClientSetNull  | ~~RESTRICT~~ **NO ACTION**

The changes for **Scaffolding** are as follows.

ON DELETE | OnDelete()
--------- | ----------
NO ACTION | ClientSetNull
RESTRICT  | ~~ClientSetNull~~ **Restrict**
CASCADE   | Cascade
SET NULL  | SetNull

#### Why

The new mappings are more consistent. The default database behavior of NO ACTION is now preferred over the more restrictive and less performant RESTRICT behavior.

#### Mitigations

The default OnDelete() behavior of optional relationships is ClientSetNull. Its mapping has changed from RESTRICT to NO ACTION. This may cause a lot of operations to be generated in your first migration added after upgrading to EF Core 6.0.

You can choose to either apply these operations or manually remove them from the migration since they have no functional impact on EF Core.

SQL Server doesn't support RESTRICT, so these foreign keys were already created using NO ACTION. The migration operations will have no affect on SQL Server and are safe to remove.

### In-memory database validates required properties do not contain nulls

Tracking Issue #10613

#### Old behavior

The in-memory database allowed saving null values even when the property was configured as required.

#### New behavior

The in-memory database throws a `Microsoft.EntityFrameworkCore.DbUpdateException` when `SaveChanges` or `SaveChangesAsync` is called and a required property is set to null.

#### Why

The in-memory database behavior now matches the behavior of other databases.

#### Mitigations

The previous behavior (i.e. not checking null values) can be restored when configuring the in-memory provider. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseInMemoryDatabase("MyDatabase", b => b.EnableNullChecks(false));
}
```

### Removed last ORDER BY when joining for collections

Tracking Issue #19828

#### Old behavior

When performing SQL JOINs on collections (one-to-many relationships), EF Core used to add an ORDER BY for each key <example-value> of the joined table. For example, loading all Blogs with their related Posts was done via the following SQL:

```sql
SELECT [b].[BlogId], [b].[Name], [p].[PostId], [p].[BlogId], [p].[Title]
FROM [Blogs] AS [b]
LEFT JOIN [Post] AS [p] ON [b].[BlogId] = [p].[BlogId]
ORDER BY [b].[BlogId], [p].[PostId]
```

These orderings are necessary for proper materialization of the entities.

#### New behavior

The very last ORDER BY for a collection join is now omitted:

```sql
SELECT [b].[BlogId], [b].[Name], [p].[PostId], [p].[BlogId], [p].[Title]
FROM [Blogs] AS [b]
LEFT JOIN [Post] AS [p] ON [b].[BlogId] = [p].[BlogId]
ORDER BY [b].[BlogId]
```

An ORDER BY for the Post's ID column is no longer generated.

#### Why

Every ORDER BY imposes additional work at the database side, and the last ordering isn't necessary for EF Core's materialization needs. Data shows that removing this last ordering can produce a significant performance improvement in some scenarios.

#### Mitigations

If your application expects joined entities to be returned in a particular order, make that explicit by adding a LINQ `OrderBy` operator to your query.

### DbSet no longer implements IAsyncEnumerable

Tracking Issue #24041

#### Old behavior

`Microsoft.EntityFrameworkCore.DbSet`1`, which is used to execute queries on DbContext, used to implement `System.Collections.Generic.IAsyncEnumerable`1`.

#### New behavior

`Microsoft.EntityFrameworkCore.DbSet`1` no longer directly implements `System.Collections.Generic.IAsyncEnumerable`1`.

#### Why

`Microsoft.EntityFrameworkCore.DbSet`1` was originally made to implement `System.Collections.Generic.IAsyncEnumerable`1` mainly in order to allow direct enumeration on it via the `foreach` construct. Unfortunately, when a project also references System.Linq.Async in order to compose async LINQ operators client-side, this resulted in an ambiguous invocation error between the operators defined over `IQueryable<T>` and those defined over `IAsyncEnumerable<T>`. C# 9 added extension `GetEnumerator` support for `foreach` loops, removing the original main reason to reference `IAsyncEnumerable`.

The vast majority of `DbSet` usages will continue to work as-is, since they compose LINQ operators over `DbSet`, enumerate it, etc. The only usages broken are those which attempt to cast `DbSet` directly to `IAsyncEnumerable`.

#### Mitigations

If you need to refer to a `Microsoft.EntityFrameworkCore.DbSet`1` as an `System.Collections.Generic.IAsyncEnumerable`1`, call `Microsoft.EntityFrameworkCore.DbSet`1.AsAsyncEnumerable*` to explicitly cast it.

### TVF return entity type is also mapped to a table by default

Tracking Issue #23408

#### Old behavior

An entity type was not mapped to a table by default when used as a return type of a TVF configured with `Microsoft.EntityFrameworkCore.RelationalModelBuilderExtensions.HasDbFunction*`.

#### New behavior

An entity type used as a return type of a TVF retains the default table mapping.

#### Why

It isn't intuitive that configuring a TVF removes the default table mapping for the return entity type.

#### Mitigations

To remove the default table mapping, call `Microsoft.EntityFrameworkCore.RelationalEntityTypeBuilderExtensions.ToTable(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder,System.String)`:

```csharp
modelBuilder.Entity<MyEntity>().ToTable((string?)null));
```

### Check constraint name uniqueness is now validated

Tracking Issue #25061

#### Old behavior

Check constraints with the same name were allowed to be declared and used on the same table.

#### New behavior

Explicitly configuring two check constraints with the same name on the same table will now result in an exception. Check constraints created by a convention will be assigned a unique name.

#### Why

Most databases don't allow two check constraints with the same name to be created on the same table, and some require them to be unique even across tables. This would result in exception being thrown when applying a migration.

#### Mitigations

In some cases, valid check constraint names might be different due to this change. To specify the desired name explicitly, call `Microsoft.EntityFrameworkCore.Metadata.Builders.CheckConstraintBuilder.HasName*`:

```csharp
modelBuilder.Entity<MyEntity>().HasCheckConstraint("CK_Id", "Id > 0", c => c.HasName("CK_MyEntity_Id"));
```

### Added IReadOnly Metadata interfaces and removed extension methods

Tracking Issue #19213

#### Old behavior

There were three sets of metadata interfaces: `Microsoft.EntityFrameworkCore.Metadata.IModel`, `Microsoft.EntityFrameworkCore.Metadata.IMutableModel` and `Microsoft.EntityFrameworkCore.Metadata.IConventionModel` as well as extension methods.

#### New behavior

A new set of `IReadOnly` interfaces has been added, e.g. `Microsoft.EntityFrameworkCore.Metadata.IReadOnlyModel`. Extension methods that were previously defined for the metadata interfaces have been converted to default interface methods.

#### Why

Default interface methods allow the implementation to be overridden, this is leveraged by the new run-time model implementation to offer better performance.

#### Mitigations

These changes shouldn't affect most code. However, if you were using the extension methods via the static invocation syntax, it would need to be converted to instance invocation syntax.

### IExecutionStrategy is now a singleton service

Tracking Issue #21350

#### New behavior

`Microsoft.EntityFrameworkCore.Storage.IExecutionStrategy` is now a singleton service. This means that any added state in custom implementations will remain between executions and the delegate passed to `Microsoft.EntityFrameworkCore.Infrastructure.RelationalDbContextOptionsBuilder`2.ExecutionStrategy*` will only be executed once.

#### Why

This reduced allocations on two hot paths in EF.

#### Mitigations

Implementations deriving from `Microsoft.EntityFrameworkCore.Storage.ExecutionStrategy` should clear any state in `Microsoft.EntityFrameworkCore.Storage.ExecutionStrategy.OnFirstExecution`.

Conditional logic in the delegate passed to `Microsoft.EntityFrameworkCore.Infrastructure.RelationalDbContextOptionsBuilder`2.ExecutionStrategy*` should be moved to a custom implementation of `Microsoft.EntityFrameworkCore.Storage.IExecutionStrategy`.

### SQL Server: More errors are considered transient

Tracking Issue #25050

#### New behavior

The errors listed in the issue above are now considered transient. When using the default (non-retrying) execution strategy, these errors will now be wrapped in an addition exception instance.

#### Why

We continue to gather feedback from both users and SQL Server team on which errors should be considered transient.

#### Mitigations

To change the set of errors that are considered transient, use a custom execution strategy that could be derived from `Microsoft.EntityFrameworkCore.SqlServerRetryingExecutionStrategy` - `core/miscellaneous/connection-resiliency`.

### Azure Cosmos DB: More characters are escaped in 'id' values

Tracking Issue #25100

#### Old behavior

In EF Core 5, only `'|'` was escaped in `id` values.

#### New behavior

In EF Core 6, `'/'`, `'\'`, `'?'` and `'#'` are also escaped in `id` values.

#### Why

These characters are invalid, as documented in Resource.Id. Using them in `id` will cause queries to fail.

#### Mitigations

You can override the generated value by setting it before the entity is marked as `Added`:

```csharp
var entry = context.Attach(entity);
entry.Property("__id").CurrentValue = "MyEntity|/\\?#";
entry.State = EntityState.Added;
```

### Some Singleton services are now Scoped

Tracking Issue #25084

#### New behavior

Many query services and some design-time services that were registered as `Singleton` are now registered as `Scoped`.

#### Why

The lifetime had to be changed to allow a new feature - `Microsoft.EntityFrameworkCore.ModelConfigurationBuilder.DefaultTypeMapping*` - to affect queries.

The design-time services lifetimes have been adjusted to match the run-time services lifetimes to avoid errors when using both.

#### Mitigations

Use `Microsoft.EntityFrameworkCore.Infrastructure.EntityFrameworkServicesBuilder.TryAdd*` to register EF Core services using the default lifetime. Only use `Microsoft.EntityFrameworkCore.Infrastructure.EntityFrameworkServicesBuilder.TryAddProviderSpecificServices*` for services that are not added by EF.

### New caching API for extensions that add or replace services

Tracking Issue #19152

#### Old behavior

In EF Core 5, `Microsoft.EntityFrameworkCore.Infrastructure.DbContextOptionsExtensionInfo.GetServiceProviderHashCode*` returned `long` and was used directly as part of the cache key for the service provider.

#### New behavior

`Microsoft.EntityFrameworkCore.Infrastructure.DbContextOptionsExtensionInfo.GetServiceProviderHashCode*` now returns `int` and is only used to calculate the hash code of the cache key for the service provider.

Also, `Microsoft.EntityFrameworkCore.Infrastructure.DbContextOptionsExtensionInfo.ShouldUseSameServiceProvider*` needs to be implemented to indicate whether the current object represents the same service configuration and thus can use the same service provider.

#### Why

Just using a hash code as part of the cache key <example-value> in occasional collisions that were hard to diagnose and fix. The additional method ensures that the same service provider is used only when appropriate.

#### Mitigations

Many extensions don't expose any options that affect registered services and can use the following implementation of `Microsoft.EntityFrameworkCore.Infrastructure.DbContextOptionsExtensionInfo.ShouldUseSameServiceProvider*`:

```csharp
private sealed class ExtensionInfo : DbContextOptionsExtensionInfo
{
    public ExtensionInfo(IDbContextOptionsExtension extension)
        : base(extension)
    {
    }

    ...

    public override bool ShouldUseSameServiceProvider(DbContextOptionsExtensionInfo other)
        => other is ExtensionInfo;
}
```

Otherwise, additional predicates should be added to compare all relevant options.
