---
title: "NFloat struct (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NFloat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NFloat struct (part 2 of 8)

## NFloat.Ceiling(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Ceiling (System.Runtime.InteropServices.NFloat x);
```

Computes the ceiling of a value.

Parameters:

- `x`: The value whose ceiling is to be computed.

Returns: The ceiling of `x`.

To be added.

## NFloat.Clamp(NFloat, NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Clamp (System.Runtime.InteropServices.NFloat value, System.Runtime.InteropServices.NFloat min, System.Runtime.InteropServices.NFloat max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## NFloat.ClampNative(NFloat, NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat ClampNative (System.Runtime.InteropServices.NFloat value, System.Runtime.InteropServices.NFloat min, System.Runtime.InteropServices.NFloat max);
```

To be added.

Parameters:

- `value`: To be added.
- `min`: To be added.
- `max`: To be added.

Returns: To be added.

To be added.

## NFloat.CompareTo(Object) method

```csharp
public int CompareTo (object? obj);
```

Compares this instance to a specified object and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified object.

Parameters:

- `obj`: An object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `obj`.

- Less than zero: This instance is less than `obj`, or this instance is not a number and `obj` is a number.

- Zero: This instance is equal to `obj`, or both this instance and `obj` are not a number.

- Greater than zero: This instance is greater than `obj`, or this instance is a number and `obj` is not a number or `obj` is `null`.

Exceptions:

- `ArgumentException`: `obj` is not a `NFloat`.

To be added.

## NFloat.CompareTo(NFloat) method

```csharp
public int CompareTo (System.Runtime.InteropServices.NFloat other);
```

Compares this instance to a specified floating-point number and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified floating-point number.

Parameters:

- `other`: A floating-point number to compare.

Returns: A signed number indicating the relative values of this instance and `other`.

- Less than zero: This instance is less than `other`, or this instance is not a number and `other` is a number.

- Zero: This instance is equal to `other`, or both this instance and `other` are not a number.

- Greater than zero: This instance is greater than `other`, or this instance is a number and `other` is not a number.

To be added.

## NFloat.ConvertToInteger<TInteger>(NFloat) method

