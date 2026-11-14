---
title: "TimeSpan struct (part 3 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 3 of 11)

## TimeSpan.FromDays(Double) method

```csharp
public static TimeSpan FromDays (double value);
```

Returns a `TimeSpan` that represents a specified number of days, where the specification is accurate to the nearest millisecond.

Parameters:

- `value`: A number of days, accurate to the nearest millisecond.

Returns: An object that represents `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

`value` is `Double.PositiveInfinity`.

-or-

`value` is `Double.NegativeInfinity`.
- `ArgumentException`: `value` is equal to `Double.NaN`.

#### Remarks
The `value` parameter is converted to milliseconds, which is converted to ticks, and that number of ticks is used to initialize the new `TimeSpan`. Therefore, `value` will only be considered accurate to the nearest millisecond. Note that, because of the loss of precision of the `Double` data type, this conversion can cause an `OverflowException` for values that are near to but still in the range of either `MinValue` or `MaxValue`. For example, this causes an `OverflowException` in the following attempt to instantiate a `TimeSpan` object.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/System.TimeSpan.FromMinutes.cs._

#### Examples
The following example creates several `TimeSpan` objects using the `TimeSpan.FromDays` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/fromdays.cs._

## TimeSpan.FromDays(Int32) method

```csharp
public static TimeSpan FromDays (int days);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of days.

Parameters:

- `days`: Number of days.

Returns: Returns a `TimeSpan` that represents a specified number of days.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromDays(Int32, Int32, Int64, Int64, Int64, Int64) method

```csharp
public static TimeSpan FromDays (int days, int hours = 0, long minutes = 0, long seconds = 0, long milliseconds = 0, long microseconds = 0);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of days, hours, minutes, seconds, milliseconds, and microseconds.

Parameters:

- `days`: Number of days.
- `hours`: Number of hours.
- `minutes`: Number of minutes.
- `seconds`: Number of seconds.
- `milliseconds`: Number of milliseconds.
- `microseconds`: Number of microseconds.

Returns: Returns a `TimeSpan` that represents a specified number of days, hours, minutes, seconds, milliseconds, and microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromHours(Double) method

```csharp
public static TimeSpan FromHours (double value);
```

Returns a `TimeSpan` that represents a specified number of hours, where the specification is accurate to the nearest millisecond.

Parameters:

- `value`: A number of hours accurate to the nearest millisecond.

Returns: An object that represents `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

`value` is `Double.PositiveInfinity`.

-or-

`value` is `Double.NegativeInfinity`.
- `ArgumentException`: `value` is equal to `Double.NaN`.

#### Remarks
The `value` parameter is converted to milliseconds, which is converted to ticks, and that number of ticks is used to initialize the new `TimeSpan`. Therefore, `value` will only be considered accurate to the nearest millisecond. Note that, because of the loss of precision of the `Double` data type, this conversion can generate an `OverflowException` for values that are near to but still in the range of either `MinValue` or `MaxValue`. For example, this causes an `OverflowException` in the following attempt to instantiate a `TimeSpan` object.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/System.TimeSpan.FromMinutes.cs._

#### Examples
The following example creates several `TimeSpan` objects using the `TimeSpan.FromHours` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/fromhours.cs._

## TimeSpan.FromHours(Int32) method

```csharp
public static TimeSpan FromHours (int hours);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of hours.

Parameters:

- `hours`: Number of hours.

Returns: Returns a `TimeSpan` that represents a specified number of hours.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromHours(Int32, Int64, Int64, Int64, Int64) method

```csharp
public static TimeSpan FromHours (int hours, long minutes = 0, long seconds = 0, long milliseconds = 0, long microseconds = 0);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of hours, minutes, seconds, milliseconds, and microseconds.

Parameters:

- `hours`: Number of hours.
- `minutes`: Number of minutes.
- `seconds`: Number of seconds.
- `milliseconds`: Number of milliseconds.
- `microseconds`: Number of microseconds.

Returns: Returns a `TimeSpan` that represents a specified number of hours, minutes, seconds, milliseconds, and microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromMicroseconds(Double) method

```csharp
public static TimeSpan FromMicroseconds (double value);
```

Returns a `TimeSpan` that represents a specified number of microseconds.

Parameters:

- `value`: A number of microseconds.

Returns: An object that represents `value`.

Exceptions:

