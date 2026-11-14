---
title: "threading --- Thread-based parallelism (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/threading.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# threading --- Thread-based parallelism (part 3 of 5)

### `join(timeout=None)`

Wait until the thread terminates. This blocks the calling thread until
the thread whose `join()` method is called terminates -- either
normally or through an unhandled exception -- or until the optional
timeout occurs.

When the *timeout* argument is present and not `None`, it should be a
real number specifying a timeout for the operation in seconds
(or fractions thereof). As `join()` always returns `None`,
you must call `is_alive()` after `join()` to
decide whether a timeout happened -- if the thread is still alive, the
`join()` call timed out.

When the *timeout* argument is not present or `None`, the operation will
block until the thread terminates.

A thread can be joined many times.

`join()` raises a `RuntimeError` if an attempt is made
to join the current thread as that would cause a deadlock. It is also
an error to `join()` a thread before it has been started
and attempts to do so raise the same exception.

If an attempt is made to join a running daemonic thread in late stages
of Python finalization `join()`
raises a `PythonFinalizationError`.

> *Changed in version 3.14.*
> May raise `PythonFinalizationError`.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

### `name`

A string used for identification purposes only. It has no semantics.
Multiple threads may be given the same name.  The initial name is set by
the constructor.

On some platforms, the thread name is set at the operating system level
when the thread starts, so that it is visible in task managers.
This name may be truncated to fit in a system-specific limit (for example,
15 bytes on Linux or 63 bytes on macOS).

Changes to *name* are only reflected at the OS level when the currently
running thread is renamed. (Setting the *name* attribute of a
different thread only updates the Python Thread object.)

### `getName()`

```python
setName()
```

Deprecated getter/setter API for `name`; use it directly as a
property instead.

> *Deprecated since version 3.10.*

### `ident`

The 'thread identifier' of this thread or `None` if the thread has not
been started.  This is a nonzero integer.  See the `get_ident()`
function.  Thread identifiers may be recycled when a thread exits and
another thread is created.  The identifier is available even after the
thread has exited.

### `native_id`

The Thread ID (`TID`) of this thread, as assigned by the OS (kernel).
This is a non-negative integer, or `None` if the thread has not
been started. See the `get_native_id()` function.
This value may be used to uniquely identify this particular thread
system-wide (until the thread terminates, after which the value
may be recycled by the OS).

> **Note:** Similar to Process IDs, Thread IDs are only valid (guaranteed unique
> system-wide) from the time the thread is created until the thread
> has been terminated.

> **Availability:** Windows, FreeBSD, Linux, macOS, OpenBSD, NetBSD, AIX, DragonFlyBSD.

> *Added in version 3.8.*

### `is_alive()`

Return whether the thread is alive.

This method returns `True` just before the `run()` method
starts until just after the `run()` method terminates.  The
module function `.enumerate()` returns a list of all alive threads.

### `daemon`

A boolean value indicating whether this thread is a daemon thread (`True`)
or not (`False`).  This must be set before `start()` is called,
otherwise `RuntimeError` is raised.  Its initial value is inherited
from the creating thread; the main thread is not a daemon thread and
therefore all threads created in the main thread default to
`daemon` = `False`.

The entire Python program exits when no alive non-daemon threads are left.

### `isDaemon()`

```python
setDaemon()
```

Deprecated getter/setter API for `daemon`; use it directly as a
property instead.

> *Deprecated since version 3.10.*

### Lock objects

A primitive lock is a synchronization primitive that is not owned by a
particular thread when locked.  In Python, it is currently the lowest level
synchronization primitive available, implemented directly by the `_thread`
extension module.

A primitive lock is in one of two states, "locked" or "unlocked". It is created
in the unlocked state.  It has two basic <example-value>, `acquire()` and
`release()`.  When the state is unlocked, `acquire()`
changes the state to locked and returns immediately.  When the state is locked,
`acquire()` blocks until a call to `release()` in another
thread changes it to unlocked, then the `acquire()` call resets it
to locked and returns.  The `release()` method should only be
called in the locked state; it changes the state to unlocked and returns
immediately. If an attempt is made to release an unlocked lock, a
`RuntimeError` will be raised.

