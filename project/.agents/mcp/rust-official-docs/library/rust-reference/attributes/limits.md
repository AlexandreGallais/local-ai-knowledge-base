---
title: "Limits"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/limits.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[attributes.limits]
# Limits

r[attributes.limits.intro]
The following [attributes] affect compile-time limits.

r[attributes.limits.recursion_limit]
## The `recursion_limit` attribute

r[attributes.limits.recursion_limit.intro]
The *`recursion_limit` attribute* may be applied at the [crate] level to set the
maximum depth for potentially infinitely-recursive compile-time operations
like macro expansion or auto-dereference.

r[attributes.limits.recursion_limit.syntax]
It uses the [MetaNameValueStr]
syntax to specify the recursion depth.

> **Note:**
> The default in `rustc` is 128.

```rust
#![recursion_limit = "4"]

macro_rules! a {
    () => { a!(1); };
    (1) => { a!(2); };
    (2) => { a!(3); };
    (3) => { a!(4); };
    (4) => { };
}

// This fails to expand because it requires a recursion depth greater than 4.
a!{}
```

```rust
#![recursion_limit = "1"]

// This fails because it requires two recursive steps to auto-dereference.
(|_: &u8| {})(&&&1);
```

r[attributes.limits.type_length_limit]
## The `type_length_limit` attribute

r[attributes.limits.type_length_limit.intro]
The *`type_length_limit` attribute* sets the maximum number of type substitutions allowed when constructing a concrete type during monomorphization.

> **Note:**
> `rustc` only enforces the limit when the nightly `-Zenforce-type-length-limit` flag is active.
>
> For more information, see Rust PR #127670.

> [!EXAMPLE]
>
> ```rust,ignore
> #![type_length_limit = "4"]
>
> fn f<T>(x: T) {}
>
> // This fails to compile because monomorphizing to
> // `f::<((((i32,), i32), i32), i32)>` requires more
> // than 4 type elements.
> f(((((1,), 2), 3), 4));
> ```

> **Note:**
> The default value in `rustc` is `1048576`.

r[attributes.limits.type_length_limit.syntax]
The `type_length_limit` attribute uses the [MetaNameValueStr] syntax. The value in the string must be a non-negative number.

r[attributes.limits.type_length_limit.allowed-positions]
The `type_length_limit` attribute may only be applied to the crate root.

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

r[attributes.limits.type_length_limit.duplicates]
Only the first use of `type_length_limit` on an item has effect.

> **Note:**
> `rustc` lints against any use following the first. This may become an error in the future.
