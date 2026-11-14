---
title: "Diagnostic attributes (part 2 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/diagnostics.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Diagnostic attributes (part 2 of 3)

## The `must_use` attribute

r[attributes.diagnostics.must_use.intro]
The *`must_use` [attribute]* marks a value that should be used.

r[attributes.diagnostics.must_use.syntax]
The `must_use` attribute uses the [MetaWord] and [MetaNameValueStr] syntaxes.

> [!EXAMPLE]
> ```rust
> #[must_use]
> fn use_me1() -> u8 { 0 }
>
> #[must_use = "explanation of why it should be used"]
> fn use_me2() -> u8 { 0 }
> ```

r[attributes.diagnostics.must_use.allowed-positions]
The `must_use` attribute may be applied to a:

- [Struct]
- [Enumeration]
- [Union]
- [Function]
- [Trait]

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

r[attributes.diagnostics.must_use.duplicates]
The `must_use` attribute may be used only once on an item.

> **Note:**
> `rustc` lints against any use following the first. This may become an error in the future.

r[attributes.diagnostics.must_use.message]
The `must_use` attribute may include a message by using the [MetaNameValueStr] syntax, e.g., `#[must_use = "example message"]`. The message may be emitted as part of the lint.

r[attributes.diagnostics.must_use.type]
When the attribute is applied to a [struct], [enumeration], or [union], if the [expression] of an [expression statement] has that type, the use triggers the `unused_must_use` lint.

```rust
#![deny(unused_must_use)]
#[must_use]
struct MustUse();
MustUse(); // ERROR: Unused value that must be used.
```

r[attributes.diagnostics.must_use.type-uninhabited]
As an exception to [attributes.diagnostics.must_use.type], the lint does not fire for `Result<(), E>` when `E` is [uninhabited] or for `ControlFlow` when `B` is [uninhabited]. A `#[non_exhaustive]` type from an external crate is not considered uninhabited for this purpose, because it may gain constructors in the future.

```rust
#![deny(unused_must_use)]
# use core::ops::ControlFlow;
fn f1() -> Result<(), !> { Ok(()) }
f1(); // OK: `!` is uninhabited.
fn f2() -> ControlFlow<!, ()> { ControlFlow::Continue(()) }
f2(); // OK: `!` is uninhabited.
```

r[attributes.diagnostics.must_use.fn]
If the [expression] of an [expression statement] is a [call expression] or [method call expression] whose function operand is a function to which the attribute is applied, the use triggers the `unused_must_use` lint.

```rust
#![deny(unused_must_use)]
#[must_use]
fn f() {}
f(); // ERROR: Unused return value that must be used.
```

r[attributes.diagnostics.must_use.trait]
If the [expression] of an [expression statement] is a [call expression] or [method call expression] whose function operand is a function that returns an [impl trait] or a [dyn trait] type where one or more traits in the bound are marked with the attribute, the use triggers the `unused_must_use` lint.

```rust
#![deny(unused_must_use)]
#[must_use]
trait Tr {}
impl Tr for () {}
fn f() -> impl Tr {}
f(); // ERROR: Unused implementor that must be used.
```

r[attributes.diagnostics.must_use.trait-function]
When the attribute is applied to a function in a trait declaration, the rules described in [attributes.diagnostics.must_use.fn] also apply when the function operand of the [call expression] or [method call expression] is an implementation of that function.

```rust
#![deny(unused_must_use)]
trait Tr {
    #[must_use]
    fn use_me(&self);
}

impl Tr for () {
    fn use_me(&self) {}
}

().use_me(); // ERROR: Unused return value that must be used.
```

```rust
# #![deny(unused_must_use)]
# trait Tr {
#     #[must_use]
#     fn use_me(&self);
# }
#
# impl Tr for () {
#     fn use_me(&self) {}
# }
#
<() as Tr>::use_me(&());
//          ^^^^^^^^^^^ ERROR: Unused return value that must be used.
```

r[attributes.diagnostics.must_use.block-expr]
When checking the [expression] of an [expression statement] for [attributes.diagnostics.must_use.type], [attributes.diagnostics.must_use.fn], [attributes.diagnostics.must_use.trait], and [attributes.diagnostics.must_use.trait-function], the lint looks through block expressions (including [`unsafe` blocks] and [labeled block expressions]) to the trailing expression of each. This applies recursively for nested block expressions.

```rust
#![deny(unused_must_use)]
#[must_use]
fn f() {}

{ f() };        // ERROR: The lint looks through block expressions.
unsafe { f() }; // ERROR: The lint looks through `unsafe` blocks.
{ { f() } };    // ERROR: The lint looks through nested blocks.
```

r[attributes.diagnostics.must_use.trait-impl-function]
When used on a function in a trait implementation, the attribute does nothing.

```rust
#![deny(unused_must_use)]
trait Tr {
    fn f(&self);
}

impl Tr for () {
    #[must_use] // This has no effect.
    fn f(&self) {}
}

().f(); // OK.
```

> **Note:**
> `rustc` lints against use on functions in trait implementations. This may become an error in the future.

r[attributes.diagnostics.must_use.wrapping-suppression]
> **Note:**
> Wrapping the result of a `#[must_use]` function in certain expressions can suppress the fn-based check, because the [expression] of the [expression statement] is not a [call expression] or [method call expression] to a `#[must_use]` function.  The type-based check still applies if the type of the overall expression is `#[must_use]`.
>
> ```rust
> #![deny(unused_must_use)]
> #[must_use]
> fn f() {}
>
> // The fn-based check does not fire for any of these, because the
> // expression of the expression statement is not a call to a
> // `#[must_use]` function.
> (f(),);                    // Expression is a tuple, not a call.
> Some(f());                 // Callee `Some` is not `#[must_use]`.
> if true { f() } else {};   // Expression is an `if`, not a call.
> match true {               // Expression is a `match`, not a call.
>     _ => f()
> };
> ```
>
> ```rust,compile_fail
> #![deny(unused_must_use)]
> #[must_use]
> struct MustUse;
> fn g() -> MustUse { MustUse }
>
> // Despite the `if` expression not being a call, the type-based check
> // fires because the type of the expression is `MustUse`, which has
> // the `#[must_use]` attribute.
> if true { g() } else { MustUse }; // ERROR: Must be used.
> ```

r[attributes.diagnostics.must_use.underscore-idiom]
> **Note:**
> Using a [let statement] or [destructuring assignment] with a pattern of `_` when a must-used value is purposely discarded is idiomatic.
>
> ```rust
> #![deny(unused_must_use)]
> #[must_use]
> fn f() {}
> let _ = f(); // OK.
> _ = f(); // OK.
> ```

r[attributes.diagnostic.namespace]
