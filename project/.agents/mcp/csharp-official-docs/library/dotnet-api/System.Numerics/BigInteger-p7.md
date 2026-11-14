---
title: "BigInteger struct (part 7 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 7 of 18)

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator double (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a `Double` value.

Parameters:

- `value`: The value to convert to a `Double`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CDbl` in Visual Basic) is used.

Because the `BigInteger` value can be outside the range of the `Double` data type, this operation is a narrowing conversion. If the conversion is unsuccessful, it does not throw an `OverflowException`. Instead, if the `BigInteger` value is less than `MinValue`, the resulting `Double` value is `NegativeInfinity`. If the `BigInteger` value is greater than `MaxValue`, the resulting `Double` value is `PositiveInfinity`.

The conversion of a `BigInteger` to a `Double` may involve a loss of precision. In some cases, the loss of precision may cause the casting or conversion operation to succeed even if the `BigInteger` value is outside the range of the `Double` data type. The following example provides an illustration. It assigns the maximum value of a `Double` to two `BigInteger` variables, increments one `BigInteger` variable by 9.999e291, and tests the two variables for equality. As expected, the call to the `Equals` method shows that they are unequal. However, the conversion of the larger `BigInteger` value back to a `Double` succeeds, although the `BigInteger` value now exceeds `MaxValue`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/Explicit1.cs._

#### Examples
The following example illustrates the conversion of `BigInteger` to `Double` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator Half (System.Numerics.BigInteger value);
```

Explicitly converts a big integer to a `Half` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to `Half` value.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator Int128 (System.Numerics.BigInteger value);
```

Explicitly converts a big integer to a `Int128` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to `Int128` value.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator short (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a 16-bit signed integer value.

Parameters:

- `value`: The value to convert to a 16-bit signed integer.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CShort` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `Int16` data type. There is no loss of precision in the resulting `Int16` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `Int16` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `Int16` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator int (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a 32-bit signed integer value.

Parameters:

- `value`: The value to convert to a 32-bit signed integer.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CInt` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `Int32` data type. There is no loss of precision in the resulting `Int32` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `Int32` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `Int32` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator long (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a 64-bit signed integer value.

Parameters:

- `value`: The value to convert to a 64-bit signed integer.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CLng` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `Int64` data type.

#### Examples
The following example illustrates the conversion of `BigInteger` to `Int64` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `Int64` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator IntPtr (System.Numerics.BigInteger value);
```

Explicitly converts a big integer to a `IntPtr` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to `IntPtr` value.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator System.Numerics.BFloat16 (System.Numerics.BigInteger value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator sbyte (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a signed 8-bit value.

This API is not CLS-compliant. The compliant alternative is `Int16`.

Parameters:

- `value`: The value to convert to a signed 8-bit value.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CSByte` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `SByte` data type. There is no loss of precision in the resulting `SByte` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `SByte` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `SByte` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator float (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a single-precision floating-point value.

Parameters:

- `value`: The value to convert to a single-precision floating-point value.

Returns: An object that contains the closest possible representation of the `value` parameter.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss or a loss of precision. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CSng` in Visual Basic) is used. Otherwise, they display a compiler error.

Because the `BigInteger` value can be outside the range of the `Single` data type, this operation is a narrowing conversion. If the conversion is unsuccessful, it does not throw an `OverflowException`. Instead, if the `BigInteger` value is less than `MinValue`, the resulting `Single` value is `NegativeInfinity`. If the `BigInteger` value is greater than `MaxValue`, the resulting `Single` value is `PositiveInfinity`.

The conversion of a `BigInteger` to a `Single` may involve a loss of precision. In some cases, the loss of precision may cause the casting or conversion operation to succeed even if the `BigInteger` value is outside the range of the `Single` data type. The following example provides an illustration. It assigns the maximum value of a `Single` to two `BigInteger` variables, increments one `BigInteger` variable by 9.999e291, and tests the two variables for equality. As expected, the call to the `Equals` method shows that they are unequal. However, the conversion of the larger `BigInteger` value back to a `Single` succeeds, although the `BigInteger` value now exceeds `MaxValue`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/Explicit1.cs._

#### Examples
The following example illustrates the conversion of `BigInteger` to `Single` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator UInt128 (System.Numerics.BigInteger value);
```

Explicitly converts a big integer to a `UInt128` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to `UInt128` value.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator ushort (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to an unsigned 16-bit integer value.

This API is not CLS-compliant. The compliant alternative is `Int32`.

Parameters:

- `value`: The value to convert to an unsigned 16-bit integer.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or is greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CUShort` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `UInt16` data type. There is no loss of precision in the resulting `UInt16` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `UInt16` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `UInt16` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._
