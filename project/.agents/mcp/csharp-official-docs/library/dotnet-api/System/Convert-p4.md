---
title: "Convert class (part 4 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 4 of 23)

## Convert.ToBase64String(Byte[], Base64FormattingOptions) method

```csharp
public static string ToBase64String (byte[] inArray, Base64FormattingOptions options);
```

Converts an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits. You can specify whether to insert line breaks in the return value.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.
- `options`: `Base64FormattingOptions.InsertLineBreaks` to insert a line break every 76 characters, or `Base64FormattingOptions.None` to not insert line breaks.

Returns: The string representation in base 64 of the elements in `inArray`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.
- `ArgumentException`: `options` is not a valid `Base64FormattingOptions` value.

#### Remarks
The elements of the `inArray` parameter are taken as a numeric value and converted to a string representation in base 64.

The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", the lowercase characters "a" to "z", the numerals "0" to "9", and the symbols "+" and "/". The valueless character "=" is used for trailing padding.

> **Important:**
>  The `Convert.ToBase64String` method is designed to process a single byte array that contains all the data to be encoded. To encode data from a stream, use the `ToBase64Transform` class.

If the `options` parameter is set to `InsertLineBreaks` and the output of the conversion is longer than 76 characters, a line break is inserted every 76 characters. A line break is defined as a carriage return character (U+000D) followed by a line feed character (U+000A). Because line breaks are considered white-space characters in a base-64 encoding, they are ignored when converting a base-64 encoded string back to a byte array. The line breaks are simply convenient when displaying the encoded string to a control or a device such as a console window. For more information, see RFC 2045, "Multipurpose Internet Mail Extensions", at https://www.rfc-editor.org/.

#### Examples
The following example calls the `ToBase64String` with a `InsertLineBreaks` argument to insert line breaks in the string that is produced by encoding a 100-element byte array.

_Code sample not included: ~/snippets/csharp/System/Base64FormattingOptions/Overview/ToBase64String3.cs._

As the output from the example shows, the `Convert.FromBase64String` succeeds in restoring the original byte array; the line break characters are ignored during the conversion.

## Convert.ToBase64String(Byte>, Base64FormattingOptions) method

```csharp
public static string ToBase64String (ReadOnlySpan<byte> bytes, Base64FormattingOptions options = System.Base64FormattingOptions.None);
```

Converts the 8-bit unsigned integers inside the specified read-only span into their equivalent string representation that is encoded with base-64 digits. You can optionally specify whether to insert line breaks in the return value.

Parameters:

- `bytes`: A read-only span of 8-bit unsigned integers.
- `options`: One of the enumeration values that specify whether to insert line breaks in the return value. The default value is `Base64FormattingOptions.None`.

Returns: The string representation in base 64 of the elements in `bytes`. If the length of `bytes` is 0, an empty string is returned.

Exceptions:

- `ArgumentException`: `options` is not a valid `Base64FormattingOptions` value.
- `OutOfMemoryException`: The output length was larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## Convert.ToBase64String(Byte[], Int32, Int32) method

```csharp
public static string ToBase64String (byte[] inArray, int offset, int length);
```

Converts a subset of an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits. Parameters specify the subset as an offset in the input array, and the number of elements in the array to convert.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.
- `offset`: An offset in `inArray`.
- `length`: The number of elements of `inArray` to convert.

Returns: The string representation in base 64 of `length` elements of `inArray`, starting at position `offset`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `length` is negative.

-or-

`offset` plus `length` is greater than the length of `inArray`.

#### Remarks
The elements of `inArray` are taken as a numeric value and converted to a string representation in base 64.

The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", the lowercase characters "a" to "z", the numerals "0" to "9", and the symbols "+" and "/". The valueless character, "=", is used for trailing padding.

The `offset` and `length` parameters are 32-bit signed numbers. The `offset` parameter is zero-based.

> **Important:**
>  The `Convert.ToBase64String` method is designed to process a single byte array that contains all the data to be encoded. To encode data from a stream, use the `ToBase64Transform` class.

## Convert.ToBase64String(Byte[], Int32, Int32, Base64FormattingOptions) method

```csharp
public static string ToBase64String (byte[] inArray, int offset, int length, Base64FormattingOptions options);
```

Converts a subset of an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits. Parameters specify the subset as an offset in the input array, the number of elements in the array to convert, and whether to insert line breaks in the return value.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.
- `offset`: An offset in `inArray`.
- `length`: The number of elements of `inArray` to convert.
- `options`: `Base64FormattingOptions.InsertLineBreaks` to insert a line break every 76 characters, or `Base64FormattingOptions.None` to not insert line breaks.

