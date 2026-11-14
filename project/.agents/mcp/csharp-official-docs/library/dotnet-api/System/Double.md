---
title: "Double struct (part 1 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct

Namespace: `System`

```csharp
public readonly struct Double : IComparable<double>, IConvertible, IEquatable<double>, IParsable<double>, ISpanParsable<double>, IUtf8SpanParsable<double>, System.Numerics.IAdditionOperators<double,double,double>, System.Numerics.IAdditiveIdentity<double,double>, System.Numerics.IBinaryFloatingPointIeee754<double>, System.Numerics.IBinaryNumber<double>, System.Numerics.IBitwiseOperators<double,double,double>, System.Numerics.IComparisonOperators<double,double,bool>, System.Numerics.IDecrementOperators<double>, System.Numerics.IDivisionOperators<double,double,double>, System.Numerics.IEqualityOperators<double,double,bool>, System.Numerics.IExponentialFunctions<double>, System.Numerics.IFloatingPoint<double>, System.Numerics.IFloatingPointConstants<double>, System.Numerics.IFloatingPointIeee754<double>, System.Numerics.IHyperbolicFunctions<double>, System.Numerics.IIncrementOperators<double>, System.Numerics.ILogarithmicFunctions<double>, System.Numerics.IMinMaxValue<double>, System.Numerics.IModulusOperators<double,double,double>, System.Numerics.IMultiplicativeIdentity<double,double>, System.Numerics.IMultiplyOperators<double,double,double>, System.Numerics.INumber<double>, System.Numerics.INumberBase<double>, System.Numerics.IPowerFunctions<double>, System.Numerics.IRootFunctions<double>, System.Numerics.ISignedNumber<double>, System.Numerics.ISubtractionOperators<double,double,double>, System.Numerics.ITrigonometricFunctions<double>, System.Numerics.IUnaryNegationOperators<double,double>, System.Numerics.IUnaryPlusOperators<double,double>
```

Represents a double-precision floating-point number.

The `Double` value type represents a double-precision 64-bit number with values ranging from negative 1.79769313486232e308 to positive 1.79769313486232e308, as well as positive or negative zero, `PositiveInfinity`, `NegativeInfinity`, and not a number (`NaN`). It's intended to represent values that are extremely large (such as distances between planets or galaxies) or extremely small (such as the molecular mass of a substance in kilograms) and that often are imprecise (such as the distance from earth to another solar system). The `Double` type complies with the IEC 60559:1989 (IEEE 754) standard for binary floating-point arithmetic.

#### Floating-point representation and precision

The `Double` data type stores double-precision floating-point values in a 64-bit binary format, as shown in the following table:

| Part                              | Bits  |
|-----------------------------------|-------|
| Significand or mantissa           | 0-51  |
| Exponent                          | 52-62 |
| Sign (0 = Positive, 1 = Negative) | 63    |

Just as decimal fractions are unable to precisely represent some fractional values (such as 1/3 or `PI`), binary fractions are unable to represent some fractional values. For example, 1/10, which is represented precisely by .1 as a decimal fraction, is represented by .001100110011 as a binary fraction, with the pattern "0011" repeating to infinity. In this case, the floating-point value provides an imprecise representation of the number that it represents. Performing additional mathematical operations on the original floating-point value often tends to increase its lack of precision. For example, if you compare the result of multiplying .1 by 10 and adding .1 to .1 nine times, you see that addition, because it has involved eight more operations, has produced the less precise result. (Prior to .NET 10, this disparity is apparent only if you display the two `Double` values by using the "R" standard numeric format string, which displays up to all 17 digits of precision supported by the `Double` type.)

_Code sample not included: ~/snippets/csharp/System/Double/Overview/representation1.cs._

Because some numbers can't be represented exactly as fractional binary values, floating-point numbers can only approximate real numbers.

All floating-point numbers also have a limited number of significant digits, which also determines how accurately a floating-point value approximates a real number. A `Double` value has up to 15 decimal digits of precision, although a maximum of 17 digits is maintained internally. This means that some floating-point operations might lack the precision to change a floating point value. The following example provides an illustration. It defines a very large floating-point value, and then adds the product of `Epsilon` and one quadrillion to it. The product, however, is too small to modify the original floating-point value. Its least significant digit is thousandths, whereas the most significant digit in the product is 10-309.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/representation2.cs._

The limited precision of a floating-point number has several consequences:

- Two floating-point numbers that appear equal for a particular precision might not compare equal, because their least significant digits are different. In the following example, a series of numbers are added together, and their total is compared with their expected total.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/precisionlist3.cs._

The two values are unequal because of a loss of precision during the addition operations. In this case, the issue can be resolved by calling the `Round` method to round the `Double` values to the desired precision before performing the comparison.

- A mathematical or comparison operation that uses a floating-point number might not yield the same result if a decimal number is used, because the binary floating-point number might not equal the decimal number. A previous example illustrated this by displaying the result of multiplying .1 by 10 and adding .1 times.

When accuracy in numeric operations with fractional values is important, you can use the `Decimal` type rather than the `Double` type. When accuracy in numeric operations with integral values beyond the range of the `Int128` `UInt128` types is important, use the `BigInteger` type.

- `Single` values have less precision than `Double` values. A `Single` value that's converted to a seemingly equivalent `Double` often does not equal the `Double` value because of differences in precision. In the following example, the result of identical division operations is assigned to a `Double` and a `Single` value. After the `Single` value is cast to a `Double`, a comparison of the two values shows that they are unequal.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/precisionlist1.cs._

To avoid this problem, use either the `Double` in place of the `Single` data type, or use the `Math.Round` method so that both values have the same precision.

