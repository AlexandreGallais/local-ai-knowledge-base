---
title: "UInt64 struct (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt64 struct (part 7 of 8)

## UInt64.TryParse(String, UInt64) method

```csharp
public static bool TryParse (string? s, out ulong result);
```

Tries to convert the string representation of a number to its 64-bit unsigned integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string that represents the number to convert.
- `result`: When this method returns, contains the 64-bit unsigned integer value that is equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. This method eliminates the need to use exception handling to test for a `FormatException` if `s` is invalid and cannot be successfully parsed.

The `s` parameter should be the string representation of a decimal number in the following form:

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign. Valid sign characters are determined by the `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.PositiveSign` properties of the current culture.|
|*digits*|A sequence of decimal digits ranging from 0 to 9.|

The `s` parameter is interpreted by using the `Integer` style. In addition to the decimal digits, only leading and trailing spaces with a leading sign are allowed. To explicitly define the style elements with the culture-specific formatting information that can be present in `s`, call the `TryParse` method.

> **Note:**
>  The string specified by the `s` parameter cannot contain any group separators or decimal separator, and it cannot have a fractional portion.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`.

This overload interprets all digits in the `s` parameter as decimal digits. To parse the string representation of a hexadecimal number, call the `TryParse` overload instead.

#### Examples
The following example calls the `TryParse` method once for each element in a string array.

_Code sample not included: ~/snippets/csharp/System/UInt64/TryParse/tryparse1.cs._

## UInt64.TryParse(Byte>, IFormatProvider, UInt64) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out ulong result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## UInt64.TryParse(Char>, IFormatProvider, UInt64) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out ulong result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## UInt64.TryParse(String, IFormatProvider, UInt64) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out ulong result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## UInt64.TryParse(Byte>, NumberStyles, IFormatProvider, UInt64) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out ulong result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## UInt64.TryParse(Char>, NumberStyles, IFormatProvider, UInt64) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out ulong result);
```

Tries to convert the span representation of a number in a specified style and culture-specific format to its 64-bit unsigned integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters that represent the number to convert. The span is interpreted by using the style specified by the `style` parameter.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the 64-bit unsigned integer value equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or represents a number less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.
