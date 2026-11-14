---
title: "Literal expressions (part 1 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/literal-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[expr.literal]
# Literal expressions

r[expr.literal.syntax]
```grammar
LiteralExpression ->
      CHAR_LITERAL
    | STRING_LITERAL
    | RAW_STRING_LITERAL
    | BYTE_LITERAL
    | BYTE_STRING_LITERAL
    | RAW_BYTE_STRING_LITERAL
    | C_STRING_LITERAL
    | RAW_C_STRING_LITERAL
    | INTEGER_LITERAL
    | FLOAT_LITERAL
    | `true`
    | `false`
```

r[expr.literal.intro]
A _literal expression_ is an expression consisting of a single token, rather than a sequence of tokens, that immediately and directly denotes the value it evaluates to, rather than referring to it by name or some other evaluation rule.

r[expr.literal.const-expr]
A literal is a form of [constant expression], so is evaluated (primarily) at compile time.

r[expr.literal.literal-token]
Each of the lexical literal forms described earlier can make up a literal expression, as can the keywords `true` and `false`.

```rust
"hello";   // string type
'5';       // character type
5;         // integer type
```

r[expr.literal.string-representation]
In the descriptions below, the _string representation_ of a token is the sequence of characters from the input which matched the token's production in a *Lexer* grammar snippet.

> **Note:**
> This string representation never includes a character `U+000D` (CR) immediately followed by `U+000A` (LF): this pair would have been previously transformed into a single `U+000A` (LF).

r[expr.literal.escape]
## Escapes

r[expr.literal.escape.intro]
The descriptions of textual literal expressions below make use of several forms of _escape_.

r[expr.literal.escape.sequence]
Each form of escape is characterised by:
 * an _escape sequence_: a sequence of characters, which always begins with `U+005C` (`\`)
 * an _escaped value_: either a single character or an empty sequence of characters

In the definitions of escapes below:
 * An _octal digit_ is any of the characters in the range \[`0`-`7`].
 * A _hexadecimal digit_ is any of the characters in the ranges \[`0`-`9`], \[`a`-`f`], or \[`A`-`F`].

r[expr.literal.escape.simple]
### Simple escapes

Each sequence of characters occurring in the first column of the following table is an escape sequence.

In each case, the escaped value is the character given in the corresponding entry in the second column.

| Escape sequence | Escaped value            |
|-----------------|--------------------------|
| `\0`            | U+0000 (NUL)             |
| `\t`            | U+0009 (HT)              |
| `\n`            | U+000A (LF)              |
| `\r`            | U+000D (CR)              |
| `\"`            | U+0022 (QUOTATION MARK)  |
| `\'`            | U+0027 (APOSTROPHE)      |
| `\\`            | U+005C (REVERSE SOLIDUS) |

r[expr.literal.escape.hex-octet]
### 8-bit escapes

The escape sequence consists of `\x` followed by two hexadecimal digits.

The escaped value is the character whose [Unicode scalar value] is the result of interpreting the final two characters in the escape sequence as a hexadecimal integer, as if by [`u8::from_str_radix`] with radix 16.

> **Note:**
> The escaped value therefore has a [Unicode scalar value] in the range of `u8`.

r[expr.literal.escape.hex-ascii]
### 7-bit escapes

The escape sequence consists of `\x` followed by an octal digit then a hexadecimal digit.

The escaped value is the character whose [Unicode scalar value] is the result of interpreting the final two characters in the escape sequence as a hexadecimal integer, as if by [`u8::from_str_radix`] with radix 16.

r[expr.literal.escape.unicode]
### Unicode escapes

The escape sequence consists of `\u{`, followed by a sequence of characters each of which is a hexadecimal digit or `_`, followed by `}`.

The escaped value is the character whose [Unicode scalar value] is the result of interpreting the hexadecimal digits contained in the escape sequence as a hexadecimal integer, as if by [`u32::from_str_radix`] with radix 16.

> **Note:**
> The permitted forms of a [CHAR_LITERAL] or [STRING_LITERAL] token <example-value> that there is such a character.

r[expr.literal.continuation]
### String continuation escapes

The escape sequence consists of `\` followed immediately by `U+000A` (LF), and all following whitespace characters before the next non-whitespace character. For this purpose, the whitespace characters are `U+0009` (HT), `U+000A` (LF), `U+000D` (CR), and `U+0020` (SPACE).

The escaped value is an empty sequence of characters.

> **Note:**
> The effect of this form of escape is that a string continuation skips following whitespace, including additional newlines. Thus `a`, `b` and `c` are equal:
>
> ```rust
> let a = "foobar";
> let b = "foo\
>          bar";
> let c = "foo\
>
>      bar";
>
> assert_eq!(a, b);
> assert_eq!(b, c);
> ```
>
> Skipping additional newlines (as in example c) is potentially confusing and unexpected. This behavior may be adjusted in the future. Until a decision is made, it is recommended to avoid relying on skipping multiple newlines with line continuations. See this issue for more information.

r[expr.literal.char]
## Character literal expressions

r[expr.literal.char.intro]
A character literal expression consists of a single [CHAR_LITERAL] token.

r[expr.literal.char.type]
The expression's type is the primitive [`char`] type.

r[expr.literal.char.no-suffix]
The token must not have a suffix.

r[expr.literal.char.literal-content]
The token'<example-value>'`) and preceding the last `U+0027` (`'`) in the string representation of the token.

