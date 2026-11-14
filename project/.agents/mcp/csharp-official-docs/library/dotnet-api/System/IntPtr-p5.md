---
title: "IntPtr struct (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IntPtr struct (part 5 of 6)

## IntPtr.System.Numerics.IUnaryPlusOperators<System.IntPtr,System.IntPtr>.op_UnaryPlus(IntPtr) method

```csharp
static IntPtr IUnaryPlusOperators<IntPtr,IntPtr>.operator + (IntPtr value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## IntPtr.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize the current `IntPtr` object.

Parameters:

- `info`: The `SerializationInfo` object to populate with data.
- `context`: The destination for this serialization. (This parameter is not used; specify `null`.)

Exceptions:

- `ArgumentNullException`: `info` is `null`.

#### Remarks
This method populates the `info` parameter with the value of the current `IntPtr` object.

## IntPtr.ToInt32() method

```csharp
public int ToInt32 ();
```

Converts the value of this instance to a 32-bit signed integer.

Returns: A 32-bit signed integer equal to the value of this instance.

Exceptions:

- `OverflowException`: In a 64-bit process, the value of this instance is too large or too small to represent as a 32-bit signed integer.

To be added.

## IntPtr.ToInt64() method

```csharp
public long ToInt64 ();
```

Converts the value of this instance to a 64-bit signed integer.

Returns: A 64-bit signed integer equal to the value of this instance.

To be added.

## IntPtr.ToPointer() method

```csharp
public void* ToPointer ();
```

Converts the value of this instance to a pointer to an unspecified type.

Returns: A pointer to `Void`; that is, a pointer to memory containing data of an unspecified type.

#### Examples
The following example uses managed pointers to reverse the characters in an array. After it initializes a `String` object and gets its length, it does the following:

- Calls the `Marshal.StringToHGlobalAnsi` method to copy the Unicode string to unmanaged memory as ANSI (one-byte) characters. The method returns an `IntPtr` object that points to the beginning of the unmanaged string.

- Calls the `Marshal.AllocHGlobal` method to allocate the same number of bytes as the unmanaged string occupies. The method returns an `IntPtr` object that points to the beginning of the unmanaged block of memory.

- Calls the `IntPtr.ToPointer` method to get an unmanaged pointer to the starting address of the string and the unmanaged block of memory, and adds one less than the length of the string to the starting address of the ANSI string. Because the unmanaged string pointer now points to the end of the string, the copy operation will copy a character from the end of the string to the start of the memory block.

- Uses a loop to copy each character from the string to the unmanaged block of memory. After each copy operation, it decrements the pointer to the address of the next location in the unmanaged ANSI string and increments the pointer to the next address in the unmanaged block.

- Calls the `Marshal.PtrToStringAnsi` to convert the unmanaged memory block containing the copied ANSI string to a managed Unicode `String` object.

- After displaying the original and reversed strings, calls the `Marshal.FreeHGlobal` method to free the memory allocated for the unmanaged ANSI string and the unmanaged block of memory.

_Code sample not included: ~/snippets/csharp/System/IntPtr/Overview/topointer.cs._

## IntPtr.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of the current `IntPtr` object to its equivalent string representation.

Returns: The string representation of the value of this instance.

#### Remarks
If the value of the `Size` property for this instance is 4, then this method is equivalent to `Int32.ToString`; otherwise, this method is equivalent to `Int64.ToString`.

## IntPtr.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

To be added.

## IntPtr.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of the current `IntPtr` object to its equivalent string representation.

Parameters:

- `format`: A format specification that governs how the current `IntPtr` object is converted.

Returns: The string representation of the value of the current `IntPtr` object.

Exceptions:

- `FormatException`: `format` is invalid or not supported.

#### Remarks
If the `format` parameter is `null` or an empty string (""), the return value is formatted with the general format specifier ("G"). For more information about numeric format specifiers, see the Standard Numeric Format Strings topic.

The return value is formatted using the invariant culture.

## IntPtr.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The value of the current instance in the specified format.

To be added.

## IntPtr.TrailingZeroCount(IntPtr) method

```csharp
public static IntPtr TrailingZeroCount (IntPtr value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## IntPtr.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## IntPtr.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span where this instance's value formatted as a span of characters should be written.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: The characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## IntPtr.TryParse(Byte>, IntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out IntPtr result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its signed integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the signed integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## IntPtr.TryParse(Char>, IntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out IntPtr result);
```

Converts the read-only span of characters representation of a number to its signed native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A read-only span of characters containing a number to convert.
- `result`: When this method returns, contains the signed native integer equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is empty, is not of the correct format, or represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## IntPtr.TryParse(String, IntPtr) method

```csharp
public static bool TryParse (string? s, out IntPtr result);
```

Converts the string representation of a number to its signed native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a number to convert.
- `result`: When this method returns, contains the signed native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or empty, is not of the correct format, or represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## IntPtr.TryParse(Byte>, IFormatProvider, IntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out IntPtr result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## IntPtr.TryParse(Char>, IFormatProvider, IntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out IntPtr result);
```

Tries to parse a string into a value.

Parameters:

- `s`: A read-only span of characters containing a number to convert.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## IntPtr.TryParse(String, IFormatProvider, IntPtr) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out IntPtr result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## IntPtr.TryParse(Byte>, NumberStyles, IFormatProvider, IntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out IntPtr result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## IntPtr.TryParse(Char>, NumberStyles, IFormatProvider, IntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out IntPtr result);
```

Converts the read-only span of characters representation of a number in a specified style and culture-specific format to its signed native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A read-only span of characters containing a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the signed native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is empty, is not of the correct format, or represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.
