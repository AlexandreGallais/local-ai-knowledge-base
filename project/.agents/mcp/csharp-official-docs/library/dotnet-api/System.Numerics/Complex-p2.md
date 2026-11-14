---
title: "Complex struct (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 2 of 8)

## Complex.System.Numerics.IAdditiveIdentity<System.Numerics.Complex,System.Numerics.Complex>.AdditiveIdentity property

```csharp
static System.Numerics.Complex System.Numerics.IAdditiveIdentity<System.Numerics.Complex,System.Numerics.Complex>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Complex.System.Numerics.IMultiplicativeIdentity<System.Numerics.Complex,System.Numerics.Complex>.MultiplicativeIdentity property

```csharp
static System.Numerics.Complex System.Numerics.IMultiplicativeIdentity<System.Numerics.Complex,System.Numerics.Complex>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.One property

```csharp
static System.Numerics.Complex System.Numerics.INumberBase<System.Numerics.Complex>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Numerics.Complex>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.Zero property

```csharp
static System.Numerics.Complex System.Numerics.INumberBase<System.Numerics.Complex>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Complex.System.Numerics.ISignedNumber<System.Numerics.Complex>.NegativeOne property

```csharp
static System.Numerics.Complex System.Numerics.ISignedNumber<System.Numerics.Complex>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Complex.Abs(Complex) method

```csharp
public static double Abs (System.Numerics.Complex value);
```

Gets the absolute value (or magnitude) of a complex number.

Parameters:

- `value`: A complex number.

Returns: The absolute value of `value`.

#### Remarks
The absolute value of a complex number is equivalent to its `Magnitude` property. The absolute value of a complex number `a + bi` is calculated as follows:

- If `b = 0`, the result is `a`.
- If `a > b`, the result is $a \times \sqrt{1 + \frac{b^2}{a^2}}$.
- If `b > a`, the result is $b \times \sqrt{1 + \frac{a^2}{b^2}}$.

If the calculation of the absolute value results in an overflow, the method returns either `PositiveInfinity` or `NegativeInfinity`. If either the `Complex.Real` or `Imaginary` property is `NaN` and the other property is neither `PositiveInfinity` nor `NegativeInfinity`, the method returns `NaN`.

#### Examples
The following example calculates the absolute value of a complex number and demonstrates that it is equivalent to the value of the `Magnitude` property.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Abs/abs1.cs._

## Complex.Acos(Complex) method

```csharp
public static System.Numerics.Complex Acos (System.Numerics.Complex value);
```

Returns the angle that is the arc cosine of the specified complex number.

Parameters:

- `value`: A complex number that represents a cosine.

Returns: The angle, measured in radians, which is the arc cosine of `value`.

#### Remarks
The `Complex.Acos` method for complex numbers corresponds to the `Math.Acos` method for real numbers.

The `Complex.Acos` method uses the following formula:

`(-ImaginaryOne) * Log(value + ImaginaryOne * Sqrt(One - value * value))`

#### Examples
The following example illustrates the `Complex.Acos` method. It shows that passing the value returned by the `Complex.Acos` method to the `Complex.Cos` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Acos/acos1.cs._

## Complex.Add(Double, Complex) method

```csharp
public static System.Numerics.Complex Add (double left, System.Numerics.Complex right);
```

Adds a double-precision real number to a complex number and returns the result.

Parameters:

- `left`: The double-precision real value to add.
- `right`: The complex value to add.

Returns: The sum of `left` and `right`.

#### Remarks

The addition of a real number (which can be regarded as the complex number `a + 0i`) and a complex number (`c + di`) takes the following form:

$(a + c) + di$

## Complex.Add(Complex, Double) method

```csharp
public static System.Numerics.Complex Add (System.Numerics.Complex left, double right);
```

Adds a complex number to a double-precision real number and returns the result.

Parameters:

- `left`: The complex value to add.
- `right`: The double-precision real value to add.

Returns: The sum of `left` and `right`.

The addition of a complex number (`a + bi`) and a real number (which can be regarded as the complex number `c + 0i`) takes the following form:

$(a + c) + bi$

## Complex.Add(Complex, Complex) method

```csharp
public static System.Numerics.Complex Add (System.Numerics.Complex left, System.Numerics.Complex right);
```

Adds two complex numbers and returns the result.

Parameters:

- `left`: The first complex number to add.
- `right`: The second complex number to add.

Returns: The sum of `left` and `right`.

#### Remarks
The addition of a complex number, `a + bi`, and a second complex number, `c + di`, takes the following form:

$(a + c) + (b + d)i$

## Complex.Asin(Complex) method

```csharp
public static System.Numerics.Complex Asin (System.Numerics.Complex value);
```

Returns the angle that is the arc sine of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The angle that is the arc sine of `value`.

#### Remarks
The `Complex.Asin` method for complex numbers corresponds to the `Math.Asin` method for real numbers.

The `Complex.Asin` method uses the following formula:

`-ImaginaryOne * Log(ImaginaryOne * value + Sqrt(One - value * value))`

#### Examples
The following example illustrates the `Complex.Asin` method. It shows that passing the value returned by the `Complex.Asin` method to the `Complex.Sin` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Asin/asin1.cs._

## Complex.Atan(Complex) method

```csharp
public static System.Numerics.Complex Atan (System.Numerics.Complex value);
```

Returns the angle that is the arc tangent of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The angle that is the arc tangent of `value`.

#### Remarks
The `Complex.Atan` method for complex numbers corresponds to the `Math.Atan` method for real numbers.

The `Complex.Atan` method uses the following formula:

`(ImaginaryOne / new Complex(2.0, 0.0)) * (Log(One - ImaginaryOne * value) - Log(One + ImaginaryOne * value))`

#### Examples
The following example illustrates the `Complex.Atan` method. It shows that passing the value returned by the `Complex.Atan` method to the `Complex.Tan` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Atan/atan1.cs._

## Complex.Conjugate(Complex) method

```csharp
public static System.Numerics.Complex Conjugate (System.Numerics.Complex value);
```

Computes the conjugate of a complex number and returns the result.

Parameters:

- `value`: A complex number.

Returns: The conjugate of `value`.

#### Remarks
The conjugate of a complex number inverts the sign of the imaginary component; that is, it applies unary negation to the imaginary component. If `a + bi` is a complex number, its conjugate is `a - bi`.

#### Examples
The following example displays the conjugate of two complex numbers.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Conjugate/conjugate1.cs._

## Complex.Cos(Complex) method

```csharp
public static System.Numerics.Complex Cos (System.Numerics.Complex value);
```

Returns the cosine of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The cosine of `value`.

#### Remarks
The `Complex.Cos` method for complex numbers corresponds to the `Math.Cos` method for real numbers.

The `Complex.Cos` method calculates the cosine of the complex number `a + bi` as `x + yi`, where:

- `x` is $\cos a \times \cosh b$
- `y` is $-(\sin a \times \sinh b)$

#### Examples
The following example illustrates the `Complex.Acos` method. It shows that passing the value returned by the `Complex.Acos` method to the `Complex.Cos` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Acos/acos1.cs._

## Complex.Cosh(Complex) method

```csharp
public static System.Numerics.Complex Cosh (System.Numerics.Complex value);
```

Returns the hyperbolic cosine of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The hyperbolic cosine of `value`.

#### Remarks
The `Complex.Cosh` method for complex numbers corresponds to the `Math.Cosh` method for real numbers.

The `Complex.Cosh` method calculates the hyperbolic cosine of the complex number `a + bi` as `x + yi`, where:

- `x` is $\cosh a \times \cos b$
- `y` is $\sinh a \times \sin b$

## Complex.CreateChecked<TOther>(TOther) method

```csharp
public static System.Numerics.Complex CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Complex.CreateSaturating<TOther>(TOther) method

