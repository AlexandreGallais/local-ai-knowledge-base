---
title: "DateTimeOffset struct (part 5 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 5 of 15)

## DateTimeOffset.AddTicks(Int64) method

```csharp
public DateTimeOffset AddTicks (long ticks);
```

Returns a new `DateTimeOffset` object that adds a specified number of ticks to the value of this instance.

Parameters:

- `ticks`: A number of 100-nanosecond ticks. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of ticks represented by `ticks`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
A tick represents 100 nanoseconds, or one-ten millionth of a second. Because a tick is a very small and precise time interval, any larger time unit can be expressed as a number of ticks without a loss of precision.

> **Note:**
> This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `ticks` to its date and time.

The following table lists the number of ticks in a particular time interval.

|Time interval|Number of ticks|
|-------------------|---------------------|
|Second|10,000,000|
|Minute|600,000,000|
|Hour|36,000,000,000|
|Day|864,000,000,000|
|Week|6,048,000,000,000|
|Month|Depends on number of days in the month.|
|Non-leap year|315,360,000,000,000|
|Leap year|316,224,000,000,000|

Because a `DateTimeOffset` object does not represent the date and time in a specific time zone, the `DateTimeOffset.AddTicks` method does not consider a particular time zone's adjustment rules when it performs date and time arithmetic.

## DateTimeOffset.AddYears(Int32) method

```csharp
public DateTimeOffset AddYears (int years);
```

Returns a new `DateTimeOffset` object that adds a specified number of years to the value of this instance.

Parameters:

- `years`: A number of years. The number can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by the current `DateTimeOffset` object and the number of years represented by `years`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
Unlike most of the other methods that add a single time interval unit (such as minutes or days) to a date and time value, `DateTimeOffset.AddYears` does not enable you to add fractional parts of a year. To add a time that consists of other time units in addition to years to a `DateTimeOffset` object, use the `DateTimeOffset.Add` method.

> **Note:**
>  This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by adding `years` to its date and time.

#### Examples
In the United States, driver's licenses cannot be issued to persons under 16 years of age. The following example displays the latest possible date on which a person must be born in order to legally be issued a driver's license.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.Compare(DateTimeOffset, DateTimeOffset) method

```csharp
public static int Compare (DateTimeOffset first, DateTimeOffset second);
```

Compares two `DateTimeOffset` objects and indicates whether the first is earlier than the second, equal to the second, or later than the second.

Parameters:

- `first`: The first object to compare.
- `second`: The second object to compare.

Returns: A signed integer that indicates whether the value of the `first` parameter is earlier than, later than, or the same time as the value of the `second` parameter, as the following table shows.

-  Less than zero

: `first` is earlier than `second`.

-  Zero

: `first` is equal to `second`.

-  Greater than zero

: `first` is later than `second`.

#### Remarks
In performing the comparison, the method converts both the `first` and the `second` parameters to Coordinated Universal Time (UTC) before it performs the comparison. The method is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

In other words, the `DateTimeOffset.Compare` method determines whether two `DateTimeOffset` objects represent a single point in time. It directly compares neither dates and times nor offsets.

#### Examples
The following example illustrates calls to the `DateTimeOffset.Compare` method to compare `DateTimeOffset` objects.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods2.cs._

## DateTimeOffset.CompareTo(DateTimeOffset) method

```csharp
public int CompareTo (DateTimeOffset other);
```

Compares the current `DateTimeOffset` object to a specified `DateTimeOffset` object and indicates whether the current object is earlier than, the same as, or later than the second `DateTimeOffset` object.

Parameters:

- `other`: An object to compare with the current `DateTimeOffset` object.

Returns: A signed integer that indicates the relationship between the current `DateTimeOffset` object and `other`, as the following table shows.

-  Less than zero

:  The current `DateTimeOffset` object is earlier than `other`.

-  Zero

:  The current `DateTimeOffset` object is the same as `other`.

-  Greater than zero.

:  The current `DateTimeOffset` object is later than `other`.

#### Remarks
This method compares `DateTimeOffset` objects by comparing their `DateTimeOffset.UtcDateTime` values; that is, it determines whether the two objects represent a single point in time, and indicates whether the current object is earlier than, later than, or the same as the `other` parameter.

#### Examples
The following example illustrates calls to the `DateTimeOffset.CompareTo` method to compare `DateTimeOffset` objects.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods3.cs._

## DateTimeOffset.Deconstruct(DateOnly, TimeOnly, TimeSpan) method

```csharp
public void Deconstruct (out DateOnly date, out TimeOnly time, out TimeSpan offset);
```

Deconstructs this `DateTimeOffset` instance by `DateOnly`, `TimeOnly`, and `TimeSpan`.

Parameters:

- `date`: When this method returns, represents the `System.DateOnly` value of this `DateTimeOffset` instance.
- `time`: When this method returns, represents the `System.TimeOnly` value of this `DateTimeOffset` instance.
- `offset`: When this method returns, represents the `DateTimeOffset.Offset` value of this `DateTimeOffset` instance.

To be added.

## DateTimeOffset.Equals(DateTimeOffset) method

```csharp
public bool Equals (DateTimeOffset other);
```

Determines whether the current `DateTimeOffset` object represents the same point in time as a specified `DateTimeOffset` object.

Parameters:

- `other`: An object to compare to the current `DateTimeOffset` object.

