---
title: "core::ffi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ffi/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ffi

Platform-specific types, as defined by C.

Code that interacts via FFI will almost certainly be using the
base types provided by C, which aren't nearly as nicely defined
as Rust's primitive types. This module provides types which will
match those defined by C, so that code that interacts with C will
refer to the correct types.
