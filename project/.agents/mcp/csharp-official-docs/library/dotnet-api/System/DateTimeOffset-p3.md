---
title: "DateTimeOffset struct (part 3 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 3 of 15)

## DateTimeOffset.Millisecond property

```csharp
public int Millisecond { get; }
```

Gets the millisecond component of the time represented by the current `DateTimeOffset` object.

Returns: The millisecond component of the current `DateTimeOffset` object, expressed as an integer between 0 and 999.

#### Remarks
You can also create a string representation of a `DateTimeOffset` object's millisecond component by calling the `DateTimeOffset.ToString` method with the "fff" custom format specifier.

If you rely on properties such as `DateTimeOffset.Now` or `DateTimeOffset.UtcNow` to accurately track the number of elapsed milliseconds, the precision of the time's millisecond component depends on the resolution of the system clock. On Windows NT 3.5 and later, and Windows Vista operating systems, the clock's resolution is approximately 10-15 milliseconds.

#### Examples
The following example displays the number of milliseconds of a `DateTimeOffset` object by using a custom format specifier and by directly accessing the `Millisecond` property.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Minute property

```csharp
public int Minute { get; }
```

Gets the minute component of the time represented by the current `DateTimeOffset` object.

Returns: The minute component of the current `DateTimeOffset` object, expressed as an integer between 0 and 59.

#### Remarks
The `Minute` property is not affected by the value of the `Offset` property.

You can also create a string representation of a `DateTimeOffset` object's minute component by calling the `DateTimeOffset.ToString` method with the "m", or "mm" custom format specifiers.

#### Examples
The following example displays the minute component of a `DateTimeOffset` object in three different ways:

- By retrieving the value of the `Minute` property.

- By calling the `ToString` method with the "m" format specifier.

- By calling the `ToString` method with the "mm" format specifier.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Month property

```csharp
public int Month { get; }
```

Gets the month component of the date represented by the current `DateTimeOffset` object.

Returns: The month component of the current `DateTimeOffset` object, expressed as an integer between 1 and 12.

#### Remarks
The `Month` property is not affected by the value of the `Offset` property.

You can also create a string representation of a `DateTimeOffset` object's month component by calling the `DateTimeOffset.ToString` method with the "M" or "MM" custom format specifiers.

#### Examples
The following example displays the month component of a `DateTimeOffset` value in three different ways:

- By retrieving the value of the `Month` property.

- By calling the `ToString` method with the "M" format specifier.

- By calling the `ToString` method with the "MM" format specifier.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Nanosecond property

```csharp
public int Nanosecond { get; }
```

Gets the nanosecond component of the time represented by the current `DateTimeOffset` object.

Returns: To be added.

#### Remarks

If you rely on properties such as `Now` or `UtcNow` to accurately track the number of elapsed nanosecond,
the precision of the time's nanosecond component depends on the resolution of the system clock.
On Windows NT 3.5 and later, and Windows Vista operating systems, the clock's resolution is approximately 10000000-15000000 nanoseconds.

## DateTimeOffset.Now property

```csharp
public static DateTimeOffset Now { get; }
```

Gets a `DateTimeOffset` object that is set to the current date and time on the current computer, with the offset set to the local time's offset from Coordinated Universal Time (UTC).

Returns: A `DateTimeOffset` object whose date and time is the current local time and whose offset is the local time zone's offset from Coordinated Universal Time (UTC).

#### Remarks
The precision of the current local time's millisecond component depends on the resolution of the system clock. On Windows NT 3.5 and later, and Windows Vista operating systems, the clock's resolution is approximately 10-15 milliseconds.

#### Examples
The following example uses the `Now` property to retrieve the current date and time and displays it by using each of the standard date and time format strings supported by the `DateTimeOffset` type.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Now/now1.cs._

The following example uses the `DateTimeOffset.Now` and `DateTimeOffset.Millisecond` properties to determine the resolution of the system clock. It displays the time only when the value of its millisecond component has changed.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Offset property

```csharp
public TimeSpan Offset { get; }
```

Gets the time's offset from Coordinated Universal Time (UTC).

Returns: The difference between the current `DateTimeOffset` object's time value and Coordinated Universal Time (UTC).

#### Remarks
The value of the `Hours` property of the returned `TimeSpan` object can range from -14 hours to 14 hours.

The value of the `Offset` property is precise to the minute.

#### Examples
The following example uses the `Offset` property to display the local time's difference from Coordinated Universal Time (UTC).

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Second property

```csharp
public int Second { get; }
```

Gets the second component of the clock time represented by the current `DateTimeOffset` object.

Returns: The second component of the `DateTimeOffset` object, expressed as an integer value between 0 and 59.

#### Remarks
The `Second` property is not affected by the value of the `Offset` property.

You can also create a string representation of a `DateTimeOffset` object's second component by calling the `DateTimeOffset.ToString` method with the "s", or "ss" custom format specifiers.

#### Examples
The following example displays the second component of a `DateTimeOffset` object in three different ways:

- By retrieving the value of the `Second` property.

- By calling the `ToString` method with the "s" format specifier.

