---
title: "Event loop (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-eventloop.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Event loop

**Source code:** Lib/asyncio/events.py,
Lib/asyncio/base_events.py

**Preface**

The event loop is the core of every asyncio application.
Event loops run asynchronous tasks and callbacks, perform network
IO operations, and run subprocesses.

Application developers should typically use the high-level asyncio functions,
such as `asyncio.run()`, and should rarely need to reference the loop
object or call its methods.  This section is intended mostly for authors
of lower-level code, libraries, and frameworks, who need finer control over
the event loop behavior.

**Obtaining the Event Loop**

The following low-level functions can be used to get, set, or create
an event loop:

### `get_running_loop()`

Return the running event loop in the current OS thread.

Raise a `RuntimeError` if there is no running event loop.

This function can only be called from a coroutine or a callback.

> *Added in version 3.7.*

### `get_event_loop()`

Get the current event loop.

When called from a coroutine or a callback (e.g. scheduled with
call_soon or similar API), this function will always return the
running event loop.

If there is no running event loop set, the function will return
the result of the `get_event_loop_policy().get_event_loop()` call.

Because this function has rather complex behavior (especially
when custom event loop policies are in use), using the
`get_running_loop()` function is preferred to `get_event_loop()`
in coroutines and callbacks.

As noted above, consider using the higher-level `asyncio.run()` function,
instead of using these lower level functions to manually create and close an
event loop.

> *Changed in version 3.14.*
> Raises a `RuntimeError` if there is no current event loop.

> **Note:** The `asyncio` policy system is deprecated and will be removed
> in Python 3.16; from there on, this function will return the current
> running event loop if present else it will return the
> loop set by `set_event_loop()`.

### `set_event_loop(loop)`

Set *loop* as the current event loop for the current OS thread.

### `new_event_loop()`

Create and return a new event loop object.

Note that the behaviour of `get_event_loop()`, `set_event_loop()`,
and `new_event_loop()` functions can be altered by
setting a custom event loop policy.

**Contents**

This documentation page contains the following sections:

- The Event Loop Methods section is the reference documentation of
the event loop APIs;

- The Callback Handles section documents the `Handle` and
`TimerHandle` instances which are returned from scheduling
methods such as `loop.call_soon()` and `loop.call_later()`;

- The Server Objects section documents types returned from
event loop methods like `loop.create_server()`;

- The Event Loop Implementations section documents the
`SelectorEventLoop` and `ProactorEventLoop` classes;

- The Examples section showcases how to work with some event
loop APIs.
