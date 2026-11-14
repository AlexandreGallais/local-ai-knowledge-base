---
title: "Patterns (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/patterns.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Patterns (part 3 of 3)

## Tuple patterns

r[patterns.tuple.syntax]
```grammar
TuplePattern -> `(` TuplePatternItems? `)`

TuplePatternItems ->
      Pattern `,`
    | RestPattern
    | Pattern (`,` Pattern)+ `,`?
```

r[patterns.tuple.intro]
Tuple patterns match tuple values that match all criteria defined by its subpatterns. They are also used to destructure a tuple.

r[patterns.tuple.rest-syntax]
The form `(..)` with a single [RestPattern] is a special form that does not require a comma, and matches a tuple of any size.

r[patterns.tuple.refutable]
The tuple pattern is refutable when one of its subpatterns is refutable.

An example of using tuple patterns:

```rust
let pair = (10, "ten");
let (a, b) = pair;

assert_eq!(a, 10);
assert_eq!(b, "ten");
```

r[patterns.paren]
## Grouped patterns

r[patterns.paren.syntax]
```grammar
GroupedPattern -> `(` Pattern `)`
```

r[patterns.paren.intro]
Enclosing a pattern in parentheses can be used to explicitly control the precedence of compound patterns. For example, a reference pattern next to a range pattern such as `&0..=5` is ambiguous and is not allowed, but can be expressed with parentheses.

```rust
let int_reference = &3;
match int_reference {
    &(0..=5) => (),
    _ => (),
}
```

r[patterns.slice]
## Slice patterns

r[patterns.slice.syntax]
```grammar
SlicePattern -> `[` SlicePatternItems? `]`

SlicePatternItems -> Pattern (`,` Pattern)* `,`?
```

r[patterns.slice.intro]
Slice patterns can match both arrays of fixed size and slices of dynamic size.

```rust
// Fixed size
let arr = [1, 2, 3];
match arr {
    [1, _, _] => "starts with one",
    [a, b, c] => "starts with something else",
};
```
```rust
// Dynamic size
let v = vec![1, 2, 3];
match v[..] {
    [a, b] => { /* this arm will not apply because the length doesn't match */ }
    [a, b, c] => { /* this arm will apply */ }
    _ => { /* this wildcard is required, since the length is not known statically */ }
};
```

r[patterns.slice.refutable-array]
Slice patterns are irrefutable when matching an array as long as each element is irrefutable.

r[patterns.slice.refutable-slice]
When matching a slice, it is irrefutable only in the form with a single `..` rest pattern or identifier pattern with the `..` rest pattern as a subpattern.

r[patterns.slice.restriction]
Within a slice, a range pattern without both lower and upper bound must be enclosed in parentheses, as in `(a..)`, to clarify it is intended to match against a single slice element. A range pattern with both lower and upper bound, like `a..=b`, is not required to be enclosed in parentheses.

r[patterns.path]
## Path patterns

r[patterns.path.syntax]
```grammar
PathPattern -> PathExpression
```

r[patterns.path.intro]
_Path patterns_ are patterns that refer either to constant values or to structs or enum variants that have no fields.

r[patterns.path.unqualified]
Unqualified path patterns can refer to:

* enum variants
* structs
* constants
* associated constants

r[patterns.path.qualified]
Qualified path patterns can only refer to associated constants.

r[patterns.path.refutable]
Path patterns are irrefutable when they refer to structs or an enum variant when the enum has only one variant or a constant whose type is irrefutable. They are refutable when they refer to refutable constants or enum variants for enums with multiple variants.

r[patterns.const]
### Constant patterns

r[patterns.const.partial-eq]
When a constant `C` of type `T` is used as a pattern, we first check that `T: PartialEq`.

r[patterns.const.structural-equality]
Furthermore we require that the value of `C` *has (recursive) structural equality*, which is defined recursively as follows:

r[patterns.const.primitive]
- Integers as well as `str`, `bool` and `char` values always have structural equality.

r[patterns.const.builtin-aggregate]
- Tuples, arrays, and slices have structural equality if all their fields/elements have structural equality. (In particular, `()` and `[]` always have structural equality.)

