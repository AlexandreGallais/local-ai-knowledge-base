---
title: "Use hosting startup assemblies in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/platform-specific-configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use hosting startup assemblies in ASP.NET Core

-->
-->

By Pavel Krymets

An `Microsoft.AspNetCore.Hosting.IHostingStartup` (hosting startup) implementation adds enhancements to an app at startup from an external assembly. For example, an external library can use a hosting startup implementation to provide additional configuration providers or services to an app.

View or download sample code (how to download)

## HostingStartup attribute

A HostingStartup attribute indicates the presence of a hosting startup assembly to activate at runtime.

The entry assembly or the assembly containing the `Startup` class is automatically scanned for the `HostingStartup` attribute. The list of assemblies to search for `HostingStartup` attributes is loaded at runtime from configuration in the WebHostDefaults.HostingStartupAssembliesKey. The list of assemblies to exclude from discovery is loaded from the WebHostDefaults.HostingStartupExcludeAssembliesKey.

In the following example, the namespace of the hosting startup assembly is `StartupEnhancement`. The class containing the hosting startup code is `StartupEnhancementHostingStartup`:

```csharp
[assembly: HostingStartup(typeof(StartupEnhancement.StartupEnhancementHostingStartup))]
```

The `HostingStartup` attribute is typically located in the hosting startup assembly's `IHostingStartup` implementation class file.

## Discover loaded hosting startup assemblies

To discover loaded hosting startup assemblies, enable logging and check the app's logs. Errors that occur when loading assemblies are logged. Loaded hosting startup assemblies are logged at the Debug level, and all errors are logged.

## Disable automatic loading of hosting startup assemblies

To disable automatic loading of hosting startup assemblies, use one of the following approaches:

* To prevent all hosting startup assemblies from loading, set one of the following to `true` or `1`:

  * Prevent Hosting Startup host configuration setting:

    ```csharp
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseSetting(
                        WebHostDefaults.PreventHostingStartupKey, "true")
                    .UseStartup<Startup>();
            });
    ```

  * `ASPNETCORE_PREVENTHOSTINGSTARTUP` environment variable.

* To prevent specific hosting startup assemblies from loading, set one of the following to a semicolon-delimited string of hosting startup assemblies to exclude at startup:

  * Hosting Startup Exclude Assemblies host configuration setting:

    ```csharp
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseSetting(
                        WebHostDefaults.HostingStartupExcludeAssembliesKey, 
                        "{ASSEMBLY1;ASSEMBLY2; ...}")
                    .UseStartup<Startup>();
            });
    ```

    The `{ASSEMBLY1;ASSEMBLY2; ...}` placeholder represents the semicolon-separated list of assemblies.

  * `ASPNETCORE_HOSTINGSTARTUPEXCLUDEASSEMBLIES` environment variable.

If both the host configuration setting and the environment variable are set, the host setting controls the behavior.

Disabling hosting startup assemblies using the host setting or environment variable disables the assembly globally and may disable several characteristics of an app.

## Project

Create a hosting startup with either of the following project types:

* Class library
* Console app without an entry point

### Class library

A hosting startup enhancement can be provided in a class library. The library contains a `HostingStartup` attribute.

The sample code includes a Razor Pages app, *HostingStartupApp*, and a class library, *HostingStartupLibrary*. The class library:

* Contains a hosting startup class, `ServiceKeyInjection`, which implements `IHostingStartup`. `ServiceKeyInjection` adds a pair of service strings to the app's configuration using the in-memory configuration provider (AddInMemoryCollection).
* Includes a `HostingStartup` attribute that identifies the hosting startup's namespace and class.

The `ServiceKeyInjection` class's `Microsoft.AspNetCore.Hosting.IHostingStartup.Configure*` method uses an `Microsoft.AspNetCore.Hosting.IWebHostBuilder` to add enhancements to an app.

`HostingStartupLibrary/ServiceKeyInjection.cs`:

```csharp
[assembly: HostingStartup(typeof(HostingStartupLibrary.ServiceKeyInjection))]

namespace HostingStartupLibrary
{
    public class ServiceKeyInjection : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration(config =>
            {
                var dict = new Dictionary<string, string>
                {
                    {"DevAccount_FromLibrary", "DEV_1111111-1111"},
                    {"ProdAccount_FromLibrary", "PROD_2222222-2222"}
                };

                config.AddInMemoryCollection(dict);
            });
        }
    }
}
```

