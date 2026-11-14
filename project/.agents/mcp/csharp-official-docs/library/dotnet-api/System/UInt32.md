---
title: "UInt32 struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt32 struct

Namespace: `System`

```csharp
public readonly struct UInt32 : IComparable<uint>, IConvertible, IEquatable<uint>, IParsable<uint>, ISpanParsable<uint>, IUtf8SpanParsable<uint>, System.Numerics.IAdditionOperators<uint,uint,uint>, System.Numerics.IAdditiveIdentity<uint,uint>, System.Numerics.IBinaryInteger<uint>, System.Numerics.IBinaryNumber<uint>, System.Numerics.IBitwiseOperators<uint,uint,uint>, System.Numerics.IComparisonOperators<uint,uint,bool>, System.Numerics.IDecrementOperators<uint>, System.Numerics.IDivisionOperators<uint,uint,uint>, System.Numerics.IEqualityOperators<uint,uint,bool>, System.Numerics.IIncrementOperators<uint>, System.Numerics.IMinMaxValue<uint>, System.Numerics.IModulusOperators<uint,uint,uint>, System.Numerics.IMultiplicativeIdentity<uint,uint>, System.Numerics.IMultiplyOperators<uint,uint,uint>, System.Numerics.INumber<uint>, System.Numerics.INumberBase<uint>, System.Numerics.IShiftOperators<uint,int,uint>, System.Numerics.ISubtractionOperators<uint,uint,uint>, System.Numerics.IUnaryNegationOperators<uint,uint>, System.Numerics.IUnaryPlusOperators<uint,uint>, System.Numerics.IUnsignedNumber<uint>
```

Represents a 32-bit unsigned integer.

#### Remarks
The `UInt32` value type represents unsigned integers with values ranging from 0 to 4,294,967,295.

> **Important:**
>  The `UInt32` type is not CLS-compliant. The CLS-compliant alternative type is `Int64`. `Int32` can be used instead to replace a `UInt32` value that ranges from zero to `MaxValue`. For more information about CLS compliance, see Language Independence and Language-Independent Components.

`UInt32` provides methods to compare instances of this type, convert the value of an instance to its `String` representation, and convert the `String` representation of a number to an instance of this type.

For information about how format specification codes control the `String` representation of value types, see Formatting Types.

## UInt32.System.Numerics.IAdditiveIdentity<System.UInt32,System.UInt32>.AdditiveIdentity property

```csharp
static uint System.Numerics.IAdditiveIdentity<System.UInt32,System.UInt32>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## UInt32.System.Numerics.IBinaryNumber<System.UInt32>.AllBitsSet property

```csharp
static uint System.Numerics.IBinaryNumber<System.UInt32>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## UInt32.System.Numerics.IMinMaxValue<System.UInt32>.MaxValue property

```csharp
static uint System.Numerics.IMinMaxValue<System.UInt32>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## UInt32.System.Numerics.IMinMaxValue<System.UInt32>.MinValue property

```csharp
static uint System.Numerics.IMinMaxValue<System.UInt32>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## UInt32.System.Numerics.IMultiplicativeIdentity<System.UInt32,System.UInt32>.MultiplicativeIdentity property

```csharp
static uint System.Numerics.IMultiplicativeIdentity<System.UInt32,System.UInt32>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## UInt32.System.Numerics.INumberBase<System.UInt32>.One property

```csharp
static uint System.Numerics.INumberBase<System.UInt32>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## UInt32.System.Numerics.INumberBase<System.UInt32>.Radix property

```csharp
static int System.Numerics.INumberBase<System.UInt32>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## UInt32.System.Numerics.INumberBase<System.UInt32>.Zero property

```csharp
static uint System.Numerics.INumberBase<System.UInt32>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## UInt32.BigMul(UInt32, UInt32) method

```csharp
public static ulong BigMul (uint left, uint right);
```

Produces the full product of two unsigned 32-bit numbers.

Parameters:

- `left`: The first number to multiply.
- `right`: The second number to multiply.

Returns: The number containing the product of the specified numbers.

To be added.

## UInt32.Clamp(UInt32, UInt32, UInt32) method

```csharp
public static uint Clamp (uint value, uint min, uint max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## UInt32.CompareTo(Object) method

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

- `ArgumentException`: `value` is not a `UInt32`.

#### Remarks
Any instance of `UInt32`, regardless of its value, is considered greater than `null`.

The `value` parameter must be `null` or an instance of `UInt32`; otherwise, an exception is thrown.

#### Examples
The following code example demonstrates the `UInt32.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/UInt32/CompareTo/source.cs._

## UInt32.CompareTo(UInt32) method

```csharp
public int CompareTo (uint value);
```

Compares this instance to a specified 32-bit unsigned integer and returns an indication of their relative values.

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
This method implements the `IComparable<T>` interface and performs slightly better than the `UInt32.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `UInt32.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following code example demonstrates generic and nongeneric versions of the `UInt32.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## UInt32.CreateChecked<TOther>(TOther) method

```csharp
public static uint CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## UInt32.CreateSaturating<TOther>(TOther) method

```csharp
public static uint CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt32.CreateTruncating<TOther>(TOther) method

```csharp
public static uint CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt32.DivRem(UInt32, UInt32) method

```csharp
public static (uint Quotient, uint Remainder) DivRem (uint left, uint right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## UInt32.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is an instance of `UInt32` and equals the value of this instance; otherwise, `false`.

#### Examples
The following code example demonstrates the `UInt32.Equals` method.

_Code sample not included: ~/snippets/csharp/System/UInt32/Equals/uint32_equals.cs._

## UInt32.Equals(UInt32) method

```csharp
public bool Equals (uint obj);
```

Returns a value indicating whether this instance is equal to a specified `UInt32`.

Parameters:

- `obj`: A value to compare to this instance.

Returns: `true` if `obj` has the same value as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than the `Equals` method because it does not have to convert the `obj` parameter to an object.

## UInt32.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## UInt32.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `UInt32`.

Returns: The enumerated constant, `TypeCode.UInt32`.

To be added.

## UInt32.IsEvenInteger(UInt32) method

```csharp
public static bool IsEvenInteger (uint value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt32.IsOddInteger(UInt32) method

```csharp
public static bool IsOddInteger (uint value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt32.IsPow2(UInt32) method

```csharp
public static bool IsPow2 (uint value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## UInt32.LeadingZeroCount(UInt32) method

```csharp
public static uint LeadingZeroCount (uint value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## UInt32.Log10(UInt32) method

```csharp
public static uint Log10 (uint value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt32.Log2(UInt32) method

```csharp
public static uint Log2 (uint value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## UInt32.Max(UInt32, UInt32) method

```csharp
public static uint Max (uint x, uint y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UInt32.Min(UInt32, UInt32) method

```csharp
public static uint Min (uint x, uint y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.
