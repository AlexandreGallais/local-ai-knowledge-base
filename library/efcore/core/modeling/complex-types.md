---
title: "Complex Types - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/complex-types.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Complex Types

Objects saved to the database can be split into three broad categories:

- Objects that are unstructured and hold a single value. For example, `int`, `Guid`, `string`, `IPAddress`. These are (somewhat loosely) called _primitive types_.
- Objects that are structured to hold multiple values, and where the identity of the object is defined by a key value. For example, `Blog`, `Post`, `Customer`. These are called _entity types_.
- Objects that are structured to hold multiple values, but the object has no key <example-value> its identity. For example, `Address`, `Coordinate`, `Money`. These are called _value objects_, and EF Core maps them as _complex types_.

A _complex type_ groups several properties into a single .NET type that is contained within an entity type; it doesn't have an identity of its own and cannot be tracked or queried independently. This makes complex types the natural way to model value objects.

> **Tip:**
> You can run and debug into the full sample project for this article on GitHub.

> **Note:**
> Complex types were introduced in EF Core 8, and have been extended substantially in later releases. Features are annotated below with the version that introduced them.

## Complex types vs. owned entity types

Before complex types existed, owned entity types were the recommended way to model objects without key properties. However, owned types are still _entity types_ behind the scenes: they have a hidden key and identity, and therefore operate with reference semantics. This causes a number of friction points that complex types are designed to solve.

The key <example-value> are:

| Aspect | Owned entity types | Complex types |
| --- | --- | --- |
| Identity | Have a hidden key and identity | No identity; compared by value |
| Instance sharing | The same instance can't be referenced twice | The same instance can be assigned to multiple properties |
| Assignment semantics | Reference semantics | Value semantics (properties are copied) |
| .NET type | Reference types only | Reference _or_ value types |
| Table mapping | Own table, table splitting, or JSON | Container's table (table splitting) or JSON |
| Navigations | Can contain navigations to other entities | Cannot contain navigations |
| Bulk update (`ExecuteUpdate`) | Not supported | Supported |

For example, assigning a customer's billing address to be the same as their shipping address fails with owned entity types, because the same entity instance can't be referenced more than once:

```csharp
var customer = await context.Customers.SingleAsync(c => c.Id == someId);
customer.BillingAddress = customer.ShippingAddress;
await context.SaveChangesAsync(); // Throws with owned entity types
```

Because complex types have value semantics, the same assignment simply copies the properties over, and works as expected. Similarly, comparing two complex values in a LINQ query compares their contents, whereas comparing two owned entities compares their identities.

For these reasons, complex types are generally the better choice for modeling value objects with table splitting or JSON mapping. Users currently using owned entity types for these scenarios are encouraged to consider switching to complex types.

## A simple example

Consider an `Address` type that holds several related values but has no identity of its own:

```csharp
public record Address
{
    public required string Line1 { get; init; }
    public string? Line2 { get; init; }
    public required string City { get; init; }
    public required string Country { get; init; }
    public required string PostCode { get; init; }
}
```

`Address` can then be used in several places across a customer/orders model:

```csharp
public class Customer
{
    public int Id { get; set; }
    public required string Name { get; set; }

    // A required (non-nullable) complex property.
    public required Address Address { get; set; }

    // An optional (nullable) complex property.
    public Address? SecondaryAddress { get; set; }

    public List<Order> Orders { get; } = new();
}

public class Order
{
    public int Id { get; set; }
    public required string Contents { get; set; }
    public required Address ShippingAddress { get; set; }
    public required Address BillingAddress { get; set; }
    public Customer Customer { get; set; } = null!;
}
```

Creating and saving a customer works as usual:

```csharp
var customer = new Customer
{
    Name = "Willow",
    Address = new Address
    {
        Line1 = "Barking Gate",
        City = "Walpole St Peter",
        Country = "UK",
        PostCode = "PE14 7AV"
    }
};

context.Add(customer);
await context.SaveChangesAsync();
```

On a relational database, the complex type does not get its own table. Instead, its properties are saved inline as additional columns on the containing entity's table (this is known as _table splitting_):

