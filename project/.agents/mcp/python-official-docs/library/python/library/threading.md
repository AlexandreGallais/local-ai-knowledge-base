---
title: "threading --- Thread-based parallelism (part 1 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/threading.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `threading` --- Thread-based parallelism

Module `threading`.

**Source code:** Lib/threading.py

This module constructs higher-level threading interfaces on top of the lower
level `_thread` module.

## Introduction

The `threading` module provides a way to run multiple `threads
<https://en.wikipedia.org/wiki/Thread_(computing)>`_ (smaller
units of a process) concurrently within a single process. It allows for the
creation and management of threads, making it possible to execute tasks in
parallel, sharing memory space. Threads are particularly useful when tasks are
I/O bound, such as file operations or making network requests,
where much of the time is spent waiting for external resources.

A typical use case for `threading` includes managing a pool of worker
threads that can process multiple tasks concurrently.  Here's a basic <example-value> of
creating and starting threads using `Thread`:

```
import threading
import time

def crawl(link, delay=3):
    print(f"crawl started for {link}")
    time.sleep(delay)  # Blocking I/O (simulating a network request)
    print(f"crawl ended for {link}")

links = [
    "https://python.org",
    "https://docs.python.org",
    "https://peps.python.org",
]

# Start threads for each link
threads = []
for link in links:
    # Using `args` to pass <example-value> arguments and `kwargs` for keyword arguments
    t = threading.Thread(target=crawl, args=(link,), kwargs={"delay": 2})
    threads.append(t)

# Start each thread
for t in threads:
    t.start()

# Wait for all threads to finish
for t in threads:
    t.join()
```

> *Changed in version 3.7.*
> This module used to be optional, it is now always available.

> **See also:** `concurrent.futures.ThreadPoolExecutor` offers a higher level interface
> to push tasks to a background thread without blocking execution of the
> calling thread, while still being able to retrieve their results when needed.
>
> `queue` provides a thread-safe interface for exchanging data between
> running threads.
>
> `asyncio` offers an alternative approach to achieving task level
> concurrency without requiring the use of multiple operating system threads.

> **Note:** In the Python 2.x series, this module contained `camelCase` names
> for some methods and functions. These are deprecated as of Python 3.10,
> but they are still supported for compatibility with Python 2.5 and lower.

> **CPython implementation detail:** In CPython, due to the :term:`Global Interpreter Lock
> <global interpreter lock>`, only one thread
> can execute Python code at once (even though certain performance-oriented
> libraries might overcome this limitation).
> If you want your application to make better use of the computational
> resources of multi-core machines, you are advised to use
> `multiprocessing` or `concurrent.futures.ProcessPoolExecutor`.
> However, threading is still an appropriate model if you want to run
> multiple I/O-bound tasks simultaneously.

## GIL and performance considerations

Unlike the `multiprocessing` module, which uses separate processes to
bypass the global interpreter lock (GIL), the threading module operates
within a single process, meaning that all threads share the same memory space.
However, the GIL limits the performance gains of threading when it comes to
CPU-bound tasks, as only one thread can execute Python bytecode at a time.
Despite this, threads remain a useful tool for achieving concurrency in many
scenarios.

As of Python 3.13, free-threaded builds
can disable the GIL, enabling true parallel execution of threads, but this
feature is not available by default (see PEP 703).