r[patterns.const.ref]
- References have structural equality if the value they point to has structural equality.

r[patterns.const.aggregate]
- A value of `struct` or `enum` type has structural equality if its `PartialEq` instance is derived via `#[derive(PartialEq)]`, and all fields (for enums: of the active variant) have structural equality.

r[patterns.const.pointer]
- A raw pointer has structural equality if it was defined as a constant integer (and then cast/transmuted).

r[patterns.const.float]
- A float value has structural equality if it is not a `NaN`.

r[patterns.const.exhaustive]
- Nothing else has structural equality.

r[patterns.const.generic]
In particular, the value of `C` must be known at pattern-building time (which is pre-monomorphization). This means that associated consts that involve generic parameters cannot be used as patterns.

r[patterns.const.immutable]
The value of `C` must not contain any references to mutable statics (`static mut` items or interior mutable `static` items) or `extern` statics.

r[patterns.const.translation]
After ensuring all conditions are met, the constant value is translated into a pattern, and now behaves exactly as-if that pattern had been written directly. In particular, it fully participates in exhaustiveness checking. (For raw pointers, constants are the only way to write such patterns. Only `_` is ever considered exhaustive for these types.)

r[patterns.or]
## Or-patterns

_Or-patterns_ are patterns that match on one of two or more sub-patterns (for example `A | B | C`). They can nest arbitrarily. Syntactically, or-patterns are allowed in any of the places where other patterns are allowed (represented by the [Pattern] production), with the exceptions of `let`-bindings and function and closure parameters (represented by the [PatternNoTopAlt] production).

r[patterns.constraints]
### Static semantics

r[patterns.constraints.pattern]
1. Given a pattern `p | q` at some depth for some arbitrary patterns `p` and `q`, the pattern is considered ill-formed if:

   + the type inferred for `p` does not unify with the type inferred for `q`, or
   + the same set of bindings are not introduced in `p` and `q`, or
   + the type of any two bindings with the same name in `p` and `q` do not unify with respect to types or binding modes.

   Unification of types is in all instances aforementioned exact and implicit [type coercions] do not apply.

r[patterns.constraints.match-type-check]
2. When type checking an expression `match e_s { a_1 => e_1, ... a_n => e_n }`, for each match arm `a_i` which contains a pattern of form `p_i | q_i`, the pattern `p_i | q_i` is considered ill formed if, at the depth `d` where it exists the fragment of `e_s` at depth `d`, the type of the expression fragment does not unify with `p_i | q_i`.

r[patterns.constraints.exhaustiveness-or-pattern]
3. With respect to exhaustiveness checking, a pattern `p | q` is considered to cover `p` as well as `q`. For some constructor `c(x, ..)` the distributive law applies such that `c(p | q, ..rest)` covers the same set of value as `c(p, ..rest) | c(q, ..rest)` does. This can be applied recursively until there are no more nested patterns of form `p | q` other than those that exist at the top level.

   Note that by *"constructor"* we do not refer to tuple struct patterns, but rather we refer to a pattern for any product type. This includes enum variants, tuple structs, structs with named fields, arrays, tuples, and slices.

r[patterns.behavior]
### Dynamic semantics

r[patterns.behavior.nested-or-patterns]
1. The dynamic semantics of pattern matching a scrutinee expression `e_s` against a pattern `c(p | q, ..rest)` at depth `d` where `c` is some constructor, `p` and `q` are arbitrary patterns, and `rest` is optionally any remaining potential factors in `c`, is defined as being the same as that of `c(p, ..rest) | c(q, ..rest)`.

r[patterns.precedence]
### Precedence with other undelimited patterns

As shown elsewhere in this chapter, there are several types of patterns that are syntactically undelimited, including identifier patterns, reference patterns, and or-patterns. Or-patterns always have the lowest-precedence. This allows us to reserve syntactic space for a possible future type ascription feature and also to reduce ambiguity. For example, `x @ A(..) | B(..)` will result in an error that `x` is not bound in all patterns. `&A(x) | B(x)` will result in a type mismatch between `x` in the different subpatterns.
