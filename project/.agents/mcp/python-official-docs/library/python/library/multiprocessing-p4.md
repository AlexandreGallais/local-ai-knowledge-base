---
title: "multiprocessing --- Process-based parallelism (part 4 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 4 of 10)

## Reference

The `multiprocessing` package mostly replicates the API of the
`threading` module.

### Global start method

Python supports several ways to create and initialize a process.
The global start method sets the default mechanism for creating a process.

Several multiprocessing functions and methods that may also instantiate
certain objects will implicitly set the global start method to the system's default,
if it hasn’t been set already. The global start method can only be set once.
If you need to change the start method from the system default, you must
proactively set the global start method before calling functions or methods,
or creating these objects.

### class `Process(group=None, target=None, name=None, args=(), kwargs={}, \`

```python
*, daemon=None)
```

Process objects represent activity that is run in a separate process. The
`Process` class has equivalents of all the methods of
`threading.Thread`.

The constructor should always be called with keyword arguments. *group*
should always be `None`; it exists solely for compatibility with
`threading.Thread`.  *target* is the callable object to be invoked by
the `run()` method.  It defaults to `None`, meaning nothing is
called. *name* is the process name (see `name` for more details).
*args* is the argument tuple for the target invocation.  *kwargs* is a
dictionary of keyword arguments for the target invocation.  If provided,
the keyword-only *daemon* argument sets the process `daemon` flag
to `True` or `False`.  If `None` (the default), this flag will be
inherited from the creating process.

By default, no arguments are passed to *target*. The *args* argument,
which defaults to `()`, can be used to specify a list or tuple of the arguments
to pass to *target*.

If a subclass overrides the constructor, it must make sure it invokes the
base class constructor (`super().__init__()`) before doing anything else
to the process.

> **Note:** In general, all arguments to `Process` must be picklable.  This is
> frequently observed when trying to create a `Process` or use a
> `concurrent.futures.ProcessPoolExecutor` from a REPL with a
> locally defined *target* function.
>
> Passing a callable object defined in the current REPL session causes the
> child process to die via an uncaught `AttributeError` exception when
> starting as *target* must have been defined within an importable module
> in order to be loaded during unpickling.
>
> Example of this uncatchable error from the child:
>
>
> ```
> >>> import multiprocessing as mp
> >>> def knigit():
> ...     print("Ni!")
> ...
> >>> process = mp.Process(target=knigit)
> >>> process.start()
> >>> Traceback (most recent call last):
>   File ".../multiprocessing/spawn.py", line ..., in spawn_main
>   File ".../multiprocessing/spawn.py", line ..., in _main
> AttributeError: module '__main__' has no attribute 'knigit'
> >>> process
> <SpawnProcess name='SpawnProcess-1' pid=379473 parent=378707 stopped exitcode=1>
> ```
>
>
> See multiprocessing-programming-spawn.  While this restriction is
> not true if using the `"fork"` start method, as of Python `3.14` that
> is no longer the default on any platform.  See
> multiprocessing-start-methods.
> See also 132898.

> *Changed in version 3.3.*
> Added the *daemon* parameter.

### `run()`

Method representing the process's activity.

You may override this method in a subclass.  The standard `run()`
method invokes the callable object passed to the object's constructor as
the target argument, if any, with sequential and keyword arguments taken
from the *args* and *kwargs* arguments, respectively.

Using a list or tuple as the *args* argument passed to `Process`
achieves the same effect.

Example:

```
>>> from multiprocessing import Process
>>> p = Process(target=print, args=[1])
>>> p.run()
1
>>> p = Process(target=print, args=(1,))
>>> p.run()
1
```

### `start()`

Start the process's activity.

This must be called at most once per process object.  It arranges for the
object's `run()` method to be invoked in a separate process.

### `join([timeout])`

If the optional argument *timeout* is `None` (the default), the method
blocks until the process whose `join()` method is called terminates.
If *timeout* is a positive number, it blocks at most *timeout* seconds.
Note that the method returns `None` if its process terminates or if the
method times out.  Check the process's `exitcode` to determine if
it terminated.

A process can be joined many times.

A process cannot join itself because this would cause a deadlock.  It is
an error to attempt to join a process before it has been started.

### `name`

The process's name.  The name is a string used for identification purposes
only.  It has no semantics.  Multiple processes may be given the same
name.

The initial name is set by the constructor.  If no explicit name is
provided to the constructor, a name of the form
'Process-N1:N2:...:Nk' is constructed, where
each Nk is the N-th child of its parent.

