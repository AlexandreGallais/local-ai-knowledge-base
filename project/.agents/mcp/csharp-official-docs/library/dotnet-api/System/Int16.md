---
title: "Int16 struct (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int16 struct

Namespace: `System`

```csharp
public readonly struct Int16 : IComparable<short>, IConvertible, IEquatable<short>, IParsable<short>, ISpanParsable<short>, IUtf8SpanParsable<short>, System.Numerics.IAdditionOperators<short,short,short>, System.Numerics.IAdditiveIdentity<short,short>, System.Numerics.IBinaryInteger<short>, System.Numerics.IBinaryNumber<short>, System.Numerics.IBitwiseOperators<short,short,short>, System.Numerics.IComparisonOperators<short,short,bool>, System.Numerics.IDecrementOperators<short>, System.Numerics.IDivisionOperators<short,short,short>, System.Numerics.IEqualityOperators<short,short,bool>, System.Numerics.IIncrementOperators<short>, System.Numerics.IMinMaxValue<short>, System.Numerics.IModulusOperators<short,short,short>, System.Numerics.IMultiplicativeIdentity<short,short>, System.Numerics.IMultiplyOperators<short,short,short>, System.Numerics.INumber<short>, System.Numerics.INumberBase<short>, System.Numerics.IShiftOperators<short,int,short>, System.Numerics.ISignedNumber<short>, System.Numerics.ISubtractionOperators<short,short,short>, System.Numerics.IUnaryNegationOperators<short,short>, System.Numerics.IUnaryPlusOperators<short,short>
```

Represents a 16-bit signed integer.

#### Remarks
The `Int16` value type represents signed integers with values ranging from negative 32768 through positive 32767.

This type provides methods to convert the value of an instance of this type to its string representation, to convert the string representation of a number to an instance of this type, and to compare instances of this type.

You can also call the members of the `Math` class to perform a wide range of numeric operations, including getting the absolute value of a number, calculating the quotient and remainder from integral division, determining the maximum or minimum value of two integers, getting the sign of a number, and rounding a number.

For information about how format specification codes control the string representation of value types, see Formatting Types.

## Int16.System.Numerics.IAdditiveIdentity<System.Int16,System.Int16>.AdditiveIdentity property

```csharp
static short System.Numerics.IAdditiveIdentity<System.Int16,System.Int16>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Int16.System.Numerics.IBinaryNumber<System.Int16>.AllBitsSet property

```csharp
static short System.Numerics.IBinaryNumber<System.Int16>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Int16.System.Numerics.IMinMaxValue<System.Int16>.MaxValue property

```csharp
static short System.Numerics.IMinMaxValue<System.Int16>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Int16.System.Numerics.IMinMaxValue<System.Int16>.MinValue property

```csharp
static short System.Numerics.IMinMaxValue<System.Int16>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Int16.System.Numerics.IMultiplicativeIdentity<System.Int16,System.Int16>.MultiplicativeIdentity property

```csharp
static short System.Numerics.IMultiplicativeIdentity<System.Int16,System.Int16>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.One property

```csharp
static short System.Numerics.INumberBase<System.Int16>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Int16>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.Zero property

```csharp
static short System.Numerics.INumberBase<System.Int16>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Int16.System.Numerics.ISignedNumber<System.Int16>.NegativeOne property

```csharp
static short System.Numerics.ISignedNumber<System.Int16>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Int16.Abs(Int16) method

```csharp
public static short Abs (short value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Int16.Clamp(Int16, Int16, Int16) method

```csharp
public static short Clamp (short value, short min, short max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Int16.CompareTo(Int16) method

```csharp
public int CompareTo (short value);
```

Compares this instance to a specified 16-bit signed integer and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified 16-bit signed integer.

Parameters:

- `value`: An integer to compare.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `Int16.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `Int16.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following code example demonstrates generic and nongeneric versions of the `Int16.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Int16.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the object.

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

- `ArgumentException`: `value` is not an `Int16`.

#### Remarks
An `Int16`, regardless of its value, is considered greater than a null reference.

The `value` parameter must be `null` or an instance of `Int16`; otherwise, an exception is thrown.

## Int16.CopySign(Int16, Int16) method

```csharp
public static short CopySign (short value, short sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Int16.CreateChecked<TOther>(TOther) method

```csharp
public static short CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Int16.CreateSaturating<TOther>(TOther) method

```csharp
public static short CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Int16.CreateTruncating<TOther>(TOther) method

```csharp
public static short CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Int16.DivRem(Int16, Int16) method

```csharp
public static (short Quotient, short Remainder) DivRem (short left, short right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Int16.Equals(Int16) method

```csharp
public bool Equals (short obj);
```

Returns a value indicating whether this instance is equal to a specified `Int16` value.

Parameters:

- `obj`: An `Int16` value to compare to this instance.

Returns: `true` if `obj` has the same value as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `Int16.Equals` because it does not have to convert the `obj` parameter to an object.

## Int16.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare to this instance.

Returns: `true` if `obj` is an instance of `Int16` and equals the value of this instance; otherwise, `false`.

#### Examples
The following code example illustrates the use of `Equals` in the context of `Int16`, comparing two short values and returning `true` if they represent the same number, or `false` if they do not.

_Code sample not included: ~/snippets/csharp/System/Int16/Equals/int16_equals.cs._

## Int16.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Int16.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Int16`.

Returns: The enumerated constant, `TypeCode.Int16`.

To be added.

## Int16.IsEvenInteger(Int16) method

```csharp
public static bool IsEvenInteger (short value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Int16.IsNegative(Int16) method

```csharp
public static bool IsNegative (short value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Int16.IsOddInteger(Int16) method

```csharp
public static bool IsOddInteger (short value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Int16.IsPositive(Int16) method

```csharp
public static bool IsPositive (short value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Int16.IsPow2(Int16) method

```csharp
public static bool IsPow2 (short value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Int16.LeadingZeroCount(Int16) method

```csharp
public static short LeadingZeroCount (short value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## Int16.Log10(Int16) method

```csharp
public static short Log10 (short value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Int16.Log2(Int16) method

```csharp
public static short Log2 (short value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.
