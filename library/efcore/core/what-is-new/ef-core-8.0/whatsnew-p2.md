---
title: "What's New in EF Core 8 (part 2 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 2 of 11)

## Value objects using Complex Types

> **Tip:**
> This section introduces complex types. For comprehensive documentation, see Complex types.

Objects saved to the database can be split into three broad categories:

- Objects that are unstructured and hold a single value. For example, `int`, `Guid`, `string`, `IPAddress`. These are (somewhat loosely) called "primitive types".
- Objects that are structured to hold multiple values, and where the identity of the object is defined by a key value. For example, `Blog`, `Post`, `Customer`. These are called "entity types".
- Objects that are structured to hold multiple values, but the object has no key <example-value> identity. For example, `Address`, `Coordinate`.

Prior to EF8, there was no good way to map the third type of object. Owned types can be used, but since owned types are actually entity types, they have semantics based on a key value, even when that key value is hidden.

EF8 now supports "Complex Types" to cover this third type of object. Complex type objects:

- Are not identified or tracked by key value.
- Must be defined as part of an entity type.  (In other words, you cannot have a `DbSet` of a complex type.)
- Can be either .NET value types or reference types.
- Instances can be shared by multiple properties.

### Simple example

For example, consider an `Address` type:

```csharp
public class Address
{
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required string PostCode { get; set; }
}
```

`Address` is then used in three places in a simple customer/orders model:

```csharp
public class Customer
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required Address Address { get; set; }
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

Let's create and save a customer with their address:

```csharp
var customer = new Customer
{
    Name = "Willow",
    Address = new() { Line1 = "Barking Gate", City = "Walpole St Peter", Country = "UK", PostCode = "PE14 7AV" }
};

context.Add(customer);
await context.SaveChangesAsync();
```

This results in the following row being inserted into the database:

```sql
INSERT INTO [Customers] ([Name], [Address_City], [Address_Country], [Address_Line1], [Address_Line2], [Address_PostCode])
OUTPUT INSERTED.[Id]
VALUES (@p0, @p1, @p2, @p3, @p4, @p5);
```

Notice that the complex types do not get their own tables. Instead, they are saved inline to columns of the `Customers` table. This matches the table sharing behavior of owned types.

> **Note:**
> We don't plan to allow complex types to be mapped to their own table. However, in a future release, we do plan to allow the complex type to be saved as a JSON document in a single column. Vote for Issue #31252 if this is important to you.

Now let's say we want to ship an order to a customer and use the customer's address as both the default billing an shipping address. The natural way to do this is to copy the `Address` object from the `Customer` into the `Order`. For example:

```csharp
customer.Orders.Add(
    new Order { Contents = "Tesco Tasty Treats", BillingAddress = customer.Address, ShippingAddress = customer.Address, });

await context.SaveChangesAsync();
```

With complex types, this works as expected, and the address is inserted into the `Orders` table:

```sql
INSERT INTO [Orders] ([Contents], [CustomerId],
    [BillingAddress_City], [BillingAddress_Country], [BillingAddress_Line1], [BillingAddress_Line2], [BillingAddress_PostCode],
    [ShippingAddress_City], [ShippingAddress_Country], [ShippingAddress_Line1], [ShippingAddress_Line2], [ShippingAddress_PostCode])
OUTPUT INSERTED.[Id]
VALUES (@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10, @p11);
```

So far you might be saying, "but I could do this with owned types!" However, the "entity type" semantics of owned types quickly get in the way. For example, running the code above with owned types results in a slew of warnings and then an error:

```text
warn: 8/20/2023 12:48:01.678 CoreEventId.DuplicateDependentEntityTypeInstanceWarning[10001] (Microsoft.EntityFrameworkCore.Update) 
      The same entity is being tracked as different entity types 'Order.BillingAddress#Address' and 'Customer.Address#Address' with defining navigations. If a property value changes, it will result in two store changes, which might not be the desired outcome.
warn: 8/20/2023 12:48:01.687 CoreEventId.DuplicateDependentEntityTypeInstanceWarning[10001] (Microsoft.EntityFrameworkCore.Update) 
      The same entity is being tracked as different entity types 'Order.ShippingAddress#Address' and 'Customer.Address#Address' with defining navigations. If a property value changes, it will result in two store changes, which might not be the desired outcome.
warn: 8/20/2023 12:48:01.687 CoreEventId.DuplicateDependentEntityTypeInstanceWarning[10001] (Microsoft.EntityFrameworkCore.Update)
      The same entity is being tracked as different entity types 'Order.ShippingAddress#Address' and 'Order.BillingAddress#Address' with defining navigations. If a property value changes, it will result in two store changes, which might not be the desired outcome.
fail: 8/20/2023 12:48:01.709 CoreEventId.SaveChangesFailed[10000] (Microsoft.EntityFrameworkCore.Update) 
      An exception occurred in the database while saving changes for context type 'NewInEfCore8.ComplexTypesSample+CustomerContext'.
      System.InvalidOperationException: Cannot save instance of 'Order.ShippingAddress#Address' because it is an owned entity without any reference to its owner. Owned entities can only be saved as part of an aggregate also including the owner entity.
         at Microsoft.EntityFrameworkCore.ChangeTracking.Internal.InternalEntityEntry.PrepareToSave()
```

This is because a single instance of the `Address` entity type (with the same hidden key value) is being used for three _different_ entity instances. On the other hand, sharing the same instance between complex properties is allowed, and so the code works as expected when using complex types.

### Configuration of complex types

Complex types must be configured in the model using either mapping attributes or by calling `ComplexProperty` API in `OnModelCreating`. Complex types are not discovered by convention.

For example, the `Address` type can be configured using the `System.ComponentModel.DataAnnotations.Schema.ComplexTypeAttribute`:

```csharp
[ComplexType]
public class Address
{
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required string PostCode { get; set; }
}
```

Or in `OnModelCreating`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Customer>()
        .ComplexProperty(e => e.Address);

    modelBuilder.Entity<Order>(b =>
    {
        b.ComplexProperty(e => e.BillingAddress);
        b.ComplexProperty(e => e.ShippingAddress);
    });
}
```

### Mutability

In the example above, we ended up with the same `Address` instance used in three places. This is allowed and doesn't cause any issues for EF Core when using complex types. However, sharing instances of the same reference type means that if a property value on the instance is modified, then that change will be reflected in all three usages. For example, following on from above, let's change `Line1` of the customer address and save the changes:

```csharp
customer.Address.Line1 = "Peacock Lodge";
await context.SaveChangesAsync();
```

This results in the following update to the database when using SQL Server:

```sql
UPDATE [Customers] SET [Address_Line1] = @p0
OUTPUT 1
WHERE [Id] = @p1;
UPDATE [Orders] SET [BillingAddress_Line1] = @p2, [ShippingAddress_Line1] = @p3
OUTPUT 1
WHERE [Id] = @p4;
```

Notice that all three `Line1` columns have changed, since they are all sharing the same instance. This is usually not what we want.

> **Tip:**
> If order addresses should change automatically when the customer address changes, then consider mapping the address as an entity type. `Order` and `Customer` can then safely reference the same address instance (which is now identified by a key) via a navigation property.

A good way to deal with issues like this is to make the type immutable. Indeed, this immutability is often natural when a type is a good candidate for being a complex type. For example, it usually makes sense to supply a complex new `Address` object rather than to just mutate, say, the country while leaving the rest the same.

Both reference and value types can be made immutable. We'll look at some examples in the following sections.

### Reference types as complex types

#### Immutable class

We used a simple, mutable `class` in the example above. To prevent the issues with accidental mutation described above, we can make the class immutable. For example:

```csharp
public class Address
{
    public Address(string line1, string? line2, string city, string country, string postCode)
    {
        Line1 = line1;
        Line2 = line2;
        City = city;
        Country = country;
        PostCode = postCode;
    }

    public string Line1 { get; }
    public string? Line2 { get; }
    public string City { get; }
    public string Country { get; }
    public string PostCode { get; }
}
```

> **Tip:**
> With C# 12 or above, this class definition can be simplified using a primary constructor:
>
> ```csharp
> public class Address(string line1, string? line2, string city, string country, string postCode)
> {
>     public string Line1 { get; } = line1;
>     public string? Line2 { get; } = line2;
>     public string City { get; } = city;
>     public string Country { get; } = country;
>     public string PostCode { get; } = postCode;
> }
> ```

It is now not possible to change the `Line1` value on an existing address. Instead, we need to create a new instance with the changed value. For example:

```csharp
var currentAddress = customer.Address;
customer.Address = new Address(
    "Peacock Lodge", currentAddress.Line2, currentAddress.City, currentAddress.Country, currentAddress.PostCode);

await context.SaveChangesAsync();
```

This time the call to `SaveChangesAsync` only updates the customer address:

```sql
UPDATE [Customers] SET [Address_Line1] = @p0
OUTPUT 1
WHERE [Id] = @p1;
```

Note that even though the Address object is immutable, and the entire object has been changed, EF is still tracking changes to the individual properties, so only the columns with changed values are updated.

#### Immutable record

C# 9 introduced record types, which makes creating and using immutable objects easier. For example, the `Address` object can be made a record type:

```csharp
public record Address
{
    public Address(string line1, string? line2, string city, string country, string postCode)
    {
        Line1 = line1;
        Line2 = line2;
        City = city;
        Country = country;
        PostCode = postCode;
    }

    public string Line1 { get; init; }
    public string? Line2 { get; init; }
    public string City { get; init; }
    public string Country { get; init; }
    public string PostCode { get; init; }
}
```

> **Tip:**
> This record definition can be simplified using a primary constructor:
>
> ```csharp
> public record Address(string Line1, string? Line2, string City, string Country, string PostCode);
> ```

Replacing the mutable object and calling `SaveChanges` now requires less code:

```csharp
customer.Address = customer.Address with { Line1 = "Peacock Lodge" };

await context.SaveChangesAsync();
```

### Value types as complex types

#### Mutable struct

A simple mutable value type can be used as a complex type. For example, `Address` can be defined as a `struct` in C#:

```csharp
public struct Address
{
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required string PostCode { get; set; }
}
```

Assigning the customer `Address` object to the shipping and billing `Address` properties results in each property getting a copy of the `Address`, since this is how value types work. This means that modifying the `Address` on the customer will not change the shipping or billing `Address` instances, so mutable structs don't have the same instance-sharing issues that happen with mutable classes.

However, mutable structs are generally discouraged in C#, so think very carefully before using them.

#### Immutable struct

Immutable structs work well as complex types, just like immutable classes do. For example, `Address` can be defined such that it can not be modified:

```csharp
public readonly struct Address(string line1, string? line2, string city, string country, string postCode)
{
    public string Line1 { get; } = line1;
    public string? Line2 { get; } = line2;
    public string City { get; } = city;
    public string Country { get; } = country;
    public string PostCode { get; } = postCode;
}
```

The code for changing the address now looks the same as when using immutable class:

```csharp
var currentAddress = customer.Address;
customer.Address = new Address(
    "Peacock Lodge", currentAddress.Line2, currentAddress.City, currentAddress.Country, currentAddress.PostCode);

await context.SaveChangesAsync();
```

#### Immutable struct record

C# 10 introduced `struct record` types, which makes it easy to create and work with immutable struct records like it is with immutable class records. For example, we can define `Address` as an immutable struct record:

```csharp
public readonly record struct Address(string Line1, string? Line2, string City, string Country, string PostCode);
```

The code for changing the address now looks the same as when using immutable class record:

```csharp
customer.Address = customer.Address with { Line1 = "Peacock Lodge" };

await context.SaveChangesAsync();
```
