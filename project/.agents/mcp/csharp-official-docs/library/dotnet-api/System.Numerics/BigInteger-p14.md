---
title: "BigInteger struct (part 14 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 14 of 18)

## BigInteger.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static System.Numerics.BigInteger Parse (string value, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its `BigInteger` equivalent.

Parameters:

- `value`: A string that contains a number to convert.
- `style`: A bitwise combination of the enumeration values that specify the permitted format of `value`.
- `provider`: An object that provides culture-specific formatting information about `value`.

Returns: A value that is equivalent to the number specified in the `value` parameter.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` or `NumberStyles.HexNumber` flag along with another value.
- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` does not comply with the input pattern specified by `style`.

#### Remarks
The `style` parameter defines the style elements (such as white space, the positive or negative sign symbol, the group separator symbol, or the decimal point symbol) that are allowed in the `value` parameter for the parse operation to succeed. `styles` must be a combination of bit flags from the `NumberStyles` enumeration. The `style` parameter makes this method overload useful when `value` contains the string representation of a hexadecimal value, when the number system (decimal or hexadecimal) represented by `value` is known only at run time, or when you want to disallow white space or a sign symbol in `value`.

Depending on the value of `style`, the `value` parameter may include the following elements:

*ws**sign**digits**.fractional_digits**exponential_digits*][*ws*]

If `style` includes `AllowHexSpecifier`, the `value` parameter may include the following elements:

[*ws*]*hexdigits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the start of `value` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the culture indicated by the `provider` parameter. The current culture's currency symbol can appear in `value` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the start of `value` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `value` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9. For *fractional_digits*, only the digit 0 is valid.|
|*,*|A culture-specific group separator symbol. The group separator symbol of the culture specified by `provider` can appear in `value` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture designated by `provider` can appear in `value` if `style` includes the `AllowDecimalPoint` flag. Only the digit 0 can appear as a fractional digit for the parse operation to succeed; if *fractional_digits* includes any other digit, a `FormatException` is thrown.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `value` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `value`.

|NumberStyles value|Elements permitted in value in addition to digits|
|------------------------|-------------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The decimal point (.) and *fractional-digits* elements.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation. along with *exponential_digits*.|
|`AllowLeadingWhite`|The *ws* element at the start of `value`.|
|`AllowTrailingWhite`|The *ws* element at the end of `value`.|
|`AllowLeadingSign`|The *sign* element at the start of `value`.|
|`AllowTrailingSign`|The *sign* element at the end of `value`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The group separator (,) element.|
|`AllowCurrencySymbol`|The currency ($) element.|
|`Currency`|All elements. However, `value` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the start or end of `value`, *sign* at the start of `value`, and the decimal point (.) symbol. The `value` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, group separator (,), and decimal point (.) elements.|
|`Any`|All elements. However, `value` cannot represent a hexadecimal number.|

> **Important:**
>  If you use the `BigInteger.Parse` method to round-trip the string representation of a `BigInteger` value that was output by the `BigInteger.ToString` method, you should use the `ToString` method with the "R" format specifier to generate the string representation of the `BigInteger` value. Otherwise, the string representation of the `BigInteger` preserves only the 50 most significant digits of the original value, and data may be lost when you use the `BigInteger.Parse` method to restore the `BigInteger` value.

Unlike the other `NumberStyles` values, which allow for but do not require the presence of particular style elements in `value`, the `AllowHexSpecifier` style value means that the individual numeric characters in `value` are always interpreted as hexadecimal characters. Valid hexadecimal characters are 0-9, A-F, and a-f. The only other flags that can be combined with the `style` parameter are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If `value` is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the conversion to fail.

If `value` is a hexadecimal string, the `Parse` method interprets `value` as a negative number stored by using two's complement representation if its first two hexadecimal digits are greater than or equal to `0x80`. In other words, the method interprets the highest-order bit of the first byte in `value` as the sign bit. To make sure that a hexadecimal string is correctly interpreted as a positive number, the first digit in `value` must have a value of zero. For example, the method interprets `0x80` as a negative value, but it interprets either `0x080` or `0x0080` as a positive value. The following example illustrates the difference between hexadecimal strings that represent negative and positive values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/ParseHex1.cs._

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `value`. Typically, `provider` can be any one of the following:

