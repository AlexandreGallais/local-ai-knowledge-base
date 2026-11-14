---
title: "multiprocessing --- Process-based parallelism (part 5 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 5 of 10)

### `full()`

Return `True` if the queue is full, `False` otherwise.  Because of
multithreading/multiprocessing semantics, this is not reliable.

### `put(obj[, block[, timeout]])`

Put obj into the queue.  If the optional argument *block* is `True`
(the default) and *timeout* is `None` (the default), block if necessary until
a free slot is available.  If *timeout* is a positive number, it blocks at
most *timeout* seconds and raises the `queue.Full` exception if no
free slot was available within that time.  Otherwise (*block* is
`False`), put an item on the queue if a free slot is immediately
available, else raise the `queue.Full` exception (*timeout* is
ignored in that case).

> *Changed in version 3.8.*
> If the queue is closed, `ValueError` is raised instead of
> `AssertionError`.

### `put_nowait(obj)`

Equivalent to `put(obj, False)`.

### `get([block[, timeout]])`

Remove and return an item from the queue.  If optional args *block* is
`True` (the default) and *timeout* is `None` (the default), block if
necessary until an item is available.  If *timeout* is a positive number,
it blocks at most *timeout* seconds and raises the `queue.Empty`
exception if no item was available within that time.  Otherwise (block is
`False`), return an item if one is immediately available, else raise the
`queue.Empty` exception (*timeout* is ignored in that case).

> *Changed in version 3.8.*
> If the queue is closed, `ValueError` is raised instead of
> `OSError`.

### `get_nowait()`

Equivalent to `get(False)`.

`multiprocessing.Queue` has a few additional methods not found in
`queue.Queue`.  These methods are usually unnecessary for most
code:

### `close()`

Close the queue: release internal resources.

A queue must not be used anymore after it is closed. For example,
`get()`, `put()` and `empty()`
methods must no longer be called.

The background thread will quit once it has flushed all buffered
data to the pipe.  This is called automatically when the queue is garbage
collected.

### `join_thread()`

Join the background thread.  This can only be used after `close()` has
been called.  It blocks until the background thread exits, ensuring that
all data in the buffer has been flushed to the pipe.

By default if a process is not the creator of the queue then on exit it
will attempt to join the queue's background thread.  The process can call
`cancel_join_thread()` to make `join_thread()` do nothing.

### `cancel_join_thread()`

Prevent `join_thread()` from blocking.  In particular, this prevents
the background thread from being joined automatically when the process
exits -- see `join_thread()`.

A better name for this method might be
`allow_exit_without_flush()`.  It is likely to cause enqueued
data to be lost, and you almost certainly will not need to use it.
It is really only there if you need the current process to exit
immediately without waiting to flush enqueued data to the
underlying pipe, and you don't care about lost data.

> **Note:** This class's functionality requires a functioning shared semaphore
> implementation on the host operating system. Without one, the
> functionality in this class will be disabled, and attempts to
> instantiate a `Queue` will result in an `ImportError`. See
> 3770 for additional information.  The same holds true for any
> of the specialized queue types listed below.

### class `SimpleQueue()`

It is a simplified `Queue` type, very close to a locked `Pipe`.

Instantiating this class may set the global start method. See
global-start-method for more details.

### `close()`

Close the queue: release internal resources.

A queue must not be used anymore after it is closed. For example,
`get()`, `put()` and `empty()` methods must no longer be
called.

> *Added in version 3.9.*

### `empty()`

Return `True` if the queue is empty, `False` otherwise.

Always raises an `OSError` if the SimpleQueue is closed.

### `get()`

Remove and return an item from the queue.

### `put(item)`

Put *item* into the queue.

### class `JoinableQueue([maxsize])`

`JoinableQueue`, a `Queue` subclass, is a queue which
additionally has `task_done()` and `join()` methods.

Instantiating this class may set the global start method. See
global-start-method for more details.

