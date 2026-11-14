---
title: "Int32 struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int32 struct

Namespace: `System`

```csharp
public readonly struct Int32 : IComparable<int>, IConvertible, IEquatable<int>, IParsable<int>, ISpanParsable<int>, IUtf8SpanParsable<int>, System.Numerics.IAdditionOperators<int,int,int>, System.Numerics.IAdditiveIdentity<int,int>, System.Numerics.IBinaryInteger<int>, System.Numerics.IBinaryNumber<int>, System.Numerics.IBitwiseOperators<int,int,int>, System.Numerics.IComparisonOperators<int,int,bool>, System.Numerics.IDecrementOperators<int>, System.Numerics.IDivisionOperators<int,int,int>, System.Numerics.IEqualityOperators<int,int,bool>, System.Numerics.IIncrementOperators<int>, System.Numerics.IMinMaxValue<int>, System.Numerics.IModulusOperators<int,int,int>, System.Numerics.IMultiplicativeIdentity<int,int>, System.Numerics.IMultiplyOperators<int,int,int>, System.Numerics.INumber<int>, System.Numerics.INumberBase<int>, System.Numerics.IShiftOperators<int,int,int>, System.Numerics.ISignedNumber<int>, System.Numerics.ISubtractionOperators<int,int,int>, System.Numerics.IUnaryNegationOperators<int,int>, System.Numerics.IUnaryPlusOperators<int,int>
```

Represents a 32-bit signed integer.

`Int32` is an immutable value type that represents signed integers with values that range from negative 2,147,483,648 (which is represented by the `MinValue` constant) through positive 2,147,483,647 (which is represented by the `MaxValue` constant). .NET also includes an unsigned 32-bit integer value type, `UInt32`, which represents values that range from 0 to 4,294,967,295.

#### Instantiate an Int32 value

You can instantiate an `Int32` value in several ways:

- You can declare an `Int32` variable and assign it a literal integer value that is within the range of the `Int32` data type. The following example declares two `Int32` variables and assigns them values in this way.

_Code sample not included: ~/snippets/csharp/System/Int32/Overview/Instantiate1.cs._

- You can assign the value of an integer type whose range is a subset of the `Int32` type. This is a widening conversion that does not require a cast operator in C# or a conversion method in Visual Basic but does require one in F#.

_Code sample not included: ~/snippets/csharp/System/Int32/Overview/Instantiate1.cs._

- You can assign the value of a numeric type whose range exceeds that of the `Int32` type. This is a narrowing conversion, so it requires a cast operator in C# or F#, and a conversion method in Visual Basic if `Option Strict` is on. If the numeric value is a `Single`, `Double`, or `Decimal` value that includes a fractional component, the handling of its fractional part depends on the compiler performing the conversion. The following example performs narrowing conversions to assign several numeric values to `Int32` variables.

_Code sample not included: ~/snippets/csharp/System/Int32/Overview/Instantiate1.cs._

- You can call a method of the `Convert` class to convert any supported type to an `Int32` value. This is possible because `Int32` supports the `IConvertible` interface. The following example illustrates the conversion of an array of `Decimal` values to `Int32` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

- You can call the `Int32.Parse` or `Int32.TryParse` method to convert the string representation of an `Int32` value to an `Int32`. The string can contain either decimal or hexadecimal digits. The following example illustrates the parse operation by using both a decimal and a hexadecimal string.

_Code sample not included: ~/snippets/csharp/System/Int32/Overview/Instantiate1.cs._

#### Perform operations on Int32 values

The `Int32` type supports standard mathematical operations such as addition, subtraction, division, multiplication, negation, and unary negation. Like the other integral types, the `Int32` type also supports the bitwise `AND`, `OR`, `XOR`, left shift, and right shift operators.

You can use the standard numeric operators to compare two `Int32` values, or you can call the `Int32.CompareTo` or `Int32.Equals` method.

You can also call the members of the `Math` class to perform a wide range of numeric operations, including getting the absolute value of a number, calculating the quotient and remainder from integral division, determining the maximum or minimum value of two integers, getting the sign of a number, and rounding a number.

#### Represent an Int32 as a string

The `Int32` type provides full support for standard and custom numeric format strings. (For more information, see Formatting Types, Standard Numeric Format Strings, and Custom Numeric Format Strings.)

