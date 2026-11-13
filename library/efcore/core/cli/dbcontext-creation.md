---
title: "Design-time DbContext Creation - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/cli/dbcontext-creation.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Design-time DbContext Creation

Some of the EF Core Tools commands (for example, the Migrations commands) require a derived `DbContext` instance to be created at design time in order to gather details about the application's entity types and how they map to a database schema. In most cases, it is desirable that the `DbContext` thereby created is configured in a similar way to how it would be configured at run time.

There are various ways the tools try to create the `DbContext`. If an `IDesignTimeDbContextFactory<TContext>` is found, the tools use it instead of the other creation patterns. A design-time factory is the recommended pattern for a separate migrations project and for applications whose startup project is platform-specific.

## From application services

If your startup project uses the ASP.NET Core Web Host or .NET Core Generic Host, the tools try to obtain the DbContext object from the application's service provider.

The tools first try to obtain the service provider by invoking `Program.CreateHostBuilder()`, calling `Build()`, then accessing the `Services` property.

```csharp
public class Program
{
    public static void Main(string[] args)
        => CreateHostBuilder(args).Build().Run();

    // EF Core uses this method at design time to access the DbContext
    public static IHostBuilder CreateHostBuilder(string[] args)
        => Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(
                webBuilder => webBuilder.UseStartup<Startup>());
}

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
        => services.AddDbContext<ApplicationDbContext>();

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
    }
}

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}
```

> **Note:**
> When you create a new ASP.NET Core application, this hook is included by default.

The `DbContext` itself and any dependencies in its constructor need to be registered as services in the application's service provider. This can be easily achieved by having a constructor on the `DbContext` that takes an instance of `DbContextOptions<TContext>` as an argument and using the `AddDbContext<TContext>` method.

## Using a constructor with no parameters

If the DbContext can't be obtained from the application service provider, the tools look for the derived `DbContext` type inside the project. Then they try to create an instance using a constructor with no parameters. This can be the default constructor if the `DbContext` is configured using the `OnConfiguring` method.

## From a design-time factory

You can also tell the tools how to create your DbContext by implementing the `Microsoft.EntityFrameworkCore.Design.IDesignTimeDbContextFactory`1` interface: If a class implementing this interface is found in either the same project as the derived `DbContext` or in the application's startup project, the tools bypass the other ways of creating the DbContext and use the design-time factory instead.

```csharp
public class BloggingContextFactory : IDesignTimeDbContextFactory<BloggingContext>
{
    public BloggingContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<BloggingContext>();
        optionsBuilder.UseSqlite("Data Source=blog.db");

        return new BloggingContext(optionsBuilder.Options);
    }
}
```

A design-time factory can be especially useful if the context constructor has dependencies that aren't registered in DI, if you aren't using DI, or if the application startup project can't be executed by the tools.

Configure the same provider, model options, and migrations assembly at design time that the application uses at run time. Otherwise, the tools can scaffold migrations for a model that differs from the model used by the application. Don't assume that an optional command-line argument is present; validate arguments and provide a suitable development default or configuration source.

## Args

Both `Microsoft.EntityFrameworkCore.Design.IDesignTimeDbContextFactory`1.CreateDbContext*` and `Program.CreateHostBuilder` accept command line arguments.

You can specify these arguments from the tools:

### .NET CLI

```dotnetcli
dotnet ef database update -- --environment Production
```

The `--` token directs `dotnet ef` to treat everything that follows as an argument and not try to parse them as options. Any extra arguments not used by `dotnet ef` are forwarded to the app.

### Visual Studio

```powershell
Update-Database -Args '--environment Production'
```

***
