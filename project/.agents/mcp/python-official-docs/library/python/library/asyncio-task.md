---
title: "Coroutines and tasks (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-task.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Coroutines and tasks

This section outlines high-level asyncio APIs to work with coroutines
and Tasks.

## Coroutines

**Source code:** Lib/asyncio/coroutines.py

Coroutines declared with the async/await syntax is the
preferred way of writing asyncio applications.  For example, the following
snippet of code prints "hello", waits 1 second,
and then prints "world":

```
>>> import asyncio

>>> async def main():
...     print('hello')
...     await asyncio.sleep(1)
...     print('world')

>>> asyncio.run(main())
hello
world
```

Note that simply calling a coroutine will not schedule it to
be executed:

```
>>> main()
<coroutine object main at 0x1053bb7c8>
```

To actually run a coroutine, asyncio provides the following mechanisms:

- The `asyncio.run()` function to run the top-level
entry point "main()" function (see the above example.)

- Awaiting on a coroutine.  The following snippet of code will
print "hello" after waiting for 1 second, and then print "world"
after waiting for *another* 2 seconds:

```
import asyncio
import time

async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

async def main():
    print(f"started at {time.strftime('%X')}")

    await say_after(1, 'hello')
    await say_after(2, 'world')

    print(f"finished at {time.strftime('%X')}")

asyncio.run(main())
```

Expected output:

```
started at 17:13:52
hello
world
finished at 17:13:55
```

- The `asyncio.create_task()` function to run coroutines
concurrently as asyncio `Tasks`.

Let's modify the above example and run two `say_after` coroutines
*concurrently*:

```
async def main():
    task1 = asyncio.create_task(
        say_after(1, 'hello'))

    task2 = asyncio.create_task(
        say_after(2, 'world'))

    print(f"started at {time.strftime('%X')}")

    # Wait until both tasks are completed (should take
    # around 2 seconds.)
    await task1
    await task2

    print(f"finished at {time.strftime('%X')}")
```

Note that expected output now shows that the snippet runs
1 second faster than before:

```
started at 17:14:32
hello
world
finished at 17:14:34
```

- The `asyncio.TaskGroup` class provides a more modern
alternative to `create_task()`.
Using this API, the last example becomes:

```
async def main():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(
            say_after(1, 'hello'))

        task2 = tg.create_task(
            say_after(2, 'world'))

        print(f"started at {time.strftime('%X')}")

    # The await is implicit when the context manager exits.

    print(f"finished at {time.strftime('%X')}")
```

The timing and output should be the same as for the previous version.

> *Added in version 3.11.*
> `asyncio.TaskGroup`.

## Awaitables

We say that an object is an **awaitable** object if it can be used
in an `await` expression.  Many asyncio APIs are designed to
accept awaitables.

There are three main types of *awaitable* objects:
**coroutines**, **Tasks**, and **Futures**.

**Coroutines**

Python coroutines are *awaitables* and therefore can be awaited from
other coroutines:

```
import asyncio

async def nested():
    return 42

async def main():
    # Nothing happens if we just call "nested()".
    # A coroutine object is created but not awaited,
    # so it *won't run at all*.
    nested()  # will raise a "RuntimeWarning".

    # Let's do it differently now and await it:
    print(await nested())  # will print "42".

asyncio.run(main())
```

> **Important:** In this documentation the term "coroutine" can be used for
> two closely related concepts:
>
> - a *coroutine function*: an `async def` function;
>
> - a *coroutine object*: an object returned by calling a
> *coroutine function*.

**Tasks**

*Tasks* are used to schedule coroutines *concurrently*.

When a coroutine is wrapped into a *Task* with functions like
`asyncio.create_task()` the coroutine is automatically
scheduled to run soon:

```
import asyncio

async def nested():
    return 42

async def main():
    # Schedule nested() to run soon concurrently
    # with "main()".
    task = asyncio.create_task(nested())

    # "task" can now be used to cancel "nested()", or
    # can simply be awaited to wait until it is complete:
    await task

asyncio.run(main())
```

**Futures**

A `Future` is a special **low-level** awaitable object that
represents an **eventual result** of an asynchronous operation.

When a Future object is *awaited* it means that the coroutine will
wait until the Future is resolved in some other place.

Future objects in asyncio are needed to allow callback-based code
to be used with async/await.

