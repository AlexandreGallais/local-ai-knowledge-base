---
title: "ActivityTraceId struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityTraceId.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityTraceId struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ActivityTraceId : IEquatable<System.Diagnostics.ActivityTraceId>
```

Represents a `Activity.TraceId` whose format is based on a W3C standard.

#### Remarks

The `ActivityTraceId` structure reflects the format that the W3C standard requires for the ID of the entire trace. It consists of 16 bytes, typically represented as 32 hexadecimal characters. An `ActivityTraceId` is returned by the `TraceId` property.

Because an `ActivityTraceId` is a structure that contains 16 bytes, it can be passed easily by reference. `ActivityTraceId` contains methods for converting to and from its hexadecimal string representation, tries to avoid changing formats until it has to, and caches its string representation after it is created. It is mostly useful as an exchange type.

## ActivityTraceId.CopyTo(Byte>) method

```csharp
public void CopyTo (Span<byte> destination);
```

Copies the 16 bytes of the current `ActivityTraceId` to a specified span.

Parameters:

- `destination`: The span to which the 16 bytes of the trace ID are to be copied.

To be added.

## ActivityTraceId.CreateFromBytes(Byte>) method

```csharp
public static System.Diagnostics.ActivityTraceId CreateFromBytes (ReadOnlySpan<byte> idData);
```

Creates a new `ActivityTraceId` value from a read-only span of 16 bytes.

Parameters:

- `idData`: A read-only span of 16 bytes.

Returns: The new trace ID.

Exceptions:

- `ArgumentOutOfRangeException`: `idData` does not contain eight bytes.

To be added.

## ActivityTraceId.CreateFromString(Char>) method

```csharp
public static System.Diagnostics.ActivityTraceId CreateFromString (ReadOnlySpan<char> idData);
```

Creates a new `ActivityTraceId` value from a read-only span of 32 hexadecimal characters.

Parameters:

- `idData`: A span that contains 32 hexadecimal characters.

Returns: The new trace ID.

Exceptions:

- `ArgumentOutOfRangeException`: `idData` does not contain 32 hexadecimal characters.

-or-

The characters in `idData` are not all lower-case hexadecimal characters or all zeros.

`idData` can consist either of numbers and lower-case hexadecimal characters or of all zeros.

## ActivityTraceId.CreateFromUtf8String(Byte>) method

```csharp
public static System.Diagnostics.ActivityTraceId CreateFromUtf8String (ReadOnlySpan<byte> idData);
```

Creates a new `ActivityTraceId` value from a read-only span of UTF8-encoded bytes.

Parameters:

- `idData`: A read-only span of UTF8-encoded bytes.

Returns: The new trace ID.

To be added.

## ActivityTraceId.CreateRandom() method

```csharp
public static System.Diagnostics.ActivityTraceId CreateRandom ();
```

Creates a new `ActivityTraceId` based on a random number (that is very likely to be unique).

Returns: The new `ActivityTraceId`.

To be added.

## ActivityTraceId.Equals(ActivityTraceId) method

```csharp
public bool Equals (System.Diagnostics.ActivityTraceId traceId);
```

Determines whether the current instance and a specified `ActivityTraceId` are equal.

Parameters:

- `traceId`: The instance to compare.

Returns: `true` if `traceId` has the same hex value as the current instance; otherwise, `false`.

To be added.

## ActivityTraceId.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance and a specified object, which must also be an `ActivityTraceId` instance, have the same value.

Parameters:

- `obj`: The object to compare.

Returns: `true` if `obj` is an instance of `ActivityTraceId` and has the same hex value as the current instance; otherwise, `false`.

To be added.

## ActivityTraceId.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code of the TraceId.

Returns: The hash code of the TraceId.

To be added.

## ActivityTraceId.op_Equality(ActivityTraceId, ActivityTraceId) method

```csharp
public static bool operator == (System.Diagnostics.ActivityTraceId traceId1, System.Diagnostics.ActivityTraceId traceId2);
```

Determines whether two specified `ActivityTraceId` instances have the same value.

Parameters:

- `traceId1`: The first instance to compare.
- `traceId2`: The second instance to compare.

Returns: `true` if the TraceId of `traceId1` is the same as the TraceId of `traceId2`; otherwise, `false`.

To be added.

## ActivityTraceId.op_Inequality(ActivityTraceId, ActivityTraceId) method

```csharp
public static bool operator != (System.Diagnostics.ActivityTraceId traceId1, System.Diagnostics.ActivityTraceId traceId2);
```

Determines whether two specified `ActivityTraceId` instances have the same value.

Parameters:

- `traceId1`: The first instance to compare.
- `traceId2`: The second instance to compare.

Returns: `true` if the TraceId of `traceId1` is different from the TraceId of `traceId2`; otherwise, `false`.

To be added.

## ActivityTraceId.ToHexString() method

```csharp
public string ToHexString ();
```

Returns a 32-character hexadecimal string that represents this span ID.

Returns: The 32-character hexadecimal string representation of this trace ID.

To be added.

## ActivityTraceId.ToString() method

```csharp
public override string ToString ();
```

Returns a 32-character hexadecimal string that represents this trace ID.

Returns: The 32-character hexadecimal string representation of this trace ID.

To be added.
