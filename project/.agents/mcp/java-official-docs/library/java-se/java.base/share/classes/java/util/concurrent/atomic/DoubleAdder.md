---
title: "DoubleAdder class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/DoubleAdder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleAdder class (java.util.concurrent.atomic)

```java
public class DoubleAdder extends Striped64 implements Serializable
```

One or more variables that together maintain an initially zero
`double` sum.  When updates (method `add`) are
contended across threads, the set of variables may grow dynamically
to reduce contention.  Method `sum` (or, equivalently `doubleValue`) returns the current total combined across the
variables maintaining the sum. The order of accumulation within or
across threads is not guaranteed. Thus, this class may not be
applicable if numerical stability is required, especially when
combining values of substantially different orders of magnitude.

This class is usually preferable to alternatives when multiple
threads update a common value that is used for purposes such as
summary statistics that are frequently updated but less frequently
read.

This class extends `Number`, but does *not* define
methods such as `equals`, `hashCode` and `compareTo` because instances are expected to be mutated, and so are
not useful as collection keys.

**Since:** 1.8

## DoubleAdder.DoubleAdder()

```java
public DoubleAdder()
```

Creates a new adder with initial sum of zero.

## DoubleAdder.add(double)

```java
public void add(double x)
```

Adds the given value.

Parameters:

- `x`: the value to add

## DoubleAdder.sum()

```java
public double sum()
```

Returns the current sum.  The returned value is *NOT* an
atomic snapshot; invocation in the absence of concurrent
updates returns an accurate result, but concurrent updates that
occur while the sum is being calculated might not be
incorporated.  Also, because floating-point arithmetic is not
strictly associative, the returned result need not be identical
to the value that would be obtained in a sequential series of
updates to a single variable.

**Returns:** the sum

## DoubleAdder.reset()

```java
public void reset()
```

Resets variables maintaining the sum to zero.  This method may
be a useful alternative to creating a new adder, but is only
effective if there are no concurrent updates.  Because this
method is intrinsically racy, it should only be used when it is
known that no threads are concurrently updating.

## DoubleAdder.sumThenReset()

```java
public double sumThenReset()
```

Equivalent in effect to `sum` followed by `reset`. This method may apply for example during quiescent
points between multithreaded computations.  If there are
updates concurrent with this method, the returned value is
*not* guaranteed to be the final value occurring before
the reset.

**Returns:** the sum

## DoubleAdder.toString()

```java
public String toString()
```

Returns the String representation of the `sum`.

**Returns:** the String representation of the `sum`

## DoubleAdder.doubleValue()

```java
public double doubleValue()
```

Equivalent to `sum`.

**Returns:** the sum

## DoubleAdder.longValue()

```java
public long longValue()
```

Returns the `sum` as a `long` after a
narrowing primitive conversion.

## DoubleAdder.intValue()

```java
public int intValue()
```

Returns the `sum` as an `int` after a
narrowing primitive conversion.

## DoubleAdder.floatValue()

```java
public float floatValue()
```

Returns the `sum` as a `float`
after a narrowing primitive conversion.
