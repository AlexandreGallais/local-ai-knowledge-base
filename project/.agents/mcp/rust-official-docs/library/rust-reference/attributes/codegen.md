---
title: "Code generation attributes (part 1 of 5)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/codegen.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[attributes.codegen]
# Code generation attributes

r[attributes.codegen.intro]
The following [attributes] are used for controlling code generation.

r[attributes.codegen.inline]
### The `inline` attribute

r[attributes.codegen.inline.intro]
The *`inline` [attribute]* suggests whether a copy of the attributed function's code should be placed in the caller rather than generating a call to the function.

> [!EXAMPLE]
> ```rust
> #[inline]
> pub fn example1() {}
>
> #[inline(always)]
> pub fn example2() {}
>
> #[inline(never)]
> pub fn example3() {}
> ```

> **Note:**
> `rustc` automatically inlines functions when doing so seems worthwhile. Use this attribute carefully as poor decisions about what to inline can slow down programs.

r[attributes.codegen.inline.syntax]
The syntax for the `inline` attribute is:

```grammar
@root InlineAttribute ->
      `inline` `(` `always` `)`
    | `inline` `(` `never` `)`
    | `inline`
```

r[attributes.codegen.inline.allowed-positions]
The `inline` attribute may only be applied to functions with [bodies] --- [closures], [async blocks], [free functions], [associated functions] in an [inherent impl] or [trait impl], and associated functions in a [trait definition] when those functions have a [default definition] .

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

> **Note:**
> Though the attribute can be applied to [closures] and [async blocks], the usefulness of this is limited as we do not yet support attributes on expressions.
>
> ```rust
> // We allow attributes on statements.
> #[inline] || (); // OK
> #[inline] async {}; // OK
> ```
>
> ```rust,compile_fail,E0658
> // We don't yet allow attributes on expressions.
> let f = #[inline] || (); // ERROR
> ```

r[attributes.codegen.inline.duplicates]
Only the first use of `inline` on a function has effect.

> **Note:**
> `rustc` lints against any use following the first. This may become an error in the future.

r[attributes.codegen.inline.modes]
The `inline` attribute supports these modes:

- `#[inline]` *suggests* performing inline expansion.
- `#[inline(always)]` *suggests* that inline expansion should always be performed.
- `#[inline(never)]` *suggests* that inline expansion should never be performed.

> **Note:**
> In every form the attribute is a hint. The compiler may ignore it.

r[attributes.codegen.inline.trait]
When `inline` is applied to a function in a [trait], it applies only to the code of the [default definition].

r[attributes.codegen.inline.async]
When `inline` is applied to an [async function] or [async closure], it applies only to the code of the generated `poll` function.

> **Note:**
> For more details, see Rust issue #129347.

r[attributes.codegen.inline.externally-exported]
The `inline` attribute is ignored if the function is externally exported with [`no_mangle`] or [`export_name`].

r[attributes.codegen.inline.optimize]
`#[inline]` and `#[inline(always)]` may not be used with `#[optimize(none)]` on the same function. (See [attributes.codegen.optimize.inline].)

```rust
#[optimize(none)]
#[inline] // ERROR: Not allowed.
fn f() {}
```

`#[inline]` and `#[inline(always)]` may still be used on a closure or async block that inherits `optimize(none)`. (See [attributes.codegen.optimize.closures].)

```rust
#[optimize(none)]
pub fn f() {
    #[inline] || (); // Inherits `optimize(none)`.
    #[inline(always)] async {}; // Inherits `optimize(none)`.
}
```

r[attributes.codegen.cold]
### The `cold` attribute

r[attributes.codegen.cold.intro]
The *`cold` [attribute]* suggests that the attributed function is unlikely to be called which may help the compiler produce better code.

> [!EXAMPLE]
> ```rust
> #[cold]
> pub fn example() {}
> ```

r[attributes.codegen.cold.syntax]
The `cold` attribute uses the [MetaWord] syntax.

r[attributes.codegen.cold.allowed-positions]
The `cold` attribute may only be applied to functions with [bodies] --- [closures], [async blocks], [free functions], [associated functions] in an [inherent impl] or [trait impl], and associated functions in a [trait definition] when those functions have a [default definition] .

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

> **Note:**
> Though the attribute can be applied to [closures] and [async blocks], the usefulness of this is limited as we do not yet support attributes on expressions.

r[attributes.codegen.cold.extern-custom]
The `cold` attribute may not be applied to an [`extern "custom"` function].

```rust
#[cold] // ERROR: Not allowed.
#[unsafe(naked)]
unsafe extern "custom" fn f() {
    core::arch::naked_asm!("ret")
}
```

r[attributes.codegen.cold.duplicates]
Only the first use of `cold` on a function has effect.

> **Note:**
> `rustc` lints against any use following the first. This may become an error in the future.