- By calling the `ToString` method with the "ss" format specifier.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Ticks property

```csharp
public long Ticks { get; }
```

Gets the number of ticks that represents the date and time of the current `DateTimeOffset` object in clock time.

Returns: The number of ticks in the `DateTimeOffset` object's clock time.

#### Remarks
The `Ticks` property is not affected by the value of the `Offset` property.

The value of the `Ticks` property represents the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight on January 1, 0001 (the value of `MinValue`). It does not include ticks that would be added by leap seconds. A nanosecond is one billionth of a second; there are ten million ticks in a second. The value of the `Ticks` property ranges from `DateTimeOffset.MinValue.Ticks` to `DateTimeOffset.MaxValue.Ticks`.

You can assign the number of ticks to a `DateTimeOffset` object by using the `%23ctor` constructor overload.

#### Examples
The following example initializes a `DateTimeOffset` object by approximating the number of ticks in the date July 1, 2008 1:23:07. It then displays the date and the number of ticks represented by that date to the console.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.TimeOfDay property

```csharp
public TimeSpan TimeOfDay { get; }
```

Gets the time of day for the current `DateTimeOffset` object.

Returns: The time interval of the current date that has elapsed since midnight.

#### Remarks
The `TimeOfDay` property is not affected by the value of the `Offset` property.

The `TimeOfDay` property returns the time component of a `DateTimeOffset` object in the form of a `TimeSpan` object. It is equivalent to the `TimeOfDay` property.

#### Examples
The following example uses the `TimeOfDay` property to extract the time and display it to the console.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.TotalOffsetMinutes property

```csharp
public int TotalOffsetMinutes { get; }
```

Gets the time's offset from Coordinated Universal Time (UTC) in minutes.

Returns: To be added.

To be added.

## DateTimeOffset.UtcDateTime property

```csharp
public DateTime UtcDateTime { get; }
```

Gets a `DateTime` value that represents the Coordinated Universal Time (UTC) date and time of the current `DateTimeOffset` object.

Returns: The Coordinated Universal Time (UTC) date and time of the current `DateTimeOffset` object.

#### Remarks
The `UtcDateTime` property performs a dual conversion:

- It converts the date and time of the current `DateTimeOffset` object to Coordinated Universal Time (UTC). The conversion is performed by subtracting the value of the `Offset` property from the date and time of the current `DateTimeOffset` object.

- It converts the `DateTimeOffset` value to a `DateTime` value.

The `Kind` property of the returned `DateTimeOffset.DateTime` value is set to `Utc`.

Retrieving the value of the `UtcDateTime` property is equivalent to calling the current `DateTimeOffset` object's `ToUniversalTime.DateTime` property, except that the `Kind` property of the latter `DateTime` value is `Unspecified`.

#### Examples
The following example shows how to use of the `UtcDateTime` property to display a `DateTimeOffset` value and its corresponding UTC time.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.UtcNow property

```csharp
public static DateTimeOffset UtcNow { get; }
```

Gets a `DateTimeOffset` object whose date and time are set to the current Coordinated Universal Time (UTC) date and time and whose offset is `TimeSpan.Zero`.

Returns: An object whose date and time is the current Coordinated Universal Time (UTC) and whose offset is `TimeSpan.Zero`.

#### Remarks
The `UtcNow` property computes the current Universal Coordinated Time (UTC) based on the local system's clock time and an offset defined by the local system's time zone.

The precision of the current UTC time's millisecond component depends on the resolution of the system clock. On Windows NT 3.5 and later, and Windows Vista operating systems, the clock's resolution is approximately 10-15 milliseconds.

#### Examples
The following example illustrates the relationship between Coordinated Universal Time (UTC) and local time.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.UtcTicks property

```csharp
public long UtcTicks { get; }
```

Gets the number of ticks that represents the date and time of the current `DateTimeOffset` object in Coordinated Universal Time (UTC).

Returns: The number of ticks in the `DateTimeOffset` object's Coordinated Universal Time (UTC).

#### Remarks
The value of the `UtcTicks` property represents the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight on January 1, 0001 (the value of `MinValue`). It does not include ticks that would be added by leap seconds. A nanosecond is one billionth of a second; there are ten million ticks in a second. The value of the `UtcTicks` property ranges from `DateTimeOffset.MinValue.Ticks` to `DateTimeOffset.MaxValue.Ticks`.

## DateTimeOffset.Year property

```csharp
public int Year { get; }
```

Gets the year component of the date represented by the current `DateTimeOffset` object.

Returns: The year component of the current `DateTimeOffset` object, expressed as an integer value between 0 and 9999.

#### Remarks
The `Year` property is not affected by the value of the `Offset` property.

You can also create a string representation of a `DateTimeOffset` object's year component by calling the `DateTimeOffset.ToString` method with the "y", "yy", or "yyyy" custom format specifiers.

#### Examples
The following example displays the year component of a `DateTimeOffset` value in four different ways:

- By retrieving the value of the `Year` property.

- By calling the `ToString` method with the "y" format specifier.

- By calling the `ToString` method with the "yy" format specifier.

- By calling the `ToString` method with the "yyyy" format specifier.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._
