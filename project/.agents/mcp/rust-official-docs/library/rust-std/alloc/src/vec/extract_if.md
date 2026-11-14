# alloc::vec::extract_if

## struct ExtractIf

```rust
pub struct ExtractIf< 'a, T, F, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An iterator which uses a closure to determine if an element should be removed.

This struct is created by [`Vec::extract_if`].
See its documentation for more.

# Example

```
let mut v = vec![0, 1, 2];
let iter: std::vec::ExtractIf<'_, _, _> = v.extract_if(.., |x| *x % 2 == 0);
```