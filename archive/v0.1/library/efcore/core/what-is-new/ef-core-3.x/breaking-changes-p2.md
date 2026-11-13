---
title: "Breaking changes in EF Core 3.x - EF Core (part 2 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-3.x/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 3.x - EF Core (part 2 of 5)

## Low-impact changes

### FromSql, ExecuteSql, and ExecuteSqlAsync have been renamed

Tracking Issue #10996

> **Important:**
> `ExecuteSqlCommand` and `ExecuteSqlCommandAsync` are deprecated. Use these methods instead.

#### Old behavior

Before EF Core 3.0, these method names were overloaded to work with either a normal string or a string that should be interpolated into SQL and parameters.

#### New behavior

Starting with EF Core 3.0, use `FromSqlRaw`, `ExecuteSqlRaw`, and `ExecuteSqlRawAsync` to create a parameterized query where the parameters are passed separately from the query string.
For example:

```csharp
context.Products.FromSqlRaw(
    "SELECT * FROM Products WHERE Name = {0}",
    product.Name);
```

Use `FromSqlInterpolated`, `ExecuteSqlInterpolated`, and `ExecuteSqlInterpolatedAsync` to create a parameterized query where the parameters are passed as part of an interpolated query string.
For example:

```csharp
context.Products.FromSqlInterpolated(
    $"SELECT * FROM Products WHERE Name = {product.Name}");
```

Note that both of the queries above will produce the same parameterized SQL with the same SQL parameters.

#### Why

Method overloads like this make it very easy to accidentally call the raw string method when the intent was to call the interpolated string method, and the other way around.
This could result in queries not being parameterized when they should have been.

#### Mitigations

Switch to use the new method names.

### FromSql method when used with stored procedure cannot be composed

Tracking Issue #15392

#### Old behavior

Before EF Core 3.0, FromSql method tried to detect if the passed SQL can be composed upon. It did client evaluation when the SQL was non-composable like a stored procedure. The following query worked by running the stored procedure on the server and doing FirstOrDefault on the client side.

```csharp
context.Products.FromSqlRaw("[dbo].[Ten Most Expensive Products]").FirstOrDefault();
```

#### New behavior

Starting with EF Core 3.0, EF Core will not try to parse the SQL. So if you are composing after FromSqlRaw/FromSqlInterpolated, then EF Core will compose the SQL by causing sub query. So if you are using a stored procedure with composition then you will get an exception for invalid SQL syntax.

#### Why

EF Core 3.0 does not support automatic client evaluation, since it was error prone as explained here.

#### Mitigations

If you are using a stored procedure in FromSqlRaw/FromSqlInterpolated, you know that it cannot be composed upon, so you can add `AsEnumerable`/`AsAsyncEnumerable` right after the FromSql method call to avoid any composition on server side.

```csharp
context.Products.FromSqlRaw("[dbo].[Ten Most Expensive Products]").AsEnumerable().FirstOrDefault();
```

### FromSql methods can only be specified on query roots

Tracking Issue #15704

#### Old behavior

Before EF Core 3.0, the `FromSql` method could be specified anywhere in the query.

#### New behavior

Starting with EF Core 3.0, the new `FromSqlRaw` and `FromSqlInterpolated` methods (which replace `FromSql`) can only be specified on query roots, i.e. directly on the `DbSet<>`. Attempting to specify them anywhere else will result in a compilation error.

#### Why

Specifying `FromSql` anywhere other than on a `DbSet` had no added meaning or added value, and could cause ambiguity in certain scenarios.

#### Mitigations

`FromSql` invocations should be moved to be directly on the `DbSet` to which they apply.

### No-tracking queries no longer perform identity resolution

Tracking Issue #13518

#### Old behavior

Before EF Core 3.0, the same entity instance would be used for every occurrence of an entity with a given type and ID. This matches the behavior of tracking queries. For example, this query:

```csharp
var results = await context.Products.Include(e => e.Category).AsNoTracking().ToListAsync();
```

would return the same `Category` instance for each `Product` that is associated with the given category.

#### New behavior

Starting with EF Core 3.0, different entity instances will be created when an entity with a given type and ID is encountered at different places in the returned graph. For example, the query above will now return a new `Category` instance for each `Product` even when two products are associated with the same category.

