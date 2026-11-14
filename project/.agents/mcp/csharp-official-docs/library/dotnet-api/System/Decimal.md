---
title: "Decimal struct (part 1 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct

Namespace: `System`

```csharp
public readonly struct Decimal : IComparable<decimal>, IConvertible, IEquatable<decimal>, IParsable<decimal>, ISpanParsable<decimal>, IUtf8SpanParsable<decimal>, System.Numerics.IAdditionOperators<decimal,decimal,decimal>, System.Numerics.IAdditiveIdentity<decimal,decimal>, System.Numerics.IComparisonOperators<decimal,decimal,bool>, System.Numerics.IDecrementOperators<decimal>, System.Numerics.IDivisionOperators<decimal,decimal,decimal>, System.Numerics.IEqualityOperators<decimal,decimal,bool>, System.Numerics.IFloatingPoint<decimal>, System.Numerics.IFloatingPointConstants<decimal>, System.Numerics.IIncrementOperators<decimal>, System.Numerics.IMinMaxValue<decimal>, System.Numerics.IModulusOperators<decimal,decimal,decimal>, System.Numerics.IMultiplicativeIdentity<decimal,decimal>, System.Numerics.IMultiplyOperators<decimal,decimal,decimal>, System.Numerics.INumber<decimal>, System.Numerics.INumberBase<decimal>, System.Numerics.ISignedNumber<decimal>, System.Numerics.ISubtractionOperators<decimal,decimal,decimal>, System.Numerics.IUnaryNegationOperators<decimal,decimal>, System.Numerics.IUnaryPlusOperators<decimal,decimal>, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a decimal floating-point number.

The `Decimal` value type represents decimal numbers ranging from positive 79,228,162,514,264,337,593,543,950,335 to negative 79,228,162,514,264,337,593,543,950,335. The default value of a `Decimal` is 0. The `Decimal` value type is appropriate for financial calculations that require large numbers of significant integral and fractional digits and no round-off errors. The `Decimal` type does not eliminate the need for rounding. Rather, it minimizes errors due to rounding. For example, the following code produces a result of 0.9999999999999999999999999999 instead of 1.

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/DecimalDivision_46630_1.cs._

When the result of the division and multiplication is passed to the `Math.Round` method, the result suffers no loss of precision, as the following code shows.

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/DecimalDivision_46630_1.cs._

A decimal number is a floating-point value that consists of a sign, a numeric value where each digit in the value ranges from 0 to 9, and a scaling factor that indicates the position of a floating decimal point that separates the integral and fractional parts of the numeric value.

The binary representation of a `Decimal` value is 128-bits consisting of a 96-bit integer number, and a 32-bit set of flags representing things such as the sign and scaling factor used to specify what portion of it is a decimal fraction. Therefore, the binary representation of a `Decimal` value the form, ((-296 to 296) / 10(0 to 28)), where -(296-1) is equal to `MinValue`, and 296-1 is equal to `MaxValue`. For more information about the binary representation of `Decimal` values and an example, see the `%23ctor` constructor and the `Decimal.GetBits` method.

The scaling factor also preserves any trailing zeros in a `Decimal` number. Trailing zeros do not affect the value of a `Decimal` number in arithmetic or comparison operations. However, trailing zeros might be revealed by the `Decimal.ToString` method if an appropriate format string is applied.

#### Conversion considerations

This type provides methods that convert `Decimal` values to and from `SByte`, `Int16`, `Int32`, `Int64`, `Byte`, `UInt16`, `UInt32`, and `UInt64` values. Conversions from these integral types to `Decimal` are widening conversions that never lose information or throw exceptions.

Conversions from `Decimal` to any of the integral types are narrowing conversions that round the `Decimal` value to the nearest integer value toward zero. Some languages, such as C#, also support the conversion of `Decimal` values to `Char` values. If the result of these conversions cannot be represented in the destination type, an `OverflowException` exception is thrown.

The `Decimal` type also provides methods that convert `Decimal` values to and from `Single` and `Double` values. Conversions from `Decimal` to `Single` or `Double` are narrowing conversions that might lose precision but not information about the magnitude of the converted value. The conversion does not throw an exception.

Conversions from `Single` or `Double` to `Decimal` throw an `OverflowException` exception if the result of the conversion cannot be represented as a `Decimal`.

In .NET 11 and later, conversions between `Decimal` and binary floating-point types round the exact source value once to the nearest representable destination value.

#### Perform operations on Decimal values

The `Decimal` type supports standard mathematical operations such as addition, subtraction, division, multiplication, and unary negation. You can also work directly with the binary representation of a `Decimal` value by calling the `Decimal.GetBits` method.

To compare two `Decimal` values, you can use the standard numeric comparison operators, or you can call the `Decimal.CompareTo` or `Decimal.Equals` method.

You can also call the members of the `Math` class to perform a wide range of numeric operations, including getting the absolute value of a number, determining the maximum or minimum value of two `Decimal` values, getting the sign of a number, and rounding a number.

#### Examples

The following code example demonstrates the use of `Decimal`.

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/source.cs._

## Decimal.Decimal(Double) constructor

```csharp
public Decimal (double value);
```

Initializes a new instance of `Decimal` to the value of the specified double-precision floating-point number.

Parameters:

- `value`: The value to represent as a `Decimal`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> or less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>.

-or-

`value` is `Double.NaN`, `Double.PositiveInfinity`, or `Double.NegativeInfinity`.

#### Remarks
In .NET 11 and later, this constructor rounds the exact value of `value` to the nearest representable `Decimal`.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctordo.cs._

## Decimal.Decimal(Int32) constructor

```csharp
public Decimal (int value);
```

Initializes a new instance of `Decimal` to the value of the specified 32-bit signed integer.

Parameters:

- `value`: The value to represent as a `Decimal`.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with an `Int32` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctori.cs._

## Decimal.Decimal(Int32[]) constructor

```csharp
public Decimal (int[] bits);
```

Initializes a new instance of `Decimal` to a decimal value represented in binary and contained in a specified array.

Parameters:

- `bits`: An array of 32-bit signed integers containing a representation of a decimal value.

Exceptions:

- `ArgumentNullException`: `bits` is `null`.
- `ArgumentException`: The length of the `bits` is not 4.

-or-

The representation of the decimal value in `bits` is not valid.

#### Remarks
The binary representation of a `Decimal` number consists of a 1-bit sign, a 96-bit integer number, and a scaling factor used to divide the integer number and specify what portion of it is a decimal fraction. The scaling factor is implicitly the number 10, raised to an exponent ranging from 0 to 28.

`bits` is a four-element long array of 32-bit signed integers.

`bits` [0], `bits` [1], and `bits` [2] contain the low, middle, and high 32 bits of the 96-bit integer number.

`bits` [3] contains the scale factor and sign, and consists of following parts:

Bits 0 to 15, the lower word, are unused and must be zero.

Bits 16 to 23 must contain an exponent between 0 and 28, which indicates the power of 10 to divide the integer number.

Bits 24 to 30 are unused and must be zero.

Bit 31 contains the sign; 0 meaning positive, and 1 meaning negative.

A numeric value might have several possible binary representations; all are equally valid and numerically equivalent. Note that the bit representation differentiates between negative and positive zero. These values are treated as being equal in all operations.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with an array of four `Int32` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctoriarr.cs._

## Decimal.Decimal(Int64) constructor

```csharp
public Decimal (long value);
```

Initializes a new instance of `Decimal` to the value of the specified 64-bit signed integer.

Parameters:

- `value`: The value to represent as a `Decimal`.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with an `Int64` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctorl.cs._

## Decimal.Decimal(Int32>) constructor

```csharp
public Decimal (ReadOnlySpan<int> bits);
```

Initializes a new instance of `Decimal` to a decimal value represented in binary and contained in the specified span.

Parameters:

- `bits`: A span of four `Int32` values that contains a binary representation of a decimal value.

Exceptions:

- `ArgumentException`: The length of `bits` is not 4, or the representation of the decimal value in `bits` is not valid.

To be added.

## Decimal.Decimal(Single) constructor

```csharp
public Decimal (float value);
```

Initializes a new instance of `Decimal` to the value of the specified single-precision floating-point number.

Parameters:

- `value`: The value to represent as a `Decimal`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> or less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>.

-or-

`value` is `Single.NaN`, `Single.PositiveInfinity`, or `Single.NegativeInfinity`.

#### Remarks
In .NET 11 and later, this constructor rounds the exact value of `value` to the nearest representable `Decimal`.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctors.cs._

## Decimal.Decimal(UInt32) constructor

```csharp
public Decimal (uint value);
```

Initializes a new instance of `Decimal` to the value of the specified 32-bit unsigned integer.

Parameters:

- `value`: The value to represent as a `Decimal`.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with a `UInt32` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctorui.cs._

## Decimal.Decimal(UInt64) constructor

```csharp
public Decimal (ulong value);
```

Initializes a new instance of `Decimal` to the value of the specified 64-bit unsigned integer.

Parameters:

- `value`: The value to represent as a `Decimal`.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with a `UInt64` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctorul.cs._

## Decimal.Decimal(Int32, Int32, Int32, Boolean, Byte) constructor

```csharp
public Decimal (int lo, int mid, int hi, bool isNegative, byte scale);
```

Initializes a new instance of `Decimal` from parameters specifying the instance's constituent parts.

Parameters:

- `lo`: The low 32 bits of a 96-bit integer.
- `mid`: The middle 32 bits of a 96-bit integer.
- `hi`: The high 32 bits of a 96-bit integer.
- `isNegative`: `true` to indicate a negative number; `false` to indicate a positive number.
- `scale`: A power of 10 ranging from 0 to 28.

Exceptions:

- `ArgumentOutOfRangeException`: `scale` is greater than 28.

#### Remarks
The binary representation of a `Decimal` number consists of a 1-bit sign, a 96-bit integer number, and a scaling factor used to divide the integer number and specify what portion of it is a decimal fraction. The scaling factor is implicitly the number 10 raised to an exponent ranging from 0 to 28.

#### Examples
The following code example creates several `Decimal` numbers using the constructor overload that initializes a `Decimal` structure with three `Int32` value words, a `Boolean` sign, and a `Byte` scale factor.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctoriiibby.cs._

The following example uses the `Decimal.GetBits` method to retrieve the component parts of an array. It then uses this array in the call to the `%23ctor` constructor to instantiate a new `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctor2a.cs._

