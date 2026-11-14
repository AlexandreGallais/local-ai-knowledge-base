---
title: "Single struct (part 4 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 4 of 14)

## Single.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is an instance of `Single` and equals the value of this instance; otherwise, `false`.

#### Remarks
The `Single.Equals` method should be used with caution, because two apparently equivalent values can be unequal due to the differing precision of the two values. The following example reports that the `Single` value .3333 and the `Single` returned by dividing 1 by 3 are unequal.

_Code sample not included: ~/snippets/csharp/System/Single/Epsilon/SingleEquals_25051.cs._

Rather than comparing for equality, one recommended technique involves defining an acceptable margin of difference between two values (such as .01% of one of the values). If the absolute value of the difference between the two values is less than or equal to that margin, the difference is likely to be due to differences in precision and, therefore, the values are likely to be equal. The following example uses this technique to compare .33333 and 1/3, the two `Single` values that the previous code example found to be unequal.

_Code sample not included: ~/snippets/csharp/System/Single/Epsilon/SingleEquals_25051.cs._

In this case, the values are equal.

> **Note:**
>  Because `Epsilon` defines the minimum expression of a positive value whose range is near zero, the margin of difference must be greater than `Epsilon`. Typically, it is many times greater than `Epsilon`.

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

#### Examples
The following code example demonstrates the `Single.Equals` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.Equals(Single) method

```csharp
public bool Equals (float obj);
```

Returns a value indicating whether this instance and a specified `Single` object represent the same value.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

The `Equals` method implements the `IEquatable<T>` interface, and performs slightly better than `Equals` because it does not have to convert the `obj` parameter to an object.

#### Widening conversions

Depending on your programming language, it might be possible to code an `Single.Equals` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Single` and the parameter type is `Int32`. The Microsoft C# compiler generates instructions to represent the value of the parameter as a `Single` object, and then generates a `Equals` method that compares the values of the instance and the widened representation of the parameter.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions of numeric types. For more information, see Type Conversion Tables.

#### Precision in comparisons

The `Single.Equals` method should be used with caution, because two apparently equivalent values can be unequal because of the differing precision of the two values. The following example reports that the `Single` value .3333 and the `Single` returned by dividing 1 by 3 are unequal.

_Code sample not included: ~/snippets/csharp/System/Single/Epsilon/SingleEquals_25051.cs._

One comparison technique that avoids the problems associated with comparing for equality involves defining an acceptable margin of difference between two values (such as .01% of one of the values). If the absolute value of the difference between the two values is less than or equal to that margin, the difference is likely to be an outcome of differences in precision and, therefore, the values are likely to be equal. The following example uses this technique to compare .33333 and 1/3, which are the two `Single` values that the previous code example found to be unequal.

_Code sample not included: ~/snippets/csharp/System/Single/Epsilon/SingleEquals_25051.cs._

In this case, the values are equal.

> **Note:**
> Because `Epsilon` defines the minimum expression of a positive value whose range is near zero, the margin of difference must be greater than `Epsilon`. Typically, it is many times greater than `Epsilon`. Because of this, we recommend that you do not use `Epsilon` when comparing `Double` values for equality.

A second technique that avoids the problems associated with comparing for equality involves comparing the difference between two floating-point numbers with some absolute value. If the difference is less than or equal to that absolute value, the numbers are equal. If it is greater, the numbers are not equal. One way to do this is to arbitrarily select an absolute value. However, this is problematic, because an acceptable margin of difference depends on the magnitude of the `Single` values. A second way takes advantage of a design feature of the floating-point format: The difference between the mantissa components in the integer representations of two floating-point values indicates the number of possible floating-point values that separates the two values. For example, the difference between 0.0 and `Epsilon` is 1, because `Epsilon` is the smallest representable value when working with a `Single` whose value is zero. The following example uses this technique to compare .33333 and 1/3, which are the two `Double` values that the previous code example with the `Equals` method found to be unequal. Note that the example uses the `BitConverter.GetBytes` and `BitConverter.ToInt32` methods to convert a single-precision floating-point value to its integer representation.

_Code sample not included: ~/snippets/csharp/System/Single/Equals/equalsabs1.cs._

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two numbers might produce different results depending on the version of .NET, because the precision of the numbers' internal representation might change.

## Single.Exp(Single) method

```csharp
public static float Exp (float x);
```

Computes `E` raised to a given power.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E` raised to the power of `x`.

To be added.

## Single.Exp10(Single) method

```csharp
public static float Exp10 (float x);
```

Computes `10` raised to a given power.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x``

To be added.

## Single.Exp10M1(Single) method

```csharp
public static float Exp10M1 (float x);
```

