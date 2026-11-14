---
title: "Macros by example (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/macros-by-example.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Macros by example (part 3 of 3)

## Follow-set ambiguity restrictions

r[macro.decl.follow-set.intro]
The parser used by the macro system is reasonably powerful, but it is limited in order to prevent ambiguity in current or future versions of the language.

r[macro.decl.follow-set.token-restriction]
In particular, in addition to the rule about ambiguous expansions, a nonterminal matched by a metavariable must be followed by a token which has been decided can be safely used after that kind of match.

As an example, a macro matcher like `$i:expr [ , ]` could in theory be accepted in Rust today, since `[,]` cannot be part of a legal expression and therefore the parse would always be unambiguous. However, because `[` can start trailing expressions, `[` is not a character which can safely be ruled out as coming after an expression. If `[,]` were accepted in a later version of Rust, this matcher would become ambiguous or would misparse, breaking working code. Matchers like `$i:expr,` or `$i:expr;` would be legal, however, because `,` and `;` are legal expression separators. The specific rules are:

r[macro.decl.follow-set.token-expr-stmt]
  * `expr` and `stmt` may only be followed by one of: `=>`, `,`, or `;`.

r[macro.decl.follow-set.token-pat_param]
  * `pat_param` may only be followed by one of: `=>`, `,`, `=`, `|`, `if`, or `in`.

r[macro.decl.follow-set.token-pat]
  * `pat` may only be followed by one of: `=>`, `,`, `=`, `if`, or `in`.

r[macro.decl.follow-set.token-path-ty]
  * `path` and `ty` may only be followed by one of: `=>`, `,`, `=`, `|`, `;`, `:`, `>`, `>>`, `[`, `{`, `as`, `where`, or a macro variable of `block` fragment specifier.

r[macro.decl.follow-set.token-vis]
  * `vis` may only be followed by one of: `,`, an identifier other than a non-raw `priv`, any token that can begin a type, or a metavariable with a `ident`, `ty`, or `path` fragment specifier.

r[macro.decl.follow-set.token-other]
  * All other fragment specifiers have no restrictions.

r[macro.decl.follow-set.edition2021]
> [!EDITION-2021]
> Before the 2021 edition, `pat` may also be followed by `|`.

r[macro.decl.follow-set.repetition]
When repetitions are involved, then the rules apply to every possible number of expansions, taking separators into account. This means:

  * If the repetition includes a separator, that separator must be able to follow the contents of the repetition.
  * If the repetition can repeat multiple times (`*` or `+`), then the contents must be able to follow themselves.
  * The contents of the repetition must be able to follow whatever comes before, and whatever comes after must be able to follow the contents of the repetition.
  * If the repetition can match zero times (`*` or `?`), then whatever comes after must be able to follow whatever comes before.

For more detail, see the [formal specification].
