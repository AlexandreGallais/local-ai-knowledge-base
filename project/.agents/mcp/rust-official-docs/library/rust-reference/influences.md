---
title: "Influences"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/influences.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Influences

Rust is not a particularly original language, with design elements coming from a wide range of sources. Some of these are listed below (including elements that have since been removed):

* SML, OCaml: algebraic data types, pattern matching, type inference, semicolon statement separation
* C++: references, RAII, smart pointers, move semantics, monomorphization, memory model
* ML Kit, Cyclone: region based memory management
* Haskell (GHC): typeclasses, type families
* Newsqueak, Alef, Limbo: channels, concurrency
* Erlang: message passing, thread failure, ~~linked thread failure~~, ~~lightweight concurrency~~
* Swift: optional bindings
* Scheme: hygienic macros
* C#: attributes
* Ruby: closure syntax, ~~block syntax~~
* NIL, Hermes: ~~typestate~~
* Unicode Annex #31: identifier and pattern syntax
