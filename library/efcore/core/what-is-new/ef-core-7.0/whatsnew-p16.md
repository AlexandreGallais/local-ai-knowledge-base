---
title: "What's New in EF Core 7.0 (part 16 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 16 of 16)

### Temporal tables support owned entities

EF Core SQL Server temporal tables mapping has been enhanced in EF7 to support table sharing. Most notably, the default mapping for owned single entities uses table sharing.

For example, consider an owner entity type `Employee` and its owned entity type `EmployeeInfo`:

```csharp
public class Employee
{
    public Guid EmployeeId { get; set; }
    public string Name { get; set; } = null!;

    public EmployeeInfo Info { get; set; } = null!;
}

public class EmployeeInfo
{
    public string Position { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? Address { get; set; }
    public decimal? AnnualSalary { get; set; }
}
```

If these types are mapped to the same table, then in EF7 that table can be made a temporal table:

```csharp
modelBuilder
    .Entity<Employee>()
    .ToTable(
        "Employees",
        tableBuilder =>
        {
            tableBuilder.IsTemporal();
            tableBuilder.Property<DateTime>("PeriodStart").HasColumnName("PeriodStart");
            tableBuilder.Property<DateTime>("PeriodEnd").HasColumnName("PeriodEnd");
        })
    .OwnsOne(
        employee => employee.Info,
        ownedBuilder => ownedBuilder.ToTable(
            "Employees",
            tableBuilder =>
            {
                tableBuilder.IsTemporal();
                tableBuilder.Property<DateTime>("PeriodStart").HasColumnName("PeriodStart");
                tableBuilder.Property<DateTime>("PeriodEnd").HasColumnName("PeriodEnd");
            }));
```

> **Note:**
> Making this configuration easier is tracked by Issue #29303. Vote for this issue if it's something you would like to see implemented.

## Improved value generation

EF7 includes two significant improvements to the automatic generation of values for key properties.

> **Tip:**
> The code for samples in this section comes from ValueGenerationSample.cs.

### Value generation for DDD guarded types

In domain-driven design (DDD), "guarded keys" can improve the type safety of key properties. This is achieved by wrapping the key type in another type which is specific to the use of the key. For example, the following code defines a `ProductId` type for product keys, and a `CategoryId` type for category keys.

```csharp
public readonly struct ProductId
{
    public ProductId(int value) => Value = value;
    public int Value { get; }
}

public readonly struct CategoryId
{
    public CategoryId(int value) => Value = value;
    public int Value { get; }
}
```

These are then used in `Product` and `Category` entity types:

```csharp
public class Product
{
    public Product(string name) => Name = name;
    public ProductId Id { get; set; }
    public string Name { get; set; }
    public CategoryId CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}

public class Category
{
    public Category(string name) => Name = name;
    public CategoryId Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; } = new();
}
```

This makes it impossible to accidentally assign the ID for a category to a product, or vice versa.

> **Warning:**
> As with many DDD concepts, this improved type safety comes at the expense of additional code complexity. It is worth considering whether, for example, assigning a product ID to a category is something that is ever likely to happen. Keeping things simple may be overall more beneficial to the codebase.

The guarded key types shown here both wrap `int` key <example-value>, which means integer values will be used in the mapped database tables. This is achieved by defining value converters for the types:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Properties<ProductId>().HaveConversion<ProductIdConverter>();
    configurationBuilder.Properties<CategoryId>().HaveConversion<CategoryIdConverter>();
}

private class ProductIdConverter : ValueConverter<ProductId, int>
{
    public ProductIdConverter()
        : base(v => v.Value, v => new(v))
    {
    }
}

private class CategoryIdConverter : ValueConverter<CategoryId, int>
{
    public CategoryIdConverter()
        : base(v => v.Value, v => new(v))
    {
    }
}
```

> **Note:**
> The code here uses `struct` types. This means they have appropriate value-type semantics for use as keys. If `class` types are used instead, then they need to either override equality semantics or also specify a value comparer.

In EF7, key types based on value converters can use automatically generated key <example-value> so long as the underlying type supports this. This is configured in the normal way using `ValueGeneratedOnAdd`:

```csharp
modelBuilder.Entity<Product>().Property(product => product.Id).ValueGeneratedOnAdd();
modelBuilder.Entity<Category>().Property(category => category.Id).ValueGeneratedOnAdd();
```

By default, this results in `IDENTITY` columns when used with SQL Server:

```sql
CREATE TABLE [Categories] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY ([Id]));

CREATE TABLE [Products] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [CategoryId] int NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Products_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE);
```

Which are used in the normal way to generate key <example-value> when inserting entities:

```sql
MERGE [Categories] USING (
VALUES (@p0, 0),
(@p1, 1)) AS i ([Name], _Position) ON 1=0
WHEN NOT MATCHED THEN
INSERT ([Name])
VALUES (i.[Name])
OUTPUT INSERTED.[Id], i._Position;
```

### Sequence-based key <example-value> for SQL Server

EF Core supports key value generation using SQL Server `IDENTITY` columns, or a Hi-Lo pattern based on blocks of keys generated by a database sequence. EF7 introduces support for a database sequence attached to the key's column default constraint. In its simplest form, this just requires telling EF Core to use a sequence for the key <example-value>:

```csharp
modelBuilder.Entity<Product>().Property(product => product.Id).UseSequence();
```

This results in a sequence being defined in the database:

```sql
CREATE SEQUENCE [ProductSequence] START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;
```

Which is then used in the key <example-value> default constraint:

```sql
CREATE TABLE [Products] (
    [Id] int NOT NULL DEFAULT (NEXT VALUE FOR [ProductSequence]),
    [Name] nvarchar(max) NOT NULL,
    [CategoryId] int NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Products_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE);
