---
title: "Struct types"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/struct.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.struct]
# Struct types

r[type.struct.intro]
A `struct` *type* is a heterogeneous product of other types, called the *fields* of the type.[^structtype]

r[type.struct.constructor]
New instances of a `struct` can be constructed with a [struct expression].

r[type.struct.layout]
The memory layout of a `struct` is undefined by default to allow for compiler optimizations like field reordering, but it can be fixed with the [`repr` attribute]. In either case, fields may be given in any order in a corresponding struct *expression*; the resulting `struct` value will always have the same memory layout.

r[type.struct.field-visibility]
The fields of a `struct` may be qualified by [visibility modifiers], to allow access to data in a struct outside a module.

r[type.struct.tuple]
A _tuple struct_ type is just like a struct type, except that the fields are anonymous.

r[type.struct.unit]
A _unit-like struct_ type is like a struct type, except that it has no fields. The one value constructed by the associated [struct expression] is the only value that inhabits such a type.
