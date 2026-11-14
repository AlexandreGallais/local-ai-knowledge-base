---
title: "Int64 struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct

Namespace: `System`

```csharp
public readonly struct Int64 : IComparable<long>, IConvertible, IEquatable<long>, IParsable<long>, ISpanParsable<long>, IUtf8SpanParsable<long>, System.Numerics.IAdditionOperators<long,long,long>, System.Numerics.IAdditiveIdentity<long,long>, System.Numerics.IBinaryInteger<long>, System.Numerics.IBinaryNumber<long>, System.Numerics.IBitwiseOperators<long,long,long>, System.Numerics.IComparisonOperators<long,long,bool>, System.Numerics.IDecrementOperators<long>, System.Numerics.IDivisionOperators<long,long,long>, System.Numerics.IEqualityOperators<long,long,bool>, System.Numerics.IIncrementOperators<long>, System.Numerics.IMinMaxValue<long>, System.Numerics.IModulusOperators<long,long,long>, System.Numerics.IMultiplicativeIdentity<long,long>, System.Numerics.IMultiplyOperators<long,long,long>, System.Numerics.INumber<long>, System.Numerics.INumberBase<long>, System.Numerics.IShiftOperators<long,int,long>, System.Numerics.ISignedNumber<long>, System.Numerics.ISubtractionOperators<long,long,long>, System.Numerics.IUnaryNegationOperators<long,long>, System.Numerics.IUnaryPlusOperators<long,long>
```

Represents a 64-bit signed integer.

`Int64` is an immutable value type that represents signed integers with values that range from negative 9,223,372,036,854,775,808 (which is represented by the `MinValue` constant) through positive 9,223,372,036,854,775,807 (which is represented by the `MaxValue` constant). .NET also includes an unsigned 64-bit integer value type, `UInt64`, which represents values that range from 0 to 18,446,744,073,709,551,615.

#### Instantiate an Int64 value

You can instantiate an `Int64` value in several ways:

- You can declare an `Int64` variable and assign it a literal integer value that is within the range of the `Int64` data type. The following example declares two `Int64` variables and assigns them values in this way.

_Code sample not included: ~/snippets/csharp/System/Int64/Overview/instantiate1.cs._

- You can assign the value of an integral type whose range is a subset of the `Int64` type. This is a widening conversion that does not require a cast operator in C# or a conversion method in Visual Basic. In F#, only the `Int32` type can be widened automatically.

_Code sample not included: ~/snippets/csharp/System/Int64/Overview/instantiate1.cs._

- You can assign the value of a numeric type whose range exceeds that of the `Int64` type. This is a narrowing conversion, so it requires a cast operator in C# or F# and a conversion method in Visual Basic if `Option Strict` is on. If the numeric value is a `Single`, `Double`, or `Decimal` value that includes a fractional component, the handling of its fractional part depends on the compiler performing the conversion. The following example performs narrowing conversions to assign several numeric values to `Int64` variables.

_Code sample not included: ~/snippets/csharp/System/Int64/Overview/instantiate1.cs._

- You can call a method of the `Convert` class to convert any supported type to an `Int64` value. This is possible because `Int64` supports the `IConvertible` interface. The following example illustrates the conversion of an array of `Decimal` values to `Int64` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

- You can call the `Int64.Parse` or `Int64.TryParse` method to convert the string representation of an `Int64` value to an `Int64`. The string can contain either decimal or hexadecimal digits. The following example illustrates the parse operation by using both a decimal and a hexadecimal string.

_Code sample not included: ~/snippets/csharp/System/Int64/Overview/instantiate1.cs._

#### Perform operations on Int64 values

The `Int64` type supports standard mathematical operations such as addition, subtraction, division, multiplication, negation, and unary negation. Like the other integral types, the `Int64` type also supports the bitwise `AND`, `OR`, `XOR`, left shift, and right shift operators.

You can use the standard numeric operators to compare two `Int64` values, or you can call the `Int64.CompareTo` or `Int64.Equals` method.

You can also call the members of the `Math` class to perform a wide range of numeric operations, including getting the absolute value of a number, calculating the quotient and remainder from integral division, determining the maximum or minimum value of two long integers, getting the sign of a number, and rounding a number.

#### Represent an Int64 as a string

The `Int64` type provides full support for standard and custom numeric format strings. (For more information, see Formatting Types, Standard Numeric Format Strings, and Custom Numeric Format Strings.)

