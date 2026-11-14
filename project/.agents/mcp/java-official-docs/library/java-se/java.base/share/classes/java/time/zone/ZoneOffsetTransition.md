# ZoneOffsetTransition class (java.time.zone)

```java
public final class ZoneOffsetTransition implements Comparable<ZoneOffsetTransition>, Serializable
```

A transition between two offsets caused by a discontinuity in the local time-line.
<p>
A transition between two offsets is normally the result of a daylight savings cutover.
The discontinuity is normally a gap in spring and an overlap in autumn.
{@code ZoneOffsetTransition} models the transition between the two offsets.
<p>
Gaps occur where there are local date-times that simply do not exist.
An example would be when the offset changes from {@code +03:00} to {@code +04:00}.
This might be described as 'the clocks will move forward one hour tonight at 1am'.
<p>
Overlaps occur where there are local date-times that exist twice.
An example would be when the offset changes from {@code +04:00} to {@code +03:00}.
This might be described as 'the clocks will move back one hour tonight at 2am'.

@implSpec
This class is immutable and thread-safe.

@since 1.8

## ZoneOffsetTransition.of(LocalDateTime, ZoneOffset, ZoneOffset)

```java
public static ZoneOffsetTransition of(LocalDateTime transition, ZoneOffset offsetBefore, ZoneOffset offsetAfter)
```

Obtains an instance defining a transition between two offsets.
<p>
Applications should normally obtain an instance from {@link ZoneRules}.
This factory is only intended for use when creating {@link ZoneRules}.

@param transition  the transition date-time at the transition, which never
 actually occurs, expressed local to the before offset, not null
@param offsetBefore  the offset before the transition, not null
@param offsetAfter  the offset at and after the transition, not null
@return the transition, not null
@throws IllegalArgumentException if {@code offsetBefore} and {@code offsetAfter}
        are equal, or {@code transition.getNano()} returns non-zero value

## ZoneOffsetTransition.getInstant()

```java
public Instant getInstant()
```

Gets the transition instant.
<p>
This is the instant of the discontinuity, which is defined as the first
instant that the 'after' offset applies.
<p>
The methods {@link #getInstant()}, {@link #getDateTimeBefore()} and {@link #getDateTimeAfter()}
all represent the same instant.

@return the transition instant, not null

## ZoneOffsetTransition.toEpochSecond()

```java
public long toEpochSecond()
```

Gets the transition instant as an epoch second.

@return the transition epoch second

## ZoneOffsetTransition.getDateTimeBefore()

```java
public LocalDateTime getDateTimeBefore()
```

Gets the local transition date-time, as would be expressed with the 'before' offset.
<p>
This is the date-time where the discontinuity begins expressed with the 'before' offset.
At this instant, the 'after' offset is actually used, therefore the combination of this
date-time and the 'before' offset will never occur.
<p>
The combination of the 'before' date-time and offset represents the same instant
as the 'after' date-time and offset.

@return the transition date-time expressed with the before offset, not null

## ZoneOffsetTransition.getDateTimeAfter()

```java
public LocalDateTime getDateTimeAfter()
```

Gets the local transition date-time, as would be expressed with the 'after' offset.
<p>
This is the first date-time after the discontinuity, when the new offset applies.
<p>
The combination of the 'before' date-time and offset represents the same instant
as the 'after' date-time and offset.

@return the transition date-time expressed with the after offset, not null

## ZoneOffsetTransition.getOffsetBefore()

```java
public ZoneOffset getOffsetBefore()
```

Gets the offset before the transition.
<p>
This is the offset in use before the instant of the transition.

@return the offset before the transition, not null

## ZoneOffsetTransition.getOffsetAfter()

```java
public ZoneOffset getOffsetAfter()
```

Gets the offset after the transition.
<p>
This is the offset in use on and after the instant of the transition.

@return the offset after the transition, not null

## ZoneOffsetTransition.getDuration()

```java
public Duration getDuration()
```

Gets the duration of the transition.
<p>
In most cases, the transition duration is one hour, however this is not always the case.
The duration will be positive for a gap and negative for an overlap.
Time-zones are second-based, so the nanosecond part of the duration will be zero.

@return the duration of the transition, positive for gaps, negative for overlaps

## ZoneOffsetTransition.isGap()

```java
public boolean isGap()
```

Does this transition represent a gap in the local time-line.
<p>
Gaps occur where there are local date-times that simply do not exist.
An example would be when the offset changes from {@code +01:00} to {@code +02:00}.
This might be described as 'the clocks will move forward one hour tonight at 1am'.

@return true if this transition is a gap, false if it is an overlap

## ZoneOffsetTransition.isOverlap()

```java
public boolean isOverlap()
```

Does this transition represent an overlap in the local time-line.
<p>
Overlaps occur where there are local date-times that exist twice.
An example would be when the offset changes from {@code +02:00} to {@code +01:00}.
This might be described as 'the clocks will move back one hour tonight at 2am'.

@return true if this transition is an overlap, false if it is a gap

## ZoneOffsetTransition.isValidOffset(ZoneOffset)

```java
public boolean isValidOffset(ZoneOffset offset)
```

Checks if the specified offset is valid during this transition.
<p>
This checks to see if the given offset will be valid at some point in the transition.
A gap will always return false.
An overlap will return true if the offset is either the before or after offset.

@param offset  the offset to check, null returns false
@return true if the offset is valid during the transition

## ZoneOffsetTransition.compareTo(ZoneOffsetTransition)

```java
public int compareTo(ZoneOffsetTransition otherTransition)
```

Compares this transition to another based on the transition instant.
<p>
This compares the instants of each transition.
The offsets are ignored, making this order inconsistent with equals.

@param otherTransition  the transition to compare to, not null
@return the comparator value, that is the comparison of this transition instant
         with {@code otherTransition} instant

## ZoneOffsetTransition.equals(Object)

```java
public boolean equals(Object other)
```

Checks if this object equals another.
<p>
The entire state of the object is compared.

@param other  the other object to compare to, null returns false
@return true if equal

## ZoneOffsetTransition.hashCode()

```java
public int hashCode()
```

Returns a suitable hash code.

@return the hash code

## ZoneOffsetTransition.toString()

```java
public String toString()
```

Returns a string describing this object.

@return a string for debugging, not null