---
title: "UInt64 struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt64 struct

Namespace: `System`

```csharp
public readonly struct UInt64 : IComparable<ulong>, IConvertible, IEquatable<ulong>, IParsable<ulong>, ISpanParsable<ulong>, IUtf8SpanParsable<ulong>, System.Numerics.IAdditionOperators<ulong,ulong,ulong>, System.Numerics.IAdditiveIdentity<ulong,ulong>, System.Numerics.IBinaryInteger<ulong>, System.Numerics.IBinaryNumber<ulong>, System.Numerics.IBitwiseOperators<ulong,ulong,ulong>, System.Numerics.IComparisonOperators<ulong,ulong,bool>, System.Numerics.IDecrementOperators<ulong>, System.Numerics.IDivisionOperators<ulong,ulong,ulong>, System.Numerics.IEqualityOperators<ulong,ulong,bool>, System.Numerics.IIncrementOperators<ulong>, System.Numerics.IMinMaxValue<ulong>, System.Numerics.IModulusOperators<ulong,ulong,ulong>, System.Numerics.IMultiplicativeIdentity<ulong,ulong>, System.Numerics.IMultiplyOperators<ulong,ulong,ulong>, System.Numerics.INumber<ulong>, System.Numerics.INumberBase<ulong>, System.Numerics.IShiftOperators<ulong,int,ulong>, System.Numerics.ISubtractionOperators<ulong,ulong,ulong>, System.Numerics.IUnaryNegationOperators<ulong,ulong>, System.Numerics.IUnaryPlusOperators<ulong,ulong>, System.Numerics.IUnsignedNumber<ulong>
```

Represents a 64-bit unsigned integer.

#### Remarks
The `UInt64` value type represents unsigned integers with values ranging from 0 to 18,446,744,073,709,551,615.

> **Important:**
>  The `UInt64` type is not CLS-compliant. The CLS-compliant alternative type is `Decimal`. `Int64` can be used instead to replace a `UInt64` value that ranges from zero to `MaxValue`. For more information about CLS compliance, see Language Independence and Language-Independent Components.

`UInt64` provides methods to compare instances of this type, convert the value of an instance to its string representation, and convert the string representation of a number to an instance of this type.

## UInt64.System.Numerics.IAdditiveIdentity<System.UInt64,System.UInt64>.AdditiveIdentity property

```csharp
static ulong System.Numerics.IAdditiveIdentity<System.UInt64,System.UInt64>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## UInt64.System.Numerics.IBinaryNumber<System.UInt64>.AllBitsSet property

```csharp
static ulong System.Numerics.IBinaryNumber<System.UInt64>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## UInt64.System.Numerics.IMinMaxValue<System.UInt64>.MaxValue property

```csharp
static ulong System.Numerics.IMinMaxValue<System.UInt64>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## UInt64.System.Numerics.IMinMaxValue<System.UInt64>.MinValue property

```csharp
static ulong System.Numerics.IMinMaxValue<System.UInt64>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## UInt64.System.Numerics.IMultiplicativeIdentity<System.UInt64,System.UInt64>.MultiplicativeIdentity property

```csharp
static ulong System.Numerics.IMultiplicativeIdentity<System.UInt64,System.UInt64>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## UInt64.System.Numerics.INumberBase<System.UInt64>.One property

```csharp
static ulong System.Numerics.INumberBase<System.UInt64>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## UInt64.System.Numerics.INumberBase<System.UInt64>.Radix property

```csharp
static int System.Numerics.INumberBase<System.UInt64>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## UInt64.System.Numerics.INumberBase<System.UInt64>.Zero property

```csharp
static ulong System.Numerics.INumberBase<System.UInt64>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## UInt64.BigMul(UInt64, UInt64) method

```csharp
public static UInt128 BigMul (ulong left, ulong right);
```

Produces the full product of two unsigned 64-bit numbers.

Parameters:

- `left`: The first number to multiply.
- `right`: The second number to multiply.

Returns: The number containing the product of the specified numbers.

To be added.

## UInt64.Clamp(UInt64, UInt64, UInt64) method

```csharp
public static ulong Clamp (ulong value, ulong min, ulong max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## UInt64.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an indication of their relative values.

Parameters:

- `value`: An object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`, or `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `UInt64`.

#### Remarks
Any instance of `UInt64`, regardless of its value, is considered greater than `null`.

`value` must be `null` or an instance of `UInt64`; otherwise, an exception is thrown.

#### Examples
The following code example demonstrates the `UInt64.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/UInt64/CompareTo/source.cs._

## UInt64.CompareTo(UInt64) method

```csharp
public int CompareTo (ulong value);
```

Compares this instance to a specified 64-bit unsigned integer and returns an indication of their relative values.

Parameters:

- `value`: An unsigned integer to compare.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `UInt64.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `UInt64.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following code example demonstrates generic and nongeneric versions of the `UInt64.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## UInt64.CreateChecked<TOther>(TOther) method

```csharp
public static ulong CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## UInt64.CreateSaturating<TOther>(TOther) method

```csharp
public static ulong CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt64.CreateTruncating<TOther>(TOther) method

```csharp
public static ulong CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt64.DivRem(UInt64, UInt64) method

```csharp
public static (ulong Quotient, ulong Remainder) DivRem (ulong left, ulong right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## UInt64.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare to this instance.

Returns: `true` if `obj` is an instance of `UInt64` and equals the value of this instance; otherwise, `false`.

#### Examples
The following example demonstrates the `UInt64.Equals` method.

_Code sample not included: ~/snippets/csharp/System/UInt64/Equals/equals1.cs._

## UInt64.Equals(UInt64) method

```csharp
public bool Equals (ulong obj);
```

Returns a value indicating whether this instance is equal to a specified `UInt64` value.

Parameters:

- `obj`: A `UInt64` value to compare to this instance.

Returns: `true` if `obj` has the same value as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `UInt64.Equals` because it does not have to convert the `obj` parameter to an object.

#### Examples
The following example demonstrates the `UInt64.Equals` method.

_Code sample not included: ~/snippets/csharp/System/UInt64/Equals/uint64_equals.cs._

## UInt64.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## UInt64.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `UInt64`.

Returns: The enumerated constant, `TypeCode.UInt64`.

To be added.

## UInt64.IsEvenInteger(UInt64) method

```csharp
public static bool IsEvenInteger (ulong value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt64.IsOddInteger(UInt64) method

```csharp
public static bool IsOddInteger (ulong value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt64.IsPow2(UInt64) method

```csharp
public static bool IsPow2 (ulong value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## UInt64.LeadingZeroCount(UInt64) method

```csharp
public static ulong LeadingZeroCount (ulong value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## UInt64.Log10(UInt64) method

```csharp
public static ulong Log10 (ulong value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt64.Log2(UInt64) method

```csharp
public static ulong Log2 (ulong value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## UInt64.Max(UInt64, UInt64) method

```csharp
public static ulong Max (ulong x, ulong y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UInt64.Min(UInt64, UInt64) method

```csharp
public static ulong Min (ulong x, ulong y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.
