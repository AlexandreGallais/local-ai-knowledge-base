---
title: "EnvironmentVariablesExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/EnvironmentVariablesExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnvironmentVariablesExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class EnvironmentVariablesExtensions
```

Provides extension methods for registering `EnvironmentVariablesConfigurationProvider` with `IConfigurationBuilder`.

#### Remarks

For more information and examples, see Environment variable configuration provider.

## EnvironmentVariablesExtensions.AddEnvironmentVariables(IConfigurationBuilder) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddEnvironmentVariables (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder);
```

Adds an `IConfigurationProvider` that reads configuration values from environment variables.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.

Returns: The `IConfigurationBuilder`.

To be added.

## EnvironmentVariablesExtensions.AddEnvironmentVariables(IConfigurationBuilder, EnvironmentVariablesConfigurationSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddEnvironmentVariables (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.EnvironmentVariables.EnvironmentVariablesConfigurationSource>? configureSource);
```

Adds an `IConfigurationProvider` that reads configuration values from environment variables.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `configureSource`: The action that configures the source.

Returns: The `IConfigurationBuilder`.

To be added.

## EnvironmentVariablesExtensions.AddEnvironmentVariables(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddEnvironmentVariables (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string? prefix);
```

Adds an `IConfigurationProvider` that reads configuration values from environment variables
with a specified prefix.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `prefix`: The prefix that environment variable names must start with. The prefix will be removed from the environment variable names.
The prefix is transformed by `EnvironmentVariablesConfigurationSource.DefaultTransformation` and then matched against transformed environment variable name, so it should be specified in the pre-transformation
form (for example `Logging__` for `Logging:`).

Returns: The `IConfigurationBuilder`.

To be added.

## EnvironmentVariablesExtensions.AddEnvironmentVariables(IConfigurationBuilder, String, String>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddEnvironmentVariables (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string? prefix, Func<string,string>? variableNameTransformation);
```

Adds an `IConfigurationProvider` that reads configuration values from environment variables
with a specified prefix and variable name transformation.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `prefix`: The prefix that environment variable names must start with. The prefix will be removed from the environment variable names.
The prefix is transformed by `variableNameTransformation` and then matched against transformed environment variable name, so it should be specified in the pre-transformation
form.
- `variableNameTransformation`: A function that transforms environment variable names. When set, this
completely replaces the default behavior. When `null`,
`EnvironmentVariablesConfigurationSource.DefaultTransformation` is used.

Returns: The `IConfigurationBuilder`.

To be added.
