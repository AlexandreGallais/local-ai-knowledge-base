---
title: "Breaking changes in EF Core 5.0 - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-5.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 5.0 - EF Core (part 2 of 2)

## Low-impact changes

### Removed HasGeometricDimension method from SQLite NTS extension

Tracking Issue #14257

#### Old behavior

HasGeometricDimension was used to enable additional dimensions (Z and M) on geometry columns. However, it only ever affected database creation. It was unnecessary to specify it to query values with additional dimensions. It also didn't work correctly when inserting or updating values with additional dimensions (see #14257).

#### New behavior

To enable inserting and updating geometry values with additional dimensions (Z and M), the dimension needs to be specified as part of the column type name. This API matches more closely to the underlying behavior of SpatiaLite's AddGeometryColumn function.

#### Why

Using HasGeometricDimension after specifying the dimension in the column type is unnecessary and redundant, so we removed HasGeometricDimension entirely.

#### Mitigations

Use `HasColumnType` to specify the dimension:

```csharp
modelBuilder.Entity<GeoEntity>(
    x =>
    {
        // Allow any GEOMETRY value with optional Z and M values
        x.Property(e => e.Geometry).HasColumnType("GEOMETRYZM");

        // Allow only POINT values with an optional Z value
        x.Property(e => e.Point).HasColumnType("POINTZ");
    });
```

### Azure Cosmos DB: Partition key is now added to the primary key

Tracking Issue #15289

#### Old behavior

The partition key <example-value> was only added to the alternate key that includes `id`.

#### New behavior

The partition key <example-value> is now also added to the primary key by convention.

#### Why

This change makes the model better aligned with Azure Cosmos DB semantics and improves the performance of `Find` and some queries.

#### Mitigations

To prevent the partition key <example-value> to be added to the primary key, configure it in `OnModelCreating`.

```csharp
modelBuilder.Entity<Blog>()
    .HasKey(b => b.Id);
```

### Azure Cosmos DB: `id` property renamed to `__id`

Tracking Issue #17751

#### Old behavior

The shadow property mapped to the `id` JSON property was also named `id`.

#### New behavior

The shadow property created by convention is now named `__id`.

#### Why

This change makes it less likely that the `id` property clashes with an existing property on the entity type.

#### Mitigations

To go back to the 3.x behavior, configure the `id` property in `OnModelCreating`.

```csharp
modelBuilder.Entity<Blog>()
    .Property<string>("id")
    .ToJsonProperty("id");
```

### Azure Cosmos DB: byte[] is now stored as a base64 string instead of a number array

Tracking Issue #17306

#### Old behavior

Properties of type byte[] were stored as a number array.

#### New behavior

Properties of type byte[] are now stored as a base64 string.

#### Why

This representation of byte[] aligns better with expectations and is the default behavior of the major JSON serialization libraries.

#### Mitigations

Existing data stored as number arrays will still be queried correctly, but currently there isn't a supported way to change back the insert behavior. If this limitation is blocking your scenario, comment on this issue

### Azure Cosmos DB: GetPropertyName and SetPropertyName were renamed

Tracking Issue #17874

#### Old behavior

Previously the extension methods were called `GetPropertyName` and `SetPropertyName`

#### New behavior

The old API was removed and new methods added: `GetJsonPropertyName`, `SetJsonPropertyName`

#### Why

This change removes the ambiguity around what these methods are configuring.

#### Mitigations

Use the new API.

### Value generators are called when the entity state is changed from Detached to Unchanged, Updated, or Deleted

Tracking Issue #15289

#### Old behavior

Value generators were only called when the entity state changed to Added.

#### New behavior

Value generators are now called when the entity state is changed from Detached to Unchanged, Updated, or Deleted and the property contains the default values.

#### Why

This change was necessary to improve the experience with properties that are not persisted to the data store and have their value generated always on the client.

#### Mitigations

To prevent the value generator from being called, assign a non-default value to the property before the state is changed.

### IMigrationsModelDiffer now uses IRelationalModel

