---
title: "core::num::imp::flt2dec::strategy::grisu"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/flt2dec/strategy/grisu.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::flt2dec::strategy::grisu

Rust adaptation of the Grisu3 algorithm described in "Printing Floating-Point Numbers Quickly
and Accurately with Integers"[^1]. It uses about 1KB of precomputed table, and in turn, it's
very quick for most inputs.

  accurately with integers. SIGPLAN Not. 45, 6 (June 2010), 233-243.

## fn format_shortest_opt

```rust
pub fn format_shortest_opt<'a>( d: &Decoded, buf: &'a mut [MaybeUninit<u8>], ) -> Option<(/*digits*/ &'a [u8], /*exp*/ i16)>
```

The shortest mode implementation for Grisu.

It returns `None` when it would return an inexact representation otherwise.

## fn format_shortest

```rust
pub fn format_shortest<'a>( d: &Decoded, buf: &'a mut [MaybeUninit<u8>], ) -> (/*digits*/ &'a [u8], /*exp*/ i16)
```

The shortest mode implementation for Grisu with Dragon fallback.

This should be used for most cases.

## fn format_exact_opt

```rust
pub fn format_exact_opt<'a>( d: &Decoded, buf: &'a mut [MaybeUninit<u8>], limit: i16, ) -> Option<(/*digits*/ &'a [u8], /*exp*/ i16)>
```

The exact and fixed mode implementation for Grisu.

It returns `None` when it would return an inexact representation otherwise.

## fn format_exact

```rust
pub fn format_exact<'a>( d: &Decoded, buf: &'a mut [MaybeUninit<u8>], limit: i16, ) -> (/*digits*/ &'a [u8], /*exp*/ i16)
```

The exact and fixed mode implementation for Grisu with Dragon fallback.

This should be used for most cases.
