---
title: "Name resolution (part 2 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/names/name-resolution.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Name resolution (part 2 of 3)

## Expansion-time name resolution

r[names.resolution.expansion.intro]
Expansion-time name resolution is the stage of name resolution necessary to complete macro expansion and fully generate a crate's [AST]. This stage requires the resolution of macro invocations and `use` declarations. Resolving `use` declarations is required for macro invocations that resolve via [path-based scope]. Resolving macro invocations is required in order to expand them.

r[names.resolution.expansion.unresolved-invocations]
After expansion-time name resolution, the AST must not contain any unexpanded macro invocations. Every macro invocation resolves to a valid definition that exists in the final AST or in an external crate.

```rust
m!(); // ERROR: Cannot find macro `m` in this scope.
```

r[names.resolution.expansion.expansion-order-stability]
The resolution of names must be stable. After expansion, names in the fully expanded AST must resolve to the same definition regardless of the order in which macros are expanded and imports are resolved.

r[names.resolution.expansion.speculation]
All name resolution candidates selected during macro expansion are considered speculative. Once the crate has been fully expanded, all speculative import resolutions are validated to ensure that macro expansion did not introduce any new ambiguities.

> **Note:**
> Due to the iterative nature of macro expansion, this causes so-called time traveling ambiguities, such as when a macro or glob import introduces an item that is ambiguous with its own base path.
>
> ```rust,compile_fail,E0659
> # fn main() {}
> macro_rules! f {
>     () => {
>         mod m {
>             pub(crate) use f;
>         }
>     }
> }
> f!();
>
> const _: () = {
>     // Initially, we speculatively resolve `m` to the module in
>     // the crate root.
>     //
>     // Expansion of `f` introduces a second `m` module inside this
>     // body.
>     //
>     // Expansion-time resolution finalizes resolutions by re-
>     // resolving all imports and macro invocations, sees the
>     // introduced ambiguity and reports it as an error.
>     m::f!(); // ERROR: `m` is ambiguous.
> };
> ```

r[names.resolution.expansion.imports]
### Imports
r[names.resolution.expansion.imports.intro]
All `use` declarations are fully resolved during this stage of resolution. [Type-relative paths] cannot be resolved at this stage and will produce an error.

```rust
mod m {
    pub const C: () = ();
    pub enum E { V }
    pub type A = E;
    impl E {
        pub const C: () = ();
    }
}

// Valid imports resolved at expansion-time:
use m::C; // OK.
use m::E; // OK.
use m::A; // OK.
use m::E::V; // OK.

// Valid expressions resolved during type-relative resolution:
let _ = m::A::V; // OK.
let _ = m::E::C; // OK.
```

```rust
# mod m {
#     pub const C: () = ();
#     pub enum E { V }
#     pub type A = E;
#     impl E {
#         pub const C: () = ();
#     }
# }
// Invalid type-relative imports that can't resolve at expansion-time:
use m::A::V; // ERROR: Unresolved import `m::A::V`.
use m::E::C; // ERROR: Unresolved import `m::E::C`.
```

r[names.resolution.expansion.imports.shadowing]
Names introduced via `use` declarations in an [outer scope] are shadowed by candidates in the same namespace with the same name from an inner scope except where otherwise restricted by [name resolution ambiguities].

```rust
pub mod m1 {
    pub mod ambig {
        pub const C: u8 = 1;
    }
}

pub mod m2 {
    pub mod ambig {
        pub const C: u8 = 2;
    }
}

// This introduces the name `ambig` in the outer scope.
use m1::ambig;
const _: () = {
    // This shadows `ambig` in the inner scope.
    use m2::ambig;
    // The inner candidate is selected here
    // as the resolution of `ambig`.
    use ambig::C;
    assert!(C == 2);
};
```

r[names.resolution.expansion.imports.shadowing-shared-scope]
Shadowing of names introduced via `use` declarations within a single scope is permitted in the following situations:

- [`use` glob shadowing]
- [Macro textual scope shadowing]

r[names.resolution.expansion.imports.ambiguity]
#### Ambiguities

r[names.resolution.expansion.imports.ambiguity.intro]
There are certain situations during expansion-time resolution where there are multiple macro definitions, `use` declarations, or modules an import or macro invocation's name could refer to where the compiler cannot consistently determine which candidate should shadow the other. Shadowing cannot be permitted in these situations and the compiler instead emits ambiguity errors.

r[names.resolution.expansion.imports.ambiguity.glob-vs-glob]
Names may not be resolved through ambiguous glob imports. Glob imports are allowed to import conflicting names in the same namespace as long as the name is not used. Names with conflicting candidates from ambiguous glob imports may still be shadowed by non-glob imports and used without producing an error. The errors occur at time of use, not time of import.

```rust
mod m1 {
    pub struct Ambig;
}

mod m2 {
    pub struct Ambig;
}

// OK: This brings conficting names in the same namespace into scope
// but they have not been used yet.
use m1::*;
use m2::*;

const _: () = {
    // The error happens when the name with the conflicting candidates
    // is used.
    let x = Ambig; // ERROR: `Ambig` is ambiguous.
};
```

