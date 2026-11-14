---
title: "UIntPtr struct (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UIntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UIntPtr struct

Namespace: `System`

```csharp
public readonly struct UIntPtr : IComparable<UIntPtr>, IEquatable<UIntPtr>, IParsable<UIntPtr>, ISpanParsable<UIntPtr>, IUtf8SpanParsable<UIntPtr>, System.Numerics.IAdditionOperators<UIntPtr,UIntPtr,UIntPtr>, System.Numerics.IAdditiveIdentity<UIntPtr,UIntPtr>, System.Numerics.IBinaryInteger<UIntPtr>, System.Numerics.IBinaryNumber<UIntPtr>, System.Numerics.IBitwiseOperators<UIntPtr,UIntPtr,UIntPtr>, System.Numerics.IComparisonOperators<UIntPtr,UIntPtr,bool>, System.Numerics.IDecrementOperators<UIntPtr>, System.Numerics.IDivisionOperators<UIntPtr,UIntPtr,UIntPtr>, System.Numerics.IEqualityOperators<UIntPtr,UIntPtr,bool>, System.Numerics.IIncrementOperators<UIntPtr>, System.Numerics.IMinMaxValue<UIntPtr>, System.Numerics.IModulusOperators<UIntPtr,UIntPtr,UIntPtr>, System.Numerics.IMultiplicativeIdentity<UIntPtr,UIntPtr>, System.Numerics.IMultiplyOperators<UIntPtr,UIntPtr,UIntPtr>, System.Numerics.INumber<UIntPtr>, System.Numerics.INumberBase<UIntPtr>, System.Numerics.IShiftOperators<UIntPtr,int,UIntPtr>, System.Numerics.ISubtractionOperators<UIntPtr,UIntPtr,UIntPtr>, System.Numerics.IUnaryNegationOperators<UIntPtr,UIntPtr>, System.Numerics.IUnaryPlusOperators<UIntPtr,UIntPtr>, System.Numerics.IUnsignedNumber<UIntPtr>, System.Runtime.Serialization.ISerializable
```

Represents an unsigned integer where the bit-width is the same as a pointer.

#### Remarks

The `UIntPtr` type is designed to be an integer whose size is the same as a pointer. That is, an instance of this type is expected to be 32-bits in a 32-bit process and 64-bits in a 64-bit process.

The `UIntPtr` type can be used by languages that support pointers, and as a common means of referring to data between languages that do and do not support pointers. `UIntPtr` objects can also be used to hold handles.

> **Note:**
> Using `UIntPtr` as a pointer or a handle is error prone and unsafe. It is simply an integer type that can be used as an interchange format for pointers and handles due to being the same size. Outside of specific interchange requirements, such as for passing data to a language that doesn't support pointers, a correctly typed pointer should be used to represent pointers and `SafeHandle` should be used to represent handles.

This type implements the `ISerializable` and `IFormattable` interfaces. This type also implements the `IBinaryInteger<T>`, `IMinMaxValue<T>`, and `IUnsignedNumber<T>` interfaces.

In C# starting from version 9.0, you can use the built-in `nuint` type to define native-sized integers. This type is represented by the `UIntPtr` type internally and provides operations and conversions that are appropriate for integer types. For more information, see nint and nuint types.

In C# starting from version 11, `nuint` is an alias for `UIntPtr` in the same way that `uint` is an alias for `UInt32`.

## UIntPtr.UIntPtr(UInt32) constructor

```csharp
public UIntPtr (uint value);
```

Initializes a new instance of the `UIntPtr` structure using the specified 32-bit unsigned integer.

Parameters:

- `value`: A 32-bit unsigned integer.

To be added.

## UIntPtr.UIntPtr(UInt64) constructor

```csharp
public UIntPtr (ulong value);
```

Initializes a new instance of `UIntPtr` using the specified 64-bit unsigned integer.

Parameters:

- `value`: A 64-bit unsigned integer.

Exceptions:

- `OverflowException`: In a 32-bit process, `value` is too large to represent as an `UIntPtr`.

#### Remarks
An exception is only thrown if the value of `value` requires more bits than the executing process supports.

## UIntPtr.UIntPtr(Void*) constructor

```csharp
public UIntPtr (void* value);
```

Initializes a new instance of `UIntPtr` using the specified pointer to an unspecified type.

Parameters:

- `value`: A pointer to an unspecified type.

To be added.

## UIntPtr.MaxValue property

```csharp
public static UIntPtr MaxValue { get; }
```

Represents the largest possible value of `UIntPtr`.

Returns: The largest possible value of `UIntPtr`.

To be added.

## UIntPtr.MinValue property

```csharp
public static UIntPtr MinValue { get; }
```

Represents the smallest possible value of `UIntPtr`.

Returns: The smallest possible value of `UIntPtr`.

To be added.

## UIntPtr.Size property

```csharp
public static int Size { get; }
```

Gets the size of this instance.

