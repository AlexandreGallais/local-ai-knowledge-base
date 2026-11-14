---
title: "TimeZoneInfo+AdjustmentRule class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo+AdjustmentRule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo+AdjustmentRule class (part 2 of 2)

## TimeZoneInfo+AdjustmentRule.CreateAdjustmentRule(DateTime, DateTime, TimeSpan, TimeZoneInfo+TransitionTime, TimeZoneInfo+TransitionTime) method

```csharp
public static TimeZoneInfo.AdjustmentRule CreateAdjustmentRule (DateTime dateStart, DateTime dateEnd, TimeSpan daylightDelta, TimeZoneInfo.TransitionTime daylightTransitionStart, TimeZoneInfo.TransitionTime daylightTransitionEnd);
```

Creates a new adjustment rule for a particular time zone.

Parameters:

- `dateStart`: The effective date of the adjustment rule. If the value of the `dateStart` parameter is `DateTime.MinValue.Date`, this is the first adjustment rule in effect for a time zone.
- `dateEnd`: The last date that the adjustment rule is in force. If the value of the `dateEnd` parameter is `DateTime.MaxValue.Date`, the adjustment rule has no end date.
- `daylightDelta`: The time change that results from the adjustment. This value is added to the time zone's `TimeZoneInfo.BaseUtcOffset` property to obtain the correct daylight offset from Coordinated Universal Time (UTC). This value can range from -14 to 14.
- `daylightTransitionStart`: An object that defines the start of daylight saving time.
- `daylightTransitionEnd`: An object that defines the end of daylight saving time.

Returns: An object that represents the new adjustment rule.

Exceptions:

- `ArgumentException`: The `DateTime.Kind` property of the `dateStart` or `dateEnd` parameter does not equal `DateTimeKind.Unspecified`.

-or-

The `daylightTransitionStart` parameter is equal to the `daylightTransitionEnd` parameter.

-or-

The `dateStart` or `dateEnd` parameter includes a time of day value.
- `ArgumentOutOfRangeException`: `dateEnd` is earlier than `dateStart`.

-or-

`daylightDelta` is less than -14 or greater than 14.

-or-

The `TimeSpan.Milliseconds` property of the `daylightDelta` parameter is not equal to 0.

-or-

The `TimeSpan.Ticks` property of the `daylightDelta` parameter does not equal a whole number of seconds.

#### Remarks
You can use this method to create one or more adjustment rules for a custom time zone. An array of the `AdjustmentRule` objects returned by calls to this method can then be passed as the `adjustmentRules` parameter to two overloads of the `TimeZoneInfo.CreateCustomTimeZone` method. The example illustrates this procedure.

> **Note:**
>  The `AdjustmentRule.CreateAdjustmentRule` method can be used only to define an adjustment rule for a new time zone; it cannot be used to modify an adjustment rule for an existing time zone.

The `dateStart` and `dateEnd` parameters must be date values without a time component or an `ArgumentException` is thrown. The time component can be removed by retrieving a `DateTime` value from the date and time's `Date` property as shown in the following statements:

```
DateTime.MinValue.Date
DateTime.MaxValue.Date
DateTime.Now.Date
dateVariable.Date
```

The `Kind` property of the `dateStart` and `dateEnd` parameters must also be `Unspecified`.

The value of the `daylightDelta` parameter can range from -14 to 14. The sum of the `daylightDelta` parameter and the `baseUtcOffset` parameter used in the call to the `TimeZoneInfo.CreateCustomTimeZone` method must also range from -14 to 14 or an `InvalidTimeZoneException` is thrown.

> **Note:**
>  The `daylightDelta` parameter defines the difference between a time zone's standard time and its daylight saving time. It is not intended to define the time zone's standard time offset from Coordinated Universal Time (UTC). The `TimeZoneInfo` class assumes that this offset from UTC is constant throughout the life of the time zone. To reflect a change in a time zone's offset from UTC that is not caused by the application of an adjustment rule, you must use the `TimeZoneInfo.CreateCustomTimeZone` method to create a new custom time zone.