#### Why

Identity resolution (that is, determining that an entity has the same type and ID as a previously encountered entity) adds additional performance and memory overhead. This usually runs counter to why no-tracking queries are used in the first place. Also, while identity resolution can sometimes be useful, it is not needed if the entities are to be serialized and sent to a client, which is common for no-tracking queries.

#### Mitigations

Use a tracking query if identity resolution is required.

### Temporary key <example-value> are no longer set onto entity instances

Tracking Issue #12378

#### Old behavior

Before EF Core 3.0, temporary values were assigned to all key <example-value> that would later have a real value generated by the database.
Usually these temporary values were large negative numbers.

#### New behavior

Starting with 3.0, EF Core stores the temporary key value as part of the entity's tracking information, and leaves the key <example-value> itself unchanged.

#### Why

This change was made to prevent temporary key <example-value> from erroneously becoming permanent when an entity that has been previously tracked by some `DbContext` instance is moved to a different `DbContext` instance.

#### Mitigations

Applications that assign primary key <example-value> onto foreign keys to form associations between entities may depend on the old behavior if the primary keys are store-generated and belong to entities in the `Added` state.
This can be avoided by:

* Not using store-generated keys.
* Setting navigation properties to form relationships instead of setting foreign key values.
* Obtain the actual temporary key <example-value> from the entity's tracking information.
For example, `context.Entry(blog).Property(e => e.Id).CurrentValue` will return the temporary value even though `blog.Id` itself hasn't been set.

### DetectChanges honors store-generated key <example-value>

Tracking Issue #14616

#### Old behavior

Before EF Core 3.0, an untracked entity found by `DetectChanges` would be tracked in the `Added` state and inserted as a new row when `SaveChanges` is called.

#### New behavior

Starting with EF Core 3.0, if an entity is using generated key <example-value> and some key value is set, then the entity will be tracked in the `Modified` state.
This means that a row for the entity is assumed to exist and it will be updated when `SaveChanges` is called.
If the key value isn't set, or if the entity type isn't using generated keys, then the new entity will still be tracked as `Added` as in previous versions.

#### Why

This change was made to make it easier and more consistent to work with disconnected entity graphs while using store-generated keys.

#### Mitigations

This change can break an application if an entity type is configured to use generated keys but key <example-value> are explicitly set for new instances.
The fix is to explicitly configure the key <example-value> to not use generated values.
For example, with the fluent API:

```csharp
modelBuilder
    .Entity<Blog>()
    .Property(e => e.Id)
    .ValueGeneratedNever();
```

Or with data annotations:

```csharp
[DatabaseGenerated(DatabaseGeneratedOption.None)]
public string Id { get; set; }
```

### Cascade deletions now happen immediately by default

Tracking Issue #10114

#### Old behavior

Before 3.0, EF Core applied cascading actions (deleting dependent entities when a required principal is deleted or when the relationship to a required principal is severed) did not happen until SaveChanges was called.

#### New behavior

Starting with 3.0, EF Core applies cascading actions as soon as the triggering condition is detected.
For example, calling `context.Remove()` to delete a principal entity will result in all tracked related required dependents also being set to `Deleted` immediately.

#### Why

This change was made to improve the experience for data binding and auditing scenarios where it is important to understand which entities will be deleted _before_ `SaveChanges` is called.

#### Mitigations

The previous behavior can be restored through settings on `context.ChangeTracker`.
For example:

```csharp
context.ChangeTracker.CascadeDeleteTiming = CascadeTiming.OnSaveChanges;
context.ChangeTracker.DeleteOrphansTiming = CascadeTiming.OnSaveChanges;
```

### Eager loading of related entities now happens in a single query

Tracking issue #18022

#### Old behavior

Before 3.0, eagerly loading collection navigations via `Include` operators caused multiple queries to be generated on relational database, one for each related entity type.

#### New behavior

Starting with 3.0, EF Core generates a single query with JOINs on relational databases.

#### Why

Issuing multiple queries to implement a single LINQ query caused numerous issues, including negative performance as multiple database roundtrips were necessary, and data coherency issues as each query could observe a different state of the database.

