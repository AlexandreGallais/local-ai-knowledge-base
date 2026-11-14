---
title: "PhantomReference class (java.lang.ref)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ref/PhantomReference.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PhantomReference class (java.lang.ref)

```java
public non-sealed class PhantomReference< T> extends Reference<T>
```

Phantom reference objects, which are enqueued after the collector
determines that their referents may otherwise be reclaimed.  Phantom
references are most often used to schedule post-mortem cleanup actions.

 Suppose the garbage collector determines at a certain point in time
that an object is
phantom reachable.  At that time it will atomically clear
all phantom references to that object and all phantom references to
any other phantom-reachable objects from which that object is reachable.
At the same time or at some later time it will enqueue those newly-cleared
phantom references that are registered with reference queues.

 In order to ensure that a reclaimable object remains so, the referent of
a phantom reference may not be retrieved: The `get` method of a
phantom reference always returns `null`.
The refersTo method can be used to test
whether some object is the referent of a phantom reference.

Parameters:

- `<T>`: the type of the referent

**Since:** 1.2

## PhantomReference.get()

```java
public T get()
```

Returns this reference object's referent.  Because the referent of a
phantom reference is always inaccessible, this method always returns
`null`.

**Returns:** `null`

## PhantomReference.PhantomReference(T, ReferenceQueue<? super T>)

```java
public PhantomReference( T referent, ReferenceQueue<? super T> q)
```

Creates a new phantom reference that refers to the given object and
is registered with the given queue.

 It is possible to create a phantom reference with a `null`
queue.  Such a reference will never be enqueued.

Parameters:

- `referent`: the object the new phantom reference will refer to
- `q`: the queue with which the reference is to be registered, or `null` if registration is not required