Returns: The size of an unsigned integer in the executing process, measured in bytes. The value of this property is 4 in a 32-bit process, and 8 in a 64-bit process. You can define the process type by setting the `/platform` switch when you compile your code with the C# and Visual Basic compilers.

To be added.

## UIntPtr.System.Numerics.IAdditiveIdentity<System.UIntPtr,System.UIntPtr>.AdditiveIdentity property

```csharp
static UIntPtr System.Numerics.IAdditiveIdentity<System.UIntPtr,System.UIntPtr>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IBinaryNumber<System.UIntPtr>.AllBitsSet property

```csharp
static UIntPtr System.Numerics.IBinaryNumber<System.UIntPtr>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IMinMaxValue<System.UIntPtr>.MaxValue property

```csharp
static UIntPtr System.Numerics.IMinMaxValue<System.UIntPtr>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IMinMaxValue<System.UIntPtr>.MinValue property

```csharp
static UIntPtr System.Numerics.IMinMaxValue<System.UIntPtr>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IMultiplicativeIdentity<System.UIntPtr,System.UIntPtr>.MultiplicativeIdentity property

```csharp
static UIntPtr System.Numerics.IMultiplicativeIdentity<System.UIntPtr,System.UIntPtr>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.One property

```csharp
static UIntPtr System.Numerics.INumberBase<System.UIntPtr>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.Radix property

```csharp
static int System.Numerics.INumberBase<System.UIntPtr>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.Zero property

```csharp
static UIntPtr System.Numerics.INumberBase<System.UIntPtr>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## UIntPtr.Add(UIntPtr, Int32) method

```csharp
public static UIntPtr Add (UIntPtr pointer, int offset);
```

Adds an offset to an unsigned integer.

Parameters:

- `pointer`: The unsigned integer to add the offset to.
- `offset`: The offset to add.

Returns: A new unsigned integer that reflects the addition of `offset` to `pointer`.

#### Remarks
The `UIntPtr.Add` method does not throw an exception if the result is too large to represent as an unsigned integer in the executing process. Instead, the addition operation is performed in an unchecked context.

Languages that do not support operator overloading or custom operators can use this method to add an offset to the value of a pointer.

#### Examples
The following example instantiates a `UIntPtr` object that points to the beginning of a ten-element array, and then calls the `UIntPtr.Add` method to iterate the elements in the array.

_Code sample not included: ~/snippets/csharp/System/UIntPtr/Add/add1.cs._

## UIntPtr.BigMul(UIntPtr, UIntPtr, UIntPtr) method

```csharp
public static UIntPtr BigMul (UIntPtr left, UIntPtr right, out UIntPtr lower);
```

Produces the full product of two unsigned native integers.

Parameters:

- `left`: The integer to multiply with `right`.
- `right`: The integer to multiply with `left`.
- `lower`: The lower half of the full product.

Returns: The upper half of the full product.

To be added.

## UIntPtr.Clamp(UIntPtr, UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Clamp (UIntPtr value, UIntPtr min, UIntPtr max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## UIntPtr.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `value`: An object to compare, or `null`.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

-  Less than zero
:  This instance precedes `value` in the sort order.

-  Zero
:  This instance occurs in the same position in the sort order as `value`.

-  Greater than zero
:  This instance follows `value` in the sort order.

To be added.

## UIntPtr.CompareTo(UIntPtr) method

```csharp
public int CompareTo (UIntPtr value);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `value`: An unsigned native integer to compare.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

-  Less than zero
:  This instance precedes `value` in the sort order.

-  Zero
:  This instance occurs in the same position in the sort order as `value`.

-  Greater than zero
:  This instance follows `value` in the sort order.

To be added.

## UIntPtr.CreateChecked<TOther>(TOther) method

```csharp
public static UIntPtr CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## UIntPtr.CreateSaturating<TOther>(TOther) method

```csharp
public static UIntPtr CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## UIntPtr.CreateTruncating<TOther>(TOther) method

```csharp
public static UIntPtr CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## UIntPtr.DivRem(UIntPtr, UIntPtr) method

```csharp
public static (UIntPtr Quotient, UIntPtr Remainder) DivRem (UIntPtr left, UIntPtr right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## UIntPtr.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance or `null`.

Returns: `true` if `obj` is an instance of `UIntPtr` and equals the value of this instance; otherwise, `false`.

To be added.

## UIntPtr.Equals(UIntPtr) method

```csharp
public bool Equals (UIntPtr other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to the `other` parameter; otherwise, `false`.

To be added.

## UIntPtr.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## UIntPtr.IsEvenInteger(UIntPtr) method

```csharp
public static bool IsEvenInteger (UIntPtr value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UIntPtr.IsOddInteger(UIntPtr) method

```csharp
public static bool IsOddInteger (UIntPtr value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## UIntPtr.IsPow2(UIntPtr) method

```csharp
public static bool IsPow2 (UIntPtr value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## UIntPtr.LeadingZeroCount(UIntPtr) method

```csharp
public static UIntPtr LeadingZeroCount (UIntPtr value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.
