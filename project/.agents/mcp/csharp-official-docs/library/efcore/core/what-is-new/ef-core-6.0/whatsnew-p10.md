---
title: "What's New in EF Core 6.0 (part 10 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 10 of 11)

## Miscellaneous improvements

And finally, EF Core contains several improvements in areas not covered above.

### Use [ColumnAttribute.Order] when creating tables

GitHub Issue: #10059.

The `Order` property of `ColumnAttribute` can now be used to order columns when creating a table with migrations. For example, consider the following model:

```csharp
public class EntityBase
{
    public int Id { get; set; }
    public DateTime UpdatedOn { get; set; }
    public DateTime CreatedOn { get; set; }
}

public class PersonBase : EntityBase
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

public class Employee : PersonBase
{
    public string Department { get; set; }
    public decimal AnnualSalary { get; set; }
    public Address Address { get; set; }
}

[Owned]
public class Address
{
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }

    [Required]
    public string Postcode { get; set; }
}
```

By default, EF Core orders primary key <example-value> first, following by properties of the entity type and owned types, and finally properties from base types. For example, the following table is created on SQL Server:

```sql
CREATE TABLE [EmployeesWithoutOrdering] (
    [Id] int NOT NULL IDENTITY,
    [Department] nvarchar(max) NULL,
    [AnnualSalary] decimal(18,2) NOT NULL,
    [Address_House] nvarchar(max) NULL,
    [Address_Street] nvarchar(max) NULL,
    [Address_City] nvarchar(max) NULL,
    [Address_Postcode] nvarchar(max) NULL,
    [UpdatedOn] datetime2 NOT NULL,
    [CreatedOn] datetime2 NOT NULL,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    CONSTRAINT [PK_EmployeesWithoutOrdering] PRIMARY KEY ([Id]));
```

In EF Core 6.0, `ColumnAttribute` can be used to specify a different column order. For example:

```csharp
public class EntityBase
{
    [Column(Order = 1)]
    public int Id { get; set; }

    [Column(Order = 98)]
    public DateTime UpdatedOn { get; set; }

    [Column(Order = 99)]
    public DateTime CreatedOn { get; set; }
}

public class PersonBase : EntityBase
{
    [Column(Order = 2)]
    public string FirstName { get; set; }

    [Column(Order = 3)]
    public string LastName { get; set; }
}

public class Employee : PersonBase
{
    [Column(Order = 20)]
    public string Department { get; set; }

    [Column(Order = 21)]
    public decimal AnnualSalary { get; set; }

    public Address Address { get; set; }
}

[Owned]
public class Address
{
    [Column("House", Order = 10)]
    public string House { get; set; }

    [Column("Street", Order = 11)]
    public string Street { get; set; }

    [Column("City", Order = 12)]
    public string City { get; set; }

    [Required]
    [Column("Postcode", Order = 13)]
    public string Postcode { get; set; }
}
```

On SQL Server, the table generated is now:

```sql
CREATE TABLE [EmployeesWithOrdering] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [House] nvarchar(max) NULL,
    [Street] nvarchar(max) NULL,
    [City] nvarchar(max) NULL,
    [Postcode] nvarchar(max) NULL,
    [Department] nvarchar(max) NULL,
    [AnnualSalary] decimal(18,2) NOT NULL,
    [UpdatedOn] datetime2 NOT NULL,
    [CreatedOn] datetime2 NOT NULL,
    CONSTRAINT [PK_EmployeesWithOrdering] PRIMARY KEY ([Id]));
```

This moves the `FistName` and `LastName` columns are moved to the top, even though they are defined in a base type. Notice that the column order values can have gaps, allowing ranges to be used to always place columns at the end, even when used by multiple derived types.

This example also shows how the same `ColumnAttribute` can be used to specify both the column name and order.

Column ordering can also be configured using the `ModelBuilder` API in `OnModelCreating`. For example:

```csharp
modelBuilder.Entity<UsingModelBuilder.Employee>(
    entityBuilder =>
    {
        entityBuilder.Property(e => e.Id).HasColumnOrder(1);
        entityBuilder.Property(e => e.FirstName).HasColumnOrder(2);
        entityBuilder.Property(e => e.LastName).HasColumnOrder(3);

        entityBuilder.OwnsOne(
            e => e.Address,
            ownedBuilder =>
            {
                ownedBuilder.Property(e => e.House).HasColumnName("House").HasColumnOrder(4);
                ownedBuilder.Property(e => e.Street).HasColumnName("Street").HasColumnOrder(5);
                ownedBuilder.Property(e => e.City).HasColumnName("City").HasColumnOrder(6);
                ownedBuilder.Property(e => e.Postcode).HasColumnName("Postcode").HasColumnOrder(7).IsRequired();
            });

        entityBuilder.Property(e => e.Department).HasColumnOrder(8);
        entityBuilder.Property(e => e.AnnualSalary).HasColumnOrder(9);
        entityBuilder.Property(e => e.UpdatedOn).HasColumnOrder(10);
        entityBuilder.Property(e => e.CreatedOn).HasColumnOrder(11);
    });
```

