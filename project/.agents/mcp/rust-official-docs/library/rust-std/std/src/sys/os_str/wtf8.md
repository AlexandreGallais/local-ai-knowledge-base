---
title: "std::sys::os_str::wtf8"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/os_str/wtf8.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::os_str::wtf8

The underlying OsString/OsStr implementation on Windows is a
wrapper around the "WTF-8" encoding; see the `wtf8` module for more.

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
`other` must be valid WTF-8.

Additionally, this method bypasses the WTF-8 surrogate joining, so
either `self` must not end with a leading surrogate half, or `other`
must not start with a trailing surrogate half.
