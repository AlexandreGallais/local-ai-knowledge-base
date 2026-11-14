---
title: "profiling.sampling --- Statistical profiler (part 1 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/profiling.sampling.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `profiling.sampling` --- Statistical profiler

Module `profiling.sampling`.

> *Added in version 3.15.*

**Source code:** Lib/profiling/sampling/

profiling.sampling

The `profiling.sampling` module, named **Tachyon**, provides statistical
profiling of Python programs through periodic stack sampling. Tachyon can
run scripts directly or attach to any running Python process without requiring
code changes or restarts. Because sampling occurs externally to the target
process, overhead is virtually zero, making Tachyon suitable for both
development and production environments.

## What is statistical profiling?

Statistical profiling builds a picture of program behavior by periodically
capturing snapshots of the call stack. Rather than instrumenting every function
call and return as deterministic profilers do, Tachyon reads the call stack at
regular intervals to record what code is currently running.

This approach rests on a simple principle: functions that consume significant
CPU time will appear frequently in the collected samples. By gathering thousands
of samples over a profiling session, Tachyon constructs an accurate statistical
estimate of where time is spent. The more samples collected, the
more precise this estimate becomes.

html

The following interactive visualization demonstrates how sampling profiling
works. Press **Play** to watch a Python program execute, and observe how the
profiler periodically captures snapshots of the call stack. Adjust the
**sample interval** to see how sampling frequency affects the results.

not html

> **Note:** An interactive visualization of sampling profiling is available in the
> HTML version of this documentation.

### How time is estimated

The time values shown in Tachyon's output are **estimates derived from sample
counts**, not direct measurements. Tachyon counts how many times each function
appears in the collected samples, then multiplies by the sampling interval to
estimate time.

For example, with a 10 kHz sampling rate over a 10-second profile,
Tachyon collects approximately 100,000 samples. If a function appears in 5,000
samples (5% of total), Tachyon estimates it consumed 5% of the 10-second
duration, or about 500 milliseconds. This is a statistical estimate, not a
precise measurement.

The accuracy of these estimates depends on sample count. With 100,000 samples,
a function showing 5% has a margin of error of roughly ±0.5%. With only 1,000
samples, the same 5% measurement could actually represent anywhere from 3% to
7% of real time.

This is why longer profiling durations and shorter sampling intervals produce
more reliable results---they collect more samples. For most performance
analysis, the default settings provide sufficient accuracy to identify
bottlenecks and guide optimization efforts.

Because sampling is statistical, results will vary slightly between runs. A
function showing 12% in one run might show 11% or 13% in the next. This is
normal and expected. Focus on the overall pattern rather than exact percentages,
and don't worry about small variations between runs.

### When to use a different approach

Statistical sampling is not ideal for every situation.

For very short scripts that complete in under one second, the profiler may not
collect enough samples for reliable results. Use `profiling.tracing`
instead, or run the script in a loop to extend profiling time.

When you need exact call counts, sampling cannot provide them. Sampling
estimates frequency from snapshots, so if you need to know precisely how many
times a function was called, use `profiling.tracing`.

When comparing two implementations where the difference might be only 1-2%,
sampling noise can obscure real differences. Use `timeit` for
micro-benchmarks or `profiling.tracing` for precise measurements.

The key <example-value> from `profiling.tracing` is how measurement happens.
A tracing profiler instruments your code, recording every function call and
return. This provides exact call counts and precise timing but adds overhead
to every function call. A sampling profiler, by contrast, observes the program
from outside at fixed intervals without modifying its execution. Think of the
difference like this: tracing is like having someone follow you and write down
every step you take, while sampling is like taking photographs every second
and inferring your path from those snapshots.

This external observation model is what makes sampling profiling practical for
production use. The profiled program runs at full speed because there is no
instrumentation code running inside it, and the target process is never stopped
or paused during sampling---Tachyon reads the call stack directly from the
process's memory while it continues to run. You can attach to a live server,
collect data, and detach without the application ever knowing it was observed.
The trade-off is that very short-lived functions may be missed if they happen
to complete between samples.

