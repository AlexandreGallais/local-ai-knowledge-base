# core::str::pattern

The string Pattern API.

The Pattern API provides a generic mechanism for using different pattern
types when searching through a string.

For more details, see the traits [`Pattern`], [`Searcher`],
[`ReverseSearcher`], and [`DoubleEndedSearcher`].

Although this API is unstable, it is exposed via stable APIs on the
[`str`] type.

# Examples

[`Pattern`] is [implemented][pattern-impls] in the stable API for
[`&str`][`str`], [`char`], slices of [`char`], and functions and closures
implementing `FnMut(char) -> bool`.

```
let s = "Can you find a needle in a haystack?";

// &str pattern
assert_eq!(s.find("you"), Some(4));
// char pattern
assert_eq!(s.find('n'), Some(2));
// array of chars pattern
assert_eq!(s.find(&['a', 'e', 'i', 'o', 'u']), Some(1));
// slice of chars pattern
assert_eq!(s.find(&['a', 'e', 'i', 'o', 'u'][..]), Some(1));
// closure pattern
assert_eq!(s.find(|c: char| c.is_ascii_punctuation()), Some(35));
```

[pattern-impls]: Pattern#implementors

## trait Pattern

```rust
pub trait Pattern: Sized
```

A string pattern.

A `Pattern` expresses that the implementing type
can be used as a string pattern for searching in a [`&str`][str].

For example, both `'a'` and `"aa"` are patterns that
would match at index `1` in the string `"baaaab"`.

The trait itself acts as a builder for an associated
[`Searcher`] type, which does the actual work of finding
occurrences of the pattern in a string.

Depending on the type of the pattern, the behavior of methods like
[`str::find`] and [`str::contains`] can change. The table below describes
some of those behaviors.

| Pattern type             | Match condition                           |
|--------------------------|-------------------------------------------|
| `&str`                   | is substring                              |
| `char`                   | is contained in string                    |
| `&[char]`                | any char in slice is contained in string  |
| `F: FnMut(char) -> bool` | `F` returns `true` for a char in string   |
| `&&str`                  | is substring                              |
| `&String`                | is substring                              |

# Examples

```
// &str
assert_eq!("abaaa".find("ba"), Some(1));
assert_eq!("abaaa".find("bac"), None);

// char
assert_eq!("abaaa".find('a'), Some(0));
assert_eq!("abaaa".find('b'), Some(1));
assert_eq!("abaaa".find('c'), None);

// &[char; N]
assert_eq!("ab".find(&['b', 'a']), Some(0));
assert_eq!("abaaa".find(&['a', 'z']), Some(0));
assert_eq!("abaaa".find(&['c', 'd']), None);

// &[char]
assert_eq!("ab".find(&['b', 'a'][..]), Some(0));
assert_eq!("abaaa".find(&['a', 'z'][..]), Some(0));
assert_eq!("abaaa".find(&['c', 'd'][..]), None);

// FnMut(char) -> bool
assert_eq!("abcdef_z".find(|ch| ch > 'd' && ch < 'y'), Some(4));
assert_eq!("abcddd_z".find(|ch| ch > 'd' && ch < 'y'), None);
```

## Pattern::Searcher

```rust
type Searcher<'a>: Searcher<'a>
```

Associated searcher for this pattern

## Pattern::into_searcher

```rust
fn into_searcher(self, haystack: &str) -> Self::Searcher<'_>
```

Constructs the associated searcher from
`self` and the `haystack` to search in.

## Pattern::is_contained_in

```rust
fn is_contained_in(self, haystack: &str) -> bool
```

Checks whether the pattern matches anywhere in the haystack

## Pattern::is_prefix_of

```rust
fn is_prefix_of(self, haystack: &str) -> bool
```

Checks whether the pattern matches at the front of the haystack

## Pattern::is_suffix_of

```rust
fn is_suffix_of<'a>(self, haystack: &'a str) -> bool where Self::Searcher<'a>: ReverseSearcher<'a>,
```

Checks whether the pattern matches at the back of the haystack

## Pattern::strip_prefix_of

