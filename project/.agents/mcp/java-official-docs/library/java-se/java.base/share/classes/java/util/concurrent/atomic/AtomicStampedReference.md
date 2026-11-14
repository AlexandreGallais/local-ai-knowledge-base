---
title: "AtomicStampedReference class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicStampedReference.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicStampedReference class (java.util.concurrent.atomic)

```java
public class AtomicStampedReference<V>
```

An `AtomicStampedReference` maintains an object reference
along with an integer "stamp", that can be updated atomically.

Implementation note: This implementation maintains stamped
references by creating internal objects representing "boxed"
[reference, integer] pairs.

Parameters:

- `<V>`: The type of object referred to by this reference

**Since:** 1.5

## AtomicStampedReference.AtomicStampedReference(V, int)

```java
public AtomicStampedReference(V initialRef, int initialStamp)
```

Creates a new `AtomicStampedReference` with the given
initial values.

Parameters:

- `initialRef`: the initial reference
- `initialStamp`: the initial stamp

## AtomicStampedReference.getReference()

```java
public V getReference()
```

Returns the current value of the reference.

**Returns:** the current value of the reference

## AtomicStampedReference.getStamp()

```java
public int getStamp()
```

Returns the current value of the stamp.

**Returns:** the current value of the stamp

## AtomicStampedReference.get(int[])

```java
public V get(int[] stampHolder)
```

Returns the current values of both the reference and the stamp.
Typical usage is `int[1] holder; ref = v.get(holder);`.

Parameters:

- `stampHolder`: an array of size of at least one. On return, `stampHolder[0]` will hold the value of the stamp.

**Returns:** the current value of the reference

## AtomicStampedReference.weakCompareAndSet(V, V, int, int)

```java
public boolean weakCompareAndSet(V expectedReference, V newReference, int expectedStamp, int newStamp)
```

Atomically sets the value of both the reference and stamp to
the given update values if the current reference is `==`
to the expected reference and the current stamp is equal to the
expected stamp. This operation may fail spuriously and does not
provide ordering guarantees, so is only rarely an
appropriate alternative to `compareAndSet`.

Parameters:

- `expectedReference`: the expected value of the reference
- `newReference`: the new value for the reference
- `expectedStamp`: the expected value of the stamp
- `newStamp`: the new value for the stamp

**Returns:** `true` if successful

## AtomicStampedReference.compareAndSet(V, V, int, int)

```java
public boolean compareAndSet(V expectedReference, V newReference, int expectedStamp, int newStamp)
```

Atomically sets the value of both the reference and stamp
to the given update values if the
current reference is `==` to the expected reference
and the current stamp is equal to the expected stamp.

Parameters:

- `expectedReference`: the expected value of the reference
- `newReference`: the new value for the reference
- `expectedStamp`: the expected value of the stamp
- `newStamp`: the new value for the stamp

**Returns:** `true` if successful

## AtomicStampedReference.set(V, int)

```java
public void set(V newReference, int newStamp)
```

Unconditionally sets the value of both the reference and stamp.

Parameters:

- `newReference`: the new value for the reference
- `newStamp`: the new value for the stamp

## AtomicStampedReference.attemptStamp(V, int)

```java
public boolean attemptStamp(V expectedReference, int newStamp)
```

Atomically sets the value of the stamp to the given update value
if the current reference is `==` to the expected
reference.  Any given invocation of this operation may fail
(return `false`) spuriously, but repeated invocation
when the current value holds the expected value and no other
thread is also attempting to set the value will eventually
succeed.

Parameters:

- `expectedReference`: the expected value of the reference
- `newStamp`: the new value for the stamp

**Returns:** `true` if successful
