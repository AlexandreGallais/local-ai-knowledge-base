---
title: "TimeZoneInfo+TransitionTime struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo+TransitionTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo+TransitionTime struct

Namespace: `System`

```csharp
public readonly struct TimeZoneInfo.TransitionTime : IEquatable<TimeZoneInfo.TransitionTime>, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Provides information about a specific time change, such as the change from daylight saving time to standard time or vice versa, in a particular time zone.

#### Remarks
You can use the `TransitionTime` structure to indicate when a transition from standard time to daylight saving time, or from daylight saving time back to standard time, occurs. This structure supports both fixed-date rules and floating-date rules. Use fixed-date rules for time transitions that occur on a specific day of a specific month (such as 2:00 A.M. on November 3). Use floating-date rules for time transitions that occur on a specific day of a specific week of a specific month (such as 2:00 A.M. on the first Sunday of November).

The following table compares the properties used in fixed-date and floating-date transitions:

| Rule type | Month | Week | Day | Time |
|-----------|-------|------|-----|------|
| Fixed-date rule | `Month` | N/A | `Day` | `TimeOfDay` |
| Floating-date rule | `Month` | `Week` | `DayOfWeek` | `TimeOfDay` |

For both fixed-date and floating-date transitions, the `TimeOfDay` property gets the time at which the time change occurs. For transitions from standard to daylight saving time, this is the time zone's standard time value. For transitions from daylight saving to standard time, this is the time zone's daylight saving time value. This is a `DateTime` value whose date component is ignored; its year, month, and day value must always equal 1.

> **Note:**
>  An instance of the `TransitionTime` structure is immutable. Once an object has been created, its values cannot be modified.

A `TransitionTime` object can be created by calling the `static` (`Shared` in Visual Basic) `TransitionTime.CreateFixedDateRule` and `TransitionTime.CreateFloatingDateRule` methods to create a fixed or floating-date rule, respectively. The starting and ending `TransitionTime` objects are then supplied as parameters to the `AdjustmentRule.CreateAdjustmentRule` method to create a new adjustment rule that includes this transition time information.

The `AdjustmentRule.DaylightTransitionStart` and `AdjustmentRule.DaylightTransitionEnd` properties of an `AdjustmentRule` object return a `TransitionTime` object.

## TimeZoneInfo+TransitionTime.Day property

```csharp
public int Day { get; }
```

Gets the day on which the time change occurs.

Returns: The day on which the time change occurs.

#### Remarks
The `Day` property returns a valid value only if the `IsFixedDateRule` property is `true`.

The `Day` property value corresponds to the value of the `day` parameter of the `TransitionTime.CreateFixedDateRule` method. If its value is greater than the number of days in the month of the transition, the transition occurs on the last day of the month.

The `Day` property indicates the day of the month on which a fixed-date rule is applied (for example, April 15). In contrast, the `DayOfWeek` property indicates the day of the week on which a floating-date rule is applied (for example, the second Sunday of November).

#### Examples
The following example enumerates the time zones found on the local computer and displays transition time information for all fixed-date transitions. The time information includes the day on which the time change occurs.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.DayOfWeek property

```csharp
public DayOfWeek DayOfWeek { get; }
```

Gets the day of the week on which the time change occurs.

Returns: The day of the week on which the time change occurs.

#### Remarks
The `DayOfWeek` property returns a valid value only if the `IsFixedDateRule` property is `false`.

The `DayOfWeek` property indicates the day of the week on which a floating-date rule is applied (for example, the second Sunday of November). In contrast, the `Day` property indicates the day of the month on which a fixed-date rule is applied (for example, April 15).

#### Examples
The following example enumerates the time zones found on the local computer and displays transition time information for all floating-date transitions. The time information includes the day of the week on which the time change occurs.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.IsFixedDateRule property

```csharp
public bool IsFixedDateRule { get; }
```

Gets a value indicating whether the time change occurs at a fixed date and time (such as November 1) or a floating date and time (such as the last Sunday of October).

Returns: `true` if the time change rule is fixed-date; `false` if the time change rule is floating-date.

#### Remarks
A fixed-date rule indicates that the transition occurs on the same date and time of each year to which the adjustment rule applies. For example, a time change that occurs every November 3 follows a fixed-date rule. A floating-date rule indicates that the transition occurs on a specific day of a specific week of a specific month for each year to which the adjustment rule applies. For example, a time change that occurs on the first Sunday of November follows a floating-date rule.

The value of the `IsFixedDateRule` property determines which properties of a `TransitionTime` object have valid values. The following table indicates which properties are affected by the value of the `IsFixedDateRule` property.

|TransitionTime property|IsFixedDateRule = true|IsFixedDateRule = false|
|-----------------------------|-----------------------------|------------------------------|
|`Day`|Valid|Unused|
|`DayOfWeek`|Unused|Valid|
|`Week`|Unused|Valid|
|`Month`|Valid|Valid|
|`TimeOfDay`|Valid|Valid|

#### Examples
The following example lists the transition times to and from daylight saving time for all time zones that are available on the local system. For time zones with fixed-date rules, it displays transition time information from the properties of the `TransitionTime` object. For time zones without fixed-date rules, it uses a `Calendar` object that represents the current system calendar to determine the actual start and end dates of the transition. The example displays the results to the console.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/example1.cs._

## TimeZoneInfo+TransitionTime.Month property

```csharp
public int Month { get; }
```

Gets the month in which the time change occurs.

Returns: The month in which the time change occurs.

#### Remarks
Valid values for the `Month` property range from 1 to 12.

The `Month` property is used for both fixed-date and floating-date rules.

#### Examples
The following example enumerates the time zones found on the local computer and displays transition time information for all floating-date transitions. The time information includes the month in which the time change occurs.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.TimeOfDay property

```csharp
public DateTime TimeOfDay { get; }
```

Gets the hour, minute, and second at which the time change occurs.

Returns: The time of day at which the time change occurs.

#### Remarks
For transitions from standard time to daylight saving time, the `TransitionTime.TimeOfDay` value represents the time of the transition in the time zone's standard time. For transitions from daylight saving time to standard time, it represents the time of the transition in the time zone's daylight saving time.

The `TimeOfDay` property defines only the time of a time change, but not its date. The date is determined by the `TransitionTime.Month` and `TransitionTime.Day` properties for fixed-rule changes, and by the `TransitionTime.Month`, `TransitionTime.Week`, and `TransitionTime.DayOfWeek` properties for floating-rule changes. The date component of this `DateTime` value is ignored; the value of the year, month, and day is always 1.

The `TimeOfDay` property is used for both fixed-date and floating-date transitions.

#### Examples
The following example enumerates the time zones found on the local computer and displays transition time information for those time zones that have adjustment rules. The time information includes the time of day at which the time change occurs.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.Week property

```csharp
public int Week { get; }
```

Gets the week of the month in which a time change occurs.

Returns: The week of the month in which the time change occurs.

#### Remarks
The value of the `Week` property is used only for time changes with floating-date rules. Valid values can range from 1 to 5.

The `Month` property defines the month in which the time change occurs. The `Week` property determines the week on which the transition occurs. The `DayOfWeek` property defines the day of the week on which the transition occurs. The value of the `Week` property is determined as shown in the following table.

|If the Week property value is|The transition occurs on|
|-----------------------------------|------------------------------|
|1|The first occurrence of the `TransitionTime.DayOfWeek` value in `TransitionTime.Month`.|
|2|The second occurrence of the `TransitionTime.DayOfWeek` value in `TransitionTime.Month`.|
|3|The third occurrence of the `TransitionTime.DayOfWeek` value in `TransitionTime.Month`.|
|4|The fourth occurrence of the `TransitionTime.DayOfWeek` value in `TransitionTime.Month`.|
|5|The last occurrence of the `TransitionTime.DayOfWeek` value in `TransitionTime.Month`.|

For example, if a transition occurs on the first Sunday of March, the value of the `Week` property is 1. If it occurs on the last Sunday of March, the value of the `Week` property is 5.

#### Examples
The following example enumerates the time zones found on the local computer and displays transition time information for all floating-date transitions. The time information includes the week of the month in which the time change occurs. The example also defines a `WeekOfMonth` enumeration to display a string that represents the ordinal value of the `Week` property rather than an integer.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.CreateFixedDateRule(DateTime, Int32, Int32) method

```csharp
public static TimeZoneInfo.TransitionTime CreateFixedDateRule (DateTime timeOfDay, int month, int day);
```

Defines a time change that uses a fixed-date rule (that is, a time change that occurs on a specific day of a specific month).

Parameters:

- `timeOfDay`: The time at which the time change occurs. This parameter corresponds to the `TransitionTime.TimeOfDay` property.
- `month`: The month in which the time change occurs. This parameter corresponds to the `TransitionTime.Month` property.
- `day`: The day of the month on which the time change occurs. This parameter corresponds to the `TransitionTime.Day` property.

Returns: Data about the time change.

Exceptions:

- `ArgumentException`: The `timeOfDay` parameter has a non-default date component.

-or-

The `timeOfDay` parameter's `DateTime.Kind` property is not `DateTimeKind.Unspecified`.

-or-

The `timeOfDay` parameter does not represent a whole number of milliseconds.
- `ArgumentOutOfRangeException`: The `month` parameter is less than 1 or greater than 12.

-or-

The `day` parameter is less than 1 or greater than 31.

#### Remarks
This method creates a fixed-date rule (that is, a time change that occurs on a specific day of a specific month). For example, a time change that always occurs on October 28 follows a fixed-date rule.

For transitions from standard time to daylight saving time, the `timeOfDay` argument represents the time of the transition in the time zone's standard time. For transitions from daylight saving time to standard time, it represents the time of the transition in the time zone's daylight saving time. Note that this is a `DateTime` value whose year, month, and date values must all equal 1.

#### Examples
The following example creates time zone transitions for an imaginary time zone by using both a fixed-date rule and a floating-date rule. The fixed-date rule defines a time zone adjustment that starts at 2:00 A.M. on March 15 and ends at 3:00 A.M. on November 15 for the years 1900 to 1955.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._
