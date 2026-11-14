---
title: "UInt128 struct (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt128.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt128 struct

Namespace: `System`

```csharp
public readonly struct UInt128 : IComparable<UInt128>, IEquatable<UInt128>, IParsable<UInt128>, ISpanParsable<UInt128>, IUtf8SpanParsable<UInt128>, System.Numerics.IAdditionOperators<UInt128,UInt128,UInt128>, System.Numerics.IAdditiveIdentity<UInt128,UInt128>, System.Numerics.IBinaryInteger<UInt128>, System.Numerics.IBinaryNumber<UInt128>, System.Numerics.IBitwiseOperators<UInt128,UInt128,UInt128>, System.Numerics.IComparisonOperators<UInt128,UInt128,bool>, System.Numerics.IDecrementOperators<UInt128>, System.Numerics.IDivisionOperators<UInt128,UInt128,UInt128>, System.Numerics.IEqualityOperators<UInt128,UInt128,bool>, System.Numerics.IIncrementOperators<UInt128>, System.Numerics.IMinMaxValue<UInt128>, System.Numerics.IModulusOperators<UInt128,UInt128,UInt128>, System.Numerics.IMultiplicativeIdentity<UInt128,UInt128>, System.Numerics.IMultiplyOperators<UInt128,UInt128,UInt128>, System.Numerics.INumber<UInt128>, System.Numerics.INumberBase<UInt128>, System.Numerics.IShiftOperators<UInt128,int,UInt128>, System.Numerics.ISubtractionOperators<UInt128,UInt128,UInt128>, System.Numerics.IUnaryNegationOperators<UInt128,UInt128>, System.Numerics.IUnaryPlusOperators<UInt128,UInt128>, System.Numerics.IUnsignedNumber<UInt128>
```

Represents a 128-bit unsigned integer.

To be added.

## UInt128.UInt128(UInt64, UInt64) constructor

```csharp
public UInt128 (ulong upper, ulong lower);
```

Initializes a new instance of the `UInt128` struct.

Parameters:

- `upper`: The upper 64-bits of the 128-bit value.
- `lower`: The lower 64-bits of the 128-bit value.

To be added.

## UInt128.MaxValue property

```csharp
public static UInt128 MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## UInt128.MinValue property

```csharp
public static UInt128 MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## UInt128.One property

```csharp
public static UInt128 One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## UInt128.System.Numerics.IAdditiveIdentity<System.UInt128,System.UInt128>.AdditiveIdentity property

```csharp
static UInt128 System.Numerics.IAdditiveIdentity<System.UInt128,System.UInt128>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## UInt128.System.Numerics.IBinaryNumber<System.UInt128>.AllBitsSet property

```csharp
static UInt128 System.Numerics.IBinaryNumber<System.UInt128>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## UInt128.System.Numerics.IMultiplicativeIdentity<System.UInt128,System.UInt128>.MultiplicativeIdentity property

```csharp
static UInt128 System.Numerics.IMultiplicativeIdentity<System.UInt128,System.UInt128>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.Radix property

```csharp
static int System.Numerics.INumberBase<System.UInt128>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## UInt128.Zero property

```csharp
public static UInt128 Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## UInt128.BigMul(UInt128, UInt128, UInt128) method

```csharp
public static UInt128 BigMul (UInt128 left, UInt128 right, out UInt128 lower);
```

Produces the full product of two unsigned native integers.

Parameters:

- `left`: The integer to multiply with `right`.
- `right`: The integer to multiply with `left`.
- `lower`: The lower half of the full product.

Returns: The upper half of the full product.

To be added.

## UInt128.Clamp(UInt128, UInt128, UInt128) method

```csharp
public static UInt128 Clamp (UInt128 value, UInt128 min, UInt128 max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## UInt128.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `value`: An object to compare with this instance.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

- Less than zero: This instance precedes `value` in the sort order.

- Zero: This instance occurs in the same position in the sort order as `value`.

- Greater than zero: This instance follows `value` in the sort order.

To be added.

## UInt128.CompareTo(UInt128) method

```csharp
public int CompareTo (UInt128 value);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `value`: An object to compare with this instance.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

- Less than zero: This instance precedes `value` in the sort order.

- Zero: This instance occurs in the same position in the sort order as `value`.

- Greater than zero: This instance follows `value` in the sort order.

To be added.

## UInt128.CreateChecked<TOther>(TOther) method

```csharp
public static UInt128 CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## UInt128.CreateSaturating<TOther>(TOther) method

```csharp
public static UInt128 CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt128.CreateTruncating<TOther>(TOther) method

```csharp
public static UInt128 CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt128.DivRem(UInt128, UInt128) method

```csharp
public static (UInt128 Quotient, UInt128 Remainder) DivRem (UInt128 left, UInt128 right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## UInt128.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

To be added.

## UInt128.Equals(UInt128) method

```csharp
public bool Equals (UInt128 other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to the `other` parameter; otherwise, `false`.

To be added.

## UInt128.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as the default hash function.

Returns: A hash code for the current object.

To be added.

## UInt128.IsEvenInteger(UInt128) method

```csharp
public static bool IsEvenInteger (UInt128 value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt128.IsOddInteger(UInt128) method

```csharp
public static bool IsOddInteger (UInt128 value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt128.IsPow2(UInt128) method

```csharp
public static bool IsPow2 (UInt128 value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## UInt128.LeadingZeroCount(UInt128) method

```csharp
public static UInt128 LeadingZeroCount (UInt128 value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## UInt128.Log10(UInt128) method

```csharp
public static UInt128 Log10 (UInt128 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.Log2(UInt128) method

```csharp
public static UInt128 Log2 (UInt128 value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## UInt128.Max(UInt128, UInt128) method

```csharp
public static UInt128 Max (UInt128 x, UInt128 y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UInt128.Min(UInt128, UInt128) method

```csharp
public static UInt128 Min (UInt128 x, UInt128 y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UInt128.op_Addition(UInt128, UInt128) method

```csharp
public static UInt128 operator + (UInt128 left, UInt128 right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that is added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt128.op_BitwiseAnd(UInt128, UInt128) method

```csharp
public static UInt128 operator & (UInt128 left, UInt128 right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## UInt128.op_BitwiseOr(UInt128, UInt128) method

```csharp
public static UInt128 operator | (UInt128 left, UInt128 right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## UInt128.op_CheckedAddition(UInt128, UInt128) method

```csharp
public static UInt128 op_CheckedAddition (UInt128 left, UInt128 right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that is added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt128.op_CheckedDecrement(UInt128) method

```csharp
public static UInt128 op_CheckedDecrement (UInt128 value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt128.op_CheckedDivision(UInt128, UInt128) method

```csharp
public static UInt128 op_CheckedDivision (UInt128 left, UInt128 right);
```

Divides two values together to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided-by `right`.

To be added.

## UInt128.op_CheckedExplicit(Double) method

```csharp
public static UInt128 op_CheckedExplicit (double value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.op_CheckedExplicit(Int16) method

```csharp
public static UInt128 op_CheckedExplicit (short value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.op_CheckedExplicit(Int32) method

```csharp
public static UInt128 op_CheckedExplicit (int value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.op_CheckedExplicit(Int64) method

```csharp
public static UInt128 op_CheckedExplicit (long value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.op_CheckedExplicit(IntPtr) method

```csharp
public static UInt128 op_CheckedExplicit (IntPtr value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.
