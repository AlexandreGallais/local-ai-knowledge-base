# core::intrinsics::macros

Macros used to declare intrinsics.

## macro intrinsic_dispatch_on_type!

```rust
macro_rules! intrinsic_dispatch_on_type
```

Declares an intrinsic that is generic over its type, but whose fallback body has to be
written per-type. This is needed for the float intrinsics, which are generics but may
have different fallback bodies for each float width.

```ignore (illustrative)
intrinsic_dispatch_on_type! {
    /// Returns the exponential of a float.
    #[rustc_nounwind]
    #[rustc_intrinsic]
    pub fn expf<T: bounds::FloatPrimitive>(x: T) -> T;

    f16 => { expf(x as f32) as f16 }
    f32 => { libm::likely_available::expf(x) }
    f64 => { libm::likely_available::exp(x) }
    f128 => { libm::maybe_available::expf128(x) }
}
```