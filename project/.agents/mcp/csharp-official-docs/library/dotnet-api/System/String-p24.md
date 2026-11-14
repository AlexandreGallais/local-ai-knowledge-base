---
title: "String class (part 24 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 24 of 26)

## String.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see> or less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToByte` method.

## String.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToChar`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The character at index 0 in the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToChar` method.

## String.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDateTime`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDateTime` method.

## String.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDecimal`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> greater.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDecimal` method.

## String.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDouble`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number less than <see cref="F:System.Double.MinValue">Double.MinValue</see> or greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDouble` method.

## String.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt16`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see> or less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt16` method.

## String.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt32` method.

## String.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt64` method.

## String.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSByte`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSByte` method.

## String.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSingle`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSingle` method.

## String.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The type of the returned object.
- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `InvalidCastException`: The value of the current `String` object cannot be converted to the type specified by the `type` parameter.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ChangeType` method.

## String.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see> or less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.

## String.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

Exceptions:

- `FormatException`: The value of the current `String` object cannot be parsed.
- `OverflowException`: The value of the current `String` object is a number greater <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see> or less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see>

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## String.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: An object that provides culture-specific formatting information.

Returns: The converted value of the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## String.System.IParsable<System.String>.Parse(String, IFormatProvider) method

```csharp
static string IParsable<string>.Parse (string s, IFormatProvider provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## String.System.IParsable<System.String>.TryParse(String, IFormatProvider, String) method

```csharp
static bool IParsable<string>.TryParse (string s, IFormatProvider provider, out string result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## String.System.ISpanParsable<System.String>.Parse(Char>, IFormatProvider) method

```csharp
static string ISpanParsable<string>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## String.System.ISpanParsable<System.String>.TryParse(Char>, IFormatProvider, String) method

```csharp
static bool ISpanParsable<string>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out string result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## String.ToCharArray() method

```csharp
public char[] ToCharArray ();
```

Copies the characters in this instance to a Unicode character array.

Returns: A Unicode character array whose elements are the individual characters of this instance. If this instance is an empty string, the returned array is empty and has a zero length.

#### Remarks
This method copies each character (that is, each `Char` object) in a string to a character array. The first character copied is at index zero of the returned character array; the last character copied is at index `Array.Length` - 1.

To create a string from the characters in a character array, call the `%23ctor` constructor.

To create a byte array that contains the encoded characters in a string, instantiate the appropriate `Encoding` object and call its `GetBytes` method. Some of the standard encodings available in .NET include the following:

|Encoding|Object|
|--------------|------------|
|ASCII|`ASCIIEncoding`|
|UTF-7|`UTF7Encoding`|
|UTF-8|`UTF8Encoding`|
|UTF-16|`UnicodeEncoding`|
|UTF-32|`UTF32Encoding`|

For more information, see Character Encoding in .NET.

#### Examples
The following example calls the `String.ToCharArray` method to extract the characters in a string to a character array. It then displays the original string and the elements in the array.

_Code sample not included: ~/snippets/csharp/System/String/ToCharArray/ToCharArray1.cs._
