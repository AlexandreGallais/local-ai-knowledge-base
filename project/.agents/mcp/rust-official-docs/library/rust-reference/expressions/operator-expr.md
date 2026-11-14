---
title: "Operator expressions (part 1 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/operator-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[expr.operator]
# Operator expressions

r[expr.operator.syntax]
```grammar
OperatorExpression ->
      BorrowExpression
    | DereferenceExpression
    | TryPropagationExpression
    | NegationExpression
    | ArithmeticOrLogicalExpression
    | ComparisonExpression
    | LazyBooleanExpression
    | TypeCastExpression
    | AssignmentExpression
    | CompoundAssignmentExpression
```

r[expr.operator.intro]
Operators are defined for built in types by the Rust language.

r[expr.operator.trait]
Many of the following operators can also be overloaded using traits in `std::ops` or `std::cmp`.

r[expr.operator.int-overflow]
## Overflow

r[expr.operator.int-overflow.intro]
Integer operators will panic when they overflow when compiled in debug mode. The `-C debug-assertions` and `-C overflow-checks` compiler flags can be used to control this more directly. The following things are considered to be overflow:

r[expr.operator.int-overflow.binary-arith]
* When `+`, `*` or binary `-` create a value greater than the maximum value, or less than the minimum value that can be stored.

r[expr.operator.int-overflow.unary-neg]
* Applying unary `-` to the most negative value of any signed integer type, unless the operand is a [literal expression] (or a literal expression standing alone inside one or more grouped expressions).

r[expr.operator.int-overflow.div]
* Using `/` or `%`, where the left-hand argument is the smallest integer of a signed integer type and the right-hand argument is `-1`. These checks occur even when `-C overflow-checks` is disabled, for legacy reasons.

r[expr.operator.int-overflow.shift]
* Using `<<` or `>>` where the right-hand argument is greater than or equal to the number of bits in the type of the left-hand argument, or is negative.

> **Note:**
> The exception for literal expressions behind unary `-` means that forms such as `-128_i8` or `let j: i8 = -(128)` never cause a panic and have the expected value of -128.
>
> In these cases, the literal expression already has the most negative value for its type (for example, `128_i8` has the value -128) because integer literals are truncated to their type per the description in Integer literal expressions.
>
> Negation of these most negative values leaves the value unchanged due to two's complement overflow conventions.
>
> In `rustc`, these most negative expressions are also ignored by the `overflowing_literals` lint check.

r[expr.operator.borrow]
## Borrow operators

r[expr.operator.borrow.syntax]
```grammar
BorrowExpression ->
      (`&`|`&&`) Expression
    | (`&`|`&&`) `mut` Expression
    | (`&`|`&&`) `raw` `const` Expression
    | (`&`|`&&`) `raw` `mut` Expression
```

r[expr.operator.borrow.intro]
The `&` (shared borrow) and `&mut` (mutable borrow) operators are unary prefix operators.

r[expr.operator.borrow.result]
When applied to a [place expression], this expressions produces a reference (pointer) to the location that the value refers to.

r[expr.operator.borrow.lifetime]
The memory location is also placed into a borrowed state for the duration of the reference. For a shared borrow (`&`), this implies that the place may not be mutated, but it may be read or shared again. For a mutable borrow (`&mut`), the place may not be accessed in any way until the borrow expires.

r[expr.operator.borrow.mut]
`&mut` evaluates its operand in a mutable place expression context.

r[expr.operator.borrow.temporary]
If the `&` or `&mut` operators are applied to a [value expression], then a [temporary value] is created.

These operators cannot be overloaded.

```rust
{
    // a temporary with value 7 is created that lasts for this scope.
    let shared_reference = &7;
}
let mut array = [-2, 3, 9];
{
    // Mutably borrows `array` for this scope.
    // `array` may only be used through `mutable_reference`.
    let mutable_reference = &mut array;
}
```

r[expr.borrow.and-and-syntax]
Even though `&&` is a single token (the lazy '<example-value>' operator), when used in the context of borrow expressions it works as two borrows:

```rust
// same meanings:
let a = &&  10;
let a = & & 10;

// same meanings:
let a = &&&&  mut 10;
let a = && && mut 10;
let a = & & & & mut 10;
```

r[expr.borrow.raw]
### Raw borrow operators

r[expr.borrow.raw.intro]
`&raw const` and `&raw mut` are the *raw borrow operators*.

