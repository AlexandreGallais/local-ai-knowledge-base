---
title: "LongAdder class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/LongAdder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongAdder class (java.util.concurrent.atomic)

```java
public class LongAdder extends Striped64 implements Serializable
```

One or more variables that together maintain an initially zero
`long` sum.  When updates (method `add`) are contended
across threads, the set of variables may grow dynamically to reduce
contention. Method `sum` (or, equivalently, `longValue`) returns the current total combined across the
variables maintaining the sum.

This class is usually preferable to `AtomicLong` when
multiple threads update a common sum that is used for purposes such
as collecting statistics, not for fine-grained synchronization
control.  Under low update contention, the two classes have similar
characteristics. But under high contention, expected throughput of
this class is significantly higher, at the expense of higher space
consumption.

LongAdders can be used with a `java.util.concurrent.ConcurrentHashMap` to maintain a scalable
frequency map (a form of histogram or multiset). For example, to
add a count to a `ConcurrentHashMap<String,LongAdder> freqs`,
initializing if not already present, you can use `freqs.computeIfAbsent(key, k -> new LongAdder()).increment();`

This class extends `Number`, but does *not* define
methods such as `equals`, `hashCode` and `compareTo` because instances are expected to be mutated, and so are
not useful as collection keys.

**Since:** 1.8

## LongAdder.LongAdder()

```java
public LongAdder()
```

Creates a new adder with initial sum of zero.

## LongAdder.add(long)

```java
public void add(long x)
```

Adds the given value.

Parameters:

- `x`: the value to add

## LongAdder.increment()

```java
public void increment()
```

Equivalent to `add(1)`.

## LongAdder.decrement()

```java
public void decrement()
```

Equivalent to `add(-1)`.

## LongAdder.sum()

```java
public long sum()
```

Returns the current sum.  The returned value is *NOT* an
atomic snapshot; invocation in the absence of concurrent
updates returns an accurate result, but concurrent updates that
occur while the sum is being calculated might not be
incorporated.

**Returns:** the sum

## LongAdder.reset()

```java
public void reset()
```

Resets variables maintaining the sum to zero.  This method may
be a useful alternative to creating a new adder, but is only
effective if there are no concurrent updates.  Because this
method is intrinsically racy, it should only be used when it is
known that no threads are concurrently updating.

## LongAdder.sumThenReset()

```java
public long sumThenReset()
```

Equivalent in effect to `sum` followed by `reset`. This method may apply for example during quiescent
points between multithreaded computations.  If there are
updates concurrent with this method, the returned value is
*not* guaranteed to be the final value occurring before
the reset.

**Returns:** the sum

## LongAdder.toString()

```java
public String toString()
```

Returns the String representation of the `sum`.

**Returns:** the String representation of the `sum`

## LongAdder.longValue()

```java
public long longValue()
```

Equivalent to `sum`.

**Returns:** the sum

## LongAdder.intValue()

```java
public int intValue()
```

Returns the `sum` as an `int` after a narrowing
primitive conversion.

## LongAdder.floatValue()

```java
public float floatValue()
```

Returns the `sum` as a `float`
after a widening primitive conversion.

## LongAdder.doubleValue()

```java
public double doubleValue()
```

Returns the `sum` as a `double` after a widening
primitive conversion.
