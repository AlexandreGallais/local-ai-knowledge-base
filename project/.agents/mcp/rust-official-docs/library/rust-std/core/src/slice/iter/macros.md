# core::slice::iter::macros

Macros used by iterators of slice.

## macro if_zst!

```rust
macro_rules! if_zst
```

Convenience & performance macro for consuming the `end_or_len` field, by
giving a `(&mut) usize` or `(&mut) NonNull<T>` depending whether `T` is
or is not a ZST respectively.

Internally, this reads the `end` through a pointer-to-`NonNull` so that
it'll get the appropriate non-null metadata in the backend without needing
to call `assume` manually.