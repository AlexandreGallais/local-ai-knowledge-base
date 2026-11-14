---
title: "What's New in EF Core 6.0 (part 9 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 9 of 11)

## Model building improvements

In addition to new mapping attributes, EF Core 6.0 contains several other improvements to the model building process.

### Support for SQL Server sparse columns

GitHub Issue: #8023.

SQL Server sparse columns are ordinary columns that are optimized to store null values. This can be useful when using TPH inheritance mapping where properties of a rarely used subtype will result in null column values for most rows in the table. For example, consider a `ForumModerator` class that extends from `ForumUser`:

```csharp
public class ForumUser
{
    public int Id { get; set; }
    public string Username { get; set; }
}

public class ForumModerator : ForumUser
{
    public string ForumName { get; set; }
}
```

There may be millions of users, with only a handful of these being moderators. This means mapping the `ForumName` as sparse might make sense here. This can now be configured using `IsSparse` in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<ForumModerator>()
        .Property(e => e.ForumName)
        .IsSparse();
}
```

EF Core migrations will then mark the column as sparse. For example:

```sql
CREATE TABLE [ForumUser] (
    [Id] int NOT NULL IDENTITY,
    [Username] nvarchar(max) NULL,
    [Discriminator] nvarchar(max) NOT NULL,
    [ForumName] nvarchar(max) SPARSE NULL,
    CONSTRAINT [PK_ForumUser] PRIMARY KEY ([Id]));
```

> **Note:**
> Sparse columns have limitations. Make sure to read the SQL Server sparse columns documentation to ensure that sparse columns are the right choice for your scenario.

### Improvements to HasConversion API

GitHub Issue: #25468.

Before EF Core 6.0, the generic overloads of the `HasConversion` methods used the generic parameter to specify _the type to convert to_. For example, consider a `Currency` enum:

```csharp
public enum Currency
{
    UsDollars,
    PoundsSterling,
    Euros
}
```

EF Core can be configured to save values of this enum as the strings "UsDollars", "PoundsStirling", and "Euros" using `HasConversion<string>`. For example:

```csharp
modelBuilder.Entity<TestEntity1>()
    .Property(e => e.Currency)
    .HasConversion<string>();
```

Starting with EF Core 6.0, the generic type can instead specify a _value converter type_. This can be one of the built-in value converters. For example, to store the enum values as 16-bit numbers in the database:

```csharp
modelBuilder.Entity<TestEntity2>()
    .Property(e => e.Currency)
    .HasConversion<EnumToNumberConverter<Currency, short>>();
```

Or it can be a custom value converter type. For example, consider a converter that stores the enum values as their currency symbols:

```csharp
public class CurrencyToSymbolConverter : ValueConverter<Currency, string>
{
    public CurrencyToSymbolConverter()
        : base(
            v => v == Currency.PoundsSterling ? "£" : v == Currency.Euros ? "€" : "$",
            v => v == "£" ? Currency.PoundsSterling : v == "€" ? Currency.Euros : Currency.UsDollars)
    {
    }
}
```

This can now be configured using the generic `HasConversion` method:

```csharp
modelBuilder.Entity<TestEntity3>()
    .Property(e => e.Currency)
    .HasConversion<CurrencyToSymbolConverter>();
```

### Less configuration for many-to-many relationships

GitHub Issue: #21535.

Unambiguous many-to-many relationships between two entity types are discovered by convention. Where necessary or if desired, the navigations can be specified explicitly. For example:

```csharp
modelBuilder.Entity<Cat>()
    .HasMany(e => e.Humans)
    .WithMany(e => e.Cats);
```

In both these cases, EF Core creates a shared entity typed based on `Dictionary<string, object>` to act as the join entity between the two types. Starting with EF Core 6.0, `UsingEntity` can be added to the configuration to change only this type, without the need for additional configuration. For example:

```csharp
modelBuilder.Entity<Cat>()
    .HasMany(e => e.Humans)
    .WithMany(e => e.Cats)
    .UsingEntity<CatHuman>();
