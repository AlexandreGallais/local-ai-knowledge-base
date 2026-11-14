---
title: "DateTime struct (part 13 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 13 of 18)

## DateTime.Subtract(TimeSpan) method

```csharp
public DateTime Subtract (TimeSpan value);
```

Returns a new `DateTime` that subtracts the specified duration from the value of this instance.

Parameters:

- `value`: The time interval to subtract.

Returns: An object that is equal to the date and time represented by this instance minus the time interval represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The result is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
The `Subtract` method returns the date that is a specified time interval difference from the current instance. To determine the time interval between two dates, call the `Subtract` method. To subtract a particular time interval from the current instance, call the method that adds that time interval to the current date, and supply a negative value as the method argument. For example, to subtract two months from the current date, call the `AddMonths` method with a value of -2.

This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation.

Ordinarily, the `Subtract` method subtracts a `TimeSpan` object that represents a positive time span and returns a `DateTime` value that is earlier than the date and time of the current instance. However, if the `TimeSpan` object represents a negative time span, the `Subtract` method returns a `DateTime` value that is later than the date and time of the current instance.

The `Subtract` method allows you to subtract a time interval that consists of more than one unit of time (such as a given number of hours and a given number of minutes). To subtract a single unit of time (such as years, months, or days) from the `DateTime` instance, you can pass a negative numeric value as a parameter to any of the following methods:

- `DateTime.AddYears`, to subtract a specific number of years from the current date and time instance.

- `DateTime.AddMonths`, to subtract a specific number of months from the current date and time instance.

- `DateTime.AddDays`, to subtract a specific number of days from the current date and time instance.

- `DateTime.AddHours`, to subtract a specific number of hours from the current date and time instance.

- `DateTime.AddMinutes`, to subtract a specific number of minutes from the current date and time instance.

- `DateTime.AddSeconds`, to subtract a specific number of seconds from the current date and time instance.

- `DateTime.AddMilliseconds`, to subtract a specific number of milliseconds from the current date and time instance.

- `DateTime.AddTicks`, to subtract a specific number of ticks from the current date and time instance.

#### Examples
The following example demonstrates the `DateTime.Subtract` method and the subtraction operator.

_Code sample not included: ~/snippets/csharp/System/DateTime/op_Subtraction/class1.cs._

## DateTime.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

Returns the current `DateTime` object.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The current object.

To be added.

## DateTime.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

Converts the current `DateTime` object to an object of a specified type.

Parameters:

- `type`: The desired type.
- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: An object of the type specified by the `type` parameter, with a value equivalent to the current `DateTime` object.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `InvalidCastException`: This conversion is not supported for the `DateTime` type.

To be added.

## DateTime.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: The return value for this member is not used.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## DateTime.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize the current `DateTime` object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination for this serialization. (This parameter is not used; specify `null`.)

Exceptions:

- `ArgumentNullException`: `info` is `null`.

#### Remarks
This method populates the `info` parameter with the `DateTime.Ticks` and `Kind` property values.

## DateTime.ToBinary() method

```csharp
public long ToBinary ();
```

Serializes the current `DateTime` object to a 64-bit binary value that subsequently can be used to recreate the `DateTime` object.

Returns: A 64-bit signed integer that encodes the `DateTime.Kind` and `DateTime.Ticks` properties.

Use the `DateTime.ToBinary` method to convert the value of the current `DateTime` object to a binary value. Subsequently, use the binary value and the `DateTime.FromBinary` method to recreate the original `DateTime` object.

> **Important:**
> In some cases, the `DateTime` value returned by the `DateTime.FromBinary` method is not identical to the original `DateTime` value supplied to the `DateTime.ToBinary` method. For more information, see the next section, "Local Time Adjustment".

A `DateTime` structure consists of a private `Kind` field, which indicates whether the specified time value is based on local time, Coordinated Universal Time (UTC), or neither, concatenated to a private `Ticks` field, which contains the number of 100-nanosecond ticks that specify a date and time.

#### Local time adjustment

A local time, which is a Coordinated Universal Time adjusted to the local time zone, is represented by a `DateTime` structure whose `Kind` property has the value `Local`. When restoring a local `DateTime` value from the binary representation that is produced by the `DateTime.ToBinary` method, the `DateTime.FromBinary` method may adjust the recreated value so that it is not equal to the original value. This can occur under the following conditions:

- If a local `DateTime` object is serialized in one time zone by the `DateTime.ToBinary` method, and then deserialized in a different time zone by the `DateTime.FromBinary` method, the local time represented by the resulting `DateTime` object is automatically adjusted to the second time zone.

For example, consider a `DateTime` object that represents a local time of 3 P.M. An application that is executing in the U.S. Pacific Time zone uses the `DateTime.ToBinary` method to convert that `DateTime` object to a binary value. Another application that is executing in the U.S. Eastern Time zone then uses the `DateTime.FromBinary` method to convert the binary value to a new `DateTime` object. The value of the new `DateTime` object is 6 P.M., which represents the same point in time as the original 3 P.M. value, but is adjusted to local time in the Eastern Time zone.

- If the binary representation of a local `DateTime` value represents an invalid time in the local time zone of the system on which `DateTime.FromBinary` is called, the time is adjusted so that it is valid.

For example, the transition from standard time to daylight saving time occurs in the Pacific Time zone of the United States on March 14, 2010, at 2:00 A.M., when the time advances by one hour, to 3:00 A.M. This hour interval is an invalid time, that is, a time interval that does not exist in this time zone. The following example shows that when a time that falls within this range is converted to a binary value by the `DateTime.ToBinary` method and is then restored by the `DateTime.FromBinary` method, the original value is adjusted to become a valid time. You can determine whether a particular date and time value may be subject to modification by passing it to the `TimeZoneInfo.IsInvalidTime` method, as the example illustrates.

_Code sample not included: ~/snippets/csharp/System/DateTime/FromBinary/frombinary1.cs._
