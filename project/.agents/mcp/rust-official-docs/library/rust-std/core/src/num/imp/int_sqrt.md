# core::num::imp::int_sqrt

These functions use the [Karatsuba square root algorithm][1] to compute the
[integer square root](https://en.wikipedia.org/wiki/Integer_square_root)
for the primitive integer types.

The signed integer functions can only handle **nonnegative** inputs, so
that must be checked before calling those.

[1]: <https://web.archive.org/web/20230511212802/https://inria.hal.science/inria-00072854v1/file/RR-3805.pdf>
"Paul Zimmermann. Karatsuba Square Root. \[Research Report\] RR-3805,
INRIA. 1999, pp.8. (inria-00072854)"

## macro unsigned_fn!

```rust
macro_rules! unsigned_fn
```

Generates a `u*` function that returns the [integer square root](
https://en.wikipedia.org/wiki/Integer_square_root) of any input of
a specific unsigned integer type.

## macro first_stage!

```rust
macro_rules! first_stage
```

Generates the first stage of the computation after normalization.

# Safety

`$n` must be nonzero.

## macro middle_stage!

```rust
macro_rules! middle_stage
```

Generates a middle stage of the computation.

# Safety

`$s` must be nonzero.

## macro last_stage!

```rust
macro_rules! last_stage
```

Generates the last stage of the computation before denormalization.

# Safety

`$s` must be nonzero.