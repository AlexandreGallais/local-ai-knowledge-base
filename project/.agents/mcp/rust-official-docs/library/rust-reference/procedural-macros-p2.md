---
title: "Procedural macros (part 2 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/procedural-macros.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Procedural macros (part 2 of 2)

## Declarative macro tokens and procedural macro tokens

r[macro.proc.token.intro]
Declarative `macro_rules` macros and procedural macros use similar, but different definitions for tokens (or rather [`TokenTree`s].)

r[macro.proc.token.macro_rules]
Token trees in `macro_rules` (corresponding to `tt` matchers) are defined as
- Delimited groups (`(...)`, `{...}`, etc)
- All operators supported by the language, both single-character and multi-character ones (`+`, `+=`).
    - Note that this set doesn't include the single quote `'`.
- Literals (`"string"`, `1`, etc)
    - Note that negation (e.g. `-1`) is never a part of such literal tokens, but a separate operator token.
- Identifiers, including keywords (`ident`, `r#ident`, `fn`)
- Lifetimes (`'ident`)
- Metavariable substitutions in `macro_rules` (e.g. `$my_expr` in `macro_rules! mac { ($my_expr: expr) => { $my_expr } }` after the `mac`'s expansion, which will be considered a single token tree regardless of the passed expression)

r[macro.proc.token.tree]
Token trees in procedural macros are defined as
- Delimited groups (`(...)`, `{...}`, etc)
- All punctuation characters used in operators supported by the language (`+`, but not `+=`), and also the single quote `'` character (typically used in lifetimes, see below for lifetime splitting and joining behavior)
- Literals (`"string"`, `1`, etc)
    - Negation (e.g. `-1`) is supported as a part of integer and floating point literals.
- Identifiers, including keywords (`ident`, `r#ident`, `fn`)

r[macro.proc.token.conversion.intro]
Mismatches between these two definitions are accounted for when token <example-value> are passed to and from procedural macros. Note that the conversions below may happen lazily, so they might not happen if the tokens are not actually inspected.

r[macro.proc.token.conversion.to-proc_macro]
When passed to a proc-macro
- All multi-character operators are broken into single characters.
- Lifetimes are broken into a `'` character and an identifier.
- The keyword metavariable [`$crate`] is passed as a single identifier.
- All other metavariable substitutions are represented as their underlying token streams.
    - Such token <example-value> may be wrapped into delimited groups ([`Group`]) with implicit delimiters ([`Delimiter::None`]) when it's necessary for preserving parsing priorities.
    - `tt` and `ident` substitutions are never wrapped into such groups and always represented as their underlying token trees.

r[macro.proc.token.conversion.from-proc_macro]
When emitted from a proc macro
- Punctuation characters are glued into multi-character operators when applicable.
- Single quotes `'` joined with identifiers are glued into lifetimes.
- Negative literals are converted into two tokens (the `-` and the literal) possibly wrapped into a delimited group ([`Group`]) with implicit delimiters ([`Delimiter::None`]) when it's necessary for preserving parsing priorities.

r[macro.proc.token.doc-comment]
Note that neither declarative nor procedural macros support doc comment tokens (e.g. `/// Doc`), so they are always converted to token <example-value> representing their equivalent `#[doc = r"<example-value>"]` attributes when passed to macros.
