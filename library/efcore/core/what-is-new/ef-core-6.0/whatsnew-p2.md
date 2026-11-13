---
title: "What's New in EF Core 6.0 (part 2 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 2 of 11)

## Migration Bundles

GitHub Issue: #19693.

EF Core migrations are used to generate database schema updates based on changes to the EF model. These schema updates should be applied at application deployment time, often as part of a continuous integration/continuous deployment (C.I./C.D.) system.

EF Core now includes a new way to apply these schema updates: migration bundles. A migration bundle is a small executable containing migrations and the code needed to apply these migrations to the database.

> **Note:**
> See Introducing DevOps-friendly EF Core Migration Bundles on the .NET Blog for a more in-depth discussion on migrations, bundles, and deployment.

Migration bundles are created using the `dotnet ef` command-line tool. Ensure that you have installed the latest version of the tool before continuing.

A bundle needs migrations to include. These are created using `dotnet ef migrations add` as described in the migrations documentation. Once you have migrations ready to deploy, create a bundle using the `dotnet ef migrations bundle`. For example:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations bundle
Build started...
Build succeeded.
Building bundle...
Done. Migrations Bundle: C:\local\AllTogetherNow\SixOh\efbundle.exe
PS C:\local\AllTogetherNow\SixOh>
```

The output is an executable suitable for your target operating system. In my case this is Windows x64, so I get an `efbundle.exe` dropped in my local folder. Running this executable applies the migrations contained within it:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe
Applying migration '20210903083845_MyMigration'.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

Migrations are applied to the database only if they have not been already applied. For example, running the same bundle again does nothing, since there are no new migrations to apply:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe
No migrations were applied. The database is already up to date.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

However, if changes are made to the model and more migrations are generated with `dotnet ef migrations add`, then these can be bundled into a new executable ready to apply. For example:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations add SecondMigration
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations add Number3
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations bundle --force
Build started...
Build succeeded.
Building bundle...
Done. Migrations Bundle: C:\local\AllTogetherNow\SixOh\efbundle.exe
PS C:\local\AllTogetherNow\SixOh>
```

Notice that the `--force` option can be used to overwrite the existing bundle with a new one.

Executing this new bundle applies these two new migrations to the database:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe
Applying migration '20210903084526_SecondMigration'.
Applying migration '20210903084538_Number3'.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

By default, the bundle uses the database connection string from your application's configuration. However, a different database can be migrated by passing the connection string on the command line. For example:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe --connection "Data Source=(LocalDb)\MSSQLLocalDB;Database=SixOhProduction"
Applying migration '20210903083845_MyMigration'.
Applying migration '20210903084526_SecondMigration'.
Applying migration '20210903084538_Number3'.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

Notice that this time all three migrations were applied, since none of them had yet been applied to the production database.

Other options can be passed to the command line. Some common options are:

* `--output` to specify the path of executable file to create.
* `--context` to specify the DbContext type to use when the project contains multiple context types.
* `--project` to specify the project to use. Defaults to the current working directory.
* `--startup-project` to specify the startup project to use. Defaults to the current working directory.
* `--no-build` to prevent the project from being built before running the command. This should only be used if the project is known to be up-to-date.
* `--verbose` to see detailed information on what the command is doing. Use this option when including information in bug reports.

Use `dotnet ef migrations bundle --help` to see all available options.

Note that by default each migration is applied in its own transaction. See GitHub issue #22616 for a discussion of possible future enhancements in this area.

## Pre-convention model configuration

GitHub Issue: #12229.

Previous versions of EF Core require that the mapping for every property of a given type is configured explicitly when that mapping differs from the default. This includes "facets" like the maximum length of strings and decimal precision, as well as value conversion for the property type.

This necessitated either:

* Model builder configuration for each property
* A mapping attribute on each property
* Explicit iteration over all properties of all entity types and use of the low-level metadata APIs when building the model.

