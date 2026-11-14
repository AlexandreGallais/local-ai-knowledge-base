---
title: "A conceptual overview of asyncio (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/a-conceptual-overview-of-asyncio.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# A conceptual overview of `asyncio`

This HOWTO article seeks to help you build a sturdy mental
model of how `asyncio` fundamentally works, helping you understand the
how and why behind the recommended patterns.

You might be curious about some key `asyncio` concepts.
By the end of this article, you'll be able to comfortably answer these questions:

- What's happening behind the scenes when an object is awaited?
- How does `asyncio` differentiate between a task which doesn't need
CPU time (such as a network request or file read) as opposed to a task that
does (such as computing n-factorial)?
- How to write an asynchronous variant of an operation, such as
an async sleep or database request.

> **See also:** - The `guide <https://github.com/anordin95/a-conceptual-overview-of-asyncio/
> tree/main>`_ that inspired this HOWTO article, by Alexander Nordin.
> - This in-depth `YouTube tutorial series <https://www.youtube.com/
> watch?v=Xbl7XjFYsN4&list=PLhNSoGM2ik6SIkVGXWBwerucXjgP1rHmB>`_ on
> `asyncio` created by Python core team member, Łukasz Langa.
> - `500 Lines or Less: A Web Crawler With asyncio Coroutines <https://
> aosabook.org/en/500L/a-web-crawler-with-asyncio-coroutines.html>`_ by A.
> Jesse Jiryu Davis and Guido van Rossum.

## A conceptual overview part 1: the high-level

In part 1, we'll cover the main, high-level building blocks of `asyncio`:
the event loop, coroutine functions, coroutine objects, tasks, and `await`.

### Event loop

Everything in `asyncio` happens relative to the event loop.
It's the star of the show, but prefers to work behind the scenes, managing
and coordinating resources.
It's like an orchestra conductor.
Some power is explicitly granted to it, but a lot of its ability to get things
done comes from the respect and cooperation of its band members.

