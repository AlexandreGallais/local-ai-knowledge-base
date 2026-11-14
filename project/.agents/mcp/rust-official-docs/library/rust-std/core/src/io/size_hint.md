---
title: "core::io::size_hint"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/size_hint.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::size_hint

## SizeHint::lower_bound

```rust
fn lower_bound(&self) -> usize
```

Returns a lower bound on the number of elements this container-like item
contains.
For example, an array `[u8; 12]` could return any value between `0` and
`12` inclusively as a correct implementation.

Through specialization, all types implement this method returning a default
value of `0`.

Implementations *must* ensure the returned value is less than or equal to
the true element count.

## SizeHint::upper_bound

```rust
fn upper_bound(&self) -> Option<usize>
```

Returns an upper bound on the number of elements this container-like item
contains if it can be determined, otherwise `None`.

Through specialization, all types implement this method returning a default
value of `None`.

Implementations *must* ensure the returned value is greater than or equal
to the true element count.
