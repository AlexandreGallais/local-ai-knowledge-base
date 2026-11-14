# std::random

Random value generation.

This module provides two low-level interfaces for random number generation:
* The [`Rng`] trait abstracts over all random number generators (RNGs) and
  is intended to be used in all cases where the choice of RNG is left to the
  user. It provides the [`fill_bytes`](Rng::fill_bytes) method that fills a
  buffer of [`u8`]s with freshly-generated random data.
* The [`SystemRng`] implements the [`Rng`] trait by asking the operating
  system for cryptographically-secure random data on every call to
  `fill_bytes`.

In the future, higher-level interfaces for features like sampling distributions
may be added to this module. Until that time, users of `fill_bytes` should
take care to avoid sampling bias when using the filled byte buffer to create
an instance of another type. In particular, the modulo operation is **not**
suitable for constraining the range of an unconstrained number:
```compile_fail
let mut buf = [0; 2];
rng.fill_bytes(&mut buf);
// 💀 **DO NOT DO THIS** 💀
// Numbers below ca. 22000 will be twice as likely.
let very_bad_random_number = u16::from_ne_bytes(buf) % 45000;
```

# Examples

Generating a [version 4/variant 1 UUID] represented as text:
```
#![feature(random)]

use std::random::{Rng, SystemRng};

fn uuid(rng: &mut impl Rng) -> String {
    let mut buf = [0; 16];
    rng.fill_bytes(&mut buf);
    // Use little-endian to make the result reproducible across architectures.
    let bits = u128::from_le_bytes(buf);
    let g1 = (bits >> 96) as u32;
    let g2 = (bits >> 80) as u16;
    let g3 = (0x4000 | (bits >> 64) & 0x0fff) as u16;
    let g4 = (0x8000 | (bits >> 48) & 0x3fff) as u16;
    let g5 = (bits & 0xffffffffffff) as u64;
    format!("{g1:08x}-{g2:04x}-{g3:04x}-{g4:04x}-{g5:012x}")
}

println!("{}", uuid(&mut SystemRng));
```

[version 4/variant 1 UUID]: https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)