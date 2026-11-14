---
title: "core::iter::traits::marker"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/traits/marker.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::traits::marker

## InPlaceIterable::EXPAND_BY

```rust
const EXPAND_BY: Option<NonZero<usize>>
```

The product of one-to-many item expansions that happen throughout the iterator pipeline.
E.g. [[u8; 4]; 4].iter().flatten().flatten() would have a `EXPAND_BY` of 16.
This is an upper bound, i.e. the transformations will produce at most this many items per
input. It's meant for layout calculations.

## InPlaceIterable::MERGE_BY

```rust
const MERGE_BY: Option<NonZero<usize>>
```

The product of many-to-one item reductions that happen throughout the iterator pipeline.
E.g. [u8].iter().array_chunks::<4>().array_chunks::<4>() would have a `MERGE_BY` of 16.
This is a lower bound, i.e. the transformations will consume at least this many items per
output.
