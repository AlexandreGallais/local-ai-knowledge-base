---
title: "alloc::io::buffered::bufreader::buffer"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/buffered/bufreader/buffer.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::buffered::bufreader::buffer

An encapsulation of `BufReader`'s buffer management logic.

This module factors out the basic <example-value> of `BufReader` in order to protect two core
invariants:
* `filled` bytes of `buf` are always initialized
* `pos` is always <= `filled`
Since this module encapsulates the buffer management logic, we can ensure that the range
`pos..filled` is always a valid index into the initialized region of the buffer. This means
that user code which wants to do reads from a `BufReader` via `buffer` + `consume` can do so
without encountering any runtime bounds checks.