```rust
fn strip_prefix_of(self, haystack: &str) -> Option<&str>
```

Removes the pattern from the front of haystack, if it matches.

## Pattern::strip_suffix_of

```rust
fn strip_suffix_of<'a>(self, haystack: &'a str) -> Option<&'a str> where Self::Searcher<'a>: ReverseSearcher<'a>,
```

Removes the pattern from the back of haystack, if it matches.

## Pattern::as_utf8_pattern

```rust
fn as_utf8_pattern(&self) -> Option<Utf8Pattern<'_>>
```

Returns the pattern as UTF-8 if possible.

## enum Utf8Pattern

```rust
pub enum Utf8Pattern<'a>
```

Result of calling [`Pattern::as_utf8_pattern()`].
Can be used for inspecting the contents of a [`Pattern`] in cases
where the underlying representation can be represented as UTF-8.

## enum SearchStep

```rust
pub enum SearchStep
```

Result of calling [`Searcher::next()`] or [`ReverseSearcher::next_back()`].

## trait Searcher

```rust
pub unsafe trait Searcher<'a>
```

A searcher for a string pattern.

This trait provides methods for searching for non-overlapping
matches of a pattern starting from the front (left) of a string.

It will be implemented by associated `Searcher`
types of the [`Pattern`] trait.

The trait is marked unsafe because the indices returned by the
[`next()`][Searcher::next] methods are required to lie on valid utf8
boundaries in the haystack. This enables consumers of this trait to
slice the haystack without additional runtime checks.

## Searcher::haystack

```rust
fn haystack(&self) -> &'a str
```

Getter for the underlying string to be searched in

Will always return the same [`&str`][str].

## Searcher::next

```rust
fn next(&mut self) -> SearchStep
```

Performs the next search step starting from the front.

- Returns [`Match(a, b)`][SearchStep::Match] if `haystack[a..b]` matches
  the pattern.
- Returns [`Reject(a, b)`][SearchStep::Reject] if `haystack[a..b]` can
  not match the pattern, even partially.
- Returns [`Done`][SearchStep::Done] if every byte of the haystack has
  been visited.

The stream of [`Match`][SearchStep::Match] and
[`Reject`][SearchStep::Reject] values up to a [`Done`][SearchStep::Done]
will contain index ranges that are adjacent, non-overlapping,
covering the whole haystack, and laying on utf8 boundaries.

A [`Match`][SearchStep::Match] result needs to contain the whole matched
pattern, however [`Reject`][SearchStep::Reject] results may be split up
into arbitrary many adjacent fragments. Both ranges may have zero length.

As an example, the pattern `"aaa"` and the haystack `"cbaaaaab"`
might produce the stream
`[Reject(0, 1), Reject(1, 2), Match(2, 5), Reject(5, 8)]`

## Searcher::next_match

```rust
fn next_match(&mut self) -> Option<(usize, usize)>
```

Finds the next [`Match`][SearchStep::Match] result. See [`next()`][Searcher::next].

Unlike [`next()`][Searcher::next], there is no guarantee that the returned ranges
of this and [`next_reject`][Searcher::next_reject] will overlap. This will return
`(start_match, end_match)`, where start_match is the index of where
the match begins, and end_match is the index after the end of the match.

## Searcher::next_reject

```rust
fn next_reject(&mut self) -> Option<(usize, usize)>
```

Finds the next [`Reject`][SearchStep::Reject] result. See [`next()`][Searcher::next]
and [`next_match()`][Searcher::next_match].

Unlike [`next()`][Searcher::next], there is no guarantee that the returned ranges
of this and [`next_match`][Searcher::next_match] will overlap.

## trait ReverseSearcher

```rust
pub unsafe trait ReverseSearcher<'a>: Searcher<'a>
```

A reverse searcher for a string pattern.

This trait provides methods for searching for non-overlapping
matches of a pattern starting from the back (right) of a string.

It will be implemented by associated [`Searcher`]
types of the [`Pattern`] trait if the pattern supports searching
for it from the back.

The index ranges returned by this trait are not required
to exactly match those of the forward search in reverse.

