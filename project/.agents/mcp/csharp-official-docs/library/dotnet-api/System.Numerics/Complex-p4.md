---
title: "Complex struct (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 4 of 8)

## Complex.op_Addition(Complex, Double) method

```csharp
public static System.Numerics.Complex operator + (System.Numerics.Complex left, double right);
```

Adds a complex number to a double-precision real number.

Parameters:

- `left`: The complex value to add.
- `right`: The double-precision real value to add.

Returns: The sum of `left` and `right` as a complex number.

#### Remarks

The addition of a complex number (`a + bi`) and a real number (which can be regarded as the complex number `c + 0i`) takes the following form:

$(a + c) + bi$

Languages that don't support custom operators can call the `Add` equivalent method instead.

## Complex.op_Addition(Complex, Complex) method

```csharp
public static System.Numerics.Complex operator + (System.Numerics.Complex left, System.Numerics.Complex right);
```

Adds two complex numbers.

Parameters:

- `left`: The first complex value to add.
- `right`: The second complex value to add.

Returns: The sum of `left` and `right`.

#### Remarks

The addition of a complex number, `a + bi`, and a second complex number, `c + di`, takes the following form:

$(a + c) + (b + d)i$

Languages that don't support custom operators can call the `Add` equivalent method instead.

## Complex.op_Decrement(Complex) method

```csharp
public static System.Numerics.Complex operator -- (System.Numerics.Complex value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Complex.op_Division(Double, Complex) method

```csharp
public static System.Numerics.Complex operator / (double left, System.Numerics.Complex right);
```

Divides a specified double-precision real number by a specified complex number.

Parameters:

- `left`: The double-precision real value to be divided.
- `right`: The complex value to divide by.

Returns: The result of dividing `left` by `right`, as a complex number.

#### Remarks

The division of a real number (which can be regarded as the complex number `a + 0i`) and a complex number (`c + di`) takes the following form:

$\frac{ac}{c^2 + d^2} + (\frac{ad}{c^2 + d^2})i$

Languages that don't support custom operators and operator overloading can call the `Divide` equivalent method instead.

## Complex.op_Division(Complex, Double) method

```csharp
public static System.Numerics.Complex operator / (System.Numerics.Complex left, double right);
```

Divides a specified complex number by a specified double-precision real number.

Parameters:

- `left`: The complex value to be divided.
- `right`: The double-precision real value to divide by.

Returns: The result of dividing `left` by `right`, as a complex number.

#### Remarks

The division of a complex number (`a + bi`) and a real number (which can be regarded as the complex number `c + 0i`) takes the following form:

$\frac{ac}{c^2} + (\frac{bc}{c^2})i$

Languages that don't support custom operators and operator overloading can call the `Divide` equivalent method instead.

## Complex.op_Division(Complex, Complex) method

```csharp
public static System.Numerics.Complex operator / (System.Numerics.Complex left, System.Numerics.Complex right);
```

Divides a specified complex number by another specified complex number.

Parameters:

- `left`: The complex value to be divided.
- `right`: The complex value to divide by.

Returns: The result of dividing `left` by `right`.

#### Remarks

The division of a complex number, `a + bi`, and a second complex number, `c + di`, takes the following form:

$\frac{ac + cd}{c^2 + d^2} + (\frac{bc - ad}{c^2 + d^2})i$

Languages that don't support custom operators and operator overloading can call the `Divide` equivalent method instead.

## Complex.op_Equality(Complex, Complex) method

```csharp
public static bool operator == (System.Numerics.Complex left, System.Numerics.Complex right);
```

Returns a value that indicates whether two complex numbers are equal.

Parameters:

- `left`: The first complex number to compare.
- `right`: The second complex number to compare.

Returns: `true` if the `left` and `right` parameters have the same value; otherwise, `false`.

#### Remarks
The `Complex.op_Equality` method defines the operation of the equality operator for `Complex` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Equals/eqoperator1.cs._

Languages that don't support custom operators can call the `Equals` method instead.

Two complex numbers are equal if their real parts are equal and their imaginary parts are equal. The `Complex.op_Equality` method is equivalent to the following expression:

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Equals/equals1.cs._

Note that, because of differences in precision, two complex numbers that are apparently equivalent can be considered unequal. For more information and a possible workaround, see the `Equals` method.

The equivalent method for this operator is `Complex.Equals`

## Complex.op_Explicit(Decimal) method

```csharp
public static explicit operator System.Numerics.Complex (decimal value);
```

Defines an explicit conversion of a `Decimal` value to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: A complex number that has a real component equal to `value` and an imaginary component equal to zero.

#### Remarks
Explicit conversion operators define types that can be converted to a `Complex` object. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` in Visual Basic) is used. Otherwise, they display a compiler error.

