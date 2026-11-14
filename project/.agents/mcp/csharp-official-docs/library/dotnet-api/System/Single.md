---
title: "Single struct (part 1 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct

Namespace: `System`

```csharp
public readonly struct Single : IComparable<float>, IConvertible, IEquatable<float>, IParsable<float>, ISpanParsable<float>, IUtf8SpanParsable<float>, System.Numerics.IAdditionOperators<float,float,float>, System.Numerics.IAdditiveIdentity<float,float>, System.Numerics.IBinaryFloatingPointIeee754<float>, System.Numerics.IBinaryNumber<float>, System.Numerics.IBitwiseOperators<float,float,float>, System.Numerics.IComparisonOperators<float,float,bool>, System.Numerics.IDecrementOperators<float>, System.Numerics.IDivisionOperators<float,float,float>, System.Numerics.IEqualityOperators<float,float,bool>, System.Numerics.IExponentialFunctions<float>, System.Numerics.IFloatingPoint<float>, System.Numerics.IFloatingPointConstants<float>, System.Numerics.IFloatingPointIeee754<float>, System.Numerics.IHyperbolicFunctions<float>, System.Numerics.IIncrementOperators<float>, System.Numerics.ILogarithmicFunctions<float>, System.Numerics.IMinMaxValue<float>, System.Numerics.IModulusOperators<float,float,float>, System.Numerics.IMultiplicativeIdentity<float,float>, System.Numerics.IMultiplyOperators<float,float,float>, System.Numerics.INumber<float>, System.Numerics.INumberBase<float>, System.Numerics.IPowerFunctions<float>, System.Numerics.IRootFunctions<float>, System.Numerics.ISignedNumber<float>, System.Numerics.ISubtractionOperators<float,float,float>, System.Numerics.ITrigonometricFunctions<float>, System.Numerics.IUnaryNegationOperators<float,float>, System.Numerics.IUnaryPlusOperators<float,float>
```

Represents a single-precision floating-point number.

The `Single` value type represents a single-precision 32-bit number with values ranging from negative 3.402823e38 to positive 3.402823e38, as well as positive or negative zero, `PositiveInfinity`, `NegativeInfinity`, and not a number (`NaN`). It is intended to represent values that are extremely large (such as distances between planets or galaxies) or extremely small (such as the molecular mass of a substance in kilograms) and that often are imprecise (such as the distance from earth to another solar system). The `Single` type complies with the IEC 60559:1989 (IEEE 754) standard for binary floating-point arithmetic.

`Single` provides methods to compare instances of this type, to convert the value of an instance to its string representation, and to convert the string representation of a number to an instance of this type. For information about how format specification codes control the string representation of value types, see Formatting Types, Standard Numeric Format Strings, and Custom Numeric Format Strings.

#### Floating-point representation and precision

The `Single` data type stores single-precision floating-point values in a 32-bit binary format, as shown in the following table:

| Part                              | Bits  |
|-----------------------------------|-------|
| Significand or mantissa           | 0-22  |
| Exponent                          | 23-30 |
| Sign (0 = positive, 1 = negative) | 31    |

Just as decimal fractions are unable to precisely represent some fractional values (such as 1/3 or `PI`), binary fractions are unable to represent some fractional values. For example, 2/10, which is represented precisely by .2 as a decimal fraction, is represented by .<example-card-number> as a binary fraction, with the pattern "1100" repeating to infinity. In this case, the floating-point value provides an imprecise representation of the number that it represents. Performing additional mathematical operations on the original floating-point value often increases its lack of precision. For example, if you compare the results of multiplying .3 by 10 and adding .3 to .3 nine times, you will see that addition produces the less precise result, because it involves eight more operations than multiplication. Note that this disparity is apparent only if you display the two `Single` values by using the "R" standard numeric format string, which, if necessary, displays all 9 digits of precision supported by the `Single` type.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/representation1.cs._

