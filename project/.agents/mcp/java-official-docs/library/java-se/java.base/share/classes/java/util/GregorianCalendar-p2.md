---
title: "GregorianCalendar class (java.util) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/GregorianCalendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GregorianCalendar class (java.util) (part 2 of 3)

## GregorianCalendar.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this `GregorianCalendar` to the specified
`Object`. The result is `true` if and
only if the argument is a `GregorianCalendar` object
that represents the same time value (millisecond offset from
the Epoch) under the same
`Calendar` parameters and Gregorian change date as
this object.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if this object is equal to `obj`;
`false` otherwise.

**See also:** Calendar#compareTo(Calendar)

## GregorianCalendar.hashCode()

```java
public int hashCode()
```

Generates the hash code for this `GregorianCalendar` object.

## GregorianCalendar.add(int, int)

```java
public void add(int field, int amount)
```

Adds the specified (signed) amount of time to the given calendar field,
based on the calendar's rules.

*Add rule 1*. The value of `field`
after the call minus the value of `field` before the
call is `amount`, modulo any overflow that has occurred in
`field`. Overflow occurs when a field value exceeds its
range and, as a result, the next larger field is incremented or
decremented and the field value is adjusted back into its range.

*Add rule 2*. If a smaller field is expected to be
invariant, but it is impossible for it to be equal to its
prior value because of changes in its minimum or maximum after
`field` is changed, then its value is adjusted to be as close
as possible to its expected value. A smaller field represents a
smaller unit of time. `HOUR` is a smaller field than
`DAY_OF_MONTH`. No adjustment is made to smaller fields
that are not expected to be invariant. The calendar system
determines what fields are expected to be invariant.

Parameters:

- `field`: the calendar field.
- `amount`: the amount of date or time to be added to the field.

Throws:

- `IllegalArgumentException`: if `field` is `ZONE_OFFSET`, `DST_OFFSET`, or unknown, or if any calendar fields have out-of-range values in non-lenient mode.

## GregorianCalendar.roll(int, boolean)

```java
public void roll(int field, boolean up)
```

Adds or subtracts (up/down) a single unit of time on the given time
field without changing larger fields.

*Example*: Consider a `GregorianCalendar`
originally set to December 31, 1999. Calling roll(Calendar.MONTH, true)
sets the calendar to January 31, 1999.  The `YEAR` field is unchanged
because it is a larger field than `MONTH`.

Parameters:

- `up`: indicates if the value of the specified calendar field is to be rolled up or rolled down. Use `true` if rolling up, `false` otherwise.

**See also:** #add(int,int)

**See also:** #set(int,int)

Throws:

- `IllegalArgumentException`: if `field` is `ZONE_OFFSET`, `DST_OFFSET`, or unknown, or if any calendar fields have out-of-range values in non-lenient mode.

## GregorianCalendar.roll(int, int)

```java
public void roll(int field, int amount)
```

Adds a signed amount to the specified calendar field without changing larger fields.
A negative roll amount means to subtract from field without changing
larger fields. If the specified amount is 0, this method performs nothing.

This method calls `complete()` before adding the
amount so that all the calendar fields are normalized. If there
is any calendar field having an out-of-range value in non-lenient mode, then an
`IllegalArgumentException` is thrown.

*Example*: Consider a `GregorianCalendar`
originally set to August 31, 1999. Calling `roll(Calendar.MONTH,
8)` sets the calendar to April 30, **1999**. Using a
`GregorianCalendar`, the `DAY_OF_MONTH` field cannot
be 31 in the month April. `DAY_OF_MONTH` is set to the closest possible
value, 30. The `YEAR` field maintains the value of 1999 because it
is a larger field than `MONTH`.

*Example*: Consider a `GregorianCalendar`
originally set to Sunday June 6, 1999. Calling
`roll(Calendar.WEEK_OF_MONTH, -1)` sets the calendar to
Tuesday June 1, 1999, whereas calling
`add(Calendar.WEEK_OF_MONTH, -1)` sets the calendar to
Sunday May 30, 1999. This is because the roll rule imposes an
additional constraint: The `MONTH` must not change when the
`WEEK_OF_MONTH` is rolled. Taken together with add rule 1,
the resultant date must be between Tuesday June 1 and Saturday June
5. According to add rule 2, the `DAY_OF_WEEK`, an invariant
when changing the `WEEK_OF_MONTH`, is set to Tuesday, the
closest possible value to Sunday (where Sunday is the first day of the
week).

