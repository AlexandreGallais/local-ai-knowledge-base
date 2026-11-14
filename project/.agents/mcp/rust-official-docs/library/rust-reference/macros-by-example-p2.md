---
title: "Macros by example (part 2 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/macros-by-example.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Macros by example (part 2 of 3)

## Scoping, exporting, and importing

r[macro.decl.scope.intro]
For historical reasons, the scoping of macros by example does not work entirely like items. Macros have two forms of scope: textual scope, and path-based scope. Textual scope is based on the order that things appear in source files, or even across multiple files, and is the default scoping. It is explained further below. Path-based scope works exactly the same way that item scoping does. The scoping, exporting, and importing of macros is controlled largely by attributes.

r[macro.decl.scope.unqualified]
When a macro is invoked by an unqualified identifier (not part of a multi-part path), it is first looked up in textual scoping. If this does not yield any results, then it is looked up in path-based scoping. If the macro's name is qualified with a path, then it is only looked up in path-based scoping.

```rust
use lazy_static::lazy_static; // Path-based import.

macro_rules! lazy_static { // Textual definition.
    (lazy) => {};
}

lazy_static!{lazy} // Textual lookup finds our macro first.
self::lazy_static!{} // Path-based lookup ignores our macro, finds imported one.
```

r[macro.decl.scope.textual]
### Textual scope

r[macro.decl.scope.textual.intro]
Textual scope is based largely on the order that things appear in source files, and works similarly to the scope of local variables declared with `let` except it also applies at the module level. When `macro_rules!` is used to define a macro, the macro enters the scope after the definition (note that it can still be used recursively, since names are looked up from the invocation site), up until its surrounding scope, typically a module, is closed. This can enter child modules and even span across multiple files:

```rust
//// src/lib.rs
mod has_macro {
    // m!{} // Error: m is not in scope.

    macro_rules! m {
        () => {};
    }
    m!{} // OK: appears after declaration of m.

    mod uses_macro;
}

// m!{} // Error: m is not in scope.

//// src/has_macro/uses_macro.rs

m!{} // OK: appears after declaration of m in src/lib.rs
```

r[macro.decl.scope.textual.shadow]
It is not an error to define a macro multiple times; the most recent declaration will shadow the previous one unless it has gone out of scope.

```rust
macro_rules! m {
    (1) => {};
}

m!(1);

mod inner {
    m!(1);

    macro_rules! m {
        (2) => {};
    }
    // m!(1); // Error: no rule matches '1'
    m!(2);

    macro_rules! m {
        (3) => {};
    }
    m!(3);
}

m!(1);
```

r[macro.decl.scope.textual.function-local]
Macros can be declared and used locally inside functions as well, and work similarly:

```rust
fn foo() {
    // m!(); // Error: m is not in scope.
    macro_rules! m {
        () => {};
    }
    m!();
}

// m!(); // Error: m is not in scope.
```

r[macro.decl.scope.textual.shadow-path-based]
Textual scope name bindings for macros shadow path-based scope bindings to macros.

```rust
macro_rules! m2 {
    () => {
        println!("m2");
    };
}

// Resolves to path-based candidate from use declaration below.
m!(); // prints "m2\n"

// Introduce second candidate for `m` with textual scope.
//
// This shadows path-based candidate from below for the rest of this
// example.
macro_rules! m {
    () => {
        println!("m");
    };
}

// Introduce `m2` macro as path-based candidate.
//
// This item is in scope for this entire example, not just below the
// use declaration.
use m2 as m;

// Resolves to the textual macro candidate from above the use
// declaration.
m!(); // prints "m\n"
```

> **Note:**
> For areas where shadowing is not allowed, see [name resolution ambiguities].

r[macro.decl.scope.path-based]
### Path-based scope

r[macro.decl.scope.path-based.intro]
By default, a macro has no path-based scope. Macros can gain path-based scope in two ways:

- [Use declaration re-export]
- [`macro_export`]

r[macro.decl.scope.path.reexport]
Macros can be re-exported to give them path-based scope from a module other than the crate root.

```rust
mac::m!(); // OK: Path-based lookup finds `m` in the mac module.

mod mac {
    // Introduce macro `m` with textual scope.
    macro_rules! m {
        () => {};
    }

    // Reexport with path-based scope from within `m`'s textual scope.
    pub(crate) use m;
}
```

r[macro.decl.scope.path-based.visibility]
Macros have an implicit visibility of `pub(crate)`. `#[macro_export]` changes the implicit visibility to `pub`.

```rust
// Implicit visibility is `pub(crate)`.
macro_rules! private_m {
    () => {};
}

// Implicit visibility is `pub`.
#[macro_export]
macro_rules! pub_m {
    () => {};
}

pub(crate) use private_m as private_macro; // OK.
pub use pub_m as pub_macro; // OK.
```

