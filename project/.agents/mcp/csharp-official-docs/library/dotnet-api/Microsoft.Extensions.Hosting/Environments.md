---
title: "Environments class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/Environments.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environments class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class Environments
```

Commonly used environment names.

To be added.

## Environments.Development field

```csharp
public static readonly string Development;
```

Specifies the Development environment.

The development environment can enable features that shouldn't be exposed in production. Because of the performance cost, scope validation and dependency validation only happens in development.

## Environments.Production field

```csharp
public static readonly string Production;
```

Specifies the Production environment.

The production environment should be configured to maximize security, performance, and application robustness.

## Environments.Staging field

```csharp
public static readonly string Staging;
```

Specifies the Staging environment.

The staging environment can be used to validate app changes before changing the environment to production.
