---
title: "Complex struct (part 3 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 3 of 8)

## Complex.Exp(Complex) method

```csharp
public static System.Numerics.Complex Exp (System.Numerics.Complex value);
```

Returns `e` raised to the power specified by a complex number.

Parameters:

- `value`: A complex number that specifies a power.

Returns: The number `e` raised to the power `value`.

#### Remarks
Use the `Complex.Pow` method to calculate the powers of other bases.

The `Complex.Exp` method for complex numbers corresponds to the `Math.Exp` method for real numbers. `Complex.Exp` is the inverse of `Complex.Log`.

#### Examples
The following example illustrates the `Complex.Exp` method. It shows that, with some allowance for the lack of precision of the `Double` data type, passing the value returned by the `Complex.Log` method to the `Complex.Exp` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Exp/log1.cs._

## Complex.FromPolarCoordinates(Double, Double) method

```csharp
public static System.Numerics.Complex FromPolarCoordinates (double magnitude, double phase);
```

Creates a complex number from a point's polar coordinates.

Parameters:

- `magnitude`: The magnitude, which is the distance from the origin (the intersection of the x-axis and the y-axis) to the number.
- `phase`: The phase, which is the angle from the line to the horizontal axis, measured in radians.

Returns: A complex number.

#### Remarks
The `Complex.FromPolarCoordinates` method instantiates a complex number based on its polar coordinates.

Because there are multiple representations of a point on a complex plane, the return value of the `Complex.FromPolarCoordinates` method is normalized. The magnitude is normalized to a positive number, and the phase is normalized to a value in the range of -`PI` to `PI`. As a result, the values of the `Complex.Phase` and `Complex.Magnitude` properties of the resulting complex number might not equal the original values of the `magnitude` and `phase` parameters.

To convert a value from degrees to radians for the `phase` parameter, multiply it by $\frac{\pi}{180}$.

#### Examples
The following example uses the `Complex.FromPolarCoordinates` method to instantiate a complex number based on its polar coordinates and then displays the value of its `Complex.Magnitude` and `Complex.Phase` properties.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/FromPolarCoordinates/phase1.cs._

## Complex.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `Complex` object.

Returns: A 32-bit signed integer hash code.

To be added.

## Complex.IsComplexNumber(Complex) method

```csharp
public static bool IsComplexNumber (System.Numerics.Complex value);
```

Determines if a value represents a complex value.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

#### Remarks

This function returns `false` for a complex number `a + bi` where `b` is zero.

## Complex.IsEvenInteger(Complex) method