Note that explicit iteration is error-prone and hard to do robustly because the list of entity types and mapped properties may not be final at the time this iteration happens.

EF Core 6.0 allows this mapping configuration to be specified once for a given type. It will then be applied to all properties of that type in the model. This is called "pre-convention model configuration", since it configures aspects of the model that are then used by the model building conventions. Such configuration is applied by overriding `ConfigureConventions` on your `DbContext`:

```csharp
public class SomeDbContext : DbContext
{
    protected override void ConfigureConventions(
        ModelConfigurationBuilder configurationBuilder)
    {
        // Pre-convention model configuration goes here
    }
}
```

For example, consider the following entity types:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public Money AccountValue { get; set; }

    public Session CurrentSession { get; set; }

    public ICollection<Order> Orders { get; } = new List<Order>();
}

public class Order
{
    public int Id { get; set; }
    public string SpecialInstructions { get; set; }
    public DateTime OrderDate { get; set; }
    public bool IsComplete { get; set; }
    public Money Price { get; set; }
    public Money? Discount { get; set; }

    public Customer Customer { get; set; }
}
```

All string properties can be configured to be ANSI (instead of Unicode) and have a maximum length of 1024:

```csharp
configurationBuilder
    .Properties<string>()
    .AreUnicode(false)
    .HaveMaxLength(1024);
```

All DateTime properties can be converted to 64-bit integers in the database, using the default conversion from DateTimes to longs:

```csharp
configurationBuilder
    .Properties<DateTime>()
    .HaveConversion<long>();
```

All bool properties can be converted to the integers `0` or `1` using one of the built-in value converters:

```csharp
configurationBuilder
    .Properties<bool>()
    .HaveConversion<BoolToZeroOneConverter<int>>();
```

Assuming `Session` is a transient property of the entity and should not be persisted, it can be ignored everywhere in the model:

```csharp
configurationBuilder
    .IgnoreAny<Session>();
```

Pre-convention model configuration is very useful when working with value objects. For example, the type `Money` in the model above is represented by read-only struct:

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

This is then serialized to and from JSON using a custom value converter:

```csharp
public class MoneyConverter : ValueConverter<Money, string>
{
    public MoneyConverter()
        : base(
            v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
            v => JsonSerializer.Deserialize<Money>(v, (JsonSerializerOptions)null))
    {
    }
}
```

This value converter can be configured once for all uses of Money:

```csharp
configurationBuilder
    .Properties<Money>()
    .HaveConversion<MoneyConverter>()
    .HaveMaxLength(64);
```

Notice also that additional facets can be specified for the string column into which the serialized JSON is stored. In this case, the column is limited to a maximum length of 64.

The tables created for SQL Server using migrations show how the configuration has been applied to all mapped columns:

```sql
CREATE TABLE [Customers] (
    [Id] int NOT NULL IDENTITY,
    [Name] varchar(1024) NULL,
    [IsActive] int NOT NULL,
    [AccountValue] nvarchar(64) NOT NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
);
CREATE TABLE [Order] (
    [Id] int NOT NULL IDENTITY,
    [SpecialInstructions] varchar(1024) NULL,
    [OrderDate] bigint NOT NULL,
    [IsComplete] int NOT NULL,
    [Price] nvarchar(64) NOT NULL,
    [Discount] nvarchar(64) NULL,
    [CustomerId] int NULL,
    CONSTRAINT [PK_Order] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Order_Customers_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [Customers] ([Id])
);
```

It is also possible to specify a default type mapping for a given type. For example:

```csharp
configurationBuilder
    .DefaultTypeMapping<string>()
    .IsUnicode(false);
```

This is rarely needed, but can be useful if a type is used in query in a way that is uncorrelated with any mapped property of the model.

> **Note:**
> See Announcing Entity Framework Core 6.0 Preview 6: Configure Conventions on the .NET Blog for more discussion and examples of pre-convention model configuration.
