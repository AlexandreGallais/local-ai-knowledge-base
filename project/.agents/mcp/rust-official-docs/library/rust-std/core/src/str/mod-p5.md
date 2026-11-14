---
title: "core::str (part 5 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str (part 5 of 5)

## str::eq_ignore_ascii_case

```rust
pub const fn eq_ignore_ascii_case(&self, other: &str) -> bool
```

Checks that two strings are an ASCII case-insensitive match.

Same as `to_ascii_lowercase(a) == to_ascii_lowercase(b)`,
but without allocating and copying temporaries.

For Unicode-aware case-insensitive matching, consider
`str::eq_ignore_case_unnormalized`.

# Examples

```rust
assert!("Ferris".eq_ignore_ascii_case("FERRIS"));
assert!("Ferrös".eq_ignore_ascii_case("FERRöS"));
assert!(!"Ferrös".eq_ignore_ascii_case("FERRÖS"));
```

## str::make_ascii_uppercase

```rust
pub const fn make_ascii_uppercase(&mut self)
```

Converts this string to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but all other characters are unchanged.

To return a new uppercased value without modifying the existing one, use
`to_ascii_uppercase()`.

# Examples

```rust
let mut s = String::from("Grüße, Jürgen ❤");

s.make_ascii_uppercase();

assert_eq!("GRüßE, JüRGEN ❤", s);
```

## str::make_ascii_lowercase

```rust
pub const fn make_ascii_lowercase(&mut self)
```

Converts this string to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but all other characters are unchanged.

To return a new lowercased value without modifying the existing one, use
`to_ascii_lowercase()`.

# Examples

```rust
let mut s = String::from("GRÜßE, JÜRGEN ❤");

s.make_ascii_lowercase();

assert_eq!("grÜße, jÜrgen ❤", s);
```

## str::trim_ascii_start

```rust
pub const fn trim_ascii_start(&self) -> &str
```

Returns a string slice with leading ASCII whitespace removed.

'Whitespace' refers to the definition used by
`u8::is_ascii_whitespace`. Importantly, this definition excludes
the U+000B code point even though it has the Unicode `White_Space` property
and is removed by `str::trim_start`.

# Examples

```rust
assert_eq!(" \t \u{3000}hello world\n".trim_ascii_start(), "\u{3000}hello world\n");
assert_eq!("  ".trim_ascii_start(), "");
assert_eq!("".trim_ascii_start(), "");
```

## str::trim_ascii_end

```rust
pub const fn trim_ascii_end(&self) -> &str
```

Returns a string slice with trailing ASCII whitespace removed.

'Whitespace' refers to the definition used by
`u8::is_ascii_whitespace`. Importantly, this definition excludes
the U+000B code point even though it has the Unicode `White_Space` property
and is removed by `str::trim_end`.

# Examples

```rust
assert_eq!("\r hello world\u{3000}\n ".trim_ascii_end(), "\r hello world\u{3000}");
assert_eq!("  ".trim_ascii_end(), "");
assert_eq!("".trim_ascii_end(), "");
```

## str::trim_ascii

```rust
pub const fn trim_ascii(&self) -> &str
```

Returns a string slice with leading and trailing ASCII whitespace
removed.

'Whitespace' refers to the definition used by
`u8::is_ascii_whitespace`. Importantly, this definition excludes
the U+000B code point even though it has the Unicode `White_Space` property
and is removed by `str::trim`.

# Examples

```rust
assert_eq!("\r hello world\n ".trim_ascii(), "hello world");
assert_eq!("  ".trim_ascii(), "");
assert_eq!("".trim_ascii(), "");
```

## str::escape_debug

```rust
pub fn escape_debug(&self) -> EscapeDebug<'_>
```

Returns an iterator that escapes each char in `self` with `char::escape_debug`.

# Examples

As an iterator:

```rust
for c in "❤\n!".escape_debug() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", "❤\n!".escape_debug());
```

Both are equivalent to:

```rust
println!("❤\\n!");
```

Using `to_string`:

```rust
assert_eq!("❤\n!".escape_debug().to_string(), "❤\\n!");
```

## str::escape_default

```rust
pub fn escape_default(&self) -> EscapeDefault<'_>
```

Returns an iterator that escapes each char in `self` with `char::escape_default`.

# Examples

As an iterator:

```rust
for c in "❤\n!".escape_default() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", "❤\n!".escape_default());
```

Both are equivalent to:

```rust
println!("\\u{{2764}}\\n!");
```

Using `to_string`:

```rust
assert_eq!("❤\n!".escape_default().to_string(), "\\u{2764}\\n!");
```

## str::escape_unicode

```rust
pub fn escape_unicode(&self) -> EscapeUnicode<'_>
```

Returns an iterator that escapes each char in `self` with `char::escape_unicode`.

# Examples

As an iterator:

```rust
for c in "❤\n!".escape_unicode() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", "❤\n!".escape_unicode());
```

Both are equivalent to:

```rust
println!("\\u{{2764}}\\u{{a}}\\u{{21}}");
```

Using `to_string`:

```rust
assert_eq!("❤\n!".escape_unicode().to_string(), "\\u{2764}\\u{a}\\u{21}");
```

## str::substr_range

```rust
pub fn substr_range(&self, substr: &str) -> Option<Range<usize>>
```

Returns the range that a substring points to.

Returns `None` if `substr` does not point within `self`.

Unlike `str::find`, **this does not search through the string**.
Instead, it uses pointer arithmetic to find where in the string
`substr` is derived from.

This is useful for extending `str::split` and similar methods.

Note that this method may return false positives (typically either
`Some(0..0)` or `Some(self.len()..self.len())`) if `substr` is a
zero-length `str` that points at the beginning or end of another,
independent, `str`.

# Examples
```rust
use core::range::Range;

let data = "a, b, b, a";
let mut iter = data.split(", ").map(|s| data.substr_range(s).unwrap());

assert_eq!(iter.next(), Some(Range { start: 0, end: 1 }));
assert_eq!(iter.next(), Some(Range { start: 3, end: 4 }));
assert_eq!(iter.next(), Some(Range { start: 6, end: 7 }));
assert_eq!(iter.next(), Some(Range { start: 9, end: 10 }));
```