Locks also support the context management protocol.

When more than one thread is blocked in `acquire()` waiting for the
state to turn to unlocked, only one thread proceeds when a `release()`
call resets the state to unlocked; which one of the waiting threads proceeds
is not defined, and may vary across implementations.

All methods are executed atomically.

### class `Lock()`

The class implementing primitive lock objects.  Once a thread has acquired a
lock, subsequent attempts to acquire it block, until it is released; any
thread may release it.

> *Changed in version 3.13.*
> `Lock` is now a class. In earlier Pythons, `Lock` was a factory
> function which returned an instance of the underlying private lock
> type.

### `acquire(blocking=True, timeout=-1)`

Acquire a lock, blocking or non-blocking.

When invoked with the *blocking* argument set to `True` (the default),
block until the lock is unlocked, then set it to locked and return `True`.

When invoked with the *blocking* argument set to `False`, do not block.
If a call with *blocking* set to `True` would block, return `False`
immediately; otherwise, set the lock to locked and return `True`.

When invoked with the *timeout* argument set to a positive
value, block for at most the number of seconds specified by *timeout*
and as long as the lock cannot be acquired.  A *timeout* argument of `-1`
specifies an unbounded wait.  It is forbidden to specify a *timeout*
when *blocking* is `False`.

The return value is `True` if the lock is acquired successfully,
`False` if not (for example if the *timeout* expired).

> *Changed in version 3.2.*
> The *timeout* parameter is new.

> *Changed in version 3.2.*
> Lock acquisition can now be interrupted by signals on POSIX if the
> underlying threading implementation supports it.

> *Changed in version 3.14.*
> Lock acquisition can now be interrupted by signals on Windows.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

### `release()`

Release a lock.  This can be called from any thread, not only the thread
which has acquired the lock.

When the lock is locked, reset it to unlocked, and return.  If any other threads
are blocked waiting for the lock to become unlocked, allow exactly one of them
to proceed.

When invoked on an unlocked lock, a `RuntimeError` is raised.

There is no return value.

### `locked()`

Return `True` if the lock is acquired.

### RLock objects

A reentrant lock is a synchronization primitive that may be acquired multiple
times by the same thread.  Internally, it uses the concepts of "owning thread"
and "recursion level" in addition to the locked/unlocked state used by primitive
locks.  In the locked state, some thread owns the lock; in the unlocked state,
no thread owns it.

Threads call a lock's `acquire()` method to lock it,
and its `release()` method to unlock it.

> **Note:** Reentrant locks support the context management protocol,
> so it is recommended to use `with` instead of manually calling
> `acquire()` and `release()`
> to handle acquiring and releasing the lock for a block of code.

RLock's `acquire()`/`release()` call pairs may be nested,
unlike Lock's `acquire()`/`release()`. Only the final
`release()` (the `release()` of the outermost pair) resets
the lock to an unlocked state and allows another thread blocked in
`acquire()` to proceed.

`acquire()`/`release()` must be used in pairs: each acquire
must have a release in the thread that has acquired the lock. Failing to
call release as many times the lock has been acquired can lead to deadlock.

### class `RLock()`

This class implements reentrant lock objects.  A reentrant lock must be
released by the thread that acquired it.  Once a thread has acquired a
reentrant lock, the same thread may acquire it again without blocking; the
thread must release it once for each time it has acquired it.

Note that `RLock` is actually a factory function which returns an instance
of the most efficient version of the concrete RLock class that is supported
by the platform.

### `acquire(blocking=True, timeout=-1)`

Acquire a lock, blocking or non-blocking.

> **See also:** Using RLock as a context manager
> Recommended over manual `acquire()` and `release()` calls
> whenever practical.

When invoked with the *blocking* argument set to `True` (the default):

- If no thread owns the lock, acquire the lock and return immediately.

- If another thread owns the lock, block until we are able to acquire
lock, or *timeout*, if set to a positive value.

- If the same thread owns the lock, acquire the lock again, and
return immediately. This is the difference between `Lock` and
`RLock`; `Lock` handles this case the same as the previous,
blocking until the lock can be acquired.

