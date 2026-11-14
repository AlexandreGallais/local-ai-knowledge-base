---
title: "Coroutines and tasks (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-task.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Coroutines and tasks (part 2 of 4)

## Sleeping

### `sleep(delay, result=None)`

Block for *delay* seconds.

If *result* is provided, it is returned to the caller
when the coroutine completes.

`sleep()` always suspends the current task, allowing other tasks
to run.

Setting the delay to 0 provides an optimized path to allow other
tasks to run. This can be used by long-running functions to avoid
blocking the event loop for the full duration of the function call.

Example of coroutine displaying the current date every second
for 5 seconds:

```
import asyncio
import datetime as dt

async def display_date():
    loop = asyncio.get_running_loop()
    end_time = loop.time() + 5.0
    while True:
        print(dt.datetime.now())
        if (loop.time() + 1.0) >= end_time:
            break
        await asyncio.sleep(1)

asyncio.run(display_date())
```

> *Changed in version 3.10.*
> Removed the *loop* parameter.

> *Changed in version 3.13.*
> Raises `ValueError` if *delay* is `nan`.

## Running tasks concurrently

gather(*aws, return_exceptions=False)

Run awaitable objects in the *aws*
sequence *concurrently*.

If any awaitable in *aws* is a coroutine, it is automatically
scheduled as a Task.

If all awaitables are completed successfully, the result is an
aggregate list of returned values.  The order of result values
corresponds to the order of awaitables in *aws*.

If *return_exceptions* is `False` (default), the first
raised exception is immediately propagated to the task that
awaits on `gather()`.  Other awaitables in the *aws* sequence
**won't be cancelled** and will continue to run.

If *return_exceptions* is `True`, exceptions are treated the
same as successful results, and aggregated in the result list.

If `gather()` is *cancelled*, all submitted awaitables
(that have not completed yet) are also *cancelled*.

If any Task or Future from the *aws* sequence is *cancelled*, it is
treated as if it raised `CancelledError` -- the `gather()`
call is **not** cancelled in this case.  This is to prevent the
cancellation of one submitted Task/Future to cause other
Tasks/Futures to be cancelled.

> **Note:** A new alternative to create and run tasks concurrently and
> wait for their completion is `asyncio.TaskGroup`. *TaskGroup*
> provides stronger safety guarantees than *gather* for scheduling a nesting of subtasks:
> if a task (or a subtask, a task scheduled by a task)
> raises an exception, *TaskGroup* will, while *gather* will not,
> cancel the remaining scheduled tasks.

Example:

```
import asyncio

async def factorial(name, number):
    f = 1
    for i in range(2, number + 1):
        print(f"Task {name}: Compute factorial({number}), currently i={i}...")
        await asyncio.sleep(1)
        f *= i
    print(f"Task {name}: factorial({number}) = {f}")
    return f

async def main():
    # Schedule three calls *concurrently*:
    L = await asyncio.gather(
        factorial("A", 2),
        factorial("B", 3),
        factorial("C", 4),
    )
    print(L)

asyncio.run(main())

# Expected output:
#
#     Task A: Compute factorial(2), currently i=2...
#     Task B: Compute factorial(3), currently i=2...
#     Task C: Compute factorial(4), currently i=2...
#     Task A: factorial(2) = 2
#     Task B: Compute factorial(3), currently i=3...
#     Task C: Compute factorial(4), currently i=3...
#     Task B: factorial(3) = 6
#     Task C: Compute factorial(4), currently i=4...
#     Task C: factorial(4) = 24
#     [2, 6, 24]
```

> **Note:** If *return_exceptions* is false, cancelling gather() after it
> has been marked done won't cancel any submitted awaitables.
> For instance, gather can be marked done after propagating an
> exception to the caller, therefore, calling `gather.cancel()`
> after catching an exception (raised by one of the awaitables) from
> gather won't cancel any other awaitables.

> *Changed in version 3.7.*
> If the *gather* itself is cancelled, the cancellation is
> propagated regardless of *return_exceptions*.

> *Changed in version 3.10.*
> Removed the *loop* parameter.

> *Deprecated since version 3.10.*
> Deprecation warning is emitted if no positional arguments are provided
> or not all positional arguments are Future-like objects
> and there is no running event loop.

## Eager task factory

### `eager_task_factory(loop, coro, *, name=None, context=None)`

A task factory for eager task execution.

When using this factory (via `loop.set_task_factory(asyncio.eager_task_factory)`),
coroutines begin execution synchronously during `Task` construction.
Tasks are only scheduled on the event loop if they block.
This can be a performance improvement as the overhead of loop scheduling
is avoided for coroutines that complete synchronously.

A common example where this is beneficial is coroutines which employ
caching or memoization to avoid actual I/O when possible.

> **Note:** Immediate execution of the coroutine is a semantic change.
> If the coroutine returns or raises, the task is never scheduled
> to the event loop. If the coroutine execution blocks, the task is
> scheduled to the event loop. This change may introduce behavior
> changes to existing applications. For example,
> the application's task execution order is likely to change.

> *Added in version 3.12.*

### `create_eager_task_factory(custom_task_constructor)`

Create an eager task factory, similar to `eager_task_factory()`,
using the provided *custom_task_constructor* when creating a new task instead
of the default `Task`.

*custom_task_constructor* must be a *callable* with the signature matching
the signature of `Task.__init__`.
The callable must return a `asyncio.Task`-compatible object.

This function returns a *callable* intended to be used as a task factory of an
event loop via `loop.set_task_factory(factory)`).

> *Added in version 3.12.*

