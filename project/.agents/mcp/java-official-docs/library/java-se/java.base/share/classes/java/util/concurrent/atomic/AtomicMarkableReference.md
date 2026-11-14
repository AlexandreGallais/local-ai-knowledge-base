---
title: "AtomicMarkableReference class (java.util.concurrent.atomic)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/atomic/AtomicMarkableReference.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicMarkableReference class (java.util.concurrent.atomic)

```java
public class AtomicMarkableReference<V>
```

An `AtomicMarkableReference` maintains an object reference
along with a mark bit, that can be updated atomically.

Implementation note: This implementation maintains markable
references by creating internal objects representing "boxed"
[reference, boolean] pairs.

Parameters:

- `<V>`: The type of object referred to by this reference

**Since:** 1.5

## AtomicMarkableReference.AtomicMarkableReference(V, boolean)

```java
public AtomicMarkableReference(V initialRef, boolean initialMark)
```

Creates a new `AtomicMarkableReference` with the given
initial values.

Parameters:

- `initialRef`: the initial reference
- `initialMark`: the initial mark

## AtomicMarkableReference.getReference()

```java
public V getReference()
```

Returns the current value of the reference.

**Returns:** the current value of the reference

## AtomicMarkableReference.isMarked()

```java
public boolean isMarked()
```

Returns the current value of the mark.

**Returns:** the current value of the mark

## AtomicMarkableReference.get(boolean[])

```java
public V get(boolean[] markHolder)
```

Returns the current values of both the reference and the mark.
Typical usage is `boolean[1] holder; ref = v.get(holder);`.

Parameters:

- `markHolder`: an array of size of at least one. On return, `markHolder[0]` will hold the value of the mark.

**Returns:** the current value of the reference

## AtomicMarkableReference.weakCompareAndSet(V, V, boolean, boolean)

```java
public boolean weakCompareAndSet(V expectedReference, V newReference, boolean expectedMark, boolean newMark)
```

Atomically sets the value of both the reference and mark to the
given update values if the current reference is `==` to
the expected reference and the current mark is equal to the
expected mark. This operation may fail spuriously and does not
provide ordering guarantees, so is only rarely an
appropriate alternative to `compareAndSet`.

Parameters:

- `expectedReference`: the expected value of the reference
- `newReference`: the new value for the reference
- `expectedMark`: the expected value of the mark
- `newMark`: the new value for the mark

**Returns:** `true` if successful

## AtomicMarkableReference.compareAndSet(V, V, boolean, boolean)

```java
public boolean compareAndSet(V expectedReference, V newReference, boolean expectedMark, boolean newMark)
```

Atomically sets the value of both the reference and mark
to the given update values if the
current reference is `==` to the expected reference
and the current mark is equal to the expected mark.

Parameters:

- `expectedReference`: the expected value of the reference
- `newReference`: the new value for the reference
- `expectedMark`: the expected value of the mark
- `newMark`: the new value for the mark

**Returns:** `true` if successful

## AtomicMarkableReference.set(V, boolean)

```java
public void set(V newReference, boolean newMark)
```

Unconditionally sets the value of both the reference and mark.

Parameters:

- `newReference`: the new value for the reference
- `newMark`: the new value for the mark

## AtomicMarkableReference.attemptMark(V, boolean)

```java
public boolean attemptMark(V expectedReference, boolean newMark)
```

Atomically sets the value of the mark to the given update value
if the current reference is `==` to the expected
reference.  Any given invocation of this operation may fail
(return `false`) spuriously, but repeated invocation
when the current value holds the expected value and no other
thread is also attempting to set the value will eventually
succeed.

Parameters:

- `expectedReference`: the expected value of the reference
- `newMark`: the new value for the mark

**Returns:** `true` if successful
