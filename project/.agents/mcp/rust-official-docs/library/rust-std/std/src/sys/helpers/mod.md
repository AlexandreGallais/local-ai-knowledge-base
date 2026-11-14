# std::sys::helpers

Small helper functions used inside `sys`.

If any of these have uses outside of `sys`, please move them to a different
module.

## fn mul_div_u64

```rust
pub fn mul_div_u64(value: u64, numerator: u64, denom: u64) -> u64
```

Computes `(value*numerator)/denom` without overflow, as long as both
`numerator*denom` and the overall result fit into `u64` (which is the case
for our time conversions).