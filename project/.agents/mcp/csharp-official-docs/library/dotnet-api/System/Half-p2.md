---
title: "Half struct (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Half.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Half struct (part 2 of 6)

## Half.CreateTruncating<TOther>(TOther) method

```csharp
public static Half CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Half.DegreesToRadians(Half) method

```csharp
public static Half DegreesToRadians (Half degrees);
```

Converts a given value from degrees to radians.

Parameters:

- `degrees`: The value to convert to radians.

Returns: The value of `degrees` converted to radians.

To be added.

## Half.Equals(Half) method

```csharp
public bool Equals (Half other);
```

Compares this instance for equality with `other`.

Parameters:

- `other`: A half-precision floating point number to compare to this instance.

Returns: `true` if the current object is equal to `other`; otherwise, `false`.

To be added.

## Half.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to the specified `obj`.

Parameters:

- `obj`: The object to compare to this instance.

Returns: `true` if `obj` is an instance of `Half` and equals the value of this instance; otherwise, `false`.

To be added.

## Half.Exp(Half) method

```csharp
public static Half Exp (Half x);
```

Computes `E` raised to a given power.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E` raised to the power of `x`.

To be added.

## Half.Exp10(Half) method

```csharp
public static Half Exp10 (Half x);
```

Computes `10` raised to a given power.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x``

To be added.

## Half.Exp10M1(Half) method

```csharp
public static Half Exp10M1 (Half x);
```

Computes `10` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x` - 1`

To be added.

## Half.Exp2(Half) method

```csharp
public static Half Exp2 (Half x);
```

Computes `2` raised to a given power.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x``

To be added.

## Half.Exp2M1(Half) method

```csharp
public static Half Exp2M1 (Half x);
```

Computes `2` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x` - 1`

To be added.

## Half.ExpM1(Half) method

```csharp
public static Half ExpM1 (Half x);
```

