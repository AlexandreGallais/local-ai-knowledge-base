---
title: "Temporal interface (java.time.temporal) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/temporal/Temporal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Temporal interface (java.time.temporal)

```java
public interface Temporal extends TemporalAccessor
```

Framework-level interface defining read-write access to a temporal object,
such as a date, time, offset or some combination of these.

This is the base interface type for date, time and offset objects that
are complete enough to be manipulated using plus and minus.
It is implemented by those classes that can provide and manipulate information
as fields or queries.
See `TemporalAccessor` for the read-only version of this interface.

Most date and time information can be represented as a number.
These are modeled using `TemporalField` with the number held using
a `long` to handle large values. Year, month and day-of-month are
simple examples of fields, but they also include instant and offsets.
See `ChronoField` for the standard set of fields.

Two pieces of date/time information cannot be represented by numbers,
the chronology and the
time-zone.
These can be accessed via queries using
the static methods defined on `TemporalQuery`.

This interface is a framework-level interface that should not be widely
used in application code. Instead, applications should create and pass
around instances of concrete types, such as `LocalDate`.
There are many reasons for this, part of which is that implementations
of this interface may be in calendar systems other than ISO.
See `java.time.chrono.ChronoLocalDate` for a fuller discussion of the issues.

#### When to implement

A class should implement this interface if it meets three criteria:

- it provides access to date/time/offset information, as per `TemporalAccessor`

- the set of fields are contiguous from the largest to the smallest

- the set of fields are complete, such that no other field is needed to define the
 valid range of values for the fields that are represented

Four examples make this clear:

- `LocalDate` implements this interface as it represents a set of fields
 that are contiguous from days to forever and require no external information to determine
 the validity of each date. It is therefore able to implement plus/minus correctly.

- `LocalTime` implements this interface as it represents a set of fields
 that are contiguous from nanos to within days and require no external information to determine
 validity. It is able to implement plus/minus correctly, by wrapping around the day.

- `MonthDay`, the combination of month-of-year and day-of-month, does not implement
 this interface.  While the combination is contiguous, from days to months within years,
 the combination does not have sufficient information to define the valid range of values
 for day-of-month.  As such, it is unable to implement plus/minus correctly.

- The combination day-of-week and day-of-month ("Friday the 13th") should not implement
 this interface. It does not represent a contiguous set of fields, as days to weeks overlaps
 days to months.

**Implementation requirements:** This interface places no restrictions on the mutability of implementations,
however immutability is strongly recommended.
All implementations must be `Comparable`.

**Since:** 1.8

## Temporal.isSupported(TemporalUnit)

```java
boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this date-time.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

Parameters:

- `unit`: the unit to check, null returns false

**Implementation requirements:** Implementations must check and handle all units defined in `ChronoUnit`.
If the unit is supported, then true must be returned, otherwise false must be returned.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
passing `this` as the argument.

Implementations must ensure that no observable state is altered when this
read-only method is invoked.

**Returns:** true if the unit can be added/subtracted, false if not

## Temporal.with(TemporalAdjuster)

```java
default Temporal with(TemporalAdjuster adjuster)
```

Returns an adjusted object of the same type as this object with the adjustment made.

This adjusts this date-time according to the rules of the specified adjuster.
A simple adjuster might simply set the one of the fields, such as the year field.
A more complex adjuster might set the date to the last day of the month.
A selection of common adjustments is provided in
TemporalAdjusters.
These include finding the "last day of the month" and "next Wednesday".
The adjuster is responsible for handling special cases, such as the varying
lengths of month and leap years.

Some example code indicating how and why this method is used:

```java
 date = date.with(Month.JULY);        // most key <example-value> implement TemporalAdjuster
 date = date.with(lastDayOfMonth());  // static import from Adjusters
 date = date.with(next(WEDNESDAY));   // static import from Adjusters and DayOfWeek
```

Parameters:

- `adjuster`: the adjuster to use, not null

**Implementation requirements:** Implementations must not alter either this object or the specified temporal object.
Instead, an adjusted copy of the original must be returned.
This provides equivalent, safe behavior for immutable and mutable implementations.

The default implementation must behave equivalent to this code:

```java
 return adjuster.adjustInto(this);
