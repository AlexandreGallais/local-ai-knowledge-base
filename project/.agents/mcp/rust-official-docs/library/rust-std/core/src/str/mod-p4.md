---
title: "core::str (part 4 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str (part 4 of 5)

## str::rmatch_indices

```rust
pub fn rmatch_indices<P: Pattern>(&self, pat: P) -> RMatchIndices<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over the disjoint matches of a pattern within `self`,
yielded in reverse order along with the index of the match.

For matches of `pat` within `self` that overlap, only the indices
corresponding to the last match are returned.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator requires that the pattern supports a reverse
search, and it will be a `DoubleEndedIterator` if a forward/reverse
search yields the same elements.

For iterating from the front, the `match_indices` method can be used.

# Examples

```rust
let v: Vec<_> = "abcXXXabcYYYabc".rmatch_indices("abc").collect();
assert_eq!(v, [(12, "abc"), (6, "abc"), (0, "abc")]);

let v: Vec<_> = "1abcabc2".rmatch_indices("abc").collect();
assert_eq!(v, [(4, "abc"), (1, "abc")]);

let v: Vec<_> = "ababa".rmatch_indices("aba").collect();
assert_eq!(v, [(2, "aba")]); // only the last `aba`
```

## str::trim

```rust
pub fn trim(&self) -> &str
```

Returns a string slice with leading and trailing whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`, which includes newlines.

# Examples

```rust
let s = "\n Hello\tworld\t\n";

assert_eq!("Hello\tworld", s.trim());
```

## str::trim_start

```rust
pub fn trim_start(&self) -> &str
```

Returns a string slice with leading whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`, which includes newlines.

# Text directionality

A string is a sequence of bytes. `start` in this context means the first
position of that byte string; for a left-to-right language like English or
Russian, this will be left side, and for right-to-left languages like
Arabic or Hebrew, this will be the right side.

# Examples

Basic usage:

```rust
let s = "\n Hello\tworld\t\n";
assert_eq!("Hello\tworld\t\n", s.trim_start());
```

Directionality:

```rust
let s = "  English  ";
assert!(Some('E') == s.trim_start().chars().next());

let s = "  עברית  ";
assert!(Some('ע') == s.trim_start().chars().next());
```

## str::trim_end

```rust
pub fn trim_end(&self) -> &str
```

Returns a string slice with trailing whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`, which includes newlines.

# Text directionality

A string is a sequence of bytes. `end` in this context means the last
position of that byte string; for a left-to-right language like English or
Russian, this will be right side, and for right-to-left languages like
Arabic or Hebrew, this will be the left side.

# Examples

Basic usage:

```rust
let s = "\n Hello\tworld\t\n";
assert_eq!("\n Hello\tworld", s.trim_end());
```

Directionality:

```rust
let s = "  English  ";
assert!(Some('h') == s.trim_end().chars().rev().next());

let s = "  עברית  ";
assert!(Some('ת') == s.trim_end().chars().rev().next());
```

## str::trim_left

```rust
pub fn trim_left(&self) -> &str
```

Returns a string slice with leading whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`.

# Text directionality

A string is a sequence of bytes. 'Left' in this context means the first
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _right_ side, not the left.

# Examples

Basic usage:

```rust
let s = " Hello\tworld\t";

assert_eq!("Hello\tworld\t", s.trim_left());
```

Directionality:

```rust
let s = "  English";
assert!(Some('E') == s.trim_left().chars().next());

let s = "  עברית";
assert!(Some('ע') == s.trim_left().chars().next());
```

## str::trim_right

```rust
pub fn trim_right(&self) -> &str
```

Returns a string slice with trailing whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`.

# Text directionality

A string is a sequence of bytes. 'Right' in this context means the last
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _left_ side, not the right.

# Examples

Basic usage:

```rust
let s = " Hello\tworld\t";

assert_eq!(" Hello\tworld", s.trim_right());
```

Directionality:

```rust
let s = "English  ";
assert!(Some('h') == s.trim_right().chars().rev().next());

let s = "עברית  ";
assert!(Some('ת') == s.trim_right().chars().rev().next());
```

## str::trim_matches

```rust
pub fn trim_matches<P: Pattern>(&self, pat: P) -> &str where for<'a> P::Searcher<'a>: DoubleEndedSearcher<'a>,
```

