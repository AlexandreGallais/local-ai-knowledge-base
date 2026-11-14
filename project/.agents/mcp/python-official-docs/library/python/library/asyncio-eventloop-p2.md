---
title: "Event loop (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-eventloop.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Event loop (part 2 of 6)

## Event loop methods

Event loops have **low-level** APIs for the following:

### `loop.run_until_complete(future)`

Run until the *future* (an instance of `Future`) has
completed.

If the argument is a coroutine object it
is implicitly scheduled to run as a `asyncio.Task`.

Return the Future's result or raise its exception.

### `loop.run_forever()`

Run the event loop until `stop()` is called.

If `stop()` is called before `run_forever()` is called,
the loop will poll the I/O selector once with a timeout of zero,
run all callbacks scheduled in response to I/O events (and
those that were already scheduled), and then exit.

If `stop()` is called while `run_forever()` is running,
the loop will run the current batch of callbacks and then exit.
Note that new callbacks scheduled by callbacks will not run in this
case; instead, they will run the next time `run_forever()` or
`run_until_complete()` is called.

### `loop.stop()`

Stop the event loop.

### `loop.is_running()`

Return `True` if the event loop is currently running.

### `loop.is_closed()`

Return `True` if the event loop was closed.

### `loop.close()`

Close the event loop.

The loop must not be running when this function is called.
Any pending callbacks will be discarded.

This method clears all queues and shuts down the executor, but does
not wait for the executor to finish.

This method is idempotent and irreversible.  No other methods
should be called after the event loop is closed.

### `loop.shutdown_asyncgens()`

Schedule all currently open asynchronous generator objects to
close with an `aclose()` call.  After calling this method,
the event loop will issue a warning if a new asynchronous generator
is iterated. This should be used to reliably finalize all scheduled
asynchronous generators.

Note that there is no need to call this function when
`asyncio.run()` is used.

Example:

```
try:
    loop.run_forever()
finally:
    loop.run_until_complete(loop.shutdown_asyncgens())
    loop.close()
```

> *Added in version 3.6.*

### `loop.shutdown_default_executor(timeout=None)`

Schedule the closure of the default executor and wait for it to join all of
the threads in the `ThreadPoolExecutor`.
Once this method has been called,
using the default executor with `loop.run_in_executor()`
will raise a `RuntimeError`.

The *timeout* parameter specifies the amount of time
(in `float` seconds) the executor will be given to finish joining.
With the default, `None`,
the executor is allowed an unlimited amount of time.

If the *timeout* is reached, a `RuntimeWarning` is emitted
and the default executor is terminated
without waiting for its threads to finish joining.

> **Note:** Do not call this method when using `asyncio.run()`,
> as the latter handles default executor shutdown automatically.

> *Added in version 3.9.*

> *Changed in version 3.12.*
> Added the *timeout* parameter.

### `loop.call_soon(callback, *args, context=None)`

Schedule the *callback* callback to be called with
*args* arguments at the next iteration of the event loop.

Return an instance of `asyncio.Handle`,
which can be used later to cancel the callback.

Callbacks are called in the order in which they are registered.
Each callback will be called exactly once.

The optional keyword-only *context* argument specifies a
custom `contextvars.Context` for the *callback* to run in.
Callbacks use the current context when no *context* is provided.

Unlike `call_soon_threadsafe()`, this method is not thread-safe.

### `loop.call_soon_threadsafe(callback, *args, context=None)`

A thread-safe variant of `call_soon()`. When scheduling callbacks from
another thread, this function *must* be used, since `call_soon()` is not
thread-safe.

This function is safe to be called from a reentrant context or signal handler,
however, it is not safe or fruitful to use the returned handle in such contexts.

Raises `RuntimeError` if called on a loop that's been closed.
This can happen on a secondary thread when the main application is
shutting down.

See the concurrency and multithreading
section of the documentation.

> *Changed in version 3.7.*
> The *context* keyword-only parameter was added. See PEP 567
> for more details.

> **Note:** Most `asyncio` scheduling functions don't allow passing
> keyword arguments.  To do that, use `functools.partial()`:
>
>
> ```
> # will schedule "print("Hello", flush=True)"
> loop.call_soon(
>     functools.partial(print, "Hello", flush=True))
> ```
>
>
> Using partial objects is usually more convenient than using lambdas,
> as asyncio can render partial objects better in debug and error
> messages.

### Scheduling delayed callbacks

Event loop provides mechanisms to schedule callback functions
to be called at some point in the future.  Event loop uses monotonic
clocks to track time.

### `loop.call_later(delay, callback, *args, context=None)`

Schedule *callback* to be called after the given *delay*
number of seconds (can be either an int or a float).

