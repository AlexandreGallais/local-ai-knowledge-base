---
title: "BigInteger struct (part 5 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 5 of 18)

## BigInteger.Log(BigInteger, Double) method

```csharp
public static double Log (System.Numerics.BigInteger value, double baseValue);
```

Returns the logarithm of a specified number in a specified base.

Parameters:

- `value`: A number whose logarithm is to be found.
- `baseValue`: The base of the logarithm.

Returns: The base `baseValue` logarithm of `value`, as shown in the table in the Remarks section.

Exceptions:

- `ArgumentOutOfRangeException`: The log of `value` is out of range of the `Double` data type.

#### Remarks
The `value` and `baseValue` parameters are specified as base 10 numbers.

The precise return value of the method depends on the sign of `value` and on the sign and value of `baseValue`, as the following table shows.

|`value` parameter|`baseValue` parameter|Return value|
|-----------------------|---------------------------|------------------|
|`value` > 0|(0 < `baseValue` < 1) -or-(`baseValue` > 1)|logbaseValue(`value`)|
|`value` < 0|(any value)|`NaN`|
|(any value)|`baseValue` < 0|`NaN`|
|`value` != 1|`baseValue` = 0|`NaN`|
|`value` != 1|`baseValue` = `PositiveInfinity`|`NaN`|
|(any value)|`baseValue` = `NaN`|`NaN`|
|(any value)|`baseValue` = 1|`NaN`|
|`value` = 0|0 < `baseValue` < 1|`PositiveInfinity`|
|`value` = 0|`baseValue` > 1|`PositiveInfinity`|
|`value` = 1|`baseValue` = 0|0|
|`value` = 1|`baseValue` = `PositiveInfinity`|0|

To calculate the base 10 logarithm of a `BigInteger` value, call the `BigInteger.Log10` method. To calculate the natural logarithm of a number, call the `Log` method.

This method corresponds to the `Math.Log` method for the primitive numeric types.

## BigInteger.Log10(BigInteger) method

```csharp
public static double Log10 (System.Numerics.BigInteger value);
```

Returns the base 10 logarithm of a specified number.

Parameters:

- `value`: A number whose logarithm is to be found.

Returns: The base 10 logarithm of `value`, as shown in the table in the Remarks section.

Exceptions:

- `ArgumentOutOfRangeException`: The base 10 log of `value` is out of range of the `Double` data type.

#### Remarks
The `value` parameter is specified as a base 10 number.

The precise return value of the method depends on the sign of `value`, as the following table shows.

|Sign of value parameter|Return value|
|-----------------------------|------------------|
|Positive|The base 10 log of `value`; that is, log10`value`.|
|Zero|`NegativeInfinity`.|
|Negative|`NaN`.|

To calculate the natural logarithm of a `BigInteger` value, call the `Log` method. To calculate the logarithm of a number in another base, call the `Log` method.

This method corresponds to the `Math.Log10` method for the primitive numeric types.

## BigInteger.Log2(BigInteger) method

```csharp
public static System.Numerics.BigInteger Log2 (System.Numerics.BigInteger value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## BigInteger.Max(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Max (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns the larger of two `BigInteger` values.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: The `left` or `right` parameter, whichever is larger.

#### Remarks
This method corresponds to the `Math.Max` method for primitive numeric types.

#### Examples
The following example uses the `BigInteger.Max` method to select the largest number in an array of `BigInteger` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Max/Max1.cs._

## BigInteger.MaxMagnitude(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger MaxMagnitude (System.Numerics.BigInteger x, System.Numerics.BigInteger y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## BigInteger.Min(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Min (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns the smaller of two `BigInteger` values.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: The `left` or `right` parameter, whichever is smaller.

#### Remarks
This method corresponds to the `Math.Min` method for primitive numeric types.

#### Examples
The following example uses the `BigInteger.Min` method to select the smallest number in an array of `BigInteger` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Min/Min1.cs._

## BigInteger.MinMagnitude(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger MinMagnitude (System.Numerics.BigInteger x, System.Numerics.BigInteger y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## BigInteger.ModPow(BigInteger, BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger ModPow (System.Numerics.BigInteger value, System.Numerics.BigInteger exponent, System.Numerics.BigInteger modulus);
```

Performs modulus division on a number raised to the power of another number.

Parameters:

- `value`: The number to raise to the `exponent` power.
- `exponent`: The exponent to raise `value` by.
- `modulus`: The number by which to divide `value` raised to the `exponent` power.

Returns: The remainder after dividing `value`exponent by `modulus`.

Exceptions:

- `DivideByZeroException`: `modulus` is zero.
- `ArgumentOutOfRangeException`: `exponent` is negative.

#### Remarks
The `BigInteger.ModPow` method evaluates the following expression:

(baseValue ^ exponent) Mod modulus

To perform exponentiation on `BigInteger` values without modulus division, use the `BigInteger.Pow` method.

#### Examples
The following example provides a simple illustration of calling the `BigInteger.ModPow` method.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/ModPow/ModPow1.cs._

