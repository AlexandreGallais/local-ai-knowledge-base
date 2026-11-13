---
title: "ASP.NET Core runtime environments (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/environments.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core runtime environments (part 2 of 2)

## Access the environment from a `Startup` class

Use of a `Startup` class (`Startup.cs`) with `Configure` and `ConfigureServices` methods was required before the release of .NET 6 and remains supported.

Inject `Microsoft.AspNetCore.Hosting.IWebHostEnvironment` into the `Startup` constructor to control code execution. This approach is useful when the app requires configuring startup code for only a few environments with minimal code differences per environment.

In the following example, the environment is held in the `_env` field and controls code execution based on the app's environment:

```csharp
public class Startup
{
    private readonly IWebHostEnvironment _env;

    public Startup(IWebHostEnvironment env)
    {
        _env = env;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        if (_env.IsDevelopment())
        {
            ...
        }
        else if (_env.IsStaging())
        {
            ...
        }
        else
        {
            ...
        }
    }

    public void Configure(IApplicationBuilder app)
    {
        if (_env.IsDevelopment())
        {
            ...
        }
        else
        {
            ...
        }

        ...
    }
}
```

## Environment-specific `Startup` class

An app can define multiple `Startup` classes for different environments with the naming convention `Startup{EnvironmentName}` class, where the `{ENVIRONMENT NAME}` placeholder is the environment name.

The class whose name suffix matches the current environment is prioritized. If a matching `Startup{EnvironmentName}` class isn't found, the `Startup` class is used.

To implement environment-based `Startup` classes, create as many `Startup{EnvironmentName}` classes as needed and a fallback `Startup` class:

```csharp
public class StartupDevelopment
{
    ...
}

public class StartupProduction
{
    ...
}

public class Startup
{
    ...
}
```

Where the host builder is created, call `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseStartup*`, which accepts an assembly name to load the correct `Startup` class:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args)
{
    var assemblyName = typeof(Startup).GetTypeInfo().Assembly.FullName;

    return Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup(assemblyName);
        });
}
```

## Environment-specific `Startup` class methods

The `Configure` and `ConfigureServices` methods support environment-specific versions of the form `Configure{ENVIRONMENT NAME}` and `Configure{ENVIRONMENT NAME}Services`, where the `{ENVIRONMENT NAME}` placeholder is the environment name. If a matching environment name isn't found for the named methods, the `ConfigureServices` or `Configure` method is used, respectively.

```csharp
public void ConfigureDevelopmentServices(IServiceCollection services)
{
    ...
}

public void ConfigureStagingServices(IServiceCollection services)
{
    ...
}

public void ConfigureProductionServices(IServiceCollection services)
{
    ...
}

public void ConfigureServices(IServiceCollection services)
{
    ...
}
```

## Related content

* View or download sample code (how to download)
* App startup in ASP.NET Core
* Configuration in ASP.NET Core
* ASP.NET Core Blazor environments
