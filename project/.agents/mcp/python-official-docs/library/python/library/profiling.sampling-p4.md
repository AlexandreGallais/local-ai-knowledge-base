---
title: "profiling.sampling --- Statistical profiler (part 4 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/profiling.sampling.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# profiling.sampling --- Statistical profiler (part 4 of 5)

## Output formats

The profiler produces output in several formats, each suited to different
analysis workflows. The format is selected with a command-line flag, and
output goes to stdout, a file, or a directory depending on the format.

### pstats format

The pstats format (`--pstats`) produces a text table similar to what
deterministic profilers generate. This is the default output format:

```
python -m profiling.sampling run script.py
python -m profiling.sampling run --pstats script.py
```

Output appears on stdout by default:

```
Profile Stats (Mode: wall):
     nsamples  sample%    tottime (ms)  cumul%   cumtime (ms)  filename:lineno(function)
       234/892    11.7%       234.00     44.6%       892.00    server.py:145(handle_request)
       156/156     7.8%       156.00      7.8%       156.00    <built-in>:0(socket.recv)
        98/421     4.9%        98.00     21.1%       421.00    parser.py:67(parse_message)
```

The columns show sampling counts and estimated times:

- **nsamples**: Displayed as `direct/cumulative` (for example, `10/50`).
Direct samples are when the function was at the top of the stack, actively
executing. Cumulative samples are when the function appeared anywhere on the
stack, including when it was waiting for functions it called. If a function
shows `10/50`, it was directly executing in 10 samples and was on the call
stack in 50 samples total.

- **sample%** and **cumul%**: Percentages of total samples for direct and
cumulative counts respectively.

- **tottime** and **cumtime**: Estimated wall-clock time based on sample counts
and the profiling duration. Time units are selected automatically based on
the magnitude: seconds for large values, milliseconds for moderate values,
or microseconds for small values.

The output includes a legend explaining each column and a summary of
interesting functions that highlights:

- **Hot spots**: Functions with high direct/cumulative sample ratio (ratio
close to 1.0). These functions spend most of their time executing their own
code rather than waiting for callees. High ratios indicate where CPU time
is actually consumed.

- **Indirect calls**: Functions with large differences between cumulative and
direct samples. These are orchestration functions that delegate work to
other functions. They appear frequently on the stack but rarely at the top.

- **Call magnification**: Functions where cumulative samples far exceed direct
samples (high cumulative/direct multiplier). These are frequently-nested
functions that appear deep in many call chains.

Use `--no-summary` to suppress both the legend and summary sections.

To save pstats output to a binary file instead of stdout:

```
python -m profiling.sampling run -o profile.pstats script.py
```

The pstats format supports several options for controlling the display.
The `--sort` option determines the column used for ordering results:

```
python -m profiling.sampling run --sort=tottime script.py
python -m profiling.sampling run --sort=cumtime script.py
python -m profiling.sampling run --sort=nsamples script.py
```

The `--limit` option restricts output to the top N entries:

```
python -m profiling.sampling run --limit=30 script.py
```

The `--no-summary` option suppresses the header summary that precedes the
statistics table.

### Collapsed stacks format

Collapsed stacks format (`--collapsed`) produces one line per unique call
stack, with a count of how many times that stack was sampled:

```
python -m profiling.sampling run --collapsed script.py
```

The output looks like:

```text
main;process_data;parse_json;decode_utf8 42
main;process_data;parse_json 156
main;handle_request;send_response 89
```

Each line contains semicolon-separated function names representing the call
stack from bottom to top, followed by a space and the sample count. This
format is designed for compatibility with external flame graph tools,
particularly Brendan Gregg's `flamegraph.pl` script.

To generate a flame graph from collapsed stacks:

```
python -m profiling.sampling run --collapsed script.py > stacks.txt
flamegraph.pl stacks.txt > profile.svg
```

The resulting SVG can be viewed in any web browser and provides an interactive
visualization where you can click to zoom into specific call paths.

### Flame graph format

Flame graph format (`--flamegraph`) produces a self-contained HTML file with
an interactive flame graph visualization:

```
python -m profiling.sampling run --flamegraph script.py
python -m profiling.sampling run --flamegraph -o profile.html script.py
```

html

Try the interactive example!

If no output file is specified, the profiler generates a filename based on
the process ID (for example, `flamegraph.12345.html`).

The generated HTML file requires no external dependencies and can be opened
directly in a web browser. The visualization displays call stacks as nested
rectangles, with width proportional to time spent. Hovering over a rectangle
shows details about that function including source code context, and clicking
zooms into that portion of the call tree.

The flame graph interface includes:

- A sidebar showing profile summary, thread statistics, sampling efficiency
metrics (see sampling-efficiency), and top hotspot functions
- Search functionality supporting both function name matching and
`file.py:42` line patterns
- Per-thread filtering via dropdown
- Dark/light theme toggle (preference saved across sessions)
- SVG export for saving the current view

The thread statistics section shows runtime behavior metrics:

- **GIL Held**: percentage of samples where a thread held the global interpreter
lock (actively running Python code)
- **GIL Released**: percentage of samples where no thread held the GIL
- **Waiting GIL**: percentage of samples where a thread was waiting to acquire
the GIL
- **GC**: percentage of samples during garbage collection

These statistics help identify GIL contention and understand how time is
distributed between Python execution, native code, and waiting.

Flame graphs are particularly effective for identifying deep call stacks and
understanding the hierarchical structure of time consumption. Wide rectangles
at the top indicate functions that consume significant time either directly
or through their callees.

#### Differential flame graphs

Differential flame graphs compare two profiling runs to highlight where
performance changed. This helps identify regressions introduced by code changes
and validate that optimizations achieved their intended effect:

