---
title: "Names"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/names.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[names]
# Names

r[names.intro]
An *entity* is a language construct that can be referred to in some way within the source program, usually via a [path]. Entities include [types], [items], [generic parameters], [variable bindings], [loop labels], [lifetimes], [fields], [attributes], and [lints].

A *declaration* is a syntactical construct that can introduce a *name* to refer to an entity. Entity names are valid within a [*scope*] --- a region of source text where that name may be referenced.

Some entities are explicitly declared in the source code, and some are implicitly declared as part of the language or compiler extensions.

[*Paths*] are used to refer to an entity, possibly in another module or type.

Lifetimes and loop labels use a dedicated syntax using a leading quote.

Names are segregated into different [*namespaces*], allowing entities in different namespaces to share the same name without conflict.

[*Name resolution*] is the compile-time process of tying paths, identifiers, and labels to entity declarations.

Access to certain names may be restricted based on their [*visibility*].

r[names.explicit]
## Explicitly declared entities

r[names.explicit.list]
Entities that explicitly introduce a name in the source code are:

r[names.explicit.item-decl]
* [Items]:
    * [Module declarations]
    * [External crate declarations]
    * [Use declarations]
    * [Function declarations] and [function parameters]
    * [Type aliases]
    * [struct], [union], [enum], enum variant declarations, and their named fields
    * [Constant item declarations]
    * [Static item declarations]
    * [Trait item declarations] and their [associated items]
    * [External block items]
    * [`macro_rules` declarations] and [matcher metavariables]
    * [Implementation] associated items

r[names.explicit.expr]
* [Expressions]:
    * [Closure] parameters
    * [`while let`] pattern bindings
    * [`for`] pattern bindings
    * [`if let`] pattern bindings
    * [`match`] pattern bindings
    * [Loop labels]

r[names.explicit.generics]
* [Generic parameters]

r[names.explicit.higher-ranked-bounds]
* [Higher ranked trait bounds]

r[names.explicit.binding]
* [`let` statement] pattern bindings

r[names.explicit.macro_use]
* The [`macro_use` attribute] can introduce macro names from another crate

r[names.explicit.macro_export]
* The [`macro_export` attribute] can introduce an alias for the macro into the crate root

r[names.explicit.macro-invocation]
Additionally, [macro invocations] and [attributes] can introduce names by expanding to one of the above items.

r[names.implicit]
## Implicitly declared entities

r[names.implicit.list]
The following entities are implicitly defined by the language, or are introduced by compiler options and extensions:

r[names.implicit.primitive-types]
* [Language prelude]:
    * [Boolean type] --- `bool`
    * Textual types --- [`char`] and [`str`]
    * [Integer types] --- `i8`, `i16`, `i32`, `i64`, `i128`, `u8`, `u16`, `u32`, `u64`, `u128`
    * [Machine-dependent integer types] --- `usize` and `isize`
    * [floating-point types] --- `f32` and `f64`

r[names.implicit.builtin-attributes]
* [Built-in attributes]

r[names.implicit.prelude]
* [Standard library prelude] items, attributes, and macros

r[names.implicit.stdlib]
* Standard library crates in the root module

r[names.implicit.extern-prelude]
* External crates linked by the compiler

r[names.implicit.tool-attributes]
* [Tool attributes]

r[names.implicit.lints]
* [Lints] and [tool lint attributes]

r[names.implicit.derive-helpers]
* [Derive helper attributes] are valid within an item without being explicitly imported

r[names.implicit.lifetime-static]
* The [`'static`] lifetime

r[names.implicit.root]
Additionally, the crate root module does not have a name, but can be referred to with certain [path qualifiers] or aliases.
