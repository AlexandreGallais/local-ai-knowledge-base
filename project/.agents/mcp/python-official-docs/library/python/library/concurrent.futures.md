---
title: "concurrent.futures --- Launching parallel tasks (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/concurrent.futures.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `concurrent.futures` --- Launching parallel tasks

Module `concurrent.futures`.

> *Added in version 3.2.*

**Source code:** Lib/concurrent/futures/thread.py,
Lib/concurrent/futures/process.py,
and Lib/concurrent/futures/interpreter.py

The `concurrent.futures` module provides a high-level interface for
asynchronously executing callables.

The asynchronous execution can be performed with threads, using
`ThreadPoolExecutor` or `InterpreterPoolExecutor`,
or separate processes, using `ProcessPoolExecutor`.
Each implements the same interface, which is defined
by the abstract `Executor` class.

`concurrent.futures.Future` must not be confused with
`asyncio.Future`, which is designed for use with `asyncio`
tasks and coroutines. See the asyncio's Future
documentation for a detailed comparison of the two.

## Executor Objects

### class `Executor`

An abstract class that provides methods to execute calls asynchronously.  It
should not be used directly, but through its concrete subclasses.

### `submit(fn, /, *args, **kwargs)`

Schedules the callable, *fn*, to be executed as `fn(*args, **kwargs)`
and returns a `Future` object representing the execution of the
callable.:

```
with ThreadPoolExecutor(max_workers=1) as executor:
    future = executor.submit(pow, 323, 1235)
    print(future.result())
```

### `map(fn, *iterables, timeout=None, chunksize=1, buffersize=None)`

Similar to `map(fn, *iterables)` except:

- The *iterables* are collected immediately rather than lazily, unless a
*buffersize* is specified to limit the number of submitted tasks whose
results have not yet been yielded. If the buffer is full, iteration over
the *iterables* pauses until a result is yielded from the buffer.

- *fn* is executed asynchronously and several calls to
*fn* may be made concurrently.

The returned iterator raises a `TimeoutError`
if `__next__()` is called and the result isn't available
after *timeout* seconds from the original call to `Executor.map()`.
*timeout* can be an int or a float.  If *timeout* is not specified or
`None`, there is no limit to the wait time.

If a *fn* call raises an exception, then that exception will be
raised when its value is retrieved from the iterator.

When using `ProcessPoolExecutor`, this method chops *iterables*
into a number of chunks which it submits to the pool as separate
tasks.  The (approximate) size of these chunks can be specified by
setting *chunksize* to a positive integer.  For very long iterables,
using a large value for *chunksize* can significantly improve
performance compared to the default size of 1.  With
`ThreadPoolExecutor` and `InterpreterPoolExecutor`,
*chunksize* has no effect.

> *Changed in version 3.5.*
> Added the *chunksize* parameter.

> *Changed in version 3.14.*
> Added the *buffersize* parameter.

### `shutdown(wait=True, *, cancel_futures=False)`

Signal the executor that it should free any resources that it is using
when the currently pending futures are done executing.  Calls to
`Executor.submit()` and `Executor.map()` made after shutdown will
raise `RuntimeError`.

If *wait* is `True` then this method will not return until all the
pending futures are done executing and the resources associated with the
executor have been freed.  If *wait* is `False` then this method will
return immediately and the resources associated with the executor will be
freed when all pending futures are done executing.  Regardless of the
value of *wait*, the entire Python program will not exit until all
pending futures are done executing.

If *cancel_futures* is `True`, this method will cancel all pending
futures that the executor has not started running. Any futures that
are completed or running won't be cancelled, regardless of the value
of *cancel_futures*.

If both *cancel_futures* and *wait* are `True`, all futures that the
executor has started running will be completed prior to this method
returning. The remaining futures are cancelled.

You can avoid having to call this method explicitly if you use the executor
as a context manager via the  `with` statement, which
will shutdown the `Executor` (waiting as if `Executor.shutdown()`
were called with *wait* set to `True`):

