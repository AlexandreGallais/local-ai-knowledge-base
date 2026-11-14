---
title: "ChronoLocalDate interface (java.time.chrono) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ChronoLocalDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoLocalDate interface (java.time.chrono) (part 2 of 2)

## ChronoLocalDate.plus(long, TemporalUnit)

```java
default ChronoLocalDate plus(long amountToAdd, TemporalUnit unit)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDate.minus(TemporalAmount)

```java
default ChronoLocalDate minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDate.minus(long, TemporalUnit)

```java
default ChronoLocalDate minus(long amountToSubtract, TemporalUnit unit)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `UnsupportedTemporalTypeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDate.query(TemporalQuery<R>)

```java
default <R> R query(TemporalQuery<R> query)
```

Queries this date using the specified query.

This queries this date using the specified query strategy object.
The `TemporalQuery` object defines the logic to be used to
obtain the result. Read the documentation of the query to understand
what the result of this method will be.

The result of this method is obtained by invoking the
`TemporalQuery.queryFrom(TemporalAccessor)` method on the
specified query passing `this` as the argument.

Parameters:

- `<R>`: the type of the result
- `query`: the query to invoke, not null

**Returns:** the query result, null may be returned (defined by the query)

Throws:

- `DateTimeException`: if unable to query (defined by the query)
- `ArithmeticException`: if numeric overflow occurs (defined by the query)

## ChronoLocalDate.adjustInto(Temporal)

```java
default Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same date as this object.

This returns a temporal object of the same observable type as the input
with the date changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.EPOCH_DAY` as the field.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisLocalDate.adjustInto(temporal);
  temporal = temporal.with(thisLocalDate);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## ChronoLocalDate.until(Temporal, TemporalUnit)

```java
long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another date in terms of the specified unit.

This calculates the amount of time between two `ChronoLocalDate`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified date.
The result will be negative if the end is before the start.
The `Temporal` passed to this method is converted to a
`ChronoLocalDate` using `Chronology.date(TemporalAccessor)`.
The calculation returns a whole number, representing the number of
complete units between the two dates.
For example, the amount in days between two dates can be calculated
using `startDate.until(endDate, DAYS)`.

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use Temporal):

```java
  // these two lines are equivalent
  amount = start.until(end, MONTHS);
  amount = MONTHS.between(start, end);
```

The choice should be made based on which makes the code more readable.

The calculation is implemented in this method for `ChronoUnit`.
The units `DAYS`, `WEEKS`, `MONTHS`, `YEARS`,
`DECADES`, `CENTURIES`, `MILLENNIA` and `ERAS`
should be supported by all implementations.
Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal as
the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to a `ChronoLocalDate` in the same chronology, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this date and the end date

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `ChronoLocalDate`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## ChronoLocalDate.until(ChronoLocalDate)

```java
ChronoPeriod until(ChronoLocalDate endDateExclusive)
```

Calculates the period between this date and another date as a `ChronoPeriod`.

This calculates the period between two dates. All supplied chronologies
calculate the period using years, months and days, however the
`ChronoPeriod` API allows the period to be represented using other units.

The start and end points are `this` and the specified date.
The result will be negative if the end is before the start.
The negative sign will be the same in each of year, month and day.

The calculation is performed using the chronology of this date.
If necessary, the input date will be converted to match.

This instance is immutable and unaffected by this method call.

Parameters:

- `endDateExclusive`: the end date, exclusive, which may be in any chronology, not null

**Returns:** the period between this date and the end date, not null

Throws:

- `DateTimeException`: if the period cannot be calculated
- `ArithmeticException`: if numeric overflow occurs

## ChronoLocalDate.format(DateTimeFormatter)

```java
default String format(DateTimeFormatter formatter)
```

Formats this date using the specified formatter.

This date will be passed to the formatter to produce a string.

The default implementation must behave as follows:

```java
 return formatter.format(this);
