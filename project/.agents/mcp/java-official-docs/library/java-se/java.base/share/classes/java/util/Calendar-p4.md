---
title: "Calendar class (java.util) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Calendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Calendar class (java.util) (part 4 of 5)

## Calendar.clear()

```java
public final void clear()
```

Sets all the calendar field values and the time value
(millisecond offset from the Epoch) of
this `Calendar` undefined. This means that isSet() will return `false` for all the
calendar fields, and the date and time calculations will treat
the fields as if they had never been set. A
`Calendar` implementation class may use its specific
default field values for date/time calculations. For example,
`GregorianCalendar` uses 1970 if the
`YEAR` field value is undefined.

**See also:** #clear(int)

## Calendar.clear(int)

```java
public final void clear(int field)
```

Sets the given calendar field value and the time value
(millisecond offset from the Epoch) of
this `Calendar` undefined. This means that isSet(field) will return `false`, and
the date and time calculations will treat the field as if it
had never been set. A `Calendar` implementation
class may use the field's specific default value for date and
time calculations.

The `HOUR_OF_DAY`, `HOUR` and `AM_PM`
fields are handled independently and the the resolution rule for the time of
day is applied. Clearing one of the fields doesn't reset
the hour of day value of this `Calendar`. Use set(Calendar.HOUR_OF_DAY, 0) to reset the hour
value.

Parameters:

- `field`: the calendar field to be cleared.

**See also:** #clear()

## Calendar.isSet(int)

```java
public final boolean isSet(int field)
```

Determines if the given calendar field has a value set,
including cases that the value has been set by internal fields
calculations triggered by a `get` method call.

Parameters:

- `field`: the calendar field to test

**Returns:** `true` if the given calendar field has a value set;
`false` otherwise.

## Calendar.getDisplayName(int, int, Locale)

```java
public String getDisplayName(int field, int style, Locale locale)
```

Returns the string representation of the calendar
`field` value in the given `style` and
`locale`.  If no string representation is
applicable, `null` is returned. This method calls
get(field) to get the calendar
`field` value if the string representation is
applicable to the given calendar `field`.

For example, if this `Calendar` is a
`GregorianCalendar` and its date is 2005-01-01, then
the string representation of the `MONTH` field would be
"January" in the long style in an English locale or "Jan" in
the short style. However, no string representation would be
available for the `DAY_OF_MONTH` field, and this method
would return `null`.

The default implementation supports the calendar fields for
which a `DateFormatSymbols` has names in the given
`locale`.

If there is no string representation of the `Calendar` `field`
and the calendar is in non-lenient mode and any calendar fields have invalid values,
`null` is returned. If there is a string representation of the `Calendar`
`field` and the calendar is in non-lenient mode and any calendar fields
have invalid values, `IllegalArgumentException` will be thrown.

Parameters:

- `field`: the calendar field for which the string representation is returned
- `style`: the style applied to the string representation; one of `SHORT_FORMAT` (`SHORT`), `SHORT_STANDALONE`, `LONG_FORMAT` (`LONG`), `LONG_STANDALONE`, `NARROW_FORMAT`, or `NARROW_STANDALONE`.
- `locale`: the locale for the string representation (any calendar types specified by `locale` are ignored)

**Returns:** the string representation of the given
       `field` in the given `style`, or
       `null` if no string representation is
       applicable.

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `field` or `style` is invalid, or if this `Calendar` is non-lenient and any of the calendar fields have invalid values
- `NullPointerException`: if `locale` is null

## Calendar.getDisplayNames(int, int, Locale)

```java
public Map<String, Integer> getDisplayNames(int field, int style, Locale locale)
```

Returns a `Map` containing all names of the calendar
`field` in the given `style` and
`locale` and their corresponding field values. For
example, if this `Calendar` is a `GregorianCalendar`, the returned map would contain "Jan" to
`JANUARY`, "Feb" to `FEBRUARY`, and so on, in the
short style in an English locale.

Narrow names may not be unique due to use of single characters,
such as "S" for Sunday and Saturday. In that case narrow names are not
included in the returned `Map`.

The values of other calendar fields may be taken into
account to determine a set of display names. For example, if
this `Calendar` is a lunisolar calendar system and
the year value given by the `YEAR` field has a leap
month, this method would return month names containing the leap
month name, and month names are mapped to their values specific
for the year.

The default implementation supports display names contained in
a `DateFormatSymbols`. For example, if `field`
is `MONTH` and `style` is `ALL_STYLES`, this method returns a `Map` containing
all strings returned by `DateFormatSymbols.getShortMonths()`
and `DateFormatSymbols.getMonths()`.

