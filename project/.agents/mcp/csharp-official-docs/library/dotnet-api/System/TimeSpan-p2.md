---
title: "TimeSpan struct (part 2 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 2 of 11)

## TimeSpan.Nanoseconds property

```csharp
public int Nanoseconds { get; }
```

Gets the nanoseconds component of the time interval represented by the current `TimeSpan` structure.

Returns: To be added.

#### Remarks

The `Nanoseconds` property represents whole nanoseconds, whereas the
`TotalNanoseconds` property represents whole and fractional nanoseconds.

## TimeSpan.Seconds property

```csharp
public int Seconds { get; }
```

Gets the seconds component of the time interval represented by the current `TimeSpan` structure.

Returns: The second component of the current `TimeSpan` structure. The return value ranges from -59 through 59.

#### Remarks
A `TimeSpan` value can be represented as [*-*]*d*.*hh*:*mm*:*ss*.*ff*, where the optional minus sign indicates a negative time interval, the *d* component is days, *hh* is hours as measured on a 24-hour clock, *mm* is minutes, *ss* is seconds, and *ff* is fractions of a second. The value of the `Seconds` property is the seconds component, *ss*.

The `Seconds` property represents whole seconds, whereas the `TotalSeconds` property represents whole and fractional seconds.

#### Examples
The following example creates several `TimeSpan` objects and displays the `Seconds` property of each.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Days/properties.cs._

## TimeSpan.Ticks property

```csharp
public long Ticks { get; }
```

Gets the number of ticks that represent the value of the current `TimeSpan` structure.

Returns: The number of ticks contained in this instance.

#### Remarks
The smallest unit of time is the tick, which is equal to 100 nanoseconds or one ten-millionth of a second. There are 10,000 ticks in a millisecond. The value of the `Ticks` property can be negative or positive to represent a negative or positive time interval.

#### Examples
The following example creates several `TimeSpan` objects and displays the `Ticks` property of each.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Days/properties.cs._

## TimeSpan.TotalDays property

