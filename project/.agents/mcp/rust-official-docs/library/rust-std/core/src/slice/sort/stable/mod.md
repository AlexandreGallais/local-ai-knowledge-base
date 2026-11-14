---
title: "core::slice::sort::stable"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/sort/stable/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::sort::stable

This module contains the entry points for `slice::sort`.

## fn sort

```rust
pub fn sort<T, F: FnMut(&T, &T) -> bool, BufT: BufGuard<T>>(v: &mut [T], is_less: &mut F)
```

Stable sort called driftsort by Orson Peters and Lukas Bergdoll.
Design document:
<https://github.com/Voultapher/sort-research-rs/blob/main/writeup/driftsort_introduction/text.md>

Upholds all safety properties outlined here:
<https://github.com/Voultapher/sort-research-rs/blob/main/writeup/sort_safety/text.md>

## trait BufGuard

```rust
pub trait BufGuard<T>
```

Abstracts owned memory buffer, so that sort code can live in core where no allocation is
possible. This trait can then be implemented in a place that has access to allocation.

## BufGuard::with_capacity

```rust
fn with_capacity(capacity: usize) -> Self
```

Creates new buffer that holds at least `capacity` memory.

## BufGuard::as_uninit_slice_mut

```rust
fn as_uninit_slice_mut(&mut self) -> &mut [MaybeUninit<T>]
```

Returns mutable access to uninitialized memory owned by the buffer.
