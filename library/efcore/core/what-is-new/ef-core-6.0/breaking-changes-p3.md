---
title: "Breaking changes in EF Core 6.0 - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 6.0 - EF Core (part 3 of 3)

### New snapshot and design-time model initialization procedure

Tracking Issue #22031

#### Old behavior

In EF Core 5, specific conventions needed to be invoked before the snapshot model was ready to be used.

#### New behavior

`Microsoft.EntityFrameworkCore.Infrastructure.IModelRuntimeInitializer` was introduced to hide some of the required steps, and a run-time model was introduced that doesn't have all the migrations metadata, so the design-time model should be used for model diffing.

#### Why

`Microsoft.EntityFrameworkCore.Infrastructure.IModelRuntimeInitializer` abstracts away the model finalization steps, so these can now be changed without further breaking changes for the users.

The optimized run-time model was introduced to improve run-time performance. It has several optimizations, one of which is removing metadata that is not used at run-time.

#### Mitigations

The following snippet illustrates how to check whether the current model is different from the snapshot model:

```csharp
var snapshotModel = migrationsAssembly.ModelSnapshot?.Model;

if (snapshotModel is IMutableModel mutableModel)
{
    snapshotModel = mutableModel.FinalizeModel();
}

if (snapshotModel != null)
{
    snapshotModel = context.GetService<IModelRuntimeInitializer>().Initialize(snapshotModel);
}

var hasDifferences = context.GetService<IMigrationsModelDiffer>().HasDifferences(
    snapshotModel?.GetRelationalModel(),
    context.GetService<IDesignTimeModel>().Model.GetRelationalModel());
```

This snippet shows how to implement `Microsoft.EntityFrameworkCore.Design.IDesignTimeDbContextFactory`1` by creating a model externally and calling `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseModel*`:

```csharp
internal class MyDesignContext : IDesignTimeDbContextFactory<MyContext>
{
    public TestContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder();
        optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DB"));

        var modelBuilder = SqlServerConventionSetBuilder.CreateModelBuilder();
        CustomizeModel(modelBuilder);
        var model = modelBuilder.Model.FinalizeModel();

        var serviceContext = new MyContext(optionsBuilder.Options);
        model = serviceContext.GetService<IModelRuntimeInitializer>().Initialize(model);
        return new MyContext(optionsBuilder.Options);
    }
}
```

### `OwnedNavigationBuilder.HasIndex` returns a different type now

Tracking Issue #24005

#### Old behavior

In EF Core 5, `Microsoft.EntityFrameworkCore.Metadata.Builders.OwnedNavigationBuilder.HasIndex*` returned `IndexBuilder<TEntity>` where `TEntity` is the owner type.

#### New behavior

`Microsoft.EntityFrameworkCore.Metadata.Builders.OwnedNavigationBuilder.HasIndex*` now returns `IndexBuilder<TDependentEntity>`, where `TDependentEntity` is the owned type.

#### Why

The returned builder object wasn't typed correctly.

#### Mitigations

Recompiling your assembly against the latest version of EF Core will be enough to fix any issues caused by this change.

### `DbFunctionBuilder.HasSchema(null)` overrides `[DbFunction(Schema = "schema")]`

Tracking Issue #24228

#### Old behavior

In EF Core 5, calling `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionBuilder.HasSchema*` with `null` value didn't store the configuration source, thus `Microsoft.EntityFrameworkCore.DbFunctionAttribute` was able to override it.

#### New behavior

Calling `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionBuilder.HasSchema*` with `null` value now stores the configuration source and prevents the attribute from overriding it.

#### Why

Configuration specified with the `Microsoft.EntityFrameworkCore.ModelBuilder` API should not be overridable by data annotations.

#### Mitigations

Remove the `HasSchema` call to let the attribute configure the schema.

### Pre-initialized navigations are overridden by values from database queries

Tracking Issue #23851

#### Old behavior

Navigation properties set to an empty object were left unchanged for tracking queries, but were overwritten for non-tracking queries. For example, consider the following entity types:

```csharp
public class Foo
{
    public int Id { get; set; }

    public Bar Bar { get; set; } = new(); // Don't do this.
}