Normally **there is no need** to create Future objects at the
application level code.

Future objects, sometimes exposed by libraries and some asyncio
APIs, can be awaited:

```
async def main():
    await function_that_returns_a_future_object()

    # this is also valid:
    await asyncio.gather(
        function_that_returns_a_future_object(),
        some_python_coroutine()
    )
```

A good example of a low-level function that returns a Future object
is `loop.run_in_executor()`.

## Creating tasks

**Source code:** Lib/asyncio/tasks.py

### `create_task(coro, *, name=None, context=None, eager_start=None, **kwargs)`

Wrap the *coro* coroutine into a `Task`
and schedule its execution.  Return the Task object.

The full function signature is largely the same as that of the
`Task` constructor (or factory) - all of the keyword arguments to
this function are passed through to that interface.

An optional keyword-only *context* argument allows specifying a
custom `contextvars.Context` for the *coro* to run in.
The current context copy is created when no *context* is provided.

An optional keyword-only *eager_start* argument allows specifying
if the task should execute eagerly during the call to create_task,
or be scheduled later. If *eager_start* is not passed the mode set
by `loop.set_task_factory()` will be used.

The task is executed in the loop returned by `get_running_loop()`,
`RuntimeError` is raised if there is no running loop in
current thread.

> **Note:** `asyncio.TaskGroup.create_task()` is a new alternative
> leveraging structural concurrency; it allows for waiting
> for a group of related tasks with strong safety guarantees.

> **Important:** Save a reference to the result of this function, to avoid
> a task disappearing mid-execution. The event loop only keeps
> weak references to tasks. A task that isn't referenced elsewhere
> may get garbage collected at any time, even before it's done.
> For reliable "fire-and-forget" background tasks, gather them in
> a collection:
>
>
> ```
> background_tasks = set()
>
> for i in range(10):
>     task = asyncio.create_task(some_coro(param=i))
>
>     # Add task to the set. This creates a strong reference.
>     background_tasks.add(task)
>
>     # To prevent keeping references to finished tasks forever,
>     # make each task remove its own reference from the set after
>     # completion:
>     task.add_done_callback(background_tasks.discard)
> ```
>
>
> Note that this approach never awaits the tasks, so if a task
> fails, its exception is never retrieved and asyncio logs a
> "Task exception was never retrieved" message when the task is
> garbage collected.  To avoid this, use `asyncio.TaskGroup`
> which keeps a strong reference to each task, awaits them and
> propagates their exceptions:
>
>
> ```
> async with asyncio.TaskGroup() as tg:
>     for i in range(10):
>         tg.create_task(some_coro(param=i))
> ```
>

> *Added in version 3.7.*

> *Changed in version 3.8.*
> Added the *name* parameter.

> *Changed in version 3.11.*
> Added the *context* parameter.

> *Changed in version 3.14.*
> Added the *eager_start* parameter by passing on all *kwargs*.

## Task cancellation

Tasks can easily and safely be cancelled.
When a task is cancelled, `asyncio.CancelledError` will be raised
in the task at the next opportunity.

It is recommended that coroutines use `try/finally` blocks to robustly
perform clean-up logic. In case `asyncio.CancelledError`
is explicitly caught, it should generally be propagated when
clean-up is complete. `asyncio.CancelledError` directly subclasses
`BaseException` so most code will not need to be aware of it.

The asyncio components that enable structured concurrency, like
`asyncio.TaskGroup` and `asyncio.timeout()`,
are implemented using cancellation internally and might misbehave if
a coroutine swallows `asyncio.CancelledError`. Similarly, user code
should not generally call `uncancel()`.
However, in cases when suppressing `asyncio.CancelledError` is
truly desired, it is necessary to also call `uncancel()` to completely
remove the cancellation state.

## Task groups

Task groups combine a task creation API with a convenient
and reliable way to wait for all tasks in the group to finish.

### class `TaskGroup()`

An asynchronous context manager
holding a group of tasks.
Tasks can be added to the group using `create_task()`.
All tasks are awaited when the context manager exits.

> *Added in version 3.11.*

### `create_task(coro, *, name=None, context=None, eager_start=None, **kwargs)`

Create a task in this task group.
The signature matches that of `asyncio.create_task()`.
If the task group is inactive (e.g. not yet entered,
already finished, or in the process of shutting down),
we will close the given `coro` and raise `RuntimeError`.

