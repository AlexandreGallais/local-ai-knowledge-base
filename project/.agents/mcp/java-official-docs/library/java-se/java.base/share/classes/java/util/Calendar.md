---
title: "Calendar class (java.util) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Calendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Calendar class (java.util)

```java
public abstract class Calendar implements Serializable, Cloneable, Comparable<Calendar>
```

The `Calendar` class is an abstract class that provides methods
for converting between a specific instant in time and a set of calendar fields such as `YEAR`, `MONTH`,
`DAY_OF_MONTH`, `HOUR`, and so on, and for
manipulating the calendar fields, such as getting the date of the next
week. An instant in time can be represented by a millisecond value that is
an offset from the *Epoch*, January 1, 1970
00:00:00.000 GMT (Gregorian).

The class also provides additional fields and methods for
implementing a concrete calendar system outside the package. Those
fields and methods are defined as `protected`.

Like other locale-sensitive classes, `Calendar` provides a
class method, `getInstance`, for getting a generally useful
object of this type. `Calendar`'s `getInstance` method
returns a `Calendar` object whose
calendar fields have been initialized with the current date and time:

```java
    Calendar rightNow = Calendar.getInstance();
```

A `Calendar` object can produce all the calendar field values
needed to implement the date-time formatting for a particular language and
calendar style (for example, Japanese-Gregorian, Japanese-Traditional).
`Calendar` defines the range of values returned by
certain calendar fields, as well as their meaning.  For example,
the first month of the calendar system has value `MONTH ==
JANUARY` for all calendars.  Other values are defined by the
concrete subclass, such as `ERA`.  See individual field
documentation and subclass documentation for details.

#### Getting and Setting Calendar Field Values

The calendar field values can be set by calling the `set`
methods. Any field values set in a `Calendar` will not be
interpreted until it needs to calculate its time value (milliseconds from
the Epoch) or values of the calendar fields. Calling the
`get`, `getTimeInMillis`, `getTime`,
`add` and `roll` involves such calculation.
Unless otherwise specified, any `Calendar` method containing the
parameter `int field` will throw an `ArrayIndexOutOfBoundsException`
if the specified field is out of range (`field` < 0 ||
`field` >= `FIELD_COUNT`).

#### Leniency

`Calendar` has two modes for interpreting the calendar
fields, *lenient* and *non-lenient*.  When a
`Calendar` is in lenient mode, it accepts a wider range of
calendar field values than it produces.  When a `Calendar`
recomputes calendar field values for return by `get()`, all of
the calendar fields are normalized. For example, a lenient
`GregorianCalendar` interprets `MONTH == JANUARY`,
`DAY_OF_MONTH == 32` as February 1.

When a `Calendar` is in non-lenient mode, it throws an
exception if there is any inconsistency in its calendar fields. For
example, a `GregorianCalendar` always produces
`DAY_OF_MONTH` values between 1 and the length of the month. A
non-lenient `GregorianCalendar` throws an exception upon
calculating its time or calendar field values if any out-of-range field
value has been set.

#### First Week

`Calendar` defines a locale-specific seven day week using two
parameters: the first day of the week and the minimal days in first week
(from 1 to 7).  These numbers are taken from the locale resource data or the
locale itself when a `Calendar` is constructed. If the designated
locale contains "fw" and/or "rg"
Unicode extensions, the first day of the week will be obtained according to
those extensions. If both "fw" and "rg" are specified, the value from the "fw"
extension supersedes the implicit one from the "rg" extension.
They may also be specified explicitly through the methods for setting their
values.

When setting or getting the `WEEK_OF_MONTH` or
`WEEK_OF_YEAR` fields, `Calendar` must determine the
first week of the month or year as a reference point.  The first week of a
month or year is defined as the earliest seven day period beginning on
`getFirstDayOfWeek()` and containing at least
`getMinimalDaysInFirstWeek()` days of that month or year.  Weeks
numbered ..., -1, 0 precede the first week; weeks numbered 2, 3,... follow
it.  Note that the normalized numbering returned by `get()` may be
different.  For example, a specific `Calendar` subclass may
designate the week before week 1 of a year as week `*n*` of
the previous year.

#### Calendar Fields Resolution

When computing a date and time from the calendar fields, there
may be insufficient information for the computation (such as only
year and month with no day of month), or there may be inconsistent
information (such as Tuesday, July 15, 1996 (Gregorian) -- July 15,
1996 is actually a Monday). `Calendar` will resolve
calendar field values to determine the date and time in the
following way.

If there is any conflict in calendar field values,
`Calendar` gives priorities to calendar fields that have been set
more recently. The following are the default combinations of the
calendar fields. The most recent combination, as determined by the
most recently set single field, will be used.

