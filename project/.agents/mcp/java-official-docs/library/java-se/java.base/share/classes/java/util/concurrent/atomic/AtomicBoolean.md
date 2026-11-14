---
title: "AtomicBoolean class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicBoolean.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicBoolean class (java.util.concurrent.atomic)

```java
public class AtomicBoolean implements java.io.Serializable
```

A `boolean` value that may be updated atomically. See the
`VarHandle` specification for descriptions of the properties
of atomic accesses. An `AtomicBoolean` is used in
applications such as atomically updated flags, and cannot be used
as a replacement for a `java.lang.Boolean`.

**Since:** 1.5

## AtomicBoolean.AtomicBoolean(boolean)

```java
public AtomicBoolean(boolean initialValue)
```

Creates a new `AtomicBoolean` with the given initial value.

Parameters:

- `initialValue`: the initial value

## AtomicBoolean.AtomicBoolean()

```java
public AtomicBoolean()
```

Creates a new `AtomicBoolean` with initial value `false`.

## AtomicBoolean.get()

```java
public final boolean get()
```

Returns the current value,
with memory effects as specified by `VarHandle.getVolatile`.

**Returns:** the current value

## AtomicBoolean.compareAndSet(boolean, boolean)

```java
public final boolean compareAndSet(boolean expectedValue, boolean newValue)
```

Atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.compareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicBoolean.weakCompareAndSet(boolean, boolean)

```java
public boolean weakCompareAndSet(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.weakCompareAndSetPlain(boolean, boolean)

```java
public boolean weakCompareAndSetPlain(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to `newValue`
if the current value `== expectedValue`,
with memory effects as specified by `VarHandle.weakCompareAndSetPlain`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicBoolean.set(boolean)

```java
public final void set(boolean newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setVolatile`.

Parameters:

- `newValue`: the new value

## AtomicBoolean.lazySet(boolean)

```java
public final void lazySet(boolean newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 1.6

## AtomicBoolean.getAndSet(boolean)

```java
public final boolean getAndSet(boolean newValue)
```

Atomically sets the value to `newValue` and returns the old value,
with memory effects as specified by `VarHandle.getAndSet`.

Parameters:

- `newValue`: the new value

**Returns:** the previous value

## AtomicBoolean.toString()

```java
public String toString()
```

## AtomicBoolean.getPlain()

```java
public final boolean getPlain()
```

Returns the current value, with memory semantics of reading as
if the variable was declared non-`volatile`.

**Returns:** the value

**Since:** 9

## AtomicBoolean.setPlain(boolean)

```java
public final void setPlain(boolean newValue)
```

Sets the value to `newValue`, with memory semantics
of setting as if the variable was declared non-`volatile`
and non-`final`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicBoolean.getOpaque()

```java
public final boolean getOpaque()
```

Returns the current value,
with memory effects as specified by `VarHandle.getOpaque`.

**Returns:** the value

**Since:** 9

## AtomicBoolean.setOpaque(boolean)

```java
public final void setOpaque(boolean newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setOpaque`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicBoolean.getAcquire()

```java
public final boolean getAcquire()
```

Returns the current value,
with memory effects as specified by `VarHandle.getAcquire`.

**Returns:** the value

**Since:** 9

## AtomicBoolean.setRelease(boolean)

```java
public final void setRelease(boolean newValue)
```

Sets the value to `newValue`,
with memory effects as specified by `VarHandle.setRelease`.

Parameters:

- `newValue`: the new value

**Since:** 9

## AtomicBoolean.compareAndExchange(boolean, boolean)

```java
public final boolean compareAndExchange(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.compareAndExchangeAcquire(boolean, boolean)

```java
public final boolean compareAndExchangeAcquire(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.compareAndExchangeRelease(boolean, boolean)

```java
public final boolean compareAndExchangeRelease(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.weakCompareAndSetVolatile(boolean, boolean)

```java
public final boolean weakCompareAndSetVolatile(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to `newValue` if the current
value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSet`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicBoolean.weakCompareAndSetAcquire(boolean, boolean)

```java
public final boolean weakCompareAndSetAcquire(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to `newValue` if the current
value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetAcquire`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9

## AtomicBoolean.weakCompareAndSetRelease(boolean, boolean)

```java
public final boolean weakCompareAndSetRelease(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to `newValue` if the current
value `== expectedValue`,
with memory effects as specified by
`VarHandle.weakCompareAndSetRelease`.

Parameters:

- `expectedValue`: the expected value
- `newValue`: the new value

**Returns:** `true` if successful

**Since:** 9
