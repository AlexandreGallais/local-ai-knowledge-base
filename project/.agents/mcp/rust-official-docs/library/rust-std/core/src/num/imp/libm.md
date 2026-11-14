---
title: "core::num::imp::libm"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/libm.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::libm

Bindings to math functions provided by the system `libm` or by the `libm` crate, exposed
via `compiler-builtins`.

The functions in the root of this module are "guaranteed" to be available; see the
`full_availability` module in compiler-builtins for details.
