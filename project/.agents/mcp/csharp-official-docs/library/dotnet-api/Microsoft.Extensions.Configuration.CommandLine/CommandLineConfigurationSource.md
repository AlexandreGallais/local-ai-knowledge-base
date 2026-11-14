---
title: "CommandLineConfigurationSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.CommandLine/CommandLineConfigurationSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CommandLineConfigurationSource class

Namespace: `Microsoft.Extensions.Configuration.CommandLine`

```csharp
public class CommandLineConfigurationSource : Microsoft.Extensions.Configuration.IConfigurationSource
```

Represents command-line arguments as an `IConfigurationSource`.

To be added.

## CommandLineConfigurationSource.CommandLineConfigurationSource() constructor

```csharp
public CommandLineConfigurationSource ();
```

Initializes a new instance of `CommandLineConfigurationSource`.

To be added.

## CommandLineConfigurationSource.Args property

```csharp
public System.Collections.Generic.IEnumerable<string> Args { get; set; }
```

Gets or sets the command line arguments.

Returns: To be added.

To be added.

## CommandLineConfigurationSource.SwitchMappings property

```csharp
public System.Collections.Generic.IDictionary<string,string>? SwitchMappings { get; set; }
```

Gets or sets the switch mappings.

Returns: To be added.

To be added.

## CommandLineConfigurationSource.Build(IConfigurationBuilder) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationProvider Build (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Builds the `CommandLineConfigurationProvider` for this source.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: A `CommandLineConfigurationProvider`.

To be added.