When invoked with the *blocking* argument set to `False`:

- If no thread owns the lock, acquire the lock and return immediately.

- If another thread owns the lock, return immediately.

- If the same thread owns the lock, acquire the lock again and return
immediately.

In all cases, if the thread was able to acquire the lock, return `True`.
If the thread was unable to acquire the lock (i.e. if not blocking or
the timeout was reached) return `False`.

If called multiple times, failing to call `release()` as many times
may lead to deadlock. Consider using `RLock` as a context manager rather than
calling acquire/release directly.

> *Changed in version 3.2.*
> The *timeout* parameter is new.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

### `release()`

Release a lock, decrementing the recursion level.  If after the decrement it is
zero, reset the lock to unlocked (not owned by any thread), and if any other
threads are blocked waiting for the lock to become unlocked, allow exactly one
of them to proceed.  If after the decrement the recursion level is still
nonzero, the lock remains locked and owned by the calling thread.

Only call this method when the calling thread owns the lock. A
`RuntimeError` is raised if this method is called when the lock is
not acquired.

There is no return value.

### `locked()`

Return a boolean indicating whether this object is locked right now.

> *Added in version 3.14.*

### Condition objects

A condition variable is always associated with some kind of lock; this can be
passed in or one will be created by default.  Passing one in is useful when
several condition variables must share the same lock.  The lock is part of
the condition object: you don't have to track it separately.

A condition variable obeys the context management protocol:
using the `with` statement acquires the associated lock for the duration of
the enclosed block.  The `acquire()` and
`release()` methods also call the corresponding methods of
the associated lock.

Other methods must be called with the associated lock held.  The
`wait()` method releases the lock, and then blocks until
another thread awakens it by calling `notify()` or
`notify_all()`.  Once awakened, `wait()`
re-acquires the lock and returns.  It is also possible to specify a timeout.

The `notify()` method wakes up one of the threads waiting for
the condition variable, if any are waiting.  The `notify_all()`
method wakes up all threads waiting for the condition variable.

Note: the `notify()` and `notify_all()` methods
don't release the lock; this means that the thread or threads awakened will
not return from their `wait()` call immediately, but only when
the thread that called `notify()` or `notify_all()`
finally relinquishes ownership of the lock.

The typical programming style using condition variables uses the lock to
synchronize access to some shared state; threads that are interested in a
particular change of state call `wait()` repeatedly until they
see the desired state, while threads that modify the state call
`notify()` or `notify_all()` when they change
the state in such a way that it could possibly be a desired state for one
of the waiters.  For example, the following code is a generic
producer-consumer situation with unlimited buffer capacity:

```
# Consume one item
with cv:
    while not an_item_is_available():
        cv.wait()
    get_an_available_item()

# Produce one item
with cv:
    make_an_item_available()
    cv.notify()
```

The `while` loop checking for the application's condition is necessary
because `wait()` can return after an arbitrary long time,
and the condition which prompted the `notify()` call may
no longer hold true.  This is inherent to multi-threaded programming.  The
`wait_for()` method can be used to automate the condition
checking, and eases the computation of timeouts:

```
# Consume an item
with cv:
    cv.wait_for(an_item_is_available)
    get_an_available_item()
```

To choose between `notify()` and `notify_all()`,
consider whether one state change can be interesting for only one or several
waiting threads.  E.g. in a typical producer-consumer situation, adding one
item to the buffer only needs to wake up one consumer thread.

### class `Condition(lock=None)`

This class implements condition variable objects.  A condition variable
allows one or more threads to wait until they are notified by another thread.

If the *lock* argument is given and not `None`, it must be a `Lock`
or `RLock` object, and it is used as the underlying lock.  Otherwise,
a new `RLock` object is created and used as the underlying lock.

> *Changed in version 3.3.*
> changed from a factory function to a class.

### `acquire(*args)`

Acquire the underlying lock. This method calls the corresponding method on
the underlying lock; the return value is whatever that method returns.

### `release()`

Release the underlying lock. This method calls the corresponding method on
the underlying lock; there is no return value.

### `locked()`

Return a boolean indicating whether this object is locked right now.

> *Added in version 3.14.*