```
# Capture baseline profile
python -m profiling.sampling run --binary -o baseline.bin script.py

# After modifying code, generate differential flamegraph
python -m profiling.sampling run --diff-flamegraph baseline.bin -o diff.html script.py
```

The visualization draws the current profile with frame widths showing current
time consumption, then applies color to indicate how each function changed
relative to the baseline.

**Color coding**:

- **Red**: Functions consuming more time (regressions). Lighter shades indicate
modest increases, while darker shades show severe regressions.

- **Blue**: Functions consuming less time (improvements). Lighter shades for
modest reductions, darker shades for significant speedups.

- **Gray**: Minimal or no change.

- **Purple**: New functions not present in the baseline.

Frame colors indicate changes in **direct time** (time when the function was at
the top of the stack, actively executing), not cumulative time including callees.
Hovering over a frame shows comparison details including baseline time, current
time, and the percentage change.

Some call paths may disappear entirely between profiles. These are called
**elided stacks** and occur when optimizations eliminate code paths or certain
branches stop executing. If elided stacks are present, an elided toggle appears
allowing you to switch between the main differential view and an elided-only
view that shows just the removed paths (colored purple).

### Gecko format

Gecko format (`--gecko`) produces JSON output compatible with the Firefox
Profiler:

```
python -m profiling.sampling run --gecko script.py
python -m profiling.sampling run --gecko -o profile.json script.py
```

The Firefox Profiler is a sophisticated
web-based tool originally built for profiling Firefox itself. It provides
features beyond basic flame graphs, including a timeline view, call tree
exploration, and marker visualization. See the
Firefox Profiler documentation for
detailed usage instructions.

To use the output, open the Firefox Profiler in your browser and load the
JSON file. The profiler runs entirely client-side, so your profiling data
never leaves your machine.

Gecko format automatically collects additional metadata about GIL state and
CPU activity, enabling analysis features specific to Python's threading model.
The profiler emits interval markers that appear as colored bands in the
Firefox Profiler timeline:

- **GIL markers**: show when threads hold or release the global interpreter lock
- **CPU markers**: show when threads are executing on CPU versus idle
- **Code type markers**: distinguish Python code from native (C extension) code
- **GC markers**: indicate garbage collection activity

For this reason, the `--mode` option is not available with Gecko format;
all relevant data is captured automatically.

### Heatmap format

Heatmap format (`--heatmap`) generates an interactive HTML visualization
showing sample counts at the source line level:

```
python -m profiling.sampling run --heatmap script.py
python -m profiling.sampling run --heatmap -o my_heatmap script.py
```

Unlike other formats that produce a single file, heatmap output creates a
directory containing HTML files for each profiled source file. If no output
path is specified, the directory is named `heatmap_PID`.

The heatmap visualization displays your source code with a color gradient
indicating how many samples were collected at each line. Hot lines (many
samples) appear in warm colors, while cold lines (few or no samples) appear
in cool colors. This view helps pinpoint exactly which lines of code are
responsible for time consumption.

The heatmap interface provides several interactive features:

- **Coloring modes**: toggle between "Self Time" (direct execution) and
"Total Time" (cumulative, including time in called functions)
- **Cold code filtering**: show all lines or only lines with samples
- **Call graph navigation**: each line shows navigation buttons (▲ for callers,
▼ for callees) that let you trace execution paths through your code. When
multiple functions called or were called from a line, a menu appears showing
all options with their sample counts.
- **Scroll minimap**: a vertical overview showing the heat distribution across
the entire file
- **Hierarchical index**: files organized by type (stdlib, site-packages,
project) with aggregate sample counts per folder
- **Dark/light theme**: toggle with preference saved across sessions
- **Line linking**: click line numbers to create shareable URLs

When opcode-level profiling is enabled with `--opcodes`, each hot line
can be expanded to show which bytecode instructions consumed time:

html

Try the interactive example!

Heatmaps are especially useful when you know which file contains a performance
issue but need to identify the specific lines. Many developers prefer this
format because it maps directly to their source code, making it easy to read
and navigate. For smaller scripts and focused analysis, heatmaps provide an
intuitive view that shows exactly where time is spent without requiring
interpretation of hierarchical visualizations.

### Binary format

Binary format (`--binary`) produces a compact binary file for efficient
storage of profiling data:

```
python -m profiling.sampling run --binary -o profile.bin script.py
python -m profiling.sampling attach --binary -o profile.bin 12345
```

The `--compression` option controls data compression:

- `auto` (default): Use zstd compression if available, otherwise no
compression
- `zstd`: Force zstd compression (requires `compression.zstd` support)
- `none`: Disable compression

```
python -m profiling.sampling run --binary --compression=zstd -o profile.bin script.py
```

To analyze binary profiles, use the replay command to convert
them to other formats like flame graphs or pstats output.

## Record and replay workflow

The binary format combined with the replay command enables a record-and-replay
workflow that separates data capture from analysis. Rather than generating
visualizations during profiling, you capture raw data to a compact binary file
and convert it to different formats later.

This approach has three main benefits:

- Sampling runs faster because the work of building data structures for
visualization is deferred until replay.
- A single binary capture can be converted to multiple output formats
without re-profiling: pstats for a quick overview, flame graph for visual
exploration, heatmap for line-level detail.
- Binary files are compact and easy to share with colleagues who can convert
them to their preferred format.

A typical workflow:

```
# Capture profile in production or during tests
python -m profiling.sampling attach --binary -o profile.bin 12345

# Later, analyze with different formats
python -m profiling.sampling replay profile.bin
python -m profiling.sampling replay --flamegraph -o profile.html profile.bin
python -m profiling.sampling replay --heatmap -o heatmap profile.bin
```
