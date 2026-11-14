---
title: "concurrent.futures --- Launching parallel tasks (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/concurrent.futures.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# concurrent.futures --- Launching parallel tasks (part 2 of 2)

## ProcessPoolExecutor

The `ProcessPoolExecutor` class is an `Executor` subclass that
uses a pool of processes to execute calls asynchronously.
`ProcessPoolExecutor` uses the `multiprocessing` module, which
allows it to side-step the :term:`Global Interpreter Lock
<global interpreter lock>` but also means that
only picklable objects can be executed and returned.

The `__main__` module must be importable by worker subprocesses. This means
that `ProcessPoolExecutor` will not work in the interactive interpreter.

Calling `Executor` or `Future` methods from a callable submitted
to a `ProcessPoolExecutor` will result in deadlock.

Note that the restrictions on functions and arguments needing to picklable as
per `multiprocessing.Process` apply when using `submit()`
and `map()` on a `ProcessPoolExecutor`. A function defined
in a REPL or a lambda should not be expected to work.

### class `ProcessPoolExecutor(max_workers=None, mp_context=None, \`

```python
initializer=None, initargs=(), \
max_tasks_per_child=None)
```

An `Executor` subclass that executes calls asynchronously using a pool
of at most *max_workers* processes.  If *max_workers* is `None` or not
given, it will default to `os.process_cpu_count()`.
If *max_workers* is less than or equal to `0`, then a `ValueError`
will be raised.
On Windows, *max_workers* must be less than or equal to `61`. If it is not
then `ValueError` will be raised. If *max_workers* is `None`, then
the default chosen will be at most `61`, even if more processors are
available.
*mp_context* can be a `multiprocessing` context or `None`. It will be
used to launch the workers. If *mp_context* is `None` or not given, the
default `multiprocessing` context is used.
See multiprocessing-start-methods.

*initializer* is an optional callable that is called at the start of
each worker process; *initargs* is a tuple of arguments passed to the
initializer.  Should *initializer* raise an exception, all currently
pending jobs will raise a `BrokenProcessPool`,
as well as any attempt to submit more jobs to the pool.

*max_tasks_per_child* is an optional argument that specifies the maximum
number of tasks a single process can execute before it will exit and be
replaced with a fresh worker process. By default *max_tasks_per_child* is
`None` which means worker processes will live as long as the pool. When
a max is specified, the "spawn" multiprocessing start method will be used by
default in absence of a *mp_context* parameter. This feature is incompatible
with the "fork" start method.

> *Changed in version 3.3.*
> When one of the worker processes terminates abruptly, a
> `BrokenProcessPool` error is now raised.
> Previously, behaviour
> was undefined but operations on the executor or its futures would often
> freeze or deadlock.

> *Changed in version 3.7.*
> The *mp_context* argument was added to allow users to control the
> start_method for worker processes created by the pool.
> Added the *initializer* and *initargs* arguments.

> *Changed in version 3.11.*
> The *max_tasks_per_child* argument was added to allow users to
> control the lifetime of workers in the pool.

> *Changed in version 3.12.*
> On POSIX systems, if your application has multiple threads and the
> `multiprocessing` context uses the `"fork"` start method:
> The `os.fork()` function called internally to spawn workers may raise a
> `DeprecationWarning`. Pass a *mp_context* configured to use a
> different start method. See the `os.fork()` documentation for
> further explanation.

> *Changed in version 3.13.*
> *max_workers* uses `os.process_cpu_count()` by default, instead of
> `os.cpu_count()`.

> *Changed in version 3.14.*
> The default process start method (see
> multiprocessing-start-methods) changed away from *fork*. If you
> require the *fork* start method for `ProcessPoolExecutor` you must
> explicitly pass `mp_context=multiprocessing.get_context("fork")`.

> *Changed in version 3.15.*
> Fixed a deadlock (115634) where the executor could hang after
> a worker process exited upon reaching its *max_tasks_per_child*
> limit while tasks remained queued.

