---
title: "alloc::vec::sve_retain"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/sve_retain.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec::sve_retain

SVE-accelerated `Vec::retain_mut` implementation.

Two-phase algorithm per 64-element chunk:
- Phase A (scalar): evaluates predicate exactly once, in order, into a bool mask.
- Phase B (SVE): uses `COMPACT` instruction to compress retained elements.
