---
title: "HostEnvironmentEnvExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostEnvironmentEnvExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostEnvironmentEnvExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class HostEnvironmentEnvExtensions
```

Extension methods for `IHostEnvironment`.

To be added.

## HostEnvironmentEnvExtensions.IsDevelopment(IHostEnvironment) method

```csharp
public static bool IsDevelopment (this Microsoft.Extensions.Hosting.IHostEnvironment hostEnvironment);
```

Checks if the current host environment name is `Environments.Development`.

Parameters:

- `hostEnvironment`: An instance of `IHostEnvironment`.

Returns: `true` if the environment name is `Environments.Development`, otherwise `false`.

The environment names "Development", "Production" and "Staging" are provided as a utility for application developers. Library
authors should avoid coupling specific behavior to these environment names.

## HostEnvironmentEnvExtensions.IsEnvironment(IHostEnvironment, String) method

```csharp
public static bool IsEnvironment (this Microsoft.Extensions.Hosting.IHostEnvironment hostEnvironment, string environmentName);
```

Compares the current host environment name against the specified value.

Parameters:

- `hostEnvironment`: An instance of `IHostEnvironment`.
- `environmentName`: Environment name to validate against.

Returns: `true` if the specified name is the same as the current environment, otherwise `false`.

Environment names are generally specific to an application. Libraries designed for use in many different applications
should avoid coupling behavior to specific environment names.

## HostEnvironmentEnvExtensions.IsProduction(IHostEnvironment) method

```csharp
public static bool IsProduction (this Microsoft.Extensions.Hosting.IHostEnvironment hostEnvironment);
```

Checks if the current host environment name is `Environments.Production`.

Parameters:

- `hostEnvironment`: An instance of `IHostEnvironment`.

Returns: `true` if the environment name is `Environments.Production`, otherwise `false`.

The environment names "Development", "Production" and "Staging" are provided as a utility for application developers. Library
authors should avoid coupling specific behavior to these environment names.

## HostEnvironmentEnvExtensions.IsStaging(IHostEnvironment) method

```csharp
public static bool IsStaging (this Microsoft.Extensions.Hosting.IHostEnvironment hostEnvironment);
```

Checks if the current host environment name is `Environments.Staging`.

Parameters:

- `hostEnvironment`: An instance of `IHostEnvironment`.

Returns: `true` if the environment name is `Environments.Staging`, otherwise `false`.

The environment names "Development", "Production" and "Staging" are provided as a utility for application developers. Library
authors should avoid coupling specific behavior to these environment names.