## BigInteger.Multiply(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Multiply (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Returns the product of two `BigInteger` values.

Parameters:

- `left`: The first number to multiply.
- `right`: The second number to multiply.

Returns: The product of the `left` and `right` parameters.

#### Remarks
The `BigInteger.Multiply` method is implemented for languages that do not support operator overloading. Its behavior is identical to multiplication using the multiplication operator. In addition, the `BigInteger.Multiply` method is a useful substitute for the multiplication operator when instantiating a `BigInteger` variable by assigning it a product that results from multiplication, as shown in the following example.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Add/Multiply1.cs._

If necessary, this method automatically performs implicit conversion of other integral types to `BigInteger` objects. This is illustrated in the example in the next section, where the `BigInteger.Multiply` method is passed two `Int64` values.

#### Examples
The following example tries to perform multiplication with two long integers. Because the result exceeds the range of a long integer, an `OverflowException` is thrown, and the `BigInteger.Multiply` method is called to handle the multiplication. Note that C# requires that you use either the `checked` keyword (as in this example) or the `/checked+` compiler option to make sure an exception is thrown on a numeric overflow.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

## BigInteger.Negate(BigInteger) method

```csharp
public static System.Numerics.BigInteger Negate (System.Numerics.BigInteger value);
```

Negates a specified `BigInteger` value.

Parameters:

- `value`: The value to negate.

Returns: The result of the `value` parameter multiplied by negative one (-1).

#### Remarks
Negation obtains the additive inverse of a number. The additive inverse of a number is a number that produces a value of zero when it is added to the original number.

The `BigInteger.Negate` method is implemented for languages that do not support custom operators. Its behavior is identical to negation using the unary negation operator. In addition, the `BigInteger.Negate` method is a useful substitute for the negation operator when instantiating a `BigInteger` variable, as shown in the following example.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Add/Multiply1.cs._

#### Examples
The following example illustrates three ways to negate the value of a `BigInteger` object.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

## BigInteger.op_Addition(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator + (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Adds the values of two specified `BigInteger` objects.

Parameters:

- `left`: The first value to add.
- `right`: The second value to add.

Returns: The sum of `left` and `right`.

#### Remarks
The `BigInteger.op_Addition` method defines the addition operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Add` method instead.

## BigInteger.op_BitwiseAnd(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator & (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Performs a bitwise `And` operation on two `BigInteger` values.

Parameters:

- `left`: The first value.
- `right`: The second value.

Returns: The result of the bitwise `And` operation.

#### Remarks
The `BigInteger.op_BitwiseAnd` method defines the bitwise `And` operation for `BigInteger` values. The bitwise `And` operation sets a result bit only if the corresponding bits in `left` and `right` are also set, as shown in the following table.

|Bit in `left`|Bit in `right`|Bit in result|
|-------------------|--------------------|-------------------|
|0|0|0|
|1|0|0|
|1|1|1|
|0|1|0|

The `BigInteger.op_BitwiseAnd` method enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

The `BigInteger.op_BitwiseAnd` method performs the bitwise `And` operation on two `BigInteger` values as if they were both in two's complement representation with virtual sign extension.

## BigInteger.op_BitwiseOr(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger operator | (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Performs a bitwise `Or` operation on two `BigInteger` values.

Parameters:

- `left`: The first value.
- `right`: The second value.

Returns: The result of the bitwise `Or` operation.

#### Remarks
The `BigInteger.op_BitwiseOr` method defines the bitwise `Or` operation for `BigInteger` values. The bitwise `Or` operation sets a result bit only if either or both of the corresponding bits in `left` and `right` are set, as shown in the following table.

|Bit in `left`|Bit in `right`|Bit in result|
|-------------------|--------------------|-------------------|
|0|0|0|
|1|0|1|
|1|1|1|
|0|1|1|

The `BigInteger.op_BitwiseOr` method enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

The `BigInteger.op_BitwiseOr` method performs the bitwise `Or` operation on two `BigInteger` values as if they were both in two's complement representation with virtual sign extension.

## BigInteger.op_Decrement(BigInteger) method

```csharp
public static System.Numerics.BigInteger operator -- (System.Numerics.BigInteger value);
```

Decrements a `BigInteger` value by 1.

Parameters:

- `value`: The value to decrement.

Returns: The value of the `value` parameter decremented by 1.

#### Remarks
The `BigInteger.op_Decrement` method defines the decrement operation for `BigInteger` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/GreatestCommonDivisor/BigInteger_Examples.cs._

Languages that do not support custom operators can call the `BigInteger.Subtract` method instead. For example:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/op_BitwiseAnd/Operator1.cs._

Because `BigInteger` objects are immutable, the `BigInteger.op_Decrement` operator creates a new `BigInteger` object whose value is one less than the `BigInteger` object represented by `value`. This means that repeated calls to `BigInteger.op_Decrement` may be expensive.

The equivalent method for this operator is `Subtract`.