Tracking Issue #20305

#### Old behavior

`IMigrationsModelDiffer` API was defined using `IModel`.

#### New behavior

`IMigrationsModelDiffer` API now uses `IRelationalModel`. However the model snapshot still contains only `IModel` as this code is part of the application and Entity Framework can't change it without making a bigger breaking change.

#### Why

`IRelationalModel` is a newly added representation of the database schema. Using it to find differences is faster and more accurate.

#### Mitigations

Use the following code to compare the model from `snapshot` with the model from `context`:

```csharp
var dependencies = context.GetService<ProviderConventionSetBuilderDependencies>();
var relationalDependencies = context.GetService<RelationalConventionSetBuilderDependencies>();

var typeMappingConvention = new TypeMappingConvention(dependencies);
typeMappingConvention.ProcessModelFinalizing(((IConventionModel)modelSnapshot.Model).Builder, null);

var relationalModelConvention = new RelationalModelConvention(dependencies, relationalDependencies);
var sourceModel = relationalModelConvention.ProcessModelFinalized(snapshot.Model);

var modelDiffer = context.GetService<IMigrationsModelDiffer>();
var hasDifferences = modelDiffer.HasDifferences(
    ((IMutableModel)sourceModel).FinalizeModel().GetRelationalModel(),
    context.Model.GetRelationalModel());
```

