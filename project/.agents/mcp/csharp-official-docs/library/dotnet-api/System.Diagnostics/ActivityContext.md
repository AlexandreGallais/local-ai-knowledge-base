---
title: "ActivityContext struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityContext struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ActivityContext : IEquatable<System.Diagnostics.ActivityContext>
```

A representation that conforms to the W3C TraceContext specification. It contains two identifiers: a TraceId and a SpanId,  along with a set of common TraceFlags and system-specific TraceState values.

#### Remarks

ActivityContext contains the property `IsRemote`, which is not part of W3C. `IsRemote` is indicating if the context is propagated from a remote parent.

## ActivityContext.ActivityContext(ActivityTraceId, ActivitySpanId, ActivityTraceFlags, String, Boolean) constructor

```csharp
public ActivityContext (System.Diagnostics.ActivityTraceId traceId, System.Diagnostics.ActivitySpanId spanId, System.Diagnostics.ActivityTraceFlags traceFlags, string? traceState = default, bool isRemote = false);
```

Construct a new activity context instance using the specified arguments.

Parameters:

- `traceId`: A trace identifier.
- `spanId`: A span identifier.
- `traceFlags`: Contain details about the trace.
- `traceState`: Carries system-specific configuration data.
- `isRemote`: Indicates if the context is propagated from a remote parent.

#### Remarks

`isRemote` is not a part of W3C specification. It is needed for the OpenTelemetry scenarios.

## ActivityContext.IsRemote property

```csharp
public bool IsRemote { get; }
```

Indicates if the activity context was propagated from a remote parent.

Returns: `true` if it was propagated from a remote parent; `false` otherwise.

#### Remarks

`IsRemote` is not a part of W3C specification. It is needed for the OpenTelemetry scenarios.

## ActivityContext.SpanId property

```csharp
public System.Diagnostics.ActivitySpanId SpanId { get; }
```

The Id of the request as known by the caller.

Returns: The Span Id in the context.

To be added.

## ActivityContext.TraceFlags property

```csharp
public System.Diagnostics.ActivityTraceFlags TraceFlags { get; }
```

The flags defined by the W3C standard along with the ID for the activity.

Returns: The context tracing flags.

To be added.

## ActivityContext.TraceId property

```csharp
public System.Diagnostics.ActivityTraceId TraceId { get; }
```

The trace identifier.

Returns: The tracing identifier in the context.

To be added.

## ActivityContext.TraceState property

```csharp
public string? TraceState { get; }
```

Holds the W3C 'tracestate' header.

Returns: A string representing the W3C 'tracestate' header.

To be added.

## ActivityContext.Equals(ActivityContext) method

```csharp
public bool Equals (System.Diagnostics.ActivityContext value);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if the current object is equal to the `value` parameter; otherwise, `false`.

To be added.

## ActivityContext.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance and a specified `ActivityContext` object have the same value.

Parameters:

- `obj`: The object to compare to this instance.

Returns: `true` if the current object is equal to the `obj` parameter; otherwise, `false`.

To be added.

## ActivityContext.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Provides a hash function for the current `ActivityContext` that's suitable for hashing algorithms and data structures, such as hash tables.

Returns: A hash code for the current `ActivityContext`.

To be added.

## ActivityContext.op_Equality(ActivityContext, ActivityContext) method

```csharp
public static bool operator == (System.Diagnostics.ActivityContext left, System.Diagnostics.ActivityContext right);
```

Determines whether two specified `ActivityContext` values are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

To be added.

## ActivityContext.op_Inequality(ActivityContext, ActivityContext) method

```csharp
public static bool operator != (System.Diagnostics.ActivityContext left, System.Diagnostics.ActivityContext right);
```

Determines whether two specified `ActivityContext` values are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.

## ActivityContext.Parse(String, String) method

```csharp
public static System.Diagnostics.ActivityContext Parse (string traceParent, string? traceState);
```

Parses a W3C trace context headers to an `ActivityContext` object.

Parameters:

- `traceParent`: The W3C trace parent header.
- `traceState`: The trace state.

Returns: The `ActivityContext` object created from the parsing operation.

Exceptions:

- `ArgumentException`: The trace parent is invalid.

To be added.

## ActivityContext.TryParse(String, String, ActivityContext) method

```csharp
public static bool TryParse (string? traceParent, string? traceState, out System.Diagnostics.ActivityContext context);
```

Tries to parse the W3C trace context headers to an `ActivityContext` object.

Parameters:

- `traceParent`: The W3C trace parent header.
- `traceState`: The W3C trace state.
- `context`: When this method returns `true`, the `ActivityContext` object created from the parsing operation.

Returns: `true` if the parsing was successful; `false` otherwise.

To be added.

## ActivityContext.TryParse(String, String, Boolean, ActivityContext) method

```csharp
public static bool TryParse (string? traceParent, string? traceState, bool isRemote, out System.Diagnostics.ActivityContext context);
```

Tries to parse the W3C trace context headers to the `ActivityContext` object.

Parameters:

- `traceParent`: The W3C trace parent header.
- `traceState`: The W3C trace state.
- `isRemote`: `true` to propagate the context from the remote parent; otherwise, `false`.
- `context`: When this method returns, contains the `ActivityContext` object created from the parsing operation.

Returns: `true` if the operation succeeds; `false` otherwise.

To be added.
