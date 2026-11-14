---
title: "Double struct (part 13 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 13 of 14)

## Double.TryParse(String, NumberStyles, IFormatProvider, Double) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out double result);
```

Converts the string representation of a number in a specified style and culture-specific format to its double-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of `NumberStyles` values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Float` combined with `NumberStyles.AllowThousands`.
- `provider`: An `IFormatProvider` that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains a double-precision floating-point number equivalent of the numeric value or symbol contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty` or is not in a format compliant with `style`, or if `style` is not a valid combination of `NumberStyles` enumeration constants. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.

#### Remarks
Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

The `Double.TryParse` method is like the `Parse` method, except this method does not throw an exception if the conversion fails. If the conversion succeeds, the return value is `true` and the `result` parameter is set to the outcome of the conversion. If the conversion fails, the return value is `false` and the `result` parameter is set to zero. This eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

The `style` parameter defines the allowable format of the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

- `AllowHexSpecifier`

- `HexNumber`

The `s` parameter can contain `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, or `NumberFormatInfo.NaNSymbol` symbol for the culture indicated by `provider`. This string comparison is case-insensitive. In addition, depending on the value of `style`, the `s` parameter may include the following elements:

[ws] [$] signintegral-digits.fractional-digitsexponential-digits][ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag. It can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` or `NumberFormatInfo.CurrencyPositivePattern` properties of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*integral-digits*|A series of digits ranging from 0 to 9 that specify the integral part of the number. Integral-digits can be absent if there are fractional-digits.|
|*,*|A culture-specific thousands separator symbol. The current culture's thousands separator symbol can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional-digits*|A series of digits ranging from 0 to 9 that specify the fractional part of the number. Fractional digits can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*e*|The e or E character, which indicates that `s` can represent a number using exponential notation. The `s` parameter can represent a number in exponential notation if style includes the `AllowExponent` flag.|
|*exponential-digits*|A series of digits ranging from 0 to 9 that specify an exponent.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Double` type. The remaining `NumberStyles` members control elements that may be but are not required to be present in the input string. The following table indicates how individual `NumberStyles` flags affect the elements that may be present in `s`.

|NumberStyles value|Elements permitted in s in addition to digits|
|------------------------|---------------------------------------------------|
|`None`|The *integral-digits* element only.|
|`AllowDecimalPoint`|The *.* and *fractional-digits* elements.|
|`AllowExponent`|The `s` parameter can also use exponential notation. This flag by itself supports values in the form *integral-digits*E*exponential-digits*; additional flags are needed to successfully parse strings in exponential notation with such elements as positive or negative signs and decimal point symbols.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the beginning of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The *,* element.|
|`AllowCurrencySymbol`|The *$* element.|
|`Currency`|All. The `s` parameter cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the *.* symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, thousands separator (*,),* and decimal point (*.*) elements.|
|`Any`|All styles, except `s` cannot represent a hexadecimal number.|

The `provider` parameter is a `IFormatProvider` implementation, such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in parsing. If `provider` is `null` or a `NumberFormatInfo` object cannot be obtained, the format information for the current culture is used.

The conversion fails if the `s` parameter is `null` or not a numeric value, the `provider` parameter does not yield a `NumberFormatInfo` object, or the `style` parameter is not a combination of bit flags from the `NumberStyles` enumeration.

Ordinarily, if you pass the `Double.TryParse` method a string that is created by calling the `Double.ToString` method, the original `Double` value is returned. However, because of a loss of precision, the values might not be equal. In addition, attempting to parse the string representation of either `MinValue` or `MaxValue` fails to round-trip. It returns `NegativeInfinity` if you attempt to parse `MinValue`, or `PositiveInfinity` if you attempt to parse `MaxValue`. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/Double/TryParse/tryparse2.cs._

No exception is thrown when `s` is out of range of the `Double` data type. In most cases, the `TryParse` method calculates a result of `PositiveInfinity` or `NegativeInfinity`. However, there is a small set of values that are considered to be closer to the maximum or minimum values of `Double` than to positive or negative infinity. In those cases, the method calculates a result of `MaxValue` or `MinValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example demonstrates the use of the `TryParse` method to parse the string representation of numbers that have a particular style and are formatted using the conventions of a particular culture.

_Code sample not included: ~/snippets/csharp/System/Double/TryParse/TryParse1.cs._

## Double.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Double, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out double result, out int bytesConsumed);
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

## Double.TryParsePartial(Char>, NumberStyles, IFormatProvider, Double, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out double result, out int charsConsumed);
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

## Double.TryParsePartial(String, NumberStyles, IFormatProvider, Double, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out double result, out int charsConsumed);
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

## Double.E field

```csharp
public const double E = 2.<example-card-number>;
```

Represents the natural logarithmic base, specified by the constant, e.

#### Remarks

Euler's number is approximately 2.7182818284590452354.

## Double.Epsilon field

```csharp
public const double Epsilon = 4.94065645841247E-324;
```

Represents the smallest positive `Double` value that is greater than zero. This field is constant.

The value of the `Epsilon` property reflects the smallest positive `Double` value that is significant in numeric operations or comparisons when the value of the `Double` instance is zero. For example, the following code shows that zero and `Epsilon` are considered to be unequal values, whereas zero and half the value of `Epsilon` are considered to be equal.

_Code sample not included: ~/snippets/csharp/System/Double/Epsilon/epsilon.cs._

More precisely, the floating point format consists of a sign, a 52-bit mantissa or significand, and an 11-bit exponent. As the following example shows, zero has an exponent of -1022 and a mantissa of 0. `Epsilon` has an exponent of -1022 and a mantissa of 1. This means that `Epsilon` is the smallest positive `Double` value greater than zero and represents the smallest possible value and the smallest possible increment for a `Double` whose exponent is -1022.

_Code sample not included: ~/snippets/csharp/System/Double/Epsilon/epsilon1.cs._

However, the `Epsilon` property is not a general measure of precision of the `Double` type; it applies only to `Double` instances that have a value of zero or an exponent of -1022.

> **Note:**
> The value of the `Epsilon` property is not equivalent to machine epsilon, which represents the upper bound of the relative error due to rounding in floating-point arithmetic.

The value of this constant is 4.94065645841247e-324.

Two apparently equivalent floating-point numbers might not compare equal because of differences in their least significant digits. For example, the C# expression, `(double)1/3 == (double)0.33333`, does not compare equal because the division operation on the left side has maximum precision while the constant on the right side is precise only to the specified digits. If you create a custom algorithm that determines whether two floating-point numbers can be considered equal, we do not recommend that you base your algorithm on the value of the `Epsilon` constant to establish the acceptable absolute margin of difference for the two values to be considered equal.  (Typically, that margin of difference is many times greater than `Epsilon`.) For information about comparing two double-precision floating-point values, see `Double` and `Equals`.

#### Platform notes

On ARM systems, the value of the `Epsilon` constant is too small to be detected, so it equates to zero. You can define an alternative epsilon value that equals 2.2250738585072014E-308 instead.

## Double.MaxValue field

```csharp
public const double MaxValue = 1.7976931348623157E+308;
```

Represents the largest possible value of a `Double`. This field is constant.

#### Remarks
The value of this constant is positive 1.7976931348623157E+308.

The result of an operation that exceeds `MaxValue` is `PositiveInfinity`. In the following example, `PositiveInfinity` results from addition, multiplication, and exponentiation operations when the result exceeds `MaxValue`.

_Code sample not included: ~/snippets/csharp/System/Double/MaxValue/maxvalueex.cs._

#### Examples
The following code example illustrates the use of `MaxValue`:

_Code sample not included: ~/snippets/csharp/System/Double/Overview/source.cs._

## Double.MinValue field

```csharp
public const double MinValue = -1.7976931348623157E+308;
```

Represents the smallest possible value of a `Double`. This field is constant.

#### Remarks
The value of this constant is negative 1.7976931348623157E+308.

The result of an operation that is less than `MinValue` is `NegativeInfinity`. In the following example, `NegativeInfinity` results from subtraction and multiplication operations when the result is less than `MinValue`.

_Code sample not included: ~/snippets/csharp/System/Double/MinValue/minvalueex.cs._

#### Examples
The following code example illustrates the use of `MinValue`:

_Code sample not included: ~/snippets/csharp/System/Double/Overview/source.cs._
