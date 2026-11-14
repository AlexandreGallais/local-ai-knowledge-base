---
title: "TimeOnly struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeOnly struct

Namespace: `System`

```csharp
public readonly struct TimeOnly : IComparable, IComparable<TimeOnly>, IEquatable<TimeOnly>, IParsable<TimeOnly>, ISpanFormattable, ISpanParsable<TimeOnly>, IUtf8SpanFormattable
```

Represents a time of day, as would be read from a clock, within the range 00:00:00 to 23:59:59.9999999.

The `TryParse` and `TryParseExact` methods return `false` when the input doesn't match a valid format. In .NET 11 and later, they throw `ArgumentException` when a supplied `DateTimeStyles` value or format specifier is invalid.

## TimeOnly.TimeOnly(Int64) constructor

```csharp
public TimeOnly (long ticks);
```

Initializes a new instance of the `TimeOnly` structure using a specified number of ticks.

Parameters:

- `ticks`: A time of day expressed in the number of 100-nanosecond units since 00:00:00.0000000.

To be added.

## TimeOnly.TimeOnly(Int32, Int32) constructor

```csharp
public TimeOnly (int hour, int minute);
```

Initializes a new instance of the `TimeOnly` structure to the specified hour and the minute.

Parameters:

- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).

To be added.

## TimeOnly.TimeOnly(Int32, Int32, Int32) constructor

```csharp
public TimeOnly (int hour, int minute, int second);
```

Initializes a new instance of the `TimeOnly` structure to the specified hour, minute, and second.

Parameters:

- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).

To be added.

## TimeOnly.TimeOnly(Int32, Int32, Int32, Int32) constructor

```csharp
public TimeOnly (int hour, int minute, int second, int millisecond);
```

Initializes a new instance of the `TimeOnly` structure to the specified hour, minute, second, and millisecond.

Parameters:

- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The millisecond (0 through 999).

To be added.

## TimeOnly.TimeOnly(Int32, Int32, Int32, Int32, Int32) constructor

```csharp
public TimeOnly (int hour, int minute, int second, int millisecond, int microsecond);
```

Initializes a new instance of the `TimeOnly` structure to the specified hour, minute, second, millisecond, and microsecond.

Parameters:

- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The millisecond (0 through 999).
- `microsecond`: The microsecond (0 through 999).

To be added.

## TimeOnly.Hour property

```csharp
public int Hour { get; }
```

Gets the hour component of the time represented by this instance.

Returns: To be added.

To be added.

## TimeOnly.MaxValue property

```csharp
public static TimeOnly MaxValue { get; }
```

Gets the largest possible value of `TimeOnly`.

Returns: The largest possible value of `TimeOnly`, which is 23:59:59.9999999.

To be added.

## TimeOnly.Microsecond property

```csharp
public int Microsecond { get; }
```

Gets the microsecond component of the time represented by this instance.

Returns: To be added.

To be added.

## TimeOnly.Millisecond property

```csharp
public int Millisecond { get; }
```

Gets the millisecond component of the time represented by this instance.

Returns: A number representing the millisecond component of this `TimeOnly`.

To be added.

## TimeOnly.Minute property

```csharp
public int Minute { get; }
```

Gets the minute component of the time represented by this instance.

Returns: A number representing the minute component of this `TimeOnly`.

To be added.

## TimeOnly.MinValue property

```csharp
public static TimeOnly MinValue { get; }
```

Gets the smallest possible value of `TimeOnly`.

Returns: The smallest possible value of `TimeOnly`, which is 00:00:00 (midnight).

To be added.

## TimeOnly.Nanosecond property

```csharp
public int Nanosecond { get; }
```

Gets the nanosecond component of the time represented by this instance.

Returns: To be added.

To be added.

## TimeOnly.Second property

```csharp
public int Second { get; }
```

Gets the seconds component of the time represented by this instance.

Returns: A number representing the seconds component of this instance.

To be added.

## TimeOnly.Ticks property

```csharp
public long Ticks { get; }
```

Gets the number of ticks that represent the time of this instance.

Returns: A number representing the number of ticks of this instance.

To be added.

## TimeOnly.Add(TimeSpan) method

```csharp
public TimeOnly Add (TimeSpan value);
```

Returns a new `TimeOnly` that adds the value of the specified time span to the value of this instance.

Parameters:

- `value`: A positive or negative time interval.

