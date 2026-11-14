---
title: "Convert class (part 2 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 2 of 23)

## Convert.ChangeType(Object, Type, IFormatProvider) method

```csharp
public static object? ChangeType (object? value, Type conversionType, IFormatProvider? provider);
```

Returns an object of the specified type whose value is equivalent to the specified object. A parameter supplies culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `conversionType`: The type of object to return.
- `provider`: An object that supplies culture-specific formatting information.

Returns: An object whose type is `conversionType` and whose value is equivalent to `value`.

-or-

`value`, if the `Type` of `value` and `conversionType` are equal.

-or-

A null reference (`Nothing` in Visual Basic), if `value` is `null` and `conversionType` is not a value type.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

-or-

`value` is `null` and `conversionType` is a value type.

-or-

`value` does not implement the `IConvertible` interface.
- `FormatException`: `value` is not in a format for `conversionType` recognized by `provider`.
- `OverflowException`: `value` represents a number that is out of the range of `conversionType`.
- `ArgumentNullException`: `conversionType` is `null`.

#### Remarks
`Convert.ChangeType` is a general-purpose conversion method that converts the object specified by `value` to `conversionType`. The `value` parameter can be an object of any type, and `conversionType` can also be a `Type` object that represents any base or custom type. For the conversion to succeed, `value` must implement the `IConvertible` interface, because the method simply wraps a call to an appropriate `IConvertible` method. The method requires that conversion of `value` to `conversionType` be supported.

The `provider` parameter is an `IFormatProvider` implementation that supplies formatting information for the conversion. Whether and how this parameter is used depends on the underlying `IConvertible` implementation. If `value` is a base data type, `provider` is used only for the following conversions:

- Conversion from a number to a string, or from a string to a number. `provider` must be a `CultureInfo` object, a `NumberFormatInfo` object, or a custom `IFormatProvider` implementation that returns a `NumberFormatInfo` object. However, because the `ChangeType` method performs the conversion using the default "G" format specifier, the `provider` parameter has no effect if `value` or the target type is an unsigned integer. If `provider` is `null`, the `CultureInfo` object that represents the current culture is used.

- Conversion from a `DateTime` value to a string, or from a string to a `DateTime` value. `provider` must be a `CultureInfo` or `DateTimeFormatInfo` object. If `provider` is `null`, the `CultureInfo` object that represents the current culture is used.

If `value` is an application-defined type, its `IConvertible` implementation may use the `provider` parameter.

#### Examples
The following example defines a `Temperature` class that implements the `IConvertible` interface.

_Code sample not included: ~/snippets/csharp/System/Convert/ChangeType/changetype03.cs._

The following example creates an instance of the `Temperature` class and calls the `ChangeType` method to convert it to the basic <example-value> types supported by .NET and to a `String`. It illustrates that the `Convert.ChangeType` method wraps a call to the source type's `IConvertible` implementation.

_Code sample not included: ~/snippets/csharp/System/Convert/ChangeType/changetype03.cs._

## Convert.ChangeType(Object, TypeCode, IFormatProvider) method

```csharp
public static object? ChangeType (object? value, TypeCode typeCode, IFormatProvider? provider);
```

Returns an object of the specified type whose value is equivalent to the specified object. A parameter supplies culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `typeCode`: The type of object to return.
- `provider`: An object that supplies culture-specific formatting information.

Returns: An object whose underlying type is `typeCode` and whose value is equivalent to `value`.

-or-

A null reference (`Nothing` in Visual Basic), if `value` is `null` and `typeCode` is `TypeCode.Empty`, `TypeCode.String`, or `TypeCode.Object`.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

-or-

`value` is `null` and `typeCode` specifies a value type.

-or-

`value` does not implement the `IConvertible` interface.
- `FormatException`: `value` is not in a format for the `typeCode` type recognized by `provider`.
- `OverflowException`: `value` represents a number that is out of the range of the `typeCode` type.
- `ArgumentException`: `typeCode` is invalid.

#### Remarks
`ChangeType` is a general-purpose conversion method that converts the object specified by `value` to a predefined type specified by `typeCode`. The `value` parameter can be an object of any type. For the conversion to succeed, `value` must implement the `IConvertible` interface, because the method simply wraps a call to an appropriate `IConvertible` method. The method also requires that conversion of `value` to `typeCode` be supported.

