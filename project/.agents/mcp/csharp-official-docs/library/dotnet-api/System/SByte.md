---
title: "SByte struct (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByte struct

Namespace: `System`

```csharp
public readonly struct SByte : IComparable<sbyte>, IConvertible, IEquatable<sbyte>, IParsable<sbyte>, ISpanParsable<sbyte>, IUtf8SpanParsable<sbyte>, System.Numerics.IAdditionOperators<sbyte,sbyte,sbyte>, System.Numerics.IAdditiveIdentity<sbyte,sbyte>, System.Numerics.IBinaryInteger<sbyte>, System.Numerics.IBinaryNumber<sbyte>, System.Numerics.IBitwiseOperators<sbyte,sbyte,sbyte>, System.Numerics.IComparisonOperators<sbyte,sbyte,bool>, System.Numerics.IDecrementOperators<sbyte>, System.Numerics.IDivisionOperators<sbyte,sbyte,sbyte>, System.Numerics.IEqualityOperators<sbyte,sbyte,bool>, System.Numerics.IIncrementOperators<sbyte>, System.Numerics.IMinMaxValue<sbyte>, System.Numerics.IModulusOperators<sbyte,sbyte,sbyte>, System.Numerics.IMultiplicativeIdentity<sbyte,sbyte>, System.Numerics.IMultiplyOperators<sbyte,sbyte,sbyte>, System.Numerics.INumber<sbyte>, System.Numerics.INumberBase<sbyte>, System.Numerics.IShiftOperators<sbyte,int,sbyte>, System.Numerics.ISignedNumber<sbyte>, System.Numerics.ISubtractionOperators<sbyte,sbyte,sbyte>, System.Numerics.IUnaryNegationOperators<sbyte,sbyte>, System.Numerics.IUnaryPlusOperators<sbyte,sbyte>
```

Represents an 8-bit signed integer.

#### Remarks
The `SByte` value type represents integers with values ranging from negative 128 to positive 127.

> **Important:**
>  The `SByte` type is not CLS-compliant. The CLS-compliant alternative type is `Int16`. `Byte` can be used instead to replace a positive `SByte` value that ranges from zero to `MaxValue`. For more information about CLS compliance, see Language Independence and Language-Independent Components.

`SByte` provides methods to compare instances of this type, convert the value of an instance to its string representation, and convert the string representation of a number to an instance of this type.

For information about how format specification codes control the string representation of value types, see Formatting Types.

## SByte.System.Numerics.IAdditiveIdentity<System.SByte,System.SByte>.AdditiveIdentity property

```csharp
static sbyte System.Numerics.IAdditiveIdentity<System.SByte,System.SByte>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## SByte.System.Numerics.IBinaryNumber<System.SByte>.AllBitsSet property

```csharp
static sbyte System.Numerics.IBinaryNumber<System.SByte>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## SByte.System.Numerics.IMinMaxValue<System.SByte>.MaxValue property

```csharp
static sbyte System.Numerics.IMinMaxValue<System.SByte>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## SByte.System.Numerics.IMinMaxValue<System.SByte>.MinValue property

```csharp
static sbyte System.Numerics.IMinMaxValue<System.SByte>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## SByte.System.Numerics.IMultiplicativeIdentity<System.SByte,System.SByte>.MultiplicativeIdentity property

```csharp
static sbyte System.Numerics.IMultiplicativeIdentity<System.SByte,System.SByte>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.One property

```csharp
static sbyte System.Numerics.INumberBase<System.SByte>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.Radix property

```csharp
static int System.Numerics.INumberBase<System.SByte>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.Zero property

```csharp
static sbyte System.Numerics.INumberBase<System.SByte>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## SByte.System.Numerics.ISignedNumber<System.SByte>.NegativeOne property

```csharp
static sbyte System.Numerics.ISignedNumber<System.SByte>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## SByte.Abs(SByte) method

```csharp
public static sbyte Abs (sbyte value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## SByte.Clamp(SByte, SByte, SByte) method

```csharp
public static sbyte Clamp (sbyte value, sbyte min, sbyte max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## SByte.CompareTo(Object) method

```csharp
public int CompareTo (object? obj);
```

Compares this instance to a specified object and returns an indication of their relative values.

Parameters:

- `obj`: An object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `obj`.

-  Less than zero

:  This instance is less than `obj`.

-  Zero

:  This instance is equal to `obj`.

-  Greater than zero

:  This instance is greater than `obj`, or `obj` is `null`.

Exceptions:

- `ArgumentException`: `obj` is not an `SByte`.

#### Remarks
Any instance of `SByte`, regardless of its value, is considered greater than `null`.

The `obj` parameter must be `null` or an instance of `SByte`; otherwise, an exception is thrown.

## SByte.CompareTo(SByte) method

```csharp
public int CompareTo (sbyte value);
```

Compares this instance to a specified 8-bit signed integer and returns an indication of their relative values.

Parameters:

- `value`: An 8-bit signed integer to compare.

Returns: A signed integer that indicates the relative order of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `SByte.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `SByte.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine if its compiler performs implicit widening conversions on numeric types.

#### Examples
The following example demonstrates generic and nongeneric versions of the `SByte.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## SByte.CopySign(SByte, SByte) method

```csharp
public static sbyte CopySign (sbyte value, sbyte sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## SByte.CreateChecked<TOther>(TOther) method

```csharp
public static sbyte CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## SByte.CreateSaturating<TOther>(TOther) method

```csharp
public static sbyte CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## SByte.CreateTruncating<TOther>(TOther) method

```csharp
public static sbyte CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## SByte.DivRem(SByte, SByte) method

```csharp
public static (sbyte Quotient, sbyte Remainder) DivRem (sbyte left, sbyte right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## SByte.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is an instance of `SByte` and equals the value of this instance; otherwise, `false`.

To be added.

## SByte.Equals(SByte) method

```csharp
public bool Equals (sbyte obj);
```

Returns a value indicating whether this instance is equal to a specified `SByte` value.

Parameters:

- `obj`: An `SByte` value to compare to this instance.

Returns: `true` if `obj` has the same value as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `SByte.Equals` because it does not have to convert the `obj` parameter to an object.

## SByte.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## SByte.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `SByte`.

Returns: The enumerated constant, `TypeCode.SByte`.

To be added.

## SByte.IsEvenInteger(SByte) method

```csharp
public static bool IsEvenInteger (sbyte value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## SByte.IsNegative(SByte) method

```csharp
public static bool IsNegative (sbyte value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## SByte.IsOddInteger(SByte) method

```csharp
public static bool IsOddInteger (sbyte value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## SByte.IsPositive(SByte) method

```csharp
public static bool IsPositive (sbyte value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## SByte.IsPow2(SByte) method

```csharp
public static bool IsPow2 (sbyte value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## SByte.LeadingZeroCount(SByte) method

```csharp
public static sbyte LeadingZeroCount (sbyte value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## SByte.Log10(SByte) method

```csharp
public static sbyte Log10 (sbyte value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## SByte.Log2(SByte) method

```csharp
public static sbyte Log2 (sbyte value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## SByte.Max(SByte, SByte) method

```csharp
public static sbyte Max (sbyte x, sbyte y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.