Returns a string slice with all prefixes and suffixes that match a
pattern repeatedly removed.

The [pattern] can be a `char`, a slice of `char`s, or a function
or closure that determines if a character matches.

# Examples

Simple patterns:

```rust
assert_eq!("11foo1bar11".trim_matches('1'), "foo1bar");
assert_eq!("123foo1bar123".trim_matches(char::is_numeric), "foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_matches(x), "foo1bar");
```

A more complex pattern, using a closure:

```rust
assert_eq!("1foo1barXX".trim_matches(|c| c == '1' || c == 'X'), "foo1bar");
```

## str::trim_start_matches

```rust
pub fn trim_start_matches<P: Pattern>(&self, pat: P) -> &str
```

Returns a string slice with all prefixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Text directionality

A string is a sequence of bytes. `start` in this context means the first
position of that byte string; for a left-to-right language like English or
Russian, this will be left side, and for right-to-left languages like
Arabic or Hebrew, this will be the right side.

# Examples

```rust
assert_eq!("11foo1bar11".trim_start_matches('1'), "foo1bar11");
assert_eq!("123foo1bar123".trim_start_matches(char::is_numeric), "foo1bar123");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_start_matches(x), "foo1bar12");
```

## str::strip_prefix

```rust
pub fn strip_prefix<P: Pattern>(&self, prefix: P) -> Option<&str>
```

Returns a string slice with the prefix removed.

If the string starts with the pattern `prefix`, returns the substring after the prefix,
wrapped in `Some`. Unlike `trim_start_matches`, this method removes the prefix exactly once.

If the string does not start with `prefix`, returns `None`.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
assert_eq!("foo:bar".strip_prefix("foo:"), Some("bar"));
assert_eq!("foo:bar".strip_prefix("bar"), None);
assert_eq!("foofoo".strip_prefix("foo"), Some("foo"));
```

## str::strip_suffix

```rust
pub fn strip_suffix<P: Pattern>(&self, suffix: P) -> Option<&str> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with the suffix removed.

If the string ends with the pattern `suffix`, returns the substring before the suffix,
wrapped in `Some`.  Unlike `trim_end_matches`, this method removes the suffix exactly once.

If the string does not end with `suffix`, returns `None`.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
assert_eq!("bar:foo".strip_suffix(":foo"), Some("bar"));
assert_eq!("bar:foo".strip_suffix("bar"), None);
assert_eq!("foofoo".strip_suffix("foo"), Some("foo"));
```

## str::strip_circumfix

```rust
pub fn strip_circumfix<P: Pattern, S: Pattern>(&self, prefix: P, suffix: S) -> Option<&str> where for<'a> S::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with the prefix and suffix removed.

If the string starts with the pattern `prefix` and ends with
the pattern `suffix`, and the prefix and suffix don't overlap, returns
the substring after the prefix and before the suffix, wrapped in `Some`.
Unlike `trim_start_matches` and `trim_end_matches`, this method removes both the prefix
and suffix exactly once.

If the string does not start with `prefix`, does not end with `suffix`,
or the prefix and suffix overlap in the string, returns `None`.