Computes `10` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x` - 1`

To be added.

## Single.Exp2(Single) method

```csharp
public static float Exp2 (float x);
```

Computes `2` raised to a given power.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x``

To be added.

## Single.Exp2M1(Single) method

```csharp
public static float Exp2M1 (float x);
```

Computes `2` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x` - 1`

To be added.

## Single.ExpM1(Single) method

```csharp
public static float ExpM1 (float x);
```

Computes `E` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E`x` - 1`

To be added.

## Single.Floor(Single) method

```csharp
public static float Floor (float x);
```

Computes the floor of a value.

Parameters:

- `x`: The value whose floor is to be computed.

Returns: The floor of `x`.

To be added.

## Single.FusedMultiplyAdd(Single, Single, Single) method

```csharp
public static float FusedMultiplyAdd (float left, float right, float addend);
```

Computes the fused multiply-add of three values.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.
- `addend`: The value that is added to the product of `left` and `right`.

Returns: The result of `left` times `right` plus `addend` computed as one ternary operation.

To be added.

## Single.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Single.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Single`.

Returns: The enumerated constant, `TypeCode.Single`.

To be added.

## Single.Hypot(Single, Single) method

```csharp
public static float Hypot (float x, float y);
```

Computes the hypotenuse given two values representing the lengths of the shorter sides in a right-angled triangle.

Parameters:

- `x`: The value to square and add to `y`.
- `y`: The value to square and add to `x`.

Returns: The square root of `x`-squared plus `y`-squared.

To be added.

## Single.Ieee754Remainder(Single, Single) method

```csharp
public static float Ieee754Remainder (float left, float right);
```

Computes the remainder of two values as specified by IEEE 754.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The remainder of `left` divided-by `right` as specified by IEEE 754.

To be added.

## Single.ILogB(Single) method

```csharp
public static int ILogB (float x);
```

Computes the integer logarithm of a value.

Parameters:

- `x`: The value whose integer logarithm is to be computed.

Returns: The integer logarithm of `x`.

To be added.

## Single.IsEvenInteger(Single) method

```csharp
public static bool IsEvenInteger (float value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Single.IsFinite(Single) method

```csharp
public static bool IsFinite (float f);
```

Determines whether the specified value is finite (zero, subnormal or normal).

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if the specified value is finite (zero, subnormal or normal); otherwise, `false`.

This effectively checks the value is not NaN and not infinite.

## Single.IsInfinity(Single) method

```csharp
public static bool IsInfinity (float f);
```

Returns a value indicating whether the specified number evaluates to negative or positive infinity.

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if `f` evaluates to `Single.PositiveInfinity` or `Single.NegativeInfinity`; otherwise, `false`.

#### Remarks
Floating-point operations return `PositiveInfinity` or `NegativeInfinity` to signal an overflow condition.

#### Examples
The following code example demonstrates the `Single.IsInfinity` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.IsInteger(Single) method

```csharp
public static bool IsInteger (float value);
```

Determines if a value represents an integral value.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## Single.IsNaN(Single) method

```csharp
public static bool IsNaN (float f);
```

Returns a value that indicates whether the specified value is not a number (`Single.NaN`).

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if `f` evaluates to not a number (`Single.NaN`); otherwise, `false`.

#### Remarks
Floating-point operations return `NaN` to signal that result of the operation is undefined. For example, dividing 0.0 by 0.0 results in `NaN`.

> **Note:**
>  `Single.IsNaN` returns `false` if a `Single` value is either `PositiveInfinity` or `NegativeInfinity`. To test for these values, use the `Single.IsInfinity`, `Single.IsPositiveInfinity`, and `Single.IsNegativeInfinity` methods.

#### Examples
The following code example demonstrates the `Single.IsNaN` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.IsNegative(Single) method

```csharp
public static bool IsNegative (float f);
```

Determines whether the specified value is negative.

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if negative, `false` otherwise.

To be added.

## Single.IsNegativeInfinity(Single) method

```csharp
public static bool IsNegativeInfinity (float f);
```

Returns a value indicating whether the specified number evaluates to negative infinity.

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if `f` evaluates to `Single.NegativeInfinity`; otherwise, `false`.

#### Remarks
Floating-point operations return `NegativeInfinity` to signal an overflow condition.

#### Examples
The following code example demonstrates the `Single.IsNegativeInfinity` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.IsNormal(Single) method

```csharp
public static bool IsNormal (float f);
```

Determines whether the specified value is normal.

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if `f` is normal; `false` otherwise.

This effectively checks the value is not NaN, not infinite, not subnormal, and not zero.

## Single.IsOddInteger(Single) method

```csharp
public static bool IsOddInteger (float value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.
