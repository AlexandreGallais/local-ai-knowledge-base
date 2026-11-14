---
title: "LongAccumulator class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/LongAccumulator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongAccumulator class (java.util.concurrent.atomic)

```java
public class LongAccumulator extends Striped64 implements Serializable
```

One or more variables that together maintain a running `long`
value updated using a supplied function.  When updates (method
`accumulate`) are contended across threads, the set of variables
may grow dynamically to reduce contention.  Method `get`
(or, equivalently, `longValue`) returns the current value
across the variables maintaining updates.

This class is usually preferable to `AtomicLong` when
multiple threads update a common value that is used for purposes such
as collecting statistics, not for fine-grained synchronization
control.  Under low update contention, the two classes have similar
characteristics. But under high contention, expected throughput of
this class is significantly higher, at the expense of higher space
consumption.

The order of accumulation within or across threads is not
guaranteed and cannot be depended upon, so this class is only
applicable to functions for which the order of accumulation does
not matter. The supplied accumulator function should be
side-effect-free, since it may be re-applied when attempted updates
fail due to contention among threads. For predictable results, the
accumulator function should be associative and commutative. The
function is applied with an existing value (or identity) as one
argument, and a given update as the other argument.  For example,
to maintain a running maximum value, you could supply `Long::max` along with `Long.MIN_VALUE` as the identity.

Class `LongAdder` provides analogs of the functionality of
this class for the common special case of maintaining counts and
sums.  The call `new LongAdder()` is equivalent to `new LongAccumulator((x, y) -> x + y, 0L)`.

This class extends `Number`, but does *not* define
methods such as `equals`, `hashCode` and `compareTo` because instances are expected to be mutated, and so are
not useful as collection keys.

**Since:** 1.8

## LongAccumulator.LongAccumulator(LongBinaryOperator, long)

```java
public LongAccumulator(LongBinaryOperator accumulatorFunction, long identity)
```

Creates a new instance using the given accumulator function
and identity element.

Parameters:

- `accumulatorFunction`: a side-effect-free function of two arguments
- `identity`: identity (initial value) for the accumulator function

## LongAccumulator.accumulate(long)

```java
public void accumulate(long x)
```

Updates with the given value.

Parameters:

- `x`: the value

## LongAccumulator.get()

```java
public long get()
```

Returns the current value.  The returned value is *NOT*
an atomic snapshot; invocation in the absence of concurrent
updates returns an accurate result, but concurrent updates that
occur while the value is being calculated might not be
incorporated.

**Returns:** the current value

## LongAccumulator.reset()

```java
public void reset()
```

Resets variables maintaining updates to the identity value.
This method may be a useful alternative to creating a new
updater, but is only effective if there are no concurrent
updates.  Because this method is intrinsically racy, it should
only be used when it is known that no threads are concurrently
updating.

## LongAccumulator.getThenReset()

```java
public long getThenReset()
```

Equivalent in effect to `get` followed by `reset`. This method may apply for example during quiescent
points between multithreaded computations.  If there are
updates concurrent with this method, the returned value is
*not* guaranteed to be the final value occurring before
the reset.

**Returns:** the value before reset

## LongAccumulator.toString()

```java
public String toString()
```

## LongAccumulator.longValue()

```java
public long longValue()
```

Equivalent to `get`.

**Returns:** the current value

## LongAccumulator.intValue()

```java
public int intValue()
```

Returns the current value as an `int`
after a narrowing primitive conversion.

## LongAccumulator.floatValue()

```java
public float floatValue()
```

Returns the current value as a `float`
after a widening primitive conversion.

## LongAccumulator.doubleValue()

```java
public double doubleValue()
```

Returns the current value as a `double`
after a widening primitive conversion.