Parameters:

- `field`: the calendar field.
- `amount`: the signed amount to add to `field`.

**See also:** #roll(int,boolean)

**See also:** #add(int,int)

**See also:** #set(int,int)

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if `field` is `ZONE_OFFSET`, `DST_OFFSET`, or unknown, or if any calendar fields have out-of-range values in non-lenient mode.

## GregorianCalendar.getMinimum(int)

```java
public int getMinimum(int field)
```

Returns the minimum value for the given calendar field of this
`GregorianCalendar` instance. The minimum value is
defined as the smallest value returned by the get method for any possible time value,
taking into consideration the current values of the
getFirstDayOfWeek,
getMinimalDaysInFirstWeek,
getGregorianChange and
getTimeZone methods.

Parameters:

- `field`: the calendar field.

**Returns:** the minimum value for the given calendar field.

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## GregorianCalendar.getMaximum(int)

```java
public int getMaximum(int field)
```

Returns the maximum value for the given calendar field of this
`GregorianCalendar` instance. The maximum value is
defined as the largest value returned by the get method for any possible time value,
taking into consideration the current values of the
getFirstDayOfWeek,
getMinimalDaysInFirstWeek,
getGregorianChange and
getTimeZone methods.

Parameters:

- `field`: the calendar field.

**Returns:** the maximum value for the given calendar field.

**See also:** #getMinimum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## GregorianCalendar.getGreatestMinimum(int)

```java
public int getGreatestMinimum(int field)
```

Returns the highest minimum value for the given calendar field
of this `GregorianCalendar` instance. The highest
minimum value is defined as the largest value returned by
`getActualMinimum(int)` for any possible time value,
taking into consideration the current values of the
getFirstDayOfWeek,
getMinimalDaysInFirstWeek,
getGregorianChange and
getTimeZone methods.

Parameters:

- `field`: the calendar field.

**Returns:** the highest minimum value for the given calendar field.

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## GregorianCalendar.getLeastMaximum(int)

```java
public int getLeastMaximum(int field)
```

Returns the lowest maximum value for the given calendar field
of this `GregorianCalendar` instance. The lowest
maximum value is defined as the smallest value returned by
`getActualMaximum(int)` for any possible time value,
taking into consideration the current values of the
getFirstDayOfWeek,
getMinimalDaysInFirstWeek,
getGregorianChange and
getTimeZone methods.

Parameters:

- `field`: the calendar field

**Returns:** the lowest maximum value for the given calendar field.

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## GregorianCalendar.getActualMinimum(int)

```java
public int getActualMinimum(int field)
```

Returns the minimum value that this calendar field could have,
taking into consideration the given time value and the current
values of the
getFirstDayOfWeek,
getMinimalDaysInFirstWeek,
getGregorianChange and
getTimeZone methods.

For example, if the Gregorian change date is January 10,
1970 and the date of this `GregorianCalendar` is
January 20, 1970, the actual minimum value of the
`DAY_OF_MONTH` field is 10 because the previous date
of January 10, 1970 is December 27, 1996 (in the Julian
calendar). Therefore, December 28, 1969 to January 9, 1970
don't exist.

Parameters:

- `field`: the calendar field

**Returns:** the minimum of the given field for the time value of
this `GregorianCalendar`

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMaximum(int)

**Since:** 1.2

## GregorianCalendar.getActualMaximum(int)

```java
public int getActualMaximum(int field)
```

Returns the maximum value that this calendar field could have,
taking into consideration the given time value and the current
values of the
getFirstDayOfWeek,
getMinimalDaysInFirstWeek,
getGregorianChange and
getTimeZone methods.
For example, if the date of this instance is February 1, 2004,
the actual maximum value of the `DAY_OF_MONTH` field
is 29 because 2004 is a leap year, and if the date of this
instance is February 1, 2005, it's 28.

This method calculates the maximum value of WEEK_OF_YEAR based on the YEAR (calendar year) value, not the week year. Call `getWeeksInWeekYear()` to get the maximum value of `WEEK_OF_YEAR` in the week year of this `GregorianCalendar`.

Parameters:

- `field`: the calendar field

**Returns:** the maximum of the given field for the time value of
this `GregorianCalendar`

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**Since:** 1.2

## GregorianCalendar.isWeekDateSupported()

```java
public final boolean isWeekDateSupported()
```

Returns `true` indicating this `GregorianCalendar`
supports week dates.