```sql
INSERT INTO [Customers] ([Name], [Address_City], [Address_Country], [Address_Line1], [Address_Line2], [Address_PostCode])
OUTPUT INSERTED.[Id]
VALUES (@p0, @p1, @p2, @p3, @p4, @p5);
```

Because complex types have value semantics, the same `Address` instance can be shared across multiple properties without any issues:

```csharp
// The same Address instance can be assigned to multiple complex properties.
customer.Orders.Add(
    new Order
    {
        Contents = "Tesco Tasty Treats",
        BillingAddress = customer.Address,
        ShippingAddress = customer.Address
    });

await context.SaveChangesAsync();
```

## Configuring complex types

Unlike most entity types, complex types are **not discovered by convention**. You must configure them explicitly, either by annotating the type with `System.ComponentModel.DataAnnotations.Schema.ComplexTypeAttribute`, or by calling the `ComplexProperty` Fluent API in `OnModelCreating` for each property that should be mapped as a complex type:

### Data Annotations

```csharp
[ComplexType]
public record Address
{
    public required string Line1 { get; init; }
    public string? Line2 { get; init; }
    public required string City { get; init; }
    public required string Country { get; init; }
    public required string PostCode { get; init; }
}
```

### Fluent API

```csharp
modelBuilder.Entity<Customer>(b =>
{
    // A required complex property; mapped to columns in the Customers table.
    b.ComplexProperty(c => c.Address);

    // An optional complex property (EF Core 10+).
    b.ComplexProperty(c => c.SecondaryAddress);
});

modelBuilder.Entity<Order>(b =>
{
    b.ComplexProperty(o => o.ShippingAddress);
    b.ComplexProperty(o => o.BillingAddress);
});
```

***

### Configuring facets of complex type properties

The nested `Property` builder can be used to configure the scalar properties of a complex type, just like properties of an entity type - for example, to set the column name or maximum length:

```csharp
modelBuilder.Entity<Order>()
    .ComplexProperty(
        o => o.ShippingAddress,
        b =>
        {
            b.Property(a => a.Line1).HasColumnName("ShipsToStreet").HasMaxLength(100);
            b.Property(a => a.City).HasColumnName("ShipsToCity");
        });
```

Starting with EF Core 11, you can configure a property nested inside a complex type directly by chaining member access in the lambda, without first obtaining the complex-type builder:

```csharp
// EF Core 11 allows configuring a complex-type property directly by chaining
// member access, without first obtaining the complex-type builder.
modelBuilder.Entity<Customer>()
    .Property(c => c.Address.Line1)
    .HasMaxLength(200);
```

## Reference and value types

A complex type can be a .NET reference type (a `class` or `record`) or a value type (a `struct` or `record struct`, introduced in EF Core 10).

### Mutability

Because a reference-type instance can be shared by multiple properties, mutating one of its properties changes the value everywhere it is used. This is usually not what you want. A good way to avoid it - and a natural fit for value objects - is to make the complex type **immutable**, so that changing a value requires creating a new instance. The `Address` type used throughout this article is an immutable `record`; changing an address is therefore done with a `with` expression:

```csharp
// Address is an immutable record, so create a new instance to change a value.
customer.Address = customer.Address with { Line1 = "Peacock Lodge" };

await context.SaveChangesAsync();
```

Even though a whole new `Address` instance is assigned, EF still tracks changes at the individual property level, so only the columns whose values actually changed are updated:

```sql
UPDATE [Customers] SET [Address_Line1] = @p0
OUTPUT 1
WHERE [Id] = @p1;
```

Immutability can be expressed with an immutable `class` (init-only or read-only properties), a `record`, a `readonly struct`, or a `readonly record struct`. Value types (`struct`) have copy semantics, so assigning them always copies the values and avoids the accidental-sharing problem, even when mutable - but mutable structs are generally discouraged in C#, so an immutable form is still recommended.

> **Tip:**
> If several entities really should observe the same address and update together when it changes, then model the address as an _entity type_ with its own identity and reference it via a navigation, rather than using a complex type.

## Nested complex types

