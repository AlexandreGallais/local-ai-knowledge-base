# Calendar class (java.util)

```java
public abstract class Calendar implements Serializable, Cloneable, Comparable<Calendar>
```

The {@code Calendar} class is an abstract class that provides methods
for converting between a specific instant in time and a set of {@link
#fields calendar fields} such as {@code YEAR}, {@code MONTH},
{@code DAY_OF_MONTH}, {@code HOUR}, and so on, and for
manipulating the calendar fields, such as getting the date of the next
week. An instant in time can be represented by a millisecond value that is
an offset from the <a id="Epoch"><em>Epoch</em></a>, January 1, 1970
00:00:00.000 GMT (Gregorian).

<p>The class also provides additional fields and methods for
implementing a concrete calendar system outside the package. Those
fields and methods are defined as {@code protected}.

<p>
Like other locale-sensitive classes, {@code Calendar} provides a
class method, {@code getInstance}, for getting a generally useful
object of this type. {@code Calendar}'s {@code getInstance} method
returns a {@code Calendar} object whose
calendar fields have been initialized with the current date and time:
<blockquote>
<pre>
    Calendar rightNow = Calendar.getInstance();
</pre>
</blockquote>

<p>A {@code Calendar} object can produce all the calendar field values
needed to implement the date-time formatting for a particular language and
calendar style (for example, Japanese-Gregorian, Japanese-Traditional).
{@code Calendar} defines the range of values returned by
certain calendar fields, as well as their meaning.  For example,
the first month of the calendar system has value <code>MONTH ==
JANUARY</code> for all calendars.  Other values are defined by the
concrete subclass, such as {@code ERA}.  See individual field
documentation and subclass documentation for details.

<h2>Getting and Setting Calendar Field Values</h2>

<p>The calendar field values can be set by calling the {@code set}
methods. Any field values set in a {@code Calendar} will not be
interpreted until it needs to calculate its time value (milliseconds from
the Epoch) or values of the calendar fields. Calling the
{@code get}, {@code getTimeInMillis}, {@code getTime},
{@code add} and {@code roll} involves such calculation.
Unless otherwise specified, any {@code Calendar} method containing the
parameter {@code int field} will throw an {@code ArrayIndexOutOfBoundsException}
if the specified field is out of range ({@code field} &lt; 0 ||
{@code field} &gt;= {@link #FIELD_COUNT}).

<h3>Leniency</h3>

<p>{@code Calendar} has two modes for interpreting the calendar
fields, <em>lenient</em> and <em>non-lenient</em>.  When a
{@code Calendar} is in lenient mode, it accepts a wider range of
calendar field values than it produces.  When a {@code Calendar}
recomputes calendar field values for return by {@code get()}, all of
the calendar fields are normalized. For example, a lenient
{@code GregorianCalendar} interprets {@code MONTH == JANUARY},
{@code DAY_OF_MONTH == 32} as February 1.

<p>When a {@code Calendar} is in non-lenient mode, it throws an
exception if there is any inconsistency in its calendar fields. For
example, a {@code GregorianCalendar} always produces
{@code DAY_OF_MONTH} values between 1 and the length of the month. A
non-lenient {@code GregorianCalendar} throws an exception upon
calculating its time or calendar field values if any out-of-range field
value has been set.

<h3><a id="first_week">First Week</a></h3>

{@code Calendar} defines a locale-specific seven day week using two
parameters: the first day of the week and the minimal days in first week
(from 1 to 7).  These numbers are taken from the locale resource data or the
locale itself when a {@code Calendar} is constructed. If the designated
locale contains "fw" and/or "rg" <a href="./Locale.html#def_locale_extension">
Unicode extensions</a>, the first day of the week will be obtained according to
those extensions. If both "fw" and "rg" are specified, the value from the "fw"
extension supersedes the implicit one from the "rg" extension.
They may also be specified explicitly through the methods for setting their
values.

<p>When setting or getting the {@code WEEK_OF_MONTH} or
{@code WEEK_OF_YEAR} fields, {@code Calendar} must determine the
first week of the month or year as a reference point.  The first week of a
month or year is defined as the earliest seven day period beginning on
{@code getFirstDayOfWeek()} and containing at least
{@code getMinimalDaysInFirstWeek()} days of that month or year.  Weeks
numbered ..., -1, 0 precede the first week; weeks numbered 2, 3,... follow
it.  Note that the normalized numbering returned by {@code get()} may be
different.  For example, a specific {@code Calendar} subclass may
designate the week before week 1 of a year as week <code><i>n</i></code> of
the previous year.

<h3>Calendar Fields Resolution</h3>

When computing a date and time from the calendar fields, there
may be insufficient information for the computation (such as only
year and month with no day of month), or there may be inconsistent
information (such as Tuesday, July 15, 1996 (Gregorian) -- July 15,
1996 is actually a Monday). {@code Calendar} will resolve
calendar field values to determine the date and time in the
following way.

<p><a id="resolution">If there is any conflict in calendar field values,
{@code Calendar} gives priorities to calendar fields that have been set
more recently.</a> The following are the default combinations of the
calendar fields. The most recent combination, as determined by the
most recently set single field, will be used.

<p><a id="date_resolution">For the date fields</a>:
<blockquote>
<pre>
YEAR + MONTH + DAY_OF_MONTH
YEAR + MONTH + WEEK_OF_MONTH + DAY_OF_WEEK
YEAR + MONTH + DAY_OF_WEEK_IN_MONTH + DAY_OF_WEEK
YEAR + DAY_OF_YEAR
YEAR + DAY_OF_WEEK + WEEK_OF_YEAR
</pre></blockquote>

<a id="time_resolution">For the time of day fields</a>:
<blockquote>
<pre>
HOUR_OF_DAY
AM_PM + HOUR
</pre></blockquote>

<p>If there are any calendar fields whose values haven't been set in the selected
field combination, {@code Calendar} uses their default values. The default
value of each field may vary by concrete calendar systems. For example, in
{@code GregorianCalendar}, the default of a field is the same as that
of the start of the Epoch: i.e., {@code YEAR = 1970}, <code>MONTH =
JANUARY</code>, {@code DAY_OF_MONTH = 1}, etc.

<p>
<strong>Note:</strong> There are certain possible ambiguities in
interpretation of certain singular times, which are resolved in the
following ways:
<ol>
    <li> 23:59 is the last minute of the day and 00:00 is the first
         minute of the next day. Thus, 23:59 on Dec 31, 1999 &lt; 00:00 on
         Jan 1, 2000 &lt; 00:01 on Jan 1, 2000.

    <li> Although historically not precise, midnight also belongs to "am",
         and noon belongs to "pm", so on the same day,
         12:00 am (midnight) &lt; 12:01 am, and 12:00 pm (noon) &lt; 12:01 pm
</ol>

<p>
The date or time format strings are not part of the definition of a
calendar, as those must be modifiable or overridable by the user at
runtime. Use {@link DateFormat}
to format dates.

<h3>Field Manipulation</h3>

The calendar fields can be changed using three methods:
{@code set()}, {@code add()}, and {@code roll()}.

<p><strong>{@code set(f, value)}</strong> changes calendar field
{@code f} to {@code value}.  In addition, it sets an
internal member variable to indicate that calendar field {@code f} has
been changed. Although calendar field {@code f} is changed immediately,
the calendar's time value in milliseconds is not recomputed until the next call to
{@code get()}, {@code getTime()}, {@code getTimeInMillis()},
{@code add()}, or {@code roll()} is made. Thus, multiple calls to
{@code set()} do not trigger multiple, unnecessary
computations. As a result of changing a calendar field using
{@code set()}, other calendar fields may also change, depending on the
calendar field, the calendar field value, and the calendar system. In addition,
{@code get(f)} will not necessarily return {@code value} set by
the call to the {@code set} method
after the calendar fields have been recomputed. The specifics are determined by
the concrete calendar class.</p>

<p><em>Example</em>: Consider a {@code GregorianCalendar}
originally set to August 31, 1999. Calling <code>set(Calendar.MONTH,
Calendar.SEPTEMBER)</code> sets the date to September 31,
1999. This is a temporary internal representation that resolves to
October 1, 1999 if {@code getTime()} is then called. However, a
call to {@code set(Calendar.DAY_OF_MONTH, 30)} before the call to
{@code getTime()} sets the date to September 30, 1999, since
no recomputation occurs after {@code set()} itself.</p>

<p><strong>{@code add(f, delta)}</strong> adds {@code delta}
to field {@code f}.  This is equivalent to calling <code>set(f,
get(f) + delta)</code> with two adjustments:</p>

<blockquote>
  <p><strong>Add rule 1</strong>. The value of field {@code f}
  after the call minus the value of field {@code f} before the
  call is {@code delta}, modulo any overflow that has occurred in
  field {@code f}. Overflow occurs when a field value exceeds its
  range and, as a result, the next larger field is incremented or
  decremented and the field value is adjusted back into its range.</p>

  <p><strong>Add rule 2</strong>. If a smaller field is expected to be
  invariant, but it is impossible for it to be equal to its
  prior value because of changes in its minimum or maximum after field
  {@code f} is changed or other constraints, such as time zone
  offset changes, then its value is adjusted to be as close
  as possible to its expected value. A smaller field represents a
  smaller unit of time. {@code HOUR} is a smaller field than
  {@code DAY_OF_MONTH}. No adjustment is made to smaller fields
  that are not expected to be invariant. The calendar system
  determines what fields are expected to be invariant.</p>
</blockquote>

<p>In addition, unlike {@code set()}, {@code add()} forces
an immediate recomputation of the calendar's milliseconds and all
fields.</p>

<p><em>Example</em>: Consider a {@code GregorianCalendar}
originally set to August 31, 1999. Calling <code>add(Calendar.MONTH,
13)</code> sets the calendar to September 30, 2000. <strong>Add rule
1</strong> sets the {@code MONTH} field to September, since
adding 13 months to August gives September of the next year. Since
{@code DAY_OF_MONTH} cannot be 31 in September in a
{@code GregorianCalendar}, <strong>add rule 2</strong> sets the
{@code DAY_OF_MONTH} to 30, the closest possible value. Although
it is a smaller field, {@code DAY_OF_WEEK} is not adjusted by
rule 2, since it is expected to change when the month changes in a
{@code GregorianCalendar}. In leap years, the adjustment accounts
for the leap day in February to ensure the day of month is valid
for the year.</p>

<p><strong>{@code roll(f, delta)}</strong> adds
{@code delta} to field {@code f} without changing larger
fields. This is equivalent to calling {@code add(f, delta)} with
the following adjustment:</p>

<blockquote>
  <p><strong>Roll rule</strong>. Larger fields are unchanged after the
  call. A larger field represents a larger unit of
  time. {@code DAY_OF_MONTH} is a larger field than
  {@code HOUR}.</p>
</blockquote>

<p><em>Example</em>: See {@link java.util.GregorianCalendar#roll(int, int)}.

<p><strong>Usage model</strong>. To motivate the behavior of
{@code add()} and {@code roll()}, consider a user interface
component with increment and decrement buttons for the month, day, and
year, and an underlying {@code GregorianCalendar}. If the
interface reads January 31, 1999 and the user presses the month
increment button, what should it read? If the underlying
implementation uses {@code set()}, it might read March 3, 1999. A
better result would be February 28, 1999. Furthermore, if the user
presses the month increment button again, it should read March 31,
1999, not March 28, 1999. By saving the original date and using either
{@code add()} or {@code roll()}, depending on whether larger
fields should be affected, the user interface can behave as most users
will intuitively expect.</p>

@see          java.lang.System#currentTimeMillis()
@see          Date
@see          GregorianCalendar
@see          TimeZone
@see          java.text.DateFormat
@author Mark Davis, David Goldsmith, Chen-Lieh Huang, Alan Liu
@since 1.1

## Calendar.ERA

```java
public static final int ERA
```

Field number for {@code get} and {@code set} indicating the
era, e.g., AD or BC in the Julian calendar. This is a calendar-specific
value; see subclass documentation.

@see GregorianCalendar#AD
@see GregorianCalendar#BC

## Calendar.YEAR

```java
public static final int YEAR
```

Field number for {@code get} and {@code set} indicating the
year. This is a calendar-specific value; see subclass documentation.

## Calendar.MONTH

```java
public static final int MONTH
```

Field number for {@code get} and {@code set} indicating the
month. This is a calendar-specific value. The first month of
the year in the Gregorian and Julian calendars is
{@code JANUARY} which is 0; the last depends on the number
of months in a year.

@see #JANUARY
@see #FEBRUARY
@see #MARCH
@see #APRIL
@see #MAY
@see #JUNE
@see #JULY
@see #AUGUST
@see #SEPTEMBER
@see #OCTOBER
@see #NOVEMBER
@see #DECEMBER
@see #UNDECIMBER

## Calendar.WEEK_OF_YEAR

```java
public static final int WEEK_OF_YEAR
```

Field number for {@code get} and {@code set} indicating the
week number within the current year.  The first week of the year, as
defined by {@code getFirstDayOfWeek()} and
{@code getMinimalDaysInFirstWeek()}, has value 1.  Subclasses define
the value of {@code WEEK_OF_YEAR} for days before the first week of
the year.

@see #getFirstDayOfWeek
@see #getMinimalDaysInFirstWeek

## Calendar.WEEK_OF_MONTH

```java
public static final int WEEK_OF_MONTH
```

Field number for {@code get} and {@code set} indicating the
week number within the current month.  The first week of the month, as
defined by {@code getFirstDayOfWeek()} and
{@code getMinimalDaysInFirstWeek()}, has value 1.  Subclasses define
the value of {@code WEEK_OF_MONTH} for days before the first week of
the month.

@see #getFirstDayOfWeek
@see #getMinimalDaysInFirstWeek

## Calendar.DATE

```java
public static final int DATE
```

Field number for {@code get} and {@code set} indicating the
day of the month. This is a synonym for {@code DAY_OF_MONTH}.
The first day of the month has value 1.

@see #DAY_OF_MONTH

## Calendar.DAY_OF_MONTH

```java
public static final int DAY_OF_MONTH
```

Field number for {@code get} and {@code set} indicating the
day of the month. This is a synonym for {@code DATE}.
The first day of the month has value 1.

@see #DATE

## Calendar.DAY_OF_YEAR

```java
public static final int DAY_OF_YEAR
```

Field number for {@code get} and {@code set} indicating the day
number within the current year.  The first day of the year has value 1.

## Calendar.DAY_OF_WEEK

```java
public static final int DAY_OF_WEEK
```

Field number for {@code get} and {@code set} indicating the day
of the week. If the calendar is non-lenient, this field takes values
{@code SUNDAY}, {@code MONDAY}, {@code TUESDAY}, {@code WEDNESDAY},
{@code THURSDAY}, {@code FRIDAY}, and {@code SATURDAY}. Otherwise, any
int values are accepted and normalized to one of the previously
mentioned values.

@see #SUNDAY
@see #MONDAY
@see #TUESDAY
@see #WEDNESDAY
@see #THURSDAY
@see #FRIDAY
@see #SATURDAY

## Calendar.DAY_OF_WEEK_IN_MONTH

```java
public static final int DAY_OF_WEEK_IN_MONTH
```

Field number for {@code get} and {@code set} indicating the
ordinal number of the day of the week within the current month. Together
with the {@code DAY_OF_WEEK} field, this uniquely specifies a day
within a month.  Unlike {@code WEEK_OF_MONTH} and
{@code WEEK_OF_YEAR}, this field's value does <em>not</em> depend on
{@code getFirstDayOfWeek()} or
{@code getMinimalDaysInFirstWeek()}.  {@code DAY_OF_MONTH 1}
through {@code 7} always correspond to <code>DAY_OF_WEEK_IN_MONTH
1</code>; {@code 8} through {@code 14} correspond to
{@code DAY_OF_WEEK_IN_MONTH 2}, and so on.
{@code DAY_OF_WEEK_IN_MONTH 0} indicates the week before
{@code DAY_OF_WEEK_IN_MONTH 1}.  Negative values count back from the
end of the month, so the last Sunday of a month is specified as
{@code DAY_OF_WEEK = SUNDAY, DAY_OF_WEEK_IN_MONTH = -1}.  Because
negative values count backward they will usually be aligned differently
within the month than positive values.  For example, if a month has 31
days, {@code DAY_OF_WEEK_IN_MONTH -1} will overlap
{@code DAY_OF_WEEK_IN_MONTH 5} and the end of {@code 4}.

@see #DAY_OF_WEEK
@see #WEEK_OF_MONTH

## Calendar.AM_PM

```java
public static final int AM_PM
```

Field number for {@code get} and {@code set} indicating
whether the {@code HOUR} is before or after noon.
E.g., at 10:04:15.250 PM the {@code AM_PM} is {@code PM}.

@see #AM
@see #PM
@see #HOUR

## Calendar.HOUR

```java
public static final int HOUR
```

Field number for {@code get} and {@code set} indicating the
hour of the morning or afternoon. {@code HOUR} is used for the
12-hour clock (0 - 11). Noon and midnight are represented by 0, not by 12.
E.g., at 10:04:15.250 PM the {@code HOUR} is 10.

@see #AM_PM
@see #HOUR_OF_DAY

## Calendar.HOUR_OF_DAY

```java
public static final int HOUR_OF_DAY
```

Field number for {@code get} and {@code set} indicating the
hour of the day. {@code HOUR_OF_DAY} is used for the 24-hour clock.
E.g., at 10:04:15.250 PM the {@code HOUR_OF_DAY} is 22.

@see #HOUR

## Calendar.MINUTE

```java
public static final int MINUTE
```

Field number for {@code get} and {@code set} indicating the
minute within the hour.
E.g., at 10:04:15.250 PM the {@code MINUTE} is 4.

## Calendar.SECOND

```java
public static final int SECOND
```

Field number for {@code get} and {@code set} indicating the
second within the minute.
E.g., at 10:04:15.250 PM the {@code SECOND} is 15.

## Calendar.MILLISECOND

```java
public static final int MILLISECOND
```

Field number for {@code get} and {@code set} indicating the
millisecond within the second.
E.g., at 10:04:15.250 PM the {@code MILLISECOND} is 250.

## Calendar.ZONE_OFFSET

```java
public static final int ZONE_OFFSET
```

Field number for {@code get} and {@code set}
indicating the raw offset from GMT in milliseconds.
<p>
This field reflects the correct GMT offset value of the time
zone of this {@code Calendar} if the
{@code TimeZone} implementation subclass supports
historical GMT offset changes.

## Calendar.DST_OFFSET

```java
public static final int DST_OFFSET
```

Field number for {@code get} and {@code set} indicating the
daylight saving offset in milliseconds.
<p>
This field reflects the correct daylight saving offset value of
the time zone of this {@code Calendar} if the
{@code TimeZone} implementation subclass supports
historical Daylight Saving Time schedule changes.

## Calendar.FIELD_COUNT

```java
public static final int FIELD_COUNT
```

The number of distinct fields recognized by {@code get} and {@code set}.
Field numbers range from {@code 0..FIELD_COUNT-1}.

## Calendar.SUNDAY

```java
public static final int SUNDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Sunday.

## Calendar.MONDAY

```java
public static final int MONDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Monday.

## Calendar.TUESDAY

```java
public static final int TUESDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Tuesday.

## Calendar.WEDNESDAY

```java
public static final int WEDNESDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Wednesday.

## Calendar.THURSDAY

```java
public static final int THURSDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Thursday.

## Calendar.FRIDAY

```java
public static final int FRIDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Friday.

## Calendar.SATURDAY

```java
public static final int SATURDAY
```

Value of the {@link #DAY_OF_WEEK} field indicating
Saturday.

## Calendar.JANUARY

```java
public static final int JANUARY
```

Value of the {@link #MONTH} field indicating the
first month of the year in the Gregorian and Julian calendars.

## Calendar.FEBRUARY

```java
public static final int FEBRUARY
```

Value of the {@link #MONTH} field indicating the
second month of the year in the Gregorian and Julian calendars.

## Calendar.MARCH

```java
public static final int MARCH
```

Value of the {@link #MONTH} field indicating the
third month of the year in the Gregorian and Julian calendars.

## Calendar.APRIL

```java
public static final int APRIL
```

Value of the {@link #MONTH} field indicating the
fourth month of the year in the Gregorian and Julian calendars.

## Calendar.MAY

```java
public static final int MAY
```

Value of the {@link #MONTH} field indicating the
fifth month of the year in the Gregorian and Julian calendars.

## Calendar.JUNE

```java
public static final int JUNE
```

Value of the {@link #MONTH} field indicating the
sixth month of the year in the Gregorian and Julian calendars.

## Calendar.JULY

```java
public static final int JULY
```

Value of the {@link #MONTH} field indicating the
seventh month of the year in the Gregorian and Julian calendars.

## Calendar.AUGUST

```java
public static final int AUGUST
```

Value of the {@link #MONTH} field indicating the
eighth month of the year in the Gregorian and Julian calendars.

## Calendar.SEPTEMBER

```java
public static final int SEPTEMBER
```

Value of the {@link #MONTH} field indicating the
ninth month of the year in the Gregorian and Julian calendars.

## Calendar.OCTOBER

```java
public static final int OCTOBER
```

Value of the {@link #MONTH} field indicating the
tenth month of the year in the Gregorian and Julian calendars.

## Calendar.NOVEMBER

```java
public static final int NOVEMBER
```

Value of the {@link #MONTH} field indicating the
eleventh month of the year in the Gregorian and Julian calendars.

## Calendar.DECEMBER

```java
public static final int DECEMBER
```

Value of the {@link #MONTH} field indicating the
twelfth month of the year in the Gregorian and Julian calendars.

## Calendar.UNDECIMBER

```java
public static final int UNDECIMBER
```

Value of the {@link #MONTH} field indicating the
thirteenth month of the year. Although {@code GregorianCalendar}
does not use this value, lunar calendars do.

## Calendar.AM

```java
public static final int AM
```

Value of the {@link #AM_PM} field indicating the
period of the day from midnight to just before noon.

## Calendar.PM

```java
public static final int PM
```

Value of the {@link #AM_PM} field indicating the
period of the day from noon to just before midnight.

## Calendar.ALL_STYLES

```java
public static final int ALL_STYLES
```

A style specifier for {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating names in all styles, such as
"January" and "Jan".

@see #SHORT_FORMAT
@see #LONG_FORMAT
@see #SHORT_STANDALONE
@see #LONG_STANDALONE
@see #SHORT
@see #LONG
@since 1.6

## Calendar.SHORT

```java
public static final int SHORT
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} equivalent to {@link #SHORT_FORMAT}.

@see #SHORT_STANDALONE
@see #LONG
@since 1.6

## Calendar.LONG

```java
public static final int LONG
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} equivalent to {@link #LONG_FORMAT}.

@see #LONG_STANDALONE
@see #SHORT
@since 1.6

## Calendar.NARROW_FORMAT

```java
public static final int NARROW_FORMAT
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating a narrow name used for format. Narrow names
are typically single character strings, such as "M" for Monday.

@see #NARROW_STANDALONE
@see #SHORT_FORMAT
@see #LONG_FORMAT
@since 1.8

## Calendar.NARROW_STANDALONE

```java
public static final int NARROW_STANDALONE
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating a narrow name independently. Narrow names
are typically single character strings, such as "M" for Monday.

@see #NARROW_FORMAT
@see #SHORT_STANDALONE
@see #LONG_STANDALONE
@since 1.8

## Calendar.SHORT_FORMAT

```java
public static final int SHORT_FORMAT
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating a short name used for format.

@see #SHORT_STANDALONE
@see #LONG_FORMAT
@see #LONG_STANDALONE
@since 1.8

## Calendar.LONG_FORMAT

```java
public static final int LONG_FORMAT
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating a long name used for format.

@see #LONG_STANDALONE
@see #SHORT_FORMAT
@see #SHORT_STANDALONE
@since 1.8

## Calendar.SHORT_STANDALONE

```java
public static final int SHORT_STANDALONE
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating a short name used independently,
such as a month abbreviation as calendar headers.

@see #SHORT_FORMAT
@see #LONG_FORMAT
@see #LONG_STANDALONE
@since 1.8

## Calendar.LONG_STANDALONE

```java
public static final int LONG_STANDALONE
```

A style specifier for {@link #getDisplayName(int, int, Locale)
getDisplayName} and {@link #getDisplayNames(int, int, Locale)
getDisplayNames} indicating a long name used independently,
such as a month name as calendar headers.

@see #LONG_FORMAT
@see #SHORT_FORMAT
@see #SHORT_STANDALONE
@since 1.8

## Calendar.protected int fields[]

```java
protected int fields[]
```

The calendar field values for the currently set time for this calendar.
This is an array of {@code FIELD_COUNT} integers, with index values
{@code ERA} through {@code DST_OFFSET}.
@serial

## Calendar.protected boolean isSet[]

```java
protected boolean isSet[]
```

The flags which tell if a specified calendar field for the calendar is set.
A new object has no fields set.  After the first call to a method
which generates the fields, they all remain set after that.
This is an array of {@code FIELD_COUNT} booleans, with index values
{@code ERA} through {@code DST_OFFSET}.
@serial

## Calendar.time

```java
protected long time
```

The currently set time for this calendar, expressed in milliseconds after
January 1, 1970, 0:00:00 GMT.
@see #isTimeSet
@serial

## Calendar.isTimeSet

```java
protected boolean isTimeSet
```

True if then the value of {@code time} is valid.
The time is made invalid by a change to an item of {@code field[]}.
@see #time
@serial

## Calendar.areFieldsSet

```java
protected boolean areFieldsSet
```

True if {@code fields[]} are in sync with the currently set time.
If false, then the next attempt to get the value of a field will
force a recomputation of all fields from the current value of
{@code time}.
@serial

## Calendar.Builder()

```java
public Builder()
```

Constructs a {@code Calendar.Builder}.

## Calendar.setInstant(long)

```java
public Builder setInstant(long instant)
```

Sets the instant parameter to the given {@code instant} value that is
a millisecond offset from <a href="Calendar.html#Epoch">the
Epoch</a>.

@param instant a millisecond offset from the Epoch
@return this {@code Calendar.Builder}
@throws IllegalStateException if any of the field parameters have
                              already been set
@see Calendar#setTime(Date)
@see Calendar#setTimeInMillis(long)
@see Calendar#time

## Calendar.setInstant(Date)

```java
public Builder setInstant(Date instant)
```

Sets the instant parameter to the {@code instant} value given by a
{@link Date}. This method is equivalent to a call to
{@link #setInstant(long) setInstant(instant.getTime())}.

@param instant a {@code Date} representing a millisecond offset from
               the Epoch
@return this {@code Calendar.Builder}
@throws NullPointerException  if {@code instant} is {@code null}
@throws IllegalStateException if any of the field parameters have
                              already been set
@see Calendar#setTime(Date)
@see Calendar#setTimeInMillis(long)
@see Calendar#time

## Calendar.set(int, int)

```java
public Builder set(int field, int value)
```

Sets the {@code field} parameter to the given {@code value}.
{@code field} is an index to the {@link Calendar#fields}, such as
{@link Calendar#DAY_OF_MONTH DAY_OF_MONTH}. Field value validation is
not performed in this method. Any out of range values are either
normalized in lenient mode or detected as an invalid value in
non-lenient mode when building a {@code Calendar}.

@param field an index to the {@code Calendar} fields
@param value the field value
@return this {@code Calendar.Builder}
@throws IllegalArgumentException if {@code field} is invalid
@throws IllegalStateException if the instant value has already been set,
                     or if fields have been set too many
                     (approximately {@link Integer#MAX_VALUE}) times.
@see Calendar#set(int, int)

## Calendar.setFields(int...)

```java
public Builder setFields(int... fieldValuePairs)
```

Sets field parameters to their values given by
{@code fieldValuePairs} that are pairs of a field and its value.
For example,
<pre>
  setFields(Calendar.YEAR, 2013,
            Calendar.MONTH, Calendar.DECEMBER,
            Calendar.DAY_OF_MONTH, 23);</pre>
is equivalent to the sequence of the following
{@link #set(int, int) set} calls:
<pre>
  set(Calendar.YEAR, 2013)
  .set(Calendar.MONTH, Calendar.DECEMBER)
  .set(Calendar.DAY_OF_MONTH, 23);</pre>

@param fieldValuePairs field-value pairs
@return this {@code Calendar.Builder}
@throws NullPointerException if {@code fieldValuePairs} is {@code null}
@throws IllegalArgumentException if any of fields are invalid,
            or if {@code fieldValuePairs.length} is an odd number.
@throws IllegalStateException    if the instant value has been set,
            or if fields have been set too many (approximately
            {@link Integer#MAX_VALUE}) times.

## Calendar.setDate(int, int, int)

```java
public Builder setDate(int year, int month, int dayOfMonth)
```

Sets the date field parameters to the values given by {@code year},
{@code month}, and {@code dayOfMonth}. This method is equivalent to
a call to:
<pre>
  setFields(Calendar.YEAR, year,
            Calendar.MONTH, month,
            Calendar.DAY_OF_MONTH, dayOfMonth);</pre>

@param year       the {@link Calendar#YEAR YEAR} value
@param month      the {@link Calendar#MONTH MONTH} value
                  (the month numbering is <em>0-based</em>).
@param dayOfMonth the {@link Calendar#DAY_OF_MONTH DAY_OF_MONTH} value
@return this {@code Calendar.Builder}

## Calendar.setTimeOfDay(int, int, int)

```java
public Builder setTimeOfDay(int hourOfDay, int minute, int second)
```

Sets the time of day field parameters to the values given by
{@code hourOfDay}, {@code minute}, and {@code second}. This method is
equivalent to a call to:
<pre>
  setTimeOfDay(hourOfDay, minute, second, 0);</pre>

@param hourOfDay the {@link Calendar#HOUR_OF_DAY HOUR_OF_DAY} value
                 (24-hour clock)
@param minute    the {@link Calendar#MINUTE MINUTE} value
@param second    the {@link Calendar#SECOND SECOND} value
@return this {@code Calendar.Builder}

## Calendar.setTimeOfDay(int, int, int, int)

```java
public Builder setTimeOfDay(int hourOfDay, int minute, int second, int millis)
```

Sets the time of day field parameters to the values given by
{@code hourOfDay}, {@code minute}, {@code second}, and
{@code millis}. This method is equivalent to a call to:
<pre>
  setFields(Calendar.HOUR_OF_DAY, hourOfDay,
            Calendar.MINUTE, minute,
            Calendar.SECOND, second,
            Calendar.MILLISECOND, millis);</pre>

@param hourOfDay the {@link Calendar#HOUR_OF_DAY HOUR_OF_DAY} value
                 (24-hour clock)
@param minute    the {@link Calendar#MINUTE MINUTE} value
@param second    the {@link Calendar#SECOND SECOND} value
@param millis    the {@link Calendar#MILLISECOND MILLISECOND} value
@return this {@code Calendar.Builder}

## Calendar.setWeekDate(int, int, int)

```java
public Builder setWeekDate(int weekYear, int weekOfYear, int dayOfWeek)
```

Sets the week-based date parameters to the values with the given
date specifiers - week year, week of year, and day of week.

<p>If the specified calendar doesn't support week dates, the
{@link #build() build} method will throw an {@link IllegalArgumentException}.

@param weekYear   the week year
@param weekOfYear the week number based on {@code weekYear}
@param dayOfWeek  the day of week value: one of the constants
    for the {@link Calendar#DAY_OF_WEEK DAY_OF_WEEK} field:
    {@link Calendar#SUNDAY SUNDAY}, ..., {@link Calendar#SATURDAY SATURDAY}.
@return this {@code Calendar.Builder}
@see Calendar#setWeekDate(int, int, int)
@see Calendar#isWeekDateSupported()

## Calendar.setTimeZone(TimeZone)

```java
public Builder setTimeZone(TimeZone zone)
```

Sets the time zone parameter to the given {@code zone}. If no time
zone parameter is given to this {@code Calendar.Builder}, the
{@linkplain TimeZone#getDefault() default
{@code TimeZone}} will be used in the {@link #build() build}
method.

@param zone the {@link TimeZone}
@return this {@code Calendar.Builder}
@throws NullPointerException if {@code zone} is {@code null}
@see Calendar#setTimeZone(TimeZone)

## Calendar.setLenient(boolean)

```java
public Builder setLenient(boolean lenient)
```

Sets the lenient mode parameter to the value given by {@code lenient}.
If no lenient parameter is given to this {@code Calendar.Builder},
lenient mode will be used in the {@link #build() build} method.

@param lenient {@code true} for lenient mode;
               {@code false} for non-lenient mode
@return this {@code Calendar.Builder}
@see Calendar#setLenient(boolean)

## Calendar.setCalendarType(String)

```java
public Builder setCalendarType(String type)
```

Sets the calendar type parameter to the given {@code type}. The
calendar type given by this method has precedence over any explicit
or implicit calendar type given by the
{@linkplain #setLocale(Locale) locale}.

<p>In addition to the available calendar types returned by the
{@link Calendar#getAvailableCalendarTypes() Calendar.getAvailableCalendarTypes}
method, {@code "gregorian"} and {@code "iso8601"} as aliases of
{@code "gregory"} can be used with this method.

@param type the calendar type
@return this {@code Calendar.Builder}
@throws NullPointerException if {@code type} is {@code null}
@throws IllegalArgumentException if {@code type} is unknown
@throws IllegalStateException if another calendar type has already been set
@see Calendar#getCalendarType()
@see Calendar#getAvailableCalendarTypes()

## Calendar.setLocale(Locale)

```java
public Builder setLocale(Locale locale)
```

Sets the locale parameter to the given {@code locale}. If no locale
is given to this {@code Calendar.Builder}, the {@linkplain
Locale#getDefault(Locale.Category) default {@code Locale}}
for {@link Locale.Category#FORMAT} will be used.

<p>If no calendar type is explicitly given by a call to the
{@link #setCalendarType(String) setCalendarType} method,
the {@code Locale} value is used to determine what type of
{@code Calendar} to be built.

<p>If no week definition parameters are explicitly given by a call to
the {@link #setWeekDefinition(int,int) setWeekDefinition} method, the
{@code Locale}'s default values are used.

@param locale the {@link Locale}
@throws NullPointerException if {@code locale} is {@code null}
@return this {@code Calendar.Builder}
@see Calendar#getInstance(Locale)

## Calendar.setWeekDefinition(int, int)

```java
public Builder setWeekDefinition(int firstDayOfWeek, int minimalDaysInFirstWeek)
```

Sets the week definition parameters to the values given by
{@code firstDayOfWeek} and {@code minimalDaysInFirstWeek} that are
used to determine the <a href="Calendar.html#first_week">first
week</a> of a year. The parameters given by this method have
precedence over the default values given by the
{@linkplain #setLocale(Locale) locale}.

@param firstDayOfWeek the first day of a week; one of
                      {@link Calendar#SUNDAY} to {@link Calendar#SATURDAY}
@param minimalDaysInFirstWeek the minimal number of days in the first
                              week (1..7)
@return this {@code Calendar.Builder}
@throws IllegalArgumentException if {@code firstDayOfWeek} or
                                 {@code minimalDaysInFirstWeek} is invalid
@see Calendar#getFirstDayOfWeek()
@see Calendar#getMinimalDaysInFirstWeek()

## Calendar.build()

```java
public Calendar build()
```

Returns a {@code Calendar} built from the parameters set by the
setter methods. The calendar type given by the {@link #setCalendarType(String)
setCalendarType} method or the {@linkplain #setLocale(Locale) locale} is
used to determine what {@code Calendar} to be created. If no explicit
calendar type is given, the locale's default calendar is created.

<p>If the calendar type is {@code "iso8601"}, the
{@linkplain GregorianCalendar#setGregorianChange(Date) Gregorian change date}
of a {@link GregorianCalendar} is set to {@code Date(Long.MIN_VALUE)}
to be the <em>proleptic</em> Gregorian calendar. Its week definition
parameters are also set to be <a
href="GregorianCalendar.html#iso8601_compatible_setting">compatible
with the ISO 8601 standard</a>. Note that the
{@link GregorianCalendar#getCalendarType() getCalendarType} method of
a {@code GregorianCalendar} created with {@code "iso8601"} returns
{@code "gregory"}.

<p>The default values are used for locale and time zone if these
parameters haven't been given explicitly.
<p>
If the locale contains the time zone with "tz"
<a href="Locale.html#def_locale_extension">Unicode extension</a>,
and time zone hasn't been given explicitly, time zone in the locale
is used.

<p>Any out of range field values are either normalized in lenient
mode or detected as an invalid value in non-lenient mode.

@return a {@code Calendar} built with parameters of this {@code
        Calendar.Builder}
@throws IllegalArgumentException if the calendar type is unknown, or
            if any invalid field values are given in non-lenient mode, or
            if a week date is given for the calendar type that doesn't
            support week dates.
@see Calendar#getInstance(TimeZone, Locale)
@see Locale#getDefault(Locale.Category)
@see TimeZone#getDefault()

## Calendar.Calendar()

```java
protected Calendar()
```

Constructs a Calendar with the default time zone
and the default {@link java.util.Locale.Category#FORMAT FORMAT}
locale.
@see     TimeZone#getDefault

## Calendar.Calendar(TimeZone, Locale)

```java
protected Calendar(TimeZone zone, Locale aLocale)
```

Constructs a calendar with the specified time zone and locale.

@param zone the time zone to use
@param aLocale the locale for the week data

## Calendar.getInstance()

```java
public static Calendar getInstance()
```

Gets a calendar using the default time zone and locale. The
{@code Calendar} returned is based on the current time
in the default time zone with the default
{@link Locale.Category#FORMAT FORMAT} locale.
<p>
If the locale contains the time zone with "tz"
<a href="Locale.html#def_locale_extension">Unicode extension</a>,
that time zone is used instead.

@return a Calendar.

## Calendar.getInstance(TimeZone)

```java
public static Calendar getInstance(TimeZone zone)
```

Gets a calendar using the specified time zone and default locale.
The {@code Calendar} returned is based on the current time
in the given time zone with the default
{@link Locale.Category#FORMAT FORMAT} locale.

@param zone the time zone to use
@return a Calendar.
@throws NullPointerException if {@code zone} is {@code null}

## Calendar.getInstance(Locale)

```java
public static Calendar getInstance(Locale aLocale)
```

Gets a calendar using the default time zone and specified locale.
The {@code Calendar} returned is based on the current time
in the default time zone with the given locale.
<p>
If the locale contains the time zone with "tz"
<a href="Locale.html#def_locale_extension">Unicode extension</a>,
that time zone is used instead.

@param aLocale the locale for the week data
@return a Calendar.
@throws NullPointerException if {@code aLocale} is {@code null}

## Calendar.getInstance(TimeZone, Locale)

```java
public static Calendar getInstance(TimeZone zone, Locale aLocale)
```

Gets a calendar with the specified time zone and locale.
The {@code Calendar} returned is based on the current time
in the given time zone with the given locale.

@param zone the time zone to use
@param aLocale the locale for the week data
@return a Calendar.
@throws NullPointerException if {@code zone} or {@code aLocale} is {@code null}

## Calendar.getAvailableLocales()

```java
public static synchronized Locale[] getAvailableLocales()
```

Returns an array of all locales for which the {@code getInstance}
methods of this class can return localized instances.
At a minimum, the returned array must contain a {@code Locale} instance equal to
{@link Locale#ROOT Locale.ROOT} and a {@code Locale} instance equal to
{@link Locale#US Locale.US}.

@return An array of locales for which localized
        {@code Calendar} instances are available.

## Calendar.computeTime()

```java
protected abstract void computeTime()
```

Converts the current calendar field values in {@link #fields fields[]}
to the millisecond time value
{@link #time}.

@see #complete()
@see #computeFields()

## Calendar.computeFields()

```java
protected abstract void computeFields()
```

Converts the current millisecond time value {@link #time}
to calendar field values in {@link #fields fields[]}.
This allows you to sync up the calendar field values with
a new time that is set for the calendar.  The time is <em>not</em>
recomputed first; to recompute the time, then the fields, call the
{@link #complete()} method.

@see #computeTime()

## Calendar.getTime()

```java
public final Date getTime()
```

Returns a {@code Date} object representing this
{@code Calendar}'s time value (millisecond offset from the <a
href="#Epoch">Epoch</a>").

@return a {@code Date} representing the time value.
@see #setTime(Date)
@see #getTimeInMillis()

## Calendar.setTime(Date)

```java
public final void setTime(Date date)
```

Sets this Calendar's time with the given {@code Date}.
<p>
Note: Calling {@code setTime()} with
{@code Date(Long.MAX_VALUE)} or {@code Date(Long.MIN_VALUE)}
may yield incorrect field values from {@code get()}.

@param date the given Date.
@see #getTime()
@see #setTimeInMillis(long)
@throws NullPointerException if {@code date} is {@code null}

## Calendar.getTimeInMillis()

```java
public long getTimeInMillis()
```

Returns this Calendar's time value in milliseconds.

@return the current time as UTC milliseconds from the epoch.
@see #getTime()
@see #setTimeInMillis(long)

## Calendar.setTimeInMillis(long)

```java
public void setTimeInMillis(long millis)
```

Sets this Calendar's current time from the given long value.

@param millis the new time in UTC milliseconds from the epoch.
@see #setTime(Date)
@see #getTimeInMillis()

## Calendar.get(int)

```java
public int get(int field)
```

Returns the value of the given calendar field. In lenient mode,
all calendar fields are normalized. In non-lenient mode, all
calendar fields are validated and this method throws an
exception if any calendar fields have out-of-range values. The
normalization and validation are handled by the
{@link #complete()} method, which process is calendar
system dependent.

@param field the given calendar field.
@return the value for the given calendar field.
@throws IllegalArgumentException if this {@code Calendar} is non-lenient and any
of the calendar fields have invalid values.
@see #set(int,int)
@see #complete()

## Calendar.internalGet(int)

```java
protected final int internalGet(int field)
```

Returns the value of the given calendar field. This method does
not involve normalization or validation of the field value.

@param field the given calendar field.
@return the value for the given calendar field.
@see #get(int)

## Calendar.set(int, int)

```java
public void set(int field, int value)
```

Sets the given calendar field to the given value. The value is not
interpreted by this method regardless of the leniency mode.

@param field the given calendar field.
@param value the value to be set for the given calendar field.
@see #set(int,int,int)
@see #set(int,int,int,int,int)
@see #set(int,int,int,int,int,int)
@see #get(int)

## Calendar.set(int, int, int)

```java
public final void set(int year, int month, int date)
```

Sets the values for the calendar fields {@code YEAR},
{@code MONTH}, and {@code DAY_OF_MONTH}.
Previous values of other calendar fields are retained.  If this is not desired,
call {@link #clear()} first.

@param year the value used to set the {@code YEAR} calendar field.
@param month the value used to set the {@code MONTH} calendar field.
Month value is 0-based. e.g., 0 for January.
@param date the value used to set the {@code DAY_OF_MONTH} calendar field.
@see #set(int,int)
@see #set(int,int,int,int,int)
@see #set(int,int,int,int,int,int)

## Calendar.set(int, int, int, int, int)

```java
public final void set(int year, int month, int date, int hourOfDay, int minute)
```

Sets the values for the calendar fields {@code YEAR},
{@code MONTH}, {@code DAY_OF_MONTH},
{@code HOUR_OF_DAY}, and {@code MINUTE}.
Previous values of other fields are retained.  If this is not desired,
call {@link #clear()} first.

@param year the value used to set the {@code YEAR} calendar field.
@param month the value used to set the {@code MONTH} calendar field.
Month value is 0-based. e.g., 0 for January.
@param date the value used to set the {@code DAY_OF_MONTH} calendar field.
@param hourOfDay the value used to set the {@code HOUR_OF_DAY} calendar field.
@param minute the value used to set the {@code MINUTE} calendar field.
@see #set(int,int)
@see #set(int,int,int)
@see #set(int,int,int,int,int,int)

## Calendar.set(int, int, int, int, int, int)

```java
public final void set(int year, int month, int date, int hourOfDay, int minute, int second)
```

Sets the values for the fields {@code YEAR}, {@code MONTH},
{@code DAY_OF_MONTH}, {@code HOUR_OF_DAY}, {@code MINUTE}, and
{@code SECOND}.
Previous values of other fields are retained.  If this is not desired,
call {@link #clear()} first.

@param year the value used to set the {@code YEAR} calendar field.
@param month the value used to set the {@code MONTH} calendar field.
Month value is 0-based. e.g., 0 for January.
@param date the value used to set the {@code DAY_OF_MONTH} calendar field.
@param hourOfDay the value used to set the {@code HOUR_OF_DAY} calendar field.
@param minute the value used to set the {@code MINUTE} calendar field.
@param second the value used to set the {@code SECOND} calendar field.
@see #set(int,int)
@see #set(int,int,int)
@see #set(int,int,int,int,int)

## Calendar.clear()

```java
public final void clear()
```

Sets all the calendar field values and the time value
(millisecond offset from the <a href="#Epoch">Epoch</a>) of
this {@code Calendar} undefined. This means that {@link
#isSet(int) isSet()} will return {@code false} for all the
calendar fields, and the date and time calculations will treat
the fields as if they had never been set. A
{@code Calendar} implementation class may use its specific
default field values for date/time calculations. For example,
{@code GregorianCalendar} uses 1970 if the
{@code YEAR} field value is undefined.

@see #clear(int)

## Calendar.clear(int)

```java
public final void clear(int field)
```

Sets the given calendar field value and the time value
(millisecond offset from the <a href="#Epoch">Epoch</a>) of
this {@code Calendar} undefined. This means that {@link
#isSet(int) isSet(field)} will return {@code false}, and
the date and time calculations will treat the field as if it
had never been set. A {@code Calendar} implementation
class may use the field's specific default value for date and
time calculations.

<p>The {@link #HOUR_OF_DAY}, {@link #HOUR} and {@link #AM_PM}
fields are handled independently and the <a
href="#time_resolution">the resolution rule for the time of
day</a> is applied. Clearing one of the fields doesn't reset
the hour of day value of this {@code Calendar}. Use {@link
#set(int,int) set(Calendar.HOUR_OF_DAY, 0)} to reset the hour
value.

@param field the calendar field to be cleared.
@see #clear()

## Calendar.isSet(int)

```java
public final boolean isSet(int field)
```

Determines if the given calendar field has a value set,
including cases that the value has been set by internal fields
calculations triggered by a {@code get} method call.

@param field the calendar field to test
@return {@code true} if the given calendar field has a value set;
{@code false} otherwise.

## Calendar.getDisplayName(int, int, Locale)

```java
public String getDisplayName(int field, int style, Locale locale)
```

Returns the string representation of the calendar
{@code field} value in the given {@code style} and
{@code locale}.  If no string representation is
applicable, {@code null} is returned. This method calls
{@link Calendar#get(int) get(field)} to get the calendar
{@code field} value if the string representation is
applicable to the given calendar {@code field}.

<p>For example, if this {@code Calendar} is a
{@code GregorianCalendar} and its date is 2005-01-01, then
the string representation of the {@link #MONTH} field would be
"January" in the long style in an English locale or "Jan" in
the short style. However, no string representation would be
available for the {@link #DAY_OF_MONTH} field, and this method
would return {@code null}.

<p>The default implementation supports the calendar fields for
which a {@link DateFormatSymbols} has names in the given
{@code locale}.

<p>If there is no string representation of the {@code Calendar} {@code field}
and the calendar is in non-lenient mode and any calendar fields have invalid values,
{@code null} is returned. If there is a string representation of the {@code Calendar}
{@code field} and the calendar is in non-lenient mode and any calendar fields
have invalid values, {@code IllegalArgumentException} will be thrown.

@param field
       the calendar field for which the string representation
       is returned
@param style
       the style applied to the string representation; one of {@link
       #SHORT_FORMAT} ({@link #SHORT}), {@link #SHORT_STANDALONE},
       {@link #LONG_FORMAT} ({@link #LONG}), {@link #LONG_STANDALONE},
       {@link #NARROW_FORMAT}, or {@link #NARROW_STANDALONE}.
@param locale
       the locale for the string representation
       (any calendar types specified by {@code locale} are ignored)
@return the string representation of the given
       {@code field} in the given {@code style}, or
       {@code null} if no string representation is
       applicable.
@throws    IllegalArgumentException
       if {@code field} or {@code style} is invalid,
       or if this {@code Calendar} is non-lenient and any
       of the calendar fields have invalid values
@throws    NullPointerException
       if {@code locale} is null
@since 1.6

## Calendar.getDisplayNames(int, int, Locale)

```java
public Map<String, Integer> getDisplayNames(int field, int style, Locale locale)
```

Returns a {@code Map} containing all names of the calendar
{@code field} in the given {@code style} and
{@code locale} and their corresponding field values. For
example, if this {@code Calendar} is a {@link
GregorianCalendar}, the returned map would contain "Jan" to
{@link #JANUARY}, "Feb" to {@link #FEBRUARY}, and so on, in the
{@linkplain #SHORT short} style in an English locale.

<p>Narrow names may not be unique due to use of single characters,
such as "S" for Sunday and Saturday. In that case narrow names are not
included in the returned {@code Map}.

<p>The values of other calendar fields may be taken into
account to determine a set of display names. For example, if
this {@code Calendar} is a lunisolar calendar system and
the year value given by the {@link #YEAR} field has a leap
month, this method would return month names containing the leap
month name, and month names are mapped to their values specific
for the year.

<p>The default implementation supports display names contained in
a {@link DateFormatSymbols}. For example, if {@code field}
is {@link #MONTH} and {@code style} is {@link
#ALL_STYLES}, this method returns a {@code Map} containing
all strings returned by {@link DateFormatSymbols#getShortMonths()}
and {@link DateFormatSymbols#getMonths()}.

<p>Unlike {@link #getDisplayName(int, int, Locale)}, this
method will not throw an {@code IllegalArgumentException} if the
{@code Calendar} is non-lenient and any of the calendar fields have
invalid values. Instead, this method will return either {@code null} or
a {@code Map}.

@param field
       the calendar field for which the display names are returned
@param style
       the style applied to the string representation; one of {@link
       #SHORT_FORMAT} ({@link #SHORT}), {@link #SHORT_STANDALONE},
       {@link #LONG_FORMAT} ({@link #LONG}), {@link #LONG_STANDALONE},
       {@link #NARROW_FORMAT}, or {@link #NARROW_STANDALONE}
@param locale
       the locale for the display names
@return a {@code Map} containing all display names in
       {@code style} and {@code locale} and their
       field values, or {@code null} if no display names
       are defined for {@code field}
@throws    IllegalArgumentException
       if {@code field} or {@code style} is invalid
@throws    NullPointerException
       if {@code locale} is null
@since 1.6

## Calendar.complete()

```java
protected void complete()
```

Fills in any unset fields in the calendar fields. First, the {@link
#computeTime()} method is called if the time value (millisecond offset
from the <a href="#Epoch">Epoch</a>) has not been calculated from
calendar field values. Then, the {@link #computeFields()} method is
called to calculate all calendar field values.

## Calendar.getAvailableCalendarTypes()

```java
public static Set<String> getAvailableCalendarTypes()
```

Returns an unmodifiable {@code Set} containing all calendar types
supported by {@code Calendar} in the runtime environment. The available
calendar types can be used for the <a
href="Locale.html#def_locale_extension">Unicode locale extensions</a>.
The {@code Set} returned contains at least {@code "gregory"}. The
calendar types don't include aliases, such as {@code "gregorian"} for
{@code "gregory"}.

@return an unmodifiable {@code Set} containing all available calendar types
@since 1.8
@see #getCalendarType()
@see Calendar.Builder#setCalendarType(String)
@see Locale#getUnicodeLocaleType(String)

## Calendar.getCalendarType()

```java
public String getCalendarType()
```

Returns the calendar type of this {@code Calendar}. Calendar types are
defined by the <em>Unicode Locale Data Markup Language (LDML)</em>
specification.

<p>The default implementation of this method returns the class name of
this {@code Calendar} instance. Any subclasses that implement
LDML-defined calendar systems should override this method to return
appropriate calendar types.

@return the LDML-defined calendar type or the class name of this
        {@code Calendar} instance
@since 1.8
@see <a href="Locale.html#def_extensions">Locale extensions</a>
@see Locale.Builder#setLocale(Locale)
@see Locale.Builder#setUnicodeLocaleKeyword(String, String)

## Calendar.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this {@code Calendar} to the specified
{@code Object}.  The result is {@code true} if and only if
the argument is a {@code Calendar} object of the same calendar
system that represents the same time value (millisecond offset from the
<a href="#Epoch">Epoch</a>) under the same
{@code Calendar} parameters as this object.

<p>The {@code Calendar} parameters are the values represented
by the {@code isLenient}, {@code getFirstDayOfWeek},
{@code getMinimalDaysInFirstWeek} and {@code getTimeZone}
methods. If there is any difference in those parameters
between the two {@code Calendar}s, this method returns
{@code false}.

<p>Use the {@link #compareTo(Calendar) compareTo} method to
compare only the time values.

@param obj the object to compare with.
@return {@code true} if this object is equal to {@code obj};
{@code false} otherwise.

## Calendar.hashCode()

```java
public int hashCode()
```

Returns a hash code for this calendar.

@return a hash code value for this object.
@since 1.2

## Calendar.before(Object)

```java
public boolean before(Object when)
```

Returns whether this {@code Calendar} represents a time
before the time represented by the specified
{@code Object}. This method is equivalent to:
<pre>{@code
        compareTo(when) < 0
}</pre>
if and only if {@code when} is a {@code Calendar}
instance. Otherwise, the method returns {@code false}.

@param when the {@code Object} to be compared
@return {@code true} if the time of this
{@code Calendar} is before the time represented by
{@code when}; {@code false} otherwise.
@see     #compareTo(Calendar)

## Calendar.after(Object)

```java
public boolean after(Object when)
```

Returns whether this {@code Calendar} represents a time
after the time represented by the specified
{@code Object}. This method is equivalent to:
<pre>{@code
        compareTo(when) > 0
}</pre>
if and only if {@code when} is a {@code Calendar}
instance. Otherwise, the method returns {@code false}.

@param when the {@code Object} to be compared
@return {@code true} if the time of this {@code Calendar} is
after the time represented by {@code when}; {@code false}
otherwise.
@see     #compareTo(Calendar)

## Calendar.compareTo(Calendar)

```java
public int compareTo(Calendar anotherCalendar)
```

Compares the time values (millisecond offsets from the <a
href="#Epoch">Epoch</a>) represented by two
{@code Calendar} objects.

@param anotherCalendar the {@code Calendar} to be compared.
@return the value {@code 0} if the time represented by the argument
is equal to the time represented by this {@code Calendar}; a value
less than {@code 0} if the time of this {@code Calendar} is
before the time represented by the argument; and a value greater than
{@code 0} if the time of this {@code Calendar} is after the
time represented by the argument.
@throws    NullPointerException if the specified {@code Calendar} is
           {@code null}.
@throws    IllegalArgumentException if the time value of the
specified {@code Calendar} object can't be obtained due to
any invalid calendar values.
@since   1.5

## Calendar.add(int, int)

```java
public abstract void add(int field, int amount)
```

Adds or subtracts the specified amount of time to the given calendar field,
based on the calendar's rules. For example, to subtract 5 days from
the current time of the calendar, you can achieve it by calling:
<p>{@code add(Calendar.DAY_OF_MONTH, -5)}.

@param field the calendar field.
@param amount the amount of date or time to be added to the field.
@throws IllegalArgumentException if this {@code Calendar} is non-lenient
and any of the calendar fields have invalid values or if {@code field} is
{@code ZONE_OFFSET}, {@code DST_OFFSET}, or unknown.
@see #roll(int,int)
@see #set(int,int)

## Calendar.roll(int, boolean)

```java
public abstract void roll(int field, boolean up)
```

Adds or subtracts (up/down) a single unit of time on the given time
field without changing larger fields. For example, to roll the current
date up by one day, you can achieve it by calling:
<p>roll(Calendar.DATE, true).
When rolling on the year or Calendar.YEAR field, it will roll the year
value in the range between 1 and the value returned by calling
{@code getMaximum(Calendar.YEAR)}.
When rolling on the month or Calendar.MONTH field, other fields like
date might conflict and, need to be changed. For instance,
rolling the month on the date 01/31/96 will result in 02/29/96.
When rolling on the hour-in-day or Calendar.HOUR_OF_DAY field, it will
roll the hour value in the range between 0 and 23, which is zero-based.

@param field the time field.
@param up indicates if the value of the specified time field is to be
rolled up or rolled down. Use true if rolling up, false otherwise.
@throws IllegalArgumentException if this {@code Calendar} is non-lenient
and any of the calendar fields have invalid values or if {@code field} is
{@code ZONE_OFFSET}, {@code DST_OFFSET}, or unknown.
@see Calendar#add(int,int)
@see Calendar#set(int,int)

## Calendar.roll(int, int)

```java
public void roll(int field, int amount)
```

Adds the specified (signed) amount to the specified calendar field
without changing larger fields.  A negative amount means to roll
down.

<p>NOTE:  This default implementation on {@code Calendar} just repeatedly calls the
version of {@link #roll(int,boolean) roll()} that rolls by one unit.  This may not
always do the right thing.  For example, if the {@code DAY_OF_MONTH} field is 31,
rolling through February will leave it set to 28.  The {@code GregorianCalendar}
version of this function takes care of this problem.  Other subclasses
should also provide overrides of this function that do the right thing.

@param field the calendar field.
@param amount the signed amount to add to the calendar {@code field}.
@throws IllegalArgumentException if this {@code Calendar} is non-lenient
and any of the calendar fields have invalid values or if {@code field} is
{@code ZONE_OFFSET}, {@code DST_OFFSET}, or unknown.
@since 1.2
@see #roll(int,boolean)
@see #add(int,int)
@see #set(int,int)

## Calendar.setTimeZone(TimeZone)

```java
public void setTimeZone(TimeZone value)
```

Sets the time zone with the given time zone value.

@param value the given time zone.

## Calendar.getTimeZone()

```java
public TimeZone getTimeZone()
```

Gets the time zone.

@return the time zone object associated with this calendar.

## Calendar.setLenient(boolean)

```java
public void setLenient(boolean lenient)
```

Specifies whether or not date/time interpretation is to be lenient.  With
lenient interpretation, a date such as "February 942, 1996" will be
treated as being equivalent to the 941st day after February 1, 1996.
With strict (non-lenient) interpretation, such dates will cause an exception to be
thrown. The default is lenient.

@param lenient {@code true} if the lenient mode is to be turned
on; {@code false} if it is to be turned off.
@see #isLenient()
@see java.text.DateFormat#setLenient

## Calendar.isLenient()

```java
public boolean isLenient()
```

Tells whether date/time interpretation is to be lenient.

@return {@code true} if the interpretation mode of this calendar is lenient;
{@code false} otherwise.
@see #setLenient(boolean)

## Calendar.setFirstDayOfWeek(int)

```java
public void setFirstDayOfWeek(int value)
```

Sets what the first day of the week is; e.g., {@code SUNDAY} in the U.S.,
{@code MONDAY} in France.

@param value the given first day of the week.
@see #getFirstDayOfWeek()
@see #getMinimalDaysInFirstWeek()

## Calendar.getFirstDayOfWeek()

```java
public int getFirstDayOfWeek()
```

Gets what the first day of the week is; e.g., {@code SUNDAY} in the U.S.,
{@code MONDAY} in France.

@return the first day of the week.
@see #setFirstDayOfWeek(int)
@see #getMinimalDaysInFirstWeek()

## Calendar.setMinimalDaysInFirstWeek(int)

```java
public void setMinimalDaysInFirstWeek(int value)
```

Sets what the minimal days required in the first week of the year are;
For example, if the first week is defined as one that contains the first
day of the first month of a year, call this method with value 1. If it
must be a full week, use value 7.

@param value the given minimal days required in the first week
of the year.
@see #getMinimalDaysInFirstWeek()

## Calendar.getMinimalDaysInFirstWeek()

```java
public int getMinimalDaysInFirstWeek()
```

Gets what the minimal days required in the first week of the year are;
e.g., if the first week is defined as one that contains the first day
of the first month of a year, this method returns 1. If
the minimal days required must be a full week, this method
returns 7.

@return the minimal days required in the first week of the year.
@see #setMinimalDaysInFirstWeek(int)

## Calendar.isWeekDateSupported()

```java
public boolean isWeekDateSupported()
```

Returns whether this {@code Calendar} supports week dates.

<p>The default implementation of this method returns {@code false}.

@return {@code true} if this {@code Calendar} supports week dates;
        {@code false} otherwise.
@see #getWeekYear()
@see #setWeekDate(int,int,int)
@see #getWeeksInWeekYear()
@since 1.7

## Calendar.getWeekYear()

```java
public int getWeekYear()
```

Returns the week year represented by this {@code Calendar}. The
week year is in sync with the week cycle. The {@linkplain
#getFirstDayOfWeek() first day of the first week} is the first
day of the week year.

<p>The default implementation of this method throws an
{@link UnsupportedOperationException}.

@return the week year of this {@code Calendar}
@throws    UnsupportedOperationException
           if any week year numbering isn't supported
           in this {@code Calendar}.
@see #isWeekDateSupported()
@see #getFirstDayOfWeek()
@see #getMinimalDaysInFirstWeek()
@since 1.7

## Calendar.setWeekDate(int, int, int)

```java
public void setWeekDate(int weekYear, int weekOfYear, int dayOfWeek)
```

Sets the date of this {@code Calendar} with the given date
specifiers - week year, week of year, and day of week.

<p>Unlike the {@code set} method, all of the calendar fields
and {@code time} values are calculated upon return.

<p>If {@code weekOfYear} is out of the valid week-of-year range
in {@code weekYear}, the {@code weekYear} and {@code
weekOfYear} values are adjusted in lenient mode, or an {@code
IllegalArgumentException} is thrown in non-lenient mode.

<p>The default implementation of this method throws an
{@code UnsupportedOperationException}.

@param weekYear   the week year
@param weekOfYear the week number based on {@code weekYear}
@param dayOfWeek  the day of week value: one of the constants
                  for the {@link #DAY_OF_WEEK} field: {@link
                  #SUNDAY}, ..., {@link #SATURDAY}.
@throws    IllegalArgumentException
           if any of the given date specifiers is invalid
           or any of the calendar fields are inconsistent
           with the given date specifiers in non-lenient mode
@throws    UnsupportedOperationException
           if any week year numbering isn't supported in this
           {@code Calendar}.
@see #isWeekDateSupported()
@see #getFirstDayOfWeek()
@see #getMinimalDaysInFirstWeek()
@since 1.7

## Calendar.getWeeksInWeekYear()

```java
public int getWeeksInWeekYear()
```

Returns the number of weeks in the week year represented by this
{@code Calendar}.

<p>The default implementation of this method throws an
{@code UnsupportedOperationException}.

@return the number of weeks in the week year.
@throws    UnsupportedOperationException
           if any week year numbering isn't supported in this
           {@code Calendar}.
@see #WEEK_OF_YEAR
@see #isWeekDateSupported()
@see #getWeekYear()
@see #getActualMaximum(int)
@since 1.7

## Calendar.getMinimum(int)

```java
public abstract int getMinimum(int field)
```

Returns the minimum value for the given calendar field of this
{@code Calendar} instance. The minimum value is defined as
the smallest value returned by the {@link #get(int) get} method
for any possible time value.  The minimum value depends on
calendar system specific parameters of the instance.

@param field the calendar field.
@return the minimum value for the given calendar field.
@see #getMaximum(int)
@see #getGreatestMinimum(int)
@see #getLeastMaximum(int)
@see #getActualMinimum(int)
@see #getActualMaximum(int)

## Calendar.getMaximum(int)

```java
public abstract int getMaximum(int field)
```

Returns the maximum value for the given calendar field of this
{@code Calendar} instance. The maximum value is defined as
the largest value returned by the {@link #get(int) get} method
for any possible time value. The maximum value depends on
calendar system specific parameters of the instance.

@param field the calendar field.
@return the maximum value for the given calendar field.
@see #getMinimum(int)
@see #getGreatestMinimum(int)
@see #getLeastMaximum(int)
@see #getActualMinimum(int)
@see #getActualMaximum(int)

## Calendar.getGreatestMinimum(int)

```java
public abstract int getGreatestMinimum(int field)
```

Returns the highest minimum value for the given calendar field
of this {@code Calendar} instance. The highest minimum
value is defined as the largest value returned by {@link
#getActualMinimum(int)} for any possible time value. The
greatest minimum value depends on calendar system specific
parameters of the instance.

@param field the calendar field.
@return the highest minimum value for the given calendar field.
@see #getMinimum(int)
@see #getMaximum(int)
@see #getLeastMaximum(int)
@see #getActualMinimum(int)
@see #getActualMaximum(int)

## Calendar.getLeastMaximum(int)

```java
public abstract int getLeastMaximum(int field)
```

Returns the lowest maximum value for the given calendar field
of this {@code Calendar} instance. The lowest maximum
value is defined as the smallest value returned by {@link
#getActualMaximum(int)} for any possible time value. The least
maximum value depends on calendar system specific parameters of
the instance. For example, a {@code Calendar} for the
Gregorian calendar system returns 28 for the
{@code DAY_OF_MONTH} field, because the 28th is the last
day of the shortest month of this calendar, February in a
common year.

@param field the calendar field.
@return the lowest maximum value for the given calendar field.
@see #getMinimum(int)
@see #getMaximum(int)
@see #getGreatestMinimum(int)
@see #getActualMinimum(int)
@see #getActualMaximum(int)

## Calendar.getActualMinimum(int)

```java
public int getActualMinimum(int field)
```

Returns the minimum value that the specified calendar field
could have, given the time value of this {@code Calendar}.

<p>The default implementation of this method uses an iterative
algorithm to determine the actual minimum value for the
calendar field. Subclasses should, if possible, override this
with a more efficient implementation - in many cases, they can
simply return {@code getMinimum()}.

@param field the calendar field
@return the minimum of the given calendar field for the time
value of this {@code Calendar}
@see #getMinimum(int)
@see #getMaximum(int)
@see #getGreatestMinimum(int)
@see #getLeastMaximum(int)
@see #getActualMaximum(int)
@since 1.2

## Calendar.getActualMaximum(int)

```java
public int getActualMaximum(int field)
```

Returns the maximum value that the specified calendar field
could have, given the time value of this
{@code Calendar}. For example, the actual maximum value of
the {@code MONTH} field is 12 in some years, and 13 in
other years in the Hebrew calendar system.

<p>The default implementation of this method uses an iterative
algorithm to determine the actual maximum value for the
calendar field. Subclasses should, if possible, override this
with a more efficient implementation.

@param field the calendar field
@return the maximum of the given calendar field for the time
value of this {@code Calendar}
@see #getMinimum(int)
@see #getMaximum(int)
@see #getGreatestMinimum(int)
@see #getLeastMaximum(int)
@see #getActualMinimum(int)
@since 1.2

## Calendar.clone()

```java
public Object clone()
```

Creates and returns a copy of this object.

@return a copy of this object.

## Calendar.toString()

```java
public String toString()
```

Return a string representation of this calendar. This method
is intended to be used only for debugging purposes, and the
format of the returned string may vary between implementations.
The returned string may be empty but may not be {@code null}.

@return  a string representation of this calendar.

## Calendar.toInstant()

```java
public final Instant toInstant()
```

Converts this object to an {@link Instant}.
<p>
The conversion creates an {@code Instant} that represents the
same point on the time-line as this {@code Calendar}.

@return the instant representing the same point on the time-line
@since 1.8