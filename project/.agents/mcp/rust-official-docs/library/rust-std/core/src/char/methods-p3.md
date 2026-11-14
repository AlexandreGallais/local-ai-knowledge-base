---
title: "core::char::methods (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/char/methods.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::char::methods (part 3 of 3)

## char::is_ascii_digit

```rust
pub const fn is_ascii_digit(&self) -> bool
```

Checks if the value is an ASCII decimal digit:
U+0030 '0' ..= U+0039 '9'.

# Examples

```rust
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_digit());
assert!(!uppercase_g.is_ascii_digit());
assert!(!a.is_ascii_digit());
assert!(!g.is_ascii_digit());
assert!(zero.is_ascii_digit());
assert!(!percent.is_ascii_digit());
assert!(!space.is_ascii_digit());
assert!(!lf.is_ascii_digit());
assert!(!esc.is_ascii_digit());
```

## char::is_ascii_hexdigit

```rust
pub const fn is_ascii_hexdigit(&self) -> bool
```

Checks if the value is an ASCII hexadecimal digit:

- U+0030 '0' ..= U+0039 '9', or
- U+0041 'A' ..= U+0046 'F', or
- U+0061 'a' ..= U+0066 'f'.

# Examples

```rust
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_hexdigit());
assert!(!uppercase_g.is_ascii_hexdigit());
assert!(a.is_ascii_hexdigit());
assert!(!g.is_ascii_hexdigit());
assert!(zero.is_ascii_hexdigit());
assert!(!percent.is_ascii_hexdigit());
assert!(!space.is_ascii_hexdigit());
assert!(!lf.is_ascii_hexdigit());
assert!(!esc.is_ascii_hexdigit());
```

## char::is_ascii_punctuation

```rust
pub const fn is_ascii_punctuation(&self) -> bool
```

Checks if the value is an ASCII punctuation or symbol character
(i.e. not alphanumeric, whitespace, or control):

- U+0021 ..= U+002F `! " # $ % & ' ( ) * + , - . /`, or
- U+003A ..= U+0040 `: ; < = > ? @`, or
- U+005B ..= U+0060 ``[ \ ] ^ _ ` ``, or
- U+007B ..= U+007E `{ | } ~`

# Examples

```rust
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_punctuation());
assert!(!uppercase_g.is_ascii_punctuation());
assert!(!a.is_ascii_punctuation());
assert!(!g.is_ascii_punctuation());
assert!(!zero.is_ascii_punctuation());
assert!(percent.is_ascii_punctuation());
assert!(!space.is_ascii_punctuation());
assert!(!lf.is_ascii_punctuation());
assert!(!esc.is_ascii_punctuation());
```

## char::is_ascii_graphic

```rust
pub const fn is_ascii_graphic(&self) -> bool
```

Checks if the value is an ASCII graphic character
(i.e. not whitespace or control):
U+0021 '!' ..= U+007E '~'.

# Examples

```rust
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_graphic());
assert!(uppercase_g.is_ascii_graphic());
assert!(a.is_ascii_graphic());
assert!(g.is_ascii_graphic());
assert!(zero.is_ascii_graphic());
assert!(percent.is_ascii_graphic());
assert!(!space.is_ascii_graphic());
assert!(!lf.is_ascii_graphic());
assert!(!esc.is_ascii_graphic());
```

## char::is_ascii_whitespace

```rust
pub const fn is_ascii_whitespace(&self) -> bool
```

Checks if the value is an ASCII whitespace character:
U+0020 SPACE, U+0009 HORIZONTAL TAB, U+000A LINE FEED,
U+000C FORM FEED, or U+000D CARRIAGE RETURN.

**Warning:** Because the list above excludes U+000B VERTICAL TAB,
`c.is_ascii_whitespace()` is **not** equivalent to `c.is_ascii() && c.is_whitespace()`.

Rust uses the WhatWG Infra Standard's definition of ASCII
whitespace. There are several other definitions in
wide use. For instance, the POSIX locale includes
U+000B VERTICAL TAB as well as all the above characters,
but—from the very same specification—the default rule for
"field splitting" in the Bourne shell considers *only*
SPACE, HORIZONTAL TAB, and LINE FEED as whitespace.

If you are writing a program that will process an existing
file format, check what that format's definition of whitespace is
before using this function.

# Examples

```rust
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_whitespace());
assert!(!uppercase_g.is_ascii_whitespace());
assert!(!a.is_ascii_whitespace());
assert!(!g.is_ascii_whitespace());
assert!(!zero.is_ascii_whitespace());
assert!(!percent.is_ascii_whitespace());
assert!(space.is_ascii_whitespace());
assert!(lf.is_ascii_whitespace());
assert!(!esc.is_ascii_whitespace());
```

## char::is_ascii_control

```rust
pub const fn is_ascii_control(&self) -> bool
```

Checks if the value is an ASCII control character:
U+0000 NUL ..= U+001F UNIT SEPARATOR, or U+007F DELETE.
Note that most ASCII whitespace characters are control
characters, but SPACE is not.

# Examples

```rust
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_control());
assert!(!uppercase_g.is_ascii_control());
assert!(!a.is_ascii_control());
assert!(!g.is_ascii_control());
assert!(!zero.is_ascii_control());
assert!(!percent.is_ascii_control());
assert!(!space.is_ascii_control());
assert!(lf.is_ascii_control());
assert!(esc.is_ascii_control());
```
