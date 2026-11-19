---
name: linux-perf-tools
description: "Profiles and traces native programs on Linux - perf record and report, strace, ltrace, flame graphs. Use when a native or system-level program is slow, hangs, or behaves strangely with files, syscalls or libraries, and language-level profilers are not enough."
metadata:
  id: LNX-11
  stars: "2"
  nature: reference
  mode: B
  wave: V3
  load: auto
---

# Linux performance tools

**Core rule:** profile the real workload with a sampling profiler first; trace syscalls only to answer a precise question.

## Procedure

1. Profile CPU: `perf record -g -- <command>` then `perf report --stdio | head -n 60`.
   - Check: the hottest functions are listed with percentages.
2. Make a flame graph when the call tree is deep (with the tool installed here).
   - Check: an SVG is written.
3. Trace syscalls for a hang or file problem: `strace -f -e trace=file,network -o /tmp/strace.log <command>`, then `tail` and `grep` in it.
   - Check: the blocking or failing call is found.
4. Trace library calls only if needed: `ltrace -c <command>`.
   - Check: the summary names the costly calls.

## This installation

<!-- FILL: what=whether perf can sample as a normal user and inside the dev container; find=cat /proc/sys/kernel/perf_event_paranoid and run perf stat true; verify=perf stat prints counters -->

<!-- FILL: what=flame graph tool available; find=command -v flamegraph.pl inferno-flamegraph; verify=a flame graph is produced from a perf script output -->

## Stop and ask the human if

- Profiling needs root, a kernel setting change, or tracing other users' processes.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "strace to find hot code." | strace shows syscalls, not CPU time. Use perf. |
| "Profile a debug build." | Measure an optimised build with symbols. |

## Definition of done

- [ ] Hot path or blocking call identified with the tool output.

## Local completion checklist

- [ ] perf permissions
- [ ] Flame graph tool
