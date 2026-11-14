---
title: "Double struct (part 4 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 4 of 14)

## Double.DegreesToRadians(Double) method

```csharp
public static double DegreesToRadians (double degrees);
```

Converts a given value from degrees to radians.

Parameters:

- `degrees`: The value to convert to radians.

Returns: The value of `degrees` converted to radians.

To be added.

## Double.Equals(Double) method

```csharp
public bool Equals (double obj);
```

Returns a value indicating whether this instance and a specified `Double` object represent the same value.

Parameters:

- `obj`: A `Double` object to compare to this instance.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

The `Equals` method implements the `IEquatable<T>` interface, and performs slightly better than `Equals` because it doesn't have to convert the `obj` parameter to an object.

#### Widening conversions

Depending on your programming language, it might be possible to code a `Double.Equals` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Double` and the parameter type is `Int32`. The Microsoft C# compiler generates instructions to represent the value of the parameter as a `Double` object, then generates a `Equals` method that compares the values of the instance and the widened representation of the parameter.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions of numeric types. For more information, see the Type Conversion Tables topic.

#### Precision in comparisons

The `Double.Equals` method should be used with caution, because two apparently equivalent values can be unequal due to the differing precision of the two values. The following example reports that the `Double` value .333333 and the `Double` value returned by dividing 1 by 3 are unequal.

_Code sample not included: ~/snippets/csharp/System/Double/Epsilon/Equals_25051.cs._

Rather than comparing for equality, one technique involves defining an acceptable relative margin of difference between two values (such as .001% of one of the values). If the absolute value of the difference between the two values is less than or equal to that margin, the difference is likely to be due to differences in precision and, therefore, the values are likely to be equal. The following example uses this technique to compare .33333 and 1/3, the two `Double` values that the previous code example found to be unequal. In this case, the values are equal.

_Code sample not included: ~/snippets/csharp/System/Double/Epsilon/Equals_25051.cs._

> **Note:**
> Because `Epsilon` defines the minimum expression of a positive value whose range is near zero, the margin of difference between two similar values must be greater than `Epsilon`. Typically, it is many times greater than `Epsilon`. Because of this, we recommend that you **don't** use `Epsilon` when comparing `Double` values for equality.

A second technique involves comparing the difference between two floating-point numbers with some absolute value. If the difference is less than or equal to that absolute value, the numbers are equal. If it's greater, the numbers are not equal. One alternative is to arbitrarily select an absolute value. That's problematic, however, because an acceptable margin of difference depends on the magnitude of the `Double` values. A second alternative takes advantage of a design feature of the floating-point format: The difference between the integer representation of two floating-point values indicates the number of possible floating-point values that separates them. For example, the difference between 0.0 and `Epsilon` is 1, because `Epsilon` is the smallest representable value when working with a `Double` whose value is zero. The following example uses this technique to compare .33333 and 1/3, which are the two `Double` values that the previous code example with the `Equals` method found to be unequal. The example uses the `BitConverter.DoubleToInt64Bits` method to convert a double-precision floating-point value to its integer representation. The example declares the values as equal if there are no possible floating-point values between their integer representations.

_Code sample not included: ~/snippets/csharp/System/Double/Equals/equalsabs1.cs._

> **Note:**
> For some values, you might consider them equal even when there *is* a possible floating-point value between the integer representations. For example, consider the double values `0.39` and `1.69 - 1.3` (which is calculated as `0.<example-card-number>`). On a little-endian computer, the integer representations of these values are `4600697235336603894` and `4600697235336603892`, respectively. The difference between the integer values is `2`, meaning there *is* a possible floating-point value between `0.39` and `1.69 - 1.3`.

#### Version differences

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

#### NaN

If two `NaN` values are tested for equality by calling the `Double.Equals` method, the method returns `true`. However, if two `NaN` values are tested for equality by using the *equality operator*, the operator returns `false`. When you want to determine whether the value of a `Double` is not a number (NaN), an alternative is to call the `Double.IsNaN` method.

## Double.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is an instance of `Double` and equals the value of this instance; otherwise, `false`.

#### Remarks
The `Double.Equals` method should be used with caution, because two apparently equivalent values can be unequal due to the differing precision of the two values. The following example reports that the `Double` value .3333 and the `Double` returned by dividing 1 by 3 are unequal.

_Code sample not included: ~/snippets/csharp/System/Double/Epsilon/Equals_25051.cs._

For alternatives to calling the `Double.Equals` method, see the documentation for the `Equals` overload.

> **Note:**
>  Because `Epsilon` defines the minimum expression of a positive value whose range is near zero, the margin of difference between two similar values must be greater than `Epsilon`. Typically, it is many times greater than `Epsilon`.

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

If two `NaN` values are tested for equality by calling the `Double.Equals` method, the method returns `true`. However, if two `NaN` values are tested for equality by using the equality operator, the operator returns `false`. When you want to determine whether the value of a `Double` is not a number (NaN), an alternative is to call the `Double.IsNaN` method.

## Double.Exp(Double) method

```csharp
public static double Exp (double x);
```

Computes `E` raised to a given power.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E` raised to the power of `x`.

