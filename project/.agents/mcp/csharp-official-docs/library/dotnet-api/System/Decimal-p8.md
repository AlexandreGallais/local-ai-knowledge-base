---
title: "Decimal struct (part 8 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 8 of 12)

## Decimal.Round(Decimal, MidpointRounding) method

```csharp
public static decimal Round (decimal d, MidpointRounding mode);
```

Rounds a decimal value to an integer using the specified rounding strategy.

Parameters:

- `d`: A decimal number to round.
- `mode`: One of the enumeration values that specifies which rounding strategy to use.

Returns: The integer that `d` is rounded to using the `mode` rounding strategy.

Exceptions:

- `ArgumentException`: `mode` is not a `MidpointRounding` value.
- `OverflowException`: The result is outside the range of a `Decimal` object.

#### Remarks

If you specify `ToEven` or `AwayFromZero` for the `mode` parameter, those rounding strategies are only applied for midpoint values, that is, values whose least significant digit is 5.

#### Examples

The following example displays values returned by the `Round` method with different `mode` arguments.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/midpoint1.cs._

## Decimal.Round(Decimal, Int32, MidpointRounding) method

```csharp
public static decimal Round (decimal d, int decimals, MidpointRounding mode);
```

Rounds a decimal value to the specified precision using the specified rounding strategy.

Parameters:

- `d`: A decimal number to round.
- `decimals`: The number of significant decimal places (precision) in the return value.
- `mode`: One of the enumeration values that specifies which rounding strategy to use.

Returns: The number that `d` is rounded to using the `mode` rounding strategy and with a precision of `decimals`. If the precision of `d` is less than `decimals`, `d` is returned unchanged.

Exceptions:

- `ArgumentOutOfRangeException`: `decimals` is less than 0 or greater than 28.
- `ArgumentException`: `mode` is not a `MidpointRounding` value.
- `OverflowException`: The result is outside the range of a `Decimal` object.

#### Remarks

The `decimals` parameter specifies the number of significant decimal places in the return value and ranges from 0 to 28. If `decimals` is zero, an integer is returned.

If you specify `ToEven` or `AwayFromZero` for the `mode` parameter, those rounding strategies are only applied for midpoint values, that is, values whose least significant digit is 5.

#### Examples
The following example demonstrates how to use the `Round` method with the `MidpointRounding` enumeration.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/mpr.cs._

## Decimal.Sign(Decimal) method

```csharp
public static int Sign (decimal d);
```

Computes the sign of a value.

Parameters:

- `d`: The value whose sign is to be computed.

Returns: A positive value if `d` is positive, `INumberBase<T>.Zero` if `d` is zero, and a negative value if `d` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## Decimal.Subtract(Decimal, Decimal) method

```csharp
public static decimal Subtract (decimal d1, decimal d2);
```

Subtracts a specified `Decimal` value from another.

Parameters:

- `d1`: The minuend.
- `d2`: The subtrahend.

Returns: The result of subtracting `d2` from `d1`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Examples
The following example illustrates the use of `Subtract`.

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/source.cs._

## Decimal.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToBoolean`.

Parameters:

- `provider`: This parameter is ignored.

Returns: `true` if the value of the current instance is not zero; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToBoolean` method.

## Decimal.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Byte`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToByte` method or the `Convert.ToByte` method.

## Decimal.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: None. This conversion is not supported.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## Decimal.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: None. This conversion is not supported.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## Decimal.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDecimal`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, unchanged.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface.

## Decimal.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDouble`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Double`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToDouble` method or the `Convert.ToDouble` method.

Because a `Double` has fewer significant digits than a `Decimal`, this operation may produce round-off errors.

## Decimal.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Int16`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToInt16` method or the `Convert.ToInt16` method.

The `Decimal` value is rounded toward zero to the nearest integer value.

## Decimal.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: The parameter is ignored.

Returns: The value of the current instance, converted to a `Int32`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToInt32` method or the `Convert.ToInt32` method.

The `Decimal` value is rounded toward zero to the nearest integer value.

## Decimal.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Int64`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToInt64` method or the `Convert.ToInt64` method.

## Decimal.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `SByte`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToSByte` method or the `Convert.ToSByte` method.

## Decimal.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSingle`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Single`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToSingle` method or the `Convert.ToSingle` method.

## Decimal.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The type to which to convert the value of this `Decimal` instance.
- `provider`: An `IFormatProvider` implementation that supplies culture-specific information about the format of the returned value.

Returns: The value of the current instance, converted to a `type`.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `InvalidCastException`: The requested type conversion is not supported.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `static` (`Shared` in Visual Basic) `Convert.ChangeType` method instead.

## Decimal.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt16`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToUInt16` method or the `Convert.ToUInt16` method.

## Decimal.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToUInt32` method or the `Convert.ToUInt32` method.

The `Decimal` value is rounded toward zero to the nearest integer value.

## Decimal.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

Exceptions:

- `OverflowException`: The resulting integer value is less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Decimal` instance is cast to an `IConvertible` interface. The recommended alternative is to call either the `Decimal.ToUInt64` method or the `Convert.ToUInt64` method.

The `Decimal` value is rounded toward zero to the nearest integer value.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.GetExponentByteCount() method

```csharp
int IFloatingPoint<decimal>.GetExponentByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

To be added.
