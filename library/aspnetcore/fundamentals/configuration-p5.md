---
title: "Configuration in ASP.NET Core (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configuration in ASP.NET Core (part 5 of 5)

## Custom configuration provider

The sample app demonstrates how to create a basic <example-value> provider that reads configuration key-value pairs from a database using Entity Framework (EF).

The provider has the following characteristics:

* The EF in-memory database is used for demonstration purposes. To use a database that requires a connection string, implement a secondary `Microsoft.Extensions.Configuration.ConfigurationBuilder` to supply the connection string from another configuration provider.
* The provider reads a database table into configuration at startup. The provider doesn't query the database on a per-key basis.
* Reload-on-change isn't implemented, so updating the database after the app starts has no effect on the app's configuration.

Define an `EFConfigurationValue` entity for storing configuration values in the database.

`Models/EFConfigurationValue.cs`:

```csharp
public class EFConfigurationValue
{
    public string Id { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}
```

Add an `EFConfigurationContext` to store and access the configured values.

`EFConfigurationProvider/EFConfigurationContext.cs`:

```csharp
public class EFConfigurationContext : DbContext
{
    public EFConfigurationContext(
        DbContextOptions<EFConfigurationContext> options) : base(options)
    {
    }

    public DbSet<EFConfigurationValue> Values => Set<EFConfigurationValue>();
}
```

Create a class that implements `Microsoft.Extensions.Configuration.IConfigurationSource`.

`EFConfigurationProvider/EFConfigurationSource.cs`:

```csharp
public class EFConfigurationSource : IConfigurationSource
{
    private readonly Action<DbContextOptionsBuilder> _optionsAction;

    public EFConfigurationSource(Action<DbContextOptionsBuilder> optionsAction) => 
        _optionsAction = optionsAction;

    public IConfigurationProvider Build(IConfigurationBuilder builder) => 
        new EFConfigurationProvider(_optionsAction);
}
```

Create the custom configuration provider by inheriting from `Microsoft.Extensions.Configuration.ConfigurationProvider`. The configuration provider initializes the database when it's empty. Since configuration keys are case-insensitive, the dictionary used to initialize the database is created with the case-insensitive comparer, `System.StringComparer.OrdinalIgnoreCase`.

`EFConfigurationProvider/EFConfigurationProvider.cs`:

```csharp
using Microsoft.EntityFrameworkCore;

public class EFConfigurationProvider(Action<DbContextOptionsBuilder> optionsAction) : ConfigurationProvider
{
    public override void Load()
    {
        var builder = new DbContextOptionsBuilder<EFConfigurationContext>();

        optionsAction(builder);

        using var dbContext = new EFConfigurationContext(builder.Options);

        if (dbContext == null || dbContext.Values == null)
        {
            throw new Exception("Null DB context");
        }

        dbContext.Database.EnsureCreated();

        Data = !dbContext.Values.Any()
            ? CreateAndSaveDefaultValues(dbContext)
            : dbContext.Values.ToDictionary(c => c.Id, c => c.Value);
    }

    private static Dictionary<string, string> CreateAndSaveDefaultValues(
        EFConfigurationContext dbContext)
    {
        // Quotes (c)2005 Universal Pictures: Serenity
        // https://www.uphe.com/movies/serenity-2005
        var configValues =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "quote1", "I aim to misbehave." },
                { "quote2", "I swallowed a bug." },
                { "quote3", "You can't stop the signal, Mal." }
            };

        if (dbContext == null || dbContext.Values == null)
        {
            throw new Exception("Null DB context");
        }

        dbContext.Values.AddRange(configValues
            .Select(kvp => new EFConfigurationValue
            {
                Id = kvp.Key,
                Value = kvp.Value
            })
            .ToArray());

        dbContext.SaveChanges();

        return configValues;
    }
}
```

An `AddEFConfiguration` extension method permits adding the configuration source to a `Microsoft.Extensions.Configuration.ConfigurationBuilder`.

`Extensions/EntityFrameworkExtensions.cs`:

```csharp
public static class EntityFrameworkExtensions
{
    public static IConfigurationBuilder AddEFConfiguration(
        this IConfigurationBuilder builder,
        Action<DbContextOptionsBuilder> optionsAction)
    {
        return builder.Add(new EFConfigurationSource(optionsAction));
    }
}
```

The following code shows how to use the custom `EFConfigurationProvider` in the app's `Program` file:

```csharp
builder.Configuration.AddEFConfiguration(
    opt => opt.UseInMemoryDatabase("InMemoryDb"));
```

## Add configuration from an external assembly

An `Microsoft.AspNetCore.Hosting.IHostingStartup` implementation allows adding enhancements to an app at startup from an external assembly outside of the app's `Startup` class. For more information, see Use hosting startup assemblies in ASP.NET Core.

## Configuration-binding source generator

The Configuration-binding source generator provides AOT and trim-friendly configuration. For more information, see Configuration-binding source generator.

## Related content

* ASP.NET Core Blazor configuration
* Configuration source code
* View or download sample code (how to download)
* Options pattern in ASP.NET Core