r[expr.literal.char.represented]
The literal expression's _represented character_ is derived from the literal content as follows:

r[expr.literal.char.escape]
* If the literal content is one of the following forms of escape sequence, the represented character is the escape sequence's escaped value:
    * [Simple escapes]
    * [7-bit escapes]
    * [Unicode escapes]

r[expr.literal.char.single]
* Otherwise the represented character is the single character that makes up the literal content.

r[expr.literal.char.result]
The expression's value is the [`char`] corresponding to the represented character's [Unicode scalar value].

> **Note:**
> The permitted forms of a [CHAR_LITERAL] token <example-value> that these rules always produce a single character.

Examples of character literal expressions:

```rust
'R';                               // R
'\'';                              // '
'\x52';                            // R
'\u{00E6}';                        // LATIN SMALL LETTER AE (U+00E6)
```

r[expr.literal.string]
## String literal expressions

r[expr.literal.string.intro]
A string literal expression consists of a single [STRING_LITERAL] or [RAW_STRING_LITERAL] token.

r[expr.literal.string.type]
The expression's type is a shared reference (with `static` lifetime) to the primitive [`str`] type. That is, the type is `&'static str`.

r[expr.literal.string.no-suffix]
The token must not have a suffix.

r[expr.literal.string.literal-content]
The token's _literal content_ is the sequence of characters following the first `U+0022` (`"<example-value>"`) in the string representation of the token.

r[expr.literal.string.represented]
The literal expression's _represented string_ is a sequence of characters derived from the literal content as follows:

r[expr.literal.string.escape]
* If the token is a [STRING_LITERAL], each escape sequence of any of the following forms occurring in the literal content is replaced by the escape sequence's escaped value.
    * [Simple escapes]
    * [7-bit escapes]
    * [Unicode escapes]
    * [String continuation escapes]

  These replacements take place in left-to-right order. For example, the token `"<example-value>"` is converted to the characters `\` `x` `4` `1`.

r[expr.literal.string.raw]
* If the token is a [RAW_STRING_LITERAL], the represented string is identical to the literal content.

r[expr.literal.string.result]
The expression's value is a reference to a statically allocated [`str`] containing the UTF-8 encoding of the represented string.

Examples of string literal expressions:

```rust
"foo"; r"foo";                     // foo
"\"foo\""; r#""foo""#;             // "foo"

"foo #\"# bar";
r##"foo #"# bar"##;                // foo #"# bar

"\x52"; "R"; r"R";                 // R
"\\x52"; r"\x52";                  // \x52
```

r[expr.literal.byte-char]
## Byte literal expressions

r[expr.literal.byte-char.intro]
A byte literal expression consists of a single [BYTE_LITERAL] token.

r[expr.literal.byte-char.literal]
The expression's type is the primitive `u8` type.

r[expr.literal.byte-char.no-suffix]
The token must not have a suffix.

r[expr.literal.byte-char.literal-content]
The token'<example-value>'`) and preceding the last `U+0027` (`'`) in the string representation of the token.

r[expr.literal.byte-char.represented]
The literal expression's _represented character_ is derived from the literal content as follows:

r[expr.literal.byte-char.escape]
* If the literal content is one of the following forms of escape sequence, the represented character is the escape sequence's escaped value:
    * [Simple escapes]
    * [8-bit escapes]

r[expr.literal.byte-char.single]
* Otherwise the represented character is the single character that makes up the literal content.

r[expr.literal.byte-char.result]
The expression's value is the represented character's [Unicode scalar value].

> **Note:**
> The permitted forms of a [BYTE_LITERAL] token <example-value> that these rules always produce a single character, whose Unicode scalar value is in the range of `u8`.

Examples of byte literal expressions:

```rust
b'R';                              // 82
b'\'';                             // 39
b'\x52';                           // 82
b'\xA0';                           // 160
```