```rust
# mod m1 {
#     pub struct Ambig;
# }
#
# mod m2 {
#     pub struct Ambig;
# }
#
# use m1::*;
# use m2::*; // OK: No name conflict.
const _: () = {
    // This is permitted, since resolution is not through the
    // ambiguous globs.
    struct Ambig;
    let x = Ambig; // OK.
};
```

Multiple glob imports are allowed to import the same name, and that name is allowed to be used if the imports are of the same item (following reexports). The visibility of the name is the maximum visibility of the imports.

```rust
mod m1 {
    pub struct Ambig;
}

mod m2 {
    // This reexports the same `Ambig` item from a second module.
    pub use super::m1::Ambig;
}

mod m3 {
    // These both import the same `Ambig`.
    //
    // The visibility of `Ambig` is `pub` because that is the
    // maximum visibility between these two `use` declarations.
    pub use super::m1::*;
    use super::m2::*;
}

mod m4 {
    // `Ambig` can be used through the `m3` globs and still has
    // `pub` visibility.
    pub use crate::m3::Ambig;
}

const _: () = {
    // Therefore, we can use it here.
    let _ = m4::Ambig; // OK.
};
# fn main() {}
```

r[names.resolution.expansion.imports.ambiguity.glob-vs-outer]
Names in imports and macro invocations may not be resolved through glob imports when there is another candidate available in an [outer scope].

r[names.resolution.expansion.imports.ambiguity.panic-hack]
> **Note:**
> When one of [`core::panic!`] or [`std::panic!`] is brought into scope due to the [standard library prelude], and a user-written [glob import] brings the other into scope, `rustc` currently allows use of `panic!`, even though it is ambiguous. The user-written glob import takes precedence to resolve this ambiguity.
>
> In Rust 2021 and later, [`core::panic!`] and [`std::panic!`] operate identically. But in earlier editions, they differ; only [`std::panic!`] accepts a [`String`] as the format argument.
>
> E.g., this is an error:
>
> ```rust,edition2018,compile_fail,E0308
> extern crate core;
> use ::core::prelude::v1::*;
> fn main() {
>     panic!(std::string::String::new()); // ERROR.
> }
> ```
>
> And this is accepted:
>
>
> ```rust,edition2018,ignore
> #![no_std]
> extern crate std;
> use ::std::prelude::v1::*;
> fn main() {
>     panic!(std::string::String::new()); // OK.
> }
> ```
>
> Don't rely on this behavior; the plan is to remove it.
>
> For details, see Rust issue #147319.

```rust
mod glob {
    pub mod ambig {
        pub struct Name;
    }
}

// Outer `ambig` candidate.
pub mod ambig {
    pub struct Name;
}

const _: () = {
    // Cannot resolve `ambig` through this glob
    // because of the outer `ambig` candidate above.
    use glob::*;
    use ambig::Name; // ERROR: `ambig` is ambiguous.
};
```

```rust
// As above, but with macros.
pub mod m {
    macro_rules! f {
        () => {};
    }
    pub(crate) use f;
}
pub mod glob {
    macro_rules! f {
        () => {};
    }
    pub(crate) use f as ambig;
}

use m::f as ambig;

const _: () = {
    use glob::*;
    ambig!(); // ERROR: `ambig` is ambiguous.
};
```

> **Note:**
> These ambiguity errors are specific to expansion-time resolution. Having multiple candidates available for a given name during later stages of resolution is not considered an error. So long as none of the imports themselves are ambiguous, there will always be a single unambiguous closest resolution.
>
> ```rust,no_run
> mod glob {
>     pub const AMBIG: u8 = 1;
> }
>
> mod outer {
>     pub const AMBIG: u8 = 2;
> }
>
> use outer::AMBIG;
>
> const C: () = {
>     use glob::*;
>     assert!(AMBIG == 1);
>     //      ^---- This `AMBIG` is resolved during primary resolution.
> };
> ```

r[names.resolution.expansion.imports.ambiguity.path-vs-textual-macro]
Names may not be resolved through ambiguous macro reexports. Macro reexports are ambiguous when they would shadow a textual macro candidate for the same name in an [outer scope].

```rust
// Textual macro candidate.
macro_rules! ambig {
    () => {}
}

// Path-based macro candidate.
macro_rules! path_based {
    () => {}
}

pub fn f() {
    // This reexport of the `path_based` macro definition
    // as `ambig` may not shadow the `ambig` macro definition
    // which is resolved via textual macro scope.
    use path_based as ambig;
    ambig!(); // ERROR: `ambig` is ambiguous.
}
```

> **Note:**
> This restriction is needed due to implementation details in the compiler, specifically the current scope visitation logic and the complexity of supporting this behavior. This ambiguity error may be removed in the future.

r[names.resolution.expansion.macros]
