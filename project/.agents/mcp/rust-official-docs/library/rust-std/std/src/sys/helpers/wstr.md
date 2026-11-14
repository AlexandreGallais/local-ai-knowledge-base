---
title: "std::sys::helpers::wstr"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/helpers/wstr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::helpers::wstr

This module contains constructs to work with 16-bit characters (UCS-2 or UTF-16)

## struct WStrUnits

```rust
pub struct WStrUnits<'a>
```

A safe iterator over a LPWSTR
(aka a pointer to a series of UTF-16 code units terminated by a NULL).

## WStrUnits::new

```rust
pub unsafe fn new(lpwstr: *const u16) -> Option<Self>
```

Creates the iterator. Returns `None` if `lpwstr` is null.

SAFETY: `lpwstr` must point to a null-terminated wide string that lives
at least as long as the lifetime of this struct.

## WStrUnits::advance_while

```rust
pub fn advance_while<P: FnMut(NonZero<u16>) -> bool>(&mut self, mut predicate: P) -> usize
```

Advance the iterator while `predicate` returns true.
Returns the number of items it advanced by.