r[expr.borrow.raw.place]
The operand expression of these operators is evaluated in place expression context.

r[expr.borrow.raw.result]
`&raw const expr` then creates a const raw pointer of type `*const T` to the given place, and `&raw mut expr` creates a mutable raw pointer of type `*mut T`.

r[expr.borrow.raw.invalid-ref]
The raw borrow operators must be used instead of a borrow operator whenever the place expression could evaluate to a place that is not properly aligned or does not store a valid value as determined by its type, or whenever creating a reference would introduce incorrect aliasing assumptions. In those situations, using a borrow operator would cause [undefined behavior] by creating an invalid reference, but a raw pointer may still be constructed.

The following is an example of creating a raw pointer to an unaligned place through a `packed` struct:

```rust
#[repr(packed)]
struct Packed {
    f1: u8,
    f2: u16,
}

let packed = Packed { f1: 1, f2: 2 };
// `&packed.f2` would create an unaligned reference, and thus be undefined behavior!
let raw_f2 = &raw const packed.f2;
assert_eq!(unsafe { raw_f2.read_unaligned() }, 2);
```

The following is an example of creating a raw pointer to a place that does not contain a valid value:

```rust
use std::mem::MaybeUninit;

struct Demo {
    field: bool,
}

let mut uninit = MaybeUninit::<Demo>::uninit();
// `&uninit.as_mut().field` would create a reference to an uninitialized `bool`,
// and thus be undefined behavior!
let f1_ptr = unsafe { &raw mut (*uninit.as_mut_ptr()).field };
unsafe { f1_ptr.write(true); }
let init = unsafe { uninit.assume_init() };
```

r[expr.deref]
## The dereference operator

r[expr.deref.syntax]
```grammar
DereferenceExpression -> `*` Expression
```

r[expr.deref.intro]
The `*` (dereference) operator is also a unary prefix operator.

r[expr.deref.result]
When applied to a pointer or [`Box`], it denotes the pointed-to location.

r[expr.deref.mut]
If the expression is of type `&mut T`, `*mut T`, or `Box<T>`, and is either a local variable, a (nested) field of a local variable or is a mutable [place expression], then the resulting memory location can be assigned to.

r[expr.deref.box]
When applied to a [`Box`], the resultant place may be [moved from].

r[expr.deref.safety]
Dereferencing a raw pointer requires `unsafe`.

r[expr.deref.traits]
On non-pointer types `*x` is equivalent to `*std::ops::Deref::deref(&x)` in an immutable place expression context and `*std::ops::DerefMut::deref_mut(&mut x)` in a mutable place expression context, except that when `*x` undergoes [temporary lifetime extension], the dereferenced expression `x` also has its [temporary scope] extended.

```rust
# struct NoCopy;
let a = &7;
assert_eq!(*a, 7);
let b = &mut 9;
*b = 11;
assert_eq!(*b, 11);
let c = Box::new(NoCopy);
let d: NoCopy = *c;
```

```rust
// The temporary holding the result of `String::new()` is extended
// to live to the end of the block, so `x` may be used in subsequent
// statements.
let x = &*String::new();
# x;
```

```rust
// The temporary holding the result of `String::new()` is dropped at
// the end of the statement, so it's an error to use `y` after.
let y = &*std::ops::Deref::deref(&String::new()); // ERROR
# y;
```

r[expr.try]
## The try propagation expression

r[expr.try.syntax]
```grammar
TryPropagationExpression -> Expression `?`
```

r[expr.try.intro]
The try propagation expression uses the value of the inner expression and the [`Try`] trait to decide whether to produce a value, and if so, what value to produce, or whether to return a value to the caller, and if so, what value to return.

