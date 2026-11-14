---
title: "Semaphore class (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Semaphore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Semaphore class (java.util.concurrent)

```java
public class Semaphore implements java.io.Serializable
```

A counting semaphore.  Conceptually, a semaphore maintains a set of
permits.  Each `acquire` blocks if necessary until a permit is
available, and then takes it.  Each `release` adds a permit,
potentially releasing a blocking acquirer.
However, no actual permit objects are used; the `Semaphore` just
keeps a count of the number available and acts accordingly.

Semaphores are often used to restrict the number of threads than can
access some (physical or logical) resource. For example, here is
a class that uses a semaphore to control access to a pool of items:

```java
class Pool {
  private static final int MAX_AVAILABLE = 100;
  private final Semaphore available = new Semaphore(MAX_AVAILABLE, true);

  public Object getItem() throws InterruptedException {
    available.acquire();
    return getNextAvailableItem();
  }

  public void putItem(Object x) {
    if (markAsUnused(x))
      available.release();
  }

  // Not a particularly efficient data structure; just for demo

  protected Object[] items = ...; // whatever kinds of items being managed
  protected boolean[] used = new boolean[MAX_AVAILABLE];

  protected synchronized Object getNextAvailableItem() {
    for (int i = 0; i < MAX_AVAILABLE; ++i) {
      if (!used[i]) {
        used[i] = true;
        return items[i];
      }
    }
    return null; // not reached
  }

  protected synchronized boolean markAsUnused(Object item) {
    for (int i = 0; i < MAX_AVAILABLE; ++i) {
      if (item == items[i]) {
        if (used[i]) {
          used[i] = false;
          return true;
        } else
          return false;
      }
    }
    return false;
  }
}
```

Before obtaining an item each thread must acquire a permit from
the semaphore, guaranteeing that an item is available for use. When
the thread has finished with the item it is returned back to the
pool and a permit is returned to the semaphore, allowing another
thread to acquire that item.  Note that no synchronization lock is
held when `acquire` is called as that would prevent an item
from being returned to the pool.  The semaphore encapsulates the
synchronization needed to restrict access to the pool, separately
from any synchronization needed to maintain the consistency of the
pool itself.

A semaphore initialized to one, and which is used such that it
only has at most one permit available, can serve as a mutual
exclusion lock.  This is more commonly known as a *binary
semaphore*, because it only has two states: one permit
available, or zero permits available.  When used in this way, the
binary semaphore has the property (unlike many `java.util.concurrent.locks.Lock`
implementations), that the "lock" can be released by a
thread other than the owner (as semaphores have no notion of
ownership).  This can be useful in some specialized contexts, such
as deadlock recovery.

The constructor for this class optionally accepts a
*fairness* parameter. When set false, this class makes no
guarantees about the order in which threads acquire permits. In
particular, *barging* is permitted, that is, a thread
invoking `acquire` can be allocated a permit ahead of a
thread that has been waiting - logically the new thread places itself at
the head of the queue of waiting threads. When fairness is set true, the
semaphore guarantees that threads invoking any of the acquire methods are selected to obtain permits in the order in
which their invocation of those methods was processed
(first-in-first-out; FIFO). Note that FIFO ordering necessarily
applies to specific internal points of execution within these
methods.  So, it is possible for one thread to invoke
`acquire` before another, but reach the ordering point after
the other, and similarly upon return from the method.
Also note that the untimed tryAcquire methods do not
honor the fairness setting, but will take any permits that are
available.

Generally, semaphores used to control resource access should be
initialized as fair, to ensure that no thread is starved out from
accessing a resource. When using semaphores for other kinds of
synchronization control, the throughput advantages of non-fair
ordering often outweigh fairness considerations.

This class also provides convenience methods to acquire and release multiple
permits at a time. These methods are generally more efficient and
effective than loops. However, they do not establish any preference
order. For example, if thread A invokes `s.acquire(3`) and
thread B invokes `s.acquire(2)`, and two permits become
available, then there is no guarantee that thread B will obtain
them unless its acquire came first and Semaphore `s` is in
fair mode.

