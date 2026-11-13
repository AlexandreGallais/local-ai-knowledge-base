---
title: "Configuration in ASP.NET Core (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configuration in ASP.NET Core (part 2 of 5)

## How hierarchical configuration data is organized

The Configuration API reads hierarchical configuration data by flattening the hierarchical data with the use of a delimiter in the configuration keys, which are usually colons (`:`). Double underscores (`__`) are usually used with environment variable configuration for cross-platform support.

> **Note:**
> In complex app configuration scenarios, it's best to group and read related hierarchical configuration data using the options pattern.

Consider the following hierarchical configuration data:

* :::no-loc text="ConnectionStrings":::
  * :::no-loc text="DefaultConnection (Value = 'Data Source=LocalSqlServer\\MSSQLDev;')":::
* :::no-loc text="Logging":::
  * :::no-loc text="LogLevel":::
    * :::no-loc text="Default (Value = 'Information')":::
    * :::no-loc text="Microsoft (Value = 'Warning')":::
    * :::no-loc text="Microsoft.Hosting.Lifetime (Value = 'Information')":::
* :::no-loc text="AllowedHosts (Value = '*')":::

The following table displays the keys used to recover the values in the preceding configuration data. The delimiter isn't required for :::no-loc text="AllowedHosts":::.

Key (colon delimiter) | Key (double-underscore delimiter)
--- | ---
`ConnectionStrings:DefaultConnection` | `ConnectionStrings__DefaultConnection`
`Logging:LogLevel:Default` | `Logging__LogLevel__Default`
`Logging:LogLevel:Microsoft` | `Logging__LogLevel__Microsoft`
`Logging:LogLevel:Microsoft.Hosting.Lifetime` | `Logging__LogLevel__Microsoft.Hosting.Lifetime`
`AllowedHosts` | `AllowedHosts`

> **Note:**
> In complex app configuration scenarios, we recommend grouping and reading related hierarchical configuration data using the Options pattern.

`Microsoft.Extensions.Configuration.ConfigurationSection.GetSection*` and `Microsoft.Extensions.Configuration.IConfiguration.GetChildren*` methods are available to isolate sections and children of a section in the configuration data. These methods are described where `GetSection`, `GetChildren`, and `Exists` are covered.

When the element structure includes an array, the array index should be treated as an additional element name in the path. Consider the following hierarchical configuration data as an array.

:::no-loc text="MainObject"::: (an array):

* First item in the array
  * :::no-loc text="Object0":::
  * :::no-loc text="Object1":::
    * :::no-loc text="SubObject0":::
    * :::no-loc text="SubObject1":::
* Second item in the array
  * :::no-loc text="Object0":::
  * :::no-loc text="Object1":::
    * :::no-loc text="SubObject0":::
    * :::no-loc text="SubObject1":::

Keys with colon separators:

* :::no-loc text="MainObject:0:Object0":::
* :::no-loc text="MainObject:0:Object1:SubObject0":::
* :::no-loc text="MainObject:0:Object1:SubObject1":::
* :::no-loc text="MainObject:1:Object0":::
* :::no-loc text="MainObject:1:Object1:SubObject0":::
* :::no-loc text="MainObject:1:Object1:SubObject1":::

Keys with underscore separators, which is recommended for cross-platform compatibility when configuration is provided by environment variables:

* :::no-loc text="MainObject__0__Object0":::
* :::no-loc text="MainObject__0__Object1:SubObject0":::
* :::no-loc text="MainObject__0__Object1:SubObject1":::
* :::no-loc text="MainObject__1__Object0":::
* :::no-loc text="MainObject__1__Object1:SubObject0":::
* :::no-loc text="MainObject__1__Object1:SubObject1":::

Because configuration that comes from arrays is flattened and numbered sequentially for each configuration source that an app uses, values can be unexpectedly overwritten if care isn't taken when structuring and reading the data from multiple sources. Consider the following configuration key-value pairs:

:::no-loc text="Modules"::: values (an array):

* :::no-loc text="Module1":::
* :::no-loc text="Module2":::
* :::no-loc text="Module3":::

The array is flattened and indexed sequentially yielding the configuration key-value pairs in the following table.

Key | Value
--- | ---
`Modules:0` | `Module1`
`Modules:1` | `Module2`
`Modules:2` | `Module3`

