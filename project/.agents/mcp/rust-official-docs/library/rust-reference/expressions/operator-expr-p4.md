---
title: "Operator expressions (part 4 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/operator-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Operator expressions (part 4 of 4)

## Assignment expressions

r[expr.assign.syntax]
```grammar
AssignmentExpression -> Expression `=` Expression
```

r[expr.assign.intro]
An *assignment expression* moves a value into a specified place.

r[expr.assign.assignee]
An assignment expression consists of a [mutable] [assignee expression], the *assignee operand*, followed by an equals sign (`=`) and a [value expression], the *assigned value operand*.

r[expr.assign.behavior-basic]
In its most basic form, an assignee expression is a [place expression], and we discuss this case first.

r[expr.assign.behavior-destructuring]
The more general case of destructuring assignment is discussed below, but this case always decomposes into sequential assignments to place expressions, which may be considered the more fundamental case.

r[expr.assign.basic]
### Basic <example-value>

r[expr.assign.evaluation-order]
Evaluating assignment expressions begins by evaluating its operands. The assigned value operand is evaluated first, followed by the assignee expression.

r[expr.assign.destructuring-order]
For destructuring assignment, subexpressions of the assignee expression are evaluated left-to-right.

> **Note:**
> This is different than other expressions in that the right operand is evaluated before the left one.

r[expr.assign.drop-target]
It then has the effect of first [dropping] the value at the assigned place, unless the place is an uninitialized local variable or an uninitialized field of a local variable.

r[expr.assign.behavior]
Next it either [copies or moves] the assigned value to the assigned place.

r[expr.assign.result]
An assignment expression always produces the unit value.

Example:

```rust
let mut x = 0;
let y = 0;
x = y;
```

r[expr.assign.destructure]
### Destructuring assignments

r[expr.assign.destructure.intro]
Destructuring assignment is a counterpart to destructuring pattern matches for variable declaration, permitting assignment to complex values, such as tuples or structs. For instance, we may swap two mutable variables:

```rust
let (mut a, mut b) = (0, 1);
// Swap `a` and `b` using destructuring assignment.
(b, a) = (a, b);
```

r[expr.assign.destructure.assignee]
In contrast to destructuring declarations using `let`, patterns may not appear on the left-hand side of an assignment due to syntactic ambiguities. Instead, a group of expressions that correspond to patterns are designated to be assignee expressions, and permitted on the left-hand side of an assignment. Assignee expressions are then desugared to pattern matches followed by sequential assignment.

r[expr.assign.destructure.irrefutable]
The desugared patterns must be irrefutable: in particular, this means that only slice patterns whose length is known at compile-time, and the trivial slice `[..]`, are permitted for destructuring assignment.

The desugaring method is straightforward, and is illustrated best by example.

```rust
# struct Struct { x: u32, y: u32 }
# let (mut a, mut b) = (0, 0);
(a, b) = (3, 4);

[a, b] = [3, 4];

Struct { x: a, y: b } = Struct { x: 3, y: 4};

// desugars to:

{
    let (_a, _b) = (3, 4);
    a = _a;
    b = _b;
}

{
    let [_a, _b] = [3, 4];
    a = _a;
    b = _b;
}

{
    let Struct { x: _a, y: _b } = Struct { x: 3, y: 4};
    a = _a;
    b = _b;
}
```

r[expr.assign.destructure.repeat-ident]
Identifiers are not forbidden from being used multiple times in a single assignee expression.

r[expr.assign.destructure.discard-value]
[Underscore expressions] and empty [range expressions] may be used to ignore certain values, without binding them.

r[expr.assign.destructure.default-binding]
Note that default binding modes do not apply for the desugared expression.

r[expr.assign.destructure.tmp-scopes]
> **Note:**
> The desugaring restricts the [temporary scope] of the assigned value operand (the RHS) of a destructuring assignment.
>
> In a basic <example-value>, the [temporary] is dropped at the end of the enclosing temporary scope. Below, that's the statement. Therefore, the assignment and use is allowed.
>
> ```rust
> # fn temp() {}
> fn f<T>(x: T) -> T { x }
> let x;
> (x = f(&temp()), x); // OK
> ```
>
> Conversely, in a destructuring assignment, the temporary is dropped at the end of the `let` statement in the desugaring. As that happens before we try to assign to `x`, below, it fails.
>
> ```rust,compile_fail,E0716
> # fn temp() {}
> # fn f<T>(x: T) -> T { x }
> # let x;
> [x] = [f(&temp())]; // ERROR
> ```
>
> This desugars to:
>
> ```rust,compile_fail,E0716
> # fn temp() {}
> # fn f<T>(x: T) -> T { x }
> # let x;
> {
>     let [_x] = [f(&temp())];
>     //                     ^
>     //      The temporary is dropped here.
>     x = _x; // ERROR
> }
> ```

r[expr.assign.destructure.tmp-ext]
> **Note:**
> Due to the desugaring, the assigned value operand (the RHS) of a destructuring assignment is an [extending expression] within a newly-introduced block.
>
> Below, because the [temporary scope] is extended to the end of this introduced block, the assignment is allowed.
>
> ```rust
> # fn temp() {}
> # let x;
> [x] = [&temp()]; // OK
> ```
>
> This desugars to:
>
> ```rust
> # fn temp() {}
> # let x;
> { let [_x] = [&temp()]; x = _x; } // OK
> ```
>
> However, if we try to use `x`, even within the same statement, we'll get an error because the [temporary] is dropped at the end of this introduced block.
>
> ```rust,compile_fail,E0716
> # fn temp() {}
> # let x;
> ([x] = [&temp()], x); // ERROR
> ```
>
> This desugars to:
>
> ```rust,compile_fail,E0716
> # fn temp() {}
> # let x;
> (
>     {
>         let [_x] = [&temp()];
>         x = _x;
>     }, // <-- The temporary is dropped here.
>     x, // ERROR
> );
> ```

