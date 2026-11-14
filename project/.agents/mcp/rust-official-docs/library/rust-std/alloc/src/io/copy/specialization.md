---
title: "alloc::io::copy::specialization"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/copy/specialization.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::copy::specialization

Provides specialization for `io::copy`.

## SpecCopy::copy

```rust
fn copy<R: Read + ?Sized, W: Write + ?Sized>( _reader: &mut R, _writer: &mut W, ) -> Result<CopyState>
```

Attempt to copy from this reader to the provided writer using a specialized
process.

Note that this function does _not_ take `self` as a parameter, and instead
is passed a generic `Read` type `R`.
This allows the `Self` type to provide specialized implementations for
any combination of `Read` and `Write` types.
However, in practice `Self` and types wrapping `Self` will be passed as
the `reader` argument.

As of time of writing, `&mut R`, `Take<R>`, and `BufReader<R>` will
forward to `R` for a specialized copy implementation.
