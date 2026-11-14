---
title: "HealthReportEntry struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthReportEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthReportEntry struct

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public struct HealthReportEntry
```

Represents an entry in a `HealthReport`. Corresponds to the result of a single `IHealthCheck`.

To be added.

## HealthReportEntry.HealthReportEntry(HealthStatus, String, TimeSpan, Exception, Object>) constructor

```csharp
public HealthReportEntry (Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus status, string? description, TimeSpan duration, Exception? exception, System.Collections.Generic.IReadOnlyDictionary<string,object>? data);
```

Creates a new `HealthReportEntry` with the specified values for `status`, `exception`,
`description`, and `data`.

Parameters:

- `status`: A value indicating the health status of the component that was checked.
- `description`: A human-readable description of the status of the component that was checked.
- `duration`: A value indicating the health execution duration.
- `exception`: An `HealthReportEntry.Exception` representing the exception that was thrown when checking for status (if any).
- `data`: Additional key-value pairs describing the health of the component.

To be added.

## HealthReportEntry.HealthReportEntry(HealthStatus, String, TimeSpan, Exception, Object>, String>) constructor

```csharp
public HealthReportEntry (Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus status, string? description, TimeSpan duration, Exception? exception, System.Collections.Generic.IReadOnlyDictionary<string,object>? data, System.Collections.Generic.IEnumerable<string>? tags = default);
```

Creates a new `HealthReportEntry` with the specified values for `status`, `exception`,
`description`, and `data`.

Parameters:

- `status`: A value indicating the health status of the component that was checked.
- `description`: A human-readable description of the status of the component that was checked.
- `duration`: A value indicating the health execution duration.
- `exception`: An `HealthReportEntry.Exception` representing the exception that was thrown when checking for status (if any).
- `data`: Additional key-value pairs describing the health of the component.
- `tags`: Tags associated with the health check that generated the report entry.

To be added.

## HealthReportEntry.Data property

```csharp
public System.Collections.Generic.IReadOnlyDictionary<string,object> Data { get; }
```

Gets additional key-value pairs describing the health of the component.

Returns: To be added.

To be added.

## HealthReportEntry.Description property

```csharp
public string? Description { get; }
```

Gets a human-readable description of the status of the component that was checked.

Returns: To be added.

To be added.

## HealthReportEntry.Duration property

```csharp
public TimeSpan Duration { get; }
```

Gets the health check execution duration.

Returns: To be added.

To be added.

## HealthReportEntry.Exception property

```csharp
public Exception? Exception { get; }
```

Gets an `Exception` representing the exception that was thrown when checking for status (if any).

Returns: To be added.

To be added.

## HealthReportEntry.Status property

```csharp
public Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus Status { get; }
```

Gets the health status of the component that was checked.

Returns: To be added.

To be added.

## HealthReportEntry.Tags property

```csharp
public System.Collections.Generic.IEnumerable<string> Tags { get; }
```

Gets the tags associated with the health check.

Returns: To be added.

To be added.