### `terminate_workers()`

Attempt to terminate all living worker processes immediately by calling
`Process.terminate()` on each of them.
Internally, it will also call `Executor.shutdown()` to ensure that all
other resources associated with the executor are freed.

After calling this method the caller should no longer submit tasks to the
executor.

> *Added in version 3.14.*

### `kill_workers()`

Attempt to kill all living worker processes immediately by calling
`Process.kill()` on each of them.
Internally, it will also call `Executor.shutdown()` to ensure that all
other resources associated with the executor are freed.

After calling this method the caller should no longer submit tasks to the
executor.

> *Added in version 3.14.*

### ProcessPoolExecutor Example

```
import concurrent.futures
import math

PRIMES = [
    112272535095293,
    112582705942171,
    112272535095293,
    115280095190773,
    115797848077099,
    <example-card-number>]

def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    sqrt_n = int(math.floor(math.sqrt(n)))
    for i in range(3, sqrt_n + 1, 2):
        if n % i == 0:
            return False
    return True

def main():
    with concurrent.futures.ProcessPoolExecutor() as executor:
        for number, prime in zip(PRIMES, executor.map(is_prime, PRIMES)):
            print('%d is prime: %s' % (number, prime))

if __name__ == '__main__':
    main()
```

## Future Objects

The `Future` class encapsulates the asynchronous execution of a callable.
`Future` instances are created by `Executor.submit()`.

### class `Future`

Encapsulates the asynchronous execution of a callable.  `Future`
instances are created by `Executor.submit()` and should not be created
directly except for testing.

### `cancel()`

Attempt to cancel the call.  If the call is currently being executed or
finished running and cannot be cancelled then the method will return
`False`, otherwise the call will be cancelled and the method will
return `True`.

### `cancelled()`

Return `True` if the call was successfully cancelled.

### `running()`

Return `True` if the call is currently being executed and cannot be
cancelled.

### `done()`

Return `True` if the call was successfully cancelled or finished
running.

### `result(timeout=None)`

Return the value returned by the call. If the call hasn't yet completed
then this method will wait up to *timeout* seconds.  If the call hasn't
completed in *timeout* seconds, then a
`TimeoutError` will be raised. *timeout* can be
an int or float.  If *timeout* is not specified or `None`, there is no
limit to the wait time.

If the future is cancelled before completing then `.CancelledError`
will be raised.

If the call raised an exception, this method will raise the same exception.

### `exception(timeout=None)`

Return the exception raised by the call.  If the call hasn't yet
completed then this method will wait up to *timeout* seconds.  If the
call hasn't completed in *timeout* seconds, then a
`TimeoutError` will be raised.  *timeout* can be
an int or float.  If *timeout* is not specified or `None`, there is no
limit to the wait time.

If the future is cancelled before completing then `.CancelledError`
will be raised.

If the call completed without raising, `None` is returned.

### `add_done_callback(fn)`

Attaches the callable *fn* to the future.  *fn* will be called, with the
future as its only argument, when the future is cancelled or finishes
running.

Added callables are called in the order that they were added and are
always called in a thread belonging to the process that added them.  If
the callable raises an `Exception` subclass, it will be logged and
ignored.  If the callable raises a `BaseException` subclass, the
behavior is undefined.

If the future has already completed or been cancelled, *fn* will be
called immediately.

The following `Future` methods are meant for use in unit tests and
`Executor` implementations.

### `set_running_or_notify_cancel()`

This method should only be called by `Executor` implementations
before executing the work associated with the `Future` and by unit
tests.

If the method returns `False` then the `Future` was cancelled,
i.e. `Future.cancel()` was called and returned `True`.  Any threads
waiting on the `Future` completing (i.e. through
`as_completed()` or `wait()`) will be woken up.

