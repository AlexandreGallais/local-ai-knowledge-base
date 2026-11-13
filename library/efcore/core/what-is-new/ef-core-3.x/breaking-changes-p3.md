---
title: "Breaking changes in EF Core 3.x - EF Core (part 3 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-3.x/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 3.x - EF Core (part 3 of 5)

### Dependent entities sharing the table with the principal are now optional

Tracking Issue #9005

#### Old behavior

Consider the following model:

```csharp
public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public OrderDetails Details { get; set; }
}

public class OrderDetails
{
    public int Id { get; set; }
    public string ShippingAddress { get; set; }
}
```

Before EF Core 3.0, if `OrderDetails` is owned by `Order` or explicitly mapped to the same table then an `OrderDetails` instance was always required when adding a new `Order`.

#### New behavior

Starting with 3.0, EF Core allows to add an `Order` without an `OrderDetails` and maps all of the `OrderDetails` properties except the primary key to nullable columns.
When querying EF Core sets `OrderDetails` to `null` if any of its required properties doesn't have a value or if it has no required properties besides the primary key and all properties are `null`.

#### Mitigations

If your model has a table sharing dependent with all optional columns, but the navigation pointing to it is not expected to be `null` then the application should be modified to handle cases when the navigation is `null`. If this is not possible a required property should be added to the entity type or at least one property should have a non-`null` value assigned to it.

### All entities sharing a table with a concurrency token column have to map it to a property

Tracking Issue #14154

#### Old behavior

Consider the following model:

```csharp
public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public byte[] Version { get; set; }
    public OrderDetails Details { get; set; }
}

public class OrderDetails
{
    public int Id { get; set; }
    public string ShippingAddress { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Order>()
        .Property(o => o.Version).IsRowVersion().HasColumnName("Version");
}
```

Before EF Core 3.0, if `OrderDetails` is owned by `Order` or explicitly mapped to the same table then updating just `OrderDetails` will not update `Version` value on client and the next update will fail.

#### New behavior

Starting with 3.0, EF Core propagates the new `Version` value to `Order` if it owns `OrderDetails`. Otherwise an exception is thrown during model validation.

#### Why

This change was made to avoid a stale concurrency token value when only one of the entities mapped to the same table is updated.

#### Mitigations

All entities sharing the table have to include a property that is mapped to the concurrency token column. It's possible the create one in shadow-state:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<OrderDetails>()
        .Property<byte[]>("Version").IsRowVersion().HasColumnName("Version");
}
```

### Owned entities cannot be queried without the owner using a tracking query

Tracking Issue #18876

#### Old behavior

Before EF Core 3.0, the owned entities could be queried as any other navigation.

```csharp
context.People.Select(p => p.Address);
```

#### New behavior

Starting with 3.0, EF Core will throw if a tracking query projects an owned entity without the owner.

#### Why

Owned entities cannot be manipulated without the owner, so in the vast majority of cases querying them in this way is an error.

#### Mitigations

If the owned entity should be tracked to be modified in any way later then the owner should be included in the query.

Otherwise add an `AsNoTracking()` call:

```csharp
context.People.Select(p => p.Address).AsNoTracking();
```

### Inherited properties from unmapped types are now mapped to a single column for all derived types

Tracking Issue #13998

#### Old behavior

Consider the following model:

```csharp
public abstract class EntityBase
{
    public int Id { get; set; }
}

public abstract class OrderBase : EntityBase
{
    public int ShippingAddress { get; set; }
}

public class BulkOrder : OrderBase
{
}