Statistical profiling excels at answering the question, "Where is my program
spending time?" It reveals hotspots and bottlenecks in production code where
deterministic profiling overhead would be unacceptable. For exact call counts
and complete call graphs, use `profiling.tracing` instead.

## Quick examples

Profile a script and see the results immediately:

```
python -m profiling.sampling run script.py
```

Profile a module with arguments:

```
python -m profiling.sampling run -m mypackage.module arg1 arg2
```

Generate an interactive flame graph:

```
python -m profiling.sampling run --flamegraph -o profile.html script.py
```

Attach to a running process by PID:

```
python -m profiling.sampling attach 12345
```

Print a single snapshot of a running process's stack:

```
python -m profiling.sampling dump 12345
```

Use live mode for real-time monitoring (press `q` to quit):

```
python -m profiling.sampling run --live script.py
```

Profile for 60 seconds with a faster sampling rate:

```
python -m profiling.sampling run -d 60 -r 20khz script.py
```

Generate a line-by-line heatmap:

```
python -m profiling.sampling run --heatmap script.py
```

Enable opcode-level profiling to see which bytecode instructions are executing:

```
python -m profiling.sampling run --opcodes --flamegraph script.py
```

## Commands

Tachyon operates through several subcommands. `run` and `attach` collect
samples over time; `dump` captures a single snapshot; `replay` converts
binary profiles to other formats.

### The `run` command

The `run` command launches a Python script or module and profiles it from
startup:

```
python -m profiling.sampling run script.py
python -m profiling.sampling run -m mypackage.module
```

When profiling a script, the profiler starts the target in a subprocess, waits
for it to initialize, then begins collecting samples. The `-m` flag
indicates that the target should be run as a module (equivalent to
`python -m`). Arguments after the target are passed through to the
profiled program:

```
python -m profiling.sampling run script.py --config settings.yaml
```

### The `attach` command

The `attach` command connects to an already-running Python process by its
process ID:

```
python -m profiling.sampling attach 12345
```

This command is particularly valuable for investigating performance issues in
production systems. The target process requires no modification and need not
be restarted. The profiler attaches, collects samples for the specified
duration, then detaches and produces output.

```
python -m profiling.sampling attach --live 12345
python -m profiling.sampling attach --flamegraph -d 30 -o profile.html 12345
```

On most systems, attaching to another process requires appropriate permissions.
See profiling-permissions for platform-specific requirements.

### The `dump` command

The `dump` command prints a single snapshot of a running process's Python
stack and exits, similar to a traceback:

```
python -m profiling.sampling dump 12345
```

Unlike `attach`, `dump` does not run a sampling loop: it reads the
stack once. This is useful for investigating hung or unresponsive
processes, or for answering "what is this process doing right now?".

The output mirrors a traceback (most recent call last) and annotates each
thread with its current state (main thread, has GIL, on CPU, waiting for
GIL, has exception, or idle):

```text
Stack dump for PID 12345, thread 140735 (main thread, has GIL, on CPU; most recent call last):
  File "server.py", line 28, in serve
    await handle_request(req)
  File "handler.py", line 91, in handle_request
    result = expensive_call(req)
```

When the target's source files are readable, `dump` prints the source
line for each frame and highlights the executing expression.

Like `attach`, `dump` requires permission to read the target process's
memory. See profiling-permissions.

The `dump` command supports the following options:

`-a`, `--all-threads`
Dump every thread in the target process. Without this flag only the main
thread is shown.

`--native`
Include synthetic `<native>` frames marking transitions into C
extensions or other non-Python code.

`--no-gc`
Hide the synthetic `<GC>` frames that mark active garbage collection.

