---
title: "ChronoLocalDate interface (java.time.chrono) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ChronoLocalDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoLocalDate interface (java.time.chrono)

```java
public interface ChronoLocalDate extends Temporal, TemporalAdjuster, Comparable<ChronoLocalDate>
```

A date without time-of-day or time-zone in an arbitrary chronology, intended
for advanced globalization use cases.

**Most applications should declare method signatures, fields and variables
as `LocalDate`, not this interface.**

A `ChronoLocalDate` is the abstract representation of a date where the
`Chronology chronology`, or calendar system, is pluggable.
The date is defined in terms of fields expressed by `TemporalField`,
where most common implementations are defined in `ChronoField`.
The chronology defines how the calendar system operates and the meaning of
the standard fields.

#### When to use this interface

The design of the API encourages the use of `LocalDate` rather than this
interface, even in the case where the application needs to deal with multiple
calendar systems.

This concept can seem surprising at first, as the natural way to globalize an
application might initially appear to be to abstract the calendar system.
However, as explored below, abstracting the calendar system is usually the wrong
approach, resulting in logic errors and hard to find bugs.
As such, it should be considered an application-wide architectural decision to choose
to use this interface as opposed to `LocalDate`.

#### Architectural issues to consider

These are some of the points that must be considered before using this interface
throughout an application.

1) Applications using this interface, as opposed to using just `LocalDate`,
face a significantly higher probability of bugs. This is because the calendar system
in use is not known at development time. A key cause of bugs is where the developer
applies assumptions from their day-to-day knowledge of the ISO calendar system
to code that is intended to deal with any arbitrary calendar system.
The section below outlines how those assumptions can cause problems
The primary mechanism for reducing this increased risk of bugs is a strong code review process.
This should also be considered a extra cost in maintenance for the lifetime of the code.

2) This interface does not enforce immutability of implementations.
While the implementation notes indicate that all implementations must be immutable
there is nothing in the code or type system to enforce this. Any method declared
to accept a `ChronoLocalDate` could therefore be passed a poorly or
maliciously written mutable implementation.

3) Applications using this interface  must consider the impact of eras.
`LocalDate` shields users from the concept of eras, by ensuring that `getYear()`
returns the proleptic year. That decision ensures that developers can think of
`LocalDate` instances as consisting of three fields - year, month-of-year and day-of-month.
By contrast, users of this interface must think of dates as consisting of four fields -
era, year-of-era, month-of-year and day-of-month. The extra era field is frequently
forgotten, yet it is of vital importance to dates in an arbitrary calendar system.
For example, in the Japanese calendar system, the era represents the reign of an Emperor.
Whenever one reign ends and another starts, the year-of-era is reset to one.

4) The only agreed international standard for passing a date between two systems
is the ISO-8601 standard which requires the ISO calendar system. Using this interface
throughout the application will inevitably lead to the requirement to pass the date
across a network or component boundary, requiring an application specific protocol or format.

5) Long term persistence, such as a database, will almost always only accept dates in the
ISO-8601 calendar system (or the related Julian-Gregorian). Passing around dates in other
calendar systems increases the complications of interacting with persistence.

6) Most of the time, passing a `ChronoLocalDate` throughout an application
is unnecessary, as discussed in the last section below.

#### False assumptions causing bugs in multi-calendar system code

As indicated above, there are many issues to consider when try to use and manipulate a
date in an arbitrary calendar system. These are some of the key issues.

Code that queries the day-of-month and assumes that the value will never be more than
31 is invalid. Some calendar systems have more than 31 days in some months.

Code that adds 12 months to a date and assumes that a year has been added is invalid.
Some calendar systems have a different number of months, such as 13 in the Coptic or Ethiopic.

Code that adds one month to a date and assumes that the month-of-year value will increase
by one or wrap to the next year is invalid. Some calendar systems have a variable number
of months in a year, such as the Hebrew.

Code that adds one month, then adds a second one month and assumes that the day-of-month
will remain close to its original value is invalid. Some calendar systems have a large difference
between the length of the longest month and the length of the shortest month.
For example, the Coptic or Ethiopic have 12 months of 30 days and 1 month of 5 days.

Code that adds seven days and assumes that a week has been added is invalid.
Some calendar systems have weeks of other than seven days, such as the French Revolutionary.

Code that assumes that because the year of `date1` is greater than the year of `date2`
then `date1` is after `date2` is invalid. This is invalid for all calendar systems
when referring to the year-of-era, and especially untrue of the Japanese calendar system
where the year-of-era restarts with the reign of every new Emperor.

Code that treats month-of-year one and day-of-month one as the start of the year is invalid.
Not all calendar systems start the year when the month value is one.

In general, manipulating a date, and even querying a date, is wide open to bugs when the
calendar system is unknown at development time. This is why it is essential that code using
this interface is subjected to additional code reviews. It is also why an architectural
decision to avoid this interface type is usually the correct one.

#### Using LocalDate instead

The primary alternative to using this interface throughout your application is as follows.

- Declare all method signatures referring to dates in terms of `LocalDate`.

- Either store the chronology (calendar system) in the user profile or lookup
 the chronology from the user locale

- Convert the ISO `LocalDate` to and from the user's preferred calendar system during
 printing and parsing

This approach treats the problem of globalized calendar systems as a localization issue
and confines it to the UI layer. This approach is in keeping with other localization
issues in the java platform.

