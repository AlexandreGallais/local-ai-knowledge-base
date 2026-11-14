---
title: "core::num::complex"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/complex.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::complex

## Complex::new

```rust
pub const fn new(re: T, im: T) -> Complex<T>
```

Create a new complex number from a real and imaginary component.

## Complex::conjugate

```rust
pub fn conjugate(self) -> Self
```

The complex conjugate of a complex number.

The conjugate of `a + bi` is `a - bi`: the imaginary component is negated.
Geometrically, this is a reflection across the real axis.