```csharp
public static bool IsEvenInteger (System.Numerics.Complex value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` returns `true` while `2.2` returns `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Complex.IsFinite(Complex) method

```csharp
public static bool IsFinite (System.Numerics.Complex value);
```

Determines whether the specified complex number is finite.

Parameters:

- `value`: A complex number.

Returns: `true` if both, the real and imaginary parts are finite (zero, subnormal or normal); otherwise, `false`.

To be added.

## Complex.IsImaginaryNumber(Complex) method

```csharp
public static bool IsImaginaryNumber (System.Numerics.Complex value);
```

Determines if a value represents an imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an imaginary number; otherwise, `false`.

#### Remarks

This function returns `false` for a complex number `a + bi` where `a` is non-zero.

## Complex.IsInfinity(Complex) method

```csharp
public static bool IsInfinity (System.Numerics.Complex value);
```

Returns a value indicating whether the specified complex number evaluates to infinity.

Parameters:

- `value`: A complex number.

Returns: `true` if either, the real or imaginary part are `Double.PositiveInfinity` or `Double.NegativeInfinity`; otherwise, `false`.

To be added.

## Complex.IsInteger(Complex) method

```csharp
public static bool IsInteger (System.Numerics.Complex value);
```

Determines if a value represents an integral value.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## Complex.IsNaN(Complex) method

```csharp
public static bool IsNaN (System.Numerics.Complex value);
```

Returns a value that indicates whether the specified complex instance is not a number (NaN).

Parameters:

- `value`: A complex number.

Returns: `true` if the specified value is not finite or infinite; otherwise, `false`.

To be added.

## Complex.IsNegative(Complex) method

```csharp
public static bool IsNegative (System.Numerics.Complex value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative.

## Complex.IsNegativeInfinity(Complex) method

```csharp
public static bool IsNegativeInfinity (System.Numerics.Complex value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## Complex.IsNormal(Complex) method

```csharp
public static bool IsNormal (System.Numerics.Complex value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## Complex.IsOddInteger(Complex) method

```csharp
public static bool IsOddInteger (System.Numerics.Complex value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Complex.IsPositive(Complex) method

```csharp
public static bool IsPositive (System.Numerics.Complex value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative.

## Complex.IsPositiveInfinity(Complex) method

```csharp
public static bool IsPositiveInfinity (System.Numerics.Complex value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## Complex.IsRealNumber(Complex) method

```csharp
public static bool IsRealNumber (System.Numerics.Complex value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

#### Remarks

This function returns `true` for a complex number `a + bi` where `b` is zero.

## Complex.IsSubnormal(Complex) method

```csharp
public static bool IsSubnormal (System.Numerics.Complex value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## Complex.Log(Complex) method

```csharp
public static System.Numerics.Complex Log (System.Numerics.Complex value);
```

Returns the natural (base `e`) logarithm of a specified complex number.

Parameters:

- `value`: A complex number.

Returns: The natural (base `e`) logarithm of `value`.

#### Remarks
The `Log` method for complex numbers corresponds to the `Log` method for real numbers.

#### Examples
The following example illustrates the `Complex.Log` method. It shows that, with some allowance for the lack of precision of the `Double` data type, passing the value returned by the `Complex.Log` method to the `Complex.Exp` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Exp/log1.cs._

## Complex.Log(Complex, Double) method

```csharp
public static System.Numerics.Complex Log (System.Numerics.Complex value, double baseValue);
```

Returns the logarithm of a specified complex number in a specified base.

Parameters:

- `value`: A complex number.
- `baseValue`: The base of the logarithm.

Returns: The logarithm of `value` in base `baseValue`.

#### Remarks
The `Log` method for complex numbers corresponds to the `Log` method for real numbers.

## Complex.Log10(Complex) method

```csharp
public static System.Numerics.Complex Log10 (System.Numerics.Complex value);
```

Returns the base-10 logarithm of a specified complex number.

Parameters:

- `value`: A complex number.

Returns: The base-10 logarithm of `value`.

#### Remarks
The `Complex.Log10` method for complex numbers corresponds to the `Math.Log10` method for real numbers.

## Complex.MaxMagnitude(Complex, Complex) method

```csharp
public static System.Numerics.Complex MaxMagnitude (System.Numerics.Complex x, System.Numerics.Complex y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Complex.MinMagnitude(Complex, Complex) method

```csharp
public static System.Numerics.Complex MinMagnitude (System.Numerics.Complex x, System.Numerics.Complex y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Complex.Multiply(Double, Complex) method

```csharp
public static System.Numerics.Complex Multiply (double left, System.Numerics.Complex right);
```

Returns the product of a double-precision real number and a complex number.

Parameters:

- `left`: The double-precision real number to multiply.
- `right`: The complex number to multiply.

Returns: The product of the `left` and `right` parameters.

#### Remarks

The multiplication of a real number (which can be regarded as the complex number `a + 0i`) and a complex number (`c + di`) takes the following form:

$ac + adi$

## Complex.Multiply(Complex, Double) method

```csharp
public static System.Numerics.Complex Multiply (System.Numerics.Complex left, double right);
```

Returns the product of a complex number and a double-precision real number.

Parameters:

- `left`: The complex number to multiply.
- `right`: The double-precision real number to multiply.

Returns: The product of the `left` and `right` parameters.

#### Remarks

The multiplication of a complex number (`a + bi`) and a real number (which can be regarded as the complex number `c + 0i`) takes the following form:

$ac + bci$

## Complex.Multiply(Complex, Complex) method

```csharp
public static System.Numerics.Complex Multiply (System.Numerics.Complex left, System.Numerics.Complex right);
```

Returns the product of two complex numbers.

Parameters:

- `left`: The first complex number to multiply.
- `right`: The second complex number to multiply.

Returns: The product of the `left` and `right` parameters.

#### Remarks
The multiplication of a complex number, `a + bi`, and a second complex number, `c + di`, takes the following form:

$(ac - bd) + (ad + bc)i$

## Complex.Negate(Complex) method

```csharp
public static System.Numerics.Complex Negate (System.Numerics.Complex value);
```

Returns the additive inverse of a specified complex number.

Parameters:

- `value`: A complex number.

Returns: The result of the `Complex.Real` and `Complex.Imaginary` components of the `value` parameter multiplied by -1.

#### Remarks
The additive inverse of a complex number is a complex number that produces a value of `Zero` when it is added to the original complex number. This method returns a complex number in which the real and imaginary components of the original complex number are multiplied by -1.

The `Complex.Negate` method is implemented for Languages that don't support custom operators. Its behavior is identical to negation using the unary negation operator, `Complex.op_UnaryNegation`.

#### Examples
The following example obtains the additive inverse of each element in an array of complex numbers.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Negate/negate1.cs._

## Complex.op_Addition(Double, Complex) method

```csharp
public static System.Numerics.Complex operator + (double left, System.Numerics.Complex right);
```

Adds a double-precision real number to a complex number.

Parameters:

- `left`: The double-precision real value to add.
- `right`: The complex value to add.

Returns: The sum of `left` and `right` as a complex number.

#### Remarks

The addition of a real number (which can be regarded as the complex number `a + 0i`) and a complex number (`c + di`) takes the following form:

$(a + c) + di$

Languages that don't support custom operators can call the `Add` equivalent method instead.
