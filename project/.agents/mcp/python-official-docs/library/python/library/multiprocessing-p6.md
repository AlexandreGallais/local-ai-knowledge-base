---
title: "multiprocessing --- Process-based parallelism (part 6 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 6 of 10)

### `recv_bytes_into(buf[, offset])`

Read into *buf* a complete message of byte data sent from the other end
of the connection and return the number of bytes in the message.  Blocks
until there is something to receive.  Raises
`EOFError` if there is nothing left to receive and the other end was
closed.

*buf* must be a writable bytes-like object.  If
*offset* is given then the message will be written into the buffer from
that position.  Offset must be a non-negative integer less than the
length of *buf* (in bytes).

If the buffer is too short then a `BufferTooShort` exception is
raised and the complete message is available as `e.args[0]` where `e`
is the exception instance.

> *Changed in version 3.3.*
> Connection objects themselves can now be transferred between processes
> using `Connection.send()` and `Connection.recv()`.
> Connection objects also now support the context management protocol -- see
> typecontextmanager.  `__enter__()` returns the
> connection object, and `__exit__()` calls `close()`.

For example:

```python

>>> from multiprocessing import Pipe
>>> a, b = Pipe()
>>> a.send([1, 'hello', None])
>>> b.recv()
[1, 'hello', None]
>>> b.send_bytes(b'thank you')
>>> a.recv_bytes()
b'thank you'
>>> import array
>>> arr1 = array.array('i', range(5))
>>> arr2 = array.array('i', [0] * 10)
>>> a.send_bytes(arr1)
>>> count = b.recv_bytes_into(arr2)
>>> assert count == len(arr1) * arr1.itemsize
>>> arr2
array('i', [0, 1, 2, 3, 4, 0, 0, 0, 0, 0])
```

> **Warning:** The `Connection.recv()` method automatically unpickles the data it
> receives, which can be a security risk unless you can trust the process
> which sent the message.
>
> Therefore, unless the connection object was produced using `Pipe()` you
> should only use the `recv()` and `send()`
> methods after performing some sort of authentication.  See
> multiprocessing-auth-keys.

> **Warning:** If a process is killed while it is trying to read or write to a pipe then
> the data in the pipe is likely to become corrupted, because it may become
> impossible to be sure where the message boundaries lie.

### Synchronization primitives

Generally synchronization primitives are not as necessary in a multiprocess
program as they are in a multithreaded program.  See the documentation for
`threading` module.

Note that one can also create synchronization primitives by using a manager
object -- see multiprocessing-managers.

### class `Barrier(parties[, action[, timeout]])`

A barrier object: a clone of `threading.Barrier`.

Instantiating this class may set the global start method. See
global-start-method for more details.

> *Added in version 3.3.*

### class `BoundedSemaphore([value])`

A bounded semaphore object: a close analog of
`threading.BoundedSemaphore`.

Instantiating this class may set the global start method. See
global-start-method for more details.

A solitary difference from its close analog exists: its `acquire` method's
first argument is named *block*, as is consistent with `Lock.acquire()`.

### `locked()`

Return a boolean indicating whether this object is locked right now.

> *Added in version 3.14.*

> **Note:** On macOS, this is indistinguishable from `Semaphore` because
> `sem_getvalue()` is not implemented on that platform.

### class `Condition([lock])`

A condition variable: an alias for `threading.Condition`.

If *lock* is specified then it should be a `Lock` or `RLock`
object from `multiprocessing`.

Instantiating this class may set the global start method. See
global-start-method for more details.

> *Changed in version 3.3.*
> The `wait_for()` method was added.

### class `Event()`

A clone of `threading.Event`.

Instantiating this class may set the global start method. See
global-start-method for more details.

### class `Lock()`

A non-recursive lock object: a close analog of `threading.Lock`.
Once a process or thread has acquired a lock, subsequent attempts to
acquire it from any process or thread will block until it is released;
any process or thread may release it.  The concepts and behaviors of
`threading.Lock` as it applies to threads are replicated here in
`multiprocessing.Lock` as it applies to either processes or threads,
except as noted.

Note that `Lock` is actually a factory function which returns an
instance of `multiprocessing.synchronize.Lock` initialized with a
default context.

Instantiating this class may set the global start method. See
global-start-method for more details.

`Lock` supports the context manager protocol and thus may be
used in `with` statements.

### `acquire(block=True, timeout=None)`

Acquire a lock, blocking or non-blocking.

With the *block* argument set to `True` (the default), the method call
will block until the lock is in an unlocked state, then set it to locked
and return `True`.  Note that the name of this first argument differs
from that in `threading.Lock.acquire()`.

With the *block* argument set to `False`, the method call does not
block.  If the lock is currently in a locked state, return `False`;
otherwise set the lock to a locked state and return `True`.

When invoked with a positive, floating-point value for *timeout*, block
for at most the number of seconds specified by *timeout* as long as
the lock can not be acquired.  Invocations with a negative value for
*timeout* are equivalent to a *timeout* of zero.  Invocations with a
*timeout* value of `None` (the default) set the timeout period to
infinite.  Note that the treatment of negative or `None` values for
*timeout* differs from the implemented behavior in
`threading.Lock.acquire()`.  The *timeout* argument has no practical
implications if the *block* argument is set to `False` and is thus
ignored.  Returns `True` if the lock has been acquired or `False` if
the timeout period has elapsed.

### `release()`

Release a lock.  This can be called from any process or thread, not only
the process or thread which originally acquired the lock.

Behavior is the same as in `threading.Lock.release()` except that
when invoked on an unlocked lock, a `ValueError` is raised.

### `locked()`

Return a boolean indicating whether this object is locked right now.

> *Added in version 3.14.*

### class `RLock()`

A recursive lock object: a close analog of `threading.RLock`.  A
recursive lock must be released by the process or thread that acquired it.
Once a process or thread has acquired a recursive lock, the same process
or thread may acquire it again without blocking; that process or thread
must release it once for each time it has been acquired.

Note that `RLock` is actually a factory function which returns an
instance of `multiprocessing.synchronize.RLock` initialized with a
default context.

Instantiating this class may set the global start method. See
global-start-method for more details.

`RLock` supports the context manager protocol and thus may be
used in `with` statements.

### `acquire(block=True, timeout=None)`

Acquire a lock, blocking or non-blocking.

When invoked with the *block* argument set to `True`, block until the
lock is in an unlocked state (not owned by any process or thread) unless
the lock is already owned by the current process or thread.  The current
process or thread then takes ownership of the lock (if it does not
already have ownership) and the recursion level inside the lock increments
by one, resulting in a return value of `True`.  Note that there are
several differences in this first argument's behavior compared to the
implementation of `threading.RLock.acquire()`, starting with the name
of the argument itself.

When invoked with the *block* argument set to `False`, do not block.
If the lock has already been acquired (and thus is owned) by another
process or thread, the current process or thread does not take ownership
and the recursion level within the lock is not changed, resulting in
a return value of `False`.  If the lock is in an unlocked state, the
current process or thread takes ownership and the recursion level is
incremented, resulting in a return value of `True`.

Use and behaviors of the *timeout* argument are the same as in
`Lock.acquire()`.  Note that some of these behaviors of *timeout*
differ from the implemented behaviors in `threading.RLock.acquire()`.

### `release()`

Release a lock, decrementing the recursion level.  If after the
decrement the recursion level is zero, reset the lock to unlocked (not
owned by any process or thread) and if any other processes or threads
are blocked waiting for the lock to become unlocked, allow exactly one
of them to proceed.  If after the decrement the recursion level is still
nonzero, the lock remains locked and owned by the calling process or
thread.

Only call this method when the calling process or thread owns the lock.
An `AssertionError` is raised if this method is called by a process
or thread other than the owner or if the lock is in an unlocked (unowned)
state.  Note that the type of exception raised in this situation
differs from the implemented behavior in `threading.RLock.release()`.

### `locked()`

Return a boolean indicating whether this object is locked right now.

> *Added in version 3.14.*

### class `Semaphore([value])`

A semaphore object: a close analog of `threading.Semaphore`.

Instantiating this class may set the global start method. See
global-start-method for more details.

A solitary difference from its close analog exists: its `acquire` method's
first argument is named *block*, as is consistent with `Lock.acquire()`.

### `get_value()`

Return the current value of semaphore.

Note that this may raise `NotImplementedError` on platforms like
macOS where `sem_getvalue()` is not implemented.

### `locked()`

Return a boolean indicating whether this object is locked right now.

> *Added in version 3.14.*

> **Note:** On macOS, `sem_timedwait` is unsupported, so calling `acquire()` with
> a timeout will emulate that function's behavior using a sleeping loop.

> **Note:** Some of this package's functionality requires a functioning shared semaphore
> implementation on the host operating system. Without one, the
> `multiprocessing.synchronize` module will be disabled, and attempts to
> import it will result in an `ImportError`. See
> 3770 for additional information.

### Shared `ctypes` Objects

It is possible to create shared objects using shared memory which can be
inherited by child processes.

### `Value(typecode_or_type, *args, lock=True)`

Return a `ctypes` object allocated from shared memory.  By default the
return value is actually a synchronized wrapper for the object.  The object
itself can be accessed via the *value* attribute of a `Value`.

*typecode_or_type* determines the type of the returned object: it is either a
ctypes type or a one character typecode of the kind used by the `array`
module.  **args* is passed on to the constructor for the type.

If *lock* is `True` (the default) then a new recursive lock
object is created to synchronize access to the value.  If *lock* is
a `Lock` or `RLock` object then that will be used to
synchronize access to the value.  If *lock* is `False` then
access to the returned object will not be automatically protected
by a lock, so it will not necessarily be "process-safe".

Operations like `+=` which involve a read and write are not
atomic.  So if, for instance, you want to atomically increment a
shared value it is insufficient to just do:

```
counter.value += 1
```

Assuming the associated lock is recursive (which it is by default)
you can instead do:

```
with counter.get_lock():
    counter.value += 1
```

Note that *lock* is a keyword-only argument.

### `Array(typecode_or_type, size_or_initializer, *, lock=True)`

Return a ctypes array allocated from shared memory.  By default the return
value is actually a synchronized wrapper for the array.

*typecode_or_type* determines the type of the elements of the returned array:
it is either a ctypes type or a one
character typecode of the kind used by the `array` module with the
exception of `'w'`, which is not supported.  In addition, the `'c'`
typecode is an alias for `ctypes.c_char`.  If *size_or_initializer*
is an integer, then it determines the length of the array, and the array
will be initially zeroed. Otherwise, *size_or_initializer* is a sequence
which is used to initialize the array and whose length determines the length
of the array.

If *lock* is `True` (the default) then a new lock object is created to
synchronize access to the value.  If *lock* is a `Lock` or
`RLock` object then that will be used to synchronize access to the
value.  If *lock* is `False` then access to the returned object will not be
automatically protected by a lock, so it will not necessarily be
"process-safe".

Note that *lock* is a keyword only argument.

Note that an array of `ctypes.c_char` has *value* and *raw*
attributes which can both be used to store and retrieve byte strings.
While *raw* allows interaction with a `bytes` object the full size of
the array, reading *value* will terminate after a null byte, like most
programming languages handle strings.

#### The `multiprocessing.sharedctypes` module

Module `multiprocessing.sharedctypes`.

The `multiprocessing.sharedctypes` module provides functions for allocating
`ctypes` objects from shared memory which can be inherited by child
processes.

> **Note:** Although it is possible to store a pointer in shared memory remember that
> this will refer to a location in the address space of a specific process.
> However, the pointer is quite likely to be invalid in the context of a second
> process and trying to dereference the pointer from the second process may
> cause a crash.

### `RawArray(typecode_or_type, size_or_initializer)`

Return a ctypes array allocated from shared memory.

*typecode_or_type* determines the type of the elements of the returned array:
it is either a ctypes type or a one character typecode of the kind used by
the `array` module.  If *size_or_initializer* is an integer then it
determines the length of the array, and the array will be initially zeroed.
Otherwise *size_or_initializer* is a sequence which is used to initialize the
array and whose length determines the length of the array.

Note that setting and getting an element is potentially non-atomic -- use
`Array()` instead to make sure that access is automatically synchronized
using a lock.

### `RawValue(typecode_or_type, *args)`

Return a ctypes object allocated from shared memory.

*typecode_or_type* determines the type of the returned object: it is either a
ctypes type or a one character typecode of the kind used by the `array`
module.  **args* is passed on to the constructor for the type.

Note that setting and getting the value is potentially non-atomic -- use
`Value()` instead to make sure that access is automatically synchronized
using a lock.

Note that an array of `ctypes.c_char` has `value` and `raw`
attributes which allow one to use it to store and retrieve strings -- see
documentation for `ctypes`.
