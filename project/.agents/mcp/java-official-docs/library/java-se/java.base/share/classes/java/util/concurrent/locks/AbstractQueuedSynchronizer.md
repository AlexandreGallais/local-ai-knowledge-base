# AbstractQueuedSynchronizer class (java.util.concurrent.locks)

```java
public abstract class AbstractQueuedSynchronizer extends AbstractOwnableSynchronizer implements java.io.Serializable
```

Provides a framework for implementing blocking locks and related
synchronizers (semaphores, events, etc) that rely on
first-in-first-out (FIFO) wait queues.  This class is designed to
be a useful basis for most kinds of synchronizers that rely on a
single atomic {@code int} value to represent state. Subclasses
must define the protected methods that change this state, and which
define what that state means in terms of this object being acquired
or released.  Given these, the other methods in this class carry
out all queuing and blocking mechanics. Subclasses can maintain
other state fields, but only the atomically updated {@code int}
value manipulated using methods {@link #getState}, {@link
#setState} and {@link #compareAndSetState} is tracked with respect
to synchronization.

<p>Subclasses should be defined as non-public internal helper
classes that are used to implement the synchronization properties
of their enclosing class.  Class
{@code AbstractQueuedSynchronizer} does not implement any
synchronization interface.  Instead it defines methods such as
{@link #acquireInterruptibly} that can be invoked as
appropriate by concrete locks and related synchronizers to
implement their public methods.

<p>This class supports either or both a default <em>exclusive</em>
mode and a <em>shared</em> mode. When acquired in exclusive mode,
attempted acquires by other threads cannot succeed. Shared mode
acquires by multiple threads may (but need not) succeed. This class
does not &quot;understand&quot; these differences except in the
mechanical sense that when a shared mode acquire succeeds, the next
waiting thread (if one exists) must also determine whether it can
acquire as well. Threads waiting in the different modes share the
same FIFO queue. Usually, implementation subclasses support only
one of these modes, but both can come into play for example in a
{@link ReadWriteLock}. Subclasses that support only exclusive or
only shared modes need not define the methods supporting the unused mode.

<p>This class defines a nested {@link ConditionObject} class that
can be used as a {@link Condition} implementation by subclasses
supporting exclusive mode for which method {@link
#isHeldExclusively} reports whether synchronization is exclusively
held with respect to the current thread, method {@link #release}
invoked with the current {@link #getState} value fully releases
this object, and the underlying version of {@link #acquire(int)},
given this saved state value, eventually restores this object to
its previous acquired state.
No {@code AbstractQueuedSynchronizer} method otherwise creates such a
condition, so if this constraint cannot be met, do not use it.  The
behavior of {@link ConditionObject} depends of course on the
semantics of its synchronizer implementation.

<p>This class provides inspection, instrumentation, and monitoring
methods for the internal queue, as well as similar methods for
condition objects. These can be exported as desired into classes
using an {@code AbstractQueuedSynchronizer} for their
synchronization mechanics.

<p>Serialization of this class stores only the underlying atomic
integer maintaining state, so deserialized objects have empty
thread queues. Typical subclasses requiring serializability will
define a {@code readObject} method that restores this to a known
initial state upon deserialization.

<h2>Usage</h2>

<p>To use this class as the basis of a synchronizer, redefine the
following methods, as applicable, by inspecting and/or modifying
the synchronization state using {@link #getState}, {@link
#setState} and/or {@link #compareAndSetState}:

<ul>
<li>{@link #tryAcquire}
<li>{@link #tryRelease}
<li>{@link #tryAcquireShared}
<li>{@link #tryReleaseShared}
<li>{@link #isHeldExclusively}
</ul>

Each of these methods by default throws {@link
UnsupportedOperationException}.  Implementations of these methods
must be internally thread-safe, and should in general be short and
not block. Defining these methods is the <em>only</em> supported
means of using this class. All other methods are declared
{@code final} because they cannot be independently varied.

<p>You may also find the inherited methods from {@link
AbstractOwnableSynchronizer} useful to keep track of the thread
owning an exclusive synchronizer.  You are encouraged to use them
-- this enables monitoring and diagnostic tools to assist users in
determining which threads hold locks.

<p>Even though this class is based on an internal FIFO queue, it
does not automatically enforce FIFO acquisition policies.  The core
of exclusive synchronization takes the form:

<pre>
<em>Acquire:</em>
    while (!tryAcquire(arg)) {
       <em>enqueue thread if it is not already queued</em>;
       <em>possibly block current thread</em>;
    }

<em>Release:</em>
    if (tryRelease(arg))
       <em>unblock the first queued thread</em>;
</pre>

(Shared mode is similar but may involve cascading signals.)

<p id="barging">Because checks in acquire are invoked before
enqueuing, a newly acquiring thread may <em>barge</em> ahead of
others that are blocked and queued.  However, you can, if desired,
define {@code tryAcquire} and/or {@code tryAcquireShared} to
disable barging by internally invoking one or more of the inspection
methods, thereby providing a <em>fair</em> FIFO acquisition order.
In particular, most fair synchronizers can define {@code tryAcquire}
to return {@code false} if {@link #hasQueuedPredecessors} (a method
specifically designed to be used by fair synchronizers) returns
{@code true}.  Other variations are possible.

<p>Throughput and scalability are generally highest for the
default barging (also known as <em>greedy</em>,
<em>renouncement</em>, and <em>convoy-avoidance</em>) strategy.
While this is not guaranteed to be fair or starvation-free, earlier
queued threads are allowed to recontend before later queued
threads, and each recontention has an unbiased chance to succeed
against incoming threads.  Also, while acquires do not
&quot;spin&quot; in the usual sense, they may perform multiple
invocations of {@code tryAcquire} interspersed with other
computations before blocking.  This gives most of the benefits of
spins when exclusive synchronization is only briefly held, without
most of the liabilities when it isn't. If so desired, you can
augment this by preceding calls to acquire methods with
"fast-path" checks, possibly prechecking {@link #hasContended}
and/or {@link #hasQueuedThreads} to only do so if the synchronizer
is likely not to be contended.

<p>This class provides an efficient and scalable basis for
synchronization in part by specializing its range of use to
synchronizers that can rely on {@code int} state, acquire, and
release parameters, and an internal FIFO wait queue. When this does
not suffice, you can build synchronizers from a lower level using
{@link java.util.concurrent.atomic atomic} classes, your own custom
{@link java.util.Queue} classes, and {@link LockSupport} blocking
support.

<h2>Usage Examples</h2>

<p>Here is a non-reentrant mutual exclusion lock class that uses
the value zero to represent the unlocked state, and one to
represent the locked state. While a non-reentrant lock
does not strictly require recording of the current owner
thread, this class does so anyway to make usage easier to monitor.
It also supports conditions and exposes some instrumentation methods:

<pre> {@code
class Mutex implements Lock, java.io.Serializable {

  // Our internal helper class
  private static class Sync extends AbstractQueuedSynchronizer {
    // Acquires the lock if state is zero
    public boolean tryAcquire(int acquires) {
      assert acquires == 1; // Otherwise unused
      if (compareAndSetState(0, 1)) {
        setExclusiveOwnerThread(Thread.currentThread());
        return true;
      }
      return false;
    }

    // Releases the lock by setting state to zero
    protected boolean tryRelease(int releases) {
      assert releases == 1; // Otherwise unused
      if (!isHeldExclusively())
        throw new IllegalMonitorStateException();
      setExclusiveOwnerThread(null);
      setState(0);
      return true;
    }

    // Reports whether in locked state
    public boolean isLocked() {
      return getState() != 0;
    }

    public boolean isHeldExclusively() {
      // a data race, but safe due to out-of-thin-air guarantees
      return getExclusiveOwnerThread() == Thread.currentThread();
    }

    // Provides a Condition
    public Condition newCondition() {
      return new ConditionObject();
    }

    // Deserializes properly
    private void readObject(ObjectInputStream s)
        throws IOException, ClassNotFoundException {
      s.defaultReadObject();
      setState(0); // reset to unlocked state
    }
  }

  // The sync object does all the hard work. We just forward to it.
  private final Sync sync = new Sync();

  public void lock()              { sync.acquire(1); }
  public boolean tryLock()        { return sync.tryAcquire(1); }
  public void unlock()            { sync.release(1); }
  public Condition newCondition() { return sync.newCondition(); }
  public boolean isLocked()       { return sync.isLocked(); }
  public boolean isHeldByCurrentThread() {
    return sync.isHeldExclusively();
  }
  public boolean hasQueuedThreads() {
    return sync.hasQueuedThreads();
  }
  public void lockInterruptibly() throws InterruptedException {
    sync.acquireInterruptibly(1);
  }
  public boolean tryLock(long timeout, TimeUnit unit)
      throws InterruptedException {
    return sync.tryAcquireNanos(1, unit.toNanos(timeout));
  }
}}</pre>

<p>Here is a latch class that is like a
{@link java.util.concurrent.CountDownLatch CountDownLatch}
except that it only requires a single {@code signal} to
fire. Because a latch is non-exclusive, it uses the {@code shared}
acquire and release methods.

<pre> {@code
class BooleanLatch {

  private static class Sync extends AbstractQueuedSynchronizer {
    boolean isSignalled() { return getState() != 0; }

    protected int tryAcquireShared(int ignore) {
      return isSignalled() ? 1 : -1;
    }

    protected boolean tryReleaseShared(int ignore) {
      setState(1);
      return true;
    }
  }

  private final Sync sync = new Sync();
  public boolean isSignalled() { return sync.isSignalled(); }
  public void signal()         { sync.releaseShared(1); }
  public void await() throws InterruptedException {
    sync.acquireSharedInterruptibly(1);
  }
}}</pre>

@since 1.5
@author Doug Lea

## AbstractQueuedSynchronizer.AbstractQueuedSynchronizer()

```java
protected AbstractQueuedSynchronizer()
```

Creates a new {@code AbstractQueuedSynchronizer} instance
with initial synchronization state of zero.

## AbstractQueuedSynchronizer.isReleasable()

```java
public final boolean isReleasable()
```

Allows Conditions to be used in ForkJoinPools without
risking fixed pool exhaustion. This is usable only for
untimed Condition waits, not timed versions.

## AbstractQueuedSynchronizer.getState()

```java
protected final int getState()
```

Returns the current value of synchronization state.
This operation has memory semantics of a {@code volatile} read.
@return current state value

## AbstractQueuedSynchronizer.setState(int)

```java
protected final void setState(int newState)
```

Sets the value of synchronization state.
This operation has memory semantics of a {@code volatile} write.
@param newState the new state value

## AbstractQueuedSynchronizer.compareAndSetState(int, int)

```java
protected final boolean compareAndSetState(int expect, int update)
```

Atomically sets synchronization state to the given updated
value if the current state value equals the expected value.
This operation has memory semantics of a {@code volatile} read
and write.

@param expect the expected value
@param update the new value
@return {@code true} if successful. False return indicates that the actual
        value was not equal to the expected value.

## AbstractQueuedSynchronizer.tryAcquire(int)

```java
protected boolean tryAcquire(int arg)
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

## AbstractQueuedSynchronizer.tryRelease(int)

```java
protected boolean tryRelease(int arg)
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

## AbstractQueuedSynchronizer.tryAcquireShared(int)

```java
protected int tryAcquireShared(int arg)
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

## AbstractQueuedSynchronizer.tryReleaseShared(int)

```java
protected boolean tryReleaseShared(int arg)
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

## AbstractQueuedSynchronizer.isHeldExclusively()

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

## AbstractQueuedSynchronizer.acquire(int)

```java
public final void acquire(int arg)
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

## AbstractQueuedSynchronizer.acquireInterruptibly(int)

```java
public final void acquireInterruptibly(int arg) throws InterruptedException
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

## AbstractQueuedSynchronizer.tryAcquireNanos(int, long)

```java
public final boolean tryAcquireNanos(int arg, long nanosTimeout) throws InterruptedException
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

## AbstractQueuedSynchronizer.release(int)

```java
public final boolean release(int arg)
```

Releases in exclusive mode.  Implemented by unblocking one or
more threads if {@link #tryRelease} returns true.
This method can be used to implement method {@link Lock#unlock}.

@param arg the release argument.  This value is conveyed to
       {@link #tryRelease} but is otherwise uninterpreted and
       can represent anything you like.
@return the value returned from {@link #tryRelease}

## AbstractQueuedSynchronizer.acquireShared(int)

```java
public final void acquireShared(int arg)
```

Acquires in shared mode, ignoring interrupts.  Implemented by
first invoking at least once {@link #tryAcquireShared},
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking {@link
#tryAcquireShared} until success.

@param arg the acquire argument.  This value is conveyed to
       {@link #tryAcquireShared} but is otherwise uninterpreted
       and can represent anything you like.

## AbstractQueuedSynchronizer.acquireSharedInterruptibly(int)

```java
public final void acquireSharedInterruptibly(int arg) throws InterruptedException
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

## AbstractQueuedSynchronizer.tryAcquireSharedNanos(int, long)

```java
public final boolean tryAcquireSharedNanos(int arg, long nanosTimeout) throws InterruptedException
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

## AbstractQueuedSynchronizer.releaseShared(int)

```java
public final boolean releaseShared(int arg)
```

Releases in shared mode.  Implemented by unblocking one or more
threads if {@link #tryReleaseShared} returns true.

@param arg the release argument.  This value is conveyed to
       {@link #tryReleaseShared} but is otherwise uninterpreted
       and can represent anything you like.
@return the value returned from {@link #tryReleaseShared}

## AbstractQueuedSynchronizer.hasQueuedThreads()

```java
public final boolean hasQueuedThreads()
```

Queries whether any threads are waiting to acquire. Note that
because cancellations due to interrupts and timeouts may occur
at any time, a {@code true} return does not guarantee that any
other thread will ever acquire.

@return {@code true} if there may be other threads waiting to acquire

## AbstractQueuedSynchronizer.hasContended()

```java
public final boolean hasContended()
```

Queries whether any threads have ever contended to acquire this
synchronizer; that is, if an acquire method has ever blocked.

<p>In this implementation, this operation returns in
constant time.

@return {@code true} if there has ever been contention

## AbstractQueuedSynchronizer.getFirstQueuedThread()

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

## AbstractQueuedSynchronizer.isQueued(Thread)

```java
public final boolean isQueued(Thread thread)
```

Returns true if the given thread is currently queued.

<p>This implementation traverses the queue to determine
presence of the given thread.

@param thread the thread
@return {@code true} if the given thread is on the queue
@throws NullPointerException if the thread is null

## AbstractQueuedSynchronizer.hasQueuedPredecessors()

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
protected boolean tryAcquire(int arg) {
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

## AbstractQueuedSynchronizer.getQueueLength()

```java
public final int getQueueLength()
```

Returns an estimate of the number of threads waiting to
acquire.  The value is only an estimate because the number of
threads may change dynamically while this method traverses
internal data structures.  This method is designed for use in
monitoring system state, not for synchronization control.

@return the estimated number of threads waiting to acquire

## AbstractQueuedSynchronizer.getQueuedThreads()

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

## AbstractQueuedSynchronizer.getExclusiveQueuedThreads()

```java
public final Collection<Thread> getExclusiveQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in exclusive mode. This has the same properties
as {@link #getQueuedThreads} except that it only returns
those threads waiting due to an exclusive acquire.

@return the collection of threads

## AbstractQueuedSynchronizer.getSharedQueuedThreads()

```java
public final Collection<Thread> getSharedQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in shared mode. This has the same properties
as {@link #getQueuedThreads} except that it only returns
those threads waiting due to a shared acquire.

@return the collection of threads

## AbstractQueuedSynchronizer.toString()

```java
public String toString()
```

Returns a string identifying this synchronizer, as well as its state.
The state, in brackets, includes the String {@code "State ="}
followed by the current value of {@link #getState}, and either
{@code "nonempty"} or {@code "empty"} depending on whether the
queue is empty.

@return a string identifying this synchronizer, as well as its state

## AbstractQueuedSynchronizer.owns(ConditionObject)

```java
public final boolean owns(ConditionObject condition)
```

Queries whether the given ConditionObject
uses this synchronizer as its lock.

@param condition the condition
@return {@code true} if owned
@throws NullPointerException if the condition is null

## AbstractQueuedSynchronizer.hasWaiters(ConditionObject)

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

## AbstractQueuedSynchronizer.getWaitQueueLength(ConditionObject)

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

## AbstractQueuedSynchronizer.getWaitingThreads(ConditionObject)

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

## AbstractQueuedSynchronizer.ConditionObject()

```java
public ConditionObject()
```

Creates a new {@code ConditionObject} instance.

## AbstractQueuedSynchronizer.signal()

```java
public final void signal()
```

Moves the longest-waiting thread, if one exists, from the
wait queue for this condition to the wait queue for the
owning lock.

@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedSynchronizer.signalAll()

```java
public final void signalAll()
```

Moves all threads from the wait queue for this condition to
the wait queue for the owning lock.

@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedSynchronizer.awaitUninterruptibly()

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
    {@link #acquire(int)} with saved state as argument.
</ol>

## AbstractQueuedSynchronizer.await()

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
    {@link #acquire(int)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
</ol>

## AbstractQueuedSynchronizer.awaitNanos(long)

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
    {@link #acquire(int)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
</ol>

## AbstractQueuedSynchronizer.awaitUntil(Date)

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
    {@link #acquire(int)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
<li>If timed out while blocked in step 4, return false, else true.
</ol>

## AbstractQueuedSynchronizer.await(long, TimeUnit)

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
    {@link #acquire(int)} with saved state as argument.
<li>If interrupted while blocked in step 4, throw InterruptedException.
<li>If timed out while blocked in step 4, return false, else true.
</ol>

## AbstractQueuedSynchronizer.hasWaiters()

```java
protected final boolean hasWaiters()
```

Queries whether any threads are waiting on this condition.
Implements {@link AbstractQueuedSynchronizer#hasWaiters(ConditionObject)}.

@return {@code true} if there are any waiting threads
@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedSynchronizer.getWaitQueueLength()

```java
protected final int getWaitQueueLength()
```

Returns an estimate of the number of threads waiting on
this condition.
Implements {@link AbstractQueuedSynchronizer#getWaitQueueLength(ConditionObject)}.

@return the estimated number of waiting threads
@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}

## AbstractQueuedSynchronizer.getWaitingThreads()

```java
protected final Collection<Thread> getWaitingThreads()
```

Returns a collection containing those threads that may be
waiting on this Condition.
Implements {@link AbstractQueuedSynchronizer#getWaitingThreads(ConditionObject)}.

@return the collection of threads
@throws IllegalMonitorStateException if {@link #isHeldExclusively}
        returns {@code false}