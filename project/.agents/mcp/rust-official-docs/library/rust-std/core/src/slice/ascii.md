# core::slice::ascii

Operations on ASCII `[u8]`.

## u8::is_ascii

```rust
pub const fn is_ascii(&self) -> bool
```

Checks if all bytes in this slice are within the ASCII range.

An empty slice returns `true`.

## u8::eq_ignore_ascii_case

```rust
pub const fn eq_ignore_ascii_case(&self, other: &[u8]) -> bool
```

Checks that two slices are an ASCII case-insensitive match.

Same as `to_ascii_lowercase(a) == to_ascii_lowercase(b)`,
but without allocating and copying temporaries.

## u8::make_ascii_uppercase

```rust
pub const fn make_ascii_uppercase(&mut self)
```

Converts this slice to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To return a new uppercased value without modifying the existing one, use
[`to_ascii_uppercase`].

[`to_ascii_uppercase`]: #method.to_ascii_uppercase

## u8::make_ascii_lowercase

```rust
pub const fn make_ascii_lowercase(&mut self)
```

Converts this slice to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To return a new lowercased value without modifying the existing one, use
[`to_ascii_lowercase`].

[`to_ascii_lowercase`]: #method.to_ascii_lowercase

## u8::escape_ascii

```rust
pub fn escape_ascii(&self) -> EscapeAscii<'_>
```

Returns an iterator that produces an escaped version of this slice,
treating it as an ASCII string.

# Examples

```
let s = b"0\t\r\n'\"\\\x9d";
let escaped = s.escape_ascii().to_string();
assert_eq!(escaped, "0\\t\\r\\n\\'\\\"\\\\\\x9d");
```

## u8::trim_ascii_start

```rust
pub const fn trim_ascii_start(&self) -> &[u8]
```

Returns a byte slice with leading ASCII whitespace bytes removed.

'Whitespace' refers to the definition used by
[`u8::is_ascii_whitespace`]. Importantly, this definition excludes
the `\0x0B` byte even though it has the Unicode [`White_Space`] property
and is removed by [`str::trim_start`].

[`White_Space`]: https://www.unicode.org/reports/tr44/#White_Space

# Examples

```
assert_eq!(b" \t hello world\n".trim_ascii_start(), b"hello world\n");
assert_eq!(b"  ".trim_ascii_start(), b"");
assert_eq!(b"".trim_ascii_start(), b"");
```

## u8::trim_ascii_end

```rust
pub const fn trim_ascii_end(&self) -> &[u8]
```

Returns a byte slice with trailing ASCII whitespace bytes removed.

'Whitespace' refers to the definition used by
[`u8::is_ascii_whitespace`]. Importantly, this definition excludes
the `\0x0B` byte even though it has the Unicode [`White_Space`] property
and is removed by [`str::trim_end`].

[`White_Space`]: https://www.unicode.org/reports/tr44/#White_Space

# Examples

```
assert_eq!(b"\r hello world\n ".trim_ascii_end(), b"\r hello world");
assert_eq!(b"  ".trim_ascii_end(), b"");
assert_eq!(b"".trim_ascii_end(), b"");
```

## u8::trim_ascii

```rust
pub const fn trim_ascii(&self) -> &[u8]
```

Returns a byte slice with leading and trailing ASCII whitespace bytes
removed.

'Whitespace' refers to the definition used by
[`u8::is_ascii_whitespace`]. Importantly, this definition excludes
the `\0x0B` byte even though it has the Unicode [`White_Space`] property
and is removed by [`str::trim`].

[`White_Space`]: https://www.unicode.org/reports/tr44/#White_Space

# Examples

```
assert_eq!(b"\r hello world\n ".trim_ascii(), b"hello world");
assert_eq!(b"  ".trim_ascii(), b"");
assert_eq!(b"".trim_ascii(), b"");
```

## struct EscapeAscii

```rust
pub struct EscapeAscii<'a>
```

An iterator over the escaped version of a byte slice.

This `struct` is created by the [`slice::escape_ascii`] method. See its
documentation for more information.