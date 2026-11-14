---
title: "Convert class (part 22 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 22 of 23)

## Convert.ToUInt64(Single) method

```csharp
public static ulong ToUInt64 (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 64-bit unsigned integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 64-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Single` values to an unsigned long integer. The output shows that fractional values are rounded before the conversion is performed.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_1.cs._

## Convert.ToUInt64(String) method

```csharp
public static ulong ToUInt64 (string? value);
```

Converts the specified string representation of a number to an equivalent 64-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A 64-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
Using the `ToInt64` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `UInt64.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example interprets the elements of a string array as numeric strings and attempts to convert them to unsigned long integers.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_1.cs._

## Convert.ToUInt64(UInt16) method

```csharp
public static ulong ToUInt64 (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent 64-bit unsigned integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A 64-bit unsigned integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of unsigned 16-bit integers to an unsigned long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_1.cs._

## Convert.ToUInt64(UInt32) method

```csharp
public static ulong ToUInt64 (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 64-bit unsigned integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A 64-bit unsigned integer that is equivalent to `value`.

#### Examples
The following example converts each element in an unsigned integer array to an unsigned long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_1.cs._

## Convert.ToUInt64(UInt64) method

```csharp
public static ulong ToUInt64 (ulong value);
```

Returns the specified 64-bit unsigned integer; no actual conversion is performed.

Parameters:

- `value`: The 64-bit unsigned integer to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToUInt64(Object, IFormatProvider) method

```csharp
public static ulong ToUInt64 (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to a 64-bit unsigned integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 64-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToUInt64` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a `HexString` class that implements the `IConvertible` interface and that is designed to hold the string representation of both 64-bit signed and 64-bit unsigned values. The class includes a `Sign` property that indicates the sign of its hexadecimal value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_4.cs._

The following example shows that a call to the `ToUInt64` method that passes a `HexString` object as a parameter, in turn, calls the `IConvertible.ToUInt64` implementation of the `HexString` class.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_4.cs._

## Convert.ToUInt64(String, IFormatProvider) method

```csharp
public static ulong ToUInt64 (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 64-bit unsigned integer, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 64-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
The return value is the result of invoking `UInt64.Parse` on `value`.

`provider` is an `IFormatProvider` implementation that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `UInt64.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example defines a custom `NumberFormatInfo` object that recognizes the string "pos" as the positive sign and the string "neg" as the negative sign. It then attempts to convert each element of a numeric string array to an unsigned long integer. The conversion uses both the custom provider and the `NumberFormatInfo` provider for the invariant culture.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_2.cs._

## Convert.ToUInt64(String, Int32) method

```csharp
public static ulong ToUInt64 (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 64-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: A 64-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 unsigned number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a non-base 10 unsigned number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the `UInt64` data type supports unsigned values only, the `ToUInt64` method assumes that `value` is expressed using unsigned binary representation. In other words, all 64 bits are used to represent the numeric value, and a sign bit is absent. As a result, it is possible to write code in which a signed long integer value that is out of the range of the `UInt64` data type is converted to a `UInt64` value without the method throwing an exception. The following example converts `MinValue` to its hexadecimal string representation, and then calls the `ToUInt64` method. Instead of throwing an exception, the method displays the message, "0x8000000000000000 converts to 9223372036854775808."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method or operator is using the appropriate numeric representation to interpret a particular value. The following example illustrates one technique for ensuring that the method does not inappropriately use binary representation to interpret a value that uses two's complement representation when converting a hexadecimal string to a `UInt64` value. The example determines whether a value represents a signed or an unsigned integer while it is converting that value to its string representation. When the example converts the value to a `UInt64` value, it checks whether the original value was a signed integer. If so, and if its high-order bit is set (which indicates that the original value was negative), the method throws an exception.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

#### Examples
The following example attempts to interpret each element in an array of numeric strings as a hexadecimal value and to convert it to an unsigned long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt64/touint64_3.cs._

## Convert.TryFromBase64Chars(Char>, Byte>, Int32) method

```csharp
public static bool TryFromBase64Chars (ReadOnlySpan<char> chars, Span<byte> bytes, out int bytesWritten);
```

Tries to convert the specified span containing a string representation that is encoded with base-64 digits into a span of 8-bit unsigned integers.

Parameters:

- `chars`: A span containing the string representation that is encoded with base-64 digits.
- `bytes`: The span in which to write the converted 8-bit unsigned integers. If this method returns `false`, either the span remains unmodified or contains an incomplete conversion of `chars`, up to the last valid character.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `bytes`.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## Convert.TryFromBase64String(String, Byte>, Int32) method

```csharp
public static bool TryFromBase64String (string s, Span<byte> bytes, out int bytesWritten);
```

Tries to convert the specified string representation that is encoded with base-64 digits into a span of 8-bit unsigned integers.

Parameters:

- `s`: The string representation that is encoded with base-64 digits.
- `bytes`: The span in which to write the converted 8-bit unsigned integers. When this method returns `false`, either the span remains unmodified or contains an incomplete conversion of `s`, up to the last valid character.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `bytes`.

Returns: `true` if the conversion was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.

To be added.

## Convert.TryToBase64Chars(Byte>, Char>, Int32, Base64FormattingOptions) method

```csharp
public static bool TryToBase64Chars (ReadOnlySpan<byte> bytes, Span<char> chars, out int charsWritten, Base64FormattingOptions options = System.Base64FormattingOptions.None);
```

Tries to convert the 8-bit unsigned integers inside the specified read-only span into their equivalent string representation that is encoded with base-64 digits. You can optionally specify whether to insert line breaks in the return value.

Parameters:

- `bytes`: A read-only span of 8-bit unsigned integers.
- `chars`: The span in which to write the string representation in base 64 of the elements in `bytes`. If the length of `bytes` is 0, or when this method returns `false`, nothing is written into this parameter.
- `charsWritten`: When this method returns, contains the total number of characters written into `chars`.
- `options`: One of the enumeration values that specify whether to insert line breaks in the return value. The default value is `Base64FormattingOptions.None`.

Returns: `true` if the conversion is successful; otherwise, `false`.

Exceptions:

- `ArgumentException`: `options` is not a valid `Base64FormattingOptions` value.

To be added.

## Convert.TryToHexString(Byte>, Byte>, Int32) method

```csharp
public static bool TryToHexString (ReadOnlySpan<byte> source, Span<byte> utf8Destination, out int bytesWritten);
```

Converts a span of 8-bit unsigned integers to its equivalent UTF-8 span representation that is encoded with uppercase hex characters.

Parameters:

- `source`: A span of 8-bit unsigned integers.
- `utf8Destination`: The UTF-8 span representation in hex of the elements in `source`.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.
