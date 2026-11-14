---
title: "Byte struct (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Byte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Byte struct

Namespace: `System`

```csharp
public readonly struct Byte : IComparable<byte>, IConvertible, IEquatable<byte>, IParsable<byte>, ISpanParsable<byte>, IUtf8SpanParsable<byte>, System.Numerics.IAdditionOperators<byte,byte,byte>, System.Numerics.IAdditiveIdentity<byte,byte>, System.Numerics.IBinaryInteger<byte>, System.Numerics.IBinaryNumber<byte>, System.Numerics.IBitwiseOperators<byte,byte,byte>, System.Numerics.IComparisonOperators<byte,byte,bool>, System.Numerics.IDecrementOperators<byte>, System.Numerics.IDivisionOperators<byte,byte,byte>, System.Numerics.IEqualityOperators<byte,byte,bool>, System.Numerics.IIncrementOperators<byte>, System.Numerics.IMinMaxValue<byte>, System.Numerics.IModulusOperators<byte,byte,byte>, System.Numerics.IMultiplicativeIdentity<byte,byte>, System.Numerics.IMultiplyOperators<byte,byte,byte>, System.Numerics.INumber<byte>, System.Numerics.INumberBase<byte>, System.Numerics.IShiftOperators<byte,int,byte>, System.Numerics.ISubtractionOperators<byte,byte,byte>, System.Numerics.IUnaryNegationOperators<byte,byte>, System.Numerics.IUnaryPlusOperators<byte,byte>, System.Numerics.IUnsignedNumber<byte>
```

Represents an 8-bit unsigned integer.

`Byte` is an immutable value type that represents unsigned integers with values that range from 0 (which is represented by the `MinValue` constant) to 255 (which is represented by the `MaxValue` constant). .NET also includes a signed 8-bit integer value type, `SByte`, which represents values that range from -128 to 127.

#### Instantiate a Byte value

You can instantiate a `Byte` value in several ways:

- You can declare a `Byte` variable and assign it a literal integer value that is within the range of the `Byte` data type. The following example declares two `Byte` variables and assigns them values in this way.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/byteinstantiation1.cs._

- You can assign a non-byte numeric value to a byte. This is a narrowing conversion, so it requires a cast operator in C# and F#, or a conversion method in Visual Basic if `Option Strict` is on. If the non-byte value is a `Single`, `Double`, or `Decimal` value that includes a fractional component, the handling of its fractional part depends on the compiler performing the conversion. The following example assigns several numeric values to `Byte` variables.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/byteinstantiation1.cs._

- You can call a method of the `Convert` class to convert any supported type to a `Byte` value. This is possible because `Byte` supports the `IConvertible` interface. The following example illustrates the conversion of an array of `Int32` values to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

- You can call the `Byte.Parse` or `Byte.TryParse` method to convert the string representation of a `Byte` value to a `Byte`. The string can contain either decimal or hexadecimal digits. The following example illustrates the parse operation by using both a decimal and a hexadecimal string.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/byteinstantiation1.cs._

#### Perform operations on Byte values

The `Byte` type supports standard mathematical operations such as addition, subtraction, division, multiplication, subtraction, negation, and unary negation. Like the other integral types, the `Byte` type also supports the bitwise `AND`, `OR`, `XOR`, left shift, and right shift operators.

You can use the standard numeric operators to compare two `Byte` values, or you can call the `Byte.CompareTo` or `Byte.Equals` method.

You can also call the members of the `Math` class to perform a wide range of numeric operations, including getting the absolute value of a number, calculating the quotient and remainder from integral division, determining the maximum or minimum value of two integers, getting the sign of a number, and rounding a number.

#### Represent a Byte as a String

The `Byte` type provides full support for standard and custom numeric format strings. (For more information, see Formatting Types, Standard Numeric Format Strings, and Custom Numeric Format Strings.) However, most commonly, byte values are represented as one-digit to three-digit values without any additional formatting, or as two-digit hexadecimal values.

To format a `Byte` value as an integral string with no leading zeros, you can call the parameterless `ToString` method. By using the "D" format specifier, you can also include a specified number of leading zeros in the string representation. By using the "X" format specifier, you can represent a `Byte` value as a hexadecimal string. The following example formats the elements in an array of `Byte` values in these three ways.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/formatting1.cs._

You can also format a `Byte` value as a binary, octal, decimal, or hexadecimal string by calling the `ToString` method and supplying the base as the method's second parameter. The following example calls this method to display the binary, octal, and hexadecimal representations of an array of byte values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/formatting1.cs._

#### Work with non-decimal Byte values

In addition to working with individual bytes as decimal values, you might want to perform bitwise operations with byte values, or work with byte arrays or with the binary or hexadecimal representations of byte values. For example, overloads of the `BitConverter.GetBytes` method can convert each of the primitive data types to a byte array, and the `BigInteger.ToByteArray` method converts a `BigInteger` value to a byte array.

`Byte` values are represented in 8 bits by their magnitude only, without a sign bit. This is important to keep in mind when you perform bitwise operations on `Byte` values or when you work with individual bits. To perform a numeric, Boolean, or comparison operation on any two non-decimal values, both values must use the same representation.

When an operation is performed on two `Byte` values, the values share the same representation, so the result is accurate. This is illustrated in the following example, which masks the lowest-order bit of a `Byte` value to ensure that it is even.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/bitwise1.cs._

On the other hand, when you work with both unsigned and signed bits, bitwise operations are complicated by the fact that the `SByte` values use sign-and-magnitude representation for positive values, and two's complement representation for negative values. In order to perform a meaningful bitwise operation, the values must be converted to two equivalent representations, and information about the sign bit must be preserved. The following example does this to mask out bits 2 and 4 of an array of 8-bit signed and unsigned values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/bitwise2.cs._

## Byte.System.Numerics.IAdditiveIdentity<System.Byte,System.Byte>.AdditiveIdentity property

```csharp
static byte System.Numerics.IAdditiveIdentity<System.Byte,System.Byte>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Byte.System.Numerics.IBinaryNumber<System.Byte>.AllBitsSet property

```csharp
static byte System.Numerics.IBinaryNumber<System.Byte>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Byte.System.Numerics.IMinMaxValue<System.Byte>.MaxValue property

```csharp
static byte System.Numerics.IMinMaxValue<System.Byte>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Byte.System.Numerics.IMinMaxValue<System.Byte>.MinValue property

```csharp
static byte System.Numerics.IMinMaxValue<System.Byte>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Byte.System.Numerics.IMultiplicativeIdentity<System.Byte,System.Byte>.MultiplicativeIdentity property

```csharp
static byte System.Numerics.IMultiplicativeIdentity<System.Byte,System.Byte>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.One property

```csharp
static byte System.Numerics.INumberBase<System.Byte>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Byte>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.Zero property

```csharp
static byte System.Numerics.INumberBase<System.Byte>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Byte.Clamp(Byte, Byte, Byte) method

```csharp
public static byte Clamp (byte value, byte min, byte max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Byte.CompareTo(Byte) method

```csharp
public int CompareTo (byte value);
```

Compares this instance to a specified 8-bit unsigned integer and returns an indication of their relative values.

Parameters:

- `value`: An 8-bit unsigned integer to compare.

Returns: A signed integer that indicates the relative order of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `Byte.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32`, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following code example demonstrates generic and non-generic versions of the `CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Byte.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an indication of their relative values.

Parameters:

- `value`: An object to compare, or `null`.

Returns: A signed integer that indicates the relative order of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`, or `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `Byte`.

#### Remarks
`value` must be `null` or an instance of `Byte`; otherwise, an exception is thrown.

Any instance of `Byte`, regardless of its value, is considered greater than `null`.

This method is implemented to support the `IComparable` interface.

#### Examples
The following code example demonstrates the `Byte.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/Byte/CompareTo/systembyte.cs._

## Byte.CreateChecked<TOther>(TOther) method

```csharp
public static byte CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Byte.CreateSaturating<TOther>(TOther) method

```csharp
public static byte CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Byte.CreateTruncating<TOther>(TOther) method

```csharp
public static byte CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Byte.DivRem(Byte, Byte) method

```csharp
public static (byte Quotient, byte Remainder) DivRem (byte left, byte right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Byte.Equals(Byte) method

```csharp
public bool Equals (byte obj);
```

Returns a value indicating whether this instance and a specified `Byte` object represent the same value.

Parameters:

- `obj`: An object to compare to this instance.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `Equals` because it does not have to convert the `obj` parameter to an object.