public class Bar
{
    public int Id { get; set; }
}
```

A no-tracking query for `Foo` including `Bar` set `Foo.Bar` to the entity queried from the database. For example, this code:

```csharp
var foo = await context.Foos.AsNoTracking().Include(e => e.Bar).SingleAsync();
Console.WriteLine($"Foo.Bar.Id = {foo.Bar.Id}");
```

Printed `Foo.Bar.Id = 1`.

However, the same query run for tracking didn't overwrite `Foo.Bar` with the entity queried from the database. For example, this code:

```csharp
var foo = await context.Foos.Include(e => e.Bar).SingleAsync();
Console.WriteLine($"Foo.Bar.Id = {foo.Bar.Id}");
```

Printed `Foo.Bar.Id = 0`.

#### New behavior

In EF Core 6.0, the behavior of tracking queries now matches that of no-tracking queries. This means that both this code:

```csharp
var foo = await context.Foos.AsNoTracking().Include(e => e.Bar).SingleAsync();
Console.WriteLine($"Foo.Bar.Id = {foo.Bar.Id}");
```

And this code:

```csharp
var foo = await context.Foos.Include(e => e.Bar).SingleAsync();
Console.WriteLine($"Foo.Bar.Id = {foo.Bar.Id}");
```

Print `Foo.Bar.Id = 1`.

#### Why

There are two reasons for making this change:

1. To ensure that tracking and no-tracking queries have consistent behavior.
2. When a database is queried it is reasonable to assume that the application code wants to get back the values that are stored in the database.

#### Mitigations

There are two mitigations:

1. Do not query for objects from the database that should not be included in the results. For example, in the code snippets above, do not `Include` `Foo.Bar` if the `Bar` instance should not be returned from the database and included in the results.
2. Set the value of the navigation after querying from the database. For example, in the code snippets above, call `foo.Bar = new()` after running the query.

Also, consider not initializing related entity instances to default objects. This implies that the related instance is a new entity, not saved to the database, with no key value set. If instead the related entity does exist in the database, then the data in code is fundamentally at odds with the data stored in the database.

### Unknown enum string values in the database are not converted to the enum default when queried

Tracking Issue #24084

#### Old behavior

Enum properties can be mapped to string columns in the database using `HasConversion<string>()` or `EnumToStringConverter`. This results in EF Core converting string values in the column to matching members of the .NET enum type. However, if the string value did not match and enum member, then the property was set to the default value for the enum.

#### New behavior

EF Core 6.0 now throws an `InvalidOperationException` with the message "Cannot convert string value '`{value}`' from the database to any value in the mapped '`{enumType}`' enum."

#### Why

Converting to the default value can result in database corruption if the entity is later saved back to the database.

#### Mitigations

Ideally, ensure that the database column only contains valid values. Alternately, implement a `ValueConverter` with the old behavior.

### DbFunctionBuilder.HasTranslation now provides the function arguments as IReadOnlyList rather than IReadOnlyCollection

Tracking Issue #23565

#### Old behavior

When configuring translation for a user-defined function using `HasTranslation` method, the arguments to the function were provided as `IReadOnlyCollection<SqlExpression>`.

#### New behavior

In EF Core 6.0, the arguments are now provided as `IReadOnlyList<SqlExpression>`.

#### Why

`IReadOnlyList` allows to use indexers, so the arguments are now easier to access.

#### Mitigations

None. `IReadOnlyList` implements `IReadOnlyCollection` interface, so the transition should be straightforward.

### Default table mapping is not removed when the entity is mapped to a table-valued function

Tracking Issue #23408

#### Old behavior

When an entity was mapped to a table-valued function, its default mapping to a table was removed.

#### New behavior

In EF Core 6.0, the entity is still mapped to a table using default mapping, even if it's also mapped to table-valued function.

#### Why

Table-valued functions which return entities are often used either as a helper or to encapsulate an operation returning a collection of entities, rather than as a strict replacement of the entire table. This change aims to be more in line with the likely user intention.

#### Mitigations

Mapping to a table can be explicitly disabled in the model configuration:

```csharp
modelBuilder.Entity<MyEntity>().ToTable((string)null);
```

### dotnet-ef targets .NET 6

Tracking Issue #27787

#### Old behavior

The dotnet-ef command has targeted .NET Core 3.1 for a while now. This allowed you to use newer version of the tool without installing newer versions of the .NET runtime.

#### New behavior

In EF Core 6.0.6, the dotnet-ef tool now targets .NET 6. You can still use the tool on projects targeting older versions of .NET and .NET Core, but you'll need to install the .NET 6 runtime in order to run the tool.

#### Why

The .NET 6.0.200 SDK updated the behavior of `dotnet tool install` on osx-arm64 to create an osx-x64 shim for tools targeting .NET Core 3.1. In order to maintain a working default experience for dotnet-ef, we had to update it to target .NET 6.

#### Mitigations

To run dotnet-ef without installing the .NET 6 runtime, you can install an older version of the tool:

```dotnetcli
dotnet tool install dotnet-ef --version 3.1.*
```

### `IModelCacheKeyFactory` implementations may need to be updated to handle design-time caching

Tracking Issue #25154

#### Old behavior

`IModelCacheKeyFactory` did not have an option to cache the design-time model separately from the runtime model.

#### New behavior

`IModelCacheKeyFactory` has a new overload that allows the design-time model to be cached separately from the runtime model. Not implementing this method may result in an exception similar to:

> System.InvalidOperationException: 'The requested configuration is not stored in the read-optimized model, please use 'DbContext.GetService<IDesignTimeModel>().Model'.'

#### Why

Implementation of compiled models required separation of the design-time (used when building the model) and runtime (used when executing queries, etc.) models. If the runtime code needs access to design-time information, then the design-time model must be cached.

#### Mitigations

Implement the new overload. For example:

```csharp
public object Create(DbContext context, bool designTime)
    => context is DynamicContext dynamicContext
        ? (context.GetType(), dynamicContext.UseIntProperty, designTime)
        : (object)context.GetType();
```

The navigation '{navigation}' was ignored from 'Include' in the query since the fix-up will automatically populate it. If any further navigations are specified in 'Include' afterwards then they will be ignored. Walking back in the include tree is not allowed.

### `NavigationBaseIncludeIgnored` is now an error by default

Tracking Issue #4315

#### Old behavior

The event `CoreEventId.NavigationBaseIncludeIgnored` was logged as a warning by default.

#### New behavior

The event `CoreEventId.NavigationBaseIncludeIgnored` was logged as an error by default and causes an exception to be thrown.

#### Why

These query patterns are not allowed, so EF Core now throws to indicate that the queries should be updated.

#### Mitigations

The old behavior can be restored by configuring the event as a warning. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.ConfigureWarnings(b => b.Warn(CoreEventId.NavigationBaseIncludeIgnored));
```
