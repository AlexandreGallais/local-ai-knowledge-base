---
title: "Complex struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct

Namespace: `System.Numerics`

```csharp
public readonly struct Complex : IEquatable<System.Numerics.Complex>, IParsable<System.Numerics.Complex>, ISpanParsable<System.Numerics.Complex>, IUtf8SpanParsable<System.Numerics.Complex>, System.Numerics.IAdditionOperators<System.Numerics.Complex,System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.IAdditiveIdentity<System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.IDecrementOperators<System.Numerics.Complex>, System.Numerics.IDivisionOperators<System.Numerics.Complex,System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.IEqualityOperators<System.Numerics.Complex,System.Numerics.Complex,bool>, System.Numerics.IIncrementOperators<System.Numerics.Complex>, System.Numerics.IMultiplicativeIdentity<System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.IMultiplyOperators<System.Numerics.Complex,System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.INumberBase<System.Numerics.Complex>, System.Numerics.ISignedNumber<System.Numerics.Complex>, System.Numerics.ISubtractionOperators<System.Numerics.Complex,System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.IUnaryNegationOperators<System.Numerics.Complex,System.Numerics.Complex>, System.Numerics.IUnaryPlusOperators<System.Numerics.Complex,System.Numerics.Complex>
```

Represents a complex number.

A complex number is a number that comprises a real number part and an imaginary number part. A complex number z is usually written in the form `z = x + yi`, where *x* and *y* are real numbers, and *i* is the imaginary unit that has the property *i*2 = -1. The real part of the complex number is represented by *x*, and the imaginary part of the complex number is represented by *y*.

The `Complex` type uses the Cartesian coordinate system (real, imaginary) when instantiating and manipulating complex numbers. A complex number can be represented as a point in a two-dimensional coordinate system, which is known as the complex plane. The real part of the complex number is positioned on the x-axis (the horizontal axis), and the imaginary part is positioned on the y-axis (the vertical axis).

Any point in the complex plane can also be expressed based on its absolute value, by using the polar coordinate system. In polar coordinates, a point is characterized by two numbers:

- Its magnitude, which is the distance of the point from the origin (that is, 0,0, or the point at which the x-axis and the y-axis intersect).
- Its phase, which is the angle between the real axis and the line drawn from the origin to the point.

#### Instantiate a complex number

You can assign a value to a complex number in one of the following ways:

- By passing two `Double` values to its constructor. The first value represents the real part of the complex number, and the second value represents its imaginary part. These values represent the position of the complex number in the two-dimensional Cartesian coordinate system.

- By calling the static (`Shared` in Visual Basic) `Complex.FromPolarCoordinates` method to create a complex number from its polar coordinates.