**Returns:** `true` (always)

**See also:** #getWeekYear()

**See also:** #setWeekDate(int,int,int)

**See also:** #getWeeksInWeekYear()

**Since:** 1.7

## GregorianCalendar.getWeekYear()

```java
public int getWeekYear()
```

Returns the week year represented by this
`GregorianCalendar`. The dates in the weeks between 1 and the
maximum week number of the week year have the same week year value
that may be one year before or after the YEAR
(calendar year) value.

This method calls `Calendar.complete()` before
calculating the week year.

**Returns:** the week year represented by this `GregorianCalendar`.
        If the ERA value is `BC`, the year is
        represented by 0 or a negative number: BC 1 is 0, BC 2
        is -1, BC 3 is -2, and so on.

**See also:** #isWeekDateSupported()

**See also:** #getWeeksInWeekYear()

**See also:** Calendar#getFirstDayOfWeek()

**See also:** Calendar#getMinimalDaysInFirstWeek()

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if any of the calendar fields is invalid in non-lenient mode.

## GregorianCalendar.setWeekDate(int, int, int)

```java
public void setWeekDate(int weekYear, int weekOfYear, int dayOfWeek)
```

Sets this `GregorianCalendar` to the date given by the
date specifiers - `weekYear`,
`weekOfYear`, and `dayOfWeek`. `weekOfYear`
follows the `WEEK_OF_YEAR`
numbering.  The `dayOfWeek` value must be one of the
DAY_OF_WEEK values: SUNDAY to SATURDAY.

Note that the numeric day-of-week representation differs from
the ISO 8601 standard, and that the `weekOfYear`
numbering is compatible with the standard when `getFirstDayOfWeek()` is `MONDAY` and `getMinimalDaysInFirstWeek()` is 4.

Unlike the `set` method, all of the calendar fields
and the instant of time value are calculated upon return.

If `weekOfYear` is out of the valid week-of-year
range in `weekYear`, the `weekYear`
and `weekOfYear` values are adjusted in lenient
mode, or an `IllegalArgumentException` is thrown in
non-lenient mode.

Parameters:

- `weekYear`: the week year
- `weekOfYear`: the week number based on `weekYear`
- `dayOfWeek`: the day of week value: one of the constants for the DAY_OF_WEEK field: SUNDAY, ..., SATURDAY.

**See also:** GregorianCalendar#isWeekDateSupported()

**See also:** Calendar#getFirstDayOfWeek()

**See also:** Calendar#getMinimalDaysInFirstWeek()

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if any of the given date specifiers is invalid, or if any of the calendar fields are inconsistent with the given date specifiers in non-lenient mode

## GregorianCalendar.getWeeksInWeekYear()

```java
public int getWeeksInWeekYear()
```

Returns the number of weeks in the week year
represented by this `GregorianCalendar`.

For example, if this `GregorianCalendar`'s date is
December 31, 2008 with the ISO
8601 compatible setting, this method will return 53 for the
period: December 29, 2008 to January 3, 2010 while getActualMaximum(WEEK_OF_YEAR) will return
52 for the period: December 31, 2007 to December 28, 2008.

**Returns:** the number of weeks in the week year.

**See also:** Calendar#WEEK_OF_YEAR

**See also:** #getWeekYear()

**See also:** #getActualMaximum(int)

**Since:** 1.7

## GregorianCalendar.computeFields()

```java
protected void computeFields()
```

Converts the time value (millisecond offset from the Epoch) to calendar field values.
The time is *not*
recomputed first; to recompute the time, then the fields, call the
`complete` method.

**See also:** Calendar#complete

## GregorianCalendar.computeTime()

```java
protected void computeTime()
```

Converts calendar field values to the time value (millisecond
offset from the Epoch).

Throws:

- `IllegalArgumentException`: if any calendar fields are invalid.

## GregorianCalendar.toZonedDateTime()

```java
public ZonedDateTime toZonedDateTime()
```

Converts this object to a `ZonedDateTime` that represents
the same point on the time-line as this `GregorianCalendar`.

Since this object supports a Julian-Gregorian cutover date and
`ZonedDateTime` does not, it is possible that the resulting year,
month and day will have different values.  The result will represent the
correct date in the ISO calendar system, which will also be the same value
for Modified Julian Days.

**Returns:** a zoned date-time representing the same point on the time-line
 as this gregorian calendar

**Since:** 1.8
