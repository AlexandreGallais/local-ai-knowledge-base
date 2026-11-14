---
title: "DateTimeOffset struct (part 4 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 4 of 15)

## DateTimeOffset.Add(TimeSpan) method

```csharp
public DateTimeOffset Add (TimeSpan timeSpan);
```

Returns a new `DateTimeOffset` object that adds a specified time interval to the value of this instance.

Parameters:

- `timeSpan`: A `TimeSpan` object that represents a positive or a negative time interval.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the time interval represented by `timeSpan`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
You can use the `DateTimeOffset.Add` method to add more than one kind of time interval (days, hours, minutes, seconds, or milliseconds) in a single operation. This method's behavior is identical to the addition operator. The `DateTimeOffset` structure also supports specialized addition methods (such as `DateTimeOffset.AddDays`, `DateTimeOffset.AddHours`, and `DateTimeOffset.AddMinutes`) for each time interval.

> **Note:**
>  This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `timeSpan` to its date and time.

The `DateTimeOffset.Add` method does not affect the value of the current `DateTimeOffset` object's `Offset` property.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.Add` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.

If the `timeSpan` parameter is `null`, this method returns the value of the original `DateTimeOffset` object unchanged.

#### Examples
The following example creates an array of `TimeSpan` objects that represent the flight times between destinations. The `DateTimeOffset.Add` method then adds these times to a `DateTimeOffset` object that represents a flight's initial takeoff time. The result reflects the scheduled arrival time at each destination.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.AddDays(Double) method

```csharp
public DateTimeOffset AddDays (double days);
```

Returns a new `DateTimeOffset` object that adds a specified number of whole and fractional days to the value of this instance.

Parameters:

- `days`: A number of whole and fractional days. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of days represented by `days`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks

The fractional part of the `days` parameter is the fractional part of a day. For example, 4.5 is equivalent to 4 days, 12 hours, 0 minutes, 0 seconds, 0 milliseconds.

The full `Double` precision of the `days` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

> **Note:**
> This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `days` to its date and time.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.AddDays` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.

Converting time intervals of less than a day to a fraction can involve a loss of precision. If this is problematic, you can use the `DateTimeOffset.Add` method, which enables you to specify more than one kind of time interval in a single method call and eliminates the need to convert time intervals to fractional parts of a day.

#### Examples
The following example uses the `DateTimeOffset.AddDays` method to list the dates that fall on Monday, the start of the work week, in March 2008.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.AddHours(Double) method

```csharp
public DateTimeOffset AddHours (double hours);
```

Returns a new `DateTimeOffset` object that adds a specified number of whole and fractional hours to the value of this instance.

Parameters:

- `hours`: A number of whole and fractional hours. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of hours represented by `hours`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks

The fractional part of the `hours` parameter is the fractional part of an hour. For example, 4.5 is equivalent to 4 hours, 30 minutes, 0 seconds, 0 milliseconds.

The full `Double` precision of the `hours` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

> **Note:**
> This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `hours` to its date and time.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.AddHours` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.

Converting time intervals of less than an hour to a fraction can involve a loss of precision. (For example, one minute is 0.01666 of an hour.) If this is problematic, you can use the `DateTimeOffset.Add` method, which enables you to specify more than one kind of time interval in a single method call and eliminates the need to convert time intervals to fractional parts of an hour.

#### Examples
The following example uses the `DateTimeOffset.AddHours` method to list the start times of work shifts for a particular week at an office that has two eight-hour shifts per day.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.AddMicroseconds(Double) method

```csharp
public DateTimeOffset AddMicroseconds (double microseconds);
```

Returns a new `DateTimeOffset` object that adds a specified number of microseconds to the value of this instance.

Parameters:

- `microseconds`: A number of whole and fractional microseconds. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of whole microseconds represented by `microseconds`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks

The fractional part of value is the fractional part of a microsecond.
For example, 4.5 is equivalent to 4 microseconds and 50 ticks, where one microseconds = 10 ticks.
However, `microseconds` is rounded to the nearest microsecond; all values of .5 or greater are rounded up.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone,
the `AddMicroseconds` method does not consider a particular time zone's adjustment rules
when it performs date and time arithmetic.

## DateTimeOffset.AddMilliseconds(Double) method

```csharp
public DateTimeOffset AddMilliseconds (double milliseconds);
```

Returns a new `DateTimeOffset` object that adds a specified number of milliseconds to the value of this instance.

Parameters:

- `milliseconds`: A number of whole and fractional milliseconds. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of whole milliseconds represented by `milliseconds`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks

The fractional part of the `milliseconds` parameter is the fractional part of a millisecond. For example, 4.5 is equivalent to 4 milliseconds and 5000 ticks, where one millisecond equals 10,000 ticks. The full `Double` precision of the `milliseconds` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

> **Note:**
> This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `milliseconds` to its date and time.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.AddMilliseconds` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.

## DateTimeOffset.AddMinutes(Double) method

```csharp
public DateTimeOffset AddMinutes (double minutes);
```

Returns a new `DateTimeOffset` object that adds a specified number of whole and fractional minutes to the value of this instance.

Parameters:

- `minutes`: A number of whole and fractional minutes. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of minutes represented by `minutes`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks

The fractional part of the `minutes` parameter is the fractional part of a minute. For example, 4.5 is equivalent to 4 minutes, 30 seconds, 0 milliseconds.

The full `Double` precision of the `minutes` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

> **Note:**
> This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `minutes` to its date and time.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.AddMinutes` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.

Converting time intervals of less than a minute to a fraction can involve a loss of precision. (For example, one second is 0.01666 of a minute.) If this is problematic, you can use the `DateTimeOffset.Add` method, which enables you to specify more than one kind of time interval in a single method call and eliminates the need to convert time intervals to fractional parts of a minute.

## DateTimeOffset.AddMonths(Int32) method

```csharp
public DateTimeOffset AddMonths (int months);
```

Returns a new `DateTimeOffset` object that adds a specified number of months to the value of this instance.

Parameters:

- `months`: A number of whole months. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of months represented by `months`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
Unlike most of the other methods that add a single time interval unit (such as minutes or days) to a date and time value, `DateTimeOffset.AddMonths` does not enable you to add fractional parts of a month. To add a time that consists of other time units in addition to months to a `DateTimeOffset` object, use the `DateTimeOffset.Add` method.

> **Note:**
>  This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `months` to its date and time.

#### Examples
The following example uses the `DateTimeOffset.AddMonths` method to display the start date of each quarter of the year 2007.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.AddSeconds(Double) method

```csharp
public DateTimeOffset AddSeconds (double seconds);
```

Returns a new `DateTimeOffset` object that adds a specified number of whole and fractional seconds to the value of this instance.

Parameters:

- `seconds`: A number of whole and fractional seconds. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of seconds represented by `seconds`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
The fractional part of the `seconds` parameter is the fractional part of a second. The value of fractional parts of a second are shown in the following table.

|Second value|Equivalent|
|------------------|----------------|
|.1 second|100 milliseconds|
|.01 second|10 milliseconds|
|.001 second|1 millisecond|

The full `Double` precision of the `seconds` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

> **Note:**
> This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `seconds` to its date and time.

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.AddSeconds` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.