We are planning to improve this experience in 6.0 (see #22031)

### Discriminators are read-only

Tracking Issue #21154

#### Old behavior

It was possible to change the discriminator value before calling `SaveChanges`

#### New behavior

An exception will be thrown in the above case.

#### Why

EF doesn't expect the entity type to change while it is still being tracked, so changing the discriminator value leaves the context in an inconsistent state, which might result in unexpected behavior.

#### Mitigations

If changing the discriminator value is necessary and the context will be disposed immediately after calling `SaveChanges`, the discriminator can be made mutable:

```csharp
modelBuilder.Entity<BaseEntity>()
    .Property<string>("Discriminator")
    .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);
```

### Provider-specific EF.Functions methods throw for in-memory provider

Tracking Issue #20294

#### Old behavior

Provider-specific EF.Functions methods contained implementation for client execution, which allowed them to be executed on the in-memory provider. For example, `EF.Functions.DateDiffDay` is a Sql Server specific method, which worked on InMemory provider.

#### New behavior

Provider-specific methods have been updated to throw an exception in their method body to block evaluating them on client side.

#### Why

Provider-specific methods map to a database function. The computation done by the mapped database function can't always be replicated on the client side in LINQ. It may cause the result from the server to differ when executing the same method on client. Since these methods are used in LINQ to translate to specific database functions, they don't need to be evaluated on client side. As the in-memory provider is a different _database_, these methods aren't available for this provider. Trying to execute them for InMemory provider, or any other provider that doesn't translate these methods, throws an exception.

#### Mitigations

Since there's no way to mimic behavior of database functions accurately, you should test the queries containing them against same kind of database as in production.

### IndexBuilder.HasName is now obsolete

Tracking Issue #21089

#### Old behavior

Previously, only one index could be defined over a given set of properties. The database name of an index was configured using IndexBuilder.HasName.

#### New behavior

Multiple indexes are now allowed on the same set or properties. These indexes are now distinguished by a name in the model. By convention, the model name is used as the database name; however it can also be configured independently using HasDatabaseName.

#### Why

In the future, we'd like to enable both ascending and descending indexes or indexes with different collations on the same set of properties. This change moves us another step in that direction.

#### Mitigations

Any code that was previously calling IndexBuilder.HasName should be updated to call HasDatabaseName instead.

If your project includes migrations generated prior to EF Core version 2.0.0, you can safely ignore the warning in those files and suppress it by adding `#pragma warning disable 612, 618`.

### A pluralizer is now included for scaffolding reverse engineered models

Tracking Issue #11160

#### Old behavior

Previously, you had to install a separate pluralizer package in order to pluralize DbSet and collection navigation names and singularize table names when scaffolding a DbContext and entity types by reverse engineering a database schema.

#### New behavior

EF Core now includes a pluralizer that uses the Humanizer library. This is the same library Visual Studio uses to recommend variable names.

#### Why

Using plural forms of words for collection properties and singular forms for types and reference properties is idiomatic in .NET.

#### Mitigations

To disable the pluralizer, use the `--no-pluralize` option on `dotnet ef dbcontext scaffold` or the `-NoPluralize` switch on `Scaffold-DbContext`.

### INavigationBase replaces INavigation in some APIs to support skip navigations

Tracking Issue #2568

#### Old behavior

EF Core prior to 5.0 supported only one form of navigation property, represented by the `INavigation` interface.

#### New behavior

EF Core 5.0 introduces many-to-many relationships which use "skip navigations". These are represented by the `ISkipNavigation` interface, and most of the functionality of `INavigation` has been pushed down to a common base interface: `INavigationBase`.

#### Why

Most of the functionality between normal and skip navigations is the same. However, skip navigations have a different relationship to foreign keys than normal navigations, since the FKs involved are not directly on either end of the relationship, but rather in the join entity.

#### Mitigations

In many cases applications can switch to using the new base interface with no other changes. However, in cases where the navigation is used to access foreign key <example-value>, application code should either be constrained to only normal navigations, or updated to do the appropriate thing for both normal and skip navigations.

### Some queries with correlated collection that also use `Distinct` or `GroupBy` are no longer supported

Tracking Issue #15873

**Old behavior**

Previously, queries involving correlated collections followed by `GroupBy`, as well as some queries using `Distinct` we allowed to execute.

GroupBy example:

```csharp
context.Parents
    .Select(p => p.Children
        .GroupBy(c => c.School)
        .Select(g => g.Key))
```

`Distinct` example - specifically `Distinct` queries where inner collection projection doesn't contain the primary key:

```csharp
context.Parents
    .Select(p => p.Children
        .Select(c => c.School)
        .Distinct())
```

These queries could return incorrect results if the inner collection contained any duplicates, but worked correctly if all the elements in the inner collection were unique.

**New behavior**

These queries are no longer supported. Exception is thrown indicating that we don't have enough information to correctly build the results.

**Why**

For correlated collection scenarios we need to know entity's primary key in order to assign collection entities to the correct parent. When inner collection doesn't use `GroupBy` or `Distinct`, the missing primary key can simply be added to the projection. However in case of `GroupBy` and `Distinct` it can't be done because it would change the result of `GroupBy` or `Distinct` operation.

**Mitigations**

Rewrite the query to not use `GroupBy` or `Distinct` operations on the inner collection, and perform these operations on the client instead.

```csharp
(await context.Parents
    .Select(p => p.Children.Select(c => c.School))
    .ToListAsync())
    .Select(x => x.GroupBy(c => c).Select(g => g.Key))
```

```csharp
(await context.Parents
    .Select(p => p.Children.Select(c => c.School))
    .ToListAsync())
    .Select(x => x.Distinct())
```

### Using a collection of Queryable type in projection is not supported

Tracking Issue #16314

**Old behavior**

Previously, it was possible to use collection of a Queryable type inside the projection in some cases, for example as an argument to a `List<T>` constructor:

```csharp
context.Blogs
    .Select(b => new List<Post>(context.Posts.Where(p => p.BlogId == b.Id)))
```

**New behavior**

These queries are no longer supported. Exception is thrown indicating that we can't create an object of Queryable type and suggesting how this could be fixed.

**Why**

We can't materialize an object of a Queryable type, so they would automatically be created using `List<T>` type instead. This would often cause an exception due to type mismatch which was not very clear and could be surprising to some users. We decided to recognize the pattern and throw a more meaningful exception.

**Mitigations**

Add `ToList()` call after the Queryable object in the projection:

```csharp
context.Blogs.Select(b => context.Posts.Where(p => p.BlogId == b.Id).ToList())
```