```

> **Note:**
> This form of key <example-value> is used by default for generated keys in entity type hierarchies using the TPC mapping strategy.

If desired, the sequence can be given a different name and schema. For example:

```csharp
modelBuilder
    .Entity<Product>()
    .Property(product => product.Id)
    .UseSequence("ProductsSequence", "northwind");
```

Further configuration of the sequence is formed by configuring it explicitly in the model. For example:

```csharp
modelBuilder
    .HasSequence<int>("ProductsSequence", "northwind")
    .StartsAt(1000)
    .IncrementsBy(2);
```

## Migrations tooling improvements

EF7 includes two significant improvements when using the EF Core Migrations command-line tools.

### UseSqlServer etc. accept null

It is very common to read a connection string from a configuration file and then pass that connection string to `UseSqlServer`, `UseSqlite`, or the equivalent method for another provider. For example:

```csharp
services.AddDbContext<BloggingContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("BloggingDatabase")));
```

It is also common to pass a connection string when applying migrations. For example:

```text
dotnet ef database update --connection "Server=(localdb)\mssqllocaldb;Database=MyAppDb"
```

Or when using a Migrations bundle.

```dotnetcli
./bundle.exe --connection "Server=(localdb)\mssqllocaldb;Database=MyAppDb"
```

In this case, even though the connection string read from configuration isn't used, the application startup code still attempts to read it from configuration and pass it to `UseSqlServer`. If the configuration is not available, then this results in passing null to `UseSqlServer`. In EF7, this is allowed, as long as the connection string is ultimately set later, such as by passing `--connection` to the command-line tool.

> **Note:**
> This change has been made for `UseSqlServer` and `UseSqlite`. For other providers, contact the provider maintainer to make an equivalent change if it has not yet been done for that provider.

### Detect when tools are running

EF Core runs application code when the `dotnet-ef` or PowerShell commands are being used. Sometimes it may be necessary to detect this situation to prevent inappropriate code from being executed at design-time. For example, code that automatically applies migrations at startup should probably not do this at design-time. In EF7, this can be detected using the `EF.IsDesignTime` flag:

```csharp
if (!EF.IsDesignTime)
{
    await context.Database.MigrateAsync();
}
```

EF Core sets the `IsDesignTime` to `true` when application code is running on behalf of tools.

## Performance enhancements for proxies

EF Core supports dynamically generated proxies for lazy-loading and change-tracking. EF7 contains two performance improvements when using these proxies:

- The proxy types are now created lazily. This means that the initial model building time when using proxies can be massively faster with EF7 than it was with EF Core 6.0.
- Proxies can now be used with compiled models.

Here are some performance results for a model with 449 entity types, 6390 properties, and 720 relationships.

| Scenario                                                    | Method           |    Mean |    Error |   StdDev |
|-------------------------------------------------------------|------------------|--------:|---------:|---------:|
| EF Core 6.0 without proxies                                 | TimeToFirstQuery | 1.085 s | 0.0083 s | 0.0167 s |
| EF Core 6.0 with change-tracking proxies                    | TimeToFirstQuery | 13.01 s | 0.2040 s | 0.4110 s |
| EF Core 7.0 without proxies                                 | TimeToFirstQuery | 1.442 s | 0.0134 s | 0.0272 s |
| EF Core 7.0 with change-tracking proxies                    | TimeToFirstQuery | 1.446 s | 0.0160 s | 0.0323 s |
| EF Core 7.0 with change-tracking proxies and compiled model | TimeToFirstQuery | 0.162 s | 0.0062 s | 0.0125 s |

So, in this case, a model with change-tracking proxies can be ready to execute the first query 80 times faster in EF7 than was possible with EF Core 6.0.

## First-class Windows Forms data binding

The Windows Forms team has been making some great improvements to the Visual Studio Designer experience. This includes new experiences for data binding that integrates well with EF Core.

In brief, the new experience provides Visual Studio U.I. for creating an `System.Web.UI.WebControls.ObjectDataSource`:

This can then be bound to an EF Core `DbSet` with some simple code:

```csharp
public partial class MainForm : Form
{
    private ProductsContext? dbContext;

    public MainForm()
    {
        InitializeComponent();
    }

    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        this.dbContext = new ProductsContext();

        this.dbContext.Categories.Load();
        this.categoryBindingSource.DataSource = dbContext.Categories.Local.ToBindingList();
    }

    protected override void OnClosing(CancelEventArgs e)
    {
        base.OnClosing(e);

        this.dbContext?.Dispose();
        this.dbContext = null;
    }
}
```

See Getting Started with Windows Forms for a complete walkthrough and downloadable WinForms sample application.
