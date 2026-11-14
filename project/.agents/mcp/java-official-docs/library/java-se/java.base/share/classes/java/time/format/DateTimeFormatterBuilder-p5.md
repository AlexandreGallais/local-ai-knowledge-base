---
title: "DateTimeFormatterBuilder class (java.time.format) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatterBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatterBuilder class (java.time.format) (part 5 of 6)

## DateTimeFormatterBuilder.appendPattern(String)

```java
public DateTimeFormatterBuilder appendPattern(String pattern)
```

Appends the elements defined by the specified pattern to the builder.

All letters 'A' to 'Z' and 'a' to 'z' are reserved as pattern letters.
The characters '#', '{' and '}' are reserved for future use.
The characters '[' and ']' indicate optional patterns.
The following pattern letters are defined:

```java
 Symbol  Meaning                     Presentation      Examples
 ------  -------                     ------------      -------
  G       era                         text              AD; Anno Domini; A
  u       year                        year              2004; 04
  y       year-of-era                 year              2004; 04
  D       day-of-year                 number            189
  M/L     month-of-year               number/text       7; 07; Jul; July; J
  d       day-of-month                number            10
  g       modified-julian-day         number            2451334

  Q/q     quarter-of-year             number/text       3; 03; Q3; 3rd quarter
  Y       week-based-year             year              1996; 96
  w       week-of-week-based-year     number            27
  W       week-of-month               number            4
  E       day-of-week                 text              Tue; Tuesday; T
  e/c     localized day-of-week       number/text       2; 02; Tue; Tuesday; T
  F       day-of-week-in-month        number            3

  a       am-pm-of-day                text              PM
  B       period-of-day               text              in the morning
  h       clock-hour-of-am-pm (1-12)  number            12
  K       hour-of-am-pm (0-11)        number            0
  k       clock-hour-of-day (1-24)    number            24

  H       hour-of-day (0-23)          number            0
  m       minute-of-hour              number            30
  s       second-of-minute            number            55
  S       fraction-of-second          fraction          978
  A       milli-of-day                number            1234
  n       nano-of-second              number            987654321
  N       nano-of-day                 number            1234000000

  V       time-zone ID                zone-id           America/Los_Angeles; Z; -08:30
  v       generic time-zone name      zone-name         PT, Pacific Time
  z       time-zone name              zone-name         Pacific Standard Time; PST
  O       localized zone-offset       offset-O          GMT+8; GMT+08:00; UTC-08:00;
  X       zone-offset 'Z' for zero    offset-X          Z; -08; -0830; -08:30; -083015; -08:30:15
  x       zone-offset                 offset-x          +0000; -08; -0830; -08:30; -083015; -08:30:15
  Z       zone-offset                 offset-Z          +0000; -0800; -08:00

  p       pad next                    pad modifier      1

  '       escape for text             delimiter
  ''      single quote                literal           '
  [       optional section start
  ]       optional section end
  #       reserved for future use
  {       reserved for future use
  }       reserved for future use
```

The count of pattern letters determine the format.
See DateTimeFormatter for a user-focused description of the patterns.
The following tables define how the pattern letters map to the builder.

**Date fields**: Pattern letters to output a date.

