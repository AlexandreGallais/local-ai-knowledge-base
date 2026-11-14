---
title: "BigInteger struct (part 4 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 4 of 18)

## BigInteger.DivRem(BigInteger, BigInteger) method

```csharp
public static (System.Numerics.BigInteger Quotient, System.Numerics.BigInteger Remainder) DivRem (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## BigInteger.DivRem(BigInteger, BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger DivRem (System.Numerics.BigInteger dividend, System.Numerics.BigInteger divisor, out System.Numerics.BigInteger remainder);
```

Divides one `BigInteger` value by another, returns the result, and returns the remainder in an output parameter.

Parameters:

- `dividend`: The value to be divided.
- `divisor`: The value to divide by.
- `remainder`: When this method returns, contains a `BigInteger` value that represents the remainder from the division. This parameter is passed uninitialized.

Returns: The quotient of the division.

Exceptions:

- `DivideByZeroException`: `divisor` is 0 (zero).

#### Remarks
This method preserves both the quotient and the remainder that results from integer division. If you are not interested in the remainder, use the `BigInteger.Divide` method or the division operator; if you are only interested in the remainder, use the `BigInteger.Remainder` method.

The sign of the returned `remainder` value is the same as the sign of the `dividend` parameter.

The behavior of the `BigInteger.DivRem` method is identical to that of the `Math.DivRem` method.

#### Examples
The following example creates an array of `BigInteger` values. It then uses each element as the quotient in a division operation that uses the `BigInteger.Divide` method, the division operator (/), and the `BigInteger.DivRem` method.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Divide/Divide1.cs._

## BigInteger.Equals(Int64) method

```csharp
public bool Equals (long other);
```

Returns a value that indicates whether the current instance and a signed 64-bit integer have the same value.

Parameters:

- `other`: The signed 64-bit integer value to compare.

Returns: `true` if the signed 64-bit integer and the current instance have the same value; otherwise, `false`.

#### Remarks
If `other` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the method is called.

To determine the relationship between the two objects instead of just testing for equality, call the `CompareTo` method.

#### Examples
The following example instantiates a `BigInteger` object from each integral type except `UInt64`. It then calls the `Equals` method to compare the `BigInteger` value with the original integer value that was passed to the `BigInteger` constructor. As the output shows, the values are equal in each case.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Equals/EqualsExample1.cs._

## BigInteger.Equals(BigInteger) method

```csharp
public bool Equals (System.Numerics.BigInteger other);
```

Returns a value that indicates whether the current instance and a specified `BigInteger` object have the same value.

Parameters:

- `other`: The object to compare.

Returns: `true` if this `BigInteger` object and `other` have the same value; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface and performs slightly better than `Equals` because it does not have to convert the `other` parameter to a `BigInteger` object.

To determine the relationship between the two `BigInteger` objects instead of just testing for equality, call the `CompareTo` method.

#### Examples
The following example compares the approximate distance of several stars from Earth with the distance of Epsilon Indi from Earth to determine whether they are equal. The example uses each overload of the `BigInteger.Equals` method to test for equality.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Equals/EqualsExample1.cs._

## BigInteger.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current instance and a specified object have the same value.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the `obj` argument is a `BigInteger` object, and its value is equal to the value of the current `BigInteger` instance; otherwise, `false`.

#### Remarks
If the `obj` argument is not a `BigInteger` value, the method returns `false`. The method returns `true` only if `obj` is a `BigInteger` instance whose value is equal to the current instance.

To determine the relationship between the two objects instead of just testing for equality, call the `CompareTo` method.

#### Examples
The following example defines parallel `Object` and `BigInteger` arrays. Each element of one array has the same value as the corresponding element of the second array. As the output from the example shows, the instance in the `BigInteger` array is considered to be equal to the instance in the `Object` array only if the latter is a `BigInteger` and their values are equal.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Equals/Equals_Obj1.cs._

## BigInteger.Equals(UInt64) method

```csharp
public bool Equals (ulong other);
```

Returns a value that indicates whether the current instance and an unsigned 64-bit integer have the same value.

Parameters:

- `other`: The unsigned 64-bit integer to compare.

Returns: `true` if the current instance and the unsigned 64-bit integer have the same value; otherwise, `false`.

#### Remarks
To determine the relationship between the two objects instead of just testing for equality, call the `CompareTo` method.