```

In addition, the join entity type can be additional configured without needing to specify the left and right relationships explicitly. For example:

```csharp
modelBuilder.Entity<Cat>()
    .HasMany(e => e.Humans)
    .WithMany(e => e.Cats)
    .UsingEntity<CatHuman>(
        e => e.HasKey(e => new { e.CatsId, e.HumansId }));
```

And finally, the full configuration can be supplied. For example:

```csharp
modelBuilder.Entity<Cat>()
    .HasMany(e => e.Humans)
    .WithMany(e => e.Cats)
    .UsingEntity<CatHuman>(
        e => e.HasOne<Human>().WithMany().HasForeignKey(e => e.CatsId),
        e => e.HasOne<Cat>().WithMany().HasForeignKey(e => e.HumansId),
        e => e.HasKey(e => new { e.CatsId, e.HumansId }));
```

### Allow value converters to convert nulls

GitHub Issue: #13850.

> **Important:**
> Due to the problems outlined below, the constructors for `ValueConverter` that allow conversion of nulls have been marked with `[EntityFrameworkInternal]` for the EF Core 6.0 release. Using these constructors will now generate a build warning.

Value converters do not generally allow the conversion of null to some other value. This is because the same value converter can be used for both nullable and non-nullable types, which is very useful for PK/FK combinations where the FK is often nullable and the PK is not.

Starting with EF Core 6.0, a value converter can be created that does convert nulls. However, validation of this feature has revealed proved it to be very problematic in practice with many pitfalls. For example:

* Value conversion to null in the store generates bad queries
* Value conversion from null in the store generates bad queries
* Value converters do not handle cases where the database column has multiple different values that convert to the same value
* Allow value converters to change nullability of columns

These are not trivial issues and for the query issues they are not easy to detect. Therefore, we have marked this feature as internal for EF Core 6.0. You can still use it, but you will get a compiler warning. The warning can be disabled using `#pragma warning disable EF1001`.

One example of where converting nulls can be useful is when the database contains nulls, but the entity type wants to use some other default value for the property. For example, consider an enum where its default value is "Unknown":

```csharp
public enum Breed
{
    Unknown,
    Burmese,
    Tonkinese
}
```

However, the database may have null values when the breed is unknown. In EF Core 6.0, a value converter can be used to account for this:

```csharp
    public class BreedConverter : ValueConverter<Breed, string>
    {
#pragma warning disable EF1001
        public BreedConverter()
            : base(
                v => v == Breed.Unknown ? null : v.ToString(),
                v => v == null ? Breed.Unknown : Enum.Parse<Breed>(v),
                convertsNulls: true)
        {
        }
#pragma warning restore EF1001
    }
```

Cats with a breed of "Unknown" will have their `Breed` column set to null in the database. For example:

```csharp
context.AddRange(
    new Cat { Name = "Mac", Breed = Breed.Unknown },
    new Cat { Name = "Clippy", Breed = Breed.Burmese },
    new Cat { Name = "Sid", Breed = Breed.Tonkinese });

await context.SaveChangesAsync();
```

Which generates the following insert statements on SQL Server:

```output
info: 9/27/2021 19:43:55.966 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (16ms) [Parameters=[@p0=NULL (Size = 4000), @p1='Mac' (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      INSERT INTO [Cats] ([Breed], [Name])
      VALUES (@p0, @p1);
      SELECT [Id]
      FROM [Cats]
      WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();
info: 9/27/2021 19:43:55.983 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[@p0='Burmese' (Size = 4000), @p1='Clippy' (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      INSERT INTO [Cats] ([Breed], [Name])
      VALUES (@p0, @p1);
      SELECT [Id]
      FROM [Cats]
      WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();
info: 9/27/2021 19:43:55.983 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[@p0='Tonkinese' (Size = 4000), @p1='Sid' (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      INSERT INTO [Cats] ([Breed], [Name])
      VALUES (@p0, @p1);
      SELECT [Id]
      FROM [Cats]
      WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();
```

