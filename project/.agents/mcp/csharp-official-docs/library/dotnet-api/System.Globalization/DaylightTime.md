---
title: "DaylightTime class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DaylightTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DaylightTime class

Namespace: `System.Globalization`

```csharp
public class DaylightTime
```

Defines the period of daylight saving time.

#### Remarks
Daylight saving time is a period during the year when the clock is advanced, usually by an hour, to take advantage of extended daylight hours. At the end of the period, the clock is set back to the standard time.

> **Warning:**
>  The `DaylightTime` object returned by the `TimeZone.GetDaylightChanges` method recognizes only the time zone adjustment rule that is currently in effect, and ignores any previous adjustment rules for which the system has information. Instead, it applies the current adjustment rule backward in time to periods when it may not have been in effect. To retrieve information about all the known adjustment rules for a particular time zone, use the `TimeZoneInfo.GetAdjustmentRules` method.

## DaylightTime.DaylightTime(DateTime, DateTime, TimeSpan) constructor

```csharp
public DaylightTime (DateTime start, DateTime end, TimeSpan delta);
```

Initializes a new instance of the `DaylightTime` class with the specified start, end, and time difference information.

Parameters:

- `start`: The object that represents the date and time when daylight saving time begins. The value must be in local time.
- `end`: The object that represents the date and time when daylight saving time ends. The value must be in local time.
- `delta`: The object that represents the difference between standard time and daylight saving time, in ticks.

#### Remarks
The `start` parameter becomes the value of the `Start` property of the new object. The `end` parameter becomes the value of the `End` property of the new object. The `delta` parameter becomes the value of the `Delta` property of the new object.

## DaylightTime.Delta property

```csharp
public TimeSpan Delta { get; }
```

Gets the time interval that represents the difference between standard time and daylight saving time.

Returns: The time interval that represents the difference between standard time and daylight saving time.

#### Remarks
This property corresponds to the `DaylightDelta` property. Generally, the `TimeZoneInfo` class is a more accurate source of information on time zone adjustments than the `TimeZone` and `DaylightTime` classes.

If the property value is positive, at the start of daylight saving time, the clock time is advanced by the length of time specified by this property. At the end of daylight saving time, the clock time is set back by the length of time specified by this property. If the property value is negative, the clock time is set back at the start of daylight saving time and advanced at the end.

## DaylightTime.End property

```csharp
public DateTime End { get; }
```

Gets the object that represents the date and time when the daylight saving period ends.

Returns: The object that represents the date and time when the daylight saving period ends. The value is in local time.

#### Remarks
This property corresponds to the `DateEnd` property. Generally, the `TimeZoneInfo` class is a more accurate source of information on time zone adjustments than the `TimeZone` and `DaylightTime` classes.

When the daylight saving period ends, the clock time is set back to standard time.

## DaylightTime.Start property

```csharp
public DateTime Start { get; }
```

Gets the object that represents the date and time when the daylight saving period begins.

Returns: The object that represents the date and time when the daylight saving period begins. The value is in local time.

#### Remarks
This property corresponds to the `DateStart` property. Generally, the `TimeZoneInfo` class is a more accurate source of information on time zone adjustments than the `TimeZone` and `DaylightTime` classes.

When the daylight saving period begins, the clock time is advanced by the number of ticks defined by the `Delta` property to take advantage of the extended daylight hours.
