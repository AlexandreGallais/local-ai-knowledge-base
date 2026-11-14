---
title: "Double struct (part 6 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 6 of 14)

## Double.Parse(String) method

```csharp
public static double Parse (string s);
```

Converts the string representation of a number to its double-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.

Returns: A double-precision floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.

#### Remarks

Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

The `s` parameter can contain the current culture's `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, or `NumberFormatInfo.NaNSymbol` symbol. This string comparison is case-insensitive. The `s` parameter can also be a string of the form:

*ws*[*integral-digits*[*,*]]*integral-digits**.*[*fractional-digits*]*exponential-digits*][*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

| Element | Description                         |
|---------|-------------------------------------|
| *ws*    | A series of white-space characters. |
|*sign*|A negative sign symbol (-) or a positive sign symbol (+). Only a leading sign can be used.|
|*integral-digits*|A series of digits ranging from 0 to 9 that specify the integral part of the number. Runs of *integral-digits* can be partitioned by a group-separator symbol. For example, in some cultures a comma (,) separates groups of thousands. The *integral-digits* element can be absent if the string contains the *fractional-digits* element.|
|,|A culture-specific thousands separator symbol.|
|.|A culture-specific decimal point symbol.|
|*fractional-digits*|A series of digits ranging from 0 to 9 that specify the fractional part of the number.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation.|
|*exponential-digits*|A series of digits ranging from 0 to 9 that specify an exponent.|

The `s` parameter is interpreted using a combination of the `Float` and `AllowThousands` flags. This means that white space and thousands separators are allowed, for example, while currency symbols are not. For finer control over which style elements are permitted in `s` for the parse operation to succeed, call the `Parse` or the `Parse` method.

The `s` parameter is interpreted using the formatting information in a `NumberFormatInfo` object that is initialized for the current culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string using the formatting information of some other culture, call the `Parse` or `Parse` method.

No exception is thrown when `s` is out of range of the `Double` data type. In most cases, the method will return `PositiveInfinity` or `NegativeInfinity`. However, there is a small set of values that are considered to be closer to the maximum or minimum values of `Double` than to positive or negative infinity. In those cases, the method returns `MaxValue` or `MinValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example illustrates the use of the `Parse` method.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/source.cs._

## Double.Parse(Byte>, IFormatProvider) method

```csharp
public static double Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Double.Parse(Char>, IFormatProvider) method

```csharp
public static double Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Double.Parse(String, NumberStyles) method

```csharp
public static double Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its double-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`. A typical value to specify is a combination of `NumberStyles.Float` combined with `NumberStyles.AllowThousands`.

Returns: A double-precision floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.

#### Remarks

Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

The `style` parameter defines the style elements (such as white space, thousands separators, and currency symbols) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

- `AllowHexSpecifier`
- `HexNumber`

The `s` parameter can contain the current culture's `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, or `NumberFormatInfo.NaNSymbol` symbol. This string comparison is case-insensitive. Depending on the value of `style`, the `s` parameter can also take the form:

*ws**sign*]*integral-digits**.*[*fractional-digits*]*exponential-digits*][*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

| Element | Description |
|---------|-------------|
|*ws*|A series of white-space characters. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|$|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|A negative sign symbol (-) or a positive sign symbol (+). The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*integral-digits*|A series of digits ranging from 0 to 9 that specify the integral part of the number. The *integral-digits* element can be absent if the string contains the *fractional-digits* element.|
|,|A culture-specific group separator. The current culture's group separator symbol can appear in `s` if `style` includes the `AllowThousands` flag|
|.|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional-digits*|A series of digits ranging from 0 to 9 that specify the fractional part of the number. Fractional digits can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*exponential-digits*|A series of digits ranging from 0 to 9 that specify an exponent.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Double` type. The remaining `NumberStyles` members control elements that may be present, but are not required to be present, in the input string. The following table indicates how individual `NumberStyles` flags affect the elements that may be present in `s`.

| NumberStyles value                                         | Elements permitted in `s` in addition to digits           |
|------------------------------------------------------------|-----------------------------------------------------------|
| `None`              | The *integral-digits* element only.                       |
| `AllowDecimalPoint` | The decimal point (*.*) and *fractional-digits* elements. |
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation. This flag by itself supports values in the form *digits*E*digits*; additional flags are needed to successfully parse strings with such elements as positive or negative signs and decimal point symbols.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the beginning of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The thousands separator (,) element.|
|`AllowCurrencySymbol`|The currency ($) element.|
|`Currency`|All elements. However, `s` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the decimal point (.) symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, thousands separator (,) and decimal point (.) elements.|
|`Any`|All elements. However, `s` cannot represent a hexadecimal number.|

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`.

Ordinarily, if you pass the `Double.Parse` method a string that is created by calling the `Double.ToString` method, the original `Double` value is returned. However, because of a loss of precision, the values might not be equal. In addition, attempting to parse the string representation of either `MinValue` or `MaxValue` fails to round-trip. It returns `NegativeInfinity` if you attempt to parse `MinValue`, or `PositiveInfinity` if you attempt to parse `MaxValue`. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/Double/Parse/parse2.cs._

No exception is thrown when `s` is out of range of the `Double` data type. In most cases, the `Parse` method will return `PositiveInfinity` or `NegativeInfinity`. However, there is a small set of values that are considered to be closer to the maximum or minimum values of `Double` than to positive or negative infinity. In those cases, the method returns `MaxValue` or `MinValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example uses the `Parse` method to parse the string representations of `Double` values using the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Double/Parse/Parse.cs._
