---
title: "Complex struct (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 5 of 8)

## Complex.op_Implicit(IntPtr) method

```csharp
public static implicit operator System.Numerics.Complex (IntPtr value);
```

Implicitly converts a `IntPtr` value to a double-precision complex number.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a double-precision complex number.

To be added.

## Complex.op_Implicit(BFloat16) method

```csharp
public static implicit operator System.Numerics.Complex (System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Complex.op_Implicit(SByte) method

```csharp
public static implicit operator System.Numerics.Complex (sbyte value);
```

Defines an implicit conversion of a signed byte to a complex number.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a signed byte to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the signed byte and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(Single) method

```csharp
public static implicit operator System.Numerics.Complex (float value);
```

Defines an implicit conversion of a single-precision floating-point number to a complex number.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from a `Single` value to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the `Single` value and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(UInt16) method

```csharp
public static implicit operator System.Numerics.Complex (ushort value);
```

Defines an implicit conversion of a 16-bit unsigned integer to a complex number.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from an unsigned 16-bit integer to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the unsigned 16-bit integer and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(UInt32) method

```csharp
public static implicit operator System.Numerics.Complex (uint value);
```

Defines an implicit conversion of a 32-bit unsigned integer to a complex number.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from an unsigned 32-bit integer to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the unsigned 32-bit integer and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(UInt64) method

```csharp
public static implicit operator System.Numerics.Complex (ulong value);
```

Defines an implicit conversion of a 64-bit unsigned integer to a complex number.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert to a complex number.

Returns: An object that contains the value of the `value` parameter as its real part and zero as its imaginary part.

#### Remarks
The overloads of the `Complex.op_Implicit` operator define the types from which a compiler can automatically convert a `Complex` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`.

This overload lets the compiler handle conversions from an unsigned 64-bit integer to a complex number, as the following example shows. Note that the result of the conversion is a complex number whose real part is equal to the unsigned 64-bit integer and whose imaginary part is equal to zero.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Implicit/implicit1.cs._

## Complex.op_Implicit(UIntPtr) method

```csharp
public static implicit operator System.Numerics.Complex (UIntPtr value);
```

Implicitly converts a `UIntPtr` value to a double-precision complex number.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a double-precision complex number.

To be added.

## Complex.op_Increment(Complex) method

```csharp
public static System.Numerics.Complex operator ++ (System.Numerics.Complex value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Complex.op_Inequality(Complex, Complex) method

```csharp
public static bool operator != (System.Numerics.Complex left, System.Numerics.Complex right);
```

Returns a value that indicates whether two complex numbers are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `Complex.op_Equality` method defines the operation of the inequality operator for complex numbers. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/op_Inequality/inequality1.cs._

Languages that don't support custom operators can test for inequality by calling the `Equals` method and reversing its value.

Note that, because of differences in precision, two complex numbers that are apparently equivalent can be considered unequal. One possible workaround is to implement a comparison method that returns `true` only if the difference between the two real and imaginary parts of the complex numbers exceeds a certain threshold (such as .01% of the value of the real or imaginary component of one of the complex numbers). For more information, see the `Equals` method.

## Complex.op_Multiply(Double, Complex) method

```csharp
public static System.Numerics.Complex operator * (double left, System.Numerics.Complex right);
```

Multiplies a specified double-precision real number by a specified complex number.

Parameters:

- `left`: The double-precision real value to multiply.
- `right`: The complex value to multiply.

Returns: The product of `left` and `right`, as a complex number.

#### Remarks

The multiplication of a real number (which can be regarded as the complex number `a + 0i`) and a complex number (`c + di`) takes the following form:

$ac + adi$

Languages that don't support custom operators can call the `Multiply` equivalent method instead.

## Complex.op_Multiply(Complex, Double) method

```csharp
public static System.Numerics.Complex operator * (System.Numerics.Complex left, double right);
```

Multiplies the specified complex number by a specified double-precision real number.

Parameters:

- `left`: The complex value to multiply.
- `right`: The double-precision real value to multiply.

Returns: The product of `left` and `right`, as a complex number.

#### Remarks

The multiplication of a complex number (`a + bi`) and a real number (which can be regarded as the complex number `c + 0i`) takes the following form:

$ac + bci$

Languages that don't support custom operators can call the `Multiply` equivalent method instead.

## Complex.op_Multiply(Complex, Complex) method

```csharp
public static System.Numerics.Complex operator * (System.Numerics.Complex left, System.Numerics.Complex right);
```

Multiplies two specified complex numbers.

Parameters:

- `left`: The first complex value to multiply.
- `right`: The second complex value to multiply.

Returns: The product of `left` and `right`.

#### Remarks

The multiplication of a complex number, `a + bi`, and a second complex number, `c + di`, takes the following form:

$(ac - bd) + (ad + bc)i$

Languages that don't support custom operators can call the `Multiply` equivalent method instead.

## Complex.op_Subtraction(Double, Complex) method

```csharp
public static System.Numerics.Complex operator - (double left, System.Numerics.Complex right);
```

Subtracts a complex number from a double-precision real number.

Parameters:

- `left`: The double-precision real value to subtract from (the minuend).
- `right`: The complex value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`, as a complex number.

#### Remarks

The subtraction of a complex number (`c + di`) from a real number (which can be regarded as the complex number `a + 0i`) takes the following form:

$(a - c) - di$

Languages that don't support custom operators can call the `Subtract` method instead.

## Complex.op_Subtraction(Complex, Double) method

```csharp
public static System.Numerics.Complex operator - (System.Numerics.Complex left, double right);
```

Subtracts a double-precision real number from a complex number.

Parameters:

- `left`: The complex value to subtract from (the minuend).
- `right`: The double-precision real value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`, as a complex number.

#### Remarks

The subtraction of a real number (which can be regarded as the complex number `c + 0i`) from a complex number (`a + bi`) takes the following form:

$(a - c) + bi$

Languages that don't support custom operators can call the `Subtract` method instead.

## Complex.op_Subtraction(Complex, Complex) method

```csharp
public static System.Numerics.Complex operator - (System.Numerics.Complex left, System.Numerics.Complex right);
```

Subtracts a complex number from another complex number.

Parameters:

- `left`: The value to subtract from (the minuend).
- `right`: The value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`.

#### Remarks

The subtraction of a complex number, `c + di`, from another complex number, `a + bi`, takes the following form:

$(a - c) + (b - d)i$

Languages that don't support custom operators can call the `Subtract` method instead.

## Complex.op_UnaryNegation(Complex) method

```csharp
public static System.Numerics.Complex operator - (System.Numerics.Complex value);
```

Returns the additive inverse of a specified complex number.

Parameters:

- `value`: The value to negate.

Returns: The result of the `Complex.Real` and `Complex.Imaginary` components of the `value` parameter multiplied by -1.

#### Remarks
The `Complex.op_UnaryNegation` method defines the operation of the unary negation (additive inverse) operator for complex numbers. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Negate/negate2.cs._

The resulting complex number produces a value of `Zero` when it is added to the original complex number. Languages that don't support custom operators can call the `Complex.Negate` method instead.

The equivalent method for this operator is `Negate`

## Complex.op_UnaryPlus(Complex) method

```csharp
public static System.Numerics.Complex operator + (System.Numerics.Complex value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Complex.Parse(Byte>, IFormatProvider) method

```csharp
public static System.Numerics.Complex Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## Complex.Parse(Char>, IFormatProvider) method

```csharp
public static System.Numerics.Complex Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Complex.Parse(String, IFormatProvider) method

```csharp
public static System.Numerics.Complex Parse (string s, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Complex.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static System.Numerics.Complex Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.