The `ChangeType` method does not support the conversion of `value` to a custom type. To perform such a conversion, call the `ChangeType` method.

The `provider` parameter is an `IFormatProvider` implementation that supplies formatting information for the conversion. Whether and how this parameter is used depends on the underlying `IConvertible` implementation. If `value` is a base data type, `provider` is used only for the following conversions. If a `null` `IFormatProvider` argument is passed to these methods, the `CultureInfo` object that represents the current culture is used.

- Conversion from a number to a string, or from a string to a number. `provider` must be a `CultureInfo` object, a `NumberFormatInfo` object, or a custom `IFormatProvider` implementation that returns a `NumberFormatInfo` object. However, because the `ChangeType` method performs the conversion using the default "G" format specifier, the `provider` parameter has no effect if `value` or the target type is an unsigned integer.

- Conversion from a `DateTime` value to a string, or from a string to a `DateTime` value. `provider` must be a `CultureInfo` or `DateTimeFormatInfo` object.

If `value` is an application-defined type, its `IConvertible` implementation may use the `provider` parameter.

#### Examples
The following example defines a custom format provider named `InterceptProvider` that indicates when its `IFormatProvider.GetFormat` method is called and returns a `NumberFormatInfo` for the fr-FR culture and a `DateTimeFormatInfo` object for the en-US culture. This format provider is used in all calls to the `ChangeType` method. The example then creates an array with a `Double` and a `DateTime` value and makes repeated calls to `ChangeType` with each value and each member of the `TypeCode` enumeration. The example illustrates when the method uses the `IFormatProvider` parameter and also illustrates the use of the `provider` parameter to perform culture-sensitive formatting.

_Code sample not included: ~/snippets/csharp/System/Convert/ChangeType/changetype00.cs._

## Convert.FromBase64CharArray(Char[], Int32, Int32) method

```csharp
public static byte[] FromBase64CharArray (char[] inArray, int offset, int length);
```

Converts a subset of a Unicode character array, which encodes binary data as base-64 digits, to an equivalent 8-bit unsigned integer array. Parameters specify the subset in the input array and the number of elements to convert.

Parameters:

- `inArray`: A Unicode character array.
- `offset`: A position within `inArray`.
- `length`: The number of elements in `inArray` to convert.

Returns: An array of 8-bit unsigned integers equivalent to `length` elements at position `offset` in `inArray`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `length` is less than 0.

-or-

`offset` plus `length` indicates a position not within `inArray`.
- `FormatException`: The length of `inArray`, ignoring white-space characters, is not zero or a multiple of 4.

-or-

The format of `inArray` is invalid. `inArray` contains a non-base-64 character, more than two padding characters, or a non-white-space character among the padding characters.

#### Remarks
`inArray` is composed of base-64 digits, white-space characters, and trailing padding characters. The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", lowercase characters "a" to "z", numerals "0" to "9", and the symbols "+" and "/".

The white-space characters, and their Unicode names and hexadecimal code points, are tab (CHARACTER TABULATION, U+0009), newline (LINE FEED, U+000A), carriage return (CARRIAGE RETURN, U+000D), and blank (SPACE, U+0020). An arbitrary number of white-space characters can appear in `inArray` because all white-space characters are ignored.

The valueless character, "=", is used for trailing padding. The end of `inArray` can consist of zero, one, or two padding characters.

> **Important:**
>  The `Convert.FromBase64CharArray` method is designed to process a single character array that contains all the data to be decoded. To decode base-64 character data from a stream, use the `FromBase64Transform` class.

#### Examples
The following example demonstrates the use of the `FromBase64CharArray` method to decode UUencoded (base-64) data and save it as binary output.

_Code sample not included: ~/snippets/csharp/System/Convert/FromBase64CharArray/class1.cs._

The following example demonstrates the `ToBase64CharArray` and `FromBase64CharArray` methods. The input is divided into groups of three bytes (24 bits) each. Consequently, each group consists of four 6-bit numbers where each number ranges from decimal 0 to 63. In this example, there are 85 3-byte groups with one byte remaining. The first group consists of the hexadecimal values 00, 01, and 02, which yield four 6-bit values equal to decimal 0, 0, 4, and 2. Those four values correspond to the base-64 digits, "A", "A", "E", and "C", at the beginning of the output.

