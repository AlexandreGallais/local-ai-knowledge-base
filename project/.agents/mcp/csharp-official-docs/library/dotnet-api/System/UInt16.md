---
title: "UInt16 struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt16 struct

Namespace: `System`

```csharp
public readonly struct UInt16 : IComparable<ushort>, IConvertible, IEquatable<ushort>, IParsable<ushort>, ISpanParsable<ushort>, IUtf8SpanParsable<ushort>, System.Numerics.IAdditionOperators<ushort,ushort,ushort>, System.Numerics.IAdditiveIdentity<ushort,ushort>, System.Numerics.IBinaryInteger<ushort>, System.Numerics.IBinaryNumber<ushort>, System.Numerics.IBitwiseOperators<ushort,ushort,ushort>, System.Numerics.IComparisonOperators<ushort,ushort,bool>, System.Numerics.IDecrementOperators<ushort>, System.Numerics.IDivisionOperators<ushort,ushort,ushort>, System.Numerics.IEqualityOperators<ushort,ushort,bool>, System.Numerics.IIncrementOperators<ushort>, System.Numerics.IMinMaxValue<ushort>, System.Numerics.IModulusOperators<ushort,ushort,ushort>, System.Numerics.IMultiplicativeIdentity<ushort,ushort>, System.Numerics.IMultiplyOperators<ushort,ushort,ushort>, System.Numerics.INumber<ushort>, System.Numerics.INumberBase<ushort>, System.Numerics.IShiftOperators<ushort,int,ushort>, System.Numerics.ISubtractionOperators<ushort,ushort,ushort>, System.Numerics.IUnaryNegationOperators<ushort,ushort>, System.Numerics.IUnaryPlusOperators<ushort,ushort>, System.Numerics.IUnsignedNumber<ushort>
```

Represents a 16-bit unsigned integer.

#### Remarks
The `UInt16` value type represents unsigned integers with values ranging from 0 to 65535.

> **Important:**
>  The `UInt16` type is not CLS-compliant. The CLS-compliant alternative type is `Int32`. `Int16` can be used instead to replace a `UInt16` value that ranges from zero to `MaxValue`. For more information about CLS compliance, see Language Independence and Language-Independent Components.

The `UInt16` structure provides methods to compare instances of this type, convert the value of an instance to its string representation, and convert the string representation of a number to an instance of this type.

For information about how format specification codes control the string representation of value types, see Formatting Types.

## UInt16.System.Numerics.IAdditiveIdentity<System.UInt16,System.UInt16>.AdditiveIdentity property

```csharp
static ushort System.Numerics.IAdditiveIdentity<System.UInt16,System.UInt16>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## UInt16.System.Numerics.IBinaryNumber<System.UInt16>.AllBitsSet property

```csharp
static ushort System.Numerics.IBinaryNumber<System.UInt16>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## UInt16.System.Numerics.IMinMaxValue<System.UInt16>.MaxValue property

```csharp
static ushort System.Numerics.IMinMaxValue<System.UInt16>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## UInt16.System.Numerics.IMinMaxValue<System.UInt16>.MinValue property

```csharp
static ushort System.Numerics.IMinMaxValue<System.UInt16>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## UInt16.System.Numerics.IMultiplicativeIdentity<System.UInt16,System.UInt16>.MultiplicativeIdentity property

```csharp
static ushort System.Numerics.IMultiplicativeIdentity<System.UInt16,System.UInt16>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## UInt16.System.Numerics.INumberBase<System.UInt16>.One property

```csharp
static ushort System.Numerics.INumberBase<System.UInt16>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## UInt16.System.Numerics.INumberBase<System.UInt16>.Radix property

```csharp
static int System.Numerics.INumberBase<System.UInt16>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## UInt16.System.Numerics.INumberBase<System.UInt16>.Zero property

```csharp
static ushort System.Numerics.INumberBase<System.UInt16>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## UInt16.Clamp(UInt16, UInt16, UInt16) method

```csharp
public static ushort Clamp (ushort value, ushort min, ushort max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## UInt16.CompareTo(Object) method

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

- `ArgumentException`: `value` is not a `UInt16`.

#### Remarks
Any instance of `UInt16`, regardless of its value, is considered greater than `null`.

`value` must be `null` or an instance of `UInt16`; otherwise, an exception is thrown.

#### Examples
The following example demonstrates the `UInt16.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/UInt16/CompareTo/source.cs._

## UInt16.CompareTo(UInt16) method

```csharp
public int CompareTo (ushort value);
```

Compares this instance to a specified 16-bit unsigned integer and returns an indication of their relative values.

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
This method implements the `IComparable<T>` interface and performs slightly better than the `UInt16.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `UInt16.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following example demonstrates generic and nongeneric versions of the `UInt16.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## UInt16.CreateChecked<TOther>(TOther) method

```csharp
public static ushort CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## UInt16.CreateSaturating<TOther>(TOther) method

```csharp
public static ushort CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt16.CreateTruncating<TOther>(TOther) method

```csharp
public static ushort CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## UInt16.DivRem(UInt16, UInt16) method

```csharp
public static (ushort Quotient, ushort Remainder) DivRem (ushort left, ushort right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## UInt16.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare to this instance.

Returns: `true` if `obj` is an instance of `UInt16` and equals the value of this instance; otherwise, `false`.

#### Examples
The following example demonstrates the `UInt16.Equals` method.

_Code sample not included: ~/snippets/csharp/System/UInt16/Equals/uint16_equals.cs._

## UInt16.Equals(UInt16) method

```csharp
public bool Equals (ushort obj);
```

Returns a value indicating whether this instance is equal to a specified `UInt16` value.

Parameters:

- `obj`: A 16-bit unsigned integer to compare to this instance.

Returns: `true` if `obj` has the same value as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `UInt16.Equals` because it does not have to convert the `obj` parameter to an object.

## UInt16.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## UInt16.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `UInt16`.

Returns: The enumerated constant, `TypeCode.UInt16`.

To be added.

## UInt16.IsEvenInteger(UInt16) method

```csharp
public static bool IsEvenInteger (ushort value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt16.IsOddInteger(UInt16) method

```csharp
public static bool IsOddInteger (ushort value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UInt16.IsPow2(UInt16) method

```csharp
public static bool IsPow2 (ushort value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## UInt16.LeadingZeroCount(UInt16) method

```csharp
public static ushort LeadingZeroCount (ushort value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## UInt16.Log10(UInt16) method

```csharp
public static ushort Log10 (ushort value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UInt16.Log2(UInt16) method

```csharp
public static ushort Log2 (ushort value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## UInt16.Max(UInt16, UInt16) method

```csharp
public static ushort Max (ushort x, ushort y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UInt16.Min(UInt16, UInt16) method

```csharp
public static ushort Min (ushort x, ushort y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.