r[attributes.codegen.cold.trait]
When `cold` is applied to a function in a [trait], it applies only to the code of the [default definition].

r[attributes.codegen.naked]
## The `naked` attribute

r[attributes.codegen.naked.intro]
The *`naked` [attribute]* prevents the compiler from emitting a function prologue and epilogue for the attributed function --- a *naked function*.

> [!EXAMPLE]
> ```rust
> # #[cfg(target_arch = "x86_64")] {
> /// Adds 3 to the given number.
> // SAFETY: The body respects the "sysv64" calling convention,
> // upholds the signature, and does not fall through.
> #[unsafe(naked)]
> pub extern "sysv64" fn add_n(number: u64) -> u64 {
>     core::arch::naked_asm!(
>         "add rdi, {}",
>         "mov rax, rdi",
>         "ret",
>         const 3,
>     )
> }
> # }
> ```

> **Note:**
> The assembly code of a naked function often does not follow the calling convention of any ABI known to the compiler. Such a function should be declared as an `extern "custom"` function.

r[attributes.codegen.naked.syntax]
The `naked` attribute uses the [MetaWord] syntax.

r[attributes.codegen.naked.allowed-positions]
The `naked` attribute may only be applied to [free functions], [associated functions] in an [inherent impl] or [trait impl], and associated functions in a [trait definition] when those functions have a [default definition].

r[attributes.codegen.naked.duplicates]
Only the first use of `naked` on a function has effect.

> **Note:**
> `rustc` lints against any use following the first.

r[attributes.codegen.naked.unsafe]
The `naked` attribute must be marked with `unsafe` because the body must respect the function's calling convention, uphold its signature, and either return or diverge (i.e., not fall through past the end of the assembly code).

r[attributes.codegen.naked.body]
The [function body] must consist of exactly one [`naked_asm!`] macro invocation.

r[attributes.codegen.naked.prologue-epilogue]
The compiler emits no prologue or epilogue for a naked function: the assembly code in the [`naked_asm!`] invocation constitutes its entire body.

r[attributes.codegen.naked.call-stack]
On entry the assembly code may assume that the call stack and register state are valid per the function's signature and calling convention.

r[attributes.codegen.naked.no-duplication]
The compiler may not duplicate the assembly code except when monomorphizing a polymorphic function.

> **Note:**
> This guarantee matters for naked functions that define symbols.

r[attributes.codegen.naked.unused-variables]
The [`unused_variables` lint] is suppressed in naked functions.

r[attributes.codegen.naked.inline]
The [`inline` attribute] cannot be applied to a naked function.

r[attributes.codegen.naked.track_caller]
The [`track_caller` attribute] cannot be applied to a naked function.

r[attributes.codegen.naked.testing]
The [testing attributes] cannot be applied to a naked function.

r[attributes.codegen.naked.target_feature]
The [`target_feature` attribute] cannot be applied to a naked function.

r[attributes.codegen.naked.optimize]
The [`optimize` attribute] cannot be applied to a naked function. (See [attributes.codegen.optimize.naked].)

```rust
# use core::arch::naked_asm;
#[optimize(size)] // ERROR: Not allowed on a naked function.
#[unsafe(naked)]
pub extern "C" fn f() {
    naked_asm!("ret")
}
```

r[attributes.codegen.naked.abi]
A naked function cannot use the ["Rust" ABI].

r[attributes.codegen.no_builtins]
## The `no_builtins` attribute

r[attributes.codegen.no_builtins.intro]
The *`no_builtins` [attribute]* disables optimization of certain code patterns related to calls to library functions that are assumed to exist.

> [!EXAMPLE]
> ```rust
> #![no_builtins]
> ```

r[attributes.codegen.no_builtins.syntax]
The `no_builtins` attribute uses the [MetaWord] syntax.

r[attributes.codegen.no_builtins.allowed-positions]
The `no_builtins` attribute can only be applied to the crate root.

r[attributes.codegen.no_builtins.duplicates]
Only the first use of the `no_builtins` attribute has effect.

> **Note:**
> `rustc` lints against any use following the first.

r[attributes.codegen.optimize]
## The `optimize` attribute

r[attributes.codegen.optimize.intro]
The *`optimize` [attribute]* suggests an optimization goal for the attributed function: size, speed, or none.

> [!EXAMPLE]
> ```rust
> #[optimize(size)]
> pub fn example1() {}
>
> #[optimize(speed)]
> pub fn example2() {}
>
> #[optimize(none)]
> pub fn example3() {}
> ```

> **Note:**
> For `rustc`, `-C opt-level=0` (the default) disables LLVM optimizations for the entire crate, and `optimize(size)` and `optimize(speed)` do not enable them for the attributed function. `rustc` still applies its own optimizations, other than inlining, to such a function.

r[attributes.codegen.optimize.syntax]
The syntax for the `optimize` attribute is:

