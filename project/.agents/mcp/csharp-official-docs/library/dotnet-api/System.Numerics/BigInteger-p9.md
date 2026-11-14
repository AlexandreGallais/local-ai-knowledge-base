---
title: "BigInteger struct (part 9 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 9 of 18)

## BigInteger.op_GreaterThanOrEqual(UInt64, BigInteger) method

```csharp
public static bool operator >= (ulong left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit unsigned integer is greater than or equal to a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_GreaterThanOrEqual` method defines the operation of the greater than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_GreaterThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_Implicit(Byte) method

```csharp
public static implicit operator System.Numerics.BigInteger (byte value);
```

Defines an implicit conversion of an unsigned byte to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
Any fractional part of the `value` parameter is truncated before conversion.

For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `Byte` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(Char) method

```csharp
public static implicit operator System.Numerics.BigInteger (char value);
```

Implicitly converts a `Char` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Implicit(Int128) method

```csharp
public static implicit operator System.Numerics.BigInteger (Int128 value);
```

Implicitly converts a `Int128` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Implicit(Int16) method

```csharp
public static implicit operator System.Numerics.BigInteger (short value);
```

Defines an implicit conversion of a signed 16-bit integer to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `Int16` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(Int32) method

```csharp
public static implicit operator System.Numerics.BigInteger (int value);
```

Defines an implicit conversion of a signed 32-bit integer to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `Int32` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(Int64) method

```csharp
public static implicit operator System.Numerics.BigInteger (long value);
```

Defines an implicit conversion of a signed 64-bit integer to a `BigInteger` value.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `Int64` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(IntPtr) method

```csharp
public static implicit operator System.Numerics.BigInteger (IntPtr value);
```

Implicitly converts a `IntPtr` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Implicit(SByte) method

```csharp
public static implicit operator System.Numerics.BigInteger (sbyte value);
```

Defines an implicit conversion of an 8-bit signed integer to a `BigInteger` value.

This API is not CLS-compliant. The compliant alternative is `BigInteger.#ctor`.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `SByte` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(UInt128) method

```csharp
public static implicit operator System.Numerics.BigInteger (UInt128 value);
```

Implicitly converts a `UInt128` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Implicit(UInt16) method

```csharp
public static implicit operator System.Numerics.BigInteger (ushort value);
```

Defines an implicit conversion of a 16-bit unsigned integer to a `BigInteger` value.

This API is not CLS-compliant. The compliant alternative is `BigInteger.op_Implicit`.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `UInt16` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(UInt32) method

```csharp
public static implicit operator System.Numerics.BigInteger (uint value);
```

Defines an implicit conversion of a 32-bit unsigned integer to a `BigInteger` value.

This API is not CLS-compliant. The compliant alternative is `BigInteger.op_Implicit`.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `UInt32` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(UInt64) method

```csharp
public static implicit operator System.Numerics.BigInteger (ulong value);
```

Defines an implicit conversion of a 64-bit unsigned integer to a `BigInteger` value.

This API is not CLS-compliant. The compliant alternative is `Double`.

Parameters:

- `value`: The value to convert to a `BigInteger`.

Returns: An object that contains the value of the `value` parameter.

#### Remarks
For languages that do not support implicit operators, the alternative method is `%23ctor`.

The overloads of the `op_Implicit` method define the types to which or from which a compiler can automatically convert a `BigInteger` value without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). They are widening conversions that do not involve data loss and do not throw an `OverflowException`. This overload lets the compiler handle conversions from a `UInt64` value to a `BigInteger` value, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_Implicit/Implicit1.cs._

## BigInteger.op_Implicit(UIntPtr) method

```csharp
public static implicit operator System.Numerics.BigInteger (UIntPtr value);
```

Implicitly converts a `UIntPtr` value to a big integer.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to a big integer.

To be added.

## BigInteger.op_Increment(BigInteger) method

```csharp
public static System.Numerics.BigInteger operator ++ (System.Numerics.BigInteger value);
```

Increments a `BigInteger` value by 1.

Parameters:

- `value`: The value to increment.

Returns: The value of the `value` parameter incremented by 1.

#### Remarks
The `BigInteger.op_Increment` method defines the increment operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Some languages (such as Visual Basic) that lack an increment operator or do not support operator overloading can call the `BigInteger.op_Increment` method directly, as the following example shows.

Because `BigInteger` objects are immutable, the `BigInteger.op_Increment` operator creates a new `BigInteger` object whose value is one more than the `BigInteger` object represented by `value`. Therefore, repeated calls to `BigInteger.op_Increment` may be expensive.

The equivalent method for this operator is `Add`.

## BigInteger.op_Inequality(Int64, BigInteger) method

```csharp
public static bool operator != (long left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit signed integer and a `BigInteger` value are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `BigInteger.op_Inequality` method defines the operation of the inequality operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can test for inequality by using one of the following techniques:

- Calling the `CompareTo` instance method, which indicates the relationship between a `BigInteger` and a signed long integer value.

- Calling the `Equals` instance method and reversing its value.

If `left` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

## BigInteger.op_Inequality(BigInteger, Int64) method

```csharp
public static bool operator != (System.Numerics.BigInteger left, long right);
```

Returns a value that indicates whether a `BigInteger` value and a 64-bit signed integer are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `BigInteger.op_Inequality` method defines the operation of the inequality operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can test for inequality by using one of the following techniques:

- Calling the `CompareTo` method, which indicates the relationship between a `BigInteger` and a signed long integer value.

- Calling the `Equals` method and reversing its value.

If `right` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.
