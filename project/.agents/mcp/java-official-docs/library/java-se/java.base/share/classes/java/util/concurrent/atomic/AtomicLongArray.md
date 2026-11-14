---
title: "AtomicLongArray class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicLongArray.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicLongArray class (java.util.concurrent.atomic)

```java
public class AtomicLongArray implements java.io.Serializable
```

A `long` array in which elements may be updated atomically.
See the `VarHandle` specification for descriptions of the
properties of atomic accesses.

**Since:** 1.5

## AtomicLongArray.AtomicLongArray(int)

```java
public AtomicLongArray(int length)
```

Creates a new AtomicLongArray of the given length, with all
elements initially zero.

Parameters:

- `length`: the length of the array

## AtomicLongArray.AtomicLongArray(long[])

```java
public AtomicLongArray(long[] array)
```

Creates a new AtomicLongArray with the same length as, and
all elements copied from, the given array.

Parameters:

- `array`: the array to copy elements from

Throws:

- `NullPointerException`: if array is null

## AtomicLongArray.length()

```java
public final int length()
```

Returns the length of the array.

**Returns:** the length of the array

## AtomicLongArray.get(int)

```java
public final long get(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getVolatile`.

Parameters:

- `i`: the index

**Returns:** the current value

## AtomicLongArray.set(int, long)

