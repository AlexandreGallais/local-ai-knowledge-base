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