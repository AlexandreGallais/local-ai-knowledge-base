---
title: "Duration class (java.time) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Duration.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Duration class (java.time)

```java
public final class Duration implements TemporalAmount, Comparable<Duration>, Serializable
```

A time-based amount of time, such as '34.5 seconds'.

This class models a quantity or amount of time in terms of seconds and nanoseconds.
It can be accessed using other duration-based units, such as minutes and hours.
In addition, the DAYS unit can be used and is treated as
exactly equal to 24 hours, thus ignoring daylight savings effects.
See `Period` for the date-based equivalent to this class.

A physical duration could be of infinite length.
For practicality, the duration is stored with constraints similar to `Instant`.
The duration uses nanosecond resolution with a maximum value of the seconds that can
be held in a `long`. This is greater than the current estimated age of the universe.

The range of a duration requires the storage of a number larger than a `long`.
To achieve this, the class stores a `long` representing seconds and an `int`
representing nanosecond-of-second, which will always be between 0 and 999,999,999.
The model is of a directed duration, meaning that the duration may be negative.

The duration is measured in "seconds", but these are not necessarily identical to
the scientific "SI second" definition based on atomic clocks.
This difference only impacts durations measured near a leap-second and should not affect
most applications.
See `Instant` for a discussion as to the meaning of the second and time-scales.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## Duration.ZERO

```java
public static final Duration ZERO
```

Constant for a duration of zero.

## Duration.ofDays(long)

```java
public static Duration ofDays(long days)
```

Obtains a `Duration` representing a number of standard 24 hour days.

The seconds are calculated based on the standard definition of a day,
where each day is 86400 seconds which implies a 24 hour day.
The nanosecond in second field is set to zero.

Parameters:

- `days`: the number of days, positive or negative

**Returns:** a `Duration`, not null

Throws:

- `ArithmeticException`: if the input days exceeds the capacity of `Duration`

## Duration.ofHours(long)

```java
public static Duration ofHours(long hours)
```

Obtains a `Duration` representing a number of standard hours.

The seconds are calculated based on the standard definition of an hour,
where each hour is 3600 seconds.
The nanosecond in second field is set to zero.

Parameters:

- `hours`: the number of hours, positive or negative

**Returns:** a `Duration`, not null

Throws:

- `ArithmeticException`: if the input hours exceeds the capacity of `Duration`

## Duration.ofMinutes(long)

```java
public static Duration ofMinutes(long minutes)
```

Obtains a `Duration` representing a number of standard minutes.

The seconds are calculated based on the standard definition of a minute,
where each minute is 60 seconds.
The nanosecond in second field is set to zero.

Parameters:

- `minutes`: the number of minutes, positive or negative

**Returns:** a `Duration`, not null

Throws:

- `ArithmeticException`: if the input minutes exceeds the capacity of `Duration`

## Duration.ofSeconds(long)

```java
public static Duration ofSeconds(long seconds)
```

Obtains a `Duration` representing a number of seconds.

The nanosecond in second field is set to zero.

Parameters:

- `seconds`: the number of seconds, positive or negative

**Returns:** a `Duration`, not null

## Duration.ofSeconds(long, long)

```java
public static Duration ofSeconds(long seconds, long nanoAdjustment)
```

Obtains a `Duration` representing a number of seconds and an
adjustment in nanoseconds.

This method allows an arbitrary number of nanoseconds to be passed in.
The factory will alter the values of the second and nanosecond in order
to ensure that the stored nanosecond is in the range 0 to 999,999,999.
For example, the following will result in exactly the same duration:

```java
 Duration.ofSeconds(3, 1);
 Duration.ofSeconds(4, -999_999_999);
 Duration.ofSeconds(2, 1000_000_001);
```

Parameters:

- `seconds`: the number of seconds, positive or negative
- `nanoAdjustment`: the nanosecond adjustment to the number of seconds, positive or negative

**Returns:** a `Duration`, not null

Throws:

- `ArithmeticException`: if the adjustment causes the seconds to exceed the capacity of `Duration`

## Duration.ofMillis(long)

```java
public static Duration ofMillis(long millis)
```

Obtains a `Duration` representing a number of milliseconds.

The seconds and nanoseconds are extracted from the specified milliseconds.

Parameters:

- `millis`: the number of milliseconds, positive or negative