A complex type can contain properties of other complex types, allowing you to build up structured objects to any depth. For example, a `Contact` complex type might contain both an `Address` and one or more `PhoneNumber` complex types:

```csharp
public record Address(string Line1, string? Line2, string City, string Country, string PostCode);

public record PhoneNumber(int CountryCode, long Number);

public record Contact
{
    public required Address Address { get; init; }
    public required PhoneNumber HomePhone { get; init; }
    public required PhoneNumber WorkPhone { get; init; }
}
```

When mapped via table splitting, the columns of a nested complex type are prefixed with the full path to the property (for example, `Contact_HomePhone_Number`).

## Optional complex types

By default, a complex property is **required**: the CLR property must always have a value, and it maps to non-nullable columns. Starting with EF Core 10, a complex property can be made optional by declaring it as nullable:

```csharp
public class Customer
{
    public int Id { get; set; }
    public required string Name { get; set; }

    // A required (non-nullable) complex property.
    public required Address Address { get; set; }

    // An optional (nullable) complex property.
    public Address? SecondaryAddress { get; set; }

    public List<Order> Orders { get; } = new();
}

public class Order
{
    public int Id { get; set; }
    public required string Contents { get; set; }
    public required Address ShippingAddress { get; set; }
    public required Address BillingAddress { get; set; }
    public Customer Customer { get; set; } = null!;
}
```

An optional complex property that is `null` results in `NULL` values in all of its columns.

> **Note:**
> An optional complex type currently requires at least one **required** property to be defined on the complex type. This is because EF needs at least one non-nullable column to distinguish a `null` complex value from a complex value whose properties all happen to be `null`.

If the complex type has no required property of its own, you can instead configure a discriminator property. While EF Core does not yet support inheritance for complex types, the discriminator is created as a **required shadow property** by default, which satisfies the requirement above:

```csharp
// GeoLocation has no required property, so configure a discriminator. EF creates
// it as a required shadow property, which satisfies the requirement that an
// optional complex type have at least one required property.
modelBuilder.Entity<Place>()
    .ComplexProperty(p => p.Location, b => b.HasDiscriminator());
```

## Collections of complex types

Starting with EF Core 10, a property can hold a _collection_ of complex types. On relational databases, complex collections must be mapped to a single JSON column using `ToJson` - they cannot be mapped to a different table:

```csharp
public class Distributor
{
    public int Id { get; set; }
    public required string Name { get; set; }

    // A collection of complex types, mapped to a single JSON column.
    public List<Address> ShippingCenters { get; set; } = new();
}
```

```csharp
// Collections of complex types must be mapped to JSON on relational providers.
modelBuilder.Entity<Distributor>()
    .ComplexCollection(d => d.ShippingCenters, b => b.ToJson());
```

Each element of the collection is stored as a JSON object inside the array, and the entire collection maps to one column:

```sql
CREATE TABLE [Distributors] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [ShippingCenters] json NOT NULL,
    CONSTRAINT [PK_Distributors] PRIMARY KEY ([Id])
);
```

> **Note:**
> Collections of value types (`struct`) are not currently supported; use a reference type (`class` or `record`) for complex collection elements.

## Mapping complex types to JSON

In addition to table splitting, EF Core 10 allows mapping a (non-collection) complex property to a single JSON column with `ToJson`:

```csharp
modelBuilder.Entity<Customer>(b =>
{
    b.ComplexProperty(c => c.Address, c => c.ToJson());
    b.ComplexProperty(c => c.SecondaryAddress, c => c.ToJson());
});
```

Each complex value is then serialized into a single JSON column rather than spread across multiple columns:

```sql
CREATE TABLE [Customers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Address] json NOT NULL,
    [SecondaryAddress] json NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
);
```

On SQL Server 2025 and Azure SQL, EF uses the native `json` data type by default; on other databases and older SQL Server versions, JSON is stored in a text column. You can override the column type with `HasColumnType` if needed.

Unlike table splitting, JSON mapping allows collections _within_ the mapped type, and lets you query and update individual properties inside the document just like any other property. Values inside JSON columns can also be efficiently updated in bulk with `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*`.