## DbContext factory improvements

### AddDbContextFactory also registers DbContext directly

GitHub Issue: #25164.

Sometimes it is useful to have both a DbContext type _and_ a factory for contexts of that type both registered in the applications dependency injection (D.I.) container. This allows, for example, a scoped instance of the DbContext to be resolved from the request scope, while the factory can be used to create multiple independent instances when needed.

To support this, `AddDbContextFactory` now also registers the DbContext type as a scoped service. For example, consider this registration in the application's D.I. container:

```csharp
var container = services
    .AddDbContextFactory<SomeDbContext>(
        builder => builder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFCoreSample;ConnectRetryCount=0"))
    .BuildServiceProvider();
```

With this registration, the factory can be resolved from the root D.I. container, just as in previous versions:

```csharp
var factory = container.GetService<IDbContextFactory<SomeDbContext>>();
using (var context = factory.CreateDbContext())
{
    // Contexts obtained from the factory must be explicitly disposed
}
```

Note that context instances created by the factory must be explicitly disposed.

In addition, a DbContext instance can be resolved directly from a container scope:

```csharp
using (var scope = container.CreateScope())
{
    var context = scope.ServiceProvider.GetService<SomeDbContext>();
    // Context is disposed when the scope is disposed
}
```

In this case the context instance is disposed when the container scope is disposed; the context should not be disposed explicitly.

At a higher level, this means that either the DbContext of the factory can be injected into other D.I. types. For example:

```csharp
private class MyController2
{
    private readonly IDbContextFactory<SomeDbContext> _contextFactory;

    public MyController2(IDbContextFactory<SomeDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public async Task DoSomething()
    {
        using var context1 = _contextFactory.CreateDbContext();
        using var context2 = _contextFactory.CreateDbContext();

        var results1 = await context1.Blogs.ToListAsync();
        var results2 = await context2.Blogs.ToListAsync();

        // Contexts obtained from the factory must be explicitly disposed
    }
}
```

Or:

```csharp
private class MyController1
{
    private readonly SomeDbContext _context;

    public MyController1(SomeDbContext context)
    {
        _context = context;
    }

    public async Task DoSomething()
    {
        var results = await _context.Blogs.ToListAsync();

        // Injected context is disposed when the request scope is disposed
    }
}
```

### DbContextFactory ignores DbContext parameterless constructor

GitHub Issue: #24124.

EF Core 6.0 now allows both a parameterless DbContext constructor, and a constructor that takes `DbContextOptions` to be used on the same context type when the factory is registered through `AddDbContextFactory`. For example, the context used in the examples above contains both constructors:

```csharp
public class SomeDbContext : DbContext
{
    public SomeDbContext()
    {
    }

    public SomeDbContext(DbContextOptions<SomeDbContext> options)
        : base(options)
    {
    }

    public DbSet<Blog> Blogs { get; set; }
}
```

### DbContext pooling can be used without dependency injection

GitHub Issue: #24137.

The `PooledDbContextFactory` type has been made public so that it can be used as a stand-alone pool for DbContext instances, without the need for your application to have a dependency injection container. The pool is created with an instance of `DbContextOptions` that will be used to create context instances:

```csharp
var options = new DbContextOptionsBuilder<SomeDbContext>()
    .EnableSensitiveDataLogging()
    .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFCoreSample;ConnectRetryCount=0")
    .Options;

var factory = new PooledDbContextFactory<SomeDbContext>(options);
```

The factory can then be used to create and pool instances. For example:

```csharp
for (var i = 0; i < 2; i++)
{
    using var context1 = factory.CreateDbContext();
    Console.WriteLine($"Created DbContext with ID {context1.ContextId}");

    using var context2 = factory.CreateDbContext();
    Console.WriteLine($"Created DbContext with ID {context2.ContextId}");
}
```

Instances are returned to the pool when they are disposed.