The app's Index page reads and renders the configuration values for the two keys set by the class library's hosting startup assembly:

`HostingStartupApp/Pages/Index.cshtml.cs`:

```csharp
public class IndexModel : PageModel
{
    public IndexModel(IConfiguration config)
    {
        ServiceKey_Development_Library = config["DevAccount_FromLibrary"];
        ServiceKey_Production_Library = config["ProdAccount_FromLibrary"];
        ServiceKey_Development_Package = config["DevAccount_FromPackage"];
        ServiceKey_Production_Package = config["ProdAccount_FromPackage"];
    }

    public string ServiceKey_Development_Library { get; private set; }
    public string ServiceKey_Production_Library { get; private set; }
    public string ServiceKey_Development_Package { get; private set; }
    public string ServiceKey_Production_Package { get; private set; }

    public void OnGet()
    {
    }
}
```

The sample code also includes a NuGet package project that provides a separate hosting startup, *HostingStartupPackage*. The package has the same characteristics of the class library described earlier. The package:

* Contains a hosting startup class, `ServiceKeyInjection`, which implements `IHostingStartup`. `ServiceKeyInjection` adds a pair of service strings to the app's configuration.
* Includes a `HostingStartup` attribute.

`HostingStartupPackage/ServiceKeyInjection.cs`:

```csharp
[assembly: HostingStartup(typeof(HostingStartupPackage.ServiceKeyInjection))]

namespace HostingStartupPackage
{
    public class ServiceKeyInjection : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration(config =>
            {
                var dict = new Dictionary<string, string>
                {
                    {"DevAccount_FromPackage", "DEV_3333333-3333"},
                    {"ProdAccount_FromPackage", "PROD_4444444-4444"}
                };

                config.AddInMemoryCollection(dict);
            });
        }
    }
}
```

The app's Index page reads and renders the configuration values for the two keys set by the package's hosting startup assembly:

`HostingStartupApp/Pages/Index.cshtml.cs`:

```csharp
public class IndexModel : PageModel
{
    public IndexModel(IConfiguration config)
    {
        ServiceKey_Development_Library = config["DevAccount_FromLibrary"];
        ServiceKey_Production_Library = config["ProdAccount_FromLibrary"];
        ServiceKey_Development_Package = config["DevAccount_FromPackage"];
        ServiceKey_Production_Package = config["ProdAccount_FromPackage"];
    }

    public string ServiceKey_Development_Library { get; private set; }
    public string ServiceKey_Production_Library { get; private set; }
    public string ServiceKey_Development_Package { get; private set; }
    public string ServiceKey_Production_Package { get; private set; }

    public void OnGet()
    {
    }
}
```

### Console app without an entry point

*This approach is only available for .NET apps, not .NET Framework.*

A dynamic hosting startup enhancement that doesn't require a compile-time reference for activation can be provided in a console app without an entry point that contains a `HostingStartup` attribute. Publishing the console app produces a hosting startup assembly that can be consumed from the runtime store.

A console app without an entry point is used in this process because:

* A dependencies file is required to consume the hosting startup in the hosting startup assembly. A dependencies file is a runnable app asset that's produced by publishing an app, not a library.
* A library can't be added directly to the runtime package store, which requires a runnable project that targets the shared runtime.

In the creation of a dynamic hosting startup:

* A hosting startup assembly is created from the console app without an entry point that:
  * Includes a class that contains the `IHostingStartup` implementation.
  * Includes a HostingStartup attribute to identify the `IHostingStartup` implementation class.
* The console app is published to obtain the hosting startup's dependencies. A consequence of publishing the console app is that unused dependencies are trimmed from the dependencies file.
* The dependencies file is modified to set the runtime location of the hosting startup assembly.
* The hosting startup assembly and its dependencies file is placed into the runtime package store. To discover the hosting startup assembly and its dependencies file, they're listed in a pair of environment variables.

The console app references the Microsoft.AspNetCore.Hosting.Abstractions package:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Hosting.Abstractions" 
                      Version="3.0.0" />
  </ItemGroup>

