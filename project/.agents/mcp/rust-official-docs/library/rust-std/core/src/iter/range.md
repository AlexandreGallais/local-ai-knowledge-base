# core::iter::range

## macro unsafe_range_trusted_random_access_impl!

```rust
macro_rules! unsafe_range_trusted_random_access_impl
```

Safety: This macro must only be used on types that are `Copy` and result in ranges
which have an exact `size_hint()` where the upper bound must not be `None`.