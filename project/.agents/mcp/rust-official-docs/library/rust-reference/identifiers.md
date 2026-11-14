---
title: "Identifiers"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/identifiers.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[ident]
# Identifiers

r[ident.syntax]
```grammar
IDENTIFIER_OR_KEYWORD -> ( XID_Start | `_` ) XID_Continue*

XID_Start -> <`XID_Start` defined by Unicode>

XID_Continue -> <`XID_Continue` defined by Unicode>

RAW_IDENTIFIER -> `r#` IDENTIFIER_OR_KEYWORD

NON_KEYWORD_IDENTIFIER -> IDENTIFIER_OR_KEYWORD _except a [strict][lex.keywords.strict] or [reserved][lex.keywords.reserved] keyword_

IDENTIFIER -> NON_KEYWORD_IDENTIFIER | RAW_IDENTIFIER

RESERVED_RAW_IDENTIFIER ->
    `r#` (`_` | `crate` | `self` | `Self` | `super`) !XID_Continue
```

r[ident.unicode]
Identifiers follow the specification in Unicode Standard Annex #31 for Unicode version 17.0, with the additions described below. Some examples of identifiers:

* `foo`
* `_identifier`
* `r#true`
* `Москва`
* `東京`

r[ident.profile]
The profile used from UAX #31 is:

* Start := [`XID_Start`], plus the underscore character (U+005F)
* Continue := [`XID_Continue`]
* Medial := empty

> **Note:**
> Identifiers starting with an underscore are typically used to indicate an identifier that is intentionally unused, and will silence the unused warning in `rustc`.

r[ident.keyword]
Identifiers may not be a [strict] or [reserved] keyword without the `r#` prefix described below in raw identifiers.

r[ident.zero-width-chars]
Zero width non-joiner (ZWNJ U+200C) and zero width joiner (ZWJ U+200D) characters are not allowed in identifiers.

r[ident.ascii-limitations]
Identifiers are restricted to the ASCII subset of [`XID_Start`] and [`XID_Continue`] in the following situations:

* [`extern crate`] declarations (except the [AsClause] identifier)
* External crate names referenced in a [path]
* [Module] names loaded from the filesystem without a [`path` attribute]
* [`no_mangle`] attributed items
* Item names in [external blocks]

r[ident.normalization]
## Normalization

Identifiers are normalized using Normalization Form C (NFC) as defined in Unicode Standard Annex #15. Two identifiers are equal if their NFC forms are equal.

Procedural and declarative macros receive normalized identifiers in their input.

r[ident.raw]
## Raw identifiers

r[ident.raw.intro]
A raw identifier is like a normal identifier, but prefixed by `r#`. (Note that the `r#` prefix is not included as part of the actual identifier.)

r[ident.raw.allowed]
Unlike a normal identifier, a raw identifier may be any strict or reserved keyword except the ones listed above for `RAW_IDENTIFIER`.

r[ident.raw.reserved]
It is an error to use the [RESERVED_RAW_IDENTIFIER] token.
