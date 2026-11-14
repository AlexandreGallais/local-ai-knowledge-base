---
title: "Namespaces"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/names/namespaces.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[names.namespaces]
# Namespaces

r[names.namespaces.intro]
A *namespace* is a logical grouping of declared [names]. Names are segregated into separate namespaces based on the kind of entity the name refers to. Namespaces allow the occurrence of a name in one namespace to not conflict with the same name in another namespace.

There are several different namespaces that each contain different kinds of entities. The use of a name will look for the declaration of that name in different namespaces, based on the context, as described in the [name resolution] chapter.

r[names.namespaces.kinds]
The following is a list of namespaces, with their corresponding entities:

* Type Namespace
    * [Module declarations]
    * [External crate declarations]
    * [External crate prelude] items
    * [Struct], [union], [enum], enum variant declarations
    * [Trait item declarations]
    * [Type aliases]
    * [Associated type declarations]
    * Built-in types: [boolean], [numeric], [`char`], and [`str`]
    * [Generic type parameters]
    * [`Self` type]
    * [Tool attribute modules]
* Value Namespace
    * [Function declarations]
    * [Constant item declarations]
    * [Static item declarations]
    * [Struct constructors]
    * [Enum variant constructors]
    * [`Self` constructors]
    * [Generic const parameters]
    * [Associated const declarations]
    * [Associated function declarations]
    * Local bindings --- [`let`], [`if let`], [`while let`], [`for`], [`match`] arms, [function parameters], [closure parameters]
    * Captured [closure] variables
* Macro Namespace
    * [`macro_rules` declarations]
    * [Built-in attributes]
    * [Tool attributes]
    * [Function-like procedural macros]
    * [Derive macros]
    * [Derive macro helpers]
    * [Attribute macros]
* Lifetime Namespace
    * [Generic lifetime parameters]
* Label Namespace
    * [Loop labels]
    * [Block labels]

An example of how overlapping names in different namespaces can be used unambiguously:

```rust
// Foo introduces a type in the type namespace and a constructor in the value
// namespace.
struct Foo(u32);

// The `Foo` macro is declared in the macro namespace.
macro_rules! Foo {
    () => {};
}

// `Foo` in the `f` parameter type refers to `Foo` in the type namespace.
// `'Foo` introduces a new lifetime in the lifetime namespace.
fn example<'Foo>(f: Foo) {
    // `Foo` refers to the `Foo` constructor in the value namespace.
    let ctor = Foo;
    // `Foo` refers to the `Foo` macro in the macro namespace.
    Foo!{}
    // `'Foo` introduces a label in the label namespace.
    'Foo: loop {
        // `'Foo` refers to the `'Foo` lifetime parameter, and `Foo`
        // refers to the type namespace.
        let x: &'Foo Foo;
        // `'Foo` refers to the label.
        break 'Foo;
    }
}
```

r[names.namespaces.without]
## Named entities without a namespace

r[names.namespaces.without.intro]
The following entities have explicit names, but the names are not a part of any specific namespace.

### Fields

r[names.namespaces.without.fields]
Even though struct, enum, and union fields are named, the named fields do not live in an explicit namespace. They can only be accessed via a [field expression], which only inspects the field names of the specific type being accessed.

### Use declarations

r[names.namespaces.without.use]
A [use declaration] has named aliases that it imports into scope, but the `use` item itself does not belong to a specific namespace. Instead, it can introduce aliases into multiple namespaces, depending on the item kind being imported.

r[names.namespaces.sub-namespaces]
## Sub-namespaces

r[names.namespaces.sub-namespaces.intro]
The macro namespace is split into two sub-namespaces: one for [bang-style macros] and one for [attributes]. When an attribute is resolved, any bang-style macros in scope will be ignored. And conversely resolving a bang-style macro will ignore attribute macros in scope. This prevents one style from shadowing another.

For example, the [`cfg` attribute] and the [`cfg` macro] are two different entities with the same name in the macro namespace, but they can still be used in their respective context.

> **Note:**
> `use` imports still cannot create duplicate bindings of the same name in a module or block, regardless of sub-namespace.
>
> ```rust,ignore
> #[macro_export]
> macro_rules! mymac {
>     () => {};
> }
>
> use myattr::mymac; // error[E0252]: the name `mymac` is defined multiple times.
> ```
