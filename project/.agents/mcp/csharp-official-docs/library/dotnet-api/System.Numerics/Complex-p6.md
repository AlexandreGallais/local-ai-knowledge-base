---
title: "Complex struct (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 6 of 8)

## Complex.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static System.Numerics.Complex Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Complex.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static System.Numerics.Complex Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Complex.Pow(Complex, Double) method

```csharp
public static System.Numerics.Complex Pow (System.Numerics.Complex value, double power);
```

Returns a specified complex number raised to a power specified by a double-precision floating-point number.

Parameters:

- `value`: A complex number to be raised to a power.
- `power`: A double-precision floating-point number that specifies a power.

Returns: The complex number `value` raised to the power `power`.

#### Remarks
If `value` is `Zero`, the method returns `Zero`. For other values, if `power` is 0, the method returns `One`, and if `power` is 1, it returns `value`.

This method corresponds to the `Math.Pow` method for primitive numeric types.

#### Examples
The following example illustrates exponentiation using a complex number and an exponent whose value ranges from -1 to 10.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Pow/pow1.cs._

## Complex.Pow(Complex, Complex) method

```csharp
public static System.Numerics.Complex Pow (System.Numerics.Complex value, System.Numerics.Complex power);
```

Returns a specified complex number raised to a power specified by a complex number.

Parameters:

- `value`: A complex number to be raised to a power.
- `power`: A complex number that specifies a power.

Returns: The complex number `value` raised to the power `power`.

To be added.

## Complex.Reciprocal(Complex) method

```csharp
public static System.Numerics.Complex Reciprocal (System.Numerics.Complex value);
```

Returns the multiplicative inverse of a complex number.

Parameters:

- `value`: A complex number.

Returns: The reciprocal of `value`.

#### Remarks
The reciprocal, or multiplicative inverse, of a number `x` is a number `y` where `x * y` yields 1. The reciprocal of a complex number is the complex number that produces `One` when the two numbers are multiplied. If a complex number is represented by `a + bi`, its reciprocal is represented by the following expression:

$\frac{a}{a^2 + b^2} + -\frac{b}{a^2 + b^2}$

If value is `Zero`, the method returns `Zero`. Otherwise, it returns the result of the expression `One`/`value`.

#### Examples
The following example uses the `Complex.Reciprocal` method to calculate the reciprocal values of several complex numbers. It also demonstrates that the result of multiplying a complex number by its reciprocal is `One`.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Reciprocal/reciprocal1.cs._

## Complex.Sin(Complex) method

```csharp
public static System.Numerics.Complex Sin (System.Numerics.Complex value);
```

Returns the sine of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The sine of `value`.

#### Remarks
The `Complex.Sin` method for complex numbers corresponds to the `Math.Sin` method for real numbers.

The `Complex.Sin` method calculates the sine of the complex number `a + bi` as `x + yi`, where:

- `x` is $\sin a \times \cosh b$
- `y` is $\cos a \times \sinh b$

#### Examples
The following example illustrates the `Complex.Sin` method. It shows that passing the value returned by the `Complex.Asin` method to the `Complex.Sin` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Asin/asin1.cs._

## Complex.Sinh(Complex) method

```csharp
public static System.Numerics.Complex Sinh (System.Numerics.Complex value);
```

Returns the hyperbolic sine of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The hyperbolic sine of `value`.

#### Remarks
The `Complex.Sinh` method for complex numbers corresponds to the `Math.Sinh` method for real numbers.

The `Complex.Sinh` method calculates the hyperbolic sine of the complex number `a + bi` as `x + yi`, where:

- `x` is $\sinh a \times \cos b$
- `y` is $\cosh a \times \sin b$

## Complex.Sqrt(Complex) method

```csharp
public static System.Numerics.Complex Sqrt (System.Numerics.Complex value);
```

Returns the square root of a specified complex number.

Parameters:

- `value`: A complex number.

Returns: The square root of `value`.

#### Remarks
The square root of the complex number `value` is calculated by using the following formula:

`Complex.FromPolarCoordinates(Math.Sqrt(value.Magnitude), value.Phase/2.0)`

The `Complex.Sqrt` method for complex numbers corresponds to the `Math.Sqrt` method for real numbers.

## Complex.Subtract(Double, Complex) method

```csharp
public static System.Numerics.Complex Subtract (double left, System.Numerics.Complex right);
```

Subtracts one complex number from a double-precision real number and returns the result.