Memory consistency effects: Actions in a thread prior to calling
a "release" method such as `release()`
*happen-before*
actions following a successful "acquire" method such as `acquire()`
in another thread.

**Since:** 1.5

## Semaphore.Semaphore(int)

```java
public Semaphore(int permits)
```

Creates a `Semaphore` with the given number of
permits and nonfair fairness setting.

Parameters:

- `permits`: the initial number of permits available. This value may be negative, in which case releases must occur before any acquires will be granted.

## Semaphore.Semaphore(int, boolean)

```java
public Semaphore(int permits, boolean fair)
```

Creates a `Semaphore` with the given number of
permits and the given fairness setting.

Parameters:

- `permits`: the initial number of permits available. This value may be negative, in which case releases must occur before any acquires will be granted.
- `fair`: `true` if this semaphore will guarantee first-in first-out granting of permits under contention, else `false`

## Semaphore.acquire()

```java
public void acquire() throws InterruptedException
```

Acquires a permit from this semaphore, blocking until one is
available, or the thread is interrupted.

Acquires a permit, if one is available and returns immediately,
reducing the number of available permits by one.

If no permit is available then the current thread becomes
disabled for thread scheduling purposes and lies dormant until
one of two things happens:

- Some other thread invokes the `release` method for this
semaphore and the current thread is next to be assigned a permit; or

- Some other thread interrupts
the current thread.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while waiting
for a permit,

then `InterruptedException` is thrown and the current thread's
interrupted status is cleared.

Throws:

- `InterruptedException`: if the current thread is interrupted

## Semaphore.acquireUninterruptibly()

```java
public void acquireUninterruptibly()
```

Acquires a permit from this semaphore, blocking until one is
available.

Acquires a permit, if one is available and returns immediately,
reducing the number of available permits by one.

If no permit is available then the current thread becomes
disabled for thread scheduling purposes and lies dormant until
some other thread invokes the `release` method for this
semaphore and the current thread is next to be assigned a permit.

If the current thread is interrupted
while waiting for a permit then it will continue to wait, but the
time at which the thread is assigned a permit may change compared to
the time it would have received the permit had no interruption
occurred.  When the thread does return from this method its interrupt
status will be set.

## Semaphore.tryAcquire()

```java
public boolean tryAcquire()
```

Acquires a permit from this semaphore, only if one is available at the
time of invocation.

Acquires a permit, if one is available and returns immediately,
with the value `true`,
reducing the number of available permits by one.

If no permit is available then this method will return
immediately with the value `false`.

Even when this semaphore has been set to use a
fair ordering policy, a call to `tryAcquire()` *will*
immediately acquire a permit if one is available, whether or not
other threads are currently waiting.
This "barging" behavior can be useful in certain
circumstances, even though it breaks fairness. If you want to honor
the fairness setting, then use
TimeUnit) tryAcquire(0, TimeUnit.SECONDS)
which is almost equivalent (it also detects interruption).

**Returns:** `true` if a permit was acquired and `false`
        otherwise

## Semaphore.tryAcquire(long, TimeUnit)

```java
public boolean tryAcquire(long timeout, TimeUnit unit) throws InterruptedException
```

Acquires a permit from this semaphore, if one becomes available
within the given waiting time and the current thread has not
been interrupted.

Acquires a permit, if one is available and returns immediately,
with the value `true`,
reducing the number of available permits by one.

If no permit is available then the current thread becomes
disabled for thread scheduling purposes and lies dormant until
one of three things happens:

- Some other thread invokes the `release` method for this
semaphore and the current thread is next to be assigned a permit; or

- Some other thread interrupts
the current thread; or

- The specified waiting time elapses.

If a permit is acquired then the value `true` is returned.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while waiting
to acquire a permit,

then `InterruptedException` is thrown and the current thread's
interrupted status is cleared.