**Returns:** a `Duration`, not null

## Duration.ofNanos(long)

```java
public static Duration ofNanos(long nanos)
```

Obtains a `Duration` representing a number of nanoseconds.

The seconds and nanoseconds are extracted from the specified nanoseconds.

Parameters:

- `nanos`: the number of nanoseconds, positive or negative

**Returns:** a `Duration`, not null

## Duration.of(long, TemporalUnit)

```java
public static Duration of(long amount, TemporalUnit unit)
```

Obtains a `Duration` representing an amount in the specified unit.

The parameters represent the two parts of a phrase like '6 Hours'. For example:

```java
 Duration.of(3, SECONDS);
 Duration.of(465, HOURS);
```

Only a subset of units are accepted by this method.
The unit must either have an exact duration or
be `ChronoUnit.DAYS` which is treated as 24 hours. Other units throw an exception.

Parameters:

- `amount`: the amount of the duration, measured in terms of the unit, positive or negative
- `unit`: the unit that the duration is measured in, must have an exact duration, not null

**Returns:** a `Duration`, not null

Throws:

- `DateTimeException`: if the unit has an estimated duration
- `ArithmeticException`: if a numeric overflow occurs

## Duration.from(TemporalAmount)

```java
public static Duration from(TemporalAmount amount)
```

Obtains an instance of `Duration` from a temporal amount.

This obtains a duration based on the specified amount.
A `TemporalAmount` represents an  amount of time, which may be
date-based or time-based, which this factory extracts to a duration.

The conversion loops around the set of units from the amount and uses
the duration of the unit to
calculate the total `Duration`.
Only a subset of units are accepted by this method. The unit must either
have an exact duration
or be `ChronoUnit.DAYS` which is treated as 24 hours.
If any other units are found then an exception is thrown.

Parameters:

- `amount`: the temporal amount to convert, not null

**Returns:** the equivalent duration, not null

Throws:

- `DateTimeException`: if unable to convert to a `Duration`
- `ArithmeticException`: if numeric overflow occurs

## Duration.parse(CharSequence)

```java
public static Duration parse(CharSequence text)
```

Obtains a `Duration` from a text string such as `PnDTnHnMn.nS`.

This will parse a textual representation of a duration, including the
string produced by `toString()`. The formats accepted are based
on the ISO-8601 duration format `PnDTnHnMn.nS` with days
considered to be exactly 24 hours.

The string starts with an optional sign, denoted by the ASCII negative
or positive symbol. If negative, the whole duration is negated.
The ASCII letter "P" is next in upper or lower case.
There are then four sections, each consisting of a number and a suffix.
The sections have suffixes in ASCII of "D", "H", "M" and "S" for
days, hours, minutes and seconds, accepted in upper or lower case.
The suffixes must occur in order. The ASCII letter "T" must occur before
the first occurrence, if any, of an hour, minute or second section.
At least one of the four sections must be present, and if "T" is present
there must be at least one section after the "T".
The number part of each section must consist of one or more ASCII digits.
The number may be prefixed by the ASCII negative or positive symbol.
The number of days, hours and minutes must parse to a `long`.
The number of seconds must parse to a `long` with optional fraction.
The decimal point may be either a dot or a comma.
The fractional part may have from zero to 9 digits.

The leading plus/minus sign, and negative values for other units are
not part of the ISO-8601 standard.

Examples:

```java
   "PT20.345S" -- parses as "20.345 seconds"
   "PT15M"     -- parses as "15 minutes" (where a minute is 60 seconds)
   "PT10H"     -- parses as "10 hours" (where an hour is 3600 seconds)
   "P2D"       -- parses as "2 days" (where a day is 24 hours or 86400 seconds)
   "P2DT3H4M"  -- parses as "2 days, 3 hours and 4 minutes"
   "PT-6H3M"    -- parses as "-6 hours and +3 minutes"
   "-PT6H3M"    -- parses as "-6 hours and -3 minutes"
   "-PT-6H+3M"  -- parses as "+6 hours and -3 minutes"
```

Parameters:

- `text`: the text to parse, not null

**Returns:** the parsed duration, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed to a duration

## Duration.between(Temporal, Temporal)

```java
public static Duration between(Temporal startInclusive, Temporal endExclusive)
```

Obtains a `Duration` representing the duration between two temporal objects.

