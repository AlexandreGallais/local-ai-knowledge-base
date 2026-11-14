---
title: "Tokens (part 2 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/tokens.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Tokens (part 2 of 4)

## Literals

r[lex.token.literal.intro]
Literals are tokens used in [literal expressions].

### Examples

#### Characters and strings

|                                              | Example         | `#` sets[^nsets] | Characters  | Escapes             |
|----------------------------------------------|-----------------|------------|-------------|---------------------|
| Character             | `'H'`           | 0          | All Unicode | Quote & ASCII & Unicode |
| String                   | `"hello"`       | 0          | All Unicode | Quote & ASCII & Unicode |
| Raw string           | `r#"hello"#`    | <256       | All Unicode | `N/A`                                                      |
| Byte                       | `b'H'`          | 0          | All ASCII   | Quote & Byte                               |
| Byte string         | `b"hello"`      | 0          | All ASCII   | Quote & Byte                               |
| Raw byte string | `br#"hello"#`   | <256       | All ASCII   | `N/A`                                                      |
| C string               | `c"hello"`      | 0          | All Unicode | Quote & Byte & Unicode   |
| Raw C string       | `cr#"hello"#`   | <256       | All Unicode | `N/A`                                                                           |

#### ASCII escapes

|   | Name |
|---|------|
| `\x41` | 7-bit character code (exactly 2 hex digits, up to 0x7F) |
| `\n` | Newline |
| `\r` | Carriage return |
| `\t` | Tab |
| `\\` | Backslash |
| `\0` | Null |

#### Byte escapes

|   | Name |
|---|------|
| `\x7F` | 8-bit character code (exactly 2 hex digits) |
| `\n` | Newline |
| `\r` | Carriage return |
| `\t` | Tab |
| `\\` | Backslash |
| `\0` | Null |

#### Unicode escapes

|   | Name |
|---|------|
| `\u{7FFF}` | 24-bit Unicode character code (up to 6 hex digits) |

#### Quote escapes

|   | Name |
|---|------|
| `\'` | Single quote |
| `\"` | Double quote |

#### Numbers

| Number literals[^nl] | Example | Exponentiation |
|----------------------------------------|---------|----------------|
| Decimal integer | `98_222` | `N/A` |
| Hex integer | `0xff` | `N/A` |
| Octal integer | `0o77` | `N/A` |
| Binary integer | `0b1111_0000` | `N/A` |
| Floating-point | `123.0E+77` | `Optional` |

r[lex.token.literal.suffix]
#### Suffixes

r[lex.token.literal.literal.suffix.intro]
A suffix is a sequence of characters following (without intervening whitespace) the primary part of a literal of the same form as a non-raw identifier or keyword.

r[lex.token.literal.suffix.syntax]
```grammar
SUFFIX ->
      `_` ^ XID_Continue+
    | XID_Start XID_Continue*
```

r[lex.token.literal.suffix.validity]
Any kind of literal (string, integer, etc.) with any suffix is valid as a token.

A literal token with any suffix can be passed to a macro without producing an error. The macro itself will decide how to interpret such a token and whether to produce an error or not. In particular, the `literal` fragment specifier for by-example macros matches literal tokens with arbitrary suffixes.

```rust
macro_rules! blackhole { ($tt:tt) => () }
macro_rules! blackhole_lit { ($l:literal) => () }

blackhole!("string"suffix); // OK
blackhole_lit!(1suffix); // OK
```

r[lex.token.literal.suffix.parse]
However, suffixes on literal tokens which are interpreted as literal expressions or patterns are restricted. Any suffixes are rejected on non-numeric literal tokens, and numeric literal tokens are accepted only with suffixes from the list below.

| Integer | Floating-point |
|---------|----------------|
| `u8`, `i8`, `u16`, `i16`, `u32`, `i32`, `u64`, `i64`, `u128`, `i128`, `usize`, `isize` | `f32`, `f64` |

### Character and string literals

r[lex.token.literal.char]
#### Character literals

