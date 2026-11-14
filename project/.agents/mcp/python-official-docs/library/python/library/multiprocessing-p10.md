---
title: "multiprocessing --- Process-based parallelism (part 10 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 10 of 10)

### class `ThreadPool([processes[, initializer[, initargs]]])`

A thread pool object which controls a pool of worker threads to which jobs
can be submitted.  `ThreadPool` instances are fully interface
compatible with `Pool` instances, and their resources must also be
properly managed, either by using the pool as a context manager or by
calling `close()` and
`terminate()` manually.

*processes* is the number of worker threads to use.  If *processes* is
`None` then the number returned by `os.process_cpu_count()` is used.

If *initializer* is not `None` then each worker process will call
`initializer(*initargs)` when it starts.

Unlike `Pool`, *maxtasksperchild* and *context* cannot be provided.

> **Note:** A `ThreadPool` shares the same interface as `Pool`, which
> is designed around a pool of processes and predates the introduction of
> the `concurrent.futures` module.  As such, it inherits some
> operations that don't make sense for a pool backed by threads, and it
> has its own type for representing the status of asynchronous jobs,
> `AsyncResult`, that is not understood by any other libraries.
>
> Users should generally prefer to use
> `concurrent.futures.ThreadPoolExecutor`, which has a simpler
> interface that was designed around threads from the start, and which
> returns `concurrent.futures.Future` instances that are
> compatible with many other libraries, including `asyncio`.

## Programming guidelines

There are certain guidelines and idioms which should be adhered to when using
`multiprocessing`.

### All start methods

The following applies to all start methods.

Avoid shared state

As far as possible one should try to avoid shifting large amounts of data
between processes.

It is probably best to stick to using queues or pipes for communication
between processes rather than using the lower level synchronization
primitives.

Picklability

Ensure that the arguments to the methods of proxies are picklable.

Thread safety of proxies

Do not use a proxy object from more than one thread unless you protect it
with a lock.

(There is never a problem with different processes using the *same* proxy.)

Joining zombie processes

On POSIX when a process finishes but has not been joined it becomes a zombie.
There should never be very many because each time a new process starts (or
`active_children()` is called) all completed processes
which have not yet been joined will be joined.  Also calling a finished
process's `Process.is_alive()` will
join the process.  Even so it is probably good
practice to explicitly join all the processes that you start.

Better to inherit than pickle/unpickle

When using the *spawn* or *forkserver* start methods many types
from `multiprocessing` need to be picklable so that child
processes can use them.  However, one should generally avoid
sending shared objects to other processes using pipes or queues.
Instead you should arrange the program so that a process which
needs access to a shared resource created elsewhere can inherit it
from an ancestor process.

Avoid terminating processes

Using the `Process.terminate()`
method to stop a process is liable to
cause any shared resources (such as locks, semaphores, pipes and queues)
currently being used by the process to become broken or unavailable to other
processes.

Therefore it is probably best to only consider using
`Process.terminate()` on processes
which never use any shared resources.

Joining processes that use queues

Bear in mind that a process that has put items in a queue will wait before
terminating until all the buffered items are fed by the "feeder" thread to
the underlying pipe.  (The child process can call the
`Queue.cancel_join_thread()`
method of the queue to avoid this behaviour.)

This means that whenever you use a queue you need to make sure that all
items which have been put on the queue will eventually be removed before the
process is joined.  Otherwise you cannot be sure that processes which have
put items on the queue will terminate.  Remember also that non-daemonic
processes will be joined automatically.

An example which will deadlock is the following:

```
from multiprocessing import Process, Queue

def f(q):
    q.put('X' * 1000000)

if __name__ == '__main__':
    queue = Queue()
    p = Process(target=f, args=(queue,))
    p.start()
    p.join()                    # this deadlocks
    obj = queue.get()
```

A fix here would be to swap the last two lines (or simply remove the
`p.join()` line).

Explicitly pass <example-value> to child processes

On POSIX using the *fork* start method, a child process can make
use of a shared resource created in a parent process using a
global resource.  However, it is better to pass the object as an
argument to the constructor for the child process.

Apart from making the code (potentially) compatible with Windows
and the other start methods this also ensures that as long as the
child process is still alive the object will not be garbage
collected in the parent process.  This might be important if some
resource is freed when the object is garbage collected in the
parent process.

So for instance:

```
from multiprocessing import Process, Lock

def f():
    ... do something using "lock" ...

if __name__ == '__main__':
    lock = Lock()
    for i in range(10):
        Process(target=f).start()
```

should be rewritten as:

```
from multiprocessing import Process, Lock

def f(l):
    ... do something using "l" ...

if __name__ == '__main__':
    lock = Lock()
    for i in range(10):
        Process(target=f, args=(lock,)).start()
```

Beware of replacing `sys.stdin` with a "file like object"

`multiprocessing` originally unconditionally called:

```
os.close(sys.stdin.fileno())
```

in the `multiprocessing.Process._bootstrap()` method --- this resulted
in issues with processes-in-processes. This has been changed to:

```
sys.stdin.close()
sys.stdin = open(os.open(os.devnull, os.O_RDONLY), closefd=False)
```

Which solves the fundamental issue of processes colliding with each other
resulting in a bad file descriptor error, but introduces a potential danger
to applications which replace `sys.stdin()` with a "file-like object"
with output buffering.  This danger is that if multiple processes call
`close()` on this file-like object, it could result in the same
data being flushed to the object multiple times, resulting in corruption.

If you write a file-like object and implement your own caching, you can
make it fork-safe by storing the pid whenever you append to the cache,
and discarding the cache when the pid changes. For example:

```
@property
def cache(self):
    pid = os.getpid()
    if pid != self._pid:
        self._pid = pid
        self._cache = []
    return self._cache
```

For more information, see 5155, 5313 and 5331

### The *spawn* and *forkserver* start methods

There are a few extra restrictions which don't apply to the *fork*
start method.

More picklability

Ensure that all arguments to `Process` are
picklable.  Also, if you subclass `Process.__init__`, you must make sure
that instances will be picklable when the
`Process.start()` method is called.

Global variables

Bear in mind that if code run in a child process tries to access a global
variable, then the value it sees (if any) may not be the same as the value
in the parent process at the time that :meth:`Process.start
<multiprocessing.Process.start>` was called.

However, global variables which are just module level constants cause no
problems.

Safe importing of main module

Make sure that the main module can be safely imported by a new Python
interpreter without causing unintended side effects (such as starting a new
process).

For example, using the *spawn* or *forkserver* start method
running the following module would fail with a
`RuntimeError`:

```
from multiprocessing import Process

def foo():
    print('hello')

p = Process(target=foo)
p.start()
```

Instead one should protect the "entry point" of the program by using ``if
__name__ == '__main__':`` as follows:

```
from multiprocessing import Process, freeze_support, set_start_method

def foo():
    print('hello')

if __name__ == '__main__':
    freeze_support()
    set_start_method('spawn')
    p = Process(target=foo)
    p.start()
```

(The `freeze_support()` line can be omitted if the program will be run
normally instead of frozen.)

This allows the newly spawned Python interpreter to safely import the module
and then run the module's `foo()` function.

Similar restrictions apply if a pool or manager is created in the main
module.

## Examples

Demonstration of how to create and use customized managers and proxies:

Using `Pool`:

An example showing how to use queues to feed tasks to a collection of worker
processes and collect the results:
