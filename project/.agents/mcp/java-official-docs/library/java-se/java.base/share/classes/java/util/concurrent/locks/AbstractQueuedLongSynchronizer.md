# AbstractQueuedLongSynchronizer class (java.util.concurrent.locks)

```java
public abstract class AbstractQueuedLongSynchronizer extends AbstractOwnableSynchronizer implements java.io.Serializable
```

A version of {@link AbstractQueuedSynchronizer} in
which synchronization state is maintained as a {@code long}.
This class has exactly the same structure, properties, and methods
as {@code AbstractQueuedSynchronizer} with the exception
that all state-related parameters and results are defined
as {@code long} rather than {@code int}. This class
may be useful when creating synchronizers such as
multilevel locks and barriers that require
64 bits of state.

<p>See {@link AbstractQueuedSynchronizer} for usage
notes and examples.

@since 1.6
@author Doug Lea

## AbstractQueuedLongSynchronizer.AbstractQueuedLongSynchronizer()

```java
public AbstractQueuedLongSynchronizer()
```

Constructor for subclasses to call.

## AbstractQueuedLongSynchronizer.isReleasable()

```java
public final boolean isReleasable()
```

Allows Conditions to be used in ForkJoinPools without
risking fixed pool exhaustion. This is usable only for
untimed Condition waits, not timed versions.

## AbstractQueuedLongSynchronizer.getState()

```java
protected final long getState()
```

Returns the current value of synchronization state.
This operation has memory semantics of a {@code volatile} read.
@return current state value

## AbstractQueuedLongSynchronizer.setState(long)

```java
protected final void setState(long newState)
```

Sets the value of synchronization state.
This operation has memory semantics of a {@code volatile} write.
@param newState the new state value

## AbstractQueuedLongSynchronizer.compareAndSetState(long, long)

```java
protected final boolean compareAndSetState(long expect, long update)
```

Atomically sets synchronization state to the given updated
value if the current state value equals the expected value.
This operation has memory semantics of a {@code volatile} read
and write.

@param expect the expected value
@param update the new value
@return {@code true} if successful. False return indicates that the actual
        value was not equal to the expected value.

## AbstractQueuedLongSynchronizer.tryAcquire(long)

```java
protected boolean tryAcquire(long arg)
```

Attempts to acquire in exclusive mode. This method should query
if the state of the object permits it to be acquired in the
exclusive mode, and if so to acquire it.

