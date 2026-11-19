# SEED: stack-trace-reading  (DBG-04, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-trace-reading
description: "Reads stack traces of each language to find the first frame in project code and the real error. Use when an error output shows a stack trace, a traceback, a panic message, a backtrace or an exception with 'at ...' lines, in JavaScript, TypeScript, Python, Java, C#, Rust or C++."
metadata:
  id: DBG-04
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Layout of a trace per language (order of frames, where the message is, caused-by chains).
- [ ] How to find the first frame in project code (path patterns of the project versus dependencies).
- [ ] Source maps for TypeScript and bundled JavaScript; RUST_BACKTRACE=1; Python chained exceptions; Java and C# inner exceptions.
- [ ] Async traces (lost frames in promises, async Rust, C# async state machines).
- [ ] Symbolised C and C++ backtraces (gdb bt, addr2line, ASan reports).

## Known pitfalls to confirm or drop

- Python prints the most recent call last; the last frame is the raise site.
- Java 'Caused by' at the bottom is usually the root cause.
- Rust panics print no backtrace unless RUST_BACKTRACE=1 is set.
- Node async stack traces may miss callers unless the error is awaited.
- C# 'at' lines without line numbers mean the PDB symbols are missing.

## MCP servers and example queries

- js-official-docs: Error.prototype.stack, source maps node --enable-source-maps
- python-official-docs: traceback, exception chaining __cause__
- java-official-docs: Throwable printStackTrace Caused by
- csharp-official-docs: Exception.StackTrace InnerException
- rust-official-docs: RUST_BACKTRACE, std::backtrace
- cpp-official-docs: backtrace, AddressSanitizer report
