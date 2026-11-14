---
title: "IHealthChecksBuilder interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/IHealthChecksBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHealthChecksBuilder interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface IHealthChecksBuilder
```

A builder used to register health checks.

To be added.

## IHealthChecksBuilder.Services property

```csharp
public Microsoft.Extensions.DependencyInjection.IServiceCollection Services { get; }
```

Gets the `IServiceCollection` into which `IHealthCheck` instances should be registered.

Returns: To be added.

To be added.

## IHealthChecksBuilder.Add(HealthCheckRegistration) method

```csharp
public Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder Add (Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckRegistration registration);
```

Adds a `HealthCheckRegistration` for a health check.

Parameters:

- `registration`: The `HealthCheckRegistration`.

Returns: To be added.

To be added.