```
import shutil
with ThreadPoolExecutor(max_workers=4) as e:
    e.submit(shutil.copy, 'src1.txt', 'dest1.txt')
    e.submit(shutil.copy, 'src2.txt', 'dest2.txt')
    e.submit(shutil.copy, 'src3.txt', 'dest3.txt')
    e.submit(shutil.copy, 'src4.txt', 'dest4.txt')
```

> *Changed in version 3.9.*
> Added the *cancel_futures* parameter.

## ThreadPoolExecutor

`ThreadPoolExecutor` is an `Executor` subclass that uses a pool of
threads to execute calls asynchronously.

Deadlocks can occur when the callable associated with a `Future` waits on
the results of another `Future`.  For example:

```
import time
def wait_on_b():
    time.sleep(5)
    print(b.result())  # b will never complete because it is waiting on a.
    return 5

def wait_on_a():
    time.sleep(5)
    print(a.result())  # a will never complete because it is waiting on b.
    return 6

executor = ThreadPoolExecutor(max_workers=2)
a = executor.submit(wait_on_b)
b = executor.submit(wait_on_a)
```

And:

```
def wait_on_future():
    f = executor.submit(pow, 5, 2)
    # This will never complete because there is only one worker thread and
    # it is executing this function.
    print(f.result())

executor = ThreadPoolExecutor(max_workers=1)
future = executor.submit(wait_on_future)
# Note: calling future.result() would also cause a deadlock because
# the single worker thread is already waiting for wait_on_future().
```

### class `ThreadPoolExecutor(max_workers=None, thread_name_prefix='', \`

```python
initializer=None, initargs=(), **ctxkwargs)
```

An `Executor` subclass that uses a pool of at most *max_workers*
threads to execute calls asynchronously.

All threads enqueued to `ThreadPoolExecutor` will be joined before the
interpreter can exit. Note that the exit handler which does this is
executed *before* any exit handlers added using `atexit`. This means
exceptions in the main thread must be caught and handled in order to
signal threads to exit gracefully. For this reason, it is recommended
that `ThreadPoolExecutor` not be used for long-running tasks.

*initializer* is an optional callable that is called at the start of
each worker thread; *initargs* is a tuple of arguments passed to the
initializer.  Should *initializer* raise an exception, all currently
pending jobs will raise a `BrokenThreadPool`,
as well as any attempt to submit more jobs to the pool.

*ctxkwargs* is a mapping of additional keyword arguments passed to
`prepare_context()`, allowing customization of the worker execution
context.

### classmethod `prepare_context(initializer, initargs)`

Setting up the necessary context for creating worker instances in a
pool-based executor (for example, in a concurrent environment like
threads or interpreters).

> *Added in version 3.14.*

> *Changed in version 3.5.*
> If *max_workers* is `None` or
> not given, it will default to the number of processors on the machine,
> multiplied by `5`, assuming that `ThreadPoolExecutor` is often
> used to overlap I/O instead of CPU work and the number of workers
> should be higher than the number of workers
> for `ProcessPoolExecutor`.

> *Changed in version 3.6.*
> Added the *thread_name_prefix* parameter to allow users to
> control the `threading.Thread` names for worker threads created by
> the pool for easier debugging.

> *Changed in version 3.7.*
> Added the *initializer* and *initargs* arguments.

> *Changed in version 3.8.*
> Default value of *max_workers* is changed to `min(32, os.cpu_count() + 4)`.
> This default value preserves at least 5 workers for I/O bound tasks.
> It utilizes at most 32 CPU cores for CPU bound tasks which release the GIL.
> And it avoids using very large resources implicitly on many-core machines.
> ThreadPoolExecutor now reuses idle worker threads before starting
> *max_workers* worker threads too.

> *Changed in version 3.13.*
> Default value of *max_workers* is changed to
> `min(32, (os.process_cpu_count() or 1) + 4)`.

> *Changed in version 3.14.*
> Added *ctxkwargs* to pass <example-value> arguments to `prepare_context()`
> class method.

### ThreadPoolExecutor Example

