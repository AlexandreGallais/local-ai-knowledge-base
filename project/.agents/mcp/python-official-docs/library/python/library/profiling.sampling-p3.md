---
title: "profiling.sampling --- Statistical profiler (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/profiling.sampling.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# profiling.sampling --- Statistical profiler (part 3 of 5)

## Profiling modes

The sampling profiler supports four modes that control which samples are
recorded. The mode determines what the profile measures: total elapsed time,
CPU execution time, time spent holding the global interpreter lock, or
exception handling.

### Wall-clock mode

Wall-clock mode (`--mode``=wall`) captures all samples regardless of what the
thread is doing. This is the default mode and provides a complete picture of
where time passes during program execution:

```
python -m profiling.sampling run --mode=wall script.py
```

In wall-clock mode, samples are recorded whether the thread is actively
executing Python code, waiting for I/O, blocked on a lock, or sleeping.
This makes wall-clock profiling ideal for understanding the overall time
distribution in your program, including time spent waiting.

If your program spends significant time in I/O operations, network calls, or
sleep, wall-clock mode will show these waits as time attributed to the calling
function. This is often exactly what you want when optimizing end-to-end
latency.

### CPU mode

CPU mode (`--mode``=cpu`) records samples only when the thread is actually
executing on a CPU core:

```
python -m profiling.sampling run --mode=cpu script.py
```

Samples taken while the thread is sleeping, blocked on I/O, or waiting for
a lock are discarded. The resulting profile shows where CPU cycles are consumed,
filtering out idle time.

CPU mode is useful when you want to focus on computational hotspots without
being distracted by I/O waits. If your program alternates between computation
and network calls, CPU mode reveals which computational sections are most
expensive.

### Comparing wall-clock and CPU profiles

Running both wall-clock and CPU mode profiles can reveal whether a function's
time is spent computing or waiting.

If a function appears prominently in both profiles, it is a true computational
hotspot---actively using the CPU. Optimization should focus on algorithmic
improvements or more efficient code.

If a function is high in wall-clock mode but low or absent in CPU mode, it is
I/O-bound or waiting. The function spends most of its time waiting for network,
disk, locks, or sleep. CPU optimization won't help here; consider async I/O,
connection pooling, or reducing wait time instead.

```python
import time

def do_sleep():
    time.sleep(2)

def do_compute():
    sum(i**2 for i in range(1000000))

if __name__ == "__main__":
    do_sleep()
    do_compute()
```

```
python -m profiling.sampling run --mode=wall script.py  # do_sleep ~98%, do_compute ~1%
python -m profiling.sampling run --mode=cpu script.py   # do_sleep absent, do_compute dominates
```

### GIL mode

GIL mode (`--mode``=gil`) records samples only when the thread holds Python's
global interpreter lock:

```
python -m profiling.sampling run --mode=gil script.py
```

The GIL is held only while executing Python bytecode. When Python calls into
C extensions, performs I/O operations, or executes native code, the GIL is
typically released. This means GIL mode effectively measures time spent
running Python code specifically, filtering out time in native libraries.

In multi-threaded programs, GIL mode reveals which code is preventing other
threads from running Python bytecode. Since only one thread can hold the GIL
at a time, functions that appear frequently in GIL mode profiles are
monopolizing the interpreter.

GIL mode helps answer questions like "which functions are monopolizing the
GIL?" and "why are my other threads starving?" It can also be useful in
single-threaded programs to distinguish Python execution time from time spent
in C extensions or I/O.

```python
import hashlib

def hash_work():
    # C extension - releases GIL during computation
    for _ in range(200):
        hashlib.sha256(b"data" * 250000).hexdigest()

def python_work():
    # Pure Python - holds GIL during computation
    for _ in range(3):
        sum(i**2 for i in range(1000000))

if __name__ == "__main__":
    hash_work()
    python_work()
```

```
python -m profiling.sampling run --mode=cpu script.py  # hash_work ~42%, python_work ~38%
python -m profiling.sampling run --mode=gil script.py  # hash_work ~5%, python_work ~60%
```

### Exception mode

Exception mode (`--mode=exception`) records samples only when a thread has
an active exception:

```
python -m profiling.sampling run --mode=exception script.py
```

Samples are recorded in two situations: when an exception is being propagated
up the call stack (after `raise` but before being caught), or when code is
executing inside an `except` block where exception information is still
present in the thread state.

The following example illustrates which code regions are captured:

```python
def example():
    try:
        raise ValueError("error")    # Captured: exception being raised
    except ValueError:
        process_error()              # Captured: inside except block
    finally:
        cleanup()                    # NOT captured: exception already handled

def example_propagating():
    try:
        try:
            raise ValueError("error")
        finally:
            cleanup()                # Captured: exception propagating through
    except ValueError:
        pass

def example_no_exception():
    try:
        do_work()
    finally:
        cleanup()                    # NOT captured: no exception involved
```

Note that `finally` blocks are only captured when an exception is actively
propagating through them. Once an `except` block finishes executing, Python
clears the exception information before running any subsequent `finally`
block. Similarly, `finally` blocks that run during normal execution (when no
exception was raised) are not captured because no exception state is present.

This mode is useful for understanding where your program spends time handling
errors. Exception handling can be a significant source of overhead in code
that uses exceptions for flow control (such as `StopIteration` in iterators)
or in applications that process many error conditions (such as network servers
handling connection failures).

Exception mode helps answer questions like "how much time is spent handling
exceptions?" and "which exception handlers are the most expensive?" It can
reveal hidden performance costs in code that catches and processes many
exceptions, even when those exceptions are handled gracefully. For example,
if a parsing library uses exceptions internally to signal format errors, this
mode will capture time spent in those handlers even if the calling code never
sees the exceptions.
