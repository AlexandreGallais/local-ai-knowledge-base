---
title: "IntPtr struct (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IntPtr struct

Namespace: `System`

```csharp
public readonly struct IntPtr : IComparable<IntPtr>, IEquatable<IntPtr>, IParsable<IntPtr>, ISpanParsable<IntPtr>, IUtf8SpanParsable<IntPtr>, System.Numerics.IAdditionOperators<IntPtr,IntPtr,IntPtr>, System.Numerics.IAdditiveIdentity<IntPtr,IntPtr>, System.Numerics.IBinaryInteger<IntPtr>, System.Numerics.IBinaryNumber<IntPtr>, System.Numerics.IBitwiseOperators<IntPtr,IntPtr,IntPtr>, System.Numerics.IComparisonOperators<IntPtr,IntPtr,bool>, System.Numerics.IDecrementOperators<IntPtr>, System.Numerics.IDivisionOperators<IntPtr,IntPtr,IntPtr>, System.Numerics.IEqualityOperators<IntPtr,IntPtr,bool>, System.Numerics.IIncrementOperators<IntPtr>, System.Numerics.IMinMaxValue<IntPtr>, System.Numerics.IModulusOperators<IntPtr,IntPtr,IntPtr>, System.Numerics.IMultiplicativeIdentity<IntPtr,IntPtr>, System.Numerics.IMultiplyOperators<IntPtr,IntPtr,IntPtr>, System.Numerics.INumber<IntPtr>, System.Numerics.INumberBase<IntPtr>, System.Numerics.IShiftOperators<IntPtr,int,IntPtr>, System.Numerics.ISignedNumber<IntPtr>, System.Numerics.ISubtractionOperators<IntPtr,IntPtr,IntPtr>, System.Numerics.IUnaryNegationOperators<IntPtr,IntPtr>, System.Numerics.IUnaryPlusOperators<IntPtr,IntPtr>, System.Runtime.Serialization.ISerializable
```

Represents a signed integer where the bit-width is the same as a pointer.

#### Remarks

The `IntPtr` type is designed to be an integer whose size is the same as a pointer. That is, an instance of this type is expected to be 32 bits in a 32-bit process and 64 bits in a 64-bit process.

The `IntPtr` type can be used by languages that support pointers and as a common means of referring to data between languages that do and do not support pointers.

`IntPtr` objects can also be used to hold handles. For example, instances of `IntPtr` are used extensively in the `FileStream` class to hold file handles.

> **Note:**
> Using `IntPtr` as a pointer or a handle is error prone and unsafe. It is simply an integer type that can be used as an interchange format for pointers and handles due to being the same size. Outside of specific interchange requirements, such as for passing data to a language that doesn't support pointers, a correctly typed pointer should be used to represent pointers and `SafeHandle` should be used to represent handles.

This type implements the `ISerializable`, `IFormattable`, `IBinaryInteger<T>`, `IMinMaxValue<T>`, and `ISignedNumber<T>` interfaces.

In C# starting from version 9.0, you can use the built-in `nint` type to define native-sized integers. This type is represented by the `IntPtr` type internally and provides operations and conversions that are appropriate for integer types. For more information, see nint and nuint types.

In C# starting from version 11, `nint` is an alias for `IntPtr` in the same way that `int` is an alias for `Int32`.

#### Examples

The following example uses managed pointers to reverse the characters in an array. After it initializes a `String` object and gets its length, it does the following:

1. Calls the `Marshal.StringToHGlobalAnsi` method to copy the Unicode string to unmanaged memory as an ANSI (one-byte) character. The method returns an `IntPtr` object that points to the beginning of the unmanaged string. The Visual Basic <example-value> uses this pointer directly; in the C++, F# and C# examples, it is cast to a pointer to a byte.

2. Calls the `Marshal.AllocHGlobal` method to allocate the same number of bytes as the unmanaged string occupies. The method returns an `IntPtr` object that points to the beginning of the unmanaged block of memory. The Visual Basic <example-value> uses this pointer directly; in the C++, F# and C# examples, it is cast to a pointer to a byte.

3. The Visual Basic <example-value> defines a variable named `offset` that is equal to the length of the ANSI string. It is used to determine the offset into unmanaged memory to which the next character in the ANSI string is copied. Because its starting value is the length of the string, the copy operation will copy a character from the start of the string to the end of the memory block.

The C#, F# and C++ examples call the `IntPtr.ToPointer` method to get an unmanaged pointer to the starting address of the string and the unmanaged block of memory, and they add one less than the length of the string to the starting address of the ANSI string. Because the unmanaged string pointer now points to the end of the string, the copy operation will copy a character from the end of the string to the start of the memory block.

4. Uses a loop to copy each character from the string to the unmanaged block of memory.

The Visual Basic <example-value> calls the `ReadByte` method to read the byte (or one-byte character) at a specified offset from the managed pointer to the ANSI string. The offset is incremented with each iteration of the loop. It then calls the `WriteByte` method to write the byte to the memory address defined by the starting address of the unmanaged block of memory plus `offset`. It then decrements `offset`.

The C#, F# and C++ examples perform the copy operation, then decrement the pointer to the address of the next location in the unmanaged ANSI string and increment the pointer to the next address in the unmanaged block.

5. All examples call the `Marshal.PtrToStringAnsi` to convert the unmanaged memory block containing the copied ANSI string to a managed Unicode `String` object.

6. After displaying the original and reversed strings, all examples call the `Marshal.FreeHGlobal` method to free the memory allocated for the unmanaged ANSI string and the unmanaged block of memory.

