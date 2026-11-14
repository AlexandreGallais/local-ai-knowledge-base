# std::sys::pal::windows::c

C definitions used by libnative that don't belong in liblibc

## struct REPARSE_DATA_BUFFER

```rust
pub struct REPARSE_DATA_BUFFER
```

NB: Use carefully! In general using this as a reference is likely to get the
provenance wrong for the `rest` field!

## struct SYMBOLIC_LINK_REPARSE_BUFFER

```rust
pub struct SYMBOLIC_LINK_REPARSE_BUFFER
```

NB: Use carefully! In general using this as a reference is likely to get the
provenance wrong for the `PathBuffer` field!