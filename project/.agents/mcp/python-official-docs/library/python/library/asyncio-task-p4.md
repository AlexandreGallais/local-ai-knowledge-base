---
title: "Coroutines and tasks (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-task.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Coroutines and tasks (part 4 of 4)

## Task object

### class `Task(coro, *, loop=None, name=None, context=None, eager_start=False)`

A `Future-like` object that runs a Python
coroutine.  Not thread-safe.

Tasks are used to run coroutines in event loops.
If a coroutine awaits on a Future, the Task suspends
the execution of the coroutine and waits for the completion
of the Future.  When the Future is *done*, the execution of
the wrapped coroutine resumes.

Event loops use cooperative scheduling: an event loop runs
one Task at a time.  While a Task awaits for the completion of a
Future, the event loop runs other Tasks, callbacks, or performs
IO operations.

Use the high-level `asyncio.create_task()` function to create
Tasks, or the low-level `loop.create_task()` or
`ensure_future()` functions.  Manual instantiation of Tasks
is discouraged.

To cancel a running Task use the `cancel()` method.  Calling it
will cause the Task to throw a `CancelledError` exception into
the wrapped coroutine.  If a coroutine is awaiting on a future-like
object during cancellation, the awaited object will be cancelled.

`cancelled()` can be used to check if the Task was cancelled.
The method returns `True` if the wrapped coroutine did not
suppress the `CancelledError` exception and was actually
cancelled.

`asyncio.Task` inherits from `Future` all of its
APIs except `Future.set_result()` and
`Future.set_exception()`.

An optional keyword-only *context* argument allows specifying a
custom `contextvars.Context` for the *coro* to run in.
If no *context* is provided, the Task copies the current context
and later runs its coroutine in the copied context.

An optional keyword-only *eager_start* argument allows eagerly starting
the execution of the `asyncio.Task` at task creation time.
If set to `True` and the event loop is running, the task will start
executing the coroutine immediately, until the first time the coroutine
blocks. If the coroutine returns or raises without blocking, the task
will be finished eagerly and will skip scheduling to the event loop.

Tasks are generic over the return type of their wrapped
coroutines.

> *Changed in version 3.7.*
> Added support for the `contextvars` module.

> *Changed in version 3.8.*
> Added the *name* parameter.

> *Deprecated since version 3.10.*
> Deprecation warning is emitted if *loop* is not specified
> and there is no running event loop.

> *Changed in version 3.11.*
> Added the *context* parameter.

> *Changed in version 3.12.*
> Added the *eager_start* parameter.

### `done()`

Return `True` if the Task is *done*.

A Task is *done* when the wrapped coroutine either returned
a value, raised an exception, or the Task was cancelled.

### `result()`

Return the result of the Task.

If the Task is *done*, the result of the wrapped coroutine
is returned (or if the coroutine raised an exception, that
exception is re-raised.)

If the Task has been *cancelled*, this method raises
a `CancelledError` exception.

If the Task's result isn't yet available, this method raises
an `InvalidStateError` exception.

### `exception()`

Return the exception of the Task.

If the wrapped coroutine raised an exception that exception
is returned.  If the wrapped coroutine returned normally
this method returns `None`.

If the Task has been *cancelled*, this method raises a
`CancelledError` exception.

If the Task isn't *done* yet, this method raises an
`InvalidStateError` exception.

### `add_done_callback(callback, *, context=None)`

Add a callback to be run when the Task is *done*.

This method should only be used in low-level callback-based code.

See the documentation of `Future.add_done_callback()`
for more details.

### `remove_done_callback(callback)`

Remove *callback* from the callbacks list.

This method should only be used in low-level callback-based code.

See the documentation of `Future.remove_done_callback()`
for more details.

### `get_stack(*, limit=None)`

Return the list of stack frames for this Task.

If the wrapped coroutine is not done, this returns the stack
where it is suspended.  If the coroutine has completed
successfully or was cancelled, this returns an empty list.
If the coroutine was terminated by an exception, this returns
the list of traceback frames.

The frames are always ordered from oldest to newest.

Only one stack frame is returned for a suspended coroutine.

The optional *limit* argument sets the maximum number of frames
to return; by default all available frames are returned.
The ordering of the returned list differs depending on whether
a stack or a traceback is returned: the newest frames of a
stack are returned, but the oldest frames of a traceback are
returned.  (This matches the behavior of the traceback module.)

### `print_stack(*, limit=None, file=None)`

Print the stack or traceback for this Task.

This produces output similar to that of the traceback module
for the frames retrieved by `get_stack()`.

The *limit* argument is passed to `get_stack()` directly.

The *file* argument is an I/O stream to which the output
is written; by default output is written to `sys.stdout`.

### `get_coro()`

Return the coroutine object wrapped by the `Task`.

