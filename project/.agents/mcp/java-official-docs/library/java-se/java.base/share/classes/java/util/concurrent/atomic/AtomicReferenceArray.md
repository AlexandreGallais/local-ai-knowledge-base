---
title: "AtomicReferenceArray class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicReferenceArray.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicReferenceArray class (java.util.concurrent.atomic)

```java
public class AtomicReferenceArray<E> implements java.io.Serializable
```

An array of object references in which elements may be updated
atomically.  See the `VarHandle` specification for
descriptions of the properties of atomic accesses.

Parameters:

- `<E>`: The base class of elements held in this array

**Since:** 1.5

## AtomicReferenceArray.AtomicReferenceArray(int)

```java
public AtomicReferenceArray(int length)
```

Creates a new AtomicReferenceArray of the given length, with all
elements initially null.

Parameters:

- `length`: the length of the array

## AtomicReferenceArray.AtomicReferenceArray(E[])

```java
public AtomicReferenceArray(E[] array)
```

Creates a new AtomicReferenceArray with the same length as, and
all elements copied from, the given array.

Parameters:

- `array`: the array to copy elements from

Throws:

- `NullPointerException`: if array is null

## AtomicReferenceArray.length()

```java
public final int length()
```

Returns the length of the array.

**Returns:** the length of the array

## AtomicReferenceArray.get(int)

```java
public final E get(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getVolatile`.

Parameters:

- `i`: the index

**Returns:** the current value

## AtomicReferenceArray.set(int, E)

```java
public final void set(int i, E newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `i`: the index
- `newValue`: the new value

## AtomicReferenceArray.lazySet(int, E)

```java
public final void lazySet(int i, E newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 1.6

## AtomicReferenceArray.getAndSet(int, E)

```java
public final E getAndSet(int i, E newValue)
```

Atomically sets the element at index `i` to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Returns:** the previous value

## AtomicReferenceArray.compareAndSet(int, E, E)

```java
public final boolean compareAndSet(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSet(int, E, E)

```java
public final boolean weakCompareAndSet(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetPlain(int, E, E)

```java
public final boolean weakCompareAndSetPlain(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.getAndUpdate(int, UnaryOperator<E>)

```java
public final E getAndUpdate(int i, UnaryOperator<E> updateFunction)
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

## AtomicReferenceArray.updateAndGet(int, UnaryOperator<E>)

```java
public final E updateAndGet(int i, UnaryOperator<E> updateFunction)
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

## AtomicReferenceArray.getAndAccumulate(int, E, BinaryOperator<E>)

```java
public final E getAndAccumulate(int i, E x, BinaryOperator<E> accumulatorFunction)
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

## AtomicReferenceArray.accumulateAndGet(int, E, BinaryOperator<E>)

```java
public final E accumulateAndGet(int i, E x, BinaryOperator<E> accumulatorFunction)
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

## AtomicReferenceArray.toString()

```java
public String toString()
```

## AtomicReferenceArray.getPlain(int)

```java
public final E getPlain(int i)
```

Returns the current value of the element at index `i`,
with memory semantics of reading as if the variable was declared
non-`volatile`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicReferenceArray.setPlain(int, E)

```java
public final void setPlain(int i, E newValue)
```

Sets the element at index `i` to `newValue`,
with memory semantics of setting as if the variable was
declared non-`volatile` and non-`final`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicReferenceArray.getOpaque(int)

```java
public final E getOpaque(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getOpaque`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicReferenceArray.setOpaque(int, E)

```java
public final void setOpaque(int i, E newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicReferenceArray.getAcquire(int)

```java
public final E getAcquire(int i)
```

Returns the current value of the element at index `i`,
with memory effects as specified by `VarHandle.getAcquire`.

Parameters:

- `i`: the index

**Returns:** the value

**Since:** 9

## AtomicReferenceArray.setRelease(int, E)

```java
public final void setRelease(int i, E newValue)
```

Sets the element at index `i` to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `i`: the index
- `newValue`: the new value

**Since:** 9

## AtomicReferenceArray.compareAndExchange(int, E, E)

```java
public final E compareAndExchange(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.compareAndExchangeAcquire(int, E, E)

```java
public final E compareAndExchangeAcquire(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.compareAndExchangeRelease(int, E, E)

```java
public final E compareAndExchangeRelease(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetVolatile(int, E, E)

```java
public final boolean weakCompareAndSetVolatile(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetAcquire(int, E, E)

```java
public final boolean weakCompareAndSetAcquire(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetRelease(int, E, E)

```java
public final boolean weakCompareAndSetRelease(int i, E expectedValue, E newValue)
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
