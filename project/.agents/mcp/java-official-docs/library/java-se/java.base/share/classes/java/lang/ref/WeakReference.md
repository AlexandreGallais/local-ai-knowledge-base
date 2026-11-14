---
title: "WeakReference class (java.lang.ref)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ref/WeakReference.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WeakReference class (java.lang.ref)

```java
public non-sealed class WeakReference< T> extends Reference<T>
```

Weak reference objects, which do not prevent their referents from being
made finalizable, finalized, and then reclaimed.  Weak references are most
often used to implement canonicalizing mappings.

 Suppose that the garbage collector determines at a certain point in time
that an object is weakly
reachable.  At that time it will atomically clear all weak references to
that object and all weak references to any other weakly-reachable objects
from which that object is reachable through a chain of strong and soft
references.  At the same time it will declare all of the formerly
weakly-reachable objects to be finalizable.  At the same time or at some
later time it will enqueue those newly-cleared weak references that are
registered with reference queues.

Parameters:

- `<T>`: the type of the referent

**Since:** 1.2

## WeakReference.WeakReference(T)

```java
public WeakReference( T referent)
```

Creates a new weak reference that refers to the given object.  The new
reference is not registered with any queue.

Parameters:

- `referent`: object the new weak reference will refer to

## WeakReference.WeakReference(T, ReferenceQueue<? super T>)

```java
public WeakReference( T referent, ReferenceQueue<? super T> q)
```

Creates a new weak reference that refers to the given object and is
registered with the given queue.

Parameters:

- `referent`: object the new weak reference will refer to
- `q`: the queue with which the reference is to be registered, or `null` if registration is not required