```

**Returns:** an object of the same type with the specified adjustment made, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## Temporal.with(TemporalField, long)

```java
Temporal with(TemporalField field, long newValue)
```

Returns an object of the same type as this object with the specified field altered.

This returns a new object based on this one with the value for the specified field changed.
For example, on a `LocalDate`, this could be used to set the year, month or day-of-month.
The returned object will have the same observable type as this object.

In some cases, changing a field is not fully defined. For example, if the target object is
a date representing the 31st January, then changing the month to February would be unclear.
In cases like this, the field is responsible for resolving the result. Typically it will choose
the previous valid date, which would be the last valid day of February in this example.

Parameters:

- `field`: the field to set in the result, not null
- `newValue`: the new value of the field in the result

**Implementation requirements:** Implementations must check and handle all fields defined in `ChronoField`.
If the field is supported, then the adjustment must be performed.
If unsupported, then an `UnsupportedTemporalTypeException` must be thrown.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
passing `this` as the first argument.

Implementations must not alter this object.
Instead, an adjusted copy of the original must be returned.
This provides equivalent, safe behavior for immutable and mutable implementations.

**Returns:** an object of the same type with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## Temporal.plus(TemporalAmount)

```java
default Temporal plus(TemporalAmount amount)
```

Returns an object of the same type as this object with an amount added.

This adjusts this temporal, adding according to the rules of the specified amount.
The amount is typically a `java.time.Period` but may be any other type implementing
the `TemporalAmount` interface, such as `java.time.Duration`.

Some example code indicating how and why this method is used:

```java
 date = date.plus(period);                // add a Period instance
 date = date.plus(duration);              // add a Duration instance
 date = date.plus(workingDays(6));        // example user-written workingDays method
```

Note that calling `plus` followed by `minus` is not guaranteed to
return the same date-time.

Parameters:

- `amount`: the amount to add, not null

**Implementation requirements:** Implementations must not alter either this object or the specified temporal object.
Instead, an adjusted copy of the original must be returned.
This provides equivalent, safe behavior for immutable and mutable implementations.

The default implementation must behave equivalent to this code:

```java
 return amount.addTo(this);
```

**Returns:** an object of the same type with the specified adjustment made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Temporal.plus(long, TemporalUnit)

```java
Temporal plus(long amountToAdd, TemporalUnit unit)
```

Returns an object of the same type as this object with the specified period added.

This method returns a new object based on this one with the specified period added.
For example, on a `LocalDate`, this could be used to add a number of years, months or days.
The returned object will have the same observable type as this object.

In some cases, changing a field is not fully defined. For example, if the target object is
a date representing the 31st January, then adding one month would be unclear.
In cases like this, the field is responsible for resolving the result. Typically it will choose
the previous valid date, which would be the last valid day of February in this example.

Parameters:

- `amountToAdd`: the amount of the specified unit to add, may be negative
- `unit`: the unit of the amount to add, not null

**Implementation requirements:** Implementations must check and handle all units defined in `ChronoUnit`.
If the unit is supported, then the addition must be performed.
If unsupported, then an `UnsupportedTemporalTypeException` must be thrown.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the first argument.

Implementations must not alter this object.
Instead, an adjusted copy of the original must be returned.
This provides equivalent, safe behavior for immutable and mutable implementations.

**Returns:** an object of the same type with the specified period added, not null

Throws:

- `DateTimeException`: if the unit cannot be added
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Temporal.minus(TemporalAmount)

```java
default Temporal minus(TemporalAmount amount)
```

Returns an object of the same type as this object with an amount subtracted.

This adjusts this temporal, subtracting according to the rules of the specified amount.
The amount is typically a `java.time.Period` but may be any other type implementing
the `TemporalAmount` interface, such as `java.time.Duration`.

Some example code indicating how and why this method is used:

```java
 date = date.minus(period);               // subtract a Period instance
 date = date.minus(duration);             // subtract a Duration instance
 date = date.minus(workingDays(6));       // example user-written workingDays method
```

Note that calling `plus` followed by `minus` is not guaranteed to
return the same date-time.

Parameters:

- `amount`: the amount to subtract, not null

**Implementation requirements:** Implementations must not alter either this object or the specified temporal object.
Instead, an adjusted copy of the original must be returned.
This provides equivalent, safe behavior for immutable and mutable implementations.

The default implementation must behave equivalent to this code:

```java
 return amount.subtractFrom(this);
```

**Returns:** an object of the same type with the specified adjustment made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Temporal.minus(long, TemporalUnit)

```java
default Temporal minus(long amountToSubtract, TemporalUnit unit)
```

Returns an object of the same type as this object with the specified period subtracted.

This method returns a new object based on this one with the specified period subtracted.
For example, on a `LocalDate`, this could be used to subtract a number of years, months or days.
The returned object will have the same observable type as this object.

In some cases, changing a field is not fully defined. For example, if the target object is
a date representing the 31st March, then subtracting one month would be unclear.
In cases like this, the field is responsible for resolving the result. Typically it will choose
the previous valid date, which would be the last valid day of February in this example.

Parameters:

- `amountToSubtract`: the amount of the specified unit to subtract, may be negative
- `unit`: the unit of the amount to subtract, not null

**Implementation requirements:** Implementations must behave in a manor equivalent to the default method behavior.

Implementations must not alter this object.
Instead, an adjusted copy of the original must be returned.
This provides equivalent, safe behavior for immutable and mutable implementations.

The default implementation must behave equivalent to this code:

```java
 return (amountToSubtract == Long.MIN_VALUE ?
     plus(Long.MAX_VALUE, unit).plus(1, unit) : plus(-amountToSubtract, unit));
```

**Returns:** an object of the same type with the specified period subtracted, not null

Throws:

- `DateTimeException`: if the unit cannot be subtracted
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs
