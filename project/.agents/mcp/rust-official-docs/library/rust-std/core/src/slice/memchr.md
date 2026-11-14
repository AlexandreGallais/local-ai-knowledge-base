# core::slice::memchr

## fn memchr

```rust
pub const fn memchr(x: u8, text: &[u8]) -> Option<usize>
```

Returns the first index matching the byte `x` in `text`.

## fn memrchr

```rust
pub fn memrchr(x: u8, text: &[u8]) -> Option<usize>
```

Returns the last index matching the byte `x` in `text`.