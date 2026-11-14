---
title: "Configuration providers (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/configuration-providers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Configuration providers (part 2 of 2)

## Environment variable configuration provider

Using the default configuration, the `Microsoft.Extensions.Configuration.EnvironmentVariables.EnvironmentVariablesConfigurationProvider` loads configuration from environment variable key-value pairs after reading *appsettings.json*, *appsettings.*`Environment`*.json*, and Secret manager. Therefore, key <example-value> read from the environment override values read from *appsettings.json*, *appsettings.*`Environment`*.json*, and Secret manager.

The `:` delimiter doesn't work with environment variable hierarchical keys on all platforms. For example, the `:` delimiter is not supported by Bash. The double underscore (`__`), which is supported on all platforms, automatically replaces any `:` delimiters in environment variables.

Consider the `TransientFaultHandlingOptions` class:

```csharp
public class TransientFaultHandlingOptions
{
    public bool Enabled { get; set; }
    public TimeSpan AutoRetryDelay { get; set; }
}
```

The following `set` commands set the environment keys and values of `SecretKey` and `TransientFaultHandlingOptions`.

```dotnetcli
set SecretKey="<example-value>"
set TransientFaultHandlingOptions__Enabled="true"
set TransientFaultHandlingOptions__AutoRetryDelay="00:00:13"
```

These environment settings are only set in processes launched from the command window they were set in. They aren't read by web apps launched with Visual Studio.

With Visual Studio 2019 and later, you can specify environment variables using the **Launch Profiles** dialog.

The following setx commands can be used to set the environment keys and values on Windows. Unlike `set`, `setx` settings are persisted. `/M` sets the variable in the system environment. If the `/M` switch isn't used, a user environment variable is set.

```dotnetcli
setx SecretKey "<example-value>" /M
setx TransientFaultHandlingOptions__Enabled "true" /M
setx TransientFaultHandlingOptions__AutoRetryDelay "00:00:05" /M
```

To test that the preceding commands override any *appsettings.json* and *appsettings.*`Environment`*.json* settings:

- With Visual Studio: Exit and restart Visual Studio.
- With the CLI: Start a new command window and enter `dotnet run`.

### Prefixes

To specify a prefix for environment variables, call `Microsoft.Extensions.Configuration.EnvironmentVariablesExtensions.AddEnvironmentVariables*` with a string:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddEnvironmentVariables(prefix: "CustomPrefix_");

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
In the preceding code:

- `config.AddEnvironmentVariables(prefix: "CustomPrefix_")` is added after the default configuration providers. For an example of ordering the configuration providers, see XML configuration provider.
- Environment variables set with the `CustomPrefix_` prefix override the default configuration providers. This includes environment variables without the prefix.

The prefix is stripped off when the configuration key-value pairs are read.

The default configuration loads environment variables and command-line arguments prefixed with `DOTNET_`. The `DOTNET_` prefix is used by .NET for host and app configuration, but not for user configuration.

For more information on host and app configuration, see .NET Generic Host.

### Connection string prefixes

The Configuration API has special processing rules for connection string environment variables. These connection strings are involved in configuring Azure connection strings for the app environment. Environment variables with the prefixes shown in the following tables are loaded into the app with the default configuration or when no prefix is supplied to `AddEnvironmentVariables`.

In .NET 9 and earlier versions, four connection string prefixes are recognized:

| Connection string prefix | Provider                                                                |
|--------------------------|-------------------------------------------------------------------------|
| `CUSTOMCONNSTR_`         | Custom provider                                                         |
| `MYSQLCONNSTR_`          | MySQL                                          |
| `SQLAZURECONNSTR_`       | Azure SQL Database |
| `SQLCONNSTR_`            | SQL Server                      |

Starting in .NET 10, seven additional prefixes are recognized for a total of 11:

| Connection string prefix  | Provider                                                                                |
|---------------------------|-----------------------------------------------------------------------------------------|
| `APIHUBCONNSTR_`          | Azure API hubs                                                                          |
| `CUSTOMCONNSTR_`          | Custom provider                                                                         |
| `DOCDBCONNSTR_`           | Azure Cosmos DB                       |
| `EVENTHUBCONNSTR_`        | Azure Event Hubs                     |
| `MYSQLCONNSTR_`           | MySQL                                                          |
| `NOTIFICATIONHUBCONNSTR_` | Azure Notification Hubs       |
| `POSTGRESQLCONNSTR_`      | PostgreSQL                                                |
| `REDISCACHECONNSTR_`      | Azure Cache for Redis                     |
| `SERVICEBUSCONNSTR_`      | Azure Service Bus                   |
| `SQLAZURECONNSTR_`        | Azure SQL Database                 |
| `SQLCONNSTR_`             | SQL Server                                      |

When an environment variable is discovered and loaded into configuration with any of the recognized prefixes:

- The configuration key is created by removing the environment variable prefix and adding a configuration key <example-value> (`ConnectionStrings`).
- A new configuration key-value pair is created that represents the database connection provider when a provider name is associated with the prefix.

The following table shows the configuration entries produced for each prefix. Prefixes marked _.NET 10+_ are only processed when running on .NET 10 or later.

