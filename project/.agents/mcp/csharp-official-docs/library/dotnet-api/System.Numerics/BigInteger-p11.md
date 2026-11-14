---
title: "BigInteger struct (part 11 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 11 of 18)

## BigInteger.op_Modulus(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator % (System.Numerics.BigInteger dividend, System.Numerics.BigInteger divisor);
```

Returns the remainder that results from division with two specified `BigInteger` values.

Parameters:

- `dividend`: The value to be divided.
- `divisor`: The value to divide by.

Returns: The remainder that results from the division.

Exceptions:

- `DivideByZeroException`: `divisor` is 0 (zero).

#### Remarks
The `BigInteger.op_Modulus` method defines the operation of the modulus operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Remainder` method instead.

The sign of the value returned by the modulus operation depends on the sign of `dividend`: If `dividend` is positive, the modulus operation returns a positive result; if it is negative, the modulus operation returns a negative result. The behavior of the modulus operation with `BigInteger` values is identical to the modulus operation with other integral types.

The equivalent method for this operator is `Remainder`.

## BigInteger.op_Multiply(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator * (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Multiplies two specified `BigInteger` values.

Parameters:

- `left`: The first value to multiply.
- `right`: The second value to multiply.

Returns: The product of `left` and `right`.

#### Remarks
The `BigInteger.op_Multiply` method defines the operation of the multiplication operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

The equivalent method for this operator is `Multiply`.

## BigInteger.op_OnesComplement(BigInteger) method

```csharp
public static System.Numerics.BigInteger operator ~ (System.Numerics.BigInteger value);
```

Returns the bitwise one's complement of a `BigInteger` value.

Parameters:

- `value`: An integer value.

Returns: The bitwise one's complement of `value`.

#### Remarks
The `BigInteger.op_OnesComplement` method defines the operation of the bitwise one's complement operator for `BigInteger` values. The bitwise one's complement operator reverses each bit in a numeric value. That is, bits in `value` that are 0 are set to 1 in the result, and bits that are 1 are set to 0 in the result. The `BigInteger.op_OnesComplement` method enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_OnesComplement/OnesComplement1.cs._

Languages that do not support custom operators may be able to call the `BigInteger.op_OnesComplement` method directly to perform a bitwise one's complement operation. For example:

## BigInteger.op_RightShift(BigInteger, Int32) method

```csharp
public static System.Numerics.BigInteger operator >> (System.Numerics.BigInteger value, int shift);
```

Shifts a `BigInteger` value a specified number of bits to the right.

Parameters:

- `value`: The value whose bits are to be shifted.
- `shift`: The number of bits to shift `value` to the right.

Returns: A value that has been shifted to the right by the specified number of bits.

#### Remarks
The `BigInteger.op_RightShift` method defines the operation of the bitwise right-shift operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/RightShift1.cs._

Languages that do not support custom operators can perform a bitwise right-shift operation by dividing `value` by `BigInteger.Pow(2, shift)` and subtracting 1 times `shift` for negative values. The following example shows that the results are identical to the results of using this operator.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/RightShift1.cs._

If `shift` is greater than or equal to the number of bits in a positive `BigInteger` value, the result of the right-shift operation is `BigInteger.Zero`. If `shift` is greater than the number of bits in a negative `BigInteger` value, the result of the right-shift operation is `BigInteger.MinusOne`.

## BigInteger.op_Subtraction(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator - (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Subtracts a `BigInteger` value from another `BigInteger` value.

Parameters:

- `left`: The value to subtract from (the minuend).
- `right`: The value to subtract (the subtrahend).

Returns: The result of subtracting `right` from `left`.

#### Remarks
The `BigInteger.op_Subtraction` method defines the operation of the subtraction operator for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Subtract` method instead.

The equivalent method for this operator is `Subtract`.

## BigInteger.op_UnaryNegation(BigInteger) method

```csharp
public static System.Numerics.BigInteger operator - (System.Numerics.BigInteger value);
```

Negates a specified BigInteger value.

Parameters:

- `value`: The value to negate.

Returns: The result of the `value` parameter multiplied by negative one (-1).

#### Remarks
The `BigInteger.op_UnaryNegation` method defines the operation of the unary negation operator (or the additive inverse operator) for `BigInteger` values. The operation produces a value that results in 0 (zero) when it is added to the original number. Languages that do not support custom operators can call the `BigInteger.Negate` method instead.

The equivalent method for this operator is `Negate`

#### Examples
The following example illustrates three different ways to negate the value of a `BigInteger` object.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

## BigInteger.op_UnaryPlus(BigInteger) method

```csharp
public static System.Numerics.BigInteger operator + (System.Numerics.BigInteger value);
```

Returns the value of the `BigInteger` operand. (The sign of the operand is unchanged.)

Parameters:

- `value`: An integer value.

Returns: The value of the `value` operand.

#### Remarks
The `BigInteger.op_UnaryPlus` method defines the operation of the unary positive operator for `BigInteger` values.

## BigInteger.op_UnsignedRightShift(BigInteger, Int32) method

```csharp
public static System.Numerics.BigInteger op_UnsignedRightShift (System.Numerics.BigInteger value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

#### Remarks

This operation performs an unsigned (otherwise known as a logical) right shift on all types.

## BigInteger.Parse(String) method

```csharp
public static System.Numerics.BigInteger Parse (string value);
```

Converts the string representation of a number to its `BigInteger` equivalent.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A value that is equivalent to the number specified in the `value` parameter.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` is not in the correct format.

#### Remarks
The `value` parameter should be the string representation of a number in the following form.

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign. Valid sign characters are determined by the `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.PositiveSign` properties of the current culture.|
|*digits*|A sequence of digits ranging from 0 to 9. Any leading zeros are ignored.|

> **Note:**
>  The string specified by the `value` parameter is interpreted by using the `Integer` style. It cannot contain any group separators or decimal separator, and it cannot have a decimal portion.

The `value` parameter is parsed by using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string by using the formatting information of a specific culture, use the `Parse` method.

> **Important:**
>  If you use the `BigInteger.Parse` method to round-trip the string representation of a `BigInteger` value that was output by the `BigInteger.ToString` method, you should use the `ToString` method with the "R" format specifier to generate the string representation of the `BigInteger` value. Otherwise, the string representation of the `BigInteger` preserves only the 50 most significant digits of the original value, and data may be lost when you use the `BigInteger.Parse` method to restore the `BigInteger` value.

#### Examples
The following example uses the `Parse` method to instantiate two `BigInteger` objects. It multiplies each object by another number and then calls the `BigInteger.Compare` method to determine the relationship between the two values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/Parse1.cs._

## BigInteger.Parse(Byte>, IFormatProvider) method

```csharp
public static System.Numerics.BigInteger Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## BigInteger.Parse(Char>, IFormatProvider) method

```csharp
public static System.Numerics.BigInteger Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.