</Project>
```

A HostingStartup attribute identifies a class as an implementation of `IHostingStartup` for loading and execution when building the `Microsoft.AspNetCore.Hosting.IWebHost`. In the following example, the namespace is `StartupEnhancement`, and the class is `StartupEnhancementHostingStartup`:

```csharp
[assembly: HostingStartup(typeof(StartupEnhancement.StartupEnhancementHostingStartup))]
```

A class implements `IHostingStartup`. The class's `Microsoft.AspNetCore.Hosting.IHostingStartup.Configure*` method uses an `Microsoft.AspNetCore.Hosting.IWebHostBuilder` to add enhancements to an app. `IHostingStartup.Configure` in the hosting startup assembly is called by the runtime before `Startup.Configure` in user code, which allows user code to overwrite any configuration provided by the hosting startup assembly.

```csharp
namespace StartupEnhancement
{
    public class StartupEnhancementHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            // Use the IWebHostBuilder to add app enhancements.
        }
    }
}
```

When building an `IHostingStartup` project, the dependencies file (`.deps.json`) sets the `runtime` location of the assembly to the *bin* folder:

```json
"targets": {
  ".NETCoreApp,Version=v3.0": {
    "StartupEnhancement/1.0.0": {
      "dependencies": {
        "Microsoft.AspNetCore.Hosting.Abstractions": "3.0.0"
      },
      "runtime": {
        "StartupEnhancement.dll": {}
      }
    }
  }
}
```

Only part of the file is shown. The assembly name in the example is `StartupEnhancement`.

## Configuration provided by the hosting startup

There are two approaches to handling configuration depending on whether you want the hosting startup's configuration to take precedence or the app's configuration to take precedence:

1. Provide configuration to the app using `Microsoft.AspNetCore.Hosting.WebHostBuilder.ConfigureAppConfiguration*` to load the configuration after the app's `Microsoft.AspNetCore.Hosting.WebHostBuilder.ConfigureAppConfiguration*` delegates execute. Hosting startup configuration takes priority over the app's configuration using this approach.
1. Provide configuration to the app using `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseConfiguration*` to load the configuration before the app's `Microsoft.AspNetCore.Hosting.WebHostBuilder.ConfigureAppConfiguration*` delegates execute. The app's configuration values take priority over those provided by the hosting startup using this approach.

```csharp
public class ConfigurationInjection : IHostingStartup
{
    public void Configure(IWebHostBuilder builder)
    {
        Dictionary<string, string> dict;

        builder.ConfigureAppConfiguration(config =>
        {
            dict = new Dictionary<string, string>
            {
                {"ConfigurationKey1", 
                    "From IHostingStartup: Higher priority " +
                    "than the app's configuration."},
            };

            config.AddInMemoryCollection(dict);
        });

        dict = new Dictionary<string, string>
        {
            {"ConfigurationKey2", 
                "From IHostingStartup: Lower priority " +
                "than the app's configuration."},
        };

        var builtConfig = new ConfigurationBuilder()
            .AddInMemoryCollection(dict)
            .Build();

        builder.UseConfiguration(builtConfig);
    }
}
```

## Specify the hosting startup assembly

For either a class library- or console app-supplied hosting startup, specify the hosting startup assembly's name in the `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES` environment variable. The environment variable is a semicolon-delimited list of assemblies.

Only hosting startup assemblies are scanned for the `HostingStartup` attribute. For the sample app, *HostingStartupApp*, to discover the hosting startups described earlier, the environment variable is set to the following value:

```
HostingStartupLibrary;HostingStartupPackage;StartupDiagnostics
```

A hosting startup assembly can also be set using the Hosting Startup Assemblies host configuration setting:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseSetting(
                    WebHostDefaults.HostingStartupAssembliesKey, 
                    "{ASSEMBLY1;ASSEMBLY2; ...}")
                .UseStartup<Startup>();
        });
```

The `{ASSEMBLY1;ASSEMBLY2; ...}` placeholder represents the semicolon-separated list of assemblies.

When multiple hosting startup assembles are present, their `Microsoft.AspNetCore.Hosting.IHostingStartup.Configure*` methods are executed in the order that the assemblies are listed.