```csharp
public static System.Numerics.Complex CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Complex.CreateTruncating<TOther>(TOther) method

```csharp
public static System.Numerics.Complex CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Complex.Divide(Double, Complex) method

```csharp
public static System.Numerics.Complex Divide (double dividend, System.Numerics.Complex divisor);
```

Divides one double-precision real number by a complex number and returns the result.

Parameters:

- `dividend`: The double-precision real number to be divided.
- `divisor`: The complex number to divide by.

Returns: The quotient of the division.

#### Remarks

The division of a real number (which can be regarded as the complex number `a + 0i`) and a complex number (`c + di`) takes the following form:

$\frac{ac}{c^2 + d^2} + (\frac{ad}{c^2 + d^2})i$

## Complex.Divide(Complex, Double) method

```csharp
public static System.Numerics.Complex Divide (System.Numerics.Complex dividend, double divisor);
```

Divides one complex number by a double-precision real number and returns the result.

Parameters:

- `dividend`: The complex number to be divided.
- `divisor`: The double-precision real number to divide by.

Returns: The quotient of the division.

#### Remarks

The division of a complex number (`a + bi`) and a real number (which can be regarded as the complex number `c + 0i`) takes the following form:

$\frac{ac}{c^2} + (\frac{bc}{c^2})i$

## Complex.Divide(Complex, Complex) method

```csharp
public static System.Numerics.Complex Divide (System.Numerics.Complex dividend, System.Numerics.Complex divisor);
```

Divides one complex number by another and returns the result.

Parameters:

- `dividend`: The complex number to be divided.
- `divisor`: The complex number to divide by.

Returns: The quotient of the division.

#### Remarks
The division of a complex number, `a + bi`, by a second complex number, `c + di`, takes the following form:

$\frac{ac + bd}{c^2 + d^2} + (\frac{bc - ad}{c^2 + d^2})i$

## Complex.Equals(Complex) method

```csharp
public bool Equals (System.Numerics.Complex value);
```

Returns a value that indicates whether the current instance and a specified complex number have the same value.

Parameters:

- `value`: The complex number to compare.

Returns: `true` if this complex number and `value` have the same value; otherwise, `false`.

#### Remarks
The `Equals` method provides the `IEquatable<T>` implementation for the `Complex` structure. It performs slightly better than `Equals` method because it does not have to convert its parameter to a complex number.

Two complex numbers are equal if their real parts are equal and their imaginary parts are equal. The `Equals` method is equivalent to the following expression:

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Equals/equals1.cs._

## Complex.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current instance and a specified object have the same value.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the `obj` parameter is a `Complex` object or a type capable of implicit conversion to a `Complex` object, and its value is equal to the current `Complex` object; otherwise, `false`.

#### Remarks
Two complex numbers are equal if their real parts are equal and their imaginary parts are equal. The `Equals` method is equivalent to the following expression:

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Equals/equals1.cs._

If the `obj` parameter is not a `Complex` object, but it is a data type for which an implicit conversion is defined, the `Equals` method converts `obj` to a `Complex` object whose real part is equal to the value of `obj` and whose imaginary part is equal to zero before it performs the comparison. The following example illustrates this by finding that a complex number and a double-precision floating-point value are equal.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Equals/equals3.cs._
