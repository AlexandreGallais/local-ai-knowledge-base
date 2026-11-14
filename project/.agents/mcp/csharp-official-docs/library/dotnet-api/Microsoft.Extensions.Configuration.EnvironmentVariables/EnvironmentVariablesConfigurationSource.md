---
title: "EnvironmentVariablesConfigurationSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.EnvironmentVariables/EnvironmentVariablesConfigurationSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnvironmentVariablesConfigurationSource class

Namespace: `Microsoft.Extensions.Configuration.EnvironmentVariables`

```csharp
public class EnvironmentVariablesConfigurationSource : Microsoft.Extensions.Configuration.IConfigurationSource
```

Represents environment variables as an `IConfigurationSource`.

To be added.

## EnvironmentVariablesConfigurationSource.EnvironmentVariablesConfigurationSource() constructor

```csharp
public EnvironmentVariablesConfigurationSource ();
```

Initializes a new instance of `EnvironmentVariablesConfigurationSource`.

To be added.

## EnvironmentVariablesConfigurationSource.ColonAndDotTransformation property

```csharp
public static Func<string,string> ColonAndDotTransformation { get; }
```

A transformation that replaces triple underscores (`___`) with a dot (`.`)
and double underscores (`__`) with the configuration key <example-value> (`:`).

Returns: To be added.

Runs of underscores are processed greedily from left to right: each `___` match
is consumed before any remaining `__`. As a result, a run of four underscores
(`____`) is interpreted as one triple followed by a single literal underscore
and produces `._`, not `::`.

## EnvironmentVariablesConfigurationSource.DefaultTransformation property

```csharp
public static Func<string,string> DefaultTransformation { get; }
```

The default transformation that replaces double underscores (`__`) with the
configuration key <example-value> (`:`).

Returns: To be added.

To be added.

## EnvironmentVariablesConfigurationSource.Prefix property

```csharp
public string? Prefix { get; set; }
```

A prefix used to filter environment variables.

Returns: To be added.

The prefix is itself passed through `EnvironmentVariablesConfigurationSource.VariableNameTransformation` before
matching, and the matching (and stripping) is performed against the transformed
environment variable name.

## EnvironmentVariablesConfigurationSource.VariableNameTransformation property

```csharp
public Func<string,string>? VariableNameTransformation { get; set; }
```

Gets or sets a function that transforms environment variable names. When set, this
transformation replaces the default behavior of converting double
underscores to the configuration key delimiter. When `null`,
`EnvironmentVariablesConfigurationSource.DefaultTransformation` is used.

Returns: To be added.

To be added.

## EnvironmentVariablesConfigurationSource.Build(IConfigurationBuilder) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationProvider Build (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Builds the `EnvironmentVariablesConfigurationProvider` for this source.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: A `EnvironmentVariablesConfigurationProvider`.

To be added.
