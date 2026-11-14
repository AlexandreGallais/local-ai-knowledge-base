---
title: "core::num::wrapping"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/wrapping.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::wrapping

Definitions of `Wrapping<T>`.

## struct Wrapping

```rust
pub struct Wrapping<T>(#[stable(feature = "rust1", since = "1.0.0")] pub T)
```

Provides intentionally-wrapped arithmetic on `T`.

Operations like `+` on `u32` values are intended to never overflow,
and in some debug configurations overflow is detected and results
in a panic. While most arithmetic falls into this category, some
code explicitly expects and relies upon modular arithmetic (e.g.,
hashing).

Wrapping arithmetic can be achieved either through methods like
`wrapping_add`, or through the `Wrapping<T>` type, which says that
all standard arithmetic operations on the underlying value are
intended to have wrapping semantics.

The underlying value can be retrieved through the `.0` index of the
`Wrapping` tuple.

# Examples

```rust
use std::num::Wrapping;

let zero = Wrapping(0u32);
let one = Wrapping(1u32);

assert_eq!(u32::MAX, (zero - one).0);
```

# Layout

`Wrapping<T>` is guaranteed to have the same layout and ABI as `T`.

## Wrapping::reverse_bits

```rust
pub const fn reverse_bits(self) -> Self
```

Reverses the bit pattern of the integer.

# Examples

Please note that this example is shared among integer types, which is why `i16`
is used.

Basic usage:

```rust
use std::num::Wrapping;

let n = Wrapping(0b0000000_01010101i16);
assert_eq!(n, Wrapping(85));

let m = n.reverse_bits();

assert_eq!(m.0 as u16, 0b10101010_00000000);
assert_eq!(m, Wrapping(-22016));
```