- By assigning a `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, `Single`, or `Double` value to a `Complex` object. The value becomes the real part of the complex number, and its imaginary part equals 0.

- By casting (in C#) or converting (in Visual Basic) a `Decimal` or `BigInteger` value to a `Complex` object. The value becomes the real part of the complex number, and its imaginary part equals 0.

- By assigning the complex number that is returned by a method or operator to a `Complex` object. For example, `Complex.Add` is a static method that returns a complex number that is the sum of two complex numbers, and the `Complex.op_Addition` operator adds two complex numbers and returns the result.

The following example demonstrates each of these five ways of assigning a value to a complex number.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Overview/create1.cs._

#### Operations with complex numbers

The `Complex` structure in .NET includes members that provide the following functionality:

- Methods to compare two complex numbers to determine whether they are equal.
- Operators to perform arithmetic operations on complex numbers. `Complex` operators enable you to perform addition, subtraction, multiplication, division, and unary negation with complex numbers.
- Methods to perform other numerical operations on complex numbers. In addition to the four basic <example-value> operations, you can raise a complex number to a specified power, find the square root of a complex number, and get the absolute value of a complex number.
- Methods to perform trigonometric operations on complex numbers. For example, you can calculate the tangent of an angle represented by a complex number.

Note that, because the `Real` and  `Imaginary` properties are read-only, you cannot modify the value of an existing `Complex` object. All methods that perform an operation on a `Complex` number, if their return value is of type `Complex`, return a new `Complex` number.

#### Precision and complex numbers

The real and imaginary parts of a complex number are represented by two double-precision floating-point values. This means that `Complex` values, like double-precision floating-point values, can lose precision as a result of numerical operations. This means that strict comparisons for equality of two `Complex` values may fail, even if the difference between the two values is due to a loss of precision. For more information, see `Double`.

In .NET 11 and later, the arithmetic operators and mathematical functions follow C23 Annex G for results involving infinities, NaNs, and signed zeros.

For example, performing exponentiation on the logarithm of a number should return the original number. However, in some cases, the loss of precision of floating-point values can cause slight differences between the two values, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Overview/precision1.cs._

Similarly, the following example, which calculates the square root of a `Complex` number, produces slightly different results on the 32-bit and IA64 versions of .NET.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Overview/precision1.cs._

#### Infinity and NaN

The real and imaginary parts of a complex number are represented by `Double` values. In addition to ranging from `MinValue` to `MaxValue`, the real or imaginary part of a complex number can have a value of `PositiveInfinity`, `NegativeInfinity`, or `NaN`. `PositiveInfinity`, `NegativeInfinity`, and `NaN` all propagate in any arithmetic or trigonometric operation.

In the following example, division by `Zero` produces a complex number whose real and imaginary parts are both `NaN`. As a result, performing multiplication with this value also produces a complex number whose real and imaginary parts are `NaN`. Similarly, performing a multiplication that overflows the range of the `Double` type produces a complex number whose real part is `NaN` and whose imaginary part is `PositiveInfinity`. Subsequently performing division with this complex number returns a complex number whose real part is `NaN` and whose imaginary part is `PositiveInfinity`.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Overview/nan1.cs._

Mathematical operations with complex numbers that are invalid or that overflow the range of the `Double` data type do not throw an exception. Instead, they return a `PositiveInfinity`, `NegativeInfinity`, or `NaN` under the following conditions:

- The division of a positive number by zero returns `PositiveInfinity`.
- Any operation that overflows the upper bound of the `Double` data type returns `PositiveInfinity`.
- The division of a negative number by zero returns `NegativeInfinity`.
- Any operation that overflows the lower bound of the `Double` data type returns `NegativeInfinity`.
- The division of a zero by zero returns `NaN`.
- Any operation that is performed on operands whose values are `PositiveInfinity`, `NegativeInfinity`, or `NaN` returns `PositiveInfinity`, `NegativeInfinity`, or `NaN`, depending on the specific operation.

Note that this applies to any intermediate calculations performed by a method. For example, the multiplication of `new Complex(9e308, 9e308) and new Complex(2.5, 3.5)` uses the formula (ac - bd) + (ad + bc)i. The calculation of the real component that results from the multiplication evaluates the expression 9e308 *2.5 - 9e308* 3.5. Each intermediate multiplication in this expression returns `PositiveInfinity`, and the attempt to subtract `PositiveInfinity` from `PositiveInfinity` returns `NaN`.

#### Format a complex number

By default, the string representation of a complex number takes the form `<`*real*`;` *imaginary*`>`, where *real* and *imaginary* are the string representations of the `Double` values that form the complex number's real and imaginary components. Some overloads of the `Complex.ToString` method allow customization of the string representations of these `Double` values to reflect the formatting conventions of a particular culture or to appear in a particular format defined by a standard or custom numeric format string. (For more information, see Standard Numeric Format Strings and Custom Numeric Format Strings.)

One of the more common ways of expressing the string representation of a complex number takes the form `a + bi`, where `a` is the complex number's real component, and `b` is the complex number's imaginary component. In electrical engineering, a complex number is most commonly expressed as `a + bj`. You can return the string representation of a complex number in either of these two forms. To do this, define a custom format provider by implementing the `ICustomFormatter` and `IFormatProvider` interfaces, and then call the `Format` method.

The following example defines a `ComplexFormatter` class that represents a complex number as a string in the form of either `a + bi` or `a + bj`.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Overview/customfmt1.cs._

The following example then uses this custom formatter to display the string representation of a complex number.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Overview/customfmt1.cs._

## Complex.Complex(Double, Double) constructor

```csharp
public Complex (double real, double imaginary);
```

Initializes a new instance of the `Complex` structure using the specified real and imaginary values.

Parameters:

- `real`: The real part of the complex number.
- `imaginary`: The imaginary part of the complex number.

#### Remarks
The `real` or `imaginary` arguments may lose precision if they are data types that require an explicit cast to `Double`.

#### Examples
The following example instantiates two complex numbers, and then uses them in addition, subtraction, multiplication, and division operations.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/.ctor/ctor1.cs._

## Complex.Imaginary property

```csharp
public double Imaginary { get; }
```

Gets the imaginary component of the current `Complex` object.

Returns: The imaginary component of a complex number.

#### Remarks
Given a complex number `a + bi`, the `Imaginary` property returns the value of `b`.

#### Examples
The following example instantiates an array of `Complex` objects and displays the real and imaginary components of each in the form `a + bi`.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Imaginary/real1.cs._

## Complex.Magnitude property

```csharp
public double Magnitude { get; }
```

Gets the magnitude (or absolute value) of a complex number.

Returns: The magnitude of the current instance.

#### Remarks
The `Magnitude` property is equivalent to the absolute value of a complex number. It specifies the distance from the origin (the intersection of the x-axis and the y-axis in the Cartesian coordinate system) to the two-dimensional point represented by a complex number. The absolute value is calculated as follows:

$| a + bi | = \sqrt{a \times a + b \times b}$

If the calculation of the absolute value results in an overflow, this property returns either `PositiveInfinity` or `NegativeInfinity`.

The `Complex.Magnitude` and the `Complex.Phase` properties define the position of a point that represents a complex number in the polar coordinate system.

You can instantiate a complex number based on its polar coordinates instead of its Cartesian coordinates by calling the `Complex.FromPolarCoordinates` method.

#### Examples
The following example calculates the absolute value of a complex number and demonstrates that it is equivalent to the value of the `Magnitude` property.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Abs/abs1.cs._

## Complex.Phase property

```csharp
public double Phase { get; }
```

Gets the phase of a complex number.

Returns: The phase of a complex number, in radians.

#### Remarks
For a complex number `a + bi`, the phase is computed as `Atan(b, a)`.

You can identify a complex number by its Cartesian coordinates on the complex plane or by its polar coordinates. The phase (argument) of a complex number is the angle to the real axis of a line drawn from the point of origin (the intersection of the x-axis and the y-axis) to the point represented by the complex number. The magnitude (represented by the `Magnitude` property) is the distance from the point of origin to the point that is represented by the complex number.

You can instantiate a complex number based on its polar coordinates instead of its Cartesian coordinates by calling the `Complex.FromPolarCoordinates` method.

To convert the phase from radians to degrees, multiply it by $\frac{180}{\pi}$.

#### Examples
The following example uses the `Complex.FromPolarCoordinates` method to instantiate a complex number based on its polar coordinates, and then displays the value of its `Complex.Magnitude` and `Complex.Phase` properties.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/FromPolarCoordinates/phase1.cs._

## Complex.Real property

```csharp
public double Real { get; }
```

Gets the real component of the current `Complex` object.

Returns: The real component of a complex number.

#### Remarks
Given a complex number `a + bi`, the `Real` property returns the value of `a`.

#### Examples
The following example instantiates an array of `Complex` objects and displays the real and imaginary components of each in the form `a + bi`.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Imaginary/real1.cs._