### `is_alive`

Return whether the process is alive.

Roughly, a process object is alive from the moment the `start()`
method returns until the child process terminates.

### `daemon`

The process's daemon flag, a Boolean value.  This must be set before
`start()` is called.

The initial value is inherited from the creating process.

When a process exits, it attempts to terminate all of its daemonic child
processes.

Note that a daemonic process is not allowed to create child processes.
Otherwise a daemonic process would leave its children orphaned if it gets
terminated when its parent process exits. Additionally, these are **not**
Unix daemons or services, they are normal processes that will be
terminated (and not joined) if non-daemonic processes have exited.

In addition to the  `threading.Thread` API, `Process` objects
also support the following attributes and methods:

### `pid`

Return the process ID.  Before the process is spawned, this will be
`None`.

### `exitcode`

The child's exit code.  This will be `None` if the process has not yet
terminated.

If the child's `run()` method returned normally, the exit code
will be 0.  If it terminated via `sys.exit()` with an integer
argument *N*, the exit code will be *N*.

If the child terminated due to an exception not caught within
`run()`, the exit code will be 1.  If it was terminated by
signal *N*, the exit code will be the negative value *-N*.

### `authkey`

The process's authentication key (a byte string).

When `multiprocessing` is initialized the main process is assigned a
random string using `os.urandom()`.

When a `Process` object is created, it will inherit the
authentication key of its parent process, although this may be changed by
setting `authkey` to another byte string.

See multiprocessing-auth-keys.

### `sentinel`

A numeric handle of a system object which will become "ready" when
the process ends.

You can use this value if you want to wait on several events at
once using `multiprocessing.connection.wait()`.  Otherwise
calling `join()` is simpler.

On Windows, this is an OS handle usable with the `WaitForSingleObject`
and `WaitForMultipleObjects` family of API calls.  On POSIX, this is
a file descriptor usable with primitives from the `select` module.

> *Added in version 3.3.*

### `interrupt()`

Terminate the process. Works on POSIX using the `SIGINT` signal.
Behavior on Windows is undefined.

By default, this terminates the child process by raising `KeyboardInterrupt`.
This behavior can be altered by setting the respective signal handler in the child
process `signal.signal()` for `SIGINT`.

Note: if the child process catches and discards `KeyboardInterrupt`, the
process will not be terminated.

Note: the default behavior will also set `exitcode` to `1` as if an
uncaught exception was raised in the child process. To have a different
`exitcode` you may simply catch `KeyboardInterrupt` and call
`exit(your_code)`.

> *Added in version 3.14.*

### `terminate()`

Terminate the process.  On POSIX this is done using the `SIGTERM` signal;
on Windows `TerminateProcess` is used.  Note that exit handlers and
finally clauses, etc., will not be executed.

Note that descendant processes of the process will *not* be terminated --
they will simply become orphaned.

> **Warning:** If this method is used when the associated process is using a pipe or
> queue then the pipe or queue is liable to become corrupted and may
> become unusable by other process.  Similarly, if the process has
> acquired a lock or semaphore etc. then terminating it is liable to
> cause other processes to deadlock.

### `kill()`

Same as `terminate()` but using the `SIGKILL` signal on POSIX.

> *Added in version 3.7.*

### `close()`

Close the `Process` object, releasing all resources associated
with it.  `ValueError` is raised if the underlying process
is still running.  Once `close()` returns successfully, most
other methods and attributes of the `Process` object will
raise `ValueError`.

> *Added in version 3.7.*

Note that the `start()`, `join()`, `is_alive()`,
`terminate()` and `exitcode` methods should only be called by
the process that created the process object.

Example usage of some of the methods of `Process`:

```python

>>> import multiprocessing, time, signal
>>> mp_context = multiprocessing.get_context('spawn')
>>> p = mp_context.Process(target=time.sleep, args=(1000,))
>>> print(p, p.is_alive())
<...Process ... initial> False
>>> p.start()
>>> print(p, p.is_alive())
<...Process ... started> True
>>> p.terminate()
>>> time.sleep(0.1)
>>> print(p, p.is_alive())
<...Process ... stopped exitcode=-SIGTERM> False
>>> p.exitcode == -signal.SIGTERM
True
```

### exception `ProcessError`

The base class of all `multiprocessing` exceptions.

### exception `BufferTooShort`

Exception raised by `Connection.recv_bytes_into()` when the supplied
buffer object is too small for the message read.