> *Changed in version 3.13.*
> Close the given coroutine if the task group is not active.

> *Changed in version 3.14.*
> Passes on all *kwargs* to `loop.create_task()`

### `cancel()`

Cancel the task group.  This is a non-exceptional, early exit of the
task group's lifetime -- useful once the group's goal has been met or
its services no longer needed.

`cancel()` will be called on any tasks in the group that
aren't yet done, as well as the parent (body) of the group.  The task group
context manager will exit *without* `asyncio.CancelledError` being raised.

If `cancel()` is called before entering the task group, the group will be
cancelled upon entry.  This is useful for patterns where one piece of
code passes an unused `asyncio.TaskGroup` instance to another in order to have
the ability to cancel anything run within the group.

`cancel()` is idempotent and may be called after the task group has
already exited.

Some ways to use `cancel()`:

- call it from the task group body based on some condition or event
- pass the task group instance to child tasks via `create_task()`, allowing a child
task to conditionally cancel the entire group
- pass the task group instance or bound `cancel()` method to some other task *before*
opening the task group, allowing remote cancellation

> *Added in version 3.15.*

Example:

```
async def main():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(some_coro(...))
        task2 = tg.create_task(another_coro(...))
    print(f"Both tasks have completed now: {task1.result()}, {task2.result()}")
```

The `async with` statement will wait for all tasks in the group to finish.
While waiting, new tasks may still be added to the group
(for example, by passing `tg` into one of the coroutines
and calling `tg.create_task()` in that coroutine).  There is also opportunity to
request termination of the entire task group with `tg.cancel()`, based on some condition.
Once the last task has finished and the `async with` block is exited,
no new tasks may be added to the group.

The first time any of the tasks belonging to the group fails
with an exception other than `asyncio.CancelledError`,
the remaining tasks in the group are cancelled.
No further tasks can then be added to the group.
At this point, if the body of the `async with` statement is still active
(i.e., `__aexit__()` hasn't been called yet),
the task directly containing the `async with` statement is also cancelled.
The resulting `asyncio.CancelledError` will interrupt an `await`,
but it will not bubble out of the containing `async with` statement.

Once all tasks have finished, if any tasks have failed
with an exception other than `asyncio.CancelledError`,
those exceptions are combined in an
`ExceptionGroup` or `BaseExceptionGroup`
(as appropriate; see their documentation)
which is then raised.

Two base exceptions are treated specially:
If any task fails with `KeyboardInterrupt` or `SystemExit`,
the task group still cancels the remaining tasks and waits for them,
but then the initial `KeyboardInterrupt` or `SystemExit`
is re-raised instead of `ExceptionGroup` or `BaseExceptionGroup`.

If the body of the `async with` statement exits with an exception
(so `__aexit__()` is called with an exception set),
this is treated the same as if one of the tasks failed:
the remaining tasks are cancelled and then waited for,
and non-cancellation exceptions are grouped into an
exception group and raised.
The exception passed into `__aexit__()`,
unless it is `asyncio.CancelledError`,
is also included in the exception group.
The same special case is made for
`KeyboardInterrupt` and `SystemExit` as in the previous paragraph.
There is an additional special case made only for the body of the
`async with`: if it raises `GeneratorExit` and none of the
other tasks raise exceptions that would be reported, then the
`GeneratorExit` is reraised.

Task groups are careful not to mix up the internal cancellation used to
"wake up" their `__aexit__()` with cancellation requests
for the task in which they are running made by other parties.
In particular, when one task group is syntactically nested in another,
and both experience an exception in one of their child tasks simultaneously,
the inner task group will process its exceptions, and then the outer task group
will receive another cancellation and process its own exceptions.

In the case where a task group is cancelled externally and also must
raise an `ExceptionGroup`, it will call the parent task's
`cancel()` method. This ensures that a
`asyncio.CancelledError` will be raised at the next
`await`, so the cancellation is not lost.

Task groups preserve the cancellation count
reported by `asyncio.Task.cancelling()`.

> *Changed in version 3.13.*
> Improved handling of simultaneous internal and external cancellations
> and correct preservation of cancellation counts.

> *Changed in version 3.15.*
> Addition of the special case for `GeneratorExit`.