For the reason why this trait is marked unsafe, see the
parent trait [`Searcher`].

## ReverseSearcher::next_back

```rust
fn next_back(&mut self) -> SearchStep
```

Performs the next search step starting from the back.

- Returns [`Match(a, b)`][SearchStep::Match] if `haystack[a..b]`
  matches the pattern.
- Returns [`Reject(a, b)`][SearchStep::Reject] if `haystack[a..b]`
  can not match the pattern, even partially.
- Returns [`Done`][SearchStep::Done] if every byte of the haystack
  has been visited

The stream of [`Match`][SearchStep::Match] and
[`Reject`][SearchStep::Reject] values up to a [`Done`][SearchStep::Done]
will contain index ranges that are adjacent, non-overlapping,
covering the whole haystack, and laying on utf8 boundaries.

A [`Match`][SearchStep::Match] result needs to contain the whole matched
pattern, however [`Reject`][SearchStep::Reject] results may be split up
into arbitrary many adjacent fragments. Both ranges may have zero length.

As an example, the pattern `"aaa"` and the haystack `"cbaaaaab"`
might produce the stream
`[Reject(7, 8), Match(4, 7), Reject(1, 4), Reject(0, 1)]`.

## ReverseSearcher::next_match_back

```rust
fn next_match_back(&mut self) -> Option<(usize, usize)>
```

Finds the next [`Match`][SearchStep::Match] result.
See [`next_back()`][ReverseSearcher::next_back].

## ReverseSearcher::next_reject_back

```rust
fn next_reject_back(&mut self) -> Option<(usize, usize)>
```

Finds the next [`Reject`][SearchStep::Reject] result.
See [`next_back()`][ReverseSearcher::next_back].

## trait DoubleEndedSearcher

```rust
pub trait DoubleEndedSearcher<'a>: ReverseSearcher<'a>
```

A marker trait to express that a [`ReverseSearcher`]
can be used for a [`DoubleEndedIterator`] implementation.

For this, the impl of [`Searcher`] and [`ReverseSearcher`] need
to follow these conditions:

- All results of `next()` need to be identical
  to the results of `next_back()` in reverse order.
- `next()` and `next_back()` need to behave as
  the two ends of a range of values, that is they
  can not "walk past each other".

# Examples

`char::Searcher` is a `DoubleEndedSearcher` because searching for a
[`char`] only requires looking at one at a time, which behaves the same
from both ends.

`(&str)::Searcher` is not a `DoubleEndedSearcher` because
the pattern `"aa"` in the haystack `"aaa"` matches as either
`"[aa]a"` or `"a[aa]"`, depending on which side it is searched.

## DoubleEndedSearcher::CharSearcher

```rust
pub struct CharSearcher<'a>
```

Associated type for `<char as Pattern>::Searcher<'a>`.

## struct CharArraySearcher

```rust
pub struct CharArraySearcher<'a, const N: usize>( <MultiCharEqPattern<[char; N]> as Pattern>::Searcher<'a>, )
```

Associated type for `<[char; N] as Pattern>::Searcher<'a>`.

## struct CharArrayRefSearcher

```rust
pub struct CharArrayRefSearcher<'a, 'b, const N: usize>( <MultiCharEqPattern<&'b [char; N]> as Pattern>::Searcher<'a>, )
```

Associated type for `<&[char; N] as Pattern>::Searcher<'a>`.

## ::CharSliceSearcher

```rust
pub struct CharSliceSearcher<'a, 'b>(<MultiCharEqPattern<&'b [char]> as Pattern>::Searcher<'a>)
```

Associated type for `<&[char] as Pattern>::Searcher<'a>`.

## struct CharPredicateSearcher

```rust
pub struct CharPredicateSearcher<'a, F>(<MultiCharEqPattern<F> as Pattern>::Searcher<'a>) where F: FnMut(char) -> bool
```

Associated type for `<F as Pattern>::Searcher<'a>`.

## struct StrSearcher

```rust
pub struct StrSearcher<'a, 'b>
```

Associated type for `<&str as Pattern>::Searcher<'a>`.