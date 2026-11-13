---
title: "What's New in EF Core 6.0 (part 8 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 8 of 11)

### Changes to owned optional dependent handling

GitHub Issue: #24558.

It becomes tricky to know whether an optional dependent entity exists or not when it shares a table with its principal entity. This is because there is a row in the table for the dependent because the principal needs it, regardless of whether or not the dependent exists. The way to handle this unambiguously is to ensure that the dependent has at least one required property. Since a required property cannot be null, it means if the value in the column for that property is null, then the dependent entity does not exist.

For example, consider a `Customer` class where each customer has an owned `Address`:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }

    [Required]
    public string Postcode { get; set; }
}
```

The address is optional, meaning that it is valid to save a customer with no address:

```csharp
context.Customers1.Add(
    new()
    {
        Name = "Foul Ole Ron"
    });
```

However, if a customer does have an address, then that address must have at least a non-null postcode:

```csharp
context.Customers1.Add(
    new()
    {
        Name = "Havelock Vetinari",
        Address = new()
        {
            Postcode = "AN1 1PL",
        }
    });
```

This is ensured by marking the `Postcode` property as `Required`.

Now when customers are queried, if the Postcode column is null, then this means the customer does not have an address, and the `Customer.Address` navigation property is left null. For example, iterating through the customers and checking if the Address is null:

```csharp
await foreach (var customer in context.Customers1.AsAsyncEnumerable())
{
    Console.Write(customer.Name);

    if (customer.Address == null)
    {
        Console.WriteLine(" has no address.");
    }
    else
    {
        Console.WriteLine($" has postcode {customer.Address.Postcode}.");
    }
}
```

Generates the following results:

```output
Foul Ole Ron has no address.
Havelock Vetinari has postcode AN1 1PL.
```

Consider instead the case where no property off the address is required:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Postcode { get; set; }
}
```

Now it is possible to save both a customer with no address, and a customer with an address where all the address properties are null:

```csharp
context.Customers2.Add(
    new()
    {
        Name = "Foul Ole Ron"
    });

context.Customers2.Add(
    new()
    {
        Name = "Havelock Vetinari",
        Address = new()
    });
```

However, in the database, these two cases are indistinguishable, as we can see by directly querying the database columns:

```output
Id  Name               House   Street  City    Postcode
1   Foul Ole Ron       NULL    NULL    NULL    NULL
2   Havelock Vetinari  NULL    NULL    NULL    NULL
```

For this reason, EF Core 6.0 will now warn you when saving an optional dependent where all of its properties are null. For example:

> warn: 9/27/2021 09:25:01.338 RelationalEventId.OptionalDependentWithAllNullPropertiesWarning[20704] (Microsoft.EntityFrameworkCore.Update)
> The entity of type 'Address' with primary key <example-value> {CustomerId: -2147482646} is an optional dependent using table sharing. The entity does not have any property with a non-default value to identify whether the entity exists. This means that when it is queried no object instance will be created instead of an instance with all properties set to default values. Any nested dependents will also be lost. Either don't save any instance with only default values or mark the incoming navigation as required in the model.

This becomes even more tricky where the optional dependent itself acts as a principal for a further optional dependent, also mapped to the same table. Rather than just warning, EF Core 6.0 disallows just cases of nested optional dependents. For example, consider the following model, where `ContactInfo` is owned by `Customer` and `Address` is in turned owned by `ContactInfo`:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ContactInfo ContactInfo { get; set; }
}