#### Examples
The following example compares the approximate distance of several stars from Earth with the distance of Epsilon Indi from Earth to determine whether they are equal. The example uses each overload of the `BigInteger.Equals` method to test for equality.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Equals/EqualsExample1.cs._

## BigInteger.GetBitLength() method

```csharp
public long GetBitLength ();
```

Gets the number of bits required for shortest two's complement representation of the current instance without the sign bit.

Returns: The minimum non-negative number of bits in two's complement notation without the sign bit.

#### Remarks

This method returns 0 if the value of current object is equal to `Zero` or `MinusOne`. For positive integers the return value is equal to the ordinary binary representation string length.

## BigInteger.GetByteCount(Boolean) method

```csharp
public int GetByteCount (bool isUnsigned = false);
```

Gets the number of bytes that will be output by `BigInteger.ToByteArray` and `BigInteger.TryWriteBytes`.

Parameters:

- `isUnsigned`: `true` to use unsigned encoding; otherwise, `false`.

Returns: The number of bytes.

To be added.

## BigInteger.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `BigInteger` object.

Returns: A 32-bit signed integer hash code.

To be added.

## BigInteger.GreatestCommonDivisor(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger GreatestCommonDivisor (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Finds the greatest common divisor of two `BigInteger` values.

Parameters:

- `left`: The first value.
- `right`: The second value.

Returns: The greatest common divisor of `left` and `right`.

#### Remarks
The greatest common divisor is the largest number into which the two `BigInteger` values can be divided without returning a remainder.

If the `left` and `right` parameters are non-zero numbers, the method always returns at least a value of 1 because all numbers can be divided by 1. If either parameter is zero, the method returns the absolute value of the non-zero parameter. If both values are zero, the method returns zero.

> **Note:**
>  Computing the greatest common divisor of very large values of `left` and `right` can be a very time-consuming operation.

The value returned by the `BigInteger.GreatestCommonDivisor` method is always positive (including zero) regardless of the sign of the `left` and `right` parameters.

#### Examples
The following example illustrates a call to the `BigInteger.GreatestCommonDivisor` method and the exception handling necessary to provide useful information about an `ArgumentOutOfRangeException`. The result indicates that the greatest common divisor of these two numbers is 1.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

## BigInteger.IsEvenInteger(BigInteger) method

```csharp
public static bool IsEvenInteger (System.Numerics.BigInteger value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## BigInteger.IsNegative(BigInteger) method

```csharp
public static bool IsNegative (System.Numerics.BigInteger value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## BigInteger.IsOddInteger(BigInteger) method

```csharp
public static bool IsOddInteger (System.Numerics.BigInteger value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## BigInteger.IsPositive(BigInteger) method

```csharp
public static bool IsPositive (System.Numerics.BigInteger value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## BigInteger.IsPow2(BigInteger) method

```csharp
public static bool IsPow2 (System.Numerics.BigInteger value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## BigInteger.LeadingZeroCount(BigInteger) method

```csharp
public static System.Numerics.BigInteger LeadingZeroCount (System.Numerics.BigInteger value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## BigInteger.Log(BigInteger) method

```csharp
public static double Log (System.Numerics.BigInteger value);
```

Returns the natural (base `e`) logarithm of a specified number.

Parameters:

- `value`: The number whose logarithm is to be found.

Returns: The natural (base `e`) logarithm of `value`, as shown in the table in the Remarks section.

Exceptions:

- `ArgumentOutOfRangeException`: The natural log of `value` is out of range of the `Double` data type.

#### Remarks
The `value` parameter is specified as a base 10 number.

The precise return value of this method depends on the sign of `value`, as the following table shows.

| Sign of `value` parameter | Return value                                                            |
|---------------------------|-------------------------------------------------------------------------|
| Positive                  | The natural logarithm of `value`; that is, ln `value`, or log e`value`. |
| Zero                      | `NegativeInfinity`.                                  |
| Negative                  | `NaN`.                                               |

To calculate the base 10 logarithm of a `BigInteger` value, call the `BigInteger.Log10` method. To calculate the logarithm of a number in another base, call the `Log` method.

You can find the square root of a number by calling the `BigInteger.Log` method along with the `Math.Exp` method. Note that the result is `PositiveInfinity` if the result is greater than `MaxValue`. The following example calculates the square root of each element in an array of `BigInteger` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/LogMethod/log1.cs._

This method corresponds to the `Log` method for the primitive numeric types.
