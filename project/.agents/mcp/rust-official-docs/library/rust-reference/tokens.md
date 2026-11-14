---
title: "Tokens (part 1 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/tokens.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[lex.token]
# Tokens

r[lex.token.syntax]
```grammar
Token ->
      RESERVED_TOKEN
    | RAW_IDENTIFIER
    | CHAR_LITERAL
    | STRING_LITERAL
    | RAW_STRING_LITERAL
    | BYTE_LITERAL
    | BYTE_STRING_LITERAL
    | RAW_BYTE_STRING_LITERAL
    | C_STRING_LITERAL
    | RAW_C_STRING_LITERAL
    | FLOAT_LITERAL
    | INTEGER_LITERAL
    | LIFETIME_TOKEN
    | PUNCTUATION
    | IDENTIFIER_OR_KEYWORD
```

r[lex.token.intro]
Tokens are primitive productions in the grammar defined by regular (non-recursive) languages.  Rust source input can be broken down into the following kinds of tokens:

* [Keywords]
* Identifiers
* Literals
* Lifetimes
* Punctuation
* Delimiters

Within this documentation's grammar, "<example-value>" tokens are given in [string table production] form, and appear in `monospace` font.

r[lex.token.literal]