Because some numbers cannot be represented exactly as fractional binary values, floating-point numbers can only approximate real numbers.

All floating-point numbers have a limited number of significant digits, which also determines how accurately a floating-point value approximates a real number. A `Single` value has up to 7 decimal digits of precision, although a maximum of 9 digits is maintained internally. This means that some floating-point operations may lack the precision to change a floating-point value. The following example defines a large single-precision floating-point value, and then adds the product of `Epsilon` and one quadrillion to it. However, the product is too small to modify the original floating-point value. Its least significant digit is thousandths, whereas the most significant digit in the product is 10-30.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/representation2.cs._

The limited precision of a floating-point number has several consequences:

- Two floating-point numbers that appear equal for a particular precision might not compare equal because their least significant digits are different. In the following example, a series of numbers are added together, and their total is compared with their expected total. A call to the `Equals` method indicates that the values aren't equal.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/precisionlist3.cs._

The two values are unequal because of a loss of precision during the addition operations. In this case, the issue can be resolved by calling the `Round` method to round the `Single` values to the desired precision before performing the comparison.

- A mathematical or comparison operation that uses a floating-point number might not yield the same result if a decimal number is used, because the binary floating-point number might not equal the decimal number. A previous example illustrated this by displaying the result of multiplying .3 by 10 and adding .3 to .3 nine times.

When accuracy in numeric operations with fractional values is important, use the `Decimal` type instead of the `Single` type. When accuracy in numeric operations with integral values beyond the range of the `Int64` or `UInt64` types is important, use the `BigInteger` type.

- `Single` values have less precision than `Double` values. A `Single` value that is converted to a seemingly equivalent `Double` often does not equal the `Double` value because of differences in precision. In the following example, the result of identical division operations is assigned to a `Double` value and a `Single` value. After the `Single` value is cast to a `Double`, a comparison of the two values shows that they are unequal.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/precisionlist1.cs._

To avoid this problem, either use the `Double` data type in place of the `Single` data type, or use the `Math.Round` method so that both values have the same precision.

#### Test for equality

To be considered equal, two `Single` values must represent identical values. However, because of differences in precision between values, or because of a loss of precision by one or both values, floating-point values that are expected to be identical often turn out to be unequal due to differences in their least significant digits. As a result, calls to the `Single.Equals` method to determine whether two values are equal, or calls to the `Single.CompareTo` method to determine the relationship between two `Single` values, often yield unexpected results. This is evident in the following example, where two apparently equal `Single` values turn out to be unequal, because the first value has 7 digits of precision, whereas the second value has 9.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/comparison1.cs._

Calculated values that follow different code paths and that are manipulated in different ways often prove to be unequal. In the following example, one `Single` value is squared, and then the square root is calculated to restore the original value. A second `Single` is multiplied by 3.51 and squared before the square root of the result is divided by 3.51 to restore the original value. Although the two values appear to be identical, a call to the `Equals` method indicates that they are not equal.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/comparison2.cs._

In cases where a loss of precision is likely to affect the result of a comparison, you can use the following techniques instead of calling the `Single.Equals` or `Single.CompareTo` method:

- Call the `Math.Round` method to ensure that both values have the same precision. The following example modifies a previous example to use this approach so that two fractional values are equivalent.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/comparison3.cs._

The problem of precision still applies to rounding of midpoint values. For more information, see the `Round` method.

- Test for approximate equality instead of equality. This technique requires that you define either an absolute amount by which the two values can differ but still be equal, or that you define a relative amount by which the smaller value can diverge from the larger value.

> **Warning:**
> `Epsilon` is sometimes used as an absolute measure of the distance between two `Single` values when testing for equality. However, `Epsilon` measures the smallest possible value that can be added to, or subtracted from, a `Single` whose value is zero. For most positive and negative `Single` values, the value of `Epsilon` is too small to be detected. Therefore, except for values that are zero, we do not recommend its use in tests for equality.

