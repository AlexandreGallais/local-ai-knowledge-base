---
title: "BigInteger struct (part 8 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 8 of 18)

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator uint (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to an unsigned 32-bit integer value.

This API is not CLS-compliant. The compliant alternative is `Int64`.

Parameters:

- `value`: The value to convert to an unsigned 32-bit integer.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or is greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CUInt` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `UInt32` data type. There is no loss of precision in the resulting `UInt32` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `UInt32` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `UInt32` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator ulong (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to an unsigned 64-bit integer value.

This API is not CLS-compliant. The compliant alternative is `Double`.

Parameters:

- `value`: The value to convert to an unsigned 64-bit integer.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or is greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CULng` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `UInt64` data type. There is no loss of precision in the resulting `UInt64` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `UInt64` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `UInt64` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator UIntPtr (System.Numerics.BigInteger value);
```

Explicitly converts a big integer to a `UIntPtr` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to `UIntPtr` value.

To be added.

## BigInteger.op_Explicit(Complex) method

```csharp
public static explicit operator System.Numerics.BigInteger (System.Numerics.Complex value);
```

Explicitly converts a `Complex` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Explicit(Single) method

```csharp
public static explicit operator System.Numerics.BigInteger (float value);
```

Defines an explicit conversion of a `Single` value to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is `Single.NaN`, `Single.PositiveInfinity`, or `Single.NegativeInfinity`.

#### Remarks
Any fractional part of the `value` parameter is truncated before conversion.

The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Because the conversion from `Single` to `BigInteger` can involve truncating any fractional part of `value`, language compilers do not perform this conversion automatically. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` in Visual Basic) is used. Otherwise, they display a compiler error.

For languages that do not support custom operators, the alternative method is `%23ctor`.

#### Examples
The following example converts the individual elements in an array of `Single` values to `BigInteger` objects, and then displays the result of each conversion. Note that any fractional part of a `Single` value is truncated during the conversion.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/Explicit1.cs._

## BigInteger.op_GreaterThan(Int64, BigInteger) method

```csharp
public static bool operator > (long left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit signed integer is greater than a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThan` method defines the operation of the greater than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` instance method instead. Some languages can also call the `op_GreaterThan` method directly, as the following example shows.

If `left` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_GreaterThan(BigInteger, Int64) method

```csharp
public static bool operator > (System.Numerics.BigInteger left, long right);
```

Returns a value that indicates whether a `BigInteger` is greater than a 64-bit signed integer value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThan` method defines the operation of the greater than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThan` method directly, as the following example shows.

If `right` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_GreaterThan(BigInteger, BigInteger) method

```csharp
public static bool operator > (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a `BigInteger` value is greater than another `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThan` method defines the operation of the greater than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `Compare` method instead. They can also call the `op_GreaterThan` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_GreaterThan(BigInteger, UInt64) method

```csharp
public static bool operator > (System.Numerics.BigInteger left, ulong right);
```

Returns a value that indicates whether a `BigInteger` value is greater than a 64-bit unsigned integer.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThan` method defines the operation of the greater than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThan` method directly, as the following example shows.

## BigInteger.op_GreaterThan(UInt64, BigInteger) method

```csharp
public static bool operator > (ulong left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a `BigInteger` value is greater than a 64-bit unsigned integer.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThan` method defines the operation of the greater than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThan` method directly, as the following example shows.

## BigInteger.op_GreaterThanOrEqual(Int64, BigInteger) method

```csharp
public static bool operator >= (long left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit signed integer is greater than or equal to a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThanOrEqual` method defines the operation of the greater than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThanOrEqual` method directly, as the following example shows.

If `left` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_GreaterThanOrEqual(BigInteger, Int64) method

```csharp
public static bool operator >= (System.Numerics.BigInteger left, long right);
```

Returns a value that indicates whether a `BigInteger` value is greater than or equal to a 64-bit signed integer value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThanOrEqual` method defines the operation of the greater than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThanOrEqual` method directly, as the following example shows.

If `right` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_GreaterThanOrEqual(BigInteger, BigInteger) method

```csharp
public static bool operator >= (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a `BigInteger` value is greater than or equal to another `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThanOrEqual` method defines the operation of the greater than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Compare` method instead. Some languages can also call the `op_GreaterThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_GreaterThanOrEqual(BigInteger, UInt64) method

```csharp
public static bool operator >= (System.Numerics.BigInteger left, ulong right);
```

Returns a value that indicates whether a `BigInteger` value is greater than or equal to a 64-bit unsigned integer value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThanOrEqual` method defines the operation of the greater than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.