To be added.

## Double.Exp10(Double) method

```csharp
public static double Exp10 (double x);
```

Computes `10` raised to a given power.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x``

To be added.

## Double.Exp10M1(Double) method

```csharp
public static double Exp10M1 (double x);
```

Computes `10` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x` - 1`

To be added.

## Double.Exp2(Double) method

```csharp
public static double Exp2 (double x);
```

Computes `2` raised to a given power.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x``

To be added.

## Double.Exp2M1(Double) method

```csharp
public static double Exp2M1 (double x);
```

Computes `2` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x` - 1`

To be added.

## Double.ExpM1(Double) method

```csharp
public static double ExpM1 (double x);
```

Computes `E` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E`x` - 1`

To be added.

## Double.Floor(Double) method

```csharp
public static double Floor (double x);
```

Computes the floor of a value.

Parameters:

- `x`: The value whose floor is to be computed.

Returns: The floor of `x`.

To be added.

## Double.FusedMultiplyAdd(Double, Double, Double) method

```csharp
public static double FusedMultiplyAdd (double left, double right, double addend);
```

Computes the fused multiply-add of three values.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.
- `addend`: The value that is added to the product of `left` and `right`.

Returns: The result of `left` times `right` plus `addend` computed as one ternary operation.

To be added.

## Double.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Double.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Double`.

Returns: The enumerated constant, `TypeCode.Double`.

To be added.

## Double.Hypot(Double, Double) method

```csharp
public static double Hypot (double x, double y);
```

Computes the hypotenuse given two values representing the lengths of the shorter sides in a right-angled triangle.

Parameters:

- `x`: The value to square and add to `y`.
- `y`: The value to square and add to `x`.

Returns: The square root of `x`-squared plus `y`-squared.

To be added.

## Double.Ieee754Remainder(Double, Double) method

```csharp
public static double Ieee754Remainder (double left, double right);
```

Computes the remainder of two values as specified by IEEE 754.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The remainder of `left` divided-by `right` as specified by IEEE 754.

To be added.

## Double.ILogB(Double) method

```csharp
public static int ILogB (double x);
```

Computes the integer logarithm of a value.

Parameters:

- `x`: The value whose integer logarithm is to be computed.

Returns: The integer logarithm of `x`.

To be added.

## Double.IsEvenInteger(Double) method

```csharp
public static bool IsEvenInteger (double value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Double.IsFinite(Double) method

```csharp
public static bool IsFinite (double d);
```

Determines whether the specified value is finite (zero, subnormal, or normal).

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if the value is finite (zero, subnormal or normal); `false` otherwise.

This effectively checks the value is not NaN and not infinite.

## Double.IsInfinity(Double) method

```csharp
public static bool IsInfinity (double d);
```

Returns a value indicating whether the specified number evaluates to negative or positive infinity.

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if `d` evaluates to `Double.PositiveInfinity` or `Double.NegativeInfinity`; otherwise, `false`.

#### Remarks
Floating-point operations return `PositiveInfinity` or `NegativeInfinity` to signal an overflow condition.

#### Examples
The following code example illustrates the use of `Double.IsInfinity`:

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.IsInteger(Double) method

```csharp
public static bool IsInteger (double value);
```

Determines if a value represents an integral value.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## Double.IsNaN(Double) method

```csharp
public static bool IsNaN (double d);
```

Returns a value that indicates whether the specified value is not a number (`Double.NaN`).

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if `d` evaluates to `Double.NaN`; otherwise, `false`.

#### Remarks
Floating-point operations return `NaN` to signal that result of the operation is undefined. For example, dividing 0.0 by 0.0 results in `NaN`.

> **Note:**
>  `Double.IsNaN` returns `false` if a `Double` value is either `PositiveInfinity` or `NegativeInfinity`. To test for these values, use the `Double.IsInfinity`, `Double.IsPositiveInfinity`, and `Double.IsNegativeInfinity` methods.

#### Examples
The following code example illustrates the use of `Double.IsNaN`:

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.IsNegative(Double) method

```csharp
public static bool IsNegative (double d);
```

Determines whether the specified value is negative.

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if the value is negative; `false` otherwise.

To be added.

## Double.IsNegativeInfinity(Double) method

```csharp
public static bool IsNegativeInfinity (double d);
```

Returns a value indicating whether the specified number evaluates to negative infinity.

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if `d` evaluates to `Double.NegativeInfinity`; otherwise, `false`.

#### Remarks
Floating-point operations return `NegativeInfinity` to signal an overflow condition.

#### Examples
The following code example illustrates the use of `Double.IsNegativeInfinity`:

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._