In addition, the result of arithmetic and assignment operations with `Double` values might differ slightly by platform because of the loss of precision of the `Double` type. For example, the result of assigning a literal `Double` value might differ in the 32-bit and 64-bit versions of .NET. The following example illustrates this difference when the literal value -4.42330604244772E-305 and a variable whose value is -4.42330604244772E-305 are assigned to a `Double` variable. Note that the result of the `Parse` method in this case does not suffer from a loss of precision.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/precision1.cs._

#### Test for equality

To be considered equal, two `Double` values must represent identical values. However, because of differences in precision between values, or because of a loss of precision by one or both values, floating-point values that are expected to be identical often turn out to be unequal because of differences in their least significant digits. As a result, calls to the `Double.Equals` method to determine whether two values are equal, or calls to the `Double.CompareTo` method to determine the relationship between two `Double` values, often yield unexpected results. This is evident in the following example, where two apparently equal `Double` values turn out to be unequal because the first has 15 digits of precision, while the second has 17.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/comparison1.cs._

In cases where a loss of precision is likely to affect the result of a comparison, you can adopt any of the following alternatives to calling the `Double.Equals` or `Double.CompareTo` method:

- Call the `Math.Round` method to ensure that both values have the same precision. The following example modifies a previous example to use this approach so that two fractional values are equivalent.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/comparison3.cs._

The problem of precision still applies to rounding of midpoint values. For more information, see the `Round` method.

- Test for approximate equality rather than equality. This requires that you define either an absolute amount by which the two values can differ but still be equal, or that you define a relative amount by which the smaller value can diverge from the larger value.

> **Warning:**
> `Epsilon` is sometimes used as an absolute measure of the distance between two `Double` values when testing for equality. However, `Epsilon` measures the smallest possible value that can be added to, or subtracted from, a `Double` whose value is zero. For most positive and negative `Double` values, the value of `Epsilon` is too small to be detected. Therefore, except for values that are zero, we do not recommend its use in tests for equality.

The following example uses the latter approach to define an `IsApproximatelyEqual` method that tests the relative difference between two values. The method divides by `Math.Max(value1, value2)` so the comparison is relative to the larger (by magnitude) of the two values, which places the result in the correct order of magnitude. If `Math.Max` returns zero (which happens when one value is zero and the other is negative), the method falls back to `Math.Min(value1, value2)` to use the non-zero value as the divisor. It also contrasts the result of calls to the `IsApproximatelyEqual` method and the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/comparison4.cs._

#### Floating-point values and exceptions

Unlike operations with integral types, which throw a `DivideByZeroException` for division by zero or an `OverflowException` for overflow in a checked context, operations with floating-point values don't throw exceptions. Instead, in exceptional situations, the result of a floating-point operation is zero, positive infinity, negative infinity, or not a number (NaN):

- If the result of a floating-point operation is too small for the destination format, the result is zero. This can occur when two very small numbers are multiplied, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/exceptional1.cs._

- If the magnitude of the result of a floating-point operation exceeds the range of the destination format, the result of the operation is `PositiveInfinity` or `NegativeInfinity`, as appropriate for the sign of the result. The result of an operation that overflows `MaxValue` is `PositiveInfinity`, and the result of an operation that overflows `MinValue` is `NegativeInfinity`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/exceptional2.cs._

`PositiveInfinity` also results from a division by zero with a positive dividend, and `NegativeInfinity` results from a division by zero with a negative dividend.

- If a floating-point operation is invalid, the result of the operation is `NaN`. For example, `NaN` results from the following operations:

- Division by zero with a dividend of zero. Note that other cases of division by zero result in either `PositiveInfinity` or `NegativeInfinity`.

- Any floating-point operation with an invalid input. For example, calling the `Math.Sqrt` method with a negative value returns `NaN`, as does calling the `Math.Acos` method with a value that is greater than one or less than negative one.

- Any operation with an argument whose value is `NaN`.

#### Type conversions

The `Double` structure does not define any explicit or implicit conversion operators; instead, conversions are implemented by the compiler.

The conversion of the value of any primitive numeric type to a `Double` is a widening conversion and therefore does not require an explicit cast operator or call to a conversion method unless a compiler explicitly requires it. For example, the C# compiler requires a casting operator for conversions from `Decimal` to `Double`, while the Visual Basic <example-value> does not. The following example converts the minimum or maximum value of other primitive numeric types to a `Double`.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/convert1.cs._

In addition, the `Single` values `NaN`, `PositiveInfinity`, and `NegativeInfinity` convert to `NaN`, `PositiveInfinity`, and `NegativeInfinity`, respectively.

Note that the conversion of the value of some numeric types to a `Double` value can involve a loss of precision. As the example illustrates, a loss of precision is possible when converting `Decimal`, `Int64`, and `UInt64` values to `Double` values.

The conversion of a `Double` value to a value of any other primitive numeric data type is a narrowing conversion and requires a cast operator (in C#), a conversion method (in Visual Basic), or a call to a `Convert` method. Values that are outside the range of the target data type, which are defined by the target type's `MinValue` and `MaxValue` properties, behave as shown in the following table.

|Target type|Result|
|-----------------|------------|
|Any integral type|An `OverflowException` exception if the conversion occurs in a checked context.If the conversion occurs in an unchecked context (the default in C#), the conversion operation succeeds but the value overflows.|
|`Decimal`|An `OverflowException` exception.|
|`Single`|`NegativeInfinity` for negative values.`PositiveInfinity` for positive values.|

In addition, `NaN`, `PositiveInfinity`, and `NegativeInfinity` throw an `OverflowException` for conversions to integers in a checked context, but these values overflow when converted to integers in an unchecked context. For conversions to `Decimal`, they always throw an `OverflowException`. For conversions to `Single`, they convert to `NaN`, `PositiveInfinity`, and `NegativeInfinity`, respectively.