Parameters:

- `left`: The double-precision real value to subtract from (the minuend).
- `right`: The complex value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`, as a complex number.

#### Remarks

The subtraction of a complex number (`c + di`) from a real number (which can be regarded as the complex number `a + 0i`) takes the following form:

$(a - c) - di$

Languages that support custom operators can use the `op_Subtraction` equivalent operator too.

## Complex.Subtract(Complex, Double) method

```csharp
public static System.Numerics.Complex Subtract (System.Numerics.Complex left, double right);
```

Subtracts one double-precision real number from a complex number and returns the result.

Parameters:

- `left`: The complex value to subtract from (the minuend).
- `right`: The double-precision real value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`, as a complex number.

#### Remarks

The subtraction of a real number (which can be regarded as the complex number `c + 0i`) from a complex number (`a + bi`) takes the following form:

$(a - c) + bi$

Languages that support custom operators can use the `op_Subtraction` equivalent operator too.

## Complex.Subtract(Complex, Complex) method

```csharp
public static System.Numerics.Complex Subtract (System.Numerics.Complex left, System.Numerics.Complex right);
```

Subtracts one complex number from another and returns the result.

Parameters:

- `left`: The value to subtract from (the minuend).
- `right`: The value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`.

#### Remarks

The subtraction of a complex number, `c + di`, from another complex number, `a + bi`, takes the following form:

$(a - c) + (b - d)i$

Languages that support custom operators can use the `op_Subtraction` equivalent operator too.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.Abs(Complex) method

```csharp
static System.Numerics.Complex INumberBase<Complex>.Abs (System.Numerics.Complex value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.IsCanonical(Complex) method

```csharp
static bool INumberBase<Complex>.IsCanonical (System.Numerics.Complex value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.IsZero(Complex) method

```csharp
static bool INumberBase<Complex>.IsZero (System.Numerics.Complex value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.MaxMagnitudeNumber(Complex, Complex) method

```csharp
static System.Numerics.Complex INumberBase<Complex>.MaxMagnitudeNumber (System.Numerics.Complex x, System.Numerics.Complex y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.MinMagnitudeNumber(Complex, Complex) method

```csharp
static System.Numerics.Complex INumberBase<Complex>.MinMagnitudeNumber (System.Numerics.Complex x, System.Numerics.Complex y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.MultiplyAddEstimate(Complex, Complex, Complex) method

```csharp
static System.Numerics.Complex INumberBase<Complex>.MultiplyAddEstimate (System.Numerics.Complex left, System.Numerics.Complex right, System.Numerics.Complex addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.TryConvertToChecked<TOther>(Complex, TOther) method

```csharp
static bool INumberBase<Complex>.TryConvertToChecked<TOther> (System.Numerics.Complex value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.TryConvertToSaturating<TOther>(Complex, TOther) method

```csharp
static bool INumberBase<Complex>.TryConvertToSaturating<TOther> (System.Numerics.Complex value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.TryConvertToTruncating<TOther>(Complex, TOther) method

```csharp
static bool INumberBase<Complex>.TryConvertToTruncating<TOther> (System.Numerics.Complex value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.TryConvertFromChecked<TOther>(TOther, Complex) method

```csharp
static bool INumberBase<Complex>.TryConvertFromChecked<TOther> (TOther value, out System.Numerics.Complex result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.TryConvertFromSaturating<TOther>(TOther, Complex) method

```csharp
static bool INumberBase<Complex>.TryConvertFromSaturating<TOther> (TOther value, out System.Numerics.Complex result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Complex.System.Numerics.INumberBase<System.Numerics.Complex>.TryConvertFromTruncating<TOther>(TOther, Complex) method

```csharp
static bool INumberBase<Complex>.TryConvertFromTruncating<TOther> (TOther value, out System.Numerics.Complex result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Complex.Tan(Complex) method

```csharp
public static System.Numerics.Complex Tan (System.Numerics.Complex value);
```

Returns the tangent of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The tangent of `value`.

#### Remarks
The `Complex.Tan` method for complex numbers corresponds to the `Math.Tan` method for real numbers.

The `Complex.Tan` method uses the following formula to calculate the tangent of the complex number `value`:

`Sin(value)/Cos(value)`

#### Examples
The following example illustrates the `Complex.Tan` method. It shows that passing the value returned by the `Complex.Atan` method to the `Complex.Tan` method returns the original `Complex` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Atan/atan1.cs._
