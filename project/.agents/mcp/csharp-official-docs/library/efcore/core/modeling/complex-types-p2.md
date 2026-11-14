---
title: "Complex Types - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/complex-types.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Complex Types - EF Core (part 2 of 2)

## Keys and indexes on complex type properties

Starting with EF Core 11, keys and indexes can target scalar properties nested inside non-collection complex types. This can be done with a lambda:

```csharp
// EF Core 11 allows keys and indexes to target scalar properties nested
// inside non-collection complex types.
modelBuilder.Entity<Customer>()
    .HasIndex(c => c.Address.PostCode);
```

The same paths can be configured by name, using `.` to navigate into a complex property:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex("Address.PostCode");
```

For relational providers, indexes can also target paths inside complex types mapped to JSON columns. Complex collection paths use `[]` to refer to all elements, or a numeric indexer for a specific element:

```csharp
// Index a scalar inside every element of a JSON-mapped complex collection.
// Requires a provider/database with JSON index support, such as SQL Server 2025.
modelBuilder.Entity<Distributor>()
    .HasIndex("ShippingCenters[].City");
```

> **Note:**
> Indexing into a JSON-mapped complex collection requires a database that supports JSON indexes, such as SQL Server 2025.

For more information, see Keys and Indexes and constraints.

## Complex types with entity inheritance

Starting with EF Core 11, complex types and JSON columns can be used on entity types that use TPT (table-per-type) or TPC (table-per-concrete-type). This lets you combine the flexibility of these inheritance strategies with the modeling power of complex types.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Animal>()
        .UseTptMappingStrategy()
        .ComplexProperty(a => a.Details);
}
```

## Change tracking

EF Core tracks changes to the individual properties of a complex type, so only the affected columns are updated when you call `SaveChanges`. You can inspect and manipulate this tracking state through the change tracker.

Use `EntityEntry.ComplexProperty` to reach a complex property, and then drill into its scalar properties:

```csharp
var addressEntry = context.Entry(customer).ComplexProperty(c => c.Address);
Console.WriteLine($"City is currently: {addressEntry.Property(a => a.City).CurrentValue}");
Console.WriteLine($"Address was modified: {addressEntry.Property(a => a.City).IsModified}");
```

The `Microsoft.EntityFrameworkCore.ChangeTracking.ComplexPropertyEntry` API mirrors the entity `EntityEntry` API: you can read and set `CurrentValue`, check and set `IsModified`, and navigate into further nested complex properties or complex collections. Complex properties are also exposed through the entity's property values APIs (`CurrentValues`/`OriginalValues`).

## Querying complex types

Complex type members can be used in LINQ queries just like properties of the entity itself - you can filter on them, project them, and order by them:

```csharp
// Filter and project members of a complex property.
var ukCities = await context.Customers
    .Where(c => c.Address.Country == "UK")
    .Select(c => c.Address.City)
    .ToListAsync();
```

Because complex types have value semantics, you can also compare an entire complex value in a query, and EF will compare all of its properties:

```csharp
var ordersToHomeAddress = await context.Orders
    .Where(o => o.ShippingAddress == o.BillingAddress)
    .ToListAsync();
```

For complex types mapped to JSON, EF Core 11 adds `EF.Functions.JsonPathExists`, which checks whether a given JSON path exists in the document:

```csharp
var withPostCode = await context.Customers
    .Where(c => EF.Functions.JsonPathExists(c.Address, "$.PostCode"))
    .ToListAsync();
```

## Limitations

Complex types are designed for modeling value objects, and intentionally do not support every capability of entity types. The main limitations are:

- **No identity or tracking of their own.** A complex type can only exist as part of an entity; you cannot have a `DbSet<T>` of a complex type, nor track or query it independently.
- **No navigations.** A complex type cannot contain navigation properties to entity types.
- **No separate table.** On relational databases, a complex type is always stored in its container's table (via table splitting) or in a JSON column - never in its own table.
- **Collections require JSON.** On relational providers, complex collections must be mapped to JSON with `ToJson`; they cannot be mapped via table splitting.
- **Collections of value types are not supported.** Complex collection elements must be reference types.
- **Optional complex types require a required property.** An optional (nullable) complex type must define at least one required property.

Complex type support continues to be broadened across releases; see the what's new pages for the latest additions.
