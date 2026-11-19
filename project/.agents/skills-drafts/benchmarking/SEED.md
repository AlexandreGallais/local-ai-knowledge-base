# SEED: benchmarking  (OBS-03, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: benchmarking
description: "Writes reliable benchmarks with the project's tools - Google Benchmark, criterion, JMH, BenchmarkDotNet, pytest-benchmark - with warm-up, repetitions and statistics. Use when comparing the speed of two implementations, proving an optimisation, or adding a performance regression test."
metadata:
  id: OBS-03
  stars: "2"
  nature: process
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Benchmark tool per language installed here.
- [ ] Warm-up, iterations, statistics and noise control.
- [ ] Running in release mode and on a quiet machine.
- [ ] Storing and comparing results.

## Known pitfalls to confirm or drop

- Dead-code elimination removes the measured work.
- Comparing runs from different machines.

## MCP servers and example queries

- cpp-official-docs: Google Benchmark DoNotOptimize
- rust-official-docs: criterion black_box
- java-official-docs: JMH Blackhole
- csharp-official-docs: BenchmarkDotNet
- python-official-docs: timeit