```

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted date string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## ChronoLocalDate.atTime(LocalTime)

```java
default ChronoLocalDateTime<?> atTime(LocalTime localTime)
```

Combines this date with a time to create a `ChronoLocalDateTime`.

This returns a `ChronoLocalDateTime` formed from this date at the specified time.
All possible combinations of date and time are valid.

Parameters:

- `localTime`: the local time to use, not null

**Returns:** the local date-time formed from this date and the specified time, not null

## ChronoLocalDate.toEpochDay()

```java
default long toEpochDay()
```

Converts this date to the Epoch Day.

The Epoch Day count is a simple
incrementing count of days where day 0 is 1970-01-01 (ISO).
This definition is the same for all chronologies, enabling conversion.

This default implementation queries the `EPOCH_DAY` field.

**Returns:** the Epoch Day equivalent to this date

## ChronoLocalDate.compareTo(ChronoLocalDate)

```java
default int compareTo(ChronoLocalDate other)
```

Compares this date to another date, including the chronology.

The comparison is based first on the underlying time-line date, then
on the chronology.
It is "consistent with equals", as defined by `Comparable`.

For example, the following is the comparator order:

- `2012-12-03 (ISO)`

- `2012-12-04 (ISO)`

- `2555-12-04 (ThaiBuddhist)`

- `2012-12-05 (ISO)`

Values #2 and #3 represent the same date on the time-line.
When two values represent the same date, the chronology ID is compared to distinguish them.
This step is needed to make the ordering "consistent with equals".

If all the date objects being compared are in the same chronology, then the
additional chronology stage is not required and only the local date is used.
To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

This default implementation performs the comparison defined above.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** the comparator value, that is the comparison of this local date with
         the `other` local date and this chronology with the `other` chronology,
         in order, returning the first non-zero result, and otherwise returning zero

**See also:** #isBefore

**See also:** #isAfter

## ChronoLocalDate.isAfter(ChronoLocalDate)

```java
default boolean isAfter(ChronoLocalDate other)
```

Checks if this date is after the specified date ignoring the chronology.

This method differs from the comparison in `compareTo` in that it
only compares the underlying date and not the chronology.
This allows dates in different calendar systems to be compared based
on the time-line position.
This is equivalent to using `date1.toEpochDay() > date2.toEpochDay()`.

This default implementation performs the comparison based on the epoch-day.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** true if this is after the specified date

## ChronoLocalDate.isBefore(ChronoLocalDate)

```java
default boolean isBefore(ChronoLocalDate other)
```

Checks if this date is before the specified date ignoring the chronology.

This method differs from the comparison in `compareTo` in that it
only compares the underlying date and not the chronology.
This allows dates in different calendar systems to be compared based
on the time-line position.
This is equivalent to using `date1.toEpochDay() < date2.toEpochDay()`.

This default implementation performs the comparison based on the epoch-day.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** true if this is before the specified date

## ChronoLocalDate.isEqual(ChronoLocalDate)

```java
default boolean isEqual(ChronoLocalDate other)
```

Checks if this date is equal to the specified date ignoring the chronology.

This method differs from the comparison in `compareTo` in that it
only compares the underlying date and not the chronology.
This allows dates in different calendar systems to be compared based
on the time-line position.
This is equivalent to using `date1.toEpochDay() == date2.toEpochDay()`.

This default implementation performs the comparison based on the epoch-day.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** true if the underlying date is equal to the specified date

## ChronoLocalDate.equals(Object)

```java
boolean equals(Object obj)
```

Checks if this date is equal to another date, including the chronology.

Compares this date with another ensuring that the date and chronology are the same.

To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date

## ChronoLocalDate.hashCode()

```java
int hashCode()
```

A hash code for this date.

**Returns:** a suitable hash code

## ChronoLocalDate.toString()

```java
String toString()
```

Outputs this date as a `String`.

The output will include the full local date.

**Returns:** the formatted date, not null
