---
title: "What's New in EF Core 8 (part 3 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 3 of 11)

### Nested complex types

A complex type can contain properties of other complex types. For example, let's use our `Address` complex type from above together with a `PhoneNumber` complex type, and nest them both inside another complex type:

```csharp
public record Address(string Line1, string? Line2, string City, string Country, string PostCode);

public record PhoneNumber(int CountryCode, long Number);

public record Contact
{
    public required Address Address { get; init; }
    public required PhoneNumber HomePhone { get; init; }
    public required PhoneNumber WorkPhone { get; init; }
    public required PhoneNumber MobilePhone { get; init; }
}
```

We're using immutable records here, since these are a good match for the semantics of our complex types, but nesting of complex types can be done with any flavor of .NET type.

> **Note:**
> We're not using a primary constructor for the `Contact` type because EF Core does not yet support constructor injection of complex type values. Vote for Issue #31621 if this is important to you.

We will add `Contact` as a property of the `Customer`:

```csharp
public class Customer
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required Contact Contact { get; set; }
    public List<Order> Orders { get; } = new();
}
```

And `PhoneNumber` as properties of the `Order`:

```csharp
public class Order
{
    public int Id { get; set; }
    public required string Contents { get; set; }
    public required PhoneNumber ContactPhone { get; set; }
    public required Address ShippingAddress { get; set; }
    public required Address BillingAddress { get; set; }
    public Customer Customer { get; set; } = null!;
}
```

Configuration of nested complex types can again be achieved using `System.ComponentModel.DataAnnotations.Schema.ComplexTypeAttribute`:

```csharp
[ComplexType]
public record Address(string Line1, string? Line2, string City, string Country, string PostCode);

[ComplexType]
public record PhoneNumber(int CountryCode, long Number);

[ComplexType]
public record Contact
{
    public required Address Address { get; init; }
    public required PhoneNumber HomePhone { get; init; }
    public required PhoneNumber WorkPhone { get; init; }
    public required PhoneNumber MobilePhone { get; init; }
}
```

Or in `OnModelCreating`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Customer>(
        b =>
        {
            b.ComplexProperty(
                e => e.Contact,
                b =>
                {
                    b.ComplexProperty(e => e.Address);
                    b.ComplexProperty(e => e.HomePhone);
                    b.ComplexProperty(e => e.WorkPhone);
                    b.ComplexProperty(e => e.MobilePhone);
                });
        });

    modelBuilder.Entity<Order>(
        b =>
        {
            b.ComplexProperty(e => e.ContactPhone);
            b.ComplexProperty(e => e.BillingAddress);
            b.ComplexProperty(e => e.ShippingAddress);
        });
}
```

### Queries

Properties of complex types on entity types are treated like any other non-navigation property of the entity type. This means that they are always loaded when the entity type is loaded. This is also true of any nested complex type properties. For example, querying for a customer:

```csharp
var customer = await context.Customers.FirstAsync(e => e.Id == customerId);
```

Is translated to the following SQL when using SQL Server:

```sql
SELECT TOP(1) [c].[Id], [c].[Name], [c].[Contact_Address_City], [c].[Contact_Address_Country],
    [c].[Contact_Address_Line1], [c].[Contact_Address_Line2], [c].[Contact_Address_PostCode],
    [c].[Contact_HomePhone_CountryCode], [c].[Contact_HomePhone_Number], [c].[Contact_MobilePhone_CountryCode],
    [c].[Contact_MobilePhone_Number], [c].[Contact_WorkPhone_CountryCode], [c].[Contact_WorkPhone_Number]
FROM [Customers] AS [c]
WHERE [c].[Id] = @__customerId_0
```

Notice two things from this SQL:

- Everything is returned to populate the customer _and_ all the nested `Contact`, `Address`, and `PhoneNumber` complex types.
- All the complex type values are stored as columns in the table for the entity type. Complex types are never mapped to separate tables.

#### Projections

Complex types can be projected from a query. For example, selecting just the shipping address from an order:

```csharp
var shippingAddress = await context.Orders
    .Where(e => e.Id == orderId)
    .Select(e => e.ShippingAddress)
    .SingleAsync();
```

This translates to the following when using SQL Server:

```sql
SELECT TOP(2) [o].[ShippingAddress_City], [o].[ShippingAddress_Country], [o].[ShippingAddress_Line1],
    [o].[ShippingAddress_Line2], [o].[ShippingAddress_PostCode]
