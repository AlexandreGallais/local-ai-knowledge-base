---
title: "core::num::imp::flt2dec::decoder"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/flt2dec/decoder.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::flt2dec::decoder

Decodes a floating-point value into individual parts and error ranges.

## struct Decoded

```rust
pub struct Decoded
```

Decoded unsigned finite value, such that:

- The original value equals to `mant * 2^exp`.

- Any number from `(mant - minus) * 2^exp` to `(mant + plus) * 2^exp` will
  round to the original value. The range is inclusive only when
  `inclusive` is `true`.

## enum FullDecoded

```rust
pub enum FullDecoded
```

Decoded unsigned value.

## trait DecodableFloat

```rust
pub trait DecodableFloat: FloatExt + Copy
```

A floating point type which can be `decode`d.

## DecodableFloat::min_pos_norm_value

```rust
fn min_pos_norm_value() -> Self
```

The minimum positive normalized value.

## fn decode

```rust
pub fn decode<T: DecodableFloat>(v: T) -> (/*negative?*/ bool, FullDecoded)
```

Returns a sign (true when negative) and `FullDecoded` value
from given floating point number.
