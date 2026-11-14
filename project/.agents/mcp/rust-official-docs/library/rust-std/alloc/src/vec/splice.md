# alloc::vec::splice

## struct Splice

```rust
pub struct Splice< 'a, I: Iterator + 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator + 'a = Global, >
```

A splicing iterator for `Vec`.

This struct is created by [`Vec::splice()`].
See its documentation for more.

# Example

```
let mut v = vec![0, 1, 2];
let new = [7, 8];
let iter: std::vec::Splice<'_, _> = v.splice(1.., new);
```