```rust
# // Implicit visibility is `pub(crate)`.
# macro_rules! private_m {
#     () => {};
# }
#
# // Implicit visibility is `pub`.
# #[macro_export]
# macro_rules! pub_m {
#     () => {};
# }
#
# pub(crate) use private_m as private_macro; // OK.
# pub use pub_m as pub_macro; // OK.
#
pub use private_m; // ERROR: `private_m` is only public within
                   // the crate and cannot be re-exported outside.
```

r[macro.decl.scope.macro_use]
### The `macro_use` attribute

r[macro.decl.scope.macro_use.intro]
The *`macro_use` attribute* has two purposes: it may be used on modules to extend the scope of macros defined within them, and it may be used on `extern crate` to import macros from another crate into the [`macro_use` prelude].

> [!EXAMPLE]
> ```rust
> #[macro_use]
> mod inner {
>     macro_rules! m {
>         () => {};
>     }
> }
> m!();
> ```
>
> ```rust,ignore
> #[macro_use]
> extern crate log;
> ```

r[macro.decl.scope.macro_use.syntax]
When used on modules, the `macro_use` attribute uses the [MetaWord] syntax.

When used on `extern crate`, it uses the [MetaWord] and [MetaListIdents] syntaxes. For more on how these syntaxes may be used, see [macro.decl.scope.macro_use.prelude].

r[macro.decl.scope.macro_use.allowed-positions]
The `macro_use` attribute may be applied to modules or `extern crate`.

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

r[macro.decl.scope.macro_use.extern-crate-self]
The `macro_use` attribute may not be used on [`extern crate self`].

r[macro.decl.scope.macro_use.duplicates]
The `macro_use` attribute may be used any number of times on a form.

Multiple instances of `macro_use` in the [MetaListIdents] syntax may be specified. The union of all specified macros will be imported.

> **Note:**
> On modules, `rustc` lints against any [MetaWord] `macro_use` attributes following the first.
>
> On `extern crate`, `rustc` lints against any `macro_use` attributes that have no effect due to not importing any macros not already imported by another `macro_use` attribute. If two or more [MetaListIdents] `macro_use` attributes import the same macro, the first is linted against. If any [MetaWord] `macro_use` attributes are present, all [MetaListIdents] `macro_use` attributes are linted against. If two or more [MetaWord] `macro_use` attributes are present, the ones following the first are linted against.

r[macro.decl.scope.macro_use.mod-decl]
When `macro_use` is used on a module, the module's macro scope extends beyond the module's lexical scope.

> [!EXAMPLE]
> ```rust
> #[macro_use]
> mod inner {
>     macro_rules! m {
>         () => {};
>     }
> }
> m!(); // OK
> ```

r[macro.decl.scope.macro_use.prelude]
Specifying `macro_use` on an `extern crate` declaration in the crate root imports exported macros from that crate.

Macros imported this way are imported into the [`macro_use` prelude], not textually, which means that they can be shadowed by any other name. Macros imported by `macro_use` can be used before the import statement.

> **Note:**
> `rustc` currently prefers the last macro imported in case of conflict. Don't rely on this. This behavior is unusual, as imports in Rust are generally order-independent. This behavior of `macro_use` may change in the future.
>
> For details, see Rust issue #148025.

When using the [MetaWord] syntax, all exported macros are imported. When using the [MetaListIdents] syntax, only the specified macros are imported.