| Environment variable key                    | Converted configuration key | Provider configuration entry                                                    |
|---------------------------------------------|-----------------------------|---------------------------------------------------------------------------------|
| `APIHUBCONNSTR_{KEY}` _(.NET 10+)_          | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `CUSTOMCONNSTR_{KEY}`                       | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `DOCDBCONNSTR_{KEY}` _(.NET 10+)_           | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `EVENTHUBCONNSTR_{KEY}` _(.NET 10+)_        | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `MYSQLCONNSTR_{KEY}`                        | `ConnectionStrings:{KEY}`   | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `MySql.Data.MySqlClient` |
| `NOTIFICATIONHUBCONNSTR_{KEY}` _(.NET 10+)_ | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `POSTGRESQLCONNSTR_{KEY}` _(.NET 10+)_      | `ConnectionStrings:{KEY}`   | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `Npgsql`                 |
| `REDISCACHECONNSTR_{KEY}` _(.NET 10+)_      | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `SERVICEBUSCONNSTR_{KEY}` _(.NET 10+)_      | `ConnectionStrings:{KEY}`   | Configuration entry not created.                                                |
| `SQLAZURECONNSTR_{KEY}`                     | `ConnectionStrings:{KEY}`   | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `System.Data.SqlClient`  |
| `SQLCONNSTR_{KEY}`                          | `ConnectionStrings:{KEY}`   | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `System.Data.SqlClient`  |

### Environment variables set in launchSettings.json

Environment variables set in *launchSettings.json* override those set in the system environment.

### Azure App Service settings

On Azure App Service, select **Add** on the **Settings** > **Environment variables** page. Azure App Service application settings are:

- Encrypted at rest and transmitted over an encrypted channel.
- Exposed as environment variables.

## Command-line configuration provider

Using the default configuration, the `Microsoft.Extensions.Configuration.CommandLine.CommandLineConfigurationProvider` loads configuration from command-line argument key-value pairs after the following configuration sources:

- *appsettings.json* and *appsettings*.`Environment`.*json* files.
- App secrets (Secret <example-value>) in the `Development` environment.
- Environment variables.

By default, configuration values set on the command line override configuration values set with all the other configuration providers.

With Visual Studio 2019 and later, you can specify command-line arguments using the **Launch Profiles** dialog.

### Command-line arguments

The following command sets keys and values using `=`:

```dotnetcli
dotnet run SecretKey="<example-value>"
```

The following command sets keys and values using `/`:

```dotnetcli
dotnet run /SecretKey "<example-value>"
```

The following command sets keys and values using `--`:

```dotnetcli
dotnet run --SecretKey "<example-value>"
```

The key value:

- Must follow `=`, or the key must have a prefix of `--` or `/` when the value follows a space.
- Isn't required if `=` is used. For example, `SomeKey=`.

Within the same command, don't mix command-line argument key-value pairs that use `=` with key-value pairs that use a space.

## Key-per-file configuration provider

The `Microsoft.Extensions.Configuration.KeyPerFile.KeyPerFileConfigurationProvider` uses a directory's files as configuration key-value pairs. The key is the file name. The value is the file's contents. The Key-per-file configuration provider is used in Docker hosting scenarios.

To activate key-per-file configuration, call the `Microsoft.Extensions.Configuration.KeyPerFileConfigurationBuilderExtensions.AddKeyPerFile*` extension method on an instance of `Microsoft.Extensions.Configuration.ConfigurationBuilder`. The `directoryPath` to the files must be an absolute path.

Overloads permit specifying:

- An `Action<KeyPerFileConfigurationSource>` delegate that configures the source.
- Whether the directory is optional and the path to the directory.

The double-underscore (`__`) is used as a configuration key <example-value> in file names. For example, the file name `Logging__LogLevel__System` produces the configuration key `Logging:LogLevel:System`.

Call `ConfigureAppConfiguration` when building the host to specify the app's configuration:

```csharp
.ConfigureAppConfiguration((_, configuration) =>
{
    var path = Path.Combine(
        Directory.GetCurrentDirectory(), "path/to/files");

    configuration.AddKeyPerFile(directoryPath: path, optional: true);
})
```

## Memory configuration provider

The `Microsoft.Extensions.Configuration.Memory.MemoryConfigurationProvider` uses an in-memory collection as configuration key-value pairs.

The following code adds a memory collection to the configuration system:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddInMemoryCollection(
    new Dictionary<string, string?>
    {
        ["<example-value>"] = "<example-value>",
        ["TransientFaultHandlingOptions:Enabled"] = bool.TrueString,
        ["TransientFaultHandlingOptions:AutoRetryDelay"] = "00:00:07",
        ["Logging:LogLevel:Default"] = "Warning"
    });

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
In the preceding code, `Microsoft.Extensions.Configuration.MemoryConfigurationBuilderExtensions.AddInMemoryCollection(Microsoft.Extensions.Configuration.IConfigurationBuilder,System.Collections.Generic.IEnumerable{System.Collections.Generic.KeyValuePair{System.String,System.String}})` adds the memory provider after the default configuration providers. For an example of ordering the configuration providers, see XML configuration provider.

## See also

- Configuration in .NET
- .NET Generic Host
- Implement a custom configuration provider
