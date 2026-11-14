---
title: "A conceptual overview of asyncio (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/a-conceptual-overview-of-asyncio.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# A conceptual overview of asyncio (part 2 of 2)

## A conceptual overview part 2: the nuts and bolts

Part 2 goes into detail on the mechanisms `asyncio` uses to manage
control flow.
This is where the magic happens.
You'll come away from this section knowing what `await` does behind the scenes
and how to make your own asynchronous operators.

### The inner workings of coroutines

`asyncio` leverages four components of Python to pass
around control.

`coroutine.send(arg)` is the method used to start or
resume a coroutine.
If the coroutine was paused and is now being resumed, the argument `arg`
will be sent in as the return value of the `yield` statement which originally
paused it.
If the coroutine is being used for the first time (as opposed to being resumed),
`arg` must be `None`.

```
class Rock:
    def __await__(self):
        value_sent_in = yield 7
        print(f"Rock.__await__ resuming with value: {value_sent_in}.")
        return value_sent_in

async def main():
    print("Beginning coroutine main().")
    rock = Rock()
    print("Awaiting rock...")
    value_from_rock = await rock
    print(f"Coroutine received value: {value_from_rock} from rock.")
    return 23

coroutine = main()
intermediate_result = coroutine.send(None)
print(f"Coroutine paused and returned intermediate value: {intermediate_result}.")

print(f"Resuming coroutine and sending in value: 42.")
try:
    coroutine.send(42)
except StopIteration as e:
    returned_value = e.value
print(f"Coroutine main() finished and provided value: {returned_value}.")
```