As discussed above, performing calculations on a date where the rules of the calendar system
are pluggable requires skill and is not recommended.
Fortunately, the need to perform calculations on a date in an arbitrary calendar system
is extremely rare. For example, it is highly unlikely that the business rules of a library
book rental scheme will allow rentals to be for one month, where meaning of the month
is dependent on the user's preferred calendar system.

A key use case for calculations on a date in an arbitrary calendar system is producing
a month-by-month calendar for display and user interaction. Again, this is a UI issue,
and use of this interface solely within a few methods of the UI layer may be justified.

In any other part of the system, where a date must be manipulated in a calendar system
other than ISO, the use case will generally specify the calendar system to use.
For example, an application may need to calculate the next Islamic or Hebrew holiday
which may require manipulating the date.
This kind of use case can be handled as follows:

- start from the ISO `LocalDate` being passed to the method

- convert the date to the alternate calendar system, which for this use case is known
 rather than arbitrary

- perform the calculation

- convert back to `LocalDate`

Developers writing low-level frameworks or libraries should also avoid this interface.
Instead, one of the two general purpose access interfaces should be used.
Use `TemporalAccessor` if read-only access is required, or use `Temporal`
if read-write access is required.

**Implementation requirements:** This interface must be implemented with care to ensure other classes operate correctly.
All implementations that can be instantiated must be final, immutable and thread-safe.
Subclasses should be Serializable wherever possible.

Additional calendar systems may be added to the system.
See `Chronology` for more details.

**Since:** 1.8

## ChronoLocalDate.timeLineOrder()

```java
static Comparator<ChronoLocalDate> timeLineOrder()
```

Gets a comparator that compares `ChronoLocalDate` in
time-line order ignoring the chronology.

This comparator differs from the comparison in `compareTo` in that it
only compares the underlying date and not the chronology.
This allows dates in different calendar systems to be compared based
on the position of the date on the local time-line.
The underlying comparison is equivalent to comparing the epoch-day.

**Returns:** a comparator that compares in time-line order ignoring the chronology

**See also:** #isAfter

**See also:** #isBefore

**See also:** #isEqual

## ChronoLocalDate.from(TemporalAccessor)

```java
static ChronoLocalDate from(TemporalAccessor temporal)
```

Obtains an instance of `ChronoLocalDate` from a temporal object.

This obtains a local date based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ChronoLocalDate`.

The conversion extracts and combines the chronology and the date
from the temporal object. The behavior is equivalent to using
`Chronology.date(TemporalAccessor)` with the extracted chronology.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `ChronoLocalDate::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date, not null

**See also:** Chronology#date(TemporalAccessor)

Throws:

- `DateTimeException`: if unable to convert to a `ChronoLocalDate`

## ChronoLocalDate.getChronology()

```java
Chronology getChronology()
```

Gets the chronology of this date.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the chronology, not null

## ChronoLocalDate.getEra()

```java
default Era getEra()
```

Gets the era, as defined by the chronology.

The era is, conceptually, the largest division of the time-line.
Most calendar systems have a single epoch dividing the time-line into two eras.
However, some have multiple eras, such as one for the reign of each leader.
The exact meaning is determined by the `Chronology`.

All correctly implemented `Era` classes are singletons, thus it
is valid code to write `date.getEra() == SomeChrono.ERA_NAME)`.

This default implementation uses `Chronology.eraOf(int)`.

**Returns:** the chronology specific era constant applicable at this date, not null

## ChronoLocalDate.isLeapYear()

```java
default boolean isLeapYear()
```

Checks if the year is a leap year, as defined by the calendar system.

A leap-year is a year of a longer length than normal.
The exact meaning is determined by the chronology with the constraint that
a leap-year must imply a year-length longer than a non leap-year.

This default implementation uses `Chronology.isLeapYear(long)`.

**Returns:** true if this date is in a leap year, false otherwise

## ChronoLocalDate.lengthOfMonth()

```java
int lengthOfMonth()
```

Returns the length of the month represented by this date, as defined by the calendar system.

This returns the length of the month in days.

**Returns:** the length of the month in days

## ChronoLocalDate.lengthOfYear()

```java
default int lengthOfYear()
```

Returns the length of the year represented by this date, as defined by the calendar system.

This returns the length of the year in days.

The default implementation uses `isLeapYear()` and returns 365 or 366.

**Returns:** the length of the year in days

## ChronoLocalDate.isSupported(TemporalField)

```java
default boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if the specified field can be queried on this date.
If false, then calling the range,
get and long)
methods will throw an exception.

The set of supported fields is defined by the chronology and normally includes
all `ChronoField` date fields.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field can be queried, false if not

## ChronoLocalDate.isSupported(TemporalUnit)

```java
default boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to or subtracted from this date.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

The set of supported units is defined by the chronology and normally includes
all `ChronoUnit` date units except `FOREVER`.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
passing `this` as the argument.
Whether the unit is supported is determined by the unit.

Parameters:

- `unit`: the unit to check, null returns false

**Returns:** true if the unit can be added/subtracted, false if not

## ChronoLocalDate.with(TemporalAdjuster)

```java
default ChronoLocalDate with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDate.with(TemporalField, long)

```java
default ChronoLocalDate with(TemporalField field, long newValue)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `UnsupportedTemporalTypeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDate.plus(TemporalAmount)

```java
default ChronoLocalDate plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)