<p>This method is always invoked by the thread performing
acquire.  If this method reports failure, the acquire method
may queue the thread, if it is not already queued, until it is
signalled by a release from some other thread. This can be used
to implement method {@link Lock#tryLock()}.

<p>The default
implementation throws {@link UnsupportedOperationException}.

@param arg the acquire argument. This value is always the one
       passed to an acquire method, or is the value saved on entry
       to a condition wait.  The value is otherwise uninterpreted
       and can represent anything you like.
@return {@code true} if successful. Upon success, this object has
        been acquired.
@throws IllegalMonitorStateException if acquiring would place this
        synchronizer in an illegal state. This exception must be
        thrown in a consistent fashion for synchronization to work
        correctly.
@throws UnsupportedOperationException if exclusive mode is not supported

## AbstractQueuedLongSynchronizer.tryRelease(long)

```java
protected boolean tryRelease(long arg)
```

Attempts to set the state to reflect a release in exclusive
mode.

<p>This method is always invoked by the thread performing release.

<p>The default implementation throws
{@link UnsupportedOperationException}.

@param arg the release argument. This value is always the one
       passed to a release method, or the current state value upon
       entry to a condition wait.  The value is otherwise
       uninterpreted and can represent anything you like.
@return {@code true} if this object is now in a fully released
        state, so that any waiting threads may attempt to acquire;
        and {@code false} otherwise.
@throws IllegalMonitorStateException if releasing would place this
        synchronizer in an illegal state. This exception must be
        thrown in a consistent fashion for synchronization to work
        correctly.
@throws UnsupportedOperationException if exclusive mode is not supported

## AbstractQueuedLongSynchronizer.tryAcquireShared(long)

```java
protected long tryAcquireShared(long arg)
```

Attempts to acquire in shared mode. This method should query if
the state of the object permits it to be acquired in the shared
mode, and if so to acquire it.

<p>This method is always invoked by the thread performing
acquire.  If this method reports failure, the acquire method
may queue the thread, if it is not already queued, until it is
signalled by a release from some other thread.

<p>The default implementation throws {@link
UnsupportedOperationException}.

@param arg the acquire argument. This value is always the one
       passed to an acquire method, or is the value saved on entry
       to a condition wait.  The value is otherwise uninterpreted
       and can represent anything you like.
@return a negative value on failure; zero if acquisition in shared
        mode succeeded but no subsequent shared-mode acquire can
        succeed; and a positive value if acquisition in shared
        mode succeeded and subsequent shared-mode acquires might
        also succeed, in which case a subsequent waiting thread
        must check availability. (Support for three different
        return values enables this method to be used in contexts
        where acquires only sometimes act exclusively.)  Upon
        success, this object has been acquired.
@throws IllegalMonitorStateException if acquiring would place this
        synchronizer in an illegal state. This exception must be
        thrown in a consistent fashion for synchronization to work
        correctly.
@throws UnsupportedOperationException if shared mode is not supported

## AbstractQueuedLongSynchronizer.tryReleaseShared(long)

```java
protected boolean tryReleaseShared(long arg)
```

Attempts to set the state to reflect a release in shared mode.

<p>This method is always invoked by the thread performing release.

<p>The default implementation throws
{@link UnsupportedOperationException}.

@param arg the release argument. This value is always the one
       passed to a release method, or the current state value upon
       entry to a condition wait.  The value is otherwise
       uninterpreted and can represent anything you like.
@return {@code true} if this release of shared mode may permit a
        waiting acquire (shared or exclusive) to succeed; and
        {@code false} otherwise
@throws IllegalMonitorStateException if releasing would place this
        synchronizer in an illegal state. This exception must be
        thrown in a consistent fashion for synchronization to work
        correctly.
@throws UnsupportedOperationException if shared mode is not supported

## AbstractQueuedLongSynchronizer.isHeldExclusively()

```java
protected boolean isHeldExclusively()
```

Returns {@code true} if synchronization is held exclusively with
respect to the current (calling) thread.  This method is invoked
upon each call to a {@link ConditionObject} method.

<p>The default implementation throws {@link
UnsupportedOperationException}. This method is invoked
internally only within {@link ConditionObject} methods, so need
not be defined if conditions are not used.

@return {@code true} if synchronization is held exclusively;
        {@code false} otherwise
@throws UnsupportedOperationException if conditions are not supported

## AbstractQueuedLongSynchronizer.acquire(long)

```java
public final void acquire(long arg)
```

Acquires in exclusive mode, ignoring interrupts.  Implemented
by invoking at least once {@link #tryAcquire},
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking {@link
#tryAcquire} until success.  This method can be used
to implement method {@link Lock#lock}.

@param arg the acquire argument.  This value is conveyed to
       {@link #tryAcquire} but is otherwise uninterpreted and
       can represent anything you like.

## AbstractQueuedLongSynchronizer.acquireInterruptibly(long)

```java
public final void acquireInterruptibly(long arg) throws InterruptedException
```

Acquires in exclusive mode, aborting if interrupted.
Implemented by first checking interrupt status, then invoking
at least once {@link #tryAcquire}, returning on
success.  Otherwise the thread is queued, possibly repeatedly
blocking and unblocking, invoking {@link #tryAcquire}
until success or the thread is interrupted.  This method can be
used to implement method {@link Lock#lockInterruptibly}.

@param arg the acquire argument.  This value is conveyed to
       {@link #tryAcquire} but is otherwise uninterpreted and
       can represent anything you like.
@throws InterruptedException if the current thread is interrupted

## AbstractQueuedLongSynchronizer.tryAcquireNanos(long, long)

```java
public final boolean tryAcquireNanos(long arg, long nanosTimeout) throws InterruptedException
```

Attempts to acquire in exclusive mode, aborting if interrupted,
and failing if the given timeout elapses.  Implemented by first
checking interrupt status, then invoking at least once {@link
#tryAcquire}, returning on success.  Otherwise, the thread is
queued, possibly repeatedly blocking and unblocking, invoking
{@link #tryAcquire} until success or the thread is interrupted
or the timeout elapses.  This method can be used to implement
method {@link Lock#tryLock(long, TimeUnit)}.

@param arg the acquire argument.  This value is conveyed to
       {@link #tryAcquire} but is otherwise uninterpreted and
       can represent anything you like.
@param nanosTimeout the maximum number of nanoseconds to wait
@return {@code true} if acquired; {@code false} if timed out
@throws InterruptedException if the current thread is interrupted

## AbstractQueuedLongSynchronizer.release(long)

```java
public final boolean release(long arg)
```

Releases in exclusive mode.  Implemented by unblocking one or
more threads if {@link #tryRelease} returns true.
This method can be used to implement method {@link Lock#unlock}.

@param arg the release argument.  This value is conveyed to
       {@link #tryRelease} but is otherwise uninterpreted and
       can represent anything you like.
@return the value returned from {@link #tryRelease}

## AbstractQueuedLongSynchronizer.acquireShared(long)

```java
public final void acquireShared(long arg)
```

Acquires in shared mode, ignoring interrupts.  Implemented by
first invoking at least once {@link #tryAcquireShared},
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking {@link
#tryAcquireShared} until success.

@param arg the acquire argument.  This value is conveyed to
       {@link #tryAcquireShared} but is otherwise uninterpreted
       and can represent anything you like.

## AbstractQueuedLongSynchronizer.acquireSharedInterruptibly(long)

```java
public final void acquireSharedInterruptibly(long arg) throws InterruptedException
```

Acquires in shared mode, aborting if interrupted.  Implemented
by first checking interrupt status, then invoking at least once
{@link #tryAcquireShared}, returning on success.  Otherwise the
thread is queued, possibly repeatedly blocking and unblocking,
invoking {@link #tryAcquireShared} until success or the thread
is interrupted.
@param arg the acquire argument.
This value is conveyed to {@link #tryAcquireShared} but is
otherwise uninterpreted and can represent anything
you like.
@throws InterruptedException if the current thread is interrupted

## AbstractQueuedLongSynchronizer.tryAcquireSharedNanos(long, long)

```java
public final boolean tryAcquireSharedNanos(long arg, long nanosTimeout) throws InterruptedException
```

Attempts to acquire in shared mode, aborting if interrupted, and
failing if the given timeout elapses.  Implemented by first
checking interrupt status, then invoking at least once {@link
#tryAcquireShared}, returning on success.  Otherwise, the
thread is queued, possibly repeatedly blocking and unblocking,
invoking {@link #tryAcquireShared} until success or the thread
is interrupted or the timeout elapses.

@param arg the acquire argument.  This value is conveyed to
       {@link #tryAcquireShared} but is otherwise uninterpreted
       and can represent anything you like.
@param nanosTimeout the maximum number of nanoseconds to wait
@return {@code true} if acquired; {@code false} if timed out
@throws InterruptedException if the current thread is interrupted

## AbstractQueuedLongSynchronizer.releaseShared(long)

```java
public final boolean releaseShared(long arg)
```

Releases in shared mode.  Implemented by unblocking one or more
threads if {@link #tryReleaseShared} returns true.

@param arg the release argument.  This value is conveyed to
       {@link #tryReleaseShared} but is otherwise uninterpreted
       and can represent anything you like.
@return the value returned from {@link #tryReleaseShared}

## AbstractQueuedLongSynchronizer.hasQueuedThreads()

```java
public final boolean hasQueuedThreads()
```

Queries whether any threads are waiting to acquire. Note that
because cancellations due to interrupts and timeouts may occur
at any time, a {@code true} return does not guarantee that any
other thread will ever acquire.

@return {@code true} if there may be other threads waiting to acquire

## AbstractQueuedLongSynchronizer.hasContended()

```java
public final boolean hasContended()
```

Queries whether any threads have ever contended to acquire this
synchronizer; that is, if an acquire method has ever blocked.

<p>In this implementation, this operation returns in
constant time.

@return {@code true} if there has ever been contention

## AbstractQueuedLongSynchronizer.getFirstQueuedThread()

```java
public final Thread getFirstQueuedThread()
```

Returns the first (longest-waiting) thread in the queue, or
{@code null} if no threads are currently queued.

<p>In this implementation, this operation normally returns in
constant time, but may iterate upon contention if other threads are
concurrently modifying the queue.

@return the first (longest-waiting) thread in the queue, or
        {@code null} if no threads are currently queued

## AbstractQueuedLongSynchronizer.isQueued(Thread)

```java
public final boolean isQueued(Thread thread)
```

Returns true if the given thread is currently queued.

<p>This implementation traverses the queue to determine
presence of the given thread.

@param thread the thread
@return {@code true} if the given thread is on the queue
@throws NullPointerException if the thread is null

## AbstractQueuedLongSynchronizer.hasQueuedPredecessors()

```java
public final boolean hasQueuedPredecessors()
```

Queries whether any threads have been waiting to acquire longer
than the current thread.

<p>An invocation of this method is equivalent to (but may be
more efficient than):
<pre> {@code
getFirstQueuedThread() != Thread.currentThread()
  && hasQueuedThreads()}</pre>

<p>Note that because cancellations due to interrupts and
timeouts may occur at any time, a {@code true} return does not
guarantee that some other thread will acquire before the current
thread.  Likewise, it is possible for another thread to win a
race to enqueue after this method has returned {@code false},
due to the queue being empty.

<p>This method is designed to be used by a fair synchronizer to
avoid <a href="AbstractQueuedSynchronizer.html#barging">barging</a>.
Such a synchronizer's {@link #tryAcquire} method should return
{@code false}, and its {@link #tryAcquireShared} method should
return a negative value, if this method returns {@code true}
(unless this is a reentrant acquire).  For example, the {@code
tryAcquire} method for a fair, reentrant, exclusive mode
synchronizer might look like this:

<pre> {@code
protected boolean tryAcquire(long arg) {
  if (isHeldExclusively()) {
    // A reentrant acquire; increment hold count
    return true;
  } else if (hasQueuedPredecessors()) {
    return false;
  } else {
    // try to acquire normally
  }
}}</pre>

@return {@code true} if there is a queued thread preceding the
        current thread, and {@code false} if the current thread
        is at the head of the queue or the queue is empty
@since 1.7

## AbstractQueuedLongSynchronizer.getQueueLength()

```java
public final int getQueueLength()
```

Returns an estimate of the number of threads waiting to
acquire.  The value is only an estimate because the number of
threads may change dynamically while this method traverses
internal data structures.  This method is designed for use in
monitoring system state, not for synchronization control.

@return the estimated number of threads waiting to acquire

## AbstractQueuedLongSynchronizer.getQueuedThreads()

```java
public final Collection<Thread> getQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire.  Because the actual set of threads may change
dynamically while constructing this result, the returned
collection is only a best-effort estimate.  The elements of the
returned collection are in no particular order.  This method is
designed to facilitate construction of subclasses that provide
more extensive monitoring facilities.

@return the collection of threads

## AbstractQueuedLongSynchronizer.getExclusiveQueuedThreads()

```java
public final Collection<Thread> getExclusiveQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in exclusive mode. This has the same properties
as {@link #getQueuedThreads} except that it only returns
those threads waiting due to an exclusive acquire.

@return the collection of threads

## AbstractQueuedLongSynchronizer.getSharedQueuedThreads()

```java
public final Collection<Thread> getSharedQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in shared mode. This has the same properties
as {@link #getQueuedThreads} except that it only returns
those threads waiting due to a shared acquire.

@return the collection of threads

## AbstractQueuedLongSynchronizer.toString()

```java
public String toString()
```

Returns a string identifying this synchronizer, as well as its state.
The state, in brackets, includes the String {@code "State ="}
followed by the current value of {@link #getState}, and either
{@code "nonempty"} or {@code "empty"} depending on whether the
queue is empty.

@return a string identifying this synchronizer, as well as its state

## AbstractQueuedLongSynchronizer.owns(ConditionObject)

```java
public final boolean owns(ConditionObject condition)
```

Queries whether the given ConditionObject
uses this synchronizer as its lock.

@param condition the condition
@return {@code true} if owned
@throws NullPointerException if the condition is null

## AbstractQueuedLongSynchronizer.hasWaiters(ConditionObject)

```java
public final boolean hasWaiters(ConditionObject condition)
```

Queries whether any threads are waiting on the given condition
associated with this synchronizer. Note that because timeouts
and interrupts may occur at any time, a {@code true} return
does not guarantee that a future {@code signal} will awaken
any threads.  This method is designed primarily for use in
monitoring of the system state.

@param condition the condition
@return {@code true} if there are any waiting threads
@throws IllegalMonitorStateException if exclusive synchronization
        is not held
@throws IllegalArgumentException if the given condition is
        not associated with this synchronizer
@throws NullPointerException if the condition is null

## AbstractQueuedLongSynchronizer.getWaitQueueLength(ConditionObject)

```java
public final int getWaitQueueLength(ConditionObject condition)
```

Returns an estimate of the number of threads waiting on the
given condition associated with this synchronizer. Note that
because timeouts and interrupts may occur at any time, the
estimate serves only as an upper bound on the actual number of
waiters.  This method is designed for use in monitoring system
state, not for synchronization control.

@param condition the condition
@return the estimated number of waiting threads
@throws IllegalMonitorStateException if exclusive synchronization
        is not held
@throws IllegalArgumentException if the given condition is
        not associated with this synchronizer
@throws NullPointerException if the condition is null

## AbstractQueuedLongSynchronizer.getWaitingThreads(ConditionObject)

```java
public final Collection<Thread> getWaitingThreads(ConditionObject condition)
```

Returns a collection containing those threads that may be
waiting on the given condition associated with this
synchronizer.  Because the actual set of threads may change
dynamically while constructing this result, the returned
collection is only a best-effort estimate. The elements of the
returned collection are in no particular order.

@param condition the condition
@return the collection of threads
@throws IllegalMonitorStateException if exclusive synchronization
        is not held
@throws IllegalArgumentException if the given condition is
        not associated with this synchronizer
@throws NullPointerException if the condition is null

## AbstractQueuedLongSynchronizer.ConditionObject()

```java
public ConditionObject()
```

Creates a new {@code ConditionObject} instance.

## AbstractQueuedLongSynchronizer.signal()

```java
public final void signal()
```

Moves the longest-waiting thread, if one exists, from the
wait queue for this condition to the wait queue for the
owning lock.

@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedLongSynchronizer.signalAll()

```java
public final void signalAll()
```

Moves all threads from the wait queue for this condition to
the wait queue for the owning lock.

@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedLongSynchronizer.awaitUninterruptibly()

```java
public final void awaitUninterruptibly()
```

Implements uninterruptible condition wait.
<ol>
<li>Save lock state returned by {@link #getState}.
<li>Invoke {@link #release} with saved state as argument,
    throwing IllegalMonitorStateException if it fails.
<li>Block until signalled.
<li>Reacquire by invoking underlying version of
    {@link #acquire(long)} with saved state as argument.
</ol>

## AbstractQueuedLongSynchronizer.await()

```java
public final void await() throws InterruptedException
```

Implements interruptible condition wait.
<ol>
<li>If current thread is interrupted, throw InterruptedException.
<li>Save lock state returned by {@link #getState}.
<li>Invoke {@link #release} with saved state as argument,
    throwing IllegalMonitorStateException if it fails.
<li>Block until signalled or interrupted.
<li>Reacquire by invoking underlying version of
    {@link #acquire(long)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
</ol>

## AbstractQueuedLongSynchronizer.awaitNanos(long)

```java
public final long awaitNanos(long nanosTimeout) throws InterruptedException
```

Implements timed condition wait.
<ol>
<li>If current thread is interrupted, throw InterruptedException.
<li>Save lock state returned by {@link #getState}.
<li>Invoke {@link #release} with saved state as argument,
    throwing IllegalMonitorStateException if it fails.
<li>Block until signalled, interrupted, or timed out.
<li>Reacquire by invoking underlying version of
    {@link #acquire(long)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
</ol>

## AbstractQueuedLongSynchronizer.awaitUntil(Date)

```java
public final boolean awaitUntil(Date deadline) throws InterruptedException
```

Implements absolute timed condition wait.
<ol>
<li>If current thread is interrupted, throw InterruptedException.
<li>Save lock state returned by {@link #getState}.
<li>Invoke {@link #release} with saved state as argument,
    throwing IllegalMonitorStateException if it fails.
<li>Block until signalled, interrupted, or timed out.
<li>Reacquire by invoking underlying version of
    {@link #acquire(long)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
<li>If timed out while blocked in step 4, return false, else true.
</ol>

## AbstractQueuedLongSynchronizer.await(long, TimeUnit)

```java
public final boolean await(long time, TimeUnit unit) throws InterruptedException
```

Implements timed condition wait.
<ol>
<li>If current thread is interrupted, throw InterruptedException.
<li>Save lock state returned by {@link #getState}.
<li>Invoke {@link #release} with saved state as argument,
    throwing IllegalMonitorStateException if it fails.
<li>Block until signalled, interrupted, or timed out.
<li>Reacquire by invoking underlying version of
    {@link #acquire(long)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
<li>If timed out while blocked in step 4, return false, else true.
</ol>

## AbstractQueuedLongSynchronizer.hasWaiters()

```java
protected final boolean hasWaiters()
```

Queries whether any threads are waiting on this condition.
Implements {@link AbstractQueuedLongSynchronizer#hasWaiters(ConditionObject)}.

@return {@code true} if there are any waiting threads
@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedLongSynchronizer.getWaitQueueLength()

```java
protected final int getWaitQueueLength()
```

Returns an estimate of the number of threads waiting on
this condition.
Implements {@link AbstractQueuedLongSynchronizer#getWaitQueueLength(ConditionObject)}.

@return the estimated number of waiting threads
@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedLongSynchronizer.getWaitingThreads()

```java
protected final Collection<Thread> getWaitingThreads()
```

Returns a collection containing those threads that may be
waiting on this Condition.
Implements {@link AbstractQueuedLongSynchronizer#getWaitingThreads(ConditionObject)}.

@return the collection of threads
@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}