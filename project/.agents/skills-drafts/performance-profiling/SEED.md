# SEED: performance-profiling  (OBS-01, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: performance-profiling
description: "Measures before optimising - profilers per language, benchmarks, flame graphs - and changes only what the measure shows. Use when something is slow, when asked to optimise, when a performance regression is suspected, or before any change made for speed."
metadata:
  id: OBS-01
  stars: "3"
  nature: process
  mode: R+D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Profilers available per language (perf, py-spy or cProfile, node --cpu-prof, dotnet-trace, async-profiler or JFR, cargo flamegraph).
- [ ] A reproducible measurement: input, warm-up, repetitions, median.
- [ ] Reading a profile or flame graph: hot paths, self versus total time.
- [ ] Verifying the gain with the same measurement.

## Known pitfalls to confirm or drop

- Optimising without a baseline measure.
- Measuring a debug build.
- One run instead of repetitions.

## MCP servers and example queries

- python-official-docs: cProfile
- js-official-docs: node --cpu-prof
- csharp-official-docs: dotnet-trace
- java-official-docs: JFR flight recorder
- rust-official-docs: profiling, release profile debug symbols
- linux-official-docs: perf record
