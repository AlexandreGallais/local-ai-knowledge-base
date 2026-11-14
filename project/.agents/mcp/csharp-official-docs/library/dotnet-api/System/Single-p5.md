---
title: "Single struct (part 5 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 5 of 14)

## Single.IsPositive(Single) method

```csharp
public static bool IsPositive (float value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Single.IsPositiveInfinity(Single) method

```csharp
public static bool IsPositiveInfinity (float f);
```

Returns a value indicating whether the specified number evaluates to positive infinity.

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if `f` evaluates to `Single.PositiveInfinity`; otherwise, `false`.

#### Remarks
Floating-point operations return `PositiveInfinity` to signal an overflow condition.

#### Examples
The following code example demonstrates the `Single.IsPositiveInfinity` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.IsPow2(Single) method

```csharp
public static bool IsPow2 (float value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Single.IsRealNumber(Single) method

```csharp
public static bool IsRealNumber (float value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

#### Remarks

This function returns `true` for a complex number `a + bi` where `b` is zero.

This function checks values against the extended real number line, thus returns `true` for `PositiveInfinity` and `NegativeInfinity`.

## Single.IsSubnormal(Single) method

```csharp
public static bool IsSubnormal (float f);
```

Determines whether the specified value is subnormal.

Parameters:

- `f`: A single-precision floating-point number.

Returns: `true` if `f` is subnormal; `false` otherwise.

This effectively checks the value is not NaN, not infinite, not normal, and not zero.

## Single.Lerp(Single, Single, Single) method

```csharp
public static float Lerp (float value1, float value2, float amount);
```

Performs a linear interpolation between two values based on the given weight.

Parameters:

- `value1`: The first value, which is intended to be the lower bound.
- `value2`: The second value, which is intended to be the upper bound.
- `amount`: A value, intended to be between 0 and 1, that indicates the weight of the interpolation.

Returns: The interpolated value.

To be added.

## Single.Log(Single) method

```csharp
public static float Log (float x);
```

Computes the natural (`base-E` logarithm of a value.

Parameters:

- `x`: The value whose natural logarithm is to be computed.

Returns: The natural logarithm of `x`.

To be added.

## Single.Log(Single, Single) method

```csharp
public static float Log (float x, float newBase);
```

Computes the logarithm of a value in the specified base.

Parameters:

- `x`: The value whose logarithm is to be computed.
- `newBase`: The base in which the logarithm is to be computed.

Returns: The base-`newBase` logarithm of `x`.

To be added.

## Single.Log10(Single) method

```csharp
public static float Log10 (float x);
```

Computes the base-10 logarithm of a value.

Parameters:

- `x`: The value whose base-10 logarithm is to be computed.

Returns: The base-10 logarithm of `x`.

To be added.

## Single.Log10P1(Single) method

```csharp
public static float Log10P1 (float x);
```

Computes the base-10 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-10 logarithm.

Returns: `log10(`x` + 1)`

To be added.

## Single.Log2(Single) method

```csharp
public static float Log2 (float value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## Single.Log2P1(Single) method

```csharp
public static float Log2P1 (float x);
```

Computes the base-2 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-2 logarithm.

Returns: `log2(`x` + 1)`

To be added.

## Single.LogP1(Single) method

```csharp
public static float LogP1 (float x);
```

Computes the natural (`base-E`) logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the natural logarithm.

Returns: `loge(`x` + 1)`

To be added.

## Single.Max(Single, Single) method

```csharp
public static float Max (float x, float y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MaxMagnitude(Single, Single) method

```csharp
public static float MaxMagnitude (float x, float y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MaxMagnitudeNumber(Single, Single) method

```csharp
public static float MaxMagnitudeNumber (float x, float y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MaxNative(Single, Single) method

```csharp
public static float MaxNative (float x, float y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## Single.MaxNumber(Single, Single) method

```csharp
public static float MaxNumber (float x, float y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.Min(Single, Single) method

```csharp
public static float Min (float x, float y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MinMagnitude(Single, Single) method

```csharp
public static float MinMagnitude (float x, float y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For <see cref="T:System.Numerics.IFloatingPointIeee754`1> this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MinMagnitudeNumber(Single, Single) method

```csharp
public static float MinMagnitudeNumber (float x, float y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MinNative(Single, Single) method

```csharp
public static float MinNative (float x, float y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## Single.MinNumber(Single, Single) method

```csharp
public static float MinNumber (float x, float y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Single.MultiplyAddEstimate(Single, Single, Single) method

```csharp
public static float MultiplyAddEstimate (float left, float right, float addend);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `addend`: To be added.

Returns: To be added.

To be added.

## Single.op_Equality(Single, Single) method

```csharp
public static bool operator == (float left, float right);
```

Returns a value that indicates whether two specified `Single` values are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
The `Single.op_Equality` method defines the equality operator for `Single` values.

## Single.op_GreaterThan(Single, Single) method

```csharp
public static bool operator > (float left, float right);
```

Returns a value that indicates whether a specified `Single` value is greater than another specified `Single` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `Single.op_GreaterThan` method defines the operation of the greater-than operator for `Single` values.

## Single.op_GreaterThanOrEqual(Single, Single) method

```csharp
public static bool operator >= (float left, float right);
```

Returns a value that indicates whether a specified `Single` value is greater than or equal to another specified `Single` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

#### Remarks
The `Single.op_GreaterThanOrEqual` method defines the operation of the greater-than-or-equal operator for `Single` values.

## Single.op_Inequality(Single, Single) method

```csharp
public static bool operator != (float left, float right);
```

Returns a value that indicates whether two specified `Single` values are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `Single.op_Inequality` method defines the inequality operator for `Single` values.

## Single.op_LessThan(Single, Single) method

```csharp
public static bool operator < (float left, float right);
```

Returns a value that indicates whether a specified `Single` value is less than another specified `Single` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `Single.op_LessThan` method defines the operation of the less-than operator for `Single` values.

## Single.op_LessThanOrEqual(Single, Single) method

```csharp
public static bool operator <= (float left, float right);
```

Returns a value that indicates whether a specified `Single` value is less than or equal to another specified `Single` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `Single.op_LessThanOrEqual` method defines the operation of the less-than-or-equal operator for `Single` values.