### `task_done()`

Indicate that a formerly enqueued task is complete. Used by queue
consumers.  For each `get()` used to fetch a task, a subsequent
call to `task_done()` tells the queue that the processing on the task
is complete.

If a `join()` is currently blocking, it will resume when all
items have been processed (meaning that a `task_done()` call was
received for every item that had been `put()` into the queue).

Raises a `ValueError` if called more times than there were items
placed in the queue.

### `join()`

Block until all items in the queue have been gotten and processed.

The count of unfinished tasks goes up whenever an item is added to the
queue.  The count goes down whenever a consumer calls
`task_done()` to indicate that the item was retrieved and all work on
it is complete.  When the count of unfinished tasks drops to zero,
`join()` unblocks.

### `active_children()`

Return list of all live children of the current process.

Calling this has the side effect of "joining" any processes which have
already finished.

### `cpu_count()`

Return the number of CPUs in the system.

This number is not equivalent to the number of CPUs the current process can
use.  The number of usable CPUs can be obtained with
`os.process_cpu_count()` (or `len(os.sched_getaffinity(0))`).

When the number of CPUs cannot be determined a `NotImplementedError`
is raised.

> **See also:** `os.cpu_count()`
> `os.process_cpu_count()`

> *Changed in version 3.13.*
> The return value can also be overridden using the
> `-X cpu_count` flag or `PYTHON_CPU_COUNT` as this is
> merely a wrapper around the `os` cpu count APIs.

### `current_process()`

Return the `Process` object corresponding to the current process.

An analogue of `threading.current_thread()`.

### `parent_process()`

Return the `Process` object corresponding to the parent process of
the `current_process()`. For the main process, `parent_process` will
be `None`.

> *Added in version 3.8.*

### `freeze_support()`

Add support for when a program which uses `multiprocessing` has been
frozen to produce an executable.  (Has been tested with **py2exe**,
**PyInstaller** and **cx_Freeze**.)

One needs to call this function straight after the ``if __name__ ==
'__main__'`` line of the main module.  For example:

```
from multiprocessing import Process, freeze_support

def f():
    print('hello world!')

if __name__ == '__main__':
    freeze_support()
    Process(target=f).start()
```

If the `freeze_support()` line is omitted then trying to run the frozen
executable will raise `RuntimeError`.

Calling `freeze_support()` has no effect when the start method is not
*spawn*. In addition, if the module is being run normally by the Python
interpreter (the program has not been frozen), then `freeze_support()`
has no effect.

### `get_all_start_methods()`

Returns a list of the supported start methods, the first of which
is the default.  The possible start methods are `'fork'`,
`'spawn'` and `'forkserver'`.  Not all platforms support all
methods.  See multiprocessing-start-methods.

> *Added in version 3.4.*

### `get_context(method=None)`

Return a context object which has the same attributes as the
`multiprocessing` module.

If *method* is `None` then the default context is returned. Note that if
the global start method has not been set, this will set it to the system default
See global-start-method for more details.
Otherwise *method* should be `'fork'`, `'spawn'`,
`'forkserver'`.  `ValueError` is raised if the specified
start method is not available.  See multiprocessing-start-methods.

> *Added in version 3.4.*

### `get_start_method(allow_none=False)`

Return the name of start method used for starting processes.

If the global start method is not set and *allow_none* is `False`, the global start
method is set to the default, and its name is returned. See
global-start-method for more details.

The return value can be `'fork'`, `'spawn'`, `'forkserver'`
or `None`.  See multiprocessing-start-methods.

> *Added in version 3.4.*

> *Changed in version 3.8.*
> On macOS, the *spawn* start method is now the default.  The *fork* start
> method should be considered unsafe as it can lead to crashes of the
> subprocess. See 33725.

### `set_executable(executable)`

Set the path of the Python interpreter to use when starting a child process.
(By default `sys.executable` is used).  Embedders will probably need to
do something like:

```
set_executable(os.path.join(sys.exec_prefix, 'pythonw.exe'))
```

before they can create child processes.

> *Changed in version 3.4.*
> Now supported on POSIX when the `'spawn'` start method is used.

> *Changed in version 3.11.*
> Accepts a path-like object.

### `set_forkserver_preload(module_names, *, on_error='ignore')`

Set a list of module names for the forkserver main process to attempt to
import so that their already imported state is inherited by forked
processes. This can be used as a performance enhancement to avoid repeated
work in every process.

For this to work, it must be called before the forkserver process has been
launched (before creating a `Pool` or starting a `Process`).

The *on_error* parameter controls how `ImportError` exceptions during
module preloading are handled: `"ignore"` (default) silently ignores
failures, `"warn"` causes the forkserver subprocess to emit an
`ImportWarning` to stderr, and `"fail"` causes the forkserver
subprocess to exit with the exception traceback on stderr, making
subsequent process creation fail with `EOFError` or
`ConnectionError`.

Only meaningful when using the `'forkserver'` start method.
See multiprocessing-start-methods.

> *Added in version 3.4.*

> *Changed in version 3.15.*
> Added the *on_error* parameter.

### `set_start_method(method, force=False)`

Set the method which should be used to start child processes.
The *method* argument can be `'fork'`, `'spawn'` or `'forkserver'`.
Raises `RuntimeError` if the start method has already been set and *force*
is not `True`.  If *method* is `None` and *force* is `True` then the start
method is set to `None`.  If *method* is `None` and *force* is `False`
then the context is set to the default context.

Note that this should be called at most once, and it should be
protected inside the `if __name__ == '__main__'` clause of the
main module.

See multiprocessing-start-methods.

> *Added in version 3.4.*

> **Note:** `multiprocessing` contains no analogues of
> `threading.active_count()`, `threading.enumerate()`,
> `threading.settrace()`, `threading.setprofile()`,
> `threading.Timer`, or `threading.local`.

### Connection Objects

Connection objects allow the sending and receiving of picklable objects or
strings.  They can be thought of as message oriented connected sockets.

Connection objects are usually created using
`Pipe()` -- see also
multiprocessing-listeners-clients.

### `send(obj)`

Send an object to the other end of the connection which should be read
using `recv()`.

The object must be picklable.  Very large pickles (approximately 32 MiB+,
though it depends on the OS) may raise a `ValueError` exception.

### `recv()`

Return an object sent from the other end of the connection using
`send()`.  Blocks until there is something to receive.  Raises
`EOFError` if there is nothing left to receive
and the other end was closed.

### `fileno()`

Return the file descriptor or handle used by the connection.

### `close()`

Close the connection.

This is called automatically when the connection is garbage collected.

### `poll([timeout])`

Return whether there is any data available to be read.

If *timeout* is not specified then it will return immediately.  If
*timeout* is a number then this specifies the maximum time in seconds to
block.  If *timeout* is `None` then an infinite timeout is used.

Note that multiple connection objects may be polled at once by
using `multiprocessing.connection.wait()`.

### `send_bytes(buf[, offset[, size]])`

Send byte data from a bytes-like object as a complete message.

If *offset* is given then data is read from that position in *buf*.  If
*size* is given then that many bytes will be read from *buf*.  Very large
buffers (approximately 32 MiB+, though it depends on the OS) may raise a
`ValueError` exception

### `recv_bytes([maxlength])`

Return a complete message of byte data sent from the other end of the
connection as a string.  Blocks until there is something to receive.
Raises `EOFError` if there is nothing left
to receive and the other end has closed.

If *maxlength* is specified and the message is longer than *maxlength*
then `OSError` is raised and the connection will no longer be
readable.

> *Changed in version 3.3.*
> This function used to raise `IOError`, which is now an
> alias of `OSError`.
