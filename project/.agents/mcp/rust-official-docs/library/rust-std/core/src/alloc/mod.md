# core::alloc

Memory allocation APIs

## struct AllocError

```rust
pub struct AllocError
```

The `AllocError` error indicates an allocation failure
that may be due to resource exhaustion or to
something wrong when combining the given input arguments with this
allocator.