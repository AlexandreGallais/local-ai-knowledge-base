---
title: "threading --- Thread-based parallelism (part 4 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/threading.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# threading --- Thread-based parallelism (part 4 of 5)

### `wait(timeout=None)`

Wait until notified or until a timeout occurs. If the calling thread has
not acquired the lock when this method is called, a `RuntimeError` is
raised.

This method releases the underlying lock, and then blocks until it is
awakened by a `notify()` or `notify_all()` call for the same
condition variable in another thread, or until the optional timeout
occurs.  Once awakened or timed out, it re-acquires the lock and returns.

When the *timeout* argument is present and not `None`, it should be a
real number specifying a timeout for the operation in seconds
(or fractions thereof).

When the underlying lock is an `RLock`, it is not released using
its `release()` method, since this may not actually unlock the lock
when it was acquired multiple times recursively.  Instead, an internal
interface of the `RLock` class is used, which really unlocks it
even when it has been recursively acquired several times. Another internal
interface is then used to restore the recursion level when the lock is
reacquired.

The return value is `True` unless a given *timeout* expired, in which
case it is `False`.

> *Changed in version 3.2.*
> Previously, the method always returned `None`.

### `wait_for(predicate, timeout=None)`

Wait until a condition evaluates to true.  *predicate* should be a
callable which result will be interpreted as a boolean value.
A *timeout* may be provided giving the maximum time to wait.

This utility method may call `wait()` repeatedly until the predicate
is satisfied, or until a timeout occurs. The return value is
the last return value of the predicate and will evaluate to
`False` if the method timed out.

Ignoring the timeout feature, calling this method is roughly equivalent to
writing:

```
while not predicate():
    cv.wait()
```

Therefore, the same rules apply as with `wait()`: The lock must be
held when called and is re-acquired on return.  The predicate is evaluated
with the lock held.

> *Added in version 3.2.*

### `notify(n=1)`

By default, wake up one thread waiting on this condition, if any.  If the
calling thread has not acquired the lock when this method is called, a
`RuntimeError` is raised.

This method wakes up at most *n* of the threads waiting for the condition
variable; it is a no-op if no threads are waiting.

The current implementation wakes up exactly *n* threads, if at least *n*
threads are waiting.  However, it's not safe to rely on this behavior.
A future, optimized implementation may occasionally wake up more than
*n* threads.

Note: an awakened thread does not actually return from its `wait()`
call until it can reacquire the lock.  Since `notify()` does not
release the lock, its caller should.

### `notify_all()`

Wake up all threads waiting on this condition.  This method acts like
`notify()`, but wakes up all waiting threads instead of one. If the
calling thread has not acquired the lock when this method is called, a
`RuntimeError` is raised.

The method `notifyAll` is a deprecated alias for this method.

### Semaphore objects

This is one of the oldest synchronization primitives in the history of computer
science, invented by the early Dutch computer scientist Edsger W. Dijkstra (he
used the names `P()` and `V()` instead of `acquire()` and
`release()`).

A semaphore manages an internal counter which is decremented by each
`acquire()` call and incremented by each `release()`
call.  The counter can never go below zero; when `acquire()`
finds that it is zero, it blocks, waiting until some other thread calls
`release()`.

Semaphores also support the context management protocol.

### class `Semaphore(value=1)`

This class implements semaphore objects.  A semaphore manages an atomic
counter representing the number of `release()` calls minus the number of
`acquire()` calls, plus an initial value.  The `acquire()` method
blocks if necessary until it can return without making the counter negative.
If not given, *value* defaults to 1.

The optional argument gives the initial *value* for the internal counter; it
defaults to `1`. If the *value* given is less than 0, `ValueError` is
raised.

> *Changed in version 3.3.*
> changed from a factory function to a class.

### `acquire(blocking=True, timeout=None)`

Acquire a semaphore.

When invoked without arguments:

- If the internal counter is larger than zero on entry, decrement it by
one and return `True` immediately.
- If the internal counter is zero on entry, block until awoken by a call to
`release()`.  Once awoken (and the counter is greater
than 0), decrement the counter by 1 and return `True`.  Exactly one
thread will be awoken by each call to `release()`.  The
order in which threads are awoken should not be relied on.

When invoked with *blocking* set to `False`, do not block.  If a call
without an argument would block, return `False` immediately; otherwise, do
the same thing as when called without arguments, and return `True`.

When invoked with a *timeout* other than `None`, it will block for at
most *timeout* seconds.  If acquire does not complete successfully in
that interval, return `False`.  Return `True` otherwise.

> *Changed in version 3.2.*
> The *timeout* parameter is new.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

### `release(n=1)`

Release a semaphore, incrementing the internal counter by *n*.  When it
was zero on entry and other threads are waiting for it to become larger
than zero again, wake up *n* of those threads.

> *Changed in version 3.9.*
> Added the *n* parameter to release multiple waiting threads at once.

### class `BoundedSemaphore(value=1)`

Class implementing bounded semaphore objects.  A bounded semaphore checks to
make sure its current value doesn't exceed its initial value.  If it does,
`ValueError` is raised. In most situations semaphores are used to guard
resources with limited capacity.  If the semaphore is released too many times
it's a sign of a bug.  If not given, *value* defaults to 1.

> *Changed in version 3.3.*
> changed from a factory function to a class.

### `Semaphore` example

Semaphores are often used to guard resources with limited capacity, for example,
a database server.  In any situation where the size of the resource is fixed,
you should use a bounded semaphore.  Before spawning any worker threads, your
main thread would initialize the semaphore:

```
maxconnections = 5
# ...
pool_sema = BoundedSemaphore(value=maxconnections)
```

Once spawned, worker threads call the semaphore's acquire and release methods
when they need to connect to the server:

```
with pool_sema:
    conn = connectdb()
    try:
        # ... use connection ...
    finally:
        conn.close()
```

The use of a bounded semaphore reduces the chance that a programming error which
causes the semaphore to be released more than it's acquired will go undetected.

### Event objects

This is one of the simplest mechanisms for communication between threads: one
thread signals an event and other threads wait for it.

An event object manages an internal flag that can be set to true with the
`set()` method and reset to false with the `clear()`
method.  The `wait()` method blocks until the flag is true.

### class `Event()`

Class implementing event objects.  An event manages a flag that can be set to
true with the `set()` method and reset to false with the
`clear()` method.  The `wait()` method blocks until the flag is true.
The flag is initially false.

> *Changed in version 3.3.*
> changed from a factory function to a class.

### `is_set()`

Return `True` if and only if the internal flag is true.

The method `isSet` is a deprecated alias for this method.

### `set()`

Set the internal flag to true. All threads waiting for it to become true
are awakened. Threads that call `wait()` once the flag is true will
not block at all.

### `clear()`

Reset the internal flag to false. Subsequently, threads calling
`wait()` will block until `.set()` is called to set the internal
flag to true again.

### `wait(timeout=None)`

Block as long as the internal flag is false and the timeout, if given,
has not expired. The return value represents the
reason that this blocking method returned; `True` if returning because
the internal flag is set to true, or `False` if a timeout is given and
the internal flag did not become true within the given wait time.

When the timeout argument is present and not `None`, it should be a
real number specifying a timeout for the operation in seconds,
or fractions thereof.

> *Changed in version 3.1.*
> Previously, the method always returned `None`.

### Timer objects

This class represents an action that should be run only after a certain amount
of time has passed --- a timer.  `Timer` is a subclass of `Thread`
and as such also functions as an example of creating custom threads.

Timers are started, as with threads, by calling their `Timer.start()`
method.  The timer can be stopped (before its action has begun) by calling the
`cancel()` method.  The interval the timer will wait before
executing its action may not be exactly the same as the interval specified by
the user.

