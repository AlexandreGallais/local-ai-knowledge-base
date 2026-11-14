---
title: "DateTimeOffset struct (part 15 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 15 of 15)

## DateTimeOffset.MaxValue field

```csharp
public static readonly DateTimeOffset MaxValue;
```

Represents the greatest possible value of `DateTimeOffset`. This field is read-only.

Exceptions:

- `ArgumentOutOfRangeException`: <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see> is outside the range of the current or specified culture's default calendar.

#### Remarks
The value of this constant is 12/31/9999 11:59:59 PM +00:00.

The `MaxValue` property is used to determine whether the value of a new `DateTimeOffset` object or the `DateTimeOffset` value returned by an arithmetic operation is the same as or earlier than this maximum range value. If it is not, the method throws an `ArgumentOutOfRangeException`. Any `DateTimeOffset` value is converted to Coordinated Universal Time (UTC) before the method compares it with `MaxValue`.  This means that a `DateTimeOffset` value whose date and time are close to the maximum range, but whose offset is negative, may throw an exception. For example, the value 12/31/9999 11:00 PM -02:00 is out of range because it is one hour later than `MaxValue` when it is converted to UTC.

Some calendars, such as the `UmAlQuraCalendar`, support an upper date range that is earlier than `MaxValue`. In these cases, trying to access `MaxValue` in variable assignments or formatting and parsing operations can throw an `ArgumentOutOfRangeException`. Instead of retrieving the value of `MaxValue`, you can retrieve the value of the specified culture's latest valid date value from the `MaxSupportedDateTime` property.

## DateTimeOffset.MinValue field

```csharp
public static readonly DateTimeOffset MinValue;
```

Represents the earliest possible `DateTimeOffset` value. This field is read-only.

#### Remarks
The value of this constant is 1/1/0001 12:00:00 AM +00:00.

The `MinValue` property is used to determine whether the value of a new `DateTimeOffset` object or the `DateTimeOffset` value returned by an arithmetic operation is the same as or later than this minimum range value. If it is not, the method throws an `ArgumentOutOfRangeException`. Any `DateTimeOffset` value is converted to Coordinated Universal Time (UTC) before the method performs the comparison with `MinValue`.  This means that a `DateTimeOffset` value whose date and time are close to the minimum range, but whose offset is positive, may throw an exception. For example, the value 1/1/0001 1:00:00 AM +02:00 is out of range because it is one hour earlier than `MinValue` when it is converted to UTC.

## DateTimeOffset.UnixEpoch field

```csharp
public static readonly DateTimeOffset UnixEpoch;
```

The value of this constant is equivalent to 00:00:00.0000000 UTC, January 1, 1970, in the Gregorian calendar. `DateTimeOffset.UnixEpoch` defines the point in time when Unix time is equal to 0.

To be added.
