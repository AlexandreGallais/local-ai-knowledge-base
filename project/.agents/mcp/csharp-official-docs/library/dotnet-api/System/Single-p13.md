---
title: "Single struct (part 13 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 13 of 14)

## Single.TryParse(String, NumberStyles, IFormatProvider, Single) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out float result);
```

Converts the string representation of a number in a specified style and culture-specific format to its single-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string representing a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Float` combined with `NumberStyles.AllowThousands`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the single-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or if `style` is not a valid combination of `NumberStyles` enumeration constants. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is the `NumberStyles.AllowHexSpecifier` value.

#### Remarks
Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

This overload differs from the `Parse` method by returning a Boolean value that indicates whether the parse operation succeeded instead of returning the parsed numeric value. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

The `style` parameter defines the allowable format of the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

-   `AllowHexSpecifier`

-   `HexNumber`

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

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Single` type. The remaining `NumberStyles` members control elements that may be but are not required to be present in the input string. The following table indicates how individual `NumberStyles` flags affect the elements that may be present in `s`.

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

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific formatting information. When the `TryParse` method is invoked, it calls the `provider` parameter's `IFormatProvider.GetFormat` method and passes it a `Type` object that represents the `NumberFormatInfo` type. The `IFormatProvider.GetFormat` method then returns the `NumberFormatInfo` object that provides information about the format of the `s` parameter. There are three ways to use the `provider` parameter to supply custom formatting information to the parse operation:

- You can pass a `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- You can pass the actual `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- You can pass a custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the formatting of `s` is interpreted based on the `NumberFormatInfo` object of the current culture.

If `s` is out of range of the `Single` data type, the method returns `NegativeInfinity` if `s` is less than `MinValue` and `PositiveInfinity` if `s` is greater than `MaxValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example demonstrates the use of the `TryParse` method to parse the string representation of numbers that have a particular style and are formatted using the conventions of a particular culture.

_Code sample not included: ~/snippets/csharp/System/Single/TryParse/tryparse1.cs._

## Single.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Single, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out float result, out int bytesConsumed);
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

## Single.TryParsePartial(Char>, NumberStyles, IFormatProvider, Single, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out float result, out int charsConsumed);
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

## Single.TryParsePartial(String, NumberStyles, IFormatProvider, Single, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out float result, out int charsConsumed);
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

## Single.E field

```csharp
public const float E = 2.71828175;
```

Represents the natural logarithmic base, specified by the constant, e.

#### Remarks

This is known as Euler's number and is approximately 2.7182818284590452354.

## Single.Epsilon field

```csharp
public const float Epsilon = 1.401298E-45;
```

Represents the smallest positive `Single` value that is greater than zero. This field is constant.

The value of the `Epsilon` property reflects the smallest positive `Single` value that is significant in numeric operations or comparisons when the value of the `Single` instance is zero. For example, the following code shows that zero and `Epsilon` are considered to be unequal values, whereas zero and half the value of `Epsilon` are considered to be equal.

_Code sample not included: ~/snippets/csharp/System/Single/Epsilon/epsilon.cs._

More precisely, the single-precision floating-point format consists of a sign, a 23-bit mantissa or significand, and an 8-bit exponent. As the following example shows, zero has an exponent of -126 and a mantissa of 0. `Epsilon` has an exponent of -126 and a mantissa of 1. This means that `Epsilon` is the smallest positive `Single` value that is greater than zero and represents the smallest possible value and the smallest possible increment for a `Single` whose exponent is -126.

_Code sample not included: ~/snippets/csharp/System/Single/Epsilon/epsilon1.cs._

However, the `Epsilon` property is not a general measure of precision of the `Single` type; it applies only to `Single` instances that have a value of zero.

> **Note:**
> The value of the `Epsilon` property is not equivalent to machine epsilon, which represents the upper bound of the relative error due to rounding in floating-point arithmetic.

The value of this constant is 1.4e-45.

Two apparently equivalent floating-point numbers might not compare equal because of differences in their least significant digits. For example, the C# expression, `(float)1/3 == (float)0.33333`, does not compare equal because the division operation on the left side has maximum precision while the constant on the right side is precise only to the specified digits. If you create a custom algorithm that determines whether two floating-point numbers can be considered equal, you must use a value that is greater than the `Epsilon` constant to establish the acceptable absolute margin of difference for the two values to be considered equal. (Typically, that margin of difference is many times greater than `Epsilon`.)

#### Platform notes

On ARM systems, the value of the `Epsilon` constant is too small to be detected, so it equates to zero. You can define an alternative epsilon value that equals 1.175494351E-38 instead.

## Single.MaxValue field

```csharp
public const float MaxValue = 3.40282347E+38;
```

Represents the largest possible value of `Single`. This field is constant.

#### Remarks
The value of this constant is positive 3.40282347E+38.

The result of an operation that exceeds `MaxValue` is `PositiveInfinity`. In the following example, `PositiveInfinity` results from addition, multiplication, and exponentiation operations when the result exceeds `MaxValue`.

_Code sample not included: ~/snippets/csharp/System/Single/MaxValue/maxvalueex.cs._

#### Examples
The following code example demonstrates the `MaxValue` constant.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.MinValue field

```csharp
public const float MinValue = -3.40282347E+38;
```

Represents the smallest possible value of `Single`. This field is constant.

#### Remarks
The value of this constant is negative 3.402823e38.

The result of an operation that is less than `MinValue` is `NegativeInfinity`. In the following example, `NegativeInfinity` results from subtraction and multiplication operations when the result is less than `MinValue`.

_Code sample not included: ~/snippets/csharp/System/Single/MinValue/minvalueex.cs._

#### Examples
The following code example demonstrates the `MinValue` constant.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._