The following example uses the latter approach to define an `IsApproximatelyEqual` method that tests the relative difference between two values. It also contrasts the result of calls to the `IsApproximatelyEqual` method and the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/comparison4.cs._

#### Floating-point values and exceptions

Operations with floating-point values do not throw exceptions, unlike operations with integral types, which throw exceptions in cases of illegal operations such as division by zero or overflow. Instead, in these situations, the result of a floating-point operation is zero, positive infinity, negative infinity, or not a number (NaN):

- If the result of a floating-point operation is too small for the destination format, the result is zero. This can occur when two very small floating-point numbers are multiplied, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/exceptional1.cs._

- If the magnitude of the result of a floating-point operation exceeds the range of the destination format, the result of the operation is `PositiveInfinity` or `NegativeInfinity`, as appropriate for the sign of the result. The result of an operation that overflows `MaxValue` is `PositiveInfinity`, and the result of an operation that overflows `MinValue` is `NegativeInfinity`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/exceptional2.cs._

`PositiveInfinity` also results from a division by zero with a positive dividend, and `NegativeInfinity` results from a division by zero with a negative dividend.

- If a floating-point operation is invalid, the result of the operation is `NaN`. For example, `NaN` results from the following operations:

- Division by zero with a dividend of zero. Note that other cases of division by zero result in either `PositiveInfinity` or `NegativeInfinity`.
- Any floating-point operation with invalid input. For example, attempting to find the square root of a negative value returns `NaN`.
- Any operation with an argument whose value is `NaN`.

#### Type conversions

The `Single` structure does not define any explicit or implicit conversion operators; instead, conversions are implemented by the compiler.

The following table lists the possible conversions of a value of the other primitive numeric types to a `Single` value. It also indicates whether the conversion is widening or narrowing and whether the resulting `Single` may have less precision than the original value.

| Conversion from     | Widening/narrowing | Possible loss of precision |
|---------------------|--------------------|----------------------------|
| `Byte`  | Widening           | No                         |
|`Decimal`|WideningNote that C# requires a cast operator.|Yes. `Decimal` supports 29 decimal digits of precision; `Single` supports 9.|
|`Double`|Narrowing; out-of-range values are converted to `NegativeInfinity` or `PositiveInfinity`.|Yes. `Double` supports 17 decimal digits of precision; `Single` supports 9.|
| `Int16` | Widening           | No                         |
|`Int32`|Widening|Yes. `Int32` supports 10 decimal digits of precision; `Single` supports 9.|
|`Int64`|Widening|Yes. `Int64` supports 19 decimal digits of precision; `Single` supports 9.|
|`SByte`|Widening|No|
|`UInt16`|Widening|No|
|`UInt32`|Widening|Yes. `UInt32` supports 10 decimal digits of precision; `Single` supports 9.|
|`UInt64`|Widening|Yes. `Int64` supports 20 decimal digits of precision; `Single` supports 9.|

The following example converts the minimum or maximum value of other primitive numeric types to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/convert1.cs._

In addition, the `Double` values `NaN`, `PositiveInfinity`, and `NegativeInfinity` convert to `NaN`, `PositiveInfinity`, and `NegativeInfinity`, respectively.

Note that the conversion of the value of some numeric types to a `Single` value can involve a loss of precision. As the example illustrates, a loss of precision is possible when converting `Decimal`, `Double`, `Int32`, `Int64`, `UInt32`, and `UInt64` values to `Single` values.

The conversion of a `Single` value to a `Double` is a widening conversion. The conversion may result in a loss of precision if the `Double` type does not have a precise representation for the `Single` value.

The conversion of a `Single` value to a value of any primitive numeric data type other than a `Double` is a narrowing conversion and requires a cast operator (in C#) or a conversion method (in Visual Basic). Values that are outside the range of the target data type, which are defined by the target type's `MinValue` and `MaxValue` properties, behave as shown in the following table.