If the specified waiting time elapses then the value `false`
is returned.  If the time is less than or equal to zero, the method
will not wait at all.

Parameters:

- `timeout`: the maximum time to wait for a permit
- `unit`: the time unit of the `timeout` argument

**Returns:** `true` if a permit was acquired and `false`
        if the waiting time elapsed before a permit was acquired

Throws:

- `InterruptedException`: if the current thread is interrupted

## Semaphore.release()

```java
public void release()
```

Releases a permit, returning it to the semaphore.

Releases a permit, increasing the number of available permits by
one.  If any threads are trying to acquire a permit, then one is
selected and given the permit that was just released.  That thread
is (re)enabled for thread scheduling purposes.

There is no requirement that a thread that releases a permit must
have acquired that permit by calling `acquire`.
Correct usage of a semaphore is established by programming convention
in the application.

## Semaphore.acquire(int)

```java
public void acquire(int permits) throws InterruptedException
```

Acquires the given number of permits from this semaphore,
blocking until all are available,
or the thread is interrupted.

Acquires the given number of permits, if they are available,
and returns immediately, reducing the number of available permits
by the given amount. This method has the same effect as the
loop `for (int i = 0; i < permits; ++i) acquire();` except
that it atomically acquires the permits all at once:

If insufficient permits are available then the current thread becomes
disabled for thread scheduling purposes and lies dormant until
one of two things happens:

- Some other thread invokes one of the release
methods for this semaphore and the current thread is next to be assigned
permits and the number of available permits satisfies this request; or

- Some other thread interrupts
the current thread.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while waiting
for a permit,

then `InterruptedException` is thrown and the current thread's
interrupted status is cleared.
Any permits that were to be assigned to this thread are instead
assigned to other threads trying to acquire permits, as if
permits had been made available by a call to `release()`.

Parameters:

- `permits`: the number of permits to acquire

Throws:

- `InterruptedException`: if the current thread is interrupted
- `IllegalArgumentException`: if `permits` is negative

## Semaphore.acquireUninterruptibly(int)

```java
public void acquireUninterruptibly(int permits)
```

Acquires the given number of permits from this semaphore,
blocking until all are available.

Acquires the given number of permits, if they are available,
and returns immediately, reducing the number of available permits
by the given amount. This method has the same effect as the
loop `for (int i = 0; i < permits; ++i) acquireUninterruptibly();`
except that it atomically acquires the permits all at once:

If insufficient permits are available then the current thread becomes
disabled for thread scheduling purposes and lies dormant until
some other thread invokes one of the release
methods for this semaphore and the current thread is next to be assigned
permits and the number of available permits satisfies this request.

If the current thread is interrupted
while waiting for permits then it will continue to wait and its
position in the queue is not affected.  When the thread does return
from this method its interrupt status will be set.

Parameters:

- `permits`: the number of permits to acquire

Throws:

- `IllegalArgumentException`: if `permits` is negative

## Semaphore.tryAcquire(int)

```java
public boolean tryAcquire(int permits)
```

Acquires the given number of permits from this semaphore, only
if all are available at the time of invocation.

Acquires the given number of permits, if they are available, and
returns immediately, with the value `true`,
reducing the number of available permits by the given amount.

If insufficient permits are available then this method will return
immediately with the value `false` and the number of available
permits is unchanged.

Even when this semaphore has been set to use a fair ordering
policy, a call to `tryAcquire` *will*
immediately acquire a permit if one is available, whether or
not other threads are currently waiting.  This
"barging" behavior can be useful in certain
circumstances, even though it breaks fairness. If you want to
honor the fairness setting, then use long, TimeUnit) tryAcquire(permits, 0, TimeUnit.SECONDS)
which is almost equivalent (it also detects interruption).

Parameters:

- `permits`: the number of permits to acquire

**Returns:** `true` if the permits were acquired and
        `false` otherwise

Throws:

- `IllegalArgumentException`: if `permits` is negative