Returns: An object whose value is the sum of the time represented by this instance and the time interval represented by value.

To be added.

## TimeOnly.Add(TimeSpan, Int32) method

```csharp
public TimeOnly Add (TimeSpan value, out int wrappedDays);
```

Returns a new `TimeOnly` that adds the value of the specified time span to the value of this instance.
If the result wraps past the end of the day, this method returns the number of excess days as an out parameter.

Parameters:

- `value`: A positive or negative time interval.
- `wrappedDays`: When this method returns, contains the number of excess days, if any, that resulted from wrapping during this addition operation.

Returns: An object whose value is the sum of the time represented by this instance and the time interval represented by value.

To be added.

## TimeOnly.AddHours(Double) method

```csharp
public TimeOnly AddHours (double value);
```

Returns a new `TimeOnly` that adds the specified number of hours to the value of this instance.

Parameters:

- `value`: A number of whole and fractional hours. The value parameter can be negative or positive.

Returns: An object whose value is the sum of the time represented by this instance and the number of hours represented by value.

To be added.

## TimeOnly.AddHours(Double, Int32) method

```csharp
public TimeOnly AddHours (double value, out int wrappedDays);
```

Returns a new `TimeOnly` that adds the specified number of hours to the value of this instance.
If the result wraps past the end of the day, this method returns the number of excess days as an out parameter.

Parameters:

- `value`: A number of whole and fractional hours. The value parameter can be negative or positive.
- `wrappedDays`: When this method returns, contains the number of excess days, if any, that resulted from wrapping during this addition operation.

Returns: An object whose value is the sum of the time represented by this instance and the number of hours represented by value.

To be added.

## TimeOnly.AddMinutes(Double) method

```csharp
public TimeOnly AddMinutes (double value);
```

Returns a new `TimeOnly` that adds the specified number of minutes to the value of this instance.

Parameters:

- `value`: A number of whole and fractional minutes. The value parameter can be negative or positive.

Returns: An object whose value is the sum of the time represented by this instance and the number of minutes represented by value.

To be added.

## TimeOnly.AddMinutes(Double, Int32) method

```csharp
public TimeOnly AddMinutes (double value, out int wrappedDays);
```

Returns a new `TimeOnly` that adds the specified number of minutes to the value of this instance.
If the result wraps past the end of the day, this method returns the number of excess days as an out parameter.

Parameters:

- `value`: A number of whole and fractional minutes. The value parameter can be negative or positive.
- `wrappedDays`: When this method returns, contains the number of excess days, if any, that resulted from wrapping during this addition operation.

Returns: An object whose value is the sum of the time represented by this instance and the number of minutes represented by value.

To be added.

## TimeOnly.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares the value of this instance to a specified object that contains a specified `TimeOnly` value, and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified `TimeOnly` value.

Parameters:

- `value`: A boxed object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and the value parameter.
Less than zero if this instance is earlier than value.
Zero if this instance is the same as value.
Greater than zero if this instance is later than value.

To be added.

## TimeOnly.CompareTo(TimeOnly) method

```csharp
public int CompareTo (TimeOnly value);
```

Compares the value of this instance to a specified `TimeOnly` value and indicates whether this instance is earlier than, the same as, or later than the specified `TimeOnly` value.

Parameters:

- `value`: The object to compare to the current instance.

Returns: A signed number indicating the relative values of this instance and the value parameter.

- Less than zero if this instance is earlier than value.

- Zero if this instance is the same as value.

- Greater than zero if this instance is later than value.

To be added.

## TimeOnly.Deconstruct(Int32, Int32) method

```csharp
public void Deconstruct (out int hour, out int minute);
```

Deconstructs this `TimeOnly` instance into `TimeOnly.Hour` and `TimeOnly.Minute`.

Parameters:

- `hour`: When this method returns, contains the `TimeOnly.Hour` value for this `TimeOnly` instance.
- `minute`: When this method returns, contains the `TimeOnly.Minute` value for this `TimeOnly` instance.

To be added.

## TimeOnly.Deconstruct(Int32, Int32, Int32) method

```csharp
public void Deconstruct (out int hour, out int minute, out int second);
```

Deconstructs this `TimeOnly` instance into `TimeOnly.Hour`, `TimeOnly.Minute`, and `TimeOnly.Second`.

Parameters:

- `hour`: When this method returns, contains the `TimeOnly.Hour` value for this `TimeOnly` instance.
- `minute`: When this method returns, contains the `TimeOnly.Minute` value for this `TimeOnly` instance.
- `second`: When this method returns, contains the `TimeOnly.Second` value for this `TimeOnly` instance.

To be added.

## TimeOnly.Deconstruct(Int32, Int32, Int32, Int32) method

```csharp
public void Deconstruct (out int hour, out int minute, out int second, out int millisecond);
```

Deconstructs this `TimeOnly` instance into `TimeOnly.Hour`, `TimeOnly.Minute`, `TimeOnly.Second`, and `TimeOnly.Millisecond`.

Parameters:

- `hour`: When this method returns, contains the `TimeOnly.Hour` value for this `TimeOnly` instance.
- `minute`: When this method returns, contains the `TimeOnly.Minute` value for this `TimeOnly` instance.
- `second`: When this method returns, contains the `TimeOnly.Second` value for this `TimeOnly` instance.
- `millisecond`: When this method returns, contains the `TimeOnly.Millisecond` value for this `TimeOnly` instance.

To be added.

## TimeOnly.Deconstruct(Int32, Int32, Int32, Int32, Int32) method

```csharp
public void Deconstruct (out int hour, out int minute, out int second, out int millisecond, out int microsecond);
```

Deconstructs this `TimeOnly` instance into `TimeOnly.Hour`, `TimeOnly.Minute`, `TimeOnly.Second`, `TimeOnly.Millisecond`, and `TimeOnly.Microsecond`.

Parameters:

- `hour`: When this method returns, contains the `TimeOnly.Hour` value for this `TimeOnly` instance.
- `minute`: When this method returns, contains the `TimeOnly.Minute` value for this `TimeOnly` instance.
- `second`: When this method returns, contains the `TimeOnly.Second` value for this `TimeOnly` instance.
- `millisecond`: When this method returns, contains the `TimeOnly.Millisecond` value for this `TimeOnly` instance.
- `microsecond`: When this method returns, contains the `TimeOnly.Microsecond` value for this `TimeOnly` instance.

To be added.

## TimeOnly.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if value is an instance of `TimeOnly` and equals the value of this instance; otherwise, `false`.

To be added.

## TimeOnly.Equals(TimeOnly) method

```csharp
public bool Equals (TimeOnly value);
```

Returns a value indicating whether the value of this instance is equal to the value of the specified `TimeOnly` instance.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if the value parameter equals the value of this instance; otherwise, `false`.

To be added.

## TimeOnly.FromDateTime(DateTime) method

```csharp
public static TimeOnly FromDateTime (DateTime dateTime);
```

Constructs a `TimeOnly` object from a `DateTime` representing the time of the day in this `DateTime` object.

Parameters:

- `dateTime`: The `DateTime` object to extract the time of the day from.

Returns: A `TimeOnly` object representing time of the day specified in the `DateTime` object.

To be added.

## TimeOnly.FromTimeSpan(TimeSpan) method

```csharp
public static TimeOnly FromTimeSpan (TimeSpan timeSpan);
```

Constructs a `TimeOnly` object from a time span representing the time elapsed since midnight.

Parameters:

- `timeSpan`: The time interval measured since midnight. This value has to be positive and not exceeding the time of the day.

Returns: A `TimeOnly` object representing the time elapsed since midnight using the specified time span value.

To be added.

## TimeOnly.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## TimeOnly.IsBetween(TimeOnly, TimeOnly) method

```csharp
public bool IsBetween (TimeOnly start, TimeOnly end);
```

Determines if a time falls within the range provided.
Supports both "normal" ranges such as 10:00-12:00, and ranges that span midnight such as 23:00-01:00.

Parameters:

- `start`: The starting time of day, inclusive.
- `end`: The ending time of day, exclusive.

Returns: `true`, if the time falls within the range, `false` otherwise.

#### Remarks

If `start` and `end` are equal, this method returns `false`, meaning there is zero elapsed time between the two values.
If you wish to treat such cases as representing one or more whole days, then first check for equality before calling this method.

## TimeOnly.op_Equality(TimeOnly, TimeOnly) method

```csharp
public static bool operator == (TimeOnly left, TimeOnly right);
```

Determines whether two specified instances of `TimeOnly`are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left and right represent the same time; otherwise, `false`.

To be added.