Unlike int, Locale), this
method will not throw an `IllegalArgumentException` if the
`Calendar` is non-lenient and any of the calendar fields have
invalid values. Instead, this method will return either `null` or
a `Map`.

Parameters:

- `field`: the calendar field for which the display names are returned
- `style`: the style applied to the string representation; one of `SHORT_FORMAT` (`SHORT`), `SHORT_STANDALONE`, `LONG_FORMAT` (`LONG`), `LONG_STANDALONE`, `NARROW_FORMAT`, or `NARROW_STANDALONE`
- `locale`: the locale for the display names

**Returns:** a `Map` containing all display names in
       `style` and `locale` and their
       field values, or `null` if no display names
       are defined for `field`

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `field` or `style` is invalid
- `NullPointerException`: if `locale` is null

## Calendar.complete()

```java
protected void complete()
```

Fills in any unset fields in the calendar fields. First, the `computeTime()` method is called if the time value (millisecond offset
from the Epoch) has not been calculated from
calendar field values. Then, the `computeFields()` method is
called to calculate all calendar field values.

## Calendar.getAvailableCalendarTypes()

```java
public static Set<String> getAvailableCalendarTypes()
```

Returns an unmodifiable `Set` containing all calendar types
supported by `Calendar` in the runtime environment. The available
calendar types can be used for the Unicode locale extensions.
The `Set` returned contains at least `"gregory"`. The
calendar types don't include aliases, such as `"gregorian"` for
`"gregory"`.

**Returns:** an unmodifiable `Set` containing all available calendar types

**Since:** 1.8

**See also:** #getCalendarType()

**See also:** Calendar.Builder#setCalendarType(String)

**See also:** Locale#getUnicodeLocaleType(String)

## Calendar.getCalendarType()

```java
public String getCalendarType()
```

Returns the calendar type of this `Calendar`. Calendar types are
defined by the *Unicode Locale Data Markup Language (LDML)*
specification.

The default implementation of this method returns the class name of
this `Calendar` instance. Any subclasses that implement
LDML-defined calendar systems should override this method to return
appropriate calendar types.

**Returns:** the LDML-defined calendar type or the class name of this
        `Calendar` instance

**Since:** 1.8

**See also:** Locale extensions

**See also:** Locale.Builder#setLocale(Locale)

**See also:** Locale.Builder#setUnicodeLocaleKeyword(String, String)

## Calendar.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this `Calendar` to the specified
`Object`.  The result is `true` if and only if
the argument is a `Calendar` object of the same calendar
system that represents the same time value (millisecond offset from the
Epoch) under the same
`Calendar` parameters as this object.

The `Calendar` parameters are the values represented
by the `isLenient`, `getFirstDayOfWeek`,
`getMinimalDaysInFirstWeek` and `getTimeZone`
methods. If there is any difference in those parameters
between the two `Calendar`s, this method returns
`false`.

Use the compareTo method to
compare only the time values.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if this object is equal to `obj`;
`false` otherwise.

## Calendar.hashCode()

```java
public int hashCode()
```

Returns a hash code for this calendar.

**Returns:** a hash code value for this object.

**Since:** 1.2

## Calendar.before(Object)

```java
public boolean before(Object when)
```

Returns whether this `Calendar` represents a time
before the time represented by the specified
`Object`. This method is equivalent to:

```java
        compareTo(when) < 0
```

if and only if `when` is a `Calendar`
instance. Otherwise, the method returns `false`.

Parameters:

- `when`: the `Object` to be compared

**Returns:** `true` if the time of this
`Calendar` is before the time represented by
`when`; `false` otherwise.

**See also:** #compareTo(Calendar)

## Calendar.after(Object)

```java
public boolean after(Object when)
```

Returns whether this `Calendar` represents a time
after the time represented by the specified
`Object`. This method is equivalent to:

```java
        compareTo(when) > 0
```

if and only if `when` is a `Calendar`
instance. Otherwise, the method returns `false`.

Parameters:

- `when`: the `Object` to be compared

**Returns:** `true` if the time of this `Calendar` is
after the time represented by `when`; `false`
otherwise.

**See also:** #compareTo(Calendar)

## Calendar.compareTo(Calendar)

```java
public int compareTo(Calendar anotherCalendar)
```

Compares the time values (millisecond offsets from the Epoch) represented by two
`Calendar` objects.

Parameters:

- `anotherCalendar`: the `Calendar` to be compared.

**Returns:** the value `0` if the time represented by the argument
is equal to the time represented by this `Calendar`; a value
less than `0` if the time of this `Calendar` is
before the time represented by the argument; and a value greater than
`0` if the time of this `Calendar` is after the
time represented by the argument.

