---
title: "Coroutines and tasks (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-task.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Coroutines and tasks (part 3 of 4)

## Waiting primitives

### `wait(aws, *, timeout=None, return_when=ALL_COMPLETED)`

Run `Future` and `Task` instances in the *aws*
iterable concurrently and block until the condition specified
by *return_when*.

The *aws* iterable must not be empty.

Returns two sets of Tasks/Futures: `(done, pending)`.

Usage:

```
done, pending = await asyncio.wait(aws)
```

*timeout* (a float or int), if specified, can be used to control
the maximum number of seconds to wait before returning.

Note that this function does not raise `TimeoutError`.
Futures or Tasks that aren't done when the timeout occurs are simply
returned in the second set.

*return_when* indicates when this function should return.  It must
be one of the following constants:

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

Unlike `wait_for()`, `wait()` does not cancel the
futures when a timeout occurs.

If `wait()` is cancelled, the futures in *aws* are not cancelled
and continue to run.

> *Changed in version 3.10.*
> Removed the *loop* parameter.

> *Changed in version 3.11.*
> Passing coroutine objects to `wait()` directly is forbidden.

> *Changed in version 3.12.*
> Added support for generators yielding tasks.

### `as_completed(aws, *, timeout=None)`

Run awaitable objects in the *aws* iterable
concurrently. The returned object can be iterated to obtain the results
of the awaitables as they finish.

The object returned by `as_completed()` can be iterated as an
asynchronous iterator or a plain iterator. When asynchronous
iteration is used, the originally-supplied awaitables are yielded if they
are tasks or futures. This makes it easy to correlate previously-scheduled
tasks with their results. Example:

```
ipv4_connect = create_task(open_connection("127.0.0.1", 80))
ipv6_connect = create_task(open_connection("::1", 80))
tasks = [ipv4_connect, ipv6_connect]

async for earliest_connect in as_completed(tasks):
    # earliest_connect is done. The result can be obtained by
    # awaiting it or calling earliest_connect.result()
    reader, writer = await earliest_connect

    if earliest_connect is ipv6_connect:
        print("IPv6 connection established.")
    else:
        print("IPv4 connection established.")
```

During asynchronous iteration, implicitly-created tasks will be yielded for
supplied awaitables that aren't tasks or futures.

When used as a plain iterator, each iteration yields a new coroutine that
returns the result or raises the exception of the next completed awaitable.
This pattern is compatible with Python versions older than 3.13:

```
ipv4_connect = create_task(open_connection("127.0.0.1", 80))
ipv6_connect = create_task(open_connection("::1", 80))
tasks = [ipv4_connect, ipv6_connect]

for next_connect in as_completed(tasks):
    # next_connect is not one of the original task objects. It must be
    # awaited to obtain the result value or raise the exception of the
    # awaitable that finishes next.
    reader, writer = await next_connect
```

A `TimeoutError` is raised if the timeout occurs before all awaitables
are done. This is raised by the `async for` loop during asynchronous
iteration or by the coroutines yielded during plain iteration.

`as_completed()` does not cancel the tasks running the supplied
awaitables: if a timeout occurs or the iteration is cancelled, the
remaining tasks continue to run.

> *Changed in version 3.10.*
> Removed the *loop* parameter.

> *Deprecated since version 3.10.*
> Deprecation warning is emitted if not all awaitable objects in the *aws*
> iterable are Future-like objects and there is no running event loop.

> *Changed in version 3.12.*
> Added support for generators yielding tasks.

> *Changed in version 3.13.*
> The result can now be used as either an asynchronous iterator
> or as a plain iterator (previously it was only a plain iterator).

## Running in threads

### `to_thread(func, /, *args, **kwargs)`

Asynchronously run function *func* in a separate thread.

Any *args and **kwargs supplied for this function are directly passed
to *func*. Also, the current `contextvars.Context` is propagated,
allowing context variables from the event loop thread to be accessed in the
separate thread.

Return a coroutine that can be awaited to get the eventual result of *func*.

This coroutine function is primarily intended to be used for executing
IO-bound functions/methods that would otherwise block the event loop if
they were run in the main thread. For example:

