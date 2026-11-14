---
title: "std::sys::os_str::utf8"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/os_str/utf8.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::os_str::utf8

An OsString/OsStr implementation that is guaranteed to be UTF-8.

## Buf::truncate_unchecked

```rust
pub unsafe fn truncate_unchecked(&mut self, len: usize)
```

Provides plumbing to `Vec::truncate` without giving full mutable access
to the `Vec`.

# Safety

The length must be at an `OsStr` boundary, according to
`Slice::check_public_boundary`.

## Buf::extend_from_slice_unchecked

```rust
pub unsafe fn extend_from_slice_unchecked(&mut self, other: &[u8])
```

Provides plumbing to `Vec::extend_from_slice` without giving full
mutable access to the `Vec`.

# Safety

The slice must be valid for the platform encoding (as described in
`OsStr::from_encoded_bytes_unchecked`). For this encoding, that means
`other` must be valid UTF-8.