If the method returns `True` then the `Future` was not cancelled
and has been put in the running state, i.e. calls to
`Future.running()` will return `True`.

This method can only be called once and cannot be called after
`Future.set_result()` or `Future.set_exception()` have been
called.

### `set_result(result)`

Sets the result of the work associated with the `Future` to
*result*.

This method should only be used by `Executor` implementations and
unit tests.

> *Changed in version 3.8.*
> This method raises
> `concurrent.futures.InvalidStateError` if the `Future` is
> already done.

### `set_exception(exception)`

Sets the result of the work associated with the `Future` to the
`Exception` *exception*.

This method should only be used by `Executor` implementations and
unit tests.

> *Changed in version 3.8.*
> This method raises
> `concurrent.futures.InvalidStateError` if the `Future` is
> already done.

## Module Functions

### `wait(fs, timeout=None, return_when=ALL_COMPLETED)`

Wait for the `Future` instances (possibly created by different
`Executor` instances) given by *fs* to complete. Duplicate futures
given to *fs* are removed and will be returned only once. Returns a named
2-tuple of sets.  The first set, named `done`, contains the futures that
completed (finished or cancelled futures) before the wait completed.  The
second set, named `not_done`, contains the futures that did not complete
(pending or running futures).

*timeout* can be used to control the maximum number of seconds to wait before
returning.  *timeout* can be an int or float.  If *timeout* is not specified
or `None`, there is no limit to the wait time.

*return_when* indicates when this function should return.  It must be one of
the following constants:

- - Constant
- Description

- - .. data:: FIRST_COMPLETED
- The function will return when any future finishes or is cancelled.

- - .. data:: FIRST_EXCEPTION
- The function will return when any future finishes by raising an
exception. If no future raises an exception
then it is equivalent to `ALL_COMPLETED`.

- - .. data:: ALL_COMPLETED
- The function will return when all futures finish or are cancelled.

### `as_completed(fs, timeout=None)`

Returns an iterator over the `Future` instances (possibly created by
different `Executor` instances) given by *fs* that yields futures as
they complete (finished or cancelled futures). Any futures given by *fs* that
are duplicated will be returned once. Any futures that completed before
`as_completed()` is called will be yielded first.  The returned iterator
raises a `TimeoutError if next__()`
is called and the result isn't available after *timeout* seconds from the
original call to `as_completed()`.  *timeout* can be an int or float. If
*timeout* is not specified or `None`, there is no limit to the wait time.

> **See also:** PEP 3148 -- futures - execute computations asynchronously
> The proposal which described this feature for inclusion in the Python
> standard library.

## Exception classes

### exception `CancelledError`

Raised when a future is cancelled.

### exception `TimeoutError`

A deprecated alias of `TimeoutError`,
raised when a future operation exceeds the given timeout.

> *Changed in version 3.11.*
> This class was made an alias of `TimeoutError`.

### exception `BrokenExecutor`

Derived from `RuntimeError`, this exception class is raised
when an executor is broken for some reason, and cannot be used
to submit or execute new tasks.

> *Added in version 3.7.*

### exception `InvalidStateError`

Raised when an operation is performed on a future that is not allowed
in the current state.

> *Added in version 3.8.*

### exception `BrokenThreadPool`

Derived from `BrokenExecutor`, this exception
class is raised when one of the workers
of a `ThreadPoolExecutor`
has failed initializing.

> *Added in version 3.7.*

### exception `BrokenInterpreterPool`

Derived from `BrokenThreadPool`,
this exception class is raised when one of the workers
of a `InterpreterPoolExecutor`
has failed initializing.

> *Added in version 3.14.*

### exception `BrokenProcessPool`

Derived from `BrokenExecutor` (formerly
`RuntimeError`), this exception class is raised when one of the
workers of a `ProcessPoolExecutor`
has terminated in a non-clean
fashion (for example, if it was killed from the outside).

> *Added in version 3.3.*
