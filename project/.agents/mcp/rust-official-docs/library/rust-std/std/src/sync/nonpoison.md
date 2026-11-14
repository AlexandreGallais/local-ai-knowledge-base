---
title: "std::sync::nonpoison"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/nonpoison.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::nonpoison

Non-poisoning synchronous locks.

The difference from the locks in the `poison` module is that the locks in this module will not
become poisoned when a thread panics while holding a guard.
