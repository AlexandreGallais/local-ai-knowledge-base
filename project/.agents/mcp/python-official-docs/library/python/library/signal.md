---
title: "signal --- Set handlers for asynchronous events (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/signal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `signal` --- Set handlers for asynchronous events

Module `signal`.

**Source code:** Lib/signal.py

This module provides mechanisms to use signal handlers in Python.

## General rules

The `signal.signal()` function allows defining custom handlers to be
executed when a signal is received.  A small number of default handlers are
installed: `SIGPIPE` is ignored (so write errors on pipes and sockets
can be reported as ordinary Python exceptions) and `SIGINT` is
translated into a `KeyboardInterrupt` exception if the parent process
has not changed it.

A handler for a particular signal, once set, remains installed until it is
explicitly reset (Python emulates the BSD style interface regardless of the
underlying implementation), with the exception of the handler for
`SIGCHLD`, which follows the underlying implementation.

On WebAssembly platforms, signals are emulated and therefore behave
differently. Several functions and signals are not available on these
platforms.

### Execution of Python signal handlers

A Python signal handler does not get executed inside the low-level (C) signal
handler.  Instead, the low-level signal handler sets a flag which tells the
virtual machine to execute the corresponding Python signal handler
at a later point (for example, at the next bytecode instruction).
This has consequences:

- It makes little sense to catch synchronous errors like `SIGFPE` or
`SIGSEGV` that are caused by an invalid operation in C code.  Python
will return from the signal handler to the C code, which is likely to raise
the same signal again, causing Python to apparently hang.  From Python 3.3
onwards, you can use the `faulthandler` module to report on synchronous
errors.

- A long-running calculation implemented purely in C (such as regular
expression matching on a large body of text) may run uninterrupted for an
arbitrary amount of time, regardless of any signals received.  The Python
signal handlers will be called when the calculation finishes.

- If the handler raises an exception, it will be raised "out of thin air" in
the main thread. See the note below for a
discussion.

### Signals and threads

Python signal handlers are always executed in the main Python thread of the main interpreter,
even if the signal was received in another thread.  This means that signals
can't be used as a means of inter-thread communication.  You can use
the synchronization primitives from the `threading` module instead.

Besides, only the main thread of the main interpreter is allowed to set a new signal handler.

> **Warning:** Synchronization primitives such as `threading.Lock` should not be used
> within signal handlers.  Doing so can lead to unexpected deadlocks.