```java
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   G       1      appendText(ChronoField.ERA, TextStyle.SHORT)
   GG      2      appendText(ChronoField.ERA, TextStyle.SHORT)
   GGG     3      appendText(ChronoField.ERA, TextStyle.SHORT)
   GGGG    4      appendText(ChronoField.ERA, TextStyle.FULL)
   GGGGG   5      appendText(ChronoField.ERA, TextStyle.NARROW)

   u       1      appendValue(ChronoField.YEAR, 1, 19, SignStyle.NORMAL)
   uu      2      appendValueReduced(ChronoField.YEAR, 2, 2, 2000)
   uuu     3      appendValue(ChronoField.YEAR, 3, 19, SignStyle.NORMAL)
   u..u    4..n   appendValue(ChronoField.YEAR, n, 19, SignStyle.EXCEEDS_PAD)
   y       1      appendValue(ChronoField.YEAR_OF_ERA, 1, 19, SignStyle.NORMAL)
   yy      2      appendValueReduced(ChronoField.YEAR_OF_ERA, 2, 2, 2000)
   yyy     3      appendValue(ChronoField.YEAR_OF_ERA, 3, 19, SignStyle.NORMAL)
   y..y    4..n   appendValue(ChronoField.YEAR_OF_ERA, n, 19, SignStyle.EXCEEDS_PAD)
   Y       1      append special localized WeekFields element for numeric week-based-year
   YY      2      append special localized WeekFields element for reduced numeric week-based-year 2 digits
   YYY     3      append special localized WeekFields element for numeric week-based-year (3, 19, SignStyle.NORMAL)
   Y..Y    4..n   append special localized WeekFields element for numeric week-based-year (n, 19, SignStyle.EXCEEDS_PAD)

   Q       1      appendValue(IsoFields.QUARTER_OF_YEAR)
   QQ      2      appendValue(IsoFields.QUARTER_OF_YEAR, 2)
   QQQ     3      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT)
   QQQQ    4      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.FULL)
   QQQQQ   5      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW)
   q       1      appendValue(IsoFields.QUARTER_OF_YEAR)
   qq      2      appendValue(IsoFields.QUARTER_OF_YEAR, 2)
   qqq     3      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT_STANDALONE)
   qqqq    4      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.FULL_STANDALONE)
   qqqqq   5      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW_STANDALONE)

   M       1      appendValue(ChronoField.MONTH_OF_YEAR)
   MM      2      appendValue(ChronoField.MONTH_OF_YEAR, 2)
   MMM     3      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT)
   MMMM    4      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.FULL)
   MMMMM   5      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.NARROW)
   L       1      appendValue(ChronoField.MONTH_OF_YEAR)
   LL      2      appendValue(ChronoField.MONTH_OF_YEAR, 2)
   LLL     3      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT_STANDALONE)
   LLLL    4      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.FULL_STANDALONE)
   LLLLL   5      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.NARROW_STANDALONE)

   w       1      append special localized WeekFields element for numeric week-of-year
   ww      2      append special localized WeekFields element for numeric week-of-year, zero-padded
   W       1      append special localized WeekFields element for numeric week-of-month
   d       1      appendValue(ChronoField.DAY_OF_MONTH)
   dd      2      appendValue(ChronoField.DAY_OF_MONTH, 2)
   D       1      appendValue(ChronoField.DAY_OF_YEAR)
   DD      2      appendValue(ChronoField.DAY_OF_YEAR, 2, 3, SignStyle.NOT_NEGATIVE)
   DDD     3      appendValue(ChronoField.DAY_OF_YEAR, 3)
   F       1      appendValue(ChronoField.ALIGNED_WEEK_OF_MONTH)
   g..g    1..n   appendValue(JulianFields.MODIFIED_JULIAN_DAY, n, 19, SignStyle.NORMAL)
   E       1      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   EE      2      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   EEE     3      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   EEEE    4      appendText(ChronoField.DAY_OF_WEEK, TextStyle.FULL)
   EEEEE   5      appendText(ChronoField.DAY_OF_WEEK, TextStyle.NARROW)
   e       1      append special localized WeekFields element for numeric day-of-week
   ee      2      append special localized WeekFields element for numeric day-of-week, zero-padded
   eee     3      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   eeee    4      appendText(ChronoField.DAY_OF_WEEK, TextStyle.FULL)
   eeeee   5      appendText(ChronoField.DAY_OF_WEEK, TextStyle.NARROW)
   c       1      append special localized WeekFields element for numeric day-of-week
   ccc     3      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT_STANDALONE)
   cccc    4      appendText(ChronoField.DAY_OF_WEEK, TextStyle.FULL_STANDALONE)
   ccccc   5      appendText(ChronoField.DAY_OF_WEEK, TextStyle.NARROW_STANDALONE)
```

**Time fields**: Pattern letters to output a time.

```java
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   a       1      appendText(ChronoField.AMPM_OF_DAY, TextStyle.SHORT)
   h       1      appendValue(ChronoField.CLOCK_HOUR_OF_AMPM)
   hh      2      appendValue(ChronoField.CLOCK_HOUR_OF_AMPM, 2)
   H       1      appendValue(ChronoField.HOUR_OF_DAY)
   HH      2      appendValue(ChronoField.HOUR_OF_DAY, 2)
   k       1      appendValue(ChronoField.CLOCK_HOUR_OF_DAY)
   kk      2      appendValue(ChronoField.CLOCK_HOUR_OF_DAY, 2)
   K       1      appendValue(ChronoField.HOUR_OF_AMPM)
   KK      2      appendValue(ChronoField.HOUR_OF_AMPM, 2)
   m       1      appendValue(ChronoField.MINUTE_OF_HOUR)
   mm      2      appendValue(ChronoField.MINUTE_OF_HOUR, 2)
   s       1      appendValue(ChronoField.SECOND_OF_MINUTE)
   ss      2      appendValue(ChronoField.SECOND_OF_MINUTE, 2)

   S..S    1..n   appendFraction(ChronoField.NANO_OF_SECOND, n, n, false)
   A..A    1..n   appendValue(ChronoField.MILLI_OF_DAY, n, 19, SignStyle.NOT_NEGATIVE)
   n..n    1..n   appendValue(ChronoField.NANO_OF_SECOND, n, 19, SignStyle.NOT_NEGATIVE)
   N..N    1..n   appendValue(ChronoField.NANO_OF_DAY, n, 19, SignStyle.NOT_NEGATIVE)
```

