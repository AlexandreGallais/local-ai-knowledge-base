---
title: "std::sys::sync::futex::wasilibc"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/futex/wasilibc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::futex::wasilibc

A futex implementation based on the primitives provided by `wasi-libc`.

This is currently only used on wasip3 targets, but in the future once
`wasi-libc`'s implementation of these symbols have percolated further it'll
be possible to use this on all WASI targets. The `wasi-libc` implementation
of these symbols differs depending on the target and configuration:

* `wasm32-wasip{1,2}` - this will abort if blocking actually happens
* `wasm32-wasip1-threads` - this uses wasm `memory.atomic.*` instructions
* `wasm32-wasip3` - depending on libc configuration (`ENABLE_COOP_THREADS`)
  this either aborts (coop threads disables) on blocking or does the
  coop-thread-thing to manage threads.

Regardless this module is effectively delegating to `wasi-libc` to determine
how to do thread management.
