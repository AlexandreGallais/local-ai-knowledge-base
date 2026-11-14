---
title: "AtomicLong class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicLong.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicLong class (java.util.concurrent.atomic)

```java
public class AtomicLong extends Number implements java.io.Serializable
```

A `long` value that may be updated atomically.  See the
`VarHandle` specification for descriptions of the properties
of atomic accesses. An `AtomicLong` is used in applications
such as atomically incremented sequence numbers, and cannot be used
as a replacement for a `java.lang.Long`. However, this class
does extend `Number` to allow uniform access by tools and
utilities that deal with numerically-based classes.

**Since:** 1.5

## AtomicLong.AtomicLong(long)

```java
public AtomicLong(long initialValue)
```

Creates a new AtomicLong with the given initial value.

Parameters:

- `initialValue`: the initial value

## AtomicLong.AtomicLong()

```java
public AtomicLong()
```

Creates a new AtomicLong with initial value `0`.

## AtomicLong.get()

```java
public final long get()
```

Returns the current value,
with memory effects as specified by `VarHandle.getVolatile`.

**Returns:** the current value

## AtomicLong.set(long)

```java
public final void set(long newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `newValue`: the new value

## AtomicLong.lazySet(long)

```java
public final void lazySet(long newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 1.6

## AtomicLong.getAndSet(long)

```java
public final long getAndSet(long newValue)
```

Atomically sets the value to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `newValue`: the new value

**Returns:** the previous value

## AtomicLong.compareAndSet(long, long)

```java
public final boolean compareAndSet(long expectedValue, long newValue)
```

Atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.compareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicLong.weakCompareAndSet(long, long)

```java
public final boolean weakCompareAndSet(long expectedValue, long newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Deprecated:** This method has plain memory effects but the method
name implies volatile memory effects (see methods such as
`compareAndExchange` and `compareAndSet`).  To avoid
confusion over plain or volatile memory effects it is recommended that
the method `weakCompareAndSetPlain` be used instead.

**Returns:** `true` if successful

**See also:** #weakCompareAndSetPlain

## AtomicLong.weakCompareAndSetPlain(long, long)

```java
public final boolean weakCompareAndSetPlain(long expectedValue, long newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicLong.getAndIncrement()

```java
public final long getAndIncrement()
```

Atomically increments the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(1)`.

**Returns:** the previous value

## AtomicLong.getAndDecrement()

```java
public final long getAndDecrement()
```

Atomically decrements the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(-1)`.

**Returns:** the previous value

## AtomicLong.getAndAdd(long)

```java
public final long getAndAdd(long delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `delta`: the value to add

**Returns:** the previous value

## AtomicLong.incrementAndGet()

```java
public final long incrementAndGet()
```

Atomically increments the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(1)`.

**Returns:** the updated value

## AtomicLong.decrementAndGet()

```java
public final long decrementAndGet()
```

Atomically decrements the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(-1)`.

**Returns:** the updated value

## AtomicLong.addAndGet(long)

```java
public final long addAndGet(long delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `delta`: the value to add

**Returns:** the updated value

## AtomicLong.getAndUpdate(LongUnaryOperator)

```java
public final long getAndUpdate(LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function, returning the previous value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

Parameters:

- `updateFunction`: a side-effect-free function

**Returns:** the previous value

**Since:** 1.8

## AtomicLong.updateAndGet(LongUnaryOperator)

```java
public final long updateAndGet(LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function, returning the updated value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

Parameters:

- `updateFunction`: a side-effect-free function

**Returns:** the updated value

**Since:** 1.8

## AtomicLong.getAndAccumulate(long, LongBinaryOperator)

```java
public final long getAndAccumulate(long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function to the current and given values,
returning the previous value. The function should be
side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value as its first argument, and the
given update as the second argument.

Parameters:

- `x`: the update value
- `accumulatorFunction`: a side-effect-free function of two arguments

**Returns:** the previous value

**Since:** 1.8

## AtomicLong.accumulateAndGet(long, LongBinaryOperator)

```java
public final long accumulateAndGet(long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function to the current and given values,
returning the updated value. The function should be
side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value as its first argument, and the
given update as the second argument.

Parameters:

- `x`: the update value
- `accumulatorFunction`: a side-effect-free function of two arguments

**Returns:** the updated value

**Since:** 1.8

## AtomicLong.toString()

```java
public String toString()
```

## AtomicLong.intValue()

```java
public int intValue()
```

Returns the current value of this `AtomicLong` as an `int`
after a narrowing primitive conversion,
with memory effects as specified by `VarHandle.getVolatile`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## AtomicLong.longValue()

```java
public long longValue()
```

Returns the current value of this `AtomicLong` as a `long`,
with memory effects as specified by `VarHandle.getVolatile`.
Equivalent to `get()`.

## AtomicLong.floatValue()

```java
public float floatValue()
```

Returns the current value of this `AtomicLong` as a `float`
after a widening primitive conversion,
with memory effects as specified by `VarHandle.getVolatile`.

**JLS:** 5.1.2 Widening Primitive Conversion

## AtomicLong.doubleValue()

```java
public double doubleValue()
```

Returns the current value of this `AtomicLong` as a `double`
after a widening primitive conversion,
with memory effects as specified by `VarHandle.getVolatile`.

**JLS:** 5.1.2 Widening Primitive Conversion

## AtomicLong.getPlain()

```java
public final long getPlain()
```

Returns the current value, with memory semantics of reading as if the
variable was declared non-`volatile`.

**Returns:** the value

**Since:** 9

## AtomicLong.setPlain(long)

```java
public final void setPlain(long newValue)
```

Sets the value to `newValue`, with memory semantics
of setting as if the variable was declared non-`volatile`
and non-`final`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicLong.getOpaque()

```java
public final long getOpaque()
```

Returns the current value,
with memory effects as specified by `VarHandle.getOpaque`.

**Returns:** the value

**Since:** 9

## AtomicLong.setOpaque(long)

```java
public final void setOpaque(long newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicLong.getAcquire()

```java
public final long getAcquire()
```

Returns the current value,
with memory effects as specified by `VarHandle.getAcquire`.

**Returns:** the value

**Since:** 9

## AtomicLong.setRelease(long)

```java
public final void setRelease(long newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicLong.compareAndExchange(long, long)

```java
public final long compareAndExchange(long expectedValue, long newValue)
```

Atomically sets the value to `newValue` if the current value,
referred to as the *witness value*, `== expectedValue`,
with memory effects as specified by
`VarHandle.compareAndExchange`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** the *witness value*, which will be the same as the
expected value if successful

**Since:** 9

## AtomicLong.compareAndExchangeAcquire(long, long)

```java
public final long compareAndExchangeAcquire(long expectedValue, long newValue)
```

Atomically sets the value to `newValue` if the current value,
referred to as the *witness value*, `== expectedValue`,
with memory effects as specified by
`VarHandle.compareAndExchangeAcquire`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** the *witness value*, which will be the same as the
expected value if successful

**Since:** 9

## AtomicLong.compareAndExchangeRelease(long, long)

```java
public final long compareAndExchangeRelease(long expectedValue, long newValue)
```

Atomically sets the value to `newValue` if the current value,
referred to as the *witness value*, `== expectedValue`,
with memory effects as specified by
`VarHandle.compareAndExchangeRelease`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** the *witness value*, which will be the same as the
expected value if successful

**Since:** 9

## AtomicLong.weakCompareAndSetVolatile(long, long)

```java
public final boolean weakCompareAndSetVolatile(long expectedValue, long newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicLong.weakCompareAndSetAcquire(long, long)

```java
public final boolean weakCompareAndSetAcquire(long expectedValue, long newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetAcquire`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicLong.weakCompareAndSetRelease(long, long)

```java
public final boolean weakCompareAndSetRelease(long expectedValue, long newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetRelease`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9
