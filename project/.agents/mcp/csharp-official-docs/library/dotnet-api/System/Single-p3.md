---
title: "Single struct (part 3 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 3 of 14)

## Single.Atanh(Single) method

```csharp
public static float Atanh (float x);
```

Computes the hyperbolic arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-tangent is to be computed.

Returns: The hyperbolic arc-tangent of `x`.

To be added.

## Single.AtanPi(Single) method

```csharp
public static float AtanPi (float x);
```

Computes the arc-tangent of a value and divides the result by pi.

Parameters:

- `x`: The value whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`, divided by `pi`.

#### Remarks

This computes `arctan(x) / π` in the interval `[-0.5, +0.5]`.

## Single.BitDecrement(Single) method

```csharp
public static float BitDecrement (float x);
```

Returns the largest value that compares less than a specified value.

Parameters:

- `x`: The value to be bitwise decremented.

Returns: The largest value that compares less than `x`.

To be added.

## Single.BitIncrement(Single) method

```csharp
public static float BitIncrement (float x);
```

Returns the smallest value that compares greater than a specified value.

Parameters:

- `x`: The value to be bitwise incremented.

Returns: The smallest value that compares greater than `x`.

To be added.

## Single.Cbrt(Single) method

```csharp
public static float Cbrt (float x);
```

Computes the cube-root of a value.

Parameters:

- `x`: The value whose cube-root is to be computed.

Returns: The cube-root of `x`.

To be added.

## Single.Ceiling(Single) method

```csharp
public static float Ceiling (float x);
```

Computes the ceiling of a value.

Parameters:

- `x`: The value whose ceiling is to be computed.

Returns: The ceiling of `x`.

To be added.

## Single.Clamp(Single, Single, Single) method

```csharp
public static float Clamp (float value, float min, float max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Single.ClampNative(Single, Single, Single) method

```csharp
public static float ClampNative (float value, float min, float max);
```

To be added.

Parameters:

- `value`: To be added.
- `min`: To be added.
- `max`: To be added.

Returns: To be added.

To be added.

## Single.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified object.

Parameters:

- `value`: An object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`, or this instance is not a number (`Single.NaN`) and `value` is a number.

-  Zero

:  This instance is equal to `value`, or this instance and value are both not a number (`Single.NaN`), `Single.PositiveInfinity`, or `Single.NegativeInfinity`.

-  Greater than zero

:  This instance is greater than `value`, OR this instance is a number and `value` is not a number (`Single.NaN`), OR `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `Single`.

Values must be identical to be considered equal. Particularly when floating-point values depend on multiple mathematical operations, it's common for them to lose precision and for their values to be nearly identical except for their least significant digits. Because of this, the return value of the `Single.CompareTo` method may seem surprising at times. For example, multiplication by a particular value followed by division by the same value should produce the original value, but in the following example, the computed value turns out to be greater than the original value. Showing all significant digits of the two values by using the "R" standard numeric format string indicates that the computed value differs from the original value in its least significant digits. For information about handling such comparisons, see the Remarks section of the `Equals` method.

Although an object whose value is `NaN` is not considered equal to another object whose value is `NaN` (even itself), the `IComparable<T>` interface requires that `A.CompareTo(A)` return zero.

#### CompareTo(System.Object)

The `value` parameter must be `null` or an instance of `Single`; otherwise, an exception is thrown. Any instance of `Single`, regardless of its value, is considered greater than `null`.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/compareto3.cs._

This method is implemented to support the `IComparable` interface.

#### CompareTo(System.Single)

This method implements the `IComparable<T>` interface and performs slightly better than the `CompareTo` overload because it doesn't have to convert the `value` parameter to an object.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/compareto2.cs._

#### Widening conversions

Depending on your programming language, it might be possible to code a `Single.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Single` and the parameter type is `Int32`. The Microsoft C# compiler generates instructions to represent the value of the parameter as a `Single` object, then generates a `CompareTo` method that compares the values of the instance and the widened representation of the parameter.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions of numeric types. For more information, see the Type Conversion Tables topic.

#### Precision in comparisons

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

The following code example demonstrates the `Single.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.CompareTo(Single) method

```csharp
public int CompareTo (float value);
```

Compares this instance to a specified single-precision floating-point number and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified single-precision floating-point number.

Parameters:

- `value`: A single-precision floating-point number to compare.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`, or this instance is not a number (`Single.NaN`) and `value` is a number.

-  Zero

:  This instance is equal to `value`, or both this instance and `value` are not a number (`Single.NaN`), `Single.PositiveInfinity`, or `Single.NegativeInfinity`.

-  Greater than zero

:  This instance is greater than `value`, or this instance is a number and `value` is not a number (`Single.NaN`).

Values must be identical to be considered equal. Particularly when floating-point values depend on multiple mathematical operations, it's common for them to lose precision and for their values to be nearly identical except for their least significant digits. Because of this, the return value of the `Single.CompareTo` method may seem surprising at times. For example, multiplication by a particular value followed by division by the same value should produce the original value, but in the following example, the computed value turns out to be greater than the original value. Showing all significant digits of the two values by using the "R" standard numeric format string indicates that the computed value differs from the original value in its least significant digits. For information about handling such comparisons, see the Remarks section of the `Equals` method.

Although an object whose value is `NaN` is not considered equal to another object whose value is `NaN` (even itself), the `IComparable<T>` interface requires that `A.CompareTo(A)` return zero.

#### CompareTo(System.Object)

The `value` parameter must be `null` or an instance of `Single`; otherwise, an exception is thrown. Any instance of `Single`, regardless of its value, is considered greater than `null`.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/compareto3.cs._

This method is implemented to support the `IComparable` interface.

#### CompareTo(System.Single)

This method implements the `IComparable<T>` interface and performs slightly better than the `CompareTo` overload because it doesn't have to convert the `value` parameter to an object.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/compareto2.cs._

#### Widening conversions

Depending on your programming language, it might be possible to code a `Single.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Single` and the parameter type is `Int32`. The Microsoft C# compiler generates instructions to represent the value of the parameter as a `Single` object, then generates a `CompareTo` method that compares the values of the instance and the widened representation of the parameter.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions of numeric types. For more information, see the Type Conversion Tables topic.

#### Precision in comparisons

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

The following code example demonstrates generic and nongeneric versions of the `Single.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Single.ConvertToInteger<TInteger>(Single) method

```csharp
public static TInteger ConvertToInteger<TInteger> (float value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Single.ConvertToIntegerNative<TInteger>(Single) method

```csharp
public static TInteger ConvertToIntegerNative<TInteger> (float value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Single.CopySign(Single, Single) method

```csharp
public static float CopySign (float value, float sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Single.Cos(Single) method

```csharp
public static float Cos (float x);
```

Computes the cosine of a value.

Parameters:

- `x`: The value, in radians, whose cosine is to be computed.

Returns: The cosine of `x`.

#### Remarks

This computes `cos(x)`.

## Single.Cosh(Single) method

```csharp
public static float Cosh (float x);
```

Computes the hyperbolic cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic cosine is to be computed.

Returns: The hyperbolic cosine of `x`.

To be added.

## Single.CosPi(Single) method

```csharp
public static float CosPi (float x);
```

Computes the cosine of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, whose cosine is to be computed.

Returns: The cosine of `x` multiplied-by `pi`.

#### Remarks

This computes `cos(x * π)`.

## Single.CreateChecked<TOther>(TOther) method

```csharp
public static float CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Single.CreateSaturating<TOther>(TOther) method

```csharp
public static float CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Single.CreateTruncating<TOther>(TOther) method

```csharp
public static float CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Single.DegreesToRadians(Single) method

```csharp
public static float DegreesToRadians (float degrees);
```

Converts a given value from degrees to radians.

Parameters:

- `degrees`: The value to convert to radians.

Returns: The value of `degrees` converted to radians.

To be added.
