---
title: "Literal expressions (part 2 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/literal-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Literal expressions (part 2 of 2)

## Integer literal expressions

r[expr.literal.int.intro]
An integer literal expression consists of a single [INTEGER_LITERAL] token.

r[expr.literal.int.suffix]
If the token has a [suffix], the suffix must be the name of one of the primitive integer types: `u8`, `i8`, `u16`, `i16`, `u32`, `i32`, `u64`, `i64`, `u128`, `i128`, `usize`, or `isize`, and the expression has that type.

r[expr.literal.int.infer]
If the token has no suffix, the expression's type is determined by type inference:

r[expr.literal.int.inference-unique-type]
* If an integer type can be _uniquely_ determined from the surrounding program context, the expression has that type.

r[expr.literal.int.inference-default]
* If the program context under-constrains the type, it defaults to the signed 32-bit integer `i32`.

r[expr.literal.int.inference-error]
* If the program context over-constrains the type, it is considered a static type error.

Examples of integer literal expressions:

```rust
123;                               // type i32
123i32;                            // type i32
123u32;                            // type u32
123_u32;                           // type u32
let a: u64 = 123;                  // type u64

0xff;                              // type i32
0xff_u8;                           // type u8

0o70;                              // type i32
0o70_i16;                          // type i16

0b1111_1111_1001_0000;             // type i32
0b1111_1111_1001_0000i64;          // type i64

0usize;                            // type usize
```

r[expr.literal.int.representation]
The value of the expression is determined from the string representation of the token as follows:

r[expr.literal.int.radix]
* An integer radix is chosen by inspecting the first two characters of the string, as follows:

    * `0b` indicates radix 2
    * `0o` indicates radix 8
    * `0x` indicates radix 16
    * otherwise the radix is 10.

r[expr.literal.int.radix-prefix-stripped]
* If the radix is not 10, the first two characters are removed from the string.

r[expr.literal.int.type-suffix-stripped]
* Any suffix is removed from the string.

r[expr.literal.int.separators-stripped]
* Any underscores are removed from the string.

r[expr.literal.int.u128-value]
* The string is converted to a `u128` value as if by [`u128::from_str_radix`] with the chosen radix. If the value does not fit in `u128`, it is a compiler error.

r[expr.literal.int.cast]
* The `u128` value is converted to the expression's type via a [numeric cast].

> **Note:**
> The final cast will truncate the value of the literal if it does not fit in the expression's type. `rustc` includes a [lint check] named `overflowing_literals`, defaulting to `deny`, which rejects expressions where this occurs.

> **Note:**
> `-1i8`, for example, is an application of the [negation operator] to the literal expression `1i8`, not a single integer literal expression. See [Overflow] for notes on representing the most negative value for a signed type.

r[expr.literal.float]
## Floating-point literal expressions

r[expr.literal.float.intro]
A floating-point literal expression has one of two forms:
 * a single [FLOAT_LITERAL] token
 * a single [INTEGER_LITERAL] token which has a suffix and no radix indicator

r[expr.literal.float.suffix]
If the token has a [suffix], the suffix must be the name of one of the primitive floating-point types: `f32` or `f64`, and the expression has that type.

r[expr.literal.float.infer]
If the token has no suffix, the expression's type is determined by type inference:

r[expr.literal.float.inference-unique-type]
* If a floating-point type can be _uniquely_ determined from the surrounding program context, the expression has that type.

r[expr.literal.float.inference-default]
* If the program context under-constrains the type, it defaults to `f64`.

r[expr.literal.float.inference-error]
* If the program context over-constrains the type, it is considered a static type error.

Examples of floating-point literal expressions:

```rust
123.0f64;        // type f64
0.1f64;          // type f64
0.1f32;          // type f32
12E+99_f64;      // type f64
5f32;            // type f32
let x: f64 = 2.; // type f64
```

r[expr.literal.float.result]
The value of the expression is determined from the string representation of the token as follows:

r[expr.literal.float.type-suffix-stripped]
* Any suffix is removed from the string.

r[expr.literal.float.separators-stripped]
* Any underscores are removed from the string.

r[expr.literal.float.value]
* The string is converted to the expression's type as if by [`f32::from_str`] or [`f64::from_str`].

> **Note:**
> `-1.0`, for example, is an application of the [negation operator] to the literal expression `1.0`, not a single floating-point literal expression.

> **Note:**
> `inf` and `NaN` are not literal tokens. The [`f32::INFINITY`], [`f64::INFINITY`], [`f32::NAN`], and [`f64::NAN`] constants can be used instead of literal expressions. In `rustc`, a literal large enough to be evaluated as infinite will trigger the `overflowing_literals` lint check.

r[expr.literal.bool]
## Boolean literal expressions

r[expr.literal.bool.intro]
A boolean literal expression consists of one of the keywords `true` or `false`.

r[expr.literal.bool.result]
The expression's type is the primitive [boolean type], and its value is:
 * true if the keyword is `true`
 * false if the keyword is `false`
