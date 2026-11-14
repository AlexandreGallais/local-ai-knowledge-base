---
title: "HealthCheckServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HealthCheckServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthCheckServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HealthCheckServiceCollectionExtensions
```

Provides extension methods for registering `HealthCheckService` in an `IServiceCollection`.

To be added.

## HealthCheckServiceCollectionExtensions.AddHealthChecks(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddHealthChecks (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds the `HealthCheckService` to the container, using the provided delegate to register
health checks.

Parameters:

- `services`: The `IServiceCollection` to add the `HealthCheckService` to.

Returns: An instance of `IHealthChecksBuilder` from which health checks can be registered.

This operation is idempotent - multiple invocations will still only result in a single
`HealthCheckService` instance in the `IServiceCollection`. It can be invoked
multiple times in order to get access to the `IHealthChecksBuilder` in multiple places.
