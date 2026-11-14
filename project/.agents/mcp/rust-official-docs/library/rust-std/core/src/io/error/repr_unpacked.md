---
title: "core::io::error::repr_unpacked"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/error/repr_unpacked.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::error::repr_unpacked

This is a fairly simple unpacked error representation that's used on
non-64bit targets, where the packed 64 bit representation wouldn't work, and
would have no benefit.