#### Examples
The following example creates an alternate Central Standard Time zone and defines three adjustment rules for the periods 1976-1986, 1987-2006, and 2007 and beyond. These rules are added to a generic `List<T>` object whose elements are then copied to a `AdjustmentRule` array. This array is then used in the call to the `CreateCustomTimeZone` method.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+AdjustmentRule/Overview/System.TimeZone2.AdjustmentRule.Class.cs._

## TimeZoneInfo+AdjustmentRule.CreateAdjustmentRule(DateTime, DateTime, TimeSpan, TimeZoneInfo+TransitionTime, TimeZoneInfo+TransitionTime, TimeSpan) method

```csharp
public static TimeZoneInfo.AdjustmentRule CreateAdjustmentRule (DateTime dateStart, DateTime dateEnd, TimeSpan daylightDelta, TimeZoneInfo.TransitionTime daylightTransitionStart, TimeZoneInfo.TransitionTime daylightTransitionEnd, TimeSpan baseUtcOffsetDelta);
```

Creates a new adjustment rule for a particular time zone.

Parameters:

- `dateStart`: The effective date of the adjustment rule. If the value is `DateTime.MinValue.Date`, this is the first adjustment rule in effect for a time zone.
- `dateEnd`: The last date that the adjustment rule is in force. If the value is `DateTime.MaxValue.Date`, the adjustment rule has no end date.
- `daylightDelta`: The time change that results from the adjustment. This value is added to the time zone's `TimeZoneInfo.BaseUtcOffset` and `AdjustmentRule.BaseUtcOffsetDelta` properties to obtain the correct daylight offset from Coordinated Universal Time (UTC). This value can range from -14 to 14.
- `daylightTransitionStart`: The start of daylight saving time.
- `daylightTransitionEnd`: The end of daylight saving time.
- `baseUtcOffsetDelta`: The time difference with the base UTC offset for the time zone during the adjustment-rule period.

Returns: The new adjustment rule.

To be added.

## TimeZoneInfo+AdjustmentRule.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether the current instance is equal to another instance.

Parameters:

- `obj`: An instance to compare with this instance.

Returns: `true` if the current instance is equal to the other instance; otherwise, `false`.

To be added.

## TimeZoneInfo+AdjustmentRule.Equals(TimeZoneInfo+AdjustmentRule) method

```csharp
public bool Equals (TimeZoneInfo.AdjustmentRule? other);
```

Determines whether the current `AdjustmentRule` object is equal to a second `AdjustmentRule` object.

Parameters:

- `other`: The object to compare with the current object.

Returns: `true` if both `AdjustmentRule` objects have equal values; otherwise, `false`.

#### Remarks
To determine whether two `AdjustmentRule` objects are equal, the `Equals` method compares the member values of each object. Two adjustment rules are equal if they have the same effective dates, the same delta, and identical values for the `TransitionTime` objects returned by their `AdjustmentRule.DaylightTransitionStart` and `AdjustmentRule.DaylightTransitionEnd` properties.

#### Examples
The following example calls the `Equals` method to compare the adjustment rules for Central Standard Time with those for Canada Central Standard Time and Mexico Standard Time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+AdjustmentRule/Overview/System.TimeZone2.AdjustmentRule.Class.cs._

This code displays the following output to the console:

```
Comparing Central Standard Time rule for 1/1/0001 to 12/31/9999 with:
   Canada Central Standard Time has no adjustment rules.
   Mexican CST for 1/1/0001 to 12/31/9999: Equal
```

## TimeZoneInfo+AdjustmentRule.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for hashing algorithms and data structures such as hash tables.

Returns: A 32-bit signed integer that serves as the hash code for the current `AdjustmentRule` object.

To be added.

## TimeZoneInfo+AdjustmentRule.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Runs when the deserialization of a `AdjustmentRule` object is completed.

Parameters:

- `sender`: The object that initiated the callback. The functionality for this parameter is not currently implemented.

To be added.

## TimeZoneInfo+AdjustmentRule.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data that is required to serialize this object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination for this serialization (see `StreamingContext`).

To be added.