```java
public final void set(int i, long newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `i`: the index
- `newValue`: the new value

## AtomicLongArray.lazySet(int, long)

```java
public final void lazySet(int i, long newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 1.6

## AtomicLongArray.getAndSet(int, long)

```java
public final long getAndSet(int i, long newValue)
```

Atomically sets the element at index `i` to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Returns:** the previous value

## AtomicLongArray.compareAndSet(int, long, long)

```java
public final boolean compareAndSet(int i, long expectedValue, long newValue)
```

Atomically sets the element at index `i` to `newValue`
if the element's current value `== expectedValue`,
with memory effects as specified by `VarHandle.compareAndSet`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicLongArray.weakCompareAndSet(int, long, long)

```java
public final boolean weakCompareAndSet(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index `i` to
`newValue` if the element's current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Deprecated:** This method has plain memory effects but the method
name implies volatile memory effects (see methods such as
`compareAndExchange` and `compareAndSet`).  To avoid
confusion over plain or volatile memory effects it is recommended that
the method `weakCompareAndSetPlain` be used instead.

**Returns:** `true` if successful

**See also:** #weakCompareAndSetPlain

## AtomicLongArray.weakCompareAndSetPlain(int, long, long)

```java
public final boolean weakCompareAndSetPlain(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index `i` to
`newValue` if the element's current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicLongArray.getAndIncrement(int)

```java
public final long getAndIncrement(int i)
```

Atomically increments the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(i, 1)`.

Parameters:

- `i`: the index

**Returns:** the previous value

## AtomicLongArray.getAndDecrement(int)

```java
public final long getAndDecrement(int i)
```

Atomically decrements the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(i, -1)`.

Parameters:

- `i`: the index

**Returns:** the previous value

## AtomicLongArray.getAndAdd(int, long)

```java
public final long getAndAdd(int i, long delta)
```

Atomically adds the given value to the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `i`: the index
- `delta`: the value to add

**Returns:** the previous value

## AtomicLongArray.incrementAndGet(int)

```java
public final long incrementAndGet(int i)
```

Atomically increments the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(i, 1)`.

Parameters:

- `i`: the index

**Returns:** the updated value

## AtomicLongArray.decrementAndGet(int)

```java
public final long decrementAndGet(int i)
```

Atomically decrements the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(i, -1)`.

Parameters:

- `i`: the index

**Returns:** the updated value

## AtomicLongArray.addAndGet(int, long)

```java
public long addAndGet(int i, long delta)
```

Atomically adds the given value to the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `i`: the index
- `delta`: the value to add

**Returns:** the updated value

## AtomicLongArray.getAndUpdate(int, LongUnaryOperator)

```java
public final long getAndUpdate(int i, LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the element at index `i` with
the results of applying the given function, returning the
previous value. The function should be side-effect-free, since
it may be re-applied when attempted updates fail due to
contention among threads.

Parameters:

- `i`: the index
- `updateFunction`: a side-effect-free function

**Returns:** the previous value

**Since:** 1.8

## AtomicLongArray.updateAndGet(int, LongUnaryOperator)

```java
public final long updateAndGet(int i, LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the element at index `i` with
the results of applying the given function, returning the
updated value. The function should be side-effect-free, since it
may be re-applied when attempted updates fail due to contention
among threads.

Parameters:

- `i`: the index
- `updateFunction`: a side-effect-free function

**Returns:** the updated value

**Since:** 1.8

## AtomicLongArray.getAndAccumulate(int, long, LongBinaryOperator)

```java
public final long getAndAccumulate(int i, long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the element at index `i` with
the results of applying the given function to the current and
given values, returning the previous value. The function should
be side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value of the element at index `i`
as its first argument, and the given update as the second
argument.

Parameters:

- `i`: the index
- `x`: the update value
- `accumulatorFunction`: a side-effect-free function of two arguments

**Returns:** the previous value

**Since:** 1.8

## AtomicLongArray.accumulateAndGet(int, long, LongBinaryOperator)

```java
public final long accumulateAndGet(int i, long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the element at index `i` with
the results of applying the given function to the current and
given values, returning the updated value. The function should
be side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value of the element at index `i`
as its first argument, and the given update as the second
argument.

Parameters:

- `i`: the index
- `x`: the update value
- `accumulatorFunction`: a side-effect-free function of two arguments

**Returns:** the updated value

**Since:** 1.8

## AtomicLongArray.toString()

```java
public String toString()
```

## AtomicLongArray.getPlain(int)

```java
public final long getPlain(int i)
```

Returns the current value of the element at index `i`,
with memory semantics of reading as if the variable was declared
non-`volatile`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicLongArray.setPlain(int, long)

```java
public final void setPlain(int i, long newValue)
```

Sets the element at index `i` to `newValue`,
with memory semantics of setting as if the variable was
declared non-`volatile` and non-`final`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicLongArray.getOpaque(int)

```java
public final long getOpaque(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getOpaque`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicLongArray.setOpaque(int, long)

```java
public final void setOpaque(int i, long newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicLongArray.getAcquire(int)

```java
public final long getAcquire(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getAcquire`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicLongArray.setRelease(int, long)

```java
public final void setRelease(int i, long newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicLongArray.compareAndExchange(int, long, long)

```java
public final long compareAndExchange(int i, long expectedValue, long newValue)
```

Atomically sets the element at index `i` to `newValue`
if the element's current value, referred to as the *witness
value*, `== expectedValue`,
with memory effects as specified by
`VarHandle.compareAndExchange`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** the *witness value*, which will be the same as the
expected value if successful

**Since:** 9

## AtomicLongArray.compareAndExchangeAcquire(int, long, long)

```java
public final long compareAndExchangeAcquire(int i, long expectedValue, long newValue)
```

Atomically sets the element at index `i` to `newValue`
if the element's current value, referred to as the *witness
value*, `== expectedValue`,
with memory effects as specified by
`VarHandle.compareAndExchangeAcquire`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** the *witness value*, which will be the same as the
expected value if successful

**Since:** 9

## AtomicLongArray.compareAndExchangeRelease(int, long, long)

```java
public final long compareAndExchangeRelease(int i, long expectedValue, long newValue)
```

Atomically sets the element at index `i` to `newValue`
if the element's current value, referred to as the *witness
value*, `== expectedValue`,
with memory effects as specified by
`VarHandle.compareAndExchangeRelease`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** the *witness value*, which will be the same as the
expected value if successful

**Since:** 9

## AtomicLongArray.weakCompareAndSetVolatile(int, long, long)

```java
public final boolean weakCompareAndSetVolatile(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index `i` to
`newValue` if the element's current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSet`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicLongArray.weakCompareAndSetAcquire(int, long, long)

```java
public final boolean weakCompareAndSetAcquire(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index `i` to
`newValue` if the element's current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetAcquire`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicLongArray.weakCompareAndSetRelease(int, long, long)

```java
public final boolean weakCompareAndSetRelease(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index `i` to
`newValue` if the element's current value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetRelease`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9
