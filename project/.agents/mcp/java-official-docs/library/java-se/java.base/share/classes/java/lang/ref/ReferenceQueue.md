---
title: "ReferenceQueue class (java.lang.ref)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ref/ReferenceQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReferenceQueue class (java.lang.ref)

```java
public class ReferenceQueue< T>
```

Reference queues, to which registered reference objects are appended by the
garbage collector after the appropriate reachability changes are detected.

Memory consistency effects:
The enqueueing of a reference to a queue (by the garbage collector, or by a
successful call to `Reference.enqueue`)
*happens-before*
the reference is removed from the queue by `ReferenceQueue.poll` or
`ReferenceQueue.remove`.

Parameters:

- `<T>`: the type of the reference object

**Since:** 1.2

## ReferenceQueue.ReferenceQueue()

```java
public ReferenceQueue()
```

Constructs a new reference-object queue.

## ReferenceQueue.poll()

```java
public Reference<? extends T> poll()
```

Polls this queue to see if a reference object is available.  If one is
available without further delay then it is removed from the queue and
returned.  Otherwise this method immediately returns `null`.

**Returns:** A reference object, if one was immediately available,
         otherwise `null`

**See also:** java.lang.ref.Reference#enqueue()

## ReferenceQueue.remove(long)

```java
public Reference<? extends T> remove(long timeout) throws InterruptedException
```

Removes the next reference object in this queue, blocking until either
one becomes available or the given timeout period expires.

 This method does not offer real-time guarantees: It schedules the
timeout as if by invoking the `Object.wait(long)` method.

Parameters:

- `timeout`: If positive, block for up to `timeout` milliseconds while waiting for a reference to be added to this queue. If zero, block indefinitely.

**Returns:** A reference object, if one was available within the specified
         timeout period, otherwise `null`

**See also:** java.lang.ref.Reference#enqueue()

Throws:

- `IllegalArgumentException`: If the value of the timeout argument is negative
- `InterruptedException`: If the timeout wait is interrupted

## ReferenceQueue.remove()

```java
public Reference<? extends T> remove() throws InterruptedException
```

Removes the next reference object in this queue, blocking until one
becomes available.

**Returns:** A reference object, blocking until one becomes available

**See also:** java.lang.ref.Reference#enqueue()

Throws:

- `InterruptedException`: If the wait is interrupted
