---
title: "core::prelude"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/prelude/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::prelude

The core prelude

This module is intended for users of core which do not link to std as well.
This module is imported by default when `#![no_std]` is used in the same
manner as the standard library's prelude.
