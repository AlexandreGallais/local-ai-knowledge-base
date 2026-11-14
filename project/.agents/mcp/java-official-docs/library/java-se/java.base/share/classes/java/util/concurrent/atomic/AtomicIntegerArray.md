---
title: "AtomicIntegerArray class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicIntegerArray.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicIntegerArray class (java.util.concurrent.atomic)

```java
public class AtomicIntegerArray implements java.io.Serializable
```

An `int` array in which elements may be updated atomically.
See the `VarHandle` specification for descriptions of the
properties of atomic accesses.

**Since:** 1.5

## AtomicIntegerArray.AtomicIntegerArray(int)

```java
public AtomicIntegerArray(int length)
```

Creates a new AtomicIntegerArray of the given length, with all
elements initially zero.

Parameters:

- `length`: the length of the array

## AtomicIntegerArray.AtomicIntegerArray(int[])

```java
public AtomicIntegerArray(int[] array)
```

Creates a new AtomicIntegerArray with the same length as, and
all elements copied from, the given array.

Parameters:

- `array`: the array to copy elements from

Throws:

- `NullPointerException`: if array is null

## AtomicIntegerArray.length()

```java
public final int length()
```

Returns the length of the array.

**Returns:** the length of the array

## AtomicIntegerArray.get(int)

```java
public final int get(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getVolatile`.

Parameters:

- `i`: the index

**Returns:** the current value

## AtomicIntegerArray.set(int, int)

```java
public final void set(int i, int newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `i`: the index
- `newValue`: the new value

## AtomicIntegerArray.lazySet(int, int)

```java
public final void lazySet(int i, int newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 1.6

## AtomicIntegerArray.getAndSet(int, int)

```java
public final int getAndSet(int i, int newValue)
```

Atomically sets the element at index `i` to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Returns:** the previous value

## AtomicIntegerArray.compareAndSet(int, int, int)

```java
public final boolean compareAndSet(int i, int expectedValue, int newValue)
```

Atomically sets the element at index `i` to `newValue` if the element's current value `== expectedValue`,
with memory effects as specified by `VarHandle.compareAndSet`.

Parameters:

- `i`: the index
- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicIntegerArray.weakCompareAndSet(int, int, int)

```java
public final boolean weakCompareAndSet(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetPlain(int, int, int)

```java
public final boolean weakCompareAndSetPlain(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.getAndIncrement(int)

```java
public final int getAndIncrement(int i)
```

Atomically increments the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(i, 1)`.

Parameters:

- `i`: the index

**Returns:** the previous value

## AtomicIntegerArray.getAndDecrement(int)

```java
public final int getAndDecrement(int i)
```

Atomically decrements the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `getAndAdd(i, -1)`.

Parameters:

- `i`: the index

**Returns:** the previous value

## AtomicIntegerArray.getAndAdd(int, int)

```java
public final int getAndAdd(int i, int delta)
```

Atomically adds the given value to the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `i`: the index
- `delta`: the value to add

**Returns:** the previous value

## AtomicIntegerArray.incrementAndGet(int)

```java
public final int incrementAndGet(int i)
```

Atomically increments the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(i, 1)`.

Parameters:

- `i`: the index

**Returns:** the updated value

## AtomicIntegerArray.decrementAndGet(int)

```java
public final int decrementAndGet(int i)
```

Atomically decrements the value of the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Equivalent to `addAndGet(i, -1)`.

Parameters:

- `i`: the index

**Returns:** the updated value

## AtomicIntegerArray.addAndGet(int, int)

```java
public final int addAndGet(int i, int delta)
```

Atomically adds the given value to the element at index `i`,
with memory effects as specified by `VarHandle.getAndAdd`.

Parameters:

- `i`: the index
- `delta`: the value to add

**Returns:** the updated value

## AtomicIntegerArray.getAndUpdate(int, IntUnaryOperator)

```java
public final int getAndUpdate(int i, IntUnaryOperator updateFunction)
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

## AtomicIntegerArray.updateAndGet(int, IntUnaryOperator)

```java
public final int updateAndGet(int i, IntUnaryOperator updateFunction)
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

## AtomicIntegerArray.getAndAccumulate(int, int, IntBinaryOperator)

```java
public final int getAndAccumulate(int i, int x, IntBinaryOperator accumulatorFunction)
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

## AtomicIntegerArray.accumulateAndGet(int, int, IntBinaryOperator)

```java
public final int accumulateAndGet(int i, int x, IntBinaryOperator accumulatorFunction)
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

## AtomicIntegerArray.toString()

```java
public String toString()
```

## AtomicIntegerArray.getPlain(int)

```java
public final int getPlain(int i)
```

Returns the current value of the element at index `i`,
with memory semantics of reading as if the variable was declared
non-`volatile`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicIntegerArray.setPlain(int, int)

```java
public final void setPlain(int i, int newValue)
```

Sets the element at index `i` to `newValue`,
with memory semantics of setting as if the variable was
declared non-`volatile` and non-`final`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicIntegerArray.getOpaque(int)

```java
public final int getOpaque(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getOpaque`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicIntegerArray.setOpaque(int, int)

```java
public final void setOpaque(int i, int newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicIntegerArray.getAcquire(int)

```java
public final int getAcquire(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getAcquire`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicIntegerArray.setRelease(int, int)

```java
public final void setRelease(int i, int newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicIntegerArray.compareAndExchange(int, int, int)

```java
public final int compareAndExchange(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.compareAndExchangeAcquire(int, int, int)

```java
public final int compareAndExchangeAcquire(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.compareAndExchangeRelease(int, int, int)

```java
public final int compareAndExchangeRelease(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetVolatile(int, int, int)

```java
public final boolean weakCompareAndSetVolatile(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetAcquire(int, int, int)

```java
public final boolean weakCompareAndSetAcquire(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetRelease(int, int, int)

```java
public final boolean weakCompareAndSetRelease(int i, int expectedValue, int newValue)
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
