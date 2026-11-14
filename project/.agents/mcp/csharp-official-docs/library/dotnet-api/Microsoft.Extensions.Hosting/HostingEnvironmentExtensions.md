---
title: "HostingEnvironmentExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostingEnvironmentExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostingEnvironmentExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class HostingEnvironmentExtensions
```

Extension methods for `IHostingEnvironment`.

To be added.

## HostingEnvironmentExtensions.IsDevelopment(IHostingEnvironment) method

```csharp
public static bool IsDevelopment (this Microsoft.Extensions.Hosting.IHostingEnvironment hostingEnvironment);
```

Checks if the current hosting environment name is `EnvironmentName.Development`.

Parameters:

- `hostingEnvironment`: An instance of `IHostingEnvironment`.

Returns: `true` if the environment name is `EnvironmentName.Development`, otherwise `false`.

The environment names "Development", "Production" and "Staging" are provided as a utility for application developers. Library
authors should avoid coupling specific behavior to these environment names.

## HostingEnvironmentExtensions.IsEnvironment(IHostingEnvironment, String) method

```csharp
public static bool IsEnvironment (this Microsoft.Extensions.Hosting.IHostingEnvironment hostingEnvironment, string environmentName);
```

Compares the current hosting environment name against the specified value.

Parameters:

- `hostingEnvironment`: An instance of `IHostingEnvironment`.
- `environmentName`: Environment name to validate against.

Returns: `true` if the specified name is the same as the current environment, otherwise `false`.

Environment names are generally specific to an application. Libraries designed for use in many different applications
should avoid coupling behavior to specific environment names.

## HostingEnvironmentExtensions.IsProduction(IHostingEnvironment) method

```csharp
public static bool IsProduction (this Microsoft.Extensions.Hosting.IHostingEnvironment hostingEnvironment);
```

Checks if the current hosting environment name is `EnvironmentName.Production`.

Parameters:

- `hostingEnvironment`: An instance of `IHostingEnvironment`.

Returns: `true` if the environment name is `EnvironmentName.Production`, otherwise `false`.

The environment names "Development", "Production" and "Staging" are provided as a utility for application developers. Library
authors should avoid coupling specific behavior to these environment names.

## HostingEnvironmentExtensions.IsStaging(IHostingEnvironment) method

```csharp
public static bool IsStaging (this Microsoft.Extensions.Hosting.IHostingEnvironment hostingEnvironment);
```

Checks if the current hosting environment name is `EnvironmentName.Staging`.

Parameters:

- `hostingEnvironment`: An instance of `IHostingEnvironment`.

Returns: `true` if the environment name is `EnvironmentName.Staging`, otherwise `false`.

The environment names "Development", "Production" and "Staging" are provided as a utility for application developers. Library
authors should avoid coupling specific behavior to these environment names.