For the date fields:

```java
YEAR + MONTH + DAY_OF_MONTH
YEAR + MONTH + WEEK_OF_MONTH + DAY_OF_WEEK
YEAR + MONTH + DAY_OF_WEEK_IN_MONTH + DAY_OF_WEEK
YEAR + DAY_OF_YEAR
YEAR + DAY_OF_WEEK + WEEK_OF_YEAR
```

For the time of day fields:

```java
HOUR_OF_DAY
AM_PM + HOUR
```

If there are any calendar fields whose values haven't been set in the selected
field combination, `Calendar` uses their default values. The default
value of each field may vary by concrete calendar systems. For example, in
`GregorianCalendar`, the default of a field is the same as that
of the start of the Epoch: i.e., `YEAR = 1970`, `MONTH =
JANUARY`, `DAY_OF_MONTH = 1`, etc.

**Note:** There are certain possible ambiguities in
interpretation of certain singular times, which are resolved in the
following ways:

-  23:59 is the last minute of the day and 00:00 is the first
         minute of the next day. Thus, 23:59 on Dec 31, 1999 < 00:00 on
         Jan 1, 2000 < 00:01 on Jan 1, 2000.

-  Although historically not precise, midnight also belongs to "am",
         and noon belongs to "pm", so on the same day,
         12:00 am (midnight) < 12:01 am, and 12:00 pm (noon) < 12:01 pm

The date or time format strings are not part of the definition of a
calendar, as those must be modifiable or overridable by the user at
runtime. Use `DateFormat`
to format dates.

#### Field Manipulation

The calendar fields can be changed using three methods:
`set()`, `add()`, and `roll()`.

**`set(f, value)`** changes calendar field
`f` to `value`.  In addition, it sets an
internal member variable to indicate that calendar field `f` has
been changed. Although calendar field `f` is changed immediately,
the calendar's time value in milliseconds is not recomputed until the next call to
`get()`, `getTime()`, `getTimeInMillis()`,
`add()`, or `roll()` is made. Thus, multiple calls to
`set()` do not trigger multiple, unnecessary
computations. As a result of changing a calendar field using
`set()`, other calendar fields may also change, depending on the
calendar field, the calendar field value, and the calendar system. In addition,
`get(f)` will not necessarily return `value` set by
the call to the `set` method
after the calendar fields have been recomputed. The specifics are determined by
the concrete calendar class.

*Example*: Consider a `GregorianCalendar`
originally set to August 31, 1999. Calling `set(Calendar.MONTH,
Calendar.SEPTEMBER)` sets the date to September 31,
1999. This is a temporary internal representation that resolves to
October 1, 1999 if `getTime()` is then called. However, a
call to `set(Calendar.DAY_OF_MONTH, 30)` before the call to
`getTime()` sets the date to September 30, 1999, since
no recomputation occurs after `set()` itself.

**`add(f, delta)`** adds `delta`
to field `f`.  This is equivalent to calling `set(f,
get(f) + delta)` with two adjustments:

**Add rule 1**. The value of field `f`
  after the call minus the value of field `f` before the
  call is `delta`, modulo any overflow that has occurred in
  field `f`. Overflow occurs when a field value exceeds its
  range and, as a result, the next larger field is incremented or
  decremented and the field value is adjusted back into its range.

**Add rule 2**. If a smaller field is expected to be
  invariant, but it is impossible for it to be equal to its
  prior value because of changes in its minimum or maximum after field
  `f` is changed or other constraints, such as time zone
  offset changes, then its value is adjusted to be as close
  as possible to its expected value. A smaller field represents a
  smaller unit of time. `HOUR` is a smaller field than
  `DAY_OF_MONTH`. No adjustment is made to smaller fields
  that are not expected to be invariant. The calendar system
  determines what fields are expected to be invariant.

In addition, unlike `set()`, `add()` forces
an immediate recomputation of the calendar's milliseconds and all
fields.

*Example*: Consider a `GregorianCalendar`
originally set to August 31, 1999. Calling `add(Calendar.MONTH,
13)` sets the calendar to September 30, 2000. **Add rule
1** sets the `MONTH` field to September, since
adding 13 months to August gives September of the next year. Since
`DAY_OF_MONTH` cannot be 31 in September in a
`GregorianCalendar`, **add rule 2** sets the
`DAY_OF_MONTH` to 30, the closest possible value. Although
it is a smaller field, `DAY_OF_WEEK` is not adjusted by
rule 2, since it is expected to change when the month changes in a
`GregorianCalendar`. In leap years, the adjustment accounts
for the leap day in February to ensure the day of month is valid
for the year.

