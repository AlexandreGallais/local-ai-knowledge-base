# std::sys::path::windows

## struct WCStr

```rust
pub struct WCStr([u16])
```

A null terminated wide string.

## WCStr::from_wchars_with_null_unchecked

```rust
pub unsafe fn from_wchars_with_null_unchecked(s: &[u16]) -> &Self
```

Convert a slice to a WCStr without checks.

Though it is memory safe, the slice should also not contain interior nulls
as this may lead to unwanted truncation.

# Safety

The slice must end in a null.