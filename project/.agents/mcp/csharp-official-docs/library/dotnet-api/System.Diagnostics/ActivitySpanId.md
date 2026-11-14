---
title: "ActivitySpanId struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivitySpanId.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivitySpanId struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ActivitySpanId : IEquatable<System.Diagnostics.ActivitySpanId>
```

Represents a `Activity.SpanId` formatted based on a W3C standard.

The `ActivitySpanId` structure reflects the format that the W3C standard requires for the ID of a single span in a trace. It consists of 8 bytes, typically displayed as 16 hexadecimal characters. An `ActivitySpanId` is returned by the `SpanId` for an `Activity` whose `IdFormat` is `W3C`.

Because an `ActivitySpanId` is a structure that contains 8 bytes, it can be passed by reference. `ActivitySpanId` contains methods for converting to and from hexadecimal string representation, tries to avoid changing formats until it has to, and caches its string representation after it is created. It is mostly useful as an exchange type.

## ActivitySpanId.CopyTo(Byte>) method

```csharp
public void CopyTo (Span<byte> destination);
```

Copies the 8 bytes of the current `ActivitySpanId` to a specified span.

Parameters:

- `destination`: The span to which the 8 bytes of the SpanID are to be copied.

To be added.

## ActivitySpanId.CreateFromBytes(Byte>) method

```csharp
public static System.Diagnostics.ActivitySpanId CreateFromBytes (ReadOnlySpan<byte> idData);
```

Creates a new `ActivitySpanId` value from a read-only span of eight bytes.

Parameters:

- `idData`: A read-only span of eight bytes.

Returns: The new span ID.

Exceptions:

- `ArgumentOutOfRangeException`: `idData` does not contain eight bytes.

To be added.

## ActivitySpanId.CreateFromString(Char>) method

```csharp
public static System.Diagnostics.ActivitySpanId CreateFromString (ReadOnlySpan<char> idData);
```

Creates a new `ActivitySpanId` value from a read-only span of 16 hexadecimal characters.

Parameters:

- `idData`: A span that contains 16 hexadecimal characters.

Returns: The new span ID.

Exceptions:

- `ArgumentOutOfRangeException`: `idData` does not contain 16 hexadecimal characters.

-or-

The characters in `idData` are not all lower-case hexadecimal characters or all zeros.

`idData` can consist either of numbers and lower-case hexadecimal characters or of all zeros.

## ActivitySpanId.CreateFromUtf8String(Byte>) method

```csharp
public static System.Diagnostics.ActivitySpanId CreateFromUtf8String (ReadOnlySpan<byte> idData);
```

Creates a new `ActivitySpanId` value from a read-only span of UTF8-encoded bytes.

Parameters:

- `idData`: A read-only span of UTF8-encoded bytes.

Returns: The new span ID.

To be added.

## ActivitySpanId.CreateRandom() method

```csharp
public static System.Diagnostics.ActivitySpanId CreateRandom ();
```

Creates a new `ActivitySpanId` based on a random number (that is very likely to be unique).

Returns: The new span ID.

To be added.

## ActivitySpanId.Equals(ActivitySpanId) method

```csharp
public bool Equals (System.Diagnostics.ActivitySpanId spanId);
```

Determines whether this instance and the specified `ActivitySpanId` instance have the same value.

Parameters:

- `spanId`: The instance to compare.

Returns: `true` if `spanId` has the same hex value as the current instance; otherwise, `false`.

To be added.

## ActivitySpanId.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

the current instance and a specified object, which also must be an `ActivitySpanId` instance, have the same value.

Parameters:

- `obj`: The object to compare.

Returns: `true` if `obj` is an instance of `ActivitySpanId` and has the same hex value as the current instance; otherwise, `false`.

To be added.

## ActivitySpanId.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code of the SpanId.

Returns: The hash code of the SpanId.

To be added.

## ActivitySpanId.op_Equality(ActivitySpanId, ActivitySpanId) method

```csharp
public static bool operator == (System.Diagnostics.ActivitySpanId spanId1, System.Diagnostics.ActivitySpanId spandId2);
```

Determines whether two specified `ActivitySpanId` instances have the same value.

Parameters:

- `spanId1`: The first instance to compare.
- `spandId2`: The second instance to compare.

Returns: `true` if the SpanId of `spanId1` is the same as the SpanId of `spandId2`; otherwise, `false`.

To be added.

## ActivitySpanId.op_Inequality(ActivitySpanId, ActivitySpanId) method

```csharp
public static bool operator != (System.Diagnostics.ActivitySpanId spanId1, System.Diagnostics.ActivitySpanId spandId2);
```

Determine whether two specified `ActivitySpanId` instances have unequal values.

Parameters:

- `spanId1`: The first instance to compare.
- `spandId2`: The second instance to compare.

Returns: `true` if the SpanId of `spanId1` is different from the SpanId of `spandId2`; otherwise, `false`.

To be added.

## ActivitySpanId.ToHexString() method

```csharp
public string ToHexString ();
```

Returns a 16-character hexadecimal string that represents this span ID.

Returns: The 16-character hexadecimal string representation of this span ID.

To be added.

## ActivitySpanId.ToString() method

```csharp
public override string ToString ();
```

Returns a 16-character hexadecimal string that represents this span ID.

Returns: The 16-character hexadecimal string representation of this span ID.

To be added.