To format an `Int32` value as an integral string with no leading zeros, you can call the parameterless `ToString` method. By using the "D" format specifier, you can also include a specified number of leading zeros in the string representation. By using the "N" format specifier, you can include group separators and specify the number of decimal digits to appear in the string representation of the number. By using the "X" format specifier, you can represent an `Int32` value as a hexadecimal string. The following example formats the elements in an array of `Int32` values in these four ways.

_Code sample not included: ~/snippets/csharp/System/Int32/Overview/Formatting1.cs._

You can also format an `Int32` value as a binary, octal, decimal, or hexadecimal string by calling the `ToString` method and supplying the base as the method's second parameter. The following example calls this method to display the binary, octal, and hexadecimal representations of an array of integer values.

_Code sample not included: ~/snippets/csharp/System/Int32/Overview/Formatting1.cs._

#### Work with non-decimal 32-bit integer values

In addition to working with individual integers as decimal values, you may want to perform bitwise operations with integer values, or work with the binary or hexadecimal representations of integer values. `Int32` values are represented in 31 bits, with the thirty-second bit used as a sign bit. Positive values are represented by using sign-and-magnitude representation. Negative values are in two's complement representation. This is important to keep in mind when you perform bitwise operations on `Int32` values or when you work with individual bits. In order to perform a numeric, Boolean, or comparison operation on any two non-decimal values, both values must use the same representation.

## Int32.System.Numerics.IAdditiveIdentity<System.Int32,System.Int32>.AdditiveIdentity property

```csharp
static int System.Numerics.IAdditiveIdentity<System.Int32,System.Int32>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Int32.System.Numerics.IBinaryNumber<System.Int32>.AllBitsSet property

```csharp
static int System.Numerics.IBinaryNumber<System.Int32>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Int32.System.Numerics.IMinMaxValue<System.Int32>.MaxValue property

```csharp
static int System.Numerics.IMinMaxValue<System.Int32>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Int32.System.Numerics.IMinMaxValue<System.Int32>.MinValue property

```csharp
static int System.Numerics.IMinMaxValue<System.Int32>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Int32.System.Numerics.IMultiplicativeIdentity<System.Int32,System.Int32>.MultiplicativeIdentity property

```csharp
static int System.Numerics.IMultiplicativeIdentity<System.Int32,System.Int32>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.One property

```csharp
static int System.Numerics.INumberBase<System.Int32>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Int32>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.Zero property

```csharp
static int System.Numerics.INumberBase<System.Int32>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Int32.System.Numerics.ISignedNumber<System.Int32>.NegativeOne property

```csharp
static int System.Numerics.ISignedNumber<System.Int32>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Int32.Abs(Int32) method

```csharp
public static int Abs (int value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Int32.BigMul(Int32, Int32) method

```csharp
public static long BigMul (int left, int right);
```

Produces the full product of two 32-bit numbers.

Parameters:

- `left`: The first number to multiply.
- `right`: The second number to multiply.

Returns: The number containing the product of the specified numbers.

To be added.

## Int32.Clamp(Int32, Int32, Int32) method

```csharp
public static int Clamp (int value, int min, int max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Int32.CompareTo(Int32) method

```csharp
public int CompareTo (int value);
```

Compares this instance to a specified 32-bit signed integer and returns an indication of their relative values.

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
This method implements the `IComparable<T>` interface and performs slightly better than the `Int32.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `Int32.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32`, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following example demonstrates the `CompareTo` method. In addition to displaying the value returned by the method for four different comparisons, it converts the return value to a member of the custom `Comparison` enumeration, whose value it also displays.

_Code sample not included: ~/snippets/csharp/System/Int32/CompareTo/CompareTo1.cs._

## Int32.CompareTo(Object) method

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

- `ArgumentException`: `value` is not an `Int32`.

#### Remarks
Any instance of `Int32`, regardless of its value, is considered greater than `null`.

`value` must be `null` or an instance of `Int32`; otherwise, an exception is thrown.

## Int32.CopySign(Int32, Int32) method

```csharp
public static int CopySign (int value, int sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Int32.CreateChecked<TOther>(TOther) method

```csharp
public static int CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Int32.CreateSaturating<TOther>(TOther) method

```csharp
public static int CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Int32.CreateTruncating<TOther>(TOther) method

```csharp
public static int CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Int32.DivRem(Int32, Int32) method

```csharp
public static (int Quotient, int Remainder) DivRem (int left, int right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.
- `OverflowException`: `left` is <see cref="F:System.Int32.MinValue">Int32.MinValue</see> and `right` is -1.

To be added.