**Day periods**: Pattern letters to output a day period.

```java
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   B       1      appendDayPeriodText(TextStyle.SHORT)
   BBBB    4      appendDayPeriodText(TextStyle.FULL)
   BBBBB   5      appendDayPeriodText(TextStyle.NARROW)
```

**Zone ID**: Pattern letters to output `ZoneId`.

```java
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   VV      2      appendZoneId()
   v       1      appendGenericZoneText(TextStyle.SHORT)
   vvvv    4      appendGenericZoneText(TextStyle.FULL)
   z       1      appendZoneText(TextStyle.SHORT)
   zz      2      appendZoneText(TextStyle.SHORT)
   zzz     3      appendZoneText(TextStyle.SHORT)
   zzzz    4      appendZoneText(TextStyle.FULL)
```

**Zone offset**: Pattern letters to output `ZoneOffset`.

```java
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   O       1      appendLocalizedOffset(TextStyle.SHORT)
   OOOO    4      appendLocalizedOffset(TextStyle.FULL)
   X       1      appendOffset("+HHmm","Z")
   XX      2      appendOffset("+HHMM","Z")
   XXX     3      appendOffset("+HH:MM","Z")
   XXXX    4      appendOffset("+HHMMss","Z")
   XXXXX   5      appendOffset("+HH:MM:ss","Z")
   x       1      appendOffset("+HHmm","+00")
   xx      2      appendOffset("+HHMM","+0000")
   xxx     3      appendOffset("+HH:MM","+00:00")
   xxxx    4      appendOffset("+HHMMss","+0000")
   xxxxx   5      appendOffset("+HH:MM:ss","+00:00")
   Z       1      appendOffset("+HHMM","+0000")
   ZZ      2      appendOffset("+HHMM","+0000")
   ZZZ     3      appendOffset("+HHMM","+0000")
   ZZZZ    4      appendLocalizedOffset(TextStyle.FULL)
   ZZZZZ   5      appendOffset("+HH:MM:ss","Z")
```

**Modifiers**: Pattern letters that modify the rest of the pattern:

```java
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   [       1      optionalStart()
   ]       1      optionalEnd()
   p..p    1..n   padNext(n)
```

Any sequence of letters not specified above, unrecognized letter or
reserved character will throw an exception.
Future versions may add to the set of patterns.
It is recommended to use single quotes around all characters that you want
to output directly to ensure that future changes do not break your application.

Note that the pattern string is similar, but not identical, to
SimpleDateFormat.
The pattern string is also similar, but not identical, to that defined by the
Unicode Common Locale Data Repository (CLDR/LDML).
Pattern letters 'X' and 'u' are aligned with Unicode CLDR/LDML.
By contrast, `SimpleDateFormat` uses 'u' for the numeric day of week.
Pattern letters 'y' and 'Y' parse years of two digits and more than 4 digits differently.
Pattern letters 'n', 'A', 'N', and 'p' are added.
Number types will reject large numbers.

Parameters:

- `pattern`: the pattern to add, not null

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if the pattern is invalid

## DateTimeFormatterBuilder.padNext(int)

```java
public DateTimeFormatterBuilder padNext(int padWidth)
```

Causes the next added printer/parser to pad to a fixed width using a space.

This padding will pad to a fixed width using spaces.

During formatting, the decorated element will be output and then padded
to the specified width. An exception will be thrown during formatting if
the pad width is exceeded.

During parsing, the padding and decorated element are parsed.
If parsing is lenient, then the pad width is treated as a maximum.
The padding is parsed greedily. Thus, if the decorated element starts with
the pad character, it will not be parsed.

Parameters:

- `padWidth`: the pad width, 1 or greater

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if pad width is too small

## DateTimeFormatterBuilder.padNext(int, char)

```java
public DateTimeFormatterBuilder padNext(int padWidth, char padChar)
```

Causes the next added printer/parser to pad to a fixed width.

This padding is intended for padding other than zero-padding.
Zero-padding should be achieved using the appendValue methods.

During formatting, the decorated element will be output and then padded
to the specified width. An exception will be thrown during formatting if
the pad width is exceeded.

During parsing, the padding and decorated element are parsed.
If parsing is lenient, then the pad width is treated as a maximum.
If parsing is case insensitive, then the pad character is matched ignoring case.
The padding is parsed greedily. Thus, if the decorated element starts with
the pad character, it will not be parsed.

Parameters:

- `padWidth`: the pad width, 1 or greater
- `padChar`: the pad character

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if pad width is too small
