---
title: "SimpleDateFormat class (java.text) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/SimpleDateFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SimpleDateFormat class (java.text) (part 2 of 2)

## SimpleDateFormat.format(Date, StringBuffer, FieldPosition)

```java
public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition pos)
```

Formats the given `Date` into a date/time string and appends
the result to the given `StringBuffer`.

Parameters:

- `date`: the date-time value to be formatted into a date-time string.
- `toAppendTo`: where the new date-time text is to be appended.
- `pos`: keeps track on the position of the field within the returned string. For example, given a date-time text `"1996.07.10 AD at 15:08:56 PDT"`, if the given `fieldPosition` is `DateFormat.YEAR_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 4, respectively. Notice that if the same date-time field appears more than once in a pattern, the `fieldPosition` will be set for the first occurrence of that date-time field. For instance, formatting a `Date` to the date-time string `"1 PM PDT (Pacific Daylight Time)"` using the pattern `"h a z (zzzz)"` and the alignment field `DateFormat.TIMEZONE_FIELD`, the begin index and end index of `fieldPosition` will be set to 5 and 8, respectively, for the first occurrence of the timezone pattern character `'z'`.

**Returns:** the formatted date-time string.

Throws:

- `NullPointerException`: if any of the parameters is `null`.

## SimpleDateFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object obj)
```

Formats an Object producing an `AttributedCharacterIterator`.
You can use the returned `AttributedCharacterIterator`
to build the resulting String, as well as to determine information
about the resulting String.

Each attribute key of the AttributedCharacterIterator will be of type
`DateFormat.Field`, with the corresponding attribute value
being the same as the attribute key.

Parameters:

- `obj`: The object to format

**Returns:** AttributedCharacterIterator describing the formatted value.

**Since:** 1.4

Throws:

- `NullPointerException`: if obj is null.
- `IllegalArgumentException`: if the Format cannot format the given object, or if the Format's pattern string is invalid.

## SimpleDateFormat.parse(String, ParsePosition)

```java
public Date parse(String text, ParsePosition pos)
```

Parses text from a string to produce a `Date`.

The method attempts to parse text starting at the index given by
`pos`.
If parsing succeeds, then the index of `pos` is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
date is returned. The updated `pos` can be used to
indicate the starting point for the next call to this method.
If an error occurs, then the index of `pos` is not
changed, the error index of `pos` is set to the index of
the character where the error occurred, and null is returned.

This parsing operation uses the calendar to produce a `Date`. All of the `calendar`'s date-time fields are cleared before parsing, and the `calendar`'s default
values of the date-time fields are used for any missing
date-time information. For example, the year value of the
parsed `Date` is 1970 with `GregorianCalendar` if
no year value is given from the parsing operation.  The `TimeZone` value may be overwritten, depending on the given
pattern and the time zone value in `text`. Any `TimeZone` value that has previously been set by a call to
setTimeZone may need
to be restored for further operations.

Parameters:

- `text`: A `String`, part of which should be parsed.
- `pos`: A `ParsePosition` object with index and error index information as described above.

**Returns:** A `Date` parsed from the string. In case of
        error, returns null.

Throws:

- `NullPointerException`: if `text` or `pos` is null.

## SimpleDateFormat.toPattern()

```java
public String toPattern()
```

Returns a pattern string describing this date format.

**Returns:** a pattern string describing this date format.

## SimpleDateFormat.toLocalizedPattern()

```java
public String toLocalizedPattern()
```

Returns a localized pattern string describing this date format.

**Returns:** a localized pattern string describing this date format.

## SimpleDateFormat.applyPattern(String)

```java
public void applyPattern(String pattern)
```

Applies the given pattern string to this date format.

Parameters:

- `pattern`: the new date and time pattern for this date format

Throws:

- `NullPointerException`: if the given pattern is null
- `IllegalArgumentException`: if the given pattern is invalid

## SimpleDateFormat.applyLocalizedPattern(String)

```java
public void applyLocalizedPattern(String pattern)
```

Applies the given localized pattern string to this date format.

Parameters:

- `pattern`: a String to be mapped to the new date and time format pattern for this format

Throws:

- `NullPointerException`: if the given pattern is null
- `IllegalArgumentException`: if the given pattern is invalid

## SimpleDateFormat.getDateFormatSymbols()

```java
public DateFormatSymbols getDateFormatSymbols()
```

Gets a copy of the date and time format symbols of this date format.

**Returns:** the date and time format symbols of this date format

**See also:** #setDateFormatSymbols

## SimpleDateFormat.setDateFormatSymbols(DateFormatSymbols)

```java
public void setDateFormatSymbols(DateFormatSymbols newFormatSymbols)
```

Sets the date and time format symbols of this date format.

Parameters:

- `newFormatSymbols`: the new date and time format symbols

**See also:** #getDateFormatSymbols

Throws:

- `NullPointerException`: if the given newFormatSymbols is null

## SimpleDateFormat.clone()

```java
public Object clone()
```

Creates a copy of this `SimpleDateFormat`. This also
clones the format's date format symbols.

**Returns:** a clone of this `SimpleDateFormat`

## SimpleDateFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** This method calculates the hash code value using the value returned by
`toPattern()`.

**See also:** Object#hashCode()

## SimpleDateFormat.toString()

```java
public String toString()
```

## SimpleDateFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `SimpleDateFormat` for equality.
Returns true if the object is also a `SimpleDateFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `SimpleDateFormat`

**See also:** Object#equals(Object)