Returns: `true` if both `DateTimeOffset` objects have the same `DateTimeOffset.UtcDateTime` value; otherwise, `false`.

#### Remarks
Before it performs the comparison, this method converts the values of both `DateTimeOffset` objects to Coordinated Universal Time (UTC). The method is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

In other words, the `Equals` method determines whether two `DateTimeOffset` objects represent a single point in time. It directly compares neither dates and times nor offsets. To determine whether two `DateTimeOffset` objects represent the same time and have the same offset value, use the `DateTimeOffset.EqualsExact` method.

A `DateTimeOffset` object that is not `null` is considered to be later (or greater) than one that is `null`.

This overload of the `Equals` method implements the `IEquatable<T>.Equals` method. It offers slightly better performance than the `Equals` overload because the `other` parameter does not have to be converted from an object.

#### Examples
The following example illustrates calls to the `Equals` method to test `DateTimeOffset` objects for equality with the current `DateTimeOffset` object.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether a `DateTimeOffset` object represents the same point in time as a specified object.

Parameters:

- `obj`: The object to compare to the current `DateTimeOffset` object.

Returns: `true` if the `obj` parameter is a `DateTimeOffset` object and represents the same point in time as the current `DateTimeOffset` object; otherwise, `false`.

#### Remarks
Before it performs the comparison, this method converts the values of both the current `DateTimeOffset` object and the `obj` parameter to Coordinated Universal Time (UTC). The method is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

In other words, the `Equals` method determines whether the current `DateTimeOffset` object and a specified object represent a single point in time. It directly compares neither dates and times nor offsets. To determine whether two `DateTimeOffset` objects represent the same time and have the same offset value, use the `DateTimeOffset.EqualsExact` method.

If `obj` is `null`, or if the run-time type of `obj` is not `DateTimeOffset`, the method returns `false`.

#### Examples
The following example indicates whether the current `DateTimeOffset` object is equal to several other `DateTimeOffset` objects, as well as to a null reference and a `DateTime` object.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.Equals(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool Equals (DateTimeOffset first, DateTimeOffset second);
```

Determines whether two specified `DateTimeOffset` objects represent the same point in time.

Parameters:

- `first`: The first object to compare.
- `second`: The second object to compare.

Returns: `true` if the two `DateTimeOffset` objects have the same `DateTimeOffset.UtcDateTime` value; otherwise, `false`.

#### Remarks
Before it performs the comparison, this method converts both `DateTimeOffset` objects to Coordinated Universal Time (UTC). The method is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

In other words, the `Equals` method determines whether the two `DateTimeOffset` objects represent a single point in time. It directly compares neither dates and times nor offsets. To determine whether two `DateTimeOffset` objects represent the same time and have the same offset value, use the `DateTimeOffset.EqualsExact` method.

#### Examples
The following example illustrates calls to the `Equals` method to test various pairs of `DateTimeOffset` objects for equality.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.EqualsExact(DateTimeOffset) method

```csharp
public bool EqualsExact (DateTimeOffset other);
```

Determines whether the current `DateTimeOffset` object represents the same time and has the same offset as a specified `DateTimeOffset` object.

Parameters:

- `other`: The object to compare to the current `DateTimeOffset` object.

Returns: `true` if the current `DateTimeOffset` object and `other` have the same date and time value and the same `DateTimeOffset.Offset` value; otherwise, `false`.

#### Remarks
Because multiple time zones share a single offset, a return value of `true` does not guarantee that the current and the `other` object represent times in the same time zone.

Unlike the `DateTimeOffset.EqualsExact` method, the overloads of the `DateTimeOffset.Equals` method determine only whether two `DateTimeOffset` values represent a single point in time. They do not indicate that two values have the same date and time as well as the same offset.

#### Examples
The following example illustrates the use of the `DateTimeOffset.EqualsExact` method to compare similar `DateTimeOffset` objects.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.FromFileTime(Int64) method

```csharp
public static DateTimeOffset FromFileTime (long fileTime);
```

Converts the specified Windows file time to an equivalent local time.

Parameters:

- `fileTime`: A Windows file time, expressed in ticks.

Returns: An object that represents the date and time of `fileTime` with the offset set to the local time offset.

Exceptions:

- `ArgumentOutOfRangeException`: `fileTime` is less than zero.

-or-

`fileTime` is greater than `DateTimeOffset.MaxValue.Ticks`.

#### Remarks
A Windows file time is a 64-bit value that represents the number of 100-nanosecond intervals that have elapsed since 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC). Windows uses a file time to record when an application creates, accesses, or writes to a file.

A Windows file time is directly accessible through the Windows API by calling the `GetFileTime` function, which returns a `FILETIME` structure. The single function parameter is the handle of the file whose file time information is to be retrieved. The file handle is retrieved by calling the `CreateFile` function. The `FILETIME` structure's `dwHighDateTime` member contains the four high-order bytes of the file time, and its `dwLowDateTime` member contains the four low-order bytes. The example that follows illustrates how to retrieve Windows file time values and convert them to `DateTimeOffset` values.

Windows file time values can also be created from `DateTime` values by calling the `DateTime.ToFileTime` and `DateTime.ToFileTimeUtc` methods, and from `DateTimeOffset` values by calling the `DateTimeOffset.ToFileTime` method.

#### Examples
The following example uses the Windows API to retrieve the Windows file times for the WordPad executable.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/FromFileTime/FileTime.cs._
