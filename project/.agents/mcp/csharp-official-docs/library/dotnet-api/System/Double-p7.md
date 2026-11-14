---
title: "Double struct (part 7 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 7 of 14)

## Double.Parse(String, IFormatProvider) method

```csharp
public static double Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its double-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A double-precision floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.

#### Remarks

Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

This overload of the `Parse` method is typically used to convert text that can be formatted in a variety of ways to a `Double` value. For example, it can be used to convert the text that is entered by a user into an HTML text box to a numeric value.

The `s` parameter is interpreted using a combination of the `Float` and `AllowThousands` flags. The `s` parameter can contain `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, or `NumberFormatInfo.NaNSymbol` symbol for the culture specified by `provider`. This string comparison is case-insensitive. The `s` parameter can also contain a string of the form:

*ws**integral-digits**.*[*fractional-digits*]*exponential-digits*][*ws*]

Optional elements are framed in square brackets ([ and ]). Elements that contain the term "digits" consist of a series of numeric characters ranging from 0 to 9.

| Element | Description                                               |
|---------|-----------------------------------------------------------|
| *ws*    | A series of white-space characters.                       |
| *sign*  | A negative sign symbol (-) or a positive sign symbol (+). |
|*integral-digits*|A series of digits ranging from 0 to 9 that specify the integral part of the number. Runs of *integral-digits* can be partitioned by a group-separator symbol. For example, in some cultures a comma (,) separates groups of thousands. The *integral-digits* element can be absent if the string contains the *fractional-digits* element.|
|.|A culture-specific decimal point symbol.|
|*fractional-digits*|A series of digits ranging from 0 to 9 that specify the fractional part of the number.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation.|
|*exponential-digits*|A series of digits ranging from 0 to 9 that specify an exponent.|

For more information about numeric formats, see the Formatting Types topic.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that supplies culture-specific information used in interpreting the format of `s`. Typically, it is a `NumberFormatInfo` or `CultureInfo` object. If `provider` is `null` or a `NumberFormatInfo` cannot be obtained, the formatting information for the current system culture is used.

Ordinarily, if you pass the `Double.Parse` method a string that is created by calling the `Double.ToString` method, the original `Double` value is returned. However, because of a loss of precision, the values might not be equal. In addition, attempting to parse the string representation of either `MinValue` or `MaxValue` fails to round-trip. It returns `NegativeInfinity` if you attempt to parse `MinValue`, or `PositiveInfinity` if you attempt to parse `MaxValue`. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/Double/Parse/parse2.cs._

No exception is thrown when `s` is out of range of the `Double` data type. In most cases, the `Parse` method will return `PositiveInfinity` or `NegativeInfinity`. However, there is a small set of values that are considered to be closer to the maximum or minimum values of `Double` than to positive or negative infinity. In those cases, the method returns `MaxValue` or `MinValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example is the button click event handler of a Web form. It uses the array returned by the `UserLanguages` property to determine the user's locale. It then instantiates a `CultureInfo` object that corresponds to that locale. The `NumberFormatInfo` object that belongs to that `CultureInfo` object is then passed to the `Parse` method to convert the user's input to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/Default.aspx.cs._

## Double.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static double Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Double.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static double Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Converts a character span that contains the string representation of a number in a specified style and culture-specific format to its double-precision floating-point number equivalent.

Parameters:

- `s`: A character span that contains the number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`.  A typical value to specify is `NumberStyles.Float` combined with `NumberStyles.AllowThousands`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A double-precision floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `FormatException`: `s` does not represent a numeric value.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is the `NumberStyles.AllowHexSpecifier` value.

Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

If `s` is out of range of the `Double` data type, the method returns `NegativeInfinity` if `s` is less than `MinValue` and `PositiveInfinity` if `s` is greater than `MaxValue`.
