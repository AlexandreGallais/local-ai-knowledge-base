---
title: "core::slice::sort::select"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/sort/select.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::sort::select

This module contains the implementation for `slice::select_nth_unstable`.
It uses an introselect algorithm based on ipnsort by Lukas Bergdoll and Orson Peters,
published at: <https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort>

The fallback algorithm used for introselect is Median of Medians using Tukey's Ninther
for pivot selection. Using this as a fallback ensures O(n) worst case running time with
better performance than one would get using heapsort as fallback.
