---
title: "Value Conversions - EF Core (part 3 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/value-conversions.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Value Conversions - EF Core (part 3 of 4)

## Examples

### Simple value objects

This example uses a simple type to wrap a primitive type. This can be useful when you want the type in your model to be more specific (and hence more type-safe) than a primitive type. In this example, that type is `Dollars`, which wraps the decimal primitive:

```csharp
public readonly struct Dollars
{
    public Dollars(decimal amount)
        => Amount = amount;

    public decimal Amount { get; }

    public override string ToString()
        => $"${Amount}";
}
```

This can be used in an entity type:

```csharp
public class Order
{
    public int Id { get; set; }

    public Dollars Price { get; set; }
}
```

And converted to the underlying `decimal` when stored in the database:

```csharp
modelBuilder.Entity<Order>()
    .Property(e => e.Price)
    .HasConversion(
        v => v.Amount,
        v => new Dollars(v));
```

> **Note:**
> This value object is implemented as a readonly struct. This means that EF Core can snapshot and compare values without issue. See Value Comparers for more information.

### Composite value objects

In the previous example, the value object type contained only a single property. It is more common for a value object type to compose multiple properties that together form a domain concept. For example, a general `Money` type that contains both the amount and the currency:

```csharp
public readonly struct Money
{
    [JsonConstructor]
    public Money(decimal amount, Currency currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public override string ToString()
        => (Currency == Currency.UsDollars ? "$" : "£") + Amount;

    public decimal Amount { get; }
    public Currency Currency { get; }
}

public enum Currency
{
    UsDollars,
    PoundsSterling
}
```

This value object can be used in an entity type as before:

```csharp
public class Order
{
    public int Id { get; set; }

    public Money Price { get; set; }
}
```

Value converters can currently only convert values to and from a single database column. This limitation means that all property values from the object must be encoded into a single column value. This is typically handled by serializing the object as it goes into the database, and then deserializing it again on the way out. For example, using `System.Text.Json`:

```csharp
modelBuilder.Entity<Order>()
    .Property(e => e.Price)
    .HasConversion(
        v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
        v => JsonSerializer.Deserialize<Money>(v, (JsonSerializerOptions)null));
```

> **Note:**
> We plan to allow mapping an object to multiple columns in a future version of EF Core, removing the need to use serialization here. This is tracked by GitHub issue #13947.

> **Note:**
> As with the previous example, this value object is implemented as a readonly struct. This means that EF Core can snapshot and compare values without issue. See Value Comparers for more information.

### Collections of primitives

Serialization can also be used to store a collection of primitive values. For example:

```csharp
public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Contents { get; set; }

    public ICollection<string> Tags { get; set; }
}
```

Using `System.Text.Json` again:

```csharp
modelBuilder.Entity<Post>()
    .Property(e => e.Tags)
    .HasConversion(
        v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
        v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null),
        new ValueComparer<ICollection<string>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => (ICollection<string>)c.ToList()));
```

`ICollection<string>` represents a mutable reference type. This means that a `Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer`1` is needed so that EF Core can track and detect changes correctly. See Value Comparers for more information.

### Collections of value objects

Combining the previous two examples together we can create a collection of value objects. For example, consider an `AnnualFinance` type that models blog finances for a single year:

```csharp
public readonly struct AnnualFinance
{
    [JsonConstructor]
    public AnnualFinance(int year, Money income, Money expenses)
    {
        Year = year;
        Income = income;
        Expenses = expenses;
    }

    public int Year { get; }
    public Money Income { get; }
    public Money Expenses { get; }
    public Money Revenue => new Money(Income.Amount - Expenses.Amount, Income.Currency);
}
```

This type composes several of the `Money` types we created previously:

```csharp
public readonly struct Money
{
    [JsonConstructor]
    public Money(decimal amount, Currency currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public override string ToString()
        => (Currency == Currency.UsDollars ? "$" : "£") + Amount;

    public decimal Amount { get; }
    public Currency Currency { get; }
}

public enum Currency
{
    UsDollars,
    PoundsSterling
}
```

We can then add a collection of `AnnualFinance` to our entity type:

```csharp
public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IList<AnnualFinance> Finances { get; set; }
}
```

And again use serialization to store this:

```csharp
modelBuilder.Entity<Blog>()
    .Property(e => e.Finances)
    .HasConversion(
        v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
        v => JsonSerializer.Deserialize<List<AnnualFinance>>(v, (JsonSerializerOptions)null),
        new ValueComparer<IList<AnnualFinance>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => (IList<AnnualFinance>)c.ToList()));
