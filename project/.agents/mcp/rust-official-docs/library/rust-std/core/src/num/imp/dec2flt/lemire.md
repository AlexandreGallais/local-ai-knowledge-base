---
title: "core::num::imp::dec2flt::lemire"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/dec2flt/lemire.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::dec2flt::lemire

Implementation of the Eisel-Lemire algorithm.

## fn compute_float

```rust
pub fn compute_float<F: Float>(q: i64, mut w: u64) -> BiasedFp
```

Compute w * 10^q using an extended-precision float representation.

Fast conversion of a the significant digits and decimal exponent
a float to an extended representation with a binary float. This
algorithm will accurately parse the vast majority of cases,
and uses a 128-bit representation (with a fallback 192-bit
representation).

This algorithm scales the exponent by the decimal exponent
using pre-computed powers-of-5, and calculates if the
representation can be unambiguously rounded to the nearest
machine float. Near-halfway cases are not handled here,
and are represented by a negative, biased binary exponent.

The algorithm is described in detail in "Daniel Lemire, Number Parsing
at a Gigabyte per Second" in section 5, "Fast Algorithm", and
section 6, "Exact Numbers And Ties", available online:
<https://arxiv.org/abs/2101.11408.pdf>.