Returns: The string representation in base 64 of `length` elements of `inArray`, starting at position `offset`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `length` is negative.

-or-

`offset` plus `length` is greater than the length of `inArray`.
- `ArgumentException`: `options` is not a valid `Base64FormattingOptions` value.

#### Remarks
The elements of the `inArray` parameter are taken as a numeric value and converted to a string representation in base 64.

The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", the lowercase characters "a" to "z", the numerals "0" to "9", and the symbols "+" and "/". The valueless character "=" is used for trailing padding.

The `offset` and `length` parameters are 32-bit signed numbers. The `offset` parameter is zero-based.

> **Important:**
>  The `Convert.ToBase64String` method is designed to process a single byte array that contains all the data to be encoded. To encode data from a stream, use the `ToBase64Transform` class.

If the `options` parameter is set to `InsertLineBreaks` and the output of the conversion is longer than 76 characters, a line break is inserted every 76 characters. A line break is defined as a carriage return character (U+000D) followed by a line feed character (U+000A). For more information, see RFC 2045, "Multipurpose Internet Mail Extensions", at https://www.rfc-editor.org/.

#### Examples
The following example demonstrates the `Convert.ToBase64String` method. The input is divided into groups of three bytes (24 bits) each. Consequently, each group consists of four 6-bit numbers where each number ranges from decimal 0 to 63. In this example, there are 85 3-byte groups with one byte remaining. The first group consists of the hexadecimal values 00, 01, and 02, which yield four 6-bit values equal to decimal 0, 0, 4, and 2. Those four values correspond to the base-64 digits "A", "A", "E", and "C" at the beginning of the output.

If an integral number of 3-byte groups does not exist, the remaining bytes are effectively padded with zeros to form a complete group. In this example, the value of the last byte is hexadecimal FF. The first 6 bits are equal to decimal 63, which corresponds to the base-64 digit "/" at the end of the output, and the next 2 bits are padded with zeros to yield decimal 48, which corresponds to the base-64 digit, "w". The last two 6-bit values are padding and correspond to the valueless padding character, "=".

_Code sample not included: ~/snippets/csharp/System/Convert/ToBase64String/tb64s.cs._

## Convert.ToBoolean(Boolean) method

```csharp
public static bool ToBoolean (bool value);
```

Returns the specified Boolean value; no actual conversion is performed.

Parameters:

- `value`: The Boolean value to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToBoolean(Byte) method

```csharp
public static bool ToBoolean (byte value);
```

Converts the value of the specified 8-bit unsigned integer to an equivalent Boolean value.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Byte` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Char) method

```csharp
public static bool ToBoolean (char value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Unicode character to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToBoolean(DateTime) method

```csharp
public static bool ToBoolean (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

#### Examples
The following example demonstrates that an attempt to convert a `DateTime` value to a Boolean type throws `InvalidCastException`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToBoolean(Decimal) method

```csharp
public static bool ToBoolean (decimal value);
```

Converts the value of the specified decimal number to an equivalent Boolean value.

Parameters:

- `value`: The number to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Decimal` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Double) method

```csharp
public static bool ToBoolean (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent Boolean value.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts a Boolean to a `Double` and a `Double` to a Boolean value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToBoolean(Int16) method

```csharp
public static bool ToBoolean (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent Boolean value.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Int16` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Int32) method

```csharp
public static bool ToBoolean (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent Boolean value.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Int32` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Int64) method

```csharp
public static bool ToBoolean (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent Boolean value.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Int64` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Object) method

```csharp
public static bool ToBoolean (object? value);
```

Converts the value of a specified object to an equivalent Boolean value.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: `true` or `false`, which reflects the value returned by invoking the `IConvertible.ToBoolean` method for the underlying type of `value`. If `value` is `null`, the method returns `false`.

Exceptions:

- `FormatException`: `value` is a string that does not equal `Boolean.TrueString` or `Boolean.FalseString`.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion of `value` to a `Boolean` is not supported.

#### Examples
The following example converts an array of object values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(SByte) method

```csharp
public static bool ToBoolean (sbyte value);
```

Converts the value of the specified 8-bit signed integer to an equivalent Boolean value.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `SByte` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Single) method

```csharp
public static bool ToBoolean (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent Boolean value.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Single` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._
