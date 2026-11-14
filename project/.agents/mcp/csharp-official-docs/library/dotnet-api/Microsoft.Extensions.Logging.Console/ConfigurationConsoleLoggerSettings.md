---
title: "ConfigurationConsoleLoggerSettings class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Console/ConfigurationConsoleLoggerSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationConsoleLoggerSettings class

Namespace: `Microsoft.Extensions.Logging.Console`

```csharp
public class ConfigurationConsoleLoggerSettings : Microsoft.Extensions.Logging.Console.IConsoleLoggerSettings
```

Settings for a `ConsoleLogger`.

To be added.

## ConfigurationConsoleLoggerSettings.ConfigurationConsoleLoggerSettings(IConfiguration) constructor

```csharp
public ConfigurationConsoleLoggerSettings (Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Creates a new instance of `ConfigurationConsoleLoggerSettings`.

Parameters:

- `configuration`: The configuration values.

To be added.

## ConfigurationConsoleLoggerSettings.ChangeToken <example-value>

```csharp
public Microsoft.Extensions.Primitives.IChangeToken? ChangeToken { get; }
```

Gets the `IChangeToken` that propagates notifications that a change has occurred.

Returns: To be added.

To be added.

## ConfigurationConsoleLoggerSettings.IncludeScopes property

```csharp
public bool IncludeScopes { get; }
```

Gets a value indicating whether scopes should be included in the message.

Returns: To be added.

To be added.

## ConfigurationConsoleLoggerSettings.Reload() method

```csharp
public Microsoft.Extensions.Logging.Console.IConsoleLoggerSettings Reload ();
```

Reload the settings from the configuration.

Returns: The reloaded settings.

To be added.

## ConfigurationConsoleLoggerSettings.TryGetSwitch(String, LogLevel) method

```csharp
public bool TryGetSwitch (string name, out Microsoft.Extensions.Logging.LogLevel level);
```

Gets the log level for the specified switch.

Parameters:

- `name`: The name of the switch to look up.
- `level`: When this method returns, contains the value of the switch if it is found. If the switch is not found, the method returns false and sets the value of level to LogLevel.None

Returns: `true` if the switch was found, otherwise `false`.

To be added.
