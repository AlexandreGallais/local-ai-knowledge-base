# core::num::imp::flt2dec::strategy::dragon

Almost direct (but slightly optimized) Rust translation of Figure 3 of "Printing
Floating-Point Numbers Quickly and Accurately"[^1].

[^1]: Burger, R. G. and Dybvig, R. K. 1996. Printing floating-point numbers
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