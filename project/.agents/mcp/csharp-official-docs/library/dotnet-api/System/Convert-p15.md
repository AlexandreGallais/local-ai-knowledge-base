---
title: "Convert class (part 15 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 15 of 23)

## Convert.ToSByte(Single) method

```csharp
public static sbyte ToSByte (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 8-bit signed integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 8-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Single` values to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(String) method

```csharp
public static sbyte ToSByte (string? value);
```

Converts the specified string representation of a number to an equivalent 8-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: An 8-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if value is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
Using the `ToSByte` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `SByte.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts string representations of `SByte` values with the `ToSByte` method, using default formatting.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/tosbyte.cs._

## Convert.ToSByte(UInt16) method

```csharp
public static sbyte ToSByte (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent 8-bit signed integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned 16-bit integers to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(UInt32) method

```csharp
public static sbyte ToSByte (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 8-bit signed integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an integer array to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(UInt64) method

```csharp
public static sbyte ToSByte (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 8-bit signed integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of long integers to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Object, IFormatProvider) method

```csharp
public static sbyte ToSByte (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to an 8-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: An 8-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a `ByteString` class that stores both signed and unsigned bytes as hexadecimal strings along with a field that indicates the sign of the byte. The `ByteString` class implements the `IConvertible` interface. Its `IConvertible.ToSByte` method calls the `Parse` method to perform the conversion. If it fails, it throws an `OverflowException`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte2.cs._

The following example shows how the `IConvertible.ToSByte` implementation of the `ByteString` class is called by the `ToSByte` method.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte2.cs._

## Convert.ToSByte(String, IFormatProvider) method

```csharp
public static sbyte ToSByte (string value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 8-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `SByte.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts string representations of `SByte` values with the `ToSByte` method, using an `IFormatProvider` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/tosbyte.cs._

## Convert.ToSByte(String, Int32) method

```csharp
public static sbyte ToSByte (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 8-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: An 8-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 signed number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a non-base 10 signed number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the negative sign is not supported for non-base 10 numeric representations, the `ToSByte` method assumes that negative numbers use two's complement representation. In other words, the method always interprets the high-order bit of a byte (bit 7) as its sign bit. As a result, it is possible to write code in which a non-base 10 number that is out of the range of the `SByte` data type is converted to an `SByte` value without the method throwing an exception. The following example converts `MaxValue` to its hexadecimal string representation, and then calls the `ToSByte` method. Instead of throwing an exception, the method displays the message, "0xff converts to -1."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method is using the appropriate numeric representation to interpret a particular value. As the following example illustrates, you can ensure that the method handles overflows appropriately by first determining whether a value represents an unsigned or a signed type when converting it to its hexadecimal string representation. Throw an exception if the original value was an unsigned type but the conversion back to a signed byte yields a value whose sign bit is on.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

#### Examples
The following example attempts to interpret the elements in a string array as the binary, octal, and hexadecimal representation of numeric values in order to convert them to unsigned bytes.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte3.cs._

## Convert.ToSingle(Boolean) method

```csharp
public static float ToSingle (bool value);
```

Converts the specified Boolean value to the equivalent single-precision floating-point number.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the Boolean values `true` and `false` to `Single` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Byte) method

```csharp
public static float ToSingle (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent single-precision floating-point number.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of byte values to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Char) method

```csharp
public static float ToSingle (char value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Unicode character to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToSingle(DateTime) method

```csharp
public static float ToSingle (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToSingle(Decimal) method

```csharp
public static float ToSingle (decimal value);
```

Converts the value of the specified decimal number to an equivalent single-precision floating-point number.

Parameters:

- `value`: The decimal number to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

`value` is rounded using rounding to nearest. For example, when rounded to two decimals, the value 2.345 becomes 2.34 and the value 2.355 becomes 2.36.

#### Examples
The following example converts each element in an array of `Decimal` values to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Double) method

```csharp
public static float ToSingle (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent single-precision floating-point number.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

`value` is rounded using rounding to nearest. For example, when rounded to two decimals, the value 2.345 becomes 2.34 and the value 2.355 becomes 2.36.

#### Examples
The following example converts each element in an array of `Double` values to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Int16) method

```csharp
public static float ToSingle (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent single-precision floating-point number.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of 16-bit integers to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._
