---
title: "core::random"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/random.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::random

Random value generation.

## Rng::fill_bytes

```rust
fn fill_bytes(&mut self, bytes: &mut [u8])
```

Fills `bytes` with random bytes.

Note that calling `fill_bytes` multiple times is not equivalent to calling `fill_bytes` once
with a larger buffer. An `Rng` is allowed to return different bytes for those two cases. For
instance, this allows an `Rng` to generate a word at a time and throw part of it away if not
needed.

## Distribution::sample

```rust
fn sample(&self, source: &mut (impl Rng + ?Sized)) -> T
```

Samples a random value from the distribution, using the specified random source.