yield, as usual, pauses execution and returns control
to the caller.
In the example above, the `yield`, on line 3, is called by
`... = await rock` on line 11.
More broadly speaking, `await` calls the `__await__()` method of
the given object.
`await` also does one more very special thing: it propagates (or "passes
along") any `yield`s it receives up the call chain.
In this case, that's back to `... = coroutine.send(None)` on line 16.

The coroutine is resumed via the `coroutine.send(42)` call on line 21.
The coroutine picks back up from where it `yield`ed (or paused) on line 3
and executes the remaining statements in its body.
When a coroutine finishes, it raises a `StopIteration` exception with the
return value attached in the `value` attribute.

That snippet produces this output:

```none
Beginning coroutine main().
Awaiting rock...
Coroutine paused and returned intermediate value: 7.
Resuming coroutine and sending in value: 42.
Rock.__await__ resuming with value: 42.
Coroutine received value: 42 from rock.
Coroutine main() finished and provided value: 23.
```

It's worth pausing for a moment here and making sure you followed the various
ways that control flow and values were passed. A lot of important ideas were
covered and it's worth ensuring your understanding is firm.

The only way to yield (or effectively cede control) from a coroutine is to
`await` an object that `yield`s in its `__await__` method.
That might sound odd to you. You might be thinking:

1. What about a `yield` directly within the coroutine function? The
coroutine function becomes an
async generator function, a
different beast entirely.

1. What about a yield from within the coroutine function to a (plain)
generator?
That causes the error: `SyntaxError: yield from not allowed in a coroutine.`
This was intentionally designed for the sake of simplicity -- mandating only
one way of using coroutines.
Despite that, `yield from` and `await` effectively do the same thing.
Initially `yield` was barred as well, but was re-accepted to allow for
async generators.

### Futures

A future is an object meant to represent a
computation's status and result.
The term is a nod to the idea of something still to come or not yet happened,
and the object is a way to keep an eye on that something.

A future has a few important attributes. One is its state, which can be either
"pending", "cancelled", or "done".
Another is its result, which is set when the state transitions to done.
Unlike a coroutine, a future does not represent the actual computation to be
done; instead, it represents the status and result of that computation, kind of
like a status light (red, yellow, or green) or indicator.

`asyncio.Task` subclasses `asyncio.Future` in order to gain
these various capabilities.
The prior section said tasks store a list of callbacks, which wasn't entirely
accurate.
It's actually the `Future` class that implements this logic, which `Task`
inherits.

Futures may also be used directly (not via tasks).
Tasks mark themselves as done when their coroutine is complete.
Futures are much more versatile and will be marked as done when you say so.
In this way, they're the flexible interface for you to make your own conditions
for waiting and resuming.

### A homemade asyncio.sleep

We'll go through an example of how you could leverage a future to create your
own variant of asynchronous sleep (`async_sleep`) which mimics
`asyncio.sleep()`.

This snippet registers a few tasks with the event loop and then awaits the task
created by `asyncio.create_task`, which wraps the `async_sleep(3)` coroutine.
We want that task to finish only after three seconds have elapsed, but without
preventing other tasks from running.

```
async def other_work():
    print("I like work. Work work.")

async def main():
    # Add a few other tasks to the event loop, so there's something
    # to do while asynchronously sleeping.
    work_tasks = [
        asyncio.create_task(other_work()),
        asyncio.create_task(other_work()),
        asyncio.create_task(other_work())
    ]
    print(
        "Beginning asynchronous sleep at time: "
        f"{datetime.datetime.now().strftime("%H:%M:%S")}."
    )
    await asyncio.create_task(async_sleep(3))
    print(
        "Done asynchronous sleep at time: "
        f"{datetime.datetime.now().strftime("%H:%M:%S")}."
    )
    # asyncio.gather effectively awaits each task in the collection.
    await asyncio.gather(*work_tasks)
```

Below, we use a future to enable custom control over when that task will be
marked as done.
If `future.set_result()` (the method
responsible for marking that future as done) is never called, then this task
will never finish.
We've also enlisted the help of another task, which we'll see in a moment, that
will monitor how much time has elapsed and, accordingly, call
`future.set_result()`.

```
async def async_sleep(seconds: float):
    future = asyncio.Future()
    time_to_wake = time.time() + seconds
    # Add the watcher-task to the event loop.
    watcher_task = asyncio.create_task(_sleep_watcher(future, time_to_wake))
    # Block until the future is marked as done.
    await future
```

Below, we use a rather bare `YieldToEventLoop()` object to `yield`
from its `__await__` method, ceding control to the event loop.
This is effectively the same as calling `asyncio.sleep(0)`, but this approach
offers more clarity, not to mention it's somewhat cheating to use
`asyncio.sleep` when showcasing how to implement it!

As usual, the event loop cycles through its tasks, giving them control
and receiving control back when they pause or finish.
The `watcher_task`, which runs the coroutine `_sleep_watcher(...)`, will
be invoked once per full cycle of the event loop.
On each resumption, it'll check the time and if not enough has elapsed, then
it'll pause once again and hand control back to the event loop.
Once enough time has elapsed, `_sleep_watcher(...)`
marks the future as done and completes by exiting its
infinite `while` loop.
Given this helper task is only invoked once per cycle of the event loop,
you'd be correct to note that this asynchronous sleep will sleep *at least*
three seconds, rather than exactly three seconds.
Note this is also true of `asyncio.sleep`.

```
class YieldToEventLoop:
    def __await__(self):
        yield

async def _sleep_watcher(future, time_to_wake):
    while True:
        if time.time() >= time_to_wake:
            # This marks the future as done.
            future.set_result(None)
            break
        else:
            await YieldToEventLoop()
```

Here is the full program's output:

```none
$ python custom-async-sleep.py
Beginning asynchronous sleep at time: 14:52:22.
I like work. Work work.
I like work. Work work.
I like work. Work work.
Done asynchronous sleep at time: 14:52:25.
```

You might feel this implementation of asynchronous sleep was unnecessarily
convoluted.
And, well, it was.
The example was meant to showcase the versatility of futures with a simple
example that could be mimicked for more complex needs.
For reference, you could implement it without futures, like so:

```
async def simpler_async_sleep(seconds):
    time_to_wake = time.time() + seconds
    while True:
        if time.time() >= time_to_wake:
            return
        else:
            await YieldToEventLoop()
```

But that's all for now. Hopefully you're ready to more confidently dive into
some async programming or check out advanced topics in the
`rest of the documentation`.