> [!EXAMPLE]
>
> ```rust,ignore
> #[macro_use(lazy_static)] // Or `#[macro_use]` to import all macros.
> extern crate lazy_static;
>
> lazy_static!{}
> // self::lazy_static!{} // ERROR: lazy_static is not defined in `self`.
> ```

r[macro.decl.scope.macro_use.export]
Macros to be imported with `macro_use` must be exported with `macro_export`.

r[macro.decl.scope.macro_export]
### The `macro_export` attribute

r[macro.decl.scope.macro_export.intro]
The *`macro_export` attribute* exports the macro from the crate and makes it available in the root of the crate for path-based resolution.

> [!EXAMPLE]
> ```rust
> self::m!();
> //  ^^^^ OK: Path-based lookup finds `m` in the current module.
> m!(); // As above.
>
> mod inner {
>     super::m!();
>     crate::m!();
> }
>
> mod mac {
>     #[macro_export]
>     macro_rules! m {
>         () => {};
>     }
> }
> ```

r[macro.decl.scope.macro_export.syntax]
The `macro_export` attribute uses the [MetaWord] and [MetaListIdents] syntaxes. With the [MetaListIdents] syntax, it accepts a single `local_inner_macros` value.

r[macro.decl.scope.macro_export.allowed-positions]
The `macro_export` attribute may be applied to `macro_rules` definitions.

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

r[macro.decl.scope.macro_export.duplicates]
Only the first use of `macro_export` on a macro has effect.

> **Note:**
> `rustc` lints against any use following the first.

r[macro.decl.scope.macro_export.path-based]
By default, macros only have textual scope and cannot be resolved by path. When the `macro_export` attribute is used, the macro is made available in the crate root and can be referred to by its path.

> [!EXAMPLE]
> Without `macro_export`, macros only have textual scope, so path-based resolution of the macro fails.
>
> ```rust,compile_fail,E0433
> macro_rules! m {
>     () => {};
> }
> self::m!(); // ERROR
> crate::m!(); // ERROR
> # fn main() {}
> ```
>
> With `macro_export`, path-based resolution works.
>
> ```rust
> #[macro_export]
> macro_rules! m {
>     () => {};
> }
> self::m!(); // OK
> crate::m!(); // OK
> # fn main() {}
> ```

r[macro.decl.scope.macro_export.export]
The `macro_export` attribute causes a macro to be exported from the crate root so that it can be referred to in other crates by path.

> [!EXAMPLE]
> Given the following in a `log` crate:
>
> ```rust
> #[macro_export]
> macro_rules! warn {
>     ($message:expr) => { eprintln!("WARN: {}", $message) };
> }
> ```
>
> From another crate, you can refer to the macro by path:
>
>
> ```rust,ignore
> fn main() {
>     log::warn!("example warning");
> }
> ```

r[macro.decl.scope.macro_export.macro_use]
`macro_export` allows the use of `macro_use` on an `extern crate` to import the macro into the [`macro_use` prelude].

> [!EXAMPLE]
> Given the following in a `log` crate:
>
> ```rust
> #[macro_export]
> macro_rules! warn {
>     ($message:expr) => { eprintln!("WARN: {}", $message) };
> }
> ```
>
> Using `macro_use` in a dependent crate allows you to use the macro from the prelude:
>
>
> ```rust,ignore
> #[macro_use]
> extern crate log;
>
> pub mod util {
>     pub fn do_thing() {
>         // Resolved via macro prelude.
>         warn!("example warning");
>     }
> }
> ```

r[macro.decl.scope.macro_export.local_inner_macros]
Adding `local_inner_macros` to the `macro_export` attribute causes all single-segment macro invocations in the macro definition to have an implicit `$crate::` prefix.

> **Note:**
> This is intended primarily as a tool to migrate code written before [`$crate`] was added to the language to work with Rust 2018's path-based imports of macros. Its use is discouraged in new code.

> [!EXAMPLE]
> ```rust
> #[macro_export(local_inner_macros)]
> macro_rules! helped {
>     () => { helper!() } // Automatically converted to $crate::helper!().
> }
>
> #[macro_export]
> macro_rules! helper {
>     () => { () }
> }
> ```

r[macro.decl.hygiene]
## Hygiene

r[macro.decl.hygiene.intro]
Macros by example have _mixed-site hygiene_. This means that [loop labels], [block labels], and local variables are looked up at the macro definition site while other symbols are looked up at the macro invocation site. For example:

```rust
let x = 1;
fn func() {
    unreachable!("this is never called")
}

macro_rules! check {
    () => {
        assert_eq!(x, 1); // Uses `x` from the definition site.
        func();           // Uses `func` from the invocation site.
    };
}

{
    let x = 2;
    fn func() { /* does not panic */ }
    check!();
}
```

Labels and local variables defined in macro expansion are not shared between invocations, so this code doesn’t compile:

```rust
macro_rules! m {
    (define) => {
        let x = 1;
    };
    (refer) => {
        dbg!(x);
    };
}

m!(define);
m!(refer);
```

r[macro.decl.hygiene.crate]
A special case is the `$crate` metavariable. It refers to the crate defining the macro, and can be used at the start of the path to look up items or macros which are not in scope at the invocation site.

```rust
//// Definitions in the `helper_macro` crate.
#[macro_export]
macro_rules! helped {
    // () => { helper!() } // This might lead to an error due to 'helper' not being in scope.
    () => { $crate::helper!() }
}

#[macro_export]
macro_rules! helper {
    () => { () }
}

//// Usage in another crate.
// Note that `helper_macro::helper` is not imported!
use helper_macro::helped;

fn unit() {
    helped!();
}
```

Note that, because `$crate` refers to the current crate, it must be used with a fully qualified module path when referring to non-macro items:

```rust
pub mod inner {
    #[macro_export]
    macro_rules! call_foo {
        () => { $crate::inner::foo() };
    }

    pub fn foo() {}
}
```

r[macro.decl.hygiene.vis]
Additionally, even though `$crate` allows a macro to refer to items within its own crate when expanding, its use has no effect on visibility. An item or macro referred to must still be visible from the invocation site. In the following example, any attempt to invoke `call_foo!()` from outside its crate will fail because `foo()` is not public.

```rust
#[macro_export]
macro_rules! call_foo {
    () => { $crate::foo() };
}

fn foo() {}
```

> **Note:**
> Prior to Rust 1.30, `$crate` and `local_inner_macros` were unsupported. They were added alongside path-based imports of macros, to ensure that helper macros did not need to be manually imported by users of a macro-exporting crate. Crates written for earlier versions of Rust that use helper macros need to be modified to use `$crate` or `local_inner_macros` to work well with path-based imports.

r[macro.decl.follow-set]