**Since:** 1.5

Throws:

- `NullPointerException`: if the specified `Calendar` is `null`.
- `IllegalArgumentException`: if the time value of the specified `Calendar` object can't be obtained due to any invalid calendar values.

## Calendar.add(int, int)

```java
public abstract void add(int field, int amount)
```

Adds or subtracts the specified amount of time to the given calendar field,
based on the calendar's rules. For example, to subtract 5 days from
the current time of the calendar, you can achieve it by calling:

`add(Calendar.DAY_OF_MONTH, -5)`.

Parameters:

- `field`: the calendar field.
- `amount`: the amount of date or time to be added to the field.

**See also:** #roll(int,int)

**See also:** #set(int,int)

Throws:

- `IllegalArgumentException`: if this `Calendar` is non-lenient and any of the calendar fields have invalid values or if `field` is `ZONE_OFFSET`, `DST_OFFSET`, or unknown.

## Calendar.roll(int, boolean)

```java
public abstract void roll(int field, boolean up)
```

Adds or subtracts (up/down) a single unit of time on the given time
field without changing larger fields. For example, to roll the current
date up by one day, you can achieve it by calling:

roll(Calendar.DATE, true).
When rolling on the year or Calendar.YEAR field, it will roll the year
value in the range between 1 and the value returned by calling
`getMaximum(Calendar.YEAR)`.
When rolling on the month or Calendar.MONTH field, other fields like
date might conflict and, need to be changed. For instance,
rolling the month on the date 01/31/96 will result in 02/29/96.
When rolling on the hour-in-day or Calendar.HOUR_OF_DAY field, it will
roll the hour value in the range between 0 and 23, which is zero-based.

Parameters:

- `field`: the time field.
- `up`: indicates if the value of the specified time field is to be rolled up or rolled down. Use true if rolling up, false otherwise.

**See also:** Calendar#add(int,int)

**See also:** Calendar#set(int,int)

Throws:

- `IllegalArgumentException`: if this `Calendar` is non-lenient and any of the calendar fields have invalid values or if `field` is `ZONE_OFFSET`, `DST_OFFSET`, or unknown.

## Calendar.roll(int, int)

```java
public void roll(int field, int amount)
```

Adds the specified (signed) amount to the specified calendar field
without changing larger fields.  A negative amount means to roll
down.

NOTE:  This default implementation on `Calendar` just repeatedly calls the
version of roll() that rolls by one unit.  This may not
always do the right thing.  For example, if the `DAY_OF_MONTH` field is 31,
rolling through February will leave it set to 28.  The `GregorianCalendar`
version of this function takes care of this problem.  Other subclasses
should also provide overrides of this function that do the right thing.

Parameters:

- `field`: the calendar field.
- `amount`: the signed amount to add to the calendar `field`.

**Since:** 1.2

**See also:** #roll(int,boolean)

**See also:** #add(int,int)

**See also:** #set(int,int)

Throws:

- `IllegalArgumentException`: if this `Calendar` is non-lenient and any of the calendar fields have invalid values or if `field` is `ZONE_OFFSET`, `DST_OFFSET`, or unknown.

## Calendar.setTimeZone(TimeZone)

```java
public void setTimeZone(TimeZone value)
```

Sets the time zone with the given time zone value.

Parameters:

- `value`: the given time zone.

## Calendar.getTimeZone()

```java
public TimeZone getTimeZone()
```

Gets the time zone.

**Returns:** the time zone object associated with this calendar.

## Calendar.setLenient(boolean)

```java
public void setLenient(boolean lenient)
```

Specifies whether or not date/time interpretation is to be lenient.  With
lenient interpretation, a date such as "February 942, 1996" will be
treated as being equivalent to the 941st day after February 1, 1996.
With strict (non-lenient) interpretation, such dates will cause an exception to be
thrown. The default is lenient.

Parameters:

- `lenient`: `true` if the lenient mode is to be turned on; `false` if it is to be turned off.

**See also:** #isLenient()

**See also:** java.text.DateFormat#setLenient

## Calendar.isLenient()

```java
public boolean isLenient()
```

Tells whether date/time interpretation is to be lenient.

**Returns:** `true` if the interpretation mode of this calendar is lenient;
`false` otherwise.

**See also:** #setLenient(boolean)

## Calendar.setFirstDayOfWeek(int)

```java
public void setFirstDayOfWeek(int value)
```

Sets what the first day of the week is; e.g., `SUNDAY` in the U.S.,
`MONDAY` in France.

Parameters:

- `value`: the given first day of the week.

**See also:** #getFirstDayOfWeek()

**See also:** #getMinimalDaysInFirstWeek()
