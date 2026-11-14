---
title: "Date class (java.util) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Date.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Date class (java.util) (part 2 of 3)

## Date.getYear()

```java
public int getYear()
```

Returns a value that is the result of subtracting 1900 from the
year that contains or begins with the instant in time represented
by this `Date` object, as interpreted in the local
time zone.

**Returns:** the year represented by this date, minus 1900.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.YEAR) - 1900`.

## Date.setYear(int)

```java
public void setYear(int year)
```

Sets the year of this `Date` object to be the specified
value plus 1900. This `Date` object is modified so
that it represents a point in time within the specified year,
with the month, date, hour, minute, and second the same as
before, as interpreted in the local time zone. (Of course, if
the date was February 29, for example, and the year is set to a
non-leap year, then the new date will be treated as if it were
on March 1.)

Parameters:

- `year`: the year value.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.set(Calendar.YEAR, year + 1900)`.

## Date.getMonth()

```java
public int getMonth()
```

Returns a number representing the month that contains or begins
with the instant in time represented by this `Date` object.
The value returned is between `0` and `11`,
with the value `0` representing January.

**Returns:** the month represented by this date.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.MONTH)`.

## Date.setMonth(int)

```java
public void setMonth(int month)
```

Sets the month of this date to the specified value. This
`Date` object is modified so that it represents a point
in time within the specified month, with the year, date, hour,
minute, and second the same as before, as interpreted in the
local time zone. If the date was October 31, for example, and
the month is set to June, then the new date will be treated as
if it were on July 1, because June has only 30 days.

Parameters:

- `month`: the month value between 0-11.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.set(Calendar.MONTH, int month)`.

## Date.getDate()

```java
public int getDate()
```

Returns the day of the month represented by this `Date` object.
The value returned is between `1` and `31`
representing the day of the month that contains or begins with the
instant in time represented by this `Date` object, as
interpreted in the local time zone.

**Returns:** the day of the month represented by this date.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.DAY_OF_MONTH)`.

## Date.setDate(int)

```java
public void setDate(int date)
```

Sets the day of the month of this `Date` object to the
specified value. This `Date` object is modified so that
it represents a point in time within the specified day of the
month, with the year, month, hour, minute, and second the same
as before, as interpreted in the local time zone. If the date
was April 30, for example, and the date is set to 31, then it
will be treated as if it were on May 1, because April has only
30 days.

Parameters:

- `date`: the day of the month value between 1-31.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.set(Calendar.DAY_OF_MONTH, int date)`.

## Date.getDay()

```java
public int getDay()
```

Returns the day of the week represented by this date. The
returned value (`0` = Sunday, `1` = Monday,
`2` = Tuesday, `3` = Wednesday, `4` =
Thursday, `5` = Friday, `6` = Saturday)
represents the day of the week that contains or begins with
the instant in time represented by this `Date` object,
as interpreted in the local time zone.

**Returns:** the day of the week represented by this date.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.DAY_OF_WEEK)`.

## Date.getHours()

```java
public int getHours()
```

Returns the hour represented by this `Date` object. The
returned value is a number (`0` through `23`)
representing the hour within the day that contains or begins
with the instant in time represented by this `Date`
object, as interpreted in the local time zone.

**Returns:** the hour represented by this date.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.HOUR_OF_DAY)`.

## Date.setHours(int)

```java
public void setHours(int hours)
```

Sets the hour of this `Date` object to the specified value.
This `Date` object is modified so that it represents a point
in time within the specified hour of the day, with the year, month,
date, minute, and second the same as before, as interpreted in the
local time zone.

Parameters:

- `hours`: the hour value.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.set(Calendar.HOUR_OF_DAY, int hours)`.

## Date.getMinutes()

```java
public int getMinutes()
```

Returns the number of minutes past the hour represented by this date,
as interpreted in the local time zone.
The value returned is between `0` and `59`.

**Returns:** the number of minutes past the hour represented by this date.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.MINUTE)`.

## Date.setMinutes(int)

```java
public void setMinutes(int minutes)
```

