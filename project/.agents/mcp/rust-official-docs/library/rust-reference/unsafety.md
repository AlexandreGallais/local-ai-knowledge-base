---
title: "Unsafety"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/unsafety.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[safety]
# Unsafety

r[safety.intro]
Unsafe operations are those that can potentially violate the memory-safety guarantees of Rust's static semantics.

r[safety.unsafe-ops]
The following language level features cannot be used in the safe subset of Rust:

r[safety.unsafe-deref]
- Dereferencing a [raw pointer].

r[safety.unsafe-static]
- Reading or writing a [mutable] or unsafe [external] static variable.

r[safety.unsafe-union-access]
- Accessing a field of a [`union`], other than to assign to it.

r[safety.unsafe-call]
- Calling an unsafe function.

r[safety.unsafe-target-feature-call]
- Calling a safe function marked with a `target_feature` from a function that does not have a `target_feature` attribute enabling the same features (see [attributes.codegen.target_feature.safety-restrictions]).

r[safety.unsafe-impl]
- Implementing an [unsafe trait].

r[safety.unsafe-extern]
- Declaring an [`extern`] block[^extern-2024].

r[safety.unsafe-attribute]
- Applying an [unsafe attribute] to an item.