After the preceding configuration is established, another configuration source loads the following configuration:

:::no-loc text="Modules"::: values (an array):

* :::no-loc text="Module4":::
* :::no-loc text="Module5":::

This array is also flattened and indexed sequentially.

Key | Value
--- | ---
`Modules:0` | `Module4`
`Modules:1` | `Module5`

Recalling that the last configuration source for a given key sets the value of that key, the final set of configuration key-value pairs are shown in the following table.

Key | Value
--- | ---
`Modules:0` | `Module4`
`Modules:1` | `Module5`
`Modules:2` | `Module3`

This isn't a surprising result given how the framework flattens and indexes array data from configuration sources, but it should be kept in mind to avoid unexpected overwrites.

To avoid such overwrites, structure array indexing to match across various configuration sources that provide the same array data. Alternatively, a workaround approach is to delimit array values in a string value of a single key-value pair, for example using a comma, semicolon, or pipe as the delimiter. Write custom code to split the string and assign the delimited values to your array.

## Configuration providers

The following table shows the configuration providers available to ASP.NET Core apps.

Provider | Provides configuration from…
--- | ---
Azure Key Vault Configuration Provider | Azure Key Vault
Azure App Configuration Provider | Azure App Configuration
Command-line Configuration Provider | Command-line parameters
Custom configuration provider | Custom source
Environment Variables Configuration Provider | Environment variables
File Configuration Provider | INI, JSON, and XML files
Key-Per-File Configuration Provider | Directory files
Memory Configuration Provider | In-memory collections
User secrets | File in the user profile directory

Configuration sources are read in the order that their configuration providers are specified. Order configuration providers in code to suit the priorities for the underlying configuration sources that the app requires.

A typical sequence of configuration providers is:

1. General app settings via `appsettings.json`.
1. Environmental app settings via `appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's environment (examples: `Development`, `Production`).
1. User secrets.
1. Environment variables using the Environment Variables Configuration Provider.
1. Command-line arguments using the Command-line Configuration Provider.

A common practice is to add the Command-line Configuration Provider last in a series of providers to allow command-line arguments to override configuration set by the other providers.

The preceding sequence of providers is used in the default configuration.

To inspect the app's configuration providers, inject `Microsoft.Extensions.Configuration.IConfiguration`, cast it to `Microsoft.Extensions.Configuration.IConfigurationRoot`, and read the `Microsoft.Extensions.Configuration.IConfigurationRoot.Providers` property.

In the following `ConfigurationProviders` Razor component displays the enabled configuration providers in the order that they're added to the app.

`Pages/ConfigurationProviders.razor`:

```razor
@page "/configuration-providers"
@inject IConfiguration Config

<h1>Configuration Providers</h1>

@if (ConfigRoot is not null)
{
    <ul>
        @foreach (var provider in ConfigRoot.Providers)
        {
            <li>@provider</li>
        }
    </ul>
}