public class ContactInfo
{
    public string Phone { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Postcode { get; set; }
}
```

Now if `ContactInfo.Phone` is null, then EF Core will not create an instance of `Address` if the relationship is optional, even though the address itself may have data. For this kind of model, EF Core 6.0 will throw the following exception:

> System.InvalidOperationException:
> Entity type 'ContactInfo' is an optional dependent using table sharing and containing other dependents without any required non shared property to identify whether the entity exists. If all nullable properties contain a null value in database then an object instance won't be created in the query causing nested dependent's values to be lost. Add a required property to create instances with null values for other properties or mark the incoming navigation as required to always create an instance.

The bottom line here is to avoid the case where an optional dependent can contain all nullable property values and shares a table with its principal. There are three easy ways to avoid this:

1. Make the dependent required. This means that the dependent entity will always have a value after it is queried, even if all its properties are null.
2. Make sure that the dependent contains at least one required property, as described above.
3. Save optional dependents to their own table, instead of sharing a table with the principal.

A dependent can be made required by using the `Required` attribute on it's navigation:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }

    [Required]
    public Address Address { get; set; }
}

public class Address
{
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Postcode { get; set; }
}
```

Or by specifying it is required in `OnModelCreating`:

```csharp
modelBuilder.Entity<WithRequiredNavigation.Customer>(
    b =>
        {
            b.OwnsOne(e => e.Address);
            b.Navigation(e => e.Address).IsRequired();
        });
```

Dependents can be saved to a different table by specifying the tables to use in `OnModelCreating`:

```csharp
modelBuilder
    .Entity<WithDifferentTable.Customer>(
        b =>
            {
                b.ToTable("Customers");
                b.OwnsOne(
                    e => e.Address,
                    b => b.ToTable("CustomerAddresses"));
            });
```

See the OptionalDependentsSample in GitHub for more examples of optional dependents, including cases with nested optional dependents.

## New mapping attributes

EF Core 6.0 contains several new attributes that can be applied to code to change the way it is mapped to the database.

### UnicodeAttribute

GitHub Issue: #19794. This feature was contributed by @RaymondHuy. Many thanks!

Starting with EF Core 6.0, a string property can now be mapped to a non-Unicode column using a mapping attribute _without specifying the database type directly_. For example, consider a `Book` entity type with a property for the International Standard Book Number (ISBN) in the form "ISBN 978-3-16-148410-0":

```csharp
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }

    [Unicode(false)]
    [MaxLength(22)]
    public string Isbn { get; set; }
}
```

Since ISBNs cannot contain any non-unicode characters, the `Unicode` attribute will cause a non-Unicode string type to be used. In addition, `MaxLength` is used to limit the size of the database column. For example, when using SQL Server, this results in a database column of `varchar(22)`:

```sql
CREATE TABLE [Book] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NULL,
    [Isbn] varchar(22) NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY ([Id]));
```

> **Note:**
> EF Core maps string properties to Unicode columns by default. `UnicodeAttribute` is ignored when the database system supports only Unicode types.

### PrecisionAttribute

GitHub Issue: #17914. This feature was contributed by @RaymondHuy. Many thanks!

The precision and scale of a database column can now be configured using mapping attributes _without specifying the database type directly_. For example, consider a `Product` entity type with a decimal `Price` property:

```csharp
public class Product
{
    public int Id { get; set; }

    [Precision(precision: 10, scale: 2)]
    public decimal Price { get; set; }
}
```

EF Core will map this property to a database column with precision 10 and scale 2. For example, on SQL Server:

```sql
CREATE TABLE [Product] (
    [Id] int NOT NULL IDENTITY,
    [Price] decimal(10,2) NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Id]));
```

### EntityTypeConfigurationAttribute

GitHub Issue: #23163. This feature was contributed by @KaloyanIT. Many thanks!

`Microsoft.EntityFrameworkCore.IEntityTypeConfiguration`1` instances allow `Microsoft.EntityFrameworkCore.ModelBuilder` configuration for each entity type to be contained in its own configuration class. For example:

```csharp
public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder
            .Property(e => e.Isbn)
            .IsUnicode(false)
            .HasMaxLength(22);
    }
}
```

Normally, this configuration class must be instantiated and called into from `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    new BookConfiguration().Configure(modelBuilder.Entity<Book>());
}
```

Starting with EF Core 6.0, an `EntityTypeConfigurationAttribute` can be placed on the entity type such that EF Core can find and use appropriate configuration. For example:

```csharp
[EntityTypeConfiguration(typeof(BookConfiguration))]
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Isbn { get; set; }
}
```

This attribute means that EF Core will use the specified `IEntityTypeConfiguration` implementation whenever the `Book` entity type is included in a model. The entity type is included in a model using one of the normal mechanisms. For example, by creating a `Microsoft.EntityFrameworkCore.DbSet`1` property for the entity type:

```csharp
public class BooksContext : DbContext
{
    public DbSet<Book> Books { get; set; }

    //...
```

Or by registering it in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Book>();
}
```

> **Note:**
> `EntityTypeConfigurationAttribute` types will not be automatically discovered in an assembly. Entity types must be added to the model before the attribute will be discovered on that entity type.
