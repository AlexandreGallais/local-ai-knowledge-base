---
title: "Name resolution (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/names/name-resolution.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Name resolution (part 3 of 3)

### Macros

r[names.resolution.expansion.macros.intro]
Macros are resolved by iterating through the available scopes to find the available candidates. Macros are split into two sub-namespaces, one for function-like macros, and the other for attributes and derives. Resolution candidates from the incorrect sub-namespace are ignored.

r[names.resolution.expansion.macros.visitation-order]
The available scope kinds are visited in the following order. Each of these scope kinds represent one or more scopes.

* [Derive helpers]
* [Textual scope macros]
* [Path-based scope macros]
* [`macro_use` prelude]
* [Standard library prelude]
* [Builtin attributes]

> **Note:**
> The compiler will attempt to resolve derive helpers that are used before their associated macro introduces them into scope. This scope is visited after the scope for resolving derive helper candidates that are correctly in scope. This behavior is slated for removal.
>
> For more info see [derive helper scope].

> **Note:**
> This visitation order may change in the future, such as interleaving the visitation of textual and path-based scope candidates based on their lexical scopes.

> [!EDITION-2018]
> Starting in edition 2018 the `#[macro_use]` prelude is not visited when `#[no_implicit_prelude]` is present.

r[names.resolution.expansion.macros.reserved-names]
The names `cfg` and `cfg_attr` are reserved in the macro attribute [sub-namespace].

r[names.resolution.expansion.macros.ambiguity]
#### Ambiguities

r[names.resolution.expansion.macros.ambiguity.more-expanded-vs-outer]
Names may not be resolved through ambiguous candidates inside of macro expansions. Candidates inside of macro expansions are ambiguous when they would shadow a candidate for the same name from outside of the first candidate's macro expansion and the invocation of the name being resolved is also from outside of the first candidate's macro expansion.

```rust
macro_rules! define_ambig {
    () => {
        macro_rules! ambig {
            () => {}
        }
    }
}

// Introduce outer candidate definition for `ambig` macro invocation.
macro_rules! ambig {
    () => {}
}

// Introduce a second candidate definition for `ambig` inside of a
// macro expansion.
define_ambig!();

// The definition of `ambig` from the second invocation
// of `define_ambig` is the innermost canadidate.
//
// The definition of `ambig` from the first invocation of
// `define_ambig` is the second candidate.
//
// The compiler checks that the first candidate is inside of a macro
// expansion, that the second candidate is not from within the same
// macro expansion, and that the name being resolved is not from
// within the same macro expansion.
ambig!(); // ERROR: `ambig` is ambiguous.
```

The reverse is not considered ambiguous.

```rust
# macro_rules! define_ambig {
#     () => {
#         macro_rules! ambig {
#             () => {}
#         }
#     }
# }
// Swap order of definitions.
define_ambig!();
macro_rules! ambig {
    () => {}
}
// The innermost candidate is now less expanded so it may shadow more
// the macro expanded definition above it.
ambig!();
```

Nor is it ambiguous if the invocation being resolved is within the innermost candidate's expansion.

```rust
macro_rules! ambig {
    () => {}
}

macro_rules! define_and_invoke_ambig {
    () => {
        // Define innermost candidate.
        macro_rules! ambig {
            () => {}
        }

        // Invocation of `ambig` is in the same expansion as the
        // innermost candidate.
        ambig!(); // OK
    }
}

define_and_invoke_ambig!();
```

It doesn't matter if both definitions come from invocations of the same macro; the outermost candidate is still considered "less expanded" because it is not within the expansion containing the innermost candidate's definition.

```rust
# macro_rules! define_ambig {
#     () => {
#         macro_rules! ambig {
#             () => {}
#         }
#     }
# }
define_ambig!();
define_ambig!();
ambig!(); // ERROR: `ambig` is ambiguous.
```

This also applies to imports so long as the innermost candidate for the name is from within a macro expansion.

```rust
macro_rules! define_ambig {
    () => {
        mod ambig {
            pub struct Name;
        }
    }
}

mod ambig {
    pub struct Name;
}

const _: () = {
    // Introduce innermost candidate for
    // `ambig` mod in this macro expansion.
    define_ambig!();
    use ambig::Name; // ERROR: `ambig` is ambiguous.
};
```

r[names.resolution.expansion.macros.ambiguity.built-in-attr]
User-defined attributes or derive macros may not shadow built-in non-macro attributes (e.g. inline).

```rust
// with-helper/src/lib.rs
# use proc_macro::TokenStream;
#[proc_macro_derive(WithHelperAttr, attributes(non_exhaustive))]
//                                             ^^^^^^^^^^^^^^
//                                   User-defined attribute candidate.
// ...
# pub fn derive_with_helper_attr(_item: TokenStream) -> TokenStream {
#     TokenStream::new()
# }
```

```rust
// src/lib.rs
#[derive(with_helper::WithHelperAttr)]
#[non_exhaustive] // ERROR: `non_exhaustive` is ambiguous.
struct S;
```

> **Note:**
> This applies regardless of the name the built-in attribute is a candidate for:
>
>
> ```rust,ignore
> // with-helper/src/lib.rs
> # use proc_macro::TokenStream;
> #
> #[proc_macro_derive(WithHelperAttr, attributes(helper))]
> //                                             ^^^^^^
> //                                 User-defined attribute candidate.
> // ...
> # pub fn derive_with_helper_attr(_item: TokenStream) -> TokenStream {
> #     TokenStream::new()
> # }
> ```
>
>
> ```rust,ignore
> // src/lib.rs
> use inline as helper;
> //            ^----- Built-in attribute candidate via reexport.
>
> #[derive(with_helper::WithHelperAttr)]
> #[helper] // ERROR: `helper` is ambiguous.
> struct S;
> ```

r[names.resolution.primary]
## Primary name resolution
> **Note:**
> This is a placeholder for future expansion about primary name resolution.

r[names.resolution.type-relative]
## Type-relative resolution
> **Note:**
> This is a placeholder for future expansion about type-dependent resolution.
