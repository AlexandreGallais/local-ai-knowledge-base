---
title: "HealthChecksBuilderDelegateExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HealthChecksBuilderDelegateExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthChecksBuilderDelegateExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HealthChecksBuilderDelegateExtensions
```

Provides extension methods for registering delegates with the `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddAsyncCheck(IHealthChecksBuilder, String, HealthCheckResult>>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddAsyncCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<System.Threading.CancellationToken,System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult>> check, System.Collections.Generic.IEnumerable<string> tags);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddAsyncCheck(IHealthChecksBuilder, String, HealthCheckResult>>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddAsyncCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult>> check, System.Collections.Generic.IEnumerable<string> tags);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddAsyncCheck(IHealthChecksBuilder, String, HealthCheckResult>>, String>, TimeSpan>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddAsyncCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<System.Threading.CancellationToken,System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult>> check, System.Collections.Generic.IEnumerable<string>? tags = default, TimeSpan? timeout = default);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddAsyncCheck(IHealthChecksBuilder, String, HealthCheckResult>>, String>, TimeSpan>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddAsyncCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult>> check, System.Collections.Generic.IEnumerable<string>? tags = default, TimeSpan? timeout = default);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddCheck(IHealthChecksBuilder, String, HealthCheckResult>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult> check, System.Collections.Generic.IEnumerable<string> tags);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddCheck(IHealthChecksBuilder, String, HealthCheckResult>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<System.Threading.CancellationToken,Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult> check, System.Collections.Generic.IEnumerable<string>? tags);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddCheck(IHealthChecksBuilder, String, HealthCheckResult>, String>, TimeSpan>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult> check, System.Collections.Generic.IEnumerable<string>? tags = default, TimeSpan? timeout = default);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderDelegateExtensions.AddCheck(IHealthChecksBuilder, String, HealthCheckResult>, String>, TimeSpan>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Func<System.Threading.CancellationToken,Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult> check, System.Collections.Generic.IEnumerable<string>? tags = default, TimeSpan? timeout = default);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `tags`: A list of tags that can be used to filter health checks.
- `check`: A delegate that provides the health check implementation.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

To be added.