```

> **Note:**
> As before, this conversion requires a `Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer`1`. See Value Comparers for more information.

### Value objects as keys

Sometimes primitive key properties may be wrapped in value objects to add an additional level of type-safety in assigning values. For example, we could implement a key type for blogs, and a key type for posts:

```csharp
public readonly struct BlogKey
{
    public BlogKey(int id) => Id = id;
    public int Id { get; }
}

public readonly struct PostKey
{
    public PostKey(int id) => Id = id;
    public int Id { get; }
}
```

These can then be used in the domain model:

```csharp
public class Blog
{
    public BlogKey Id { get; set; }
    public string Name { get; set; }

    public ICollection<Post> Posts { get; set; }
}

public class Post
{
    public PostKey Id { get; set; }

    public string Title { get; set; }
    public string Content { get; set; }

    public BlogKey? BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

Notice that `Blog.Id` cannot accidentally be assigned a `PostKey`, and `Post.Id` cannot accidentally be assigned a `BlogKey`. Similarly, the `Post.BlogId` foreign key property must be assigned a `BlogKey`.

> **Note:**
> Showing this pattern does not mean we recommend it. Carefully consider whether this level of abstraction is helping or hampering your development experience. Also, consider using navigations and generated keys instead of dealing with key values directly.

These key properties can then be mapped using value converters:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var blogKeyConverter = new ValueConverter<BlogKey, int>(
        v => v.Id,
        v => new BlogKey(v));

    modelBuilder.Entity<Blog>().Property(e => e.Id).HasConversion(blogKeyConverter);

    modelBuilder.Entity<Post>(
        b =>
        {
            b.Property(e => e.Id).HasConversion(v => v.Id, v => new PostKey(v));
            b.Property(e => e.BlogId).HasConversion(blogKeyConverter);
        });
}
```

> **Note:**
> Key properties with conversions can only use generated key values starting with EF Core 7.0.

### Use ulong for timestamp/rowversion

SQL Server supports automatic optimistic concurrency using 8-byte binary `rowversion`/`timestamp` columns. These are always read from and written to the database using an 8-byte array. However, byte arrays are a mutable reference type, which makes them somewhat painful to deal with. Value converters allow the `rowversion` to instead be mapped to a `ulong` property, which is much more appropriate and easy to use than the byte array. For example, consider a `Blog` entity with a ulong concurrency token:

```csharp
public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ulong Version { get; set; }
}
```

This can be mapped to a SQL server `rowversion` column using a value converter:

```csharp
modelBuilder.Entity<Blog>()
    .Property(e => e.Version)
    .IsRowVersion()
    .HasConversion<byte[]>();
```

### Specify the DateTime.Kind when reading dates

SQL Server discards the `System.DateTime.Kind*` flag when storing a `System.DateTime` as a `datetime` or `datetime2`. This means that DateTime values coming back from the database always have a `System.DateTimeKind` of `Unspecified`.

Value converters can be used in two ways to deal with this. First, EF Core has a value converter that creates an 8-byte opaque value which preserves the `Kind` flag. For example:

```csharp
modelBuilder.Entity<Post>()
    .Property(e => e.PostedOn)
    .HasConversion<long>();
```

This allows DateTime values with different `Kind` flags to be mixed in the database.

