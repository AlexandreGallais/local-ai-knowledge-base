---
title: "std::sys::stdio::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/stdio/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::stdio::windows

## Stdout::refresh

```rust
pub fn refresh(&mut self)
```

Forgets the cached stream state, so the next write re-queries the OS.
Called when a new lock session begins, so that changing the process
stdio handles (e.g. `SetStdHandle`) between lock sessions keeps
working (see #40490).

## Stderr::refresh

```rust
pub fn refresh(&mut self)
```

See `Stdout::refresh`.
