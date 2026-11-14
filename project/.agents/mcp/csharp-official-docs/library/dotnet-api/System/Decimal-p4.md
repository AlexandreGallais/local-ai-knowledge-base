---
title: "Decimal struct (part 4 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 4 of 12)

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator char (decimal value);
```

Defines an explicit conversion of a `Decimal` to a Unicode character.

Parameters:

- `value`: The value to convert.

Returns: A Unicode character that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see> or greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to a `Char`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results, or might not support the conversion at all. For example, the Visual Basic and C++ compilers do not support an explicit `Decimal` to a `Char` conversion.

#### Examples
The following example converts `Decimal` numbers to `Char` values (Unicode characters) by using the explicit `Decimal` to `Char` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctochar.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator double (decimal value);
```

Defines an explicit conversion of a `Decimal` to a double-precision floating-point number.

Parameters:

- `value`: The value to convert.

Returns: A double-precision floating-point number that represents the converted `Decimal`.

#### Remarks
This operation can result in a loss of precision, because a double-precision floating-point number has fewer significant digits than a `Decimal`.

This operator supports the explicit conversion of a `Decimal` to a `Double`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `Double` value. To perform a conversion that is independent of language, you can call the `ToDouble` or the `ToDouble` method.

#### Examples
The following example converts `Decimal` numbers to `Double` values by using the explicit `Decimal` to `Double` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctosgl_dbl.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator short (decimal value);
```

Defines an explicit conversion of a `Decimal` to a 16-bit signed integer.

Parameters:

- `value`: The value to convert.

Returns: A 16-bit signed integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks

This operator supports the explicit conversion of a `Decimal` to an `Int16`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to an `Int16` value. To perform a conversion that is independent of language, you can call the `ToInt16` or the `ToInt16` method.

#### Examples
The following example converts `Decimal` numbers to `Int16` values by using the explicit `Decimal` to `Int16` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctou_int16.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator int (decimal value);
```

Defines an explicit conversion of a `Decimal` to a 32-bit signed integer.

Parameters:

- `value`: The value to convert.

Returns: A 32-bit signed integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to an `Int32`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to an `Int32` value. To perform a conversion that is independent of language, you can call the `ToInt32` or the `ToInt32` method.

#### Examples
The following example converts `Decimal` numbers to `Int32` values by using the explicit `Decimal` to `Int32` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctou_int32.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator long (decimal value);
```

Defines an explicit conversion of a `Decimal` to a 64-bit signed integer.

Parameters:

- `value`: The value to convert.

Returns: A 64-bit signed integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to an `Int64`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to an `Int64` value by using C# and Visual Basic. To perform a conversion that is independent of language, you can call the `ToInt64` or the `ToInt64` method.

#### Examples
The following example converts `Decimal` numbers to `Int64` values by using the explicit `Decimal` to `Int64` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctou_int64.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator sbyte (decimal value);
```

Defines an explicit conversion of a `Decimal` to an 8-bit signed integer.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert.

Returns: An 8-bit signed integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to a `SByte`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `Byte` and an `SByte` value by using C# and Visual Basic. To perform a conversion that is independent of language, you can call the `ToSByte` method or the `ToSByte` method.

#### Examples
The following example converts `Decimal` numbers to `SByte` values by using the explicit `Decimal` to `SByte` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/tosbyte.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator float (decimal value);
```

Defines an explicit conversion of a `Decimal` to a single-precision floating-point number.

Parameters:

- `value`: The value to convert.

Returns: A single-precision floating-point number that represents the converted `Decimal`.

#### Remarks
This operation can result in a loss of precision, because a single-precision floating-point number has fewer significant digits than a `Decimal`.

This operator supports the explicit conversion of a `Decimal` to a `Single`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `Single` value by using C# and Visual Basic. To perform a conversion that is independent of language, you can call the `ToSingle` or the `ToSingle` method.

#### Examples
The following example converts `Decimal` numbers to `Single` values by using the explicit `Decimal` to `Single` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/tosingle1.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator ushort (decimal value);
```

Defines an explicit conversion of a `Decimal` to a 16-bit unsigned integer.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert.

Returns: A 16-bit unsigned integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to a `UInt16`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `UInt16` value by using C# and Visual Basic. To perform a conversion that is independent of language, you can call the `ToUInt16` or the `ToUInt16` method.

#### Examples
The following example converts `Decimal` numbers to `UInt16` values by using the explicit `Decimal` to `UInt16` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctou_int16.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator uint (decimal value);
```

Defines an explicit conversion of a `Decimal` to a 32-bit unsigned integer.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert.

Returns: A 32-bit unsigned integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to a `UInt32`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `UInt32` value by using C# and Visual Basic. To perform a conversion that is independent of language, you can call the `ToUInt32` or the `ToUInt32` method.

#### Examples
The following example converts `Decimal` numbers to `UInt32` values by using the explicit `Decimal` to `UInt32` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctou_int32.cs._

## Decimal.op_Explicit(Decimal) method

```csharp
public static explicit operator ulong (decimal value);
```

Defines an explicit conversion of a `Decimal` to a 64-bit unsigned integer.

This API is not CLS-compliant.

Parameters:

- `value`: The value to convert.

Returns: A 64-bit unsigned integer that represents the converted `Decimal`.

Exceptions:

- `OverflowException`: `value` is negative or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
This operator supports the explicit conversion of a `Decimal` to a `UInt64`. The syntax for such explicit conversions is language-dependent, and individual language compilers can provide different implementations and return different results. The example illustrates the different return values when you explicitly convert a `Decimal` value to a `UInt64` value by using C# and Visual Basic. To perform a conversion that is independent of language, you can call the `ToUInt64` or the `ToUInt64` method.

#### Examples
The following example converts `Decimal` numbers to `UInt64` values by using the explicit `Decimal` to `UInt64` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/ctou_int64.cs._

## Decimal.op_Explicit(Double) method

```csharp
public static explicit operator decimal (double value);
```

Defines an explicit conversion of a double-precision floating-point number to a `Decimal`.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: The converted double-precision floating point number.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> or less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>.

-or-

`value` is `Double.NaN`, `Double.PositiveInfinity`, or `Double.NegativeInfinity`.

#### Examples

The following example converts `Double` values to `Decimal` numbers by using the `Double` to `Decimal` conversion operator. This conversion requires the op_Explicit operator in Visual Basic.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/cfromdouble.cs._

## Decimal.op_Explicit(Single) method

```csharp
public static explicit operator decimal (float value);
```

Defines an explicit conversion of a single-precision floating-point number to a `Decimal`.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: The converted single-precision floating point number.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> or less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>.

-or-

`value` is `Single.NaN`, `Single.PositiveInfinity`, or `Single.NegativeInfinity`.

#### Examples
The following example converts `Single` values to `Decimal` numbers by using the `Single` to `Decimal` conversion operator. This conversion requires the op_Explicit operator in Visual Basic.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/cfromsingle.cs._
