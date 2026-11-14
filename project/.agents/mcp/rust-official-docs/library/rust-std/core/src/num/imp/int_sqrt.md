---
title: "core::num::imp::int_sqrt"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/int_sqrt.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::int_sqrt

These functions use the Karatsuba square root algorithm to compute the
integer square root
for the primitive integer types.

The signed integer functions can only handle **nonnegative** inputs, so
that must be checked before calling those.

"Paul Zimmermann. Karatsuba Square Root. \[Research Report\] RR-3805,
INRIA. 1999, pp.8. (inria-00072854)"

## macro unsigned_fn!

```rust
macro_rules! unsigned_fn
```

Generates a `u*` function that returns the integer square root of any input of
a specific unsigned integer type.

## macro first_stage!

```rust
macro_rules! first_stage
```

Generates the first stage of the computation after normalization.

# Safety

`$n` must be nonzero.

## macro middle_stage!

```rust
macro_rules! middle_stage
```

Generates a middle stage of the computation.

# Safety

`$s` must be nonzero.

## macro last_stage!

```rust
macro_rules! last_stage
```

Generates the last stage of the computation before denormalization.

# Safety

`$s` must be nonzero.
