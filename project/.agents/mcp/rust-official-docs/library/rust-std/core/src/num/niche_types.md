---
title: "core::num::niche_types"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/niche_types.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

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