FROM [Orders] AS [o]
WHERE [o].[Id] = @__orderId_0
```

Note that projections of complex types cannot be tracked, since complex type objects have no identity to use for tracking.

### Use in predicates

Members of complex types can be used in predicates. For example, finding all the orders going to a certain city:

```csharp
var city = "Walpole St Peter";
var walpoleOrders = await context.Orders.Where(e => e.ShippingAddress.City == city).ToListAsync();
```

Which translates to the following SQL on SQL Server:

```sql
SELECT [o].[Id], [o].[Contents], [o].[CustomerId], [o].[BillingAddress_City], [o].[BillingAddress_Country],
    [o].[BillingAddress_Line1], [o].[BillingAddress_Line2], [o].[BillingAddress_PostCode],
    [o].[ContactPhone_CountryCode], [o].[ContactPhone_Number], [o].[ShippingAddress_City],
    [o].[ShippingAddress_Country], [o].[ShippingAddress_Line1], [o].[ShippingAddress_Line2],
    [o].[ShippingAddress_PostCode]
FROM [Orders] AS [o]
WHERE [o].[ShippingAddress_City] = @__city_0
```

A full complex type instance can also be used in predicates. For example, finding all customers with a given phone number:

```csharp
var phoneNumber = new PhoneNumber(44, 7777555777);
var customersWithNumber = await context.Customers
    .Where(
        e => e.Contact.MobilePhone == phoneNumber
             || e.Contact.WorkPhone == phoneNumber
             || e.Contact.HomePhone == phoneNumber)
    .ToListAsync();
```

This translates to the following SQL when using SQL Server:

```sql
SELECT [c].[Id], [c].[Name], [c].[Contact_Address_City], [c].[Contact_Address_Country], [c].[Contact_Address_Line1],
     [c].[Contact_Address_Line2], [c].[Contact_Address_PostCode], [c].[Contact_HomePhone_CountryCode],
     [c].[Contact_HomePhone_Number], [c].[Contact_MobilePhone_CountryCode], [c].[Contact_MobilePhone_Number],
     [c].[Contact_WorkPhone_CountryCode], [c].[Contact_WorkPhone_Number]
FROM [Customers] AS [c]
WHERE ([c].[Contact_MobilePhone_CountryCode] = @__entity_equality_phoneNumber_0_CountryCode
    AND [c].[Contact_MobilePhone_Number] = @__entity_equality_phoneNumber_0_Number)
OR ([c].[Contact_WorkPhone_CountryCode] = @__entity_equality_phoneNumber_0_CountryCode
    AND [c].[Contact_WorkPhone_Number] = @__entity_equality_phoneNumber_0_Number)
OR ([c].[Contact_HomePhone_CountryCode] = @__entity_equality_phoneNumber_0_CountryCode
    AND [c].[Contact_HomePhone_Number] = @__entity_equality_phoneNumber_0_Number)
```

Notice that equality is performed by expanding out each member of the complex type. This aligns with complex types having no key for identity and hence a complex type instance is equal to another complex type instance if and only if all their members are equal. This also aligns with the equality defined by .NET for record types.

### Manipulation of complex type values

EF8 provides access to tracking information such as the current and original values of complex types and whether or not a property value has been modified. The API complex types is an extension of the change tracking API already used for entity types.

The `ComplexProperty` methods of `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry` return a entry for an entire complex object. For example, to get the current value of the `Order.BillingAddress`:

```csharp
var billingAddress = context.Entry(order)
    .ComplexProperty(e => e.BillingAddress)
    .CurrentValue;
```

A call to `Property` can be added to access a property of the complex type. For example to get the current value of just the billing post code:

```csharp
var postCode = context.Entry(order)
    .ComplexProperty(e => e.BillingAddress)
    .Property(e => e.PostCode)
    .CurrentValue;
```

Nested complex types are accessed using nested calls to `ComplexProperty`. For example, to get the city from the nested `Address` of the `Contact` on a `Customer`:

```csharp
var currentCity = context.Entry(customer)
    .ComplexProperty(e => e.Contact)
    .ComplexProperty(e => e.Address)
    .Property(e => e.City)
    .CurrentValue;
```

Other methods are available for reading and changing state. For example, `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified` can be used to set a property of a complex type as modified:

```csharp
context.Entry(customer)
    .ComplexProperty(e => e.Contact)
    .ComplexProperty(e => e.Address)
    .Property(e => e.PostCode)
    .IsModified = true;
```

### Current limitations

Complex types represent a significant investment across the EF stack. We were not able to make everything work in this release, but we plan to close some of the gaps in a future release. Make sure to vote (👍) on the appropriate GitHub issues if fixing any of these limitations is important to you.

Complex type limitations in EF8 include:

- Support collections of complex types. (Issue #31237)
- Allow complex type properties to be null. (Issue #31376)
- Map complex type properties to JSON columns. (Issue #31252)
- Constructor injection for complex types. (Issue #31621)
- Add seed data support for complex types. (Issue #31254)
- Map complex type properties for the Cosmos provider. (Issue #31253)
- Implement complex types for the in-memory database. (Issue #31464)
