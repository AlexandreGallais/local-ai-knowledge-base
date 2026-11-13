---
title: "Configuration in ASP.NET Core (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configuration in ASP.NET Core (part 3 of 5)

## Environment Variables Configuration Provider

The default Environment Variables Configuration Provider (`Microsoft.Extensions.Configuration.EnvironmentVariables.EnvironmentVariablesConfigurationProvider`) loads configuration from environment variables that aren't prefixed with `ASPNETCORE_` or `DOTNET_`. For more information on `ASPNETCORE_` and `DOTNET_` environment variables, see the Default host configuration sources section and `DOTNET_` environment variables (.NET Core documentation).

Using the default Environment Variables Configuration Provider, the app loads configuration from environment variable key-value pairs after reading `appsettings.json`, `appsettings.{ENVIRONMENT}.json`, and user secrets. Therefore, key values read from the environment override values read from `appsettings.json`, `appsettings.{ENVIRONMENT}.json`, and user secrets.

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, Bash doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).

For guidance on setting environment variables in a command shell on Windows or in a cross-platform PowerShell command shell, see the following resources:

* set (environment variable)
* setx
* about_Environment_Variables (PowerShell documentation)

### Custom prefix for environment variables

You can add a configuration provider for custom-prefixed environment variables. In the `Program` file, call `Microsoft.Extensions.Configuration.EnvironmentVariablesExtensions.AddEnvironmentVariables*` with a string to specify a prefix after `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` is called. The provider is added after the default configuration providers, thus the added provider has a higher priority, including over environment variables of the same name without the prefix.

In the following example, environment variables are added with the `CustomPrefix_` prefix:

```csharp
builder.Configuration.AddEnvironmentVariables(prefix: "CustomPrefix_");
```

The prefix is stripped off when the configuration key-value pairs are read.

### Launch settings override environment variable settings

Environment variables set in `launchSettings.json` override those set in the system environment. For example, the ASP.NET Core web templates generate a `launchSettings.json` file that sets the endpoint configuration to:

```json
"applicationUrl": "https://localhost:5001;http://localhost:5000"
```

Configuring the `applicationUrl` sets the `ASPNETCORE_URLS` environment variable and overrides values set in the environment.

### Escape environment variables on Linux

On Linux, the value of URL environment variables must be escaped so `systemd` can parse it. In the following example, the Linux tool `systemd-escape` is used to yield `http:--localhost:5001` from `http://localhost:5001`:

```console
groot@terminus:~$ systemd-escape http://localhost:5001
http:--localhost:5001
```

### Azure App Service app settings (environment variables)

For Azure App Service app settings (environment variable) guidance, see the following resources:

* Configure an App Service app (Azure documentation)
* Azure database connection string prefixes

### Connection string prefixes

The Configuration API has special processing rules for connection string environment variables. These connection strings are involved in configuring Azure connection strings for the app environment. Environment variables with the prefixes shown in the following table are loaded into the app with the default configuration or when no prefix is supplied to `Microsoft.Extensions.Configuration.EnvironmentVariablesExtensions.AddEnvironmentVariables*`.

Connection string prefix | Provider
--- | ---
`APIHUBCONNSTR_` | Azure API hubs
`CUSTOMCONNSTR_` | Custom provider
`DOCDBCONNSTR_` | Azure Cosmos DB
`EVENTHUBCONNSTR_` | Azure Event Hubs
`MYSQLCONNSTR_` | MySQL
`NOTIFICATIONHUBCONNSTR_` | Azure Notification Hubs
`POSTGRESQLCONNSTR_` | PostgreSQL
`REDISCACHECONNSTR_` | Azure Cache for Redis
`SERVICEBUSCONNSTR_` | Azure Service Bus
`SQLAZURECONNSTR_` | Azure SQL Database
`SQLCONNSTR_` | SQL Server

When an environment variable is discovered and loaded into configuration with any of the recognized prefixes:

* The configuration key is created by removing the environment variable prefix and adding a configuration key section (`ConnectionStrings`).
* A new configuration key-value pair is created that represents the database connection provider when a provider name is associated with the prefix.

Environment variable key | Converted configuration key | Provider configuration entry
 --- | --- | ---
`APIHUBCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`CUSTOMCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`DOCDBCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`EVENTHUBCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`MYSQLCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `MySql.Data.MySqlClient`
`NOTIFICATIONHUBCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`POSTGRESQLCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `Npgsql`
`REDISCACHECONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`SERVICEBUSCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Configuration entry not created.
`SQLAZURECONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `System.Data.SqlClient`
`SQLCONNSTR_{KEY}` | `ConnectionStrings:{KEY}` | Key: `ConnectionStrings:{KEY}_ProviderName`:Value: `System.Data.SqlClient`

## Command-line

Using the default configuration sources, the `Microsoft.Extensions.Configuration.CommandLine.CommandLineConfigurationProvider` loads configuration from command-line argument key-value pairs after the following configuration sources:

* `appsettings.json` and `appsettings.{ENVIRONMENT}.json` files.
* App secrets in the `Development` environment.
* Environment variables.

By default, configuration values set on the command-line override configuration values set by all of the other configuration providers.

### Command-line arguments

The following `dotnet run` command sets keys and values using equals signs (`=`):

```dotnetcli
dotnet run ConnectionStrings:DefaultConnection="Data Source=LocalSqlServer\\MSSQLDev;" Logging:LogLevel:Default=Information
```

The following command sets keys and values using forward slashes (`/`):

```dotnetcli
dotnet run /ConnectionStrings:DefaultConnection "Data Source=LocalSqlServer\\MSSQLDev;" /Logging:LogLevel:Default Information
```

The following command sets keys and values using double dashes (`--`):

```dotnetcli
dotnet run --ConnectionStrings:DefaultConnection "Data Source=LocalSqlServer\\MSSQLDev;" --Logging:LogLevel:Default Information
```

Argument conventions:

* The key value must follow the equals sign (`=`), or the key must have a prefix of a double dash (`--`) or forward slash (`/`) when the value follows a space.
* Not assigning a value after an equals sign (`=`) results in assigning an empty string for the configuration setting. For example, specifying `ConnectionStrings:DefaultConnection=` is valid and results in assigning an empty string to the default connection string.
* Within the same command, don't mix argument key-value pairs separated by an equals sign (`=`) with key-value pairs separated by a space.

### Switch mappings

Switch mappings allow *key* name replacement logic via a dictionary of switch replacements passed to the `Microsoft.Extensions.Configuration.CommandLineConfigurationExtensions.AddCommandLine*` method.

When the switch mappings dictionary is used, the dictionary is checked for a key that matches the key provided by a command-line argument. If the command-line key is found in the dictionary, the dictionary value is passed back to set the key-value pair into the app's configuration. A switch mapping is required for any command-line key prefixed with a single dash (`-`).

Switch mappings dictionary key rules:

* Switches must start with a single dash (`-`) or double dash (`--`).
* The switch mappings dictionary must not contain duplicate keys.

In the following example, a switch mapping dictionary (`switchMappings`) is passed to `Microsoft.Extensions.Configuration.CommandLineConfigurationExtensions.AddCommandLine*` in the app's `Program` file:

```csharp
var switchMappings = 
    new Dictionary<string, string>(){ { "-k1", "key1" }, { "-k2", "key2" } };

builder.Configuration.AddCommandLine(args, switchMappings);
```

The following `dotnet run` commands demonstrate key replacement (`value1` into `key1` and `value2` into `key2`):

* `dotnet run -k1 value1 -k2 value2`
* `dotnet run --k1=value1 --k2=value2`
* `dotnet run --k1 value1 --k2 value2`
* `dotnet run /k1=value1 /k2=value2`
* `dotnet run /k1 value1 /k2 value2`

For apps that use switch mappings, the call to `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*` shouldn't pass arguments. The `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*` method's `Microsoft.Extensions.Configuration.CommandLineConfigurationExtensions.AddCommandLine*` call doesn't include mapped switches, and there's no way to pass the switch-mapping dictionary to `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*`. The solution isn't to pass the arguments to `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*` but instead to allow the `Microsoft.Extensions.Configuration.ConfigurationBuilder` method's `Microsoft.Extensions.Configuration.CommandLineConfigurationExtensions.AddCommandLine*` method to process both the arguments and the switch-mapping dictionary.

## Set environment and command-line arguments with Visual Studio

Environment and command-line arguments can be set in Visual Studio from the launch profiles dialog:

* In Solution Explorer, right click the project and select **Properties**.
* Select the **Debug > General** tab and select **Open debug launch profiles UI**.
