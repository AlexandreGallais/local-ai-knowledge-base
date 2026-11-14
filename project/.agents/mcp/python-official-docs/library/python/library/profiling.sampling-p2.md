---
title: "profiling.sampling --- Statistical profiler (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/profiling.sampling.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# profiling.sampling --- Statistical profiler (part 2 of 5)

## Sampling configuration

Before exploring the various output formats and visualization options, it is
important to understand how to configure the sampling process itself. The
profiler offers several options that control how frequently samples are
collected, how long profiling runs, which threads are observed, and what
additional context is captured in each sample.

The default configuration works well for most use cases:

- - Option
- Default
- - Default for `--sampling-rate` / `-r`
- 1 kHz
- - Default for `--duration` / `-d`
- Run to completion
- - Default for `--all-threads` / `-a`
- Main thread only
- - Default for `--native`
- No `<native>` frames (C code time attributed to caller)
- - Default for `--no-gc`
- `<GC>` frames included when garbage collection is active
- - Default for `--mode`
- Wall-clock mode (all samples recorded)
- - Default for `--realtime-stats`
- Disabled
- - Default for `--subprocesses`
- Disabled
- - Default for `--blocking`
- Disabled (non-blocking sampling)

### Sampling rate and duration

The two most fundamental parameters are the sampling rate and duration.
Together, these determine how many samples will be collected during a profiling
session.

The `--sampling-rate` option (`-r`) sets how frequently samples
are collected. The default is 1 kHz (1,000 samples per second):

```
python -m profiling.sampling run -r 20khz script.py
```

Higher rates capture more samples and provide finer-grained data at the
cost of slightly higher profiler CPU usage. Lower rates reduce profiler
overhead but may miss short-lived functions. For most applications, the
default rate provides a good balance between accuracy and overhead.

The `--duration` option (`-d`) sets how long to profile in seconds. By
default, profiling continues until the target process exits or is interrupted:

```
python -m profiling.sampling run -d 60 script.py
```

Specifying a duration is useful when attaching to long-running processes or when
you want to limit profiling to a specific time window. When profiling a script,
the default behavior of running to completion is usually what you want.

### Thread selection

Python programs often use multiple threads, whether explicitly through the
`threading` module or implicitly through libraries that manage thread
pools.

By default, the profiler samples only the main thread. The `--all-threads`
option (`-a`) enables sampling of all threads in the process:

```
python -m profiling.sampling run -a script.py
```

Multi-thread profiling reveals how work is distributed across threads and can
identify threads that are blocked or starved. Each thread's samples are
combined in the output, with the ability to filter by thread in some formats.
This option is particularly useful when investigating concurrency issues or
when work is distributed across a thread pool.

### Blocking mode

By default, Tachyon reads the target process's memory without stopping it.
This non-blocking approach is ideal for most profiling scenarios because it
imposes virtually zero overhead on the target application: the profiled
program runs at full speed and is unaware it is being observed.

However, non-blocking sampling can occasionally produce incomplete or
inconsistent stack traces in applications with many generators or coroutines
that rapidly switch between yield points, or in programs with very fast-changing
call stacks where functions enter and exit between the start and end of a single
stack read, resulting in reconstructed stacks that mix frames from different
execution states or that never actually existed.

For these cases, the `--blocking` option stops the target process during
each sample:

```
python -m profiling.sampling run --blocking script.py
python -m profiling.sampling attach --blocking 12345
```

When blocking mode is enabled, the profiler suspends the target process,
reads its stack, then resumes it. This guarantees that each captured stack
represents a real, consistent snapshot of what the process was doing at that
instant. The trade-off is that the target process runs slower because it is
repeatedly paused.

> **Warning:** Do not use very high sample rates (low `--interval` values) with blocking
> mode. Suspending and resuming a process takes time, and if the sampling
> interval is too short, the target will spend more time stopped than running.
> For blocking mode, intervals of 1000 microseconds (1 millisecond) or higher
> are recommended. The default 100 microsecond interval may cause noticeable
> slowdown in the target application.

Use blocking mode only when you observe inconsistent stacks in your profiles,
particularly with generator-heavy or coroutine-heavy code. For most
applications, the default non-blocking mode provides accurate results with
zero impact on the target process.

### Special frames

The profiler can inject artificial frames into the captured stacks to provide
additional context about what the interpreter is doing at the moment each
sample is taken. These synthetic frames help distinguish different types of
execution that would otherwise be invisible.

The `--native` option adds `<native>` frames to indicate when Python has
called into C code (extension modules, built-in functions, or the interpreter
itself):

```
python -m profiling.sampling run --native script.py
```

These frames help distinguish time spent in Python code versus time spent in
native libraries. Without this option, native code execution appears as time
in the Python function that made the call. This is useful when optimizing
code that makes heavy use of C extensions like NumPy or database drivers.

By default, the profiler includes `<GC>` frames when garbage collection is
active. The `--no-gc` option suppresses these frames:

```
python -m profiling.sampling run --no-gc script.py
```

GC frames help identify programs where garbage collection consumes significant
time, which may indicate memory allocation patterns worth optimizing. If you
see substantial time in `<GC>` frames, consider investigating object
allocation rates or using object pooling.

### Opcode-aware profiling

