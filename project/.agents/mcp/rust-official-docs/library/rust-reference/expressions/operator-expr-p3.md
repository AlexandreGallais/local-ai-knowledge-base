---
title: "Operator expressions (part 3 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/operator-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Operator expressions (part 3 of 4)

## Type cast expressions

r[expr.as.syntax]
```grammar
TypeCastExpression -> Expression `as` TypeNoBounds
```

r[expr.as.intro]
A type cast expression is denoted with the binary operator `as`.

r[expr.as.result]
Executing an `as` expression casts the value on the left-hand side to the type on the right-hand side.

An example of an `as` expression:

```rust
# fn sum(values: &[f64]) -> f64 { 0.0 }
# fn len(values: &[f64]) -> i32 { 0 }
fn average(values: &[f64]) -> f64 {
    let sum: f64 = sum(values);
    let size: f64 = len(values) as f64;
    sum / size
}
```

r[expr.as.coercions]
`as` can be used to explicitly perform coercions, as well as the following additional casts. Any cast that does not fit either a coercion rule or an entry in the table is a compiler error. Here `*T` means either `*const T` or `*mut T`. `m` stands for optional `mut` in reference types and `mut` or `const` in pointer types.

| Type of `e`           | `U`                   | Cast performed by `e as U`                            |
|-----------------------|-----------------------|-------------------------------------------------------|
| Integer or Float type | Integer or Float type | Numeric cast                       |
| Enumeration           | Integer type          | Enum cast                             |
| `bool` or `char`      | Integer type          | Primitive to integer cast |
| `u8`                  | `char`                | `u8` to `char` cast             |
| `*T`                  | `*V` (when compatible) | Pointer to pointer cast |
| `*T` where `T: Sized` | Integer type          | Pointer to address cast     |
| Integer type          | `*V` where `V: Sized` | Address to pointer cast     |
| `&m₁ [T; n]`          | `*m₂ T` [^lessmut]    | Array to pointer cast                                 |
| `*m₁ [T; n]`          | `*m₂ T` [^lessmut]    | Array to pointer cast                                 |
| [Function item]       | [Function pointer]    | Function item to function pointer cast                |
| [Function item]       | `*V` where `V: Sized` | Function item to pointer cast                         |
| [Function item]       | Integer               | Function item to address cast                         |
| [Function pointer]    | `*V` where `V: Sized` | Function pointer to pointer cast                      |
| [Function pointer]    | Integer               | Function pointer to address cast                      |
| Closure [^no-capture] | Function pointer      | Closure to function pointer cast                      |

### Semantics

r[expr.as.numeric]
#### Numeric cast