r[lex.token.literal.char.syntax]
```grammar
CHAR_LITERAL ->
    `'`
        ( ~[`'` `\` LF CR TAB] | QUOTE_ESCAPE | ASCII_ESCAPE | UNICODE_ESCAPE )
    `'` SUFFIX?

QUOTE_ESCAPE -> `\'` | `\"`

ASCII_ESCAPE ->
      `\x` OCT_DIGIT HEX_DIGIT
    | `\n` | `\r` | `\t` | `\\` | `\0`

UNICODE_ESCAPE ->
    `\u{` ( HEX_DIGIT `_`* ){1..=6} _valid hex char value_ `}`[^valid-hex-char]
```

r[lex.token.literal.char.intro]
A _character literal_ is a single Unicode character enclosed within two `U+0027` (single-quote) characters, with the exception of `U+0027` itself, which must be _escaped_ by a preceding `U+005C` character (`\`).

r[lex.token.literal.str]
#### String literals

r[lex.token.literal.str.syntax]
```grammar
STRING_LITERAL ->
    `"` (
        ~[`"` `\` CR]
      | QUOTE_ESCAPE
      | ASCII_ESCAPE
      | UNICODE_ESCAPE
      | STRING_CONTINUE
    )* `"` SUFFIX?

STRING_CONTINUE -> `\` LF [TAB LF CR SP]*
```

r[lex.token.literal.str.intro]
A _string literal_ is a sequence of any Unicode characters enclosed within two `U+0022` (double-quote) characters, with the exception of `U+0022` itself, which must be _escaped_ by a preceding `U+005C` character (`\`).

r[lex.token.literal.str.linefeed]
Line-breaks, represented by the  character `U+000A` (LF), are allowed in string literals. The character `U+000D` (CR) may not appear in a string literal. When an unescaped `U+005C` character (`\`) occurs immediately before a line break, the line break does not appear in the string represented by the token. See [String continuation escapes] for details.

r[lex.token.literal.char-escape]
#### Character escapes

r[lex.token.literal.char-escape.intro]
Some additional _escapes_ are available in either character or non-raw string literals. An escape starts with a `U+005C` (`\`) and continues with one of the following forms:

r[lex.token.literal.char-escape.ascii]
* A _7-bit code point escape_ starts with `U+0078` (`x`) and is followed by exactly two _hex digits_ with value up to `0x7F`. It denotes the ASCII character with value equal to the provided hex value. Higher values are not permitted because it is ambiguous whether they mean Unicode code points or byte values.

r[lex.token.literal.char-escape.unicode]
* A _24-bit code point escape_ starts with `U+0075` (`u`) and is followed by up to six _hex digits_ surrounded by braces `U+007B` (`{`) and `U+007D` (`}`). It denotes the Unicode code point equal to the provided hex value. The value must be a valid Unicode scalar value.

r[lex.token.literal.char-escape.whitespace]
* A _whitespace escape_ is one of the characters `U+006E` (`n`), `U+0072` (`r`), or `U+0074` (`t`), denoting the Unicode values `U+000A` (LF), `U+000D` (CR) or `U+0009` (HT) respectively.

r[lex.token.literal.char-escape.null]
* The _null escape_ is the character `U+0030` (`0`) and denotes the Unicode value `U+0000` (NUL).

r[lex.token.literal.char-escape.slash]
* The _backslash escape_ is the character `U+005C` (`\`) which must be escaped in order to denote itself.

r[lex.token.literal.str-raw]
#### Raw string literals

r[lex.token.literal.str-raw.syntax]
```grammar
RAW_STRING_LITERAL ->
      `r` `"` ^ RAW_STRING_CONTENT `"` SUFFIX?
    | `r` `#`{n:1..=255} ^ `"` RAW_STRING_CONTENT_HASHED `"` `#`{n} SUFFIX?

RAW_STRING_CONTENT -> (!`"` ~CR )*

RAW_STRING_CONTENT_HASHED -> (!(`"` `#`{n}) ~CR )*
```

r[lex.token.literal.str-raw.intro]
Raw string literals do not process any escapes. They start with the character `U+0072` (`r`), followed by fewer than 256 of the character `U+0023` (`#`) and a `U+0022` (double-quote) character.

r[lex.token.literal.str-raw.body]
The _raw string body_ can contain any sequence of Unicode characters other than `U+000D` (CR). It is terminated only by another `U+0022` (double-quote) character, followed by the same number of `U+0023` (`#`) characters that preceded the opening `U+0022` (double-quote) character.

r[lex.token.literal.str-raw.content]
All Unicode characters contained in the raw string body represent themselves, the characters `U+0022` (double-quote) (except when followed by at least as many `U+0023` (`#`) characters as were used to start the raw string literal) or `U+005C` (`\`) do not have any special meaning.

Examples for string literals:

```rust
"foo"; r"foo";                     // foo
"\"foo\""; r#""foo""#;             // "foo"

"foo #\"# bar";
r##"foo #"# bar"##;                // foo #"# bar

"\x52"; "R"; r"R";                 // R
"\\x52"; r"\x52";                  // \x52
```

### Byte and byte string literals

r[lex.token.byte]
#### Byte literals

r[lex.token.byte.syntax]
```grammar
BYTE_LITERAL ->
    `b'` ^ ( ASCII_FOR_CHAR | BYTE_ESCAPE )  `'` SUFFIX?

ASCII_FOR_CHAR -> ![`'` `\` LF CR TAB] ASCII

BYTE_ESCAPE ->
      `\x` HEX_DIGIT HEX_DIGIT
    | `\n` | `\r` | `\t` | `\\` | `\0` | `\'` | `\"`
```

r[lex.token.byte.intro]
A _byte literal_ is a single ASCII character (in the `U+0000` to `U+007F` range) or a single _escape_ preceded by the characters `U+0062` (`b`) and `U+0027` (single-quote), and followed by the character `U+0027`. If the character `U+0027` is present within the literal, it must be _escaped_ by a preceding `U+005C` (`\`) character. It is equivalent to a `u8` unsigned 8-bit integer _number literal_.

r[lex.token.str-byte]
#### Byte string literals

r[lex.token.str-byte.syntax]
```grammar
BYTE_STRING_LITERAL ->
    `b"` ^ ( ASCII_FOR_STRING | BYTE_ESCAPE | STRING_CONTINUE )* `"` SUFFIX?

ASCII_FOR_STRING -> ![`"` `\` CR] ASCII
```

r[lex.token.str-byte.intro]
A non-raw _byte string literal_ is a sequence of ASCII characters and _escapes_, preceded by the characters `U+0062` (`b`) and `U+0022` (double-quote), and followed by the character `U+0022`. If the character `U+0022` is present within the literal, it must be _escaped_ by a preceding `U+005C` (`\`) character. Alternatively, a byte string literal can be a _raw byte string literal_, defined below.

r[lex.token.str-byte.linefeed]
Line-breaks, represented by the  character `U+000A` (LF), are allowed in byte string literals. The character `U+000D` (CR) may not appear in a byte string literal. When an unescaped `U+005C` character (`\`) occurs immediately before a line break, the line break does not appear in the string represented by the token. See [String continuation escapes] for details.

r[lex.token.str-byte.escape]
Some additional _escapes_ are available in either byte or non-raw byte string literals. An escape starts with a `U+005C` (`\`) and continues with one of the following forms:

r[lex.token.str-byte.escape-byte]
* A _byte escape_ escape starts with `U+0078` (`x`) and is followed by exactly two _hex digits_. It denotes the byte equal to the provided hex value.

r[lex.token.str-byte.escape-whitespace]
* A _whitespace escape_ is one of the characters `U+006E` (`n`), `U+0072` (`r`), or `U+0074` (`t`), denoting the bytes values `0x0A` (ASCII LF), `0x0D` (ASCII CR) or `0x09` (ASCII HT) respectively.

r[lex.token.str-byte.escape-null]
* The _null escape_ is the character `U+0030` (`0`) and denotes the byte value `0x00` (ASCII NUL).

r[lex.token.str-byte.escape-slash]
* The _backslash escape_ is the character `U+005C` (`\`) which must be escaped in order to denote its ASCII encoding `0x5C`.

r[lex.token.str-byte-raw]
#### Raw byte string literals

r[lex.token.str-byte-raw.syntax]
```grammar
RAW_BYTE_STRING_LITERAL ->
      `br` `"` ^ RAW_BYTE_STRING_CONTENT `"` SUFFIX?
    | `br` `#`{n:1..=255} ^ `"` RAW_BYTE_STRING_CONTENT_HASHED `"` `#`{n} SUFFIX?

RAW_BYTE_STRING_CONTENT -> (!`"` ASCII_FOR_RAW )*

RAW_BYTE_STRING_CONTENT_HASHED -> (!(`"` `#`{n}) ASCII_FOR_RAW )*

ASCII_FOR_RAW -> !CR ASCII
```

r[lex.token.str-byte-raw.intro]
Raw byte string literals do not process any escapes. They start with the character `U+0062` (`b`), followed by `U+0072` (`r`), followed by fewer than 256 of the character `U+0023` (`#`), and a `U+0022` (double-quote) character.

r[lex.token.str-byte-raw.body]
The _raw string body_ can contain any sequence of ASCII characters other than `U+000D` (CR). It is terminated only by another `U+0022` (double-quote) character, followed by the same number of `U+0023` (`#`) characters that preceded the opening `U+0022` (double-quote) character. A raw byte string literal can not contain any non-ASCII byte.

r[lex.token.literal.str-byte-raw.content]
All characters contained in the raw string body represent their ASCII encoding, the characters `U+0022` (double-quote) (except when followed by at least as many `U+0023` (`#`) characters as were used to start the raw string literal) or `U+005C` (`\`) do not have any special meaning.

Examples for byte string literals:

```rust
b"foo"; br"foo";                     // foo
b"\"foo\""; br#""foo""#;             // "foo"

b"foo #\"# bar";
br##"foo #"# bar"##;                 // foo #"# bar

b"\x52"; b"R"; br"R";                // R
b"\\x52"; br"\x52";                  // \x52
```