The `--opcodes` option enables instruction-level profiling that captures
which Python bytecode instructions are executing at each sample:

```
python -m profiling.sampling run --opcodes --flamegraph script.py
```

This feature provides visibility into Python's bytecode execution, including
adaptive specialization optimizations. When a generic instruction like
`LOAD_ATTR` is specialized at runtime into a more efficient variant like
`LOAD_ATTR_INSTANCE_VALUE`, the profiler shows both the specialized name
and the base instruction.

Opcode information appears in several output formats:

- **Flame graphs**: Hovering over a frame displays a tooltip with a bytecode
instruction breakdown, showing which opcodes consumed time in that function
- **Heatmap**: Expandable bytecode panels per source line show instruction
breakdown with specialization percentages
- **Live mode**: An opcode panel shows instruction-level statistics for the
selected function, accessible via keyboard navigation
- **Gecko format**: Opcode transitions are emitted as interval markers in the
Firefox Profiler timeline

This level of detail is particularly useful for:

- Understanding the performance impact of Python's adaptive specialization
- Identifying hot bytecode instructions that might benefit from optimization
- Analyzing the effectiveness of different code patterns at the instruction level
- Debugging performance issues that occur at the bytecode level

The `--opcodes` option is compatible with `--live`, `--flamegraph`,
`--heatmap`, and `--gecko` formats. It requires additional memory to store
opcode information and may slightly reduce sampling performance, but provides
unprecedented visibility into Python's execution model.

### Real-time statistics

The `--realtime-stats` option displays sampling rate statistics during
profiling:

```
python -m profiling.sampling run --realtime-stats script.py
```

This shows the actual achieved sampling rate, which may be lower than requested
if the profiler cannot keep up. The statistics help verify that profiling is
working correctly and that sufficient samples are being collected. See
sampling-efficiency for details on interpreting these metrics.

### Subprocess profiling

The `--subprocesses` option enables automatic profiling of subprocesses
spawned by the target:

```
python -m profiling.sampling run --subprocesses script.py
python -m profiling.sampling attach --subprocesses 12345
```

When enabled, the profiler monitors the target process for child process
creation. When a new Python child process is detected, a separate profiler
instance is automatically spawned to profile it. This is useful for
applications that use `multiprocessing`, `subprocess`,
`concurrent.futures` with `ProcessPoolExecutor`,
or other process spawning mechanisms.

```python
from concurrent.futures import ProcessPoolExecutor
import math

def compute_factorial(n):
    total = 0
    for i in range(50):
        total += math.factorial(n)
    return total

if __name__ == "__main__":
    numbers = [5000 + i * 100 for i in range(50)]
    with ProcessPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(compute_factorial, numbers))
    print(f"Computed {len(results)} factorials")
```

```
python -m profiling.sampling run --subprocesses --flamegraph worker_pool.py
```

This produces separate flame graphs for the main process and each worker
process: `flamegraph_<main_pid>.html`, `flamegraph_<worker1_pid>.html`,
and so on.

Each subprocess receives its own output file. The filename is derived from
the specified output path (or the default) with the subprocess's process ID
appended:

- If you specify `-o profile.html`, subprocesses produce `profile_12345.html`,
`profile_12346.html`, and so on
- With default output, subprocesses produce files like `flamegraph_12345.html`
or directories like `heatmap_12345`
- For pstats format (which defaults to stdout), subprocesses produce files like
`profile_12345.pstats`

The subprocess profilers inherit most sampling options from the parent (sampling
rate, duration, thread selection, native frames, GC frames, async-aware mode,
and output format). All Python descendant processes are profiled recursively,
including grandchildren and further descendants.

Subprocess detection works by periodically scanning for new descendants of
the target process and checking whether each new process is a Python process
by probing the process memory for Python runtime structures. Non-Python
subprocesses (such as shell commands or external tools) are ignored.

There is a limit of 100 concurrent subprocess profilers to prevent resource
exhaustion in programs that spawn many processes. If this limit is reached,
additional subprocesses are not profiled and a warning is printed.

The `--subprocesses` option is incompatible with `--live` mode
because live mode uses an interactive terminal interface that cannot
accommodate multiple concurrent profiler displays.

### Sampling efficiency

Sampling efficiency metrics help assess the quality of the collected data.
These metrics appear in the profiler's terminal output and in the flame graph
sidebar.

**Sampling efficiency** is the percentage of sample attempts that succeeded.
Each sample attempt reads the target process's call stack from memory. An
attempt can fail if the process is in an inconsistent state at the moment of
reading, such as during a context switch or while the interpreter is updating
its internal structures. A low efficiency may indicate that the profiler could
not keep up with the requested sampling rate, often due to system load or an
overly aggressive interval setting.

**Missed samples** is the percentage of expected samples that were not
collected. Based on the configured interval and duration, the profiler expects
to collect a certain number of samples. Some samples may be missed if the
profiler falls behind schedule, for example when the system is under heavy
load. A small percentage of missed samples is normal and does not significantly
affect the statistical accuracy of the profile.

Both metrics are informational. Even with some failed attempts or missed
samples, the profile remains statistically valid as long as enough samples
were collected. The profiler reports the actual number of samples captured,
which you can use to judge whether the data is sufficient for your analysis.