**`roll(f, delta)`** adds
`delta` to field `f` without changing larger
fields. This is equivalent to calling `add(f, delta)` with
the following adjustment:

**Roll rule**. Larger fields are unchanged after the
  call. A larger field represents a larger unit of
  time. `DAY_OF_MONTH` is a larger field than
  `HOUR`.

*Example*: See int).

**Usage model**. To motivate the behavior of
`add()` and `roll()`, consider a user interface
component with increment and decrement buttons for the month, day, and
year, and an underlying `GregorianCalendar`. If the
interface reads January 31, 1999 and the user presses the month
increment button, what should it read? If the underlying
implementation uses `set()`, it might read March 3, 1999. A
better result would be February 28, 1999. Furthermore, if the user
presses the month increment button again, it should read March 31,
1999, not March 28, 1999. By saving the original date and using either
`add()` or `roll()`, depending on whether larger
fields should be affected, the user interface can behave as most users
will intuitively expect.

**See also:** java.lang.System#currentTimeMillis()

**See also:** Date

**See also:** GregorianCalendar

**See also:** TimeZone

**See also:** java.text.DateFormat

**Since:** 1.1

## Calendar.ERA

```java
public static final int ERA
```

Field number for `get` and `set` indicating the
era, e.g., AD or BC in the Julian calendar. This is a calendar-specific
value; see subclass documentation.

**See also:** GregorianCalendar#AD

**See also:** GregorianCalendar#BC

## Calendar.YEAR

```java
public static final int YEAR
```

Field number for `get` and `set` indicating the
year. This is a calendar-specific value; see subclass documentation.

## Calendar.MONTH

```java
public static final int MONTH
```

Field number for `get` and `set` indicating the
month. This is a calendar-specific value. The first month of
the year in the Gregorian and Julian calendars is
`JANUARY` which is 0; the last depends on the number
of months in a year.

**See also:** #JANUARY

**See also:** #FEBRUARY

**See also:** #MARCH

**See also:** #APRIL

**See also:** #MAY

**See also:** #JUNE

**See also:** #JULY

**See also:** #AUGUST

**See also:** #SEPTEMBER

**See also:** #OCTOBER

**See also:** #NOVEMBER

**See also:** #DECEMBER

**See also:** #UNDECIMBER

## Calendar.WEEK_OF_YEAR

```java
public static final int WEEK_OF_YEAR
```

Field number for `get` and `set` indicating the
week number within the current year.  The first week of the year, as
defined by `getFirstDayOfWeek()` and
`getMinimalDaysInFirstWeek()`, has value 1.  Subclasses define
the value of `WEEK_OF_YEAR` for days before the first week of
the year.

**See also:** #getFirstDayOfWeek

**See also:** #getMinimalDaysInFirstWeek

## Calendar.WEEK_OF_MONTH

```java
public static final int WEEK_OF_MONTH
```

Field number for `get` and `set` indicating the
week number within the current month.  The first week of the month, as
defined by `getFirstDayOfWeek()` and
`getMinimalDaysInFirstWeek()`, has value 1.  Subclasses define
the value of `WEEK_OF_MONTH` for days before the first week of
the month.

**See also:** #getFirstDayOfWeek

**See also:** #getMinimalDaysInFirstWeek

## Calendar.DATE

```java
public static final int DATE
```

Field number for `get` and `set` indicating the
day of the month. This is a synonym for `DAY_OF_MONTH`.
The first day of the month has value 1.

**See also:** #DAY_OF_MONTH

## Calendar.DAY_OF_MONTH

```java
public static final int DAY_OF_MONTH
```

Field number for `get` and `set` indicating the
day of the month. This is a synonym for `DATE`.
The first day of the month has value 1.

**See also:** #DATE

## Calendar.DAY_OF_YEAR

```java
public static final int DAY_OF_YEAR
```

Field number for `get` and `set` indicating the day
number within the current year.  The first day of the year has value 1.

## Calendar.DAY_OF_WEEK

```java
public static final int DAY_OF_WEEK
```

Field number for `get` and `set` indicating the day
of the week. If the calendar is non-lenient, this field takes values
`SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`,
`THURSDAY`, `FRIDAY`, and `SATURDAY`. Otherwise, any
int values are accepted and normalized to one of the previously
mentioned values.

**See also:** #SUNDAY

**See also:** #MONDAY

**See also:** #TUESDAY

**See also:** #WEDNESDAY

**See also:** #THURSDAY

**See also:** #FRIDAY

**See also:** #SATURDAY
