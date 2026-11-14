---
title: "Double struct (part 5 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 5 of 14)

## Double.IsNormal(Double) method

```csharp
public static bool IsNormal (double d);
```

Determines whether the specified value is normal.

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if the value is normal; `false` otherwise.

This effectively checks the value is not NaN, not infinite, not subnormal, and not zero.

## Double.IsOddInteger(Double) method

```csharp
public static bool IsOddInteger (double value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Double.IsPositive(Double) method

```csharp
public static bool IsPositive (double value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Double.IsPositiveInfinity(Double) method

```csharp
public static bool IsPositiveInfinity (double d);
```

Returns a value indicating whether the specified number evaluates to positive infinity.

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if `d` evaluates to `Double.PositiveInfinity`; otherwise, `false`.

#### Remarks
Floating-point operations return `PositiveInfinity` to signal an overflow condition.

#### Examples
The following code example illustrates the use of `Double.IsPositiveInfinity`:

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.IsPow2(Double) method

```csharp
public static bool IsPow2 (double value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Double.IsRealNumber(Double) method

```csharp
public static bool IsRealNumber (double value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

#### Remarks

This function returns `true` for a complex number `a + bi` where `b` is zero.

This function checks values against the extended real number line, thus returns `true` for `PositiveInfinity` and `NegativeInfinity`.

## Double.IsSubnormal(Double) method

```csharp
public static bool IsSubnormal (double d);
```

Determines whether the specified value is subnormal.

Parameters:

- `d`: A double-precision floating-point number.

Returns: `true` if the value is subnormal; `false` otherwise.

This effectively checks the value is not NaN, not infinite, not normal, and not zero.

## Double.Lerp(Double, Double, Double) method

```csharp
public static double Lerp (double value1, double value2, double amount);
```

Performs a linear interpolation between two values based on the given weight.

Parameters:

- `value1`: The first value, which is intended to be the lower bound.
- `value2`: The second value, which is intended to be the upper bound.
- `amount`: A value, intended to be between 0 and 1, that indicates the weight of the interpolation.

Returns: The interpolated value.

To be added.

## Double.Log(Double) method

```csharp
public static double Log (double x);
```

Computes the natural (`base-E` logarithm of a value.

Parameters:

- `x`: The value whose natural logarithm is to be computed.

Returns: The natural logarithm of `x`.

To be added.

## Double.Log(Double, Double) method

```csharp
public static double Log (double x, double newBase);
```

Computes the logarithm of a value in the specified base.

Parameters:

- `x`: The value whose logarithm is to be computed.
- `newBase`: The base in which the logarithm is to be computed.

Returns: The base-`newBase` logarithm of `x`.

To be added.

## Double.Log10(Double) method

```csharp
public static double Log10 (double x);
```

Computes the base-10 logarithm of a value.

Parameters:

- `x`: The value whose base-10 logarithm is to be computed.

Returns: The base-10 logarithm of `x`.

To be added.

## Double.Log10P1(Double) method

```csharp
public static double Log10P1 (double x);
```

Computes the base-10 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-10 logarithm.

Returns: `log10(`x` + 1)`

To be added.

## Double.Log2(Double) method

```csharp
public static double Log2 (double value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## Double.Log2P1(Double) method

```csharp
public static double Log2P1 (double x);
```

Computes the base-2 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-2 logarithm.

Returns: `log2(`x` + 1)`

To be added.

## Double.LogP1(Double) method

```csharp
public static double LogP1 (double x);
```

Computes the natural (`base-E`) logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the natural logarithm.

Returns: `loge(`x` + 1)`

To be added.

## Double.Max(Double, Double) method

```csharp
public static double Max (double x, double y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MaxMagnitude(Double, Double) method

```csharp
public static double MaxMagnitude (double x, double y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>`, this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MaxMagnitudeNumber(Double, Double) method

```csharp
public static double MaxMagnitudeNumber (double x, double y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MaxNative(Double, Double) method

```csharp
public static double MaxNative (double x, double y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## Double.MaxNumber(Double, Double) method

```csharp
public static double MaxNumber (double x, double y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.Min(Double, Double) method

```csharp
public static double Min (double x, double y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MinMagnitude(Double, Double) method

```csharp
public static double MinMagnitude (double x, double y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>`, this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MinMagnitudeNumber(Double, Double) method

```csharp
public static double MinMagnitudeNumber (double x, double y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MinNative(Double, Double) method

```csharp
public static double MinNative (double x, double y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## Double.MinNumber(Double, Double) method

```csharp
public static double MinNumber (double x, double y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Double.MultiplyAddEstimate(Double, Double, Double) method

```csharp
public static double MultiplyAddEstimate (double left, double right, double addend);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `addend`: To be added.

Returns: To be added.

To be added.

## Double.op_Equality(Double, Double) method

```csharp
public static bool operator == (double left, double right);
```

Returns a value that indicates whether two specified `Double` values are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
The `Double.op_Equality` method defines the equality operator for `Double` values.

If two `NaN` values are tested for equality by using the equality operator, the result is `false`; two `NaN` values are not considered equal. If they are tested for equality by calling the `Double.Equals` method, the result is `true`.  When you want to determine whether the value of a `Double` is not a number (NaN), an alternative is to call the `Double.IsNaN` method.

## Double.op_GreaterThan(Double, Double) method

```csharp
public static bool operator > (double left, double right);
```

Returns a value that indicates whether a specified `Double` value is greater than another specified `Double` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `Double.op_GreaterThan` method defines the operation of the greater-than operator for `Double` values.

## Double.op_GreaterThanOrEqual(Double, Double) method

```csharp
public static bool operator >= (double left, double right);
```

Returns a value that indicates whether a specified `Double` value is greater than or equal to another specified `Double` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

#### Remarks
The `Double.op_GreaterThanOrEqual` method defines the operation of the greater-than-or-equal operator for `Double` values.

## Double.op_Inequality(Double, Double) method

```csharp
public static bool operator != (double left, double right);
```

Returns a value that indicates whether two specified `Double` values are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `Double.op_Inequality` method defines the inequality operator for `Double` values.

## Double.op_LessThan(Double, Double) method

```csharp
public static bool operator < (double left, double right);
```

Returns a value that indicates whether a specified `Double` value is less than another specified `Double` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `Double.op_LessThan` method defines the operation of the less-than operator for `Double` values.

## Double.op_LessThanOrEqual(Double, Double) method

```csharp
public static bool operator <= (double left, double right);
```

Returns a value that indicates whether a specified `Double` value is less than or equal to another specified `Double` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `Double.op_LessThanOrEqual` method defines the operation of the less-than-or-equal operator for `Double` values.
