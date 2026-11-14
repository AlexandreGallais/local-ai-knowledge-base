---
title: "Single struct (part 12 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 12 of 14)

## Single.TryParse(String, Single) method

```csharp
public static bool TryParse (string? s, out float result);
```

Converts the string representation of a number to its single-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string representing a number to convert.
- `result`: When this method returns, contains single-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty` or is not a number in a valid format. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

This overload differs from the `Parse` method by returning a Boolean value that indicates whether the parse operation succeeded instead of returning the parsed numeric value. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

The `s` parameter can contain `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, or `NumberFormatInfo.NaNSymbol` symbol. This string comparison is case-insensitive. The `s` parameter can also be a string of the form:

ws[integral-digits,]integral-digits.[fractional-digits]exponential-digits][ws]

Elements in square brackets are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|A series of white-space characters.|
|*sign*|A negative sign or positive sign symbol.|
|*integral-digits*|A series of numeric characters ranging from 0 to 9 that specify the integral part of the number. Integral-digits can be absent if there are fractional-digits.|
|*,*|A culture-specific group separator symbol.|
|*.*|A culture-specific decimal point symbol.|
|*fractional-digits*|A series of numeric characters ranging from 0 to 9 that specify the fractional part of the number.|
|*E*|An uppercase or lowercase character 'e', that indicates exponential (scientific) notation.|
|*exponential-digits*|A series of numeric characters ranging from 0 to 9 that specify an exponent.|

The `s` parameter is interpreted using a combination of the `Float` and `AllowThousands` flags. This means that white space and thousands separators are allowed but currency symbols are not. To explicitly define the elements (such as currency symbols, thousands separators, and white space) that can be present in `s`, use the `TryParse` method overload.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string using the formatting information of some other specified culture, use the `TryParse` method overload.

Ordinarily, if you pass the `Single.TryParse` method a string that is created by calling the `Single.ToString` method, the original `Single` value is returned. However, because of a loss of precision, the values may not be equal.

If `s` is out of range of the `Single` data type, the method returns `NegativeInfinity` if `s` is less than `MinValue` and `PositiveInfinity` if `s` is greater than `MaxValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example uses the `TryParse` method to convert the string representations of numeric values to `Single` values. It assumes that en-US is the current culture.

_Code sample not included: ~/snippets/csharp/System/Single/TryParse/tryparse1.cs._

## Single.TryParse(Byte>, IFormatProvider, Single) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out float result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Single.TryParse(Char>, IFormatProvider, Single) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out float result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Single.TryParse(String, IFormatProvider, Single) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out float result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Single.TryParse(Byte>, NumberStyles, IFormatProvider, Single) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out float result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Single.TryParse(Char>, NumberStyles, IFormatProvider, Single) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out float result);
```

Converts the span representation of a number in a specified style and culture-specific format to its single-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A read-only character span that contains the number to convert. The span is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Float` combined with `NumberStyles.AllowThousands`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the single-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, represents a number less than <see cref="F:System.Single.MinValue">Single.MinValue</see> or greater than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>, or if `style` is not a valid combination of `NumberStyles` enumerated constants. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Values that are too large to represent are rounded to `Single.PositiveInfinity` or `Single.NegativeInfinity` as required by the IEEE 754 specification.
