---
title: "AtomicReference class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicReference.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicReference class (java.util.concurrent.atomic)

```java
public class AtomicReference<V> implements java.io.Serializable
```

An object reference that may be updated atomically.  See the `VarHandle` specification for descriptions of the properties of
atomic accesses.

Parameters:

- `<V>`: The type of object referred to by this reference

**Since:** 1.5

## AtomicReference.AtomicReference(V)

```java
public AtomicReference(V initialValue)
```

Creates a new AtomicReference with the given initial value.

Parameters:

- `initialValue`: the initial value

## AtomicReference.AtomicReference()

```java
public AtomicReference()
```

Creates a new AtomicReference with null initial value.

## AtomicReference.get()

```java
public final V get()
```

Returns the current value,
with memory effects as specified by `VarHandle.getVolatile`.

**Returns:** the current value

## AtomicReference.set(V)

```java
public final void set(V newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `newValue`: the new value

## AtomicReference.lazySet(V)

```java
public final void lazySet(V newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 1.6

## AtomicReference.compareAndSet(V, V)

```java
public final boolean compareAndSet(V expectedValue, V newValue)
```

Atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.compareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicReference.weakCompareAndSet(V, V)

```java
public final boolean weakCompareAndSet(V expectedValue, V newValue)
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

## AtomicReference.weakCompareAndSetPlain(V, V)

```java
public final boolean weakCompareAndSetPlain(V expectedValue, V newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicReference.getAndSet(V)

```java
public final V getAndSet(V newValue)
```

Atomically sets the value to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `newValue`: the new value

**Returns:** the previous value

## AtomicReference.getAndUpdate(UnaryOperator<V>)

```java
public final V getAndUpdate(UnaryOperator<V> updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function, returning the previous value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

Parameters:

- `updateFunction`: a side-effect-free function

**Returns:** the previous value

**Since:** 1.8

## AtomicReference.updateAndGet(UnaryOperator<V>)

```java
public final V updateAndGet(UnaryOperator<V> updateFunction)
```

Atomically updates (with memory effects as specified by `VarHandle.compareAndSet`) the current value with the results of
applying the given function, returning the updated value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

Parameters:

- `updateFunction`: a side-effect-free function

**Returns:** the updated value

**Since:** 1.8

## AtomicReference.getAndAccumulate(V, BinaryOperator<V>)

```java
public final V getAndAccumulate(V x, BinaryOperator<V> accumulatorFunction)
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

## AtomicReference.accumulateAndGet(V, BinaryOperator<V>)

```java
public final V accumulateAndGet(V x, BinaryOperator<V> accumulatorFunction)
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

## AtomicReference.toString()

```java
public String toString()
```

## AtomicReference.getPlain()

```java
public final V getPlain()
```

Returns the current value, with memory semantics of reading as
if the variable was declared non-`volatile`.

**Returns:** the value

**Since:** 9

## AtomicReference.setPlain(V)

```java
public final void setPlain(V newValue)
```

Sets the value to `newValue`, with memory semantics
of setting as if the variable was declared non-`volatile`
and non-`final`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicReference.getOpaque()

```java
public final V getOpaque()
```

Returns the current value,
with memory effects as specified by `VarHandle.getOpaque`.

**Returns:** the value

**Since:** 9

## AtomicReference.setOpaque(V)

```java
public final void setOpaque(V newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicReference.getAcquire()

```java
public final V getAcquire()
```

Returns the current value,
with memory effects as specified by `VarHandle.getAcquire`.

**Returns:** the value

**Since:** 9

## AtomicReference.setRelease(V)

```java
public final void setRelease(V newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicReference.compareAndExchange(V, V)

```java
public final V compareAndExchange(V expectedValue, V newValue)
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

## AtomicReference.compareAndExchangeAcquire(V, V)

```java
public final V compareAndExchangeAcquire(V expectedValue, V newValue)
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

## AtomicReference.compareAndExchangeRelease(V, V)

```java
public final V compareAndExchangeRelease(V expectedValue, V newValue)
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

## AtomicReference.weakCompareAndSetVolatile(V, V)

```java
public final boolean weakCompareAndSetVolatile(V expectedValue, V newValue)
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

## AtomicReference.weakCompareAndSetAcquire(V, V)

```java
public final boolean weakCompareAndSetAcquire(V expectedValue, V newValue)
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

## AtomicReference.weakCompareAndSetRelease(V, V)

```java
public final boolean weakCompareAndSetRelease(V expectedValue, V newValue)
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