_Code sample not included: ~/snippets/csharp/System/IntPtr/ToPointer/topointer.cs._

## IntPtr.IntPtr(Int32) constructor

```csharp
public IntPtr (int value);
```

Initializes a new instance of `IntPtr` using the specified 32-bit signed integer.

Parameters:

- `value`: A 32-bit signed integer.

To be added.

## IntPtr.IntPtr(Int64) constructor

```csharp
public IntPtr (long value);
```

Initializes a new instance of `IntPtr` using the specified 64-bit signed integer.

Parameters:

- `value`: A 64-bit signed integer.

Exceptions:

- `OverflowException`: In a 32-bit process, `value` is too large or too small to represent as an `IntPtr`.

#### Remarks
An exception is only thrown if the value of `value` requires more bits than the executing process supports.

## IntPtr.IntPtr(Void*) constructor

```csharp
public IntPtr (void* value);
```

Initializes a new instance of `IntPtr` using the specified pointer to an unspecified type.

Parameters:

- `value`: A pointer to an unspecified type.

To be added.

## IntPtr.MaxValue property

```csharp
public static IntPtr MaxValue { get; }
```

Gets the largest possible value of `IntPtr`.

Returns: The largest possible value of `IntPtr`.

To be added.

## IntPtr.MinValue property

```csharp
public static IntPtr MinValue { get; }
```

Gets the smallest possible value of `IntPtr`.

Returns: The smallest possible value of `IntPtr`.

To be added.

## IntPtr.Size property

```csharp
public static int Size { get; }
```

Gets the size of this instance.

Returns: The size of a signed integer in the executing process, measured in bytes. The value of this property is 4 in a 32-bit process, and 8 in a 64-bit process. You can define the process type by setting the `/platform` switch when you compile your code with the C# and Visual Basic compilers.

To be added.

## IntPtr.System.Numerics.IAdditiveIdentity<System.IntPtr,System.IntPtr>.AdditiveIdentity property

```csharp
static IntPtr System.Numerics.IAdditiveIdentity<System.IntPtr,System.IntPtr>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.IBinaryNumber<System.IntPtr>.AllBitsSet property

```csharp
static IntPtr System.Numerics.IBinaryNumber<System.IntPtr>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.IMinMaxValue<System.IntPtr>.MaxValue property

```csharp
static IntPtr System.Numerics.IMinMaxValue<System.IntPtr>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.IMinMaxValue<System.IntPtr>.MinValue property

```csharp
static IntPtr System.Numerics.IMinMaxValue<System.IntPtr>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.IMultiplicativeIdentity<System.IntPtr,System.IntPtr>.MultiplicativeIdentity property

```csharp
static IntPtr System.Numerics.IMultiplicativeIdentity<System.IntPtr,System.IntPtr>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.INumberBase<System.IntPtr>.One property

```csharp
static IntPtr System.Numerics.INumberBase<System.IntPtr>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.INumberBase<System.IntPtr>.Radix property

```csharp
static int System.Numerics.INumberBase<System.IntPtr>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.INumberBase<System.IntPtr>.Zero property

```csharp
static IntPtr System.Numerics.INumberBase<System.IntPtr>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.ISignedNumber<System.IntPtr>.NegativeOne property

```csharp
static IntPtr System.Numerics.ISignedNumber<System.IntPtr>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## IntPtr.Abs(IntPtr) method

```csharp
public static IntPtr Abs (IntPtr value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## IntPtr.Add(IntPtr, Int32) method

```csharp
public static IntPtr Add (IntPtr pointer, int offset);
```

Adds an offset to a signed integer.

Parameters:

- `pointer`: The signed integer to add the offset to.
- `offset`: The offset to add.

Returns: A new signed integer that reflects the addition of `offset` to `pointer`.

#### Remarks
The `IntPtr.Add` method does not throw an exception if the result is too large to represent as a signed integer in the executing process. Instead, the addition operation is performed in an unchecked context.

Languages that do not support operator overloading or custom operators can use this method to add an offset to the value of a pointer.

#### Examples
The following example instantiates an `IntPtr` object that points to the beginning of a ten-element array, and then calls the `IntPtr.Add` method to iterate the elements in the array.

_Code sample not included: ~/snippets/csharp/System/IntPtr/Add/add1.cs._

## IntPtr.BigMul(IntPtr, IntPtr, IntPtr) method

```csharp
public static IntPtr BigMul (IntPtr left, IntPtr right, out IntPtr lower);
```

Produces the full product of two unsigned native integers.

Parameters:

- `left`: The integer to multiply with `right`.
- `right`: The integer to multiply with `left`.
- `lower`: The lower half of the full product.

Returns: The upper half of the full product.

To be added.

## IntPtr.Clamp(IntPtr, IntPtr, IntPtr) method

```csharp
public static IntPtr Clamp (IntPtr value, IntPtr min, IntPtr max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## IntPtr.CompareTo(IntPtr) method

```csharp
public int CompareTo (IntPtr value);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `value`: A signed native integer to compare.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

-  Less than zero
:  This instance precedes `value` in the sort order.

-  Zero
:  This instance occurs in the same position in the sort order as `value`.

-  Greater than zero
:  This instance follows `value` in the sort order.

To be added.

## IntPtr.CompareTo(Object) method

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

## IntPtr.CopySign(IntPtr, IntPtr) method

```csharp
public static IntPtr CopySign (IntPtr value, IntPtr sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## IntPtr.CreateChecked<TOther>(TOther) method

```csharp
public static IntPtr CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## IntPtr.CreateSaturating<TOther>(TOther) method

```csharp
public static IntPtr CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.