```csharp
public double TotalDays { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional days.

Returns: The total number of days represented by this instance.

#### Remarks
This property converts the value of this instance from ticks to days. This number might include whole and fractional days.

The `TotalDays` property represents whole and fractional days, whereas the `Days` property represents whole days.

#### Examples
The following example instantiates a `TimeSpan` object and displays the value of its `TotalDays` property. It also displays the value of each component (hours, minutes, seconds, milliseconds) that forms the fractional part of the value of its `TotalDays` property.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TotalDays/totaldays.cs._

## TimeSpan.TotalHours property

```csharp
public double TotalHours { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional hours.

Returns: The total number of hours represented by this instance.

#### Remarks
This property converts the value of this instance from ticks to hours. This number might include whole and fractional hours.

The `TotalHours` property represents whole and fractional hours, whereas the `Hours` property represents whole hours.

#### Examples
The following example instantiates a `TimeSpan` object and displays the value its `TotalHours` property. It also displays the value of each component (hours, minutes, seconds, and milliseconds) that forms the fractional part of the value of its `TotalHours` property.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TotalHours/totalhours.cs._

## TimeSpan.TotalMicroseconds property

```csharp
public double TotalMicroseconds { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional microseconds.

Returns: To be added.

#### Remarks

This property converts the value of this instance from ticks to microseconds.
This number might include whole and fractional microseconds.

The `TotalMicroseconds` property represents whole and fractional microseconds,
whereas the `Microseconds` property represents whole microseconds.

## TimeSpan.TotalMilliseconds property

```csharp
public double TotalMilliseconds { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional milliseconds.

Returns: The total number of milliseconds represented by this instance.

#### Remarks
This property converts the value of this instance from ticks to milliseconds. This number might include whole and fractional milliseconds.

The `TotalMilliseconds` property represents whole and fractional milliseconds, whereas the `Milliseconds` property represents whole milliseconds.

#### Examples
The following example instantiates a `TimeSpan` object and displays the value of its `TotalMilliseconds` property.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TotalMilliseconds/totalmilliseconds.cs._

## TimeSpan.TotalMinutes property

```csharp
public double TotalMinutes { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional minutes.

Returns: The total number of minutes represented by this instance.

#### Remarks
This property converts the value of this instance from ticks to minutes. This number might include whole and fractional minutes.

The `TotalMinutes` property represents whole and fractional minutes, whereas the `Minutes` property represents whole minutes.

#### Examples
The following example instantiates a `TimeSpan` object and displays the value of its `TotalMinutes` property. It also displays the value of each component (seconds, milliseconds) that forms the fractional part of the value of its `TotalMinutes` property.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TotalMinutes/totalminutes.cs._

## TimeSpan.TotalNanoseconds property

```csharp
public double TotalNanoseconds { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional nanoseconds.

Returns: To be added.

#### Remarks

This property converts the value of this instance from ticks to nanoseconds.
This number might include whole and fractional nanoseconds.

The `TotalNanoseconds` property represents whole and fractional nanoseconds,
whereas the `Nanoseconds` property represents whole nanoseconds.

## TimeSpan.TotalSeconds property

```csharp
public double TotalSeconds { get; }
```

Gets the value of the current `TimeSpan` structure expressed in whole and fractional seconds.

Returns: The total number of seconds represented by this instance.

#### Remarks
This property converts the value of this instance from ticks to seconds. This number might include whole and fractional seconds.

The `TotalSeconds` property represents whole and fractional seconds, whereas the `Seconds` property represents whole seconds.

#### Examples
The following example instantiates a `TimeSpan` object and displays the value of its `TotalSeconds` property. It also displays the value of its milliseconds component, which forms the fractional part of the value of its `TotalSeconds` property.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TotalSeconds/totalseconds.cs._

## TimeSpan.Add(TimeSpan) method

```csharp
public TimeSpan Add (TimeSpan ts);
```

Returns a new `TimeSpan` object whose value is the sum of the specified `TimeSpan` object and this instance.

Parameters:

- `ts`: The time interval to add.

Returns: A new object that represents the value of this instance plus the value of `ts`.

Exceptions:

- `OverflowException`: The resulting `TimeSpan` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The return value must be between `MinValue` and `MaxValue`; otherwise, an exception is thrown.

The return value is a new `TimeSpan`; the original `TimeSpan` is not modified.

#### Examples
The following example calls the `TimeSpan.Add` method to add each element in an array of time intervals to a base `TimeSpan` value.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Add/add1.cs._

## TimeSpan.Compare(TimeSpan, TimeSpan) method

```csharp
public static int Compare (TimeSpan t1, TimeSpan t2);
```

Compares two `TimeSpan` values and returns an integer that indicates whether the first value is shorter than, equal to, or longer than the second value.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: One of the following values.

-  -1

: `t1` is shorter than `t2`.

-  0

: `t1` is equal to `t2`.

-  1

: `t1` is longer than `t2`.

#### Examples
The following example uses the `TimeSpan.Compare` method to compare several `TimeSpan` objects with a `TimeSpan` object whose value is a 2-hour time interval.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Compare/compare1.cs._

## TimeSpan.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an integer that indicates whether this instance is shorter than, equal to, or longer than the specified object.

Parameters:

- `value`: An object to compare, or `null`.

Returns: One of the following values.

-  -1

:  This instance is shorter than `value`.

-  0

:  This instance is equal to `value`.

-  1

:  This instance is longer than `value`, or `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `TimeSpan`.

#### Remarks
Any instance of `TimeSpan`, regardless of its value, is considered greater than `null`.

The `value` parameter must be an instance of `TimeSpan` or `null`; otherwise, an exception is thrown.

#### Examples
The following example compares several `TimeSpan` structures and other objects to a reference `TimeSpan` structure using the `TimeSpan.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/CompareTo/cto_eq_obj.cs._

## TimeSpan.CompareTo(TimeSpan) method

```csharp
public int CompareTo (TimeSpan value);
```

Compares this instance to a specified `TimeSpan` object and returns an integer that indicates whether this instance is shorter than, equal to, or longer than the `TimeSpan` object.

Parameters:

- `value`: An object to compare to this instance.

Returns: A signed number indicating the relative values of this instance and `value`.

-  A negative integer

:  This instance is shorter than `value`.

-  Zero

:  This instance is equal to `value`.

-  A positive integer

:  This instance is longer than `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `TimeSpan.CompareTo` method because it does not have to convert the `value` parameter to an object.

#### Examples
The following example demonstrates generic and nongeneric versions of the `TimeSpan.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## TimeSpan.Divide(Double) method

```csharp
public TimeSpan Divide (double divisor);
```

Returns a new `TimeSpan` object whose value is the result of dividing this instance by the specified `divisor`.

Parameters:

- `divisor`: The divisor or value to be divided by.

Returns: A new object that represents the value of this instance divided by the value of `divisor`.

To be added.

## TimeSpan.Divide(TimeSpan) method

```csharp
public double Divide (TimeSpan ts);
```

Returns a new `Double` value that's the result of dividing this instance by `ts`.

Parameters:

- `ts`: The value to be divided by.

Returns: A new value that represents result of dividing this instance by the value of `ts`.

To be added.

## TimeSpan.Duration() method

```csharp
public TimeSpan Duration ();
```

Returns a new `TimeSpan` object whose value is the absolute value of the current `TimeSpan` object.

Returns: A new object whose value is the absolute value of the current `TimeSpan` object.

Exceptions:

- `OverflowException`: The value of this instance is <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see>.

#### Examples
The following example applies the `TimeSpan.Duration` method to several `TimeSpan` objects.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Duration/dura_nega_una.cs._

## TimeSpan.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `value`: An object to compare with this instance.

Returns: `true` if `value` is a `TimeSpan` object that represents the same time interval as the current `TimeSpan` structure; otherwise, `false`.

#### Examples
The following example compares several `TimeSpan` and other objects to a reference `TimeSpan` using the `TimeSpan.Equals` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/CompareTo/cto_eq_obj.cs._

## TimeSpan.Equals(TimeSpan) method

```csharp
public bool Equals (TimeSpan obj);
```

Returns a value indicating whether this instance is equal to a specified `TimeSpan` object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` represents the same time interval as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `TimeSpan.Equals` because it does not have to convert the `obj` parameter to an object.

#### Examples
The following example demonstrates generic and nongeneric versions of the `TimeSpan.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## TimeSpan.Equals(TimeSpan, TimeSpan) method

```csharp
public static bool Equals (TimeSpan t1, TimeSpan t2);
```

Returns a value that indicates whether two specified instances of `TimeSpan` are equal.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the values of `t1` and `t2` are equal; otherwise, `false`.

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` object using the static `TimeSpan.Equals` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/CompareTo/comp_equal.cs._