For example:

```
def hello():
    print("hello, world")

t = Timer(30.0, hello)
t.start()  # after 30 seconds, "hello, world" will be printed
```

### class `Timer(interval, function, args=None, kwargs=None)`

Create a timer that will run *function* with arguments *args* and  keyword
arguments *kwargs*, after *interval* seconds have passed.
If *args* is `None` (the default) then an empty list will be used.
If *kwargs* is `None` (the default) then an empty dict will be used.

> *Changed in version 3.3.*
> changed from a factory function to a class.

### `cancel()`

Stop the timer, and cancel the execution of the timer's action.  This will
only work if the timer is still in its waiting stage.

### Barrier objects

> *Added in version 3.2.*

This class provides a simple synchronization primitive for use by a fixed number
of threads that need to wait for each other.  Each of the threads tries to pass
the barrier by calling the `wait()` method and will block until
all of the threads have made their `wait()` calls. At this point,
the threads are released simultaneously.

The barrier can be reused any number of times for the same number of threads.

As an example, here is a simple way to synchronize a client and server thread:

```
b = Barrier(2, timeout=5)

def server():
    start_server()
    b.wait()
    while True:
        connection = accept_connection()
        process_server_connection(connection)

def client():
    b.wait()
    while True:
        connection = make_connection()
        process_client_connection(connection)
```

### class `Barrier(parties, action=None, timeout=None)`

Create a barrier object for *parties* number of threads.  An *action*, when
provided, is a callable to be called by one of the threads when they are
released.  *timeout* is the default timeout value if none is specified for
the `wait()` method.

### `wait(timeout=None)`

Pass the barrier.  When all the threads party to the barrier have called
this function, they are all released simultaneously.  If a *timeout* is
provided, it is used in preference to any that was supplied to the class
constructor.

The return value is an integer in the range 0 to *parties* -- 1, different
for each thread.  This can be used to select a thread to do some special
housekeeping, e.g.:

```
i = barrier.wait()
if i == 0:
    # Only one thread needs to print this
    print("passed the barrier")
```

If an *action* was provided to the constructor, one of the threads will
have called it prior to being released.  Should this call raise an error,
the barrier is put into the broken state.

If the call times out, the barrier is put into the broken state.

This method may raise a `BrokenBarrierError` exception if the
barrier is broken or reset while a thread is waiting.

### `reset()`

Return the barrier to the default, empty state.  Any threads waiting on it
will receive the `BrokenBarrierError` exception.

Note that using this function may require some external
synchronization if there are other threads whose state is unknown.  If a
barrier is broken it may be better to just leave it and create a new one.

### `abort()`

Put the barrier into a broken state.  This causes any active or future
calls to `wait()` to fail with the `BrokenBarrierError`.  Use
this for example if one of the threads needs to abort, to avoid deadlocking the
application.

It may be preferable to simply create the barrier with a sensible
*timeout* value to automatically guard against one of the threads going
awry.

### `parties`

The number of threads required to pass the barrier.

### `n_waiting`

The number of threads currently waiting in the barrier.

### `broken`

A boolean that is `True` if the barrier is in the broken state.

### exception `BrokenBarrierError`

This exception, a subclass of `RuntimeError`, is raised when the
`Barrier` object is reset or broken.

## Using locks, conditions, and semaphores in the `with` statement

All of the objects provided by this module that have `acquire` and
`release` methods can be used as context managers for a `with`
statement.  The `acquire` method will be called when the block is
entered, and `release` will be called when the block is exited.  Hence,
the following snippet:

```
with some_lock:
    # do something...
```

is equivalent to:

```
some_lock.acquire()
try:
    # do something...
finally:
    some_lock.release()
```

Currently, `Lock`, `RLock`, `Condition`,
`Semaphore`, and `BoundedSemaphore` objects may be used as
`with` statement context managers.