Each [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
assert_eq!("bar:hello:foo".strip_circumfix("bar:", ":foo"), Some("hello"));
assert_eq!("bar:foo".strip_circumfix("foo", "foo"), None);
assert_eq!("foo:bar;".strip_circumfix("foo:", ';'), Some("bar"));
assert_eq!("foo:bar:baz".strip_circumfix("foo:bar:", ":bar:baz"), None);
```

## str::trim_prefix

```rust
pub fn trim_prefix<P: Pattern>(&self, prefix: P) -> &str
```

Returns a string slice with the optional prefix removed.

If the string starts with the pattern `prefix`, returns the substring after the prefix.
Unlike `strip_prefix`, this method always returns `&str` for easy method chaining,
instead of returning `Option<&str>`.

If the string does not start with `prefix`, returns the original string unchanged.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
// Prefix present - removes it
assert_eq!("foo:bar".trim_prefix("foo:"), "bar");
assert_eq!("foofoo".trim_prefix("foo"), "foo");

// Prefix absent - returns original string
assert_eq!("foo:bar".trim_prefix("bar"), "foo:bar");

// Method chaining example
assert_eq!("<https://example.com/>".trim_prefix('<').trim_suffix('>'), "https://example.com/");
```

## str::trim_suffix

```rust
pub fn trim_suffix<P: Pattern>(&self, suffix: P) -> &str where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with the optional suffix removed.

If the string ends with the pattern `suffix`, returns the substring before the suffix.
Unlike `strip_suffix`, this method always returns `&str` for easy method chaining,
instead of returning `Option<&str>`.

If the string does not end with `suffix`, returns the original string unchanged.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
// Suffix present - removes it
assert_eq!("bar:foo".trim_suffix(":foo"), "bar");
assert_eq!("foofoo".trim_suffix("foo"), "foo");

// Suffix absent - returns original string
assert_eq!("bar:foo".trim_suffix("bar"), "bar:foo");

// Method chaining example
assert_eq!("<https://example.com/>".trim_prefix('<').trim_suffix('>'), "https://example.com/");
```

## str::trim_end_matches

```rust
pub fn trim_end_matches<P: Pattern>(&self, pat: P) -> &str where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with all suffixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Text directionality

A string is a sequence of bytes. `end` in this context means the last
position of that byte string; for a left-to-right language like English or
Russian, this will be right side, and for right-to-left languages like
Arabic or Hebrew, this will be the left side.

# Examples

Simple patterns:

```rust
assert_eq!("11foo1bar11".trim_end_matches('1'), "11foo1bar");
assert_eq!("123foo1bar123".trim_end_matches(char::is_numeric), "123foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_end_matches(x), "12foo1bar");
```

A more complex pattern, using a closure:

```rust
assert_eq!("1fooX".trim_end_matches(|c| c == '1' || c == 'X'), "1foo");
```

## str::trim_left_matches

```rust
pub fn trim_left_matches<P: Pattern>(&self, pat: P) -> &str
```

Returns a string slice with all prefixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Text directionality

A string is a sequence of bytes. 'Left' in this context means the first
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _right_ side, not the left.

# Examples

```rust
assert_eq!("11foo1bar11".trim_left_matches('1'), "foo1bar11");
assert_eq!("123foo1bar123".trim_left_matches(char::is_numeric), "foo1bar123");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_left_matches(x), "foo1bar12");
```

## str::trim_right_matches

```rust
pub fn trim_right_matches<P: Pattern>(&self, pat: P) -> &str where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with all suffixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Text directionality

A string is a sequence of bytes. 'Right' in this context means the last
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _left_ side, not the right.

# Examples

Simple patterns:

```rust
assert_eq!("11foo1bar11".trim_right_matches('1'), "11foo1bar");
assert_eq!("123foo1bar123".trim_right_matches(char::is_numeric), "123foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_right_matches(x), "12foo1bar");
```

A more complex pattern, using a closure:

```rust
assert_eq!("1fooX".trim_right_matches(|c| c == '1' || c == 'X'), "1foo");
```

## str::parse

```rust
pub fn parse<F: FromStr>(&self) -> Result<F, F::Err>
```

Parses this string slice into another type.

Because `parse` is so general, it can cause problems with type
inference. As such, `parse` is one of the few times you'll see
the syntax affectionately known as the 'turbofish': `::<>`. This
helps the inference algorithm understand specifically which type
you're trying to parse into.

`parse` can parse into any type that implements the `FromStr` trait.

# Errors

Will return `Err` if it's not possible to parse this string slice into
the desired type.

# Examples

Basic usage:

```rust
let four: u32 = "4".parse().unwrap();

assert_eq!(4, four);
```

Using the 'turbofish' instead of annotating `four`:

```rust
let four = "4".parse::<u32>();

assert_eq!(Ok(4), four);
```

Failing to parse:

```rust
let nope = "j".parse::<u32>();

assert!(nope.is_err());
```

## str::is_ascii

```rust
pub const fn is_ascii(&self) -> bool
```

Checks if all characters in this string are within the ASCII range.

An empty string returns `true`.

# Examples

```rust
let ascii = "hello!\n";
let non_ascii = "Grüße, Jürgen ❤";

assert!(ascii.is_ascii());
assert!(!non_ascii.is_ascii());
```