This calculates the duration between two temporal objects. If the objects
are of different types, then the duration is calculated based on the type
of the first object. For example, if the first argument is a `LocalTime`
then the second argument is converted to a `LocalTime`.

The specified temporal objects must support the SECONDS unit.
For full accuracy, either the NANOS unit or the
NANO_OF_SECOND field should be supported.

The result of this method can be a negative duration if the end is before the start.
To guarantee to obtain a positive duration call `abs()` on the result.

Parameters:

- `startInclusive`: the start instant, inclusive, not null
- `endExclusive`: the end instant, exclusive, not null

**Returns:** a `Duration`, not null

Throws:

- `DateTimeException`: if the seconds between the temporals cannot be obtained
- `ArithmeticException`: if the calculation exceeds the capacity of `Duration`

## Duration.get(TemporalUnit)

```java
public long get(TemporalUnit unit)
```

Gets the value of the requested unit.

This returns a value for each of the two supported units,
SECONDS and NANOS.
All other units throw an exception.

Parameters:

- `unit`: the `TemporalUnit` for which to return the value

**Returns:** the long value of the unit

Throws:

- `DateTimeException`: if the unit is not supported
- `UnsupportedTemporalTypeException`: if the unit is not supported

## Duration.getUnits()

```java
public List<TemporalUnit> getUnits()
```

Gets the set of units supported by this duration.

The supported units are SECONDS,
and NANOS.
They are returned in the order seconds, nanos.

This set can be used in conjunction with `get(TemporalUnit)`
to access the entire state of the duration.

**Returns:** a list containing the seconds and nanos units, not null

## Duration.isPositive()

```java
public boolean isPositive()
```

Checks if this duration is positive, excluding zero.

A `Duration` represents a directed distance between two points on
the time-line and can therefore be positive, zero or negative.
This method checks whether the length is greater than zero.

**Returns:** true if this duration has a total length greater than zero

**Since:** 18

## Duration.isZero()

```java
public boolean isZero()
```

Checks if this duration is zero length.

A `Duration` represents a directed distance between two points on
the time-line and can therefore be positive, zero or negative.
This method checks whether the length is zero.

**Returns:** true if this duration has a total length equal to zero

## Duration.isNegative()

```java
public boolean isNegative()
```

Checks if this duration is negative, excluding zero.

A `Duration` represents a directed distance between two points on
the time-line and can therefore be positive, zero or negative.
This method checks whether the length is less than zero.

**Returns:** true if this duration has a total length less than zero

## Duration.getSeconds()

```java
public long getSeconds()
```

Gets the number of seconds in this duration.

The length of the duration is stored using two fields - seconds and nanoseconds.
The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
the length in seconds.
The total duration is defined by calling this method and `getNano()`.

A `Duration` represents a directed distance between two points on the time-line.
A negative duration is expressed by the negative sign of the seconds part.
A duration of -1 nanosecond is stored as -1 seconds plus 999,999,999 nanoseconds.

**Returns:** the whole seconds part of the length of the duration, positive or negative

## Duration.getNano()

```java
public int getNano()
```

Gets the number of nanoseconds within the second in this duration.

The length of the duration is stored using two fields - seconds and nanoseconds.
The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
the length in seconds.
The total duration is defined by calling this method and `getSeconds()`.

A `Duration` represents a directed distance between two points on the time-line.
A negative duration is expressed by the negative sign of the seconds part.
A duration of -1 nanosecond is stored as -1 seconds plus 999,999,999 nanoseconds.

**Returns:** the nanoseconds within the second part of the length of the duration, from 0 to 999,999,999

## Duration.withSeconds(long)

```java
public Duration withSeconds(long seconds)
```

Returns a copy of this duration with the specified amount of seconds.

This returns a duration with the specified seconds, retaining the
nano-of-second part of this duration.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to represent, may be negative

**Returns:** a `Duration` based on this duration with the requested seconds, not null

## Duration.withNanos(int)

```java
public Duration withNanos(int nanoOfSecond)
```

Returns a copy of this duration with the specified nano-of-second.

This returns a duration with the specified nano-of-second, retaining the
seconds part of this duration.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999

**Returns:** a `Duration` based on this duration with the requested nano-of-second, not null

Throws:

- `DateTimeException`: if the nano-of-second is invalid
