---
title: "Grouped expressions"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/grouped-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[expr.paren]
# Grouped expressions

r[expr.paren.syntax]
```grammar
GroupedExpression -> `(` Expression `)`
```

r[expr.paren.intro]
A *parenthesized expression* wraps a single expression, evaluating to that expression. The syntax for a parenthesized expression is a `(`, then an expression, called the *enclosed operand*, and then a `)`.

r[expr.paren.evaluation]
Parenthesized expressions evaluate to the value of the enclosed operand.

r[expr.paren.place-or-value]
A parenthesized expression is a place expression if the enclosed operand is a place expression, and is a value expression if the enclosed operand is a value expression.

r[expr.paren.override-precedence]
Parentheses can be used to explicitly modify the precedence order of subexpressions within an expression.

An example of a parenthesized expression:

```rust
let x: i32 = 2 + 3 * 4; // not parenthesized
let y: i32 = (2 + 3) * 4; // parenthesized
assert_eq!(x, 14);
assert_eq!(y, 20);
```

An example of a necessary use of parentheses is when calling a function pointer that is a member of a struct:

```rust
# struct A {
#    f: fn() -> &'static str
# }
# impl A {
#    fn f(&self) -> &'static str {
#        "The method f"
#    }
# }
# let a = A{f: || "The field f"};
#
assert_eq!( a.f (), "The method f");
assert_eq!((a.f)(), "The field f");
```