r[expr.literal.byte-string]
## Byte string literal expressions

r[expr.literal.byte-string.intro]
A byte string literal expression consists of a single [BYTE_STRING_LITERAL] or [RAW_BYTE_STRING_LITERAL] token.

r[expr.literal.byte-string.type]
The expression's type is a shared reference (with `static` lifetime) to an array whose element type is `u8`. That is, the type is `&'static [u8; N]`, where `N` is the number of bytes in the represented string described below.

r[expr.literal.byte-string.no-suffix]
The token must not have a suffix.

r[expr.literal.byte-string.literal-content]
The token's _literal content_ is the sequence of characters following the first `U+0022` (`"<example-value>"`) in the string representation of the token.

r[expr.literal.byte-string.represented]
The literal expression's _represented string_ is a sequence of characters derived from the literal content as follows:

r[expr.literal.byte-string.escape]
* If the token is a [BYTE_STRING_LITERAL], each escape sequence of any of the following forms occurring in the literal content is replaced by the escape sequence's escaped value.
    * [Simple escapes]
    * [8-bit escapes]
    * [String continuation escapes]

  These replacements take place in left-to-right order. For example, the token `b"<example-value>"` is converted to the characters `\` `x` `4` `1`.

r[expr.literal.byte-string.raw]
* If the token is a [RAW_BYTE_STRING_LITERAL], the represented string is identical to the literal content.

r[expr.literal.byte-string.result]
The expression's value is a reference to a statically allocated array containing the [Unicode scalar values] of the characters in the represented string, in the same order.

> **Note:**
> The permitted forms of [BYTE_STRING_LITERAL] and [RAW_BYTE_STRING_LITERAL] tokens ensure that these rules always produce array element values in the range of `u8`.

Examples of byte string literal expressions:

```rust
b"foo"; br"foo";                     // foo
b"\"foo\""; br#""foo""#;             // "foo"

b"foo #\"# bar";
br##"foo #"# bar"##;                 // foo #"# bar

b"\x52"; b"R"; br"R";                // R
b"\\x52"; br"\x52";                  // \x52
```

r[expr.literal.c-string]
## C string literal expressions

r[expr.literal.c-string.intro]
A C string literal expression consists of a single [C_STRING_LITERAL] or [RAW_C_STRING_LITERAL] token.

r[expr.literal.c-string.type]
The expression's type is a shared reference (with `static` lifetime) to the standard library [CStr] type. That is, the type is `&'static core::ffi::CStr`.

r[expr.literal.c-string.no-suffix]
The token must not have a suffix.

r[expr.literal.c-string.literal-content]
The token's _literal content_ is the sequence of characters following the first `"<example-value>"` in the string representation of the token.

r[expr.literal.c-string.represented]
The literal expression's _represented bytes_ are a sequence of bytes derived from the literal content as follows:

r[expr.literal.c-string.escape]
* If the token is a [C_STRING_LITERAL], the literal content is treated as a sequence of items, each of which is either a single Unicode character other than `\` or an [escape]. The sequence of items is converted to a sequence of bytes as follows:
  * Each single Unicode character contributes its UTF-8 representation.
  * Each [simple escape] contributes the [Unicode scalar value] of its escaped value.
  * Each [8-bit escape] contributes a single byte containing the [Unicode scalar value] of its escaped value.
  * Each [unicode escape] contributes the UTF-8 representation of its escaped value.
  * Each [string continuation escape] contributes no bytes.

r[expr.literal.c-string.raw]
* If the token is a [RAW_C_STRING_LITERAL], the represented bytes are the UTF-8 encoding of the literal content.

> **Note:**
> The permitted forms of [C_STRING_LITERAL] and [RAW_C_STRING_LITERAL] tokens ensure that the represented bytes never include a null byte.

r[expr.literal.c-string.result]
The expression's value is a reference to a statically allocated [CStr] whose array of bytes contains the represented bytes followed by a null byte.

Examples of C string literal expressions:

```rust
c"foo"; cr"foo";                     // foo
c"\"foo\""; cr#""foo""#;             // "foo"

c"foo #\"# bar";
cr##"foo #"# bar"##;                 // foo #"# bar

c"\x52"; c"R"; cr"R";                // R
c"\\x52"; cr"\x52";                  // \x52

c"æ";                                // LATIN SMALL LETTER AE (U+00E6)
c"\u{00E6}";                         // LATIN SMALL LETTER AE (U+00E6)
c"\xC3\xA6";                         // LATIN SMALL LETTER AE (U+00E6)

c"\xE6".to_bytes();                  // [230]
c"\u{00E6}".to_bytes();              // [195, 166]
```

r[expr.literal.int]
