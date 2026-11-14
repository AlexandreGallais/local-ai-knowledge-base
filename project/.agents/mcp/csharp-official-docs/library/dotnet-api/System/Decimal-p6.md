---
title: "Decimal struct (part 6 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 6 of 12)

## Decimal.op_Multiply(Decimal, Decimal) method

```csharp
public static decimal operator * (decimal d1, decimal d2);
```

Multiplies two specified `Decimal` values.

Parameters:

- `d1`: The first value to multiply.
- `d2`: The second value to multiply.

Returns: The result of multiplying `d1` by `d2`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Multiply` method defines the operation of the multiplication operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/multiply1.cs._

If the language you're using doesn't support custom operators, call the `Decimal.Multiply` method instead.

The equivalent method for this operator is `Multiply`

## Decimal.op_Subtraction(Decimal, Decimal) method

```csharp
public static decimal operator - (decimal d1, decimal d2);
```

Subtracts two specified `Decimal` values.

Parameters:

- `d1`: The minuend.
- `d2`: The subtrahend.

Returns: The result of subtracting `d2` from `d1`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Subtraction` method defines the operation of the subtraction operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/subtraction1.cs._

If the language you're using doesn't support custom operators, call the `Decimal.Subtract` method instead.

The equivalent method for this operator is `Subtract`

## Decimal.op_UnaryNegation(Decimal) method

```csharp
public static decimal operator - (decimal d);
```

Negates the value of the specified `Decimal` operand.

Parameters:

- `d`: The value to negate.

Returns: The result of `d` multiplied by negative one (-1).

#### Remarks
The `Decimal.op_UnaryPlus` method defines the operation of the unary negation operator (or the additive inverse operator) for `Decimal` values. The operation produces a value that results in 0 (zero) when it is added to the original number. Languages that do not support custom operators can call the `Decimal.Negate` method instead.

The equivalent method for this operator is `Negate`

## Decimal.op_UnaryPlus(Decimal) method

```csharp
public static decimal operator + (decimal d);
```

Returns the value of the `Decimal` operand (the sign of the operand is unchanged).

Parameters:

- `d`: The operand to return.

Returns: The value of the operand, `d`.

#### Remarks
The `Decimal.op_UnaryPlus` method defines the operation of the unary positive operator for `Decimal` values.

## Decimal.Parse(String) method

```csharp
public static decimal Parse (string s);
```

Converts the string representation of a number to its `Decimal` equivalent.

Parameters:

- `s`: The string representation of the number to convert.

Returns: The equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
Parameter `s` contains a number of the form:

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

Parameter `s` is interpreted using the `Number` style. This means that white space and thousands separators are allowed but currency symbols are not. To explicitly define the elements (such as currency symbols, thousands separators, and white space) that can be present in `s`, use either the `Parse` or the `Parse` method.

Parameter `s` is parsed using the formatting information in a `NumberFormatInfo` initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string using the formatting information of some other culture, use the `Parse` or `Parse` method.

If necessary, the value of `s` is rounded using rounding to nearest.

A `Decimal` has 29 digits of precision. If `s` represents a number that has more than 29 digits, but has a fractional part and is within the range of `MaxValue` and `MinValue`, the number is rounded, not truncated, to 29 digits using rounding to nearest.

If during a parse operation a separator is encountered in the `s` parameter, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following code example uses the `Parse` method to parse string representations of `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/parse.cs._

## Decimal.Parse(Byte>, IFormatProvider) method

```csharp
public static decimal Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Decimal.Parse(Char>, IFormatProvider) method

```csharp
public static decimal Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Decimal.Parse(String, NumberStyles) method

```csharp
public static decimal Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its `Decimal` equivalent.

Parameters:

- `s`: The string representation of the number to convert.
- `style`: A bitwise combination of `NumberStyles` values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Number`.

Returns: The `Decimal` number equivalent to the number contained in `s` as specified by `style`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is the `NumberStyles.AllowHexSpecifier` value.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>

#### Remarks
The `style` parameter defines the style elements (such as thousands separators, white space, and currency symbols) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

-   `AllowHexSpecifier`

-   `HexNumber`

Depending on the value of `style`, the `s` parameter may include the following elements:

wssigndigits.fractional-digitsdigits][ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits*|A sequence of digits ranging from 0 to 9.|
|*,*|A culture-specific thousands separator symbol. The current culture's thousands separator can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional-digits*|A sequence of digits ranging from 0 to 9. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.|
|*e*|The 'e' or 'E' character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Decimal` type. The remaining `NumberStyles` members control elements that may be but are not required to be present in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|NumberStyles value|Elements permitted in s in addition to digits|
|------------------------|---------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The *.* and *fractional-digits* elements.|
|`AllowExponent`|The `s` parameter can also use exponential notation. This flag supports values in the form *digits*E*digits*; additional flags are needed to successfully parse strings with elements such as positive or negative signs and decimal point symbols.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the beginning of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The *,* element.|
|`AllowCurrencySymbol`|The *$* element.|
|`Currency`|All. The `s` parameter cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the `.` symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, `,` and `.` elements.|
|`Any`|All styles, except `s` cannot represent a hexadecimal number.|

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`.

A `Decimal` has 29 digits of precision. If `s` represents a number that has more than 29 digits, but has a fractional part and is within the range of `MaxValue` and `MinValue`, the number is rounded, not truncated, to 29 digits using rounding to nearest.

If a separator is encountered in the `s` parameter during a parse operation, `styles` includes the `AllowThousands` and `AllowDecimalPoint` values, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following code example uses the `Parse` method to parse the string representations of `Decimal` values using the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/parse.cs._
