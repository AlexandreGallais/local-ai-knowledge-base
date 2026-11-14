---
title: "alloc::io::copy"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/copy.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::copy

## fn copy

```rust
pub fn copy<R: ?Sized, W: ?Sized>(reader: &mut R, writer: &mut W) -> Result<u64> where R: Read, W: Write,
```

# Errors

This function will return an error immediately if any call to `read` or
`write` returns an error. All instances of `ErrorKind::Interrupted` are
handled by this function and the underlying operation is retried.

# Examples

```rust
use std::io;

fn main() -> io::Result<()> {
    let mut reader: &[u8] = b"hello";
    let mut writer: Vec<u8> = vec![];

    io::copy(&mut reader, &mut writer)?;

    assert_eq!(&b"hello"[..], &writer[..]);
    Ok(())
}
```

# Platform-specific behavior

On Linux (including Android), this function uses `copy_file_range(2)`,
`sendfile(2)` or `splice(2)` syscalls to move data directly between file
descriptors if possible.

Note that platform-specific behavior may change in the future.
