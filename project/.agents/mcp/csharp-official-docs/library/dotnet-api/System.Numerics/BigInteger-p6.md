---
title: "BigInteger struct (part 6 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 6 of 18)

## BigInteger.op_Division(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator / (System.Numerics.BigInteger dividend, System.Numerics.BigInteger divisor);
```

Divides a specified `BigInteger` value by another specified `BigInteger` value by using integer division.

Parameters:

- `dividend`: The value to be divided.
- `divisor`: The value to divide by.

Returns: The integral result of the division.

Exceptions:

- `DivideByZeroException`: `divisor` is 0 (zero).

#### Remarks
The `BigInteger.op_Division` method defines the division operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators and operator overloading can call the `BigInteger.Divide` method instead.

The equivalent method for this operator is `Divide`

#### Examples
The following example creates an array of `BigInteger` values. It then uses each element as the quotient in a division operation that uses the `BigInteger.Divide` method, the division operator (/), and the `BigInteger.DivRem` method.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Divide/Divide1.cs._

## BigInteger.op_Equality(Int64, BigInteger) method

```csharp
public static bool operator == (long left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a signed long integer value and a `BigInteger` value are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the `left` and `right` parameters have the same value; otherwise, `false`.

#### Remarks
The `op_Equality` method defines the equality comparison operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `Equals` instance method instead.

If `left` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `Equals`.

## BigInteger.op_Equality(BigInteger, Int64) method

```csharp
public static bool operator == (System.Numerics.BigInteger left, long right);
```

Returns a value that indicates whether a `BigInteger` value and a signed long integer value are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the `left` and `right` parameters have the same value; otherwise, `false`.

#### Remarks
The `op_Equality` method defines the equality comparison operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `Equals` instance method instead.

If `right` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `Equals`.

## BigInteger.op_Equality(BigInteger, BigInteger) method

```csharp
public static bool operator == (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether the values of two `BigInteger` objects are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the `left` and `right` parameters have the same value; otherwise, `false`.

#### Remarks
The `op_Equality` method defines the operation of the equality operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `Equals` instance method instead.

The equivalent method for this operator is `Equals`.

## BigInteger.op_Equality(BigInteger, UInt64) method

```csharp
public static bool operator == (System.Numerics.BigInteger left, ulong right);
```

Returns a value that indicates whether a `BigInteger` value and an unsigned long integer value are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the `left` and `right` parameters have the same value; otherwise, `false`.

#### Remarks
The `op_Equality` method defines the equality comparison operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `Equals` instance method instead.

## BigInteger.op_Equality(UInt64, BigInteger) method

```csharp
public static bool operator == (ulong left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether an unsigned long integer value and a `BigInteger` value are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the `left` and `right` parameters have the same value; otherwise, `false`.

#### Remarks
The `op_Equality` method defines the equality comparison operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `Equals` instance method instead.

## BigInteger.op_ExclusiveOr(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator ^ (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Performs a bitwise exclusive `Or` (`XOr`) operation on two `BigInteger` values.

Parameters:

- `left`: The first value.
- `right`: The second value.

Returns: The result of the bitwise `Or` operation.

#### Remarks
The result of a bitwise exclusive `Or` operation is `true` if the values of the two bits are different; otherwise, it is `false`. The following table illustrates the exclusive `Or` operation.

|Bit x in `left`|Bit x in `right`|Return value|
|---------------------|----------------------|------------------|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|0|

The `BigInteger.op_ExclusiveOr` method enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

The `BigInteger.op_ExclusiveOr` method performs the bitwise exclusive `Or` operation on two `BigInteger` values as if they were both in two's complement representation with virtual sign extension.

## BigInteger.op_Explicit(Decimal) method

```csharp
public static explicit operator System.Numerics.BigInteger (decimal value);
```

Defines an explicit conversion of a `Decimal` object to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
Any fractional part of the `value` parameter is truncated before conversion.

The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Because the conversion from `Decimal` to `BigInteger` can involve truncating any fractional part of `value`, language compilers do not perform this conversion automatically. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` in Visual Basic) is used. Otherwise, they display a compiler error.

For languages that do not support custom operators, the alternative method is `%23ctor`.

#### Examples
The following example converts the individual elements in an array of `Decimal` values to `BigInteger` objects, and then displays the result of each conversion. Note that any fractional part of a `Decimal` value is truncated during the conversion.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/Explicit1.cs._

## BigInteger.op_Explicit(Double) method

```csharp
public static explicit operator System.Numerics.BigInteger (double value);
```

Defines an explicit conversion of a `Double` value to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is `Double.NaN`, `Double.PositiveInfinity`, or `Double.NegativeInfinity`.

#### Remarks
Any fractional part of the `value` parameter is truncated before conversion.

The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Because the conversion from `Double` to `BigInteger` can involve truncating any fractional part of `value`, language compilers do not perform this conversion automatically. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` in Visual Basic) is used. Otherwise, they display a compiler error.

For languages that do not support custom operators, the alternative method is `%23ctor`.

#### Examples
The following example converts the individual elements in an array of `Double` values to `BigInteger` objects, and then displays the result of each conversion. Note that any fractional part of a `Double` value is truncated during the conversion.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/Explicit1.cs._

## BigInteger.op_Explicit(Half) method

```csharp
public static explicit operator System.Numerics.BigInteger (Half value);
```

Explicitly converts a `Half` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Explicit(BFloat16) method

```csharp
public static explicit operator System.Numerics.BigInteger (System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator byte (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to an unsigned byte value.

Parameters:

- `value`: The value to convert to a `Byte`.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CByte` in Visual Basic) is used. Otherwise, they display a compiler error.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `Byte` data type. There is no loss of precision in the resulting `Byte` value if the conversion is successful.

#### Examples
The following example illustrates the conversion of `BigInteger` to `Byte` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `Byte` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator char (System.Numerics.BigInteger value);
```

Explicitly converts a big integer to a `Char` value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to `Char` value.

To be added.

## BigInteger.op_Explicit(BigInteger) method

```csharp
public static explicit operator decimal (System.Numerics.BigInteger value);
```

Defines an explicit conversion of a `BigInteger` object to a `Decimal` value.

Parameters:

- `value`: The value to convert to a `Decimal`.

Returns: An object that contains the value of the `value` parameter.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The overloads of the `op_Explicit` method define the types to which or from which a `BigInteger` object can be converted. Language compilers do not perform this conversion automatically because it can involve data loss. Instead, they perform the conversion only if a casting operator (in C#) or a conversion function (such as `CType` or `CDec` in Visual Basic) is used.

Because this operation defines a narrowing conversion, it can throw an `OverflowException` at run time if the `BigInteger` value is outside the range of the `Decimal` data type.

#### Examples
The following example illustrates the conversion of `BigInteger` to `Decimal` values. It also handles an `OverflowException` that is thrown because the `BigInteger` value is outside the range of the `Decimal` data type.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Explicit/System.Numeric.BigInteger.Explicit.cs._
