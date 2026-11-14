---
title: "Convert class (part 3 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 3 of 23)

## Convert.FromHexString(String) method

```csharp
public static byte[] FromHexString (string s);
```

Converts the specified string, which encodes binary data as hex characters, to an equivalent 8-bit unsigned integer array.

Parameters:

- `s`: The string to convert.

Returns: An array of 8-bit unsigned integers that is equivalent to `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: The length of `s`, is not zero or a multiple of 2.
- `FormatException`: The format of `s` is invalid. `s` contains a non-hex character.

To be added.

## Convert.FromHexString(Byte>, Byte>, Int32, Int32) method

```csharp
public static System.Buffers.OperationStatus FromHexString (ReadOnlySpan<byte> utf8Source, Span<byte> destination, out int bytesConsumed, out int bytesWritten);
```

Converts the span of UTF-8 chars, which encodes binary data as hex characters, to an equivalent 8-bit unsigned integer span.

Parameters:

- `utf8Source`: The span to convert.
- `destination`: The span in which to write the converted 8-bit unsigned integers.
- `bytesConsumed`: When this method returns, contains the number of bytes that were consumed from `utf8Source`.
- `bytesWritten`: When this method returns, contains the number of bytes that were written to `destination`.

Returns: An `OperationStatus` describing the result of the operation.

When this method returns a value other than `OperationStatus.Done`, the `destination` span either remains unmodified or contains an incomplete conversion of `utf8Source`, up to the last valid character.

## Convert.FromHexString(Char>, Byte>, Int32, Int32) method

```csharp
public static System.Buffers.OperationStatus FromHexString (ReadOnlySpan<char> source, Span<byte> destination, out int charsConsumed, out int bytesWritten);
```

Converts the span of chars, which encodes binary data as hex characters, to an equivalent 8-bit unsigned integer span.

Parameters:

- `source`: The span to convert.
- `destination`: The span in which to write the converted 8-bit unsigned integers. When this method returns value different than `OperationStatus.Done`, either the span remains unmodified or contains an incomplete conversion of `source`, up to the last valid character.
- `charsConsumed`: When this method returns, contains the number of characters that were consumed from `source`.
- `bytesWritten`: When this method returns, contains the number of bytes that were written to `destination`.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Convert.FromHexString(String, Byte>, Int32, Int32) method

```csharp
public static System.Buffers.OperationStatus FromHexString (string source, Span<byte> destination, out int charsConsumed, out int bytesWritten);
```

Converts the string, which encodes binary data as hex characters, to an equivalent 8-bit unsigned integer span.

Parameters:

- `source`: The string to convert.
- `destination`: The span in which to write the converted 8-bit unsigned integers. When this method returns value different than `OperationStatus.Done`, either the span remains unmodified or contains an incomplete conversion of `source`, up to the last valid character.
- `charsConsumed`: When this method returns, contains the number of characters that were consumed from `source`.
- `bytesWritten`: When this method returns, contains the number of bytes that were written to `destination`.

Returns: An `OperationStatus` describing the result of the operation.

Exceptions:

- `ArgumentNullException`: Passed string `source` is `null`.

To be added.

## Convert.GetTypeCode(Object) method

```csharp
public static TypeCode GetTypeCode (object? value);
```

Returns the `TypeCode` for the specified object.

Parameters:

- `value`: An object that implements the `IConvertible` interface.

Returns: The `TypeCode` for `value`, or `TypeCode.Empty` if `value` is `null`.

To be added.

## Convert.IsDBNull(Object) method

```csharp
public static bool IsDBNull (object? value);
```

Returns an indication whether the specified object is of type `DBNull`.

Parameters:

- `value`: An object.

Returns: `true` if `value` is of type `DBNull`; otherwise, `false`.

#### Remarks
The `Convert.IsDBNull` method tests whether the `value` parameter is equal to `Value`. It is equivalent to the following code:

_Code sample not included: ~/snippets/csharp/System/Convert/IsDBNull/Form1.cs._

> **Note:**
>  `Value` is used to indicate a value that is missing. It is not equivalent to `null` or to `Empty`. Therefore, code such as `Convert.IsDBNull(null)` in C# or `Convert.IsDBNull(Nothing)` in Visual Basic <example-value>`false`.

#### Examples
The following example uses a `SqlDataReader` object to retrieve survey data from a database. It assigns each row's field values to an array, and then passes each array element to the `Convert.IsDBNull` method. If the method returns `true`, the example assigns the string "NA" to the array element. The array is then added to the `DataGridView.Rows` collection of a `DataGridView` control.

_Code sample not included: ~/snippets/csharp/System/Convert/IsDBNull/Form1.cs._

## Convert.ToBase64CharArray(Byte[], Int32, Int32, Char[], Int32) method

```csharp
public static int ToBase64CharArray (byte[] inArray, int offsetIn, int length, char[] outArray, int offsetOut);
```

Converts a subset of an 8-bit unsigned integer array to an equivalent subset of a Unicode character array encoded with base-64 digits. Parameters specify the subsets as offsets in the input and output arrays, and the number of elements in the input array to convert.

Parameters:

- `inArray`: An input array of 8-bit unsigned integers.
- `offsetIn`: A position within `inArray`.
- `length`: The number of elements of `inArray` to convert.
- `outArray`: An output array of Unicode characters.
- `offsetOut`: A position within `outArray`.

Returns: A 32-bit signed integer containing the number of bytes in `outArray`.

Exceptions:

- `ArgumentNullException`: `inArray` or `outArray` is `null`.
- `ArgumentOutOfRangeException`: `offsetIn`, `offsetOut`, or `length` is negative.

-or-

`offsetIn` plus `length` is greater than the length of `inArray`.

-or-

`offsetOut` plus the number of elements to return is greater than the length of `outArray`.

#### Remarks
The subset of `length` elements of `inArray` starting at position `offsetIn`, are taken as a numeric value and converted to a subset of elements in `outArray` starting at position `offsetOut`. The return value indicates the number of converted elements in `outArray`. The subset of `outArray` consists of base-64 digits.

The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", the lowercase characters "a" to "z", the numerals "0" to "9", and the symbols "+" and "/". The valueless character, "=", is used for trailing padding.

The `offset` and `length` parameters are 32-bit signed numbers. The `offsetIn` and `offsetOut` parameters are zero-based array positions.

> **Important:**
>  The `Convert.ToBase64CharArray` method is designed to process a single byte array that contains all the data to be encoded. To create a base-64 character array from a byte stream, use the `ToBase64Transform` class.

#### Examples
The following example demonstrates using the `Convert.ToBase64CharArray` method to UUencode (encode in base 64) a binary stream, then save the encoding to a file.

_Code sample not included: ~/snippets/csharp/System/Convert/FromBase64CharArray/class1.cs._

## Convert.ToBase64CharArray(Byte[], Int32, Int32, Char[], Int32, Base64FormattingOptions) method

```csharp
public static int ToBase64CharArray (byte[] inArray, int offsetIn, int length, char[] outArray, int offsetOut, Base64FormattingOptions options);
```

Converts a subset of an 8-bit unsigned integer array to an equivalent subset of a Unicode character array encoded with base-64 digits. Parameters specify the subsets as offsets in the input and output arrays, the number of elements in the input array to convert, and whether line breaks are inserted in the output array.

Parameters:

- `inArray`: An input array of 8-bit unsigned integers.
- `offsetIn`: A position within `inArray`.
- `length`: The number of elements of `inArray` to convert.
- `outArray`: An output array of Unicode characters.
- `offsetOut`: A position within `outArray`.
- `options`: `Base64FormattingOptions.InsertLineBreaks` to insert a line break every 76 characters, or `Base64FormattingOptions.None` to not insert line breaks.

Returns: A 32-bit signed integer containing the number of bytes in `outArray`.

Exceptions:

- `ArgumentNullException`: `inArray` or `outArray` is `null`.
- `ArgumentOutOfRangeException`: `offsetIn`, `offsetOut`, or `length` is negative.

-or-

`offsetIn` plus `length` is greater than the length of `inArray`.

-or-

`offsetOut` plus the number of elements to return is greater than the length of `outArray`.
- `ArgumentException`: `options` is not a valid `Base64FormattingOptions` value.

#### Remarks
The subset of `length` elements of the `inArray` parameter starting at position `offsetIn`, are taken as a numeric value and converted to a subset of elements in the `outArray` parameter starting at position `offsetOut`. The return value indicates the number of converted elements in `outArray`. The subset of `outArray` consists of base-64 digits.

The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", the lowercase characters "a" to "z", the numerals "0" to "9", and the symbols "+" and "/". The valueless character "=" is used for trailing padding.

The `offset` and `length` parameters are 32-bit signed numbers. The `offsetIn` and `offsetOut` parameters are zero-based array positions.

> **Important:**
>  The `Convert.ToBase64CharArray` method is designed to process a single byte array that contains all the data to be encoded. To create a base-64 character array from a byte stream, use the `ToBase64Transform` class.

If the `options` parameter is set to `InsertLineBreaks` and the output of the conversion is longer than 76 characters, a line break is inserted every 76 characters. A line break is defined as a carriage return character (U+000D) followed by a line feed character (U+000A). For more information, see RFC 2045, "Multipurpose Internet Mail Extensions", at https://www.rfc-editor.org/.

#### Examples
The following example demonstrates the `Convert.ToBase64CharArray` method. The input is divided into groups of three bytes (24 bits) each. Consequently, each group consists of four 6-bit numbers where each number ranges from decimal 0 to 63. In this example, there are 85 3-byte groups with one byte remaining. The first group consists of the hexadecimal values 00, 01, and 02, which yield four 6-bit values equal to decimal 0, 0, 4, and 2. Those four values correspond to the base-64 digits "A", "A", "E", and "C" at the beginning of the output.

If an integral number of 3-byte groups does not exist, the remaining bytes are effectively padded with zeros to form a complete group. In this example, the value of the last byte is hexadecimal FF. The first 6 bits are equal to decimal 63, which corresponds to the base-64 digit "/" at the end of the output, and the next 2 bits are padded with zeros to yield decimal 48, which corresponds to the base-64 digit, "w". The last two 6-bit values are padding and correspond to the valueless padding character, "=".

_Code sample not included: ~/snippets/csharp/System/Convert/FromBase64CharArray/tb64ca.cs._

## Convert.ToBase64String(Byte[]) method

```csharp
public static string ToBase64String (byte[] inArray);
```

Converts an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.

Returns: The string representation, in base 64, of the contents of `inArray`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.

#### Remarks
The elements of `inArray` are taken as a numeric value and converted to a string representation that is encoded with base-64 digits.

The base-64 digits in ascending order from zero are the uppercase characters "A" to "Z", the lowercase characters "a" to "z", the numerals "0" to "9", and the symbols "+" and "/". The valueless character, "=", is used for trailing padding.

> **Important:**
>  The `Convert.ToBase64String` method is designed to process a single byte array that contains all the data to be encoded. To encode data from a stream, use the `ToBase64Transform` class.

Ordinarily, the `Convert.ToBase64String` method is not used to round-trip a UUEncoded (base-64 encoded) string.  That is, if you decode a string by calling the `Convert.FromBase64String` method, then encode the returned byte array by calling the `Convert.ToBase64String` method, the resulting string will not necessarily be identical to the original string. The string will round-trip only if the original string is a valid base-64 encoded string.

#### Examples
The following example uses the `ToBase64String` method to convert a byte array to a UUencoded (base-64) string, and then calls the `FromBase64String` method to restore the original byte array.

_Code sample not included: ~/snippets/csharp/System/Base64FormattingOptions/Overview/ToBase64String2.cs._

The following is a more complex example that creates a 20-element array of 32-bit integers. It then uses the `GetBytes` method to convert each element into a byte array, which it stores in the appropriate position in a buffer by calling the `Copy` method. This buffer is then passed to the `ToBase64String` method to create a UUencoded (base-64) string.  It then calls the `FromBase64String` method to decode the UUencoded string, and calls the `BitConverter.ToInt32` method to convert each set of four bytes (the size of a 32-bit integer) to an integer. The output from the example shows that the original array has been successfully restored.

_Code sample not included: ~/snippets/csharp/System/Base64FormattingOptions/Overview/ToBase64String.cs._