- `OverflowException`: `value` is less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`.

-or-

`value` is `Double.PositiveInfinity`

-or-

`value` is `Double.NegativeInfinity`
- `ArgumentException`: `value` is equal to `Double.NaN`.

To be added.

## TimeSpan.FromMicroseconds(Int64) method

```csharp
public static TimeSpan FromMicroseconds (long microseconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of microseconds.

Parameters:

- `microseconds`: Number of microseconds.

Returns: Returns a `TimeSpan` that represents a specified number of microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromMilliseconds(Double) method

```csharp
public static TimeSpan FromMilliseconds (double value);
```

Returns a `TimeSpan` that represents a specified number of milliseconds.

Parameters:

- `value`: A number of milliseconds.

Returns: An object that represents `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

`value` is `Double.PositiveInfinity`.

-or-

`value` is `Double.NegativeInfinity`.
- `ArgumentException`: `value` is equal to `Double.NaN`.

#### Remarks
The `value` parameter is converted to ticks, and that number of ticks is used to initialize the new `TimeSpan`. Therefore, `value` will only be considered accurate to the nearest millisecond. Note that, because of the loss of precision of the `Double` data type, this conversion can generate an `OverflowException` for values that are near to but still in the range of either `MinValue` or `MaxValue`. For example, this causes an `OverflowException` in the following attempt to instantiate a `TimeSpan` object.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/System.TimeSpan.FromMinutes.cs._

#### Examples
The following example creates several `TimeSpan` objects by using the `TimeSpan.FromMilliseconds` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/frommillisec.cs._

## TimeSpan.FromMilliseconds(Int64) method

```csharp
public static TimeSpan FromMilliseconds (long milliseconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of milliseconds.

Parameters:

- `milliseconds`: The number of milliseconds.

Returns: Returns a `TimeSpan` that represents a specified number of milliseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The specified milliseconds specifies a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromMilliseconds(Int64, Int64) method

```csharp
public static TimeSpan FromMilliseconds (long milliseconds, long microseconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of milliseconds, and microseconds.

Parameters:

- `milliseconds`: Number of milliseconds.
- `microseconds`: Number of microseconds.

Returns: Returns a `TimeSpan` that represents a specified number of milliseconds, and microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromMinutes(Double) method

```csharp
public static TimeSpan FromMinutes (double value);
```

Returns a `TimeSpan` that represents a specified number of minutes, where the specification is accurate to the nearest millisecond.

Parameters:

- `value`: A number of minutes, accurate to the nearest millisecond.

Returns: An object that represents `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

`value` is `Double.PositiveInfinity`.

-or-

`value` is `Double.NegativeInfinity`.
- `ArgumentException`: `value` is equal to `Double.NaN`.

#### Remarks
The `value` parameter is converted to milliseconds, which is converted to ticks, and that number of ticks is used to initialize the new `TimeSpan`. Therefore, `value` will only be considered accurate to the nearest millisecond. Note that, because of the loss of precision of the `Double` data type, this conversion can generate an `OverflowException` for values that are near to but still in the range of either `MinValue` or `MaxValue`. For example, this causes an `OverflowException` in the following attempt to instantiate a `TimeSpan` object.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/System.TimeSpan.FromMinutes.cs._

#### Examples
The following example creates several `TimeSpan` objects using the `TimeSpan.FromMinutes` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/fromminutes.cs._

## TimeSpan.FromMinutes(Int64) method

```csharp
public static TimeSpan FromMinutes (long minutes);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of minutes.

Parameters:

- `minutes`: Number of minutes.

Returns: Returns a `TimeSpan` that represents a specified number of minutes.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromMinutes(Int64, Int64, Int64, Int64) method

```csharp
public static TimeSpan FromMinutes (long minutes, long seconds = 0, long milliseconds = 0, long microseconds = 0);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of minutes, seconds, milliseconds, and microseconds.

Parameters:

- `minutes`: Number of minutes.
- `seconds`: Number of seconds.
- `milliseconds`: Number of milliseconds.
- `microseconds`: Number of microseconds.

Returns: Returns a `TimeSpan` that represents a specified number of minutes, seconds, milliseconds, and microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

To be added.

## TimeSpan.FromSeconds(Double) method

```csharp
public static TimeSpan FromSeconds (double value);
```

Returns a `TimeSpan` that represents a specified number of seconds, where the specification is accurate to the nearest millisecond.

Parameters:

- `value`: A number of seconds, accurate to the nearest millisecond.

Returns: An object that represents `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

`value` is `Double.PositiveInfinity`.

-or-

`value` is `Double.NegativeInfinity`.
- `ArgumentException`: `value` is equal to `Double.NaN`.

#### Remarks
The `value` parameter is converted to milliseconds, which is converted to ticks, and that number of ticks is used to initialize the new `TimeSpan`. Therefore, `value` will only be considered accurate to the nearest millisecond. Note that, because of the loss of precision of the `Double` data type, this can generate an `OverflowException` for values that are near but still in the range of either  `MinValue` or `MaxValue`, This is the cause of an `OverflowException`, for example, in the following attempt to instantiate a `TimeSpan` object.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/System.TimeSpan.FromMinutes.cs._

#### Examples
The following example creates several `TimeSpan` objects using the `TimeSpan.FromSeconds` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/fromseconds.cs._

## TimeSpan.FromSeconds(Int64) method

```csharp
public static TimeSpan FromSeconds (long seconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of seconds.

Parameters:

- `seconds`: Number of seconds.

Returns: Returns a `TimeSpan` that represents a specified number of seconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`.

To be added.