Ordering on the model builder with `HasColumnOrder` takes precedence over any order specified with `ColumnAttribute`. This means `HasColumnOrder` can be used to override ordering made with attributes, including resolving any conflicts when attributes on different properties specify the same order number.

> **Important:**
> Note that, in the general case, most databases only support ordering columns when the table is created. This means that the column order attribute cannot be used to re-order columns in an existing table. One notable exception to this is SQLite, where migrations will rebuild the entire table with new column orders.

### EF Core Minimal API

GitHub Issue: #25192.

.NET Core 6.0 includes updated templates that feature simplified "minimal APIs" which remove a lot of the boilerplate code traditionally needed in .NET applications.

EF Core 6.0 contains a new extension method that registers a DbContext type and supplies the configuration for a database provider in a single line. For example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<MyDbContext>("Data Source=mydatabase.db");
```

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlServer<MyDbContext>(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase");
```

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCosmos<MyDbContext>(
    "https://localhost:8081",
    "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==");
```

These are exactly equivalent to:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>(
    options => options.UseSqlite("Data Source=mydatabase.db"));
```

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>(
    options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase;ConnectRetryCount=0"));
```

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>(
    options => options.UseCosmos(
        "https://localhost:8081",
        "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="));
```

> **Note:**
> The EF Core minimal APIs support only very basic <example-value> and configuration of a DbContext and provider. Use `AddDbContext`, `AddDbContextPool`, `AddDbContextFactory`, etc. to access all types of registration and configuration available in EF Core.

Check out these resources to learn more about minimal APIs:

* The presentation Minimal APIs in .NET 6 by Maria Naggaga
* A .NET 6 Minimal API Todo example Playground on Scott Hanselman's blog
* The gist Minimal APIs at a glance by David Fowler
* A minimal API Playground by Damian Edwards on GitHub

### Preserve synchronization context in SaveChangesAsync

GitHub Issue: #23971.

We changed the EF Core code in the 5.0 release to set `System.Threading.Tasks.Task.ConfigureAwait*` to `false` in all places where we `await` async code. This is generally a better choice for EF Core usage. However, `System.Data.Entity.DbContext.SaveChangesAsync*` is a special case because EF Core will set generated values into tracked entities after the async database operation is complete. These changes may then trigger notifications which, for example, may have to run on the U.I. thread. Therefore, we are reverting this change in EF Core 6.0 for the `System.Data.Entity.DbContext.SaveChangesAsync*` method only.

### In-memory database: validate required properties are not null

GitHub Issue: #10613. This feature was contributed by @fagnercarvalho. Many thanks!

The EF Core in-memory database will now throw an exception if an attempt is made to save a null value for a property marked as required. For example, consider a `User` type with a required `Username` property:

```csharp
public class User
{
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }
}
```

Attempting to save an entity with a null `Username` will result in the following exception:

> Microsoft.EntityFrameworkCore.DbUpdateException: Required properties '{'Username'}' are missing for the instance of entity type 'User' with the key value '{Id: 1}'.

This validation can be disabled if necessary. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .LogTo(Console.WriteLine, new[] { InMemoryEventId.ChangesSaved })
        .UseInMemoryDatabase("UserContextWithNullCheckingDisabled", b => b.EnableNullChecks(false));
}
```

### Command source information for diagnostics and interceptors

GitHub Issue: #23719. This feature was contributed by @Giorgi. Many thanks!

The `Microsoft.EntityFrameworkCore.Diagnostics.CommandEventData` supplied to diagnostics sources and interceptors now contains a `Microsoft.EntityFrameworkCore.Diagnostics.CommandSource` enum value indicating which part of EF was responsible for creating the command. This can be used to filter interceptor behavior, for example to only intercept commands originating from `SaveChanges`:

```csharp
public class CommandSourceInterceptor : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result)
    {
        if (eventData.CommandSource == CommandSource.SaveChanges)
        {
            Console.WriteLine($"Saving changes for {eventData.Context!.GetType().Name}:");
            Console.WriteLine();
            Console.WriteLine(command.CommandText);
        }

        return result;
    }
}
```

This filters the interceptor to only `SaveChanges` events when used in an application which also generates migrations and queries. For example:

```output
Saving changes for CustomersContext:

