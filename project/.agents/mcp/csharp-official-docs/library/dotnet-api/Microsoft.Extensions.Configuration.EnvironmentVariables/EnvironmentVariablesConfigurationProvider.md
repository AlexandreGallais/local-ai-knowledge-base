---
title: "EnvironmentVariablesConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.EnvironmentVariables/EnvironmentVariablesConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnvironmentVariablesConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration.EnvironmentVariables`

```csharp
public class EnvironmentVariablesConfigurationProvider : Microsoft.Extensions.Configuration.ConfigurationProvider
```

Provides configuration key-value pairs that are obtained from environment variables.

#### Remarks

For more information and examples, see Environment variable configuration provider.

## EnvironmentVariablesConfigurationProvider.EnvironmentVariablesConfigurationProvider() constructor

```csharp
public EnvironmentVariablesConfigurationProvider ();
```

Initializes a new instance.

To be added.

## EnvironmentVariablesConfigurationProvider.EnvironmentVariablesConfigurationProvider(String) constructor

```csharp
public EnvironmentVariablesConfigurationProvider (string? prefix);
```

Initializes a new instance with the specified prefix.

Parameters:

- `prefix`: A prefix used to filter the environment variables.

To be added.

## EnvironmentVariablesConfigurationProvider.EnvironmentVariablesConfigurationProvider(String, String>) constructor

```csharp
public EnvironmentVariablesConfigurationProvider (string? prefix, Func<string,string>? variableNameTransformation);
```

Initializes a new instance with the specified prefix and variable name transformation.

Parameters:

- `prefix`: A prefix used to filter the environment variables.
- `variableNameTransformation`: A function that transforms environment variable names.
When `null`, `EnvironmentVariablesConfigurationSource.DefaultTransformation` is used.

To be added.

## EnvironmentVariablesConfigurationProvider.Load() method

```csharp
public override void Load ();
```

Loads the environment variables.

To be added.

## EnvironmentVariablesConfigurationProvider.ToString() method

```csharp
public override string ToString ();
```

Generates a string representing this provider name and relevant details.

Returns: The configuration name.

To be added.
