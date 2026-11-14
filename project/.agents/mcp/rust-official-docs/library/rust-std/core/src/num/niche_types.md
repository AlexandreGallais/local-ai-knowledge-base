# core::num::niche_types

## name::new_unchecked

```rust
pub const unsafe fn new_unchecked(val: $int) -> Self
```

Constructs an instance of this type from the underlying integer
primitive without checking whether its valid.

# Safety
Immediate language UB if `val` is not within the valid range for this
type, as it violates the validity invariant.