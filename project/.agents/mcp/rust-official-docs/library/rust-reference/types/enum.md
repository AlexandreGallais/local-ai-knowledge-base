---
title: "Enumerated types"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/enum.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.enum]
# Enumerated types

r[type.enum.intro]
An *enumerated type* is a nominal, heterogeneous disjoint union type, denoted by the name of an [`enum` item]. [^enumtype]

r[type.enum.declaration]
An [`enum` item] declares both the type and a number of *variants*, each of which is independently named and has the syntax of a struct, tuple struct or unit-like struct.

r[type.enum.constructor]
New instances of an `enum` can be constructed with a [struct expression].

r[type.enum.value]
Any `enum` value consumes as much memory as the largest variant for its corresponding `enum` type, as well as the size needed to store a discriminant.

r[type.enum.name]
Enum types cannot be denoted *structurally* as types, but must be denoted by named reference to an [`enum` item].
