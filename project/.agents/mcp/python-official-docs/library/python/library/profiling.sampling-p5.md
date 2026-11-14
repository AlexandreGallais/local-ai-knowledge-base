---
title: "profiling.sampling --- Statistical profiler (part 5 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/profiling.sampling.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# profiling.sampling --- Statistical profiler (part 5 of 5)

## Live mode

Live mode (`--live`) provides a terminal-based real-time view of profiling
data, similar to the `top` command for system processes:

```
python -m profiling.sampling run --live script.py
python -m profiling.sampling attach --live 12345
```

not latex

Live mode displays real-time profiling statistics, showing combined
data from multiple threads in a multi-threaded application.

The display updates continuously as new samples arrive, showing the current
hottest functions. This mode requires the `curses` module, which is
available on Unix-like systems but not on Windows. The terminal must be at
least 60 columns wide and 12 lines tall; larger terminals display more columns.

The header displays the top 3 hottest functions, sampling efficiency metrics,
and thread status statistics (GIL held percentage, CPU usage, GC time). The
main table shows function statistics with the currently sorted column indicated
by an arrow (▼).

When `--opcodes` is enabled, an additional opcode panel appears below the
main table, showing instruction-level statistics for the currently selected
function. This panel displays which bytecode instructions are executing most
frequently, including specialized variants and their base opcodes.

not latex

Live mode with `--opcodes` enabled shows an opcode panel with a bytecode
instruction breakdown for the selected function.

### Keyboard commands

Within live mode, keyboard commands control the display:

`q`
Quit the profiler and return to the shell.

`s` / `S`
Cycle through sort orders forward/backward (sample count, percentage,
total time, cumulative percentage, cumulative time).

`p`
Pause or resume display updates. Sampling continues in the background
while the display is paused, so you can freeze the view to examine results
without stopping data collection.

`r`
Reset all statistics and start fresh. This is disabled after profiling
finishes to prevent accidental data loss.

`/`
Enter filter mode to search for functions by name. The filter uses
case-insensitive substring matching against the filename and function name.
Type a pattern and press Enter to apply, or Escape to cancel. Glob patterns
and regular expressions are not supported.

`c`
Clear the current filter and show all functions again.

`t`
Toggle between viewing all threads combined or per-thread statistics.
In per-thread mode, a thread counter (for example, `1/4`) appears showing
your position among the available threads.

`←` `→` or `↑` `↓`
In per-thread view, navigate between threads. Navigation wraps around
from the last thread to the first and vice versa.

`+` / `-`
Increase or decrease the display refresh rate. The range is 0.05 seconds
(20 Hz, very responsive) to 1.0 second (1 Hz, lower overhead). Faster refresh
rates use more CPU. The default is 0.1 seconds (10 Hz).

`x`
Toggle trend indicators that show whether functions are becoming hotter
or cooler over time. When enabled, increasing metrics appear in green and
decreasing metrics appear in red, comparing each update to the previous one.

`h` or `?`
Show the help screen with all available commands.

`j` / `k` (or `Up` / `Down`)
Navigate through opcode entries in the opcode panel (when `--opcodes` is
enabled). These keys scroll through the instruction-level statistics for the
currently selected function.

When profiling finishes (duration expires or target process exits), the display
shows a "PROFILING COMPLETE" banner and freezes the final results. You can
still navigate, sort, and filter the results before pressing `q` to exit.

Live mode is incompatible with output format options (`--collapsed`,
`--flamegraph`, and so on) because it uses an interactive terminal
interface rather than producing file output.

## Async-aware profiling

For programs using `asyncio`, the profiler offers async-aware mode
(`--async-aware`) that reconstructs call stacks based on the task structure
rather than the raw Python frames:

```
python -m profiling.sampling run --async-aware async_script.py
```

Standard profiling of async code can be confusing because the physical call
stack often shows event loop internals rather than the logical flow of your
coroutines. Async-aware mode addresses this by tracking which task is running
and presenting stacks that reflect the `await` chain.

```python
import asyncio

async def fetch(url):
    await asyncio.sleep(0.1)
    return url

async def main():
    for _ in range(50):
        await asyncio.gather(fetch("a"), fetch("b"), fetch("c"))

if __name__ == "__main__":
    asyncio.run(main())
```

```
python -m profiling.sampling run --async-aware --flamegraph -o out.html script.py
```

> **Note:** Async-aware profiling requires the target process to have the `asyncio`
> module loaded. If you profile a script before it imports asyncio, async-aware
> mode will not be able to capture task information.

### Async modes

The `--async-mode` option controls which tasks appear in the profile:

```
python -m profiling.sampling run --async-aware --async-mode=running async_script.py
python -m profiling.sampling run --async-aware --async-mode=all async_script.py
```

With `--async-mode``=running` (the default), only the task currently executing
on the CPU is profiled. This shows where your program is actively spending time
and is the typical choice for performance analysis.

With `--async-mode``=all`, tasks that are suspended (awaiting I/O, locks, or
other tasks) are also included. This mode is useful for understanding what your
program is waiting on, but produces larger profiles since every suspended task
appears in each sample.

### Task markers and stack reconstruction

In async-aware profiles, you will see `<task>` frames that mark boundaries
between asyncio tasks. These are synthetic frames inserted by the profiler to
show the task structure. The task name appears as the function name in these
frames.