```grammar
@root OptimizeAttribute ->
    `optimize` `(` ( `size` | `speed` | `none` ) `)`
```

r[attributes.codegen.optimize.allowed-positions]
The `optimize` attribute may only be applied to functions with [bodies] --- [closures], [async blocks], [free functions], [associated functions] in an [inherent impl] or [trait impl], and associated functions in a [trait definition] when those functions have a [default definition].

```rust
// A free function.
#[optimize(size)]
pub fn f() {
    #[optimize(speed)] || (); // A closure.
    #[optimize(none)] async {}; // An async block.
}

pub struct S;
impl S {
    // An associated function in an inherent impl.
    #[optimize(size)]
    pub fn f(&self) {}
}

pub trait Tr {
    // An associated function in a trait with a default definition.
    #[optimize(speed)]
    fn f(&self) {}
}

impl Tr for S {
    // An associated function in a trait impl.
    #[optimize(none)]
    fn f(&self) {}
}
```

The attribute is rejected on a function without a body.

```rust
trait Tr {
    #[optimize(size)] // ERROR: Not allowed without a body.
    fn f();
}

unsafe extern "C" {
    #[optimize(size)] // ERROR: Not allowed without a body.
    fn g();
}
```

r[attributes.codegen.optimize.duplicates]
The `optimize` attribute may be used only once on a function.

```rust
#[optimize(size)]
#[optimize(speed)] // ERROR: Multiple `optimize` attributes.
fn f() {}
```

r[attributes.codegen.optimize.modes]
The `optimize` attribute supports these modes:

- `#[optimize(size)]` suggests optimizing for smaller code, even at the cost of execution speed.
- `#[optimize(speed)]` suggests optimizing for faster execution, even at the cost of code size.
- `#[optimize(none)]` suggests compiling the function as though no optimization had been requested for it, disregarding what was requested for the crate as a whole.

> **Note:**
> In every form the attribute is a hint. The compiler may ignore it.

> **Warning:**
> `#[optimize(none)]` does not make the function opaque to the optimizer. In addition to ignoring the attribute, the compiler may still optimize the function's callers using what it knows about the function and may still change the function itself in other ways, so the attribute cannot be relied on to keep a computation from being optimized away.

> **Note:**
> `rustc` currently optimizes a function with `#[optimize(none)]` much as it would at `-C opt-level=0`, regardless of the crate's optimization level, and does not inline it into its callers.
>
> Settings that base their defaults on the optimization level, such as debug assertions and overflow checks, ignore this attribute and use the crate's optimization level.

r[attributes.codegen.optimize.inline]
`#[optimize(none)]` may not be used with `#[inline]` or `#[inline(always)]` on the same function. It may be used with `#[inline(never)]`. (See [attributes.codegen.inline.optimize].)

```rust
#[optimize(none)]
#[inline] // ERROR: Not allowed.
fn f() {}
```

A closure or async block that inherits `optimize(none)` may still be marked with `#[inline]` or `#[inline(always)]`. (See [attributes.codegen.optimize.closures].)

```rust
#[optimize(none)]
pub fn f() {
    #[inline] || (); // Inherits `optimize(none)`.
    #[inline(always)] async {}; // Inherits `optimize(none)`.
}
```

r[attributes.codegen.optimize.naked]
The `optimize` attribute cannot be applied to a [naked function]. (See [attributes.codegen.naked.optimize].)

```rust
# use core::arch::naked_asm;
#[optimize(size)] // ERROR: Not allowed on a naked function.
#[unsafe(naked)]
pub extern "C" fn f() {
    naked_asm!("ret")
}
```

r[attributes.codegen.optimize.closures]
Closures and [async blocks] without an `optimize` attribute of their own inherit the attribute in effect on the innermost enclosing function, closure, or async block, which may itself be one inherited rather than one written directly. The body of an [async function] inherits the attribute in effect on the function, and the body of an [async closure] inherits the attribute in effect on the closure. Items and [const blocks] within a function do not inherit the attribute in effect on the function, nor do the closures and async blocks within them.

```rust
#[optimize(none)]
pub fn f() {
    // This closure has no `optimize` attribute of its own, so its
    // body inherits `optimize(none)` from `f`.
    let c = || 1 + 2;
    c();
}

#[optimize(size)]
pub async fn g() {
    // This body inherits `optimize(size)` from `g`.
}
```

r[attributes.codegen.optimize.trait]
When `optimize` is applied to a function in a [trait], it applies only to the code of the [default definition].

```rust
pub trait Tr {
    // The default definition is optimized for size.
    #[optimize(size)]
    fn f(&self) {}
}

pub struct S;
impl Tr for S {
    // This implementation of `Tr::f` does not inherit the trait's
    // `optimize(size)`; it uses the crate's optimization level.
    fn f(&self) {}
}
```

r[attributes.codegen.target_feature]
