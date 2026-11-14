---
title: "StandardFormat struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/StandardFormat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StandardFormat struct

Namespace: `System.Buffers`

```csharp
public readonly struct StandardFormat : IEquatable<System.Buffers.StandardFormat>
```

Represents a standard format string without using an actual string.

A `StandardFormat` object consists of a single character standard format specifier (such as 'G', 'D', or 'X') and an optional precision specifier. The precision specifier can range from 0 to 9, or it can be the special `NoPrecision` value.

## StandardFormat.StandardFormat(Char, Byte) constructor

```csharp
public StandardFormat (char symbol, byte precision = 255);
```

Initializes a new instance of the `StandardFormat` structure.

Parameters:

- `symbol`: A type-specific format specifier, such as 'G', 'D', or 'X'.
- `precision`: An optional precision ranging from 0 to 99, or the special value `StandardFormat.NoPrecision` (the default).

Exceptions:

- `ArgumentOutOfRangeException`: `symbol` is not `StandardFormat.NoPrecision`, and its value is greater than `StandardFormat.MaxPrecision`.

-or-

`symbol` cannot be converted to a `Byte`.

To be added.

## StandardFormat.HasPrecision property

```csharp
public bool HasPrecision { get; }
```

Gets a value that indicates whether a format has a defined precision.

Returns: `true` if the format has a precision other than `StandardFormat.NoPrecision`; otherwise, `false`.

To be added.

## StandardFormat.IsDefault property

```csharp
public bool IsDefault { get; }
```

Gets a value that indicates whether the current instance is a default format.

Returns: `true` if the current instance is a default format; otherwise, `false`.

A default format has a format specifier whose `Byte` value is 0 and whose precision is `NoPrecision`.

## StandardFormat.Precision property

```csharp
public byte Precision { get; }
```

Gets the precision component of the format.

Returns: The precision component, which can be `StandardFormat.NoPrecision`, or can range from 0 to 9.

To be added.

## StandardFormat.Symbol property

```csharp
public char Symbol { get; }
```

Gets the character component of the format.

Returns: The character component of the format.

To be added.

## StandardFormat.Equals(StandardFormat) method

```csharp
public bool Equals (System.Buffers.StandardFormat other);
```

Returns a value that indicates whether the specified `StandardFormat` is equal to the current instance.

Parameters:

- `other`: The format to compare to the current instance.

Returns: `true` if the two instances are equal; otherwise, `false`.

To be added.

## StandardFormat.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the specified object is a `StandardFormat` object that is equal to the current instance.

Parameters:

- `obj`: An object to compare to the current instance.

Returns: `true` if the two instances are equal; otherwise, `false`.

To be added.

## StandardFormat.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for this instance.

To be added.

## StandardFormat.op_Equality(StandardFormat, StandardFormat) method

```csharp
public static bool operator == (System.Buffers.StandardFormat left, System.Buffers.StandardFormat right);
```

Returns a value that indicates whether two `StandardFormat` instances are equal.

Parameters:

- `left`: The first format to compare.
- `right`: The second format to compare.

Returns: `true` if the two instances are equal; otherwise, `false`.

Two `StandardFormat` instances are equal if their `Symbol` and `Precision` properties are equal.

## StandardFormat.op_Implicit(Char) method

```csharp
public static implicit operator System.Buffers.StandardFormat (char symbol);
```

Converts a character to a `StandardFormat` instance using `StandardFormat.NoPrecision` precision.

Parameters:

- `symbol`: The character to convert to a `StandardFormat` value.

Returns: A format with a `StandardFormat.Symbol` property equal to `symbol` and a `StandardFormat.Precision` property equal to `StandardFormat.NoPrecision`.

To be added.

## StandardFormat.op_Inequality(StandardFormat, StandardFormat) method

```csharp
public static bool operator != (System.Buffers.StandardFormat left, System.Buffers.StandardFormat right);
```

Determines whether two `StandardFormat` instances are unequal.

Parameters:

- `left`: The first format to compare.
- `right`: The second format to compare.

Returns: `true` if the two formats are unequal; otherwise, `false`.

Two `StandardFormat` instances are unequal if their `Symbol` and `Precision` properties are not identical.

## StandardFormat.Parse(Char>) method

```csharp
public static System.Buffers.StandardFormat Parse (ReadOnlySpan<char> format);
```

Converts a `ReadOnlySpan<System.Char>` into a `StandardFormat` instance using `StandardFormat.NoPrecision` precision.

Parameters:

- `format`: A read-only span that contains the character to parse.

Returns: A value whose `StandardFormat.Symbol` property value is the character in `format` and whose `StandardFormat.Precision` property value is `StandardFormat.NoPrecision`.

To be added.

## StandardFormat.Parse(String) method

```csharp
public static System.Buffers.StandardFormat Parse (string? format);
```

Converts a classic .NET standard format string to a `StandardFormat` instance.

Parameters:

- `format`: A classic .NET standard format string.

Returns: A format.

Exceptions:

- `FormatException`: `format` is not a valid standard format string.

To be added.

## StandardFormat.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this format.

Returns: The string representation of this format.

The string representation of a `StandardFormat` instance is a standard .NET format string.

## StandardFormat.TryParse(Char>, StandardFormat) method

```csharp
public static bool TryParse (ReadOnlySpan<char> format, out System.Buffers.StandardFormat result);
```

Attempts to convert a `ReadOnlySpan<Char>` to a `StandardFormat` instance and returns a value that indicates whether the parsing operation succeeded.

Parameters:

- `format`: A read-only span that contains the character to convert.
- `result`: When the method returns, contains the parsed `StandardFormat` instance if the operation was successful.

Returns: `true` if the parsing operation was successful; otherwise, `false`.

To be added.

## StandardFormat.MaxPrecision field

```csharp
public const byte MaxPrecision = 99;
```

Defines the maximum valid precision value.

The maximum valid precision is 99.

## StandardFormat.NoPrecision field

```csharp
public const byte NoPrecision = 255;
```

Indicates that a format doesn't use a precision or that the precision is unspecified.

To be added.
