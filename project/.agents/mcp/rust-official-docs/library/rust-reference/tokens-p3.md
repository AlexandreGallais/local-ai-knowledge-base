---
title: "Tokens (part 3 of 4)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/tokens.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Tokens (part 3 of 4)

### C string and raw C string literals

r[lex.token.str-c]
#### C string literals

r[lex.token.str-c.syntax]
```grammar
C_STRING_LITERAL ->
    `c"` ^ (
        ~[`"` `\` CR NUL]
      | !(`\0` | `\x00`) BYTE_ESCAPE
      | !(`\u{` (`0` `_`*){1..=6} `}`) UNICODE_ESCAPE
      | STRING_CONTINUE
    )* `"` SUFFIX?
```

r[lex.token.str-c.intro]
A _C string literal_ is a sequence of Unicode characters and _escapes_, preceded by the characters `U+0063` (`c`) and `U+0022` (double-quote), and followed by the character `U+0022`. If the character `U+0022` is present within the literal, it must be _escaped_ by a preceding `U+005C` (`\`) character. Alternatively, a C string literal can be a _raw C string literal_, defined below.

r[lex.token.str-c.null]
C strings are implicitly terminated by byte `0x00`, so the C string literal `c""` is equivalent to manually constructing a `&CStr` from the byte string literal `b"\x00"`. Other than the implicit terminator, byte `0x00` is not permitted within a C string.

r[lex.token.str-c.linefeed]
Line-breaks, represented by the  character `U+000A` (LF), are allowed in C string literals. The character `U+000D` (CR) may not appear in a C string literal. When an unescaped `U+005C` character (`\`) occurs immediately before a line break, the line break does not appear in the string represented by the token. See [String continuation escapes] for details.

r[lex.token.str-c.escape]
Some additional _escapes_ are available in non-raw C string literals. An escape starts with a `U+005C` (`\`) and continues with one of the following forms:

r[lex.token.str-c.escape-byte]
* A _byte escape_ escape starts with `U+0078` (`x`) and is followed by exactly two _hex digits_. It denotes the byte equal to the provided hex value.

r[lex.token.str-c.escape-unicode]
* A _24-bit code point escape_ starts with `U+0075` (`u`) and is followed by up to six _hex digits_ surrounded by braces `U+007B` (`{`) and `U+007D` (`}`). It denotes the Unicode code point equal to the provided hex value, encoded as UTF-8.

r[lex.token.str-c.escape-whitespace]
* A _whitespace escape_ is one of the characters `U+006E` (`n`), `U+0072` (`r`), or `U+0074` (`t`), denoting the bytes values `0x0A` (ASCII LF), `0x0D` (ASCII CR) or `0x09` (ASCII HT) respectively.

r[lex.token.str-c.escape-slash]
* The _backslash escape_ is the character `U+005C` (`\`) which must be escaped in order to denote its ASCII encoding `0x5C`.

r[lex.token.str-c.char-unicode]
A C string represents bytes with no defined encoding, but a C string literal may contain Unicode characters above `U+007F`. Such characters will be replaced with the bytes of that character's UTF-8 representation.

The following C string literals are equivalent:

```rust
c"æ";        // LATIN SMALL LETTER AE (U+00E6)
c"\u{00E6}";
c"\xC3\xA6";
```

r[lex.token.str-c.edition2021]
> [!EDITION-2021]
> C string literals are accepted in the 2021 edition or later. In earlier editions the token `c""` is lexed as `c ""`.

r[lex.token.str-c-raw]
#### Raw C string literals

r[lex.token.str-c-raw.syntax]
```grammar
RAW_C_STRING_LITERAL ->
      `cr` `"` ^ RAW_C_STRING_CONTENT `"` SUFFIX?
    | `cr` `#`{n:1..=255} ^ `"` RAW_C_STRING_CONTENT_HASHED `"` `#`{n} SUFFIX?

RAW_C_STRING_CONTENT -> (!`"` ~[CR NUL] )*

RAW_C_STRING_CONTENT_HASHED -> (!(`"` `#`{n}) ~[CR NUL] )*
```

r[lex.token.str-c-raw.intro]
Raw C string literals do not process any escapes. They start with the character `U+0063` (`c`), followed by `U+0072` (`r`), followed by fewer than 256 of the character `U+0023` (`#`), and a `U+0022` (double-quote) character.

r[lex.token.str-c-raw.body]
The _raw C string body_ can contain any sequence of Unicode characters other than `U+0000` (NUL) and `U+000D` (CR). It is terminated only by another `U+0022` (double-quote) character, followed by the same number of `U+0023` (`#`) characters that preceded the opening `U+0022` (double-quote) character.

r[lex.token.str-c-raw.content]
All characters contained in the raw C string body represent themselves in UTF-8 encoding. The characters `U+0022` (double-quote) (except when followed by at least as many `U+0023` (`#`) characters as were used to start the raw C string literal) or `U+005C` (`\`) do not have any special meaning.

r[lex.token.str-c-raw.edition2021]
> [!EDITION-2021]
> Raw C string literals are accepted in the 2021 edition or later. In earlier editions the token `cr""` is lexed as `cr ""`, and `cr#""#` is lexed as `cr #""#` (which is non-grammatical).

#### Examples for C string and raw C string literals

```rust
c"foo"; cr"foo";                     // foo
c"\"foo\""; cr#""foo""#;             // "foo"

c"foo #\"# bar";
cr##"foo #"# bar"##;                 // foo #"# bar

c"\x52"; c"R"; cr"R";                // R
c"\\x52"; cr"\x52";                  // \x52
```

r[lex.token.literal.num]
### Number literals

A _number literal_ is either an _integer literal_ or a _floating-point literal_. The grammar for recognizing the two kinds of literals is mixed.

r[lex.token.literal.int]
#### Integer literals

r[lex.token.literal.int.syntax]
```grammar
INTEGER_LITERAL ->
    ( BIN_LITERAL | OCT_LITERAL | HEX_LITERAL | DEC_LITERAL )
    ^ !RESERVED_FLOAT SUFFIX?

DEC_LITERAL -> DEC_DIGIT (DEC_DIGIT|`_`)*

BIN_LITERAL -> `0b` ^ `_`* BIN_DIGIT (BIN_DIGIT|`_`)* ![`e` `E` `2`-`9`]

OCT_LITERAL -> `0o` ^ `_`* OCT_DIGIT (OCT_DIGIT|`_`)* ![`e` `E` `8`-`9`]

HEX_LITERAL -> `0x` ^ `_`* HEX_DIGIT (HEX_DIGIT|`_`)*

BIN_DIGIT -> [`0`-`1`]

OCT_DIGIT -> [`0`-`7`]

DEC_DIGIT -> [`0`-`9`]

HEX_DIGIT -> [`0`-`9` `a`-`f` `A`-`F`]

RESERVED_FLOAT -> `.` !(`.` | `_` | XID_Start)
```

r[lex.token.literal.int.kind]
An _integer literal_ has one of four forms:

r[lex.token.literal.int.kind-dec]
* A _decimal literal_ starts with a *decimal digit* and continues with any mixture of *decimal digits* and _underscores_.

r[lex.token.literal.int.kind-hex]
* A _hex literal_ starts with the character sequence `U+0030` `U+0078` (`0x`) and continues as any mixture (with at least one digit) of hex digits and underscores.

r[lex.token.literal.int.kind-oct]
* An _octal literal_ starts with the character sequence `U+0030` `U+006F` (`0o`) and continues as any mixture (with at least one digit) of octal digits and underscores.

r[lex.token.literal.int.kind-bin]
* A _binary literal_ starts with the character sequence `U+0030` `U+0062` (`0b`) and continues as any mixture (with at least one digit) of binary digits and underscores.

r[lex.token.literal.int.suffix]
Like any literal, an integer literal may be followed (immediately, without any spaces) by a suffix as described above. The suffix may not begin with `e` or `E`, as that would be interpreted as the exponent of a floating-point literal. See [Integer literal expressions] for the effect of these suffixes.

Examples of integer literals which are accepted as literal expressions:

```rust
# #![allow(overflowing_literals)]
123;
123i32;
123u32;
123_u32;

0xff;
0xff_u8;
0x01_f32; // integer 7986, not floating-point 1.0
0x01_e3;  // integer 483, not floating-point 1000.0

0o70;
0o70_i16;

0b1111_1111_1001_0000;
0b1111_1111_1001_0000i64;
0b________1;

0usize;

// These are too big for their type, but are accepted as literal expressions.
128_i8;
256_u8;

// This is an integer literal, accepted as a floating-point literal expression.
5f32;
```

Note that `-1i8`, for example, is analyzed as two tokens: `-` followed by `1i8`.

Examples of integer literals which are not accepted as literal expressions:

```rust
# #[cfg(false)] {
0invalidSuffix;
123AFB43;
0b010a;
0xAB_CD_EF_GH;
0b1111_f32;
# }
```

r[lex.token.literal.int.invalid]
##### Invalid integer literals

r[lex.token.literal.int.invalid.intro]
Certain integer literal forms are invalid. To avoid ambiguity, the tokenizer rejects them rather than splitting them into separate tokens.

```rust
0b0102;  // This is not `0b010` followed by `2`.
0o1279;  // This is not `0o127` followed by `9`.
0x80.0;  // This is not `0x80` followed by `.` and `0`.
0b101e;  // This is not a suffixed literal or `0b101` followed by `e`.
0b;      // This is not an integer literal or `0` followed by `b`.
0b_;     // This is not an integer literal or `0` followed by `b_`.
2em;     // This is not a suffixed literal or `2` followed by `em`.
2.0em;   // This is not a suffixed literal or `2.0` followed by `em`.
```

r[lex.token.literal.int.out-of-range]
It is an error to have an unsuffixed binary or octal literal followed without intervening whitespace by a decimal digit outside the range for its radix.

r[lex.token.literal.int.period]
It is an error to have an unsuffixed binary, octal, or hexadecimal literal followed without intervening whitespace by a period character (subject to the same restrictions on what may follow the period as in floating-point literals).

r[lex.token.literal.int.exp]
It is an error to have an unsuffixed binary or octal literal followed without intervening whitespace by the character `e` or `E`.

r[lex.token.literal.int.empty-with-radix]
It is an error for a radix prefix to not be followed, after any optional leading underscores, by at least one valid digit for its radix.

r[lex.token.literal.int.tuple-field]
#### Tuple index

r[lex.token.literal.int.tuple-field.syntax]
```grammar
TUPLE_INDEX -> DEC_LITERAL | BIN_LITERAL | OCT_LITERAL | HEX_LITERAL
```

r[lex.token.literal.int.tuple-field.intro]
A tuple index is used to refer to the fields of [tuples], [tuple structs], and [tuple enum variants].

r[lex.token.literal.int.tuple-field.eq]
Tuple indices are compared with the literal token directly. Tuple indices start with `0` and each successive index increments the value by `1` as a decimal value. Thus, only decimal values will match, and the value must not have any extra `0` prefix characters.

Tuple indices may not include any suffixes (such as `usize`).

```rust
let example = ("dog", "cat", "horse");
let dog = example.0;
let cat = example.1;
// The following examples are invalid.
let cat = example.01;  // ERROR no field named `01`
let horse = example.0b10;  // ERROR no field named `0b10`
let unicorn = example.0usize; // ERROR suffixes on a tuple index are invalid
let underscore = example.0_0; // ERROR no field `0_0` on type `(&str, &str, &str)`
```

r[lex.token.literal.float]
#### Floating-point literals

r[lex.token.literal.float.syntax]
```grammar
FLOAT_LITERAL ->
      DEC_LITERAL (`.` DEC_LITERAL)? FLOAT_EXPONENT SUFFIX?
    | DEC_LITERAL `.` DEC_LITERAL SUFFIX?
    | DEC_LITERAL `.` !(`.` | `_` | XID_Start)

FLOAT_EXPONENT ->
    (`e`|`E`) ^ (`+`|`-`)? `_`* DEC_DIGIT (DEC_DIGIT|`_`)*
```

r[lex.token.literal.float.form]
A _floating-point literal_ has one of two forms:

* A _decimal literal_ followed by a period character `U+002E` (`.`). This is optionally followed by another decimal literal, with an optional _exponent_.
* A single _decimal literal_ followed by an _exponent_.

r[lex.token.literal.float.suffix]
Like integer literals, a floating-point literal may be followed by a suffix, so long as the pre-suffix part does not end with `U+002E` (`.`). The suffix may not begin with `e` or `E` if the literal does not include an exponent. See [Floating-point literal expressions] for the effect of these suffixes.

Examples of floating-point literals which are accepted as literal expressions:

```rust
123.0f64;
0.1f64;
0.1f32;
12E+99_f64;
let x: f64 = 2.;
```

This last example is different because it is not possible to use the suffix syntax with a floating point literal ending in a period. `2.f64` would attempt to call a method named `f64` on `2`.

Note that `-1.0`, for example, is analyzed as two tokens: `-` followed by `1.0`.

Examples of floating-point literals which are not accepted as literal expressions:

```rust
# #[cfg(false)] {
2.0f80;
2e5f80;
2e5e6;
2.0e5e6;
1.3e10u64;
# }
```

r[lex.token.literal.float.invalid-exponent]
It is an error for a floating-point literal to have an exponent with no digits.

```rust
2e;   // This is not a floating-point literal or `2` followed by `e`.
2.0e; // This is not a floating-point literal or `2.0` followed by `e`.
```

r[lex.token.life]
## Lifetimes and loop labels

r[lex.token.life.syntax]
```grammar
LIFETIME_TOKEN ->
      RAW_LIFETIME
    | `'` IDENTIFIER_OR_KEYWORD !`'`

LIFETIME_OR_LABEL ->
      RAW_LIFETIME
    | `'` NON_KEYWORD_IDENTIFIER !`'`

RAW_LIFETIME ->
    `'r#` ^ IDENTIFIER_OR_KEYWORD !`'`

RESERVED_RAW_LIFETIME -> `'r#` (`_` | `crate` | `self` | `Self` | `super`) !(`'` | XID_Continue)
```

r[lex.token.life.intro]
Lifetime parameters and [loop labels] use LIFETIME_OR_LABEL tokens. Any LIFETIME_TOKEN will be accepted by the lexer, and for example, can be used in macros.

r[lex.token.life.raw.intro]
A raw lifetime is like a normal lifetime, but its identifier is prefixed by `r#`. (Note that the `r#` prefix is not included as part of the actual lifetime.)

r[lex.token.life.raw.allowed]
Unlike a normal lifetime, a raw lifetime may be any strict or reserved keyword except the ones listed above for `RAW_LIFETIME`.

r[lex.token.life.raw.reserved]
It is an error to use the [RESERVED_RAW_LIFETIME] token.

r[lex.token.life.raw.edition2021]
> [!EDITION-2021]
> Raw lifetimes are accepted in the 2021 edition or later. In earlier editions the token `'<example-value>'r # lt`.

r[lex.token.punct]
## Punctuation

r[lex.token.punct.intro]
Punctuation tokens are used as operators, separators, and other parts of the grammar.

r[lex.token.punct.syntax]
```grammar
PUNCTUATION ->
      `...`
    | `..=`
    | `<<=`
    | `>>=`
    | `!=`
    | `%=`
    | `&&`
    | `&=`
    | `*=`
    | `+=`
    | `-=`
    | `->`
    | `..`
    | `/=`
    | `::`
    | `<-`
    | `<<`
    | `<=`
    | `==`
    | `=>`
    | `>=`
    | `>>`
    | `^=`
    | `|=`
    | `||`
    | `!`
    | `#`
    | `$`
    | `%`
    | `&`
    | `(`
    | `)`
    | `*`
    | `+`
    | `,`
    | `-`
    | `.`
    | `/`
    | `:`
    | `;`
    | `<`
    | `=`
    | `>`
    | `?`
    | `@`
    | `[`
    | `]`
    | `^`
    | `{`
    | `|`
    | `}`
    | `~`
```

> **Note:**
> See the [syntax index] for links to how punctuation characters are used.

r[lex.token.delim]
## Delimiters

Bracket punctuation is used in various parts of the grammar. An open bracket must always be paired with a close bracket. Brackets and the tokens within them are referred to as "<example-value>" in [macros].  The three types of brackets are:

| Bracket | Type            |
|---------|-----------------|
| `{` `}` | Curly braces    |
| `[` `]` | Square brackets |
| `(` `)` | Parentheses     |

r[lex.token.reserved]