Sets the minutes of this `Date` object to the specified value.
This `Date` object is modified so that it represents a point
in time within the specified minute of the hour, with the year, month,
date, hour, and second the same as before, as interpreted in the
local time zone.

Parameters:

- `minutes`: the value of the minutes.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.set(Calendar.MINUTE, int minutes)`.

## Date.getSeconds()

```java
public int getSeconds()
```

Returns the number of seconds past the minute represented by this date.
The value returned is between `0` and `61`. The
values `60` and `61` can only occur on those
Java Virtual Machines that take leap seconds into account.

**Returns:** the number of seconds past the minute represented by this date.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.get(Calendar.SECOND)`.

## Date.setSeconds(int)

```java
public void setSeconds(int seconds)
```

Sets the seconds of this `Date` to the specified value.
This `Date` object is modified so that it represents a
point in time within the specified second of the minute, with
the year, month, date, hour, and minute the same as before, as
interpreted in the local time zone.

Parameters:

- `seconds`: the seconds value.

**See also:** java.util.Calendar

**Deprecated:** As of JDK version 1.1,
replaced by `Calendar.set(Calendar.SECOND, int seconds)`.

## Date.getTime()

```java
public long getTime()
```

Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT
represented by this `Date` object.

**Returns:** the number of milliseconds since January 1, 1970, 00:00:00 GMT
         represented by this date.

## Date.setTime(long)

```java
public void setTime(long time)
```

Sets this `Date` object to represent a point in time that is
`time` milliseconds after January 1, 1970 00:00:00 GMT.

Parameters:

- `time`: the number of milliseconds.

## Date.before(Date)

```java
public boolean before(Date when)
```

Tests if this date is before the specified date.

Parameters:

- `when`: a date.

**Returns:** `true` if and only if the instant of time
           represented by this `Date` object is strictly
           earlier than the instant represented by `when`;
         `false` otherwise.

Throws:

- `NullPointerException`: if `when` is null.

## Date.after(Date)

```java
public boolean after(Date when)
```

Tests if this date is after the specified date.

Parameters:

- `when`: a date.

**Returns:** `true` if and only if the instant represented
         by this `Date` object is strictly later than the
         instant represented by `when`;
         `false` otherwise.

Throws:

- `NullPointerException`: if `when` is null.

## Date.equals(Object)

```java
public boolean equals(Object obj)
```

Compares two dates for equality.
The result is `true` if and only if the argument is
not `null` and is a `Date` object that
represents the same point in time, to the millisecond, as this object.

Thus, two `Date` objects are equal if and only if the
`getTime` method returns the same `long`
value for both.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.util.Date#getTime()

## Date.compareTo(Date)

```java
public int compareTo(Date anotherDate)
```

Compares two Dates for ordering.

Parameters:

- `anotherDate`: the `Date` to be compared.

**Returns:** the value `0` if the argument Date is equal to
         this Date; a value less than `0` if this Date
         is before the Date argument; and a value greater than
     `0` if this Date is after the Date argument.

**Since:** 1.2

Throws:

- `NullPointerException`: if `anotherDate` is null.

## Date.hashCode()

```java
public int hashCode()
```

Returns a hash code value for this object. The result is the
exclusive OR of the two halves of the primitive `long`
value returned by the `Date.getTime`
method. That is, the hash code is the value of the expression:

```java
(int)(this.getTime()^(this.getTime() >>> 32))
```

**Returns:** a hash code value for this object.

## Date.toString()

```java
public String toString()
```

Converts this `Date` object to a `String`
of the form:

```java
dow mon dd hh:mm:ss zzz yyyy
```

where:

- `dow` is the day of the week (`Sun, Mon, Tue, Wed, Thu, Fri, Sat`).

- `mon` is the month (`Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec`).

- `dd` is the day of the month (`01` through
    `31`), as two decimal digits.

- `hh` is the hour of the day (`00` through
    `23`), as two decimal digits.

- `mm` is the minute within the hour (`00` through
    `59`), as two decimal digits.

- `ss` is the second within the minute (`00` through
    `61`), as two decimal digits.