```
def blocking_io():
    print(f"start blocking_io at {time.strftime('%X')}")
    # Note that time.sleep() can be replaced with any blocking
    # IO-bound operation, such as file operations.
    time.sleep(1)
    print(f"blocking_io complete at {time.strftime('%X')}")

async def main():
    print(f"started main at {time.strftime('%X')}")

    await asyncio.gather(
        asyncio.to_thread(blocking_io),
        asyncio.sleep(1))

    print(f"finished main at {time.strftime('%X')}")

asyncio.run(main())

# Expected output:
#
# started main at 19:50:53
# start blocking_io at 19:50:53
# blocking_io complete at 19:50:54
# finished main at 19:50:54
```

Directly calling `blocking_io()` in any coroutine would block the event loop
for its duration, resulting in an additional 1 second of run time. Instead,
by using `asyncio.to_thread()`, we can run it in a separate thread without
blocking the event loop.

> **Note:** Due to the GIL, `asyncio.to_thread()` can typically only be used
> to make IO-bound functions non-blocking. However, for extension modules
> that release the GIL or alternative Python implementations that don't
> have one, `asyncio.to_thread()` can also be used for CPU-bound functions.

> *Added in version 3.9.*

## Scheduling from other threads

### `run_coroutine_threadsafe(coro, loop)`

Submit a coroutine to the given event loop.  Thread-safe.

Return a `concurrent.futures.Future` to wait for the result
from another OS thread.

This function is meant to be called from a different OS thread
than the one where the event loop is running.  Example:

```
def in_thread(loop: asyncio.AbstractEventLoop) -> None:
    # Run some blocking IO
    pathlib.Path("example.txt").write_text("hello world", encoding="utf8")

    # Create a coroutine
    coro = asyncio.sleep(1, result=3)

    # Submit the coroutine to a given loop
    future = asyncio.run_coroutine_threadsafe(coro, loop)

    # Wait for the result with an optional timeout argument
    assert future.result(timeout=2) == 3

async def amain() -> None:
    # Get the running loop
    loop = asyncio.get_running_loop()

    # Run something in a thread
    await asyncio.to_thread(in_thread, loop)
```

It's also possible to run the other way around.  Example:

```
@contextlib.contextmanager
def loop_in_thread() -> Generator[asyncio.AbstractEventLoop]:
    loop_fut = concurrent.futures.Future[asyncio.AbstractEventLoop]()
    stop_event = asyncio.Event()

    async def main() -> None:
        loop_fut.set_result(asyncio.get_running_loop())
        await stop_event.wait()

    with concurrent.futures.ThreadPoolExecutor(1) as tpe:
        complete_fut = tpe.submit(asyncio.run, main())
        for fut in concurrent.futures.as_completed((loop_fut, complete_fut)):
            if fut is loop_fut:
                loop = loop_fut.result()
                try:
                    yield loop
                finally:
                    loop.call_soon_threadsafe(stop_event.set)
            else:
                fut.result()

# Create a loop in another thread
with loop_in_thread() as loop:
    # Create a coroutine
    coro = asyncio.sleep(1, result=3)

    # Submit the coroutine to a given loop
    future = asyncio.run_coroutine_threadsafe(coro, loop)

    # Wait for the result with an optional timeout argument
    assert future.result(timeout=2) == 3
```

If an exception is raised in the coroutine, the returned Future
will be notified.  It can also be used to cancel the task in
the event loop:

```
try:
    result = future.result(timeout)
except TimeoutError:
    print('The coroutine took too long, cancelling the task...')
    future.cancel()
except Exception as exc:
    print(f'The coroutine raised an exception: {exc!r}')
else:
    print(f'The coroutine returned: {result!r}')
```

See the concurrency and multithreading
section of the documentation.

Unlike other asyncio functions this function requires the *loop*
argument to be passed explicitly.

> *Added in version 3.5.1.*

## Introspection

### `current_task(loop=None)`

Return the currently running `Task` instance, or `None` if
no task is running.

If *loop* is `None` `get_running_loop()` is used to get
the current loop.

> *Added in version 3.7.*

### `all_tasks(loop=None)`

Return a set of not yet finished `Task` objects run by
the loop.

If *loop* is `None`, `get_running_loop()` is used for getting
current loop.

> *Added in version 3.7.*

### `iscoroutine(obj)`

Return `True` if *obj* is a coroutine object.

> *Added in version 3.4.*