> **Note:** This will return `None` for Tasks which have already
> completed eagerly. See the Eager Task Factory.

> *Added in version 3.8.*

> *Changed in version 3.12.*
> Newly added eager task execution means result may be `None`.

### `get_context()`

Return the `contextvars.Context` object
associated with the task.

> *Added in version 3.12.*

### `get_name()`

Return the name of the Task.

If no name has been explicitly assigned to the Task, the default
asyncio Task implementation generates a default name during
instantiation.

> *Added in version 3.8.*

### `set_name(value)`

Set the name of the Task.

The *value* argument can be any object, which is then
converted to a string.

In the default Task implementation, the name will be visible
in the `repr()` output of a task object.

> *Added in version 3.8.*

### `cancel(msg=None)`

Request the Task to be cancelled.

If the Task is already *done* or *cancelled*, return `False`,
otherwise, return `True`.

The method arranges for a `CancelledError` exception to be thrown
into the wrapped coroutine on the next cycle of the event loop.

The coroutine then has a chance to clean up or even deny the
request by suppressing the exception with a `try` ...
... `except CancelledError` ... `finally` block.
Therefore, unlike `Future.cancel()`, `Task.cancel()` does
not guarantee that the Task will be cancelled, although
suppressing cancellation completely is not common and is actively
discouraged.  Should the coroutine nevertheless decide to suppress
the cancellation, it needs to call `Task.uncancel()` in addition
to catching the exception.

If the Task being cancelled is currently awaiting on a future-like
object, that awaited object will also be cancelled. This cancellation
propagates down the entire chain of awaited objects.

> *Changed in version 3.9.*
> Added the *msg* parameter.

> *Changed in version 3.11.*
> The `msg` parameter is propagated from cancelled task to its awaiter.

The following example illustrates how coroutines can intercept
the cancellation request:

```
async def cancel_me():
    print('cancel_me(): before sleep')

    try:
        # Wait for 1 hour
        await asyncio.sleep(3600)
    except asyncio.CancelledError:
        print('cancel_me(): cancel sleep')
        raise
    finally:
        print('cancel_me(): after sleep')

async def main():
    # Create a "cancel_me" Task
    task = asyncio.create_task(cancel_me())

    # Wait for 1 second
    await asyncio.sleep(1)

    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("main(): cancel_me is cancelled now")

asyncio.run(main())

# Expected output:
#
#     cancel_me(): before sleep
#     cancel_me(): cancel sleep
#     cancel_me(): after sleep
#     main(): cancel_me is cancelled now
```

### `cancelled()`

Return `True` if the Task is *cancelled*.

The Task is *cancelled* when the cancellation was requested with
`cancel()` and the wrapped coroutine propagated the
`CancelledError` exception thrown into it.

### `uncancel()`

Decrement the count of cancellation requests to this Task.

Returns the remaining number of cancellation requests.

Note that once execution of a cancelled task completed, further
calls to `uncancel()` are ineffective.

> *Added in version 3.11.*

This method is used by asyncio's internals and isn't expected to be
used by end-user code.  In particular, if a Task gets successfully
uncancelled, this allows for elements of structured concurrency like
taskgroups and `asyncio.timeout()` to continue running,
isolating cancellation to the respective structured block.
For example:

```
async def make_request_with_timeout():
    try:
        async with asyncio.timeout(1):
            # Structured block affected by the timeout:
            await make_request()
            await make_another_request()
    except TimeoutError:
        log("There was a timeout")
    # Outer code not affected by the timeout:
    await unrelated_code()
```

While the block with `make_request()` and `make_another_request()`
might get cancelled due to the timeout, `unrelated_code()` should
continue running even in case of the timeout.  This is implemented
with `uncancel()`.  `TaskGroup` context managers use
`uncancel()` in a similar fashion.

If end-user code is, for some reason, suppressing cancellation by
catching `CancelledError`, it needs to call this method to remove
the cancellation state.

When this method decrements the cancellation count to zero,
the method checks if a previous `cancel()` call had arranged
for `CancelledError` to be thrown into the task.
If it hasn't been thrown yet, that arrangement will be
rescinded (by resetting the internal `_must_cancel` flag).

> *Changed in version 3.13.*
> Changed to rescind pending cancellation requests upon reaching zero.

### `cancelling()`

Return the number of pending cancellation requests to this Task, i.e.,
the number of calls to `cancel()` less the number of
`uncancel()` calls.

Note that if this number is greater than zero but the Task is
still executing, `cancelled()` will still return `False`.
This is because this number can be lowered by calling `uncancel()`,
which can lead to the task not being cancelled after all if the
cancellation requests go down to zero.

This method is used by asyncio's internals and isn't expected to be
used by end-user code.  See `uncancel()` for more details.

> *Added in version 3.11.*
