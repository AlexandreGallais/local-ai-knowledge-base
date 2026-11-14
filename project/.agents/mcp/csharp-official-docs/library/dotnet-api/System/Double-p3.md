---
title: "Double struct (part 3 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 3 of 14)

## Double.Ceiling(Double) method

```csharp
public static double Ceiling (double x);
```

Computes the ceiling of a value.

Parameters:

- `x`: The value whose ceiling is to be computed.

Returns: The ceiling of `x`.

To be added.

## Double.Clamp(Double, Double, Double) method

```csharp
public static double Clamp (double value, double min, double max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Double.ClampNative(Double, Double, Double) method

```csharp
public static double ClampNative (double value, double min, double max);
```

To be added.

Parameters:

- `value`: To be added.
- `min`: To be added.
- `max`: To be added.

Returns: To be added.

To be added.

## Double.CompareTo(Double) method

```csharp
public int CompareTo (double value);
```

Compares this instance to a specified double-precision floating-point number and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified double-precision floating-point number.

Parameters:

- `value`: A double-precision floating-point number to compare.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`, or this instance is not a number (`Double.NaN`) and `value` is a number.

-  Zero

:  This instance is equal to `value`, or both this instance and `value` are not a number (`Double.NaN`), `Double.PositiveInfinity`, or `Double.NegativeInfinity`.

-  Greater than zero

:  This instance is greater than `value`, or this instance is a number and `value` is not a number (`Double.NaN`).

#### `CompareTo` method

Values must be identical to be considered equal. Particularly when floating-point values depend on multiple mathematical operations, it is common for them to lose precision and for their values to be nearly identical except for their least significant digits. Because of this, the return value of the `Double.CompareTo` method at times may seem surprising. For example, multiplication by a particular value followed by division by the same value should produce the original value. In the following example, however, the computed value turns out to be greater than the original value. Showing all significant digits of the two values by using the "R" standard numeric format string indicates that the computed value differs from the original value in its least significant digits. For information on handling such comparisons, see the Remarks section of the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/compareto2.cs._

This method implements the `IComparable<T>` interface and performs slightly better than the `Double.CompareTo` method because it does not have to convert the `value` parameter to an object.

Note that, although an object whose value is `NaN` is not considered equal to another object whose value is `NaN` (even itself), the `IComparable<T>` interface requires that `A.CompareTo(A)` return zero.

#### `CompareTo` method

The `value` parameter must be `null` or an instance of `Double`; otherwise, an exception is thrown. Any instance of `Double`, regardless of its value, is considered greater than `null`.

Values must be identical to be considered equal. Particularly when floating-point values depend on multiple mathematical operations, it is common for them to lose precision and for their values to be nearly identical except for their least significant digits. Because of this, the return value of the `Double.CompareTo` method at times may seem surprising. For example, multiplication by a particular value followed by division by the same value should produce the original value. In the following example, however, the computed value turns out to be greater than the original value. Showing all significant digits of the two values by using the "R" standard numeric format string indicates that the computed value differs from the original value in its least significant digits. For information on handling such comparisons, see the Remarks section of the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/compareto3.cs._

This method is implemented to support the `IComparable` interface. Note that, although a `NaN` is not considered to be equal to another `NaN` (even itself), the `IComparable` interface requires that `A.CompareTo(A)` return zero.

#### Widening conversions

Depending on your programming language, it might be possible to code a `Double.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Double` and the parameter type is `Int32`. The Microsoft C# compiler generates instructions to represent the value of the parameter as a `Double` object, then generates a `CompareTo` method that compares the values of the instance and the widened representation of the parameter.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions of numeric types. For more information, see the Type Conversion Tables topic.

#### Precision in comparisons

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

The following code example demonstrates generic and nongeneric versions of the `Double.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Double.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified object.

Parameters:

- `value`: An object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `value`.

-  A negative integer

:  This instance is less than `value`, or this instance is not a number (`Double.NaN`) and `value` is a number.

-  Zero

:  This instance is equal to `value`, or this instance and `value` are both `Double.NaN`, `Double.PositiveInfinity`, or `Double.NegativeInfinity`
-  A positive integer

:  This instance is greater than `value`, OR this instance is a number and `value` is not a number (`Double.NaN`), OR `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `Double`.