If `e` is an instance of `BufferTooShort` then `e.args[0]` will give
the message as a byte string.

### exception `AuthenticationError`

Raised when there is an authentication error.

### exception `TimeoutError`

Raised by methods with a timeout when the timeout expires.

### Pipes and Queues

When using multiple processes, one generally uses message passing for
communication between processes and avoids having to use any synchronization
primitives like locks.

For passing messages one can use `Pipe()` (for a connection between two
processes) or a queue (which allows multiple producers and consumers).

The `Queue`, `SimpleQueue` and `JoinableQueue` types
are multi-producer, multi-consumer FIFO (first-in, first-out)
queues modelled on the `queue.Queue` class in the
standard library.  They differ in that `Queue` lacks the
`task_done()` and `join()` methods introduced
into Python 2.5's `queue.Queue` class.

If you use `JoinableQueue` then you **must** call
`JoinableQueue.task_done()` for each task removed from the queue or else the
semaphore used to count the number of unfinished tasks may eventually overflow,
raising an exception.

One difference from other Python queue implementations, is that `multiprocessing`
queues serializes all objects that are put into them using `pickle`.
The object returned by the get method is a re-created object that does not share
memory with the original object.

Note that one can also create a shared queue by using a manager object -- see
multiprocessing-managers.

> **Note:** `multiprocessing` uses the usual `queue.Empty` and
> `queue.Full` exceptions to signal a timeout.  They are not available in
> the `multiprocessing` namespace so you need to import them from
> `queue`.

> **Note:** When an object is put on a queue, the object is pickled and a
> background thread later flushes the pickled data to an underlying
> pipe.  This has some consequences which are a little surprising,
> but should not cause any practical difficulties -- if they really
> bother you then you can instead use a queue created with a
> manager.
>
> (1) After putting an object on an empty queue there may be an
> infinitesimal delay before the queue's `empty()`
> method returns `False` and `get_nowait()` can
> return without raising `queue.Empty`.
>
> (2) If multiple processes are enqueuing objects, it is possible for
> the objects to be received at the other end out-of-order.
> However, objects enqueued by the same process will always be in
> the expected order with respect to each other.

> **Warning:** If a process is killed using `Process.terminate()` or `os.kill()`
> while it is trying to use a `Queue`, then the data in the queue is
> likely to become corrupted.  This may cause any other process to get an
> exception when it tries to use the queue later on.

> **Warning:** As mentioned above, if a child process has put items on a queue (and it has
> not used :meth:`JoinableQueue.cancel_join_thread
> <multiprocessing.Queue.cancel_join_thread>`), then that process will
> not terminate until all buffered items have been flushed to the pipe.
>
> This means that if you try joining that process you may get a deadlock unless
> you are sure that all items which have been put on the queue have been
> consumed.  Similarly, if the child process is non-daemonic then the parent
> process may hang on exit when it tries to join all its non-daemonic children.
>
> Note that a queue created using a manager does not have this issue.  See
> multiprocessing-programming.

For an example of the usage of queues for interprocess communication see
multiprocessing-examples.

### `Pipe(duplex=True)`

Returns a pair `(conn1, conn2)` of
`Connection` objects representing the
ends of a pipe.

If *duplex* is `True` (the default) then the pipe is bidirectional.  If
*duplex* is `False` then the pipe is unidirectional: `conn1` can only be
used for receiving messages and `conn2` can only be used for sending
messages.

The `send()` method serializes the object using
`pickle` and the `recv()` re-creates the object.

### class `Queue([maxsize])`

Returns a process shared queue implemented using a pipe and a few
locks/semaphores.  When a process first puts an item on the queue a feeder
thread is started which transfers objects from a buffer into the pipe.

Instantiating this class may set the global start method. See
global-start-method for more details.

The usual `queue.Empty` and `queue.Full` exceptions from the
standard library's `queue` module are raised to signal timeouts.

`Queue` implements all the methods of `queue.Queue` except for
`task_done()`, `join()`, and
`shutdown()`.

### `qsize()`

Return the approximate size of the queue.  Because of
multithreading/multiprocessing semantics, this number is not reliable.

Note that this may raise `NotImplementedError` on platforms like
macOS where `sem_getvalue()` is not implemented.

### `empty()`

Return `True` if the queue is empty, `False` otherwise.  Because of
multithreading/multiprocessing semantics, this is not reliable.

May raise an `OSError` on closed queues. (not guaranteed)