```
import concurrent.futures
import urllib.request

URLS = ['http://www.foxnews.com/',
        'http://www.cnn.com/',
        'http://europe.wsj.com/',
        'http://www.bbc.co.uk/',
        'http://nonexistent-subdomain.python.org/']

# Retrieve a single page and report the URL and contents
def load_url(url, timeout):
    with urllib.request.urlopen(url, timeout=timeout) as conn:
        return conn.read()

# We can use a with statement to ensure threads are cleaned up promptly
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    # Start the load operations and mark each future with its URL
    future_to_url = {executor.submit(load_url, url, 60): url for url in URLS}
    for future in concurrent.futures.as_completed(future_to_url):
        url = future_to_url[future]
        try:
            data = future.result()
        except Exception as exc:
            print('%r generated an exception: %s' % (url, exc))
        else:
            print('%r page is %d bytes' % (url, len(data)))
```

## InterpreterPoolExecutor

> *Added in version 3.14.*

The `InterpreterPoolExecutor` class uses a pool of interpreters
to execute calls asynchronously.  It is a `ThreadPoolExecutor`
subclass, which means each worker is running in its own thread.
The difference here is that each worker has its own interpreter,
and runs each task using that interpreter.

The biggest benefit to using interpreters instead of only threads
is true multi-core parallelism.  Each interpreter has its own
Global Interpreter Lock, so code
running in one interpreter can run on one CPU core, while code in
another interpreter runs unblocked on a different core.

The tradeoff is that writing concurrent code for use with multiple
interpreters can take extra effort.  However, this is because it
forces you to be deliberate about how and when interpreters interact,
and to be explicit about what data is shared between interpreters.
This results in several benefits that help balance the extra effort,
including true multi-core parallelism,  For example, code written
this way can make it easier to reason about concurrency.  Another
major benefit is that you don't have to deal with several of the
big pain points of using threads, like race conditions.

Each worker's interpreter is isolated from all the other interpreters.
"Isolated" means each interpreter has its own runtime state and
operates completely independently.  For example, if you redirect
`sys.stdout` in one interpreter, it will not be automatically
redirected to any other interpreter.  If you import a module in one
interpreter, it is not automatically imported in any other.  You
would need to import the module separately in interpreter where
you need it.  In fact, each module imported in an interpreter is
a completely separate object from the same module in a different
interpreter, including `sys`, `builtins`,
and even `__main__`.

Isolation means a mutable object, or other data, cannot be used
by more than one interpreter at the same time.  That effectively means
interpreters cannot actually share such objects or data.  Instead,
each interpreter must have its own copy, and you will have to
synchronize any changes between the copies manually.  Immutable
objects and data, like the builtin singletons, strings, and tuples
of immutable objects, don't have these limitations.

Communicating and synchronizing between interpreters is most effectively
done using dedicated tools, like those proposed in PEP 734.  One less
efficient alternative is to serialize with `pickle` and then send
the bytes over a shared `socket` or
`pipe()`.

### class `InterpreterPoolExecutor(max_workers=None, thread_name_prefix='', \`

```python
initializer=None, initargs=())
```

A `ThreadPoolExecutor` subclass that executes calls asynchronously
using a pool of at most *max_workers* threads.  Each thread runs
tasks in its own interpreter.  The worker interpreters are isolated
from each other, which means each has its own runtime state and that
they can't share any mutable objects or other data.  Each interpreter
has its own Global Interpreter Lock,
which means code run with this executor has true multi-core parallelism.

The optional *initializer* and *initargs* arguments have the same
meaning as for `ThreadPoolExecutor`: the initializer is run
when each worker is created, though in this case it is run in
the worker's interpreter.  The executor serializes the *initializer*
and *initargs* using `pickle` when sending them to the worker's
interpreter.

> **Note:** The executor may replace uncaught exceptions from *initializer*
> with `ExecutionFailed`.

Other caveats from parent `ThreadPoolExecutor` apply here.

`submit()` and `map()` work like normal,
except the worker serializes the callable and arguments using
`pickle` when sending them to its interpreter.  The worker
likewise serializes the return value when sending it back.

When a worker's current task raises an uncaught exception, the worker
always tries to preserve the exception as-is.  If that is successful
then it also sets the `__cause__` to a corresponding
`ExecutionFailed`
instance, which contains a summary of the original exception.
In the uncommon case that the worker is not able to preserve the
original as-is then it directly preserves the corresponding
`ExecutionFailed`
instance instead.