public class Order : OrderBase
{
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Ignore<OrderBase>();
    modelBuilder.Entity<EntityBase>();
    modelBuilder.Entity<BulkOrder>();
    modelBuilder.Entity<Order>();
}
```

Before EF Core 3.0, the `ShippingAddress` property would be mapped to separate columns for `BulkOrder` and `Order` by default.

#### New behavior

Starting with 3.0, EF Core only creates one column for `ShippingAddress`.

#### Why

The old behavior was unexpected.

#### Mitigations

The property can still be explicitly mapped to separate column on the derived types:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Ignore<OrderBase>();
    modelBuilder.Entity<EntityBase>();
    modelBuilder.Entity<BulkOrder>()
        .Property(o => o.ShippingAddress).HasColumnName("BulkShippingAddress");
    modelBuilder.Entity<Order>()
        .Property(o => o.ShippingAddress).HasColumnName("ShippingAddress");
}
```

### The foreign key property convention no longer matches same name as the principal property

Tracking Issue #13274

#### Old behavior

Consider the following model:

```csharp
public class Customer
{
    public int CustomerId { get; set; }
    public ICollection<Order> Orders { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
}
```

Before EF Core 3.0, the `CustomerId` property would be used for the foreign key by convention.
However, if `Order` is an owned type, then this would also make `CustomerId` the primary key and this isn't usually the expectation.

#### New behavior

Starting with 3.0, EF Core doesn't try to use properties for foreign keys by convention if they have the same name as the principal property.
Principal type name concatenated with principal property name, and navigation name concatenated with principal property name patterns are still matched.
For example:

```csharp
public class Customer
{
    public int Id { get; set; }
    public ICollection<Order> Orders { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
}
```

```csharp
public class Customer
{
    public int Id { get; set; }
    public ICollection<Order> Orders { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public int BuyerId { get; set; }
    public Customer Buyer { get; set; }
}
```

#### Why

This change was made to avoid erroneously defining a primary key property on the owned type.

#### Mitigations

If the property was intended to be the foreign key, and hence part of the primary key, then explicitly configure it as such.

### Database connection is now closed if not used anymore before the TransactionScope has been completed

Tracking Issue #14218

#### Old behavior

Before EF Core 3.0, if the context opens the connection inside a `TransactionScope`, the connection remains open while the current `TransactionScope` is active.

```csharp
using (new TransactionScope())
{
    using (AdventureWorks context = new AdventureWorks())
    {
        context.ProductCategories.Add(new ProductCategory());
        await context.SaveChangesAsync();

        // Old behavior: Connection is still open at this point

        var categories = await context.ProductCategories().ToListAsync();
    }
}
```

#### New behavior

Starting with 3.0, EF Core closes the connection as soon as it's done using it.

#### Why

This change allows to use multiple contexts in the same `TransactionScope`. The new behavior also matches EF6.

#### Mitigations

If the connection needs to remain open explicit call to `OpenConnection()` will ensure that EF Core doesn't close it prematurely:

```csharp
using (new TransactionScope())
{
    using (AdventureWorks context = new AdventureWorks())
    {
        await context.Database.OpenConnectionAsync();
        context.ProductCategories.Add(new ProductCategory());
        await context.SaveChangesAsync();

        var categories = await context.ProductCategories().ToListAsync();
        await context.Database.CloseConnectionAsync();
    }
}
```

### Each property uses independent in-memory integer key generation

Tracking Issue #6872

#### Old behavior

Before EF Core 3.0, one shared value generator was used for all in-memory integer key properties.

#### New behavior

Starting with EF Core 3.0, each integer key property gets its own value generator when using the in-memory database.
Also, if the database is deleted, then key generation is reset for all tables.

#### Why

This change was made to align in-memory key generation more closely to real database key generation and to improve the ability to isolate tests from each other when using the in-memory database.

#### Mitigations

This can break an application that is relying on specific in-memory key values to be set.
Consider instead not relying on specific key values, or updating to match the new behavior.

### Backing fields are used by default

Tracking Issue #12430

#### Old behavior

Before 3.0, even if the backing field for a property was known, EF Core would still by default read and write the property value using the property getter and setter methods.
The exception to this was query execution, where the backing field would be set directly if known.

#### New behavior

Starting with EF Core 3.0, if the backing field for a property is known, then EF Core will always read and write that property using the backing field.
This could cause an application break if the application is relying on additional behavior coded into the getter or setter methods.

#### Why

This change was made to prevent EF Core from erroneously triggering business logic by default when performing database operations involving the entities.

#### Mitigations

The pre-3.0 behavior can be restored through configuration of the property access mode on `ModelBuilder`.
For example:

```csharp
modelBuilder.UsePropertyAccessMode(PropertyAccessMode.PreferFieldDuringConstruction);
```

### Throw if multiple compatible backing fields are found

Tracking Issue #12523

#### Old behavior

Before EF Core 3.0, if multiple fields matched the rules for finding the backing field of a property, then one field would be chosen based on some precedence order.
This could cause the wrong field to be used in ambiguous cases.

#### New behavior

Starting with EF Core 3.0, if multiple fields are matched to the same property, then an exception is thrown.

#### Why

This change was made to avoid silently using one field over another when only one can be correct.

#### Mitigations

Properties with ambiguous backing fields must have the field to use specified explicitly.
For example, using the fluent API:

```csharp
modelBuilder
    .Entity<Blog>()
    .Property(e => e.Id)
    .HasField("_id");
```

### Field-only property names should match the field name

#### Old behavior

Before EF Core 3.0, a property could be specified by a string value and if no property with that name was found on the .NET type then EF Core would try to match it to a field using convention rules.

```csharp
private class Blog
{
    private int _id;
    public string Name { get; set; }
}
```

```csharp
modelBuilder
    .Entity<Blog>()
    .Property("Id");
```

#### New behavior

Starting with EF Core 3.0, a field-only property must match the field name exactly.

```csharp
modelBuilder
    .Entity<Blog>()
    .Property("_id");
```

#### Why

This change was made to avoid using the same field for two properties named similarly, it also makes the matching rules for field-only properties the same as for properties mapped to CLR properties.

#### Mitigations

Field-only properties must be named the same as the field they are mapped to.
In a future release of EF Core after 3.0, we plan to re-enable explicitly configuring a field name that is different from the property name (see issue #15307):

```csharp
modelBuilder
    .Entity<Blog>()
    .Property("Id")
    .HasField("_id");
```

### AddDbContext/AddDbContextPool no longer call AddLogging and AddMemoryCache

Tracking Issue #14756

#### Old behavior

Before EF Core 3.0, calling `AddDbContext` or `AddDbContextPool` would also register logging and memory caching services with DI through calls to AddLogging and AddMemoryCache.

#### New behavior

Starting with EF Core 3.0, `AddDbContext` and `AddDbContextPool` will no longer register these services with Dependency Injection (DI).

#### Why

EF Core 3.0 does not require that these services are in the application's DI container. However, if `ILoggerFactory` is registered in the application's DI container, then it will still be used by EF Core.

#### Mitigations

If your application needs these services, then register them explicitly with the DI container using  AddLogging or AddMemoryCache.

### AddEntityFramework* adds IMemoryCache with a size limit

Tracking Issue #12905

#### Old behavior

Before EF Core 3.0, calling `AddEntityFramework*` methods would also register memory caching services with DI without a size limit.

#### New behavior

Starting with EF Core 3.0, `AddEntityFramework*` will register an IMemoryCache service with a size limit. If any other services added afterwards depend on IMemoryCache they can quickly reach the default limit causing exceptions or degraded performance.

#### Why

Using IMemoryCache without a limit could result in uncontrolled memory usage if there is a bug in query caching logic or the queries are generated dynamically. Having a default limit mitigates a potential DoS attack.

#### Mitigations

In most cases calling `AddEntityFramework*` is not necessary if `AddDbContext` or `AddDbContextPool` is called as well. Therefore, the best mitigation is to remove the `AddEntityFramework*` call.

If your application needs these services, then register a IMemoryCache implementation explicitly with the DI container beforehand using AddMemoryCache.
