---
title: "BigInteger struct (part 10 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 10 of 18)

## BigInteger.op_Inequality(BigInteger, BigInteger) method

```csharp
public static bool operator != (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether two `BigInteger` objects have different values.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `BigInteger.op_Inequality` method defines the operation of the inequality operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can test for inequality by using one of the following techniques:

- Calling the `BigInteger.Compare` method, which indicates the relationship between two `BigInteger` objects.

- Calling the `Equals` method and reversing its value.

The equivalent method for this operator is `Compare`.

## BigInteger.op_Inequality(BigInteger, UInt64) method

```csharp
public static bool operator != (System.Numerics.BigInteger left, ulong right);
```

Returns a value that indicates whether a `BigInteger` value and a 64-bit unsigned integer are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `BigInteger.op_Inequality` method defines the operation of the inequality operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can test for inequality by using one of the following techniques:

- Calling the `CompareTo` method, which indicates the relationship between a `BigInteger` and an unsigned long integer value.

- Calling the `Equals` method and reversing its value.

## BigInteger.op_Inequality(UInt64, BigInteger) method

```csharp
public static bool operator != (ulong left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit unsigned integer and a `BigInteger` value are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
The `BigInteger.op_Inequality` method defines the operation of the inequality operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can test for inequality by using one of the following techniques:

- Calling the `CompareTo` method, which indicates the relationship between a `BigInteger` and an unsigned long integer value.

- Calling the `Equals` method and reversing its value.

## BigInteger.op_LeftShift(BigInteger, Int32) method

```csharp
public static System.Numerics.BigInteger operator << (System.Numerics.BigInteger value, int shift);
```

Shifts a `BigInteger` value a specified number of bits to the left.

Parameters:

- `value`: The value whose bits are to be shifted.
- `shift`: The number of bits to shift `value` to the left.

Returns: A value that has been shifted to the left by the specified number of bits.

#### Remarks
The `BigInteger.op_LeftShift` method defines the operation of the bitwise left-shift operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

> **Note:**
>  Unlike the bitwise left-shift operation with integer primitives, the `BigInteger.op_LeftShift` method preserves the sign of the original `BigInteger` value.

Languages that do not support custom operators can perform a bitwise left-shift operation by multiplying `value` by `BigInteger.Pow(2, shift)`. The following example shows that the results are identical to the results of using this operator.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

## BigInteger.op_LessThan(Int64, BigInteger) method

```csharp
public static bool operator < (long left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit signed integer is less than a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThan` method defines the operation of the less than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_LessThan` method directly, as the following example shows.

If `left` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThan(BigInteger, Int64) method

```csharp
public static bool operator < (System.Numerics.BigInteger left, long right);
```

Returns a value that indicates whether a `BigInteger` value is less than a 64-bit signed integer.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThan` method defines the operation of the less than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. Some languages can also call the `op_LessThan` method directly, as the following example shows.

If `right` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThan(BigInteger, BigInteger) method

```csharp
public static bool operator < (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a `BigInteger` value is less than another `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThan` method defines the operation of the less than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Compare` method instead. Some languages can also call the `op_LessThan` method directly, as the following example shows.

The equivalent method for this operator is `Compare`.

## BigInteger.op_LessThan(BigInteger, UInt64) method

```csharp
public static bool operator < (System.Numerics.BigInteger left, ulong right);
```

Returns a value that indicates whether a `BigInteger` value is less than a 64-bit unsigned integer.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThan` method defines the operation of the less than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. They can also call the `op_LessThan` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThan(UInt64, BigInteger) method

```csharp
public static bool operator < (ulong left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit unsigned integer is less than a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThan` method defines the operation of the less than operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. They can also call the `op_LessThan` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThanOrEqual(Int64, BigInteger) method

```csharp
public static bool operator <= (long left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit signed integer is less than or equal to a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThanOrEqual` method defines the operation of the less than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. They can also call the `op_LessThanOrEqual` method directly, as the following example shows.

If `left` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThanOrEqual(BigInteger, Int64) method

```csharp
public static bool operator <= (System.Numerics.BigInteger left, long right);
```

Returns a value that indicates whether a `BigInteger` value is less than or equal to a 64-bit signed integer.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThanOrEqual` method defines the operation of the less than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. They can also call the `op_LessThanOrEqual` method directly, as the following example shows.

If `right` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the operation is performed.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThanOrEqual(BigInteger, BigInteger) method

```csharp
public static bool operator <= (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a `BigInteger` value is less than or equal to another `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThanOrEqual` method defines the operation of the less than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Compare` method instead. They can also call the `op_LessThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `Compare`.

## BigInteger.op_LessThanOrEqual(BigInteger, UInt64) method

```csharp
public static bool operator <= (System.Numerics.BigInteger left, ulong right);
```

Returns a value that indicates whether a `BigInteger` value is less than or equal to a 64-bit unsigned integer.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThanOrEqual` method defines the operation of the less than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. They can also call the `op_LessThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.

## BigInteger.op_LessThanOrEqual(UInt64, BigInteger) method

```csharp
public static bool operator <= (ulong left, System.Numerics.BigInteger right);
```

Returns a value that indicates whether a 64-bit unsigned integer is less than or equal to a `BigInteger` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

#### Remarks
The `BigInteger.op_LessThanOrEqual` method defines the operation of the less than or equal to operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Languages that do not support custom operators can call the `CompareTo` method instead. They can also call the `op_LessThanOrEqual` method directly, as the following example shows.

The equivalent method for this operator is `CompareTo`.
