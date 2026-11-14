---
title: "ValueRange class (java.time.temporal)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/temporal/ValueRange.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ValueRange class (java.time.temporal)

```java
public final class ValueRange implements Serializable
```

The range of valid values for a date-time field.

All `TemporalField` instances have a valid range of values.
For example, the ISO day-of-month runs from 1 to somewhere between 28 and 31.
This class captures that valid range.

It is important to be aware of the limitations of this class.
Only the minimum and maximum values are provided.
It is possible for there to be invalid values within the outer range.
For example, a weird field may have valid values of 1, 2, 4, 6, 7, thus
have a range of '1 - 7', despite that fact that values 3 and 5 are invalid.

Instances of this class are not tied to a specific field.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## ValueRange.of(long, long)

```java
public static ValueRange of(long min, long max)
```

Obtains a fixed value range.

This factory obtains a range where the minimum and maximum values are fixed.
For example, the ISO month-of-year always runs from 1 to 12.

Parameters:

- `min`: the minimum value
- `max`: the maximum value

**Returns:** the ValueRange for min, max, not null

Throws:

- `IllegalArgumentException`: if the minimum is greater than the maximum

## ValueRange.of(long, long, long)

```java
public static ValueRange of(long min, long maxSmallest, long maxLargest)
```

Obtains a variable value range.

This factory obtains a range where the minimum value is fixed and the maximum value may vary.
For example, the ISO day-of-month always starts at 1, but ends between 28 and 31.

Parameters:

- `min`: the minimum value
- `maxSmallest`: the smallest maximum value
- `maxLargest`: the largest maximum value

**Returns:** the ValueRange for min, smallest max, largest max, not null

Throws:

- `IllegalArgumentException`: if the minimum is greater than the smallest maximum, or the smallest maximum is greater than the largest maximum

## ValueRange.of(long, long, long, long)

```java
public static ValueRange of(long minSmallest, long minLargest, long maxSmallest, long maxLargest)
```

Obtains a fully variable value range.

This factory obtains a range where both the minimum and maximum value may vary.

Parameters:

- `minSmallest`: the smallest minimum value
- `minLargest`: the largest minimum value
- `maxSmallest`: the smallest maximum value
- `maxLargest`: the largest maximum value

**Returns:** the ValueRange for smallest min, largest min, smallest max, largest max, not null

Throws:

- `IllegalArgumentException`: if the smallest minimum is greater than the smallest maximum, or the smallest maximum is greater than the largest maximum, or the largest minimum is greater than the largest maximum, or the smallest minimum is greater than the largest minimum

## ValueRange.isFixed()

```java
public boolean isFixed()
```

Is the value range fixed and fully known.

For example, the ISO day-of-month runs from 1 to between 28 and 31.
Since there is uncertainty about the maximum value, the range is not fixed.
However, for the month of January, the range is always 1 to 31, thus it is fixed.

**Returns:** true if the set of values is fixed

## ValueRange.getMinimum()

```java
public long getMinimum()
```

Gets the minimum value that the field can take.

For example, the ISO day-of-month always starts at 1.
The minimum is therefore 1.

**Returns:** the minimum value for this field

## ValueRange.getLargestMinimum()

```java
public long getLargestMinimum()
```

Gets the largest possible minimum value that the field can take.

For example, the ISO day-of-month always starts at 1.
The largest minimum is therefore 1.

**Returns:** the largest possible minimum value for this field

## ValueRange.getSmallestMaximum()

```java
public long getSmallestMaximum()
```

Gets the smallest possible maximum value that the field can take.

For example, the ISO day-of-month runs to between 28 and 31 days.
The smallest maximum is therefore 28.

**Returns:** the smallest possible maximum value for this field

## ValueRange.getMaximum()

```java
public long getMaximum()
```

Gets the maximum value that the field can take.

For example, the ISO day-of-month runs to between 28 and 31 days.
The maximum is therefore 31.

**Returns:** the maximum value for this field

## ValueRange.isIntValue()

```java
public boolean isIntValue()
```

Checks if all values in the range fit in an `int`.

This checks that all valid values are within the bounds of an `int`.

For example, the ISO month-of-year has values from 1 to 12, which fits in an `int`.
By comparison, ISO nano-of-day runs from 1 to 86,400,000,000,000 which does not fit in an `int`.

This implementation uses `getMinimum()` and `getMaximum()`.

**Returns:** true if a valid value always fits in an `int`

## ValueRange.isValidValue(long)

```java
public boolean isValidValue(long value)
```

Checks if the value is within the valid range.

This checks that the value is within the stored range of values.

Parameters:

- `value`: the value to check

**Returns:** true if the value is valid

## ValueRange.isValidIntValue(long)

```java
public boolean isValidIntValue(long value)
```

Checks if the value is within the valid range and that all values
in the range fit in an `int`.

This method combines `isIntValue()` and `isValidValue(long)`.

Parameters:

- `value`: the value to check

**Returns:** true if the value is valid and fits in an `int`

## ValueRange.checkValidValue(long, TemporalField)

```java
public long checkValidValue(long value, TemporalField field)
```

Checks that the specified value is valid.

This validates that the value is within the valid range of values.
The field is only used to improve the error message.

Parameters:

- `value`: the value to check
- `field`: the field being checked, may be null

**Returns:** the value that was passed in

**See also:** #isValidValue(long)

## ValueRange.checkValidIntValue(long, TemporalField)

```java
public int checkValidIntValue(long value, TemporalField field)
```

Checks that the specified value is valid and fits in an `int`.

This validates that the value is within the valid range of values and that
all valid values are within the bounds of an `int`.
The field is only used to improve the error message.

Parameters:

- `value`: the value to check
- `field`: the field being checked, may be null

**Returns:** the value that was passed in

**See also:** #isValidIntValue(long)

## ValueRange.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this range is equal to another range.

The comparison is based on the four values, minimum, largest minimum,
smallest maximum and maximum.
Only objects of type `ValueRange` are compared, other types return false.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other range

## ValueRange.hashCode()

```java
public int hashCode()
```

A hash code for this range.

**Returns:** a suitable hash code

## ValueRange.toString()

```java
public String toString()
```

Outputs this range as a `String`.

The format will be '{min}/{largestMin} - {smallestMax}/{max}',
where the largestMin or smallestMax sections may be omitted, together
with associated slash, if they are the same as the min or max.

**Returns:** a string representation of this range, not null
