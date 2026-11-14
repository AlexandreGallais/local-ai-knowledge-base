---
title: "TimeZoneInfo+TransitionTime struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo+TransitionTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo+TransitionTime struct (part 2 of 2)

## TimeZoneInfo+TransitionTime.CreateFloatingDateRule(DateTime, Int32, Int32, DayOfWeek) method

```csharp
public static TimeZoneInfo.TransitionTime CreateFloatingDateRule (DateTime timeOfDay, int month, int week, DayOfWeek dayOfWeek);
```

Defines a time change that uses a floating-date rule (that is, a time change that occurs on a specific day of a specific week of a specific month).

Parameters:

- `timeOfDay`: The time at which the time change occurs. This parameter corresponds to the `TransitionTime.TimeOfDay` property.
- `month`: The month in which the time change occurs. This parameter corresponds to the `TransitionTime.Month` property.
- `week`: The week of the month in which the time change occurs. Its value can range from 1 to 5, with 5 representing the last week of the month. This parameter corresponds to the `TransitionTime.Week` property.
- `dayOfWeek`: The day of the week on which the time change occurs. This parameter corresponds to the `TransitionTime.DayOfWeek` property.

Returns: Data about the time change.

Exceptions:

- `ArgumentException`: The `timeOfDay` parameter has a non-default date component.

-or-

The `timeOfDay` parameter does not represent a whole number of milliseconds.

-or-

The `timeOfDay` parameter's `DateTime.Kind` property is not `DateTimeKind.Unspecified`.
- `ArgumentOutOfRangeException`: `month` is less than 1 or greater than 12.

-or-

`week` is less than 1 or greater than 5.

-or-

The `dayOfWeek` parameter is not a member of the `DayOfWeek` enumeration.

#### Remarks
This method creates a floating-date rule (that is, a time change that occurs on a specific day of a specific week of a specific month). For example, a time change that occurs on the last Sunday of October follows a floating-date rule.

For transitions from standard time to daylight saving time, the `timeOfDay` argument represents the time of the transition in the time zone's standard time. For transitions from daylight saving time to standard time, it represents the time of the transition in the time zone's daylight saving time. Note that this is a `DateTime` value whose year, month, and date values must all equal 1.

#### Examples
The following example creates time zone transitions for an imaginary time zone by using both a fixed-date rule and a floating-date rule. The floating-date rule defines a time zone adjustment that starts at 2:00 A.M. on the last Sunday of March and ends at 3:00 A.M. on the fourth Sunday in October for the years 1956 onward.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether an object has identical values to the current `TransitionTime` object.

Parameters:

- `obj`: An object to compare with the current `TransitionTime` object.

Returns: `true` if the two objects are equal; otherwise, `false`.

#### Remarks
Equality is defined as follows: The `obj` parameter must be a `TransitionTime` object and must have property values identical to the current `TransitionTime` object.

#### Examples
The following example illustrates calls to the `TransitionTime.Equals` method.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.Equals(TimeZoneInfo+TransitionTime) method

```csharp
public bool Equals (TimeZoneInfo.TransitionTime other);
```

Determines whether the current `TransitionTime` object has identical values to a second `TransitionTime` object.

Parameters:

- `other`: An object to compare to the current instance.

Returns: `true` if the two objects have identical property values; otherwise, `false`.

#### Remarks
To determine whether the two `TransitionTime` objects are equal, this method performs a property-by-property comparison. The method returns `true` only if the current `TransitionTime` object and the `other` object have identical values for each of the `TransitionTime` object's six property values.

#### Examples
The following example illustrates calls to the `TransitionTime.Equals` method.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+TransitionTime/CreateFixedDateRule/System.TimeZone2.TransitionTime.Class.cs._

## TimeZoneInfo+TransitionTime.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for hashing algorithms and data structures such as hash tables.

Returns: A 32-bit signed integer that serves as the hash code for this `TransitionTime` object.

To be added.

## TimeZoneInfo+TransitionTime.op_Equality(TimeZoneInfo+TransitionTime, TimeZoneInfo+TransitionTime) method

```csharp
public static bool operator == (TimeZoneInfo.TransitionTime t1, TimeZoneInfo.TransitionTime t2);
```

Determines whether two specified `TransitionTime` objects are equal.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if `t1` and `t2` have identical values; otherwise, `false`.

#### Remarks
Two `TransitionTime` objects are equal if they have identical values for each of their six properties. Otherwise, they are unequal.

The equivalent method for this operator is `Equals`.

## TimeZoneInfo+TransitionTime.op_Inequality(TimeZoneInfo+TransitionTime, TimeZoneInfo+TransitionTime) method

```csharp
public static bool operator != (TimeZoneInfo.TransitionTime t1, TimeZoneInfo.TransitionTime t2);
```

Determines whether two specified `TransitionTime` objects are not equal.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if `t1` and `t2` have any different member values; otherwise, `false`.

#### Remarks
Two `TransitionTime` objects are unequal if they have different values for any of their six properties. Otherwise, they are equal.

The equivalent method for this operator is `Equals`.

## TimeZoneInfo+TransitionTime.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Runs when the deserialization of an object has been completed.

Parameters:

- `sender`: The object that initiated the callback. The functionality for this parameter is not currently implemented.

To be added.

## TimeZoneInfo+TransitionTime.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data that is required to serialize this object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination for this serialization (see `StreamingContext`).

To be added.
