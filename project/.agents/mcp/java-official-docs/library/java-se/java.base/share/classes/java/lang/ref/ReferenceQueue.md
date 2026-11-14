# ReferenceQueue class (java.lang.ref)

```java
public class ReferenceQueue< T>
```

Reference queues, to which registered reference objects are appended by the
garbage collector after the appropriate reachability changes are detected.

<p>{@linkplain java.lang.ref##MemoryConsistency Memory consistency effects}:
The enqueueing of a reference to a queue (by the garbage collector, or by a
successful call to {@link Reference#enqueue})
<a href="{@docRoot}/java.base/java/util/concurrent/package-summary.html#MemoryVisibility"><i>happens-before</i></a>
the reference is removed from the queue by {@link ReferenceQueue#poll} or
{@link ReferenceQueue#remove}.

@param <T> the type of the reference object

@author   Mark Reinhold
@since    1.2

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
returned.  Otherwise this method immediately returns {@code null}.

@return  A reference object, if one was immediately available,
         otherwise {@code null}
@see java.lang.ref.Reference#enqueue()

## ReferenceQueue.remove(long)

```java
public Reference<? extends T> remove(long timeout) throws InterruptedException
```

Removes the next reference object in this queue, blocking until either
one becomes available or the given timeout period expires.

<p> This method does not offer real-time guarantees: It schedules the
timeout as if by invoking the {@link Object#wait(long)} method.

@param  timeout  If positive, block for up to {@code timeout}
                 milliseconds while waiting for a reference to be
                 added to this queue.  If zero, block indefinitely.

@return  A reference object, if one was available within the specified
         timeout period, otherwise {@code null}

@throws  IllegalArgumentException
         If the value of the timeout argument is negative

@throws  InterruptedException
         If the timeout wait is interrupted

@see java.lang.ref.Reference#enqueue()

## ReferenceQueue.remove()

```java
public Reference<? extends T> remove() throws InterruptedException
```

Removes the next reference object in this queue, blocking until one
becomes available.

@return A reference object, blocking until one becomes available
@throws  InterruptedException  If the wait is interrupted
@see java.lang.ref.Reference#enqueue()