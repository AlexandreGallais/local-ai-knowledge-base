---
title: "INumberBase<TSelf> interface (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/INumberBase`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INumberBase<TSelf> interface (part 2 of 2)

## INumberBase<TSelf>.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static abstract TSelf Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

Exceptions:

- `ArgumentException`: `style` is not a supported `NumberStyles` value.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` is not representable by `TSelf`.

To be added.

## INumberBase<TSelf>.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static abstract TSelf Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

Exceptions:

- `ArgumentException`: `style` is not a supported `NumberStyles` value.
- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` is not representable by `TSelf`.

To be added.

## INumberBase<TSelf>.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
override sealed bool IUtf8SpanFormattable.TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## INumberBase<TSelf>.System.IUtf8SpanParsable<TSelf>.Parse(Byte>, IFormatProvider) method

```csharp
static TSelf IUtf8SpanParsable<TSelf>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## INumberBase<TSelf>.System.IUtf8SpanParsable<TSelf>.TryParse(Byte>, IFormatProvider, TSelf) method

```csharp
static bool IUtf8SpanParsable<TSelf>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out TSelf result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## INumberBase<TSelf>.TryConvertFromChecked<TOther>(TOther, TSelf) method

```csharp
protected static abstract bool TryConvertFromChecked<TOther> (TOther value, out TSelf result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert a value to an instance of the the current type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.
- `result`: When this method returns, contains an instance of `TSelf` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

Exceptions:

- `OverflowException`: `value` is not representable by `TSelf`.

To be added.

## INumberBase<TSelf>.TryConvertFromSaturating<TOther>(TOther, TSelf) method

```csharp
protected static abstract bool TryConvertFromSaturating<TOther> (TOther value, out TSelf result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert a value to an instance of the the current type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.
- `result`: When this method returns, contains an instance of `TSelf` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## INumberBase<TSelf>.TryConvertFromTruncating<TOther>(TOther, TSelf) method

```csharp
protected static abstract bool TryConvertFromTruncating<TOther> (TOther value, out TSelf result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert a value to an instance of the the current type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.
- `result`: When this method returns, contains an instance of `TSelf` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## INumberBase<TSelf>.TryConvertToChecked<TOther>(TSelf, TOther) method

```csharp
protected static abstract bool TryConvertToChecked<TOther> (TSelf value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

Exceptions:

- `OverflowException`: `value` is not representable by `TOther`.

To be added.

## INumberBase<TSelf>.TryConvertToSaturating<TOther>(TSelf, TOther) method

```csharp
protected static abstract bool TryConvertToSaturating<TOther> (TSelf value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## INumberBase<TSelf>.TryConvertToTruncating<TOther>(TSelf, TOther) method

```csharp
protected static abstract bool TryConvertToTruncating<TOther> (TSelf value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## INumberBase<TSelf>.TryParse(Byte>, NumberStyles, IFormatProvider, TSelf) method

```csharp
public static virtual bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out TSelf result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a supported `NumberStyles` value.

To be added.

## INumberBase<TSelf>.TryParse(Char>, NumberStyles, IFormatProvider, TSelf) method

```csharp
public static abstract bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out TSelf result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: On return, contains the result of succesfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a supported `NumberStyles` value.

To be added.

## INumberBase<TSelf>.TryParse(String, NumberStyles, IFormatProvider, TSelf) method

```csharp
public static abstract bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out TSelf result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: On return, contains the result of succesfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a supported `NumberStyles` value.

To be added.

## INumberBase<TSelf>.TryParsePartial(Byte>, NumberStyles, IFormatProvider, TSelf, Int32) method

```csharp
public static virtual bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out TSelf result, out int bytesConsumed);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `bytesConsumed`: To be added.

Returns: To be added.

To be added.

## INumberBase<TSelf>.TryParsePartial(Char>, NumberStyles, IFormatProvider, TSelf, Int32) method

```csharp
public static virtual bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out TSelf result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## INumberBase<TSelf>.TryParsePartial(String, NumberStyles, IFormatProvider, TSelf, Int32) method

```csharp
public static virtual bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out TSelf result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.
