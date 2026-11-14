---
title: "Tokens (part 4 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/tokens.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Tokens (part 4 of 4)

## Reserved tokens

r[lex.token.reserved.intro]
Several token forms are reserved for future use or to avoid confusion. It is an error for the source input to match one of these forms.

r[lex.token.reserved.syntax]
```grammar
RESERVED_TOKEN ->
      RESERVED_GUARDED_STRING_LITERAL
    | RESERVED_POUNDS
    | RESERVED_RAW_IDENTIFIER
    | RESERVED_RAW_LIFETIME
    | RESERVED_TOKEN_DOUBLE_QUOTE
    | RESERVED_TOKEN_LIFETIME
    | RESERVED_TOKEN_POUND
    | RESERVED_TOKEN_SINGLE_QUOTE
```

r[lex.token.reserved-prefix]
## Reserved prefixes

r[lex.token.reserved-prefix.syntax]
```grammar
RESERVED_TOKEN_DOUBLE_QUOTE ->
    IDENTIFIER_OR_KEYWORD _except `b` or `c` or `r` or `br` or `cr`_ `"`

RESERVED_TOKEN_SINGLE_QUOTE ->
    IDENTIFIER_OR_KEYWORD _except `b`_ `'`

RESERVED_TOKEN_POUND ->
    IDENTIFIER_OR_KEYWORD _except `r` or `br` or `cr`_ `#`

RESERVED_TOKEN_LIFETIME ->
    `'` IDENTIFIER_OR_KEYWORD _except `r`_ `#`
```

r[lex.token.reserved-prefix.intro]
Some lexical forms known as _reserved prefixes_ are reserved for future use.

r[lex.token.reserved-prefix.id]
Source input which would otherwise be lexically interpreted as a non-raw identifier (or a keyword) which is immediately followed by a `#`, `'`, or `"` character (without intervening whitespace) is identified as a reserved prefix.

r[lex.token.reserved-prefix.raw-token]
Note that raw identifiers, raw string literals, and raw byte string literals may contain a `#` character but are not interpreted as containing a reserved prefix.

r[lex.token.reserved-prefix.strings]
Similarly the `r`, `b`, `br`, `c`, and `cr` prefixes used in raw string literals, byte literals, byte string literals, raw byte string literals, C string literals, and raw C string literals are not interpreted as reserved prefixes.

r[lex.token.reserved-prefix.life]
Source input which would otherwise be lexically interpreted as a non-raw lifetime (or a keyword) which is immediately followed by a `#` character (without intervening whitespace) is identified as a reserved lifetime prefix.

r[lex.token.reserved-prefix.edition2021]
> [!EDITION-2021]
> Starting with the 2021 edition, reserved prefixes are reported as an error by the lexer (in particular, they cannot be passed to macros).
>
> Before the 2021 edition, reserved prefixes are accepted by the lexer and interpreted as multiple tokens (for example, one token for the identifier or keyword, followed by a `#` token).
>
> Examples accepted in all editions:
> ```rust
> macro_rules! lexes {($($_:tt)*) => {}}
> lexes!{a #foo}
> lexes!{continue 'foo}
> lexes!{match "..." {}}
> lexes!{r#let#foo}         // three tokens: r#let # foo
> lexes!{'prefix #lt}
> ```
>
> Examples accepted before the 2021 edition but rejected later:
> ```rust,edition2018
> macro_rules! lexes {($($_:tt)*) => {}}
> lexes!{a#foo}
> lexes!{continue'foo}
> lexes!{match"..." {}}
> lexes!{'prefix#lt}
> ```

r[lex.token.reserved-guards]
## Reserved guards

r[lex.token.reserved-guards.syntax]
```grammar
RESERVED_GUARDED_STRING_LITERAL -> `#`+ STRING_LITERAL

RESERVED_POUNDS -> `#`{2..}
```

r[lex.token.reserved-guards.intro]
The reserved guards are syntax reserved for future use, and will generate a compile error if used.

r[lex.token.reserved-guards.string-literal]
The *reserved guarded string literal* is a token of one or more `U+0023` (`#`) immediately followed by a [STRING_LITERAL].

r[lex.token.reserved-guards.pounds]
The *reserved pounds* is a token of two or more `U+0023` (`#`).

r[lex.token.reserved-guards.edition2024]
> [!EDITION-2024]
> Before the 2024 edition, reserved guards are accepted by the lexer and interpreted as multiple tokens. For example, the `#"<example-value>"#` form is interpreted as three tokens. `##` is interpreted as two tokens.
