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