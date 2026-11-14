---
title: "Guid struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Guid.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Guid struct (part 3 of 4)

## Guid.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
bool IUtf8SpanFormattable.TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Guid.ToByteArray() method

```csharp
public byte[] ToByteArray ();
```

Returns a 16-element byte array that contains the value of this instance.

Returns: A 16-element byte array.

#### Remarks
You can use the byte array returned by this method to round-trip a `Guid` value by calling the `%23ctor` constructor.

Note that the order of bytes in the returned byte array is different from the string representation of a `Guid` value. The order of the beginning four-byte group and the next two two-byte groups is reversed, whereas the order of the last two-byte group and the closing six-byte group is the same. The example provides an illustration.

#### Examples
The following example calls the `Guid.NewGuid` method to create a `Guid` value, and then calls the `Guid.ToByteArray` method to represent the `Guid` value as a byte array. It then displays both values to the console. Finally, it instantiates a new `Guid` value from the byte array and calls its `Equals` method to show that the two `Guid` values are identical.

_Code sample not included: ~/snippets/csharp/System/Guid/ToByteArray/tobytearray3.cs._

## Guid.ToByteArray(Boolean) method

```csharp
public byte[] ToByteArray (bool bigEndian);
```

Returns a 16-element byte array that contains the value of this instance, using the specified endianness.

Parameters:

- `bigEndian`: `true` to write the bytes in big-endian byte order; `false` to write them in little-endian byte order.

Returns: A 16-element byte array.

To be added.

## Guid.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the value of this instance in registry format.

Returns: The value of this `Guid`, formatted by using the "D" format specifier as follows:

`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

where the value of the GUID is represented as a series of lowercase hexadecimal digits in groups of 8, 4, 4, 4, and 12 digits and separated by hyphens. An example of a return value is "382c74c3-721d-4f34-80e5-57657b6cbc27". To convert the hexadecimal digits from a through f to uppercase, call the `String.ToUpper` method on the returned string.

#### Remarks
This method provides a default GUID format that is sufficient for typical use; however, other versions of this method that take a `format` parameter provide a few common format variations.

## Guid.ToString(String) method

```csharp
public string ToString (string? format);
```

Returns a string representation of the value of this `Guid` instance, according to the provided format specifier.

Parameters:

- `format`: A single format specifier that indicates how to format the value of this `Guid`. The `format` parameter can be "N", "D", "B", "P", or "X". If `format` is `null` or an empty string (""), "D" is used.

Returns: The value of this `Guid`, represented as a series of lowercase hexadecimal digits in the specified format.

Exceptions:

- `FormatException`: The value of `format` is not `null`, an empty string (""), "N", "D", "B", "P", or "X".

#### Remarks
The following table shows the accepted format specifiers for the `format` parameter. "0" represents a digit; hyphens ("-"), braces ("{", "}"), and parentheses ("(", ")") appear as shown.

|Specifier|Format of return value|
|---------------|----------------------------|
|`N`|32 digits: 00000000000000000000000000000000|
|`D`|32 digits separated by hyphens: 00000000-0000-0000-0000-000000000000|
|`B`|32 digits separated by hyphens, enclosed in braces: {00000000-0000-0000-0000-000000000000}|
|`P`|32 digits separated by hyphens, enclosed in parentheses: (00000000-0000-0000-0000-000000000000)|
|`X`|Four hexadecimal values enclosed in braces, where the fourth value is a subset of eight hexadecimal values that is also enclosed in braces: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}|

The hexadecimal digits a through f are lowercase in the returned string. To convert them to uppercase, call the `String.ToUpper` method on the returned string.

## Guid.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Returns a string representation of the value of this instance of the `Guid` class, according to the provided format specifier and culture-specific format information.

Parameters:

- `format`: A single format specifier that indicates how to format the value of this `Guid`. The `format` parameter can be "N", "D", "B", "P", or "X". If `format` is `null` or an empty string (""), "D" is used.
- `provider`: (Reserved) An object that supplies culture-specific formatting information.

Returns: The value of this `Guid`, represented as a series of lowercase hexadecimal digits in the specified format.

Exceptions:

- `FormatException`: The value of `format` is not `null`, an empty string (""), "N", "D", "B", "P", or "X".

#### Remarks
The `provider` parameter is reserved for future use and does not contribute to the execution of this method. You can pass `null` in the method call.

The following table shows the accepted format specifiers for the `format` parameter. "0" represents a digit; hyphens ("-"), braces ("{", "}"), and parentheses ("(", ")") appear as shown.

|Specifier|Format of return value|
|---------------|----------------------------|
|`N`|32 digits: 00000000000000000000000000000000|
|`D`|32 digits separated by hyphens: 00000000-0000-0000-0000-000000000000|
|`B`|32 digits separated by hyphens, enclosed in braces: {00000000-0000-0000-0000-000000000000}|
|`P`|32 digits separated by hyphens, enclosed in parentheses: (00000000-0000-0000-0000-000000000000)|
|`X`|Four hexadecimal values enclosed in braces, where the fourth value is a subset of eight hexadecimal values that is also enclosed in braces: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}|

The hexadecimal digits a through f are lowercase in the returned string. To convert them to uppercase, call the `String.ToUpper` method on the returned string.

Because the `provider` parameter is ignored, you cannot use it to provide a custom formatting solution. To represent a `Guid` value as a string in a format that isn't supported by the standard GUID format strings, call the `Format` method with a `provider` object that implements both the `ICustomFormatter` and `IFormatProvider` interfaces. For more information, see the "Custom Formatting with ICustomFormatter" section in the Formatting Types article.

## Guid.TryFormat(Byte>, Int32, Char>) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default);
```

