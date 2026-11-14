# core::str::iter

Iterators for `str` methods.

## struct Chars

```rust
pub struct Chars<'a>
```

An iterator over the [`char`]s of a string slice.


This struct is created by the [`chars`] method on [`str`].
See its documentation for more.

[`char`]: prim@char
[`chars`]: str::chars

## Chars::as_str

```rust
pub fn as_str(&self) -> &'a str
```

Views the underlying data as a subslice of the original data.

This has the same lifetime as the original slice, and so the
iterator can continue to be used while this exists.

# Examples

```
let mut chars = "abc".chars();

assert_eq!(chars.as_str(), "abc");
chars.next();
assert_eq!(chars.as_str(), "bc");
chars.next();
chars.next();
assert_eq!(chars.as_str(), "");
```

## struct CharIndices

```rust
pub struct CharIndices<'a>
```

An iterator over the [`char`]s of a string slice, and their positions.

This struct is created by the [`char_indices`] method on [`str`].
See its documentation for more.

[`char`]: prim@char
[`char_indices`]: str::char_indices

## CharIndices::as_str

```rust
pub fn as_str(&self) -> &'a str
```

Views the underlying data as a subslice of the original data.

This has the same lifetime as the original slice, and so the
iterator can continue to be used while this exists.

## CharIndices::offset

```rust
pub fn offset(&self) -> usize
```

Returns the byte position of the next character, or the length
of the underlying string if there are no more characters.

This means that, when the iterator has not been fully consumed,
the returned value will match the index that will be returned
by the next call to [`next()`](Self::next).

# Examples

```
let mut chars = "a楽".char_indices();

// `next()` has not been called yet, so `offset()` returns the byte
// index of the first character of the string, which is always 0.
assert_eq!(chars.offset(), 0);
// As expected, the first call to `next()` also returns 0 as index.
assert_eq!(chars.next(), Some((0, 'a')));

// `next()` has been called once, so `offset()` returns the byte index
// of the second character ...
assert_eq!(chars.offset(), 1);
// ... which matches the index returned by the next call to `next()`.
assert_eq!(chars.next(), Some((1, '楽')));

// Once the iterator has been consumed, `offset()` returns the length
// in bytes of the string.
assert_eq!(chars.offset(), 4);
assert_eq!(chars.next(), None);
```

## struct Bytes

```rust
pub struct Bytes<'a>(pub(super) Copied<slice::Iter<'a, u8>>)
```

An iterator over the bytes of a string slice.

This struct is created by the [`bytes`] method on [`str`].
See its documentation for more.

[`bytes`]: str::bytes

## macro derive_pattern_clone!

```rust
macro_rules! derive_pattern_clone
```

This macro generates a Clone impl for string pattern API
wrapper types of the form X<'a, P>

## macro generate_pattern_iterators!

```rust
macro_rules! generate_pattern_iterators
```

This macro generates two public iterator structs
wrapping a private internal one that makes use of the `Pattern` API.

For all patterns `P: Pattern` the following items will be
generated (generics omitted):

struct $forward_iterator($internal_iterator);
struct $reverse_iterator($internal_iterator);

impl Iterator for $forward_iterator
{ /* internal ends up calling Searcher::next_match() */ }

impl DoubleEndedIterator for $forward_iterator
      where P::Searcher: DoubleEndedSearcher
{ /* internal ends up calling Searcher::next_match_back() */ }

impl Iterator for $reverse_iterator
      where P::Searcher: ReverseSearcher
{ /* internal ends up calling Searcher::next_match_back() */ }

impl DoubleEndedIterator for $reverse_iterator
      where P::Searcher: DoubleEndedSearcher
{ /* internal ends up calling Searcher::next_match() */ }

The internal one is defined outside the macro, and has almost the same
semantic as a DoubleEndedIterator by delegating to `pattern::Searcher` and
`pattern::ReverseSearcher` for both forward and reverse iteration.

"Almost", because a `Searcher` and a `ReverseSearcher` for a given
`Pattern` might not return the same elements, so actually implementing
`DoubleEndedIterator` for it would be incorrect.
(See the docs in `str::pattern` for more details)

However, the internal struct still represents a single ended iterator from
either end, and depending on pattern is also a valid double ended iterator,
so the two wrapper structs implement `Iterator`
and `DoubleEndedIterator` depending on the concrete pattern type, leading
to the complex impls seen above.

## struct Lines

```rust
pub struct Lines<'a>(pub(super) Map<SplitInclusive<'a, char>, LinesMap>)
```

An iterator over the lines of a string, as string slices.

This struct is created with the [`lines`] method on [`str`].
See its documentation for more.

[`lines`]: str::lines

## struct LinesAny

```rust
pub struct LinesAny<'a>(pub(super) Lines<'a>)
```

Created with the method [`lines_any`].

[`lines_any`]: str::lines_any

## ::SplitWhitespace

```rust
pub struct SplitWhitespace<'a>
```

An iterator over the non-whitespace substrings of a string,
separated by any amount of whitespace.

This struct is created by the [`split_whitespace`] method on [`str`].
See its documentation for more.

[`split_whitespace`]: str::split_whitespace

## struct SplitAsciiWhitespace

```rust
pub struct SplitAsciiWhitespace<'a>
```

An iterator over the non-ASCII-whitespace substrings of a string,
separated by any amount of ASCII whitespace.

This struct is created by the [`split_ascii_whitespace`] method on [`str`].
See its documentation for more.

[`split_ascii_whitespace`]: str::split_ascii_whitespace

## struct SplitInclusive

```rust
pub struct SplitInclusive<'a, P: Pattern>(pub(super) SplitInternal<'a, P>)
```

An iterator over the substrings of a string,
terminated by a substring matching to a predicate function
Unlike `Split`, it contains the matched part as a terminator
of the subslice.

This struct is created by the [`split_inclusive`] method on [`str`].
See its documentation for more.

[`split_inclusive`]: str::split_inclusive

## struct EncodeUtf16

```rust
pub struct EncodeUtf16<'a>
```

An iterator of [`u16`] over the string encoded as UTF-16.

This struct is created by the [`encode_utf16`] method on [`str`].
See its documentation for more.

[`encode_utf16`]: str::encode_utf16

## ::EscapeDebug

```rust
pub struct EscapeDebug<'a>
```

The return type of [`str::escape_debug`].

## struct EscapeDefault

```rust
pub struct EscapeDefault<'a>
```

The return type of [`str::escape_default`].

## struct EscapeUnicode

```rust
pub struct EscapeUnicode<'a>
```

The return type of [`str::escape_unicode`].