r[expr.compound-assign]
## Compound assignment expressions

r[expr.compound-assign.syntax]
```grammar
CompoundAssignmentExpression ->
      Expression `+=` Expression
    | Expression `-=` Expression
    | Expression `*=` Expression
    | Expression `/=` Expression
    | Expression `%=` Expression
    | Expression `&=` Expression
    | Expression `|=` Expression
    | Expression `^=` Expression
    | Expression `<<=` Expression
    | Expression `>>=` Expression
```

r[expr.compound-assign.intro]
*Compound assignment expressions* combine arithmetic and logical binary operators with assignment expressions.

For example:

```rust
let mut x = 5;
x += 1;
assert!(x == 6);
```

The syntax of compound assignment is a [mutable] [place expression], the *assigned operand*, then one of the operators followed by an `=` as a single token (no whitespace), and then a [value expression], the *modifying operand*.

r[expr.compound-assign.place]
Unlike other place operands, the assigned place operand must be a place expression.

r[expr.compound-assign.no-value]
Attempting to use a value expression is a compiler error rather than promoting it to a temporary.

r[expr.compound-assign.operand-order]
Evaluation of compound assignment expressions depends on the types of the operands.

r[expr.compound-assign.primitives]
If the types of both operands are known, prior to monomorphization, to be primitive, the right hand side is evaluated first, the left hand side is evaluated next, and the place given by the evaluation of the left hand side is mutated by applying the operator to the values of both sides.

```rust
# use core::{num::Wrapping, ops::AddAssign};
#
trait Equate {}
impl<T> Equate for (T, T) {}

fn f1(x: (u8,)) {
    let mut order = vec![];
    // The RHS is evaluated first as both operands are of primitive
    // type.
    { order.push(2); x }.0 += { order.push(1); x }.0;
    assert!(order.is_sorted());
}

fn f2(x: (Wrapping<u8>,)) {
    let mut order = vec![];
    // The LHS is evaluated first as `Wrapping<_>` is not a primitive
    // type.
    { order.push(1); x }.0 += { order.push(2); (0u8,) }.0;
    assert!(order.is_sorted());
}

fn f3<T: AddAssign<u8> + Copy>(x: (T,)) where (T, u8): Equate {
    let mut order = vec![];
    // The LHS is evaluated first as one of the operands is a generic
    // parameter, even though that generic parameter can be unified
    // with a primitive type due to the where clause bound.
    { order.push(1); x }.0 += { order.push(2); (0u8,) }.0;
    assert!(order.is_sorted());
}

fn main() {
    f1((0u8,));
    f2((Wrapping(0u8),));
    // We supply a primitive type as the generic argument, but this
    // does not affect the evaluation order in `f3` when
    // monomorphized.
    f3::<u8>((0u8,));
}
```

> **Note:**
> This is unusual. Elsewhere left to right evaluation is the norm.
>
> See the [eval order test] for more examples.

r[expr.compound-assign.trait]
Otherwise, this expression is syntactic sugar for using the corresponding trait for the operator (see [expr.arith-logic.behavior]) and calling its method with the left hand side as the [receiver] and the right hand side as the next argument.

For example, the following two statements are equivalent:

```rust
# use std::ops::AddAssign;
fn f<T: AddAssign + Copy>(mut x: T, y: T) {
    x += y; // Statement 1.
    x.add_assign(y); // Statement 2.
}
```

> **Note:**
> Surprisingly, desugaring this further to a fully qualified method call is not equivalent, as there is special borrow checker behavior when the mutable reference to the first operand is taken via [autoref].
>
> ```rust
> # use std::ops::AddAssign;
> fn f<T: AddAssign + Copy>(mut x: T) {
>     // Here we used `x` as both the LHS and the RHS. Because the
>     // mutable borrow of the LHS needed to call the trait method
>     // is taken implicitly by autoref, this is OK.
>     x += x; //~ OK
>     x.add_assign(x); //~ OK
> }
> ```
>
> ```rust,compile_fail,E0503
> # use std::ops::AddAssign;
> fn f<T: AddAssign + Copy>(mut x: T) {
>     // We can't desugar the above to the below, as once we take the
>     // mutable borrow of `x` to pass the first argument, we can't
>     // pass `x` by value in the second argument because the mutable
>     // reference is still live.
>     <T as AddAssign>::add_assign(&mut x, x);
>     //~^ ERROR cannot use `x` because it was mutably borrowed
> }
> ```
>
> ```rust,compile_fail,E0503
> # use std::ops::AddAssign;
> fn f<T: AddAssign + Copy>(mut x: T) {
>     // As above.
>     (&mut x).add_assign(x);
>     //~^ ERROR cannot use `x` because it was mutably borrowed
> }
> ```

r[expr.compound-assign.result]
As with normal assignment expressions, compound assignment expressions always produce the unit value.

> **Warning:**
> Avoid writing code that depends on the evaluation order of operands in compound assignments as it can be unusual and surprising.