#### `CompareTo` method

Values must be identical to be considered equal. Particularly when floating-point values depend on multiple mathematical operations, it is common for them to lose precision and for their values to be nearly identical except for their least significant digits. Because of this, the return value of the `Double.CompareTo` method at times may seem surprising. For example, multiplication by a particular value followed by division by the same value should produce the original value. In the following example, however, the computed value turns out to be greater than the original value. Showing all significant digits of the two values by using the "R" standard numeric format string indicates that the computed value differs from the original value in its least significant digits. For information on handling such comparisons, see the Remarks section of the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/compareto2.cs._

This method implements the `IComparable<T>` interface and performs slightly better than the `Double.CompareTo` method because it does not have to convert the `value` parameter to an object.

Note that, although an object whose value is `NaN` is not considered equal to another object whose value is `NaN` (even itself), the `IComparable<T>` interface requires that `A.CompareTo(A)` return zero.

#### `CompareTo` method

The `value` parameter must be `null` or an instance of `Double`; otherwise, an exception is thrown. Any instance of `Double`, regardless of its value, is considered greater than `null`.

Values must be identical to be considered equal. Particularly when floating-point values depend on multiple mathematical operations, it is common for them to lose precision and for their values to be nearly identical except for their least significant digits. Because of this, the return value of the `Double.CompareTo` method at times may seem surprising. For example, multiplication by a particular value followed by division by the same value should produce the original value. In the following example, however, the computed value turns out to be greater than the original value. Showing all significant digits of the two values by using the "R" standard numeric format string indicates that the computed value differs from the original value in its least significant digits. For information on handling such comparisons, see the Remarks section of the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/compareto3.cs._

This method is implemented to support the `IComparable` interface. Note that, although a `NaN` is not considered to be equal to another `NaN` (even itself), the `IComparable` interface requires that `A.CompareTo(A)` return zero.

#### Widening conversions

Depending on your programming language, it might be possible to code a `Double.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Double` and the parameter type is `Int32`. The Microsoft C# compiler generates instructions to represent the value of the parameter as a `Double` object, then generates a `CompareTo` method that compares the values of the instance and the widened representation of the parameter.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions of numeric types. For more information, see the Type Conversion Tables topic.

#### Precision in comparisons

The precision of floating-point numbers beyond the documented precision is specific to the implementation and version of .NET. Consequently, a comparison of two particular numbers might change between versions of .NET because the precision of the numbers' internal representation might change.

The following code example illustrates the use of `CompareTo` in the context of `Double`.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.ConvertToInteger<TInteger>(Double) method

```csharp
public static TInteger ConvertToInteger<TInteger> (double value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Double.ConvertToIntegerNative<TInteger>(Double) method

```csharp
public static TInteger ConvertToIntegerNative<TInteger> (double value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Double.CopySign(Double, Double) method

```csharp
public static double CopySign (double value, double sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Double.Cos(Double) method

```csharp
public static double Cos (double x);
```

Computes the cosine of a value.

Parameters:

- `x`: The value, in radians, whose cosine is to be computed.

Returns: The cosine of `x`.

#### Remarks

This computes `cos(x)`.

## Double.Cosh(Double) method

```csharp
public static double Cosh (double x);
```

Computes the hyperbolic cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic cosine is to be computed.

Returns: The hyperbolic cosine of `x`.

To be added.

## Double.CosPi(Double) method

```csharp
public static double CosPi (double x);
```

Computes the cosine of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, whose cosine is to be computed.

Returns: The cosine of `x` multiplied-by `pi`.

#### Remarks

This computes `cos(x * π)`.

## Double.CreateChecked<TOther>(TOther) method

```csharp
public static double CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Double.CreateSaturating<TOther>(TOther) method

```csharp
public static double CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Double.CreateTruncating<TOther>(TOther) method

```csharp
public static double CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.