When a task awaits another task, the profiler reconstructs the logical call
chain by following the `await` relationships. Only "leaf" tasks (tasks that
no other task is currently awaiting) generate their own stack entries. Tasks
being awaited by other tasks appear as part of their awaiter's stack instead.

If a task has multiple awaiters (a diamond pattern in the task graph), the
profiler deterministically selects one parent and annotates the task marker
with the number of parents, for example `MyTask (2 parents)`. This indicates
that alternate execution paths exist but are not shown in this particular stack.

### Option restrictions

Async-aware mode uses a different stack reconstruction mechanism and is
incompatible with: `--native`, `--no-gc`, `--all-threads`, and
`--mode``=cpu` or `--mode``=gil`.

## Command-line interface

profiling.sampling

The complete command-line interface for reference.

### option `run`

Run and profile a Python script or module.

### option `attach`

Attach to and profile a running process by PID.

### option `dump`

Print a single one-shot snapshot of a running process's Python stack.

### option `replay`

Convert a binary profile file to another output format.

### Dump options

The following options apply to the `dump` subcommand:

### option `-a, --all-threads`

Dump all threads in the target process instead of just the main thread.

### option `--native`

Include `<native>` frames for non-Python code.

### option `--no-gc`

Exclude `<GC>` frames for active garbage collection.

### option `--opcodes`

Show bytecode opcode names when available.

### option `--async-aware`

Reconstruct the stack across `await` boundaries for asyncio
applications.

### option `--async-mode <mode>`

Async stack mode: `running` (only the running task) or `all`
(all tasks including waiting). Defaults to `all` for `dump`.
Requires `--async-aware`.

### option `--blocking`

Pause all threads in the target process while reading the stack.

### option `-r <rate>, --sampling-rate <rate>`

Sampling rate (for example, `10000`, `10khz`, `10k`). Default: `1khz`.

### option `-d <seconds>, --duration <seconds>`

Profiling duration in seconds. Default: run to completion.

### option `-a, --all-threads`

Sample all threads, not just the main thread.

### option `--realtime-stats`

Display sampling statistics during profiling.

### option `--native`

Include `<native>` frames for non-Python code.

### option `--no-gc`

Exclude `<GC>` frames for garbage collection.

### option `--async-aware`

Enable async-aware profiling for asyncio programs.

### option `--opcodes`

Gather bytecode opcode information for instruction-level profiling. Shows
which bytecode instructions are executing, including specializations.
Compatible with `--live`, `--flamegraph`, `--heatmap`, and `--gecko`
formats only.

### option `--subprocesses`

Also profile subprocesses. Each subprocess gets its own profiler
instance and output file. Incompatible with `--live`.

### option `--blocking`

Pause the target process during each sample. This ensures consistent
stack traces at the cost of slowing down the target. Use with longer
intervals (1000 µs or higher) to minimize impact. See blocking-mode
for details.

### option `--mode <mode>`

Sampling mode: `wall` (default), `cpu`, `gil`, or `exception`.
The `cpu`, `gil`, and `exception` modes are incompatible with
`--async-aware`.

### option `--async-mode <mode>`

Async profiling mode: `running` (default) or `all`.
Requires `--async-aware`.

### option `--pstats`

Generate pstats statistics. This is the default.
When written to stdout, the output is a text table; with `-o`,
it is a binary pstats file.

### option `--collapsed`

Generate collapsed stack format for external flame graph tools.

### option `--flamegraph`

Generate self-contained HTML flame graph.

### option `--diff-flamegraph <baseline.bin>`

Generate differential flamegraph comparing to a baseline binary profile.

### option `--gecko`

Generate Gecko JSON format for Firefox Profiler.

### option `--heatmap`

Generate HTML heatmap with line-level sample counts.

### option `--binary`

Generate high-performance binary format for later conversion with the
`replay` command.

### option `--compression <type>`

Compression for binary format: `auto` (use zstd if available, default),
`zstd`, or `none`.

### option `-o , --output `

Output file or directory path. Default behavior varies by format:
`--pstats` prints a text table to stdout, while `-o` writes a
binary pstats file. Other formats generate a file named
`<format>_<PID>.<ext>` (for example, `flamegraph_12345.html`).
`--heatmap` creates a directory named `heatmap_<PID>`.

### option `--browser`

Automatically open HTML output (`--flamegraph` and
`--heatmap`) in your default web browser after generation.
When profiling with `--subprocesses`, only the main process
opens the browser; subprocess outputs are never auto-opened.

### pstats display options

These options apply only to pstats format output.

### option `--sort <key>`

Sort order: `nsamples`, `tottime`, `cumtime`, `sample-pct`,
`cumul-pct`, `nsamples-cumul`, or `name`. Default: `nsamples`.

### option `-l <count>, --limit <count>`

Maximum number of entries to display. Default: 15.

### option `--no-summary`

Omit the Legend and Summary of Interesting Functions sections from output.

### option `-m, --module`

Treat the target as a module name rather than a script path.

### option `--live`

Start interactive terminal interface instead of batch profiling.

> **See also:** `profiling`
> Overview of Python profiling tools and guidance on choosing a profiler.
>
> `profiling.tracing`
> Deterministic tracing profiler for exact call counts and timing.
>
> `pstats`
> Statistics analysis for profile data.
>
> Firefox Profiler
> Web-based profiler that accepts Gecko format output. See the
> documentation for usage details.
>
> FlameGraph
> Tools for generating flame graphs from collapsed stack format.