- A `CultureInfo` object that represents the culture that provides numeric formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information.

- A `NumberFormatInfo` object that provides formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider` and uses the `NumberFormatInfo.GetFormat` method to instantiate and return the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example makes several calls to the `Parse` method using various combinations of values for the `style` and `provider` parameters.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/Parse1.cs._

A number of the individual calls to the `Parse` method pass an instance of the following `BigIntegerFormatProvider` class, which defines a tilde (~) as the negative sign.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/Parse1.cs._

## BigInteger.PopCount(BigInteger) method

```csharp
public static System.Numerics.BigInteger PopCount (System.Numerics.BigInteger value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## BigInteger.Pow(BigInteger, Int32) method

```csharp
public static System.Numerics.BigInteger Pow (System.Numerics.BigInteger value, int exponent);
```

Raises a `BigInteger` value to the power of a specified value.

Parameters:

- `value`: The number to raise to the `exponent` power.
- `exponent`: The exponent to raise `value` by.

Returns: The result of raising `value` to the `exponent` power.

Exceptions:

- `ArgumentOutOfRangeException`: `exponent` is negative.

#### Remarks
The `BigInteger.Pow` method returns 1 if the value of the exponent parameter is 0, or if the values of both the `value` and `exponent` parameters are 0. If `exponent` is 1, the `BigInteger.Pow` method returns `value`. If `value` is negative and exponent is odd, the method returns a negative result.

This method corresponds to the `Math.Pow` method for primitive numeric types.

#### Examples
The following example illustrates exponentiation using a `BigInteger` value and an exponent whose value ranges from 0 to 10.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

## BigInteger.Remainder(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Remainder (System.Numerics.BigInteger dividend, System.Numerics.BigInteger divisor);
```

Performs integer division on two `BigInteger` values and returns the remainder.

Parameters:

- `dividend`: The value to be divided.
- `divisor`: The value to divide by.

Returns: The remainder after dividing `dividend` by `divisor`.

Exceptions:

- `DivideByZeroException`: `divisor` is 0 (zero).

#### Remarks
The sign of the remainder is the sign of the `dividend` parameter.

The `BigInteger.Remainder` method is implemented for languages that do not support custom operators. Its behavior is identical to division using the modulus operator.

If necessary, the method automatically performs implicit conversion of other integral types to `BigInteger` objects before it performs the modulus operation.

#### Examples
The following example compares the remainder from the `BigInteger.DivRem` method with the remainder returned by the `BigInteger.Remainder` method to establish that the two methods calculate identical remainders.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Remainder/Remainder1.cs._

## BigInteger.RotateLeft(BigInteger, Int32) method

```csharp
public static System.Numerics.BigInteger RotateLeft (System.Numerics.BigInteger value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that's rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## BigInteger.RotateRight(BigInteger, Int32) method

```csharp
public static System.Numerics.BigInteger RotateRight (System.Numerics.BigInteger value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that's rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## BigInteger.Subtract(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Subtract (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Subtracts one `BigInteger` value from another and returns the result.

Parameters:

- `left`: The value to subtract from (the minuend).
- `right`: The value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`.

#### Remarks
Languages that do not support custom operators can use the `BigInteger.Subtract` method to perform subtraction using `BigInteger` values.

The `BigInteger.Subtract` method is a useful substitute for the subtraction operator when instantiating a `BigInteger` variable by assigning it the difference that results from subtraction, as shown in the following example.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Add/Multiply1.cs._

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.GetByteCount() method

```csharp
int IBinaryInteger<BigInteger>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.GetShortestBitLength() method

```csharp
int IBinaryInteger<BigInteger>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.Log10(BigInteger) method

```csharp
static System.Numerics.BigInteger IBinaryInteger<BigInteger>.Log10 (System.Numerics.BigInteger value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.