Tries to format the current GUID instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write the GUID as a span of UTF-8 bytes.
- `bytesWritten`: When this method returns, contains the number of bytes written into `utf8Destination`.
- `format`: A read-only span containing the character representing one of the following specifiers that indicates the exact format to use when interpreting the current GUID instance: "N", "D", "B", "P", or "X".

Returns: `true` if the formatting operation was successful; `false` otherwise.

To be added.

## Guid.TryFormat(Char>, Int32, Char>) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default);
```

Tries to format the current GUID instance into the provided character span.

Parameters:

- `destination`: The span in which to write the GUID as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters written into the span.
- `format`: A read-only span containing the character representing one of the following specifiers that indicates the exact format to use when interpreting the current GUID instance: "N", "D", "B", "P", or "X".

Returns: `true` if the formatting operation was successful; `false` otherwise.

To be added.

## Guid.TryParse(Byte>, Guid) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out Guid result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Guid.TryParse(Char>, Guid) method

```csharp
public static bool TryParse (ReadOnlySpan<char> input, out Guid result);
```

Converts the specified read-only span of characters containing the representation of a GUID to the equivalent `Guid` structure.

Parameters:

- `input`: A span containing the characters representing the GUID to convert.
- `result`: When this method returns, contains the parsed value. If the method returns `true`, `result` contains a valid `Guid`. If the method returns `false`, `result` equals `Guid.Empty`.

Returns: `true` if the parse operation was successful; otherwise, `false`.

To be added.

## Guid.TryParse(String, Guid) method

```csharp
public static bool TryParse (string? input, out Guid result);
```

Converts the string representation of a GUID to the equivalent `Guid` structure.

Parameters:

- `input`: A string containing the GUID to convert.
- `result`: When this method returns, contains the parsed value. If the method returns `true`, `result` contains a valid `Guid`. If the method returns `false`, `result` equals `Guid.Empty`.

Returns: `true` if the parse operation was successful; otherwise, `false`.

#### Remarks
This method is like the `Guid.Parse` method, except that instead of returning the parsed GUID, it returns `false` if `input` is `null` or not in a recognized format, and doesn't throw an exception. It trims any leading or trailing white space from `input` and converts strings in any of the five formats recognized by the `ToString` and `ToString` methods, as shown in the following table.

|Specifier|Description|Format|
|---------------|-----------------|------------|
|`N`|32 digits|00000000000000000000000000000000|
|`D`|32 digits separated by hyphens|00000000-0000-0000-0000-000000000000|
|`B`|32 digits separated by hyphens, enclosed in braces|{00000000-0000-0000-0000-000000000000}|
|`P`|32 digits separated by hyphens, enclosed in parentheses|(00000000-0000-0000-0000-000000000000)|
|`X`|Four hexadecimal values enclosed in braces, where the fourth value is a subset of eight hexadecimal values that is also enclosed in braces|{0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}|

#### Examples
The following example creates a new GUID, converts it to three separate string representations by calling the `ToString` method with the "B", "D", and "X" format specifiers, and then calls the `Guid.TryParse` method to convert the strings back to `Guid` values.

_Code sample not included: ~/snippets/csharp/System/Guid/Parse/tryparseex1.cs._

## Guid.TryParse(Byte>, IFormatProvider, Guid) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out Guid result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Guid.TryParse(Char>, IFormatProvider, Guid) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out Guid result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Guid.TryParse(String, IFormatProvider, Guid) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out Guid result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Guid.TryParseExact(Char>, Char>, Guid) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, ReadOnlySpan<char> format, out Guid result);
```

Converts span of characters representing the GUID to the equivalent `Guid` structure, provided that the string is in the specified format.

Parameters:

- `input`: A read-only span containing the characters representing the GUID to convert.
- `format`: A read-only span containing a character representing one of the following specifiers that indicates the exact format to use when interpreting `input`: "N", "D", "B", "P", or "X".
- `result`: When this method returns, contains the parsed value. If the method returns `true`, `result` contains a valid `Guid`. If the method returns `false`, `result` equals `Guid.Empty`.

Returns: `true` if the parse operation was successful; otherwise, `false`.

To be added.