In more technical terms, the event loop contains a collection of jobs to be run.
Some jobs are added directly by you, and some indirectly by `asyncio`.
The event loop takes a job from its backlog of work and invokes it (or "gives
it control"), similar to calling a function, and then that job runs.
Once it pauses or completes, it returns control to the event loop.
The event loop will then select another job from its pool and invoke it.
You can *roughly* think of the collection of jobs as a queue: jobs are added and
then processed one at a time, generally (but not always) in order.
This process repeats indefinitely, with the event loop cycling endlessly
onwards.
If there are no more jobs pending execution, the event loop is smart enough to
rest and avoid needlessly wasting CPU cycles, and will come back when there's
more work to be done, such as when I/O operations complete or timers expire.

Effective execution relies on jobs sharing well and cooperating; a greedy job
could hog control and leave the other jobs to starve, rendering the overall
event loop approach rather useless.

```
import asyncio

# This creates an event loop and indefinitely cycles through
# its collection of jobs.
event_loop = asyncio.new_event_loop()
event_loop.run_forever()
```

### Asynchronous functions and coroutines

This is a basic, boring Python function:

```
def hello_printer():
    print(
        "Hi, I am a lowly, simple printer, though I have all I "
        "need in life -- \nfresh paper and my dearly beloved octopus "
        "partner in crime."
    )
```

Calling a regular function invokes its logic or body:

```
>>> hello_printer()
Hi, I am a lowly, simple printer, though I have all I need in life --
fresh paper and my dearly beloved octopus partner in crime.
```

The async def, as opposed to just a plain `def`, makes
this an asynchronous function (or "coroutine function").
Calling it creates and returns a coroutine object.

```
async def loudmouth_penguin(magic_number: int):
    print(
     "I am a super special talking penguin. Far cooler than that printer. "
     f"By the way, my lucky number is: {magic_number}."
    )
```

Calling the async function, `loudmouth_penguin`, does not execute the print statement;
instead, it creates a coroutine object:

```
>>> loudmouth_penguin(magic_number=3)
<coroutine object loudmouth_penguin at 0x104ed2740>
```

The terms "coroutine function" and "coroutine object" are often conflated
as coroutine.
That can be confusing!
In this article, coroutine specifically refers to a coroutine object, or more
precisely, an instance of `types.CoroutineType` (native coroutine).
Note that coroutines can also exist as instances of
`collections.abc.Coroutine` -- a distinction that matters for type
checking.

A coroutine represents the function's body or logic.
A coroutine has to be explicitly started; again, merely creating the coroutine
does not start it.
Notably, the coroutine can be paused and resumed at various points within the
function's body.
That pausing and resuming ability is what allows for asynchronous behavior!

Coroutines and coroutine functions were built by leveraging the functionality
of generators and
generator functions.
Recall, a generator function is a function that `yield`\s, like this
one:

```
def get_random_number():
    # This would be a bad random number generator!
    print("Hi")
    yield 1
    print("Hello")
    yield 7
    print("Howdy")
    yield 4
    ...
```

Similar to a coroutine function, calling a generator function does not run it.
Instead, it creates a generator object:

```
>>> get_random_number()
<generator object get_random_number at 0x1048671c0>
```

You can proceed to the next `yield` of a generator by using the
built-in function `next()`.
In other words, the generator runs, then pauses.
For example:

```
>>> generator = get_random_number()
>>> next(generator)
Hi
1
>>> next(generator)
Hello
7
```

### Tasks

Roughly speaking, tasks are coroutines (not coroutine
functions) tied to an event loop.
A task also maintains a list of callback functions whose importance will become
clear in a moment when we discuss `await`.

Creating a task automatically schedules it for execution (by adding a
callback to run it in the event loop's to-do list, that is, collection of jobs).
The recommended way to create tasks is via `asyncio.create_task()`.

`asyncio` automatically associates tasks with the event loop for you.
This automatic association was purposely designed into `asyncio` for
the sake of simplicity.
Without it, you'd have to keep track of the event loop object and pass it to
any coroutine function that wants to create tasks, adding redundant clutter
to your code.

```
coroutine = loudmouth_penguin(magic_number=5)
# This creates a Task object and schedules its execution via the event loop.
task = asyncio.create_task(coroutine)
```

Earlier, we manually created the event loop and set it to run forever.
In practice, it's recommended to use (and common to see) `asyncio.run()`,
which takes care of managing the event loop and ensuring the provided
coroutine finishes before advancing.
For example, many async programs follow this setup:

```
import asyncio

async def main():
    # Perform all sorts of wacky, wild asynchronous things...
    ...

if __name__ == "__main__":
    asyncio.run(main())
    # The program will not reach the following print statement until the
    # coroutine main() finishes.
    print("coroutine main() is done!")
```

It's important to be aware that the task itself is not added to the event loop,
only a callback to the task is.
This matters if the task object you created is garbage collected before it's
called by the event loop.
For example, consider this program:

```
async def hello():
    print("hello!")

async def main():
    asyncio.create_task(hello())
    # Other asynchronous instructions which run for a while
    # and cede control to the event loop...
    ...

asyncio.run(main())
```

Because there's no reference to the task object created on line 5, it *might*
be garbage collected before the event loop invokes it.
Later instructions in the coroutine `main()` hand control back to the event
loop so it can invoke other jobs.
When the event loop eventually tries to run the task, it might fail and
discover the task object does not exist!
This can also happen even if a coroutine keeps a reference to a task but
completes before that task finishes.
When the coroutine exits, local variables go out of scope and may be subject
to garbage collection.
In practice, `asyncio` and Python's garbage collector work pretty hard to
ensure this sort of thing doesn't happen.
But that's no reason to be reckless!

### await

`await` is a Python keyword that's commonly used in one of two
different ways:

```
await task
await coroutine
```

In a crucial way, the behavior of `await` depends on the type of object
being awaited.

#### Awaiting tasks

Awaiting a task will cede control from the current task or coroutine to
the event loop.
In the process of relinquishing control, a few important things happen.
We'll use the following code example to illustrate:

```
async def plant_a_tree():
    dig_the_hole_task = asyncio.create_task(dig_the_hole())
    await dig_the_hole_task

    # Other instructions associated with planting a tree.
    ...
```

In this example, imagine the event loop has passed control to the start of the
coroutine `plant_a_tree()`.
As seen above, the coroutine creates a task and then awaits it.
The `await dig_the_hole_task` instruction adds a callback (which will resume
`plant_a_tree()`) to the `dig_the_hole_task` object's list of callbacks.
And then, the instruction cedes control to the event loop.
Some time later, the event loop will pass <example-value> to `dig_the_hole_task`
and the task will finish whatever it needs to do.
Once the task finishes, it will add its various callbacks to the event loop,
in this case, a call to resume `plant_a_tree()`.

Generally speaking, when the awaited task finishes (`dig_the_hole_task`),
the original task or coroutine (`plant_a_tree()`) is added back to the event
loop's to-do list to be resumed.

This is a basic, yet reliable mental model.
In practice, the control handoffs are slightly more complex, but not by much.
In part 2, we'll walk through the details that make this possible.

#### Awaiting coroutines

**Unlike tasks, awaiting a coroutine does not hand control back to the event
loop!**
Wrapping a coroutine in a task first, then awaiting that would cede
control.
The behavior of `await coroutine` is effectively the same as invoking a
regular, synchronous Python function.
Consider this program:

```
import asyncio

async def coro_a():
   print("I am coro_a(). Hi!")

async def coro_b():
   print("I am coro_b(). I sure hope no one hogs the event loop...")

async def main():
   task_b = asyncio.create_task(coro_b())
   num_repeats = 3
   for _ in range(num_repeats):
      await coro_a()
   await task_b

asyncio.run(main())
```

The first statement in the coroutine `main()` creates `task_b` and schedules
it for execution via the event loop.
Then, `coro_a()` is repeatedly awaited. Control never cedes to the
event loop, which is why we see the output of all three `coro_a()`
invocations before `coro_b()`'s output:

```none
I am coro_a(). Hi!
I am coro_a(). Hi!
I am coro_a(). Hi!
I am coro_b(). I sure hope no one hogs the event loop...
```

If we change `await coro_a()` to `await asyncio.create_task(coro_a())`, the
behavior changes.
The coroutine `main()` cedes control to the event loop with that statement.
The event loop then proceeds through its backlog of work, calling `task_b`
and then the task which wraps `coro_a()` before resuming the coroutine
`main()`.

```none
I am coro_b(). I sure hope no one hogs the event loop...
I am coro_a(). Hi!
I am coro_a(). Hi!
I am coro_a(). Hi!
```

This behavior of `await coroutine` can trip a lot of people up!
That example highlights how using only `await coroutine` could
unintentionally hog control from other tasks and effectively stall the event
loop.
`asyncio.run()` can help you detect such occurrences via the
`debug=True` flag, which enables
debug mode.
Among other things, it will log any coroutines that monopolize execution for
100ms or longer.

The design intentionally trades off some conceptual clarity around usage of
`await` for improved performance.
Each time a task is awaited, control needs to be passed all the way up the
call stack to the event loop.
Then, the event loop needs to manage its internal state and work through
its processing logic to resume the next job.
That might sound minor, but in a large program with many `await`s, that
overhead can add up to a non-negligible performance drag.
