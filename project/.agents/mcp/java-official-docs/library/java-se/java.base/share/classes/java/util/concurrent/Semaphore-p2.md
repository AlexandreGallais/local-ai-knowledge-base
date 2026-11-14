---
title: "Semaphore class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Semaphore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Semaphore class (java.util.concurrent) (part 2 of 2)

## Semaphore.tryAcquire(int, long, TimeUnit)

```java
public boolean tryAcquire(int permits, long timeout, TimeUnit unit) throws InterruptedException
```

Acquires the given number of permits from this semaphore, if all
become available within the given waiting time and the current
thread has not been interrupted.

Acquires the given number of permits, if they are available and
returns immediately, with the value `true`,
reducing the number of available permits by the given amount.

If insufficient permits are available then
the current thread becomes disabled for thread scheduling
purposes and lies dormant until one of three things happens:

- Some other thread invokes one of the release
methods for this semaphore and the current thread is next to be assigned
permits and the number of available permits satisfies this request; or

- Some other thread interrupts
the current thread; or

- The specified waiting time elapses.

If the permits are acquired then the value `true` is returned.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while waiting
to acquire the permits,

then `InterruptedException` is thrown and the current thread's
interrupted status is cleared.
Any permits that were to be assigned to this thread, are instead
assigned to other threads trying to acquire permits, as if
the permits had been made available by a call to `release()`.

If the specified waiting time elapses then the value `false`
is returned.  If the time is less than or equal to zero, the method
will not wait at all.  Any permits that were to be assigned to this
thread, are instead assigned to other threads trying to acquire
permits, as if the permits had been made available by a call to
`release()`.

Parameters:

- `permits`: the number of permits to acquire
- `timeout`: the maximum time to wait for the permits
- `unit`: the time unit of the `timeout` argument

**Returns:** `true` if all permits were acquired and `false`
        if the waiting time elapsed before all permits were acquired

Throws:

- `InterruptedException`: if the current thread is interrupted
- `IllegalArgumentException`: if `permits` is negative

## Semaphore.release(int)

```java
public void release(int permits)
```

Releases the given number of permits, returning them to the semaphore.

Releases the given number of permits, increasing the number of
available permits by that amount.
If any threads are trying to acquire permits, then one thread
is selected and given the permits that were just released.
If the number of available permits satisfies that thread's request
then that thread is (re)enabled for thread scheduling purposes;
otherwise the thread will wait until sufficient permits are available.
If there are still permits available
after this thread's request has been satisfied, then those permits
are assigned in turn to other threads trying to acquire permits.

There is no requirement that a thread that releases a permit must
have acquired that permit by calling acquire.
Correct usage of a semaphore is established by programming convention
in the application.

Parameters:

- `permits`: the number of permits to release

Throws:

- `IllegalArgumentException`: if `permits` is negative

## Semaphore.availablePermits()

```java
public int availablePermits()
```

Returns the current number of permits available in this semaphore.

This method is typically used for debugging and testing purposes.

**Returns:** the number of permits available in this semaphore

## Semaphore.drainPermits()

```java
public int drainPermits()
```

Acquires and returns all permits that are immediately
available, or if negative permits are available, releases them.
Upon return, zero permits are available.

**Returns:** the number of permits acquired or, if negative, the
number released

## Semaphore.reducePermits(int)

```java
protected void reducePermits(int reduction)
```

Shrinks the number of available permits by the indicated
reduction. This method can be useful in subclasses that use
semaphores to track resources that become unavailable. This
method differs from `acquire` in that it does not block
waiting for permits to become available.

Parameters:

- `reduction`: the number of permits to remove

Throws:

- `IllegalArgumentException`: if `reduction` is negative

## Semaphore.isFair()

```java
public boolean isFair()
```

Returns `true` if this semaphore has fairness set true.

**Returns:** `true` if this semaphore has fairness set true

## Semaphore.hasQueuedThreads()

```java
public final boolean hasQueuedThreads()
```

Queries whether any threads are waiting to acquire. Note that
because cancellations may occur at any time, a `true`
return does not guarantee that any other thread will ever
acquire.  This method is designed primarily for use in
monitoring of the system state.

**Returns:** `true` if there may be other threads waiting to
        acquire the lock

## Semaphore.getQueueLength()

```java
public final int getQueueLength()
```

Returns an estimate of the number of threads waiting to acquire.
The value is only an estimate because the number of threads may
change dynamically while this method traverses internal data
structures.  This method is designed for use in monitoring
system state, not for synchronization control.

**Returns:** the estimated number of threads waiting for this lock

## Semaphore.getQueuedThreads()

```java
protected Collection<Thread> getQueuedThreads()
```

Returns a collection containing threads that may be waiting to acquire.
Because the actual set of threads may change dynamically while
constructing this result, the returned collection is only a best-effort
estimate.  The elements of the returned collection are in no particular
order.  This method is designed to facilitate construction of
subclasses that provide more extensive monitoring facilities.

**Returns:** the collection of threads

## Semaphore.toString()

```java
public String toString()
```

Returns a string identifying this semaphore, as well as its state.
The state, in brackets, includes the String `"Permits ="`
followed by the number of permits.

**Returns:** a string identifying this semaphore, as well as its state