## Decimal.Scale property

```csharp
public byte Scale { get; }
```

Gets the scaling factor of the decimal, which is a number from 0 to 28 that represents the number of decimal digits.

Returns: To be added.

To be added.

## Decimal.System.Numerics.IAdditiveIdentity<System.Decimal,System.Decimal>.AdditiveIdentity property

```csharp
static decimal System.Numerics.IAdditiveIdentity<System.Decimal,System.Decimal>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Decimal.System.Numerics.IFloatingPointConstants<System.Decimal>.E property

```csharp
static decimal System.Numerics.IFloatingPointConstants<System.Decimal>.E { get; }
```

Gets the mathematical constant `e`.

Returns: To be added.

To be added.

## Decimal.System.Numerics.IFloatingPointConstants<System.Decimal>.Pi property

```csharp
static decimal System.Numerics.IFloatingPointConstants<System.Decimal>.Pi { get; }
```

Gets the mathematical constant `pi`.

Returns: To be added.

To be added.

## Decimal.System.Numerics.IFloatingPointConstants<System.Decimal>.Tau property

```csharp
static decimal System.Numerics.IFloatingPointConstants<System.Decimal>.Tau { get; }
```

Gets the mathematical constant `tau`.

Returns: To be added.

To be added.

## Decimal.System.Numerics.IMinMaxValue<System.Decimal>.MaxValue property

```csharp
static decimal System.Numerics.IMinMaxValue<System.Decimal>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.
