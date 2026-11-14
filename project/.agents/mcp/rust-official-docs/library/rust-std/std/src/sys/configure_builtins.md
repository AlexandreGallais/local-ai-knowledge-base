---
title: "std::sys::configure_builtins"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/configure_builtins.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::configure_builtins

The configure builtins provides runtime support compiler-builtin features
which require dynamic initialization to work as expected, e.g. aarch64
outline-atomics.