If an integral number of 3-byte groups does not exist, the remaining bytes are effectively padded with zeros to form a complete group. In this example, the value of the last byte is hexadecimal FF. The first 6 bits are equal to decimal 63, which corresponds to the base-64 digit "/" at the end of the output, and the next 2 bits are padded with zeros to yield decimal 48, which corresponds to the base-64 digit, "w". The last two 6-bit values are padding and correspond to the valueless padding character, "=".

_Code sample not included: ~/snippets/csharp/System/Convert/FromBase64CharArray/tb64ca.cs._

## Convert.FromBase64String(String) method

```csharp
public static byte[] FromBase64String (string s);
```

Converts the specified string, which encodes binary data as base-64 digits, to an equivalent 8-bit unsigned integer array.

Parameters:

- `s`: The string to convert.

Returns: An array of 8-bit unsigned integers that is equivalent to `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: The length of `s`, ignoring white-space characters, is not zero or a multiple of 4.

-or-

The format of `s` is invalid. `s` contains a non-base-64 character, more than two padding characters, or a non-white space-character among the padding characters.

#### Remarks
`s` is composed of base-64 digits, white-space characters, and trailing padding characters. The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", lowercase characters "a" to "z", numerals "0" to "9", and the symbols "+" and "/".

The white-space characters, and their Unicode names and hexadecimal code points, are tab (CHARACTER TABULATION, U+0009), newline (LINE FEED, U+000A), carriage return (CARRIAGE RETURN, U+000D), and blank (SPACE, U+0020). An arbitrary number of white-space characters can appear in `s` because all white-space characters are ignored.

The valueless character, "=", is used for trailing padding. The end of `s` can consist of zero, one, or two padding characters.

> **Important:**
>  The `Convert.FromBase64String` method is designed to process a single string that contains all the data to be decoded. To decode base-64 character data from a stream, use the `FromBase64Transform` class.

#### Examples
The following example uses the `ToBase64String` method to convert a byte array to a UUencoded (base-64) string, and then calls the `FromBase64String` method to restore the original byte array.

_Code sample not included: ~/snippets/csharp/System/Base64FormattingOptions/Overview/ToBase64String2.cs._

The following is a more complex example that creates a 20-element array of 32-bit integers. It then uses the `GetBytes` method to convert each element into a byte array, which it stores in the appropriate position in a buffer by calling the `Copy` method. This buffer is then passed to the `ToBase64String` method to create a UUencoded (base-64) string.  It then calls the `FromBase64String` method to decode the UUencoded string, and calls the `BitConverter.ToInt32` method to convert each set of four bytes (the size of a 32-bit integer) to an integer. The output from the example shows that the original array has been successfully restored.

_Code sample not included: ~/snippets/csharp/System/Base64FormattingOptions/Overview/ToBase64String.cs._

## Convert.FromHexString(Byte>) method

```csharp
public static byte[] FromHexString (ReadOnlySpan<byte> utf8Source);
```

Converts the span, which encodes binary data as hex characters, to an equivalent 8-bit unsigned integer array.

Parameters:

- `utf8Source`: The UTF-8 span to convert.

Returns: An array of 8-bit unsigned integers that is equivalent to `utf8Source`.

Exceptions:

- `FormatException`: The length of `utf8Source` is not zero or a multiple of two.
- `FormatException`: The format of `utf8Source` is invalid -OR- `utf8Source` contains a non-hex character.

To be added.

## Convert.FromHexString(Char>) method

```csharp
public static byte[] FromHexString (ReadOnlySpan<char> chars);
```

Converts the span, which encodes binary data as hex characters, to an equivalent 8-bit unsigned integer array.

Parameters:

- `chars`: The span to convert.

Returns: An array of 8-bit unsigned integers that is equivalent to `chars`.

Exceptions:

- `FormatException`: The length of `chars`, is not zero or a multiple of 2.
- `FormatException`: The format of `chars` is invalid. `chars` contains a non-hex character.

To be added.
