---
title: "AtomicInteger class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicInteger.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicInteger class (java.util.concurrent.atomic)

```java
public class AtomicInteger extends Number implements java.io.Serializable
```

An `int` value that may be updated atomically.  See the
`VarHandle` specification for descriptions of the properties
of atomic accesses. An `AtomicInteger` is used in
applications such as atomically incremented counters, and cannot be
used as a replacement for an `java.lang.Integer`. However,
this class does extend `Number` to allow uniform access by
tools and utilities that deal with numerically-based classes.

**Since:** 1.5

## AtomicInteger.AtomicInteger(int)

```java
public AtomicInteger(int initialValue)
```

Creates a new AtomicInteger with the given initial value.

Parameters:

- `initialValue`: the initial value

## AtomicInteger.AtomicInteger()

```java
public AtomicInteger()
```

Creates a new AtomicInteger with initial value `0`.

## AtomicInteger.get()

```java
public final int get()
```

Returns the current value,
with memory effects as specified by `VarHandle.getVolatile`.

**Returns:** the current value

## AtomicInteger.set(int)

```java
public final void set(int newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `newValue`: the new value

## AtomicInteger.lazySet(int)

```java
public final void lazySet(int newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 1.6

## AtomicInteger.getAndSet(int)

```java
public final int getAndSet(int newValue)
```

Atomically sets the value to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `newValue`: the new value

**Returns:** the previous value

## AtomicInteger.compareAndSet(int, int)

```java
public final boolean compareAndSet(int expectedValue, int newValue)
```

Atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.compareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicInteger.weakCompareAndSet(int, int)

```java
public final boolean weakCompareAndSet(int expectedValue, int newValue)
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

## AtomicInteger.weakCompareAndSetPlain(int, int)

```java
public final boolean weakCompareAndSetPlain(int expectedValue, int newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicInteger.getAndIncrement()

```java
public final int getAndIncrement()
```

Atomically increments the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(1)`.

**Returns:** the previous value

## AtomicInteger.getAndDecrement()

```java
public final int getAndDecrement()
```

Atomically decrements the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(-1)`.

**Returns:** the previous value

## AtomicInteger.getAndAdd(int)

```java
public final int getAndAdd(int delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `delta`: the value to add

**Returns:** the previous value

## AtomicInteger.incrementAndGet()

```java
public final int incrementAndGet()
```

Atomically increments the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(1)`.

**Returns:** the updated value

## AtomicInteger.decrementAndGet()

```java
public final int decrementAndGet()
```

Atomically decrements the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(-1)`.

**Returns:** the updated value

## AtomicInteger.addAndGet(int)

```java
public final int addAndGet(int delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `delta`: the value to add

**Returns:** the updated value

## AtomicInteger.getAndUpdate(IntUnaryOperator)

```java
public final int getAndUpdate(IntUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function, returning the previous value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

Parameters:

- `updateFunction`: a side-effect-free function

**Returns:** the previous value

**Since:** 1.8

## AtomicInteger.updateAndGet(IntUnaryOperator)

```java
public final int updateAndGet(IntUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function, returning the updated value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

Parameters:

- `updateFunction`: a side-effect-free function

**Returns:** the updated value

**Since:** 1.8

## AtomicInteger.getAndAccumulate(int, IntBinaryOperator)

```java
public final int getAndAccumulate(int x, IntBinaryOperator accumulatorFunction)
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

## AtomicInteger.accumulateAndGet(int, IntBinaryOperator)

```java
public final int accumulateAndGet(int x, IntBinaryOperator accumulatorFunction)
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

## AtomicInteger.toString()

```java
public String toString()
```

## AtomicInteger.intValue()

```java
public int intValue()
```

Returns the current value of this `AtomicInteger` as an
`int`,
with memory effects as specified by `VarHandle.getVolatile`.

Equivalent to `get()`.

## AtomicInteger.longValue()

```java
public long longValue()
```

Returns the current value of this `AtomicInteger` as a
`long` after a widening primitive conversion,
with memory effects as specified by `VarHandle.getVolatile`.

**JLS:** 5.1.2 Widening Primitive Conversion

## AtomicInteger.floatValue()

```java
public float floatValue()
```

Returns the current value of this `AtomicInteger` as a
`float` after a widening primitive conversion,
with memory effects as specified by `VarHandle.getVolatile`.

**JLS:** 5.1.2 Widening Primitive Conversion

## AtomicInteger.doubleValue()

```java
public double doubleValue()
```

Returns the current value of this `AtomicInteger` as a
`double` after a widening primitive conversion,
with memory effects as specified by `VarHandle.getVolatile`.

**JLS:** 5.1.2 Widening Primitive Conversion

## AtomicInteger.getPlain()

```java
public final int getPlain()
```

Returns the current value, with memory semantics of reading as
if the variable was declared non-`volatile`.

**Returns:** the value

**Since:** 9

## AtomicInteger.setPlain(int)

```java
public final void setPlain(int newValue)
```

Sets the value to `newValue`, with memory semantics
of setting as if the variable was declared non-`volatile`
and non-`final`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicInteger.getOpaque()

```java
public final int getOpaque()
```

Returns the current value,
with memory effects as specified by `VarHandle.getOpaque`.

**Returns:** the value

**Since:** 9

## AtomicInteger.setOpaque(int)

```java
public final void setOpaque(int newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicInteger.getAcquire()

```java
public final int getAcquire()
```

Returns the current value,
with memory effects as specified by `VarHandle.getAcquire`.

**Returns:** the value

**Since:** 9

## AtomicInteger.setRelease(int)

```java
public final void setRelease(int newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicInteger.compareAndExchange(int, int)

```java
public final int compareAndExchange(int expectedValue, int newValue)
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

## AtomicInteger.compareAndExchangeAcquire(int, int)

```java
public final int compareAndExchangeAcquire(int expectedValue, int newValue)
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

## AtomicInteger.compareAndExchangeRelease(int, int)

```java
public final int compareAndExchangeRelease(int expectedValue, int newValue)
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

## AtomicInteger.weakCompareAndSetVolatile(int, int)

```java
public final boolean weakCompareAndSetVolatile(int expectedValue, int newValue)
```

Possibly atomically sets the value to `newValue` if
the current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicInteger.weakCompareAndSetAcquire(int, int)

```java
public final boolean weakCompareAndSetAcquire(int expectedValue, int newValue)
```

Possibly atomically sets the value to `newValue` if
the current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetAcquire`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicInteger.weakCompareAndSetRelease(int, int)

```java
public final boolean weakCompareAndSetRelease(int expectedValue, int newValue)
```

Possibly atomically sets the value to `newValue` if
the current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetRelease`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9