An instance of `asyncio.TimerHandle` is returned which can
be used to cancel the callback.

*callback* will be called exactly once.  If two callbacks are
scheduled for exactly the same time, the order in which they
are called is undefined.

The optional positional *args* will be passed to the callback when
it is called. Use `functools.partial()`
to pass <example-value> arguments to
*callback*.

An optional keyword-only *context* argument allows specifying a
custom `contextvars.Context` for the *callback* to run in.
The current context is used when no *context* is provided.

> **Note:** For performance, callbacks scheduled with `loop.call_later()`
> may run up to one clock-resolution early (see
> `time.get_clock_info('monotonic').resolution`).

> *Changed in version 3.7.*
> The *context* keyword-only parameter was added. See PEP 567
> for more details.

> *Changed in version 3.8.*
> In Python 3.7 and earlier with the default event loop implementation,
> the *delay* could not exceed one day.
> This has been fixed in Python 3.8.

### `loop.call_at(when, callback, *args, context=None)`

Schedule *callback* to be called at the given absolute timestamp
*when* (an int or a float), using the same time reference as
`loop.time()`.

This method's behavior is the same as `call_later()`.

An instance of `asyncio.TimerHandle` is returned which can
be used to cancel the callback.

> **Note:** For performance, callbacks scheduled with `loop.call_at()`
> may run up to one clock-resolution early (see
> `time.get_clock_info('monotonic').resolution`).

> *Changed in version 3.7.*
> The *context* keyword-only parameter was added. See PEP 567
> for more details.

> *Changed in version 3.8.*
> In Python 3.7 and earlier with the default event loop implementation,
> the difference between *when* and the current time could not exceed
> one day.  This has been fixed in Python 3.8.

### `loop.time()`

Return the current time, as a `float` value, according to
the event loop's internal monotonic clock.

> **Note:** > *Changed in version 3.8.*
> > In Python 3.7 and earlier timeouts (relative *delay* or absolute *when*)
> > should not exceed one day.  This has been fixed in Python 3.8.
>

> **See also:** The `asyncio.sleep()` function.

### `loop.create_future()`

Create an `asyncio.Future` object attached to the event loop.

This is the preferred way to create Futures in asyncio. This lets
third-party event loops provide alternative implementations of
the Future object (with better performance or instrumentation).

> *Added in version 3.5.2.*

### `loop.create_task(coro, *, name=None, context=None, eager_start=None, **kwargs)`

Schedule the execution of coroutine *coro*.
Return a `Task` object.

Third-party event loops can use their own subclass of `Task`
for interoperability. In this case, the result type is a subclass
of `Task`.

The full function signature is largely the same as that of the
`Task` constructor (or factory) - all of the keyword arguments to
this function are passed through to that interface.

If the *name* argument is provided and not `None`, it is set as
the name of the task using `Task.set_name()`.

An optional keyword-only *context* argument allows specifying a
custom `contextvars.Context` for the *coro* to run in.
The current context copy is created when no *context* is provided.

An optional keyword-only *eager_start* argument allows specifying
if the task should execute eagerly during the call to create_task,
or be scheduled later. If *eager_start* is not passed the mode set
by `loop.set_task_factory()` will be used.

> *Changed in version 3.8.*
> Added the *name* parameter.

> *Changed in version 3.11.*
> Added the *context* parameter.

> *Changed in version 3.13.3.*
> Added `kwargs` which passes on arbitrary extra parameters, including  `name` and `context`.

> *Changed in version 3.13.4.*
> Rolled back the change that passes on *name* and *context* (if it is None),
> while still passing on other arbitrary keyword arguments (to avoid breaking backwards compatibility with 3.13.3).

> *Changed in version 3.14.*
> All *kwargs* are now passed on. The *eager_start* parameter works with eager task factories.

### `loop.set_task_factory(factory)`

Set a task factory that will be used by
`loop.create_task()`.

If *factory* is `None` the default task factory will be set.
Otherwise, *factory* must be a *callable* with the signature matching
`(loop, coro, **kwargs)`, where *loop* is a reference to the active
event loop, and *coro* is a coroutine object.  The callable
must pass on all *kwargs*, and return a `asyncio.Task`-compatible object.

> *Changed in version 3.13.3.*
> Required that all *kwargs* are passed on to `asyncio.Task`.

> *Changed in version 3.13.4.*
> *name* is no longer passed to task factories. *context* is no longer passed
> to task factories if it is `None`.
>
> > *Changed in version 3.14.*
> > *name* and *context* are now unconditionally passed on to task factories again.
>

### `loop.get_task_factory()`

Return a task factory or `None` if the default one is in use.
