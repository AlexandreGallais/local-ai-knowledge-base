---
title: "core::num::imp::flt2dec::strategy::dragon"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/flt2dec/strategy/dragon.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::flt2dec::strategy::dragon

Almost direct (but slightly optimized) Rust translation of Figure 3 of "Printing
Floating-Point Numbers Quickly and Accurately"[^1].

  quickly and accurately. SIGPLAN Not. 31, 5 (May. 1996), 108-116.

## fn format_shortest

```rust
pub fn format_shortest<'a>( d: &Decoded, buf: &'a mut [MaybeUninit<u8>], ) -> (/*digits*/ &'a [u8], /*exp*/ i16)
```

The shortest mode implementation for Dragon.

## fn format_exact

```rust
pub fn format_exact<'a>( d: &Decoded, buf: &'a mut [MaybeUninit<u8>], limit: i16, ) -> (/*digits*/ &'a [u8], /*exp*/ i16)
```

The exact and fixed mode implementation for Dragon.
