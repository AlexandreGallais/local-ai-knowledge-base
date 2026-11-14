---
title: "std::sys::personality"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/personality/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::personality

This module contains the implementation of the `eh_personality` lang item.

The actual implementation is heavily dependent on the target since Rust
tries to use the native stack unwinding mechanism whenever possible.

This personality function is still required with `-C panic=abort` because
it is used to catch foreign exceptions from `extern "C-unwind"` and turn
them into aborts.

Additionally, ARM EHABI uses the personality function when generating
backtraces.