r[expr.as.numeric.int-same-size]
* Casting between two integers of the same size (e.g. i32 -> u32) is a no-op (Rust uses 2's complement for negative values of fixed integers)

  ```rust
  assert_eq!(42i8 as u8, 42u8);
  assert_eq!(-1i8 as u8, 255u8);
  assert_eq!(255u8 as i8, -1i8);
  assert_eq!(-1i16 as u16, 65535u16);
  ```

r[expr.as.numeric.int-truncation]
* Casting from a larger integer to a smaller integer (e.g. u32 -> u8) will truncate

  ```rust
  assert_eq!(42u16 as u8, 42u8);
  assert_eq!(1234u16 as u8, 210u8);
  assert_eq!(0xabcdu16 as u8, 0xcdu8);

  assert_eq!(-42i16 as i8, -42i8);
  assert_eq!(1234u16 as i8, -46i8);
  assert_eq!(0xabcdi32 as i8, -51i8);
  ```

r[expr.as.numeric.int-extension]
* Casting from a smaller integer to a larger integer (e.g. u8 -> u32) will
    * zero-extend if the source is unsigned
    * sign-extend if the source is signed

  ```rust
  assert_eq!(42i8 as i16, 42i16);
  assert_eq!(-17i8 as i16, -17i16);
  assert_eq!(0b1000_1010u8 as u16, 0b0000_0000_1000_1010u16, "Zero-extend");
  assert_eq!(0b0000_1010i8 as i16, 0b0000_0000_0000_1010i16, "Sign-extend 0");
  assert_eq!(0b1000_1010u8 as i8 as i16, 0b1111_1111_1000_1010u16 as i16, "Sign-extend 1");
  ```

r[expr.as.numeric.float-as-int]
* Casting from a float to an integer will round the float towards zero
    * `NaN` will return `0`
    * Values larger than the maximum integer value, including `INFINITY`, will saturate to the maximum value of the integer type.
    * Values smaller than the minimum integer value, including `NEG_INFINITY`, will saturate to the minimum value of the integer type.

  ```rust
  assert_eq!(42.9f32 as i32, 42);
  assert_eq!(-42.9f32 as i32, -42);
  assert_eq!(42_000_000f32 as i32, 42_000_000);
  assert_eq!(f32::NAN as i32, 0);
  assert_eq!(1_000_000_000_000_000f32 as i32, 0x7fffffffi32);
  assert_eq!(f32::NEG_INFINITY as i32, -0x80000000i32);
  ```

r[expr.as.numeric.int-as-float]
* Casting from an integer to float will produce the closest possible float \*
    * if necessary, rounding is according to `roundTiesToEven` mode \*\*\*
    * on overflow, infinity (of the same sign as the input) is produced
    * note: with the current set of numeric types, overflow can only happen on `u128 as f32` for values greater or equal to `f32::MAX + (0.5 ULP)`

  ```rust
  assert_eq!(1337i32 as f32, 1337f32);
  assert_eq!(123_456_789i32 as f32, 123_456_790f32, "Rounded");
  assert_eq!(0xffffffff_ffffffff_ffffffff_ffffffff_u128 as f32, f32::INFINITY);
  ```

r[expr.as.numeric.float-widening]
* Casting from an f32 to an f64 is perfect and lossless

  ```rust
  assert_eq!(1_234.5f32 as f64, 1_234.5f64);
  assert_eq!(f32::INFINITY as f64, f64::INFINITY);
  assert!((f32::NAN as f64).is_nan());
  ```

r[expr.as.numeric.float-narrowing]
* Casting from an f64 to an f32 will produce the closest possible f32 \*\*
    * if necessary, rounding is according to `roundTiesToEven` mode \*\*\*
    * on overflow, infinity (of the same sign as the input) is produced

  ```rust
  assert_eq!(1_234.5f64 as f32, 1_234.5f32);
  assert_eq!(1_234_567_891.123f64 as f32, 1_234_567_890f32, "Rounded");
  assert_eq!(f64::INFINITY as f32, f32::INFINITY);
  assert!((f64::NAN as f32).is_nan());
  ```

\* if integer-to-float casts with this rounding mode and overflow behavior are not supported natively by the hardware, these casts will likely be slower than expected.

\*\* if f64-to-f32 casts with this rounding mode and overflow behavior are not supported natively by the hardware, these casts will likely be slower than expected.

\*\*\* as defined in IEEE 754-2008 &sect;4.3.1: pick the nearest floating point number, preferring the one with an even least significant digit if exactly halfway between two floating point numbers.

r[expr.as.enum]
#### Enum cast

r[expr.as.enum.discriminant]
Casts an enum to its discriminant, then uses a numeric cast if needed. Casting is limited to the following kinds of enumerations:

* [Unit-only enums]
* [Field-less enums] without [explicit discriminants], or where only unit-variants have explicit discriminants

```rust
enum Enum { A, B, C }
assert_eq!(Enum::A as i32, 0);
assert_eq!(Enum::B as i32, 1);
assert_eq!(Enum::C as i32, 2);
```

r[expr.as.enum.no-drop]
Casting is not allowed if the enum implements [`Drop`].

r[expr.as.bool-char-as-int]
#### Primitive to integer cast

* `false` casts to `0`, `true` casts to `1`
* `char` casts to the value of the code point, then uses a numeric cast if needed.

```rust
assert_eq!(false as i32, 0);
assert_eq!(true as i32, 1);
assert_eq!('A' as i32, 65);
assert_eq!('Ö' as i32, 214);
```

r[expr.as.u8-as-char]
#### `u8` to `char` cast

Casts to the `char` with the corresponding code point.

```rust
assert_eq!(65u8 as char, 'A');
assert_eq!(214u8 as char, 'Ö');
```

r[expr.as.pointer-as-int]
#### Pointer to address cast

Casting from a raw pointer to an integer produces the machine address of the referenced memory. If the integer type is smaller than the pointer type, the address may be truncated; using `usize` avoids this.

r[expr.as.int-as-pointer]
#### Address to pointer cast

Casting from an integer to a raw pointer interprets the integer as a memory address and produces a pointer referencing that memory.

> **Warning:**
> This interacts with the Rust memory model, which is still under development.
> A pointer obtained from this cast may suffer additional restrictions even if it is bitwise equal to a valid pointer.
> Dereferencing such a pointer may be [undefined behavior] if aliasing rules are not followed.

A trivial example of sound address arithmetic:

```rust
let mut values: [i32; 2] = [1, 2];
let p1: *mut i32 = values.as_mut_ptr();
let first_address = p1 as usize;
let second_address = first_address + 4; // 4 == size_of::<i32>()
let p2 = second_address as *mut i32;
unsafe {
    *p2 += 1;
}
assert_eq!(values[1], 3);
```

r[expr.as.pointer]
#### Pointer-to-pointer cast

r[expr.as.pointer.behavior]
`*const T` / `*mut T` can be cast to `*const U` / `*mut U` with the following behavior:

r[expr.as.pointer.sized]
- If `T` and `U` are both sized, the pointer is returned unchanged.

  > [!EXAMPLE]
  > ```rust
  > let x: i32 = 42;
  > let p1: *const i32 = &x;
  > let p2: *const u8 = p1 as *const u8;
  > // The pointer address remains the same.
  > assert_eq!(p1 as usize, p2 as usize);
  > ```

r[expr.as.pointer.discard-metadata]
- If `T` is unsized and `U` is sized, the cast discards all [metadata] that completes the wide pointer `T` and produces a thin pointer `U` consisting of the data part of the unsized pointer.

  > [!EXAMPLE]
  > ```rust
  > let slice: &[i32] = &[1, 2, 3];
  > let ptr: *const [i32] = slice as *const [i32];
  > // Cast from wide pointer (*const [i32]) to thin pointer (*const i32)
  > // discarding the length metadata.
  > let data_ptr: *const i32 = ptr as *const i32;
  > assert_eq!(unsafe { *data_ptr }, 1);
  > ```

r[expr.as.pointer.unsized.unchanged]
- If `T` and `U` are both unsized, the pointer is also returned unchanged. In particular, the metadata is preserved exactly. The cast can only be performed if the metadata is compatible according to the below rules:

r[expr.as.pointer.unsized.slice]
- When `T` and `U` are unsized with slice metadata, they are always compatible. The metadata of a slice is the number of elements, so casting `*[u16] -> *[u8]` is legal but will result in reducing the number of bytes by half.

  > [!EXAMPLE]
  > ```rust
  > let slice: &[u16] = &[1, 2, 3];
  > let ptr: *const [u16] = slice as *const [u16];
  > let byte_ptr: *const [u8] = ptr as *const [u8];
  > assert_eq!(byte_ptr.len(), 3);
  > ```

r[expr.as.pointer.unsized.trait]
- When `T` and `U` are unsized with trait object metadata, the metadata is compatible only when all of the following holds:
  1. The principal trait must be the same.

     > [!EXAMPLE]
     > ```rust,compile_fail,E0606
     > trait Foo {}
     > trait Bar {}
     > impl Foo for i32 {}
     > impl Bar for i32 {}
     >
     > let x: i32 = 42;
     > let ptr_foo: *const dyn Foo = &x as *const dyn Foo;
     > // You can't cast to a different principal trait.
     > let ptr_bar: *const dyn Bar = ptr_foo as *const dyn Bar; // ERROR
     > ```

  2. Auto traits may be removed.

     > [!EXAMPLE]
     > ```rust
     > trait Foo {}
     > struct S;
     > impl Foo for S {}
     > unsafe impl Send for S {}
     >
     > let s = S;
     > let ptr_send: *const (dyn Foo + Send) = &s;
     > // Removing an auto trait.
     > let ptr_no_send: *const dyn Foo = ptr_send as *const dyn Foo;
     > ```

  3. Auto traits may be added only if they are a super trait of the principal trait.

     > [!EXAMPLE]
     > ```rust
     > trait Foo: Send {}
     > struct S;
     > impl Foo for S {}
     > unsafe impl Send for S {}
     >
     > let s = S;
     > let ptr_no_send: *const dyn Foo = &s;
     > // Adding an auto trait.
     > let ptr_send: *const (dyn Foo + Send) = ptr_no_send as *const (dyn Foo + Send);
     > ```
     >
     > ```rust,compile_fail,E0804
     > trait Foo {}
     > # struct S;
     > # impl Foo for S {}
     > # unsafe impl Send for S {}
     > #
     > # let s = S;
     > # let ptr_no_send: *const dyn Foo = &s;
     > // Same as above, except trait Foo does not have Send as a super trait.
     > let ptr_send: *const (dyn Foo + Send) = ptr_no_send as *const (dyn Foo + Send); // ERROR
     > ```

  4. Trailing lifetimes may only be shortened.

     > [!EXAMPLE]
     > ```rust
     > trait Foo {}
     >
     > fn shorten_lifetime<'long: 'short, 'short>(
     >     ptr: *const (dyn Foo + 'long),
     > ) -> *const (dyn Foo + 'short) {
     >     // Shortening the lifetime is allowed.
     >     ptr as *const (dyn Foo + 'short)
     > }
     > ```
     >
     > ```rust,compile_fail
     > trait Foo {}
     >
     > fn lengthen_lifetime<'long: 'short, 'short>(
     >     ptr: *const (dyn Foo + 'short),
     > ) -> *const (dyn Foo + 'long) {
     >     // It is not allowed to cast to a longer lifetime.
     >     ptr as *const (dyn Foo + 'long) // ERROR
     > }
     > ```

  5. Generics (including lifetimes) and associated types must match exactly.

     > [!EXAMPLE]
     > ```rust,compile_fail,E0606
     > trait Generic<T> {}
     > impl Generic<i32> for () {}
     > impl Generic<u32> for () {}
     >
     > let x = ();
     > let ptr_i32: *const dyn Generic<i32> = &x;
     > // You can't cast to a different generic parameter.
     > let ptr_u32: *const dyn Generic<u32> = ptr_i32 as *const dyn Generic<u32>; // ERROR
     > ```
     >
     > ```rust
     > trait HasType {
     >     type Output;
     > }
     >
     > trait Generic<'x, T> {}
     >
     > fn cast_via_associated<'a, 'b, A, B>(
     >     ptr: *const dyn Generic<'a, A::Output>,
     > ) -> *const dyn Generic<'b, B::Output>
     > where
     >     'a: 'b,
     >     'b: 'a,
     >     A: HasType,
     >     B: HasType<Output = A::Output>, // Forces equality
     > {
     >     ptr as *const dyn Generic<'b, B::Output>
     > }
     > ```

r[expr.as.pointer.unsized.compound]
- When `T` or `U` is a struct or tuple type whose last field is unsized, it has the same metadata and compatibility rules as its last field.

  > [!EXAMPLE]
  > ```rust
  > struct Wrapper(u32, [u8]);
  >
  > let slice: &[u8] = &[1, 2, 3];
  > let ptr: *const [u8] = slice;
  >
  > // The metadata (length 3) is preserved when casting to a struct
  > // where the last field is the unsized type `[u8]`.
  > let wrapper_ptr: *const Wrapper = ptr as *const Wrapper;
  >
  > // And preserved when casting back.
  > let ptr_back: *const [u8] = wrapper_ptr as *const [u8];
  > assert_eq!(ptr_back.len(), 3);
  > ```

r[expr.assign]