`--opcodes`
Annotate each frame with the bytecode opcode the thread is currently
executing (for example, `opcode=CALL_KW`). Useful for
instruction-level investigation, including identifying specializations
chosen by the adaptive interpreter.

`--async-aware`
Reconstruct stacks across `await` boundaries. `dump` walks the task
graph and emits one section per task, with `<task>` markers separating
coroutines awaiting each other.

`--async-mode {running,all}`
Controls which tasks are included when `--async-aware` is enabled.
`running` shows only the task currently executing on each thread;
`all` (the default for `dump`) also includes tasks suspended on a
wait. `attach`'s default for this flag is `running`; `dump`
defaults to `all` because a single snapshot is most useful when it
shows the full task graph.

`--blocking`
Pause every thread in the target while reading its stack and resume
them after. Guarantees a fully consistent snapshot at the cost of
briefly stopping the target. Without it, `dump` reads memory while
the target keeps running, which is faster but can occasionally produce
a torn stack.

### The `replay` command

The `replay` command converts binary profile files to other output formats:

```
python -m profiling.sampling replay profile.bin
python -m profiling.sampling replay --flamegraph -o profile.html profile.bin
```

This command is useful when you have captured profiling data in binary format
and want to analyze it later or convert it to a visualization format. Binary
profiles can be replayed multiple times to different formats without
re-profiling.

```
# Convert binary to pstats (default, prints to stdout)
python -m profiling.sampling replay profile.bin

# Convert binary to flame graph
python -m profiling.sampling replay --flamegraph -o output.html profile.bin

# Convert binary to gecko format for Firefox Profiler
python -m profiling.sampling replay --gecko -o profile.json profile.bin

# Convert binary to heatmap
python -m profiling.sampling replay --heatmap -o my_heatmap profile.bin
```

### Profiling in production

The sampling profiler is designed for production use. It imposes no measurable
overhead on the target process because it reads memory externally rather than
instrumenting code. The target application continues running at full speed and
is unaware it is being profiled.

When profiling production systems, keep these guidelines in mind:

Start with shorter durations (10-30 seconds) to get quick results, then extend
if you need more statistical accuracy. By default, profiling runs until the
target process completes, which is usually sufficient to identify major hotspots.

If possible, profile during representative load rather than peak traffic.
Profiles collected during normal operation are easier to interpret than those
collected during unusual spikes.

The profiler itself consumes some CPU on the machine where it runs (not on the
target process). On the same machine, this is typically negligible. When
profiling remote processes, network latency does not affect the target.

Results from production may differ from development due to different data
sizes, concurrent load, or caching effects. This is expected and is often
exactly what you want to capture.

### Platform requirements

The profiler reads the target process's memory to capture stack traces. This
requires elevated permissions on most operating systems.

**Linux**

On Linux, the profiler uses `ptrace` or `process_vm_readv` to read the
target process's memory. This typically requires one of:

- Running as root
- Having the `CAP_SYS_PTRACE` capability
- Adjusting the Yama ptrace scope: `/proc/sys/kernel/yama/ptrace_scope`

The default ptrace_scope of 1 restricts ptrace to parent processes only. To
allow attaching to any process owned by the same user, set it to 0:

```
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
```

**macOS**

On macOS, the profiler uses `task_for_pid()` to access the target process.
This requires one of:

- Running as root
- The profiler binary having the `com.apple.security.cs.debugger` entitlement
- System Integrity Protection (SIP) being disabled (not recommended)

**Windows**

On Windows, the profiler requires administrative privileges or the
`SeDebugPrivilege` privilege to read another process's memory.

### Version compatibility

The profiler and target process must run the same Python minor version (for
example, both Python 3.15). Attaching from Python 3.14 to a Python 3.15 process
is not supported.

Additional restrictions apply to pre-release Python versions: if either the
profiler or target is running a pre-release (alpha, beta, or release candidate),
both must run the exact same version.

On free-threaded Python builds, the profiler cannot attach from a free-threaded
build to a standard build, or vice versa.
