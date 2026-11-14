---
title: "Byte struct (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Byte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Byte struct (part 7 of 7)

## Byte.TryParse(Byte>, NumberStyles, IFormatProvider, Byte) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out byte result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Byte.TryParse(Char>, NumberStyles, IFormatProvider, Byte) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out byte result);
```

Converts the span representation of a number in a specified style and culture-specific format to its `Byte` equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters representing the number to convert. The span is interpreted using the `NumberStyles.Integer` style.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`. If `provider` is `null`, the thread current culture is used.
- `result`: When this method returns, contains the 8-bit unsigned integer value equivalent to the number contained in `s` if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Byte.TryParse(String, NumberStyles, IFormatProvider, Byte) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out byte result);
```

Converts the string representation of a number in a specified style and culture-specific format to its `Byte` equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string containing a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`. If `provider` is `null`, the thread current culture is used.
- `result`: When this method returns, contains the 8-bit unsigned integer value equivalent to the number contained in `s` if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.

#### Remarks
The `Byte.TryParse` method is like the `Byte.Parse` method, except the `Byte.TryParse` method does not throw an exception if the conversion fails.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object supplied by the `provider` parameter.

The style parameter defines the style elements (such as white space or the positive sign) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `s` parameter may include the following elements:

ws[sign]digits.fractional_digitsdigits][ws]

Or, if the `style` parameter includes `AllowHexSpecifier`:

[ws]hexdigits[ws]

Elements in square brackets ( [ and ] ) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, or at the end of s if style includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional positive sign. (The parse operation fails if a negative sign is present in `s`.) The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, or at the end of `s` if `style` includes the `AllowTrailingSign` flag.|
|*digits*|A sequence of digits from 0 through 9.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture specified by `provider` can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional_digits*|One or more occurrences of the digit 0. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.|
|*e*|The e or E character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be but are not required to be present in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite NumberStyles values|Elements permitted in s in addition to digits|
|----------------------------------------|---------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The *.* and *fractional_digits* elements. However, *fractional_digits* must consist of only one or more 0 digits or the method returns `false`.|
|`AllowExponent`|The `s` parameter can also use exponential notation. If `s` represents a number in exponential notation, it must represent an integer within the range of the `Byte` data type without a non-zero, fractional component.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A positive sign can appear before *digits*.|
|`AllowTrailingSign`|A positive sign can appear after *digits*.|
|`AllowParentheses`|Although this flag is supported, the method returns `false` if parentheses are present in `s`.|
|`AllowThousands`|Although the group separator symbol can appear in `s`, it can be preceded by only one or more 0 digits.|
|`AllowCurrencySymbol`|The *$* element.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value without a prefix. For example, "F3" parses successfully, but "0xF3" does not. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite number style, `HexNumber`, that includes both white space flags.)

The `provider` parameter is an `IFormatProvider` implementation, such as a `CultureInfo` object or a `NumberFormatInfo` object, whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `s`.

#### Examples
The following example calls the `TryParse` method with a number of different string values.

_Code sample not included: ~/snippets/csharp/System/Byte/TryParse/TryParse2.cs._

## Byte.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Byte, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out byte result, out int bytesConsumed);
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

## Byte.TryParsePartial(Char>, NumberStyles, IFormatProvider, Byte, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out byte result, out int charsConsumed);
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

## Byte.TryParsePartial(String, NumberStyles, IFormatProvider, Byte, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out byte result, out int charsConsumed);
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

## Byte.MaxValue field

```csharp
public const byte MaxValue = 255;
```

Represents the largest possible value of a `Byte`. This field is constant.

#### Remarks
The value of this constant is 255 (hexadecimal 0xFF).

#### Examples
The following example demonstrates how to use the `MaxValue` field to screen variable inputs for values that are outside the range of possible byte values.

_Code sample not included: ~/snippets/csharp/System/Byte/CompareTo/systembyte.cs._

## Byte.MinValue field

```csharp
public const byte MinValue = 0;
```

Represents the smallest possible value of a `Byte`. This field is constant.

#### Remarks
The value of this constant is 0.

#### Examples
The following example demonstrates how to use the `MinValue` field to screen variable inputs for values that are outside the range of possible byte values.

_Code sample not included: ~/snippets/csharp/System/Byte/CompareTo/systembyte.cs._
