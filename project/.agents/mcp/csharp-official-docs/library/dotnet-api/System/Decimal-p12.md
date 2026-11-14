---
title: "Decimal struct (part 12 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 12 of 12)

## Decimal.TryParse(String, IFormatProvider, Decimal) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out decimal result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Decimal.TryParse(Byte>, NumberStyles, IFormatProvider, Decimal) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out decimal result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Decimal.TryParse(Char>, NumberStyles, IFormatProvider, Decimal) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out decimal result);
```

Converts the span representation of a number to its `Decimal` equivalent using the specified style and culture-specific format. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Number`.
- `provider`: An object that supplies culture-specific parsing information about `s`.
- `result`: When this method returns, contains the `Decimal` number that is equivalent to the numeric value contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not a number in a format compliant with `style`, or represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. This parameter is passed uininitialized; any value originally supplied in `result` is overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Decimal.TryParse(String, NumberStyles, IFormatProvider, Decimal) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out decimal result);
```

Converts the string representation of a number to its `Decimal` equivalent using the specified style and culture-specific format. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: The string representation of the number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Number`.
- `provider`: An object that supplies culture-specific parsing information about `s`.
- `result`: When this method returns, contains the `Decimal` number that is equivalent to the numeric value contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not a number in a format compliant with `style`, or represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. This parameter is passed uininitialized; any value originally supplied in `result` is overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is the `NumberStyles.AllowHexSpecifier` value.

#### Remarks
This overload differs from the `Parse` method by returning a Boolean value that indicates whether the parse operation succeeded instead of returning the parsed numeric value. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

The `style` parameter defines the allowable format of the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

-   `AllowHexSpecifier`

-   `HexNumber`

Depending on the value of style, the `s` parameter may include the following elements:

wssigndigits.fractional-digitsdigits][ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag. It can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` or `NumberFormatInfo.CurrencyPositivePattern` properties of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|
|*.*|A culture-specific decimal point symbol.|
|*fractional-digits*|A sequence of digits ranging from 0 to 9.|

The `style` parameter specifies the permitted format of the `s` parameter, and can be one or more `NumberStyles` enumerated constants combined using a bitwise OR operation. If `style` is null, `s` is interpreted using the `Number` style.

The `provider` parameter is an `IFormatProvider` implementation such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in parsing. If `provider` is `null`, the thread current culture is used.

A `Decimal` object has 29 digits of precision. If `s` represents a number that has more than 29 digits, but has a fractional part and is within the range of `MaxValue` and `MinValue`, the number is rounded, not truncated, to 29 digits using rounding to nearest.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example demonstrates the use of the `TryParse` method to parse the string representation of a number that has a particular style and is formatted using the conventions of a particular culture.

_Code sample not included: ~/snippets/csharp/System/Decimal/TryParse/TryParse.cs._

## Decimal.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Decimal, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out decimal result, out int bytesConsumed);
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

## Decimal.TryParsePartial(Char>, NumberStyles, IFormatProvider, Decimal, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out decimal result, out int charsConsumed);
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

## Decimal.TryParsePartial(String, NumberStyles, IFormatProvider, Decimal, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out decimal result, out int charsConsumed);
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

## Decimal.MaxValue field

```csharp
public static readonly decimal MaxValue;
```

Represents the largest possible value of `Decimal`. This field is constant and read-only.

#### Remarks
The value of this constant is positive 79,228,162,514,264,337,593,543,950,335.

#### Examples
The following code sample illustrates the use of `MaxValue` :

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/source.cs._

## Decimal.MinusOne field

```csharp
public static readonly decimal MinusOne;
```

Represents the number negative one (-1).

#### Examples
The following code example illustrates the use of the `MinusOne` field.

_Code sample not included: ~/snippets/csharp/System/Decimal/MinusOne/fields.cs._

## Decimal.MinValue field

```csharp
public static readonly decimal MinValue;
```

Represents the smallest possible value of `Decimal`. This field is constant and read-only.

#### Remarks
The value of this constant is negative 79,228,162,514,264,337,593,543,950,335.

#### Examples
The following code example illustrates the use of the `MinValue` field.

_Code sample not included: ~/snippets/csharp/System/Decimal/MinusOne/fields.cs._

## Decimal.One field

```csharp
public static readonly decimal One;
```

Represents the number one (1).

#### Examples
The following code example illustrates the use of the `One` field.

_Code sample not included: ~/snippets/csharp/System/Decimal/MinusOne/fields.cs._

## Decimal.Zero field

```csharp
public static readonly decimal Zero;
```

Represents the number zero (0).

#### Examples
The following code example illustrates the use of the `Zero` field.

_Code sample not included: ~/snippets/csharp/System/Decimal/MinusOne/fields.cs._
