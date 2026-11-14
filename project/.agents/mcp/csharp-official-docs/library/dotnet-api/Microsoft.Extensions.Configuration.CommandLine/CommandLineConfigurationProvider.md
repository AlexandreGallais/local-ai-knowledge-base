---
title: "CommandLineConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.CommandLine/CommandLineConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CommandLineConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration.CommandLine`

```csharp
public class CommandLineConfigurationProvider : Microsoft.Extensions.Configuration.ConfigurationProvider
```

Provides configuration key-value pairs that are obtained from the command line.

#### Remarks

For more information and examples, see Command-line configuration provider.

## CommandLineConfigurationProvider.CommandLineConfigurationProvider(String>, String>) constructor

```csharp
public CommandLineConfigurationProvider (System.Collections.Generic.IEnumerable<string> args, System.Collections.Generic.IDictionary<string,string>? switchMappings = default);
```

Initializes a new instance.

Parameters:

- `args`: The command line args.
- `switchMappings`: The switch mappings.

To be added.

## CommandLineConfigurationProvider.Args property

```csharp
protected System.Collections.Generic.IEnumerable<string> Args { get; }
```

Gets the command-line arguments.

Returns: To be added.

To be added.

## CommandLineConfigurationProvider.Load() method

```csharp
public override void Load ();
```

Loads the configuration data from the command-line arguments.

To be added.
