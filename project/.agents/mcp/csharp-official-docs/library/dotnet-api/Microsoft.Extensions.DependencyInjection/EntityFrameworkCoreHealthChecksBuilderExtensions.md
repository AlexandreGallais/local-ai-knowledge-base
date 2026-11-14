---
title: "EntityFrameworkCoreHealthChecksBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/EntityFrameworkCoreHealthChecksBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EntityFrameworkCoreHealthChecksBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class EntityFrameworkCoreHealthChecksBuilderExtensions
```

`IHealthChecksBuilder` extension methods for Entity Framework Core.

To be added.

## EntityFrameworkCoreHealthChecksBuilderExtensions.AddDbContextCheck<TContext>(IHealthChecksBuilder, String, HealthStatus>, String>, Boolean>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddDbContextCheck<TContext> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string? name = default, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus = default, System.Collections.Generic.IEnumerable<string>? tags = default, Func<TContext,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>>? customTestQuery = default) where TContext : Microsoft.EntityFrameworkCore.DbContext;
```

Adds a health check for the specified `DbContext` type.

Parameters:

- `TContext`: The `DbContext` type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The health check name. Optional. If `null` the type name of `TContext` will be used for the name.
- `failureStatus`: The `HealthStatus` that should be reported when the health check fails. Optional. If `null` then
the default status of `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter sets of health checks. Optional.
- `customTestQuery`: A custom test query that will be executed when the health check executes to test the health of the database
connection and configurations.

Returns: The `IHealthChecksBuilder`.

The health check implementation added by this method will use the dependency injection container
to create an instance of `TContext`.

By default the health check implementation will use the `DatabaseFacade.CanConnectAsync` method
to test connectivity to the database. This method requires that the database provider has correctly implemented the
`IDatabaseCreator` interface. If the database provider has not implemented this interface
then the health check will report a failure.

Providing a `customTestQuery` will replace the use of `DatabaseFacade.CanConnectAsync`
to test database connectivity. An implementation of a test query should handle exceptions that can arise due to connectivity failure,
and should return a pass/fail result. The test query should be be designed to complete in a short and predicatable amount of time.
