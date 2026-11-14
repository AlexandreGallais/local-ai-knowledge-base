---
title: "std::sys::pal::hermit"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/hermit/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::hermit

System bindings for Hermit

This module contains the facade (aka platform-specific) implementations of
OS level functionality for Hermit.

This is all super highly experimental and not actually intended for
wide/production use yet, it's still all in the experimental category. This
will likely change over time.

Currently all functions here are basically stubs that immediately return
errors. The hope is that with a portability lint we can turn actually just
remove all this and just omit parts of the standard library if we're
compiling for wasm. That way it's a compile time error for something that's
guaranteed to be a runtime error!
