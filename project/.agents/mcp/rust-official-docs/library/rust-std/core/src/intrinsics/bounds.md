# core::intrinsics::bounds

Various traits used to restrict intrinsics to not-completely-wrong types.

## trait BuiltinDeref

```rust
pub unsafe trait BuiltinDeref: Sized
```

Types with a built-in dereference operator in runtime MIR,
aka references and raw pointers.

# Safety
Must actually *be* such a type.

## trait FloatPrimitive

```rust
pub unsafe trait FloatPrimitive: Sized + Copy
```

Built-in float types (f16, f32, f64 and f128).

# Safety
Must actually *be* such a type.

## trait IntegerPrimitive

```rust
pub const unsafe trait IntegerPrimitive: Copy + [const] Ord
```

Built-in integer types (i8, i16, .., i128, isize, u8, u16, .., u128, usize).

Intentionally does not include other integer-repr types like `bool` or `char`.

# Safety
Must actually *be* such a type.