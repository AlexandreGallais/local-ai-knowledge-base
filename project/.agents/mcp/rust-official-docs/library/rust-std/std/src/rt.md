---
title: "std::rt"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/rt.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::rt

Runtime services

The `rt` module provides a narrow set of runtime services,
including the global heap (exported in `heap`) and unwinding and
backtrace support. The APIs in this module are highly unstable,
and should be considered as private implementation details for the
time being.