The conversion of a `Decimal` value to the real part of a complex number can result in a loss of precision because a `Double`, which is the type of the complex number's `Real` property, has fewer significant digits than a `Decimal`.

#### Examples
The following example illustrates the explicit conversion of `Decimal` values to `Complex` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Explicit/explicit1.cs._

## Complex.op_Explicit(Int128) method

```csharp
public static explicit operator System.Numerics.Complex (Int128 value);
```

Explicitly converts a `Int128` value to a double-precision complex number.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a double-precision complex number.

To be added.

## Complex.op_Explicit(BigInteger) method

```csharp
public static explicit operator System.Numerics.Complex (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` value to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: A complex number that has a real component equal to `value` and an imaginary component equal to zero.

#### Remarks
Explicit conversion operators define types that can be converted to a `Complex` object. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` in Visual Basic) is used. Otherwise, they display a compiler error.

The conversion of a `BigInteger` value to the real part of a complex number can result in a loss of precision because a `Double`, which is the type of the complex number's `Real` property, has fewer significant digits than a `BigInteger`.

If the conversion is unsuccessful because the `BigInteger` value is out of the range of the `Double` type, the operation does not throw an `OverflowException`. Instead, if `value` is less than `MinValue`, the result is a complex number that has a `Real` property value equal to `NegativeInfinity`. If `value` is greater than `MaxValue`, the result is a complex number that has a `Real` property value equal to `PositiveInfinity`.

#### Examples
The following example illustrates the explicit conversion of `BigInteger` values to `Complex` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Explicit/explicit1.cs._

## Complex.op_Explicit(UInt128) method

```csharp
public static explicit operator System.Numerics.Complex (UInt128 value);
```

Explicitly converts a `UInt128` value to a double-precision complex number.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a double-precision complex number.

To be added.

## Complex.op_Implicit(Byte) method

```csharp
public static implicit operator System.Numerics.Complex (byte value);
```

Defines an implicit conversion of an unsigned byte to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a `Byte` value to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the `Byte` value and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(Char) method

```csharp
public static implicit operator System.Numerics.Complex (char value);
```

Implicitly converts a `Char` value to a double-precision complex number.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a double-precision complex number.

To be added.

## Complex.op_Implicit(Double) method

```csharp
public static implicit operator System.Numerics.Complex (double value);
```

Defines an implicit conversion of a double-precision floating-point number to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a `Double` value to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the `Double` value and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(Half) method

```csharp
public static implicit operator System.Numerics.Complex (Half value);
```

Implicitly converts a `Half` value to a double-precision complex number.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a double-precision complex number.

To be added.

## Complex.op_Implicit(Int16) method

```csharp
public static implicit operator System.Numerics.Complex (short value);
```

Defines an implicit conversion of a 16-bit signed integer to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a signed 16-bit integer to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the signed 16-bit integer and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(Int32) method

```csharp
public static implicit operator System.Numerics.Complex (int value);
```

Defines an implicit conversion of a 32-bit signed integer to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a signed 32-bit integer to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the signed 32-bit integer and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(Int64) method

```csharp
public static implicit operator System.Numerics.Complex (long value);
```

Defines an implicit conversion of a 64-bit signed integer to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a signed 64-bit integer to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the signed 64-bit integer and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._