To format an `Int64` value as an integral string with no leading zeros, you can call the parameterless `ToString` method. By using the "D" format specifier, you can also include a specified number of leading zeros in the string representation. By using the "N" format specifier, you can include group separators and specify the number of decimal digits to appear in the string representation of the number. By using the "X" format specifier, you can represent an `Int64` value as a hexadecimal string. The following example formats the elements in an array of `Int64` values in these four ways.

_Code sample not included: ~/snippets/csharp/System/Int64/Overview/formatting1.cs._

You can also format an `Int64` value as a binary, octal, decimal, or hexadecimal string by calling the `ToString` method and supplying the base as the method's second parameter. The following example calls this method to display the binary, octal, and hexadecimal representations of an array of integer values.

_Code sample not included: ~/snippets/csharp/System/Int64/Overview/formatting1.cs._

#### Work with non-decimal 64-bit integer values

In addition to working with individual long integers as decimal values, you might want to perform bitwise operations or work with the binary or hexadecimal representations of long integer values. `Int64` values are represented in 63 bits, with the sixty-fourth bit used as a sign bit. Positive values are represented by using sign-and-magnitude representation. Negative values are in two's complement representation. This is important to keep in mind when you perform bitwise operations on `Int64` values or when you work with individual bits. To perform a numeric, Boolean, or comparison operation on any two non-decimal values, both values must use the same representation.

## Int64.System.Numerics.IAdditiveIdentity<System.Int64,System.Int64>.AdditiveIdentity property

```csharp
static long System.Numerics.IAdditiveIdentity<System.Int64,System.Int64>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Int64.System.Numerics.IBinaryNumber<System.Int64>.AllBitsSet property

```csharp
static long System.Numerics.IBinaryNumber<System.Int64>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Int64.System.Numerics.IMinMaxValue<System.Int64>.MaxValue property

```csharp
static long System.Numerics.IMinMaxValue<System.Int64>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Int64.System.Numerics.IMinMaxValue<System.Int64>.MinValue property

```csharp
static long System.Numerics.IMinMaxValue<System.Int64>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Int64.System.Numerics.IMultiplicativeIdentity<System.Int64,System.Int64>.MultiplicativeIdentity property

```csharp
static long System.Numerics.IMultiplicativeIdentity<System.Int64,System.Int64>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.One property

```csharp
static long System.Numerics.INumberBase<System.Int64>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Int64>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.Zero property

```csharp
static long System.Numerics.INumberBase<System.Int64>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Int64.System.Numerics.ISignedNumber<System.Int64>.NegativeOne property

```csharp
static long System.Numerics.ISignedNumber<System.Int64>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Int64.Abs(Int64) method

```csharp
public static long Abs (long value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Int64.BigMul(Int64, Int64) method

```csharp
public static Int128 BigMul (long left, long right);
```

Produces the full product of two 64-bit numbers.

Parameters:

- `left`: The first number to multiply.
- `right`: The second number to multiply.

Returns: The number containing the product of the specified numbers.

To be added.

## Int64.Clamp(Int64, Int64, Int64) method

```csharp
public static long Clamp (long value, long min, long max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Int64.CompareTo(Int64) method

```csharp
public int CompareTo (long value);
```

Compares this instance to a specified 64-bit signed integer and returns an indication of their relative values.

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
This method implements the `IComparable<T>` interface and performs slightly better than the `Int64.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `Int64.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following code example demonstrates generic and nongeneric versions of the `Int64.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Int64.CompareTo(Object) method

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

- `ArgumentException`: `value` is not an `Int64`.

#### Remarks
An `Int64`, regardless of its value, is considered greater than a null reference.

The `value` parameter must be `null` or an instance of `Int64`; otherwise, an exception is thrown.

## Int64.CopySign(Int64, Int64) method

```csharp
public static long CopySign (long value, long sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Int64.CreateChecked<TOther>(TOther) method

```csharp
public static long CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Int64.CreateSaturating<TOther>(TOther) method

```csharp
public static long CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Int64.CreateTruncating<TOther>(TOther) method

```csharp
public static long CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Int64.DivRem(Int64, Int64) method

```csharp
public static (long Quotient, long Remainder) DivRem (long left, long right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.
- `OverflowException`: `left` is <see cref="F:System.Int64.MinValue">Int64.MinValue</see> and `right` is -1.

To be added.