SET NOCOUNT ON;
INSERT INTO [Customers] ([Name])
VALUES (@p0);
SELECT [Id]
FROM [Customers]
WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();
```

For more information, see Filtering by command source.

### Better temporary values handling

GitHub Issue: #24245.

EF Core does not expose temporary values on entity type instances. For example, consider a `Blog` entity type with a store-generated key:

```csharp
public class Blog
{
    public int Id { get; set; }

    public ICollection<Post> Posts { get; } = new List<Post>();
}
```

The `Id` key <example-value> will get a temporary value as soon as a `Blog` is tracked by the context. For example, when calling `DbContext.Add`:

```csharp
var blog = new Blog();
context.Add(blog);
```

The temporary value can be obtained from the context change tracker, but is not set into the entity instance. For example, this code:

```csharp
Console.WriteLine($"Blog.Id value on entity instance = {blog.Id}");
Console.WriteLine($"Blog.Id value tracked by EF = {context.Entry(blog).Property(e => e.Id).CurrentValue}");
```

Generates the following output:

```output
Blog.Id value on entity instance = 0
Blog.Id value tracked by EF = -2147482647
```

This is good because it prevents the temporary value leaking into application code where it can accidentally be treated as non-temporary. However, sometimes it is useful to deal with temporary values directly. For example, an application may want to generate its own temporary values for a graph of entities before they are tracked so that they can be used to form relationships using foreign keys. This can be done by explicitly marking the values as temporary. For example:

```csharp
var blog = new Blog { Id = -1 };
var post1 = new Post { Id = -1, BlogId = -1 };
var post2 = new Post { Id = -2, BlogId = -1 };

context.Add(blog).Property(e => e.Id).IsTemporary = true;
context.Add(post1).Property(e => e.Id).IsTemporary = true;
context.Add(post2).Property(e => e.Id).IsTemporary = true;

Console.WriteLine($"Blog has explicit temporary ID = {blog.Id}");
Console.WriteLine($"Post 1 has explicit temporary ID = {post1.Id} and FK to Blog = {post1.BlogId}");
Console.WriteLine($"Post 2 has explicit temporary ID = {post2.Id} and FK to Blog = {post2.BlogId}");
```

In EF Core 6.0, the value will remain on the entity instance even though it is now marked as temporary. For example, the code above generates the following output:

```output
Blog has explicit temporary ID = -1
Post 1 has explicit temporary ID = -1 and FK to Blog = -1
Post 2 has explicit temporary ID = -2 and FK to Blog = -1
```

Likewise, temporary values generated by EF Core can be set explicitly on to entity instances and marked as temporary values. This can be used to explicitly set relationships between new entities using their temporary key values. For example:

```csharp
var post1 = new Post();
var post2 = new Post();

var blogIdEntry = context.Entry(blog).Property(e => e.Id);
blog.Id = blogIdEntry.CurrentValue;
blogIdEntry.IsTemporary = true;

var post1IdEntry = context.Add(post1).Property(e => e.Id);
post1.Id = post1IdEntry.CurrentValue;
post1IdEntry.IsTemporary = true;
post1.BlogId = blog.Id;

var post2IdEntry = context.Add(post2).Property(e => e.Id);
post2.Id = post2IdEntry.CurrentValue;
post2IdEntry.IsTemporary = true;
post2.BlogId = blog.Id;

Console.WriteLine($"Blog has generated temporary ID = {blog.Id}");
Console.WriteLine($"Post 1 has generated temporary ID = {post1.Id} and FK to Blog = {post1.BlogId}");
Console.WriteLine($"Post 2 has generated temporary ID = {post2.Id} and FK to Blog = {post2.BlogId}");
```

Resulting in:

```output
Blog has generated temporary ID = -2147482647
Post 1 has generated temporary ID = -2147482647 and FK to Blog = -2147482647
Post 2 has generated temporary ID = -2147482646 and FK to Blog = -2147482647
```

### EF Core annotated for C# nullable reference types

GitHub Issue: #19007.

The EF Core codebase now uses C# nullable reference types (NRTs) throughout. This means that you will get the correct compiler indications for null usage when using EF Core 6.0 from your own code.