> [!EXAMPLE]
> ```rust
> # use std::num::ParseIntError;
> fn try_to_parse() -> Result<i32, ParseIntError> {
>     let x: i32 = "123".parse()?; // `x` is `123`.
>     let y: i32 = "24a".parse()?; // Returns an `Err()` immediately.
>     Ok(x + y)                    // Doesn't run.
> }
>
> let res = try_to_parse();
> println!("{res:?}");
> # assert!(res.is_err())
> ```
>
> ```rust
> fn try_option_some() -> Option<u8> {
>     let val = Some(1)?;
>     Some(val)
> }
> assert_eq!(try_option_some(), Some(1));
>
> fn try_option_none() -> Option<u8> {
>     let val = None?;
>     Some(val)
> }
> assert_eq!(try_option_none(), None);
> ```
>
> ```rust
> use std::ops::ControlFlow;
>
> pub struct TreeNode<T> {
>     value: T,
>     left: Option<Box<TreeNode<T>>>,
>     right: Option<Box<TreeNode<T>>>,
> }
>
> impl<T> TreeNode<T> {
>     pub fn traverse_inorder(&self, f: &mut impl FnMut(&T) -> ControlFlow) -> ControlFlow {
>         if let Some(left) = &self.left {
>             left.traverse_inorder(f)?;
>         }
>         f(&self.value)?;
>         if let Some(right) = &self.right {
>             right.traverse_inorder(f)?;
>         }
>         ControlFlow::Continue(())
>     }
> }
> #
> # fn main() {
> #     let n = TreeNode {
> #         value: 1,
> #         left: Some(Box::new(TreeNode{value: 2, left: None, right: None})),
> #         right: None,
> #     };
> #     let v = n.traverse_inorder(&mut |t| {
> #         if *t == 2 {
> #             ControlFlow::Break("found")
> #         } else {
> #             ControlFlow::Continue(())
> #         }
> #     });
> #     assert_eq!(v, ControlFlow::Break("found"));
> # }
> ```

> **Note:**
> The [`Try`] trait is currently unstable, and thus cannot be implemented for user types.
>
> The try propagation expression is currently roughly equivalent to:
>
> ```rust
> # #![ feature(try_trait_v2) ]
> # fn example() -> Result<(), ()> {
> # let expr = Ok(());
> match core::ops::Try::branch(expr) {
>     core::ops::ControlFlow::Continue(val) => val,
>     core::ops::ControlFlow::Break(residual) =>
>         return core::ops::FromResidual::from_residual(residual),
> }
> # Ok(())
> # }
> ```

> **Note:**
> The try propagation operator is sometimes called *the question mark operator*, *the `?` operator*, or *the try operator*.

r[expr.try.restricted-types]
The try propagation operator can be applied to expressions with the type of:

- [`Result<T, E>`]
    - `Result::Ok(val)` evaluates to `val`.
    - `Result::Err(e)` returns `Result::Err(From::from(e))`.
- [`Option<T>`]
    - `Option::Some(val)` evaluates to `val`.
    - `Option::None` returns `Option::None`.
- `ControlFlow`
    - `ControlFlow::Continue(c)` evaluates to `c`.
    - `ControlFlow::Break(b)` returns `ControlFlow::Break(b)`.
- `Poll<Result<T, E>>`
    - `Poll::Ready(Ok(val))` evaluates to `Poll::Ready(val)`.
    - `Poll::Ready(Err(e))` returns `Poll::Ready(Err(From::from(e)))`.
    - `Poll::Pending` evaluates to `Poll::Pending`.
- `Poll<Option<Result<T, E>>>`
    - `Poll::Ready(Some(Ok(val)))` evaluates to `Poll::Ready(Some(val))`.
    - `Poll::Ready(Some(Err(e)))` returns `Poll::Ready(Some(Err(From::from(e))))`.
    - `Poll::Ready(None)` evaluates to `Poll::Ready(None)`.
    - `Poll::Pending` evaluates to `Poll::Pending`.

r[expr.negate]
## Negation operators

r[expr.negate.syntax]
```grammar
NegationExpression ->
      `-` Expression
    | `!` Expression
```

r[expr.negate.intro]
These are the last two unary operators.

r[expr.negate.results]
This table summarizes the behavior of them on primitive types and which traits are used to overload these operators for other types. Remember that signed integers are always represented using two's complement. The operands of all of these operators are evaluated in value expression context so are moved or copied.

| Symbol | Integer     | `bool`        | Floating Point | Overloading Trait  |
|--------|-------------|-------------- |----------------|--------------------|
| `-`    | Negation*   |               | Negation       | `std::ops::Neg`    |
| `!`    | Bitwise NOT | [Logical NOT] |                | `std::ops::Not`    |

\* Only for signed integer types.

Here are some example of these operators

```rust
let x = 6;
assert_eq!(-x, -6);
assert_eq!(!x, -7);
assert_eq!(true, !false);
```

r[expr.arith-logic]
