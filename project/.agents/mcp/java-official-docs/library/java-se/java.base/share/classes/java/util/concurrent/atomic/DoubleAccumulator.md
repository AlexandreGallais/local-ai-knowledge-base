---
title: "DoubleAccumulator class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/DoubleAccumulator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleAccumulator class (java.util.concurrent.atomic)

```java
public class DoubleAccumulator extends Striped64 implements Serializable
```

One or more variables that together maintain a running `double`
value updated using a supplied function.  When updates (method
`accumulate`) are contended across threads, the set of variables
may grow dynamically to reduce contention.  Method `get`
(or, equivalently, `doubleValue`) returns the current value
across the variables maintaining updates.

This class is usually preferable to alternatives when multiple
threads update a common value that is used for purposes such as
summary statistics that are frequently updated but less frequently
read.

The supplied accumulator function should be side-effect-free,
since it may be re-applied when attempted updates fail due to
contention among threads.  For predictable results, the accumulator
function should be commutative and associative within the floating
point tolerance required in usage contexts. The function is applied
with an existing value (or identity) as one argument, and a given
update as the other argument. For example, to maintain a running
maximum value, you could supply `Double::max` along with
`Double.NEGATIVE_INFINITY` as the identity. The order of
accumulation within or across threads is not guaranteed. Thus, this
class may not be applicable if numerical stability is required,
especially when combining values of substantially different orders
of magnitude.

Class `DoubleAdder` provides analogs of the functionality
of this class for the common special case of maintaining sums.  The
call `new DoubleAdder()` is equivalent to `new DoubleAccumulator((x, y) -> x + y, 0.0)`.

This class extends `Number`, but does *not* define
methods such as `equals`, `hashCode` and `compareTo` because instances are expected to be mutated, and so are
not useful as collection keys.

**Since:** 1.8

## DoubleAccumulator.DoubleAccumulator(DoubleBinaryOperator, double)

```java
public DoubleAccumulator(DoubleBinaryOperator accumulatorFunction, double identity)
```

Creates a new instance using the given accumulator function
and identity element.

Parameters:

- `accumulatorFunction`: a side-effect-free function of two arguments
- `identity`: identity (initial value) for the accumulator function

## DoubleAccumulator.accumulate(double)

```java
public void accumulate(double x)
```

Updates with the given value.

Parameters:

- `x`: the value

## DoubleAccumulator.get()

```java
public double get()
```

Returns the current value.  The returned value is *NOT*
an atomic snapshot; invocation in the absence of concurrent
updates returns an accurate result, but concurrent updates that
occur while the value is being calculated might not be
incorporated.

**Returns:** the current value

## DoubleAccumulator.reset()

```java
public void reset()
```

Resets variables maintaining updates to the identity value.
This method may be a useful alternative to creating a new
updater, but is only effective if there are no concurrent
updates.  Because this method is intrinsically racy, it should
only be used when it is known that no threads are concurrently
updating.

## DoubleAccumulator.getThenReset()

```java
public double getThenReset()
```

Equivalent in effect to `get` followed by `reset`. This method may apply for example during quiescent
points between multithreaded computations.  If there are
updates concurrent with this method, the returned value is
*not* guaranteed to be the final value occurring before
the reset.

**Returns:** the value before reset

## DoubleAccumulator.toString()

```java
public String toString()
```

## DoubleAccumulator.doubleValue()

```java
public double doubleValue()
```

Equivalent to `get`.

**Returns:** the current value

## DoubleAccumulator.longValue()

```java
public long longValue()
```

Returns the current value as a `long`
after a narrowing primitive conversion.

## DoubleAccumulator.intValue()

```java
public int intValue()
```

Returns the current value as an `int`
after a narrowing primitive conversion.

## DoubleAccumulator.floatValue()

```java
public float floatValue()
```

Returns the current value as a `float`
after a narrowing primitive conversion.
