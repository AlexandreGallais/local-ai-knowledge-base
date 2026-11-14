---
title: "Decimal struct (part 3 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 3 of 12)

## Decimal.FromOACurrency(Int64) method

```csharp
public static decimal FromOACurrency (long cy);
```

Converts the specified 64-bit signed integer, which contains an OLE Automation Currency value, to the equivalent `Decimal` value.

Parameters:

- `cy`: An OLE Automation Currency value.

Returns: A `Decimal` that contains the equivalent of `cy`.

#### Examples
The following code example uses the `FromOACurrency` method to convert `Int64` fields that contain OLE Automation Currency values to the equivalent `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/FromOACurrency/fromoacurrency.cs._

## Decimal.GetBits(Decimal) method

```csharp
public static int[] GetBits (decimal d);
```

Converts the value of a specified instance of `Decimal` to its equivalent binary representation.

Parameters:

- `d`: The value to convert.

Returns: A 32-bit signed integer array with four elements that contain the binary representation of `d`.

#### Remarks
The binary representation of a `Decimal` number consists of a 1-bit sign, a 96-bit integer number, and a scaling factor used to divide the integer number and specify what portion of it is a decimal fraction. The scaling factor is implicitly the number 10, raised to an exponent ranging from 0 to 28.

The return value is a four-element array of 32-bit signed integers.

The first, second, and third elements of the returned array contain the low, middle, and high 32 bits of the 96-bit integer number.

The fourth element of the returned array contains the scale factor and sign. It consists of the following parts:

Bits 0 to 15, the lower word, are unused and must be zero.

Bits 16 to 23 must contain an exponent between 0 and 28, which indicates the power of 10 to divide the integer number.

Bits 24 to 30 are unused and must be zero.

Bit 31 contains the sign: 0 mean positive, and 1 means negative.

Note that the bit representation differentiates between negative and positive zero. These values are treated as being equal in all operations.

#### Examples
The following example uses the `GetBits` method to convert several `Decimal` values to their equivalent binary representations. It then displays the decimal values and the hexadecimal value of the elements in the array returned by the `Decimal.GetBits` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/GetBits/getbits.cs._

The following example uses the `Decimal.GetBits` method to retrieve the component parts of an array. It then uses this array in the call to the `%23ctor` constructor to instantiate a new `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/.ctor/ctor2a.cs._

## Decimal.GetBits(Decimal, Int32>) method

```csharp
public static int GetBits (decimal d, Span<int> destination);
```

Converts the value of a specified instance of `Decimal` to its equivalent binary representation.

Parameters:

- `d`: The value to convert.
- `destination`: The span into which to store the four-integer binary representation.

Returns: `4`, which is the number of integers in the binary representation.

Exceptions:

- `ArgumentException`: The destination span was not long enough to store the binary representation.

To be added.

## Decimal.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Decimal.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Decimal`.

Returns: The enumerated constant `TypeCode.Decimal`.

#### Examples
The following code example uses the `GetTypeCode` method to return the type code for `Decimal` value type.

_Code sample not included: ~/snippets/csharp/System/Decimal/GetBits/gettypecode.cs._

## Decimal.IsCanonical(Decimal) method

```csharp
public static bool IsCanonical (decimal value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Decimal.IsEvenInteger(Decimal) method

```csharp
public static bool IsEvenInteger (decimal value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Decimal.IsInteger(Decimal) method

```csharp
public static bool IsInteger (decimal value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## Decimal.IsNegative(Decimal) method

```csharp
public static bool IsNegative (decimal value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Decimal.IsOddInteger(Decimal) method

```csharp
public static bool IsOddInteger (decimal value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Decimal.IsPositive(Decimal) method

```csharp
public static bool IsPositive (decimal value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Decimal.Max(Decimal, Decimal) method

```csharp
public static decimal Max (decimal x, decimal y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Decimal.MaxMagnitude(Decimal, Decimal) method

```csharp
public static decimal MaxMagnitude (decimal x, decimal y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>`, this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Decimal.Min(Decimal, Decimal) method

```csharp
public static decimal Min (decimal x, decimal y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Decimal.MinMagnitude(Decimal, Decimal) method

```csharp
public static decimal MinMagnitude (decimal x, decimal y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>`, this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Decimal.Multiply(Decimal, Decimal) method

```csharp
public static decimal Multiply (decimal d1, decimal d2);
```

Multiplies two specified `Decimal` values.

Parameters:

- `d1`: The multiplicand.
- `d2`: The multiplier.

Returns: The result of multiplying `d1` and `d2`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Examples
The following code example creates several pairs of `Decimal` values and calculates their products with the `Multiply` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/Multiply/mul_div_rem.cs._

## Decimal.Negate(Decimal) method

```csharp
public static decimal Negate (decimal d);
```

Returns the result of multiplying the specified `Decimal` value by negative one.

Parameters:

- `d`: The value to negate.

Returns: A decimal number with the value of `d`, but the opposite sign.

-or-

Zero, if `d` is zero.

#### Examples
The following code example uses the `Negate` method to change the sign of several `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/Negate/floor_neg_trunc.cs._

## Decimal.op_Addition(Decimal, Decimal) method

```csharp
public static decimal operator + (decimal d1, decimal d2);
```

Adds two specified `Decimal` values.

Parameters:

- `d1`: The first value to add.
- `d2`: The second value to add.

Returns: The result of adding `d1` and `d2`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Addition` method defines the operation of the addition operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/addition1.cs._

If the language you're using doesn't support custom operators, call the `Decimal.Add` method instead.

The equivalent method for this operator is `Add`

## Decimal.op_Decrement(Decimal) method

```csharp
public static decimal operator -- (decimal d);
```

Decrements the `Decimal` operand by one.

Parameters:

- `d`: The value to decrement.

Returns: The value of `d` decremented by 1.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Decrement` method defines the operation of the decrement operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/decrement1.cs._

Some languages (such as Visual Basic) that lack an increment operator can call the `Decimal.op_Decrement` method directly, as the following example shows.

If your language does not support custom operators, call the `Decimal.Subtract` method instead, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/decrement2.cs._

## Decimal.op_Division(Decimal, Decimal) method

```csharp
public static decimal operator / (decimal d1, decimal d2);
```

Divides two specified `Decimal` values.

Parameters:

- `d1`: The dividend.
- `d2`: The divisor.

Returns: The result of dividing `d1` by `d2`.

Exceptions:

- `DivideByZeroException`: `d2` is zero.
- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Division` method defines the operation of the division operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/division1.cs._

If the language you're using doesn't support custom operators, call the `Decimal.Divide` method instead.

The equivalent method for this operator is `Divide`

## Decimal.op_Equality(Decimal, Decimal) method

```csharp
public static bool operator == (decimal d1, decimal d2);
```

Returns a value that indicates whether two `Decimal` values are equal.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` and `d2` are equal; otherwise, `false`.

#### Remarks
The `Decimal.op_Equality` method defines the operation of the equality operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/equality1.cs._

If the language you're using doesn't support custom operators, call the `Decimal.Equals` method instead.

The equivalent method for this operator is `Equals`

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator byte (decimal value);
```

Defines an explicit conversion of a `Decimal` to an 8-bit unsigned integer.

Parameters:

- `value`: The value to convert.

Returns: An 8-bit unsigned integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to a `Byte`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `Byte` value. To perform a conversion that is independent of language, you can call the `ToByte` or the `ToByte` method.

#### Examples
The following example converts `Decimal` numbers to `Byte` values by using the explicit `Decimal` to `Byte` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctos_byte.cs._
