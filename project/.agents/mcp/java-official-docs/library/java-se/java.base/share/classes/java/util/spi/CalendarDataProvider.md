---
title: "CalendarDataProvider class (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/CalendarDataProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CalendarDataProvider class (java.util.spi)

```java
public abstract class CalendarDataProvider extends LocaleServiceProvider
```

An abstract class for service providers that provide locale-dependent `Calendar` parameters.

**Since:** 1.8

**See also:** CalendarNameProvider

## CalendarDataProvider.CalendarDataProvider()

```java
protected CalendarDataProvider()
```

Sole constructor. (For invocation by subclass constructors, typically
implicit.)

## CalendarDataProvider.getFirstDayOfWeek(Locale)

```java
public abstract int getFirstDayOfWeek(Locale locale)
```

Returns the first day of a week in the given `locale`. This
information is required by `Calendar` to support operations on the
week-related calendar fields.

Parameters:

- `locale`: the desired locale

**Returns:** the first day of a week; one of `Calendar.SUNDAY` ..
        `Calendar.SATURDAY`,
        or 0 if the value isn't available for the `locale`

**See also:** java.util.Calendar#getFirstDayOfWeek()

**See also:** First Week

Throws:

- `NullPointerException`: if `locale` is `null`.

## CalendarDataProvider.getMinimalDaysInFirstWeek(Locale)

```java
public abstract int getMinimalDaysInFirstWeek(Locale locale)
```

Returns the minimal number of days required in the first week of a
year. This information is required by `Calendar` to determine the
first week of a year. Refer to the description of  how `Calendar` determines
the first week.

Parameters:

- `locale`: the desired locale

**Returns:** the minimal number of days of the first week,
        or 0 if the value isn't available for the `locale`

**See also:** java.util.Calendar#getMinimalDaysInFirstWeek()

Throws:

- `NullPointerException`: if `locale` is `null`.
