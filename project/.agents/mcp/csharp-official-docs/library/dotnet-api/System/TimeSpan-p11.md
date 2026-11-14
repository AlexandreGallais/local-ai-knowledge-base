---
title: "TimeSpan struct (part 11 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 11 of 11)

## TimeSpan.TryParseExact(String, String[], IFormatProvider, TimeSpanStyles, TimeSpan) method

```csharp
public static bool TryParseExact (string? input, string?[]? formats, IFormatProvider? formatProvider, System.Globalization.TimeSpanStyles styles, out TimeSpan result);
```

Converts the specified string representation of a time interval to its `TimeSpan` equivalent by using the specified formats, culture-specific format information and styles. The format of the string representation must match one of the specified formats exactly.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `formats`: An array of standard or custom format strings that define the acceptable formats of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `styles`: One or more enumeration values that indicate the style of `input`.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParseExact` method parses the string representation of a time interval, which must be in the format defined by one of the format strings specified by the `formats` parameter, except that leading and trailing white-space characters are ignored. This method is similar to the `ParseExact` method, except that it does not throw an exception if the conversion fails.

The `formats` parameter is a string array whose elements consist of either a single standard format specifier, or one or more custom format specifiers that define the required format of `input`. For more information about valid format strings, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings. `input` must correspond exactly to a member of `formats` for the parse operation to succeed. The parse operation attempts to match `input` to each element in `formats` starting with the first element in the array.

> **Important:**
>  The `TimeSpan.ParseExact` method uses the conventions of the culture specified by the `formatProvider` parameter only if the format string used to parse `input` is a standard `TimeSpan` format string whose value is either "g" or "G". The "c", "t", and "T" standard format strings use the formatting conventions of the invariant culture. Custom format strings define the precise format of the input string and use literal characters to separate the components of a time interval.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string if the format string used to parse `input` is a standard format string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

The `styles` parameter affects the interpretation of strings that are parsed using custom format strings. It determines whether `input` is interpreted as a negative time interval only if a negative sign is present (`None`), or whether it is always interpreted as a negative time interval (`AssumeNegative`). If `AssumeNegative` is not used, `format` must include a literal negative sign symbol (such as "\\-") to successfully parse a negative time interval.

#### Examples
The following example calls the `TryParseExact` method to convert each element of a string array to a `TimeSpan` value. The strings can represent a time interval in either the general short format or the general long format.

In addition, the example changes the way in which the time interval parsing methods interpret a single digit. Ordinarily, a single digit is interpreted as the number of days in a time interval. Instead, the `%h` custom format string is used to interpret a single digit as the number of hours. For this change to be effective, note that the `%h` custom format string must precede the other format strings in the `formats` array. Also note from the output that the `AssumeNegative` flag specified in the method call is used only when parsing a string with this format specifier.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TryParseExact/tryparseexactexample4.cs._

## TimeSpan.HoursPerDay field

```csharp
public const int HoursPerDay = 24;
```

Represents the number of hours in 1 day. This field is constant.

The value of this constant is 24.

## TimeSpan.MaxValue field

```csharp
public static readonly TimeSpan MaxValue;
```

Represents the maximum `TimeSpan` value. This field is read-only.

#### Remarks
The value of this field is equivalent to `MaxValue` ticks. The string representation of this value is positive 10675199.02:48:05.4775807, or slightly more than 10,675,199 days.

#### Examples
The following example references and displays the value of the `MaxValue` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.MicrosecondsPerDay field

```csharp
public const long MicrosecondsPerDay = 86400000000;
```

Represents the number of microseconds in 1 day. This field is constant.

The value of this constant is 86.4 billion; that is, 86,400,000,000.

## TimeSpan.MicrosecondsPerHour field

```csharp
public const long MicrosecondsPerHour = 3600000000;
```

Represents the number of microseconds in 1 hour. This field is constant.

The value of this constant is 3.6 billion; that is, 3,600,000,000.

## TimeSpan.MicrosecondsPerMillisecond field

```csharp
public const long MicrosecondsPerMillisecond = 1000;
```

Represents the number of microseconds in 1 millisecond. This field is constant.

The value of this constant is 1 thousand; that is, 1,000.

## TimeSpan.MicrosecondsPerMinute field

```csharp
public const long MicrosecondsPerMinute = 60000000;
```

Represents the number of microseconds in 1 minute. This field is constant.

The value of this constant is 60 million; that is, 60,000,000.

## TimeSpan.MicrosecondsPerSecond field

```csharp
public const long MicrosecondsPerSecond = 1000000;
```

Represents the number of microseconds in 1 second. This field is constant.

The value of this constant is 1 million; that is, 1,000,000.

## TimeSpan.MillisecondsPerDay field

```csharp
public const long MillisecondsPerDay = 86400000;
```

Represents the number of milliseconds in 1 day. This field is constant.

The value of this constant is 86.4 million; that is, 86,400,000.

## TimeSpan.MillisecondsPerHour field

```csharp
public const long MillisecondsPerHour = 3600000;
```

Represents the number of milliseconds in 1 hour. This field is constant.

The value of this constant is 3.6 million; that is, 3,600,000.

## TimeSpan.MillisecondsPerMinute field

```csharp
public const long MillisecondsPerMinute = 60000;
```

Represents the number of milliseconds in 1 minute. This field is constant.

The value of this constant is 60 thousand; that is, 60,000.

## TimeSpan.MillisecondsPerSecond field

```csharp
public const long MillisecondsPerSecond = 1000;
```

Represents the number of milliseconds in 1 second. This field is constant.

The value of this constant is 1 thousand; that is, 1,000.

## TimeSpan.MinutesPerDay field

```csharp
public const long MinutesPerDay = 1440;
```

Represents the number of minutes in 1 day. This field is constant.

The value of this constant is 1440.

## TimeSpan.MinutesPerHour field

```csharp
public const long MinutesPerHour = 60;
```

Represents the number of minutes in 1 hour. This field is constant.

The value of this constant is 60.

## TimeSpan.MinValue field

```csharp
public static readonly TimeSpan MinValue;
```

Represents the minimum `TimeSpan` value. This field is read-only.

#### Remarks
The value of this field is equivalent to `MinValue` ticks. The string representation of this value is negative 10675199.02:48:05.4775808, or slightly more than negative 10,675,199 days.

#### Examples
The following example references and displays the value of the `MinValue` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.NanosecondsPerTick field

```csharp
public const long NanosecondsPerTick = 100;
```

Represents the number of nanoseconds per tick. This field is constant.

#### Remarks

The value of this constant is 100.

## TimeSpan.SecondsPerDay field

```csharp
public const long SecondsPerDay = 86400;
```

Represents the number of seconds in 1 day. This field is constant.

The value of this constant is 86.4 thousand; that is, 86,400.

## TimeSpan.SecondsPerHour field

```csharp
public const long SecondsPerHour = 3600;
```

Represents the number of seconds in 1 hour. This field is constant.

The value of this constant is 3.6 thousand; that is, 3,600.

## TimeSpan.SecondsPerMinute field

```csharp
public const long SecondsPerMinute = 60;
```

Represents the number of seconds in 1 minute. This field is constant.

The value of this constant is 60.

## TimeSpan.TicksPerDay field

```csharp
public const long TicksPerDay = 864000000000;
```

Represents the number of ticks in 1 day. This field is constant.

#### Remarks
The value of this constant is 864 billion; that is, 864,000,000,000.

#### Examples
The following example references and displays the value of the `TicksPerDay` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.TicksPerHour field

```csharp
public const long TicksPerHour = 36000000000;
```

Represents the number of ticks in 1 hour. This field is constant.

#### Remarks
The value of this constant is 36 billion; that is, 36,000,000,000.

#### Examples
The following example references and displays the value of the `TicksPerHour` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.TicksPerMicrosecond field

```csharp
public const long TicksPerMicrosecond = 10;
```

Represents the number of ticks in 1 microsecond. This field is constant.

#### Remarks

The value of this constant is 10.

## TimeSpan.TicksPerMillisecond field

```csharp
public const long TicksPerMillisecond = 10000;
```

Represents the number of ticks in 1 millisecond. This field is constant.

#### Remarks
The value of this constant is 10 thousand; that is, 10,000.

#### Examples
The following example references and displays the value of the `TicksPerMillisecond` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.TicksPerMinute field

```csharp
public const long TicksPerMinute = 600000000;
```

Represents the number of ticks in 1 minute. This field is constant.

#### Remarks
The value of this constant is 600 million; that is, 600,000,000.

#### Examples
The following example references and displays the value of the `TicksPerMinute` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.TicksPerSecond field

```csharp
public const long TicksPerSecond = 10000000;
```

Represents the number of ticks in 1 second.

#### Remarks
The value of this constant is 10 million; that is, 10,000,000.

#### Examples
The following example references and displays the value of the `TicksPerSecond` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._

## TimeSpan.Zero field

```csharp
public static readonly TimeSpan Zero;
```

Represents the zero `TimeSpan` value. This field is read-only.

#### Remarks
Because the value of the `Zero` field is a `TimeSpan` object that represents a zero time value, you can compare it with other `TimeSpan` objects to determine whether the latter represent positive, non-zero, or negative time intervals. You can also use this field to initialize a `TimeSpan` object to a zero time value.

#### Examples
The following example references and displays the value of the `Zero` field.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/MaxValue/fields.cs._