@code {
    private IConfigurationRoot? ConfigRoot;

    protected override void OnInitialized()
    {
        ConfigRoot = (IConfigurationRoot)Config;
    }
}
```

The preceding Razor component produces the following output, where the `{APP NAMESPACE}` placeholder is the app's namespace:

> :::no-loc text="MemoryConfigurationProvider":::
> :::no-loc text="EnvironmentVariablesConfigurationProvider Prefix: 'ASPNETCORE_'":::
> :::no-loc text="MemoryConfigurationProvider":::
> :::no-loc text="EnvironmentVariablesConfigurationProvider Prefix: 'DOTNET_'":::
> :::no-loc text="JsonConfigurationProvider for 'appsettings.json' (Optional)":::
> :::no-loc text="JsonConfigurationProvider for 'appsettings.Development.json' (Optional)":::
> :::no-loc text="JsonConfigurationProvider for '{APP NAMESPACE}.settings.json' (Optional)":::
> :::no-loc text="JsonConfigurationProvider for '{APP NAMESPACE}.settings.Development.json' (Optional)":::
> :::no-loc text="EnvironmentVariablesConfigurationProvider":::
> :::no-loc text="Microsoft.Extensions.Configuration.ChainedConfigurationProvider":::

In the Default app configuration sources section earlier in this article, configuration sources are listed from highest to lowest priority. The preceding `ConfigurationProviders` component displays the sources *in the order that the app reads them*. For example, the JSON Configuration Provider for the non-environmental app settings file (`appsettings.json`) is earlier in the preceding list because it's added before the provider for the Development environment app settings file (`appsettings.Development.json`). The configuration providers are executed from the top of the list to the bottom of the list. For a matching configuration key between the two app settings JSON Configuration Providers, the last setting takes precedence, which is the value from `appsettings.Development.json`.

## App settings file configuration (`appsettings.json`, `appsettings.{ENVIRONMENT}.json`)

Read configuration loaded from app settings files using the JSON Configuration Provider.

Consider the following `appsettings.json` file:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=LocalSqlServer\\MSSQLDev;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

Inject an instance of `Microsoft.Extensions.Configuration.IConfiguration` to read configuration values.

The following `AppSettingsConfiguration` Razor component reads the default database connection string and default logging level configuration. `Microsoft.Extensions.Configuration.IConfiguration` is injected at the top of the component and used to read configuration values. A colon (`:`) separator is used in string-typed configuration keys to locate the appropriate JSON properties. For example, the JSON structure for the default connection string (`DefaultConnection`) object is nested under the connection strings (`ConnectionStrings`) object, so the string notation to access the default connection string uses a colon to separate `DefaultConnection` and `ConnectionStrings` in the order that the objects appear in the app settings file: `ConnectionStrings:DefaultConnection`.

`Pages/AppSettingsConfiguration.razor`:

```razor
@page "/app-settings-configuration"
@inject IConfiguration Config

<h1>App Settings Configuration</h1>

<ul>
    <li>Default Connection String: @Config["ConnectionStrings:DefaultConnection"]
    <li>Default Log Level: @Config["Logging:LogLevel:Default"]
</ul>
```

The same approach is taken in a Razor Pages page model:

```cshtml
using Microsoft.Extensions.Configuration;

...

public class AppSettingsPageModel(IConfiguration config) : PageModel
{
    public ContentResult OnGet()
    {
        var defaultConnectionString = config["ConnectionStrings:DefaultConnection"];
        var defaultLogLevel = config["Logging:LogLevel:Default"];

        return Content(
            $"Default Connection String: {defaultConnectionString}\n" +
            $"Default Log Level: {defaultLogLevel}");
    }
}
```

The default `Microsoft.Extensions.Configuration.Json.JsonConfigurationProvider` instances load configuration in the following order:

1. `appsettings.json`
1. `appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's environment (examples: `appsettings.Production.json`, `appsettings.Development.json`). The environment version of the file is loaded based on the `Microsoft.Extensions.Hosting.IHostingEnvironment.EnvironmentName`.

`appsettings.{ENVIRONMENT}.json` values override keys in `appsettings.json`.

By default:

* In the Development environment, `appsettings.Development.json` configuration overwrites values found in `appsettings.json`.
* In the Production environment, `appsettings.Production.json` configuration overwrites values found in `appsettings.json`.

The preceding example only reads strings and doesn't support a default value. If a configuration value must be guaranteed with a default value, see the Extract a single value from configuration with type conversion (`GetValue`) section.

Using the default app configuration sources, the `appsettings.json` and `appsettings.{ENVIRONMENT}.json` files are enabled with `reloadOnChange` set to `true`, which means that changes made to either the `appsettings.json` or `appsettings.{ENVIRONMENT}.json` files after the app starts take effect immediately after the file is saved.

Comments in `appsettings.json` and `appsettings.{ENVIRONMENT}.json` files are supported using JavaScript or C# style comments. Some integrated development environments (IDEs) display errors when editing a JSON file that contains comments because the official JSON specification (RFC 7159) makes no allowance for comments in JSON files. You can generally ignore comment errors and warnings, but you can also usually disable warnings or errors with a setting in the IDE. In Visual Studio Code, for example, add the following to the `settings.json` file to disable the errors:

```json
"files.associations": {
  "appsettings*.json": "jsonc"
}
```

The preceding setting indicates to VS Code that app settings files, including environmental-based files, are associated with the JSONC ("JSON with Comments") file format, which supports comments.

For other IDEs, check the IDE's documentation and product support channels to determine how to silence errors or warnings about comments in JSON files.
