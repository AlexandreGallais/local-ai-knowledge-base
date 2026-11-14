---
title: "Execution model (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/executionmodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Execution model (part 2 of 2)

## Runtime Components

### General Computing Model

Python's execution model does not operate in a vacuum.  It runs on
a host machine and through that host's runtime environment, including
its operating system (OS), if there is one.  When a program runs,
the conceptual layers of how it runs on the host look something
like this:

| **host machine**
|   **process** (global resources)
|     **thread** (runs machine code)

Each process represents a program running on the host.  Think of each
process itself as the data part of its program.  Think of the process'
threads as the execution part of the program.  This distinction will
be important to understand the conceptual Python runtime.

The process, as the data part, is the execution context in which the
program runs.  It mostly consists of the set of resources assigned to
the program by the host, including memory, signals, file handles,
sockets, and environment variables.

Processes are isolated and independent from one another.  (The same
is true for hosts.)  The host manages the process' access to its
assigned resources, in addition to coordinating between processes.

Each thread represents the actual execution of the program's machine
code, running relative to the resources assigned to the program's
process.  It's strictly up to the host how and when that execution
takes place.

From the point of view of Python, a program always starts with exactly
one thread.  However, the program may grow to run in multiple
simultaneous threads.  Not all hosts support multiple threads per
process, but most do.  Unlike processes, threads in a process are not
isolated and independent from one another.  Specifically, all threads
in a process share all of the process' resources.

The fundamental point of threads is that each one does *run*
independently, at the same time as the others.  That may be only
conceptually at the same time ("concurrently") or physically
("in parallel").  Either way, the threads effectively run
at a non-synchronized rate.

> **Note:** That non-synchronized rate means none of the process' memory is
> guaranteed to stay consistent for the code running in any given
> thread.  Thus multi-threaded programs must take care to coordinate
> access to intentionally shared resources.  Likewise, they must take
> care to be absolutely diligent about not accessing any *other*
> resources in multiple threads; otherwise two threads running at the
> same time might accidentally interfere with each other's use of some
> shared data.  All this is true for both Python programs and the
> Python runtime.
>
> The cost of this broad, unstructured requirement is the tradeoff for
> the kind of raw concurrency that threads provide.  The alternative
> to the required discipline generally means dealing with
> non-deterministic bugs and data corruption.

### Python Runtime Model

The same conceptual layers apply to each Python program, with some
extra data layers specific to Python:

| **host machine**
|   **process** (global resources)
|     Python global runtime (*state*)
|       Python interpreter (*state*)
|         **thread** (runs Python bytecode and "C-API")
|           Python thread *state*

At the conceptual level: when a Python program starts, it looks exactly
like that diagram, with one of each.  The runtime may grow to include
multiple interpreters, and each interpreter may grow to include
multiple thread states.

> **Note:** A Python implementation won't necessarily implement the runtime
> layers distinctly or even concretely.  The only exception is places
> where distinct layers are directly specified or exposed to users,
> like through the `threading` module.

> **Note:** The initial interpreter is typically called the "main" interpreter.
> Some Python implementations, like CPython, assign special roles
> to the main interpreter.
>
> Likewise, the host thread where the runtime was initialized is known
> as the "main" thread.  It may be different from the process' initial
> thread, though they are often the same.  In some cases "main thread"
> may be even more specific and refer to the initial thread state.
> A Python runtime might assign specific responsibilities
> to the main thread, such as handling signals.

As a whole, the Python runtime consists of the global runtime state,
interpreters, and thread states.  The runtime ensures all that state
stays consistent over its lifetime, particularly when used with
multiple host threads.

The global runtime, at the conceptual level, is just a set of
interpreters.  While those interpreters are otherwise isolated and
independent from one another, they may share some data or other
resources.  The runtime is responsible for managing these global
resources safely.  The actual nature and management of these resources
is implementation-specific.  Ultimately, the external utility of the
global runtime is limited to managing interpreters.

In contrast, an "interpreter" is conceptually what we would normally
think of as the (full-featured) "Python runtime".  When machine code
executing in a host thread interacts with the Python runtime, it calls
into Python in the context of a specific interpreter.

> **Note:** The term "interpreter" here is not the same as the "bytecode
> interpreter", which is what regularly runs in threads, executing
> compiled Python code.
>
> In an ideal world, "Python runtime" would refer to what we currently
> call "interpreter".  However, it's been called "interpreter" at least
> since introduced in 1997 (CPython:a027efa5b).
>

Each interpreter completely encapsulates all of the non-process-global,
non-thread-specific state needed for the Python runtime to work.
Notably, the interpreter's state persists between uses.  It includes
fundamental data like `sys.modules`.  The runtime ensures
multiple threads using the same interpreter will safely
share it between them.

A Python implementation may support using multiple interpreters at the
same time in the same process.  They are independent and isolated from
one another.  For example, each interpreter has its own
`sys.modules`.

For thread-specific runtime state, each interpreter has a set of thread
states, which it manages, in the same way the global runtime contains
a set of interpreters.  It can have thread states for as many host
threads as it needs.  It may even have multiple thread states for
the same host thread, though that isn't as common.

Each thread state, conceptually, has all the thread-specific runtime
data an interpreter needs to operate in one host thread.  The thread
state includes the current raised exception and the thread's Python
call stack.  It may include other thread-specific resources.

> **Note:** The term "Python thread" can sometimes refer to a thread state, but
> normally it means a thread created using the `threading` module.

Each thread state, over its lifetime, is always tied to exactly one
interpreter and exactly one host thread.  It will only ever be used in
that thread and with that interpreter.

Multiple thread states may be tied to the same host thread, whether for
different interpreters or even the same interpreter.  However, for any
given host thread, only one of the thread states tied to it can be used
by the thread at a time.

Thread states are isolated and independent from one another and don't
share any data, except for possibly sharing an interpreter and objects
or other resources belonging to that interpreter.

Once a program is running, new Python threads can be created using the
`threading` module (on platforms and Python implementations that
support threads).  Additional processes can be created using the
`os`, `subprocess`, and `multiprocessing` modules.
Interpreters can be created and used with the
`interpreters` module.  Coroutines (async) can
be run using `asyncio` in each interpreter, typically only
in a single thread (often the main thread).

**Footnotes**