- `zzz` is the time zone (and may reflect daylight saving
    time). Standard time zone abbreviations include those
    recognized by the method `parse`. If time zone
    information is not available, then `zzz` is empty -
    that is, it consists of no characters at all.

- `yyyy` is the year, as four decimal digits.

**Returns:** a string representation of this date.

**See also:** java.util.Date#toLocaleString()

**See also:** java.util.Date#toGMTString()

## Date.toLocaleString()

```java
public String toLocaleString()
```

Creates a string representation of this `Date` object in an
implementation-dependent form. The intent is that the form should
be familiar to the user of the Java application, wherever it may
happen to be running. The intent is comparable to that of the
"`%c`" format supported by the `strftime()`
function of ISO C.

**Returns:** a string representation of this date, using the locale
         conventions.

**See also:** java.text.DateFormat

**See also:** java.util.Date#toString()

**See also:** java.util.Date#toGMTString()

**Deprecated:** As of JDK version 1.1,
replaced by `DateFormat.format(Date date)`.

## Date.toGMTString()

```java
public String toGMTString()
```

Creates a string representation of this `Date` object of
the form:

```java
d mon yyyy hh:mm:ss GMT
```

where:

- *d* is the day of the month (`1` through `31`),
    as one or two decimal digits.

- *mon* is the month (`Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec`).

- *yyyy* is the year, as four decimal digits.

- *hh* is the hour of the day (`00` through `23`),
    as two decimal digits.

- *mm* is the minute within the hour (`00` through
    `59`), as two decimal digits.

- *ss* is the second within the minute (`00` through
    `61`), as two decimal digits.

- *GMT* is exactly the ASCII letters "`GMT`" to indicate
    Greenwich Mean Time.

The result does not depend on the local time zone.

**Returns:** a string representation of this date, using the Internet GMT
         conventions.

**See also:** java.text.DateFormat

**See also:** java.util.Date#toString()

**See also:** java.util.Date#toLocaleString()

**Deprecated:** As of JDK version 1.1,
replaced by `DateFormat.format(Date date)`, using a
GMT `TimeZone`.

## Date.getTimezoneOffset()

```java
public int getTimezoneOffset()
```

Returns the offset, measured in minutes, for the local time zone
relative to UTC that is appropriate for the time represented by
this `Date` object.

For example, in Massachusetts, five time zones west of Greenwich:

```java
new Date(96, 1, 14).getTimezoneOffset() returns 300
```

because on February 14, 1996, standard time (Eastern Standard Time)
is in use, which is offset five hours from UTC; but:

```java
new Date(96, 5, 1).getTimezoneOffset() returns 240
```

because on June 1, 1996, daylight saving time (Eastern Daylight Time)
is in use, which is offset only four hours from UTC.

This method produces the same result as if it computed:

```java
(this.getTime() - UTC(this.getYear(),
                      this.getMonth(),
                      this.getDate(),
                      this.getHours(),
                      this.getMinutes(),
                      this.getSeconds())) / (60 * 1000)
```

**Returns:** the time-zone offset, in minutes, for the current time zone.

**See also:** java.util.Calendar#ZONE_OFFSET

**See also:** java.util.Calendar#DST_OFFSET

**See also:** java.util.TimeZone#getDefault

**Deprecated:** As of JDK version 1.1,
replaced by `-(Calendar.get(Calendar.ZONE_OFFSET) + Calendar.get(Calendar.DST_OFFSET)) / (60 * 1000)`.

## Date.from(Instant)

```java
public static Date from(Instant instant)
```

Obtains an instance of `Date` from an `Instant` object.

`Instant` uses a precision of nanoseconds, whereas `Date`
uses a precision of milliseconds.  The conversion will truncate any
excess precision information as though the amount in nanoseconds was
subject to integer division by one million.

`Instant` can store points on the time-line further in the future
and further in the past than `Date`. In this scenario, this method
will throw an exception.

Parameters:

- `instant`: the instant to convert

**Returns:** a `Date` representing the same point on the time-line as
 the provided instant

**Since:** 1.8

Throws:

- `NullPointerException`: if `instant` is null.
- `IllegalArgumentException`: if the instant is too large to represent as a `Date`
