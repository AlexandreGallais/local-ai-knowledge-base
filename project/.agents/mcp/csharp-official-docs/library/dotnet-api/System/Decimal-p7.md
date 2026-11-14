---
title: "Decimal struct (part 7 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 7 of 12)

## Decimal.Parse(String, IFormatProvider) method

```csharp
public static decimal Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number to its `Decimal` equivalent using the specified culture-specific format information.

Parameters:

- `s`: The string representation of the number to convert.
- `provider`: An `IFormatProvider` that supplies culture-specific parsing information about `s`.

Returns: The `Decimal` number equivalent to the number contained in `s` as specified by `provider`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not of the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
This overload of the `Parse` method is commonly used to convert text that can be formatted in a variety of ways to a `Decimal` value. For example, it can be used to convert the text entered by a user into an HTML text box to a numeric value.

The `s` parameter contains a number of the form:

ws[digits,]digits.fractional-digits

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|
|*,*|A culture-specific thousands separator symbol.|
|*.*|A culture-specific decimal point symbol.|
|*fractional-digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Number` style. This means that white space and thousands separators are allowed but currency symbols are not. To explicitly define the elements (such as currency symbols, thousands separators, and white space) that can be present in `s`, use the `Parse` method.

The `provider` parameter is an `IFormatProvider` implementation, such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in parsing. If `provider` is `null`, the thread current culture is used.

A `Decimal` object has 29 digits of precision. If `s` represents a number that has more than 29 digits, but has a fractional part and is within the range of `MaxValue` and `MinValue`, the number is rounded, not truncated, to 29 digits using rounding to nearest.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example is the button click event handler of a Web form. It uses the array returned by the `UserLanguages` property to determine the user's locale. It then instantiates a `CultureInfo` object that corresponds to that locale. The `NumberFormatInfo` object that belongs to that `CultureInfo` object is then passed to the `Parse` method to convert the user's input to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/Default.aspx.cs._

## Decimal.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static decimal Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Number, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Decimal.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static decimal Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Number, IFormatProvider? provider = default);
```

Converts the span representation of a number to its `Decimal` equivalent using the specified style and culture-specific format.

Parameters:

- `s`: The span containing the characters representing the number to convert.
- `style`: A bitwise combination of `NumberStyles` values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Number`.
- `provider`: An `IFormatProvider` object that supplies culture-specific information about the format of `s`.

Returns: The `Decimal` number equivalent to the number contained in `s` as specified by `style` and `provider`.

To be added.

## Decimal.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static decimal Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number to its `Decimal` equivalent using the specified style and culture-specific format.

Parameters:

- `s`: The string representation of the number to convert.
- `style`: A bitwise combination of `NumberStyles` values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Number`.
- `provider`: An `IFormatProvider` object that supplies culture-specific information about the format of `s`.

Returns: The `Decimal` number equivalent to the number contained in `s` as specified by `style` and `provider`.

Exceptions:

- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.
- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is the `NumberStyles.AllowHexSpecifier` value.

#### Remarks
The `style` parameter defines the allowable format of the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

-   `AllowHexSpecifier`

-   `HexNumber`

Depending on the value of `style`, the `s` parameter may include the following elements:

wssigndigits.fractional-digitsdigits][ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits*|A sequence of digits ranging from 0 to 9.|
|*,*|A culture-specific thousands separator symbol. The thousands separator of the culture defined by `provider` can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture defined by `provider` can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional-digits*|A sequence of digits ranging from 0 to 9. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.|
|*e*|The 'e' or 'E' character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Decimal` type. The remaining `NumberStyles` members control elements that may be but are not required to be present in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|NumberStyles value|Elements permitted in s in addition to digits|
|------------------------|---------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The *.* and *fractional-digits* elements.|
|`AllowExponent`|The `s` parameter can also use exponential notation.  This flag supports values in the form *digits*E*digits*; additional flags are needed to successfully parse strings with elements such as positive or negative signs and decimal point symbols.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the beginning of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The *,* element.|
|`AllowCurrencySymbol`|The *$* element.|
|`Currency`|All. The `s` parameter cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the *.* symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, *,*, and *.* elements.|
|`Any`|All styles, except `s` cannot represent a hexadecimal number.|

The `provider` parameter is an `IFormatProvider` implementation, such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in parsing. If `provider` is `null`, the thread current culture is used.

A `Decimal` object has 29 digits of precision. If `s` represents a number that has more than 29 digits, but has a fractional part and is within the range of `MaxValue` and `MinValue`, the number is rounded, not truncated, to 29 digits using rounding to nearest.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example uses a variety of `style` and `provider` parameters to parse the string representations of `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/parse.cs._

## Decimal.Remainder(Decimal, Decimal) method

```csharp
public static decimal Remainder (decimal d1, decimal d2);
```

Computes the remainder after dividing two `Decimal` values.

Parameters:

- `d1`: The dividend.
- `d2`: The divisor.

Returns: The remainder after dividing `d1` by `d2`.

Exceptions:

- `DivideByZeroException`: `d2` is zero.
- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Examples
The following example uses the `Decimal.Remainder` method to calculate the remainder in a series of division operations.

_Code sample not included: ~/snippets/csharp/System/Decimal/Remainder/remainder.cs._

## Decimal.Round(Decimal) method

```csharp
public static decimal Round (decimal d);
```

Rounds a decimal value to the nearest integer.

Parameters:

- `d`: A decimal number to round.

Returns: The integer that is nearest to the `d` parameter. If `d` is halfway between two integers, one of which is even and the other odd, the even number is returned.

Exceptions:

- `OverflowException`: The result is outside the range of a `Decimal` value.

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called *round half to even* or *banker's rounding*. It minimizes rounding errors that result from consistently rounding a midpoint value in a single direction. It is equivalent to calling the `Round` method with a `mode` argument of `ToEven`.

#### Examples
The following example rounds a range of `Decimal` values between 100 and 102 to the nearest integer. Because the method uses banker's rounding, 100.5 rounds to 100 and 101.5 rounds to 102.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/Round1.cs._

## Decimal.Round(Decimal, Int32) method

```csharp
public static decimal Round (decimal d, int decimals);
```

Rounds a `Decimal` value to a specified number of decimal places.

Parameters:

- `d`: A decimal number to round.
- `decimals`: A value from 0 to 28 that specifies the number of decimal places to round to.

Returns: The decimal number equivalent to `d` rounded to `decimals` decimal places.

Exceptions:

- `ArgumentOutOfRangeException`: `decimals` is not a value from 0 to 28.

#### Remarks

This method is equivalent to calling the `Round` method with a `mode` argument of `ToEven`. When `d` is exactly halfway between two rounded values, the result is the rounded value that has an even digit in the far right decimal position. For example, when rounded to two decimals, the value 2.345 becomes 2.34 and the value 2.355 becomes 2.36. This process is known as *rounding toward even*, or *banker's rounding*. It minimizes rounding errors that result from consistently rounding a midpoint value in a single direction.

#### Examples
The following example rounds several `Decimal` values to a specified number of decimal places using the `Round` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/Round12.cs._
