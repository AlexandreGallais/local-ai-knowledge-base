---
title: "Decimal struct (part 5 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 5 of 12)

## Decimal.op_GreaterThan(Decimal, Decimal) method

```csharp
public static bool operator > (decimal d1, decimal d2);
```

Returns a value indicating whether a specified `Decimal` is greater than another specified `Decimal`.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` is greater than `d2`; otherwise, `false`.

#### Remarks
The `Decimal.op_GreaterThan` method defines the operation of the greater than operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/greaterthan1.cs._

Languages that do not support custom operators can call the `Decimal.Compare` method instead. They may also be able to call the `Decimal.op_GreaterThan` method directly, as the following example shows.

The equivalent method for this operator is `Compare`

## Decimal.op_GreaterThanOrEqual(Decimal, Decimal) method

```csharp
public static bool operator >= (decimal d1, decimal d2);
```

Returns a value indicating whether a specified `Decimal` is greater than or equal to another specified `Decimal`.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` is greater than or equal to `d2`; otherwise, `false`.

#### Remarks
The `Decimal.op_GreaterThanOrEqual` method defines the operation of the greater than or equal operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/greaterthanorequal1.cs._

Languages that do not support custom operators can call the `Decimal.Compare` method instead. They may also be able to call the `Decimal.op_GreaterThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `Compare`

## Decimal.op_Implicit(Byte) method

```csharp
public static implicit operator decimal (byte value);
```

Defines an implicit conversion of an 8-bit unsigned integer to a `Decimal`.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: The converted 8-bit unsigned integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `Byte` values to `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfrombyte.cs._

## Decimal.op_Implicit(Char) method

```csharp
public static implicit operator decimal (char value);
```

Defines an implicit conversion of a Unicode character to a `Decimal`.

Parameters:

- `value`: The Unicode character to convert.

Returns: The converted Unicode character.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `Char` values (Unicode characters) to `Decimal` numbers. This conversion requires the op_Implicit operator in Visual Basic, but not in C#.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Explicit/cfromchar.cs._

## Decimal.op_Implicit(Int16) method

```csharp
public static implicit operator decimal (short value);
```

Defines an implicit conversion of a 16-bit signed integer to a `Decimal`.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: The converted 16-bit signed integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `Int16` values to `Decimal` numbers. This conversion requires the op_Implicit operator in Visual Basic, but not in C#.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromint16.cs._

## Decimal.op_Implicit(Int32) method

```csharp
public static implicit operator decimal (int value);
```

Defines an implicit conversion of a 32-bit signed integer to a `Decimal`.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: The converted 32-bit signed integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `Int32` values to `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromint32.cs._

## Decimal.op_Implicit(Int64) method

```csharp
public static implicit operator decimal (long value);
```

Defines an implicit conversion of a 64-bit signed integer to a `Decimal`.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: The converted 64-bit signed integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `Int64` values to `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromint64.cs._

## Decimal.op_Implicit(SByte) method

```csharp
public static implicit operator decimal (sbyte value);
```

Defines an implicit conversion of an 8-bit signed integer to a `Decimal`.

This API is not CLS-compliant.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: The converted 8-bit signed integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `SByte` values to `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromsbyte.cs._

## Decimal.op_Implicit(UInt16) method

```csharp
public static implicit operator decimal (ushort value);
```

Defines an implicit conversion of a 16-bit unsigned integer to a `Decimal`.

This API is not CLS-compliant.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: The converted 16-bit unsigned integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `UInt16` values to `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromuint16.cs._

## Decimal.op_Implicit(UInt32) method

```csharp
public static implicit operator decimal (uint value);
```

Defines an implicit conversion of a 32-bit unsigned integer to a `Decimal`.

This API is not CLS-compliant.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: The converted 32-bit unsigned integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `UInt32` values to `Decimal` numbers.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromuint32.cs._

## Decimal.op_Implicit(UInt64) method

```csharp
public static implicit operator decimal (ulong value);
```

Defines an implicit conversion of a 64-bit unsigned integer to a `Decimal`.

This API is not CLS-compliant.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: The converted 64-bit unsigned integer.

#### Remarks
The overloads of the `Decimal.op_Implicit` method define the types from which the compiler can automatically convert a `Decimal` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException` exception.

#### Examples
The following example converts `UInt64` values to `Decimal` numbers by using the `UInt64` to `Decimal` conversion operator.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Implicit/cfromuint64.cs._

## Decimal.op_Increment(Decimal) method

```csharp
public static decimal operator ++ (decimal d);
```

Increments the `Decimal` operand by 1.

Parameters:

- `d`: The value to increment.

Returns: The value of `d` incremented by 1.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Increment` method defines the operation of the increment operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/increment1.cs._

Some languages (such as Visual Basic) that lack an increment operator can call the `Decimal.op_Increment` method directly, as the following example shows.

If your language does not support custom operators, call the `Decimal.Add` method instead, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/increment2.cs._

## Decimal.op_Inequality(Decimal, Decimal) method

```csharp
public static bool operator != (decimal d1, decimal d2);
```

Returns a value that indicates whether two `Decimal` objects have different values.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` and `d2` are not equal; otherwise, `false`.

#### Remarks
The `Decimal.op_Inequality` method defines the operation of the inequality operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/inequality1.cs._

If the language you're using doesn't support custom operators, you can test for inequality by using one of the following techniques:

- Calling the `Decimal.Compare` method, which indicates the relationship between two `Decimal` values.
- Calling the `Decimal.Equals` method and reversing its value.

The equivalent method for this operator is `Compare`

## Decimal.op_LessThan(Decimal, Decimal) method

```csharp
public static bool operator < (decimal d1, decimal d2);
```

Returns a value indicating whether a specified `Decimal` is less than another specified `Decimal`.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` is less than `d2`; otherwise, `false`.

#### Remarks
The `Decimal.op_LessThan` method defines the operation of the less than operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/lessthan1.cs._

Languages that do not support custom operators can call the `Decimal.Compare` method instead. They may also be able to call the `Decimal.op_LessThan` method directly, as the following example shows.

The equivalent method for this operator is `Compare`

## Decimal.op_LessThanOrEqual(Decimal, Decimal) method

```csharp
public static bool operator <= (decimal d1, decimal d2);
```

Returns a value indicating whether a specified `Decimal` is less than or equal to another specified `Decimal`.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` is less than or equal to `d2`; otherwise, `false`.

#### Remarks
The `Decimal.op_LessThanOrEqual` method defines the operation of the less than or equal operator for `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/lessthanorequal1.cs._

Languages that do not support custom operators can call the `Decimal.Compare` method instead. They may also be able to call the `Decimal.op_LessThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `Compare`

## Decimal.op_Modulus(Decimal, Decimal) method

```csharp
public static decimal operator % (decimal d1, decimal d2);
```

Returns the remainder resulting from dividing two specified `Decimal` values.

Parameters:

- `d1`: The dividend.
- `d2`: The divisor.

Returns: The remainder resulting from dividing `d1` by `d2`.

Exceptions:

- `DivideByZeroException`: `d2` is `zero`.
- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Decimal.op_Modulus` operator defines the remainder operation that returns the remainder resulting from dividing two specified `Decimal` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/Decimal/op_Addition/modulus1.cs._

The sign of the value returned by the remainder operation depends on the sign of dividend. If dividend is positive, the remainder operation returns a positive result; if it is negative, the remainder operation returns a negative result.

The equivalent method for this operator is `Remainder`. If the language you're using doesn't support custom operators, call the `Decimal.Remainder` method instead.
