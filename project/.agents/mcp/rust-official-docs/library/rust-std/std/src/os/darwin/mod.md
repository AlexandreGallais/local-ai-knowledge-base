---
title: "std::os::darwin"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/darwin/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::darwin

Platform-specific extensions to `std` for Darwin / Apple platforms.

This is available on the following operating systems:
- macOS
- iOS
- tvOS
- watchOS
- visionOS

Note: This module is called "Darwin" as that's the name of the underlying
core OS of the above operating systems, but it should not be confused with
the `-darwin` suffix in the `x86_64-apple-darwin` and
`aarch64-apple-darwin` target names, which are mostly named that way for
legacy reasons.
