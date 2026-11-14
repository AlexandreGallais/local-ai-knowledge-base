---
title: "NFloat struct (part 3 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NFloat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NFloat struct (part 3 of 8)

## NFloat.IsNormal(NFloat) method

```csharp
public static bool IsNormal (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is normal.

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is normal; `false` otherwise.

To be added.

## NFloat.IsOddInteger(NFloat) method

```csharp
public static bool IsOddInteger (System.Runtime.InteropServices.NFloat value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## NFloat.IsPositive(NFloat) method

```csharp
public static bool IsPositive (System.Runtime.InteropServices.NFloat value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## NFloat.IsPositiveInfinity(NFloat) method

```csharp
public static bool IsPositiveInfinity (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is positive infinity.

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is positive infinity; `false` otherwise.

To be added.

## NFloat.IsPow2(NFloat) method

```csharp
public static bool IsPow2 (System.Runtime.InteropServices.NFloat value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## NFloat.IsRealNumber(NFloat) method

```csharp
public static bool IsRealNumber (System.Runtime.InteropServices.NFloat value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

#### Remarks

This function returns `true` for a complex number `a + bi` where `b` is zero.

This function checks values against the extended real number line, thus returns `true` for `PositiveInfinity` and `NegativeInfinity`.

## NFloat.IsSubnormal(NFloat) method

```csharp
public static bool IsSubnormal (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is subnormal.

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is subnormal; `false` otherwise.

To be added.

## NFloat.Lerp(NFloat, NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Lerp (System.Runtime.InteropServices.NFloat value1, System.Runtime.InteropServices.NFloat value2, System.Runtime.InteropServices.NFloat amount);
```

Performs a linear interpolation between two values based on the given weight.

Parameters:

- `value1`: The first value, which is intended to be the lower bound.
- `value2`: The second value, which is intended to be the upper bound.
- `amount`: A value, intended to be between 0 and 1, that indicates the weight of the interpolation.

Returns: The interpolated value.

To be added.

## NFloat.Log(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Log (System.Runtime.InteropServices.NFloat x);
```

Computes the natural (`base-E` logarithm of a value.

Parameters:

- `x`: The value whose natural logarithm is to be computed.

Returns: The natural logarithm of `x`.

To be added.

## NFloat.Log(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Log (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat newBase);
```

Computes the logarithm of a value in the specified base.

Parameters:

- `x`: The value whose logarithm is to be computed.
- `newBase`: The base in which the logarithm is to be computed.

Returns: The base-`newBase` logarithm of `x`.

To be added.

## NFloat.Log10(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Log10 (System.Runtime.InteropServices.NFloat x);
```

Computes the base-10 logarithm of a value.

Parameters:

- `x`: The value whose base-10 logarithm is to be computed.

Returns: The base-10 logarithm of `x`.

To be added.

## NFloat.Log10P1(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Log10P1 (System.Runtime.InteropServices.NFloat x);
```

Computes the base-10 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-10 logarithm.

Returns: `log10(`x` + 1)`

To be added.

## NFloat.Log2(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Log2 (System.Runtime.InteropServices.NFloat value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## NFloat.Log2P1(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Log2P1 (System.Runtime.InteropServices.NFloat x);
```

Computes the base-2 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-2 logarithm.

Returns: `log2(`x` + 1)`

To be added.

## NFloat.LogP1(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat LogP1 (System.Runtime.InteropServices.NFloat x);
```

Computes the natural (`base-E`) logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the natural logarithm.

Returns: `loge(`x` + 1)`

To be added.

## NFloat.Max(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Max (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MaxMagnitude(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MaxMagnitude (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>`, this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MaxMagnitudeNumber(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MaxMagnitudeNumber (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MaxNative(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MaxNative (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## NFloat.MaxNumber(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MaxNumber (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.Min(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Min (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MinMagnitude(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MinMagnitude (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>`, this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MinMagnitudeNumber(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MinMagnitudeNumber (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MinNative(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MinNative (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## NFloat.MinNumber(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MinNumber (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## NFloat.MultiplyAddEstimate(NFloat, NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat MultiplyAddEstimate (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right, System.Runtime.InteropServices.NFloat addend);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `addend`: To be added.

Returns: To be added.

To be added.

## NFloat.op_Addition(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator + (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## NFloat.op_CheckedExplicit(NFloat) method

```csharp
public static byte op_CheckedExplicit (System.Runtime.InteropServices.NFloat value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## NFloat.op_Decrement(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator -- (System.Runtime.InteropServices.NFloat value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## NFloat.op_Division(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator / (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Divides two values together to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided-by `right`.

To be added.

## NFloat.op_Equality(NFloat, NFloat) method

```csharp
public static bool operator == (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## NFloat.op_Explicit(Decimal) method

```csharp
public static explicit operator System.Runtime.InteropServices.NFloat (decimal value);
```

Explicitly converts a `Decimal` value to its nearest representable native-sized floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable native-sized floating-point value.

To be added.

## NFloat.op_Explicit(Double) method

```csharp
public static explicit operator System.Runtime.InteropServices.NFloat (double value);
```

Explicitly converts a `Double` value to its nearest representable native-sized floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable native-sized floating-point value.

To be added.