#### Mitigations

While technically this is not a breaking change, it could have a considerable effect on application performance when a single query contains a large number of `Include` operator on collection navigations. See this comment for more information and for rewriting queries in a more efficient way.

**

### DeleteBehavior.Restrict has cleaner semantics

Tracking Issue #12661

#### Old behavior

Before 3.0, `DeleteBehavior.Restrict` created foreign keys in the database with `Restrict` semantics, but also changed internal fixup in a non-obvious way.

#### New behavior

Starting with 3.0, `DeleteBehavior.Restrict` ensures that foreign keys are created with `Restrict` semantics--that is, no cascades; throw on constraint violation--without also impacting EF internal fixup.

#### Why

This change was made to improve the experience for using `DeleteBehavior` in an intuitive manner, without unexpected side-effects.

#### Mitigations

The previous behavior can be restored by using `DeleteBehavior.ClientNoAction`.

### Query types are consolidated with entity types

Tracking Issue #14194

#### Old behavior

Before EF Core 3.0, query types were a means to query data that doesn't define a primary key in a structured way.
That is, a query type was used for mapping entity types without keys (more likely from a view, but possibly from a table) while a regular entity type was used when a key was available (more likely from a table, but possibly from a view).

#### New behavior

A query type now becomes just an entity type without a primary key.
Keyless entity types have the same functionality as query types in previous versions.

#### Why

This change was made to reduce the confusion around the purpose of query types.
Specifically, they are keyless entity types and they are inherently read-only because of this, but they should not be used just because an entity type needs to be read-only.
Likewise, they are often mapped to views, but this is only because views often don't define keys.

#### Mitigations

The following parts of the API are now obsolete:

* **`ModelBuilder.Query<>()`** - Instead `ModelBuilder.Entity<>().HasNoKey()` needs to be called to mark an entity type as having no keys.
This would still not be configured by convention to avoid misconfiguration when a primary key is expected, but doesn't match the convention.
* **`DbQuery<>`** - Instead `DbSet<>` should be used.
* **`DbContext.Query<>()`** - Instead `DbContext.Set<>()` should be used.
* **`IQueryTypeConfiguration<TQuery>`** - Instead `IEntityTypeConfiguration<TEntity>` should be used.

> **Note:**
> Due to an issue in 3.x when querying keyless entities that have all properties set to `null` a `null` will be returned instead of an entity, if this issue is applicable to your scenario also add logic to handle `null` in results.

### Configuration API for owned type relationships has changed

Tracking Issue #12444
Tracking Issue #9148
Tracking Issue #14153

#### Old behavior

Before EF Core 3.0, configuration of the owned relationship was performed directly after the `OwnsOne` or `OwnsMany` call.

#### New behavior

Starting with EF Core 3.0, there is now fluent API to configure a navigation property to the owner using `WithOwner()`.
For example:

```csharp
modelBuilder.Entity<Order>.OwnsOne(e => e.Details).WithOwner(e => e.Order);
```

The configuration related to the relationship between owner and owned should now be chained after `WithOwner()` similarly to how other relationships are configured.
While the configuration for the owned type itself would still be chained after `OwnsOne()/OwnsMany()`.
For example:

```csharp
modelBuilder.Entity<Order>.OwnsOne(e => e.Details, eb =>
    {
        eb.WithOwner()
            .HasForeignKey(e => e.AlternateId)
            .HasConstraintName("FK_OrderDetails");

        eb.ToTable("OrderDetails");
        eb.HasKey(e => e.AlternateId);
        eb.HasIndex(e => e.Id);

        eb.HasOne(e => e.Customer).WithOne();

        eb.HasData(
            new OrderDetails
            {
                AlternateId = 1,
                Id = -1
            });
    });
```

Additionally calling `Entity()`, `HasOne()`, or `Set()` with an owned type target will now throw an exception.

#### Why

This change was made to create a cleaner separation between configuring the owned type itself and the _relationship to_ the owned type.
This in turn removes ambiguity and confusion around methods like `HasForeignKey`.

#### Mitigations

Change configuration of owned type relationships to use the new API surface as shown in the example above.
