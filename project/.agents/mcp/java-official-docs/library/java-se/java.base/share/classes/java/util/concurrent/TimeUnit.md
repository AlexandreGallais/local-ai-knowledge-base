---
title: "TimeUnit enum (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/TimeUnit.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TimeUnit enum (java.util.concurrent)

```java
public enum TimeUnit
```

A `TimeUnit` represents time durations at a given unit of
granularity and provides utility methods to convert across units,
and to perform timing and delay operations in these units.  A
`TimeUnit` does not maintain time information, but only
helps organize and use time representations that may be maintained
separately across various contexts.  A nanosecond is defined as one
thousandth of a microsecond, a microsecond as one thousandth of a
millisecond, a millisecond as one thousandth of a second, a minute
as sixty seconds, an hour as sixty minutes, and a day as twenty four
hours.

A `TimeUnit` is mainly used to inform time-based methods
how a given timing parameter should be interpreted. For example,
the following code will timeout in 50 milliseconds if the lock is not available:

```java
Lock lock = ...;
if (lock.tryLock(50L, TimeUnit.MILLISECONDS)) ...
```

while this code will timeout in 50 seconds:

```java
Lock lock = ...;
if (lock.tryLock(50L, TimeUnit.SECONDS)) ...
```

Note however, that there is no guarantee that a particular timeout
implementation will be able to notice the passage of time at the
same granularity as the given `TimeUnit`.

**Since:** 1.5

## TimeUnit.convert(long, TimeUnit)

```java
public long convert(long sourceDuration, TimeUnit sourceUnit)
```

Converts the given time duration in the given unit to this unit.
Conversions from finer to coarser granularities truncate, so
lose precision. For example, converting `999` milliseconds
to seconds results in `0`. Conversions from coarser to
finer granularities with arguments that would numerically
overflow saturate to `Long.MIN_VALUE` if negative or
`Long.MAX_VALUE` if positive.

For example, to convert 10 minutes to milliseconds, use:
`TimeUnit.MILLISECONDS.convert(10L, TimeUnit.MINUTES)`

Parameters:

- `sourceDuration`: the time duration in the given `sourceUnit`
- `sourceUnit`: the unit of the `sourceDuration` argument

**Returns:** the converted duration in this unit,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

## TimeUnit.convert(Duration)

```java
public long convert(Duration duration)
```

Converts the given time duration to this unit.

For any TimeUnit `unit`,
`unit.convert(Duration.ofNanos(n))`
is equivalent to
`unit.convert(n, NANOSECONDS)`, and
`unit.convert(Duration.of(n, unit.toChronoUnit()))`
is equivalent to `n` (in the absence of overflow).

Parameters:

- `duration`: the time duration

**API note:** This method differs from `Duration.toNanos()` in that it
does not throw `ArithmeticException` on numeric overflow.

**Returns:** the converted duration in this unit,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

**See also:** Duration#of(long,TemporalUnit)

**Since:** 11

Throws:

- `NullPointerException`: if `duration` is null

## TimeUnit.toNanos(long)

```java
public long toNanos(long duration)
```

Equivalent to
TimeUnit) NANOSECONDS.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

## TimeUnit.toMicros(long)

```java
public long toMicros(long duration)
```

Equivalent to
TimeUnit) MICROSECONDS.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

## TimeUnit.toMillis(long)

```java
public long toMillis(long duration)
```

Equivalent to
TimeUnit) MILLISECONDS.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

## TimeUnit.toSeconds(long)

```java
public long toSeconds(long duration)
```

Equivalent to
TimeUnit) SECONDS.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

## TimeUnit.toMinutes(long)

```java
public long toMinutes(long duration)
```

Equivalent to
TimeUnit) MINUTES.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

**Since:** 1.6

## TimeUnit.toHours(long)

```java
public long toHours(long duration)
```

Equivalent to
TimeUnit) HOURS.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration,
or `Long.MIN_VALUE` if conversion would negatively overflow,
or `Long.MAX_VALUE` if it would positively overflow.

**Since:** 1.6

## TimeUnit.toDays(long)

```java
public long toDays(long duration)
```

Equivalent to
TimeUnit) DAYS.convert(duration, this).

Parameters:

- `duration`: the duration

**Returns:** the converted duration

**Since:** 1.6

## TimeUnit.timedWait(Object, long)

```java
public void timedWait(Object obj, long timeout) throws InterruptedException
```

Performs a timed int) Object.wait
using this time unit.
This is a convenience method that converts timeout arguments
into the form required by the `Object.wait` method.

For example, you could implement a blocking `poll` method
(see TimeUnit) BlockingQueue.poll)
using:

```java
public E poll(long timeout, TimeUnit unit)
    throws InterruptedException {
  synchronized (lock) {
    while (isEmpty()) {
      unit.timedWait(lock, timeout);
      ...
    }
  }
}
```

Parameters:

- `obj`: the object to wait on
- `timeout`: the maximum time to wait. If less than or equal to zero, do not wait at all.

Throws:

- `InterruptedException`: if interrupted while waiting

## TimeUnit.timedJoin(Thread, long)

```java
public void timedJoin(Thread thread, long timeout) throws InterruptedException
```

Performs a timed int) Thread.join
using this time unit.
This is a convenience method that converts time arguments into the
form required by the `Thread.join` method.

Parameters:

- `thread`: the thread to wait for
- `timeout`: the maximum time to wait. If less than or equal to zero, do not wait at all.

Throws:

- `InterruptedException`: if interrupted while waiting

## TimeUnit.sleep(long)

```java
public void sleep(long timeout) throws InterruptedException
```

Performs a int) Thread.sleep using
this time unit.
This is a convenience method that converts time arguments into the
form required by the `Thread.sleep` method.

Parameters:

- `timeout`: the minimum time to sleep. If less than or equal to zero, do not sleep at all.

Throws:

- `InterruptedException`: if interrupted while sleeping

## TimeUnit.toChronoUnit()

```java
public ChronoUnit toChronoUnit()
```

Converts this `TimeUnit` to the equivalent `ChronoUnit`.

**Returns:** the converted equivalent ChronoUnit

**Since:** 9

## TimeUnit.of(ChronoUnit)

```java
public static TimeUnit of(ChronoUnit chronoUnit)
```

Converts a `ChronoUnit` to the equivalent `TimeUnit`.

Parameters:

- `chronoUnit`: the ChronoUnit to convert

**Returns:** the converted equivalent TimeUnit

**Since:** 9

Throws:

- `IllegalArgumentException`: if `chronoUnit` has no equivalent TimeUnit
- `NullPointerException`: if `chronoUnit` is null
