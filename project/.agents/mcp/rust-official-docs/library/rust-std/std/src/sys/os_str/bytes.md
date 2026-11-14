---
title: "std::sys::os_str::bytes"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/os_str/bytes.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::os_str::bytes

The underlying OsString/OsStr implementation on Unix and many other
systems: just a `Vec<u8>`/`[u8]`.

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
`OsStr::from_encoded_bytes_unchecked`). This encoding has no safety
requirements.