## Shielding from cancellation

shield(aw)

Protect an awaitable object
from being `cancelled()`.

If *aw* is a coroutine it is automatically scheduled as a Task.

The statement:

```
task = asyncio.create_task(something())
res = await shield(task)
```

is equivalent to:

```
res = await something()
```

*except* that if the coroutine containing it is cancelled, the
Task running in `something()` is not cancelled.  From the point
of view of `something()`, the cancellation did not happen.
Although its caller is still cancelled, so the "await" expression
still raises a `CancelledError`.

If `something()` is cancelled by other means (i.e. from within
itself) that would also cancel `shield()`.

If it is desired to completely ignore cancellation (not recommended)
the `shield()` function should be combined with a try/except
clause, as follows:

```
task = asyncio.create_task(something())
try:
    res = await shield(task)
except CancelledError:
    res = None
```

> **Important:** Save a reference to tasks passed to this function, to avoid
> a task disappearing mid-execution. The event loop only keeps
> weak references to tasks. A task that isn't referenced elsewhere
> may get garbage collected at any time, even before it's done.

> *Changed in version 3.10.*
> Removed the *loop* parameter.

> *Deprecated since version 3.10.*
> Deprecation warning is emitted if *aw* is not Future-like object
> and there is no running event loop.

## Timeouts

### `timeout(delay)`

Return an asynchronous context manager
that can be used to limit the amount of time spent waiting on
something.

*delay* can either be `None`, or a float/int number of
seconds to wait. If *delay* is `None`, no time limit will
be applied; this can be useful if the delay is unknown when
the context manager is created.

In either case, the context manager can be rescheduled after
creation using `Timeout.reschedule()`.

Example:

```
async def main():
    async with asyncio.timeout(10):
        await long_running_task()
```

If `long_running_task` takes more than 10 seconds to complete,
the context manager will cancel the current task and handle
the resulting `asyncio.CancelledError` internally, transforming it
into a `TimeoutError` which can be caught and handled.

> **Note:** The `asyncio.timeout()` context manager is what transforms
> the `asyncio.CancelledError` into a `TimeoutError`,
> which means the `TimeoutError` can only be caught
> *outside* of the context manager.

Example of catching `TimeoutError`:

```
async def main():
    try:
        async with asyncio.timeout(10):
            await long_running_task()
    except TimeoutError:
        print("The long operation timed out, but we've handled it.")

    print("This statement will run regardless.")
```

The context manager produced by `asyncio.timeout()` can be
rescheduled to a different deadline and inspected.

### class `Timeout(when)`

An asynchronous context manager
for cancelling overdue coroutines.

Prefer using `asyncio.timeout()` or `asyncio.timeout_at()`
rather than instantiating `Timeout` directly.

`when` should be an absolute time at which the context should time out,
as measured by the event loop's clock:

- If `when` is `None`, the timeout will never trigger.
- If `when < loop.time()`, the timeout will trigger on the next
iteration of the event loop.

### `when() -> float | None`

Return the current deadline, or `None` if the current
deadline is not set.

### `reschedule(when: float | None)`

Reschedule the timeout.

### `expired() -> bool`

Return whether the context manager has exceeded its deadline
(expired).

Example:

```
async def main():
    try:
        # We do not know the timeout when starting, so we pass ``None``.
        async with asyncio.timeout(None) as cm:
            # We know the timeout now, so we reschedule it.
            new_deadline = get_running_loop().time() + 10
            cm.reschedule(new_deadline)

            await long_running_task()
    except TimeoutError:
        pass

    if cm.expired():
        print("Looks like we haven't finished on time.")
```

Timeout context managers can be safely nested.

> *Added in version 3.11.*

### `timeout_at(when)`

Similar to `asyncio.timeout()`, except *when* is the absolute time
to stop waiting, or `None`.

Example:

```
async def main():
    loop = get_running_loop()
    deadline = loop.time() + 20
    try:
        async with asyncio.timeout_at(deadline):
            await long_running_task()
    except TimeoutError:
        print("The long operation timed out, but we've handled it.")

    print("This statement will run regardless.")
```

> *Added in version 3.11.*

### `wait_for(aw, timeout)`

Wait for the *aw* awaitable
to complete with a timeout.

*timeout* can either be `None` or a float or int number of seconds
to wait for.  If *timeout* is `None`, block until the future
completes.

If a timeout occurs, it cancels *aw* and raises `TimeoutError`.

To prevent *aw* from being cancelled, wrap it in `shield()`.

The function will wait until the future is actually cancelled,
so the total wait time may exceed the *timeout*. If an exception
happens during cancellation, it is propagated.

If the wait is cancelled, the future *aw* is also cancelled.

Example:

```
async def eternity():
    # Sleep for one hour
    await asyncio.sleep(3600)
    print('yay!')

async def main():
    # Wait for at most 1 second
    try:
        await asyncio.wait_for(eternity(), timeout=1.0)
    except TimeoutError:
        print('timeout!')

asyncio.run(main())

# Expected output:
#
#     timeout!
```

> *Changed in version 3.7.*
> When *aw* is cancelled due to a timeout, `wait_for` waits
> for *aw* to be cancelled.  Previously, it raised
> `TimeoutError` immediately.

> *Changed in version 3.10.*
> Removed the *loop* parameter.

> *Changed in version 3.11.*
> Raises `TimeoutError` instead of `asyncio.TimeoutError`.

> *Changed in version 3.12.*
> Implemented using `asyncio.timeout()`, a coroutine passed as *aw*
> is no longer wrapped in a `Task` when *timeout* is positive.