Computes `E` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E`x` - 1`

To be added.

## Half.Floor(Half) method

```csharp
public static Half Floor (Half x);
```

Computes the floor of a value.

Parameters:

- `x`: The value whose floor is to be computed.

Returns: The floor of `x`.

To be added.

## Half.FusedMultiplyAdd(Half, Half, Half) method

```csharp
public static Half FusedMultiplyAdd (Half left, Half right, Half addend);
```

Computes the fused multiply-add of three values.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.
- `addend`: The value that is added to the product of `left` and `right`.

Returns: The result of `left` times `right` plus `addend` computed as one ternary operation.

To be added.

## Half.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Half.Hypot(Half, Half) method

```csharp
public static Half Hypot (Half x, Half y);
```

Computes the hypotenuse given two values representing the lengths of the shorter sides in a right-angled triangle.

Parameters:

- `x`: The value to square and add to `y`.
- `y`: The value to square and add to `x`.

Returns: The square root of `x`-squared plus `y`-squared.

To be added.

## Half.Ieee754Remainder(Half, Half) method

```csharp
public static Half Ieee754Remainder (Half left, Half right);
```

Computes the remainder of two values as specified by IEEE 754.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The remainder of `left` divided-by `right` as specified by IEEE 754.

To be added.

## Half.ILogB(Half) method

```csharp
public static int ILogB (Half x);
```

Computes the integer logarithm of a value.

Parameters:

- `x`: The value whose integer logarithm is to be computed.

Returns: The integer logarithm of `x`.

To be added.

## Half.IsEvenInteger(Half) method

```csharp
public static bool IsEvenInteger (Half value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Half.IsFinite(Half) method

```csharp
public static bool IsFinite (Half value);
```

Determines whether the specified value is finite (zero, subnormal, or normal).

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if the specified value is finite (zero, subnormal or normal); otherwise, `false`.

This effectively checks the value is not NaN and not infinite.

## Half.IsInfinity(Half) method

```csharp
public static bool IsInfinity (Half value);
```

Returns a value indicating whether the specified number evaluates to positive infinity.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if `value` evaluates to `Half.PositiveInfinity`; otherwise `false`.

To be added.

## Half.IsInteger(Half) method

```csharp
public static bool IsInteger (Half value);
```

Determines if a value represents an integral value.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## Half.IsNaN(Half) method

```csharp
public static bool IsNaN (Half value);
```

Determines whether the specified value is not a number.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if `value` evaluates to not a number `Half.NaN`; otherwise `false`.

To be added.

## Half.IsNegative(Half) method

```csharp
public static bool IsNegative (Half value);
```

Determines whether the specified value is negative.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if negative; `false` otherwise.

To be added.

## Half.IsNegativeInfinity(Half) method

```csharp
public static bool IsNegativeInfinity (Half value);
```

Determines whether the specified value is negative infinity.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if `value` evaluates to `Half.NegativeInfinity`; otherwise `false`.

To be added.

## Half.IsNormal(Half) method

```csharp
public static bool IsNormal (Half value);
```

Determines whether the specified value is normal.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if `value` is normal; `false` otherwise.

This effectively checks the value is not NaN, not infinite, not subnormal, and not zero.

## Half.IsOddInteger(Half) method

```csharp
public static bool IsOddInteger (Half value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Half.IsPositive(Half) method

```csharp
public static bool IsPositive (Half value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Half.IsPositiveInfinity(Half) method

```csharp
public static bool IsPositiveInfinity (Half value);
```

Determines whether the specified value is positive infinity.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if `value` evaluates to `Half.PositiveInfinity`; otherwise `false`.

To be added.

## Half.IsPow2(Half) method

```csharp
public static bool IsPow2 (Half value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Half.IsRealNumber(Half) method

```csharp
public static bool IsRealNumber (Half value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

#### Remarks

This function returns `true` for a complex number `a + bi` where `b` is zero.

This function checks values against the extended real number line, thus returns `true` for `PositiveInfinity` and `NegativeInfinity`.

## Half.IsSubnormal(Half) method

```csharp
public static bool IsSubnormal (Half value);
```

Determines whether the specified value is subnormal.

Parameters:

- `value`: A `Half` floating-point number.

Returns: `true` if `value` is subnormal; `false``false`.

This effectively checks the value is not NaN, not infinite, not normal, and not zero.

## Half.Lerp(Half, Half, Half) method

```csharp
public static Half Lerp (Half value1, Half value2, Half amount);
```

Performs a linear interpolation between two values based on the given weight.

Parameters:

- `value1`: The first value, which is intended to be the lower bound.
- `value2`: The second value, which is intended to be the upper bound.
- `amount`: A value, intended to be between 0 and 1, that indicates the weight of the interpolation.

Returns: The interpolated value.

To be added.

## Half.Log(Half) method

```csharp
public static Half Log (Half x);
```

Computes the natural (`base-E` logarithm of a value.

Parameters:

- `x`: The value whose natural logarithm is to be computed.

Returns: The natural logarithm of `x`.

To be added.

## Half.Log(Half, Half) method

```csharp
public static Half Log (Half x, Half newBase);
```

Computes the logarithm of a value in the specified base.

Parameters:

- `x`: The value whose logarithm is to be computed.
- `newBase`: The base in which the logarithm is to be computed.

Returns: The base-`newBase` logarithm of `x`.

To be added.

## Half.Log10(Half) method

```csharp
public static Half Log10 (Half x);
```

Computes the base-10 logarithm of a value.

Parameters:

- `x`: The value whose base-10 logarithm is to be computed.

Returns: The base-10 logarithm of `x`.

To be added.

## Half.Log10P1(Half) method

```csharp
public static Half Log10P1 (Half x);
```

Computes the base-10 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-10 logarithm.

Returns: `log10(`x` + 1)`

To be added.

## Half.Log2(Half) method

```csharp
public static Half Log2 (Half value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## Half.Log2P1(Half) method

```csharp
public static Half Log2P1 (Half x);
```

Computes the base-2 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-2 logarithm.

Returns: `log2(`x` + 1)`

To be added.

## Half.LogP1(Half) method

```csharp
public static Half LogP1 (Half x);
```

Computes the natural (`base-E`) logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the natural logarithm.

Returns: `loge(`x` + 1)`

To be added.

## Half.Max(Half, Half) method

```csharp
public static Half Max (Half x, Half y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MaxMagnitude(Half, Half) method

```csharp
public static Half MaxMagnitude (Half x, Half y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MaxMagnitudeNumber(Half, Half) method

```csharp
public static Half MaxMagnitudeNumber (Half x, Half y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MaxNative(Half, Half) method

```csharp
public static Half MaxNative (Half x, Half y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## Half.MaxNumber(Half, Half) method

```csharp
public static Half MaxNumber (Half x, Half y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.
