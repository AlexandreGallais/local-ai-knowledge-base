---
title: "Convert class (part 19 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 19 of 23)

## Convert.ToUInt16(Double) method

```csharp
public static ushort ToUInt16 (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 16-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example converts each element in an array of `Double` values to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Int16) method

```csharp
public static ushort ToUInt16 (short value);
```

Converts the value of the specified 16-bit signed integer to the equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero.

#### Examples
The following example attempts to convert each element in a 16-bit integer array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Int32) method

```csharp
public static ushort ToUInt16 (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example converts each element in an integer array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Int64) method

```csharp
public static ushort ToUInt16 (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example converts each element in a long integer array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Object) method

```csharp
public static ushort ToUInt16 (object? value);
```

Converts the value of the specified object to a 16-bit unsigned integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A 16-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the  `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToUInt16` method of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(SByte) method

```csharp
public static ushort ToUInt16 (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero.

#### Examples
The following example converts each element in a signed byte array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Single) method

```csharp
public static ushort ToUInt16 (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 16-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example converts each element in an array of `String` values to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(String) method

```csharp
public static ushort ToUInt16 (string? value);
```

Converts the specified string representation of a number to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A 16-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
Using the `ToUInt16` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `UInt16.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example attempts to convert each element in a numeric string array to a 16-bit unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(UInt16) method

```csharp
public static ushort ToUInt16 (ushort value);
```

Returns the specified 16-bit unsigned integer; no actual conversion is performed.

Parameters:

- `value`: The 16-bit unsigned integer to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToUInt16(UInt32) method

```csharp
public static ushort ToUInt16 (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned integers to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(UInt64) method

```csharp
public static ushort ToUInt16 (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned long integers to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Object, IFormatProvider) method

```csharp
public static ushort ToUInt16 (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to a 16-bit unsigned integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 16-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the  `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToUInt16` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a `HexString` class that implements the `IConvertible` interface and that is designed to hold the string representation of both 16-bit signed and 16-bit unsigned values. The class includes a `Sign` property that indicates the sign of its hexadecimal value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_3.cs._

The following example shows that a call to the `ToUInt16` method that passes a `HexString` object as a parameter, in turn, calls the `IConvertible.ToUInt16` implementation of the `HexString` class.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_3.cs._

## Convert.ToUInt16(String, IFormatProvider) method

```csharp
public static ushort ToUInt16 (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 16-bit unsigned integer, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 16-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
The return value is the result of invoking `UInt16.Parse` on `value`.

`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `UInt16.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example defines a custom `NumberFormatInfo` object that recognizes the string "pos" as the positive sign and the string "neg" as the negative sign. It then attempts to convert each element of a numeric string array to an integer using both this provider and the `NumberFormatInfo` provider for the invariant culture.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_4.cs._
