---
title: "Half struct (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Half.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Half struct (part 3 of 6)

## Half.Min(Half, Half) method

```csharp
public static Half Min (Half x, Half y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MinMagnitude(Half, Half) method

```csharp
public static Half MinMagnitude (Half x, Half y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MinMagnitudeNumber(Half, Half) method

```csharp
public static Half MinMagnitudeNumber (Half x, Half y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MinNative(Half, Half) method

```csharp
public static Half MinNative (Half x, Half y);
```

To be added.

Parameters:

- `x`: To be added.
- `y`: To be added.

Returns: To be added.

To be added.

## Half.MinNumber(Half, Half) method

```csharp
public static Half MinNumber (Half x, Half y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Half.MultiplyAddEstimate(Half, Half, Half) method

```csharp
public static Half MultiplyAddEstimate (Half left, Half right, Half addend);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `addend`: To be added.

Returns: To be added.

To be added.

## Half.op_Addition(Half, Half) method

```csharp
public static Half operator + (Half left, Half right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that is added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Half.op_CheckedExplicit(Half) method

```csharp
public static byte op_CheckedExplicit (Half value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Half.op_Decrement(Half) method

```csharp
public static Half operator -- (Half value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Half.op_Division(Half, Half) method

```csharp
public static Half operator / (Half left, Half right);
```

Divides two values together to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided-by `right`.

To be added.

## Half.op_Equality(Half, Half) method

```csharp
public static bool operator == (Half left, Half right);
```

Returns a value that indicates whether two specified `Half` values are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

To be added.

## Half.op_Explicit(Char) method

```csharp
public static explicit operator Half (char value);
```

Explicitly converts a `Char` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(Decimal) method

```csharp
public static explicit operator Half (decimal value);
```

Explicitly converts a `Decimal` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(Double) method

```csharp
public static explicit operator Half (double value);
```

An explicit operator to convert a `Double` value to a `Half`.

Parameters:

- `value`: The double-precision floating point value to convert to `Half`.

Returns: The `Half` representation of the specified double-precision floating point `value`.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator byte (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Byte` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `Byte` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator char (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Char` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `Char` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator decimal (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Decimal` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `Decimal` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator double (Half value);
```

An explicit operator to convert a `Half` value to a `Double`.

Parameters:

- `value`: The half-precision floating point value to convert to `Double`.

Returns: The `Double` representation of the specified half-precision floating point `value`.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator Int128 (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Int128`.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a 128-bit signed integer.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator short (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Int16` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `Int16` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator int (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Int32` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `Int32` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator long (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `Int64` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `Int64` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator IntPtr (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `IntPtr` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `IntPtr` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator sbyte (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `SByte` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `SByte` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator float (Half value);
```

An explicit operator to convert a `Half` value to a `Single`.

Parameters:

- `value`: The half-precision floating point value to convert to `Single`.

Returns: The `Single` representation of the specified half-precision floating point `value`.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator UInt128 (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `UInt128`.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a 128-bit unsigned integer.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator ushort (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `UInt16` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `UInt16` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator uint (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `UInt32` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `UInt32` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator ulong (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `UInt64` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `UInt64` value.

To be added.

## Half.op_Explicit(Half) method

```csharp
public static explicit operator UIntPtr (Half value);
```

Explicitly converts a half-precision floating-point value to its nearest representable `UIntPtr` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable `UIntPtr` value.

To be added.

## Half.op_Explicit(Int16) method

```csharp
public static explicit operator Half (short value);
```

Explicitly converts a `Int16` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(Int32) method

```csharp
public static explicit operator Half (int value);
```

Explicitly converts a `Int32` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(Int64) method

```csharp
public static explicit operator Half (long value);
```

Explicitly converts a `Int64` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(IntPtr) method

```csharp
public static explicit operator Half (IntPtr value);
```

Explicitly converts a `IntPtr` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(Single) method

```csharp
public static explicit operator Half (float value);
```

An explicit operator to convert a `Single` value to a `Half`.

Parameters:

- `value`: The single-precision floating point value to convert to `Half`.

Returns: The `Half` representation of the specified single-precision floating point `value`.

To be added.

## Half.op_Explicit(UInt16) method

```csharp
public static explicit operator Half (ushort value);
```

Explicitly converts a `UInt16` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(UInt32) method

```csharp
public static explicit operator Half (uint value);
```

Explicitly converts a `UInt32` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(UInt64) method

```csharp
public static explicit operator Half (ulong value);
```

Explicitly converts a `UInt64` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Explicit(UIntPtr) method

```csharp
public static explicit operator Half (UIntPtr value);
```

Explicitly converts a `UIntPtr` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_GreaterThan(Half, Half) method

```csharp
public static bool operator > (Half left, Half right);
```

Returns a value that indicates whether a specified `Half` value is greater than another specified `Half` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Half.op_GreaterThanOrEqual(Half, Half) method

```csharp
public static bool operator >= (Half left, Half right);
```

Returns a value that indicates whether `left` is greater than or equal to `right`.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.
