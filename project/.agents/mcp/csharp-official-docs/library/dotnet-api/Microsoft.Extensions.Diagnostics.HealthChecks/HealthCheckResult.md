---
title: "HealthCheckResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthCheckResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthCheckResult struct

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public struct HealthCheckResult
```

Represents the result of a health check.

To be added.

## HealthCheckResult.HealthCheckResult(HealthStatus, String, Exception, Object>) constructor

```csharp
public HealthCheckResult (Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus status, string? description = default, Exception? exception = default, System.Collections.Generic.IReadOnlyDictionary<string,object>? data = default);
```

Creates a new `HealthCheckResult` with the specified values for `status`,
`exception`, `description`, and `data`.

Parameters:

- `status`: A value indicating the status of the component that was checked.
- `description`: A human-readable description of the status of the component that was checked.
- `exception`: An `HealthCheckResult.Exception` representing the exception that was thrown when checking for status (if any).
- `data`: Additional key-value pairs describing the health of the component.

To be added.

## HealthCheckResult.Data property

```csharp
public System.Collections.Generic.IReadOnlyDictionary<string,object> Data { get; }
```

Gets additional key-value pairs describing the health of the component.

Returns: To be added.

To be added.

## HealthCheckResult.Description property

```csharp
public string? Description { get; }
```

Gets a human-readable description of the status of the component that was checked.

Returns: To be added.

To be added.

## HealthCheckResult.Exception property

```csharp
public Exception? Exception { get; }
```

Gets an `HealthCheckResult.Exception` representing the exception that was thrown when checking for status (if any).

Returns: To be added.

To be added.

## HealthCheckResult.Status property

```csharp
public Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus Status { get; }
```

Gets a value indicating the status of the component that was checked.

Returns: To be added.

To be added.

## HealthCheckResult.Degraded(String, Exception, Object>) method

```csharp
public static Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult Degraded (string? description = default, Exception? exception = default, System.Collections.Generic.IReadOnlyDictionary<string,object>? data = default);
```

Creates a `HealthCheckResult` representing a degraded component.

Parameters:

- `description`: A human-readable description of the status of the component that was checked. Optional.
- `exception`: An `HealthCheckResult.Exception` representing the exception that was thrown when checking for status. Optional.
- `data`: Additional key-value pairs describing the health of the component. Optional.

Returns: A `HealthCheckResult` representing a degraged component.

To be added.

## HealthCheckResult.Healthy(String, Object>) method

```csharp
public static Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult Healthy (string? description = default, System.Collections.Generic.IReadOnlyDictionary<string,object>? data = default);
```

Creates a `HealthCheckResult` representing a healthy component.

Parameters:

- `description`: A human-readable description of the status of the component that was checked. Optional.
- `data`: Additional key-value pairs describing the health of the component. Optional.

Returns: A `HealthCheckResult` representing a healthy component.

To be added.

## HealthCheckResult.Unhealthy(String, Exception, Object>) method

```csharp
public static Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult Unhealthy (string? description = default, Exception? exception = default, System.Collections.Generic.IReadOnlyDictionary<string,object>? data = default);
```

Creates a `HealthCheckResult` representing an unhealthy component.

Parameters:

- `description`: A human-readable description of the status of the component that was checked. Optional.
- `exception`: An `HealthCheckResult.Exception` representing the exception that was thrown when checking for status. Optional.
- `data`: Additional key-value pairs describing the health of the component. Optional.

Returns: A `HealthCheckResult` representing an unhealthy component.

To be added.
