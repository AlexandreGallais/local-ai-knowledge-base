---
title: "DbContext Lifetime, Configuration, and Initialization - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/dbcontext-configuration/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# DbContext Lifetime, Configuration, and Initialization

This article shows basic patterns for initialization and configuration of a `Microsoft.EntityFrameworkCore.DbContext` instance.

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

## The DbContext lifetime

The lifetime of a `DbContext` begins when the instance is created and ends when the instance is disposed. A `DbContext` instance is designed to be used for a _single_ unit-of-work. This means that the lifetime of a `DbContext` instance is usually very short.

> **Tip:**
> To quote Martin Fowler from the link above, "A Unit of Work keeps track of everything you do during a business transaction that can affect the database. When you're done, it figures out everything that needs to be done to alter the database as a result of your work."

A typical unit-of-work when using Entity Framework Core (EF Core) involves:

- Creation of a `DbContext` instance
- Tracking of entity instances by the context. Entities become tracked by
  - Being returned from a query
  - Being added or attached to the context
- Changes are made to the tracked entities as needed to implement the business rule
- `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` or `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*` is called. EF Core detects the changes made and writes them to the database.
- The `DbContext` instance is disposed

> **Important:**
>
> - It is important to dispose the `Microsoft.EntityFrameworkCore.DbContext` after use. This ensures any:
>   - Unmanaged resources are freed.
>   - Events or other hooks are unregistered. Unregistering prevents memory leaks when the instance remains referenced.
> - DbContext is **Not thread-safe**. Don't share contexts between threads. Make sure to await all async calls before continuing to use the context instance.
> - An `System.InvalidOperationException` thrown by EF Core code can put the context into an unrecoverable state. Such exceptions indicate a program error and are not designed to be recovered from.

## DbContext in dependency injection for ASP.NET Core

In many web applications, each HTTP request corresponds to a single unit-of-work. This makes tying the context lifetime to that of the request a good default for web applications.

ASP.NET Core applications are configured using dependency injection. EF Core can be added to this configuration using `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*` in `Program.cs`. For example:

```csharp
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
```

The preceding code registers `ApplicationDbContext`, a subclass of `DbContext`, as a scoped service in the ASP.NET Core app service provider. The service provider is also known as the dependency injection container. The context is configured to use the SQL Server database provider and reads the connection string from ASP.NET Core configuration.

The `ApplicationDbContext` class must expose a public constructor with a `DbContextOptions<ApplicationDbContext>` parameter. This is how context configuration from `AddDbContext` is passed to the `DbContext`. For example:

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}
```

`ApplicationDbContext` can be used in ASP.NET Core controllers or other services through constructor injection:

```csharp
public class MyController
{
    private readonly ApplicationDbContext _context;

    public MyController(ApplicationDbContext context)
    {
        _context = context;
    }
}
```

The final result is an `ApplicationDbContext` instance created for each request and passed to the controller to perform a unit-of-work before being disposed when the request ends.

Read further in this article to learn more about configuration options. See Dependency injection in ASP.NET Core for more information.

## Basic DbContext initialization with 'new'

`DbContext` instances can be constructed with `new` in C#. Configuration can be performed by overriding the `OnConfiguring` method, or by passing options to the constructor. For example:

```csharp
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            @"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0");
    }
}
```

This pattern also makes it easy to pass configuration like the connection string via the `DbContext` constructor. For example:

```csharp
public class ApplicationDbContext : DbContext
{
    private readonly string _connectionString;

    public ApplicationDbContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
}
```

Alternately, `DbContextOptionsBuilder` can be used to create a `DbContextOptions` object that is then passed to the `DbContext` constructor. This allows a `DbContext` configured for dependency injection to also be constructed explicitly. For example, when using `ApplicationDbContext` defined for ASP.NET Core web apps above:

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}
```

The `DbContextOptions` can be created and the constructor can be called explicitly:

```csharp
var contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
    .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0")
    .Options;

using var context = new ApplicationDbContext(contextOptions);
```

## Use a DbContext factory

Some application types (e.g. ASP.NET Core Blazor) use dependency injection but do not create a service scope that aligns with the desired `DbContext` lifetime. Even where such an alignment does exist, the application may need to perform multiple units-of-work within this scope. For example, multiple units-of-work within a single HTTP request.

In these cases, `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextFactory*` can be used to register a factory for creation of `DbContext` instances. For example:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContextFactory<ApplicationDbContext>(
        options => options.UseSqlServer(
            @"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0"));
}
```

The `ApplicationDbContext` class must expose a public constructor with a `DbContextOptions<ApplicationDbContext>` parameter. This is the same pattern as used in the traditional ASP.NET Core section above.

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}
```

The `DbContextFactory` factory can then be used in other services through constructor injection. For example:

```csharp
private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

public MyController(IDbContextFactory<ApplicationDbContext> contextFactory)
{
    _contextFactory = contextFactory;
}
```

The injected factory can then be used to construct DbContext instances in the service code. For example:

```csharp
public async Task DoSomething()
{
    using (var context = _contextFactory.CreateDbContext())
    {
        // ...
    }
}
```

Notice that the `DbContext` instances created in this way are **not** managed by the application's service provider and therefore must be disposed by the application.

See ASP.NET Core Blazor Server with Entity Framework Core for more information on using EF Core with Blazor.