```csharp
public static TInteger ConvertToInteger<TInteger> (System.Runtime.InteropServices.NFloat value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## NFloat.ConvertToIntegerNative<TInteger>(NFloat) method

```csharp
public static TInteger ConvertToIntegerNative<TInteger> (System.Runtime.InteropServices.NFloat value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## NFloat.CopySign(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat CopySign (System.Runtime.InteropServices.NFloat value, System.Runtime.InteropServices.NFloat sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## NFloat.Cos(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Cos (System.Runtime.InteropServices.NFloat x);
```

Computes the cosine of a value.

Parameters:

- `x`: The value, in radians, whose cosine is to be computed.

Returns: The cosine of `x`.

#### Remarks

This computes `cos(x)`.

## NFloat.Cosh(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Cosh (System.Runtime.InteropServices.NFloat x);
```

Computes the hyperbolic cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic cosine is to be computed.

Returns: The hyperbolic cosine of `x`.

To be added.

## NFloat.CosPi(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat CosPi (System.Runtime.InteropServices.NFloat x);
```

Computes the cosine of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, whose cosine is to be computed.

Returns: The cosine of `x` multiplied-by `pi`.

#### Remarks

This computes `cos(x * π)`.

## NFloat.CreateChecked<TOther>(TOther) method

```csharp
public static System.Runtime.InteropServices.NFloat CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## NFloat.CreateSaturating<TOther>(TOther) method

```csharp
public static System.Runtime.InteropServices.NFloat CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## NFloat.CreateTruncating<TOther>(TOther) method

```csharp
public static System.Runtime.InteropServices.NFloat CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## NFloat.DegreesToRadians(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat DegreesToRadians (System.Runtime.InteropServices.NFloat degrees);
```

Converts a given value from degrees to radians.

Parameters:

- `degrees`: The value to convert to radians.

Returns: The value of `degrees` converted to radians.

To be added.

## NFloat.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `o` is an instance of `NFloat` and equals the value of this instance; otherwise, `false`.

To be added.

## NFloat.Equals(NFloat) method

```csharp
public bool Equals (System.Runtime.InteropServices.NFloat other);
```

Returns a value indicating whether this instance is equal to a specified `CLong` value.

Parameters:

- `other`: An `NFloat` value to compare to this instance.

Returns: `true` if `other` has the same value as this instance; otherwise, `false`.

To be added.

## NFloat.Exp(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Exp (System.Runtime.InteropServices.NFloat x);
```

Computes `E` raised to a given power.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E` raised to the power of `x`.

To be added.

## NFloat.Exp10(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Exp10 (System.Runtime.InteropServices.NFloat x);
```

Computes `10` raised to a given power.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x``

To be added.

## NFloat.Exp10M1(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Exp10M1 (System.Runtime.InteropServices.NFloat x);
```

Computes `10` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x` - 1`

To be added.

## NFloat.Exp2(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Exp2 (System.Runtime.InteropServices.NFloat x);
```

Computes `2` raised to a given power.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x``

To be added.

## NFloat.Exp2M1(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Exp2M1 (System.Runtime.InteropServices.NFloat x);
```

Computes `2` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x` - 1`

To be added.

## NFloat.ExpM1(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat ExpM1 (System.Runtime.InteropServices.NFloat x);
```

Computes `E` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E`x` - 1`

To be added.

## NFloat.Floor(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Floor (System.Runtime.InteropServices.NFloat x);
```

Computes the floor of a value.

Parameters:

- `x`: The value whose floor is to be computed.

Returns: The floor of `x`.

To be added.

## NFloat.FusedMultiplyAdd(NFloat, NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat FusedMultiplyAdd (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right, System.Runtime.InteropServices.NFloat addend);
```

Computes the fused multiply-add of three values.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.
- `addend`: The value that is added to the product of `left` and `right`.

Returns: The result of `left` times `right` plus `addend` computed as one ternary operation.

To be added.

## NFloat.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## NFloat.Hypot(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Hypot (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Computes the hypotenuse given two values representing the lengths of the shorter sides in a right-angled triangle.

Parameters:

- `x`: The value to square and add to `y`.
- `y`: The value to square and add to `x`.

Returns: The square root of `x`-squared plus `y`-squared.

To be added.

## NFloat.Ieee754Remainder(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Ieee754Remainder (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Computes the remainder of two values as specified by IEEE 754.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The remainder of `left` divided by `right` as specified by IEEE 754.

To be added.

## NFloat.ILogB(NFloat) method

```csharp
public static int ILogB (System.Runtime.InteropServices.NFloat x);
```

Computes the integer logarithm of a value.

Parameters:

- `x`: The value whose integer logarithm is to be computed.

Returns: The integer logarithm of `x`.

To be added.

## NFloat.IsEvenInteger(NFloat) method

```csharp
public static bool IsEvenInteger (System.Runtime.InteropServices.NFloat value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## NFloat.IsFinite(NFloat) method

```csharp
public static bool IsFinite (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is finite (zero, subnormal, or normal).

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is finite (zero, subnormal or normal); `false` otherwise.

To be added.

## NFloat.IsInfinity(NFloat) method

```csharp
public static bool IsInfinity (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is infinite (positive or negative infinity).

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is infinite (positive or negative infinity); `false` otherwise.

To be added.

## NFloat.IsInteger(NFloat) method

```csharp
public static bool IsInteger (System.Runtime.InteropServices.NFloat value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## NFloat.IsNaN(NFloat) method

```csharp
public static bool IsNaN (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is NaN (not a number).

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is NaN (not a number); `false` otherwise.

To be added.

## NFloat.IsNegative(NFloat) method

```csharp
public static bool IsNegative (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is negative.

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is negative; `false` otherwise.

To be added.

## NFloat.IsNegativeInfinity(NFloat) method

```csharp
public static bool IsNegativeInfinity (System.Runtime.InteropServices.NFloat value);
```

Determines whether the specified value is negative infinity.

Parameters:

- `value`: The floating-point value.

Returns: `true` if the value is negative infinity; `false` otherwise.

To be added.