The problem with this approach is that the database no longer has recognizable `datetime` or `datetime2` columns. So instead it is common to always store UTC time (or, less commonly, always local time) and then either ignore the `Kind` flag or set it to the appropriate value using a value converter. For example, the converter below ensures that the `DateTime` value read from the database will have the `System.DateTimeKind` `UTC`:

```csharp
modelBuilder.Entity<Post>()
    .Property(e => e.LastUpdated)
    .HasConversion(
        v => v,
        v => new DateTime(v.Ticks, DateTimeKind.Utc));
```

If a mix of local and UTC values are being set in entity instances, then the converter can be used to convert appropriately before inserting. For example:

```csharp
modelBuilder.Entity<Post>()
    .Property(e => e.LastUpdated)
    .HasConversion(
        v => v.ToUniversalTime(),
        v => new DateTime(v.Ticks, DateTimeKind.Utc));
```

> **Note:**
> Carefully consider unifying all database access code to use UTC time all the time, only dealing with local time when presenting data to users.

### Use case-insensitive string keys

Some databases, including SQL Server, perform case-insensitive string comparisons by default. .NET, on the other hand, performs case-sensitive string comparisons by default. This means that a foreign key value like "DotNet" will match the primary key value "dotnet" on SQL Server, but will not match it in EF Core. A value comparer for keys can be used to force EF Core into case-insensitive string comparisons like in the database. For example, consider a blog/posts model with string keys:

```csharp
public class Blog
{
    public string Id { get; set; }
    public string Name { get; set; }

    public ICollection<Post> Posts { get; set; }
}

public class Post
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public string BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

This will not work as expected if some of the `Post.BlogId` values have different casing. The errors caused by this will depend on what the application is doing, but typically involve graphs of objects that are not fixed-up correctly, and/or updates that fail because the FK value is wrong. A value comparer can be used to correct this:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var comparer = new ValueComparer<string>(
        (l, r) => string.Equals(l, r, StringComparison.OrdinalIgnoreCase),
        v => v.ToUpper().GetHashCode(),
        v => v);

    modelBuilder.Entity<Blog>()
        .Property(e => e.Id)
        .Metadata.SetValueComparer(comparer);

    modelBuilder.Entity<Post>(
        b =>
        {
            b.Property(e => e.Id).Metadata.SetValueComparer(comparer);
            b.Property(e => e.BlogId).Metadata.SetValueComparer(comparer);
        });
}
```

> **Note:**
> .NET string comparisons and database string comparisons can differ in more than just case sensitivity. This pattern works for simple ASCII keys, but may fail for keys with any kind of culture-specific characters. See Collations and Case Sensitivity for more information.

### Handle fixed-length database strings

The previous example did not need a value converter. However, a converter can be useful for fixed-length database string types like `char(20)` or `nchar(20)`. Fixed-length strings are padded to their full length whenever a value is inserted into the database. This means that a key value of "`dotnet`" will be read back from the database as "`dotnet..............`", where `.` represents a space character. This will then not compare correctly with key values that are not padded.

A value converter can be used to trim the padding when reading key values. This can be combined with the value comparer in the previous example to compare fixed length case-insensitive ASCII keys correctly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var converter = new ValueConverter<string, string>(
        v => v,
        v => v.Trim());

    var comparer = new ValueComparer<string>(
        (l, r) => string.Equals(l, r, StringComparison.OrdinalIgnoreCase),
        v => v.ToUpper().GetHashCode(),
        v => v);

    modelBuilder.Entity<Blog>()
        .Property(e => e.Id)
        .HasColumnType("char(20)")
        .HasConversion(converter, comparer);

    modelBuilder.Entity<Post>(
        b =>
        {
            b.Property(e => e.Id).HasColumnType("char(20)").HasConversion(converter, comparer);
            b.Property(e => e.BlogId).HasColumnType("char(20)").HasConversion(converter, comparer);
        });
}
```
