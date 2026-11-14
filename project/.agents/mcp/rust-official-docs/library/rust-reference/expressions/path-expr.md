---
title: "Path expressions"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/path-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[expr.path]
# Path expressions

r[expr.path.syntax]
```grammar
PathExpression ->
      PathInExpression
    | QualifiedPathInExpression
```

r[expr.path.intro]
A [path] used as an expression context denotes either a local variable or an item.

r[expr.path.place]
Path expressions that resolve to local or static variables are [place expressions]; other paths are [value expressions].

r[expr.path.safety]
Using a [`static mut`] variable requires an [`unsafe` block].

```rust
# mod globals {
#     pub static STATIC_VAR: i32 = 5;
#     pub static mut STATIC_MUT_VAR: i32 = 7;
# }
# let local_var = 3;
local_var;
globals::STATIC_VAR;
unsafe { globals::STATIC_MUT_VAR };
let some_constructor = Some::<i32>;
let push_integer = Vec::<i32>::push;
let slice_reverse = <[i32]>::reverse;
```

r[expr.path.const]
Evaluation of associated constants is handled the same way as [`const` blocks].
